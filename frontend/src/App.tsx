import { useState, useEffect, useCallback } from 'react';
import { SakhiCanvas } from './scene/SakhiCanvas';
import { LoginCard } from './components/3d/LoginCard';
import { LandingPage } from './components/LandingPage.jsx';
import { OnboardingFlip } from './components/OnboardingFlip.jsx';
import { AuthUser } from './utils/authLogic';
import { fetchCurrentUser, signOutUser } from './services/authService';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { ProfileModal } from './components/ProfileModal.jsx';
import { GoSlayFooter } from './components/GoSlayFooter.jsx';
import { AiCompanionModal } from './components/AiCompanionModal.jsx';

// 8 Core Functional Tabs
import { PeriodTrackerTab } from './components/tabs/PeriodTrackerTab.jsx';
import { EmergencySosTab } from './components/tabs/EmergencySosTab.jsx';
import { ResourceHubTab } from './components/tabs/ResourceHubTab.jsx';
import { LawBookTab } from './components/tabs/LawBookTab.jsx';
import { WelfareSchemesTab } from './components/tabs/WelfareSchemesTab.jsx';
import { TherapistTab } from './components/tabs/TherapistTab.jsx';
import { FitnessJournalTab } from './components/tabs/FitnessJournalTab.jsx';
import { DayPlannerTab } from './components/tabs/DayPlannerTab.jsx';

