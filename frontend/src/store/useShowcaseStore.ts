import { create } from 'zustand';

export type ChapterIndex = 0 | 1 | 2 | 3;
export type QualityTier = 'high' | 'mid' | 'low';
export type CardVariant = 'dark' | 'light';
export type TransitionKind = 0 | 1 | 2 | 3; // 0: none, 1: Petal Wipe, 2: Bloom Iris, 3: Shimmer Dissolve

export interface ChapterMeta {
  index: ChapterIndex;
  code: string;
  label: string;
  navLabel: string;
  centerProgress: number;
  summary: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    index: 0,
    code: '01',
    label: 'Welcome',
    navLabel: 'Welcome',
    centerProgress: 0,
    summary: 'Closed lotus awakening inside the twilight dreamscape.',
  },
  {
    index: 1,
    code: '02',
    label: 'Your World',
    navLabel: 'Your World',
    centerProgress: 1 / 3,
    summary: 'Low flight along the glowing path and bioluminescent flora.',
  },
  {
    index: 2,
    code: '03',
    label: 'Possibilities',
    navLabel: 'Possibilities',
    centerProgress: 2 / 3,
    summary: 'Rising orbit through amethyst crystals and ribbon rings.',
  },
  {
    index: 3,
    code: '04',
    label: 'Cinematic Finale',
    navLabel: 'Finale',
    centerProgress: 1,
    summary: 'Full bloom showcase with four sanctuary pillars and petal storm.',
  },
];

interface ShowcaseState {
  scrollProgress: number;
  activeChapter: ChapterIndex;
  scrollVelocity: number;
  cursorNdc: [number, number];
  cursorVelocity: [number, number];
  hoveredOrbIndex: number | null;
  hoveredCardIndex: number | null;
  stormBoostUntil: number;
  qualityTier: QualityTier;
  isSoftwareGl: boolean;
  dpr: number;
  cardVariant: CardVariant;
  preloadProgress: number;
  isReady: boolean;
  reducedMotion: boolean;
  hudOpen: boolean;
  authOpen: boolean;
  webglFailed: boolean;
  tabVisible: boolean;

  setScrollState: (progress: number, velocity?: number) => void;
  setActiveChapter: (chapter: ChapterIndex) => void;
  setCursor: (ndcX: number, ndcY: number, vx: number, vy: number) => void;
  setHoveredOrb: (idx: number | null) => void;
  setHoveredCard: (idx: number | null) => void;
  triggerPetalStorm: (durationMs?: number) => void;
  setQualityInfo: (tier: QualityTier, isSoftwareGl: boolean) => void;
  setDpr: (dpr: number) => void;
  toggleCardVariant: () => void;
  setPreloadProgress: (pct: number) => void;
  markReady: () => void;
  setReducedMotion: (v: boolean) => void;
  setHudOpen: (open: boolean) => void;
  setAuthOpen: (open: boolean) => void;
  setWebglFailed: (failed: boolean) => void;
  setTabVisible: (visible: boolean) => void;
}

export const useShowcaseStore = create<ShowcaseState>((set) => ({
  scrollProgress: 0,
  activeChapter: 0,
  scrollVelocity: 0,
  cursorNdc: [0, 0],
  cursorVelocity: [0, 0],
  hoveredOrbIndex: null,
  hoveredCardIndex: null,
  stormBoostUntil: 0,
  qualityTier: 'high',
  isSoftwareGl: false,
  dpr: 1.5,
  cardVariant: 'dark',
  preloadProgress: 12,
  isReady: false,
  reducedMotion: false,
  hudOpen: false,
  authOpen: false,
  webglFailed: false,
  tabVisible: true,

  setScrollState: (progress, velocity = 0) => {
    const p = Math.max(0, Math.min(1, progress));
    let activeChapter: ChapterIndex = 0;
    if (p >= 5 / 6) activeChapter = 3;
    else if (p >= 0.5) activeChapter = 2;
    else if (p >= 1 / 6) activeChapter = 1;
    set({ scrollProgress: p, scrollVelocity: velocity, activeChapter });
  },

  setActiveChapter: (activeChapter) => set({ activeChapter }),

  setCursor: (ndcX, ndcY, vx, vy) =>
    set({ cursorNdc: [ndcX, ndcY], cursorVelocity: [vx, vy] }),

  setHoveredOrb: (hoveredOrbIndex) => set({ hoveredOrbIndex }),

  setHoveredCard: (hoveredCardIndex) => set({ hoveredCardIndex }),

  triggerPetalStorm: (durationMs = 1200) =>
    set({ stormBoostUntil: performance.now() + durationMs }),

  setQualityInfo: (qualityTier, isSoftwareGl) => set({ qualityTier, isSoftwareGl }),

  setDpr: (dpr) => set({ dpr }),

  toggleCardVariant: () =>
    set((s) => ({ cardVariant: s.cardVariant === 'dark' ? 'light' : 'dark' })),

  setPreloadProgress: (pct) =>
    set((s) => ({ preloadProgress: Math.max(s.preloadProgress, Math.min(100, pct)) })),

  markReady: () => set({ preloadProgress: 100, isReady: true }),

  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  setHudOpen: (hudOpen) => set({ hudOpen }),

  setAuthOpen: (authOpen) => set({ authOpen }),

  setWebglFailed: (webglFailed) => set({ webglFailed }),

  setTabVisible: (tabVisible) => set({ tabVisible }),
}));
