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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-lime-800">
            Endless 7-Day Split Cycle
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-slate-600 font-bold uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-lime-600" />
            24-Hour Continuous Shift
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
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
                  ? 'border-slate-900 bg-white shadow-md ring-2 ring-slate-900/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 shadow-sm'
              }`}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between w-full">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isSelected ? 'text-lime-700' : 'text-slate-400'}`}>
                  Day 0{rot.id}
                </span>

                {isActiveCycle && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-lime-400 text-slate-950 flex items-center gap-0.5 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 fill-black" />
                    Active
                  </span>
                )}

                {isCompleted && !isActiveCycle && (
                  <span className="w-4 h-4 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="my-1">
                <div className="flex items-center gap-1.5">
                  {rot.isRestDay ? (
                    <Moon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <Dumbbell className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-lime-600' : 'text-slate-400'}`} />
                  )}
                  <span className={`text-xs font-black uppercase italic tracking-tight line-clamp-1 ${isSelected ? 'text-slate-950' : 'text-slate-700'}`}>
                    {rot.dayName.replace(/^Day \d+:\s*/, '')}
                  </span>
                </div>
              </div>

              {/* Muscle focus preview pill */}
              <div className="text-[10px] font-semibold text-slate-500 truncate uppercase tracking-wider">
                {rot.isRestDay ? 'Recovery' : rot.majorMuscles[0]}
              </div>

              {/* Active Bottom Glow indicator */}
              {isSelected && (
                <div className="absolute bottom-0 left-3 right-3 h-1 bg-lime-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
