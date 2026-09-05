import { UserProfile, MacroTargets, MealSlot } from '../types';

export function calculateMacros(profile: UserProfile): MacroTargets {
  // 1. Convert weight to kg
  const weightKg = profile.weightUnit === 'lbs' 
    ? profile.weight * 0.45359237 
    : profile.weight;

  // 2. Convert height to cm
  const heightCm = profile.heightUnit === 'ft' 
    ? (profile.heightFeet * 12 + profile.heightInches) * 2.54 
    : profile.heightCm;

  const age = Math.max(15, Math.min(100, profile.age || 26));

  // 3. Mifflin-St Jeor BMR Equation
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (profile.gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  bmr = Math.round(bmr);

  // 4. Activity Multiplier
  let activityMultiplier = 1.55; // Default moderate activity (fits 7-day routine)
  if (profile.activityLevel === 'light') activityMultiplier = 1.375;
  if (profile.activityLevel === 'very_active') activityMultiplier = 1.725;

  const tdee = Math.round(bmr * activityMultiplier);

  // 5. Target calories by goal
  let targetCalories = tdee;
  if (profile.goal === 'gentle_deficit') {
    // Light, sustainable calorie deficit (approx -300 kcal/day)
    targetCalories = Math.max(1200, Math.round(tdee - 300));
  } else if (profile.goal === 'muscle_gain') {
    // Lean surplus (+250 kcal/day)
    targetCalories = Math.round(tdee + 250);
  }

  // 6. Protein Target (~1.8 - 2.0g per kg of bodyweight)
  let proteinPerKg = 2.0;
  if (profile.goal === 'gentle_deficit') proteinPerKg = 2.1; // protect lean mass during deficit
  if (profile.goal === 'maintenance') proteinPerKg = 1.9;

  let proteinGrams = Math.round(weightKg * proteinPerKg);
  // Guard against extreme thresholds
  proteinGrams = Math.max(60, Math.min(proteinGrams, Math.round(targetCalories * 0.40 / 4)));

  // 7. Fats Target (25% - 28% of target calories for healthy hormonal balance)
  const fatCalories = targetCalories * 0.27;
  const fatGrams = Math.max(35, Math.round(fatCalories / 9));

  // 8. Carbohydrates Target (Remaining calories)
  const remainingCaloriesForCarbs = Math.max(0, targetCalories - (proteinGrams * 4) - (fatGrams * 9));
  const carbGrams = Math.max(40, Math.round(remainingCaloriesForCarbs / 4));

  // Calculate actual percentages
  const proteinCals = proteinGrams * 4;
  const carbCals = carbGrams * 4;
  const fatCals = fatGrams * 9;
  const totalCalculatedCals = proteinCals + carbCals + fatCals;

  const proteinPct = Math.round((proteinCals / totalCalculatedCals) * 100);
  const carbPct = Math.round((carbCals / totalCalculatedCals) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbPct);

  // 9. Water intake (35 ml per kg of body weight)
  const waterLiters = Number(((weightKg * 0.035) + 0.5).toFixed(1));

  return {
    bmr,
    tdee,
    targetCalories,
    proteinGrams,
    carbGrams,
    fatGrams,
    proteinPct,
    carbPct,
    fatPct,
    waterLiters,
  };
}

export function getMealDistribution(macros: MacroTargets): MealSlot[] {
  const { targetCalories, proteinGrams, carbGrams, fatGrams } = macros;

  return [
    {
      name: 'Breakfast & Morning Fuel',
      timeAdvice: '7:30 AM - 9:00 AM',
      calories: Math.round(targetCalories * 0.25),
      protein: Math.round(proteinGrams * 0.25),
      carbs: Math.round(carbGrams * 0.30),
      fats: Math.round(fatGrams * 0.25),
      sampleFoods: [
        'Rolled oats with blueberries & whey protein',
        '3 egg omelet with spinach & whole-grain sourdough',
        'Greek yogurt bowl with chia seeds and honey',
      ],
    },
    {
      name: 'Midday Power Lunch',
      timeAdvice: '12:30 PM - 1:30 PM',
      calories: Math.round(targetCalories * 0.32),
      protein: Math.round(proteinGrams * 0.32),
      carbs: Math.round(carbGrams * 0.32),
      fats: Math.round(fatGrams * 0.30),
      sampleFoods: [
        'Grilled chicken breast with roasted sweet potato & broccoli',
        'Wild salmon fillet with quinoa & mixed greens salad',
        'Lean ground beef bowl with brown rice & avocado',
      ],
    },
    {
      name: 'Workout Fuel & Recovery',
      timeAdvice: '45m Pre / Post-Workout',
      calories: Math.round(targetCalories * 0.18),
      protein: Math.round(proteinGrams * 0.20),
      carbs: Math.round(carbGrams * 0.23),
      fats: Math.round(fatGrams * 0.15),
      sampleFoods: [
        'Banana with 1 scoop protein isolate & almond butter',
        'Rice cakes with light cottage cheese & strawberries',
        'Cold-pressed electrolyte water + essential amino acids',
      ],
    },
    {
      name: 'Restorative Dinner',
      timeAdvice: '7:00 PM - 8:30 PM',
      calories: Math.round(targetCalories * 0.25),
      protein: Math.round(proteinGrams * 0.23),
      carbs: Math.round(carbGrams * 0.15),
      fats: Math.round(fatGrams * 0.30),
      sampleFoods: [
        'Seared sirloin or tofu stir-fry with asparagus & bell peppers',
        'Baked cod with zucchini noodles & olive oil drizzle',
        'Turkey patties with butternut squash & steamed green beans',
      ],
    },
  ];
}
