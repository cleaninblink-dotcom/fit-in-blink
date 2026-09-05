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
  Apple
} from 'lucide-react';
import { DailyWorkoutPlan, MacroTargets, UserProfile, Goal } from '../types';

interface TodaysPlanOverviewProps {
  workoutPlan: DailyWorkoutPlan;
  macros: MacroTargets;
  profile: UserProfile;
  onNavigateToWorkout: () => void;
  onNavigateToDiet: () => void;
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
}) => {
  return (
    <section 
      id="todays-plan-overview-card" 
      className="relative overflow-hidden bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 sm:p-7 shadow-sm transition-all"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-lime-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col space-y-6">
        {/* Card Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-500 shadow-sm" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-lime-800">
              Today's Plan Overview
            </h2>
            <span className="text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded text-slate-700 font-mono font-bold">
              Day {workoutPlan.dayId} of 7
            </span>
          </div>

          <div className="text-xs font-medium text-slate-600 flex items-center gap-2">
            <span>Goal:</span>
            <span className="text-lime-800 font-bold bg-lime-100 px-2.5 py-0.5 rounded-full border border-lime-200 uppercase">
              {GOAL_LABELS[profile.goal]}
            </span>
          </div>
        </div>

        {/* Dual High-Impact Highlights: Focus + Calorie Target */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Today's Workout Focus Card */}
          <div 
            onClick={onNavigateToWorkout}
            className="group p-5 bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200 hover:border-lime-400 rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-lime-100 border border-lime-200 flex items-center justify-center text-lime-700">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Today's Workout Focus
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white group-hover:bg-slate-900 group-hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-bold transition-colors flex items-center gap-1 shadow-xs">
                View Split <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-slate-950 group-hover:text-lime-800 transition-colors">
                {workoutPlan.focus}
              </div>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                {workoutPlan.styleDescription}
              </p>
            </div>

            {/* Session Specs Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 text-xs font-mono">
              <span className="flex items-center gap-1 text-slate-900 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                <Clock className="w-3 h-3 text-lime-600" />
                {workoutPlan.durationMinutes}m duration
              </span>
              <span className="flex items-center gap-1 text-slate-900 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                <Layers className="w-3 h-3 text-lime-600" />
                {workoutPlan.totalSets} sets
              </span>
              <span className="flex items-center gap-1 text-slate-900 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                <Flame className="w-3 h-3 text-lime-600" />
                ~{workoutPlan.burnEstimateKcal} kcal
              </span>
            </div>
          </div>

          {/* 2. Your Calorie Target Card (Fetched from Diet Section) */}
          <div 
            onClick={onNavigateToDiet}
            className="group p-5 bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200 hover:border-lime-400 rounded-2xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-lime-100 border border-lime-200 flex items-center justify-center text-lime-700">
                  <Apple className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Your Calorie Target
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white group-hover:bg-slate-900 group-hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-bold transition-colors flex items-center gap-1 shadow-xs">
                Diet Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-lime-700 tracking-tight">
                  {macros.targetCalories.toLocaleString()}
                </span>
                <span className="text-sm font-bold uppercase text-slate-700 font-mono">kcal / day</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Mifflin-St Jeor TDEE target adjusted for your {GOAL_LABELS[profile.goal]} protocol.
              </p>
            </div>

            {/* Target Macro Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center font-mono">
              <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Protein</div>
                <div className="text-xs font-black text-slate-900">{macros.proteinGrams}g</div>
              </div>
              <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Carbs</div>
                <div className="text-xs font-black text-slate-900">{macros.carbGrams}g</div>
              </div>
              <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Fats</div>
                <div className="text-xs font-black text-slate-900">{macros.fatGrams}g</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
