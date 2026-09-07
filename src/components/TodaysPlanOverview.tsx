import React from 'react';
import { 
  Dumbbell, 
  Flame, 
  Target, 
  Clock, 
  ChevronRight, 
  Layers, 
  Sparkles, 
  Calendar,
  Apple,
  Compass,
  Zap,
  Scale,
  SlidersHorizontal,
  UserCheck
} from 'lucide-react';
import { DailyWorkoutPlan, MacroTargets, UserProfile, Goal } from '../types';

interface TodaysPlanOverviewProps {
  workoutPlan: DailyWorkoutPlan;
  macros: MacroTargets;
  profile: UserProfile;
  onNavigateToWorkout: () => void;
  onNavigateToDiet: () => void;
  onNavigateToGuide?: () => void;
  onOpenMetrics?: () => void;
  onOpenBmi?: () => void;
}

const GOAL_LABELS: Record<Goal, string> = {
  muscle_gain: 'Build Muscle',
  gentle_deficit: 'Lose Fat',
  maintenance: 'Maintain',
};

export const TodaysPlanOverview: React.FC<TodaysPlanOverviewProps> = ({
  workoutPlan,
  macros,
  profile,
  onNavigateToWorkout,
  onNavigateToDiet,
  onNavigateToGuide,
  onOpenMetrics,
  onOpenBmi,
}) => {
  // Calculate completion percentage or readiness score
  const completionRatio = Math.min(100, Math.round((workoutPlan.durationMinutes / 60) * 100));

  return (
    <section 
      id="todays-plan-overview-card" 
      className="relative overflow-hidden bg-[#161616] border border-[#282828] hover:border-[#383838] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all"
    >
      {/* Dynamic Background Neon & Orange Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col space-y-5 sm:space-y-6">
        {/* Card Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-[#00FF66]">
              Today's Protocol Overview
            </h2>
            <span className="text-[10px] bg-[#222222] border border-[#333333] px-2.5 py-0.5 rounded-md text-slate-300 font-mono font-bold">
              Day {workoutPlan.dayId} of 7
            </span>
          </div>

          <div className="text-xs font-medium text-slate-400 flex items-center gap-2">
            <span>Goal:</span>
            <span className="text-[#00FF66] font-bold bg-[#14281a] px-2.5 py-0.5 rounded-full border border-[#00FF66]/30 uppercase text-[11px]">
              {GOAL_LABELS[profile.goal]}
            </span>
          </div>
        </div>

        {/* Physical Profile & Weight Metric Strip (Always Visible & Highly Interactive on Mobile) */}
        <div 
          id="dashboard-physical-profile-strip"
          className="p-3.5 sm:p-4 bg-[#141414] border border-[#2b2b2b] hover:border-[#00FF66]/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-[#14281a] border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-white font-heading">
                  Physical Profile:
                </span>
                <span className="text-xs font-mono font-bold text-[#00FF66] bg-[#12281a] border border-[#00FF66]/30 px-2 py-0.5 rounded-md">
                  Weight: {profile.weight} {profile.weightUnit}
                </span>
                <span className="text-xs font-mono text-slate-300 bg-[#222222] border border-[#333333] px-2 py-0.5 rounded-md">
                  Height: {profile.heightUnit === 'ft' ? `${profile.heightFeet}'${profile.heightInches}"` : `${profile.heightCm}cm`}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-[#222222] border border-[#333333] px-2 py-0.5 rounded-md">
                  Age: {profile.age}y • {profile.gender}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                Calibrated to Mifflin-St Jeor TDEE & 2.0g/kg protein targets.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            {onOpenBmi && (
              <button
                type="button"
                id="overview-check-bmi-btn"
                onClick={onOpenBmi}
                className="flex-1 sm:flex-initial px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#282828] border border-[#333333] hover:border-[#00FF66]/40 text-slate-300 hover:text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Scale className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>Check BMI</span>
              </button>
            )}
            {onOpenMetrics && (
              <button
                type="button"
                id="overview-edit-profile-btn"
                onClick={onOpenMetrics}
                className="flex-1 sm:flex-initial px-3.5 py-1.5 bg-[#00FF66] hover:bg-[#00e65c] text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_12px_rgba(0,255,102,0.3)] cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Edit Profile & Weight</span>
              </button>
            )}
          </div>
        </div>

        {/* Dual High-Impact Highlights: Active Workout Focus (Neon Green) + Calorie Target (Electric Orange) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* 1. Today's Workout Focus Card (Neon Green Stats & PRs) */}
          <div 
            onClick={onNavigateToWorkout}
            className="group p-5 bg-[#1a1a1a] hover:bg-[#202020] border border-[#2b2b2b] hover:border-[#00FF66] rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#14291c] border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] group-hover:shadow-[0_0_12px_rgba(0,255,102,0.4)] transition-shadow">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Active Workout Focus
                </span>
              </div>
              <span className="text-[10px] font-mono bg-[#242424] group-hover:bg-[#00FF66] group-hover:text-black text-slate-300 border border-[#333333] group-hover:border-[#00FF66] px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1">
                View Split <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white group-hover:text-[#00FF66] transition-colors font-heading">
                {workoutPlan.focus}
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {workoutPlan.styleDescription}
              </p>
            </div>

            {/* Session Specs Chips with Neon Green PR & Stat Accents */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#262626] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#222222] px-2.5 py-1 rounded-lg border border-[#333333]">
                <Clock className="w-3.5 h-3.5 text-[#00FF66]" />
                <span className="text-[#00FF66]">{workoutPlan.durationMinutes}m</span> duration
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#222222] px-2.5 py-1 rounded-lg border border-[#333333]">
                <Layers className="w-3.5 h-3.5 text-[#00FF66]" />
                <span className="text-[#00FF66]">{workoutPlan.totalSets}</span> sets
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#222222] px-2.5 py-1 rounded-lg border border-[#333333]">
                <Flame className="w-3.5 h-3.5 text-[#00FF66]" />
                ~<span className="text-[#00FF66]">{workoutPlan.burnEstimateKcal}</span> kcal
              </span>
            </div>
          </div>

          {/* 2. Your Calorie Burn & Target Card (Electric Orange Milestones) */}
          <div 
            onClick={onNavigateToDiet}
            className="group p-5 bg-[#1a1a1a] hover:bg-[#202020] border border-[#2b2b2b] hover:border-[#FF5500] rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2e180e] border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500] group-hover:shadow-[0_0_12px_rgba(255,85,0,0.4)] transition-shadow">
                  <Apple className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Calorie Burn & Diet Target
                </span>
              </div>
              <span className="text-[10px] font-mono bg-[#242424] group-hover:bg-[#FF5500] group-hover:text-white text-slate-300 border border-[#333333] group-hover:border-[#FF5500] px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1">
                Diet Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#FF5500] tracking-tight font-metric">
                  {macros.targetCalories.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase text-slate-400 font-mono">kcal / day</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Mifflin-St Jeor TDEE target adjusted for your <span className="text-[#FF5500] font-bold">{GOAL_LABELS[profile.goal]}</span> protocol.
              </p>
            </div>

            {/* Target Macro Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#262626] text-center font-mono">
              <div className="p-1.5 bg-[#222222] rounded-lg border border-[#333333]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Protein</div>
                <div className="text-xs font-black text-[#00FF66]">{macros.proteinGrams}g</div>
              </div>
              <div className="p-1.5 bg-[#222222] rounded-lg border border-[#333333]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Carbs</div>
                <div className="text-xs font-black text-slate-100">{macros.carbGrams}g</div>
              </div>
              <div className="p-1.5 bg-[#222222] rounded-lg border border-[#333333]">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Fats</div>
                <div className="text-xs font-black text-[#FF5500]">{macros.fatGrams}g</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Ring Bar with Smooth Gradient Fill (Neon Green to Electric Orange) */}
        <div className="p-4 bg-[#191919] border border-[#292929] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            {/* SVG Progress Ring */}
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-[#2a2a2a]"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * completionRatio) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF66" />
                    <stop offset="100%" stopColor="#FF5500" />
                  </linearGradient>
                </defs>
              </svg>
              <Zap className="w-4 h-4 text-[#00FF66] absolute inset-auto" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white font-heading flex items-center gap-1.5">
                <span>Daily Intensity Metric</span>
                <span className="text-[10px] font-mono text-[#00FF66] bg-[#122b18] px-2 py-0.5 rounded-full border border-[#00FF66]/30">
                  {completionRatio}% Optimal Load
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Dynamic load engineered for ~{workoutPlan.burnEstimateKcal} kcal burn with structured compound sets.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToWorkout}
            className="w-full sm:w-auto px-4 py-2 bg-[#00FF66] hover:bg-[#00e65c] text-black font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,102,0.35)] cursor-pointer active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Start Session</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Link to Evidence-Based Fitness Guide & AI Voice Coach */}
        {onNavigateToGuide && (
          <div
            onClick={onNavigateToGuide}
            className="p-3.5 bg-[#1e1e1e] hover:bg-[#252525] border border-[#2e2e2e] hover:border-[#00FF66]/50 text-white rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00FF66] text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_10px_rgba(0,255,102,0.4)]">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <span>Explore Evidence-Based Fitness Guide & Live Coach</span>
                  <span className="hidden sm:inline-block text-[10px] font-mono bg-[#14291c] text-[#00FF66] border border-[#00FF66]/30 px-2 py-0.5 rounded-full">
                    Hinglish + English
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Form breakdowns, sports nutrition evidence, and hands-free voice coaching.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#00FF66] group-hover:translate-x-1 transition-transform shrink-0">
              <span className="hidden sm:inline">Open Guide</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
