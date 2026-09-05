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
    <section id="exercise-section" className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col space-y-5 shadow-sm">
      {/* Bento Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xs font-bold text-lime-800 uppercase tracking-widest">
              Generated Workout Routine
            </h2>
            <span className="text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 uppercase font-bold tracking-wider">
              Strict {durationMinutes}-Min Volume
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-mono font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Looping Videos Active
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Dynamic volume with automatic set pacing and 15-second recovery breaks.
          </p>
        </div>

        {/* Completion Progress, Model Selector & Action */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
          {/* Global Demonstration Model Selector */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-mono">
            <span className="text-[10px] text-slate-500 uppercase px-2 hidden md:inline">Demonstration:</span>
            <button
              type="button"
              onClick={() => setPreferredModelGender('male')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                preferredModelGender === 'male'
                  ? 'bg-white text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fit Man
            </button>
            <button
              type="button"
              onClick={() => setPreferredModelGender('female')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                preferredModelGender === 'female'
                  ? 'bg-white text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fit Woman
            </button>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono font-black text-slate-900">
              {totalCompletedSets} / {workoutPlan.totalSets} SETS
            </div>
            <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              {Math.round((totalCompletedSets / Math.max(1, workoutPlan.totalSets)) * 100)}% Complete
            </div>
          </div>

          {/* Start Auto Workout Button */}
          {onStartAutoWorkout && (
            <button
              type="button"
              id="start-auto-workout-header-btn"
              onClick={() => onStartAutoWorkout(0, 0)}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm bg-lime-400 hover:bg-lime-500 text-slate-950 ring-2 ring-lime-400 cursor-pointer hover:scale-[1.02]"
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
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isAllComplete ? 'text-white' : 'text-lime-600'}`} />
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
              {/* Bento Exercise Card */}
              <div 
                id={`exercise-card-${exercise.id}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isExComplete 
                    ? 'border-lime-400/80 bg-lime-50/30 shadow-xs' 
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 hover:border-slate-300 shadow-xs'
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
                            <h3 className="font-bold uppercase italic text-lg leading-tight text-slate-950 tracking-tight">
                              {exercise.name}
                            </h3>
                            {isNextSuperset && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                <LinkIcon className="w-2.5 h-2.5" />
                                Superset Pair
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                            <span className="font-bold text-lime-700 uppercase text-[11px] tracking-wider">
                              {exercise.targetMuscle}
                            </span>
                            <span>•</span>
                            <span>{exercise.equipment}</span>
                            <span>•</span>
                            <span>Tempo: <span className="font-mono text-slate-900 font-bold">{exercise.tempo}</span></span>
                          </div>
                        </div>

                        {/* Monospace Bento Number */}
                        <span className="text-lime-800 font-mono text-sm font-bold bg-white border border-slate-200 px-2 py-0.5 rounded shrink-0 shadow-xs">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Bento Prescribed Metric Badges: Sets, Reps, Rest */}
                      <div className="flex gap-4 text-xs font-bold uppercase text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 w-fit flex-wrap shadow-xs">
                        <div><span className="text-slate-950 font-mono font-bold">{exercise.sets}</span> Sets</div>
                        <div className="border-l border-slate-200 pl-4"><span className="text-slate-950 font-mono font-bold">{exercise.reps}</span> Reps</div>
                        <div className="border-l border-slate-200 pl-4"><span className="text-slate-950 font-mono font-bold">{exercise.restSeconds}s</span> Rest</div>
                      </div>

                      {/* Form Tip / Coaching Cue */}
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 leading-relaxed shadow-xs">
                        <Info className="w-3.5 h-3.5 text-lime-600 shrink-0 mt-0.5" />
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
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-100 hover:bg-lime-200 border border-lime-300 text-xs font-bold uppercase text-lime-900 transition-colors shadow-xs cursor-pointer"
                          title="Start auto-guided sets from this exercise"
                        >
                          <Play className="w-3 h-3 fill-current text-lime-800" />
                          <span>Auto Play</span>
                        </button>
                      )}

                      {/* Rest Trigger Button */}
                      <button
                        type="button"
                        id={`rest-btn-${exercise.id}`}
                        onClick={() => onStartRestTimer(exercise.restSeconds, exercise.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold uppercase text-slate-800 transition-colors shadow-xs cursor-pointer"
                        title="Start Manual Rest Timer"
                      >
                        <Timer className="w-3.5 h-3.5 text-lime-600" />
                        <span>Rest {exercise.restSeconds}s</span>
                      </button>
                    </div>

                    {/* Set Tracker Buttons */}
                    <div className="space-y-1 sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
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
                              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                                isDone
                                  ? 'bg-lime-400 text-slate-950 font-black shadow-xs ring-1 ring-lime-500'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
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
                  <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-black uppercase tracking-wider shadow-xs">
                    <Zap className="w-2.5 h-2.5" />
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

