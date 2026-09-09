import React from 'react';
import { Check, ShieldCheck, Moon, Dumbbell, Sparkles } from 'lucide-react';
import { DayRotation } from '../types';

interface DaySelectorProps {
  rotations: DayRotation[];
  selectedDayId: number;
  onSelectDay: (id: number) => void;
  activeCycleDayId: number;
  completedDayIds: number[];
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  rotations,
  selectedDayId,
  onSelectDay,
  activeCycleDayId,
  completedDayIds,
}) => {
  return (
    <div className="space-y-3 text-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#60A5FA] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_6px_#2563EB]" />
            Endless 7-Day Split Cycle
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-slate-300 font-bold uppercase tracking-wider bg-[#252B37] px-2.5 py-1 rounded-full border border-[#31353E] shadow-sm">
            <ShieldCheck className="w-3 h-3 text-[#60A5FA]" />
            24-Hour Continuous Shift
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase text-[#94A3B8] tracking-wider font-mono">
          Day {selectedDayId} of 7 {selectedDayId === activeCycleDayId ? '(Current Active)' : '(Preview)'}
        </span>
      </div>

      {/* 7-Day Bento Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {rotations.map((rot) => {
          const isSelected = selectedDayId === rot.id;
          const isActiveCycle = activeCycleDayId === rot.id;
          const isCompleted = completedDayIds.includes(rot.id);

          return (
            <button
              key={rot.id}
              id={`day-tab-${rot.id}`}
              onClick={() => onSelectDay(rot.id)}
              className={`relative p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[105px] group cursor-pointer ${
                isSelected
                  ? 'border-[#2563EB] bg-[#1E293B] shadow-[0_0_15px_rgba(37,99,235,0.25)] ring-1 ring-[#2563EB]'
                  : 'border-[#31353E] bg-[#252B37] hover:border-[#3B82F6]/50 hover:bg-[#2C3342]'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between w-full">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-[#60A5FA]' : 'text-[#94A3B8]'}`}>
                  Day 0{rot.id}
                </span>

                {isActiveCycle && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#2563EB] text-white flex items-center gap-0.5 shadow-[0_0_8px_rgba(37,99,235,0.4)]">
                    <Sparkles className="w-2.5 h-2.5 fill-white" />
                    Active
                  </span>
                )}

                {isCompleted && !isActiveCycle && (
                  <span className="w-4 h-4 rounded-full bg-[#1E293B] text-[#60A5FA] border border-[#2563EB]/40 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="my-1">
                <div className="flex items-center gap-1.5">
                  {rot.isRestDay ? (
                    <Moon className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                  ) : (
                    <Dumbbell className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#60A5FA]' : 'text-[#94A3B8]'}`} />
                  )}
                  <span className={`text-xs font-black uppercase italic tracking-tight line-clamp-1 font-heading ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {rot.dayName.replace(/^Day \d+:\s*/, '')}
                  </span>
                </div>
              </div>

              {/* Muscle focus preview pill */}
              <div className="text-[10px] font-semibold text-[#94A3B8] truncate uppercase tracking-wider font-mono">
                {rot.isRestDay ? 'Recovery' : rot.majorMuscles[0]}
              </div>

              {/* Active Bottom Glow indicator */}
              {isSelected && (
                <div className="absolute bottom-0 left-3 right-3 h-1 bg-[#2563EB] rounded-t-full shadow-[0_0_8px_#2563EB]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
