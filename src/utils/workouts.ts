import { DayRotation, DailyWorkoutPlan, Exercise } from '../types';

export const SEVEN_DAY_ROTATION: DayRotation[] = [
  {
    id: 1,
    dayName: 'Day 1: Chest Day',
    focus: 'Chest & Anterior Kinetic Chain',
    majorMuscles: ['Pectoralis Major', 'Upper Pecs', 'Anterior Deltoids'],
    isRestDay: false,
    bannerHeadline: 'Today is Chest Day',
    tagline: 'Build horizontal pushing power, upper chest shelf, and pec density.',
    accentColor: 'from-emerald-500 to-teal-500',
  },
  {
    id: 2,
    dayName: 'Day 2: Back & Shoulders Day',
    focus: 'Back Width, Thickness & Deltoids',
    majorMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Rear & Lateral Delts'],
    isRestDay: false,
    bannerHeadline: 'Today is Back & Shoulders Day',
    tagline: 'Sculpt the V-taper frame, posterior chain stability, and 3D boulder shoulders.',
    accentColor: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    dayName: 'Day 3: Arms Day',
    focus: 'Biceps, Triceps & Forearms',
    majorMuscles: ['Biceps Brachii', 'Triceps Lateral & Long Head', 'Brachialis'],
    isRestDay: false,
    bannerHeadline: 'Today is Arms Day',
    tagline: 'Dedicated arm hypertrophy with peak tension curls and tricep lockouts.',
    accentColor: 'from-indigo-500 to-violet-500',
  },
  {
    id: 4,
    dayName: 'Day 4: Leg Day',
    focus: 'Quads, Hamstrings, Glutes & Calves',
    majorMuscles: ['Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Gastrocnemius'],
    isRestDay: false,
    bannerHeadline: 'Today is Leg Day',
    tagline: 'Explosive lower-body drive, quad sweep, and posterior knee resilience.',
    accentColor: 'from-amber-500 to-orange-500',
  },
  {
    id: 5,
    dayName: 'Day 5: Endurance & Core/Abs Day',
    focus: 'Core Stabilization & Aerobic Capacity',
    majorMuscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques', 'Cardiovascular Base'],
    isRestDay: false,
    bannerHeadline: 'Today is Endurance & Core Day',
    tagline: 'Steel midline stability, rotational power, and metabolic conditioning.',
    accentColor: 'from-rose-500 to-pink-500',
  },
  {
    id: 6,
    dayName: 'Day 6: Active Recovery / Functional',
    focus: 'Full-Body Functional Movement & Mobility Flow',
    majorMuscles: ['Rotator Cuffs', 'Hip Stabilizers', 'Kinetic Chains', 'Joints'],
    isRestDay: false,
    bannerHeadline: 'Today is Active Recovery & Functional Day',
    tagline: 'Decompress joints, restore movement patterns, and flush out metabolic waste.',
    accentColor: 'from-teal-400 to-cyan-500',
  },
  {
    id: 7,
    dayName: 'Day 7: Rest / Mobility Day',
    focus: 'CNS Restoration, Fascial Release & Deep Mobility',
    majorMuscles: ['Central Nervous System', 'Fascial Chains', 'Breathwork & Sleep'],
    isRestDay: true,
    bannerHeadline: 'Today is Rest & Mobility Day',
    tagline: 'Grow outside the gym. Give your central nervous system complete rest.',
    accentColor: 'from-slate-500 to-zinc-400',
  },
];

interface ExerciseTemplate {
  name: string;
  targetMuscle: string;
  equipment: string;
  intensityType: Exercise['intensityType'];
  repsByDuration: { [key: string]: string };
  tempo: string;
  formTip: string;
}

