import React, { useState, useEffect } from 'react';
import {
  YOGA_POSES,
  CYCLE_SYNCED_WORKOUTS,
  SEED_CYCLING_GUIDE,
  SITUATIONAL_GUIDANCE,
  NUTRITION_AND_HYGIENE,
} from '../../data/resourcesData.js';
import {
  Sparkles,
  Heart,
  ShieldAlert,
  Apple,
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';

export const ResourceHubTab = () => {
  const [activeSection, setActiveSection] = useState('nutrition-hygiene');

  // Yoga Pose Timer State
  const [activeYogaPose, setActiveYogaPose] = useState(YOGA_POSES[0]);
  const [timerSeconds, setTimerSeconds] = useState(180); // default 3 mins
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const selectPose = (pose) => {
    setActiveYogaPose(pose);
    setTimerRunning(false);
    if (pose.id === 'balasana') setTimerSeconds(180);
    else if (pose.id === 'supta-baddha-konasana') setTimerSeconds(300);
    else if (pose.id === 'cat-cow') setTimerSeconds(150);
    else if (pose.id === 'legs-up-wall') setTimerSeconds(480);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    selectPose(activeYogaPose);
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-pink-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Holistic Wellness & Body Literacy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-extrabold text-slate-900">
            Resource Hub & Wellness Encyclopedia 🌿
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Evidence-based nutrition, intimate care, seed cycling, situational healing protocols, and cramp-melting restorative yoga.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-pink-50/70 p-1.5 rounded-2xl border border-pink-200 self-stretch md:self-auto">
          <button
            onClick={() => setActiveSection('nutrition-hygiene')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'nutrition-hygiene'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            🥗 Good & Bad Habits
          </button>
          <button
            onClick={() => setActiveSection('situations')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'situations'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            ⚡ What to Avoid / Eat
          </button>
          <button
            onClick={() => setActiveSection('seed-cycle')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'seed-cycle'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            🌱 Seed Cycling
          </button>
          <button
            onClick={() => setActiveSection('fitness-yoga')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'fitness-yoga'
                ? 'bg-pink-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-pink-600'
            }`}
          >
            🧘‍♀️ Yoga & Workouts
          </button>
        </div>
      </div>

      {/* 1. Good & Bad Things for Women (Nutrition, Intimate Hygiene, Myths) */}
      {activeSection === 'nutrition-hygiene' && (
        <div className="space-y-8">
          {/* Nutrition vs Hygiene Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Nutrition */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🥑</span>
                <div>
                  <h3 className="text-xl font-serif-heading font-bold text-slate-900">
                    Essential Daily Nutrition
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold">Feed your hormones & vitality</p>
                </div>
              </div>

              <div className="space-y-4">
                {NUTRITION_AND_HYGIENE.nutrition.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <div className="text-sm font-bold text-emerald-950 flex items-center gap-2 mb-1">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intimate Hygiene Habits */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚿</span>
                <div>
                  <h3 className="text-xl font-serif-heading font-bold text-slate-900">
                    Intimate Hygiene Habits
                  </h3>
                  <p className="text-xs text-pink-700 font-semibold">Protect your natural vaginal flora</p>
                </div>
              </div>

              <div className="space-y-4">
                {NUTRITION_AND_HYGIENE.hygiene.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                    <div className="text-sm font-bold text-pink-950 flex items-center gap-2 mb-1">
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Debunked Myths vs Realities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="text-xl font-serif-heading font-bold text-slate-900">
                  Debunked Myths vs Scientific Realities
                </h3>
                <p className="text-xs text-purple-600 font-semibold">Breaking generations of misinformation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NUTRITION_AND_HYGIENE.myths.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2">
                  <div className="text-xs font-bold text-red-600 flex items-start gap-1.5">
                    <span className="text-sm">❌</span>
                    <span>{item.myth}</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-700 flex items-start gap-1.5 pt-1 border-t border-purple-100">
                    <span className="text-sm">✅</span>
                    <span className="text-slate-700 font-medium">{item.reality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flag Warning Box */}
          <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertOctagon className="w-6 h-6 text-rose-600" />
              <h4 className="text-lg font-serif-heading font-bold text-rose-950">
                Red Flag Symptoms: When to Visit a Gynecologist Immediately
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-rose-900 font-medium">
              {NUTRITION_AND_HYGIENE.redFlags.map((rf, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 2. What to Avoid or Consume in Different Situations */}
      {activeSection === 'situations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITUATIONAL_GUIDANCE.map((sit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif-heading font-bold text-slate-900 mb-4 pb-2 border-b border-pink-100">
                  {sit.situation}
                </h3>

                {/* Avoid Column */}
                <div className="mb-4">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-rose-600 flex items-center gap-1.5 mb-2">
                    <span>🛑 Strict Avoidances</span>
                  </div>
                  <ul className="space-y-1.5">
                    {sit.avoid.map((a, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-rose-500 font-bold">✕</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consume Column */}
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5 mb-2">
                    <span>✨ Nourish & Consume</span>
                  </div>
                  <ul className="space-y-1.5">
                    {sit.consume.map((c, i) => (
                      <li key={i} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Maintaining a Good Period Cycle & Seed Cycling */}
      {activeSection === 'seed-cycle' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-500/15">
            <h3 className="text-2xl sm:text-3xl font-serif-heading font-extrabold mb-2">
              The Ancient Science of Seed Cycling 🌻🎃
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Seed cycling utilizes specific nutrient profiles (zinc, selenium, omega-3, lignans, Vitamin E) in raw seeds across your two cycle phases to naturally balance estrogen and progesterone without synthetic side-effects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phase 1 Seeds */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🎃</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                    Cycle Days 1 to 14
                  </span>
                  <h4 className="text-xl font-serif-heading font-bold text-slate-900">
                    {SEED_CYCLING_GUIDE.phase1.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-sm mb-4">
                {SEED_CYCLING_GUIDE.phase1.seeds}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {SEED_CYCLING_GUIDE.phase1.howItWorks}
              </p>

              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
                <span className="font-bold text-amber-700">How to eat: </span>
                {SEED_CYCLING_GUIDE.phase1.tips}
              </div>
            </div>

            {/* Phase 2 Seeds */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🌻</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                    Cycle Days 15 to 28
                  </span>
                  <h4 className="text-xl font-serif-heading font-bold text-slate-900">
                    {SEED_CYCLING_GUIDE.phase2.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-sm mb-4">
                {SEED_CYCLING_GUIDE.phase2.seeds}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {SEED_CYCLING_GUIDE.phase2.howItWorks}
              </p>

              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
                <span className="font-bold text-rose-700">How to eat: </span>
                {SEED_CYCLING_GUIDE.phase2.tips}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Fitness: Cycle-Synced Workouts & Step-by-Step Cramp Relieving Yoga */}
      {activeSection === 'fitness-yoga' && (
        <div className="space-y-8">
          {/* Yoga Cramp Reliever with Interactive Timer */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-pink-600">
                  Instant Cramp Relief
                </span>
                <h3 className="text-2xl font-serif-heading font-bold text-slate-900">
                  Step-by-Step Menstrual Yoga & Timer 🧘‍♀️
                </h3>
              </div>

              {/* Timer Widget */}
              <div className="flex items-center gap-3 bg-pink-50 p-3 rounded-2xl border border-pink-200">
                <Clock className="w-5 h-5 text-pink-500" />
                <span className="font-mono text-2xl font-extrabold text-pink-700">
                  {formatTimer(timerSeconds)}
                </span>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="p-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white shadow-xs cursor-pointer"
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2 rounded-xl text-slate-500 hover:bg-pink-100 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pose selector pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {YOGA_POSES.map((pose) => (
                <button
                  key={pose.id}
                  onClick={() => selectPose(pose)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    activeYogaPose.id === pose.id
                      ? 'bg-pink-500 text-white border-pink-500 shadow-md scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-pink-300'
                  }`}
                >
                  <div className="text-xl mb-1">{pose.emoji}</div>
                  <div className="text-xs font-bold truncate">{pose.englishName}</div>
                  <div
                    className={`text-[10px] truncate ${
                      activeYogaPose.id === pose.id ? 'text-pink-100' : 'text-slate-400'
                    }`}
                  >
                    {pose.sanskritName}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Pose Detailed Card */}
            <div className="p-6 rounded-3xl bg-pink-50/60 border border-pink-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-xl font-serif-heading font-extrabold text-slate-900">
                    {activeYogaPose.englishName} ({activeYogaPose.sanskritName})
                  </h4>
                  <p className="text-xs text-pink-700 font-semibold">{activeYogaPose.benefits}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-white text-pink-600 rounded-full border border-pink-200">
                  Recommended: {activeYogaPose.duration}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Step-by-Step Posture Guide:
                  </div>
                  <ol className="space-y-2">
                    {activeYogaPose.steps.map((st, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-pink-200 text-pink-800 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-pink-200 text-xs text-slate-700">
                    <div className="font-bold text-pink-600 uppercase tracking-wider text-[11px] mb-1">
                      🫁 Breathing Rhythm
                    </div>
                    {activeYogaPose.breathingTip}
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-pink-200 text-xs text-slate-700">
                    <div className="font-bold text-rose-600 uppercase tracking-wider text-[11px] mb-1">
                      🌸 Why It Melts Cramps
                    </div>
                    {activeYogaPose.whyItHelpsCramps}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cycle-Synced Workout Matrix */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-fuchsia-100 shadow-sm">
            <h3 className="text-xl font-serif-heading font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-fuchsia-500" />
              <span>Cycle-Synced Movement Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CYCLE_SYNCED_WORKOUTS.map((csw, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                      {csw.theme}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">{csw.phase}</h4>
                    <p className="text-[11px] text-slate-500 mb-3">{csw.hormones}</p>

                    <div className="mb-3">
                      <div className="text-[11px] font-bold text-emerald-700 mb-1">
                        Best Workouts:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-0.5">
                        {csw.bestWorkouts.map((bw, i) => (
                          <li key={i}>• {bw}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 italic pt-3 border-t border-slate-200 mt-2">
                    "{csw.energyNote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
