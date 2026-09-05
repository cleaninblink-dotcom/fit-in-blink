import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, Flame, Layers, Clock, Droplets, Share2, X } from 'lucide-react';
import { DailyWorkoutPlan } from '../types';

interface WorkoutCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutPlan: DailyWorkoutPlan;
  completedSetsCount: number;
  durationMinutes: number;
}

export const WorkoutCompleteModal: React.FC<WorkoutCompleteModalProps> = ({
  isOpen,
  onClose,
  workoutPlan,
  completedSetsCount,
  durationMinutes,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        // Fire athletic victory confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#06b6d4', '#f59e0b', '#ffffff'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#10b981', '#3b82f6'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#f59e0b'],
          });
        }, 250);
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div 
        id="workout-complete-modal-card"
        className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-950/20 overflow-hidden text-center p-6 sm:p-8 space-y-6 relative"
      >
        <button
          id="close-complete-modal-x"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-lime-100 border border-lime-300 p-1 shadow-md shadow-lime-500/10 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center border border-lime-200">
            <Trophy className="w-8 h-8 text-lime-700" />
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 italic">
            Workout Crushed!
          </h2>
          <p className="text-xs text-lime-800 font-bold uppercase tracking-wider">
            {workoutPlan.bannerHeadline}
          </p>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Excellent execution. You adapted and completed your {durationMinutes}-minute routine.
          </p>
        </div>

        {/* Summary Metric Stats */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center font-mono">
          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3 text-lime-700" />
              <span>Time</span>
            </div>
            <div className="text-base font-bold text-slate-900">
              {durationMinutes}m
            </div>
          </div>

          <div className="space-y-0.5 border-x border-slate-200">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <Layers className="w-3 h-3 text-cyan-600" />
              <span>Sets Done</span>
            </div>
            <div className="text-base font-bold text-lime-800">
              {completedSetsCount} / {workoutPlan.totalSets}
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <Flame className="w-3 h-3 text-amber-600" />
              <span>Est. Burn</span>
            </div>
            <div className="text-base font-bold text-amber-700">
              ~{workoutPlan.burnEstimateKcal} kcal
            </div>
          </div>
        </div>

        {/* Post Workout Advice */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-left flex items-start gap-2.5">
          <Droplets className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-900 uppercase tracking-wider">Post-Workout Window: </span>
            Drink 500ml water and consume 25-35g protein within 45 minutes to kickstart muscle recovery.
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="close-complete-modal-btn"
            onClick={onClose}
            className="w-full py-3 bg-lime-400 hover:bg-lime-500 text-slate-950 font-black uppercase tracking-wider rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Continue to Diet & Targets</span>
          </button>
        </div>
      </div>
    </div>
  );
};
