import React from 'react';
import { Clock, SlidersHorizontal, RotateCcw, UserCheck, Scale } from 'lucide-react';
import { UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { calculateBMIFromKgCm, getBmiCategory } from '../utils/bmi';

interface HeaderProps {
  profile: UserProfile;
  onOpenMetrics: () => void;
  onOpenBmi?: () => void;
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
  onResetToDemo,
  onRestartOnboarding,
  onDurationChange,
  onOpenInstallModal,
}) => {
  // Goal friendly title mapping
  const goalTitle = {
    'fat-loss': 'Fat Shred',
    'muscle-gain': 'Hypertrophy',
    recomposition: 'Recomp Elite',
    maintenance: 'Peak Health',
  }[profile.goal] || 'Fitness Plan';

  // Current calculated BMI
  const currentBmiResult = calculateBMIFromKgCm(profile.weight, profile.heightCm);
  const currentBmi = currentBmiResult.bmi;
  const currentCategory = currentBmiResult.category;

  const formatWeight = () => {
    return `${profile.weight} ${profile.weightUnit}`;
  };

  return (
    <header 
      id="main-header" 
      className="stable-sticky-header z-40 bg-[#191D26] border-b border-[#31353E] shadow-md text-slate-100 select-none pt-[env(safe-area-inset-top,0px)]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand: fitinblink */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative shrink-0">
            <img
              src="/logo.png"
              alt="fitinblink Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-[#2563EB]/40 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-[#191D26]" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-black tracking-tight uppercase text-white leading-none whitespace-nowrap font-heading">
                fitinblink
              </h1>
              <span className="hidden md:inline-flex text-[9px] font-mono font-bold text-[#60A5FA] bg-[#1E293B] border border-[#2563EB]/30 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Split
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-[#94A3B8] mt-0.5 flex items-center gap-1 leading-tight whitespace-nowrap">
              <span>Goal: <span className="text-[#60A5FA] font-bold">{goalTitle}</span></span>
              <span className="text-slate-600 hidden xs:inline">•</span>
              <span className="text-slate-400 hidden xs:inline font-mono">{profile.workoutDurationMinutes}m</span>
            </p>
          </div>
        </div>

        {/* Center: Quick Duration Time Setter in Bento Pill (md and above) */}
        <div className="hidden lg:flex items-center gap-1 bg-[#252B37] px-2.5 py-1 rounded-xl border border-[#31353E]">
          <Clock className="w-3.5 h-3.5 text-[#60A5FA] mr-1" />
          <span className="text-xs font-mono font-bold text-[#94A3B8] mr-1 uppercase">Time:</span>
          {DURATION_PRESETS.map((dur) => {
            const isActive = profile.workoutDurationMinutes === dur;
            return (
              <button
                key={dur}
                id={`header-duration-${dur}`}
                onClick={() => onDurationChange(dur)}
                className={`px-2 py-0.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs font-black'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#2C3342]'
                }`}
              >
                {dur}m
              </button>
            );
          })}
        </div>

        {/* Right Actions: BMI, Profile & Utilities */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Check BMI Index Trigger Button */}
          {onOpenBmi && (
            <button
              id="check-bmi-button"
              onClick={onOpenBmi}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#252B37] hover:bg-[#2C3342] hover:border-[#3B82F6]/50 border border-[#31353E] rounded-xl text-xs font-bold transition-all text-slate-200 hover:text-white group cursor-pointer shrink-0 active:scale-95 shadow-xs"
              title={`Check Body Mass Index (${currentBmi} • ${currentCategory.label})`}
              aria-label="Check BMI Index"
            >
              <Scale className="w-3.5 h-3.5 text-[#60A5FA] group-hover:scale-110 transition-transform shrink-0" />
              <span className="font-bold hidden sm:inline">BMI</span>
              <span className="text-[10px] sm:text-xs font-mono font-bold bg-[#191D26] text-[#60A5FA] border border-[#2563EB]/40 px-1.5 py-0.5 rounded-md">
                {currentBmi}
              </span>
            </button>
          )}

          {/* User Metrics Pill */}
          <button
            id="open-metrics-button"
            onClick={onOpenMetrics}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-[#252B37] hover:bg-[#2C3342] border border-[#31353E] hover:border-[#3B82F6]/50 rounded-xl text-xs transition-all text-slate-100 group cursor-pointer shrink-0 active:scale-95 shadow-xs"
            title="Edit Weight, Height, Age, and Target Goals"
            aria-label="Open physical profile metrics"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#60A5FA] group-hover:rotate-12 transition-transform shrink-0" />
            <span className="font-mono font-bold text-white text-[11px] sm:text-xs">
              {formatWeight()}
            </span>
          </button>

          {/* Utilities Group */}
          <div className="flex items-center bg-[#252B37] border border-[#31353E] rounded-xl p-0.5 shrink-0">
            <PWAInstallButton onOpenModal={onOpenInstallModal} />

            {onRestartOnboarding && (
              <button
                id="restart-onboarding-btn"
                onClick={onRestartOnboarding}
                className="p-1 sm:p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#2C3342] rounded-lg transition-colors cursor-pointer shrink-0"
                title="Re-open Onboarding Flow"
                aria-label="Restart Onboarding"
              >
                <UserCheck className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              id="reset-demo-button"
              onClick={onResetToDemo}
              className="p-1 sm:p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#2C3342] rounded-lg transition-colors cursor-pointer shrink-0"
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

