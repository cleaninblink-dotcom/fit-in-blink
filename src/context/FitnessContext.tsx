import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { UserProfile, MacroTargets, Goal, Gender, WeightUnit, HeightUnit } from '../types';
import { calculateMacros } from '../utils/nutrition';
import { 
  CycleStatus, 
  getStoredCycleStartTime, 
  resetCycleToDayOne, 
  setCycleToSpecificDay, 
  calculateCycleStatus 
} from '../utils/cycle';

interface FitnessContextType {
  profile: UserProfile;
  macros: MacroTargets;
  hasCompletedOnboarding: boolean;
  preferredModelGender: 'male' | 'female';
  cycleStatus: CycleStatus;
  setPreferredModelGender: (gender: 'male' | 'female') => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  updateWeight: (weight: number, unit?: WeightUnit) => void;
  completeOnboarding: (newProfile: UserProfile) => void;
  restartOnboarding: () => void;
  resetToDemo: () => void;
  resetCycle: () => void;
  jumpToCycleDay: (targetDayId: number) => void;
}

const STORAGE_KEY = 'fit_in_blink_profile_v2';

export const DEFAULT_PROFILE: UserProfile = {
  weight: 75,
  weightUnit: 'kg',
  heightCm: 178,
  heightFeet: 5,
  heightInches: 10,
  heightUnit: 'cm',
  age: 26,
  gender: 'male',
  workoutDurationMinutes: 45,
  goal: 'muscle_gain', // 'muscle_gain' = Slight Bulk, 'gentle_deficit' = Gentle Cut, 'maintenance' = Maintain Weight
  activityLevel: 'moderate',
  hasCompletedOnboarding: false,
};

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROFILE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read saved profile:', e);
    }
    return DEFAULT_PROFILE;
  });

  const [preferredModelGender, setPreferredModelGender] = useState<'male' | 'female'>(() => {
    return profile.gender || 'male';
  });

  // Endless 24-hour cycle state: initialized so Day 1 is Chest Day
  const [cycleStartedAt, setCycleStartedAt] = useState<number>(() => {
    return getStoredCycleStartTime();
  });

  // Ticker for real-time 24-hour shift countdown and auto-advancement
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate live cycle status (Day 1..7 endless rotation)
  const cycleStatus = useMemo(() => {
    return calculateCycleStatus(cycleStartedAt, currentTime);
  }, [cycleStartedAt, currentTime]);

  // Keep preferredModelGender in sync when profile gender changes
  useEffect(() => {
    if (profile.gender) {
      setPreferredModelGender(profile.gender);
    }
  }, [profile.gender]);

  // Dynamically calculate clinical Mifflin-St Jeor TDEE and macro distribution
  const macros = useMemo(() => {
    return calculateMacros(profile);
  }, [profile]);

  const persistProfile = (p: UserProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch (e) {
      console.warn('Could not persist profile:', e);
    }
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...partial };
      persistProfile(updated);
      return updated;
    });
  };

  const updateWeight = (weight: number, unit?: WeightUnit) => {
    setProfile((prev) => {
      const updated: UserProfile = {
        ...prev,
        weight,
        weightUnit: unit || prev.weightUnit,
      };
      persistProfile(updated);
      return updated;
    });
  };

  const completeOnboarding = (finalProfile: UserProfile) => {
    const finalized = { ...finalProfile, hasCompletedOnboarding: true };
    setProfile(finalized);
    setPreferredModelGender(finalized.gender || 'male');
    persistProfile(finalized);
    // When onboarding completes, ensure cycle starts at Day 1 (Chest Day)
    const newStart = resetCycleToDayOne();
    setCycleStartedAt(newStart);
  };

  const restartOnboarding = () => {
    setProfile((prev) => {
      const updated = { ...prev, hasCompletedOnboarding: false };
      persistProfile(updated);
      return updated;
    });
  };

  const resetToDemo = () => {
    const demo: UserProfile = {
      ...DEFAULT_PROFILE,
      hasCompletedOnboarding: true,
    };
    setProfile(demo);
    setPreferredModelGender(demo.gender);
    persistProfile(demo);
    const newStart = resetCycleToDayOne();
    setCycleStartedAt(newStart);
  };

  const resetCycle = () => {
    const newStart = resetCycleToDayOne();
    setCycleStartedAt(newStart);
  };

  const jumpToCycleDay = (targetDayId: number) => {
    const newStart = setCycleToSpecificDay(targetDayId);
    setCycleStartedAt(newStart);
  };

  return (
    <FitnessContext.Provider
      value={{
        profile,
        macros,
        hasCompletedOnboarding: profile.hasCompletedOnboarding,
        preferredModelGender,
        cycleStatus,
        setPreferredModelGender,
        updateProfile,
        updateWeight,
        completeOnboarding,
        restartOnboarding,
        resetToDemo,
        resetCycle,
        jumpToCycleDay,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
