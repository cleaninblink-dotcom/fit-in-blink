import React from 'react';
import { 
  Dumbbell, 
  Timer, 
  Zap, 
  CheckCircle2, 
  Info, 
  Flame, 
  Layers,
  Sparkles,
  Play,
  Link as LinkIcon
} from 'lucide-react';
import { DailyWorkoutPlan } from '../types';
import { playSetClickSound } from '../utils/audio';
import { HumanExerciseThumbnail } from './HumanExerciseThumbnail';
import { useFitness } from '../context/FitnessContext';

interface WorkoutSectionProps {
  workoutPlan: DailyWorkoutPlan;
  completedSets: { [exerciseId: string]: boolean[] };
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onStartRestTimer: (seconds: number, exerciseName: string) => void;
  onCompleteWorkout: () => void;
  durationMinutes: number;
  onStartAutoWorkout?: (exerciseIndex?: number, setIndex?: number) => void;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({
  workoutPlan,
  completedSets,
  onToggleSet,
  onStartRestTimer,
  onCompleteWorkout,
  durationMinutes,
  onStartAutoWorkout,
}) => {
  const { preferredModelGender, setPreferredModelGender } = useFitness();
  const setsList = Object.values(completedSets) as boolean[][];
  const totalCompletedSets = setsList.reduce(
    (acc, sets) => acc + (Array.isArray(sets) ? sets.filter(Boolean).length : 0),
    0
  );

  const isAllComplete = workoutPlan.totalSets > 0 && totalCompletedSets >= workoutPlan.totalSets;

  const handleSetClick = (exerciseId: string, setIdx: number, restSeconds: number, exerciseName: string) => {
    playSetClickSound();
    const currentCompleted = completedSets[exerciseId]?.[setIdx] || false;
    onToggleSet(exerciseId, setIdx);

    // If marking as completed and not the very last set of the day, prompt or start rest timer
    if (!currentCompleted && restSeconds > 0) {
      onStartRestTimer(restSeconds, exerciseName);
    }
  };

  return (
    <section id="exercise-section" className="bg-[#161616] border border-[#282828] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      {/* Bento Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xs font-mono font-black text-[#00FF66] uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
              Active Workout Routine
            </h2>
            <span className="text-[10px] bg-[#222222] border border-[#333333] px-2.5 py-1 rounded-md text-slate-300 uppercase font-bold tracking-wider">
              Strict {durationMinutes}-Min Volume
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#12281a] text-[#00FF66] border border-[#00FF66]/30 px-2 py-0.5 rounded-md font-mono font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_6px_#00FF66]" />
              Looping Form Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Dynamic volume with automatic set pacing and 15-second recovery breaks.
          </p>
        </div>

        {/* Completion Progress, Model Selector & Action */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
          {/* Global Demonstration Model Selector */}
          <div className="flex items-center bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl p-1 text-xs font-mono">
            <span className="text-[10px] text-slate-400 uppercase px-2 hidden md:inline">Model:</span>
            <button
              type="button"
              onClick={() => setPreferredModelGender('male')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                preferredModelGender === 'male'
                  ? 'bg-[#00FF66] text-black font-black shadow-[0_0_8px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fit Man
            </button>
            <button
              type="button"
              onClick={() => setPreferredModelGender('female')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                preferredModelGender === 'female'
                  ? 'bg-[#00FF66] text-black font-black shadow-[0_0_8px_rgba(0,255,102,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fit Woman
            </button>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono font-black text-white">
              <span className="text-[#00FF66]">{totalCompletedSets}</span> / {workoutPlan.totalSets} SETS
            </div>
            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              {Math.round((totalCompletedSets / Math.max(1, workoutPlan.totalSets)) * 100)}% Complete
            </div>
          </div>

          {/* Start Auto Workout Button */}
          {onStartAutoWorkout && (
            <button
              type="button"
              id="start-auto-workout-header-btn"
              onClick={() => onStartAutoWorkout(0, 0)}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,255,102,0.4)] bg-[#00FF66] hover:bg-[#00e65c] text-black cursor-pointer active:scale-95"
              title="Start workout with auto sets and 15s breaks"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Workout</span>
            </button>
          )}

          <button
            id="finish-workout-btn"
            onClick={onCompleteWorkout}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
              isAllComplete
                ? 'bg-[#00FF66] hover:bg-[#00e65c] text-black shadow-[0_0_15px_rgba(0,255,102,0.5)]'
                : 'bg-[#222222] hover:bg-[#2c2c2c] text-slate-300 border border-[#333333]'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isAllComplete ? 'text-black' : 'text-[#00FF66]'}`} />
            <span>Finish</span>
          </button>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-3">
        {workoutPlan.exercises.map((exercise, index) => {
          const setsCompletedForEx = completedSets[exercise.id] || [];
          const isExComplete = setsCompletedForEx.filter(Boolean).length >= exercise.sets;
          const isNextSuperset = exercise.isSupersetWithNext;

          return (
            <div key={exercise.id} className="relative">
              {/* Angular Bento Exercise Card */}
              <div 
                id={`exercise-card-${exercise.id}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isExComplete 
                    ? 'border-[#00FF66]/60 bg-[#152419] shadow-[0_0_15px_rgba(0,255,102,0.15)]' 
                    : 'border-[#282828] bg-[#1a1a1a] hover:bg-[#1f1f1f] hover:border-[#3a3a3a]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Human Model Image + Title, Sets/Reps/Rest, Form Cues */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 flex-1 min-w-0">
                    {/* Photorealistic Human Athlete Model Image */}
                    <HumanExerciseThumbnail exercise={exercise} dayName={workoutPlan.dayName} />

                    {/* Exercise Details */}
                    <div className="space-y-2.5 flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-heading font-black uppercase italic text-lg leading-tight text-white tracking-tight">
                              {exercise.name}
                            </h3>
                            {isNextSuperset && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#2a1b38] text-[#c084fc] border border-[#7e22ce]/40">
                                <LinkIcon className="w-2.5 h-2.5" />
                                Superset Pair
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                            <span className="font-bold text-[#00FF66] uppercase text-[11px] tracking-wider">
                              {exercise.targetMuscle}
                            </span>
                            <span>•</span>
                            <span>{exercise.equipment}</span>
                            <span>•</span>
                            <span>Tempo: <span className="font-mono text-white font-bold">{exercise.tempo}</span></span>
                          </div>
                        </div>

                        {/* Monospace Bento Number */}
                        <span className="text-[#00FF66] font-mono text-sm font-bold bg-[#222222] border border-[#333333] px-2.5 py-0.5 rounded shrink-0">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Prescribed Metric Badges: Sets, Reps, Rest */}
                      <div className="flex gap-4 text-xs font-bold uppercase text-slate-400 bg-[#222222] p-2.5 rounded-xl border border-[#333333] w-fit flex-wrap">
                        <div><span className="text-[#00FF66] font-mono font-bold">{exercise.sets}</span> Sets</div>
                        <div className="border-l border-[#333333] pl-4"><span className="text-white font-mono font-bold">{exercise.reps}</span> Reps</div>
                        <div className="border-l border-[#333333] pl-4"><span className="text-[#FF5500] font-mono font-bold">{exercise.restSeconds}s</span> Rest</div>
                      </div>

                      {/* Form Tip / Coaching Cue */}
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#202020] border border-[#2e2e2e] text-[11px] text-slate-300 leading-relaxed">
                        <Info className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                        <span>{exercise.formTip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Auto Run / Rest Button & Set Toggles */}
                  <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Auto Run from this movement */}
                      {onStartAutoWorkout && (
                        <button
                          type="button"
                          id={`auto-run-btn-${exercise.id}`}
                          onClick={() => onStartAutoWorkout(index, 0)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14291c] hover:bg-[#1a3825] border border-[#00FF66]/40 text-xs font-bold uppercase text-[#00FF66] transition-colors shadow-xs cursor-pointer"
                          title="Start auto-guided sets from this exercise"
                        >
                          <Play className="w-3 h-3 fill-current text-[#00FF66]" />
                          <span>Auto Play</span>
                        </button>
                      )}

                      {/* Rest Trigger Button */}
                      <button
                        type="button"
                        id={`rest-btn-${exercise.id}`}
                        onClick={() => onStartRestTimer(exercise.restSeconds, exercise.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#222222] hover:bg-[#2a2a2a] border border-[#333333] text-xs font-bold uppercase text-slate-200 transition-colors shadow-xs cursor-pointer"
                        title="Start Manual Rest Timer"
                      >
                        <Timer className="w-3.5 h-3.5 text-[#00FF66]" />
                        <span>Rest {exercise.restSeconds}s</span>
                      </button>
                    </div>

                    {/* Set Tracker Buttons with Checkbox Micro-Animations */}
                    <div className="space-y-1 sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Log Sets:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                          const isDone = Boolean(setsCompletedForEx[setIdx]);
                          return (
                            <button
                              key={setIdx}
                              type="button"
                              id={`set-toggle-${exercise.id}-${setIdx}`}
                              onClick={() => handleSetClick(exercise.id, setIdx, exercise.restSeconds, exercise.name)}
                              className={`w-9 h-9 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                                isDone
                                  ? 'bg-[#00FF66] text-black font-black shadow-[0_0_12px_rgba(0,255,102,0.6)] animate-check-pop ring-2 ring-[#00FF66]'
                                  : 'bg-[#222222] hover:bg-[#2c2c2c] text-slate-300 border border-[#333333] hover:border-[#00FF66]/50 active:scale-90'
                              }`}
                              title={`Set ${setIdx + 1} - ${isDone ? 'Completed' : 'Click to log & rest'}`}
                            >
                              {isDone ? '✓' : setIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Superset visual connector line if paired */}
              {isNextSuperset && (
                <div className="flex items-center justify-center my-1.5">
                  <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#201429] text-[#d8b4fe] border border-[#7e22ce]/40 text-[10px] font-black uppercase tracking-wider">
                    <Zap className="w-2.5 h-2.5 text-[#c084fc]" />
                    Superset Transition: Move immediately to next exercise (15s)
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
