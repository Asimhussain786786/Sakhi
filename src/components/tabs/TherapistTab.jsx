import React, { useState, useRef, useEffect } from 'react';
import {
  HeartPulse,
  Send,
  Sparkles,
  Phone,
  Heart,
  Play,
  Pause,
  RotateCcw,
  Bot,
  User,
  Coffee,
  Shield,
} from 'lucide-react';

const CONVERSATION_STARTERS = [
  "I'm feeling so burnt out from exams and expectations...",
  "My PMS mood swings make me feel overwhelmed and teary.",
  "I'm anxious about a recent relationship conflict.",
  "Can you guide me through releasing physical tension in my body?",
];

export const TherapistTab = () => {
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello sweetheart, I'm Dr. Maya. 🌸 Whatever you are carrying today—whether it's fatigue, relationship stress, or premenstrual emotional turbulence—you are safe to unpack it here without judgment. How is your heart doing in this exact moment?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef(null);

  // 4-7-8 Breathing Guide State
  // Cycle: Inhale (4s), Hold (7s), Exhale (8s) = 19s total per breath
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // 4-7-8 Breathwork timer loop
  useEffect(() => {
    let timer = null;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreathSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          // Transition phase
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            playChime(520);
            return 7;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            playChime(390);
            return 8;
          } else {
            setBreathPhase('Inhale');
            setCompletedCycles((c) => c + 1);
            playChime(440);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive, breathPhase]);

  const playChime = (freq) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        try {
          osc.stop();
          ctx.close();
        } catch (e) {}
      }, 700);
    } catch (e) {}
  };

  const handleStartBreathing = () => {
    setBreathingActive(true);
    setBreathPhase('Inhale');
    setBreathSecondsLeft(4);
    playChime(440);
  };

  const handleStopBreathing = () => {
    setBreathingActive(false);
  };

  const handleResetBreathing = () => {
    setBreathingActive(false);
    setBreathPhase('Inhale');
    setBreathSecondsLeft(4);
    setCompletedCycles(0);
  };

  // Send message to Dr. Maya backend
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/therapist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data.reply ||
          "I'm here with you, dear. Take a moment to relax your jaw and breathe softly. 🌸",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Dr. Maya chat error:', err);
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I hear you, lovely heart. 🌸 Even when words feel heavy, remember you don't have to carry everything all at once. Let's practice one round of the 4-7-8 breathing circle together below.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-rose-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-600/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Compassionate Young Women's Counseling & Regulation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold tracking-tight">
              Dr. Maya's Mindful Sanctuary 🌸
            </h2>
            <p className="text-teal-50 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Safe, confidential counseling for anxious minds, hormonal emotional waves, burnout, and relationship fatigue, coupled with clinically-proven 4-7-8 parasympathetic breathwork.
            </p>
          </div>

          {/* Crisis Helplines Direct Action */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href="tel:14416"
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-yellow-300" />
              <span>Tele-MANAS: 14416</span>
            </a>
            <a
              href="tel:18005990019"
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-pink-200" />
              <span>KIRAN: 1800-599-0019</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Dr. Maya Chat (Left) & 4-7-8 Breathing Guide (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chat with Dr. Maya (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-pink-200/90 shadow-sm flex flex-col h-[650px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-pink-100 bg-pink-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-400 to-pink-400 flex items-center justify-center text-2xl shadow-sm">
                🌸
              </div>
              <div>
                <h3 className="text-base font-serif-heading font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>Dr. Maya</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[11px] text-pink-700/80 font-semibold">
                  Mindful Women's Counselor · Gemini Powered
                </p>
              </div>
            </div>

            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white text-teal-800 font-bold border border-teal-200">
              Safe Space 💕
            </span>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                      isUser
                        ? 'bg-pink-500 text-white'
                        : 'bg-teal-100 text-teal-800 border border-teal-200'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : '🌸'}
                  </div>

                  <div
                    className={`max-w-[82%] sm:max-w-[78%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-pink-500 text-white rounded-tr-xs shadow-xs'
                        : 'bg-pink-50/70 text-slate-800 rounded-tl-xs border border-pink-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser ? 'text-pink-100' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 text-xs text-pink-600 font-medium italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Dr. Maya is typing gentle thoughts for you...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Starters */}
          <div className="px-4 py-2 border-t border-pink-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
            {CONVERSATION_STARTERS.map((starter, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(starter)}
                className="text-[11px] font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1 rounded-full whitespace-nowrap transition-all border border-pink-200/60 cursor-pointer"
              >
                {starter}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 border-t border-pink-100 bg-slate-50 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tell Dr. Maya what's on your heart right now..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={isSending || !inputMessage.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-500/25 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* 4-7-8 Breathing Guide & Somatic Reset (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive 4-7-8 Breathing Circle */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-sm text-center flex flex-col items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Parasympathetic Nervous System Reset
              </span>
              <h3 className="text-xl font-serif-heading font-extrabold text-slate-900 mt-2 mb-1">
                4-7-8 Relaxing Breathwork 🫁
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Inhale quietly through nose for 4s, Hold for 7s, Exhale completely through mouth for 8s.
              </p>
            </div>

            {/* Visual Animated Circle */}
            <div className="my-8 relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`w-52 h-52 rounded-full border-4 transition-all duration-1000 flex items-center justify-center ${
                  breathingActive
                    ? breathPhase === 'Inhale'
                      ? 'scale-110 border-teal-400 bg-teal-50/70'
                      : breathPhase === 'Hold'
                      ? 'scale-115 border-purple-400 bg-purple-50/70'
                      : 'scale-90 border-rose-400 bg-rose-50/70'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {breathingActive ? breathPhase : 'Ready'}
                  </div>
                  <div className="text-5xl font-serif-heading font-extrabold text-slate-900 my-1">
                    {breathingActive ? breathSecondsLeft : '4-7-8'}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {breathingActive
                      ? breathPhase === 'Inhale'
                        ? 'Fill the belly gently'
                        : breathPhase === 'Hold'
                        ? 'Retain softness & stillness'
                        : 'Sigh all tension out'
                      : 'Click Start below'}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="text-xs text-slate-500 font-semibold">
                Cycles Completed Today: <span className="font-extrabold text-teal-700">{completedCycles}</span>
              </div>

              <div className="flex gap-2">
                {!breathingActive ? (
                  <button
                    onClick={handleStartBreathing}
                    className="flex-1 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" /> Start 4-7-8 Guide
                  </button>
                ) : (
                  <button
                    onClick={handleStopBreathing}
                    className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Pause className="w-4 h-4" /> Pause Guide
                  </button>
                )}
                <button
                  onClick={handleResetBreathing}
                  className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Grounding Checklist Card */}
          <div className="bg-pink-50/70 border border-pink-200 rounded-3xl p-5 text-xs text-slate-700 space-y-2">
            <div className="font-extrabold text-pink-800 uppercase tracking-wider flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-pink-600" />
              <span>30-Second Body Grounding Anchor</span>
            </div>
            <ul className="space-y-1.5 text-slate-600">
              <li>1. 🌿 Unclench your jaw and gently drop your tongue from the roof of your mouth.</li>
              <li>2. ☕ Drop your shoulders away from your ears by 2 inches.</li>
              <li>3. 🌸 Soften your lower belly; you do not need to hold it in right now.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
