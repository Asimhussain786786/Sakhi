import React, { useState } from 'react';
import {
  CalendarHeart,
  AlertTriangle,
  BookOpen,
  Scale,
  Gift,
  HeartPulse,
  Activity,
  ListTodo,
  Menu,
  X,
  Sparkles,
  LogOut,
  User,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'period', label: 'Period Tracker', shortLabel: 'Period', icon: CalendarHeart, color: 'text-pink-600' },
  { id: 'emergency', label: 'Emergency SOS', shortLabel: 'SOS', icon: AlertTriangle, color: 'text-red-500', badge: 'Live GPS' },
  { id: 'resources', label: 'Resource Hub', shortLabel: 'Resources', icon: BookOpen, color: 'text-rose-600' },
  { id: 'laws', label: 'Your Law Book', shortLabel: 'Law Book', icon: Scale, color: 'text-purple-600' },
  { id: 'welfare', label: "Women's Welfare", shortLabel: 'Welfare', icon: Gift, color: 'text-emerald-600' },
  { id: 'therapist', label: 'Therapist', shortLabel: 'Dr. Maya', icon: HeartPulse, color: 'text-teal-600', badge: 'Mindful' },
  { id: 'fitness', label: 'Fitness Journal', shortLabel: 'Fitness', icon: Activity, color: 'text-fuchsia-600' },
  { id: 'planner', label: 'My Day Planner', shortLabel: 'Planner', icon: ListTodo, color: 'text-amber-600' },
];

export const Navbar = ({
  activeTab,
  setActiveTab,
  userProfile,
  onOpenProfile,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pink-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5">
          {/* Brand Logo */}
          <div
            onClick={() => handleTabClick('period')}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 flex items-center justify-center text-lg sm:text-2xl shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif-heading font-extrabold text-lg sm:text-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Sakhi
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  सखी
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 py-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isEmergency = item.id === 'emergency';

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? isEmergency
                        ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20'
                      : isEmergency
                      ? 'text-red-600 hover:bg-red-50 border border-red-200'
                      : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.color}`} />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.shortLabel}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Area: Profile Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Dedicated Profile Button in Navbar */}
            <button
              onClick={onOpenProfile}
              aria-label="Open User Profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border border-pink-200/90 shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-lg border border-pink-200 group-hover:scale-110 transition-transform">
                {userProfile.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                  {userProfile.name}
                  <span className="text-[9px] px-1 py-0.2 rounded-sm bg-rose-500 text-white font-extrabold">
                    {userProfile.bloodGroup}
                  </span>
                </div>
                <div className="text-[10px] text-pink-700/70 font-semibold">
                  View Profile 🎀
                </div>
              </div>
            </button>

            {/* Logout / Switch Button */}
            <button
              onClick={onLogout}
              aria-label="Switch User or Logout"
              title="Logout / Switch User"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 rounded-xl text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Medium screen pill row (tablets / laptops below xl) */}
        <div className="hidden md:flex xl:hidden overflow-x-auto py-2 gap-1 border-t border-pink-100/80 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-pink-500 text-white font-bold'
                    : 'text-slate-600 hover:bg-pink-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-pink-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                      : 'bg-rose-50/60 hover:bg-rose-100/70 text-slate-700 border border-pink-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-pink-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-pink-700 bg-pink-100/60 hover:bg-pink-100 px-3 py-2 rounded-xl"
            >
              <span>{userProfile.avatar}</span>
              <span>{userProfile.name} ({userProfile.bloodGroup})</span>
            </button>
            <button
              onClick={onLogout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 px-3 py-2"
            >
              <LogOut className="w-3.5 h-3.5" /> Switch User
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
