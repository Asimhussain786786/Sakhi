import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { SAKHI_BACKDROP_URL, computeCoverUvScale } from '../utils/backdropMath';
import { useShowcaseStore } from '../store/useShowcaseStore';

const _rayTintA = new THREE.Color('#ffb48a');
const _rayTintB = new THREE.Color('#ff5ca8');

export function Plate() {
  const { size, gl } = useThree();
  const markReady = useShowcaseStore((s) => s.markReady);
  const setPreloadProgress = useShowcaseStore((s) => s.setPreloadProgress);

  const imageAspectRef = useRef(2.04);
  const loadedRef = useRef(false);
  const loadedMixRef = useRef(0);
  const pointerSmooth = useRef(new THREE.Vector2(0, 0));

  const fallbackTex = useMemo(() => {
    const tex = new THREE.DataTexture(new Uint8Array([24, 14, 48, 255]), 1, 1, THREE.RGBAFormat);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  const plateMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: fallbackTex },
          uLoaded: { value: 0 },
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uCoverScale: { value: new THREE.Vector2(0.75, 0.93) },
          uFocus: { value: new THREE.Vector2(0.5, 0.5) },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.99998, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uLoaded;
          uniform float uTime;
          uniform float uScroll;
          uniform vec2 uPointer;
          uniform vec2 uCoverScale;
          uniform vec2 uFocus;
          varying vec2 vUv;

          float hash21(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          void main() {
            vec2 baseUv = (vUv - 0.5) * uCoverScale + uFocus;

            // Synthetic depth map driven by plate spatial layout (sky=far, canyon=mid, shrubs/river=near)
            float fgDepth = 1.0 - smoothstep(0.10, 0.72, baseUv.y);
            float archDepth = smoothstep(0.55, 0.95, baseUv.y) * 0.35;
            float depthMap = clamp(fgDepth + archDepth, 0.0, 1.0);

            // 4D Depth-map parallax displacement driven by mouse + scroll
            vec2 scrollPan = vec2(sin(uScroll * 3.14159) * 0.018, (uScroll - 0.5) * 0.022);
            vec2 parallaxUv = baseUv - uPointer * mix(0.012, 0.048, depthMap) - scrollPan * (0.4 + depthMap * 0.6);

            // Subtle organic shimmer along river terrace & breeze along foreground shrubs
            float waterMask = smoothstep(0.04, 0.16, baseUv.y) * (1.0 - smoothstep(0.32, 0.45, baseUv.y))
                            * (1.0 - smoothstep(0.08, 0.25, abs(baseUv.x - mix(0.44, 0.56, baseUv.y))));
            float wave = sin(baseUv.y * 92.0 - uTime * 2.1 + baseUv.x * 22.0);
            parallaxUv.x += wave * 0.0014 * waterMask;

            vec2 safeUv = clamp(parallaxUv, vec2(0.002), vec2(0.998));
            vec3 rawTex = texture2D(uTexture, safeUv).rgb;

            // LUMINOUS DUSK TWILIGHT GRADE:
            // Deepen ambient sky into plum-violet twilight so glowing objects, petals, & sun highlights pop
            float lum = dot(rawTex, vec3(0.2126, 0.7152, 0.0722));
            vec3 shadowPlum = vec3(0.055, 0.022, 0.125); // lifted plum #120A24..#1B0F33 in linear space
            vec3 midPlum = vec3(0.14, 0.06, 0.28);

            // Contrast +12%, Saturation +18% with soft highlight rolloff so sky arch stays twilight coral-plum
            vec3 satColor = mix(vec3(lum), rawTex, 1.18);
            vec3 graded = mix(shadowPlum, satColor, smoothstep(0.12, 0.96, lum));
            graded = (graded - 0.18) * 1.12 + 0.18;
            graded = graded / (1.0 + max(vec3(0.0), graded - 0.58) * 0.75);
            graded = max(graded, shadowPlum * 0.85);

            // Preserve top-right peach-coral arch glow & canyon sunset warmth
            float archSunMask = exp(-distance(safeUv, vec2(0.60, 0.69)) * 3.8);
            graded += vec3(0.88, 0.38, 0.36) * archSunMask * 0.28;
            // Deepen foreground dusk contrast with rich indigo-plum tint
            graded = mix(graded, midPlum * 1.25 + graded * 0.62, fgDepth * 0.36);

            // River caustic bioluminescent glint
            float caustic = pow(max(0.0, sin(baseUv.y * 110.0 - uTime * 2.5) * cos(baseUv.x * 84.0 + uTime * 1.8)), 3.0);
            graded += vec3(0.20, 0.90, 0.82) * caustic * waterMask * 0.22;

            // Plate Glint Shader: sparkle mask on luminance > 0.85 -> 4-point star flares 0.8-2.5 Hz
            vec2 sparkleGrid = floor(safeUv * vec2(900.0, 500.0));
            vec2 sparkleCell = fract(safeUv * vec2(900.0, 500.0)) - 0.5;
            float cellHash = hash21(sparkleGrid);
            float highLumMask = smoothstep(0.78, 0.95, lum);
            float twinkleFreq = 0.8 + cellHash * 1.7;
            float twinkle = pow(max(0.0, sin(uTime * twinkleFreq * 6.28318 + cellHash * 42.0)), 6.0);
            float starCross = exp(-abs(sparkleCell.x) * 14.0) * exp(-abs(sparkleCell.y) * 3.2)
                            + exp(-abs(sparkleCell.y) * 14.0) * exp(-abs(sparkleCell.x) * 3.2);
            float isGlintCell = step(0.972, cellHash);
            graded += vec3(1.25, 1.05, 1.35) * starCross * twinkle * highLumMask * isGlintCell * 1.35;

            // Soft dusk vignette (0.35 strength)
            float vig = smoothstep(0.42, 0.98, distance(vUv, vec2(0.5))) * 0.35;
            graded = mix(graded, shadowPlum * 0.65, vig);

            vec3 finalCol = mix(shadowPlum, graded, uLoaded);
            gl_FragColor = vec4(finalCol, 1.0);
          }
        `,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    [fallbackTex],
  );

  // Subtle volumetric god-rays drifting from top-right peach-coral arch
  const godRayMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTintA: { value: _rayTintA },
          uTintB: { value: _rayTintB },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uTintA;
          uniform vec3 uTintB;
          varying vec2 vUv;
          void main() {
            float beam = pow(max(0.0, sin(vUv.x * 3.14159265)), 2.2);
            float fade = smoothstep(0.0, 0.45, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
            float shimmer = 0.68 + 0.32 * sin(uTime * 0.55 + vUv.x * 5.0);
            vec3 col = mix(uTintA, uTintB, vUv.y * 0.65);
            float alpha = beam * fade * shimmer * 0.14;
            if (alpha < 0.004) discard;
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useEffect(() => {
    setPreloadProgress(45);
    let active = true;
    const loader = new THREE.TextureLoader();
    let loadedTex: THREE.Texture | null = null;

    loader.load(
      SAKHI_BACKDROP_URL,
      (tex) => {
        if (!active) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = Math.min(8, Math.max(1, gl.capabilities.getMaxAnisotropy()));
        tex.needsUpdate = true;

        const img = tex.image as { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number } | undefined;
        const w = img?.naturalWidth || img?.width || 0;
        const h = img?.naturalHeight || img?.height || 0;
        if (w > 0 && h > 0) {
          imageAspectRef.current = w / h;
        }

        loadedTex = tex;
        plateMaterial.uniforms.uTexture.value = tex;
        loadedRef.current = true;
        setPreloadProgress(100);
        window.setTimeout(() => {
          if (active) markReady();
        }, 120);
      },
      undefined,
      () => {
        if (active) {
          setPreloadProgress(100);
          markReady();
        }
      },
    );

    return () => {
      active = false;
      loadedTex?.dispose();
      fallbackTex.dispose();
      plateMaterial.dispose();
      godRayMaterial.dispose();
    };
  }, [fallbackTex, gl, godRayMaterial, markReady, plateMaterial, setPreloadProgress]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.08);
    const store = useShowcaseStore.getState();
    const reduced = store.reducedMotion;

    if (loadedRef.current) {
      loadedMixRef.current = reduced
        ? 1
        : THREE.MathUtils.damp(loadedMixRef.current, 1, 6.5, dt);
    }

    pointerSmooth.current.x = THREE.MathUtils.damp(
      pointerSmooth.current.x,
      reduced ? 0 : store.cursorNdc[0],
      5.5,
      dt,
    );
    pointerSmooth.current.y = THREE.MathUtils.damp(
      pointerSmooth.current.y,
      reduced ? 0 : store.cursorNdc[1],
      5.5,
      dt,
    );

    const vpAspect = size.width / Math.max(1, size.height);
    const zoom = 1.07 + store.scrollProgress * 0.14;
    const cover = computeCoverUvScale(vpAspect, imageAspectRef.current, zoom);

    plateMaterial.uniforms.uLoaded.value = loadedMixRef.current;
    plateMaterial.uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
    plateMaterial.uniforms.uScroll.value = store.scrollProgress;
    plateMaterial.uniforms.uPointer.value.copy(pointerSmooth.current);
    plateMaterial.uniforms.uCoverScale.value.set(cover.scaleX, cover.scaleY);
    plateMaterial.uniforms.uFocus.value.set(cover.focusX, cover.focusY);

    godRayMaterial.uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
  });

  return (
    <group>
      <mesh renderOrder={-100} frustumCulled={false} material={plateMaterial}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      {/* Top-right peach-coral arch volumetric god-ray shafts */}
      <mesh position={[3.8, 3.6, -6.5]} rotation={[0, 0, -0.52]} material={godRayMaterial}>
        <planeGeometry args={[4.4, 15]} />
      </mesh>
      <mesh position={[5.6, 2.9, -5.8]} rotation={[0, 0, -0.34]} material={godRayMaterial}>
        <planeGeometry args={[3.4, 14]} />
      </mesh>
    </group>
  );
}
