import { AuthMode } from './authLogic';

export type GatePhase = 'welcome' | 'entering' | 'auth';

export interface GateVisualState {
  /** 0..1 soft energy pulse peaking mid-transition */
  energyPulse: number;
  /** 0..1 outward radial expansion of surrounding 3D spheres/crystals */
  objectExpansion: number;
  /** 0..1 camera subtle forward dive during portal entry */
  cameraDive: number;
  /** 0..1 expanding pink & lavender light wave progress */
  lightWaveProgress: number;
  /** 0..1 Endgame-snap stardust disintegration curve for welcome UI */
  snapDissolveProgress: number;
  /** 0..1 emergence progress for the dedicated signup/auth interface */
  portalEmergeProgress: number;
}

export function resolveRouteState(pathname: string): {
  phase: GatePhase;
  authMode: AuthMode;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/signup') {
    return { phase: 'auth', authMode: 'signup' };
  }
  if (clean === '/signin') {
    return { phase: 'auth', authMode: 'signin' };
  }
  if (clean === '/forgot-password') {
    return { phase: 'auth', authMode: 'forgot' };
  }
  return { phase: 'welcome', authMode: 'signup' };
}

export function routePathForAuthMode(mode: AuthMode): string {
  if (mode === 'signup') return '/signup';
  if (mode === 'forgot') return '/forgot-password';
  return '/signin';
}

/**
 * Pure deterministic curve mapping normalized transition progress t in [0..1]
 * to 3D energy pulse, outward object expansion, camera forward dive, snap dissolve, and light wave.
 */
export function evaluateGateTransition(tRaw: number): GateVisualState {
  const t = Math.max(0, Math.min(1, Number.isNaN(tRaw) ? 0 : tRaw));
  // Smooth bell curve peaking at t = 0.45 for the energy pulse
  const energyPulse = Math.sin(Math.pow(t, 0.85) * Math.PI);
  // Objects sweep outward smoothly and gently settle slightly wider in auth state
  const expansionCurve = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const objectExpansion = expansionCurve * 0.85 + Math.sin(t * Math.PI) * 0.35;
  // Subtle camera forward dive peaking around t = 0.6, settling gently closer (+0.45)
  const cameraDive = Math.sin(t * Math.PI) * 0.85 + expansionCurve * 0.42;
  // Light wave expands across screen in first 85% of transition
  const lightWaveProgress = Math.min(1, t / 0.85);
  // Endgame-snap disintegration runs swiftly over t in [0 .. 0.68]
  const snapDissolveProgress = Math.min(1, t / 0.68);
  // Signup portal emerges smoothly over t in [0.58 .. 1.0]
  const portalEmergeProgress = Math.max(0, Math.min(1, (t - 0.58) / 0.42));

  return {
    energyPulse,
    objectExpansion,
    cameraDive,
    lightWaveProgress,
    snapDissolveProgress,
    portalEmergeProgress,
  };
}
