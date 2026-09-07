import React, { useState, useMemo } from 'react';
import { 
  X, 
  Scale, 
  Info, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Dumbbell, 
  HeartPulse, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { calculateBMIFromKgCm, BMI_CATEGORIES } from '../utils/bmi';

interface BmiModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdateWeight?: (newWeight: number, unit: 'kg' | 'lbs') => void;
  onOpenVoiceCoach?: () => void;
}

export const BmiModal: React.FC<BmiModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateWeight,
  onOpenVoiceCoach,
}) => {
  // Convert profile to initial values
  const initialWeightKg = useMemo(() => {
    return profile.weightUnit === 'lbs'
      ? Number((profile.weight * 0.45359237).toFixed(1))
      : profile.weight;
  }, [profile.weight, profile.weightUnit]);

  const initialHeightCm = useMemo(() => {
    return profile.heightUnit === 'ft'
      ? Math.round((profile.heightFeet * 12 + profile.heightInches) * 2.54)
      : profile.heightCm;
  }, [profile.heightUnit, profile.heightFeet, profile.heightInches, profile.heightCm]);

  // Local interactive states for the calculator
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(
    profile.weightUnit === 'lbs' ? 'imperial' : 'metric'
  );
  const [weightKg, setWeightKg] = useState<number>(initialWeightKg);
  const [heightCm, setHeightCm] = useState<number>(initialHeightCm);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync with profile if reopened
  React.useEffect(() => {
    if (isOpen) {
      setWeightKg(initialWeightKg);
      setHeightCm(initialHeightCm);
      setUnitSystem(profile.weightUnit === 'lbs' ? 'imperial' : 'metric');
      setHasChanged(false);
      setSaveSuccess(false);
    }
  }, [isOpen, initialWeightKg, initialHeightCm, profile.weightUnit]);

  const result = useMemo(() => {
    return calculateBMIFromKgCm(weightKg, heightCm);
  }, [weightKg, heightCm]);

  if (!isOpen) return null;

  // Imperial conversions for display inputs
  const currentWeightLbs = Number((weightKg * 2.20462).toFixed(1));
  const currentTotalInches = Math.round(heightCm / 2.54);
  const currentFeet = Math.floor(currentTotalInches / 12);
  const currentInches = currentTotalInches % 12;

  const handleWeightChange = (newKg: number) => {
    const clamped = Math.max(30, Math.min(250, Number(newKg.toFixed(1))));
    setWeightKg(clamped);
    setHasChanged(true);
    setSaveSuccess(false);
  };

  const handleHeightChange = (newCm: number) => {
    const clamped = Math.max(100, Math.min(230, Math.round(newCm)));
    setHeightCm(clamped);
    setHasChanged(true);
    setSaveSuccess(false);
  };

  const handleResetToProfile = () => {
    setWeightKg(initialWeightKg);
    setHeightCm(initialHeightCm);
    setHasChanged(false);
    setSaveSuccess(false);
  };

  const handleSaveToProfile = () => {
    if (onUpdateWeight) {
      if (profile.weightUnit === 'lbs') {
        const savedLbs = Math.round(weightKg * 2.20462);
        onUpdateWeight(savedLbs, 'lbs');
      } else {
        onUpdateWeight(Number(weightKg.toFixed(1)), 'kg');
      }
      setSaveSuccess(true);
      setHasChanged(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Calculate position percentage on visual gauge (from BMI 15 to 40)
  const gaugePercent = Math.max(0, Math.min(100, ((result.bmi - 15) / (40 - 15)) * 100));

  return (
    <div 
      id="bmi-modal-overlay" 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="bmi-modal-card"
        className="bg-[#141414] rounded-t-3xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-[#282828] w-full max-w-xl max-h-[92dvh] sm:max-h-[88vh] overflow-hidden flex flex-col my-0 sm:my-auto animate-scaleUp text-slate-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#181818] flex items-start justify-between gap-3 border-b border-[#282828] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00FF66] text-black flex items-center justify-center font-bold shadow-[0_0_12px_rgba(0,255,102,0.4)] shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-white font-heading">
                  BMI Index & Health Status
                </h2>
                <span className="text-[10px] font-mono font-bold text-[#00FF66] bg-[#12281a] border border-[#00FF66]/30 px-2 py-0.5 rounded-full uppercase">
                  WHO Standard
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                Body Mass Index calculation calibrated to your height and weight.
              </p>
            </div>
          </div>
          <button
            id="close-bmi-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 hover:bg-[#222222] rounded-xl transition-colors cursor-pointer shrink-0"
            aria-label="Close BMI modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto overscroll-contain flex-1">
          
          {/* Main BMI Result Display Card */}
          <div className="p-5 rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] transition-all">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Your Calculated BMI
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#00FF66] font-metric drop-shadow-[0_0_10px_rgba(0,255,102,0.3)]">
                    {result.bmi}
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase text-slate-400 font-mono">
                    kg/m²
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-[#00FF66]/40 bg-[#122b19] text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                  {result.category.label}
                </span>
                <p className="text-[11px] font-mono text-slate-400 mt-1.5">
                  Standard Range: {result.category.rangeLabel}
                </p>
              </div>
            </div>

            {/* Visual Color-Coded BMI Scale Bar */}
            <div className="mt-5 pt-3 border-t border-[#2a2a2a]">
              <div className="relative mb-2">
                {/* Gauge Track */}
                <div className="h-3 w-full rounded-full flex overflow-hidden shadow-inner border border-[#333333] bg-[#121212]">
                  {/* Underweight: 15 to 18.5 (14%) */}
                  <div style={{ width: '14%' }} className="bg-sky-500" title="Underweight (<18.5)" />
                  {/* Normal: 18.5 to 25 (26%) */}
                  <div style={{ width: '26%' }} className="bg-[#00FF66]" title="Normal (18.5-24.9)" />
                  {/* Overweight: 25 to 30 (20%) */}
                  <div style={{ width: '20%' }} className="bg-[#FF5500]" title="Overweight (25-29.9)" />
                  {/* Obese I: 30 to 35 (20%) */}
                  <div style={{ width: '20%' }} className="bg-orange-600" title="Obese I (30-34.9)" />
                  {/* Obese II+: 35 to 40 (20%) */}
                  <div style={{ width: '20%' }} className="bg-rose-600" title="Obese II+ (35+)" />
                </div>

                {/* Animated Needle / Arrow */}
                <div 
                  className="absolute -top-1 transition-all duration-300 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${gaugePercent}%` }}
                >
                  <div className="w-2.5 h-2.5 bg-white rotate-45 border-2 border-black shadow-[0_0_6px_white]" />
                </div>
              </div>

              {/* Gauge Legend */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold px-0.5">
                <span>15</span>
                <span className="text-sky-400">18.5</span>
                <span className="text-[#00FF66]">25.0</span>
                <span className="text-[#FF5500]">30.0</span>
                <span className="text-rose-400">35+</span>
              </div>
            </div>

            {/* Assessment description */}
            <div className="mt-4 pt-3 border-t border-[#2a2a2a] text-xs text-slate-300">
              <p className="font-medium">
                {result.category.description}
              </p>
              <p className="mt-1.5 font-bold text-[#00FF66]">
                {result.category.advice}
              </p>
            </div>
          </div>

          {/* Interactive Weight & Height Sliders */}
          <div className="p-4 bg-[#1a1a1a] rounded-2xl border border-[#282828] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#00FF66]" />
                Interactive Values
              </span>
              
              {/* Unit Switcher */}
              <div className="flex items-center bg-[#222222] border border-[#333333] rounded-lg p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    unitSystem === 'metric' ? 'bg-[#00FF66] text-black font-black shadow-[0_0_8px_rgba(0,255,102,0.4)]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  kg / cm
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    unitSystem === 'imperial' ? 'bg-[#00FF66] text-black font-black shadow-[0_0_8px_rgba(0,255,102,0.4)]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  lbs / ft
                </button>
              </div>
            </div>

            {/* Weight Input & Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-300">Body Weight</label>
                <div className="font-mono font-bold text-[#00FF66] text-sm">
                  {unitSystem === 'metric' ? `${weightKg} kg` : `${currentWeightLbs} lbs`}
                </div>
              </div>
              <input
                id="bmi-slider-weight"
                type="range"
                min="35"
                max="180"
                step="0.5"
                value={weightKg}
                onChange={(e) => handleWeightChange(parseFloat(e.target.value))}
                className="w-full accent-[#00FF66] cursor-pointer h-2 bg-[#282828] rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                <span>{unitSystem === 'metric' ? '35 kg' : '77 lbs'}</span>
                <span>{unitSystem === 'metric' ? '180 kg' : '396 lbs'}</span>
              </div>
            </div>

            {/* Height Input & Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-300">Stature (Height)</label>
                <div className="font-mono font-bold text-white text-sm">
                  {unitSystem === 'metric' ? `${heightCm} cm` : `${currentFeet}'${currentInches}"`}
                </div>
              </div>
              <input
                id="bmi-slider-height"
                type="range"
                min="130"
                max="215"
                step="1"
                value={heightCm}
                onChange={(e) => handleHeightChange(parseInt(e.target.value, 10))}
                className="w-full accent-[#00FF66] cursor-pointer h-2 bg-[#282828] rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                <span>{unitSystem === 'metric' ? '130 cm' : `4'3"`}</span>
                <span>{unitSystem === 'metric' ? '215 cm' : `7'1"`}</span>
              </div>
            </div>

            {/* Reset / Sync button */}
            {hasChanged && (
              <div className="flex items-center justify-between pt-2 border-t border-[#2a2a2a]">
                <button
                  type="button"
                  onClick={handleResetToProfile}
                  className="text-xs text-slate-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Profile
                </button>
                {onUpdateWeight && (
                  <button
                    type="button"
                    onClick={handleSaveToProfile}
                    className="text-xs bg-[#00FF66] hover:bg-[#00e65c] text-black font-black px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_12px_rgba(0,255,102,0.4)] active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    Apply {unitSystem === 'metric' ? `${weightKg}kg` : `${currentWeightLbs}lbs`} to Profile
                  </button>
                )}
              </div>
            )}

            {saveSuccess && (
              <div className="p-2 bg-[#122b19] text-[#00FF66] border border-[#00FF66]/40 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                Profile weight updated and macros recalculated!
              </div>
            )}
          </div>

          {/* Healthy Weight Target Window & Delta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#1a1a1a] rounded-2xl border border-[#282828]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Ideal Normal Range (18.5-24.9)
              </span>
              <div className="text-base sm:text-lg font-black font-mono text-white mt-1">
                {unitSystem === 'metric'
                  ? `${result.healthyWeightMinKg} – ${result.healthyWeightMaxKg} kg`
                  : `${result.healthyWeightMinLbs} – ${result.healthyWeightMaxLbs} lbs`}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Standard healthy weight for a stature of {unitSystem === 'metric' ? `${heightCm} cm` : `${currentFeet}'${currentInches}"`}.
              </p>
            </div>

            <div className="p-3.5 bg-[#1a1a1a] rounded-2xl border border-[#282828]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Delta to Normal Range
              </span>
              <div className="text-base sm:text-lg font-black font-mono mt-1 flex items-center gap-1">
                {result.differenceToNormalKg === 0 ? (
                  <span className="text-[#00FF66] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Optimal Zone
                  </span>
                ) : result.differenceToNormalKg > 0 ? (
                  <span className="text-[#FF5500] flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    +{unitSystem === 'metric' ? `${result.differenceToNormalKg} kg` : `${result.differenceToNormalLbs} lbs`}
                  </span>
                ) : (
                  <span className="text-sky-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {unitSystem === 'metric' ? `${result.differenceToNormalKg} kg` : `${result.differenceToNormalLbs} lbs`}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {result.differenceToNormalKg === 0
                  ? 'Currently sitting directly within the standard window.'
                  : result.differenceToNormalKg > 0
                  ? 'Above the standard upper boundary.'
                  : 'Below the standard lower boundary.'}
              </p>
            </div>
          </div>

          {/* Scientific Caveat for Athletes & Lifters */}
          <div className="p-3.5 bg-[#16201a] rounded-2xl border border-[#00FF66]/30 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-[#12281a] text-[#00FF66] flex items-center justify-center shrink-0 mt-0.5 border border-[#00FF66]/30">
              <Dumbbell className="w-3.5 h-3.5 text-[#00FF66]" />
            </div>
            <div className="text-xs text-slate-300">
              <p className="font-bold text-white">
                Resistance Lifters & Athletes Note:
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                BMI only measures weight vs height and <span className="font-semibold text-[#00FF66]">does not differentiate muscle mass from body fat</span>. 
                Athletes with substantial lean hypertrophy often register as &quot;Overweight&quot; while having healthy visceral body fat and blood lipid markers.
              </p>
            </div>
          </div>

          {/* AI Live Voice Coach Prompt if available */}
          {onOpenVoiceCoach && (
            <div 
              onClick={() => {
                onClose();
                onOpenVoiceCoach();
              }}
              className="p-3 bg-[#1e1e1e] hover:bg-[#252525] border border-[#2f2f2f] hover:border-[#00FF66]/50 text-white rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-colors shadow-sm group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00FF66] text-black flex items-center justify-center font-bold shrink-0 shadow-[0_0_8px_rgba(0,255,102,0.4)]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">
                    Discuss Body Composition with Voice Coach
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Ask Coach Zephyr how your BMI affects your macro surplus/deficit in English or Hindi.
                  </p>
                </div>
              </div>
              <div className="text-[#00FF66] group-hover:translate-x-0.5 transition-transform shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#181818] border-t border-[#282828] flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-400">
            BMI Prime: <span className="font-bold text-[#00FF66]">{result.prime}</span> • Ponderal: <span className="font-bold text-white">{result.ponderalIndex}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#222222] hover:bg-[#2c2c2c] border border-[#333333] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
