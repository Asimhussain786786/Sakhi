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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50/60 to-purple-50/40 text-slate-800">
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
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 text-center">
        {/* Floating Cute Emojis */}
        <div className="absolute top-8 left-6 sm:left-24 text-3xl sm:text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
          🎀
        </div>
        <div className="absolute top-16 right-6 sm:right-28 text-3xl sm:text-4xl animate-float">
          ✨
        </div>
        <div className="absolute bottom-12 left-10 sm:left-36 text-3xl sm:text-4xl animate-pulse">
          🍓
        </div>
        <div className="absolute bottom-16 right-8 sm:right-32 text-3xl sm:text-4xl animate-bounce" style={{ animationDuration: '4s' }}>
          🦋
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-bold mb-6 backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>India’s Most Aesthetic, Empowering & Pookie Companion for Women</span>
          <Sparkles className="w-4 h-4 text-pink-500" />
        </div>

        <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none max-w-5xl mx-auto">
          Your Health, Safety & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 bg-clip-text text-transparent">
            Sisterhood in One Place
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From tracking your period cycle with hormonal harmony to 1-click GPS emergency alerts, Indian legal rights, government schemes, Dr. Maya's gentle therapy, and daily routine planning — Sakhi is the bestie who always has your back.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-lg shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Enter Sakhi (Quick Login)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <a
            href="#pillars"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-pink-50/60 text-slate-700 font-bold text-sm border-2 border-pink-200/80 shadow-xs hover:border-pink-300 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore 7 Core Pillars</span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </a>
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 shadow-xs">
            <div className="text-2xl mb-1">🩸</div>
            <div className="text-sm font-bold text-slate-800">Period Harmony</div>
            <div className="text-[11px] text-pink-600">Cycle-synced lifestyle</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-rose-100 shadow-xs">
            <div className="text-2xl mb-1">🚨</div>
            <div className="text-sm font-bold text-slate-800">1-Click Master SOS</div>
            <div className="text-[11px] text-rose-600">Live GPS & WhatsApp broadcast</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-xs">
            <div className="text-2xl mb-1">⚖️</div>
            <div className="text-sm font-bold text-slate-800">Indian Law Book</div>
            <div className="text-[11px] text-purple-600">Zero FIR & POSH rights</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-teal-100 shadow-xs">
            <div className="text-2xl mb-1">🌿</div>
            <div className="text-sm font-bold text-slate-800">Therapist Dr. Maya</div>
            <div className="text-[11px] text-teal-600">Warm empathetic counseling</div>
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

      {/* Slay Queen Affirmation Changer Section (Exclusive to Home Page) */}
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

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-pink-500/20">
          <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold mb-3">
            Ready to embrace your most confident, protected self? 👑💖
          </h2>
          <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join thousands of sisters using Sakhi every day. Instant one-click demo login available!
          </p>
          <button
            onClick={onEnter}
            className="px-8 py-4 rounded-full bg-white text-pink-600 hover:bg-pink-50 font-extrabold text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Enter Sakhi Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Home Page Footer */}
      <GoSlayFooter />
    </div>
  );
};
