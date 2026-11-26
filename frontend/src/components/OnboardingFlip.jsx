import React, { useState, useEffect } from 'react';
import { ChevronRight, LogIn, Sparkles } from 'lucide-react';

// ── Slide definitions ─────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    image: '/assets/girl-sad.png',
    imageAlt: 'Sad girl before Sakhi',
    // 3-D card background — warm dark for drama
    cardBg: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
    floatBg: 'radial-gradient(ellipse at 60% 40%, rgba(183,110,121,0.18) 0%, transparent 70%)',
    tag: '😔  Before Sakhi',
    tagBg: 'rgba(183,110,121,0.22)',
    tagColor: '#f4a0aa',
    headline: 'Carrying it all alone felt\nimpossible.',
    headlineGrad: 'linear-gradient(135deg, #f4a0aa 0%, #d9a6b1 100%)',
    body: 'Health worries, safety fears, unanswered questions — no single place truly had your back.',
    bodyColor: 'rgba(255,255,255,0.62)',
    // decorative emoji floating
    floats: ['😔', '💭', '😮‍💨'],
    floatColors: ['#f4a0aa', '#d9cbf0', '#f0dfa4'],
    btnLabel: 'Next',
    btnGrad: 'linear-gradient(135deg, #B76E79 0%, #6E5365 100%)',
    btnShadow: 'rgba(183,110,121,0.45)',
    dotActive: '#B76E79',
  },
  {
    id: 1,
    image: '/assets/girl-curious.png',
    imageAlt: 'Girl discovering Sakhi',
    cardBg: 'linear-gradient(160deg, #1c2e27 0%, #293e36 60%, #3d5c4e 100%)',
    floatBg: 'radial-gradient(ellipse at 40% 50%, rgba(137,169,143,0.2) 0%, transparent 70%)',
    tag: '🌿  Meet Sakhi',
    tagBg: 'rgba(137,169,143,0.22)',
    tagColor: '#a8d4b0',
    headline: 'Then Sakhi stepped in —\nyour everyday companion.',
    headlineGrad: 'linear-gradient(135deg, #C8D9C5 0%, #89A98F 100%)',
    body: 'Period tracking, 1-tap SOS, legal rights, Dr. Maya therapy, daily planning — one safe, beautiful space built just for you.',
    bodyColor: 'rgba(255,255,255,0.62)',
    floats: ['🌿', '💚', '✨'],
    floatColors: ['#89A98F', '#C8D9C5', '#F5F7F2'],
    btnLabel: 'Next',
    btnGrad: 'linear-gradient(135deg, #4F7667 0%, #293E36 100%)',
    btnShadow: 'rgba(79,118,103,0.45)',
    dotActive: '#4F7667',
  },
  {
    id: 2,
    image: '/assets/girl-happy.png',
    imageAlt: 'Happy girl with Sakhi',
    cardBg: 'linear-gradient(160deg, #2d1f3d 0%, #382d4a 60%, #4a3860 100%)',
    floatBg: 'radial-gradient(ellipse at 50% 30%, rgba(172,143,209,0.22) 0%, transparent 70%)',
    tag: '💜  With Sakhi',
    tagBg: 'rgba(172,143,209,0.22)',
    tagColor: '#d9cbf0',
    headline: "Now she's informed,\nsafe & unstoppable.",
    headlineGrad: 'linear-gradient(135deg, #D9CBF0 0%, #AC8FD1 100%)',
    body: 'Every woman deserves a sisterhood that always shows up. Your journey with Sakhi starts right here.',
    bodyColor: 'rgba(255,255,255,0.62)',
    floats: ['💜', '✨', '💫'],
    floatColors: ['#D9CBF0', '#AC8FD1', '#F8F5FF'],
    btnLabel: 'Get Started',
    btnGrad: 'linear-gradient(135deg, #AC8FD1 0%, #74569A 100%)',
    btnShadow: 'rgba(116,86,154,0.45)',
    dotActive: '#AC8FD1',
    isLast: true,
  },
];

// ── Dot progress ──────────────────────────────────────────────────────────────
function Dots({ total, current, activeColor }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: i === current ? '28px' : '8px',
            height: '8px',
            borderRadius: '999px',
            background: i === current ? activeColor : 'rgba(255,255,255,0.25)',
            transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
          }}
        />
      ))}
    </div>
  );
}

