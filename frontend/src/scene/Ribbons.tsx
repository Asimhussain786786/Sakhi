import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sampleShowcaseCamera } from '../utils/showcaseChoreography';
import { useShowcaseStore } from '../store/useShowcaseStore';

interface RibbonConfig {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  speed: number;
  streakSpeed: number;
  streakColor: THREE.Color;
}

export function Ribbons() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const configs = useMemo<RibbonConfig[]>(
    () => [
      {
        radius: 2.35,
        tube: 0.032,
        tilt: [1.18, 0.25, -0.22],
        speed: 0.34,
        streakSpeed: 1.15,
        streakColor: new THREE.Color(1.4, 2.2, 2.5), // HDR cyan-white streak
      },
      {
        radius: 2.85,
        tube: 0.026,
        tilt: [1.38, -0.35, 0.32],
        speed: -0.26,
        streakSpeed: 0.9,
        streakColor: new THREE.Color(2.4, 1.0, 1.9), // HDR rose-pearl streak
      },
      {
        radius: 3.35,
        tube: 0.022,
        tilt: [1.02, 0.18, 0.45],
        speed: 0.2,
        streakSpeed: 1.4,
        streakColor: new THREE.Color(2.1, 1.85, 2.5), // HDR lilac-white streak
      },
    ],
    [],
  );

  const materials = useMemo(
    () =>
      configs.map(
        (cfg) =>
          new THREE.ShaderMaterial({
            uniforms: {
              uTime: { value: 0 },
              uSpeed: { value: cfg.streakSpeed },
              uStreakColor: { value: cfg.streakColor },
            },
            vertexShader: `
              varying vec2 vUv;
              varying vec3 vNormal;
              void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform float uTime;
              uniform float uSpeed;
              uniform vec3 uStreakColor;
              varying vec2 vUv;
              varying vec3 vNormal;

              void main() {
                float arc = fract(vUv.x - uTime * uSpeed * 0.22);
                float streak1 = smoothstep(0.0, 0.06, arc) * (1.0 - smoothstep(0.06, 0.26, arc));
                float arc2 = fract(vUv.x + 0.5 - uTime * uSpeed * 0.22);
                float streak2 = smoothstep(0.0, 0.05, arc2) * (1.0 - smoothstep(0.05, 0.22, arc2));
                float pulse = max(streak1, streak2);

                vec3 pearlBase = vec3(0.95, 0.92, 1.0) * 0.92;
                vec3 col = mix(pearlBase, uStreakColor, pulse);
                float alpha = 0.52 + pulse * 0.48;
                gl_FragColor = vec4(col, alpha);
              }
            `,
            transparent: true,
            depthWrite: false,
            toneMapped: false,
            side: THREE.DoubleSide,
          }),
      ),
    [configs],
  );

  useEffect(() => {
    return () => {
      materials.forEach((m) => m.dispose());
    };
  }, [materials]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.08);
    const store = useShowcaseStore.getState();
    const t = store.reducedMotion ? 0 : state.clock.elapsedTime;
    const camSample = sampleShowcaseCamera(store.scrollProgress);

    if (groupRef.current) {
      const isWide = typeof window !== 'undefined' && window.innerWidth >= 1024;
      const targetX = isWide ? -1.4 : 0;
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 3.5, dt);
      groupRef.current.rotation.y = store.cursorNdc[0] * 0.14;
      groupRef.current.rotation.x = store.cursorNdc[1] * 0.1;
    }

    configs.forEach((cfg, idx) => {
      const m = meshRefs.current[idx];
      if (m) {
        m.rotation.z += cfg.speed * camSample.ribbonSpeed * dt;
      }
      materials[idx].uniforms.uTime.value = t;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.42, 0]}>
      {configs.map((cfg, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            meshRefs.current[idx] = el;
          }}
          rotation={cfg.tilt}
          material={materials[idx]}
        >
          <torusGeometry args={[cfg.radius, cfg.tube, 18, 128]} />
        </mesh>
      ))}
    </group>
  );
}
