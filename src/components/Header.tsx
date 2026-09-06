import React from 'react';
import { Clock, SlidersHorizontal, RotateCcw, UserCheck, Mic, Scale } from 'lucide-react';
import { UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { calculateBMIFromKgCm, getBmiCategory } from '../utils/bmi';

interface HeaderProps {
  profile: UserProfile;
  onOpenMetrics: () => void;
  onOpenBmi?: () => void;
  onOpenVoiceCoach?: () => void;
  onResetToDemo: () => void;
  onRestartOnboarding?: () => void;
  onDurationChange: (duration: number) => void;
  onOpenInstallModal?: () => void;
}

const DURATION_PRESETS = [15, 30, 45, 60, 90];

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenMetrics,
  onOpenBmi,
  onOpenVoiceCoach,
  onResetToDemo,
  onRestartOnboarding,
  onDurationChange,
  onOpenInstallModal,
}) => {
  // Goal friendly title mapping
  const goalTitle = {
    'fat-loss': 'Fat Shred',
    'muscle-gain': 'Hypertrophy Gain',
    recomposition: 'Recomp Elite',
    maintenance: 'Peak Health',
  }[profile.goal] || 'Fitness Plan';

  // Current calculated BMI
  const currentBmiResult = calculateBMIFromKgCm(profile.weight, profile.heightCm);
  const currentBmi = currentBmiResult.bmi;
  const currentCategory = currentBmiResult.category;

  const formatHeight = () => {
    if (profile.heightUnit === 'ft') {
      return `${profile.heightFeet}'${profile.heightInches}"`;
    }
    return `${profile.heightCm} cm`;
  };

  const formatWeight = () => {
    return `${profile.weight} ${profile.weightUnit}`;
  };

  return (
    <header 
      id="main-header" 
      className="stable-sticky-header z-40 bg-[#121212]/95 backdrop-blur-md border-b border-[#242424] shadow-md text-slate-100 select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand: Stable & Prominent */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <div className="relative shrink-0">
            <img
              src="/logo.png"
              alt="Fit in Blink Logo"
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl object-cover border border-[#00FF66]/30 shadow-[0_0_12px_rgba(0,255,102,0.2)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00FF66] ring-2 ring-[#121212] animate-pulse" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight uppercase italic text-white leading-none whitespace-nowrap font-heading">
                Fit in Blink
              </h1>
              <span className="hidden md:inline-flex text-[9px] font-mono font-bold text-[#00FF66] bg-[#14281a] border border-[#00FF66]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Daily Split
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 flex items-center gap-1.5 leading-tight whitespace-nowrap">
              <span>Goal: <span className="text-[#00FF66] font-bold">{goalTitle}</span></span>
              <span className="text-slate-600 hidden xs:inline">•</span>
              <span className="text-slate-400 hidden xs:inline font-mono">{profile.workoutDurationMinutes}m active</span>
            </p>
          </div>
        </div>

        {/* Center: Quick Duration Time Setter in Bento Pill (on desktop) */}
        <div className="hidden xl:flex items-center gap-1 bg-[#181818] px-3 py-1.5 rounded-xl border border-[#2b2b2b]">
          <Clock className="w-3.5 h-3.5 text-[#00FF66] mr-1" />
          <span className="text-xs font-mono font-bold text-slate-400 mr-1.5 uppercase">Time:</span>
          {DURATION_PRESETS.map((dur) => {
            const isActive = profile.workoutDurationMinutes === dur;
            return (
              <button
                key={dur}
                id={`header-duration-${dur}`}
                onClick={() => onDurationChange(dur)}
                className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00FF66] text-black shadow-xs font-black'
                    : 'text-slate-400 hover:text-white hover:bg-[#262626]'
                }`}
              >
                {dur}m
              </button>
            );
          })}
        </div>

        {/* Right Actions: Voice Coach, BMI, Profile & Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Live Voice Coach Quick Trigger */}
          {onOpenVoiceCoach && (
            <button
              id="header-voice-coach-btn"
              onClick={onOpenVoiceCoach}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#17281a] hover:bg-[#1e3522] border border-[#00FF66]/40 hover:border-[#00FF66] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 group"
              title="Talk to Coach Zephyr (Live Audio in Hinglish / English)"
              aria-label="Open Voice Coach"
            >
              <Mic className="w-3.5 h-3.5 text-[#00FF66] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold text-[#00FF66]">Voice Coach</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
            </button>
          )}

          {/* Check BMI Index Trigger Button */}
          {onOpenBmi && (
            <button
              id="check-bmi-button"
              onClick={onOpenBmi}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 bg-[#1b1b1b] hover:bg-[#242424] hover:border-[#00FF66]/50 border border-[#2e2e2e] rounded-xl text-xs font-bold transition-all text-slate-200 hover:text-white group cursor-pointer shrink-0 active:scale-95 shadow-xs"
              title={`Check Body Mass Index (${currentBmi} • ${currentCategory.label})`}
              aria-label="Check BMI Index"
            >
              <Scale className="w-3.5 h-3.5 text-[#00FF66] group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-bold hidden xs:inline">BMI</span>
              <span className="text-[10px] font-mono font-bold bg-[#121212] text-[#00FF66] border border-[#00FF66]/40 px-1.5 py-0.5 rounded-md">
                {currentBmi}
              </span>
            </button>
          )}

          {/* User Metrics Pill */}
          <button
            id="open-metrics-button"
            onClick={onOpenMetrics}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 bg-[#1b1b1b] hover:bg-[#242424] border border-[#2e2e2e] hover:border-[#00FF66]/50 rounded-xl text-xs transition-all text-slate-100 group cursor-pointer shrink-0 active:scale-95"
            title="Edit Weight, Height, Age, and Target Goals"
            aria-label="Open physical profile metrics"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00FF66] group-hover:rotate-12 transition-transform shrink-0" />
            <span className="font-mono font-bold text-white text-xs hidden md:inline">
              {formatWeight()}
            </span>
            <span className="font-bold text-[11px] text-[#00FF66] hidden sm:inline md:hidden">Profile</span>
          </button>

          {/* Utilities Group in one neat cluster */}
          <div className="flex items-center bg-[#181818] border border-[#2e2e2e] rounded-xl p-0.5 shrink-0">
            <PWAInstallButton onOpenModal={onOpenInstallModal} />

            {onRestartOnboarding && (
              <button
                id="restart-onboarding-btn"
                onClick={onRestartOnboarding}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-[#262626] rounded-lg transition-colors cursor-pointer shrink-0"
                title="Re-open Onboarding Flow"
                aria-label="Restart Onboarding"
              >
                <UserCheck className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              id="reset-demo-button"
              onClick={onResetToDemo}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#262626] rounded-lg transition-colors cursor-pointer shrink-0"
              title="Reset to default athlete profile"
              aria-label="Reset Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
