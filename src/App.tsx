import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, 
  Apple, 
  SlidersHorizontal, 
  Flame, 
  Clock, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowDown,
  Download
} from 'lucide-react';
import { UserProfile, Goal } from './types';
import { SEVEN_DAY_ROTATION, generateDailyWorkoutPlan } from './utils/workouts';
import { calculateMacros } from './utils/nutrition';
import { useFitness } from './context/FitnessContext';
import { Header } from './components/Header';
import { OnboardingFlow } from './components/OnboardingFlow';
import { TodaysPlanOverview } from './components/TodaysPlanOverview';
import { DailyBanner } from './components/DailyBanner';
import { DaySelector } from './components/DaySelector';
import { WorkoutSection } from './components/WorkoutSection';
import { NutritionSection } from './components/NutritionSection';
import { MetricsModal } from './components/MetricsModal';
import { FloatingRestTimer } from './components/FloatingRestTimer';
import { WorkoutCompleteModal } from './components/WorkoutCompleteModal';
import { InstallAppModal } from './components/InstallAppModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CycleCountdownBar } from './components/CycleCountdownBar';
import { AutoWorkoutPlayer } from './components/AutoWorkoutPlayer';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  // 1. Centralized State Management via FitnessContext
  const {
    profile,
    macros: currentMacros,
    hasCompletedOnboarding,
    preferredModelGender,
    cycleStatus,
    setPreferredModelGender,
    updateProfile,
    completeOnboarding,
    restartOnboarding,
    resetToDemo,
    resetCycle,
  } = useFitness();

  // 2. Day Selection: starts strictly on Day 1 (Chest Day) or current active 24h cycle day
  const [selectedDayId, setSelectedDayId] = useState<number>(() => {
    return cycleStatus.activeDayId || 1;
  });

  // Keep selectedDayId aligned if user hasn't manually overridden it to another preview day
  const [hasManuallyBrowsedOtherDay, setHasManuallyBrowsedOtherDay] = useState<boolean>(false);

  useEffect(() => {
    if (!hasManuallyBrowsedOtherDay) {
      setSelectedDayId(cycleStatus.activeDayId);
    }
  }, [cycleStatus.activeDayId, hasManuallyBrowsedOtherDay]);

  // 3. Modals & Interactive States
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState<boolean>(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState<boolean>(false);

  // Auto-Progression Workout Player State
  const [isAutoPlayerOpen, setIsAutoPlayerOpen] = useState<boolean>(false);
  const [autoPlayerStartIndex, setAutoPlayerStartIndex] = useState<{ exerciseIndex: number; setIndex: number }>({
    exerciseIndex: 0,
    setIndex: 0,
  });

  const handleStartAutoWorkout = (exerciseIndex: number = 0, setIndex: number = 0) => {
    setAutoPlayerStartIndex({ exerciseIndex, setIndex });
    setIsAutoPlayerOpen(true);
    setIsWorkoutActive(true);
  };

  // Rest Timer State
  const [restTimer, setRestTimer] = useState<{
    isOpen: boolean;
    seconds: number;
    exerciseName: string;
  }>({
    isOpen: false,
    seconds: 60,
    exerciseName: '',
  });

  // Completed sets per exercise id: { [exerciseId]: boolean[] }
  const [completedSets, setCompletedSets] = useState<{ [exerciseId: string]: boolean[] }>(() => {
    try {
      const todayKey = `fit_completed_sets_${new Date().toISOString().slice(0, 10)}`;
      const saved = localStorage.getItem(todayKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {};
  });

  // Completed day tracking
  const [completedDayIds, setCompletedDayIds] = useState<number[]>([]);

  // Navigation tab view (or combined)
  const [activeView, setActiveView] = useState<'all' | 'workout' | 'nutrition'>('all');

  // Re-run onboarding state
  const [isReRunningOnboarding, setIsReRunningOnboarding] = useState<boolean>(false);

  // Generate the current day's tailored workout plan based on selected day and duration
  const currentWorkoutPlan = useMemo(() => {
    return generateDailyWorkoutPlan(selectedDayId, profile.workoutDurationMinutes);
  }, [selectedDayId, profile.workoutDurationMinutes]);

  // Current day rotation meta
  const currentRotation = useMemo(() => {
    return SEVEN_DAY_ROTATION.find((r) => r.id === selectedDayId) || SEVEN_DAY_ROTATION[0];
  }, [selectedDayId]);

  // Count total sets completed for the current plan
  const completedSetsCount = useMemo(() => {
    return currentWorkoutPlan.exercises.reduce((sum, ex) => {
      const sets = completedSets[ex.id] || [];
      return sum + sets.filter(Boolean).length;
    }, 0);
  }, [currentWorkoutPlan, completedSets]);

  // Handle completion of mandatory onboarding (guarantees Day 1 start)
  const handleOnboardingComplete = (completedProfile: UserProfile) => {
    completeOnboarding(completedProfile);
    setIsReRunningOnboarding(false);
    setSelectedDayId(1);
    setHasManuallyBrowsedOtherDay(false);
  };

  // Day tab selection handler
  const handleSelectDay = (dayId: number) => {
    setSelectedDayId(dayId);
    if (dayId === cycleStatus.activeDayId) {
      setHasManuallyBrowsedOtherDay(false);
    } else {
      setHasManuallyBrowsedOtherDay(true);
    }
  };

  // Toggle individual set
  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    setIsWorkoutActive(true);
    setCompletedSets((prev) => {
      const current = prev[exerciseId] ? [...prev[exerciseId]] : [];
      current[setIndex] = !current[setIndex];
      const updated = { ...prev, [exerciseId]: current };
      try {
        const todayKey = `fit_completed_sets_${new Date().toISOString().slice(0, 10)}`;
        localStorage.setItem(todayKey, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Quick duration change
  const handleDurationChange = (newDuration: number) => {
    updateProfile({ workoutDurationMinutes: newDuration });
  };

  // Goal change directly from Nutrition Section
  const handleGoalChange = (newGoal: Goal) => {
    updateProfile({ goal: newGoal });
  };

  // Start rest timer
  const handleStartRestTimer = (seconds: number, exerciseName: string) => {
    setRestTimer({
      isOpen: true,
      seconds,
      exerciseName,
    });
  };

  // Finish / Complete Workout
  const handleCompleteWorkout = () => {
    if (!completedDayIds.includes(selectedDayId)) {
      setCompletedDayIds((prev) => [...prev, selectedDayId]);
    }
    setIsCompleteModalOpen(true);
  };

  // Reset to Demo Values
  const handleResetToDemo = () => {
    resetToDemo();
    setSelectedDayId(1);
    setHasManuallyBrowsedOtherDay(false);
    setCompletedSets({});
  };

  // MANDATORY ONBOARDING FLOW: Rendered before any dashboard if user hasn't completed onboarding
  if (!profile.hasCompletedOnboarding || isReRunningOnboarding) {
    return (
      <OnboardingFlow
        initialProfile={profile}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-lime-300 selection:text-slate-950">
      {/* 1. Header Navigation */}
      <Header
        profile={profile}
        onOpenMetrics={() => setIsMetricsModalOpen(true)}
        onDurationChange={handleDurationChange}
        onResetToDemo={handleResetToDemo}
        onRestartOnboarding={() => setIsReRunningOnboarding(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* "Today's Plan" Overview: Summary Card */}
        <TodaysPlanOverview
          workoutPlan={currentWorkoutPlan}
          macros={currentMacros}
          profile={profile}
          onNavigateToWorkout={() => {
            setActiveView('workout');
            const el = document.getElementById('exercise-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onNavigateToDiet={() => {
            setActiveView('nutrition');
            const el = document.getElementById('nutrition-diet-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 24-Hour Endless Cycle Countdown & Live Shift Controller */}
        <CycleCountdownBar
          selectedDayId={selectedDayId}
          onSelectDay={handleSelectDay}
        />

        {/* View Selection Filter Tabs in Bento Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex rounded-full bg-slate-200/80 p-1 border border-slate-300/80 text-xs self-start">
            <button
              id="view-all-btn"
              onClick={() => setActiveView('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeView === 'all'
                  ? 'bg-white text-slate-900 font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Daily Plan
            </button>
            <button
              id="view-workout-btn"
              onClick={() => setActiveView('workout')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'workout'
                  ? 'bg-white text-slate-900 font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5 text-lime-600" />
              Workout Routine
            </button>
            <button
              id="view-diet-btn"
              onClick={() => setActiveView('nutrition')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'nutrition'
                  ? 'bg-white text-slate-900 font-black shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Apple className="w-3.5 h-3.5 text-emerald-600" />
              Diet & Macros
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
            <span className="uppercase tracking-widest text-[11px] font-semibold">Adaptive Time Engine:</span>
            <span className="font-mono font-bold text-lime-800 bg-lime-100/80 px-2.5 py-0.5 rounded-full border border-lime-200">
              {profile.workoutDurationMinutes} mins active
            </span>
          </div>
        </div>

        {/* 2. Fixed 7-Day Split Navigation Strip */}
        <DaySelector
          rotations={SEVEN_DAY_ROTATION}
          selectedDayId={selectedDayId}
          onSelectDay={handleSelectDay}
          activeCycleDayId={cycleStatus.activeDayId}
          completedDayIds={completedDayIds}
        />

        {/* 3. Dynamic Daily Dashboard Banner ("Today's Plan") */}
        {(activeView === 'all' || activeView === 'workout') && (
          <DailyBanner
            currentDayRotation={currentRotation}
            workoutPlan={currentWorkoutPlan}
            durationMinutes={profile.workoutDurationMinutes}
            onDurationChange={handleDurationChange}
            isToday={selectedDayId === cycleStatus.activeDayId}
            onStartWorkout={() => {
              handleStartAutoWorkout(0, 0);
            }}
            isWorkoutActive={isWorkoutActive}
            completedSetsCount={completedSetsCount}
          />
        )}

        {/* 4. Workout & Exercise Section */}
        {(activeView === 'all' || activeView === 'workout') && (
          <WorkoutSection
            workoutPlan={currentWorkoutPlan}
            completedSets={completedSets}
            onToggleSet={handleToggleSet}
            onStartRestTimer={handleStartRestTimer}
            onCompleteWorkout={handleCompleteWorkout}
            durationMinutes={profile.workoutDurationMinutes}
            onStartAutoWorkout={handleStartAutoWorkout}
          />
        )}

        {/* Visual Divider if in 'all' view */}
        {activeView === 'all' && (
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-4 text-slate-600 font-bold tracking-widest flex items-center gap-2 border border-slate-200 rounded-full py-1 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-lime-600" />
                Mifflin-St Jeor Clinical Nutrition Engine
              </span>
            </div>
          </div>
        )}

        {/* 5. Nutrition & Macro Calculator ("Diet Section") */}
        {(activeView === 'all' || activeView === 'nutrition') && (
          <NutritionSection
            profile={profile}
            onUpdateGoal={handleGoalChange}
          />
        )}
      </main>

      {/* Automated Workout Routine Engine (Auto Sets with 15s Recovery Breaks) */}
      <AutoWorkoutPlayer
        workoutPlan={currentWorkoutPlan}
        completedSets={completedSets}
        onToggleSet={handleToggleSet}
        onCompleteWorkout={handleCompleteWorkout}
        isOpen={isAutoPlayerOpen}
        onClose={() => setIsAutoPlayerOpen(false)}
        initialExerciseIndex={autoPlayerStartIndex.exerciseIndex}
        initialSetIndex={autoPlayerStartIndex.setIndex}
      />

      {/* Floating Rest Timer */}
      <FloatingRestTimer
        initialSeconds={restTimer.seconds}
        exerciseName={restTimer.exerciseName}
        isOpen={restTimer.isOpen}
        onClose={() => setRestTimer((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Metrics Onboarding & Edit Modal */}
      <MetricsModal
        isOpen={isMetricsModalOpen}
        onClose={() => setIsMetricsModalOpen(false)}
        profile={profile}
        onSave={(updated) => updateProfile(updated)}
        isOnboarding={false}
      />

      {/* Workout Completion Celebration Modal */}
      <WorkoutCompleteModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        workoutPlan={currentWorkoutPlan}
        completedSetsCount={completedSetsCount}
        durationMinutes={profile.workoutDurationMinutes}
      />

      {/* PWA In-Browser Installation Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* PWA Offline Mode Network Indicator */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Fit in Blink Logo"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-lg object-cover border border-slate-200 shadow-sm"
            />
            <span className="font-bold text-slate-900 uppercase tracking-wider">Fit in Blink</span>
            <span>•</span>
            <span className="font-medium text-slate-600">Continuous 24h 7-Day Endless Loop: Chest ➔ Back ➔ Arms ➔ Legs ➔ Core ➔ Recovery ➔ Rest</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="footer-reset-cycle-btn"
              onClick={resetCycle}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold transition cursor-pointer"
              title="Restart 7-day endless loop from Day 1 (Chest Day)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-lime-600" />
              <span>Reset to Day 1</span>
            </button>
            <button
              id="footer-install-app-btn"
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-lime-100 hover:bg-lime-200 border border-lime-300 text-lime-900 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
