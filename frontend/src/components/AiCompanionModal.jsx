import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  MessageCircle,
  HelpCircle,
  Heart,
  Shield,
  Coffee,
  User,
} from 'lucide-react';

const QUICK_QUESTIONS = [
  'Relieve bad cramps now 🌸',
  'My period is 4 days late, is that normal?',
  'What are my rights if someone stalks me?',
  'Quick calming mantra for exam anxiety',
  'Healthy snacks for sweet cravings',
];

export const AiCompanionModal = ({ userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: `Hey gorgeous queen! 💖✨ I'm your Sakhi AI bestie. Ask me anything about cramps, cycle phases, safety emergency advice, Indian legal rights, or just for an everyday sisterly hype! What's on your mind?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  const handleAsk = async (textToAsk) => {
    const text = textToAsk || inputQuestion;
    if (!text.trim() || isThinking) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text.trim(),
          userProfile,
        }),
      });

      if (!res.ok) throw new Error('API failed');
      const data = await res.json();

      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data.reply ||
          'You are capable of amazing things, queen! 💖 Keep shining bright, and let me know whatever you need help with!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Companion error:', err);
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "Hey love! 🌸 Grab a warm hot water bottle and sip some ginger cinnamon tea for cramps. Remember: you are strong, protected, and loved! 💕",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Floating Button fixed at bottom right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sakhi AI Companion"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 text-white shadow-2xl shadow-pink-500/40 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border-2 border-white/80 group"
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform">🌸</span>
        <span className="font-extrabold text-xs hidden sm:inline tracking-wider uppercase pr-1">
          Ask Sakhi AI
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-300 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 border-2 border-white" />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border-2 border-pink-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/30">
                🌸
              </div>
              <div>
                <h4 className="font-serif-heading font-extrabold text-base leading-tight">
                  Sakhi AI Companion
                </h4>
                <p className="text-[10px] text-pink-100 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Your 24x7 Sisterly Bestie
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat Window"
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-pink-50/20">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      isUser
                        ? 'bg-pink-500 text-white'
                        : 'bg-gradient-to-tr from-pink-200 to-rose-200 text-slate-800'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : '🌸'}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-pink-100 shadow-xs'
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

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-pink-600 font-medium italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Sakhi AI is thinking sisterly advice...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 border-t border-pink-100 bg-white flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                className="text-[10px] font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-full whitespace-nowrap transition-all border border-pink-200/70 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="p-3 border-t border-pink-100 bg-slate-50 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Ask anything (cramps, safety, laws)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs"
            />
            <button
              type="submit"
              disabled={isThinking || !inputQuestion.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-500/25 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
