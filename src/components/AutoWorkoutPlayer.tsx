import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Check,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  Flame,
  Layers,
  Clock,
  Timer,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  Info,
  Dumbbell,
  Zap,
  Radio
} from 'lucide-react';
import { Exercise, DailyWorkoutPlan } from '../types';
import { 
  playRestCompleteChime, 
  playSetClickSound, 
  playCountdownBeep, 
  playStartSetSound, 
  playBreakStartSound, 
  playWorkoutVictoryFanfare 
} from '../utils/audio';
import { getExerciseVideoVisual } from '../utils/exerciseVideos';
import { useFitness } from '../context/FitnessContext';

export interface AutoWorkoutPlayerProps {
  workoutPlan: DailyWorkoutPlan;
  completedSets: { [exerciseId: string]: boolean[] };
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onCompleteWorkout: () => void;
  isOpen: boolean;
  onClose: () => void;
  initialExerciseIndex?: number;
  initialSetIndex?: number;
}

export type PlayerPhase = 'active_set' | 'rest_break' | 'paused' | 'completed';

export const AutoWorkoutPlayer: React.FC<AutoWorkoutPlayerProps> = ({
  workoutPlan,
  completedSets,
  onToggleSet,
  onCompleteWorkout,
  isOpen,
  onClose,
  initialExerciseIndex = 0,
  initialSetIndex = 0,
}) => {
  const { preferredModelGender, setPreferredModelGender } = useFitness();

  // Navigation indices
  const [exerciseIndex, setExerciseIndex] = useState<number>(initialExerciseIndex);
  const [setIndex, setSetIndex] = useState<number>(initialSetIndex);

  // Core Phase & Timing State
  const [phase, setPhase] = useState<PlayerPhase>('active_set');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Durations
  const DEFAULT_BREAK_SECONDS = 15; // 15-second break as explicitly requested
  const [breakDuration, setBreakDuration] = useState<number>(DEFAULT_BREAK_SECONDS);
  const [activeSetDuration, setActiveSetDuration] = useState<number>(45); // default 45s active set window
  const [isAutoSetTimerEnabled, setIsAutoSetTimerEnabled] = useState<boolean>(true);

  // Countdowns
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(DEFAULT_BREAK_SECONDS);
  const [activeSetSecondsLeft, setActiveSetSecondsLeft] = useState<number>(45);
  const [activeSetElapsed, setActiveSetElapsed] = useState<number>(0);

  // Total session timer
  const [totalSessionSeconds, setTotalSessionSeconds] = useState<number>(0);

  // Flattened total steps calculation for overall progress
  const totalWorkoutSets = useMemo(() => {
    return workoutPlan.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  }, [workoutPlan]);

  const currentExercise: Exercise | undefined = workoutPlan.exercises[exerciseIndex];

  // Keep refs for stable access in timer callbacks
  const onToggleSetRef = useRef(onToggleSet);
  onToggleSetRef.current = onToggleSet;
  const onCompleteWorkoutRef = useRef(onCompleteWorkout);
  onCompleteWorkoutRef.current = onCompleteWorkout;
  const currentExerciseRef = useRef(currentExercise);
  currentExerciseRef.current = currentExercise;
  const exerciseIndexRef = useRef(exerciseIndex);
  exerciseIndexRef.current = exerciseIndex;
  const setIndexRef = useRef(setIndex);
  setIndexRef.current = setIndex;
  const workoutPlanRef = useRef(workoutPlan);
  workoutPlanRef.current = workoutPlan;
  const breakDurationRef = useRef(breakDuration);
  breakDurationRef.current = breakDuration;
  const activeSetDurationRef = useRef(activeSetDuration);
  activeSetDurationRef.current = activeSetDuration;
  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;

  // Calculate cumulative sets completed up to current point
  const currentStepNumber = useMemo(() => {
    let count = 1;
    for (let i = 0; i < exerciseIndex; i++) {
      count += workoutPlan.exercises[i].sets;
    }
    count += setIndex;
    return Math.min(count, totalWorkoutSets);
  }, [exerciseIndex, setIndex, workoutPlan, totalWorkoutSets]);

  // Sync with initial indices when opening
  useEffect(() => {
    if (isOpen) {
      setExerciseIndex(initialExerciseIndex);
      setSetIndex(initialSetIndex);
      setPhase('active_set');
      setIsPaused(false);
      setActiveSetSecondsLeft(activeSetDuration);
      setActiveSetElapsed(0);
      setRestSecondsLeft(breakDuration);
      if (!isMuted) {
        playStartSetSound();
      }
    }
  }, [isOpen, initialExerciseIndex, initialSetIndex]);

  // Overall session stopwatch
  useEffect(() => {
    if (!isOpen || isPaused || phase === 'completed') return;
    const interval = setInterval(() => {
      setTotalSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPaused, phase]);

  // Finish Set Handler (called either when active set timer finishes or user taps 'Finish Set')
  const handleFinishSet = useCallback((_isManual: boolean = false) => {
    const curEx = currentExerciseRef.current;
    if (!curEx) return;

    const curSetIdx = setIndexRef.current;
    const curExIdx = exerciseIndexRef.current;
    const curPlan = workoutPlanRef.current;

    // Mark set completed in global state if not already done
    onToggleSetRef.current(curEx.id, curSetIdx);
    if (!isMutedRef.current) {
      playSetClickSound();
    }

    // Check if this is the last set of the last exercise of the day
    const isLastSetOfCurrentEx = curSetIdx + 1 >= curEx.sets;
    const isLastExercise = curExIdx + 1 >= curPlan.exercises.length;

    if (isLastSetOfCurrentEx && isLastExercise) {
      // Workout is completely finished!
      setPhase('completed');
      if (!isMutedRef.current) {
        playWorkoutVictoryFanfare();
      }
      setTimeout(() => {
        onCompleteWorkoutRef.current();
      }, 600);
      return;
    }

    // Otherwise, transition automatically to 15s REST BREAK
    setPhase('rest_break');
    setRestSecondsLeft(breakDurationRef.current);
    if (!isMutedRef.current) {
      playBreakStartSound();
    }
  }, []);

  // Called automatically when 15-second break timer reaches 0
  const handleRestBreakFinished = useCallback(() => {
    const curEx = currentExerciseRef.current;
    if (!curEx) return;

    const curSetIdx = setIndexRef.current;
    const isLastSetOfCurrentEx = curSetIdx + 1 >= curEx.sets;

    if (!isLastSetOfCurrentEx) {
      // Start next set for the same exercise (e.g. Set 2 or Set 3)
      setSetIndex((prev) => prev + 1);
    } else {
      // Move to first set of the next exercise
      setExerciseIndex((prev) => prev + 1);
      setSetIndex(0);
    }

    // Reset timers & start active set
    setPhase('active_set');
    setActiveSetSecondsLeft(activeSetDurationRef.current);
    setActiveSetElapsed(0);
    if (!isMutedRef.current) {
      playStartSetSound();
    }
  }, []);

  // Main Auto-Advancing Timer Interval Tick
  useEffect(() => {
    if (!isOpen || isPaused || phase === 'completed') return;

    const interval = setInterval(() => {
      // ACTIVE SET PHASE
      if (phase === 'active_set') {
        setActiveSetElapsed((prev) => prev + 1);

        if (isAutoSetTimerEnabled) {
          setActiveSetSecondsLeft((prev) => {
            if (prev <= 1) return 0;
            // Sound cue when 3 seconds remain in set
            if (prev <= 4 && prev > 1 && !isMutedRef.current) {
              playCountdownBeep(false);
            }
            return prev - 1;
          });
        }
      }

      // REST BREAK PHASE (15s automatic break)
      if (phase === 'rest_break') {
        setRestSecondsLeft((prev) => {
          if (prev <= 1) return 0;
          // 3, 2, 1 countdown beeps
          if (prev <= 4 && prev > 1 && !isMutedRef.current) {
            playCountdownBeep(false);
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, phase, isAutoSetTimerEnabled]);

  // Automatically trigger transitions when countdowns reach zero
  useEffect(() => {
    if (!isOpen || isPaused || phase !== 'active_set' || !isAutoSetTimerEnabled) return;
    if (activeSetSecondsLeft === 0) {
      handleFinishSet(false);
    }
  }, [activeSetSecondsLeft, isOpen, isPaused, phase, isAutoSetTimerEnabled, handleFinishSet]);

  useEffect(() => {
    if (!isOpen || isPaused || phase !== 'rest_break') return;
    if (restSecondsLeft === 0) {
      handleRestBreakFinished();
    }
  }, [restSecondsLeft, isOpen, isPaused, phase, handleRestBreakFinished]);

  // Skip rest break immediately
  const handleSkipBreak = () => {
    handleRestBreakFinished();
  };

  // Adjust rest break timer (+15s / -5s)
  const adjustBreakTime = (delta: number) => {
    setRestSecondsLeft((prev) => Math.max(1, prev + delta));
  };

  // Navigation: Jump to Next Set / Previous Set manually if needed
  const handleJumpNextSet = () => {
    if (!currentExercise) return;
    if (setIndex + 1 < currentExercise.sets) {
      setSetIndex((prev) => prev + 1);
    } else if (exerciseIndex + 1 < workoutPlan.exercises.length) {
      setExerciseIndex((prev) => prev + 1);
      setSetIndex(0);
    }
    setPhase('active_set');
    setActiveSetSecondsLeft(activeSetDuration);
    setActiveSetElapsed(0);
    if (!isMuted) playStartSetSound();
  };

  const handleJumpPrevSet = () => {
    if (setIndex > 0) {
      setSetIndex((prev) => prev - 1);
    } else if (exerciseIndex > 0) {
      const prevEx = workoutPlan.exercises[exerciseIndex - 1];
      setExerciseIndex((prev) => prev - 1);
      setSetIndex(prevEx.sets - 1);
    }
    setPhase('active_set');
    setActiveSetSecondsLeft(activeSetDuration);
    setActiveSetElapsed(0);
    if (!isMuted) playStartSetSound();
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m > 0 ? `${m}:` : ''}${s < 10 && m > 0 ? `0${s}` : s}s`;
  };

  const formatClock = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  if (!isOpen || !currentExercise) return null;

  // Visual data for active demonstration athlete
  const visualData = getExerciseVideoVisual(currentExercise.name, preferredModelGender);

  // Next movement calculation for preview during rest
  const nextExIndex = setIndex + 1 < currentExercise.sets ? exerciseIndex : exerciseIndex + 1;
  const nextSetNum = setIndex + 1 < currentExercise.sets ? setIndex + 2 : 1;
  const nextExercise = workoutPlan.exercises[nextExIndex];

  // Rest progress percentage
  const restProgress = breakDuration > 0 ? ((breakDuration - restSecondsLeft) / breakDuration) * 100 : 100;
  const activeSetProgress = activeSetDuration > 0 ? ((activeSetDuration - activeSetSecondsLeft) / activeSetDuration) * 100 : 0;
  const totalWorkoutProgress = totalWorkoutSets > 0 ? (currentStepNumber / totalWorkoutSets) * 100 : 0;

  // COMPACT FLOATING BAR MODE
  if (!isExpanded) {
    return (
      <div 
        id="auto-workout-compact-dock"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-white border-2 border-lime-500 rounded-3xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-5 transition-all"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${phase === 'active_set' ? 'bg-lime-500 animate-pulse' : 'bg-cyan-500 animate-ping'}`} />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
              {phase === 'active_set' ? `Set ${setIndex + 1} of ${currentExercise.sets}` : `Break: ${restSecondsLeft}s`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Expand Full Workout Player"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black uppercase truncate text-slate-950">
              {currentExercise.name}
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">
              {phase === 'active_set' ? `Prescribed: ${currentExercise.reps} reps` : `Next: ${nextExercise?.name || 'Workout Finish'}`}
            </p>
          </div>

          <div className="text-right font-mono shrink-0">
            <div className={`text-xl font-black ${phase === 'active_set' ? 'text-lime-700' : 'text-cyan-700'}`}>
              {phase === 'active_set' 
                ? (isAutoSetTimerEnabled ? `${activeSetSecondsLeft}s` : formatClock(activeSetElapsed))
                : `${restSecondsLeft}s`}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition text-xs font-bold"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
          </button>
          {phase === 'active_set' ? (
            <button
              onClick={() => handleFinishSet(true)}
              className="flex-1 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Finish Set & Start 15s Break</span>
            </button>
          ) : (
            <button
              onClick={handleSkipBreak}
              className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
              <span>Skip Break ➔ Start Set {nextSetNum}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // FULL IMMERSIVE WORKOUT PLAYER MODAL HUD
  return (
    <div 
      id="auto-workout-player-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col transition-all">
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-lime-100 text-lime-800 border border-lime-300">
              <Zap className="w-4 h-4 text-lime-700" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  {workoutPlan.bannerHeadline}
                </span>
                <span className="text-[10px] font-mono font-bold text-lime-800 bg-lime-100 px-2 py-0.5 rounded-full border border-lime-200">
                  Auto-Pilot Active
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Continuous auto-progression: Sets automatically advance with 15s recovery intervals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              type="button"
              id="player-mute-toggle-btn"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                isMuted 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title={isMuted ? 'Unmute audio cues' : 'Mute audio cues'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-lime-600" />}
            </button>

            {/* Minimize to Dock */}
            <button
              type="button"
              id="player-minimize-btn"
              onClick={() => setIsExpanded(false)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              title="Minimize to Floating Dock"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Exit Player */}
            <button
              type="button"
              id="player-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              title="Close Workout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar Across the Whole Day */}
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <div 
            className="bg-lime-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${totalWorkoutProgress}%` }}
          />
        </div>

        {/* Main Interactive Stage */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Phase Banner: Active Set vs 15s Break */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
            phase === 'active_set'
              ? 'bg-lime-50/70 border-lime-400/80 text-lime-950'
              : 'bg-cyan-50/80 border-cyan-300 text-cyan-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                phase === 'active_set'
                  ? 'bg-lime-400 text-slate-950 shadow-sm'
                  : 'bg-cyan-500 text-white shadow-sm'
              }`}>
                {phase === 'active_set' ? `S${setIndex + 1}` : 'REST'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {phase === 'active_set' 
                      ? `SET ${setIndex + 1} OF ${currentExercise.sets} IN PROGRESS` 
                      : `15-SECOND RECOVERY BREAK`}
                  </span>
                  {isPaused && (
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase">
                      PAUSED
                    </span>
                  )}
                </div>
                <p className="text-xs opacity-80 font-medium">
                  {phase === 'active_set' 
                    ? `Perform ${currentExercise.reps} reps • Follow steady tempo (${currentExercise.tempo})`
                    : `Breathe deeply • Next set starts automatically when timer reaches zero`}
                </p>
              </div>
            </div>

            {/* Phase Timer Countdown Display */}
            <div className="text-center sm:text-right shrink-0">
              <div className="font-mono text-3xl sm:text-4xl font-black tracking-tight leading-none">
                {phase === 'active_set' 
                  ? (isAutoSetTimerEnabled ? formatTimer(activeSetSecondsLeft) : formatClock(activeSetElapsed))
                  : `${restSecondsLeft}s`}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                {phase === 'active_set' ? (isAutoSetTimerEnabled ? 'Time Remaining' : 'Elapsed') : 'Auto-starting next set'}
              </span>
            </div>
          </div>

          {/* Exercise Overview Grid with Looping Demo Athlete Video & Movement Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Video / Photo Athlete Demonstration */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video sm:aspect-square flex items-center justify-center shadow-inner">
              <img
                src={visualData.videoUrl}
                alt={visualData.altText}
                className="w-full h-full object-contain filter contrast-[1.05] brightness-[1.02] p-2"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-lime-400 font-bold uppercase">
                {preferredModelGender === 'male' ? 'Fit Man Demo' : 'Fit Woman Demo'}
              </div>
              <button
                type="button"
                onClick={() => setPreferredModelGender(preferredModelGender === 'male' ? 'female' : 'male')}
                className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 px-2 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-white font-bold transition cursor-pointer"
              >
                Switch Model
              </button>
            </div>

            {/* Movement Prescription & Set Status Track */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-lime-800 uppercase">
                  <span>Exercise {exerciseIndex + 1} of {workoutPlan.exercises.length}</span>
                  <span>•</span>
                  <span>{currentExercise.targetMuscle}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight text-slate-950 mt-0.5">
                  {currentExercise.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Equipment: <span className="text-slate-900 font-bold">{currentExercise.equipment}</span>
                </p>
              </div>

              {/* Set Matrix Pills (Set 1, Set 2, Set 3) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Set Sequence for this exercise:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {Array.from({ length: currentExercise.sets }).map((_, idx) => {
                    const isCompleted = Boolean(completedSets[currentExercise.id]?.[idx]);
                    const isCurrent = idx === setIndex;
                    return (
                      <div
                        key={idx}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                          isCompleted
                            ? 'bg-lime-100 text-lime-900 border border-lime-300 font-black'
                            : isCurrent
                            ? 'bg-slate-900 text-white ring-2 ring-lime-400 font-black'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3 h-3 text-lime-700 stroke-[3]" /> : null}
                        <span>Set {idx + 1}</span>
                        <span className="text-[10px] opacity-75 font-normal">({currentExercise.reps})</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coaching Form Cue */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed"><strong>Form Cue:</strong> {currentExercise.formTip}</span>
              </div>
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Secondary Navigation */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  id="player-prev-set-btn"
                  onClick={handleJumpPrevSet}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                  title="Previous Set"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="player-pause-play-btn"
                  onClick={() => setIsPaused(!isPaused)}
                  className={`p-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                    isPaused 
                      ? 'bg-amber-400 text-slate-950 font-black hover:bg-amber-500 shadow-xs' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button
                  type="button"
                  id="player-next-set-btn"
                  onClick={handleJumpNextSet}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                  title="Next Set"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Main Primary Trigger Button */}
              <div className="w-full sm:w-auto flex-1 sm:max-w-md">
                {phase === 'active_set' ? (
                  <button
                    type="button"
                    id="player-finish-set-btn"
                    onClick={() => handleFinishSet(true)}
                    className="w-full py-3.5 px-6 bg-lime-400 hover:bg-lime-500 text-slate-950 font-black uppercase tracking-wider rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer ring-2 ring-lime-400"
                  >
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>Finish Set {setIndex + 1} ➔ Start 15s Break</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => adjustBreakTime(15)}
                      className="px-3 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase transition"
                    >
                      +15s
                    </button>
                    <button
                      type="button"
                      id="player-skip-break-btn"
                      onClick={handleSkipBreak}
                      className="flex-1 py-3.5 px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-black uppercase tracking-wider rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <SkipForward className="w-5 h-5 fill-current" />
                      <span>Skip Break ➔ Start Set {nextSetNum}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Timing & Setting Preferences Strip */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono pt-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-lime-600" />
                  Total Elapsed: <strong>{formatClock(totalSessionSeconds)}</strong>
                </span>
                <span>•</span>
                <span>Break Duration: <strong>{breakDuration}s</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Break Option:</span>
                {[15, 30, 45].map((secs) => (
                  <button
                    key={secs}
                    type="button"
                    onClick={() => {
                      setBreakDuration(secs);
                      if (phase === 'rest_break') setRestSecondsLeft(secs);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                      breakDuration === secs 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {secs}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
