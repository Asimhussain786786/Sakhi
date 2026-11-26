import React from 'react';
import { THEMES } from '../context/ThemeContext';

/**
 * Pixel-perfect SVG reproduction of the Sakhi Brand Identity Lotus Emblem
 * matching the user's design sheet:
 * - 7 botanical lotus petals with rising inner spirit figure
 * - Sacred Unalome infinity base flourish with descending alignment dots
 * - Four-point diamond celestial sparkle stars
 * - Elegant luxury serif "Sakhi" logotype
 */
export function ThemeLotusEmblem({ themeId, className = '', showLogotype = true, size = 'default' }) {
  const theme = THEMES[themeId] || THEMES['soft-sophisticated'];
  const { primary, secondary, dark, deep } = theme.lotusColors;
  const gradientId = `lotus-grad-${themeId}`;
  const unalomeGradId = `unalome-grad-${themeId}`;

  const svgSizeClass = size === 'compact'
    ? 'w-11 h-13 drop-shadow-xs transition-transform duration-300 group-hover:scale-105'
    : 'w-20 h-24 sm:w-24 sm:h-28 drop-shadow-sm transition-transform duration-300 group-hover:scale-105';

  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 160 180"
        className={svgSizeClass}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondary} />
            <stop offset="50%" stopColor={primary} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
          <linearGradient id={unalomeGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
        </defs>

        {/* Top 4-point Diamond Celestial Star */}
        <path
          d="M80 6 Q80 14 86 14 Q80 14 80 22 Q80 14 74 14 Q80 14 80 6 Z"
          fill={primary}
        />

        {/* Central Spirit Figure: Head dot */}
        <circle cx="80" cy="30" r="5.5" fill={primary} />

        {/* Central Rising Spirit Flame / Petal */}
        <path
          d="M80 39 C74 48 72 58 75 70 C78 80 82 86 80 95 C78 86 82 78 85 70 C88 58 86 48 80 39 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Inner Pair of S-Curved Petals */}
        <path
          d="M80 94 C72 82 66 66 68 52 C74 58 78 68 80 82 Z"
          fill={primary}
          opacity="0.88"
        />
        <path
          d="M80 94 C88 82 94 66 92 52 C86 58 82 68 80 82 Z"
          fill={primary}
          opacity="0.88"
        />

        {/* Middle Winged Lotus Petals */}
        <path
          d="M78 96 C64 88 48 76 44 60 C56 64 68 76 76 90 Z"
          fill={secondary}
          opacity="0.95"
        />
        <path
          d="M82 96 C96 88 112 76 116 60 C104 64 92 76 84 90 Z"
          fill={secondary}
          opacity="0.95"
        />

        {/* Outer Curved Botanical Guard Petals */}
        <path
          d="M75 98 C56 94 34 88 24 76 C38 78 56 86 72 94 Z"
          fill={dark}
          opacity="0.75"
        />
        <path
          d="M85 98 C104 94 126 88 136 76 C122 78 104 86 88 94 Z"
          fill={dark}
          opacity="0.75"
        />

        {/* Sacred Unalome Base Infinity Loop */}
        <path
          d="M80 98 C70 98 62 104 62 112 C62 120 72 124 80 124 C88 124 98 120 98 112 C98 104 90 98 80 98 Z"
          stroke={`url(#${unalomeGradId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Spiral & Infinity Interlock */}
        <path
          d="M80 124 C76 128 72 134 76 140 C80 144 86 142 84 136 C83 132 78 132 77 136 C76 140 80 145 82 148"
          stroke={`url(#${unalomeGradId})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Descending Unalome Alignment Dots */}
        <circle cx="80" cy="155" r="2.4" fill={dark} />
        <circle cx="80" cy="163" r="1.8" fill={primary} />
        <circle cx="80" cy="170" r="1.2" fill={secondary} />
      </svg>

      {/* Luxury Serif "Sakhi" Logotype matching Brand Sheet */}
      {showLogotype && (
        <div className="relative flex flex-col justify-center">
          <div className="relative inline-block">
            <span
              style={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                color: deep,
              }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              Sakhi
            </span>
            {/* Sparkle Star over the "S" */}
            <svg
              viewBox="0 0 24 24"
              className="absolute -top-1 -left-2 w-3.5 h-3.5"
              fill={primary}
            >
              <path d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z" />
            </svg>
            {/* Sparkle Star over the "i" */}
            <svg
              viewBox="0 0 24 24"
              className="absolute -top-1.5 right-0.5 w-3.5 h-3.5"
              fill={primary}
            >
              <path d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
