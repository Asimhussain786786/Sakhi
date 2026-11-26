import * as THREE from 'three';
import { ChapterIndex, QualityTier, TransitionKind } from '../store/useShowcaseStore';

export interface QualityBudget {
  tier: QualityTier;
  petalCount: number;
  sporeCount: number;
  starSpriteCount: number;
  jellyCount: number;
  floraCount: number;
  plateTierLabel: '4K' | '2560' | '1920';
  bloomSamples: number;
  enableDof: boolean;
}

export interface TransitionEnvelope {
  type: TransitionKind;
  progress: number; // 0..1 across transition window
  intensity: number; // bell envelope 0..1 peaking at midpoint
  bloomFlash: number; // 0..1 short flash peak
  windMultiplier: number; // 1..3 during transition storm surge
}

export interface ShowcaseCameraSample {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  lotusBloom: number; // 0 (closed Ch.1) -> 1 (fully open Ch.4)
  ribbonSpeed: number;
  petalStormMix: number;
}

function clamp01(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp01(t);
}

// Continuous Catmull-Rom 3D camera keyframes across the 4 chapters
const CAMERA_POS_SPLINE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0.0, 0.9, 10.6), // Ch.01 Welcome: wide shot, closed lotus centered
    new THREE.Vector3(-1.35, 0.35, 8.2), // 1->2 transition dive
    new THREE.Vector3(-2.15, 0.12, 6.0), // Ch.02 Your World: low glide along glowing path & flora
    new THREE.Vector3(0.6, 1.35, 5.2), // 2->3 bloom iris rise
    new THREE.Vector3(2.5, 2.3, 6.5), // Ch.03 Possibilities: high orbit around crystals & ribbons
    new THREE.Vector3(1.1, 1.45, 9.0), // 3->4 shimmer dissolve pull-back
    new THREE.Vector3(0.0, 0.65, 11.15), // Ch.04 Cinematic Finale: screenshot framing
  ],
  false,
  'catmullrom',
  0.45,
);

const CAMERA_TARGET_SPLINE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0.0, 0.55, 0.0),
    new THREE.Vector3(-0.35, 0.25, 0.6),
    new THREE.Vector3(0.25, 0.15, 0.4),
    new THREE.Vector3(0.0, 0.65, 0.0),
    new THREE.Vector3(0.0, 0.85, 0.0),
    new THREE.Vector3(0.0, 0.65, 0.0),
    new THREE.Vector3(0.0, 0.55, 0.0),
  ],
  false,
  'catmullrom',
  0.45,
);

const _tmpPos = new THREE.Vector3();
const _tmpTarget = new THREE.Vector3();

/**
 * Evaluates continuous Catmull-Rom camera position, lookAt target, lotus bloom,
 * and storm energy for normalized scroll progress [0..1].
 */
export function sampleShowcaseCamera(rawProgress: number): ShowcaseCameraSample {
  const p = clamp01(rawProgress);
  CAMERA_POS_SPLINE.getPointAt(p, _tmpPos);
  CAMERA_TARGET_SPLINE.getPointAt(p, _tmpTarget);

  const lotusBloom = lerp(0.06, 1.0, smoothstep(0.08, 0.94, p));
  const ribbonSpeed = lerp(0.55, 1.45, smoothstep(0.2, 0.95, p));
  const fov = lerp(42, 46, Math.sin(p * Math.PI) * 0.65);
  const petalStormMix = smoothstep(0.65, 1.0, p);

  return {
    position: [_tmpPos.x, _tmpPos.y, _tmpPos.z],
    target: [_tmpTarget.x, _tmpTarget.y, _tmpTarget.z],
    fov,
    lotusBloom,
    ribbonSpeed,
    petalStormMix,
  };
}

/**
 * Computes custom WebGL TransitionPass uniforms & petal storm spike around the
 * three chapter boundaries (1->2 Petal Wipe, 2->3 Bloom Iris, 3->4 Shimmer Dissolve).
 */
export function evaluateTransitionEnvelope(
  rawProgress: number,
  stormBoostActive = false,
): TransitionEnvelope {
  const p = clamp01(rawProgress);

  const windows: Array<{ center: number; halfWidth: number; type: TransitionKind }> = [
    { center: 1 / 6, halfWidth: 0.085, type: 1 }, // 1->2 Petal Wipe
    { center: 0.5, halfWidth: 0.085, type: 2 }, // 2->3 Bloom Iris
    { center: 5 / 6, halfWidth: 0.085, type: 3 }, // 3->4 Shimmer Dissolve
  ];

  for (const w of windows) {
    const dist = Math.abs(p - w.center);
    if (dist <= w.halfWidth) {
      const progress = clamp01((p - (w.center - w.halfWidth)) / (w.halfWidth * 2));
      const intensity = Math.sin(progress * Math.PI);
      const bloomFlash = w.type === 1 ? Math.pow(intensity, 2.5) : 0;
      const windMultiplier = 1 + intensity * 2.0;
      return {
        type: w.type,
        progress,
        intensity,
        bloomFlash,
        windMultiplier: stormBoostActive ? Math.max(windMultiplier, 3.0) : windMultiplier,
      };
    }
  }

  return {
    type: 0,
    progress: 0,
    intensity: 0,
    bloomFlash: 0,
    windMultiplier: stormBoostActive ? 3.0 : 1.0,
  };
}

/**
 * Returns chapter index (0..3) and snap target progress from current scroll.
 */
export function resolveChapterFromProgress(rawProgress: number): ChapterIndex {
  const p = clamp01(rawProgress);
  if (p >= 5 / 6) return 3;
  if (p >= 0.5) return 2;
  if (p >= 1 / 6) return 1;
  return 0;
}

/**
 * Quality budgets calibrated by detect-gpu tier and viewport width:
 * Desktop 900 petals, Tablet 450, Mobile 180.
 */
export function getQualityBudget(
  tier: QualityTier,
  viewportWidth: number,
  isSoftwareGl: boolean,
): QualityBudget {
  let petalCount = 900;
  if (viewportWidth < 640 || tier === 'low') {
    petalCount = 180;
  } else if (viewportWidth < 1100 || tier === 'mid') {
    petalCount = 450;
  }

  const sporeCount = tier === 'low' ? 650 : tier === 'mid' ? 1100 : 1500;
  const starSpriteCount = tier === 'low' ? 140 : tier === 'mid' ? 220 : 300;
  const jellyCount = tier === 'low' ? 6 : tier === 'mid' ? 7 : 9;
  const floraCount = tier === 'low' ? 40 : tier === 'mid' ? 48 : 56;
  const plateTierLabel = tier === 'high' ? '4K' : tier === 'mid' ? '2560' : '1920';

  return {
    tier,
    petalCount,
    sporeCount,
    starSpriteCount,
    jellyCount,
    floraCount,
    plateTierLabel,
    bloomSamples: isSoftwareGl ? 2 : tier === 'high' ? 8 : 5,
    enableDof: !isSoftwareGl && tier === 'high',
  };
}
