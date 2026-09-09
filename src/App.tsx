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
import { SectionNavTabs, ActiveViewType } from './components/SectionNavTabs';
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
import { GoogleAdUnit } from './components/GoogleAdUnit';
import { BmiModal } from './components/BmiModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import { FitonomyCoverPage } from './components/FitonomyCoverPage';

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

  // App Mode: 'tracker' (Interactive daily workout & diet tracker) vs 'cover' (optional preview cover page)
  const [appMode, setAppMode] = useState<'cover' | 'tracker'>('tracker');

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
  const [isBmiModalOpen, setIsBmiModalOpen] = useState<boolean>(false);
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
  const [activeView, setActiveView] = useState<ActiveViewType>('all');

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
    <div className="min-h-screen bg-[#191D26] text-slate-100 flex flex-col selection:bg-[#2563EB] selection:text-white">
      {/* 1. Header Navigation */}
      <Header
        profile={profile}
        onOpenMetrics={() => setIsMetricsModalOpen(true)}
        onOpenBmi={() => setIsBmiModalOpen(true)}
        onDurationChange={handleDurationChange}
        onResetToDemo={handleResetToDemo}
        onRestartOnboarding={() => setIsReRunningOnboarding(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {appMode === 'cover' ? (
        <div className="flex-1 flex flex-col">
          <FitonomyCoverPage
            onGetStarted={() => {
              setAppMode('tracker');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreWorkouts={() => {
              setAppMode('tracker');
              setActiveView('workout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewDiet={() => {
              setAppMode('tracker');
              setActiveView('nutrition');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* AMP Ad Unit in Cover Page View */}
          <div className="max-w-7xl mx-auto px-4 py-8 w-full flex justify-center">
            <GoogleAdUnit 
              layout="fixed"
              width="728"
              height="90"
              type="adsense"
              client="ca-pub-9398536967947214"
              slot="1600236671"
            />
          </div>
        </div>
      ) : (
        <>
          {/* 2. Primary 4-Section Navigation Bar (Sticky, Viewable, High-Energy) */}
          <SectionNavTabs
            activeView={activeView}
            onSelectView={(view) => {
              setActiveView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            durationMinutes={profile.workoutDurationMinutes}
          />

          {/* Main Container */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-6">
        {/* =========================================================================
            VIEW 1: FULL DAILY PLAN (ALL-IN-ONE 24H PROTOCOL)
            ========================================================================= */}
        {activeView === 'all' && (
          <div className="space-y-6">
            {/* Today's Protocol Overview: High-Level Summary Card */}
            <TodaysPlanOverview
              workoutPlan={currentWorkoutPlan}
              macros={currentMacros}
              profile={profile}
              onNavigateToWorkout={() => {
                const el = document.getElementById('workout-routine-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToDiet={() => {
                const el = document.getElementById('nutrition-diet-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenMetrics={() => setIsMetricsModalOpen(true)}
              onOpenBmi={() => setIsBmiModalOpen(true)}
            />

            {/* 24-Hour Endless Cycle Countdown & Live Shift Controller */}
            <CycleCountdownBar
              selectedDayId={selectedDayId}
              onSelectDay={handleSelectDay}
            />

            {/* 7-Day Split Navigation Strip */}
            <DaySelector
              rotations={SEVEN_DAY_ROTATION}
              selectedDayId={selectedDayId}
              onSelectDay={handleSelectDay}
              activeCycleDayId={cycleStatus.activeDayId}
              completedDayIds={completedDayIds}
            />

            {/* SECTION 1: WORKOUT ROUTINE */}
            <div id="workout-routine-section" className="scroll-mt-36 pt-2 space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-[#252B37] border border-[#31353E] rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1E293B] border border-[#2563EB]/40 flex items-center justify-center text-[#60A5FA] shadow-[0_0_12px_rgba(37,99,235,0.25)]">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase text-white font-heading tracking-tight flex items-center gap-2">
                      <span>Section 1: Workout Routine</span>
                      <span className="text-[10px] font-mono font-bold text-[#60A5FA] bg-[#1E293B] px-2 py-0.5 rounded-full border border-[#2563EB]/30">
                        {currentWorkoutPlan.exercises.length} Exercises
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#94A3B8] font-mono">
                      Day {currentRotation.id} of 7 • {currentRotation.focus} • {profile.workoutDurationMinutes}m Target
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveView('workout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-mono font-bold text-[#60A5FA] hover:underline cursor-pointer hidden sm:block"
                >
                  Focus View →
                </button>
              </div>

              {/* Dynamic Workout Banner */}
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

              {/* Full Exercise List */}
              <WorkoutSection
                workoutPlan={currentWorkoutPlan}
                completedSets={completedSets}
                onToggleSet={handleToggleSet}
                onStartRestTimer={handleStartRestTimer}
                onCompleteWorkout={handleCompleteWorkout}
                durationMinutes={profile.workoutDurationMinutes}
                onStartAutoWorkout={handleStartAutoWorkout}
              />
            </div>

            {/* SECTION 2: DIET & MACROS */}
            <div id="nutrition-diet-section" className="scroll-mt-36 pt-4 space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-[#1a1412] border border-[#FF5500]/30 rounded-2xl shadow-[0_0_15px_rgba(255,85,0,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2a170e] border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500] shadow-[0_0_12px_rgba(255,85,0,0.2)]">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase text-white font-heading tracking-tight flex items-center gap-2">
                      <span>Section 2: Diet & Macros</span>
                      <span className="text-[10px] font-mono font-bold text-[#FF5500] bg-[#2a170e] px-2 py-0.5 rounded-full border border-[#FF5500]/30">
                        {currentMacros.targetCalories.toLocaleString()} kcal
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-300 font-mono">
                      Mifflin-St Jeor Clinical Calculator • Goal: {profile.goal.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveView('nutrition');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-mono font-bold text-[#FF5500] hover:underline cursor-pointer hidden sm:block"
                >
                  Focus View →
                </button>
              </div>

              <NutritionSection
                profile={profile}
                onUpdateGoal={handleGoalChange}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: WORKOUT ROUTINE (STANDALONE VIEWABLE)
            ========================================================================= */}
        {activeView === 'workout' && (
          <div className="space-y-6">
            {/* Workout Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#252B37] border border-[#31353E] rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-[#2563EB]/40 flex items-center justify-center text-[#60A5FA] shadow-[0_0_14px_rgba(37,99,235,0.25)]">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black uppercase text-white font-heading tracking-tight">
                    Workout Routine
                  </h2>
                  <p className="text-xs text-[#94A3B8] font-mono">
                    Day {currentRotation.id} of 7 • {currentRotation.focus} • {currentWorkoutPlan.exercises.length} Exercises
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider hidden sm:inline">Intensity:</span>
                <span className="text-xs font-mono font-black text-[#60A5FA] bg-[#1E293B] px-3 py-1 rounded-full border border-[#2563EB]/30">
                  HIGH HYPERTROPHY
                </span>
              </div>
            </div>

            {/* 24-Hour Cycle Countdown */}
            <CycleCountdownBar
              selectedDayId={selectedDayId}
              onSelectDay={handleSelectDay}
            />

            {/* 7-Day Split Selector */}
            <DaySelector
              rotations={SEVEN_DAY_ROTATION}
              selectedDayId={selectedDayId}
              onSelectDay={handleSelectDay}
              activeCycleDayId={cycleStatus.activeDayId}
              completedDayIds={completedDayIds}
            />

            {/* Daily Banner */}
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

            {/* Workout Section */}
            <WorkoutSection
              workoutPlan={currentWorkoutPlan}
              completedSets={completedSets}
              onToggleSet={handleToggleSet}
              onStartRestTimer={handleStartRestTimer}
              onCompleteWorkout={handleCompleteWorkout}
              durationMinutes={profile.workoutDurationMinutes}
              onStartAutoWorkout={handleStartAutoWorkout}
            />
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DIET & MACROS (STANDALONE VIEWABLE)
            ========================================================================= */}
        {activeView === 'nutrition' && (
          <div className="space-y-6">
            {/* Diet Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#1e1511] border border-[#FF5500]/30 rounded-2xl shadow-[0_0_20px_rgba(255,85,0,0.1)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2e170c] border border-[#FF5500]/40 flex items-center justify-center text-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.25)]">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black uppercase text-white font-heading tracking-tight">
                    Diet & Macros Clinical Engine
                  </h2>
                  <p className="text-xs text-slate-300 font-mono">
                    Mifflin-St Jeor Formula • Target: <span className="text-[#FF5500] font-black">{currentMacros.targetCalories.toLocaleString()} kcal/day</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">Goal:</span>
                <span className="text-xs font-mono font-black text-[#FF5500] bg-[#2e170c] px-3 py-1 rounded-full border border-[#FF5500]/30 uppercase">
                  {profile.goal.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Full Nutrition Section */}
            <NutritionSection
              profile={profile}
              onUpdateGoal={handleGoalChange}
            />
          </div>
        )}

        {/* AMP Ad Unit (AdSense) */}
        <GoogleAdUnit 
          layout="fixed"
          width="728"
          height="90"
          type="adsense"
          client="ca-pub-9398536967947214"
          slot="1600236671"
        />
      </main>
      </>
      )}

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
        onOpenBmi={() => setIsBmiModalOpen(true)}
      />

      {/* Body Mass Index (BMI) & Health Analyzer Modal */}
      <BmiModal
        isOpen={isBmiModalOpen}
        onClose={() => setIsBmiModalOpen(false)}
        profile={profile}
        onUpdateWeight={(newWeight, unit) => {
          updateProfile({
            ...profile,
            weight: newWeight,
            weightUnit: unit,
          });
        }}
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

      {/* Footer: fitinblink */}
      <footer className="border-t border-[#31353E] bg-[#191D26] py-6 mt-12 text-center text-xs text-[#94A3B8]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="fitinblink Logo"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-lg object-cover border border-[#31353E] shadow-sm"
            />
            <span className="font-bold text-white uppercase tracking-wider font-heading">fitinblink</span>
            <span>•</span>
            <span className="font-medium text-[#94A3B8]">Science-based 7-Day Endless Loop: Chest ➔ Back ➔ Arms ➔ Legs ➔ Core ➔ Recovery ➔ Rest</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="footer-switch-mode-btn"
              onClick={() => {
                setAppMode(appMode === 'cover' ? 'tracker' : 'cover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1 bg-[#252B37] hover:bg-[#2C3342] border border-[#31353E] text-slate-200 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              {appMode === 'cover' ? 'Open Workout Tracker' : 'View Cover Page'}
            </button>
            <button
              id="footer-reset-cycle-btn"
              onClick={resetCycle}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#252B37] hover:bg-[#2C3342] border border-[#31353E] hover:border-[#3B82F6]/40 text-[#94A3B8] hover:text-white rounded-lg text-xs font-bold transition cursor-pointer"
              title="Restart 7-day endless loop from Day 1 (Chest Day)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Reset to Day 1</span>
            </button>
            <button
              id="footer-install-app-btn"
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 fitonomy-gradient-btn text-white rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-[0_0_10px_rgba(37,99,235,0.3)]"
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
