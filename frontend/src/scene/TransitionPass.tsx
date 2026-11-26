import { forwardRef, useMemo } from 'react';
import * as THREE from 'three';
import { Effect } from 'postprocessing';
import { evaluateTransitionEnvelope } from '../utils/showcaseChoreography';
import { useShowcaseStore } from '../store/useShowcaseStore';

const transitionFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uType;
  uniform float uProgress;
  uniform float uIntensity;
  uniform float uFlash;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 col = inputColor.rgb;
    if (uType < 0.5 || uIntensity < 0.005) {
      outputColor = inputColor;
      return;
    }

    // Type 1: PETAL WIPE (left -> right scalloped petal edge + bloom flash)
    if (uType < 1.5) {
      float scallop = sin(uv.y * 18.0 + uTime * 3.0) * 0.045 + noise2(uv * 10.0) * 0.04;
      float front = uProgress * 1.15 - 0.08 + scallop;
      float band = exp(-pow((uv.x - front) * 14.0, 2.0)) * uIntensity;
      vec3 roseGlow = vec3(1.0, 0.42, 0.72) * 1.45;
      col += roseGlow * band * 0.65;
      col += vec3(1.0, 0.85, 0.96) * uFlash * 0.24;
    }
    // Type 2: BLOOM IRIS (radial iris expanding from center lotus with neon-violet ring)
    else if (uType < 2.5) {
      vec2 centered = uv - vec2(0.5);
      centered.x *= resolution.x / max(1.0, resolution.y);
      float dist = length(centered);
      float radius = uIntensity * 0.78;
      float ring = exp(-pow((dist - radius) * 18.0, 2.0)) * uIntensity;
      vec3 neonViolet = vec3(0.62, 0.30, 1.25);
      vec3 pinkEdge = vec3(1.15, 0.42, 0.86);
      col += mix(neonViolet, pinkEdge, 0.5 + 0.5 * sin(uv.x * 8.0 + uTime)) * ring * 0.85;
    }
    // Type 3: SHIMMER DISSOLVE (noise dissolve front + additive 4-point star sparkles)
    else {
      float n = noise2(uv * 22.0 + vec2(uTime * 0.4, 0.0));
      float front = exp(-pow((n - (0.5 + (uProgress - 0.5) * 0.8)) * 9.0, 2.0)) * uIntensity;
      vec2 grid = floor(uv * vec2(160.0, 90.0));
      vec2 cell = fract(uv * vec2(160.0, 90.0)) - 0.5;
      float h = hash21(grid);
      float star = (exp(-abs(cell.x) * 14.0) * exp(-abs(cell.y) * 3.5)
                 + exp(-abs(cell.y) * 14.0) * exp(-abs(cell.x) * 3.5)) * step(0.86, h);
      vec3 cyanSpark = mix(vec3(0.49, 0.98, 1.0), vec3(1.0, 0.62, 0.86), h);
      col += cyanSpark * (front * 0.42 + star * front * 1.9);
    }

    outputColor = vec4(col, inputColor.a);
  }
`;

class SakhiTransitionEffectImpl extends Effect {
  constructor() {
    super('SakhiTransitionEffect', transitionFragmentShader, {
      uniforms: new Map<string, THREE.Uniform<number>>([
        ['uTime', new THREE.Uniform(0)],
        ['uType', new THREE.Uniform(0)],
        ['uProgress', new THREE.Uniform(0)],
        ['uIntensity', new THREE.Uniform(0)],
        ['uFlash', new THREE.Uniform(0)],
      ]),
    });
  }

  update(_renderer: THREE.WebGLRenderer, _inputBuffer: THREE.WebGLRenderTarget, deltaTime = 0.016) {
    const store = useShowcaseStore.getState();
    const tUniform = this.uniforms.get('uTime');
    if (tUniform) tUniform.value += deltaTime;

    if (store.reducedMotion) {
      this.uniforms.get('uType')!.value = 0;
      this.uniforms.get('uIntensity')!.value = 0;
      return;
    }

    const env = evaluateTransitionEnvelope(
      store.scrollProgress,
      performance.now() < store.stormBoostUntil,
    );
    this.uniforms.get('uType')!.value = env.type;
    this.uniforms.get('uProgress')!.value = env.progress;
    this.uniforms.get('uIntensity')!.value = env.intensity;
    this.uniforms.get('uFlash')!.value = env.bloomFlash;
  }
}

export const TransitionPass = forwardRef<SakhiTransitionEffectImpl>(function TransitionPass(
  _props,
  ref,
) {
  const effect = useMemo(() => new SakhiTransitionEffectImpl(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
