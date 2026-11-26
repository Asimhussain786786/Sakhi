import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Volume2,
  VolumeX,
  KeyRound,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  AuthMode,
  AuthUser,
  ValidationErrors,
  hasErrors,
  validateForgotInput,
  validateSignInInput,
  validateSignUpInput,
  validateOtpPhone,
  validateOtpCode,
} from '../../utils/authLogic';
import {
  requestPasswordReset,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  sendOtp,
  verifyOtp,
} from '../../services/authService';

// Browser-native Web Audio Synthesizer for rich interactive feedback
let audioCtx: AudioContext | null = null;
const playSynthTone = (f1: number, f2: number, duration: number, volume = 0.04, enabled = true) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioCtor();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f1, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(f2, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration + 0.05);
  } catch {}
};

const playChimeTone = (enabled = true) => {
  if (!enabled) return;
  [523, 659, 784, 1046].forEach((f, idx) => {
    setTimeout(() => playSynthTone(f, f * 0.98, 0.35, 0.04, enabled), idx * 80);
  });
};

const AFFIRMATION_QUOTES = [
  'Embrace your rhythm, honor your strength.',
  'Designed with love, safety & sisterhood.',
  'Your private, aesthetic wellness haven.',
  'Protecting your peace, every single day.',
];

interface LoginCardProps {
  initialMode?: AuthMode;
  onModeChange?: (mode: AuthMode) => void;
  onBackToWelcome?: () => void;
  onAuthenticated: (user: AuthUser) => void;
  emailInputRef?: React.RefObject<HTMLInputElement | null>;
  nameInputRef?: React.RefObject<HTMLInputElement | null>;
  reducedMotion?: boolean;
}

