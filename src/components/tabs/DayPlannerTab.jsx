import React, { useState, useEffect } from 'react';
import { formatDateISO } from '../../utils/periodLogic.js';
import {
  ListTodo,
  Star,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  Heart,
  Save,
  Check,
  Coffee,
  Sun,
  Moon,
  Smile,
} from 'lucide-react';

const MOODS = [
  { emoji: '👑', label: 'Unstoppable' },
  { emoji: '🥰', label: 'Blessed' },
  { emoji: '⚡', label: 'Energetic' },
  { emoji: '☕', label: 'Cozy' },
  { emoji: '😴', label: 'Low Battery' },
  { emoji: '🥺', label: 'Sensitive' },
];

const TEMPLATES = {
  'Glow-Up Morning': {
    priorities: ['10-min morning meditation & water', '30-min Pilates or walk', 'Review day goals'],
    tasks: [
      'Drink 500ml warm lemon water',
      'Gentle facial massage & SPF 50',
      'Healthy protein breakfast (chia/eggs)',
      '15-minute sunshine exposure',
    ],
    brainDump: 'Remember: Your peace of mind is your greatest wealth today. Move with grace! ✨',
  },
  'Period Day 1 Chill': {
    priorities: ['Hot water bottle & warm tea', 'Rest without guilt', 'Light nourishing warm soup'],
    tasks: [
      'Brew fresh ginger & cinnamon tea',
      'Balasana child pose stretch for 5 mins',
      'Wear super comfy cotton loose clothes',
      'Take 20-min afternoon restorative nap',
    ],
    brainDump: 'Today my body is renewing itself. Slower is better. No overexertion allowed! 🌸',
  },
  'Exam / Hustle Focus': {
    priorities: ['Finish high-yield study topic', 'Hydrate with electrolytes', 'No social doomscrolling'],
    tasks: [
      '2x 50-minute Pomodoro focus blocks',
      'Review formula cheat sheets',
      '5-minute screen-free eye rest',
      'Healthy brain snack (walnuts & dark chocolate)',
    ],
    brainDump: 'I am smart, capable, and prepared. The universe rewards focused work! 📚⚡',
  },
};

