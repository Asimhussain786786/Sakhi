import React, { useState } from 'react';
import {
  calculateHydration,
  estimateStepsCalories,
} from '../../utils/periodLogic.js';
import {
  Activity,
  Droplet,
  Footprints,
  Plus,
  Flame,
  CheckCircle2,
  Sparkles,
  Calendar,
  Smile,
  Heart,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

const WORKOUT_TYPES = [
  'Pilates Flow',
  'Yin Yoga',
  'Vinyasa Yoga',
  'Brisk Walk',
  'Strength Conditioning',
  'Dance Cardio',
  'Barre Sculpt',
  'Cycling',
];

const INTENSITIES = ['Gentle', 'Moderate', 'Spicy'];

export const FitnessJournalTab = () => {
  // Water Tracker State
  const [glassesDrank, setGlassesDrank] = useState(() => {
    const saved = localStorage.getItem('sakhi_water_glasses');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Steps Counter State
  const [stepCount, setStepCount] = useState(() => {
    const saved = localStorage.getItem('sakhi_steps_count');
    return saved ? parseInt(saved, 10) : 4500;
  });
  const [stepGoal, setStepGoal] = useState(8000);

  // Workout History State
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('sakhi_workouts_log');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: '1',
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        type: 'Pilates Flow',
        durationMinutes: 30,
        intensity: 'Moderate',
        moodAfter: '🥰 Energized & Sassy',
        notes: 'Focused on core and pelvic glute bridges.',
      },
      {
        id: '2',
        date: 'Yesterday',
        type: 'Brisk Walk',
        durationMinutes: 45,
        intensity: 'Gentle',
        moodAfter: '🌿 Clear Headed',
        notes: 'Evening sunset walk listening to empowering podcast.',
      },
    ];
  });

  // New Workout Form
  const [newType, setNewType] = useState('Pilates Flow');
  const [newDuration, setNewDuration] = useState(30);
  const [newIntensity, setNewIntensity] = useState('Moderate');
  const [newMood, setNewMood] = useState('🥰 Energized');
  const [newNotes, setNewNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Water click handler
  const handleToggleGlass = (index) => {
    let nextCount = index + 1;
    if (index + 1 === glassesDrank) {
      nextCount = index; // uncheck if tapping highest
    }
    setGlassesDrank(nextCount);
    localStorage.setItem('sakhi_water_glasses', nextCount.toString());
  };

  const hydration = calculateHydration(glassesDrank, 8);

  // Step quick add
  const addSteps = (delta) => {
    const updated = Math.max(0, stepCount + delta);
    setStepCount(updated);
    localStorage.setItem('sakhi_steps_count', updated.toString());
  };

  const stepsStats = estimateStepsCalories(stepCount);
  const stepPercentage = Math.min(100, Math.round((stepCount / stepGoal) * 100));

  // Add Workout Handler
  const handleAddWorkout = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      type: newType,
      durationMinutes: newDuration,
      intensity: newIntensity,
      moodAfter: newMood,
      notes: newNotes,
    };

    const updated = [entry, ...workouts];
    setWorkouts(updated);
    localStorage.setItem('sakhi_workouts_log', JSON.stringify(updated));
    setShowAddForm(false);
    setNewNotes('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-fuchsia-600/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Glow-up Fitness & Intuitive Body Movement</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold tracking-tight">
              Fitness Journal & Glow Tracker ✨
            </h2>
            <p className="text-pink-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Celebrate your daily movement, drink your 8 cups of water with aesthetic pride, and track gentle steps that honor your energy levels.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-fuchsia-700 hover:bg-pink-50 font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Log Workout Session'}</span>
          </button>
        </div>
      </div>

      {/* Row 1: 8-Cup Water Intake Tracker & Daily Step Counter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 8-Cup Water Intake Tracker (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                  <Droplet className="w-5 h-5 fill-cyan-500" />
                </div>
                <div>
                  <h3 className="text-xl font-serif-heading font-extrabold text-slate-900">
                    8-Cup Hydration Tracker
                  </h3>
                  <p className="text-xs text-cyan-700 font-semibold">
                    {hydration.milliliters} ml / 2000 ml ({hydration.percentage}% of daily goal)
                  </p>
                </div>
              </div>

              {hydration.isComplete && (
                <span className="text-xs font-bold px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full flex items-center gap-1 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Hydrated Queen!
                </span>
              )}
            </div>

            {/* Interactive 8 Glasses Grid */}
            <div className="my-6 grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {Array.from({ length: 8 }).map((_, idx) => {
                const isDrank = idx < glassesDrank;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleGlass(idx)}
                    className={`h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer relative group ${
                      isDrank
                        ? 'bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-500/20 scale-105'
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-cyan-300'
                    }`}
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {isDrank ? '💧' : '🥛'}
                    </span>
                    <span className="text-[10px] font-bold">Cup {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="w-full bg-cyan-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${hydration.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 text-center">
              Tap any glass to fill or unfill. Proper hydration lubricates joints and softens uterine cramp spasms!
            </p>
          </div>
        </div>

        {/* Daily Step Counter (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Footprints className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif-heading font-extrabold text-slate-900">
                    Step Counter
                  </h3>
                  <p className="text-xs text-pink-700 font-semibold">
                    Goal: {stepGoal.toLocaleString()} steps
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-50 text-pink-700">
                {stepPercentage}%
              </span>
            </div>

            {/* Step Count Highlight */}
            <div className="text-center my-4">
              <div className="text-5xl font-serif-heading font-extrabold text-slate-900 tracking-tight">
                {stepCount.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mt-2 font-semibold">
                <span className="flex items-center gap-1 text-rose-600">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" /> ~{stepsStats.caloriesBurned} kcal
                </span>
                <span>•</span>
                <span>📍 {stepsStats.kilometers} km</span>
              </div>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
              Quick Add Steps
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => addSteps(500)}
                className="py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 transition-all cursor-pointer"
              >
                +500
              </button>
              <button
                type="button"
                onClick={() => addSteps(1000)}
                className="py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 transition-all cursor-pointer"
              >
                +1,000
              </button>
              <button
                type="button"
                onClick={() => addSteps(2500)}
                className="py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 transition-all cursor-pointer"
              >
                +2,500
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Workout Form Modal / Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleAddWorkout}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-300 shadow-xl animate-in slide-in-from-top-4 duration-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-pink-100">
            <h3 className="text-xl font-serif-heading font-extrabold text-slate-900">
              Log Today's Movement 🎀
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-slate-600 font-bold text-sm"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Workout Activity
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl text-sm font-semibold text-slate-800 bg-white"
              >
                {WORKOUT_TYPES.map((wt) => (
                  <option key={wt} value={wt}>
                    {wt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duration (Minutes): {newDuration}m
              </label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={newDuration}
                onChange={(e) => setNewDuration(parseInt(e.target.value, 10))}
                className="w-full accent-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Intensity Level
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {INTENSITIES.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setNewIntensity(lvl)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      newIntensity === lvl
                        ? 'bg-fuchsia-600 text-white border-fuchsia-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Post-Workout Mood / Vibe
              </label>
              <input
                type="text"
                value={newMood}
                onChange={(e) => setNewMood(e.target.value)}
                placeholder="e.g. Glowing & Euphoric, Relaxed, Strong"
                className="w-full px-3 py-2 border border-pink-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Notes / Highlights
              </label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="e.g. Held plank for 60s, gentle on lower back"
                className="w-full px-3 py-2 border border-pink-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 cursor-pointer"
            >
              Save Workout Log 💅
            </button>
          </div>
        </form>
      )}

      {/* Workout History Log Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-serif-heading font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-fuchsia-500" />
            <span>Recent Movement Sessions</span>
          </h3>
          <span className="text-xs font-bold text-fuchsia-700 bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200">
            {workouts.length} Recorded Workouts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts.map((w) => (
            <div
              key={w.id}
              className="p-5 rounded-2xl bg-gradient-to-br from-pink-50/40 via-white to-fuchsia-50/30 border border-pink-100 hover:border-pink-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                    {w.date}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      w.intensity === 'Spicy'
                        ? 'bg-rose-100 text-rose-800'
                        : w.intensity === 'Moderate'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {w.intensity}
                  </span>
                </div>

                <div className="text-lg font-bold text-slate-900 mb-1">{w.type}</div>
                <div className="text-xs text-slate-500 mb-3 font-semibold">
                  ⏱️ {w.durationMinutes} minutes duration
                </div>

                <div className="text-xs font-semibold text-fuchsia-800 bg-white/80 p-2.5 rounded-xl border border-pink-100 mb-2">
                  Post-workout vibe: {w.moodAfter}
                </div>

                {w.notes && <p className="text-xs text-slate-600 italic">"{w.notes}"</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
