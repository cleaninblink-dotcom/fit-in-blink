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
      className="bg-[#252B37] border border-[#31353E] hover:border-[#3B82F6]/50 rounded-2xl p-3.5 sm:p-4 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-slate-100"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Cycle Badge & Current Active Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#2563EB]/30 flex items-center justify-center text-[#60A5FA] shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.25)]">
              <Repeat className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#191D26] text-[#60A5FA] border border-[#2563EB]/50 font-extrabold text-[9px] flex items-center justify-center font-mono shadow-sm">
              {cycleStatus.activeDayId}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-tight text-white flex items-center gap-1.5 font-heading">
                <span className="text-[#94A3B8]">Active 24h Cycle:</span>
                <span className="text-[#60A5FA]">{activeDay.dayName}</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-[#60A5FA] bg-[#1E293B] border border-[#2563EB]/30 px-2 py-0.5 rounded-full">
                Loop #{cycleStatus.cycleNumber}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#60A5FA]" />
                <span>Next Day ({nextDay.dayName.replace(/^Day \d+:\s*/, '')}) in:</span>
              </span>
              <span className="font-mono font-bold text-[#60A5FA] bg-[#191D26] px-2 py-0.5 rounded border border-[#31353E] text-[11px] tracking-wider font-metric">
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
              className="px-3 py-1.5 fitonomy-gradient-btn text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1 cursor-pointer shadow-[0_0_12px_rgba(37,99,235,0.4)] active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Jump to Day {cycleStatus.activeDayId} (Active)</span>
            </button>
          )}

          {/* Reset to Day 1 Button */}
          {showResetConfirm ? (
            <div className="flex items-center gap-1.5 bg-[#2b1616] p-1 rounded-xl border border-rose-600/40">
              <span className="text-[10px] font-bold text-rose-300 px-2">Reset to Day 1?</span>
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
                className="px-2 py-1 bg-[#191D26] text-slate-300 font-bold text-[10px] uppercase rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              id="open-reset-cycle-btn"
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1.5 bg-[#191D26] hover:bg-[#202530] border border-[#31353E] text-[#94A3B8] hover:text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              title="Reset continuous cycle starting from Day 1: Chest Day"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span className="text-[11px]">Restart at Day 1</span>
            </button>
          )}

          {/* Info toggle */}
          <button
            id="toggle-cycle-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#202530] rounded-xl transition cursor-pointer"
            title="How does the 24-hour cycle work?"
            aria-label="Cycle info"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar for 24-hour cycle */}
      <div className="mt-3 pt-2.5 border-t border-[#31353E]">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] mb-1">
          <span>Day {cycleStatus.activeDayId} Progress ({Math.round(cycleStatus.progressPercent)}%)</span>
          <span>Automatic shift in {cycleStatus.hoursRemaining}h {cycleStatus.minutesRemaining}m</span>
        </div>
        <div className="w-full h-1.5 bg-[#191D26] rounded-full overflow-hidden border border-[#31353E]">
          <div 
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] shadow-[0_0_8px_#2563EB] transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${cycleStatus.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Info Explanation Sheet if toggled */}
      {showInfo && (
        <div className="mt-3 p-3 bg-[#191D26] border border-[#31353E] rounded-xl text-xs text-slate-300 space-y-1.5 animate-in fade-in duration-200">
          <div className="font-bold text-[#60A5FA] flex items-center gap-1.5 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>Endless 24-Hour Adaptive Split Cycle</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            Your workout cycle begins strictly on <strong>Day 1 (Chest Day)</strong>. Every 24 hours, the protocol automatically shifts to the next sequential muscle group (Chest ➔ Back & Shoulders ➔ Arms ➔ Legs ➔ Core ➔ Recovery ➔ Rest ➔ repeats endlessly). You can preview any day in advance or restart from Day 1 anytime.
          </p>
        </div>
      )}
    </div>
  );
};