export const DayPlannerTab = () => {
  const todayStr = formatDateISO(new Date());

  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem('sakhi_day_planner');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      date: todayStr,
      mood: '👑',
      priorities: [
        'Complete morning workout & hydrate',
        'Review legal empowerment notes in Sakhi',
        'Pamper session: evening skincare & face mask',
      ],
      completedPriorities: [true, false, false],
      tasks: [
        { id: '1', title: 'Drink 2 glasses of warm water with lemon', completed: true, category: 'Morning' },
        { id: '2', title: 'Prepare fresh roasted seed mix (Pumpkin & Flax)', completed: true, category: 'Morning' },
        { id: '3', title: 'Deep focus work sprint (no distractions)', completed: false, category: 'Afternoon' },
        { id: '4', title: 'Brisk 30-minute nature walk', completed: false, category: 'Afternoon' },
        { id: '5', title: 'Unwind with Dr. Maya 4-7-8 breathing circle', completed: false, category: 'Evening' },
        { id: '6', title: 'Read 10 pages of cozy book before bed', completed: false, category: 'Evening' },
        { id: '7', title: 'Gentle foot soak & lavender oil massage', completed: false, category: 'Self-Care' },
      ],
      brainDump:
        '✨ Gratitude dump:\n- Grateful for my body’s resilience\n- Loved the morning sunrise\n- Remember to text mom back tonight!',
    };
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Morning');
  const [saveToast, setSaveToast] = useState(false);

  // Auto-save on change
  useEffect(() => {
    localStorage.setItem('sakhi_day_planner', JSON.stringify(planner));
  }, [planner]);

  const handleTogglePriority = (index) => {
    const updated = [...planner.completedPriorities];
    updated[index] = !updated[index];
    setPlanner({ ...planner, completedPriorities: updated });
  };

  const handleUpdatePriorityText = (index, text) => {
    const updated = [...planner.priorities];
    updated[index] = text;
    setPlanner({ ...planner, priorities: updated });
  };

  const handleToggleTask = (id) => {
    const updated = planner.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setPlanner({ ...planner, tasks: updated });
  };

  const handleDeleteTask = (id) => {
    const updated = planner.tasks.filter((t) => t.id !== id);
    setPlanner({ ...planner, tasks: updated });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      category: newTaskCategory,
    };
    setPlanner({ ...planner, tasks: [...planner.tasks, newTask] });
    setNewTaskTitle('');
  };

  const applyTemplate = (key) => {
    const tmpl = TEMPLATES[key];
    if (!tmpl) return;

    const newTasks = tmpl.tasks.map((title, i) => ({
      id: `${Date.now()}-${i}`,
      title,
      completed: false,
      category: i < 2 ? 'Morning' : 'Self-Care',
    }));

    setPlanner({
      ...planner,
      priorities: tmpl.priorities,
      completedPriorities: [false, false, false],
      tasks: [...planner.tasks, ...newTasks],
      brainDump: `${planner.brainDump}\n\n[Applied: ${key}]\n${tmpl.brainDump}`,
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1500);
  };

  const categories = [
    'Morning',
    'Afternoon',
    'Evening',
    'Self-Care',
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-400 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-500/15 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Aesthetic Digital Spiral Notepad & Agenda</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold tracking-tight">
              My Day Planner & Self-Care Log 📓✨
            </h2>
            <p className="text-amber-50 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Prioritize what matters with zero guilt. Set your top 3 non-negotiables, track daily routines, and write your freeform morning brain dump.
            </p>
          </div>

          {/* Quick Template Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(TEMPLATES).map((key) => (
              <button
                key={key}
                onClick={() => applyTemplate(key)}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs transition-all cursor-pointer"
              >
                + {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spiral Notepad Shell Container */}
      <div className="relative rounded-3xl bg-[#fffdf9] border-2 border-pink-200/90 shadow-2xl p-6 sm:p-10 overflow-hidden">
        {/* Cute spiral binder rings on top */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-amber-100/60 flex items-center justify-around px-8 border-b border-amber-200/60">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-5 rounded-full bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 border border-slate-500/50 shadow-xs"
            />
          ))}
        </div>

        {/* Notepad Top Bar: Date & Mood Selector */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-pink-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
              Today's Page
            </span>
            <h3 className="text-2xl font-serif-heading font-extrabold text-slate-900">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h3>
          </div>

          {/* Mood of the Day */}
          <div className="flex items-center gap-2 bg-pink-50/70 p-2 rounded-2xl border border-pink-200">
            <span className="text-xs font-bold text-slate-600 pl-1">Vibe:</span>
            <div className="flex gap-1">
              {MOODS.map((m) => (
                <button
                  key={m.emoji}
                  type="button"
                  onClick={() => setPlanner({ ...planner, mood: m.emoji })}
                  title={m.label}
                  className={`p-1.5 rounded-xl text-lg transition-all cursor-pointer ${
                    planner.mood === m.emoji
                      ? 'bg-pink-500 scale-110 shadow-sm'
                      : 'hover:bg-pink-100'
                  }`}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Non-Negotiable Priorities Card */}
        <div className="my-8 p-6 rounded-3xl bg-gradient-to-r from-pink-50/80 via-rose-50/60 to-purple-50/80 border-2 border-pink-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h4 className="text-lg font-serif-heading font-bold text-slate-900">
                Top 3 Daily Non-Negotiable Priorities
              </h4>
            </div>
            <span className="text-xs text-pink-700 font-bold">
              {planner.completedPriorities.filter(Boolean).length}/3 Completed ✨
            </span>
          </div>

          <div className="space-y-3">
            {[0, 1, 2].map((idx) => {
              const isDone = planner.completedPriorities[idx];
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-pink-100 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => handleTogglePriority(idx)}
                    className="p-1 text-pink-500 hover:scale-110 transition-transform cursor-pointer"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 fill-pink-500 text-white" />
                    ) : (
                      <Circle className="w-6 h-6 text-pink-300" />
                    )}
                  </button>

                  <input
                    type="text"
                    value={planner.priorities[idx]}
                    onChange={(e) => handleUpdatePriorityText(idx, e.target.value)}
                    placeholder={`Priority #${idx + 1}...`}
                    className={`flex-1 text-sm font-semibold focus:outline-none bg-transparent ${
                      isDone ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Categorized Tasks & Brain Dump Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Categorized Task Checklist (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-serif-heading font-bold text-slate-900 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-pink-500" />
                <span>Daily Routine Checklist</span>
              </h4>
              <span className="text-xs text-slate-400 font-semibold">
                {planner.tasks.filter((t) => t.completed).length} / {planner.tasks.length} done
              </span>
            </div>

            {/* Quick Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2">
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-pink-200 bg-pink-50/60 text-pink-800 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new cute task or ritual..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Category Groups */}
            <div className="space-y-4">
              {categories.map((cat) => {
                const catTasks = planner.tasks.filter((t) => t.category === cat);
                if (catTasks.length === 0) return null;

                const icon =
                  cat === 'Morning' ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : cat === 'Afternoon' ? (
                    <Coffee className="w-4 h-4 text-orange-500" />
                  ) : cat === 'Evening' ? (
                    <Moon className="w-4 h-4 text-purple-500" />
                  ) : (
                    <Heart className="w-4 h-4 text-rose-500" />
                  );

                return (
                  <div key={cat} className="p-4 rounded-2xl bg-white border border-pink-100 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 pb-1 border-b border-slate-100">
                      {icon}
                      <span>{cat} Rituals</span>
                    </div>

                    <div className="space-y-2">
                      {catTasks.map((t) => (
                        <div
                          key={t.id}
                          className="flex items-center justify-between gap-2 text-xs py-1 group"
                        >
                          <label className="flex items-center gap-2 flex-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={t.completed}
                              onChange={() => handleToggleTask(t.id)}
                              className="w-4 h-4 rounded-md accent-pink-500 cursor-pointer"
                            />
                            <span
                              className={`transition-all ${
                                t.completed ? 'line-through text-slate-400' : 'text-slate-800'
                              }`}
                            >
                              {t.title}
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={() => handleDeleteTask(t.id)}
                            className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brain Dump & Notepad (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-serif-heading font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">💭</span>
                  <span>Brain Dump & Reflections</span>
                </h4>
                <span className="text-[11px] text-pink-600 font-bold bg-pink-100 px-2 py-0.5 rounded-full">
                  Auto-saving
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Empty unorganized thoughts, gratitude, ideas, or song lyrics.
              </p>

              {/* Lined notebook styling */}
              <div className="p-4 rounded-3xl bg-[#fefbf6] border-2 border-amber-200/80 shadow-inner">
                <textarea
                  value={planner.brainDump}
                  onChange={(e) => setPlanner({ ...planner, brainDump: e.target.value })}
                  rows={14}
                  className="w-full text-xs font-handwriting text-slate-800 focus:outline-none bg-transparent leading-relaxed text-base resize-none"
                  placeholder="Dear Sakhi diary... Today I noticed that..."
                />
              </div>
            </div>

            {saveToast && (
              <div className="text-xs text-emerald-700 font-bold flex items-center gap-1 justify-center bg-emerald-50 py-2 rounded-xl border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Template applied & saved!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
