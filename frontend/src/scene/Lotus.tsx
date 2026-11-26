import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sampleShowcaseCamera } from '../utils/showcaseChoreography';
import { useShowcaseStore } from '../store/useShowcaseStore';

interface PetalSpec {
  angle: number;
  tier: number; // 0 = inner, 1 = mid-inner, 2 = mid-outer, 3 = outer guard
  closedTilt: number;
  openTilt: number;
  scale: [number, number, number];
  phase: number;
  length: number;
  width: number;
  cup: number;
}

/**
 * Creates an organic, botanical 3D parametric lotus petal geometry
 * with natural longitudinal curvature, transversal cupping, and tapered apex.
 */
function createBotanicalLotusPetal(
  length = 2.1,
  maxWidth = 0.95,
  cupDepth = 0.32,
  archCurve = 0.42,
): THREE.BufferGeometry {
  const segU = 16;
  const segV = 24;
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let iv = 0; iv <= segV; iv++) {
    const v = iv / segV; // 0 = base, 1 = tip
    // Realistic lotus petal profile: narrow base, swell at 55%, tapered rounded tip
    const widthFactor =
      Math.sin(Math.pow(v, 0.68) * Math.PI) * (1.0 - 0.14 * Math.pow(v, 2.0));
    const halfW = maxWidth * 0.5 * Math.max(0.02, widthFactor);

    // Natural longitudinal arch & subtle recurve near the tip
    const y = v * length;
    const arch =
      Math.sin(v * Math.PI * 0.82) * archCurve - Math.pow(v, 2.2) * archCurve * 0.38;

    for (let iu = 0; iu <= segU; iu++) {
      const u = iu / segU; // 0..1
      const s = (u - 0.5) * 2; // -1..1 across width
      const x = s * halfW;

      // Realistic transverse concave cupping (strongest in mid-petal)
      const cup = (1.0 - s * s) * cupDepth * Math.sin(Math.pow(v, 0.75) * Math.PI);

      // Delicate organic edge undulation / petal wave
      const edgeWave = (Math.abs(s) > 0.7 ? Math.sin(v * 16.0) * 0.018 * Math.abs(s) : 0);
      const z = arch + cup + edgeWave;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let iv = 0; iv < segV; iv++) {
    for (let iu = 0; iu < segU; iu++) {
      const a = iv * (segU + 1) + iu;
      const b = a + 1;
      const c = a + (segU + 1);
      const d = c + 1;
      indices.push(a, b, d);
      indices.push(a, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  // Smooth normals for seamless organic botanical appearance
  return geo;
}

/**
 * Creates a procedural high-resolution botanical lotus petal gradient texture
 * with soft rose-pink tips, creamy blush middle, tender chartreuse base, and fine micro-veins.
 */
function createLotusPetalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Hyper-realistic Nelumbo nucifera gradient (V=0 is base, V=1024 is tip)
  const grad = ctx.createLinearGradient(0, 1024, 0, 0);
  grad.addColorStop(0.0, '#E8F5E9'); // Tender botanical calyx pale chartreuse
  grad.addColorStop(0.12, '#FFF9FB'); // Pure porcelain blush
  grad.addColorStop(0.42, '#FFD3E2'); // Dewy soft rose mid-tone
  grad.addColorStop(0.72, '#FF5C9D'); // Vibrant saturated lotus rose
  grad.addColorStop(0.92, '#E91E63'); // Rich carmine
  grad.addColorStop(1.0, '#C2185B'); // Deep velvety lotus petal apex

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 1024);

  // Realistic branching venation radiating outward
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 56; i++) {
    const t = (i / 56 - 0.5) * 2;
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + Math.random() * 0.12})`;
    ctx.beginPath();
    ctx.moveTo(256 + t * 30, 1024);
    ctx.bezierCurveTo(
      256 + t * 130,
      650,
      256 + t * 240,
      350,
      256 + t * 190,
      30,
    );
    ctx.stroke();

    // Fine lateral micro-veins
    if (i % 3 === 0) {
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = `rgba(255, 255, 255, 0.06)`;
      ctx.beginPath();
      ctx.moveTo(256 + t * 110, 600);
      ctx.lineTo(256 + t * 180 + (t > 0 ? 30 : -30), 540);
      ctx.stroke();
    }
  }

  // Soft translucent edge halo for authentic rim lighting
  const edgeGrad = ctx.createLinearGradient(0, 0, 512, 0);
  edgeGrad.addColorStop(0, 'rgba(255,255,255,0.35)');
  edgeGrad.addColorStop(0.12, 'rgba(255,255,255,0)');
  edgeGrad.addColorStop(0.88, 'rgba(255,255,255,0)');
  edgeGrad.addColorStop(1, 'rgba(255,255,255,0.35)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, 512, 1024);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function Lotus() {
  const isSoftwareGl = useShowcaseStore((s) => s.isSoftwareGl);
  const groupRef = useRef<THREE.Group>(null);
  const petalRefs = useRef<(THREE.Mesh | null)[]>([]);
  const receptacleRef = useRef<THREE.Mesh>(null);
  const stamensRef = useRef<THREE.Group>(null);
  const bloomSmooth = useRef(0.12);

  // Four tiered petal geometries for organic botanical variation
  const geoTier0 = useMemo(() => createBotanicalLotusPetal(1.6, 0.72, 0.36, 0.38), []);
  const geoTier1 = useMemo(() => createBotanicalLotusPetal(1.95, 0.88, 0.34, 0.44), []);
  const geoTier2 = useMemo(() => createBotanicalLotusPetal(2.25, 1.05, 0.30, 0.48), []);
  const geoTier3 = useMemo(() => createBotanicalLotusPetal(2.45, 1.18, 0.26, 0.52), []);

  const petalTexture = useMemo(() => createLotusPetalTexture(), []);

  // 34 Petals arranged in 4 natural botanical tiers
  const petalSpecs = useMemo<PetalSpec[]>(() => {
    const specs: PetalSpec[] = [];

    // Tier 0: 6 Inner Petals (cupped closely around the golden receptacle)
    for (let i = 0; i < 6; i++) {
      specs.push({
        angle: (i / 6) * Math.PI * 2,
        tier: 0,
        closedTilt: 0.18,
        openTilt: 0.65,
        scale: [0.82, 0.88, 0.85],
        phase: i * 0.45,
        length: 1.6,
        width: 0.72,
        cup: 0.36,
      });
    }

    // Tier 1: 8 Mid-Inner Petals
    for (let i = 0; i < 8; i++) {
      specs.push({
        angle: (i / 8) * Math.PI * 2 + 0.24,
        tier: 1,
        closedTilt: 0.32,
        openTilt: 0.95,
        scale: [0.94, 0.96, 0.92],
        phase: i * 0.38 + 1.1,
        length: 1.95,
        width: 0.88,
        cup: 0.34,
      });
    }

    // Tier 2: 10 Mid-Outer Petals
    for (let i = 0; i < 10; i++) {
      specs.push({
        angle: (i / 10) * Math.PI * 2 + 0.14,
        tier: 2,
        closedTilt: 0.46,
        openTilt: 1.25,
        scale: [1.02, 1.02, 1.0],
        phase: i * 0.32 + 2.2,
        length: 2.25,
        width: 1.05,
        cup: 0.3,
      });
    }

    // Tier 3: 10 Outer Guard Petals / Sepals (broadest, gently recurved)
    for (let i = 0; i < 10; i++) {
      specs.push({
        angle: (i / 10) * Math.PI * 2 + 0.38,
        tier: 3,
        closedTilt: 0.60,
        openTilt: 1.48,
        scale: [1.12, 1.08, 1.05],
        phase: i * 0.28 + 3.1,
        length: 2.45,
        width: 1.18,
        cup: 0.26,
      });
    }

    return specs;
  }, []);

  // Realistic botanical materials: physical subsurface scattering, soft velvety sheen
  const innerMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: petalTexture,
        color: new THREE.Color('#FFF5F8'),
        emissive: new THREE.Color('#FF4081'),
        emissiveIntensity: 0.28,
        roughness: 0.22,
        metalness: 0.02,
        clearcoat: 0.75,
        clearcoatRoughness: 0.14,
        sheen: 1.0,
        sheenRoughness: 0.25,
        sheenColor: new THREE.Color('#FFB2D2'),
        transmission: isSoftwareGl ? 0 : 0.35,
        thickness: 1.1,
        ior: 1.5,
        attenuationColor: new THREE.Color('#FF6FA7'),
        attenuationDistance: 0.9,
        transparent: true,
        opacity: 0.97,
        side: THREE.DoubleSide,
      }),
    [isSoftwareGl, petalTexture],
  );

  const outerMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: petalTexture,
        color: new THREE.Color('#FFE8F0'),
        emissive: new THREE.Color('#D81B60'),
        emissiveIntensity: 0.22,
        roughness: 0.26,
        metalness: 0.02,
        clearcoat: 0.65,
        clearcoatRoughness: 0.18,
        sheen: 0.85,
        sheenRoughness: 0.3,
        sheenColor: new THREE.Color('#FF80AB'),
        transmission: isSoftwareGl ? 0 : 0.28,
        thickness: 1.3,
        ior: 1.48,
        attenuationColor: new THREE.Color('#E91E63'),
        attenuationDistance: 1.1,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide,
      }),
    [isSoftwareGl, petalTexture],
  );

  // Classical botanical lotus central seed receptacle (inverted cone in golden amber)
  const receptacleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F7DC6F'),
        emissive: new THREE.Color('#E67E22'),
        emissiveIntensity: 0.35,
        roughness: 0.45,
        metalness: 0.15,
      }),
    [],
  );

  // Golden stamen filaments & luminous pearl anthers
  const stamenFilamentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F9E79F'),
        roughness: 0.35,
      }),
    [],
  );

  const stamenTipMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(2.2, 1.8, 1.1), // Luminous warm golden-pearl
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geoTier0.dispose();
      geoTier1.dispose();
      geoTier2.dispose();
      geoTier3.dispose();
      petalTexture.dispose();
      innerMat.dispose();
      outerMat.dispose();
      receptacleMat.dispose();
      stamenFilamentMat.dispose();
      stamenTipMat.dispose();
    };
  }, [
    geoTier0,
    geoTier1,
    geoTier2,
    geoTier3,
    innerMat,
    outerMat,
    petalTexture,
    receptacleMat,
    stamenFilamentMat,
    stamenTipMat,
  ]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.08);
    const store = useShowcaseStore.getState();
    const t = store.reducedMotion ? 0 : state.clock.elapsedTime;
    const camSample = sampleShowcaseCamera(store.scrollProgress);

    bloomSmooth.current = THREE.MathUtils.damp(
      bloomSmooth.current,
      camSample.lotusBloom,
      4.5,
      dt,
    );
    const bloom = bloomSmooth.current;

    if (groupRef.current) {
      // Offset lotus to the left on desktop so the login card on the right never blocks it!
      const isWide = typeof window !== 'undefined' && window.innerWidth >= 1024;
      const targetX = isWide ? -1.4 : 0;
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 3.5, dt);
      groupRef.current.rotation.y = t * 0.14 + store.cursorNdc[0] * 0.18;
      groupRef.current.rotation.x = store.cursorNdc[1] * 0.08;
      groupRef.current.position.y = -0.35 + Math.sin(t * 0.9) * 0.06;
    }

    // Unfurl each petal according to its tier and natural breathing rhythm
    petalSpecs.forEach((spec, idx) => {
      const mesh = petalRefs.current[idx];
      if (!mesh) return;
      const breathe = Math.sin(t * 1.15 + spec.phase) * 0.035;
      const tilt = THREE.MathUtils.lerp(spec.closedTilt, spec.openTilt, bloom) + breathe;
      mesh.rotation.x = tilt;
    });

    if (receptacleRef.current) {
      const pulse = 1.0 + Math.sin(t * 1.8) * 0.04 + bloom * 0.15;
      receptacleRef.current.scale.set(pulse, 1.0, pulse);
    }

    if (stamensRef.current) {
      stamensRef.current.rotation.y = t * -0.08;
    }

    // Dynamic inner glow increases as the lotus opens
    innerMat.emissiveIntensity = 0.28 + bloom * 0.42;
    outerMat.emissiveIntensity = 0.20 + bloom * 0.32;
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]} scale={1.15}>
      {/* 1. Botanical Lotus Central Seed Receptacle (Inverted Cone) */}
      <mesh
        ref={receptacleRef}
        position={[0, 0.52, 0]}
        material={receptacleMat}
        rotation={[0, 0, 0]}
      >
        <cylinderGeometry args={[0.34, 0.18, 0.26, 32]} />
      </mesh>

      {/* Carpel pores on top of the receptacle */}
      {Array.from({ length: 9 }).map((_, i) => {
        const rad = i === 0 ? 0 : 0.18;
        const ang = i === 0 ? 0 : ((i - 1) / 8) * Math.PI * 2;
        return (
          <mesh
            key={`carpel-${i}`}
            position={[Math.cos(ang) * rad, 0.66, Math.sin(ang) * rad]}
          >
            <sphereGeometry args={[0.026, 8, 8]} />
            <meshStandardMaterial color="#B7950B" roughness={0.6} />
          </mesh>
        );
      })}

      {/* Warm internal core light */}
      <pointLight position={[0, 0.72, 0]} color="#FF9FC9" intensity={2.8} distance={7} />

      {/* 2. Botanical Stamen Crown (24 fine golden filaments with luminous anther tips) */}
      <group ref={stamensRef} position={[0, 0.44, 0]}>
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r = 0.38;
          return (
            <group key={`stamen-${i}`} rotation={[0, a, 0]}>
              {/* Filament */}
              <mesh position={[0, 0.08, r]} rotation={[0.22, 0, 0]} material={stamenFilamentMat}>
                <cylinderGeometry args={[0.007, 0.012, 0.24, 6]} />
              </mesh>
              {/* Anther Tip */}
              <mesh position={[0, 0.21, r + 0.04]} material={stamenTipMat}>
                <sphereGeometry args={[0.024, 8, 8]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 3. 34 Botanical Lotus Petals across 4 Tiers */}
      {petalSpecs.map((spec, idx) => {
        const geo =
          spec.tier === 0
            ? geoTier0
            : spec.tier === 1
              ? geoTier1
              : spec.tier === 2
                ? geoTier2
                : geoTier3;

        const mat = spec.tier <= 1 ? innerMat : outerMat;
        const radialOffset = 0.18 + spec.tier * 0.08;
        const heightOffset = 0.22 + spec.tier * 0.03;

        return (
          <group key={`petal-${idx}`} rotation={[0, spec.angle, 0]}>
            <mesh
              ref={(el) => {
                petalRefs.current[idx] = el;
              }}
              geometry={geo}
              material={mat}
              position={[0, heightOffset, radialOffset]}
              scale={spec.scale}
            />
          </group>
        );
      })}
    </group>
  );
}
