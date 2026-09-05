import React from 'react';
import { 
  Flame, 
  Layers, 
  Clock, 
  Sparkles, 
  Dumbbell, 
  Play, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders
} from 'lucide-react';
import { DayRotation, DailyWorkoutPlan } from '../types';

interface DailyBannerProps {
  currentDayRotation: DayRotation;
  workoutPlan: DailyWorkoutPlan;
  durationMinutes: number;
  onDurationChange: (mins: number) => void;
  isToday: boolean;
  onStartWorkout: () => void;
  isWorkoutActive: boolean;
  completedSetsCount: number;
}

export const DailyBanner: React.FC<DailyBannerProps> = ({
  currentDayRotation,
  workoutPlan,
  durationMinutes,
  onDurationChange,
  isToday,
  onStartWorkout,
  isWorkoutActive,
  completedSetsCount,
}) => {
  const isComplete = workoutPlan.totalSets > 0 && completedSetsCount >= workoutPlan.totalSets;
  const watermarkText = currentDayRotation.majorMuscles[0] 
    ? currentDayRotation.majorMuscles[0].split(' ')[0].toUpperCase() 
    : 'FITNESS';

  return (
    <section 
      id="daily-dashboard-banner"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#bef264] via-[#a3e635] to-[#84cc16] p-6 sm:p-8 text-black shadow-2xl shadow-[#bef264]/10 border border-[#bef264]/40"
    >
      {/* Background Watermark matching Bento Grid Design */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 text-black opacity-10 font-black text-6xl sm:text-8xl md:text-9xl italic uppercase select-none pointer-events-none tracking-tighter">
        {watermarkText}
      </div>

      <div className="relative z-10 flex flex-col justify-between space-y-6">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Cycle / Today Indicator Badge */}
            <div className="bg-black/15 backdrop-blur-md px-3 py-1 rounded-full text-black text-[10px] font-black uppercase tracking-[0.2em] border border-black/10 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 fill-black" />
              <span>{isToday ? "Today's Active Rotation" : `Day ${currentDayRotation.id} Cycle Preview`}</span>
            </div>

            {/* Split Tag */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/10 text-black border border-black/10">
              <Dumbbell className="w-3 h-3 text-black" />
              {currentDayRotation.dayName}
            </span>

            {/* Non-consecutive safe split */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/10 text-black/80 border border-black/10">
              <ShieldCheck className="w-3 h-3 text-black" />
              Zero Overlap Cycle
            </span>
          </div>

          {/* Intensity Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#bef264] text-xs font-black uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#bef264] animate-pulse" />
            <span>{workoutPlan.intensityLabel}</span>
          </div>
        </div>

        {/* Primary Banner Headline: Bento Typography "TODAY IS ..." */}
        <div className="space-y-1.5">
          <h1 
            id="today-headline"
            className="text-black text-3xl sm:text-5xl lg:text-6xl font-black italic uppercase leading-none tracking-tight"
          >
            {currentDayRotation.bannerHeadline}
          </h1>
          <p className="text-black font-semibold opacity-90 uppercase tracking-wider text-xs sm:text-sm max-w-2xl">
            Targeting {currentDayRotation.tagline}
          </p>
        </div>

        {/* Target Muscles Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/70">
            Muscles:
          </span>
          {currentDayRotation.majorMuscles.map((muscle) => (
            <span
              key={muscle}
              className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-black/15 text-black border border-black/15"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-black/10 rounded-2xl border border-black/10 backdrop-blur-sm">
          {/* Duration Metric */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-black/70 text-[10px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3 text-black" />
              <span>Target Duration</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-black font-mono leading-tight">
              {durationMinutes} <span className="text-xs font-bold uppercase">min</span>
            </div>
            <p className="text-[10px] text-black/70 font-bold uppercase tracking-tight">
              {durationMinutes <= 35 ? 'Superset density' : durationMinutes >= 90 ? 'Deep-split volume' : 'Hypertrophy tempo'}
            </p>
          </div>

          {/* Volume / Total Sets */}
          <div className="space-y-0.5 border-l border-black/10 pl-2.5">
            <div className="flex items-center gap-1 text-black/70 text-[10px] font-bold uppercase tracking-wider">
              <Layers className="w-3 h-3 text-black" />
              <span>Total Volume</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-black font-mono leading-tight">
              {workoutPlan.totalSets} <span className="text-xs font-bold uppercase">sets</span>
            </div>
            <p className="text-[10px] text-black/70 font-bold uppercase tracking-tight">
              {workoutPlan.exercises.length} movements
            </p>
          </div>

          {/* Estimated Caloric Burn */}
          <div className="space-y-0.5 border-l border-black/10 pl-2.5">
            <div className="flex items-center gap-1 text-black/70 text-[10px] font-bold uppercase tracking-wider">
              <Flame className="w-3 h-3 text-black" />
              <span>Est. Burn</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-black font-mono leading-tight">
              ~{workoutPlan.burnEstimateKcal} <span className="text-xs font-bold uppercase">kcal</span>
            </div>
            <p className="text-[10px] text-black/70 font-bold uppercase tracking-tight">
              EPOC Metabolic
            </p>
          </div>

          {/* Progress Tracker / Status */}
          <div className="space-y-0.5 border-l border-black/10 pl-2.5">
            <div className="flex items-center gap-1 text-black/70 text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-black" />
              <span>Status</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-black font-mono leading-tight">
              {isComplete ? (
                <span>Done!</span>
              ) : completedSetsCount > 0 ? (
                <span>{completedSetsCount}/{workoutPlan.totalSets}</span>
              ) : (
                <span>Ready</span>
              )}
            </div>
            <p className="text-[10px] text-black/70 font-bold uppercase tracking-tight">
              {isComplete ? 'Targets hit' : 'Live logging'}
            </p>
          </div>
        </div>

        {/* Dynamic Duration Adjuster & Action in Banner */}
        <div className="p-3 bg-black/15 rounded-2xl border border-black/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4 h-4 text-black shrink-0" />
            <div>
              <div className="text-xs font-black uppercase text-black flex items-center gap-2">
                <span>Adaptive Volume:</span>
                <span className="bg-black text-[#bef264] px-2 py-0.5 rounded-full text-[10px] font-black">
                  {durationMinutes} MIN
                </span>
              </div>
              <p className="text-[11px] text-black/80 font-medium">
                {workoutPlan.styleDescription}
              </p>
            </div>
          </div>

          {/* Action Button: Workout Mode */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              id="start-workout-action-btn"
              onClick={onStartWorkout}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                isWorkoutActive
                  ? 'bg-black text-white hover:bg-black/90'
                  : 'bg-black text-[#bef264] hover:bg-black/90 hover:scale-[1.02]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isWorkoutActive ? 'Workout Active' : 'Start Workout'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

