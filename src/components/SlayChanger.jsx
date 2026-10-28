import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, ChevronLeft, ChevronRight, Pause, Play, Heart } from 'lucide-react';

export const SLAY_QUOTES = [
  {
    id: 1,
    quote: "Put on your invisible crown, drink your water, and go slay queen! You got this! 💖✨👑",
    tag: "Daily Power",
    emoji: "👑",
    theme: "from-pink-500 via-rose-500 to-fuchsia-600",
  },
  {
    id: 2,
    quote: "You are capable of becoming whatever you dream of. Never shrink yourself to fit someone else's small world! 🌸🦋",
    tag: "Confidence",
    emoji: "🦋",
    theme: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    id: 3,
    quote: "Cramps may be tough, but you are a million times tougher. Rest without guilt and glow on your own timeline queen! 🍓☕",
    tag: "Body Harmony",
    emoji: "🍓",
    theme: "from-rose-500 via-pink-500 to-amber-500",
  },
  {
    id: 4,
    quote: "Knowing your rights is your superpower. Speak boldly, walk safely, and shine unapologetically! ⚖️🛡️👑",
    tag: "Sovereignty",
    emoji: "⚖️",
    theme: "from-fuchsia-600 via-purple-600 to-pink-500",
  },
  {
    id: 5,
    quote: "Self-love isn't selfish, it's essential fuel for conquering the universe! Take a deep breath, gorgeous queen. 🎀💕",
    tag: "Self-Love",
    emoji: "🎀",
    theme: "from-pink-500 via-rose-400 to-purple-500",
  },
  {
    id: 6,
    quote: "A queen does not compete with other queens; she adjusts their crowns and lifts them higher together! 👭✨👑",
    tag: "Sisterhood",
    emoji: "💖",
    theme: "from-pink-600 via-fuchsia-500 to-rose-500",
  },
  {
    id: 7,
    quote: "Your sensitivity is your superpower, your ambition is your fire, and your kindness is pure magic! Go slay today! 🌟👑",
    tag: "Inner Sparkle",
    emoji: "✨",
    theme: "from-rose-500 via-purple-500 to-pink-600",
  },
];

export const SlayChanger = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [fade, setFade] = useState(true);

  // Auto-changer interval (changes every 5 seconds)
  useEffect(() => {
    let timer = null;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        changeQuote((currentIndex + 1) % SLAY_QUOTES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const changeQuote = (nextIdx) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setFade(true);
    }, 200);
  };

  const handleNext = () => {
    changeQuote((currentIndex + 1) % SLAY_QUOTES.length);
  };

  const handlePrev = () => {
    changeQuote((currentIndex - 1 + SLAY_QUOTES.length) % SLAY_QUOTES.length);
  };

  const current = SLAY_QUOTES[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 p-6 sm:p-10 text-white shadow-2xl shadow-pink-500/20 border-2 border-white/20">
      {/* Decorative Glow Blobs */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-44 h-44 bg-yellow-300/25 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Badge & Play/Pause */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-float">{current.emoji}</span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-pink-100 bg-white/20 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Slay Queen Affirmation Changer</span>
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-yellow-300 text-yellow-900">
            {current.tag}
          </span>
        </div>

        {/* Changer Controls */}
        <div className="flex items-center gap-1.5 bg-black/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            aria-label={isAutoPlaying ? "Pause auto changer" : "Play auto changer"}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            title={isAutoPlaying ? "Pause Auto-changer" : "Play Auto-changer"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] text-pink-100 font-medium px-1">
            {isAutoPlaying ? "Auto changing" : "Paused"}
          </span>
        </div>
      </div>

      {/* Quote Display with smooth fade */}
      <div className="relative z-10 min-h-[90px] sm:min-h-[110px] flex items-center justify-center my-2 text-center">
        <p
          className={`text-xl sm:text-3xl font-serif-heading font-extrabold max-w-4xl mx-auto leading-relaxed drop-shadow-sm transition-all duration-300 ${
            fade ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform -translate-y-2 scale-95'
          }`}
        >
          "{current.quote}"
        </p>
      </div>

      {/* Changer Navigation Bar & Dot Indicators */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {SLAY_QUOTES.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => changeQuote(idx)}
              aria-label={`Go to affirmation ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-7 bg-white shadow-sm'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Changer Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous quote"
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-pink-600 hover:bg-pink-50 font-extrabold text-xs shadow-md transition-all cursor-pointer group"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Change Affirmation Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
