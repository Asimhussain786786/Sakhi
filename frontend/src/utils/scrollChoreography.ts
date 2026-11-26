export type AuraThemeId = 'rose-dawn' | 'lavender-dream' | 'celestial-pearl';

export interface AuraThemePalette {
  id: AuraThemeId;
  label: string;
  swatch: string;
  bgStart: string;
  bgMid: string;
  bgEnd: string;
  fogStart: string;
  fogMid: string;
  fogEnd: string;
  rimHex: string;
  fillHex: string;
  veilTintA: string;
  veilTintB: string;
}

export const AURA_THEMES: Record<AuraThemeId, AuraThemePalette> = {
  'rose-dawn': {
    id: 'rose-dawn',
    label: 'Rose Dawn',
    swatch: '#f4a8cc',
    bgStart: '#FCEBF3',
    bgMid: '#EFE1FA',
    bgEnd: '#E5D3F8',
    fogStart: '#F9E4F0',
    fogMid: '#EADBF9',
    fogEnd: '#DEC9F6',
    rimHex: '#c6afff',
    fillHex: '#ffb7d9',
    veilTintA: '#f8b7d8',
    veilTintB: '#ccb3ff',
  },
  'lavender-dream': {
    id: 'lavender-dream',
    label: 'Lavender Dream',
    swatch: '#bfa3ff',
    bgStart: '#F2E8FC',
    bgMid: '#E6D9FB',
    bgEnd: '#D9C7F8',
    fogStart: '#ECE0FA',
    fogMid: '#DFD0F8',
    fogEnd: '#D1BEF5',
    rimHex: '#b394ff',
    fillHex: '#e7b3f5',
    veilTintA: '#cbb0ff',
    veilTintB: '#f2b8de',
  },
  'celestial-pearl': {
    id: 'celestial-pearl',
    label: 'Celestial Pearl',
    swatch: '#f5dce9',
    bgStart: '#FDF5FA',
    bgMid: '#F5EAFC',
    bgEnd: '#EDE2FB',
    fogStart: '#FAF0F7',
    fogMid: '#F1E6FA',
    fogEnd: '#E7D8F8',
    rimHex: '#d5c2ff',
    fillHex: '#ffd1e8',
    veilTintA: '#fff4fa',
    veilTintB: '#dfc9ff',
  },
};

export function getAuraTheme(id: AuraThemeId): AuraThemePalette {
  return AURA_THEMES[id] ?? AURA_THEMES['rose-dawn'];
}

export interface ScrollChoreographyState {
  progress: number;
  chapter: 0 | 1 | 2 | 3;
  phaseNumber: 1 | 2 | 3 | 4;
  phaseLabel: string;
  flowerBloom: number;
  particleVisibility: number;
  particleMorph: number;
  panelReveal: number;
  sculptureGlow: number;
  veilIntensity: number;
  rayIntensity: number;
  cloudDensity: number;
  finaleReveal: number;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  cameraRoll: number;
  /** 0 = soft pastel pink, 0.5 = lavender, 1 = luminous lilac-violet */
  paletteMix: number;
  bgHex: string;
  fogHex: string;
}

export interface LivingCameraOffset {
  driftX: number;
  driftY: number;
  driftZ: number;
  lookX: number;
  lookY: number;
  roll: number;
}

export function clamp01(v: number): number {
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp01(t);
}

function lerpHex(hexA: string, hexB: string, t: number): string {
  const u = clamp01(t);
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const rA = (a >> 16) & 255;
  const gA = (a >> 8) & 255;
  const bA = a & 255;
  const rB = (b >> 16) & 255;
  const gB = (b >> 8) & 255;
  const bB = b & 255;
  const r = Math.round(rA + (rB - rA) * u);
  const g = Math.round(gA + (gB - gA) * u);
  const bl = Math.round(bA + (bB - bA) * u);
  return `#${((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)}`;
}

/**
 * Computes subtle continuous ambient camera drift + depth parallax so the
 * universe feels alive even when the user pauses scrolling.
 */
export function evaluateLivingCameraMotion(
  time: number,
  pointerX: number,
  pointerY: number,
  ambientEnabled = true,
  reducedMotion = false,
): LivingCameraOffset {
  const px = Math.max(-1, Math.min(1, Number.isNaN(pointerX) ? 0 : pointerX));
  const py = Math.max(-1, Math.min(1, Number.isNaN(pointerY) ? 0 : pointerY));

  if (reducedMotion || !ambientEnabled) {
    return {
      driftX: px * 0.25,
      driftY: py * 0.16,
      driftZ: 0,
      lookX: px * 0.1,
      lookY: py * 0.08,
      roll: 0,
    };
  }

  return {
    driftX: Math.sin(time * 0.21) * 0.24 + Math.cos(time * 0.13) * 0.09 + px * 0.56,
    driftY: Math.cos(time * 0.17) * 0.15 + Math.sin(time * 0.11) * 0.06 + py * 0.34,
    driftZ: Math.sin(time * 0.16) * 0.26,
    lookX: Math.sin(time * 0.14) * 0.1 + px * 0.18,
    lookY: Math.cos(time * 0.12) * 0.07 + py * 0.12,
    roll: Math.sin(time * 0.15) * 0.018 - px * 0.014,
  };
}