interface UserProfile {
  name: string;
  avatar: string;
  bloodGroup: string;
  phone: string;
  parentsPhone: string;
  email: string;
  parentsEmail: string;
  emergencyNote: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Ananya Sharma',
  avatar: '🌸',
  bloodGroup: 'B+',
  phone: '+91 98765 43210',
  parentsPhone: '+91 98111 22334',
  email: 'ananya.sharma@example.com',
  parentsEmail: 'sharma.family@example.com',
  emergencyNote: 'Mild dust allergy, carries emergency inhaler',
};

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const { theme } = useTheme();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activeTab, setActiveTab] = useState('period');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [viewState, setViewState] = useState<'landing' | 'onboarding' | 'login' | 'app'>('landing');

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sakhi_user_profile');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fall back to default
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  // Verify active session on mount
  useEffect(() => {
    let mounted = true;
    fetchCurrentUser()
      .then((user) => {
        if (!mounted) return;
        if (user) {
          setCurrentUser(user);
        } else {
          // Check if user previously logged in via localStorage
          const saved = localStorage.getItem('sakhi_user_profile');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              setCurrentUser({
                id: 'usr_local_saved',
                name: parsed.name || 'Ananya Sharma',
                email: parsed.email || 'ananya.sharma@example.com',
                provider: 'email',
                joinedAt: new Date().toISOString(),
              });
            } catch {
              // Ignore
            }
          }
        }
      })
      .finally(() => {
        if (mounted) setCheckingSession(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleAuthenticated = useCallback((user: AuthUser) => {
    setCurrentUser(user);
    setViewState('app');
    const updated: UserProfile = {
      ...DEFAULT_PROFILE,
      name: user.name || DEFAULT_PROFILE.name,
      email: user.email || DEFAULT_PROFILE.email,
    };
    setUserProfile(updated);
    localStorage.setItem('sakhi_user_profile', JSON.stringify(updated));
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOutUser();
    localStorage.removeItem('sakhi_user_profile');
    setCurrentUser(null);
    setViewState('landing');
  }, []);

  const handleSaveProfile = useCallback((updated: UserProfile) => {
    setUserProfile(updated);
    localStorage.setItem('sakhi_user_profile', JSON.stringify(updated));
  }, []);

  // 1. Initial Session Loading
  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120A24] text-white">
        <div className="sakhi-dusk-glass rounded-3xl px-8 py-5 text-sm font-medium text-[#D9C9F0] animate-pulse">
          Opening your Sakhi Sanctuary...
        </div>
      </div>
    );
  }

  // 2. Landing Page with 4-Girls artwork, doodles, 7 pillars, and Slay Queen affirmator
  if (viewState === 'landing') {
    return (
      <LandingPage
        onEnter={() => setViewState(currentUser ? 'app' : 'login')}
        onOpenOnboarding={() => setViewState('onboarding')}
      />
    );
  }

  // 3. Flapping Window: 3-Stage Mood Journey (Before Sakhi, Meet Sakhi, With Sakhi)
  if (viewState === 'onboarding') {
    return (
      <OnboardingFlip
        onDone={() => setViewState('login')}
        onBackToLanding={() => setViewState('landing')}
      />
    );
  }

  // 4. Stunning 3D Realistic Lotus & Rings Login Portal (Phone OTP + Email + Guest)
  if (viewState === 'login' || !currentUser) {
    return (
      <div className="relative min-h-screen bg-[#120A24] text-[#FBF4FF] overflow-hidden flex flex-col justify-between">
        {/* 3D Realistic Lotus + Rings + Background Canvas */}
        <SakhiCanvas />

        {/* Top Branding Header with Translucent Liquid Glass Bar & Bold High-Contrast Text */}
        <header className="relative z-10 px-6 sm:px-12 py-6 flex items-center justify-between">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%)',
              backdropFilter: 'blur(24px) saturate(190%)',
              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.75)',
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-2xl"
          >
            <img
              src="/assets/sakhi_emblem.png"
              alt="Sakhi Official Emblem"
              className="w-9 h-9 object-contain drop-shadow-md"
            />
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                }}
                className="text-2xl font-extrabold tracking-[0.22em]"
              >
                SAKHI
              </span>
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  color: '#FFB4D6',
                  borderColor: 'rgba(255, 255, 255, 0.45)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}
                className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full border backdrop-blur-md"
              >
                सखी
              </span>
            </div>
          </div>

          {/* Quick Navigation: Home, 3-Stage Story, and Dashboard */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setViewState('landing')}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.3)',
                color: '#FFFFFF',
              }}
              className="px-3.5 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>🏠 Home</span>
            </button>

            <button
              type="button"
              onClick={() => setViewState('onboarding')}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.3)',
                color: '#FFD1E3',
              }}
              className="px-3.5 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>🎀 3-Stage Story</span>
            </button>

            {currentUser && (
              <button
                type="button"
                onClick={() => setViewState('app')}
                style={{
                  background: 'linear-gradient(135deg, #FF4081 0%, #8E24AA 100%)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 8px 24px -4px rgba(255, 64, 129, 0.4)',
                  color: '#FFFFFF',
                }}
                className="px-4 py-2 rounded-full text-xs font-extrabold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Dashboard →</span>
              </button>
            )}
          </div>
        </header>

        {/* Main Layout: Positioned cleanly on the Right so the 3D Lotus on the Left is 100% visible! */}
        <main
          style={{ maxWidth: '1400px', width: '100%' }}
          className="relative z-10 flex-1 flex items-center justify-end mx-auto px-6 sm:px-12 lg:pr-16 py-6 my-auto pointer-events-none"
        >
          <div style={{ maxWidth: '420px', width: '100%' }} className="pointer-events-auto ml-auto">
            <LoginCard
              initialMode="signin"
              onAuthenticated={handleAuthenticated}
            />
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="relative z-10 px-6 py-4 text-center text-xs font-medium text-white/75 tracking-wider">
          <span>🌸 Sakhi — Holistic Health, SOS Safety & Legal Empowerment for Women</span>
        </footer>
      </div>
    );
  }

  // 5. Authenticated: Full Sakhi Women's Companion & Safety Web Application
  // Enhanced with Fixed Photographic Sanctuary Backdrop + Dynamic Liquid Glass Theme Overlay
  return (
    <div className="relative min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden">
      {/* Fixed 4K Sanctuary Photographic Backdrop with Dynamic Theme Backdrops & Mood Filter */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-20 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url(${theme?.backdropImage || '/assets/sanctuary-soft-sophisticated.jpg'})`,
          transform: 'scale(1.04)',
          filter: theme?.mood?.backdropFilter || 'saturate(1.25) contrast(1.08) brightness(0.96)',
        }}
      />

      {/* Dynamic Theme Atmospheric Mood Gradient Collaboration */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-15 transition-all duration-700"
        style={{
          background: theme?.mood?.ambientGradient || 'radial-gradient(ellipse at 75% 25%, rgba(217, 166, 177, 0.45) 0%, rgba(183, 110, 121, 0.3) 45%, rgba(42, 25, 45, 0.7) 100%)',
          mixBlendMode: 'multiply',
          opacity: 0.75,
        }}
      />

      {/* Dynamic Theme Atmospheric Tint Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-700"
        style={{
          backgroundColor: theme?.mood?.overlayTint || 'rgba(247, 243, 239, 0.22)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Top Navbar with Tab Switcher and Themes */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleSignOut}
        onOpenLanding={() => setViewState('landing')}
        onOpenStory={() => setViewState('onboarding')}
      />

      {/* Main Feature Viewport (8 Core Tabs) in Liquid Glass */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="sakhi-liquid-glass-wrapper">
          {activeTab === 'period' && <PeriodTrackerTab />}
          {activeTab === 'emergency' && <EmergencySosTab userProfile={userProfile} />}
          {activeTab === 'resources' && <ResourceHubTab />}
          {activeTab === 'laws' && <LawBookTab />}
          {activeTab === 'welfare' && <WelfareSchemesTab />}
          {activeTab === 'therapist' && <TherapistTab />}
          {activeTab === 'fitness' && <FitnessJournalTab />}
          {activeTab === 'planner' && <DayPlannerTab />}
        </div>
      </main>

      {/* Floating Gemini AI Companion */}
      <AiCompanionModal userProfile={userProfile} />

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
      />

      {/* National Helplines Footer */}
      <GoSlayFooter />
    </div>
  );
}
