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

export const LandingPage = ({ onEnter }) => {
  return (
    <div className="min-h-screen text-slate-800" style={{ backgroundColor: '#FFE2E2' }}>
      {/* Top Banner Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-2xl shadow-md shadow-pink-500/20 animate-float">
            🌸
          </div>
          <div>
            <span className="font-serif-heading font-extrabold text-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
              Sakhi
            </span>
            <span className="ml-1.5 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
              सखी
            </span>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          <span>Enter Sakhi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Floating Doodle 1: Period Calendar Doodle in the clear Top-Left Corner */}
        <div className="absolute top-1 left-4 sm:left-8 animate-bounce pointer-events-none drop-shadow-sm z-10" style={{ animationDuration: '3.5s' }}>
          <img
            src="/assets/periodsdoodle.png"
            alt="Period Calendar Doodle"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none"
          />
        </div>

        {/* Floating Doodle 2: Dr. Maya AI Robot Companion in the clear Top-Right Corner */}
        <div className="absolute top-1 right-4 sm:right-8 animate-float pointer-events-none drop-shadow-sm z-10" style={{ animationDuration: '4s' }}>
          <img
            src="/assets/robotdoodle.png"
            alt="AI Robot Doodle"
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain select-none"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-bold mb-6 backdrop-blur-xs shadow-xs">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>India’s Most Aesthetic, Empowering & Pookie Companion for Women</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
              Your Health, Safety & <br />
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
                Sisterhood in One Place
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
              From tracking your period cycle with hormonal harmony to 1-click GPS emergency alerts, Indian legal rights, government schemes, Dr. Maya's gentle therapy, and daily routine planning — Sakhi is the bestie who always has your back.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onEnter}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Sakhi (Quick Login)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#pillars"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-pink-50/60 text-slate-700 font-bold text-sm border border-pink-200/80 shadow-xs hover:border-pink-300 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore 7 Core Pillars</span>
                <Sparkles className="w-4 h-4 text-pink-500" />
              </a>
            </div>

            {/* Floating Doodle 3: Fitness Journal below CTA buttons */}
            <div className="mt-8 flex items-center gap-3">
              <div className="animate-bounce pointer-events-none drop-shadow-xs shrink-0" style={{ animationDuration: '3.5s' }}>
                <img
                  src="/assets/fitnessdoodle.png"
                  alt="Fitness Journal Doodle"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 border border-pink-200/70 text-xs font-bold text-pink-700 shadow-xs backdrop-blur-xs">
                <span>✨ Cycle-Synced Lifestyle & Daily Routine Planner</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image (Sisterhood Artwork with 20px border radius) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute -top-4 right-12 text-lg text-rose-400 animate-pulse pointer-events-none select-none">
              ✨
            </div>
            <div className="absolute top-1/4 -right-2 text-xl text-amber-300 animate-spin pointer-events-none select-none" style={{ animationDuration: '8s' }}>
              ✨
            </div>

            <div className="relative w-full max-w-xl lg:max-w-2xl flex justify-center items-center py-2">
              <img
                src="/assets/grpupgirls.png"
                alt="Sakhi Sisterhood"
                className="w-full h-auto object-contain max-h-[530px] rounded-[20px] scale-105 sm:scale-108 -translate-x-3 sm:-translate-x-6 lg:-translate-x-8 drop-shadow-[0_14px_32px_rgba(244,114,182,0.3)] hover:scale-110 transition-transform duration-300 ease-out select-none pointer-events-auto"
                style={{ borderRadius: '20px' }}
              />
            </div>
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="relative mt-12">
          {/* Floating Doodle 4: Emergency SOS Shield Doodle */}
          <div className="hidden sm:flex justify-between items-center max-w-6xl mx-auto px-2 mb-3.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-pink-600 bg-white/80 px-3 py-1 rounded-full border border-pink-200/70 shadow-xs">
              Quick Highlights
            </span>
            <div className="flex items-center gap-2 animate-float pointer-events-none" style={{ animationDuration: '4s' }}>
              <img
                src="/assets/medicaldoodle.png"
                alt="SOS Safety Shield Doodle"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain select-none drop-shadow-xs"
              />
              <span className="text-xs font-bold text-rose-600 bg-white/80 px-3 py-1 rounded-full border border-rose-200/70 shadow-xs">
                1-Tap Live GPS & Emergency SOS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="w-10 h-10 mx-auto mb-1.5 flex items-center justify-center animate-float" style={{ animationDuration: '4s' }}>
                <img
                  src="/assets/periodsdoodle.png"
                  alt="Period Harmony"
                  className="w-9 h-9 object-contain select-none group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-sm font-extrabold text-slate-800">Period Harmony</div>
              <div className="text-xs text-pink-600 font-medium mt-0.5">Cycle-synced lifestyle</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="w-10 h-10 mx-auto mb-1.5 flex items-center justify-center animate-bounce" style={{ animationDuration: '3.5s' }}>
                <img
                  src="/assets/medicaldoodle.png"
                  alt="1-Click SOS"
                  className="w-9 h-9 object-contain select-none group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-sm font-extrabold text-slate-800">1-Click Master SOS</div>
              <div className="text-xs text-rose-600 font-medium mt-0.5">Live GPS & WhatsApp broadcast</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="text-3xl mb-1.5 flex justify-center group-hover:scale-110 transition-transform">⚖️</div>
              <div className="text-sm font-extrabold text-slate-800">Indian Law Book</div>
              <div className="text-xs text-purple-600 font-medium mt-0.5">Zero FIR & POSH rights</div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-pink-100/90 shadow-sm hover:shadow-md transition-all text-center group">
              <div className="w-10 h-10 mx-auto mb-1.5 flex items-center justify-center animate-float" style={{ animationDuration: '4.5s' }}>
                <img
                  src="/assets/robotdoodle.png"
                  alt="Dr. Maya AI"
                  className="w-9 h-9 object-contain select-none group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="text-sm font-extrabold text-slate-800">Therapist Dr. Maya</div>
              <div className="text-xs text-teal-600 font-medium mt-0.5">Warm empathetic counseling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sakhi is Essential Section */}
      <section className="py-16 bg-white/70 border-y border-pink-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
              Why Sakhi Is Essential
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900">
              Built with Empathy, Designed for Safety & Daily Joy
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Every woman deserves a single trusted space where her physical health, personal safety, legal rights, mental well-being, and daily ambitions flourish together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-3xl border border-pink-100">
              <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-pink-500/20">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Uncompromising Safety</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When walking alone at night or in an uneasy cab, one tap grabs your exact GPS coordinates, crafts an active Google Maps SOS link, and alerts your family and 112 with zero delay.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-purple-50 p-6 rounded-3xl border border-rose-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-rose-500/20">
                👑
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Knowledge is Sovereignty</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Indian women have formidable legal protections—from Zero FIR to sunset arrest rules and free legal aid. Sakhi demystifies complex legal language into plain, actionable superpowers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border border-purple-100">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-xl mb-4 shadow-md shadow-purple-500/20">
                🌸
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hormonal & Mental Peace</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your body isn't a 24-hour machine; it operates on a 28-day symphony. Sync your fitness, seed cycling, hydration, and mental unwinding with your natural biological rhythms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Core Pillars Detailed Grid */}
      <section id="pillars" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            The 7 Core Pillars
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-serif-heading font-bold text-slate-900">
            Everything You Need, In Its Own Dedicated Tab
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            No endless menus or messy feeds. Click into any pillar anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CalendarHeart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Period Tracker</h3>
            <p className="text-sm text-slate-600 mb-4">
              Monthly cycle forecast, countdown to next period, ovulation window, flow & symptom logging, plus Menstrual, Follicular, Ovulatory, and Luteal phase insights.
            </p>
            <ul className="text-xs text-pink-700 space-y-1 font-semibold">
              <li>✨ Phase-specific hormone guidance</li>
              <li>✨ Adjustable cycle & bleed duration</li>
              <li>✨ Daily cramp, mood & craving tracker</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-red-100 hover:border-red-300 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Emergency SOS</h3>
            <p className="text-sm text-slate-600 mb-4">
              One-click live GPS fetch with Google Maps link, WhatsApp & SMS instant alerts to family, direct dial for 112/1091, loud siren alarm, and fake call escape simulator!
            </p>
            <ul className="text-xs text-red-600 space-y-1 font-semibold">
              <li>🚨 One-click WhatsApp & SMS SOS</li>
              <li>🚨 Loud audio siren deterrent</li>
              <li>🚨 Realistic fake incoming call simulator</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Resource Hub</h3>
            <p className="text-sm text-slate-600 mb-4">
              Good vs bad foods, intimate hygiene truths, debunked myths, seed cycling formulas (Pumpkin/Flax & Sunflower/Sesame), and cramp-relieving yoga poses with timers.
            </p>
            <ul className="text-xs text-rose-700 space-y-1 font-semibold">
              <li>🌿 Balasana, Supta Baddha Konasana yoga</li>
              <li>🌿 PCOS & exam stress survival protocols</li>
              <li>🌿 Gynecologist red flags check</li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">4. Your Law Book</h3>
            <p className="text-sm text-slate-600 mb-4">
              Plain-language summaries of Zero FIR, Domestic Violence Act (2005), POSH workplace harassment, MTP abortion rights (2021), Night arrest CrPC 46(4), and Free Legal Aid.
            </p>
            <ul className="text-xs text-purple-700 space-y-1 font-semibold">
              <li>⚖️ Filterable & searchable Indian laws</li>
              <li>⚖️ Step-by-step reporting instructions</li>
              <li>⚖️ NALSA 15100 free advocate access</li>
            </ul>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">5. Women’s Welfare</h3>
            <p className="text-sm text-slate-600 mb-4">
              Verified Indian government schemes: Sukanya Samriddhi (8.2%), Stand-Up India (up to ₹1 Crore), PMMVY maternity benefits, One Stop Centres, and Working Women Hostels.
            </p>
            <ul className="text-xs text-emerald-700 space-y-1 font-semibold">
              <li>🏛️ Eligibility criteria & key financial perks</li>
              <li>🏛️ Direct clickable links to official portals</li>
              <li>🏛️ Filter by student, mother, or entrepreneur</li>
            </ul>
          </div>

          {/* Pillar 6 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">6. Therapist Dr. Maya</h3>
            <p className="text-sm text-slate-600 mb-4">
              A warm, comforting counselor for emotional burnout, relationship tensions, and PMS mood swings, plus interactive 4-7-8 breathing circle and crisis helpline buttons.
            </p>
            <ul className="text-xs text-teal-700 space-y-1 font-semibold">
              <li>🌸 Empathetic, supportive responses</li>
              <li>🌸 Animated 4-7-8 breathwork guide</li>
              <li>🌸 Tele-MANAS (14416) crisis access</li>
            </ul>
          </div>

          {/* Pillar 7 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-fuchsia-100 hover:border-fuchsia-300 shadow-sm hover:shadow-md transition-all group md:col-span-2 lg:col-span-3">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <ListTodo className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">7. Fitness Journal & My Day Planner</h3>
                </div>
                <p className="text-sm text-slate-600 max-w-2xl">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-pink-600 bg-pink-100 px-3.5 py-1 rounded-full">
            Words of Fire & Sisterhood ✨
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-serif-heading font-extrabold text-slate-900">
            Your Daily Slay Queen Affirmations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Watch it auto-rotate every 5 seconds, or tap change to get your instant power reminder!
          </p>
        </div>

        <SlayChanger />
      </section>

      {/* Why Sakhi is Made by CODE WIZZ Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-white/95 border-2 border-pink-200/90 p-8 sm:p-12 shadow-xl shadow-pink-900/5 backdrop-blur-sm">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-pink-200/40 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-rose-200/40 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left side: Creator Logo */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative p-4 rounded-3xl bg-white border-2 border-pink-100 shadow-lg shadow-pink-500/10 hover:shadow-xl transition-all group animate-float">
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
              <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Crafted with Purpose by CODE WIZZ</span>
              </div>
            </div>

            {/* Right side: Why Sakhi was Made */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold uppercase tracking-widest mb-3">
                <span>The Vision Behind Sakhi</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold text-slate-900 leading-tight mb-4">
                Why Sakhi is Made by{' '}
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                  CODE WIZZ
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                <strong>CODE WIZZ</strong> observed a glaring gap in the current app ecosystem: women had to download separate, clunky apps for menstrual cycles, emergency safety buttons, legal guidelines, government welfare schemes, and mental health check-ins.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100">
                  <div className="p-2 rounded-xl bg-pink-500 text-white mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Safety Beyond Superficial Panic Buttons</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      CODE WIZZ engineered 1-click live GPS coordinates with automated Google Maps links and simulated fake calls so women can exit awkward or intimidating situations discreetly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="p-2 rounded-xl bg-purple-500 text-white mt-0.5">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Empowerment Through Constitutional Literacy</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Legal rights shouldn't be hidden behind complex legal language. CODE WIZZ simplified Zero FIR, Domestic Violence remedies, and women's rights into digestible summaries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <div className="p-2 rounded-xl bg-rose-500 text-white mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Aesthetic, Calming & Sisterhood-First UX</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Women deserve digital spaces crafted with dignity, soft comforting pastel palettes, cycle-synced nutrition advice, and an uplifting sisterhood vibe.
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-pink-100 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free & Open Access
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Private & Secure
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Made with ❤️ by CODE WIZZ
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