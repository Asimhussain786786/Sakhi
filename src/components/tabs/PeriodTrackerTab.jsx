import React, { useState } from 'react';
import {
  calculateCycleStats,
  formatDateISO,
  parseDateOnly,
} from '../../utils/periodLogic.js';
import {
  CalendarHeart,
  Settings2,
  Sparkles,
  Droplet,
  Heart,
  ChevronLeft,
  ChevronRight,
  Smile,
  AlertCircle,
  Plus,
  Check,
  Flame,
  Zap,
} from 'lucide-react';

const SYMPTOM_OPTIONS = [
  'Severe Cramps',
  'Mild Cramps',
  'Bloating',
  'Acne Breakout',
  'Tender Breasts',
  'Sweet Cravings',
  'Fatigue / Sleepy',
  'Headache',
  'Backache',
  'Mood Swings',
  'High Energy',
  'Glowy Skin',
];

const MOOD_OPTIONS = [
  { emoji: '🥰', label: 'Blessed' },
  { emoji: '⚡', label: 'Energetic' },
  { emoji: '☕', label: 'Cozy' },
  { emoji: '🥺', label: 'Sensitive' },
  { emoji: '😴', label: 'Exhausted' },
  { emoji: '😤', label: 'Irritable' },
];

export const PeriodTrackerTab = () => {
  // Cycle settings state (persisted or defaults)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sakhi_cycle_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Default to last period started 8 days ago for a vibrant follicular demo
    const defaultLast = new Date();
    defaultLast.setDate(defaultLast.getDate() - 7);
    return {
      lastPeriodDate: formatDateISO(defaultLast),
      cycleLength: 28,
      bleedDuration: 5,
    };
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  // Symptom logs
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('sakhi_symptom_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const today = formatDateISO(new Date());
    return [
      {
        date: today,
        flow: 'None',
        mood: '🥰',
        symptoms: ['Glowy Skin', 'High Energy'],
        notes: 'Drinking my morning matcha, feeling super motivated today!',
      },
    ];
  });

  // Today's log editor
  const todayStr = formatDateISO(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(todayStr);
  const existingLog = logs.find((l) => l.date === selectedDateStr);

  const [flow, setFlow] = useState(
    existingLog?.flow || 'None'
  );
  const [selectedMood, setSelectedMood] = useState(existingLog?.mood || '🥰');
  const [selectedSymptoms, setSelectedSymptoms] = useState(
    existingLog?.symptoms || []
  );
  const [notes, setNotes] = useState(existingLog?.notes || '');
  const [saveToast, setSaveToast] = useState(false);

  // Cycle stats
  const stats = calculateCycleStats(
    settings.lastPeriodDate,
    settings.cycleLength,
    settings.bleedDuration,
    new Date()
  );

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('sakhi_cycle_settings', JSON.stringify(newSettings));
    setShowSettingsModal(false);
  };

  const handleSaveLog = () => {
    const newLog = {
      date: selectedDateStr,
      flow,
      mood: selectedMood,
      symptoms: selectedSymptoms,
      notes,
    };

    const updatedLogs = logs.filter((l) => l.date !== selectedDateStr).concat(newLog);
    setLogs(updatedLogs);
    localStorage.setItem('sakhi_symptom_logs', JSON.stringify(updatedLogs));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1500);
  };

  const toggleSymptom = (sym) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  // Calendar Day Calculation
  const year = currentCalendarMonth.getFullYear();
  const month = currentCalendarMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentCalendarMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentCalendarMonth(new Date(year, month + 1, 1));

  // Determine if a calendar date matches period or ovulation
  const getDayMarker = (day) => {
    const checkDate = new Date(year, month, day);
    const checkStr = formatDateISO(checkDate);

    // Last period bleed window
    const lastStart = parseDateOnly(settings.lastPeriodDate);
    const lastEnd = new Date(lastStart);
    lastEnd.setDate(lastEnd.getDate() + settings.bleedDuration - 1);

    // Next period predicted bleed window
    const nextStart = new Date(stats.nextPeriodDate);
    const nextEnd = new Date(nextStart);
    nextEnd.setDate(nextEnd.getDate() + settings.bleedDuration - 1);

    if (
      (checkDate >= lastStart && checkDate <= lastEnd) ||
      (checkDate >= nextStart && checkDate <= nextEnd)
    ) {
      return { type: 'bleed', label: 'Period' };
    }

    // Ovulation day
    const ovStr = formatDateISO(stats.ovulationDate);
    if (checkStr === ovStr) {
      return { type: 'ovulation', label: 'Ovulation' };
    }

    // Fertile window
    if (checkDate >= stats.fertileWindowStart && checkDate <= stats.fertileWindowEnd) {
      return { type: 'fertile', label: 'Fertile' };
    }

    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title & Cycle Settings Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-pink-200/90 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Cycle Intelligence & Hormonal Balance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-extrabold text-slate-900">
            Period & Ovulation Tracker 🌸
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Understand your body's 4 distinct seasons and sync your life accordingly.
          </p>
        </div>

        <button
          onClick={() => setShowSettingsModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 transition-all cursor-pointer shadow-xs"
        >
          <Settings2 className="w-4 h-4 text-pink-600" />
          <span>Adjust Cycle Settings ({settings.cycleLength}d / {settings.bleedDuration}d)</span>
        </button>
      </div>

      {/* Hero Cycle Countdown & Phase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Countdown Gauge */}
        <div className="lg:col-span-1 bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-pink-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-100 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Day {stats.currentCycleDay} of {settings.cycleLength}
              </span>
              <span className="text-2xl animate-float">🎀</span>
            </div>

            <div className="my-4 text-center">
              <div className="text-6xl sm:text-7xl font-serif-heading font-extrabold tracking-tight">
                {stats.nextPeriodCountdownDays}
              </div>
              <div className="text-sm uppercase tracking-wider font-bold text-pink-100 mt-1">
                Days Until Next Period
              </div>
              <div className="text-xs text-pink-200 mt-0.5 font-medium">
                Expected on {stats.nextPeriodDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 mt-4">
            <div className="text-xs text-pink-100 font-bold uppercase tracking-wider">
              Predicted Ovulation
            </div>
            <div className="text-sm font-semibold text-white mt-0.5 flex items-center justify-between">
              <span>{stats.ovulationDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              <span className="text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                Fertile Window
              </span>
            </div>
          </div>
        </div>

        {/* Phase Breakdown Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl">
                  {stats.phase === 'Menstrual' ? '🩸' : stats.phase === 'Follicular' ? '🌱' : stats.phase === 'Ovulatory' ? '👑' : '🍂'}
                </span>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-pink-600">
                    Current Phase
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-heading font-bold text-slate-900">
                    {stats.phaseTitle}
                  </h3>
                </div>
              </div>

              <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Energy: {stats.energyLevel}
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {stats.phaseDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100">
                <div className="text-xs font-bold uppercase tracking-wider text-pink-700 flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-pink-500" /> Best Movement
                </div>
                <div className="text-xs text-slate-700 font-medium leading-normal">
                  {stats.recommendedMovement}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" /> Nutrition Focus
                </div>
                <div className="text-xs text-slate-700 font-medium leading-normal">
                  {stats.nutritionTip}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Phases Visual Progression Bar */}
          <div className="mt-6 pt-4 border-t border-pink-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              The 4 Cycle Phases
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  stats.phase === 'Menstrual'
                    ? 'bg-rose-500 text-white font-bold shadow-sm'
                    : 'bg-rose-50 text-rose-800 border-rose-100'
                }`}
              >
                <div className="text-xs">🩸 Days 1–{settings.bleedDuration}</div>
                <div className="text-[10px] truncate">Menstrual</div>
              </div>
              <div
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  stats.phase === 'Follicular'
                    ? 'bg-pink-500 text-white font-bold shadow-sm'
                    : 'bg-pink-50 text-pink-800 border-pink-100'
                }`}
              >
                <div className="text-xs">🌱 Days {settings.bleedDuration + 1}–12</div>
                <div className="text-[10px] truncate">Follicular</div>
              </div>
              <div
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  stats.phase === 'Ovulatory'
                    ? 'bg-amber-500 text-white font-bold shadow-sm'
                    : 'bg-amber-50 text-amber-800 border-amber-100'
                }`}
              >
                <div className="text-xs">👑 Days 13–16</div>
                <div className="text-[10px] truncate">Ovulatory</div>
              </div>
              <div
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  stats.phase === 'Luteal'
                    ? 'bg-purple-500 text-white font-bold shadow-sm'
                    : 'bg-purple-50 text-purple-800 border-purple-100'
                }`}
              >
                <div className="text-xs">🍂 Days 17–{settings.cycleLength}</div>
                <div className="text-[10px] truncate">Luteal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar & Daily Logger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Calendar (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif-heading font-bold text-slate-900 flex items-center gap-2">
              <CalendarHeart className="w-5 h-5 text-pink-500" />
              <span>
                {currentCalendarMonth.toLocaleDateString(undefined, {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                aria-label="Previous Month"
                className="p-2 rounded-xl text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMonth}
                aria-label="Next Month"
                className="p-2 rounded-xl text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Empty slots for start of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 sm:h-12 rounded-xl" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateObj = new Date(year, month, dayNum);
              const dateStr = formatDateISO(dateObj);
              const isSelected = selectedDateStr === dateStr;
              const isToday = dateStr === todayStr;
              const marker = getDayMarker(dayNum);
              const hasLog = logs.some((l) => l.date === dateStr);

              let bgClass = 'bg-slate-50 hover:bg-pink-50 text-slate-700';
              if (marker?.type === 'bleed') {
                bgClass = 'bg-rose-100 text-rose-900 border border-rose-300 font-bold';
              } else if (marker?.type === 'ovulation') {
                bgClass = 'bg-yellow-100 text-yellow-900 border border-yellow-300 font-bold';
              } else if (marker?.type === 'fertile') {
                bgClass = 'bg-purple-50 text-purple-900 border border-purple-200';
              }

              if (isSelected) {
                bgClass = 'ring-2 ring-pink-500 bg-pink-500 text-white font-extrabold shadow-sm';
              }

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-10 sm:h-12 rounded-2xl flex flex-col items-center justify-center relative text-xs sm:text-sm transition-all cursor-pointer ${bgClass}`}
                >
                  <span>{dayNum}</span>
                  {hasLog && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        isSelected ? 'bg-white' : 'bg-pink-500'
                      }`}
                    />
                  )}
                  {isToday && !isSelected && (
                    <span className="absolute -top-1 -right-1 text-[9px] bg-pink-600 text-white px-1 rounded-full font-bold">
                      Now
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="mt-6 pt-4 border-t border-pink-100 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-200 border border-rose-400" />
              <span>Period Bleed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-200 border border-yellow-400" />
              <span>Ovulation Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-purple-100 border border-purple-300" />
              <span>Fertile Window</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span>Logged Note</span>
            </div>
          </div>
        </div>

        {/* Daily Flow & Symptoms Logger (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-pink-600">
                  Daily Check-in
                </span>
                <h3 className="text-xl font-serif-heading font-bold text-slate-900">
                  Log for {selectedDateStr === todayStr ? 'Today (Now)' : selectedDateStr}
                </h3>
              </div>
              <span className="text-2xl">📝</span>
            </div>

            {/* Flow selection */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Menstrual Flow
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {['None', 'Spotting', 'Light', 'Medium', 'Heavy'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFlow(f)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      flow === f
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                How Are You Feeling?
              </label>
              <div className="grid grid-cols-6 gap-1.5">
                {MOOD_OPTIONS.map((m) => (
                  <button
                    key={m.emoji}
                    type="button"
                    onClick={() => setSelectedMood(m.emoji)}
                    title={m.label}
                    className={`p-2 text-xl rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                      selectedMood === m.emoji
                        ? 'bg-pink-100 border-pink-500 scale-105 shadow-sm'
                        : 'bg-slate-50 border-slate-100 hover:border-pink-200'
                    }`}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms Tags */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Symptoms & Body Signals
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {SYMPTOM_OPTIONS.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-pink-500 text-white border-pink-500 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-pink-300'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Sisterly Notes & Reflections
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did your cramps feel? Did a hot cup of ginger tea help?"
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div className="mt-6 pt-2">
            <button
              onClick={handleSaveLog}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-pink-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {saveToast ? (
                <>
                  <Check className="w-4 h-4 animate-scale" /> Logged Successfully!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Save Today's Log
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cycle Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif-heading font-bold text-slate-900">
                Cycle Configuration
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Customize your cycle parameters so your ovulation, fertile window, and countdown remain accurate.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Start Date of Last Period
                </label>
                <input
                  type="date"
                  value={settings.lastPeriodDate}
                  onChange={(e) =>
                    setSettings({ ...settings, lastPeriodDate: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Average Cycle Length: {settings.cycleLength} Days (Normal: 21–35 days)
                </label>
                <input
                  type="range"
                  min="21"
                  max="45"
                  value={settings.cycleLength}
                  onChange={(e) =>
                    setSettings({ ...settings, cycleLength: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bleed Duration: {settings.bleedDuration} Days (Normal: 3–7 days)
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={settings.bleedDuration}
                  onChange={(e) =>
                    setSettings({ ...settings, bleedDuration: parseInt(e.target.value, 10) })
                  }
                  className="w-full accent-pink-500"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSettings(settings)}
                  className="flex-1 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
