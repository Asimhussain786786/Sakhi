import { useMemo } from 'react';
import * as THREE from 'three';
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  SMAA,
  ToneMapping,
  Vignette,
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { getQualityBudget } from '../utils/showcaseChoreography';
import { useShowcaseStore } from '../store/useShowcaseStore';
import { TransitionPass } from './TransitionPass';

export function PostFX() {
  const qualityTier = useShowcaseStore((s) => s.qualityTier);
  const isSoftwareGl = useShowcaseStore((s) => s.isSoftwareGl);

  const budget = useMemo(
    () =>
      getQualityBudget(
        qualityTier,
        typeof window !== 'undefined' ? window.innerWidth : 1440,
        isSoftwareGl,
      ),
    [isSoftwareGl, qualityTier],
  );

  const chromaOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0006), []);

  // On software WebGL (headless SwiftShader), keep a lean HDR Bloom + Transition + Vignette + ACES pass
  // and skip multi-pass DOF/SMAA so software rendering stays smooth and responsive.
  if (isSoftwareGl) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.85}
          intensity={1.35}
          radius={0.72}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.35} />
        <TransitionPass />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.85}
        intensity={1.5}
        radius={0.75}
        mipmapBlur
      />
      {budget.enableDof && (
        <DepthOfField
          focusDistance={0.08}
          focalLength={0.04}
          bokehScale={2}
        />
      )}
      <ChromaticAberration offset={chromaOffset} radialModulation={false} modulationOffset={0.15} />
      <Vignette eskil={false} offset={0.18} darkness={0.35} />
      <Noise opacity={0.025} />
      <SMAA />
      <TransitionPass />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
