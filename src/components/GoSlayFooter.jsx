import React from 'react';
import { Phone, Shield, Heart, HeartPulse } from 'lucide-react';

export const GoSlayFooter = ({ showAffirmation = false }) => {
  return (
    <footer className="mt-16 border-t border-pink-200/80 bg-gradient-to-b from-rose-50/50 via-pink-100/30 to-pink-200/20 pt-8 pb-8 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Helplines Grid */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-pink-100 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-rose-500" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-900">
              Emergency Indian National Helplines (24x7 Free)
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <a
              href="tel:112"
              className="flex flex-col items-center p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200/70 transition-all group"
            >
              <span className="text-xs text-rose-600 font-semibold">Police (National)</span>
              <span className="text-lg font-bold text-rose-700 flex items-center gap-1 mt-0.5">
                <Phone className="w-3.5 h-3.5 group-hover:animate-bounce" /> 112
              </span>
            </a>

            <a
              href="tel:1091"
              className="flex flex-col items-center p-3 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200/70 transition-all group"
            >
              <span className="text-xs text-pink-600 font-semibold">Women Helpline</span>
              <span className="text-lg font-bold text-pink-700 flex items-center gap-1 mt-0.5">
                <Heart className="w-3.5 h-3.5 group-hover:animate-bounce" /> 1091
              </span>
            </a>

            <a
              href="tel:108"
              className="flex flex-col items-center p-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200/70 transition-all group"
            >
              <span className="text-xs text-red-600 font-semibold">Ambulance</span>
              <span className="text-lg font-bold text-red-700 flex items-center gap-1 mt-0.5">
                <HeartPulse className="w-3.5 h-3.5 group-hover:animate-bounce" /> 108
              </span>
            </a>

            <a
              href="tel:102"
              className="flex flex-col items-center p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/70 transition-all group"
            >
              <span className="text-xs text-amber-700 font-semibold">Mother-Child</span>
              <span className="text-lg font-bold text-amber-800 flex items-center gap-1 mt-0.5">
                <Phone className="w-3.5 h-3.5 group-hover:animate-bounce" /> 102
              </span>
            </a>

            <a
              href="tel:14416"
              className="flex flex-col items-center p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/70 transition-all group"
            >
              <span className="text-xs text-purple-600 font-semibold">Tele-MANAS</span>
              <span className="text-lg font-bold text-purple-700 flex items-center gap-1 mt-0.5">
                <Heart className="w-3.5 h-3.5 group-hover:animate-bounce" /> 14416
              </span>
            </a>

            <a
              href="tel:18005990019"
              className="flex flex-col items-center p-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200/70 transition-all group"
            >
              <span className="text-xs text-teal-700 font-semibold">KIRAN Mental</span>
              <span className="text-xs font-bold text-teal-800 mt-1 truncate max-w-full">
                1800-599-0019
              </span>
            </a>
          </div>
        </div>

        {/* Footer branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-pink-900/60 pt-4 border-t border-pink-200/50">
          <p className="flex items-center gap-1">
            Built with 💖 for all strong, beautiful, unstoppable women & girls everywhere.
          </p>
          <p className="mt-2 sm:mt-0 font-medium">
            Sakhi 🌸 · Safe, Empowered & Loved
          </p>
        </div>
      </div>
    </footer>
  );
};
