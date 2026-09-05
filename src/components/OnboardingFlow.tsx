import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Target, 
  Scale, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Dumbbell, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Check
} from 'lucide-react';
import { UserProfile, Goal, Gender, WeightUnit, HeightUnit } from '../types';
import { calculateMacros } from '../utils/nutrition';

interface OnboardingFlowProps {
  initialProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

const DURATION_PRESETS = [
  { value: 30, label: '30 mins' },
  { value: 45, label: '45 mins' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '90 mins' },
  { value: 120, label: '2 hours' },
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialProfile,
  onComplete,
}) => {
  // Input fields - "Weight First" architecture
  const [weight, setWeight] = useState<string>(initialProfile.weight ? String(initialProfile.weight) : '');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(initialProfile.weightUnit || 'kg');

  const [age, setAge] = useState<string>(initialProfile.age ? String(initialProfile.age) : '');

  const [heightCm, setHeightCm] = useState<string>(initialProfile.heightCm ? String(initialProfile.heightCm) : '');
  const [heightFeet, setHeightFeet] = useState<string>(initialProfile.heightFeet ? String(initialProfile.heightFeet) : '');
  const [heightInches, setHeightInches] = useState<string>(initialProfile.heightInches !== undefined ? String(initialProfile.heightInches) : '');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>(initialProfile.heightUnit || 'cm');

  // Daily Goal: 'Maintain Weight' ('maintenance'), 'Gentle Cut' ('gentle_deficit'), 'Slight Bulk' ('muscle_gain')
  const [dailyGoal, setDailyGoal] = useState<Goal | ''>(initialProfile.goal || '');

  // Human Model & Biological Sex representation (for Mifflin-St Jeor & exercise photography)
  const [gender, setGender] = useState<Gender | ''>(initialProfile.gender || 'male');

  // Workout duration
  const [workoutDuration, setWorkoutDuration] = useState<number>(initialProfile.workoutDurationMinutes || 45);

  // Field validation
  const parsedWeight = parseFloat(weight);
  const isWeightValid = !isNaN(parsedWeight) && parsedWeight >= 30 && parsedWeight <= 350;

  const parsedAge = parseInt(age, 10);
  const isAgeValid = !isNaN(parsedAge) && parsedAge >= 14 && parsedAge <= 100;

  const parsedHeightCm = parseFloat(heightCm);
  const parsedFeet = parseInt(heightFeet, 10);
  const parsedInches = parseInt(heightInches, 10);
  const isHeightValid = heightUnit === 'cm'
    ? (!isNaN(parsedHeightCm) && parsedHeightCm >= 90 && parsedHeightCm <= 245)
    : (!isNaN(parsedFeet) && parsedFeet >= 3 && parsedFeet <= 8 && !isNaN(parsedInches) && parsedInches >= 0 && parsedInches < 12);

  const isGoalValid = dailyGoal === 'maintenance' || dailyGoal === 'gentle_deficit' || dailyGoal === 'muscle_gain';
  const isGenderValid = gender === 'male' || gender === 'female';

  // Gatekeeper condition: Inactive until all fields are populated
  const isReadyToStart = isWeightValid && isAgeValid && isHeightValid && isGoalValid && isGenderValid;

  // Normalized values for live Mifflin-St Jeor TDEE calculation
  const calculatedHeightCm = heightUnit === 'cm' 
    ? (isHeightValid ? parsedHeightCm : 178)
    : (isHeightValid ? Math.round((parsedFeet * 12 + parsedInches) * 2.54) : 178);

  const liveProfile: UserProfile = useMemo(() => {
    return {
      weight: isWeightValid ? parsedWeight : 75,
      weightUnit,
      heightCm: calculatedHeightCm,
      heightFeet: heightUnit === 'ft' && isHeightValid ? parsedFeet : 5,
      heightInches: heightUnit === 'ft' && isHeightValid ? parsedInches : 10,
      heightUnit,
      age: isAgeValid ? parsedAge : 26,
      gender: (gender as Gender) || 'male',
      workoutDurationMinutes: workoutDuration,
      goal: (dailyGoal as Goal) || 'muscle_gain',
      activityLevel: 'moderate',
      hasCompletedOnboarding: true,
    };
  }, [
    isWeightValid, parsedWeight, weightUnit,
    calculatedHeightCm, heightUnit, isHeightValid, parsedFeet, parsedInches,
    isAgeValid, parsedAge, gender, dailyGoal, workoutDuration
  ]);

  const liveMacros = useMemo(() => {
    return calculateMacros(liveProfile);
  }, [liveProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReadyToStart) return;

    const finalizedProfile: UserProfile = {
      weight: parsedWeight,
      weightUnit,
      heightCm: calculatedHeightCm,
      heightFeet: heightUnit === 'ft' ? parsedFeet : Math.floor(calculatedHeightCm / 30.48),
      heightInches: heightUnit === 'ft' ? parsedInches : Math.round((calculatedHeightCm % 30.48) / 2.54),
      heightUnit,
      age: parsedAge,
      gender: gender as Gender,
      workoutDurationMinutes: workoutDuration,
      goal: dailyGoal as Goal,
      activityLevel: 'moderate',
      hasCompletedOnboarding: true,
    };

    onComplete(finalizedProfile);
  };

  // Missing fields helper for informative tooltip
  const getMissingFields = () => {
    const list: string[] = [];
    if (!isWeightValid) list.push('Current Weight');
    if (!isAgeValid) list.push('Age (14-100)');
    if (!isHeightValid) list.push('Height');
    if (!isGoalValid) list.push('Daily Goal');
    if (!isGenderValid) list.push('Model / Biological Sex');
    return list;
  };

  return (
    <div id="mandatory-onboarding-screen" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-10 selection:bg-lime-300 selection:text-slate-950">
      {/* Top Header */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Fit in Blink Logo"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-xl object-cover shadow-sm border border-slate-200"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase italic text-slate-950 leading-none">
              Fit in Blink
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              7-Day Protocol & Mifflin-St Jeor Engine
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono uppercase font-bold text-lime-800 bg-lime-100 border border-lime-300 px-2.5 py-1 rounded-full">
            Mandatory Setup
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl mx-auto w-full py-8 flex flex-col justify-center">
        <div className="space-y-6">
          {/* Welcome Screen Title */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 text-lime-800 border border-lime-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-lime-700" />
              <span>Personalized Calibration</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-slate-950">
              Welcome to Fit in Blink.
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Input your physical metrics below. Your data immediately calculates your clinical TDEE, sets macro splits, and configures human exercise demonstration models.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FEATURE 1: CURRENT WEIGHT FIRST (Prominent Hero Card) */}
            <div className="p-6 bg-white border-2 border-lime-400 hover:border-lime-500 rounded-3xl space-y-3 transition-colors shadow-lg shadow-slate-950/5">
              <div className="flex items-center justify-between">
                <label htmlFor="input-current-weight" className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-lime-700" />
                  <span>1. Current Weight (Required First)</span>
                </label>

                {/* kg / lbs Toggle */}
                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-mono">
                  <button
                    type="button"
                    id="unit-kg-btn"
                    onClick={() => {
                      if (weightUnit === 'lbs' && isWeightValid) {
                        setWeight((parsedWeight * 0.453592).toFixed(1));
                      }
                      setWeightUnit('kg');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      weightUnit === 'kg'
                        ? 'bg-white text-slate-950 font-black shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    id="unit-lbs-btn"
                    onClick={() => {
                      if (weightUnit === 'kg' && isWeightValid) {
                        setWeight((parsedWeight * 2.20462).toFixed(1));
                      }
                      setWeightUnit('lbs');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      weightUnit === 'lbs'
                        ? 'bg-white text-slate-950 font-black shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    lbs
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  id="input-current-weight"
                  type="number"
                  step="0.1"
                  min="30"
                  max="350"
                  placeholder={weightUnit === 'kg' ? 'e.g. 75.0' : 'e.g. 165.0'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-lime-500 focus:bg-white rounded-2xl px-5 py-4 text-2xl sm:text-3xl text-slate-950 font-mono font-black focus:outline-none transition-colors"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-lime-800 uppercase">
                  {weightUnit}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Foundation for protein intake (2.0g/kg) and basal metabolic rate</span>
                {isWeightValid && (
                  <span className="text-lime-700 font-mono font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Validated
                  </span>
                )}
              </div>
            </div>

            {/* GRID: AGE & HEIGHT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 2. Age (Years) */}
              <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-2">
                <label htmlFor="input-age" className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  2. Age (Years)
                </label>
                <input
                  id="input-age"
                  type="number"
                  min="14"
                  max="100"
                  placeholder="e.g. 26"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-lime-500 focus:bg-white rounded-2xl px-4 py-3 text-lg text-slate-900 font-mono font-bold focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-slate-400 block">
                  Used for clinical metabolic decline slope
                </span>
              </div>

              {/* 3. Height (cm/ft toggle) */}
              <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    3. Height
                  </label>
                  <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setHeightUnit('cm')}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        heightUnit === 'cm' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeightUnit('ft')}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        heightUnit === 'ft' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      ft / in
                    </button>
                  </div>
                </div>

                {heightUnit === 'cm' ? (
                  <input
                    id="input-height-cm"
                    type="number"
                    min="90"
                    max="245"
                    placeholder="e.g. 178"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-lime-500 focus:bg-white rounded-2xl px-4 py-3 text-lg text-slate-900 font-mono font-bold focus:outline-none transition-colors"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      id="input-height-feet"
                      type="number"
                      min="3"
                      max="8"
                      placeholder="Feet (e.g. 5)"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-lime-500 focus:bg-white rounded-2xl px-3 py-3 text-base text-slate-900 font-mono font-bold focus:outline-none"
                    />
                    <input
                      id="input-height-inches"
                      type="number"
                      min="0"
                      max="11"
                      placeholder="Inches (e.g. 10)"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-lime-500 focus:bg-white rounded-2xl px-3 py-3 text-base text-slate-900 font-mono font-bold focus:outline-none"
                    />
                  </div>
                )}
                <span className="text-[11px] text-slate-400 block">
                  Determines body surface area & baseline caloric burn
                </span>
              </div>
            </div>

            {/* 4. DAILY GOAL (Maintain Weight, Gentle Cut, Slight Bulk) */}
            <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-3xl space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                <span>4. Daily Goal (Choose One)</span>
                <span className="text-[10px] text-lime-800 font-mono font-bold">Caloric Target Adjustment</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Maintain Weight */}
                <button
                  type="button"
                  id="goal-maintain-weight"
                  onClick={() => setDailyGoal('maintenance')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    dailyGoal === 'maintenance'
                      ? 'border-lime-500 bg-lime-50 ring-2 ring-lime-400'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-950 tracking-wider">Maintain Weight</span>
                    {dailyGoal === 'maintenance' && <Check className="w-4 h-4 text-lime-700" />}
                  </div>
                  <p className="text-xs text-slate-600">100% of TDEE for athletic maintenance and recovery.</p>
                  <span className="text-[10px] font-mono text-lime-800 font-bold">Equilibrium Calories</span>
                </button>

                {/* Gentle Cut */}
                <button
                  type="button"
                  id="goal-gentle-cut"
                  onClick={() => setDailyGoal('gentle_deficit')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    dailyGoal === 'gentle_deficit'
                      ? 'border-lime-500 bg-lime-50 ring-2 ring-lime-400'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-950 tracking-wider">Gentle Cut</span>
                    {dailyGoal === 'gentle_deficit' && <Check className="w-4 h-4 text-lime-700" />}
                  </div>
                  <p className="text-xs text-slate-600">~300 kcal deficit. Steady fat loss preserving lean muscle mass.</p>
                  <span className="text-[10px] font-mono text-lime-800 font-bold">-300 kcal / day</span>
                </button>

                {/* Slight Bulk */}
                <button
                  type="button"
                  id="goal-slight-bulk"
                  onClick={() => setDailyGoal('muscle_gain')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    dailyGoal === 'muscle_gain'
                      ? 'border-lime-500 bg-lime-50 ring-2 ring-lime-400'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-950 tracking-wider">Slight Bulk</span>
                    {dailyGoal === 'muscle_gain' && <Check className="w-4 h-4 text-lime-700" />}
                  </div>
                  <p className="text-xs text-slate-600">+250 kcal clean surplus for progressive muscle hypertrophy.</p>
                  <span className="text-[10px] font-mono text-lime-800 font-bold">+250 kcal / day</span>
                </button>
              </div>
            </div>

            {/* 5. HUMAN MODEL & BIOLOGICAL SEX TOGGLE */}
            <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                <span>5. Exercise Model & Biological Sex</span>
                <span className="text-[10px] text-lime-800 font-mono font-bold">Selects Photorealistic Human Athlete</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="model-male-btn"
                  onClick={() => setGender('male')}
                  className={`py-3.5 px-4 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'border-lime-500 bg-lime-400 text-slate-950 font-black shadow-xs ring-1 ring-lime-400'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  Fit Man (BMR +5)
                </button>
                <button
                  type="button"
                  id="model-female-btn"
                  onClick={() => setGender('female')}
                  className={`py-3.5 px-4 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'border-lime-500 bg-lime-400 text-slate-950 font-black shadow-xs ring-1 ring-lime-400'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  Fit Woman (BMR -161)
                </button>
              </div>
            </div>

            {/* 6. DAILY WORKOUT DURATION SELECTION */}
            <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  6. Daily Workout Duration Window
                </label>
                <span className="text-xs font-mono font-bold text-lime-800 bg-lime-100 px-2.5 py-0.5 rounded-full border border-lime-300">
                  {workoutDuration} mins / session
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {DURATION_PRESETS.map((preset) => {
                  const isSelected = workoutDuration === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setWorkoutDuration(preset.value)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-lime-500 bg-lime-400 text-slate-950 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-950'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LIVE TDEE PREVIEW CARD (Visible immediately once populated) */}
            <div className="p-5 bg-white border border-slate-200 rounded-3xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-slate-900 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-lime-700" />
                  Mifflin-St Jeor TDEE Preview
                </span>
                <span className="text-lime-800">
                  {isReadyToStart ? 'Active & Calibrated' : 'Awaiting Input'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">BMR (Basal)</span>
                  <span className="text-xl font-black font-mono text-slate-950 mt-0.5 block">{liveMacros.bmr}</span>
                  <span className="text-[9px] text-slate-400">kcal / day</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">TDEE Total</span>
                  <span className="text-xl font-black font-mono text-slate-950 mt-0.5 block">{liveMacros.tdee}</span>
                  <span className="text-[9px] text-slate-400">daily expenditure</span>
                </div>

                <div className="p-3 bg-lime-50 rounded-2xl border border-lime-300">
                  <span className="text-[10px] font-bold uppercase text-lime-800 block">Target Intake</span>
                  <span className="text-xl font-black font-mono text-lime-950 mt-0.5 block">{liveMacros.targetCalories}</span>
                  <span className="text-[9px] text-lime-800">kcal target</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Protein Target</span>
                  <span className="text-xl font-black font-mono text-slate-950 mt-0.5 block">{liveMacros.proteinGrams}g</span>
                  <span className="text-[9px] text-slate-400">~2.0g/kg bodyweight</span>
                </div>
              </div>
            </div>

            {/* GATEKEEPER BUTTON: "Start My Journey" */}
            <div className="space-y-3 pt-2">
              {!isReadyToStart && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-center text-xs text-amber-800 font-mono">
                  <span>Incomplete fields: <strong>{getMissingFields().join(', ')}</strong></span>
                </div>
              )}

              <button
                type="submit"
                id="start-my-journey-btn"
                disabled={!isReadyToStart}
                className={`w-full py-4 sm:py-5 px-8 rounded-2xl font-black uppercase tracking-wider text-base flex items-center justify-center gap-3 transition-all shadow-sm ${
                  isReadyToStart
                    ? 'bg-lime-400 hover:bg-lime-500 text-slate-950 shadow-md ring-2 ring-lime-400 cursor-pointer hover:scale-[1.01]'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Start Day 1: Chest Day Protocol</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
              <p className="text-center text-[11px] font-mono text-slate-500">
                Starts at Day 1 (Chest) and shifts every 24 hours in an endless 7-day loop.
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer info */}
      <footer className="max-w-3xl mx-auto w-full py-4 border-t border-slate-200 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Mifflin-St Jeor Clinical Equation Engine</span>
        <span>Photorealistic Human Form Demonstrations</span>
      </footer>
    </div>
  );
};