/**
 * Maps normalized document scroll progress [0..1] to deterministic 4D camera,
 * flower bloom, silk veils, volumetric rays, particle morph, and theme colors.
 */
export function evaluateScrollChoreography(
  rawProgress: number,
  isCompactViewport = false,
  auraThemeId: AuraThemeId = 'rose-dawn',
): ScrollChoreographyState {
  const p = clamp01(rawProgress);
  const theme = getAuraTheme(auraThemeId);

  let chapter: 0 | 1 | 2 | 3 = 0;
  if (p >= 0.72) chapter = 3;
  else if (p >= 0.44) chapter = 2;
  else if (p >= 0.16) chapter = 1;

  let phaseNumber: 1 | 2 | 3 | 4 = 1;
  let phaseLabel = 'The Awakening';
  if (p >= 0.72) {
    phaseNumber = 4;
    phaseLabel = 'Cinematic Finale';
  } else if (p >= 0.46) {
    phaseNumber = 3;
    phaseLabel = 'Immersive World';
  } else if (p >= 0.18) {
    phaseNumber = 2;
    phaseLabel = 'Transformation';
  }

  // Phase 01–02 opens petals from resting bud (0.28) to full radiant bloom (1.0)
  const flowerBloom = lerp(0.28, 1.0, smoothstep(0.06, 0.38, p));

  // Floating particles brighten across scroll phases
  const particleVisibility = lerp(0.62, 1.0, smoothstep(0.05, 0.35, p));

  // Phase 02–03 translucent panels emerge from depth between 0.36 and 0.68, then recede cleanly
  const panelEnter = smoothstep(0.36, 0.5, p);
  const panelExit = 1 - smoothstep(0.64, 0.76, p);
  const panelReveal = clamp01(panelEnter * panelExit);

  // Phase 04 particles coalesce into feminine abstract sculpture from 0.66 -> 0.90
  const particleMorph = smoothstep(0.66, 0.9, p);
  const sculptureGlow = smoothstep(0.72, 0.95, p);

  // 4D Atmospheric Layers: silk veils, volumetric rays & ethereal clouds swell in Phases 02–04
  const veilIntensity = lerp(0.68, 1.0, smoothstep(0.08, 0.55, p));
  const rayIntensity = lerp(0.56, 1.0, smoothstep(0.05, 0.68, p));
  const cloudDensity = lerp(0.55, 0.95, smoothstep(0.1, 0.75, p));
  const finaleReveal = smoothstep(0.74, 0.96, p);

  // Continuous cinematic camera travel through silk layers & into the finale composition
  const heroOffsetX = isCompactViewport ? 0 : 1.45;
  const heroCentering = 1 - smoothstep(0.0, 0.24, p);

  const camZ =
    p < 0.55
      ? lerp(8.4, 4.45, smoothstep(0.0, 0.52, p))
      : lerp(4.45, 7.35, smoothstep(0.55, 0.92, p));

  const camY =
    p < 0.5
      ? lerp(0.35, 0.72, smoothstep(0.0, 0.45, p))
      : lerp(0.72, 0.44, smoothstep(0.5, 0.95, p));

  const camX =
    lerp(heroOffsetX * 0.4, 0, 1 - heroCentering) + Math.sin(p * Math.PI * 1.45) * 0.42;
  const targetX = heroOffsetX * heroCentering;
  const targetY = lerp(0.05, 0.28, smoothstep(0.6, 0.95, p));
  const cameraRoll = Math.sin(p * Math.PI * 2.0) * 0.025;

  // Palette shifts from theme start -> mid -> end across journey
  const paletteMix = smoothstep(0.08, 0.88, p);
  const bgHex =
    paletteMix < 0.5
      ? lerpHex(theme.bgStart, theme.bgMid, paletteMix * 2)
      : lerpHex(theme.bgMid, theme.bgEnd, (paletteMix - 0.5) * 2);

  const fogHex =
    paletteMix < 0.5
      ? lerpHex(theme.fogStart, theme.fogMid, paletteMix * 2)
      : lerpHex(theme.fogMid, theme.fogEnd, (paletteMix - 0.5) * 2);

  return {
    progress: p,
    chapter,
    phaseNumber,
    phaseLabel,
    flowerBloom,
    particleVisibility,
    particleMorph,
    panelReveal,
    sculptureGlow,
    veilIntensity,
    rayIntensity,
    cloudDensity,
    finaleReveal,
    cameraPos: [camX, camY, camZ],
    cameraTarget: [targetX, targetY, 0],
    cameraRoll,
    paletteMix,
    bgHex,
    fogHex,
  };
}

