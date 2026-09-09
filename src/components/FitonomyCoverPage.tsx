import React, { useState } from 'react';
import {
  Dumbbell,
  Apple,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Download,
  Flame,
  Activity,
  Heart,
  Scale,
  RotateCcw,
  Zap,
  Award,
  ChevronDown,
  Layers,
  Volume2
} from 'lucide-react';
import { UserProfile } from '../types';
import { SEVEN_DAY_ROTATION } from '../utils/workouts';

interface FitonomyCoverPageProps {
  profile?: UserProfile;
  onLaunchApp?: (view?: 'all' | 'workout' | 'nutrition') => void;
  onOpenMetrics?: () => void;
  onOpenBmi?: () => void;
  onOpenInstallModal?: () => void;
  onStartAutoWorkout?: () => void;
  onGetStarted?: () => void;
  onExploreWorkouts?: () => void;
  onViewDiet?: () => void;
}

export const FitonomyCoverPage: React.FC<FitonomyCoverPageProps> = ({
  profile,
  onLaunchApp,
  onOpenMetrics,
  onOpenBmi,
  onOpenInstallModal,
  onStartAutoWorkout,
  onGetStarted,
  onExploreWorkouts,
  onViewDiet,
}) => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<'workouts' | 'nutrition' | 'coach' | 'metrics'>('workouts');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLaunch = (view?: 'all' | 'workout' | 'nutrition') => {
    if (view === 'workout' && onExploreWorkouts) {
      onExploreWorkouts();
    } else if (view === 'nutrition' && onViewDiet) {
      onViewDiet();
    } else if (onGetStarted) {
      onGetStarted();
    } else if (onLaunchApp) {
      onLaunchApp(view);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const FAQS = [
    {
      question: 'How does the 24-hour adaptive split cycle work?',
      answer: 'Your program begins strictly on Day 1 (Chest Day). Every 24 hours, the protocol automatically advances to the next muscle group in a science-backed 7-day rotation: Chest ➔ Back & Shoulders ➔ Arms ➔ Legs ➔ Core ➔ Recovery ➔ Rest. Once completed, it seamlessly loops so you never lose momentum.',
    },
    {
      question: 'Can I use this for home workouts or gym workouts?',
      answer: 'Yes! All workouts automatically configure sets, reps, and alternative exercises suited for dumbbells, resistance bands, bodyweight, or full gym setups. You can also adjust your session time from 15 to 90 minutes anytime.',
    },
    {
      question: 'How are my calorie and macro goals determined?',
      answer: 'We utilize the clinical Mifflin-St Jeor formula combined with Katch-McArdle activity multipliers to compute your exact Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), calibrated specifically for Fat Loss, Muscle Gain, or Recomposition.',
    },
    {
      question: 'Does the app work offline on iPhone and Android?',
      answer: 'Yes! fitinblink is built with Progressive Web App (PWA) offline architecture and Service Workers. You can tap "Install App" to add it to your home screen or dock, and it functions with zero internet connection.',
    },
  ];

  return (
    <div className="w-full bg-[#191D26] text-[#F8FAFC] selection:bg-[#2563EB] selection:text-white">
      {/* =========================================================================
          HERO SECTION: Fitonomy Modern Dark Aesthetics
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#31353E]/60">
        {/* Subtle Ambient Radial Glows */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#2563EB]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" 
          aria-hidden="true"
        />
        <div 
          className="absolute top-1/3 right-10 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#31353E] bg-[#252B37]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#94A3B8] shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse shadow-[0_0_8px_#2563EB]" />
                <span>Your body goals, finally made simple</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight text-white font-heading">
                Get a personalized fitness plan that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#93C5FD]">actually fits your life.</span>
              </h1>

              {/* Subheading */}
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#94A3B8]">
                fitinblink combines intelligent daily splits, clinical nutrition guidance, automated recovery timers, and accountability into one modern app experience designed to turn interest into action.
              </p>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
                <button
                  id="hero-start-workout-btn"
                  onClick={() => handleLaunch('workout')}
                  className="fitonomy-gradient-btn px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 w-full sm:w-auto shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                >
                  <Dumbbell className="w-5 h-5 text-white" />
                  <span>Start Today's Split</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  id="hero-auto-coach-btn"
                  onClick={onStartAutoWorkout}
                  className="px-5 py-3.5 rounded-2xl bg-[#252B37] hover:bg-[#2C3342] border border-[#31353E] hover:border-[#3B82F6]/50 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 w-full sm:w-auto shadow-sm"
                >
                  <Play className="w-4 h-4 text-[#38BDF8] fill-[#38BDF8]" />
                  <span>Launch Auto-Coach</span>
                </button>

                <button
                  id="hero-install-app-btn"
                  onClick={onOpenInstallModal}
                  className="px-4 py-3.5 rounded-2xl bg-[#202530] hover:bg-[#252B37] border border-[#31353E] text-slate-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto"
                  title="Install on Mobile/Desktop"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span>Install App</span>
                </button>
              </div>

              {/* Social Proof & Trust Metrics */}
              <div className="pt-4 border-t border-[#31353E]/70 w-full flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-sm">4.8</span>
                  <span>(120k+ reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">5M+</span>
                  <span>Completed workouts</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#60A5FA]" />
                  <span className="font-bold text-white">24h</span>
                  <span>Endless split loop</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Fitonomy Interactive App Mockup Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] rounded-3xl bg-[#252B37] border border-[#31353E] p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                {/* Phone Header / Status */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#31353E]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white shadow-sm font-black text-xs">
                      F
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-tight">Today's Protocol</div>
                      <div className="text-[11px] text-[#94A3B8]">Day 1: Chest Hypertrophy</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#1D283A] text-[#60A5FA] border border-[#2563EB]/40 px-2 py-0.5 rounded-full">
                    Active Cycle
                  </span>
                </div>

                {/* Hero Card Visual Preview */}
                <div className="rounded-2xl bg-[#191D26] border border-[#31353E] p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Target Muscle Group</span>
                    <span className="text-xs font-mono font-extrabold text-[#38BDF8]">45m Session</span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#38BDF8]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#60A5FA]">
                      <Dumbbell className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base font-black text-white font-heading leading-tight">Barbell Bench Press</div>
                      <div className="text-xs text-[#94A3B8]">Compound • 4 Sets x 10 Reps • 60s Rest</div>
                    </div>
                  </div>

                  {/* Interactive Quick Action Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-[#252B37] p-2.5 rounded-xl border border-[#31353E] text-center">
                      <div className="text-[10px] font-semibold text-[#94A3B8] uppercase">Target Calories</div>
                      <div className="text-sm font-extrabold text-white font-mono mt-0.5">2,350 kcal</div>
                    </div>
                    <div className="bg-[#252B37] p-2.5 rounded-xl border border-[#31353E] text-center">
                      <div className="text-[10px] font-semibold text-[#94A3B8] uppercase">Protein Goal</div>
                      <div className="text-sm font-extrabold text-[#60A5FA] font-mono mt-0.5">165g / day</div>
                    </div>
                  </div>

                  {/* Launch Directly Button */}
                  <button
                    onClick={() => onLaunchApp('workout')}
                    className="w-full fitonomy-gradient-btn py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Open Interactive Workout Tracker</span>
                  </button>
                </div>

                {/* Micro Badges Footer in Mockup */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-[#94A3B8] px-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Voice Whistle Audio</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto 15s Rest Intervals</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "One app. Everything you need to transform."
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#31353E]/60 bg-[#161A22]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#252B37] border border-[#31353E] text-[11px] font-bold uppercase tracking-wider text-[#60A5FA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Fitness Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              One app. Everything you need to transform.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              No generic PDF templates or fragmented tracking. fitinblink combines your training split, nutritional macros, live rest coaching, and body metrics into a unified 24-hour protocol.
            </p>
          </div>

          {/* Bento Grid: 4 Core Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: 24h Adaptive Split Cycle */}
            <div className="bg-[#252B37] border border-[#31353E] hover:border-[#3B82F6]/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#38BDF8]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#60A5FA]">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white font-heading">Adaptive 24h Splits</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Automatically loops through Chest, Back, Arms, Legs, Core, Recovery, and Rest every 24 hours. Preview tomorrow's routine or reset anytime.
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('workout')}
                className="mt-6 flex items-center gap-1 text-xs font-bold text-[#60A5FA] hover:text-white transition-colors cursor-pointer"
              >
                <span>Explore Split</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Precision Nutrition & Clinical Macros */}
            <div className="bg-[#252B37] border border-[#31353E] hover:border-[#F97316]/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F97316]/20 to-amber-500/20 border border-[#F97316]/40 flex items-center justify-center text-[#F97316]">
                  <Apple className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white font-heading">Clinical Macro Targets</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Science-backed Mifflin-St Jeor daily calories with customized protein, carb, fat grams, and hydration tracker tailored to your body goal.
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('nutrition')}
                className="mt-6 flex items-center gap-1 text-xs font-bold text-[#F97316] hover:text-white transition-colors cursor-pointer"
              >
                <span>View Macro Plan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Automated Audio Coach */}
            <div className="bg-[#252B37] border border-[#31353E] hover:border-[#38BDF8]/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-cyan-500/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
                  <Volume2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white font-heading">Voice & Audio Coach</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Automated set transitions with countdown beeps, referee whistle cues, synthetic voice rep calls, and built-in 15s recovery timers.
                </p>
              </div>
              <button
                onClick={onStartAutoWorkout}
                className="mt-6 flex items-center gap-1 text-xs font-bold text-[#38BDF8] hover:text-white transition-colors cursor-pointer"
              >
                <span>Launch Audio Coach</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 4: BMI & Anthropometric Metrics */}
            <div className="bg-[#252B37] border border-[#31353E] hover:border-emerald-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white font-heading">BMI & Health Tracking</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Track body mass index, weight fluctuations in kg/lbs, age-calibrated metabolic rates, and body recomposition milestones.
                </p>
              </div>
              <button
                onClick={onOpenBmi}
                className="mt-6 flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>Check Your BMI</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "Train smarter with tools built for your goals" (Interactive Feature Showcase)
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#31353E]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Train smarter with tools built for your goals.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Switch through fitinblink's interactive modules and preview the exact tools guiding your daily routine.
            </p>
          </div>

          {/* Feature Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'workouts', label: '7-Day Rotation Split', icon: Dumbbell },
              { id: 'nutrition', label: 'Clinical Nutrition', icon: Apple },
              { id: 'coach', label: 'Audio Auto-Player', icon: Play },
              { id: 'metrics', label: 'BMI & Body Profile', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFeatureTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                      : 'bg-[#252B37] hover:bg-[#2C3342] text-[#94A3B8] hover:text-white border border-[#31353E]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Feature Panel Preview */}
          <div className="bg-[#252B37] border border-[#31353E] rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto shadow-2xl">
            {activeFeatureTab === 'workouts' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#31353E] pb-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-white font-heading">Continuous 7-Day Muscle Rotation</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">Each day focuses on a distinct muscle synergy to maximize recovery and progressive overload.</p>
                  </div>
                  <button
                    onClick={() => handleLaunch('workout')}
                    className="fitonomy-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shrink-0 self-start sm:self-center"
                  >
                    Open Routine
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {SEVEN_DAY_ROTATION.map((rot) => (
                    <div 
                      key={rot.id}
                      className="bg-[#191D26] border border-[#31353E] rounded-2xl p-3 text-center space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold text-[#60A5FA]">Day {rot.id}</span>
                      <div className="text-xs font-black text-white truncate font-heading">{rot.dayName}</div>
                      <div className="text-[10px] text-[#94A3B8] truncate">{rot.focus}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeFeatureTab === 'nutrition' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#31353E] pb-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-white font-heading">Science-Backed Macronutrient Breakdown</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">Computed with clinical energy formulas based on your exact body parameters.</p>
                  </div>
                  <button
                    onClick={() => handleLaunch('nutrition')}
                    className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold shrink-0 self-start sm:self-center shadow-sm"
                  >
                    View Diet Plan
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-[#191D26] border border-[#31353E] p-4 rounded-2xl text-center space-y-1">
                    <div className="text-xs font-bold text-[#94A3B8] uppercase">Protein (Muscle Repair)</div>
                    <div className="text-2xl font-black text-[#60A5FA] font-mono">155 - 180g</div>
                    <div className="text-[11px] text-slate-400">Lean poultry, fish, eggs & plant proteins</div>
                  </div>
                  <div className="bg-[#191D26] border border-[#31353E] p-4 rounded-2xl text-center space-y-1">
                    <div className="text-xs font-bold text-[#94A3B8] uppercase">Carbohydrates (Glycogen)</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">220 - 260g</div>
                    <div className="text-[11px] text-slate-400">Complex oats, sweet potatoes & brown rice</div>
                  </div>
                  <div className="bg-[#191D26] border border-[#31353E] p-4 rounded-2xl text-center space-y-1">
                    <div className="text-xs font-bold text-[#94A3B8] uppercase">Healthy Fats (Hormones)</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">55 - 70g</div>
                    <div className="text-[11px] text-slate-400">Extra virgin olive oil, nuts & avocado</div>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'coach' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#31353E] pb-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-white font-heading">Automated Interval Workout Engine</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">Hands-free gym execution with live countdown rings and audio cues.</p>
                  </div>
                  <button
                    onClick={onStartAutoWorkout}
                    className="fitonomy-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shrink-0 self-start sm:self-center"
                  >
                    Start Coach Now
                  </button>
                </div>

                <div className="bg-[#191D26] border border-[#31353E] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#60A5FA]">
                      <Volume2 className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Audio Guidance & Whistle Alerts</div>
                      <div className="text-xs text-[#94A3B8] max-w-md mt-0.5">Automated 15-second rest breaks fire between consecutive sets, giving you auditory countdowns without glancing at your phone.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold bg-[#252B37] px-3 py-1.5 rounded-xl border border-[#31353E] text-[#60A5FA]">
                      Hands-Free Auto Loop
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'metrics' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#31353E] pb-5">
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-white font-heading">Physical Profile & BMI Calibration</h4>
                    <p className="text-xs text-[#94A3B8] mt-1">Keep your weight, height, and age synced to dynamically update your calories.</p>
                  </div>
                  <button
                    onClick={onOpenMetrics}
                    className="fitonomy-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shrink-0 self-start sm:self-center"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-[#191D26] border border-[#31353E] p-4 rounded-2xl text-center">
                    <div className="text-xs font-bold text-[#94A3B8]">Current Weight</div>
                    <div className="text-xl font-extrabold text-white font-mono mt-1">{profile.weight} {profile.weightUnit}</div>
                  </div>
                  <div className="bg-[#191D26] border border-[#31353E] p-4 rounded-2xl text-center">
                    <div className="text-xs font-bold text-[#94A3B8]">Height</div>
                    <div className="text-xl font-extrabold text-white font-mono mt-1">
                      {profile.heightUnit === 'ft' ? `${profile.heightFeet}'${profile.heightInches}"` : `${profile.heightCm} cm`}
                    </div>
                  </div>
                  <div className="bg-[#191D26] border border-[#31353E] p-4 rounded-2xl text-center">
                    <div className="text-xs font-bold text-[#94A3B8]">Target Goal</div>
                    <div className="text-xl font-extrabold text-[#60A5FA] uppercase font-mono mt-1">
                      {profile.goal.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "Everything points toward one simple next step" (3-Step Roadmap)
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#31353E]/60 bg-[#161A22]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Everything points toward one simple next step.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              How fitinblink takes you from planning to consistent daily execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#252B37] border border-[#31353E] rounded-3xl p-6 relative flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white font-black text-sm shadow-md">
                  1
                </span>
                <h3 className="text-lg font-black text-white font-heading">Dial In Your Metrics</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Enter your current weight, height, age, and objective. We calculate your clinical BMR and energy deficit or surplus immediately.
                </p>
              </div>
              <button
                onClick={onOpenMetrics}
                className="mt-6 text-xs font-bold text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Setup Metrics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 2 */}
            <div className="bg-[#252B37] border border-[#31353E] rounded-3xl p-6 relative flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white font-black text-sm shadow-md">
                  2
                </span>
                <h3 className="text-lg font-black text-white font-heading">Execute Today's Routine</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Open the guided workout player. Complete sets with voice audio cues, automated recovery intervals, and interactive progress ticks.
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('workout')}
                className="mt-6 text-xs font-bold text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Workout</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-[#252B37] border border-[#31353E] rounded-3xl p-6 relative flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white font-black text-sm shadow-md">
                  3
                </span>
                <h3 className="text-lg font-black text-white font-heading">Hit Your Daily Nutrition</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Fuel muscle synthesis with precise protein, carbohydrate, and fat allocations, and let the 24-hour cycle advance to the next split.
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('nutrition')}
                className="mt-6 text-xs font-bold text-[#60A5FA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Review Macros</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: Frequently Asked Questions (Accordion)
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#31353E]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Everything you need to know about your personalized plan and app experience.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#252B37] border border-[#31353E] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#2C3342] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-heading">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#60A5FA]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#31353E]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FINAL HIGH-CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#191D26] to-[#12161E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#31353E] bg-[#252B37] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#60A5FA]">
            <Award className="w-4 h-4" />
            <span>Ready for your transformation?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Download the app or start your plan now.
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Begin with Day 1 today. Your daily split, customized calories, rest timers, and workout player are ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleLaunch('all')}
              className="fitonomy-gradient-btn px-7 py-3.5 rounded-2xl text-base font-black flex items-center gap-2.5 cursor-pointer shadow-[0_4px_24px_rgba(37,99,235,0.5)] active:scale-95"
            >
              <Dumbbell className="w-5 h-5" />
              <span>Launch Full Daily Plan</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenInstallModal}
              className="px-6 py-3.5 rounded-2xl bg-[#252B37] hover:bg-[#2C3342] border border-[#31353E] hover:border-[#3B82F6]/50 text-white font-bold text-base flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Download className="w-5 h-5 text-slate-300" />
              <span>Install to Device</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
