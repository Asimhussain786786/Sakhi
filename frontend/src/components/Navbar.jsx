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
import { ThemeSelector } from './ThemeSelector.jsx';

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
  onOpenLanding,
  onOpenStory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.65) 100%)',
        backdropFilter: 'blur(28px) saturate(200%)',
        WebkitBackdropFilter: 'blur(28px) saturate(200%)',
        borderColor: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5">
          {/* Official Brand Logo */}
          <div
            onClick={() => handleTabClick('period')}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <img
              src="/assets/sakhi_emblem.png"
              alt="Sakhi Lotus & Woman Profile"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-1.5">
              <span
                className="font-serif-heading font-extrabold text-lg sm:text-2xl bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, var(--sakhi-primary), var(--sakhi-primary-dark))` }}
              >
                Sakhi
              </span>
              <span
                className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full border"
                style={{
                  background: 'var(--sakhi-primary-bg)',
                  color: 'var(--sakhi-primary)',
                  borderColor: 'var(--sakhi-border-strong)',
                }}
              >
                सखी
              </span>
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
                  className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95`}
                  style={
                    isActive
                      ? isEmergency
                        ? { background: '#ef4444', color: '#fff', boxShadow: '0 4px 12px rgba(239,68,68,0.35)' }
                        : {
                            background: `linear-gradient(135deg, var(--sakhi-gradient-from), var(--sakhi-gradient-to))`,
                            color: '#FFFFFF',
                            boxShadow: `0 4px 14px rgba(var(--sakhi-shadow), 0.35)`,
                          }
                      : isEmergency
                      ? { color: '#dc2626', border: '1px solid #fca5a5', background: 'rgba(254, 242, 242, 0.6)' }
                      : { color: '#150727', background: 'rgba(255, 255, 255, 0.4)' }
                  }
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: isActive ? (isEmergency ? '#fff' : 'var(--sakhi-nav-active-text)') : undefined }}
                  />
                  <span className="hidden 2xl:inline">{item.label}</span>
                  <span className="2xl:hidden">{item.shortLabel}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Area: Theme Selector, Profile Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Navigation shortcuts: Home, Story, 3D Lotus */}
            {onOpenLanding && (
              <button
                type="button"
                onClick={onOpenLanding}
                aria-label="Home Landing Page"
                title="View Sakhi 4-Girls Landing Showcase"
                className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%)',
                  borderColor: 'rgba(233, 30, 99, 0.35)',
                  color: 'var(--sakhi-primary)',
                }}
              >
                <span>🏠 Home</span>
              </button>
            )}

            {onOpenStory && (
              <button
                type="button"
                onClick={onOpenStory}
                aria-label="3-Stage Mood Story"
                title="View 3-Stage Mood Flapping Window"
                className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%)',
                  borderColor: 'rgba(142, 36, 170, 0.35)',
                  color: '#8E24AA',
                }}
              >
                <span>🎀 Story</span>
              </button>
            )}


            {/* Theme Selector */}
            <ThemeSelector />

            {/* Dedicated Profile Button in Navbar */}
            <button
              onClick={onOpenProfile}
              aria-label="Open User Profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl border shadow-xs transition-all cursor-pointer group hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full shadow-xs flex items-center justify-center text-lg border group-hover:scale-110 transition-transform"
                style={{ background: 'var(--sakhi-surface)', borderColor: 'var(--sakhi-border)' }}
              >
                {userProfile.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div
                  className="text-xs font-bold leading-tight flex items-center gap-1"
                  style={{ color: 'var(--sakhi-text)' }}
                >
                  {userProfile.name}
                  <span
                    className="text-[9px] px-1 py-0.2 rounded-sm font-extrabold text-white"
                    style={{ background: 'var(--sakhi-primary)' }}
                  >
                    {userProfile.bloodGroup}
                  </span>
                </div>
                <div
                  className="text-[10px] font-semibold"
                  style={{ color: 'var(--sakhi-text-subtle)' }}
                >
                  View Profile 🎀
                </div>
              </div>
            </button>

            {/* Logout / Switch Button */}
            <button
              onClick={onLogout}
              aria-label="Switch User or Logout"
              title="Logout / Switch User"
              className="p-2 rounded-xl transition-all cursor-pointer"
              style={{ color: 'var(--sakhi-text-subtle)' }}
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 rounded-xl border transition-all cursor-pointer"
              style={{
                color: 'var(--sakhi-primary)',
                background: 'var(--sakhi-primary-bg)',
                borderColor: 'var(--sakhi-border)',
              }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Medium screen pill row (tablets / laptops below xl) */}
        <div
          className="hidden md:flex xl:hidden overflow-x-auto py-2 gap-1 border-t no-scrollbar"
          style={{ borderColor: 'var(--sakhi-border)' }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                style={
                  isActive
                    ? {
                        background: 'var(--sakhi-primary)',
                        color: 'var(--sakhi-nav-active-text)',
                        fontWeight: 700,
                      }
                    : { color: 'var(--sakhi-text-muted)' }
                }
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
        <div
          className="xl:hidden border-t backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl"
          style={{
            borderColor: 'var(--sakhi-border)',
            background: 'rgba(255,255,255,0.97)',
          }}
        >
          <div className="grid grid-cols-2 gap-2 mb-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer border"
                  style={
                    isActive
                      ? {
                          background: 'var(--sakhi-primary)',
                          color: 'var(--sakhi-nav-active-text)',
                          borderColor: 'var(--sakhi-primary)',
                          boxShadow: `0 2px 8px rgba(var(--sakhi-shadow), 0.25)`,
                        }
                      : {
                          background: 'var(--sakhi-bg-subtle)',
                          color: 'var(--sakhi-text)',
                          borderColor: 'var(--sakhi-border)',
                        }
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div
            className="pt-2 border-t flex items-center justify-between"
            style={{ borderColor: 'var(--sakhi-border)' }}
          >
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl"
              style={{
                background: 'var(--sakhi-primary-bg)',
                color: 'var(--sakhi-primary)',
              }}
            >
              <span>{userProfile.avatar}</span>
              <span>{userProfile.name} ({userProfile.bloodGroup})</span>
            </button>
            <button
              onClick={onLogout}
              className="text-xs font-semibold flex items-center gap-1 px-3 py-2"
              style={{ color: 'var(--sakhi-text-muted)' }}
            >
              <LogOut className="w-3.5 h-3.5" /> Switch User
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
