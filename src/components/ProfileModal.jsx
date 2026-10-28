import React, { useState } from 'react';
import { X, Save, Check, User, Phone, Mail, Droplet, HeartHandshake } from 'lucide-react';

const AVATARS = ['🌸', '👑', '🎀', '🦋', '🍓', '💖'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Unknown'];

export const ProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState(profile);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden">
        {/* Cute Header */}
        <div className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            aria-label="Close Profile Dialog"
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center text-4xl mb-2 border-4 border-pink-200">
            {formData.avatar}
          </div>
          <h3 className="text-2xl font-serif-heading font-bold">Your Sakhi Profile</h3>
          <p className="text-pink-100 text-xs mt-0.5">Syncs directly with your Emergency SOS dispatch & health logs</p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Pookie Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setFormData({ ...formData, avatar: emoji })}
                  className={`text-2xl p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                    formData.avatar === emoji
                      ? 'border-pink-500 bg-pink-100/70 scale-105 shadow-sm'
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-medium"
                placeholder="e.g. Ananya Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm font-semibold text-rose-600 bg-white"
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
                <Phone className="w-3.5 h-3.5 text-pink-500" /> Your Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-500" /> Parent / Guardian Phone
              </label>
              <input
                type="tel"
                required
                value={formData.parentsPhone}
                onChange={(e) => setFormData({ ...formData, parentsPhone: e.target.value })}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                placeholder="+91 98111 22233"
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                placeholder="queen@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-rose-500" /> Parent / Guardian Email
              </label>
              <input
                type="email"
                value={formData.parentsEmail}
                onChange={(e) => setFormData({ ...formData, parentsEmail: e.target.value })}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                placeholder="family@example.com"
              />
            </div>
          </div>

          {/* Emergency Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Medical / Allergy Alert Note (Appears on Emergency Card)
            </label>
            <input
              type="text"
              value={formData.emergencyNote || ''}
              onChange={(e) => setFormData({ ...formData, emergencyNote: e.target.value })}
              className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              placeholder="e.g. Allergic to Penicillin, Asthmatic, carries EpiPen"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {savedToast ? (
                <>
                  <Check className="w-5 h-5 animate-scale" /> Saved to Sakhi!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Profile Details
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
