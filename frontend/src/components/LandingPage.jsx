import React from 'react';
import { SlayChanger } from './SlayChanger.jsx';
import { GoSlayFooter } from './GoSlayFooter.jsx';
import {
  CalendarHeart,
  AlertTriangle,
  Scale,
  Gift,
  HeartPulse,
  Activity,
  ListTodo,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  CheckCircle2,
  Lock,
  Flame,
} from 'lucide-react';

export const LandingPage = ({ onEnter, onOpenOnboarding }) => {
  return (
    <div className="relative min-h-screen text-slate-800 overflow-x-hidden selection:bg-pink-500/30">
      {/* Injected Animations for Living Meadow Grass & Ambient Particles */}
      <style>{`
        @keyframes sanctuary-grass-breeze {
          0% { transform: scale(1.03) translate(0px, 0px); }
          50% { transform: scale(1.07) translate(-10px, -6px); }
          100% { transform: scale(1.03) translate(0px, 0px); }
        }
        @keyframes grass-pollen-drift-1 {
          0% { transform: translate(0px, 0px) scale(0.6); opacity: 0; }
          25% { opacity: 0.75; }
          75% { opacity: 0.75; }
          100% { transform: translate(45px, -140px) scale(1.1); opacity: 0; }
        }
        @keyframes grass-pollen-drift-2 {
          0% { transform: translate(0px, 0px) scale(0.5); opacity: 0; }
          30% { opacity: 0.85; }
          80% { opacity: 0.85; }
          100% { transform: translate(-50px, -180px) scale(1.2); opacity: 0; }
        }
        @keyframes sanctuary-sun-shimmer {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.08); }
        }
      `}</style>

      {/* 1. Living Photographic Sanctuary Meadow Backdrop (Same as Login Page without Lotus) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-30 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: 'url(/assets/sanctuary-backdrop.jpg)',
          animation: 'sanctuary-grass-breeze 22s ease-in-out infinite alternate',
          transformOrigin: 'bottom center',
          filter: 'saturate(1.22) contrast(1.06) brightness(1.0)',
        }}
      />

      {/* 2. Atmospheric Twilight Mood Overlay for Warmth & Legibility */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-20"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255, 230, 240, 0.45) 0%, rgba(220, 190, 230, 0.35) 45%, rgba(24, 12, 38, 0.68) 100%)',
          mixBlendMode: 'multiply',
          opacity: 0.65,
        }}
      />

      {/* 3. Soft Frosted Tint to Harmonize Liquid Glass */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 240, 246, 0.25) 0%, rgba(255, 232, 240, 0.15) 50%, rgba(230, 215, 240, 0.35) 100%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />

      {/* 4. Living Pollen & Firefly Motifs Rising from the Meadow Grass */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#FCD34D]"
          style={{ bottom: '15%', left: '18%', animation: 'grass-pollen-drift-1 9s ease-in-out infinite' }}
        />
        <div
          className="absolute w-3 h-3 rounded-full bg-pink-300 shadow-[0_0_14px_#F472B6]"
          style={{ bottom: '22%', left: '42%', animation: 'grass-pollen-drift-2 11s ease-in-out infinite 2s' }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-yellow-200 shadow-[0_0_10px_#FEF08A]"
          style={{ bottom: '18%', right: '28%', animation: 'grass-pollen-drift-1 10s ease-in-out infinite 4s' }}
        />
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-purple-300 shadow-[0_0_16px_#D8B4FE]"
          style={{ bottom: '25%', right: '12%', animation: 'grass-pollen-drift-2 13s ease-in-out infinite 1s' }}
        />
      </div>

      {/* Top Banner Navigation: Liquid Glass Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative z-10">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            border: '1.5px solid rgba(255, 255, 255, 0.65)',
            boxShadow: '0 10px 28px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
          }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-2xl"
        >
          <img
            src="/assets/sakhi_emblem.png"
            alt="Sakhi Official Emblem"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm"
          />
          <div>
            <span
              style={{ textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}
              className="font-serif-heading font-extrabold text-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-700 bg-clip-text text-transparent"
            >
              Sakhi
            </span>
            <span className="ml-1.5 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pink-100/90 text-pink-700 border border-pink-200 shadow-xs">
              सखी
            </span>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Enter Sakhi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 z-10">
        {/* Floating Doodle 1: Period Calendar Doodle in the clear Top-Left Corner */}
        <div className="absolute top-1 left-4 sm:left-8 animate-bounce pointer-events-none drop-shadow-md z-10" style={{ animationDuration: '3.5s' }}>
          <img
            src="/assets/periodsdoodle.png"
            alt="Period Calendar Doodle"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain select-none"
          />
        </div>

        {/* Floating Doodle 2: Dr. Maya AI Robot Companion in the clear Top-Right Corner */}
        <div className="absolute top-1 right-4 sm:right-8 animate-float pointer-events-none drop-shadow-md z-10" style={{ animationDuration: '4s' }}>
          <img
            src="/assets/robotdoodle.png"
            alt="AI Robot Doodle"
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain select-none"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left pt-2">
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.20) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 8px 20px -2px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.9)',
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-pink-700 text-xs sm:text-sm font-bold mb-6 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>India’s Most Aesthetic, Empowering & Pookie Companion for Women</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>

            <h1
              style={{ textShadow: '0 2px 14px rgba(255, 255, 255, 0.7), 0 1px 2px rgba(0,0,0,0.1)' }}
              className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5"
            >
              Your Health, Safety & <br />
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
                Sisterhood in One Place
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-medium max-w-2xl leading-relaxed mb-8 drop-shadow-xs">
              From tracking your period cycle with hormonal harmony to 1-click GPS emergency alerts, Indian legal rights, government schemes, Dr. Maya's gentle therapy, and daily routine planning — Sakhi is the bestie who always has your back.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onEnter}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter 3D Sakhi Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenOnboarding}
                style={{
                  background: 'linear-gradient(135deg, rgba(142, 36, 170, 0.85) 0%, rgba(106, 27, 154, 0.85) 100%)',
                  boxShadow: '0 8px 24px -2px rgba(142, 36, 170, 0.35)',
                }}
                className="px-6 py-3.5 rounded-full text-white font-extrabold text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/30"
              >
                <span>✨ 3-Stage Mood Journey (Flapping Window)</span>
              </button>
              
              <a
                href="#pillars"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.25) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.7)',
                }}
                className="px-6 py-3.5 rounded-full text-slate-800 font-bold text-sm shadow-xs hover:border-pink-300 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore 7 Pillars</span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </a>
            </div>

            {/* Floating Doodle 3: Fitness Journal below CTA buttons */}
            <div className="mt-8 flex items-center gap-3">
              <div className="animate-bounce pointer-events-none drop-shadow-md shrink-0" style={{ animationDuration: '3.5s' }}>
                <img
                  src="/assets/fitnessdoodle.png"
                  alt="Fitness Journal Doodle"
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain select-none"
                />
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.20) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.65)',
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-700 shadow-xs"
              >
                <span>✨ Cycle-Synced Lifestyle & Daily Routine Planner</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image: 4-Girls Sisterhood Artwork (100% Solid & Vibrant, Non-Translucent) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute -top-4 right-12 text-2xl text-rose-300 animate-pulse pointer-events-none select-none">
              ✨
            </div>
            <div className="absolute top-1/4 -right-2 text-2xl text-amber-200 animate-spin pointer-events-none select-none" style={{ animationDuration: '8s' }}>
              ✨
            </div>

            <div className="relative w-full max-w-xl lg:max-w-2xl flex justify-center items-center py-2">
              <img
                src="/assets/grpupgirls.png"
                alt="Sakhi Sisterhood"
                className="w-full h-auto object-contain max-h-[530px] rounded-[20px] scale-105 sm:scale-108 -translate-x-3 sm:-translate-x-6 lg:-translate-x-8 drop-shadow-[0_20px_40px_rgba(233,30,99,0.35)] hover:scale-110 transition-transform duration-300 ease-out select-none pointer-events-auto"
                style={{ borderRadius: '20px', opacity: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Quick Highlights Row (Translucent Liquid Glass Cards) */}
        <div className="relative mt-12">
          {/* Floating Doodle 4: Emergency SOS Shield Doodle */}
          <div className="hidden sm:flex justify-between items-center max-w-6xl mx-auto px-2 mb-3.5">
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.25) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
              }}
              className="text-xs font-extrabold uppercase tracking-widest text-pink-700 px-3 py-1 rounded-full shadow-xs"
            >
              Quick Highlights
            </span>
            <div className="flex items-center gap-2 animate-float pointer-events-none" style={{ animationDuration: '4s' }}>
              <img
                src="/assets/medicaldoodle.png"
                alt="SOS Safety Shield Doodle"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain select-none drop-shadow-md"
              />
              <span
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.25) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.7)',
                }}
                className="text-xs font-bold text-rose-700 px-3 py-1 rounded-full shadow-xs"
              >
                1-Tap Live GPS & Emergency SOS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Card 1: Period Harmony */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-5 rounded-3xl transition-all hover:scale-105 hover:border-pink-300 text-center group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto mb-1.5 flex items-center justify-center animate-float drop-shadow-sm" style={{ animationDuration: '4s' }}>
                <img
                  src="/assets/periodsdoodle.png"
                  alt="Period Harmony"
                  className="w-10 h-10 object-contain select-none group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-sm font-extrabold text-slate-900">Period Harmony</div>
              <div className="text-xs text-pink-700 font-bold mt-0.5">Cycle-synced lifestyle</div>
            </div>

            {/* Card 2: 1-Click Master SOS */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-5 rounded-3xl transition-all hover:scale-105 hover:border-rose-300 text-center group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto mb-1.5 flex items-center justify-center animate-bounce drop-shadow-sm" style={{ animationDuration: '3.5s' }}>
                <img
                  src="/assets/medicaldoodle.png"
                  alt="1-Click SOS"
                  className="w-10 h-10 object-contain select-none group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-sm font-extrabold text-slate-900">1-Click Master SOS</div>
              <div className="text-xs text-rose-700 font-bold mt-0.5">Live GPS & WhatsApp broadcast</div>
            </div>

            {/* Card 3: Indian Law Book */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-5 rounded-3xl transition-all hover:scale-105 hover:border-purple-300 text-center group cursor-pointer"
            >
              <div className="text-3xl mb-1.5 flex justify-center group-hover:scale-110 transition-transform drop-shadow-sm">⚖️</div>
              <div className="text-sm font-extrabold text-slate-900">Indian Law Book</div>
              <div className="text-xs text-purple-700 font-bold mt-0.5">Zero FIR & POSH rights</div>
            </div>

            {/* Card 4: Therapist Dr. Maya */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-5 rounded-3xl transition-all hover:scale-105 hover:border-teal-300 text-center group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto mb-1.5 flex items-center justify-center animate-float drop-shadow-sm" style={{ animationDuration: '4.5s' }}>
                <img
                  src="/assets/robotdoodle.png"
                  alt="Dr. Maya AI"
                  className="w-10 h-10 object-contain select-none group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-sm font-extrabold text-slate-900">Therapist Dr. Maya</div>
              <div className="text-xs text-teal-700 font-bold mt-0.5">Warm empathetic counseling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sakhi is Essential Section: Liquid Glass Backdrop */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
              }}
              className="text-xs font-bold uppercase tracking-widest text-pink-700 px-3.5 py-1 rounded-full shadow-xs"
            >
              Why Sakhi Is Essential
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif-heading font-extrabold text-slate-900">
              Built with Empathy, Designed for Safety & Daily Joy
            </h2>
            <p className="mt-3 text-slate-700 font-medium text-sm sm:text-base">
              Every woman deserves a single trusted space where her physical health, personal safety, legal rights, mental well-being, and daily ambitions flourish together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-6 rounded-3xl transition-all hover:scale-105"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-pink-500/30">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Uncompromising Safety</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                When walking alone at night or in an uneasy cab, one tap grabs your exact GPS coordinates, crafts an active Google Maps SOS link, and alerts your family and 112 with zero delay.
              </p>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-6 rounded-3xl transition-all hover:scale-105"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-rose-500/30">
                👑
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Knowledge is Sovereignty</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Indian women have formidable legal protections—from Zero FIR to sunset arrest rules and free legal aid. Sakhi demystifies complex legal language into plain, actionable superpowers.
              </p>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.65)',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              }}
              className="p-6 rounded-3xl transition-all hover:scale-105"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-purple-500/30">
                🌸
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hormonal & Mental Peace</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Your body isn't a 24-hour machine; it operates on a 28-day symphony. Sync your fitness, seed cycling, hydration, and mental unwinding with your natural biological rhythms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Core Pillars Detailed Grid (Liquid Glass) */}
      <section id="pillars" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.7)',
            }}
            className="text-xs font-bold uppercase tracking-widest text-pink-700 px-3.5 py-1 rounded-full shadow-xs"
          >
            The 7 Core Pillars
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-serif-heading font-extrabold text-slate-900">
            Everything You Need, In Its Own Dedicated Tab
          </h2>
          <p className="mt-3 text-slate-700 font-medium text-sm sm:text-base">
            No endless menus or messy feeds. Click into any pillar anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-pink-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-100/90 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <CalendarHeart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Period Tracker</h3>
            <p className="text-sm text-slate-700 font-medium mb-4">
              Monthly cycle forecast, countdown to next period, ovulation window, flow & symptom logging, plus Menstrual, Follicular, Ovulatory, and Luteal phase insights.
            </p>
            <ul className="text-xs text-pink-800 space-y-1 font-bold">
              <li>✨ Phase-specific hormone guidance</li>
              <li>✨ Adjustable cycle & bleed duration</li>
              <li>✨ Daily cramp, mood & craving tracker</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-red-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100/90 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Emergency SOS</h3>
            <p className="text-sm text-slate-700 font-medium mb-4">
              One-click live GPS fetch with Google Maps link, WhatsApp & SMS instant alerts to family, direct dial for 112/1091, loud siren alarm, and fake call escape simulator!
            </p>
            <ul className="text-xs text-red-700 space-y-1 font-bold">
              <li>🚨 One-click WhatsApp & SMS SOS</li>
              <li>🚨 Loud audio siren deterrent</li>
              <li>🚨 Realistic fake incoming call simulator</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-rose-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100/90 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Resource Hub</h3>
            <p className="text-sm text-slate-700 font-medium mb-4">
              Good vs bad foods, intimate hygiene truths, debunked myths, seed cycling formulas (Pumpkin/Flax & Sunflower/Sesame), and cramp-relieving yoga poses with timers.
            </p>
            <ul className="text-xs text-rose-800 space-y-1 font-bold">
              <li>🌿 Balasana, Supta Baddha Konasana yoga</li>
              <li>🌿 PCOS & exam stress survival protocols</li>
              <li>🌿 Gynecologist red flags check</li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-purple-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100/90 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">4. Your Law Book</h3>
            <p className="text-sm text-slate-700 font-medium mb-4">
              Plain-language summaries of Zero FIR, Domestic Violence Act (2005), POSH workplace harassment, MTP abortion rights (2021), Night arrest CrPC 46(4), and Free Legal Aid.
            </p>
            <ul className="text-xs text-purple-800 space-y-1 font-bold">
              <li>⚖️ Filterable & searchable Indian laws</li>
              <li>⚖️ Step-by-step reporting instructions</li>
              <li>⚖️ NALSA 15100 free advocate access</li>
            </ul>
          </div>

          {/* Pillar 5 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-emerald-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">5. Women’s Welfare</h3>
            <p className="text-sm text-slate-700 font-medium mb-4">
              Verified Indian government schemes: Sukanya Samriddhi (8.2%), Stand-Up India (up to ₹1 Crore), PMMVY maternity benefits, One Stop Centres, and Working Women Hostels.
            </p>
            <ul className="text-xs text-emerald-800 space-y-1 font-bold">
              <li>🏛️ Eligibility criteria & key financial perks</li>
              <li>🏛️ Direct clickable links to official portals</li>
              <li>🏛️ Filter by student, mother, or entrepreneur</li>
            </ul>
          </div>

          {/* Pillar 6 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-teal-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100/90 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">6. Therapist Dr. Maya</h3>
            <p className="text-sm text-slate-700 font-medium mb-4">
              A warm, comforting counselor for emotional burnout, relationship tensions, and PMS mood swings, plus interactive 4-7-8 breathing circle and crisis helpline buttons.
            </p>
            <ul className="text-xs text-teal-800 space-y-1 font-bold">
              <li>🌸 Empathetic, supportive responses</li>
              <li>🌸 Animated 4-7-8 breathwork guide</li>
              <li>🌸 Tele-MANAS (14416) crisis access</li>
            </ul>
          </div>

          {/* Pillar 7 */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.18) 100%)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.65)',
              boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
            }}
            className="rounded-3xl p-6 transition-all hover:scale-105 hover:border-fuchsia-300 group md:col-span-2 lg:col-span-3"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-fuchsia-100/90 text-fuchsia-600 flex items-center justify-center shadow-xs">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/90 text-amber-600 flex items-center justify-center shadow-xs">
                    <ListTodo className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">7. Fitness Journal & My Day Planner</h3>
                </div>
                <p className="text-sm text-slate-700 font-medium max-w-2xl">
                  Log your workouts with cycle-friendly recommendations, tap through the interactive 8-Cup Water Intake Tracker, step counter, and organize your day with our aesthetic digital spiral notepad with top 3 non-negotiables!
                </p>
              </div>

              <button
                onClick={onEnter}
                className="px-6 py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Launch Sakhi Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Slay Queen Affirmation Changer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.7)',
            }}
            className="text-xs font-extrabold uppercase tracking-widest text-pink-700 px-3.5 py-1 rounded-full shadow-xs"
          >
            Words of Fire & Sisterhood ✨
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif-heading font-extrabold text-slate-900">
            Your Daily Slay Queen Affirmations
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
            Watch it auto-rotate every 5 seconds, or tap change to get your instant power reminder!
          </p>
        </div>

        <SlayChanger />
      </section>

      {/* Why Sakhi is Made by CODE WIZZ Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.22) 100%)',
            backdropFilter: 'blur(32px) saturate(190%)',
            WebkitBackdropFilter: 'blur(32px) saturate(190%)',
            border: '2px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.15), inset 0 2px 3px rgba(255, 255, 255, 0.9)',
          }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 shadow-xl"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side: Creator Logo */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                }}
                className="relative p-4 rounded-3xl shadow-lg transition-all group animate-float"
              >
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-extrabold tracking-wider uppercase rounded-full shadow-md z-10">
                  Creator
                </div>
                <img
                  src="/assets/codewizz_logo.jpeg"
                  alt="CODE WIZZ"
                  style={{ width: '300px', height: '300px', maxWidth: '100%' }}
                  className="object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-pink-700 text-xs font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Crafted with Purpose by CODE WIZZ</span>
              </div>
            </div>

            {/* Right side: Why Sakhi was Made */}
            <div className="lg:col-span-7">
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(12px)',
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-pink-700 text-xs font-extrabold uppercase tracking-widest mb-3 border border-pink-200"
              >
                <span>The Vision Behind Sakhi</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold text-slate-900 leading-tight mb-4">
                Why Sakhi is Made by{' '}
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  CODE WIZZ
                </span>
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                <strong>CODE WIZZ</strong> observed a glaring gap in the current app ecosystem: women had to download separate, clunky apps for menstrual cycles, emergency safety buttons, legal guidelines, government welfare schemes, and mental health check-ins.
              </p>

              <div className="space-y-4">
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.7)',
                  }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl"
                >
                  <div className="p-2 rounded-xl bg-pink-500 text-white mt-0.5 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Safety Beyond Superficial Panic Buttons</h4>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      CODE WIZZ engineered 1-click live GPS coordinates with automated Google Maps links and simulated fake calls so women can exit awkward or intimidating situations discreetly.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.7)',
                  }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl"
                >
                  <div className="p-2 rounded-xl bg-purple-500 text-white mt-0.5 shadow-xs">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Empowerment Through Constitutional Literacy</h4>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      Legal rights shouldn't be hidden behind complex legal language. CODE WIZZ simplified Zero FIR, Domestic Violence remedies, and women's rights into digestible summaries.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.7)',
                  }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl"
                >
                  <div className="p-2 rounded-xl bg-rose-500 text-white mt-0.5 shadow-xs">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Aesthetic, Calming & Sisterhood-First UX</h4>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      Women deserve digital spaces crafted with dignity, soft comforting pastel palettes, cycle-synced nutrition advice, and an uplifting sisterhood vibe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/50 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free & Open Access
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Private & Secure
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Made with ❤️ by CODE WIZZ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slay Queen Footer */}
      <GoSlayFooter onEnter={onEnter} />
    </div>
  );
};