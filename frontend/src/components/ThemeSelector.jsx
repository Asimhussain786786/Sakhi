import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Palette, Check, X, Sparkles } from 'lucide-react';
import { useTheme, THEMES, THEME_ORDER } from '../context/ThemeContext';
import { ThemeLotusEmblem } from './ThemeLotusEmblem';

export function ThemeSelector() {
  const { themeId, setThemeId, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Modal content rendered through Portal to escape any ancestor backdrop-filter/containing blocks
  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      style={{
        background: 'rgba(12, 6, 24, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      {/* Small, Compact, Sleek Liquid Glass Modal Box */}
      <div
        className="relative w-full max-w-3xl rounded-[24px] overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
          backdropFilter: 'blur(36px) saturate(200%)',
          WebkitBackdropFilter: 'blur(36px) saturate(200%)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 24px 60px -12px rgba(18, 10, 36, 0.45), 0 0 32px rgba(255, 92, 168, 0.25), inset 0 2px 3px rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Compact Header */}
        <div
          className="px-4 py-2.5 flex items-center justify-between border-b"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.7)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.35) 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs text-white shadow-xs"
              style={{
                background: `linear-gradient(135deg, ${theme.mid}, ${theme.dark})`,
              }}
            >
              🌸
            </div>
            <div>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  color: '#150727',
                }}
                className="text-base sm:text-lg font-extrabold leading-tight"
              >
                Personalise Sanctuary Palette
              </h2>
              <p className="text-[10px] font-bold text-slate-700">
                Click any theme to transform background scenery, lighting, and interface
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer hover:bg-black/10 active:scale-95 text-slate-800"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
            aria-label="Close theme selector"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Compact Cards Always Side-by-Side in 1 Row */}
        <div className="p-2.5 sm:p-3">
          <div
            className="w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '8px',
            }}
          >
            {THEME_ORDER.map((id) => {
              const t = THEMES[id];
              const isActive = themeId === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setThemeId(id);
                  }}
                  className="group relative flex flex-col items-center justify-between p-2 rounded-xl transition-all duration-300 cursor-pointer text-center hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: isActive
                      ? 'linear-gradient(155deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.90) 100%)'
                      : 'linear-gradient(155deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.55) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: isActive
                      ? `2px solid ${t.mid}`
                      : '1.5px solid rgba(255, 255, 255, 0.85)',
                    boxShadow: isActive
                      ? `0 8px 20px -3px rgba(${t.vars['--sakhi-shadow']}, 0.45), inset 0 2px 2px rgba(255,255,255,0.9)`
                      : '0 3px 10px -2px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255,255,255,0.7)',
                  }}
                >
                  {/* Active Indicator Ribbon */}
                  {isActive && (
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full text-[8px] font-extrabold uppercase tracking-widest text-white shadow-xs flex items-center gap-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${t.mid}, ${t.dark})`,
                      }}
                    >
                      <Check className="w-2 h-2" />
                      <span>Active</span>
                    </div>
                  )}

                  {/* Compact Theme Lotus Artwork */}
                  <div className="w-full flex justify-center py-0.5">
                    <ThemeLotusEmblem themeId={id} showLogotype={false} size="compact" />
                  </div>

                  {/* Compact Title & Subtitle */}
                  <div className="w-full my-0.5 pt-0.5 border-t border-slate-200/70">
                    <div
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        color: t.darkest,
                      }}
                      className="text-[11px] sm:text-xs font-extrabold leading-tight truncate"
                    >
                      {t.num}. {t.name}
                    </div>
                    <div
                      style={{ color: t.dark }}
                      className="text-[9px] font-bold tracking-wide truncate"
                    >
                      {t.subtitle}
                    </div>
                  </div>

                  {/* 5 Small Color Dots */}
                  <div className="flex items-center justify-center gap-0.5 pt-0.5">
                    {t.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white shadow-2xs"
                        style={{
                          background: color,
                          width: i === 2 ? '9px' : '7px',
                          height: i === 2 ? '9px' : '7px',
                        }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* Compact Click-to-Apply Status Button */}
                  <div className="w-full mt-1.5">
                    <div
                      className="w-full py-0.5 px-1 rounded-md text-[8.5px] font-extrabold uppercase tracking-wider transition-all"
                      style={
                        isActive
                          ? {
                              background: `linear-gradient(135deg, ${t.mid}, ${t.dark})`,
                              color: '#FFFFFF',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
                            }
                          : {
                              background: 'rgba(0, 0, 0, 0.06)',
                              color: t.darkest,
                            }
                      }
                    >
                      {isActive ? 'Current' : 'Apply'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Footer Controls: Cycle one-by-one or Close */}
          <div className="mt-3 flex items-center justify-between gap-3 pt-2.5 border-t border-slate-200/70">
            <button
              type="button"
              onClick={() => {
                const currentIndex = THEME_ORDER.indexOf(themeId);
                const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
                setThemeId(THEME_ORDER[nextIndex]);
              }}
              className="px-3.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderColor: theme.mid,
                color: theme.darkest,
              }}
            >
              <span>Cycle Next Theme ↻</span>
            </button>

            <div className="text-center text-[10px] font-bold text-slate-700 hidden sm:flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-pink-600" />
              <span>Click themes one-by-one to transform background scenery & mood</span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 rounded-xl text-white text-[11px] font-extrabold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${theme.mid}, ${theme.dark})`,
              }}
            >
              Done ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Trigger Button: Liquid Glass Pill in Navbar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Personalise theme"
        title="Personalise your Sakhi theme"
        className="flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all cursor-pointer text-xs font-extrabold shadow-sm hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(255, 255, 255, 0.8)',
          color: 'var(--sakhi-text, #1E1B4B)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.9)',
        }}
      >
        <Palette className="w-3.5 h-3.5" style={{ color: theme.mid }} />
        <span className="hidden sm:inline font-bold">Theme</span>
        <span
          className="w-3 h-3 rounded-full border border-white shadow-sm"
          style={{ background: theme.mid }}
        />
      </button>

      {/* Render Modal via React Portal directly into document.body */}
      {typeof document !== 'undefined' && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
