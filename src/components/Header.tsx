import React from 'react';
import { Zap, Clock, SlidersHorizontal, RotateCcw, UserCheck } from 'lucide-react';
import { UserProfile, Goal } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  profile: UserProfile;
  onOpenMetrics: () => void;
  onDurationChange: (duration: number) => void;
  onResetToDemo: () => void;
  onRestartOnboarding?: () => void;
  onOpenInstallModal: () => void;
}

const DURATION_PRESETS = [30, 45, 60, 90, 120];

const GOAL_DISPLAY: Record<Goal, string> = {
  muscle_gain: 'Build Muscle',
  gentle_deficit: 'Lose Fat',
  maintenance: 'Maintain',
};

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenMetrics,
  onDurationChange,
  onResetToDemo,
  onRestartOnboarding,
  onOpenInstallModal,
}) => {
  const goalTitle = GOAL_DISPLAY[profile.goal] || 'Athlete';

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
      className="stable-sticky-header z-40 bg-white sm:bg-white/95 sm:backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-900 select-none"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Brand & Welcoming Greeting (Completely Stable on Mobile) */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 mr-1 sm:mr-2">
          <img
            src="/logo.png"
            alt="Fit in Blink Logo"
            referrerPolicy="no-referrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover shadow-sm shrink-0 border border-slate-200"
          />
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-2xl font-black tracking-tight uppercase italic text-slate-950 leading-none whitespace-nowrap">
                Fit in Blink
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-lime-800 bg-lime-100 border border-lime-200 px-2 py-0.5 rounded-full uppercase shrink-0">
                Active Protocol
              </span>
            </div>
            {/* Prominent Welcoming Greeting with User Goal */}
            <p className="text-[11px] sm:text-sm font-bold text-slate-700 mt-0.5 sm:mt-1 flex items-center gap-1 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              <span>Welcome back, <span className="text-slate-950 font-black underline decoration-lime-500 underline-offset-2">{goalTitle}</span>!</span>
            </p>
          </div>
        </div>

        {/* Center: Quick Duration Time Setter in Bento Pill */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-lime-600" />
            <span>Time:</span>
          </div>
          <div className="flex items-center gap-1">
            {DURATION_PRESETS.map((dur) => {
              const isActive = profile.workoutDurationMinutes === dur;
              return (
                <button
                  key={dur}
                  id={`header-duration-${dur}`}
                  onClick={() => onDurationChange(dur)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all uppercase cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                  }`}
                >
                  {dur >= 60 ? `${dur / 60}h` : `${dur}m`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Install App, Metrics Trigger & Quick Demo */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* PWA Install Button */}
          <PWAInstallButton onOpenModal={onOpenInstallModal} />

          {/* User Metrics Pill */}
          <button
            id="open-metrics-button"
            onClick={onOpenMetrics}
            className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-full text-xs transition-all text-slate-900 group cursor-pointer shrink-0 active:scale-95"
            title="Edit Weight, Height, Age, and Target Goals"
            aria-label="Open physical profile metrics"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-lime-600 group-hover:rotate-12 transition-transform shrink-0" />
            <div className="text-left leading-tight hidden md:block">
              <div className="font-mono font-bold text-slate-900 text-xs">
                {formatWeight()} • {formatHeight()}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {profile.age} yrs • {profile.gender}
              </div>
            </div>
            <span className="font-bold uppercase text-[10px] sm:text-[11px] text-lime-700 hidden xs:inline md:hidden">Metrics</span>
          </button>

          {/* Onboarding Restart Button */}
          {onRestartOnboarding && (
            <button
              id="restart-onboarding-btn"
              onClick={onRestartOnboarding}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 cursor-pointer shrink-0 active:scale-95"
              title="Re-open Onboarding Flow"
              aria-label="Restart Onboarding"
            >
              <UserCheck className="w-4 h-4" />
            </button>
          )}

          {/* Reset Demo Button */}
          <button
            id="reset-demo-button"
            onClick={onResetToDemo}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200 cursor-pointer shrink-0 active:scale-95"
            title="Reset to default athlete profile"
            aria-label="Reset Demo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Duration Bar - Sleek & Fixed Height */}
      <div className="lg:hidden flex items-center justify-between px-3 sm:px-4 py-1.5 bg-slate-50 border-t border-slate-200 text-xs h-9 sm:h-10">
        <div className="flex items-center gap-1 text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0">
          <Clock className="w-3 h-3 text-lime-600" />
          <span>Duration:</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {DURATION_PRESETS.map((dur) => {
            const isActive = profile.workoutDurationMinutes === dur;
            return (
              <button
                key={dur}
                id={`mobile-duration-${dur}`}
                onClick={() => onDurationChange(dur)}
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white font-black shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                }`}
              >
                {dur >= 60 ? `${dur / 60}h` : `${dur}m`}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