export function LoginCard({
  initialMode = 'signin',
  onModeChange,
  onAuthenticated,
  emailInputRef,
  nameInputRef,
  reducedMotion = false,
}: LoginCardProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Verification state
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98765 43210');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [demoOtp, setDemoOtp] = useState('7860');

  // Sound and quotes
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % AFFIRMATION_QUOTES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!otpSent || countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setServerError(null);
    setResetMessage(null);
    setOtpSent(false);
    playSynthTone(500, 750, 0.08, 0.03, soundEnabled);
    onModeChange?.(nextMode);
  };

  const handleSendOtp = async () => {
    const v = validateOtpPhone(phoneOrEmail);
    setErrors(v);
    if (hasErrors(v)) return;

    setSubmitting(true);
    setServerError(null);
    try {
      const res = await sendOtp(phoneOrEmail);
      setOtpSent(true);
      setCountdown(60);
      setDemoOtp(res.demoOtp);
      playChimeTone(soundEnabled);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Unable to send OTP.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setResetMessage(null);

    if (mode === 'otp') {
      if (!otpSent) {
        await handleSendOtp();
        return;
      }
      const v = validateOtpCode(otpCode);
      setErrors(v);
      if (hasErrors(v)) return;

      setSubmitting(true);
      try {
        const user = await verifyOtp(phoneOrEmail, otpCode);
        playChimeTone(soundEnabled);
        onAuthenticated(user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Invalid verification code.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (mode === 'signin') {
      const v = validateSignInInput(email, password);
      setErrors(v);
      if (hasErrors(v)) return;

      setSubmitting(true);
      try {
        const user = await signInWithEmail(email, password);
        playChimeTone(soundEnabled);
        onAuthenticated(user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Unable to sign in.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (mode === 'signup') {
      const v = validateSignUpInput(name, email, password, confirmPassword);
      setErrors(v);
      if (hasErrors(v)) return;

      setSubmitting(true);
      try {
        const user = await signUpWithEmail(name, email, password);
        playChimeTone(soundEnabled);
        onAuthenticated(user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Unable to create account.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (mode === 'forgot') {
      const v = validateForgotInput(email);
      setErrors(v);
      if (hasErrors(v)) return;

      setSubmitting(true);
      try {
        const msg = await requestPasswordReset(email);
        setResetMessage(msg);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Reset failed. Try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setServerError(null);
    try {
      const user = await signInWithGoogle();
      playChimeTone(soundEnabled);
      onAuthenticated(user);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Google authentication failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('aria@sakhi.world');
    setPassword('Sakhi2026!');
    setErrors({});
    setServerError(null);
    playSynthTone(600, 900, 0.1, 0.03, soundEnabled);
  };

  const handleAutoFillOtp = () => {
    setOtpCode(demoOtp);
    setErrors({});
    playSynthTone(700, 1100, 0.12, 0.04, soundEnabled);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderColor: 'rgba(255, 255, 255, 0.55)',
    color: '#FFFFFF',
    fontWeight: 700,
    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  };

  const labelStyle: React.CSSProperties = {
    color: '#FFFFFF',
    fontWeight: 800,
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textShadow: '0 1px 4px rgba(0,0,0,0.7)',
  };

  return (
    <motion.div
      data-testid="sakhi-auth-card"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '420px', width: '100%' }}
      className="relative w-full ml-auto"
    >
      {/* Outer ambient glow halo */}
      <div
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(255, 92, 168, 0.4) 0%, rgba(155, 81, 224, 0.25) 60%, transparent 80%)',
          filter: 'blur(28px)',
        }}
        className="pointer-events-none absolute -inset-3 rounded-[36px] -z-10"
      />

      {/* Main Luxury Full Translucent Liquid Glass Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.10) 100%)',
          backdropFilter: 'blur(30px) saturate(220%)',
          WebkitBackdropFilter: 'blur(30px) saturate(220%)',
          border: '1.5px solid rgba(255, 255, 255, 0.55)',
          boxShadow: '0 32px 80px -16px rgba(0, 0, 0, 0.55), 0 0 40px rgba(255, 92, 168, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.85)',
          borderRadius: '28px',
          padding: '32px',
        }}
        className="relative overflow-hidden"
      >
        {/* Subtle top edge liquid reflection */}
        <div
          aria-hidden="true"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95), #FF9FC9, rgba(255, 255, 255, 0.95), transparent)',
          }}
          className="pointer-events-none absolute inset-x-8 top-0 h-[2.5px]"
        />

        {/* Card Header & Brand: Translucent Liquid Glass Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/sakhi_emblem.png"
              alt="Sakhi Official Emblem"
              className="w-9 h-9 object-contain drop-shadow-md"
            />
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  letterSpacing: '0.22em',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}
                className="text-2xl font-extrabold tracking-widest"
              >
                SAKHI
              </span>
              <span
                style={{
                  background: 'rgba(20, 10, 36, 0.45)',
                  color: '#FFB4D6',
                  borderColor: 'rgba(255, 117, 181, 0.6)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                }}
                className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-xs"
              >
                सखी
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playSynthTone(523, 784, 0.1, 0.04, true);
              }}
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-black/25 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-pink-300" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            <div
              style={{
                background: 'rgba(20, 10, 36, 0.45)',
                borderColor: 'rgba(255, 117, 181, 0.6)',
                color: '#FFFFFF',
                backdropFilter: 'blur(12px)',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-extrabold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF75B5]" />
              <span>Sanctuary</span>
            </div>
          </div>
        </div>

        {/* Rotating Affirmation Sisterhood Quote */}
        <div className="mb-4 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-center backdrop-blur-md">
          <p className="text-[11px] font-semibold text-pink-100 italic transition-all duration-500">
            "{AFFIRMATION_QUOTES[quoteIdx]}"
          </p>
        </div>

        {/* 3-Mode Selector Tabs (Email, Phone OTP, Register) */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/30 border border-white/20 mb-4 backdrop-blur-md">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            🔑 Email
          </button>
          <button
            type="button"
            onClick={() => switchMode('otp')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
              mode === 'otp'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            📲 Phone OTP
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            ✨ Register
          </button>
        </div>

        {/* Title & Subtitle with Crisp Contrast */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mb-5"
          >
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: '#FFFFFF',
                textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 0 20px rgba(0,0,0,0.5)',
              }}
              className="text-3xl sm:text-[34px] font-extrabold leading-tight"
            >
              {mode === 'signup' && (
                <>
                  Create Your <span style={{ color: '#FF4081', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(255, 64, 129, 0.6)' }}>Space</span>
                </>
              )}
              {mode === 'signin' && (
                <>
                  Welcome <span style={{ color: '#FF4081', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(255, 64, 129, 0.6)' }}>Back</span>
                </>
              )}
              {mode === 'otp' && (
                <>
                  Instant OTP <span style={{ color: '#FF4081', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(255, 64, 129, 0.6)' }}>Access</span>
                </>
              )}
              {mode === 'forgot' && (
                <>
                  Restore <span style={{ color: '#FF4081', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 16px rgba(255, 64, 129, 0.6)' }}>Access</span>
                </>
              )}
            </h2>
            <p
              style={{ color: '#F3E8FF', fontSize: '0.875rem', lineHeight: '1.45', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
              className="mt-1 font-bold"
            >
              {mode === 'signup' && 'Join thousands of women in a safe, mindful sanctuary.'}
              {mode === 'signin' && 'Step inside your private sanctuary of health, safety, and care.'}
              {mode === 'otp' && 'Verify your mobile number for safe, 1-click passwordless entry.'}
              {mode === 'forgot' && 'Enter your email to receive a secure password reset link.'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Error / Status Messages */}
        {serverError && (
          <div
            role="alert"
            style={{
              backgroundColor: 'rgba(255, 69, 114, 0.25)',
              borderColor: 'rgba(255, 69, 114, 0.6)',
              color: '#FFFFFF',
            }}
            className="mb-4 flex items-start gap-2.5 rounded-2xl border p-3 text-xs font-medium"
          >
            <AlertCircle className="w-4 h-4 text-[#FF85A0] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{serverError}</span>
          </div>
        )}

        {resetMessage && (
          <div
            role="status"
            style={{
              backgroundColor: 'rgba(53, 242, 208, 0.22)',
              borderColor: 'rgba(53, 242, 208, 0.6)',
              color: '#FFFFFF',
            }}
            className="mb-4 flex items-start gap-2.5 rounded-2xl border p-3 text-xs font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-[#35F2D0] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{resetMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="sakhi-name" style={labelStyle} className="block mb-1.5">
                Full Name
              </label>
              <input
                ref={nameInputRef}
                id="sakhi-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Ananya Sharma"
                style={inputStyle}
                className="w-full rounded-2xl border px-4 py-3 text-sm font-bold outline-none transition-all placeholder:text-white/60 focus:border-[#FF75B5] focus:ring-4 focus:ring-pink-500/20 shadow-xs"
              />
              {errors.name && (
                <p style={{ color: '#FF9FC9' }} className="mt-1 text-xs font-semibold" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
          )}

          {/* OTP Mode Fields */}
          {mode === 'otp' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="sakhi-otp-destination" style={labelStyle} className="block mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-pink-200 pointer-events-none">
                    🇮🇳 +91
                  </span>
                  <input
                    id="sakhi-otp-destination"
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => {
                      setPhoneOrEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    disabled={otpSent}
                    placeholder="98765 43210"
                    style={inputStyle}
                    className="w-full rounded-2xl border pl-16 pr-14 py-3 text-sm font-bold outline-none transition-all placeholder:text-white/50 focus:border-[#FF75B5] focus:ring-4 focus:ring-pink-500/20 shadow-xs disabled:opacity-75"
                  />
                  {otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpCode('');
                      }}
                      className="absolute right-3 text-[10px] font-extrabold text-pink-300 hover:text-white uppercase tracking-wider underline cursor-pointer"
                    >
                      Change
                    </button>
                  )}
                </div>
                {errors.email && (
                  <p style={{ color: '#FF9FC9' }} className="mt-1 text-xs font-semibold" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {!otpSent ? (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={submitting}
                    style={{
                      background: 'linear-gradient(135deg, #FF5CA8 0%, #FF75B5 45%, #9B51E0 100%)',
                      boxShadow: '0 8px 24px rgba(255, 92, 168, 0.45)',
                      color: '#FFFFFF',
                    }}
                    className="w-full rounded-2xl py-3.5 px-6 text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        <span>SEND VERIFICATION OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-pink-100 bg-white/10 px-3.5 py-2 rounded-xl border border-white/20">
                    <span className="truncate">OTP sent to {phoneOrEmail}</span>
                    <span className="font-extrabold text-emerald-300 shrink-0 ml-2">Demo: {demoOtp}</span>
                  </div>

                  <div>
                    <label htmlFor="sakhi-otp-code" style={labelStyle} className="block mb-1.5">
                      Enter 4-Digit Verification OTP
                    </label>
                    <input
                      id="sakhi-otp-code"
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => {
                        setOtpCode(e.target.value.replace(/[^0-9]/g, ''));
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="• • • •"
                      style={{
                        ...inputStyle,
                        textAlign: 'center',
                        letterSpacing: '0.45em',
                        fontSize: '1.25rem',
                      }}
                      className="w-full rounded-2xl border px-4 py-2.5 text-center font-black outline-none transition-all placeholder:text-white/40 focus:border-[#FF75B5] focus:ring-4 focus:ring-pink-500/20 shadow-xs"
                    />
                    {errors.password && (
                      <p style={{ color: '#FF9FC9' }} className="mt-1 text-xs font-semibold" role="alert">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Resend & Demo OTP Helpers */}
                  <div className="flex items-center justify-between text-xs px-1">
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="text-[11px] font-bold text-amber-200 hover:text-white underline underline-offset-2 cursor-pointer flex items-center gap-1"
                    >
                      <span>⚡ Auto-Fill Demo OTP ({demoOtp})</span>
                    </button>
                    
                    <button
                      type="button"
                      disabled={countdown > 0 || submitting}
                      onClick={handleSendOtp}
                      className="text-[11px] font-bold text-pink-200 hover:text-white disabled:opacity-50 cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{countdown > 0 ? `Resend (${countdown}s)` : 'Resend OTP'}</span>
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        background: 'linear-gradient(135deg, #FF5CA8 0%, #FF75B5 45%, #9B51E0 100%)',
                        boxShadow: '0 8px 24px rgba(255, 92, 168, 0.45)',
                        color: '#FFFFFF',
                      }}
                      className="w-full rounded-2xl py-3.5 px-6 text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                          <span>Verifying OTP...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>VERIFY & ENTER SANCTUARY</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Email / Password Mode Fields */}
          {mode !== 'otp' && (
            <>
              <div>
                <label htmlFor="sakhi-email" style={labelStyle} className="block mb-1.5">
                  Email Address
                </label>
                <input
                  ref={emailInputRef}
                  id="sakhi-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="you@sakhi.world"
                  style={inputStyle}
                  className="w-full rounded-2xl border px-4 py-3 text-sm font-bold outline-none transition-all placeholder:text-white/60 focus:border-[#FF75B5] focus:ring-4 focus:ring-pink-500/20 shadow-xs"
                />
                {errors.email && (
                  <p style={{ color: '#FF9FC9' }} className="mt-1 text-xs font-semibold" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="sakhi-password" style={labelStyle} className="block">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        style={{ color: '#FF9FC9', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                        className="text-xs font-extrabold hover:text-white hover:underline transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="sakhi-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="••••••••"
                      style={inputStyle}
                      className="w-full rounded-2xl border px-4 py-3 pr-11 text-sm font-bold outline-none transition-all placeholder:text-white/60 focus:border-[#FF75B5] focus:ring-4 focus:ring-pink-500/20 shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p style={{ color: '#FF9FC9' }} className="mt-1 text-xs font-semibold" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label htmlFor="sakhi-confirm-password" style={labelStyle} className="block mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    id="sakhi-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }
                    }}
                    placeholder="••••••••"
                    style={inputStyle}
                    className="w-full rounded-2xl border px-4 py-3 text-sm font-bold outline-none transition-all placeholder:text-white/60 focus:border-[#FF75B5] focus:ring-4 focus:ring-pink-500/20 shadow-xs"
                  />
                  {errors.confirmPassword && (
                    <p style={{ color: '#FF9FC9' }} className="mt-1 text-xs font-semibold" role="alert">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Primary Action Button: High Energy Vibrant Gradient */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || googleLoading}
                  style={{
                    background: 'linear-gradient(135deg, #FF5CA8 0%, #FF75B5 45%, #9B51E0 100%)',
                    boxShadow: '0 8px 24px rgba(255, 92, 168, 0.45)',
                    color: '#FFFFFF',
                  }}
                  className="w-full rounded-2xl py-3.5 px-6 text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                      <span>Entering Sanctuary...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {mode === 'signin' && 'SIGN IN TO SAKHI'}
                        {mode === 'signup' && 'CREATE MY ACCOUNT'}
                        {mode === 'forgot' && 'SEND RESET LINK'}
                      </span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        {/* 1-Click Guest Exploration Access */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => {
              onAuthenticated({
                id: 'usr_ananya_guest',
                name: 'Ananya Sharma',
                email: 'ananya.sharma@example.com',
                provider: 'email',
                joinedAt: new Date().toISOString(),
              });
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 64, 129, 0.32) 0%, rgba(142, 36, 170, 0.32) 100%)',
              borderColor: 'rgba(255, 117, 181, 0.75)',
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
            }}
            className="w-full rounded-2xl py-3 px-5 text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 cursor-pointer border hover:bg-pink-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-pink-500/20"
          >
            <span>🌸 EXPLORE FULL APP (1-CLICK GUEST ACCESS)</span>
          </button>
        </div>

        {/* Divider */}
        {mode !== 'forgot' && (
          <div>
            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/30" />
              <span style={{ color: '#E8D4FC' }} className="text-[10px] font-extrabold tracking-[0.2em] uppercase">
                OR
              </span>
              <span className="h-px flex-1 bg-white/30" />
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={submitting || googleLoading}
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                color: '#0F172A',
              }}
              className="w-full rounded-2xl py-3 px-5 text-xs font-extrabold tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-md border hover:bg-slate-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#E91E63]" aria-hidden="true" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.94 0 3.51.68 4.75 1.81l3.48-3.48C18.08 1.38 15.27 0.25 12 0.25 7.31 0.25 3.25 2.94 1.28 6.86l4.06 3.15C6.3 7.12 8.92 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.92c2.2-2.03 3.66-5.02 3.66-8.74z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.34 14.99c-.24-.71-.37-1.47-.37-2.26 0-.79.13-1.55.37-2.26L1.28 7.32C.46 8.95 0 10.79 0 12.73s.46 3.78 1.28 5.41l4.06-3.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24.25c3.27 0 6.02-1.08 8.03-2.94l-3.76-2.92c-1.08.72-2.45 1.16-4.27 1.16-3.08 0-5.7-2.08-6.66-4.97l-4.06 3.15C3.25 21.56 7.31 24.25 12 24.25z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* Footer Mode Switcher & Demo Credentials */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-col items-center gap-2 text-center">
          {mode === 'signin' ? (
            <p style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }} className="text-xs font-bold">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                style={{ color: '#FF75B5' }}
                className="font-extrabold underline underline-offset-4 hover:text-white transition-colors cursor-pointer ml-1"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p style={{ color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }} className="text-xs font-bold">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                style={{ color: '#FF75B5' }}
                className="font-extrabold underline underline-offset-4 hover:text-white transition-colors cursor-pointer ml-1"
              >
                Sign In
              </button>
            </p>
          )}

          {mode === 'signin' && (
            <button
              type="button"
              onClick={fillDemoCredentials}
              style={{ color: '#FF9FC9' }}
              className="text-xs font-extrabold hover:text-white transition-colors cursor-pointer mt-1"
            >
              Fill Demo Credentials (aria@sakhi.world)
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
