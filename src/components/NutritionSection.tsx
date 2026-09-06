import React, { useState } from 'react';
import { 
  Apple, 
  Flame, 
  Scale, 
  Droplets, 
  Info, 
  ChevronRight, 
  Sparkles, 
  Utensils, 
  Check, 
  TrendingUp, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { UserProfile, MacroTargets, Goal } from '../types';
import { calculateMacros, getMealDistribution } from '../utils/nutrition';

interface NutritionSectionProps {
  profile: UserProfile;
  onUpdateGoal: (goal: Goal) => void;
}

export const NutritionSection: React.FC<NutritionSectionProps> = ({
  profile,
  onUpdateGoal,
}) => {
  const [activeTab, setActiveTab] = useState<'targets' | 'meals' | 'foods'>('targets');
  const macros: MacroTargets = calculateMacros(profile);
  const meals = getMealDistribution(macros);

  const goalDescriptions: { [key in Goal]: { title: string; desc: string; badge: string } } = {
    maintenance: {
      title: 'Healthy Maintenance',
      desc: '100% of TDEE. Fuels peak athletic output, protects hormones, and sustains lean tissue.',
      badge: 'Peak Energy Protocol',
    },
    gentle_deficit: {
      title: 'Active Fat Shred',
      desc: 'Controlled ~300 kcal burn deficit. Accelerates fat oxidation while preserving lean mass.',
      badge: 'Calorie Burn Deficit',
    },
    muscle_gain: {
      title: 'Hypertrophy Surplus',
      desc: 'Clean +250 kcal surplus. Supplies amino acids & glycogen for maximum muscle hypertrophy.',
      badge: 'Anabolic Surplus Milestone',
    },
  };

  return (
    <section id="nutrition-diet-section" className="bg-[#161616] border border-[#282828] rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] text-slate-100">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#262626] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xs font-mono font-black text-[#FF5500] uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
              Diet Milestones & Macro Targets
            </h2>
            <span className="text-[10px] bg-[#222222] border border-[#333333] px-2.5 py-1 rounded-md text-slate-300 uppercase font-bold tracking-wider">
              Mifflin-St Jeor Clinical
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Clinical metabolic formula personalized to your current weight, height, age, and workout schedule.
          </p>
        </div>

        {/* View Switcher Tabs in Angular Bento Pill */}
        <div className="flex rounded-xl bg-[#1e1e1e] p-1 border border-[#2e2e2e] text-xs self-start sm:self-center">
          <button
            id="nutrition-tab-targets"
            onClick={() => setActiveTab('targets')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'targets' 
                ? 'bg-[#FF5500] text-white font-black shadow-[0_0_12px_rgba(255,85,0,0.4)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Targets
          </button>
          <button
            id="nutrition-tab-meals"
            onClick={() => setActiveTab('meals')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'meals' 
                ? 'bg-[#FF5500] text-white font-black shadow-[0_0_12px_rgba(255,85,0,0.4)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Meals
          </button>
          <button
            id="nutrition-tab-foods"
            onClick={() => setActiveTab('foods')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'foods' 
                ? 'bg-[#FF5500] text-white font-black shadow-[0_0_12px_rgba(255,85,0,0.4)]' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Foods
          </button>
        </div>
      </div>

      {/* Goal Strategy Quick-Bar */}
      <div className="p-4 bg-[#1a1a1a] rounded-2xl border border-[#2b2b2b]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Caloric Strategy:
            </span>
            <span className="text-xs font-bold text-[#FF5500] bg-[#291710] px-2.5 py-0.5 rounded-full border border-[#FF5500]/30 uppercase font-mono">
              {goalDescriptions[profile.goal].badge}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Select goal to re-calculate targets
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(['maintenance', 'gentle_deficit', 'muscle_gain'] as Goal[]).map((g) => {
            const isSel = profile.goal === g;
            return (
              <button
                key={g}
                id={`diet-goal-btn-${g}`}
                onClick={() => onUpdateGoal(g)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSel
                    ? 'border-[#FF5500] bg-[#221712] shadow-[0_0_15px_rgba(255,85,0,0.2)] ring-1 ring-[#FF5500]'
                    : 'border-[#2e2e2e] bg-[#1e1e1e] text-slate-300 hover:bg-[#252525] hover:border-[#3a3a3a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black uppercase tracking-tight font-heading ${isSel ? 'text-[#FF5500]' : 'text-white'}`}>
                    {goalDescriptions[g].title}
                  </span>
                  {isSel && <Check className="w-4 h-4 text-[#FF5500]" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-snug font-medium">
                  {goalDescriptions[g].desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'targets' && (
        <div className="space-y-4">
          {/* Main Calorie & Macro Target Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
            {/* Total Daily Calories with Electric Orange Burn & Glow */}
            <div className="p-5 rounded-2xl bg-[#1c1815] border border-[#FF5500]/50 relative overflow-hidden flex flex-col justify-between shadow-[0_0_20px_rgba(255,85,0,0.15)]">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold uppercase tracking-widest text-[#FF5500]">Target Calories</span>
                  <Flame className="w-4 h-4 text-[#FF5500]" />
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#FF5500] tracking-tight font-metric">
                  {macros.targetCalories.toLocaleString()}
                  <span className="text-xs font-bold text-slate-400 ml-1 uppercase">kcal</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#33221b] text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Basal Rate (BMR):</span>
                  <span className="font-mono text-white font-bold">{macros.bmr} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Burn (TDEE):</span>
                  <span className="font-mono text-[#FF5500] font-bold">{macros.tdee} kcal</span>
                </div>
              </div>
            </div>

            {/* Protein Target (Neon Safety Green) */}
            <div className="p-5 rounded-2xl bg-[#16201a] border border-[#00FF66]/40 relative flex flex-col justify-between hover:border-[#00FF66] transition-colors shadow-[0_0_15px_rgba(0,255,102,0.1)]">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                  <span className="font-bold uppercase tracking-widest text-white">Protein Target</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#122b19] text-[#00FF66] border border-[#00FF66]/40 font-mono">
                    {macros.proteinPct}%
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#00FF66] tracking-tight font-metric">
                  {macros.proteinGrams}
                  <span className="text-xs font-bold text-slate-400 ml-1 uppercase">grams</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  ~{macros.proteinGrams * 4} kcal • Lean muscle repair
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#233527] text-[11px] text-slate-300">
                Target: <span className="text-[#00FF66] font-bold">2.0g per kg</span> bodyweight for optimal synthesis.
              </div>
            </div>

            {/* Carbohydrates Target */}
            <div className="p-5 rounded-2xl bg-[#181818] border border-[#2e2e2e] relative flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold uppercase tracking-widest text-slate-200">Carbohydrates</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1e2a33] text-cyan-400 border border-cyan-500/30 font-mono">
                    {macros.carbPct}%
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight font-metric">
                  {macros.carbGrams}
                  <span className="text-xs font-bold text-slate-400 ml-1 uppercase">grams</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  ~{macros.carbGrams * 4} kcal • Glycogen & stamina
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#282828] text-[11px] text-slate-400">
                Primary ATP fuel for intense training and CNS recovery.
              </div>
            </div>

            {/* Fats Target */}
            <div className="p-5 rounded-2xl bg-[#181818] border border-[#2e2e2e] relative flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold uppercase tracking-widest text-slate-200">Healthy Fats</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#2b2416] text-amber-400 border border-amber-500/30 font-mono">
                    {macros.fatPct}%
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight font-metric">
                  {macros.fatGrams}
                  <span className="text-xs font-bold text-slate-400 ml-1 uppercase">grams</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  ~{macros.fatGrams * 9} kcal • Hormones & joints
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#282828] text-[11px] text-slate-400">
                Essential fatty acids for hormone synthesis and cell integrity.
              </div>
            </div>
          </div>

          {/* Visual Macro Proportion Bar */}
          <div className="p-4 bg-[#1a1a1a] rounded-2xl border border-[#2b2b2b] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-widest text-slate-300 font-mono">Macro Caloric Split</span>
              <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider font-mono">
                <span className="flex items-center gap-1.5 text-[#00FF66]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] shadow-[0_0_6px_#00FF66]" />
                  Protein ({macros.proteinPct}%)
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Carbs ({macros.carbPct}%)
                </span>
                <span className="flex items-center gap-1.5 text-[#FF5500]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] shadow-[0_0_6px_#FF5500]" />
                  Fats ({macros.fatPct}%)
                </span>
              </div>
            </div>

            {/* Split Bar */}
            <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-[#121212] p-0.5 border border-[#333333]">
              <div 
                className="bg-[#00FF66] h-full rounded-l-full transition-all duration-500 shadow-[0_0_8px_#00FF66]"
                style={{ width: `${macros.proteinPct}%` }}
                title={`Protein: ${macros.proteinPct}%`}
              />
              <div 
                className="bg-cyan-500 h-full transition-all duration-500"
                style={{ width: `${macros.carbPct}%` }}
                title={`Carbs: ${macros.carbPct}%`}
              />
              <div 
                className="bg-[#FF5500] h-full rounded-r-full transition-all duration-500 shadow-[0_0_8px_#FF5500]"
                style={{ width: `${macros.fatPct}%` }}
                title={`Fats: ${macros.fatPct}%`}
              />
            </div>
          </div>

          {/* Hydration & Scientific Equation Breakdown Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Water Target */}
            <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2b2b2b] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#162733] border border-cyan-500/40 flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Water Target</div>
                <div className="text-lg font-mono font-bold text-white flex items-baseline gap-1">
                  <span className="text-cyan-400">{macros.waterLiters} Liters</span>
                  <span className="text-xs text-slate-400 font-normal">(~{Math.round(macros.waterLiters * 4.2)} glasses)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Calculated at 35ml/kg baseline + 500ml workout hydration compensation.
                </p>
              </div>
            </div>

            {/* Equation Explainer */}
            <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2b2b2b] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#16281b] border border-[#00FF66]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#00FF66]" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Mifflin-St Jeor Formula</div>
                <div className="text-xs font-mono font-bold text-[#00FF66] mt-0.5">
                  10×W(kg) + 6.25×H(cm) - 5×Age ± Sex
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Clinical gold-standard equation for precise metabolic expenditure prediction.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Meal Breakdown */}
      {activeTab === 'meals' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {meals.map((meal, idx) => (
              <div 
                key={meal.name}
                className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2b2b2b] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-wider">
                      Meal 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {meal.timeAdvice}
                    </span>
                  </div>
                  <h4 className="text-base font-bold uppercase italic text-white mt-0.5 font-heading">
                    {meal.name}
                  </h4>
                </div>

                {/* Macro Pill Row */}
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-[#222222] border border-[#333333] text-center font-mono shadow-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Calories</div>
                    <div className="text-xs font-bold text-[#FF5500]">{meal.calories}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Protein</div>
                    <div className="text-xs font-bold text-[#00FF66]">{meal.protein}g</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Carbs</div>
                    <div className="text-xs font-bold text-slate-100">{meal.carbs}g</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Fats</div>
                    <div className="text-xs font-bold text-amber-400">{meal.fats}g</div>
                  </div>
                </div>

                {/* Sample Meal Options */}
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Recommended Food Combinations:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {meal.sampleFoods.map((food, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shrink-0" />
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Food Sources */}
      {activeTab === 'foods' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* High Protein Sources (Neon Green) */}
          <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2b2b2b] space-y-3">
            <div className="flex items-center gap-2 text-[#00FF66]">
              <span className="p-1.5 rounded-lg bg-[#14281a] border border-[#00FF66]/30">
                <Utensils className="w-4 h-4 text-[#00FF66]" />
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">Lean Protein Sources</h4>
            </div>
            <p className="text-xs text-slate-400">
              High biological value with full essential amino acid profiles for lean muscle repair.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Chicken & Turkey Breast</span>
                <span className="text-[#00FF66] font-mono font-bold">31g / 100g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Egg Whites & Whole Eggs</span>
                <span className="text-[#00FF66] font-mono font-bold">13g / 100g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Wild Salmon / Tuna</span>
                <span className="text-[#00FF66] font-mono font-bold">25g / 100g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Plain Greek Yogurt</span>
                <span className="text-[#00FF66] font-mono font-bold">17g / 170g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Whey / Plant Isolate</span>
                <span className="text-[#00FF66] font-mono font-bold">24g / scoop</span>
              </li>
            </ul>
          </div>

          {/* Clean Complex Carbs */}
          <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2b2b2b] space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="p-1.5 rounded-lg bg-[#162733] border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">Complex Energy Carbs</h4>
            </div>
            <p className="text-xs text-slate-400">
              Low-glycemic slow-digesting fuel to maintain steady blood glucose during training.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Rolled Oats & Steel Cut</span>
                <span className="text-cyan-400 font-mono font-bold">Slow Digesting</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Sweet Potatoes & Yams</span>
                <span className="text-cyan-400 font-mono font-bold">High Potassium</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Jasmine / Basmati Rice</span>
                <span className="text-cyan-400 font-mono font-bold">Post-Workout</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Tri-Color Quinoa</span>
                <span className="text-cyan-400 font-mono font-bold">Fiber & Iron</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Blueberries & Bananas</span>
                <span className="text-cyan-400 font-mono font-bold">Glycogen</span>
              </li>
            </ul>
          </div>

          {/* Healthy Fats (Electric Orange) */}
          <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#2b2b2b] space-y-3">
            <div className="flex items-center gap-2 text-[#FF5500]">
              <span className="p-1.5 rounded-lg bg-[#2b1710] border border-[#FF5500]/30">
                <Flame className="w-4 h-4 text-[#FF5500]" />
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">Essential Healthy Fats</h4>
            </div>
            <p className="text-xs text-slate-400">
              Monounsaturated and omega-3 fatty acids for joint fluid balance and cell health.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Extra Virgin Olive Oil</span>
                <span className="text-[#FF5500] font-mono font-bold">Polyphenols</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Whole Hass Avocados</span>
                <span className="text-[#FF5500] font-mono font-bold">High Fiber</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Raw Almonds & Walnuts</span>
                <span className="text-[#FF5500] font-mono font-bold">Omega-3 ALA</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Chia & Flax Seeds</span>
                <span className="text-[#FF5500] font-mono font-bold">Anti-Inflammatory</span>
              </li>
              <li className="p-2.5 rounded-xl bg-[#222222] border border-[#333333] flex justify-between">
                <span>Natural Peanut Butter</span>
                <span className="text-[#FF5500] font-mono font-bold">Caloric Fuel</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
