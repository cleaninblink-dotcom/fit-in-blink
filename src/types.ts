export type WeightUnit = 'kg' | 'lbs';
export type HeightUnit = 'cm' | 'ft';
export type Gender = 'male' | 'female';
export type Goal = 'maintenance' | 'gentle_deficit' | 'muscle_gain';
export type ActivityLevel = 'light' | 'moderate' | 'very_active';

export interface UserProfile {
  weight: number;
  weightUnit: WeightUnit;
  heightCm: number;
  heightFeet: number;
  heightInches: number;
  heightUnit: HeightUnit;
  age: number;
  gender: Gender;
  workoutDurationMinutes: number; // 30, 45, 60, 90, 120 or custom
  goal: Goal;
  activityLevel: ActivityLevel;
  hasCompletedOnboarding: boolean;
}

export interface MacroTargets {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  proteinPct: number;
  carbPct: number;
  fatPct: number;
  waterLiters: number;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  sets: number;
  reps: string;
  restSeconds: number;
  tempo: string;
  formTip: string;
  isSupersetWithNext?: boolean;
  supersetPairId?: string;
  intensityType: 'warmup' | 'compound' | 'accessory' | 'superset' | 'finisher' | 'mobility';
}

export interface DayRotation {
  id: number; // 1 to 7
  dayName: string;
  focus: string;
  majorMuscles: string[];
  isRestDay: boolean;
  bannerHeadline: string;
  tagline: string;
  accentColor: string;
}

export interface DailyWorkoutPlan {
  dayId: number;
  dayName: string;
  focus: string;
  bannerHeadline?: string;
  durationMinutes: number;
  intensityLabel: string;
  burnEstimateKcal: number;
  totalSets: number;
  exercises: Exercise[];
  styleDescription: string;
}

export interface MealSlot {
  name: string;
  timeAdvice: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sampleFoods: string[];
}
