export interface BMICategoryInfo {
  id: 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2' | 'obese3';
  label: string;
  rangeLabel: string;
  min: number;
  max: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  barColor: string;
  description: string;
  advice: string;
}

export const BMI_CATEGORIES: BMICategoryInfo[] = [
  {
    id: 'underweight',
    label: 'Underweight',
    rangeLabel: '< 18.5',
    min: 0,
    max: 18.49,
    colorClass: 'text-sky-600',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    barColor: '#0284c7',
    description: 'Body mass is below the standard recommended range for this height.',
    advice: 'Focus on a nutrient-dense caloric surplus with adequate protein and progressive resistance training to build lean muscular frame.',
  },
  {
    id: 'normal',
    label: 'Normal Weight',
    rangeLabel: '18.5 – 24.9',
    min: 18.5,
    max: 24.99,
    colorClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    barColor: '#10b981',
    description: 'Optimal standard weight-to-height ratio with lowest epidemiological health risk.',
    advice: 'Maintain current body composition with progressive hypertrophy or lean recomposition. Focus on performance and athletic endurance.',
  },
  {
    id: 'overweight',
    label: 'Overweight',
    rangeLabel: '25.0 – 29.9',
    min: 25.0,
    max: 29.99,
    colorClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    barColor: '#f59e0b',
    description: 'Slightly above the standard weight window for this height.',
    advice: 'If body fat is elevated, a moderate 300-500 kcal deficit combined with resistance training will yield steady fat loss while preserving muscle.',
  },
  {
    id: 'obese1',
    label: 'Obese (Class I)',
    rangeLabel: '30.0 – 34.9',
    min: 30.0,
    max: 34.99,
    colorClass: 'text-orange-700',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
    barColor: '#ea580c',
    description: 'Significantly elevated weight ratio with increased cardiometabolic strain.',
    advice: 'Prioritize consistent non-impact daily activity (e.g. brisk walking), structured resistance training, and whole-food caloric management.',
  },
  {
    id: 'obese2',
    label: 'Obese (Class II & III)',
    rangeLabel: '≥ 35.0',
    min: 35.0,
    max: 100,
    colorClass: 'text-rose-700',
    bgClass: 'bg-rose-50',
    borderClass: 'border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    barColor: '#e11d48',
    description: 'High health risk category requiring structured lifestyle intervention.',
    advice: 'Work closely with a healthcare professional alongside safe, low-impact exercise and structured dietary guidance.',
  },
];

export interface BMIResult {
  bmi: number;
  category: BMICategoryInfo;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  healthyWeightMinLbs: number;
  healthyWeightMaxLbs: number;
  differenceToNormalKg: number; // 0 if normal, negative if underweight, positive if overweight
  differenceToNormalLbs: number;
  prime: number; // BMI / 25
  ponderalIndex: number; // kg / m^3
}

export function calculateBMIFromKgCm(weightKg: number, heightCm: number): BMIResult {
  const heightMeters = Math.max(0.5, heightCm / 100);
  const rawBmi = weightKg / (heightMeters * heightMeters);
  const bmi = Number(rawBmi.toFixed(1));

  let category = BMI_CATEGORIES.find((cat) => bmi >= cat.min && bmi <= cat.max);
  if (!category) {
    category = bmi < 18.5 ? BMI_CATEGORIES[0] : BMI_CATEGORIES[BMI_CATEGORIES.length - 1];
  }

  const healthyWeightMinKg = Number((18.5 * heightMeters * heightMeters).toFixed(1));
  const healthyWeightMaxKg = Number((24.9 * heightMeters * heightMeters).toFixed(1));
  const healthyWeightMinLbs = Number((healthyWeightMinKg * 2.20462).toFixed(1));
  const healthyWeightMaxLbs = Number((healthyWeightMaxKg * 2.20462).toFixed(1));

  let differenceToNormalKg = 0;
  if (weightKg < healthyWeightMinKg) {
    differenceToNormalKg = Number((weightKg - healthyWeightMinKg).toFixed(1)); // negative
  } else if (weightKg > healthyWeightMaxKg) {
    differenceToNormalKg = Number((weightKg - healthyWeightMaxKg).toFixed(1)); // positive
  }
  const differenceToNormalLbs = Number((differenceToNormalKg * 2.20462).toFixed(1));

  const prime = Number((bmi / 25).toFixed(2));
  const ponderalIndex = Number((weightKg / Math.pow(heightMeters, 3)).toFixed(1));

  return {
    bmi,
    category,
    healthyWeightMinKg,
    healthyWeightMaxKg,
    healthyWeightMinLbs,
    healthyWeightMaxLbs,
    differenceToNormalKg,
    differenceToNormalLbs,
    prime,
    ponderalIndex,
  };
}

export function getBmiCategory(bmiInput: number | BMIResult): BMICategoryInfo {
  if (typeof bmiInput !== 'number' && bmiInput?.category) {
    return bmiInput.category;
  }
  const val = typeof bmiInput === 'number' ? bmiInput : bmiInput.bmi;
  const match = BMI_CATEGORIES.find((cat) => val >= cat.min && val <= cat.max);
  return match || (val < 18.5 ? BMI_CATEGORIES[0] : BMI_CATEGORIES[BMI_CATEGORIES.length - 1]);
}
