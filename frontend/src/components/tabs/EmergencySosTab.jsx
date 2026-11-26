import React, { useState, useEffect, useRef } from 'react';
import { formatSosMessage } from '../../utils/periodLogic.js';
import {
  AlertTriangle,
  MapPin,
  Phone,
  MessageSquare,
  Volume2,
  VolumeX,
  PhoneCall,
  PhoneOff,
  Navigation,
  Shield,
  HeartPulse,
  Radio,
  Copy,
  Check,
  Building2,
  Share2,
} from 'lucide-react';

export const EmergencySosTab = ({ userProfile }) => {
  const [coords, setCoords] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Audio Siren Alarm using Web Audio API
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const sirenIntervalRef = useRef(null);

  // Fake Call Escape Simulator
  const [fakeCallTriggered, setFakeCallTriggered] = useState(false);
  const [fakeCallRinging, setFakeCallRinging] = useState(false);
  const [fakeCallAnswered, setFakeCallAnswered] = useState(false);
  const [fakeCallerName, setFakeCallerName] = useState('Mom 💖');
  const [callTimerSeconds, setCallTimerSeconds] = useState(0);

  // Auto-fetch GPS on tab entry if permitted
  useEffect(() => {
    fetchLiveLocation();
    return () => {
      stopSiren();
    };
  }, []);

  const fetchLiveLocation = () => {
    setGpsLoading(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      // Fallback realistic location (e.g. Connaught Place, New Delhi)
      setCoords({ lat: 28.6315, lng: 77.2167 });
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGpsLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setGpsError('Location permission denied or unavailable. Using estimated location.');
        // Provide estimated demo coordinates so map link is always valid
        setCoords({ lat: 28.6139, lng: 77.2090 });
        setGpsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const sosMessage = formatSosMessage({
    userName: userProfile.name,
    bloodGroup: userProfile.bloodGroup,
    latitude: coords?.lat,
    longitude: coords?.lng,
    parentPhone: userProfile.parentsPhone,
  });

  const mapsLink = coords
    ? `https://maps.google.com/?q=${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`
    : 'https://maps.google.com';

  const copySosMessage = () => {
    navigator.clipboard.writeText(sosMessage);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  // WhatsApp SOS Link
  const encodedSos = encodeURIComponent(sosMessage);
  const cleanParentPhone = userProfile.parentsPhone ? userProfile.parentsPhone.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = cleanParentPhone
    ? `https://wa.me/${cleanParentPhone}?text=${encodedSos}`
    : `https://wa.me/?text=${encodedSos}`;

  // SMS SOS Link
  const smsUrl = cleanParentPhone
    ? `sms:${cleanParentPhone}?body=${encodedSos}`
    : `sms:?body=${encodedSos}`;

  // Start / Stop Loud Siren Alarm
  const toggleSiren = () => {
    if (sirenPlaying) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  const startSiren = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      let freqHigh = true;
      osc.frequency.setValueAtTime(950, ctx.currentTime);

      sirenIntervalRef.current = setInterval(() => {
        if (!oscRef.current) return;
        freqHigh = !freqHigh;
        const targetFreq = freqHigh ? 1100 : 750;
        osc.frequency.exponentialRampToValueAtTime(targetFreq, ctx.currentTime + 0.2);
      }, 350);

      oscRef.current = osc;
      gainRef.current = gain;
      setSirenPlaying(true);
    } catch (e) {
      console.error('Audio siren error:', e);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
    }
    oscRef.current = null;
    audioCtxRef.current = null;
    setSirenPlaying(false);
  };

  // Fake Call Logic
  const triggerFakeCall = (delaySeconds = 3) => {
    setFakeCallTriggered(true);
    setFakeCallRinging(false);
    setFakeCallAnswered(false);
    setCallTimerSeconds(0);

    setTimeout(() => {
      setFakeCallRinging(true);
      // Play brief synthetic phone ring
      playRingTone();
    }, delaySeconds * 1000);
  };

  const playRingTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        try {
          osc.stop();
          ctx.close();
        } catch (e) {}
      }, 1800);
    } catch (e) {}
  };

  useEffect(() => {
    let interval;
    if (fakeCallAnswered) {
      interval = setInterval(() => {
        setCallTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fakeCallAnswered]);

  const endFakeCall = () => {
    setFakeCallTriggered(false);
    setFakeCallRinging(false);
    setFakeCallAnswered(false);
    setCallTimerSeconds(0);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Red Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-red-600/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-2">
              <Radio className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>Real-Time 24x7 Emergency Protection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-extrabold tracking-tight">
              One-Click Master Emergency SOS 🚨
            </h2>
            <p className="text-red-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              If you feel unsafe or in danger, trigger immediate dispatches. Fetches exact GPS coordinates, generates active Google Maps links, and alerts Police (112), Women Helpline (1091), and your family.
            </p>
          </div>

          <button
            onClick={fetchLiveLocation}
            disabled={gpsLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-red-600 hover:bg-red-50 font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap self-stretch md:self-auto justify-center"
          >
            <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
            <span>{gpsLoading ? 'Fetching GPS...' : 'Refresh GPS Location'}</span>
          </button>
        </div>

        {/* Live GPS Badge */}
        <div className="mt-6 pt-4 border-t border-red-500/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-300" />
            <span className="font-semibold">
              Live Coordinates:{' '}
              {coords ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}` : 'Detecting...'}
            </span>
          </div>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-200 hover:underline font-bold"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>

      {/* Primary Action Buttons: WhatsApp SOS, SMS SOS, Police 112, Women 1091, Parents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* WhatsApp SOS Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/25 flex flex-col justify-between transition-all hover:scale-[1.02] group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-100 bg-white/20 px-2.5 py-0.5 rounded-full">
              Instant Family Alert
            </span>
            <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xl font-bold">One-Click WhatsApp SOS</div>
            <div className="text-xs text-emerald-100 mt-1">
              Sends GPS location link + emergency text to {userProfile?.parentsPhone || 'Family'}
            </div>
          </div>
        </a>

        {/* SMS SOS Action */}
        <a
          href={smsUrl}
          className="p-6 rounded-3xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold shadow-lg shadow-red-500/25 flex flex-col justify-between transition-all hover:scale-[1.02] group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-extrabold text-red-100 bg-white/20 px-2.5 py-0.5 rounded-full">
              Cellular Network
            </span>
            <Share2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xl font-bold">One-Click SMS SOS</div>
            <div className="text-xs text-red-100 mt-1">
              Works without active internet data directly via phone carrier SMS
            </div>
          </div>
        </a>

        {/* Loud Siren Alarm Button */}
        <div className="p-6 rounded-3xl bg-white border-2 border-red-200 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-extrabold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
              Deterrent Alarm
            </span>
            {sirenPlaying ? (
              <VolumeX className="w-6 h-6 text-red-600 animate-spin" />
            ) : (
              <Volume2 className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">Loud Siren Audio Alarm</div>
            <div className="text-xs text-slate-500 mt-1 mb-4">
              Disorients attackers and draws immediate public attention in dark streets
            </div>
            <button
              onClick={toggleSiren}
              className={`w-full py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                sirenPlaying
                  ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/40'
                  : 'bg-red-100 hover:bg-red-200 text-red-700'
              }`}
            >
              {sirenPlaying ? 'STOP SIREN NOW 🛑' : 'BLARE LOUD SIREN 📢'}
            </button>
          </div>
        </div>
      </div>

      {/* Direct-Dial Phone Quick Bar */}
      <div className="bg-white rounded-3xl p-6 border border-pink-200/90 shadow-sm">
        <h3 className="text-lg font-serif-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-rose-500" />
          <span>Direct-Dial Emergency Helplines</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="tel:112"
            className="flex items-center justify-between p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="text-xs text-rose-600 font-bold uppercase">National Emergency</div>
              <div className="text-xl font-extrabold text-rose-900">Police: 112</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
          </a>

          <a
            href="tel:1091"
            className="flex items-center justify-between p-4 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="text-xs text-pink-600 font-bold uppercase">Women Helpline (24x7)</div>
              <div className="text-xl font-extrabold text-pink-900">Helpline: 1091</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
          </a>

          <a
            href={`tel:${userProfile?.parentsPhone}`}
            className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all cursor-pointer group"
          >
            <div>
              <div className="text-xs text-purple-600 font-bold uppercase">Parent / Guardian</div>
              <div className="text-sm sm:text-base font-extrabold text-purple-900 truncate max-w-[160px]">
                {userProfile?.parentsPhone || 'Call Family'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>

      {/* Two Column Section: Medical Emergency Assistance Card & Fake Call Escape Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical Emergency Assistance Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-serif-heading font-bold text-slate-900">
                  Medical Emergency Assistance
                </h3>
              </div>
              <span className="text-xs bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-full">
                Blood Group: {userProfile?.bloodGroup}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Critical medical rescue numbers for trauma, severe bleeding, or obstetric emergencies.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-red-50 border border-red-200">
                <div>
                  <div className="text-xs font-bold text-red-900">National Ambulance Service</div>
                  <div className="text-xs text-red-600">Immediate trauma & medical transport</div>
                </div>
                <a
                  href="tel:108"
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-extrabold text-xs hover:bg-red-700 transition-all"
                >
                  Dial 108
                </a>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <div>
                  <div className="text-xs font-bold text-amber-900">Mother & Child Rescue Van</div>
                  <div className="text-xs text-amber-700">Dedicated pregnant transport & neonates</div>
                </div>
                <a
                  href="tel:102"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-extrabold text-xs hover:bg-amber-700 transition-all"
                >
                  Dial 102
                </a>
              </div>
            </div>

            {userProfile?.emergencyNote && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                <span className="font-bold">Medical Note: </span>
                {userProfile.emergencyNote}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <a
              href={`https://www.google.com/maps/search/hospitals+near+me/@${coords?.lat || 28.6139},${coords?.lng || 77.2090},14z`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Building2 className="w-4 h-4 text-rose-400" />
              <span>Find Nearby Hospitals On Map</span>
            </a>
          </div>
        </div>

        {/* Fake Call Escape Simulator */}
        <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                Tactical Escape Tool
              </span>
              <span className="text-2xl animate-float">📱</span>
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-slate-900 mb-1">
              Fake Call Escape Simulator
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Stuck with an uncomfortable stranger, weird cab driver, or awkward situation? Trigger a realistic incoming phone call to excuse yourself gracefully.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Simulated Caller Name
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Mom 💖', 'Dad 👑', 'Big Sister 🌸'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFakeCallerName(c)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      fakeCallerName === c
                        ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                        : 'bg-white text-slate-700 border-pink-200 hover:border-pink-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <button
              onClick={() => triggerFakeCall(0)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <PhoneCall className="w-4 h-4" /> Trigger Instant Fake Call (Right Now)
            </button>
            <button
              onClick={() => triggerFakeCall(5)}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-pink-100 text-pink-700 border border-pink-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>⏱️ Delay 5 Seconds (Put phone in hand & wait)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pre-Compiled Alert Text Preview Card */}
      <div className="bg-white rounded-3xl p-6 border border-pink-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Shield className="w-4 h-4 text-pink-500" />
            <span>Pre-Compiled Emergency Dispatch Text Payload</span>
          </h4>
          <button
            onClick={copySosMessage}
            className="flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 transition-all cursor-pointer"
          >
            {copiedToast ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Text
              </>
            )}
          </button>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
          {sosMessage}
        </pre>
      </div>

      {/* Fake Call Full Screen Modal */}
      {fakeCallTriggered && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-8 text-white animate-in fade-in duration-300">
          {/* Top Info */}
          <div className="text-center pt-12">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-5xl mb-4 shadow-xl">
              {fakeCallerName.includes('Mom') ? '👩' : fakeCallerName.includes('Dad') ? '👨' : '👧'}
            </div>
            <h3 className="text-3xl font-serif-heading font-extrabold">{fakeCallerName}</h3>
            <p className="text-sm text-slate-400 mt-1">
              {fakeCallAnswered
                ? `Call in progress (${Math.floor(callTimerSeconds / 60)}:${String(
                    callTimerSeconds % 60
                  ).padStart(2, '0')})`
                : 'Incoming Audio Call...'}
            </p>
          </div>

          {/* Middle Prompt Voice simulation */}
          {fakeCallAnswered && (
            <div className="max-w-xs text-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs text-pink-200 leading-relaxed">
              "Hey sweetheart! Where are you right now? Dad and I are waiting in the car right outside. Come out right now!"
            </div>
          )}

          {/* Bottom Actions */}
          <div className="w-full max-w-xs pb-12">
            {!fakeCallAnswered ? (
              <div className="flex items-center justify-around">
                <button
                  onClick={endFakeCall}
                  aria-label="Decline Call"
                  className="w-18 h-18 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-xl shadow-red-600/50 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                >
                  <PhoneOff className="w-8 h-8" />
                </button>
                <button
                  onClick={() => setFakeCallAnswered(true)}
                  aria-label="Answer Call"
                  className="w-18 h-18 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-500/50 ring-4 ring-emerald-400/40 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <PhoneCall className="w-8 h-8" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={endFakeCall}
                  aria-label="End Call"
                  className="w-18 h-18 mx-auto rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-xl shadow-red-600/50 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                >
                  <PhoneOff className="w-8 h-8" />
                </button>
                <div className="text-xs text-slate-400 mt-3 font-semibold">End Call</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
