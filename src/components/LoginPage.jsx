import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';

// Web Audio API Synthesizer (Zero-dependency, browser-native sounds)
let audioCtx = null;
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTone = (f1, f2, duration, volume = 0.05, type = 'sine', enabled = true) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(f2, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.05);
  } catch (e) {}
};

const playChime = (enabled = true) => {
  if (!enabled) return;
  [523, 659, 784, 1046].forEach((freq, idx) => {
    setTimeout(() => playTone(freq, freq * 0.99, 0.45, 0.05, 'triangle', enabled), idx * 90);
  });
};

const playHum = (enabled = true) => {
  if (!enabled) return;
  playTone(48, 38, 1.8, 0.16, 'sine', enabled);
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = buffer;
    filter.type = 'bandpass';
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3500, ctx.currentTime + 0.7);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
  } catch (e) {}
};

const QUOTES = [
  'Embrace your rhythm, honor your strength.',
  'Designed with love, safety & sisterhood.',
  'Your private, aesthetic wellness haven.',
  'Protecting your peace, every single day.'
];

export const LoginPage = ({ onLogin, onBackToLanding }) => {
  const [username, setUsername] = useState('Ananya Sharma');
  const [password, setPassword] = useState('sakhi2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [bloomActive, setBloomActive] = useState(false);

  const slabRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!slabRef.current) return;
    const rect = slabRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = -(py - 0.5) * 14;
    const ry = (px - 0.5) * 18;
    setTilt({
      rx,
      ry,
      mx: Math.round(px * 100),
      my: Math.round(py * 100)
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  const triggerSparks = (x, y, count = 30) => {
    if (typeof document === 'undefined') return;
    const colors = ['#f472b6', '#fb7185', '#fbcfe8', '#f5c97a', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      const color = colors[i % colors.length];
      s.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:5px;height:5px;border-radius:50%;pointer-events:none;z-index:90;background:${color};box-shadow:0 0 10px ${color};transition:all 0.8s cubic-bezier(0.2,0.8,0.3,1);`;
      document.body.appendChild(s);
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 120;
      requestAnimationFrame(() => {
        s.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 850);
    }
  };

  const triggerPetals = () => {
    if (typeof document === 'undefined') return;
    const colors = ['#fb7185', '#f9a8d4', '#fbcfe8', '#e8a38b', '#f5c97a', '#ffffff'];
    for (let i = 0; i < 45; i++) {
      const p = document.createElement('i');
      const size = 12 + Math.random() * 16;
      const color = colors[i % colors.length];
      const startX = Math.random() * window.innerWidth;
      p.style.cssText = `position:fixed;left:${startX}px;top:-20px;width:${size}px;height:${size * 1.4}px;z-index:85;pointer-events:none;border-radius:100% 0 100% 0;background:linear-gradient(135deg,${color},rgba(255,255,255,0.7));box-shadow:0 0 12px ${color};transition:transform 1.8s cubic-bezier(0.15,0.7,0.3,1), opacity 1.8s;`;
      document.body.appendChild(p);

      requestAnimationFrame(() => {
        const fallDist = window.innerHeight + 100;
        const drift = (Math.random() - 0.5) * 300;
        const rot = (Math.random() - 0.5) * 720;
        p.style.transform = `translate(${drift}px, ${fallDist}px) rotate(${rot}deg) scale(0.7)`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 2000);
    }
  };

  const handleKeyTone = () => {
    playTone(900 + Math.random() * 400, 700, 0.05, 0.015, 'sine', soundEnabled);
  };

  const doSubmit = () => {
    if (isSubmitting) return;
    const u = username.trim();
    const p = password;

    if (!u) {
      setErrorMsg('Enter your username to continue.');
      playTone(200, 120, 0.25, 0.05, 'square', soundEnabled);
      return;
    }
    if (p.length < 4) {
      setErrorMsg('Password needs at least 4 characters.');
      playTone(200, 120, 0.25, 0.05, 'square', soundEnabled);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    playTone(300, 1200, 1.4, 0.06, 'sine', soundEnabled);
    playHum(soundEnabled);
    triggerPetals();
    setBloomActive(true);

    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    setTimeout(() => {
      playChime(soundEnabled);
      onLogin({
        name: u,
        avatar: '🌸',
        bloodGroup: 'B+',
        phone: '+91 98765 43210',
        parentsPhone: '+91 98111 22334',
        email: `${u.toLowerCase().replace(/\s+/g, '')}@example.com`,
        parentsEmail: 'sharma.family@example.com',
        emergencyNote: 'Mild dust allergy, carries emergency inhaler'
      });
    }, 1100);
  };

  const handleQuickDemo = () => {
    setUsername('sakhi_demo');
    setPassword('sakhi2026');
    setErrorMsg('');
    playTone(600, 1200, 0.3, 0.04, 'triangle', soundEnabled);
    setTimeout(doSubmit, 250);
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
      style={{
        background: `
          radial-gradient(ellipse at 18% 8%, rgba(251,113,133,0.24), transparent 50%),
          radial-gradient(ellipse at 88% 92%, rgba(232,163,139,0.3), transparent 55%),
          linear-gradient(160deg, #fdf2f8, #fce7f3 55%, #fbe4ef)
        `,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        perspective: '1200px'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bloom Flash on Login Transition */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-50 ${
          bloomActive ? 'opacity-100 scale-125' : 'opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #fff0f6 30%, #fbcfe8 60%, rgba(251,207,232,0) 80%)'
        }}
      />

      {/* Top Floating Controls */}
      <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between max-w-6xl mx-auto pointer-events-auto">
        <button
          type="button"
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-pink-900 font-bold text-xs sm:text-sm border border-pink-200/80 shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-pink-600" />
          <span>Back to Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playTone(440, 880, 0.1, 0.05, 'sine', true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-pink-900 font-bold text-xs border border-pink-200/80 shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-pink-600" />
              <span>Sound on</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Sound off</span>
            </>
          )}
        </button>
      </div>

      {/* 3D Container Wrapper */}
      <div
        className="w-full max-w-md my-auto flex flex-col items-center gap-6 z-20 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated Affirmation Header */}
        <div className="text-center px-4 transform translate-z-[30px]">
          <p
            className="text-2xl sm:text-3xl font-black font-serif-heading leading-tight tracking-tight transition-all duration-700 max-w-sm mx-auto"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: 'linear-gradient(90deg, #be185d, #f472b6, #d97706, #f472b6, #be185d)',
              backgroundSize: '220% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'shimText 7s linear infinite'
            }}
          >
            "{QUOTES[quoteIndex]}"
          </p>
          <div className="flex flex-wrap gap-2 justify-center items-center mt-3 text-xs text-pink-900">
            <span className="px-3 py-1 rounded-full bg-white/80 border border-pink-200/80 shadow-xs font-bold text-pink-700">
              Body Wisdom
            </span>
            <b className="text-pink-400">•</b>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-pink-200/80 shadow-xs font-bold text-rose-600">
              Cycle Harmony
            </span>
            <b className="text-pink-400">•</b>
            <span className="px-3 py-1 rounded-full bg-white/80 border border-pink-200/80 shadow-xs font-bold text-fuchsia-700">
              Unapologetic Safety
            </span>
          </div>
        </div>

        {/* 3D Glass Slab Card */}
        <div
          ref={slabRef}
          className="relative w-full p-7 sm:p-9 rounded-[32px] backdrop-blur-2xl transition-all duration-300 shadow-2xl"
          style={{
            background: 'linear-gradient(150deg, rgba(255,255,255,0.9), rgba(255,240,248,0.72))',
            border: '1.5px solid rgba(251,207,232,0.95)',
            boxShadow: `
              0 24px 60px -15px rgba(244,114,182,0.35),
              0 0 70px -20px rgba(245,201,122,0.45),
              inset 0 1px 0 #ffffff
            `,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Decorative 3D stacked shadow layers */}
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none -z-10"
            style={{
              transform: 'translateZ(-24px) scale(1.04)',
              border: '1px solid rgba(251,113,133,0.3)',
              background: 'linear-gradient(145deg, rgba(251,113,133,0.08), transparent)'
            }}
          />
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none -z-20"
            style={{
              transform: 'translateZ(-48px) scale(1.08)',
              border: '1px solid rgba(168,85,247,0.2)',
              background: 'rgba(168,85,247,0.04)'
            }}
          />

          {/* Radial Specular Sheen Following Mouse */}
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              background: `radial-gradient(320px circle at ${tilt.mx}% ${tilt.my}%, rgba(251,113,133,0.2), transparent 70%)`
            }}
          />

          {/* Card Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md shadow-pink-500/20 shrink-0 border border-white/80"
              style={{
                background: 'linear-gradient(135deg, rgba(251,113,133,0.6), rgba(244,114,182,0.4))'
              }}
            >
              🌸
            </div>
            <div>
              <h2
                className="font-serif-heading font-black text-2xl sm:text-3xl leading-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#9d174d'
                }}
              >
                Welcome Back, Sakhi 🌸
              </h2>
              <p className="text-xs sm:text-sm text-[#be7a97] font-medium mt-1">
                Your private sanctuary for health, safety & sisterhood
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doSubmit();
            }}
            className="space-y-4"
          >
            {/* Username Field */}
            <div>
              <label
                htmlFor="username-input"
                className="block text-xs font-bold text-pink-900 mb-1.5 flex items-center gap-1.5"
              >
                <span>🌸</span>
                <span>Your Name or Username</span>
              </label>
              <div className="relative">
                <input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyTone}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-4 py-3 rounded-2xl text-slate-800 font-semibold text-sm sm:text-base border border-pink-200/90 bg-white/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400 transition-all duration-200 placeholder:text-pink-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password-input"
                className="block text-xs font-bold text-pink-900 mb-1.5 flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span>🔒</span>
                  <span>Password</span>
                </span>
                <span className="text-[11px] font-normal text-pink-400">min 4 characters</span>
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyTone}
                  placeholder="••••••••"
                  className="w-full px-4 pr-12 py-3 rounded-2xl text-slate-800 font-semibold text-sm sm:text-base border border-pink-200/90 bg-white/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400 transition-all duration-200 placeholder:text-pink-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                    playTone(700, 1000, 0.08, 0.03, 'sine', soundEnabled);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-pink-100/70 hover:bg-pink-200 text-pink-700 flex items-center justify-center transition-all cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-xs font-bold text-rose-600 text-center animate-shake py-1">
                {errorMsg}
              </p>
            )}

            {/* 3D Glossy Submit Button */}
            <div className="pt-1 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  triggerSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
                }}
                className="relative rounded-full text-white font-extrabold text-base tracking-wide overflow-hidden transition-all duration-200 cursor-pointer active:translate-y-1.5 shadow-xl hover:shadow-2xl hover:scale-[1.01]"
                style={{
                  width: 'calc(100% - 10px)',
                  margin: '10px 5px',
                  padding: '18px 24px',
                  background: 'linear-gradient(110deg, #ec4899, #f43f5e 50%, #db2777)',
                  boxShadow: '0 8px 0 #9d174d, 0 20px 40px -10px rgba(236,72,153,0.6)'
                }}
              >
                {/* Shimmer sweep animation */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.6), transparent)',
                    width: '40%',
                    transform: 'skewX(-20deg)',
                    animation: 'shimmerSweep 3.2s infinite'
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>{isSubmitting ? 'Opening Your Sanctuary...' : 'Enter Sakhi Sanctuary ✨'}</span>
                  <Sparkles className="w-4 h-4 text-pink-200 animate-spin" style={{ animationDuration: '6s' }} />
                </span>
              </button>
            </div>

            {/* Quick Demo Login Option */}
            <div className="text-center pt-2 border-t border-pink-100/90 mt-3">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 text-xs sm:text-sm font-extrabold text-[#be185d] border border-pink-200/90 shadow-xs hover:shadow-sm transition-all cursor-pointer hover:scale-102 active:scale-98"
                style={{
                  margin: '10px 5px',
                  padding: '14px 28px',
                  maxWidth: 'calc(100% - 10px)'
                }}
              >
                <span>⚡ Quick Demo Login (Instant Access)</span>
              </button>
              <p className="text-[11px] text-[#be7a97] mt-1 font-medium">
                Pre-fills verified contacts, cycle history & emergency SOS readiness
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Global Embedded Styles for Animations */}
      <style>{`
        @keyframes shimmerSweep {
          0% { left: -60%; }
          60%, 100% { left: 130%; }
        }
        @keyframes shimText {
          to { background-position: 220% 0; }
        }
        @keyframes roseGlow {
          50% {
            box-shadow: 0 0 0 4px rgba(251,113,133,0.25), 0 0 35px 0 rgba(244,114,182,0.7);
          }
        }
      `}</style>
    </div>
  );
};