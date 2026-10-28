import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, Zap, Shield, Phone, Mail, Droplet, User } from 'lucide-react';

const AVATARS = ['🌸', '👑', '🎀', '🦋', '🍓', '💖'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const DEMO_PROFILE = {
  name: 'Ananya Sharma',
  avatar: '🌸',
  bloodGroup: 'B+',
  phone: '+91 98765 43210',
  parentsPhone: '+91 98111 22334',
  email: 'ananya.sharma@example.com',
  parentsEmail: 'sharma.family@example.com',
  emergencyNote: 'Mild dust allergy, carries emergency inhaler',
};

export const LoginPage = ({ onLogin, onBackToLanding }) => {
  const [name, setName] = useState('Ananya Sharma');
  const [avatar, setAvatar] = useState('🌸');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [parentsPhone, setParentsPhone] = useState('+91 98111 22334');
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [parentsEmail, setParentsEmail] = useState('sharma.family@example.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: name.trim() || 'Girlie',
      avatar,
      bloodGroup,
      phone: phone.trim() || '+91 98765 43210',
      parentsPhone: parentsPhone.trim() || '+91 98111 22334',
      email: email.trim() || 'queen@example.com',
      parentsEmail: parentsEmail.trim() || 'parents@example.com',
    });
  };

  const handleQuickLogin = () => {
    onLogin(DEMO_PROFILE);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background blobs & pookie stickers */}
      <div className="absolute top-10 left-10 text-4xl animate-float">🎀</div>
      <div className="absolute bottom-12 left-16 text-4xl animate-bounce" style={{ animationDuration: '4s' }}>🌸</div>
      <div className="absolute top-20 right-16 text-4xl animate-float">✨</div>
      <div className="absolute bottom-16 right-20 text-4xl animate-pulse">👑</div>

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden relative z-10">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 p-6 text-white text-center relative">
          <button
            onClick={onBackToLanding}
            className="absolute top-4 left-4 text-xs font-bold text-white/90 hover:text-white bg-black/10 hover:bg-black/20 px-3 py-1.5 rounded-full transition-all cursor-pointer"
          >
            ← Back to Home
          </button>

          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner mb-2 border border-white/30">
            {avatar}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-extrabold tracking-tight">
            Welcome to Sakhi 🌸
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Choose your pookie avatar and set up your emergency-ready girlie profile
          </p>
        </div>

        {/* Quick Demo Login Hero Action */}
        <div className="px-6 sm:px-8 pt-6 pb-2">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Hackathon Instant Demo</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Pre-fills verified contacts, live location SOS readiness, and cycle history!
              </p>
            </div>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>One-Click Quick Login</span>
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pink-200/80" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-semibold uppercase tracking-wider">
                Or Customize Your Profile
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-8 space-y-4">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Choose Your Pookie Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setAvatar(emoji)}
                  className={`text-2xl p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                    avatar === emoji
                      ? 'border-pink-500 bg-pink-100 shadow-md scale-105'
                      : 'border-slate-100 hover:border-pink-200 bg-slate-50'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Blood group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-pink-500" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-semibold text-rose-600 bg-white"
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-pink-500" /> Your Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-rose-500" /> Parents' Phone (For SOS)
              </label>
              <input
                type="tel"
                required
                value={parentsPhone}
                onChange={(e) => setParentsPhone(e.target.value)}
                placeholder="+91 98111 22334"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              />
            </div>
          </div>

          {/* Emails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-pink-500" /> Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Parents' Email
              </label>
              <input
                type="email"
                value={parentsEmail}
                onChange={(e) => setParentsEmail(e.target.value)}
                placeholder="parents@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Sakhi Platform</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
