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
  ShieldCheck 
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
      badge: 'Light & Sustainable (Default)',
    },
    gentle_deficit: {
      title: 'Gentle Fat Loss',
      desc: 'Controlled ~300 kcal deficit. Promotes gradual fat oxidation without hunger spikes or muscle breakdown.',
      badge: 'Gradual Fat Loss',
    },
    muscle_gain: {
      title: 'Lean Muscle Gain',
      desc: 'Clean +250 kcal surplus. Supplies glycogen and amino pool for myofibrillar hypertrophy.',
      badge: 'Hypertrophy Surplus',
    },
  };

  return (
    <section id="nutrition-diet-section" className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col space-y-5 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xs font-bold text-lime-800 uppercase tracking-widest">
              Personalized Nutrition & Macro Calculator
            </h2>
            <span className="text-[10px] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700 uppercase font-bold tracking-wider">
              Mifflin-St Jeor Engine
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Clinical metabolic formula personalized to your current weight, height, age, and workout schedule.
          </p>
        </div>

        {/* View Switcher Tabs in Bento Pill */}
        <div className="flex rounded-full bg-slate-100 p-1 border border-slate-200 text-xs self-start sm:self-center">
          <button
            id="nutrition-tab-targets"
            onClick={() => setActiveTab('targets')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'targets' 
                ? 'bg-white text-slate-950 font-black shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Targets
          </button>
          <button
            id="nutrition-tab-meals"
            onClick={() => setActiveTab('meals')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'meals' 
                ? 'bg-white text-slate-950 font-black shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Meals
          </button>
          <button
            id="nutrition-tab-foods"
            onClick={() => setActiveTab('foods')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'foods' 
                ? 'bg-white text-slate-950 font-black shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foods
          </button>
        </div>
      </div>

      {/* Goal Strategy Quick-Bar */}
      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
              Caloric Strategy:
            </span>
            <span className="text-xs font-bold text-lime-800 bg-lime-100 px-2.5 py-0.5 rounded-full border border-lime-300 uppercase">
              {goalDescriptions[profile.goal].badge}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
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
                    ? 'border-lime-500 bg-white shadow-xs ring-1 ring-lime-400'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black uppercase tracking-tight ${isSel ? 'text-lime-800' : 'text-slate-900'}`}>
                    {goalDescriptions[g].title}
                  </span>
                  {isSel && <Check className="w-4 h-4 text-lime-700" />}
                </div>
                <p className="text-[11px] text-slate-600 mt-1.5 leading-snug font-medium">
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
            {/* Total Daily Calories */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 relative overflow-hidden flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span className="font-bold uppercase tracking-widest text-lime-800">Total Calories</span>
                  <Flame className="w-4 h-4 text-lime-600" />
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-950 tracking-tight">
                  {macros.targetCalories.toLocaleString()}
                  <span className="text-xs font-bold text-slate-500 ml-1 uppercase">kcal</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Basal Rate (BMR):</span>
                  <span className="font-mono text-slate-900 font-bold">{macros.bmr} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Burn (TDEE):</span>
                  <span className="font-mono text-slate-900 font-bold">{macros.tdee} kcal</span>
                </div>
              </div>
            </div>

            {/* Protein Target */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 relative flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span className="font-bold uppercase tracking-widest text-slate-900">Protein</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-300 font-mono">
                    {macros.proteinPct}%
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-950 tracking-tight">
                  {macros.proteinGrams}
                  <span className="text-xs font-bold text-slate-500 ml-1 uppercase">grams</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1 font-medium">
                  ~{macros.proteinGrams * 4} kcal • Lean muscle repair
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                Target: <span className="text-lime-800 font-bold">2.0g per kg</span> bodyweight for optimal synthesis.
              </div>
            </div>

            {/* Carbohydrates Target */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 relative flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span className="font-bold uppercase tracking-widest text-slate-900">Carbohydrates</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 font-mono">
                    {macros.carbPct}%
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-950 tracking-tight">
                  {macros.carbGrams}
                  <span className="text-xs font-bold text-slate-500 ml-1 uppercase">grams</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1 font-medium">
                  ~{macros.carbGrams * 4} kcal • Glycogen & stamina
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                Primary ATP fuel for intense training and CNS recovery.
              </div>
            </div>

            {/* Fats Target */}
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 relative flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                  <span className="font-bold uppercase tracking-widest text-slate-900">Healthy Fats</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-mono">
                    {macros.fatPct}%
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-slate-950 tracking-tight">
                  {macros.fatGrams}
                  <span className="text-xs font-bold text-slate-500 ml-1 uppercase">grams</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1 font-medium">
                  ~{macros.fatGrams * 9} kcal • Hormones & joints
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                Essential fatty acids for hormone synthesis and cell integrity.
              </div>
            </div>
          </div>

          {/* Visual Macro Proportion Bar */}
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-widest text-lime-800">Macro Caloric Split</span>
              <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-lime-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-500" />
                  Protein ({macros.proteinPct}%)
                </span>
                <span className="flex items-center gap-1.5 text-cyan-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  Carbs ({macros.carbPct}%)
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Fats ({macros.fatPct}%)
                </span>
              </div>
            </div>

            {/* Split Bar */}
            <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-200 p-0.5 border border-slate-300">
              <div 
                className="bg-lime-500 h-full rounded-l-full transition-all duration-500"
                style={{ width: `${macros.proteinPct}%` }}
                title={`Protein: ${macros.proteinPct}%`}
              />
              <div 
                className="bg-cyan-500 h-full transition-all duration-500"
                style={{ width: `${macros.carbPct}%` }}
                title={`Carbs: ${macros.carbPct}%`}
              />
              <div 
                className="bg-amber-500 h-full rounded-r-full transition-all duration-500"
                style={{ width: `${macros.fatPct}%` }}
                title={`Fats: ${macros.fatPct}%`}
              />
            </div>
          </div>

          {/* Hydration & Scientific Equation Breakdown Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Water Target */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Daily Water Target</div>
                <div className="text-lg font-mono font-bold text-slate-950 flex items-baseline gap-1">
                  <span>{macros.waterLiters} Liters</span>
                  <span className="text-xs text-slate-500 font-normal">(~{Math.round(macros.waterLiters * 4.2)} glasses)</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Calculated at 35ml/kg baseline + 500ml workout hydration compensation.
                </p>
              </div>
            </div>

            {/* Equation Explainer */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime-100 border border-lime-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-lime-700" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Mifflin-St Jeor Formula</div>
                <div className="text-xs font-mono font-bold text-slate-950 mt-0.5">
                  10×W(kg) + 6.25×H(cm) - 5×Age ± Sex
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
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
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-lime-800 uppercase tracking-wider">
                      Meal 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {meal.timeAdvice}
                    </span>
                  </div>
                  <h4 className="text-base font-bold uppercase italic text-slate-950 mt-0.5">
                    {meal.name}
                  </h4>
                </div>

                {/* Macro Pill Row */}
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-white border border-slate-200 text-center font-mono shadow-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Calories</div>
                    <div className="text-xs font-bold text-slate-900">{meal.calories}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-lime-700 font-bold uppercase">Protein</div>
                    <div className="text-xs font-bold text-lime-800">{meal.protein}g</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-cyan-600 font-bold uppercase">Carbs</div>
                    <div className="text-xs font-bold text-cyan-700">{meal.carbs}g</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-600 font-bold uppercase">Fats</div>
                    <div className="text-xs font-bold text-amber-700">{meal.fats}g</div>
                  </div>
                </div>

                {/* Sample Meal Options */}
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Recommended Food Combinations:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {meal.sampleFoods.map((food, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0" />
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
          {/* High Protein Sources */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-lime-800">
              <span className="p-1.5 rounded-lg bg-lime-100 border border-lime-200">
                <Utensils className="w-4 h-4 text-lime-700" />
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">Lean Protein Sources</h4>
            </div>
            <p className="text-xs text-slate-600">
              High biological value with full essential amino acid profiles for lean muscle repair.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Chicken & Turkey Breast</span>
                <span className="text-lime-800 font-mono font-bold">31g / 100g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Egg Whites & Whole Eggs</span>
                <span className="text-lime-800 font-mono font-bold">13g / 100g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Wild Salmon / Tuna</span>
                <span className="text-lime-800 font-mono font-bold">25g / 100g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Plain Greek Yogurt</span>
                <span className="text-lime-800 font-mono font-bold">17g / 170g</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Whey / Plant Isolate</span>
                <span className="text-lime-800 font-mono font-bold">24g / scoop</span>
              </li>
            </ul>
          </div>

          {/* Clean Complex Carbs */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-cyan-700">
              <span className="p-1.5 rounded-lg bg-cyan-100 border border-cyan-200">
                <Sparkles className="w-4 h-4 text-cyan-600" />
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">Complex Energy Carbs</h4>
            </div>
            <p className="text-xs text-slate-600">
              Low-glycemic slow-digesting fuel to maintain steady blood glucose during training.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Rolled Oats & Steel Cut</span>
                <span className="text-cyan-700 font-mono font-bold">Slow Digesting</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Sweet Potatoes & Yams</span>
                <span className="text-cyan-700 font-mono font-bold">High Potassium</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Jasmine / Basmati Rice</span>
                <span className="text-cyan-700 font-mono font-bold">Post-Workout</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Tri-Color Quinoa</span>
                <span className="text-cyan-700 font-mono font-bold">Fiber & Iron</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Blueberries & Bananas</span>
                <span className="text-cyan-700 font-mono font-bold">Glycogen</span>
              </li>
            </ul>
          </div>

          {/* Healthy Fats */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-700">
              <span className="p-1.5 rounded-lg bg-amber-100 border border-amber-200">
                <Flame className="w-4 h-4 text-amber-600" />
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">Essential Healthy Fats</h4>
            </div>
            <p className="text-xs text-slate-600">
              Monounsaturated and omega-3 fatty acids for joint fluid balance and cell health.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Extra Virgin Olive Oil</span>
                <span className="text-amber-700 font-mono font-bold">Polyphenols</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Whole Hass Avocados</span>
                <span className="text-amber-700 font-mono font-bold">High Fiber</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Raw Almonds & Walnuts</span>
                <span className="text-amber-700 font-mono font-bold">Omega-3 ALA</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Chia & Flax Seeds</span>
                <span className="text-amber-700 font-mono font-bold">Anti-Inflammatory</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between shadow-xs">
                <span>Natural Peanut Butter</span>
                <span className="text-amber-700 font-mono font-bold">Caloric Fuel</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

