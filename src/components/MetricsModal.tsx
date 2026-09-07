import React, { useState } from 'react';
import { X, Check, Activity, Target, Flame, ArrowRight, Sparkles, Scale } from 'lucide-react';
import { UserProfile, WeightUnit, HeightUnit, Gender, Goal, ActivityLevel } from '../types';

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  isOnboarding?: boolean;
  onOpenBmi?: () => void;
}

export const MetricsModal: React.FC<MetricsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  isOnboarding = false,
  onOpenBmi,
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
    <div 
      id="metrics-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isOnboarding) onClose();
      }}
    >
      <div 
        id="metrics-modal-card"
        className="w-full max-w-xl max-h-[92dvh] sm:max-h-[88vh] bg-[#161616] border border-[#282828] rounded-t-3xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col my-0 sm:my-auto transition-all text-slate-100"
      >
        {/* Header - Fixed at top */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#282828] flex items-center justify-between bg-[#141414] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#14281a] text-[#00FF66] border border-[#00FF66]/30 shrink-0">
              <Scale className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight uppercase font-heading flex items-center gap-2">
                <span>{isOnboarding ? 'Welcome to Fit in Blink' : 'Physical Profile & Metrics'}</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium line-clamp-1">
                {isOnboarding 
                  ? 'Set your baseline weight, height & goals'
                  : 'Update weight, height & goals to recalculate macros'}
              </p>
            </div>
          </div>
          {!isOnboarding && (
            <button
              id="close-metrics-modal-btn"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#252525] transition-colors cursor-pointer shrink-0"
              aria-label="Close physical profile modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form Body - Scrollable with clear mobile spacing */}
        <form id="physical-profile-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* FEATURE HIGHLIGHT: CURRENT WEIGHT SECTION (Always Top & Prominent) */}
          <div className="p-4 bg-[#1b1b1b] border-2 border-[#00FF66]/50 rounded-2xl space-y-2.5 shadow-[0_0_15px_rgba(0,255,102,0.1)]">
            <div className="flex items-center justify-between">
              <label htmlFor="input-weight" className="text-xs font-bold uppercase tracking-wider text-[#00FF66] font-mono flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>Current Body Weight (Required)</span>
              </label>

              {/* kg / lbs Toggle */}
              <div className="flex rounded-lg bg-[#141414] p-0.5 border border-[#333333] text-xs font-mono">
                <button
                  type="button"
                  id="weight-unit-kg-btn"
                  onClick={() => handleUnitWeightChange('kg')}
                  className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    weightUnit === 'kg' ? 'bg-[#00FF66] text-black font-black shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  id="weight-unit-lbs-btn"
                  onClick={() => handleUnitWeightChange('lbs')}
                  className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    weightUnit === 'lbs' ? 'bg-[#00FF66] text-black font-black shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  lbs
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="input-weight"
                name="weight"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={weightUnit === 'kg' ? 30 : 66}
                max={weightUnit === 'kg' ? 250 : 550}
                value={weight || ''}
                onChange={(e) => setWeight(Number(e.target.value))}
                required
                className="w-full px-4 py-3 bg-[#141414] border border-[#383838] focus:border-[#00FF66] rounded-xl text-white font-mono font-black text-xl sm:text-2xl focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors"
                placeholder={weightUnit === 'kg' ? 'e.g. 75.0' : 'e.g. 165.0'}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#00FF66] font-mono uppercase pointer-events-none">
                {weightUnit}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Calibrates protein (2.0g/kg) and daily metabolic burn</span>
              <span className="font-mono text-[#00FF66] font-bold">
                {weight > 0 ? `${weight} ${weightUnit}` : 'Set weight'}
              </span>
            </div>
          </div>

          {/* HEIGHT SECTION */}
          <div className="p-4 bg-[#1a1a1a] border border-[#2b2b2b] rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Stature (Height)
              </label>
              <div className="flex rounded-lg bg-[#141414] p-0.5 border border-[#333333] text-xs font-mono">
                <button
                  type="button"
                  id="height-unit-cm-btn"
                  onClick={() => handleUnitHeightChange('cm')}
                  className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    heightUnit === 'cm' ? 'bg-[#00FF66] text-black font-black shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  id="height-unit-ft-btn"
                  onClick={() => handleUnitHeightChange('ft')}
                  className={`px-3 py-1 rounded-md font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    heightUnit === 'ft' ? 'bg-[#00FF66] text-black font-black shadow-xs' : 'text-slate-400 hover:text-white'
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
                  name="heightCm"
                  type="number"
                  inputMode="numeric"
                  min={100}
                  max={240}
                  value={heightCm || ''}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 bg-[#141414] border border-[#383838] focus:border-[#00FF66] rounded-xl text-white font-mono font-bold text-lg focus:outline-none focus:ring-1 focus:ring-[#00FF66] transition-colors"
                  placeholder="178"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono font-bold pointer-events-none">
                  cm
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <div className="relative">
                  <input
                    id="input-height-ft"
                    name="heightFeet"
                    type="number"
                    inputMode="numeric"
                    min={3}
                    max={7}
                    value={heightFeet || ''}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-3 bg-[#141414] border border-[#383838] focus:border-[#00FF66] rounded-xl text-white font-mono font-bold text-lg focus:outline-none"
                    placeholder="5"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono font-bold pointer-events-none">ft</span>
                </div>
                <div className="relative">
                  <input
                    id="input-height-in"
                    name="heightInches"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={11}
                    value={heightInches !== undefined ? heightInches : ''}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-3 bg-[#141414] border border-[#383838] focus:border-[#00FF66] rounded-xl text-white font-mono font-bold text-lg focus:outline-none"
                    placeholder="10"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono font-bold pointer-events-none">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick BMI Preview & Deep-Dive Link */}
          {(() => {
            const currentWeightKg = weightUnit === 'lbs' ? weight * 0.45359237 : weight;
            const currentHeightCm = heightUnit === 'ft' ? (heightFeet * 12 + heightInches) * 2.54 : heightCm;
            const currentBmiVal = Number((currentWeightKg / Math.pow(Math.max(0.5, currentHeightCm / 100), 2)).toFixed(1));
            const isNormal = currentBmiVal >= 18.5 && currentBmiVal <= 24.9;
            return (
              <div className="flex items-center justify-between p-2.5 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl text-xs">
                <div className="flex items-center gap-2 font-mono">
                  <Scale className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
                  <span className="text-slate-400 font-medium">Current BMI:</span>
                  <span className="font-bold text-white">{currentBmiVal} kg/m²</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isNormal 
                      ? 'bg-[#14281a] text-[#00FF66] border-[#00FF66]/30' 
                      : currentBmiVal < 18.5 
                      ? 'bg-sky-950/60 text-sky-400 border-sky-600/30' 
                      : 'bg-amber-950/60 text-amber-400 border-amber-600/30'
                  }`}>
                    {isNormal ? 'Normal' : currentBmiVal < 18.5 ? 'Underweight' : 'Overweight'}
                  </span>
                </div>
                {onOpenBmi && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenBmi();
                    }}
                    className="text-[#00FF66] hover:text-[#00e65c] font-bold flex items-center gap-1 cursor-pointer transition-colors font-mono"
                  >
                    <span>Check Full BMI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })()}

          {/* Age and Sex Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-1.5">
              <label htmlFor="input-age" className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
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
                className="w-full px-3.5 py-2.5 bg-[#1f1f1f] border border-[#333333] rounded-xl text-white font-mono font-bold focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] text-sm"
                placeholder="26"
              />
            </div>

            {/* Sex (for Mifflin-St Jeor accuracy) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Biological Sex <span className="text-[10px] text-slate-500 lowercase font-normal">(for BMR)</span>
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <button
                  type="button"
                  id="gender-male-btn"
                  onClick={() => setGender('male')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'border-[#00FF66] bg-[#14281a] text-[#00FF66] ring-1 ring-[#00FF66] font-black'
                      : 'border-[#333333] bg-[#1a1a1a] text-slate-400 hover:border-[#444444] hover:bg-[#222222]'
                  }`}
                >
                  {gender === 'male' && <Check className="w-3.5 h-3.5 text-[#00FF66]" />}
                  Male
                </button>
                <button
                  type="button"
                  id="gender-female-btn"
                  onClick={() => setGender('female')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'border-[#00FF66] bg-[#14281a] text-[#00FF66] ring-1 ring-[#00FF66] font-black'
                      : 'border-[#333333] bg-[#1a1a1a] text-slate-400 hover:border-[#444444] hover:bg-[#222222]'
                  }`}
                >
                  {gender === 'female' && <Check className="w-3.5 h-3.5 text-[#00FF66]" />}
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Daily Workout Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                <Activity className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>Daily Workout Duration</span>
              </label>
              <span className="text-xs font-mono font-bold text-[#00FF66] bg-[#14281a] px-2 py-0.5 rounded-full border border-[#00FF66]/30">
                {workoutDuration >= 60 ? `${workoutDuration / 60} Hour${workoutDuration > 60 ? 's' : ''}` : `${workoutDuration} Mins`}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
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
                        ? 'border-[#00FF66] bg-[#14281a] text-white shadow-[0_0_10px_rgba(0,255,102,0.2)] ring-1 ring-[#00FF66]'
                        : 'border-[#2d2d2d] bg-[#1a1a1a] text-slate-400 hover:border-[#3a3a3a] hover:bg-[#202020]'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{opt.label}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 leading-tight mt-0.5 font-medium">
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nutrition Goal */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
              <Target className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Nutrition & Caloric Target Goal</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                id="goal-maintenance-btn"
                onClick={() => setGoal('maintenance')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  goal === 'maintenance'
                    ? 'border-[#00FF66] bg-[#14281a] text-white shadow-[0_0_10px_rgba(0,255,102,0.2)] ring-1 ring-[#00FF66]'
                    : 'border-[#2d2d2d] bg-[#1a1a1a] text-slate-400 hover:border-[#3a3a3a] hover:bg-[#202020]'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-1 font-heading">
                  Healthy Maintenance
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  100% TDEE • Sustainable energy & muscle retention
                </div>
              </button>

              <button
                type="button"
                id="goal-deficit-btn"
                onClick={() => setGoal('gentle_deficit')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  goal === 'gentle_deficit'
                    ? 'border-[#FF5500] bg-[#2a1710] text-white shadow-[0_0_10px_rgba(255,85,0,0.25)] ring-1 ring-[#FF5500]'
                    : 'border-[#2d2d2d] bg-[#1a1a1a] text-slate-400 hover:border-[#3a3a3a] hover:bg-[#202020]'
                }`}
              >
                <div className="text-xs font-bold text-[#FF5500] flex items-center gap-1 font-heading">
                  Gentle Fat Loss
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  -300 kcal deficit • Non-restrictive, protects muscle
                </div>
              </button>

              <button
                type="button"
                id="goal-surplus-btn"
                onClick={() => setGoal('muscle_gain')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  goal === 'muscle_gain'
                    ? 'border-[#00FF66] bg-[#14281a] text-white shadow-[0_0_10px_rgba(0,255,102,0.2)] ring-1 ring-[#00FF66]'
                    : 'border-[#2d2d2d] bg-[#1a1a1a] text-slate-400 hover:border-[#3a3a3a] hover:bg-[#202020]'
                }`}
              >
                <div className="text-xs font-bold text-[#00FF66] flex items-center gap-1 font-heading">
                  Lean Muscle Gain
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  +250 kcal surplus • Fuels progressive overload
                </div>
              </button>
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
              <Flame className="w-3.5 h-3.5 text-[#FF5500]" />
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
                      ? 'border-[#00FF66] bg-[#14281a] text-[#00FF66] ring-1 ring-[#00FF66] font-bold'
                      : 'border-[#2d2d2d] bg-[#1a1a1a] text-slate-400 hover:border-[#3a3a3a] hover:bg-[#202020]'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{act.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{act.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit / Save button */}
          <div className="pt-3 border-t border-[#282828] flex items-center justify-end gap-3">
            {!isOnboarding && (
              <button
                type="button"
                id="cancel-metrics-btn"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white rounded-xl hover:bg-[#252525] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              id="save-metrics-submit-btn"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#00FF66] hover:bg-[#00e65c] text-black font-black uppercase tracking-wider rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,102,0.4)] transition-all cursor-pointer"
            >
              <span>{isOnboarding ? 'Generate Plan in a Blink' : 'Update Plan & Recalculate'}</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
