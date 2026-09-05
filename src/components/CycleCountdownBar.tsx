import React, { useState } from 'react';
import { 
  RotateCcw, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  Zap, 
  CheckCircle2,
  RefreshCw,
  Repeat
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { SEVEN_DAY_ROTATION } from '../utils/workouts';

interface CycleCountdownBarProps {
  selectedDayId: number;
  onSelectDay: (dayId: number) => void;
}

export const CycleCountdownBar: React.FC<CycleCountdownBarProps> = ({
  selectedDayId,
  onSelectDay,
}) => {
  const { cycleStatus, resetCycle, jumpToCycleDay } = useFitness();
  const [showInfo, setShowInfo] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const activeDay = cycleStatus.activeDayRotation;
  const nextDayId = (cycleStatus.activeDayId % 7) + 1;
  const nextDay = SEVEN_DAY_ROTATION.find((r) => r.id === nextDayId) || SEVEN_DAY_ROTATION[0];

  const formatPad = (num: number) => num.toString().padStart(2, '0');
  const formattedCountdown = `${formatPad(cycleStatus.hoursRemaining)}h ${formatPad(cycleStatus.minutesRemaining)}m ${formatPad(cycleStatus.secondsRemaining)}s`;

  const isViewingActiveDay = selectedDayId === cycleStatus.activeDayId;

  const handleReset = () => {
    resetCycle();
    onSelectDay(1);
    setShowResetConfirm(false);
  };

  return (
    <div 
      id="cycle-countdown-container"
      className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3.5 sm:p-4 transition-all shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Cycle Badge & Current Active Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-lime-50 border border-lime-200 flex items-center justify-center text-lime-700 shrink-0">
              <Repeat className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white font-extrabold text-[9px] flex items-center justify-center font-mono shadow-sm">
              {cycleStatus.activeDayId}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>Active 24h Cycle:</span>
                <span className="text-lime-700">{activeDay.dayName}</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                Loop #{cycleStatus.cycleNumber}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-lime-600" />
                <span>Next Day ({nextDay.dayName.replace(/^Day \d+:\s*/, '')}) in:</span>
              </span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 text-[11px] tracking-wider">
                {formattedCountdown}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions & Jump Button */}
        <div className="flex items-center gap-2 self-end md:self-center flex-wrap">
          {!isViewingActiveDay && (
            <button
              id="jump-to-active-day-btn"
              onClick={() => onSelectDay(cycleStatus.activeDayId)}
              className="px-3 py-1.5 bg-lime-400 hover:bg-lime-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Jump to Day {cycleStatus.activeDayId} (Active)</span>
            </button>
          )}

          {/* Reset to Day 1 Button */}
          {showResetConfirm ? (
            <div className="flex items-center gap-1.5 bg-rose-50 p-1 rounded-xl border border-rose-200">
              <span className="text-[10px] font-bold text-rose-800 px-2">Reset to Day 1?</span>
              <button
                id="confirm-reset-cycle-btn"
                onClick={handleReset}
                className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase rounded-lg transition cursor-pointer"
              >
                Yes
              </button>
              <button
                id="cancel-reset-cycle-btn"
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-1 bg-slate-200 text-slate-700 font-bold text-[10px] uppercase rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              id="open-reset-cycle-btn"
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              title="Reset continuous cycle starting from Day 1: Chest Day"
            >
              <RotateCcw className="w-3.5 h-3.5 text-lime-600" />
              <span className="text-[11px]">Restart at Day 1</span>
            </button>
          )}

          {/* Info toggle */}
          <button
            id="toggle-cycle-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            title="How does the 24-hour cycle work?"
            aria-label="Cycle info"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar for 24-hour cycle */}
      <div className="mt-3 pt-2.5 border-t border-slate-100">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
          <span>Day {cycleStatus.activeDayId} Progress ({Math.round(cycleStatus.progressPercent)}%)</span>
          <span>Automatic shift in {cycleStatus.hoursRemaining}h {cycleStatus.minutesRemaining}m</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-lime-500 to-lime-400 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${cycleStatus.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Info Explanation Sheet if toggled */}
      {showInfo && (
        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1.5 animate-in fade-in duration-200">
          <div className="font-bold text-lime-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            <span>Endless 24-Hour Adaptive Split Cycle</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Your workout cycle begins strictly on <strong>Day 1 (Chest Day)</strong>. Every 24 hours, the protocol automatically shifts to the next sequential muscle group (Chest ➔ Back & Shoulders ➔ Arms ➔ Legs ➔ Core ➔ Recovery ➔ Rest ➔ repeats endlessly). You can preview any day in advance or restart from Day 1 anytime.
          </p>
        </div>
      )}
    </div>
  );
};