// ── Floating emoji decoration ─────────────────────────────────────────────────
function FloatingEmoji({ emoji, style }) {
  return (
    <span
      style={{
        position: 'absolute',
        fontSize: '1.6rem',
        userSelect: 'none',
        pointerEvents: 'none',
        animation: 'sakhi-float 3.5s ease-in-out infinite',
        ...style,
      }}
    >
      {emoji}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function OnboardingFlip({ onDone, onBackToLanding }) {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState('visible'); // 'visible' | 'exit' | 'enter'

  const slide = SLIDES[current];

  const transition = (nextIndex, cb) => {
    setPhase('exit');
    setTimeout(() => {
      cb();
      setPhase('enter');
      // tiny tick so enter frame renders before we set visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('visible'));
      });
    }, 300);
  };

  const goNext = () => {
    if (current < SLIDES.length - 1) {
      transition(current + 1, () => setCurrent((c) => c + 1));
    }
  };

  const goLogin = () => {
    setPhase('exit');
    setTimeout(() => onDone(), 300);
  };

  // card transform per phase
  const cardStyle = {
    visible: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    exit:    { opacity: 0, transform: 'translateY(24px) scale(0.96)' },
    enter:   { opacity: 0, transform: 'translateY(-24px) scale(0.96)' },
  }[phase];

  return (
    <>
      {/* keyframes injected once */}
      <style>{`
        @keyframes sakhi-float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes sakhi-bob {
          0%,100% { transform: translateY(0px) scale(1.0); }
          50%      { transform: translateY(-8px) scale(1.03); }
        }
        @keyframes sakhi-glow-pulse {
          0%,100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.06); }
        }
        @keyframes sakhi-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d1117',
          position: 'relative',
          overflow: 'hidden',
          padding: '16px',
        }}
      >
        {/* deep ambient blobs */}
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,118,103,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(116,86,154,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Wordmark & Navigation ── */}
        <div style={{
          position: 'absolute', top: '20px', left: '24px',
          display: 'flex', alignItems: 'center', gap: '12px', zIndex: 20,
        }}>
          {onBackToLanding && (
            <button
              type="button"
              onClick={onBackToLanding}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '999px',
                padding: '6px 14px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              ← Home
            </button>
          )}
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #89A98F, #4F7667)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', boxShadow: '0 4px 14px rgba(79,118,103,0.4)',
          }}>🌿</div>
          <span style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800, fontSize: '22px', color: '#F5F7F2',
            letterSpacing: '-0.3px',
          }}>Sakhi</span>
        </div>

        {/* ── Skip ── */}
        {!slide.isLast && (
          <button
            onClick={goLogin}
            style={{
              position: 'absolute', top: '20px', right: '24px', zIndex: 20,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '999px',
              padding: '8px 20px',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
          >
            Skip →
          </button>
        )}

        {/* ── Main card ── */}
        <div
          style={{
            width: '100%', maxWidth: '400px',
            borderRadius: '32px',
            background: slide.cardBg,
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            overflow: 'hidden',
            position: 'relative',
            transition: 'opacity 0.30s ease, transform 0.30s ease',
            ...cardStyle,
          }}
        >
          {/* inner glow overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: slide.floatBg,
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── Image section ── */}
          <div style={{
            position: 'relative',
            height: '310px',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 1,
          }}>
            {/* glow behind girl */}
            <div style={{
              position: 'absolute',
              bottom: '-20px', left: '50%',
              transform: 'translateX(-50%)',
              width: '260px', height: '260px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.045)',
              filter: 'blur(32px)',
              animation: 'sakhi-glow-pulse 4s ease-in-out infinite',
            }} />

            {/* 3-D pedestal ring */}
            <div style={{
              position: 'absolute', bottom: '0px', left: '50%',
              transform: 'translateX(-50%)',
              width: '200px', height: '20px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              filter: 'blur(6px)',
            }} />

            {/* Girl image */}
            <img
              src={slide.image}
              alt={slide.imageAlt}
              style={{
                height: '290px',
                width: 'auto',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                position: 'relative', zIndex: 2,
                filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.55))',
                animation: 'sakhi-bob 4s ease-in-out infinite',
                // 3-D pop: perspective tilt + subtle shadow layering
                transform: 'perspective(600px) rotateY(-2deg) rotateX(1deg)',
              }}
            />

            {/* floating emojis */}
            {slide.floats.map((em, i) => (
              <FloatingEmoji
                key={i}
                emoji={em}
                style={{
                  color: slide.floatColors[i],
                  top:  ['18%', '10%', '22%'][i],
                  left: i === 0 ? '8%' : i === 1 ? undefined : undefined,
                  right: i === 1 ? '10%' : i === 2 ? '6%' : undefined,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${3.2 + i * 0.4}s`,
                  zIndex: 3,
                }}
              />
            ))}
          </div>

          {/* ── Text + controls section ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            padding: '28px 28px 32px 28px',
          }}>
            {/* tag pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '5px 14px',
              borderRadius: '999px',
              background: slide.tagBg,
              border: `1px solid ${slide.tagColor}30`,
              color: slide.tagColor,
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '14px',
            }}>
              {slide.tag}
            </div>

            {/* headline */}
            <h1 style={{
              margin: '0 0 12px 0',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '22px', fontWeight: 800,
              lineHeight: 1.3,
              backgroundImage: slide.headlineGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              whiteSpace: 'pre-line',
            }}>
              {slide.headline}
            </h1>

            {/* body */}
            <p style={{
              margin: '0 0 28px 0',
              fontSize: '13.5px',
              lineHeight: 1.65,
              color: slide.bodyColor,
            }}>
              {slide.body}
            </p>

            {/* footer row: dots + button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <Dots total={SLIDES.length} current={current} activeColor={slide.dotActive} />

              {slide.isLast ? (
                <button
                  onClick={goLogin}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    background: slide.btnGrad,
                    boxShadow: `0 6px 24px ${slide.btnShadow}`,
                    border: 'none', cursor: 'pointer',
                    color: '#fff', fontWeight: 700, fontSize: '14px',
                    letterSpacing: '0.01em',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <LogIn size={16} />
                  {slide.btnLabel}
                </button>
              ) : (
                <button
                  onClick={goNext}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    background: slide.btnGrad,
                    boxShadow: `0 6px 24px ${slide.btnShadow}`,
                    border: 'none', cursor: 'pointer',
                    color: '#fff', fontWeight: 700, fontSize: '14px',
                    letterSpacing: '0.01em',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {slide.btnLabel}
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* slide counter */}
        <p style={{
          position: 'absolute', bottom: '20px',
          color: 'rgba(255,255,255,0.22)',
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
        }}>
          {current + 1} / {SLIDES.length}
        </p>
      </div>
    </>
  );
}