// Exercise catalog organized by day
const EXERCISE_CATALOG: { [dayId: number]: ExerciseTemplate[] } = {
  1: [
    // Chest Day
    {
      name: 'Flat Barbell Bench Press',
      targetMuscle: 'Mid Pectorals & Triceps',
      equipment: 'Barbell & Flat Bench',
      intensityType: 'compound',
      repsByDuration: { '30': '8-10 reps', '45': '6-8 reps', '60': '5-8 reps', '90': '4-6 reps', '120': '4-6 reps (Pyramid)' },
      tempo: '3-1-1-0',
      formTip: 'Retract shoulder blades, plant feet firmly into the floor, bar touches mid-sternum.',
    },
    {
      name: 'Incline Dumbbell Press (30° Angle)',
      targetMuscle: 'Clavicular Head (Upper Chest)',
      equipment: 'Dumbbells & Incline Bench',
      intensityType: 'compound',
      repsByDuration: { '30': '10-12 reps', '45': '8-10 reps', '60': '8-10 reps', '90': '6-8 reps', '120': '6-8 reps' },
      tempo: '2-1-1-0',
      formTip: 'Keep elbows tucked at roughly 45-60 degrees to isolate the upper pec shelf safely.',
    },
    {
      name: 'Weighted or Bodyweight Chest Dips',
      targetMuscle: 'Lower Pectorals & Front Delts',
      equipment: 'Parallel Dip Bars',
      intensityType: 'compound',
      repsByDuration: { '30': '10-12 reps', '45': '8-12 reps', '60': '8-10 reps', '90': '6-10 reps', '120': '6-8 reps' },
      tempo: '3-0-1-0',
      formTip: 'Lean torso forward 20-30 degrees with flared elbows to maximize lower pec recruitment.',
    },
    {
      name: 'Standing Cable Pec Flyes (Mid to High)',
      targetMuscle: 'Inner & Sternal Pecs',
      equipment: 'Dual Cable Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '12-15 reps', '45': '12-15 reps', '60': '10-12 reps', '90': '10-12 reps', '120': '12-15 reps' },
      tempo: '2-0-1-2',
      formTip: 'Squeeze hands together with a 2-second hard contraction at the peak like hugging a barrel.',
    },
    {
      name: 'Incline Dumbbell Hex Press',
      targetMuscle: 'Inner Chest Cleavage & Triceps',
      equipment: 'Dumbbells',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '10-12 reps', '60': '10-12 reps', '90': '10-12 reps', '120': '10-12 reps' },
      tempo: '2-1-1-1',
      formTip: 'Press dumbbells together aggressively throughout the entire range of motion.',
    },
    {
      name: 'Low-to-High Cable Crossover',
      targetMuscle: 'Upper Inner Clavicular Pecs',
      equipment: 'Cable Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '15 reps', '45': '12-15 reps', '60': '12-15 reps', '90': '12-15 reps', '120': '12-15 reps' },
      tempo: '2-0-1-1',
      formTip: 'Scoop upward finishing in front of your face with palms facing up.',
    },
    {
      name: 'Dumbbell Pullover',
      targetMuscle: 'Pectoral Serratus & Ribcage Expansion',
      equipment: 'Dumbbell & Cross-Bench',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '10-12 reps', '60': '10-12 reps', '90': '8-10 reps', '120': '8-10 reps' },
      tempo: '3-1-1-0',
      formTip: 'Maintain a slight elbow bend and focus on deep stretch through the ribcage.',
    },
    {
      name: 'Deficit Push-Up Burnout Finisher',
      targetMuscle: 'Total Pec Exhaustion',
      equipment: 'Weight Plates / Push-up Bars',
      intensityType: 'finisher',
      repsByDuration: { '30': 'AMRAP (As Many Reps)', '45': 'AMRAP to failure', '60': '15-20 reps', '90': '20+ reps', '120': 'Drop-set to failure' },
      tempo: 'Controlled',
      formTip: 'Sink 2 inches deeper than floor level for maximum fascia stretch, drive up explosively.',
    },
    {
      name: 'Plate Pinch Press / Isometric Chest Squeeze',
      targetMuscle: 'Deep Pec Contraction',
      equipment: 'Two 5-10lb Plates',
      intensityType: 'finisher',
      repsByDuration: { '30': '30s hold', '45': '15 reps', '60': '15 reps', '90': '15 reps', '120': '3 sets to failure' },
      tempo: 'Constant Squeeze',
      formTip: 'Pinch smooth plates together between open palms so friction alone prevents them from dropping.',
    },
  ],
  2: [
    // Back & Shoulders Day
    {
      name: 'Deadlift or Heavy Pendlay Row',
      targetMuscle: 'Posterior Kinetic Chain & Lats',
      equipment: 'Barbell & Olympic Plates',
      intensityType: 'compound',
      repsByDuration: { '30': '8 reps', '45': '6-8 reps', '60': '5 reps', '90': '3-5 reps (Heavy)', '120': '3-5 reps (Strength Anchor)' },
      tempo: '2-1-1-0',
      formTip: 'Brace core 360°, pull slack out of the bar, keep bar glued against your shins.',
    },
    {
      name: 'Seated Overhead Dumbbell Shoulder Press',
      targetMuscle: 'Anterior & Medial Deltoids',
      equipment: 'Dumbbells & 90° Bench',
      intensityType: 'compound',
      repsByDuration: { '30': '10 reps', '45': '8-10 reps', '60': '6-8 reps', '90': '6-8 reps', '120': '5-8 reps' },
      tempo: '2-1-1-0',
      formTip: 'Press directly overhead without excessive arch in lower back, full lockout with control.',
    },
    {
      name: 'Wide-Grip Lat Pulldown',
      targetMuscle: 'Upper Latissimus Dorsi & Teres Major',
      equipment: 'Lat Pulldown Station',
      intensityType: 'accessory',
      repsByDuration: { '30': '10-12 reps', '45': '10-12 reps', '60': '8-10 reps', '90': '8-10 reps', '120': '8-10 reps' },
      tempo: '2-0-1-1',
      formTip: 'Pull through your elbows towards your hips; avoid swinging your torso back.',
    },
    {
      name: 'Lean-Away Dumbbell Lateral Raises',
      targetMuscle: 'Lateral Deltoids (Shoulder Width)',
      equipment: 'Dumbbells / Cable Tower',
      intensityType: 'accessory',
      repsByDuration: { '30': '12-15 reps', '45': '12-15 reps', '60': '12-15 reps', '90': '12-15 reps', '120': '15-20 reps' },
      tempo: '2-0-1-1',
      formTip: 'Lead with elbows slightly forward in the scapular plane, pause at shoulder height.',
    },
    {
      name: 'Chest-Supported Neutral Dumbbell Row',
      targetMuscle: 'Mid-Back, Rhomboids & Lower Lats',
      equipment: 'Incline Bench & Dumbbells',
      intensityType: 'accessory',
      repsByDuration: { '30': '10-12 reps', '45': '10-12 reps', '60': '8-10 reps', '90': '8-10 reps', '120': '8-10 reps' },
      tempo: '3-0-1-1',
      formTip: 'Eliminates spinal fatigue while allowing complete retraction of the scapulae.',
    },
    {
      name: 'Face Pulls with High Rope Attachment',
      targetMuscle: 'Rear Delts, Infraspinatus & External Rotators',
      equipment: 'Cable Machine & Rope',
      intensityType: 'accessory',
      repsByDuration: { '30': '15 reps', '45': '15 reps', '60': '12-15 reps', '90': '15 reps', '120': '15-20 reps' },
      tempo: '2-0-1-2',
      formTip: 'Pull rope toward forehead while externally rotating wrists to finish in double bicep pose.',
    },
    {
      name: 'Single-Arm Dumbbell Row (Kroc Style)',
      targetMuscle: 'Lower Lat Tie-In & Core Anti-Rotation',
      equipment: 'Heavy Dumbbell & Bench',
      intensityType: 'accessory',
      repsByDuration: { '30': '10 reps/side', '45': '8-10 reps', '60': '8-10 reps', '90': '8-10 reps', '120': '10-12 reps' },
      tempo: '2-0-1-0',
      formTip: 'Pull dumbbell toward hip pocket rather than straight up to your chest.',
    },
    {
      name: 'Standing Dumbbell / Barbell Shrugs',
      targetMuscle: 'Upper Trapezius & Scapular Elevation',
      equipment: 'Barbell / Heavy Dumbbells',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '12 reps', '60': '10-12 reps', '90': '10-12 reps', '120': '12-15 reps' },
      tempo: '2-1-1-2',
      formTip: 'Elevate straight up toward ears, hold for 2 seconds at the peak; do not roll shoulders.',
    },
    {
      name: 'Reverse Pec Deck / Rear Delt Flyes',
      targetMuscle: 'Posterior Deltoid Isolation',
      equipment: 'Reverse Pec Deck Machine',
      intensityType: 'finisher',
      repsByDuration: { '30': '15 reps', '45': '15 reps', '60': '15 reps', '90': '15-20 reps', '120': '20 reps Drop-set' },
      tempo: '2-0-1-1',
      formTip: 'Keep elbows slightly bent and focus purely on driving out with the back of your shoulders.',
    },
  ],
  3: [
    // Arms Day
    {
      name: 'Close-Grip Barbell Bench Press',
      targetMuscle: 'Triceps Brachii (All Three Heads)',
      equipment: 'Barbell & Flat Bench',
      intensityType: 'compound',
      repsByDuration: { '30': '8-10 reps', '45': '8-10 reps', '60': '6-8 reps', '90': '6-8 reps', '120': '5-8 reps' },
      tempo: '3-1-1-0',
      formTip: 'Grip shoulder-width apart, keep elbows tucked close to ribcage throughout.',
    },
    {
      name: 'Incline Dumbbell Bicep Curls',
      targetMuscle: 'Biceps Long Head (Peak) Under Stretch',
      equipment: 'Dumbbells & 45° Incline Bench',
      intensityType: 'compound',
      repsByDuration: { '30': '10-12 reps', '45': '10-12 reps', '60': '8-10 reps', '90': '8-10 reps', '120': '8-10 reps' },
      tempo: '3-0-1-1',
      formTip: 'Let arms hang straight down for deep bicep stretch, supinate wrists at top.',
    },
    {
      name: 'Overhead Cable Triceps Extension',
      targetMuscle: 'Triceps Long Head (Overhead Stretch)',
      equipment: 'Cable Machine & Rope',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '10-12 reps', '60': '10-12 reps', '90': '10-12 reps', '120': '10-12 reps' },
      tempo: '2-1-1-1',
      formTip: 'Keep upper arms fixed by ears; flare rope apart at peak lockout.',
    },
    {
      name: 'Standing Barbell / EZ-Bar Spider Curls',
      targetMuscle: 'Biceps Short Head (Inner Thickness)',
      equipment: 'EZ-Curl Bar & Incline Bench',
      intensityType: 'accessory',
      repsByDuration: { '30': '10-12 reps', '45': '10-12 reps', '60': '8-10 reps', '90': '8-10 reps', '120': '8-10 reps' },
      tempo: '2-0-1-1',
      formTip: 'Chest against bench pad prevents any torso momentum, strict bicep isolation.',
    },
    {
      name: 'Triceps Straight-Bar Pushdown',
      targetMuscle: 'Triceps Lateral Head (Horseshoe)',
      equipment: 'Cable Machine & Straight Bar',
      intensityType: 'accessory',
      repsByDuration: { '30': '12-15 reps', '45': '12-15 reps', '60': '10-12 reps', '90': '10-12 reps', '120': '10-12 reps' },
      tempo: '2-0-1-1',
      formTip: 'Pin elbows to sides, press down forcefully and lock out triceps at bottom.',
    },
    {
      name: 'Standing Hammer Curls with Cross-Body Arc',
      targetMuscle: 'Brachialis & Brachioradialis',
      equipment: 'Dumbbells',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '10-12 reps', '60': '10-12 reps', '90': '8-10 reps', '120': '8-10 reps' },
      tempo: '2-0-1-0',
      formTip: 'Neutral grip pushes the bicep outwards, building upper arm width.',
    },
    {
      name: 'Dumbbell Concentration Curls',
      targetMuscle: 'Biceps Peak Contraction',
      equipment: 'Dumbbell & Flat Bench',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps/arm', '45': '12 reps/arm', '60': '10-12 reps', '90': '10-12 reps', '120': '10-12 reps' },
      tempo: '3-0-1-1',
      formTip: 'Brace tricep against inner thigh to anchor elbow solidly in place.',
    },
    {
      name: 'Single-Arm Cable Tricep Kickbacks',
      targetMuscle: 'Triceps Long Head Terminal Contraction',
      equipment: 'Low Cable Attachment',
      intensityType: 'finisher',
      repsByDuration: { '30': '15 reps', '45': '15 reps', '60': '12-15 reps', '90': '12-15 reps', '120': '15 reps' },
      tempo: '2-0-1-2',
      formTip: 'Hinge forward, keep elbow high and extend arm completely parallel to floor.',
    },
    {
      name: 'Seated Wrist Curls & Reverse Wrist Curls',
      targetMuscle: 'Forearm Flexors & Extensors',
      equipment: 'Barbell / Dumbbells',
      intensityType: 'finisher',
      repsByDuration: { '30': '15-20 reps', '45': '15-20 reps', '60': '15-20 reps', '90': '15-20 reps', '120': '20 reps Burnout' },
      tempo: 'Controlled',
      formTip: 'Rest forearms on thighs, curl wrists upward with high reps for grip density.',
    },
  ],
  4: [
    // Leg Day
    {
      name: 'Barbell Back Squat (High or Low Bar)',
      targetMuscle: 'Quadriceps, Glutes & Adductors',
      equipment: 'Barbell & Squat Rack',
      intensityType: 'compound',
      repsByDuration: { '30': '8-10 reps', '45': '6-8 reps', '60': '5-8 reps', '90': '4-6 reps (Heavy)', '120': '3-5 reps (Power Schemes)' },
      tempo: '3-1-1-0',
      formTip: 'Screw feet into ground, knees track over toes, hit parallel or below with flat back.',
    },
    {
      name: 'Romanian Deadlift (RDL)',
      targetMuscle: 'Hamstrings & Gluteus Maximus',
      equipment: 'Barbell or Heavy Dumbbells',
      intensityType: 'compound',
      repsByDuration: { '30': '10 reps', '45': '8-10 reps', '60': '8-10 reps', '90': '6-8 reps', '120': '6-8 reps' },
      tempo: '3-1-1-0',
      formTip: 'Hinge at the hips sending glutes to back wall, feel deep hamstring stretch before driving hips forward.',
    },
    {
      name: 'Bulgarian Split Squat',
      targetMuscle: 'Unilateral Quads & Glute Medius',
      equipment: 'Dumbbells & Flat Bench',
      intensityType: 'compound',
      repsByDuration: { '30': '8-10 reps/leg', '45': '8-10 reps/leg', '60': '8-10 reps/leg', '90': '8-10 reps/leg', '120': '6-8 reps/leg' },
      tempo: '2-1-1-0',
      formTip: 'Rear foot laces on bench, front shin vertical, descend straight down under control.',
    },
    {
      name: '45-Degree Leg Press (Foot Placement Mid-Stance)',
      targetMuscle: 'Quadriceps Vastus Lateralis',
      equipment: 'Leg Press Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '10-12 reps', '60': '10-12 reps', '90': '8-10 reps', '120': '10-12 reps (Heavy)' },
      tempo: '3-0-1-0',
      formTip: 'Lower sled until knees reach 90 degrees; never lock knees out hard at the top.',
    },
    {
      name: 'Lying or Seated Hamstring Leg Curl',
      targetMuscle: 'Hamstrings Biceps Femoris',
      equipment: 'Leg Curl Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '10-12 reps', '60': '10-12 reps', '90': '8-10 reps', '120': '10-12 reps' },
      tempo: '2-1-1-1',
      formTip: 'Dorsiflex toes, squeeze hamstrings hard at bottom, 3-second controlled return.',
    },
    {
      name: 'Leg Extension (Quad Burnout)',
      targetMuscle: 'Rectus Femoris & Teardrop Quad',
      equipment: 'Leg Extension Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '15 reps', '45': '12-15 reps', '60': '12-15 reps', '90': '10-12 reps', '120': '12-15 reps + Drop set' },
      tempo: '2-0-1-2',
      formTip: 'Hold top contraction for 2 seconds with pointed toes to fire the teardrop muscle.',
    },
    {
      name: 'Walking Dumbbell Lunges',
      targetMuscle: 'Glutes, Quads & Dynamic Balance',
      equipment: 'Dumbbells',
      intensityType: 'accessory',
      repsByDuration: { '30': '20 paces', '45': '20 paces', '60': '20-24 paces', '90': '24 paces', '120': '24-30 paces' },
      tempo: 'Smooth step',
      formTip: 'Long strides target glutes; short strides target quads. Torso stays tall.',
    },
    {
      name: 'Standing Calf Raises on Edge Block',
      targetMuscle: 'Gastrocnemius & Achilles Tendon',
      equipment: 'Calf Raise Machine / Smith Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '15-20 reps', '45': '15-20 reps', '60': '15-20 reps', '90': '12-15 reps', '120': '15-20 reps' },
      tempo: '2-2-1-2',
      formTip: 'Deep heel drop at bottom for Achilles stretch, 2-second hold on the balls of your feet.',
    },
    {
      name: 'Seated Tibialis & Soleus Calf Raises',
      targetMuscle: 'Soleus & Shin Strength',
      equipment: 'Seated Calf Machine',
      intensityType: 'finisher',
      repsByDuration: { '30': '20 reps', '45': '20 reps', '60': '15-20 reps', '90': '15-20 reps', '120': '20 reps to failure' },
      tempo: '3-1-1-1',
      formTip: 'Slow eccentric tempo protects knee joints and bolsters sprint mechanics.',
    },
  ],
  5: [
    // Endurance & Core/Abs Day
    {
      name: 'Hanging Leg Raises / Captain Chair Knee Tucks',
      targetMuscle: 'Lower Rectus Abdominis & Hip Flexors',
      equipment: 'Pull-up Bar / Dip Station',
      intensityType: 'compound',
      repsByDuration: { '30': '12-15 reps', '45': '12-15 reps', '60': '10-15 reps', '90': '12-15 reps', '120': '15 reps' },
      tempo: '2-0-1-1',
      formTip: 'Posteriorly tilt pelvis to initiate lift; avoid swinging with legs alone.',
    },
    {
      name: 'Ab Wheel Rollouts (Kneeling)',
      targetMuscle: 'Transverse Abdominis & Anti-Extension',
      equipment: 'Ab Wheel Roller',
      intensityType: 'compound',
      repsByDuration: { '30': '10-12 reps', '45': '10-12 reps', '60': '8-12 reps', '90': '10-12 reps', '120': '12-15 reps' },
      tempo: '3-1-1-0',
      formTip: 'Keep slight hollow curve in spine, roll out as far as core can maintain without lumbar dip.',
    },
    {
      name: 'Standing Cable Woodchoppers (High-to-Low)',
      targetMuscle: 'Internal & External Obliques',
      equipment: 'Cable Machine',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps/side', '45': '12 reps/side', '60': '10-12 reps', '90': '12-15 reps', '120': '12-15 reps' },
      tempo: '2-0-1-1',
      formTip: 'Rotate through the thoracic spine and hips with arms extended, lock core at finish.',
    },
    {
      name: 'Heavy Kettlebell Farmer Walks',
      targetMuscle: 'Grip, Traps & Anti-Lateral Core Stability',
      equipment: '2 Heavy Kettlebells / Dumbbells',
      intensityType: 'accessory',
      repsByDuration: { '30': '40 seconds', '45': '45 seconds', '60': '50-60s', '90': '60 seconds', '120': '60-75s' },
      tempo: 'Controlled steps',
      formTip: 'Walk in a straight line with upright posture; resist side-to-side torso sway.',
    },
    {
      name: 'Russian Twists with Medicine Ball',
      targetMuscle: 'Rotational Abdominal Wall',
      equipment: 'Medicine Ball (6-10kg)',
      intensityType: 'accessory',
      repsByDuration: { '30': '20 total reps', '45': '20-24 reps', '60': '20-30 reps', '90': '24-30 reps', '120': '30 reps' },
      tempo: 'Rhythmic control',
      formTip: 'Elevate feet 3 inches, rotate shoulders completely so the ball taps the ground on each side.',
    },
    {
      name: 'Plank to Push-Up Transitions',
      targetMuscle: 'Shoulder Girdle & Deep Core Cylinder',
      equipment: 'Bodyweight Mat',
      intensityType: 'accessory',
      repsByDuration: { '30': '12 reps', '45': '12-14 reps', '60': '12-16 reps', '90': '16 reps', '120': '16-20 reps' },
      tempo: 'Controlled',
      formTip: 'Alternate leading arm, lock hips to avoid excessive swaying while climbing.',
    },
    {
      name: 'Hollow Body Hold & Rockers',
      targetMuscle: 'Deep Anterior Kinetic Compression',
      equipment: 'Bodyweight Mat',
      intensityType: 'accessory',
      repsByDuration: { '30': '30s hold', '45': '35s hold', '60': '45s hold', '90': '45-60s hold', '120': '60s hold' },
      tempo: 'Isometric Hold',
      formTip: 'Lower back pressed flush into the floor, toes pointed, arms locked overhead.',
    },
    {
      name: 'HIIT Conditioning: Assault Bike / Row Intervals',
      targetMuscle: 'Full-Body Anaerobic Threshold & VO2 Max',
      equipment: 'Air Bike / Concept2 Rower',
      intensityType: 'finisher',
      repsByDuration: { '30': '20s sprint / 40s easy', '45': '30s sprint / 30s easy', '60': '30s on / 30s off (6 rds)', '90': '8 rounds interval', '120': '10 rounds interval' },
      tempo: 'Max Effort',
      formTip: 'Explode during work intervals; breathe deeply through nose during rest periods.',
    },
  ],
  6: [
    // Active Recovery / Full Body Functional
    {
      name: 'Turkish Get-Up with Light Kettlebell',
      targetMuscle: 'Shoulder Stability & Total Kinetic Coordination',
      equipment: 'Kettlebell (8-16kg)',
      intensityType: 'compound',
      repsByDuration: { '30': '3 reps/side', '45': '4 reps/side', '60': '5 reps/side', '90': '5 reps/side', '120': '6 reps/side' },
      tempo: 'Deliberate',
      formTip: 'Keep eye focused on the kettlebell at all times, lock shoulder pack in socket.',
    },
    {
      name: 'Deep Kettlebell Goblet Squat with Hip Prying',
      targetMuscle: 'Hip Capsule, Adductors & Ankle Dorsiflexion',
      equipment: 'Light Kettlebell',
      intensityType: 'accessory',
      repsByDuration: { '30': '8-10 reps', '45': '10 reps', '60': '10-12 reps', '90': '10-12 reps', '120': '12 reps' },
      tempo: '3-3-1-0',
      formTip: 'Pause 3 seconds at bottom, use elbows to gently pry knees open for hip mobility.',
    },
    {
      name: "World's Greatest Stretch into Thoracic Windmill",
      targetMuscle: 'Thoracic Spine, Hip Flexors & Hamstrings',
      equipment: 'Bodyweight / Yoga Mat',
      intensityType: 'mobility',
      repsByDuration: { '30': '5 reps/side', '45': '6 reps/side', '60': '6-8 reps/side', '90': '8 reps/side', '120': '8 reps/side' },
      tempo: 'Fluid Flow',
      formTip: 'Lunge forward, elbow inside instep, rotate arm towards ceiling following with your eyes.',
    },
    {
      name: 'Bird-Dog & Deadbug Kinetic Chains',
      targetMuscle: 'Rotary Stability & Lumbo-Pelvic Rhythm',
      equipment: 'Mat',
      intensityType: 'mobility',
      repsByDuration: { '30': '8 reps/side', '45': '10 reps/side', '60': '10-12 reps', '90': '12 reps/side', '120': '12-15 reps' },
      tempo: '3-1-3-0',
      formTip: 'Do not allow lower back to arch; pause at full extension with fist and heel reaching away.',
    },
    {
      name: 'Resistance Band Shoulder Dislocates & Pull-Aparts',
      targetMuscle: 'Scapulohumeral Rhythm & Rotator Cuffs',
      equipment: 'Light Loop Band',
      intensityType: 'mobility',
      repsByDuration: { '30': '15 reps', '45': '15 reps', '60': '15-20 reps', '90': '20 reps', '120': '20-25 reps' },
      tempo: 'Smooth Arc',
      formTip: 'Widen grip as needed to pass overhead smoothly without shrugging trap muscles.',
    },
    {
      name: '90/90 Hip Internal & External Rotator Flow',
      targetMuscle: 'Hip Capsule Joint Health',
      equipment: 'Mat',
      intensityType: 'mobility',
      repsByDuration: { '30': '6 switches/side', '45': '8 switches', '60': '8-10 switches', '90': '10 switches', '120': '12 switches' },
      tempo: 'Deliberate',
      formTip: 'Sit upright without hand assistance if possible, transition knees side to side with control.',
    },
    {
      name: 'Zone 2 Steady-State Aerobic Flush (Treadmill Incline / Row)',
      targetMuscle: 'Mitochondrial Density & Lactate Clearance',
      equipment: 'Incline Treadmill / Rower / Cycle',
      intensityType: 'finisher',
      repsByDuration: { '30': '10 mins', '45': '15 mins', '60': '20 mins', '90': '25 mins', '120': '30 mins' },
      tempo: 'Nasal Breathing Pace',
      formTip: 'Keep heart rate in conversational Zone 2 (60-70% max HR) to optimize cellular recovery.',
    },
  ],
  7: [
    // Rest / Mobility Day
    {
      name: 'Foam Roller Thoracic Spine Extension',
      targetMuscle: 'Thoracic Spine & Kyphosis Relief',
      equipment: 'Foam Roller',
      intensityType: 'mobility',
      repsByDuration: { '30': '2 mins', '45': '3 mins', '60': '4 mins', '90': '5 mins', '120': '5 mins' },
      tempo: 'Slow rolling',
      formTip: 'Support head with hands, roll from mid-back to base of neck, pausing on tight trigger spots.',
    },
    {
      name: 'Couch Stretch (Deep Hip Flexor & Psoas Opener)',
      targetMuscle: 'Psoas Major & Rectus Femoris',
      equipment: 'Wall or Couch',
      intensityType: 'mobility',
      repsByDuration: { '30': '90s per side', '45': '2 mins per side', '60': '2 mins/side', '90': '2.5 mins/side', '120': '3 mins/side' },
      tempo: 'Passive Breathing',
      formTip: 'Back shin flat against wall, squeeze glute of back leg to drive hip into deep front opening.',
    },
    {
      name: 'Elevated Pigeon Pose or Figure-4 Stretch',
      targetMuscle: 'Piriformis & Deep Glute External Rotators',
      equipment: 'Bench or Mat',
      intensityType: 'mobility',
      repsByDuration: { '30': '90s per side', '45': '2 mins per side', '60': '2 mins/side', '90': '2 mins/side', '120': '2.5 mins/side' },
      tempo: 'Deep Exhales',
      formTip: 'Keep front shin angled comfortably; sink weight down into hips with long spine.',
    },
    {
      name: "Child's Pose with Lat & Quadratus Lumborum Reach",
      targetMuscle: 'Lower Back, Lats & Parasympathetic Nervous System',
      equipment: 'Mat',
      intensityType: 'mobility',
      repsByDuration: { '30': '2 mins', '45': '3 mins', '60': '3 mins', '90': '4 mins', '120': '5 mins' },
      tempo: 'Deep Belly Breaths',
      formTip: 'Walk hands 45 degrees to the left for lat opening, then switch to right side.',
    },
    {
      name: 'Hamstring & Calf Flossing with Mobility Band',
      targetMuscle: 'Sciatic Nerve Glide & Hamstring Fascia',
      equipment: 'Long Resistance Band',
      intensityType: 'mobility',
      repsByDuration: { '30': '90s/side', '45': '2 mins/side', '60': '2 mins/side', '90': '2 mins/side', '120': '3 mins/side' },
      tempo: 'Gentle pump',
      formTip: 'Lie on back, loop band over foot, gently point and flex ankle at top range.',
    },
    {
      name: 'Box Breathing Protocol (4s in, 4s hold, 4s out, 4s hold)',
      targetMuscle: 'Parasympathetic Vagal Tone & CNS Recovery',
      equipment: 'Quiet Space',
      intensityType: 'mobility',
      repsByDuration: { '30': '5 mins', '45': '8 mins', '60': '10 mins', '90': '12 mins', '120': '15 mins' },
      tempo: '4-4-4-4 Breath',
      formTip: 'Inhale through nose into belly for 4s, hold 4s, smooth exhale for 4s, hold empty 4s.',
    },
  ],
};

