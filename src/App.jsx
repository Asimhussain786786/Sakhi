import React, { useState } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { ProfileModal } from './components/ProfileModal.jsx';
import { GoSlayFooter } from './components/GoSlayFooter.jsx';
import { AiCompanionModal } from './components/AiCompanionModal.jsx';

// Tabs
import { PeriodTrackerTab } from './components/tabs/PeriodTrackerTab.jsx';
import { EmergencySosTab } from './components/tabs/EmergencySosTab.jsx';
import { ResourceHubTab } from './components/tabs/ResourceHubTab.jsx';
import { LawBookTab } from './components/tabs/LawBookTab.jsx';
import { WelfareSchemesTab } from './components/tabs/WelfareSchemesTab.jsx';
import { TherapistTab } from './components/tabs/TherapistTab.jsx';
import { FitnessJournalTab } from './components/tabs/FitnessJournalTab.jsx';
import { DayPlannerTab } from './components/tabs/DayPlannerTab.jsx';

const DEFAULT_PROFILE = {
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
  const [viewState, setViewState] = useState(() => {
    // Check if ?autostart=1 in URL or previously saved user
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 'app';
      }
      const savedUser = localStorage.getItem('sakhi_user_profile');
      if (savedUser) {
        return 'app';
      }
    }
    return 'landing';
  });

  const [activeTab, setActiveTab] = useState('period');

  const [userProfile, setUserProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('sakhi_user_profile');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {}
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogin = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('sakhi_user_profile', JSON.stringify(profile));
    setViewState('app');
  };

  const handleSaveProfile = (updated) => {
    setUserProfile(updated);
    localStorage.setItem('sakhi_user_profile', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('sakhi_user_profile');
    setViewState('landing');
  };

  // Pre-login Landing view
  if (viewState === 'landing') {
    return <LandingPage onEnter={() => setViewState('login')} />;
  }

  // Login view
  if (viewState === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBackToLanding={() => setViewState('landing')}
      />
    );
  }

  // Main Authenticated Web App
  return (
    <div className="min-h-screen flex flex-col bg-rose-50/40 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'period' && <PeriodTrackerTab />}
        {activeTab === 'emergency' && <EmergencySosTab userProfile={userProfile} />}
        {activeTab === 'resources' && <ResourceHubTab />}
        {activeTab === 'laws' && <LawBookTab />}
        {activeTab === 'welfare' && <WelfareSchemesTab />}
        {activeTab === 'therapist' && <TherapistTab />}
        {activeTab === 'fitness' && <FitnessJournalTab />}
        {activeTab === 'planner' && <DayPlannerTab />}
      </main>

      {/* Floating AI Companion */}
      <AiCompanionModal userProfile={userProfile} />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
      />

      {/* Motivational "Go Slay" Footer with Helplines */}
      <GoSlayFooter />
    </div>
  );
}
