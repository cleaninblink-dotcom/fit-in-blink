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
  onOpenMetrics,
  onOpenBmi,
}) => {
  // Calculate completion percentage or readiness score
  const completionRatio = Math.min(100, Math.round((workoutPlan.durationMinutes / 60) * 100));

  return (
    <section 
      id="todays-plan-overview-card" 
      className="relative overflow-hidden bg-[#252B37] border border-[#31353E] hover:border-[#3B82F6]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all"
    >
      {/* Fitonomy Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col space-y-5 sm:space-y-6">
        {/* Card Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#31353E] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-[0_0_10px_#2563EB]" />
            <h2 className="text-xs font-mono font-black uppercase tracking-widest text-[#60A5FA]">
              Today's Protocol Overview
            </h2>
            <span className="text-[10px] bg-[#191D26] border border-[#31353E] px-2.5 py-0.5 rounded-md text-slate-300 font-mono font-bold">
              Day {workoutPlan.dayId} of 7
            </span>
          </div>

          <div className="text-xs font-medium text-[#94A3B8] flex items-center gap-2">
            <span>Goal:</span>
            <span className="text-[#60A5FA] font-bold bg-[#1E293B] px-2.5 py-0.5 rounded-full border border-[#2563EB]/30 uppercase text-[11px]">
              {GOAL_LABELS[profile.goal]}
            </span>
          </div>
        </div>

        {/* Physical Profile & Weight Metric Strip */}
        <div 
          id="dashboard-physical-profile-strip"
          className="p-3.5 sm:p-4 bg-[#191D26] border border-[#31353E] hover:border-[#3B82F6]/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-[#1E293B] border border-[#2563EB]/30 flex items-center justify-center text-[#60A5FA] shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-white font-heading">
                  Physical Profile:
                </span>
                <span className="text-xs font-mono font-bold text-[#60A5FA] bg-[#1E293B] border border-[#2563EB]/30 px-2 py-0.5 rounded-md">
                  Weight: {profile.weight} {profile.weightUnit}
                </span>
                <span className="text-xs font-mono text-slate-300 bg-[#252B37] border border-[#31353E] px-2 py-0.5 rounded-md">
                  Height: {profile.heightUnit === 'ft' ? `${profile.heightFeet}'${profile.heightInches}"` : `${profile.heightCm}cm`}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-[#252B37] border border-[#31353E] px-2 py-0.5 rounded-md">
                  Age: {profile.age}y • {profile.gender}
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-1">
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
                className="flex-1 sm:flex-initial px-3 py-1.5 bg-[#252B37] hover:bg-[#2C3342] border border-[#31353E] hover:border-[#3B82F6]/40 text-slate-300 hover:text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Scale className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Check BMI</span>
              </button>
            )}
            {onOpenMetrics && (
              <button
                type="button"
                id="overview-edit-profile-btn"
                onClick={onOpenMetrics}
                className="flex-1 sm:flex-initial px-3.5 py-1.5 fitonomy-gradient-btn text-white font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-[0_2px_10px_rgba(37,99,235,0.4)]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Edit Profile & Weight</span>
              </button>
            )}
          </div>
        </div>

        {/* Dual Highlights: Active Workout Focus (Fitonomy Blue) + Calorie Target */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* 1. Today's Workout Focus Card */}
          <div 
            onClick={onNavigateToWorkout}
            className="group p-5 bg-[#191D26] hover:bg-[#202530] border border-[#31353E] hover:border-[#2563EB] rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#1E293B] border border-[#2563EB]/30 flex items-center justify-center text-[#60A5FA] group-hover:shadow-[0_0_12px_rgba(37,99,235,0.4)] transition-shadow">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                  Active Workout Focus
                </span>
              </div>
              <span className="text-[10px] font-mono bg-[#252B37] group-hover:bg-[#2563EB] group-hover:text-white text-slate-300 border border-[#31353E] group-hover:border-[#2563EB] px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1">
                View Split <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white group-hover:text-[#60A5FA] transition-colors font-heading">
                {workoutPlan.focus}
              </div>
              <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2">
                {workoutPlan.styleDescription}
              </p>
            </div>

            {/* Session Specs Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#31353E] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#252B37] px-2.5 py-1 rounded-lg border border-[#31353E]">
                <Clock className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span className="text-[#60A5FA]">{workoutPlan.durationMinutes}m</span> duration
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#252B37] px-2.5 py-1 rounded-lg border border-[#31353E]">
                <Layers className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span className="text-[#60A5FA]">{workoutPlan.totalSets}</span> sets
              </span>
              <span className="flex items-center gap-1.5 text-white font-bold bg-[#252B37] px-2.5 py-1 rounded-lg border border-[#31353E]">
                <Flame className="w-3.5 h-3.5 text-[#60A5FA]" />
                ~<span className="text-[#60A5FA]">{workoutPlan.burnEstimateKcal}</span> kcal
              </span>
            </div>
          </div>

          {/* 2. Your Calorie Burn & Target Card */}
          <div 
            onClick={onNavigateToDiet}
            className="group p-5 bg-[#191D26] hover:bg-[#202530] border border-[#31353E] hover:border-[#F97316] rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2A201A] border border-[#F97316]/40 flex items-center justify-center text-[#F97316] group-hover:shadow-[0_0_12px_rgba(249,115,22,0.4)] transition-shadow">
                  <Apple className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                  Calorie Burn & Diet Target
                </span>
              </div>
              <span className="text-[10px] font-mono bg-[#252B37] group-hover:bg-[#F97316] group-hover:text-white text-slate-300 border border-[#31353E] group-hover:border-[#F97316] px-2.5 py-1 rounded-md font-bold transition-colors flex items-center gap-1">
                Diet Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#F97316] tracking-tight font-metric">
                  {macros.targetCalories.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase text-[#94A3B8] font-mono">kcal / day</span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Mifflin-St Jeor TDEE target adjusted for your <span className="text-[#F97316] font-bold">{GOAL_LABELS[profile.goal]}</span> protocol.
              </p>
            </div>

            {/* Target Macro Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#31353E] text-center font-mono">
              <div className="p-1.5 bg-[#252B37] rounded-lg border border-[#31353E]">
                <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Protein</div>
                <div className="text-xs font-black text-[#60A5FA]">{macros.proteinGrams}g</div>
              </div>
              <div className="p-1.5 bg-[#252B37] rounded-lg border border-[#31353E]">
                <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Carbs</div>
                <div className="text-xs font-black text-slate-100">{macros.carbGrams}g</div>
              </div>
              <div className="p-1.5 bg-[#252B37] rounded-lg border border-[#31353E]">
                <div className="text-[10px] text-[#94A3B8] uppercase font-semibold">Fats</div>
                <div className="text-xs font-black text-[#F97316]">{macros.fatGrams}g</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Ring Bar */}
        <div className="p-4 bg-[#191D26] border border-[#31353E] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            {/* SVG Progress Ring */}
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-[#31353E]"
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
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>
              <Zap className="w-4 h-4 text-[#60A5FA] absolute inset-auto" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white font-heading flex items-center gap-1.5">
                <span>Daily Intensity Metric</span>
                <span className="text-[10px] font-mono text-[#60A5FA] bg-[#1E293B] px-2 py-0.5 rounded-full border border-[#2563EB]/30">
                  {completionRatio}% Optimal Load
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">
                Dynamic load engineered for ~{workoutPlan.burnEstimateKcal} kcal burn with structured compound sets.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToWorkout}
            className="w-full sm:w-auto px-4 py-2 fitonomy-gradient-btn font-bold uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.35)] cursor-pointer active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Start Session</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
