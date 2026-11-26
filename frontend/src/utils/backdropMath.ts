import { AuraThemeId, clamp01, lerp, smoothstep } from './scrollChoreography';

export const SAKHI_BACKDROP_URL = '/assets/aistudio/sanctuary_backdrop.jpg';

export const SAKHI_BACKDROP_DEFAULT_ASPECT = 2.04;

export interface CoverUvResult {
  scaleX: number;
  scaleY: number;
  focusX: number;
  focusY: number;
}

export interface BackdropMoodParams {
  zoom: number;
  sunBoost: number;
  waterShimmer: number;
  breezeStrength: number;
  tintHex: string;
  tintMix: number;
  vignetteStrength: number;
}

/**
 * Computes aspect-preserving `object-fit: cover` UV multipliers so the 4K
 * landscape texture fills 100% of any desktop, tablet, or portrait mobile
 * viewport without black margins or squashed proportions.
 */
export function computeCoverUvScale(
  viewportAspect: number,
  imageAspect: number,
  zoom = 1.07,
): CoverUvResult {
  const safeVp = Number.isFinite(viewportAspect) && viewportAspect > 0.05 ? viewportAspect : 1.6;
  const safeImg =
    Number.isFinite(imageAspect) && imageAspect > 0.05
      ? imageAspect
      : SAKHI_BACKDROP_DEFAULT_ASPECT;
  const safeZoom = Math.max(1.02, Number.isFinite(zoom) ? zoom : 1.07);

  let scaleX = 1 / safeZoom;
  let scaleY = 1 / safeZoom;

  if (safeVp > safeImg) {
    // Viewport wider than artwork: fit width, crop top/bottom proportionally
    scaleY = (safeImg / safeVp) / safeZoom;
  } else {
    // Viewport narrower/taller than artwork: fit height, crop sides proportionally
    scaleX = (safeVp / safeImg) / safeZoom;
  }

  // On portrait mobile screens, subtly frame the sunlit valley & river center
  const portraitBlend = clamp01((1.0 - safeVp) / 0.55);
  const focusX = lerp(0.5, 0.545, portraitBlend);
  const focusY = lerp(0.5, 0.51, portraitBlend);

  return { scaleX, scaleY, focusX, focusY };
}

/**
 * Derives living 4D backdrop camera-zoom, sun-bloom, water shimmer, and aura
 * temperature from scroll progress, gate portal energy, and active mood theme.
 */
export function evaluateBackdropParams(
  scrollProgress: number,
  gatePulse: number,
  auraTheme: AuraThemeId,
): BackdropMoodParams {
  const p = clamp01(scrollProgress);
  const pulse = clamp01(gatePulse);

  // Smooth zoom deeper toward the valley horizon across scroll + portal surge
  const zoom = 1.07 + smoothstep(0.0, 0.92, p) * 0.21 + pulse * 0.075;
  const sunBoost = 0.28 + smoothstep(0.18, 0.92, p) * 0.44 + pulse * 0.55;
  const waterShimmer = 0.42 + (1 - smoothstep(0.55, 0.95, p)) * 0.24 + pulse * 0.22;
  const breezeStrength = 0.48 + smoothstep(0.1, 0.7, p) * 0.25;

  let tintHex = '#ffdbe9';
  let tintMix = 0.08;
  let vignetteStrength = 0.16;

  if (auraTheme === 'lavender-dream') {
    tintHex = '#d5bfff';
    tintMix = 0.19;
    vignetteStrength = 0.2;
  } else if (auraTheme === 'celestial-pearl') {
    tintHex = '#fff5fa';
    tintMix = 0.16;
    vignetteStrength = 0.11;
  }

  return {
    zoom,
    sunBoost,
    waterShimmer,
    breezeStrength,
    tintHex,
    tintMix,
    vignetteStrength,
  };
}
