import React, { useState } from 'react';
import { X, Check, Activity, Target, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { UserProfile, WeightUnit, HeightUnit, Gender, Goal, ActivityLevel } from '../types';

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  isOnboarding?: boolean;
}

export const MetricsModal: React.FC<MetricsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  isOnboarding = false,
}) => {
  const [weight, setWeight] = useState<number>(profile.weight);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(profile.weightUnit);

  const [heightCm, setHeightCm] = useState<number>(profile.heightCm);
  const [heightFeet, setHeightFeet] = useState<number>(profile.heightFeet);
  const [heightInches, setHeightInches] = useState<number>(profile.heightInches);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>(profile.heightUnit);

  const [age, setAge] = useState<number>(profile.age);
  const [gender, setGender] = useState<Gender>(profile.gender);
  const [workoutDuration, setWorkoutDuration] = useState<number>(profile.workoutDurationMinutes);
  const [goal, setGoal] = useState<Goal>(profile.goal);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile.activityLevel);

  if (!isOpen) return null;

  const handleUnitWeightChange = (newUnit: WeightUnit) => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') {
      setWeight(Math.round(weight * 2.20462));
    } else {
      setWeight(Math.round(weight / 2.20462));
    }
    setWeightUnit(newUnit);
  };

  const handleUnitHeightChange = (newUnit: HeightUnit) => {
    if (newUnit === heightUnit) return;
    if (newUnit === 'ft') {
      const totalInches = Math.round(heightCm / 2.54);
      const ft = Math.floor(totalInches / 12);
      const inch = totalInches % 12;
      setHeightFeet(ft);
      setHeightInches(inch);
    } else {
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      setHeightCm(cm);
    }
    setHeightUnit(newUnit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      weight: Math.max(30, Math.min(300, weight)),
      weightUnit,
      heightCm: Math.max(100, Math.min(250, heightCm)),
      heightFeet: Math.max(3, Math.min(7, heightFeet)),
      heightInches: Math.max(0, Math.min(11, heightInches)),
      heightUnit,
      age: Math.max(14, Math.min(99, age)),
      gender,
      workoutDurationMinutes: workoutDuration,
      goal,
      activityLevel,
      hasCompletedOnboarding: true,
    });
    onClose();
  };

  const durationOptions = [
    { value: 30, label: '30 mins', desc: 'High-Intensity Supersets' },
    { value: 45, label: '45 mins', desc: 'Compound + Antagonist' },
    { value: 60, label: '1 hour', desc: 'Standard Hypertrophy' },
    { value: 90, label: '1.5 hours', desc: 'Deep-Split Volume' },
    { value: 120, label: '2 hours', desc: 'Elite Deep-Split Routine' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="metrics-modal-card"
        className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-950/20 overflow-hidden my-6 transition-all"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-lime-100 text-lime-800 border border-lime-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-950 tracking-tight uppercase">
                {isOnboarding ? 'Welcome to Fit in Blink' : 'Update Your Physical Profile'}
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {isOnboarding 
                ? 'Enter your baseline metrics to calculate exact Mifflin-St Jeor macros and generate your routine.'
                : 'Adjust your metrics anytime to immediately recalculate macros and volume.'}
            </p>
          </div>
          {!isOnboarding && (
            <button
              id="close-metrics-modal-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Weight & Height Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weight */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="input-weight" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Current Weight
                </label>
                <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleUnitWeightChange('kg')}
                    className={`px-2.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      weightUnit === 'kg' ? 'bg-white text-slate-950 font-black shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitWeightChange('lbs')}
                    className={`px-2.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      weightUnit === 'lbs' ? 'bg-white text-slate-950 font-black shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    lbs
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  id="input-weight"
                  type="number"
                  min={weightUnit === 'kg' ? 30 : 66}
                  max={weightUnit === 'kg' ? 250 : 550}
                  value={weight || ''}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-lime-500 focus:bg-white text-sm"
                  placeholder={weightUnit === 'kg' ? '75' : '165'}
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-mono font-medium pointer-events-none">
                  {weightUnit}
                </span>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Height
                </label>
                <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px]">
                  <button
                    type="button"
                    onClick={() => handleUnitHeightChange('cm')}
                    className={`px-2.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      heightUnit === 'cm' ? 'bg-white text-slate-950 font-black shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    cm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitHeightChange('ft')}
                    className={`px-2.5 py-0.5 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      heightUnit === 'ft' ? 'bg-white text-slate-950 font-black shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    ft/in
                  </button>
                </div>
              </div>

              {heightUnit === 'cm' ? (
                <div className="relative">
                  <input
                    id="input-height-cm"
                    type="number"
                    min={100}
                    max={230}
                    value={heightCm || ''}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-lime-500 focus:bg-white text-sm"
                    placeholder="178"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-mono font-medium pointer-events-none">
                    cm
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      id="input-height-ft"
                      type="number"
                      min={3}
                      max={7}
                      value={heightFeet || ''}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-lime-500 focus:bg-white text-sm"
                      placeholder="5"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono font-medium">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      id="input-height-in"
                      type="number"
                      min={0}
                      max={11}
                      value={heightInches || ''}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-lime-500 focus:bg-white text-sm"
                      placeholder="10"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono font-medium">in</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Age and Sex Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-1.5">
              <label htmlFor="input-age" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Age (Years)
              </label>
              <input
                id="input-age"
                type="number"
                min={15}
                max={95}
                value={age || ''}
                onChange={(e) => setAge(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold focus:outline-none focus:border-lime-500 focus:bg-white text-sm"
                placeholder="26"
              />
            </div>

            {/* Sex (for Mifflin-St Jeor accuracy) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Biological Sex <span className="text-[10px] text-slate-400 lowercase font-normal">(for BMR calculation)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="gender-male-btn"
                  onClick={() => setGender('male')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'border-lime-500 bg-lime-50 text-lime-900 ring-1 ring-lime-400 font-black'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {gender === 'male' && <Check className="w-3.5 h-3.5 text-lime-700" />}
                  Male
                </button>
                <button
                  type="button"
                  id="gender-female-btn"
                  onClick={() => setGender('female')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'border-lime-500 bg-lime-50 text-lime-900 ring-1 ring-lime-400 font-black'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {gender === 'female' && <Check className="w-3.5 h-3.5 text-lime-700" />}
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Daily Workout Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-lime-600" />
                <span>Daily Workout Duration</span>
              </label>
              <span className="text-xs font-mono font-bold text-lime-800 bg-lime-100 px-2 py-0.5 rounded-full border border-lime-300">
                {workoutDuration >= 60 ? `${workoutDuration / 60} Hour${workoutDuration > 60 ? 's' : ''}` : `${workoutDuration} Mins`}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {durationOptions.map((opt) => {
                const isSel = workoutDuration === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    id={`modal-duration-choice-${opt.value}`}
                    onClick={() => setWorkoutDuration(opt.value)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSel
                        ? 'border-lime-500 bg-lime-50 text-slate-950 shadow-xs ring-1 ring-lime-400'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 leading-tight mt-0.5 font-medium">
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nutrition Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-600" />
              <span>Nutrition & Caloric Target Goal</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                id="goal-maintenance-btn"
                onClick={() => setGoal('maintenance')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  goal === 'maintenance'
                    ? 'border-lime-500 bg-lime-50 text-slate-950 shadow-xs ring-1 ring-lime-400'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  Healthy Maintenance
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  100% TDEE • Sustainable energy & muscle retention
                </div>
              </button>

              <button
                type="button"
                id="goal-deficit-btn"
                onClick={() => setGoal('gentle_deficit')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  goal === 'gentle_deficit'
                    ? 'border-lime-500 bg-lime-50 text-slate-950 shadow-xs ring-1 ring-lime-400'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  Gentle Fat Loss
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  -300 kcal deficit • Non-restrictive, protects muscle
                </div>
              </button>

              <button
                type="button"
                id="goal-surplus-btn"
                onClick={() => setGoal('muscle_gain')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  goal === 'muscle_gain'
                    ? 'border-lime-500 bg-lime-50 text-slate-950 shadow-xs ring-1 ring-lime-400'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  Lean Muscle Gain
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  +250 kcal surplus • Fuels progressive overload
                </div>
              </button>
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>General Daily Activity Level</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'light', label: 'Light', desc: 'Desk job + light walks' },
                { id: 'moderate', label: 'Moderate', desc: 'Regular training (Recommended)' },
                { id: 'very_active', label: 'Very Active', desc: 'High physical job / sport' },
              ].map((act) => (
                <button
                  key={act.id}
                  type="button"
                  id={`activity-btn-${act.id}`}
                  onClick={() => setActivityLevel(act.id as ActivityLevel)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    activityLevel === act.id
                      ? 'border-lime-500 bg-lime-50 text-lime-900 ring-1 ring-lime-400 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{act.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{act.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit / Save button */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            {!isOnboarding && (
              <button
                type="button"
                id="cancel-metrics-btn"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              id="save-metrics-submit-btn"
              className="w-full sm:w-auto px-6 py-2.5 bg-lime-400 hover:bg-lime-500 text-slate-950 font-black uppercase tracking-wider rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{isOnboarding ? 'Generate Plan in a Blink' : 'Update Plan & Recalculate'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