/**
 * Generates a tailored workout plan for a given day and user duration.
 */
export function generateDailyWorkoutPlan(dayId: number, durationMinutes: number): DailyWorkoutPlan {
  const rotation = SEVEN_DAY_ROTATION.find((r) => r.id === dayId) || SEVEN_DAY_ROTATION[0];
  const catalog = EXERCISE_CATALOG[dayId] || EXERCISE_CATALOG[1];

  // Map duration into standard tier key for catalog lookups
  let tierKey = '60';
  let exerciseCount = 5;
  let defaultSets = 3;
  let defaultRest = 60;
  let intensityLabel = 'Balanced Hypertrophy & Power';
  let styleDescription = 'Optimal balance of compound anchors, targeted isolation, and steady progressive overload.';
  let burnRatePerMin = 7.5;

  if (durationMinutes <= 35) {
    tierKey = '30';
    exerciseCount = 4;
    defaultSets = 3;
    defaultRest = 35; // short rest for high density
    intensityLabel = 'High-Intensity Supersets';
    styleDescription = 'Condensed antagonist supersets and minimal rest periods to maximize cardiac output and mechanical density.';
    burnRatePerMin = 9.0;
  } else if (durationMinutes <= 50) {
    tierKey = '45';
    exerciseCount = 5;
    defaultSets = 3;
    defaultRest = 50;
    intensityLabel = 'High-Efficiency Split';
    styleDescription = 'Fast-paced compound progression followed by isolation supersets for lean muscle retention.';
    burnRatePerMin = 8.2;
  } else if (durationMinutes <= 75) {
    tierKey = '60';
    exerciseCount = 6;
    defaultSets = 3;
    defaultRest = 75;
    intensityLabel = 'Standard Hypertrophy Split';
    styleDescription = 'Structured compound anchors with multi-angle isolation movements and focused rest intervals.';
    burnRatePerMin = 7.5;
  } else if (durationMinutes <= 100) {
    tierKey = '90';
    exerciseCount = 7;
    defaultSets = 4;
    defaultRest = 90;
    intensityLabel = 'Deep-Split Volume Overload';
    styleDescription = 'Pyramid strength progression, deep angle specialization, and metabolic fatigue finishers.';
    burnRatePerMin = 7.0;
  } else {
    // 100 to 120 mins
    tierKey = '120';
    exerciseCount = Math.min(catalog.length, 9);
    defaultSets = 4;
    defaultRest = 105;
    intensityLabel = 'Elite Deep-Split Master Routine';
    styleDescription = 'Full neuromuscular preparation, heavy primary strength work with full neural recovery, isolation clusters, and dedicated mobility cooldown.';
    burnRatePerMin = 6.8;
  }

  // Adjust for rest day
  if (rotation.isRestDay) {
    exerciseCount = Math.min(catalog.length, 6);
    intensityLabel = 'Restorative CNS & Mobility';
    styleDescription = 'Zero high-stress spinal loading. Focus on fascial decompression, deep breathwork, and parasympathetic recovery.';
    burnRatePerMin = 3.5;
  }

  // Select exercises
  const selectedTemplates = catalog.slice(0, exerciseCount);
  
  // Create exercise objects
  const exercises: Exercise[] = selectedTemplates.map((template, idx) => {
    // Determine if supersetted (e.g. for short workouts, pair 0+1, 2+3)
    const isSuperset = (durationMinutes <= 45 && !rotation.isRestDay && idx % 2 === 0 && idx + 1 < selectedTemplates.length);
    const supersetPairId = isSuperset ? `superset-${Math.floor(idx / 2) + 1}` : undefined;

    let sets = defaultSets;
    let restSeconds = defaultRest;

    if (rotation.isRestDay) {
      sets = 2;
      restSeconds = 30;
    } else if (template.intensityType === 'compound') {
      sets = durationMinutes >= 90 ? 4 : (durationMinutes <= 35 ? 3 : 3);
      restSeconds = durationMinutes >= 90 ? 105 : (durationMinutes <= 35 ? 40 : 75);
    } else if (template.intensityType === 'finisher') {
      sets = 2;
      restSeconds = durationMinutes <= 35 ? 30 : 45;
    }

    if (isSuperset) {
      restSeconds = 15; // move immediately to partner exercise
    }

    const reps = template.repsByDuration[tierKey] || template.repsByDuration['60'] || '10-12 reps';

    return {
      id: `ex-${dayId}-${idx}`,
      name: template.name,
      targetMuscle: template.targetMuscle,
      equipment: template.equipment,
      sets,
      reps,
      restSeconds,
      tempo: template.tempo,
      formTip: template.formTip,
      isSupersetWithNext: isSuperset,
      supersetPairId,
      intensityType: template.intensityType,
    };
  });

  const totalSets = exercises.reduce((acc, curr) => acc + curr.sets, 0);
  const burnEstimateKcal = Math.round(durationMinutes * burnRatePerMin);

  return {
    dayId,
    dayName: rotation.dayName,
    focus: rotation.focus,
    bannerHeadline: rotation.bannerHeadline,
    durationMinutes,
    intensityLabel,
    burnEstimateKcal,
    totalSets,
    exercises,
    styleDescription,
  };
}
