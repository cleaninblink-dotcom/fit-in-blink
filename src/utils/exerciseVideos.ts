// Curated Biomechanical Human Demonstration Video Database
// Verified looping demonstration videos featuring fit human models
// performing each movement with exact gym equipment and proper form.

export interface ExerciseVideoVisual {
  name: string;
  equipment: string;
  maleVideoUrl: string;
  femaleVideoUrl: string;
  posterUrl: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  biomechanicalCue: string;
  executionCheckpoints: string[];
}

const BASE_REPO = 'https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/';

export const EXERCISE_VIDEO_DATABASE: Record<string, ExerciseVideoVisual> = {
  // ==========================================
  // DAY 1: CHEST DAY
  // ==========================================
  'Flat Barbell Bench Press': {
    name: 'Flat Barbell Bench Press',
    equipment: 'Barbell & Flat Bench',
    maleVideoUrl: `${BASE_REPO}videos/0025-EIeI8Vf.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0025-EIeI8Vf.gif`,
    posterUrl: `${BASE_REPO}images/0025-EIeI8Vf.jpg`,
    primaryMuscle: 'Pectoralis Major (Mid & Lower)',
    secondaryMuscles: ['Anterior Deltoid', 'Triceps Brachii', 'Serratus Anterior'],
    biomechanicalCue: 'Retract and depress scapulae, plant feet firmly, lower bar with elbows at 45-degree angle to mid-sternum.',
    executionCheckpoints: [
      'Firm 5-point body contact (head, upper back, glutes, both feet).',
      'Controlled 3-second eccentric descent to touch nipple line.',
      'Explosive drive upward without unlocking scapulae at lockout.'
    ]
  },
  'Incline Dumbbell Press (30° Angle)': {
    name: 'Incline Dumbbell Press (30° Angle)',
    equipment: 'Dumbbells & Incline Bench',
    maleVideoUrl: `${BASE_REPO}videos/0314-ns0SIbU.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0314-ns0SIbU.gif`,
    posterUrl: `${BASE_REPO}images/0314-ns0SIbU.jpg`,
    primaryMuscle: 'Clavicular Head (Upper Pecs)',
    secondaryMuscles: ['Front Deltoids', 'Triceps'],
    biomechanicalCue: 'Set bench to 30 degrees to bias upper chest without letting anterior deltoids take over. Arc weights up smoothly.',
    executionCheckpoints: [
      'Slight internal rotation at peak contraction for maximum sternal fiber squeeze.',
      'Maintain neutral wrists stacked directly over forearms.',
      'Full deep stretch at bottom of repetition without shoulder roll.'
    ]
  },
  'Weighted or Bodyweight Chest Dips': {
    name: 'Weighted or Bodyweight Chest Dips',
    equipment: 'Parallel Dip Bars',
    maleVideoUrl: `${BASE_REPO}videos/0009-PAgTVaK.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0009-PAgTVaK.gif`,
    posterUrl: `${BASE_REPO}images/0009-PAgTVaK.jpg`,
    primaryMuscle: 'Lower Pectorals & Triceps',
    secondaryMuscles: ['Anterior Deltoids', 'Core Stabilizers'],
    biomechanicalCue: 'Pitch torso forward 25-30 degrees with flared elbows to shift mechanical load directly into lower chest shelf.',
    executionCheckpoints: [
      'Maintain forward torso tilt throughout the entire eccentric phase.',
      'Descend until upper arms are parallel to the floor.',
      'Drive through palms and lock out pecs at top.'
    ]
  },
  'Standing Cable Pec Flyes (Mid to High)': {
    name: 'Standing Cable Pec Flyes (Mid to High)',
    equipment: 'Dual Cable Machine',
    maleVideoUrl: `${BASE_REPO}videos/0154-aqvSOQE.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0154-aqvSOQE.gif`,
    posterUrl: `${BASE_REPO}images/0154-aqvSOQE.jpg`,
    primaryMuscle: 'Sternal Pectoralis Major',
    secondaryMuscles: ['Coracobrachialis', 'Biceps Short Head'],
    biomechanicalCue: 'Lock a slight 15-degree elbow bend in place; bring handles together like hugging a wide barrel.',
    executionCheckpoints: [
      'Staggered athletic stance for optimal core balance.',
      'Lead with elbows during eccentric opening phase.',
      'Hold 1.5-second isometric squeeze when hands touch at peak.'
    ]
  },
  'Incline Dumbbell Hex Press': {
    name: 'Incline Dumbbell Hex Press',
    equipment: 'Hex Dumbbells & Incline Bench',
    maleVideoUrl: `${BASE_REPO}videos/3545-TVdivgY.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/3545-TVdivgY.gif`,
    posterUrl: `${BASE_REPO}images/3545-TVdivgY.jpg`,
    primaryMuscle: 'Inner Clavicular Pectorals',
    secondaryMuscles: ['Triceps', 'Anterior Delts'],
    biomechanicalCue: 'Press dumbbells together with maximum inward isometric force throughout the entire range of motion.',
    executionCheckpoints: [
      'Maintain continuous inward crushing pressure between dumbbell heads.',
      'Keep elbows tucked close to ribcage during descent.',
      'Exhale and drive straight up along chest plane.'
    ]
  },
  'Low-to-High Cable Crossover': {
    name: 'Low-to-High Cable Crossover',
    equipment: 'Dual Cable Pulleys (Low)',
    maleVideoUrl: `${BASE_REPO}videos/0155-0CXGHya.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0155-0CXGHya.gif`,
    posterUrl: `${BASE_REPO}images/0155-0CXGHya.jpg`,
    primaryMuscle: 'Upper Pectoral Shelf',
    secondaryMuscles: ['Front Deltoids', 'Biceps'],
    biomechanicalCue: 'Pull cables from low position upward and inward toward collarbones with palms facing supinated/up.',
    executionCheckpoints: [
      'Palms turned slightly upward at peak contraction.',
      'Keep core braced to prevent lumbar hyperextension.',
      'Control return to avoid joint strain on shoulders.'
    ]
  },
  'Dumbbell Pullover': {
    name: 'Dumbbell Pullover',
    equipment: 'Dumbbell & Cross-Bench',
    maleVideoUrl: `${BASE_REPO}videos/0375-9XjtHvS.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0375-9XjtHvS.gif`,
    posterUrl: `${BASE_REPO}images/0375-9XjtHvS.jpg`,
    primaryMuscle: 'Serratus Anterior & Latissimus Dorsi',
    secondaryMuscles: ['Triceps Long Head', 'Upper Pectorals'],
    biomechanicalCue: 'Drop hips slightly below bench level to maximize thoracic ribcage expansion and fascial stretch.',
    executionCheckpoints: [
      'Cup top dumbbell head firmly with diamond hand grip.',
      'Lower weight behind head with elbows softly bent.',
      'Pull over back across chest stopping at eyebrow level.'
    ]
  },
  'Deficit Push-Up Burnout Finisher': {
    name: 'Deficit Push-Up Burnout Finisher',
    equipment: 'Push-Up Blocks / Weight Plates',
    maleVideoUrl: `${BASE_REPO}videos/0259-x6KpKpq.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0259-x6KpKpq.gif`,
    posterUrl: `${BASE_REPO}images/0259-x6KpKpq.jpg`,
    primaryMuscle: 'Full Pectoral Complex',
    secondaryMuscles: ['Triceps', 'Core Planks'],
    biomechanicalCue: 'Elevate hands on 2-3 inch deficit blocks to stretch chest past floor level before explosive push.',
    executionCheckpoints: [
      'Neutral spine with glutes and abs fully braced.',
      'Deep chest dip past hand plane for maximum stretch.',
      'Push floor away with maximum intent on burnout.'
    ]
  },
  'Plate Pinch Press / Isometric Chest Squeeze': {
    name: 'Plate Pinch Press / Isometric Chest Squeeze',
    equipment: 'Weight Plates (5-10kg)',
    maleVideoUrl: `${BASE_REPO}videos/0289-SpYC0Kp.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0289-SpYC0Kp.gif`,
    posterUrl: `${BASE_REPO}images/0289-SpYC0Kp.jpg`,
    primaryMuscle: 'Sternal & Clavicular Pectoralis',
    secondaryMuscles: ['Grip Flexors', 'Front Delts'],
    biomechanicalCue: 'Pinch flat plates between open palms without curling fingers; press straight out and hold.',
    executionCheckpoints: [
      'Pure palm friction holding plates together.',
      'Slow horizontal push forward until arms are locked.',
      'Feel intense continuous inner-chest cramping.'
    ]
  },

  // ==========================================
  // DAY 2: BACK & SHOULDERS DAY
  // ==========================================
  'Deadlift or Heavy Pendlay Row': {
    name: 'Deadlift or Heavy Pendlay Row',
    equipment: 'Olympic Barbell & Plates',
    maleVideoUrl: `${BASE_REPO}videos/0032-ila4NZS.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0032-ila4NZS.gif`,
    posterUrl: `${BASE_REPO}images/0032-ila4NZS.jpg`,
    primaryMuscle: 'Posterior Kinetic Chain & Latissimus',
    secondaryMuscles: ['Erector Spinae', 'Glutes', 'Hamstrings', 'Trapezius'],
    biomechanicalCue: 'Brace core with intra-abdominal Valsalva breath, pack lats like squeezing oranges in armpits, drive floor away.',
    executionCheckpoints: [
      'Barbell remains in contact with shins and thighs during path.',
      'Hips and chest rise at identical mechanical velocity.',
      'Lock hips through glute contraction without hyperextending lower back.'
    ]
  },
  'Seated Overhead Dumbbell Shoulder Press': {
    name: 'Seated Overhead Dumbbell Shoulder Press',
    equipment: 'Dumbbells & 80° Upright Bench',
    maleVideoUrl: `${BASE_REPO}videos/3547-OeL23VY.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/3547-OeL23VY.gif`,
    posterUrl: `${BASE_REPO}images/3547-OeL23VY.jpg`,
    primaryMuscle: 'Anterior & Lateral Deltoids',
    secondaryMuscles: ['Triceps Brachii', 'Upper Traps'],
    biomechanicalCue: 'Slightly tuck elbows 30 degrees into scapular plane to prevent shoulder subacromial impingement.',
    executionCheckpoints: [
      'Press dumbbells directly upward until biceps align with ears.',
      'Avoid banging dumbbells together at top.',
      'Lower weights under strict 2-3 second tempo to ear level.'
    ]
  },
  'Wide-Grip Lat Pulldown': {
    name: 'Wide-Grip Lat Pulldown',
    equipment: 'Cable Lat Machine & Wide Bar',
    maleVideoUrl: `${BASE_REPO}videos/2330-LEprlgG.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/2330-LEprlgG.gif`,
    posterUrl: `${BASE_REPO}images/2330-LEprlgG.jpg`,
    primaryMuscle: 'Latissimus Dorsi (Outer Width)',
    secondaryMuscles: ['Teres Major', 'Rhomboids', 'Biceps'],
    biomechanicalCue: 'Drive elbows down into your back pockets; keep chest puffed up toward ceiling pulley.',
    executionCheckpoints: [
      'Pull bar smoothly to upper clavicle.',
      'Avoid excessive torso swinging or leaning back beyond 15 degrees.',
      'Full overhead lat stretch on negative ascent.'
    ]
  },
  'Lean-Away Dumbbell Lateral Raises': {
    name: 'Lean-Away Dumbbell Lateral Raises',
    equipment: 'Dumbbell & Upright Post',
    maleVideoUrl: `${BASE_REPO}videos/0311-AQ0mC4Y.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0311-AQ0mC4Y.gif`,
    posterUrl: `${BASE_REPO}images/0311-AQ0mC4Y.jpg`,
    primaryMuscle: 'Lateral Deltoid Head',
    secondaryMuscles: ['Supraspinatus', 'Trapezius'],
    biomechanicalCue: 'Lean 15 degrees away from post to keep constant tension on side delt even at bottom of stroke.',
    executionCheckpoints: [
      'Raise arm in scapular plane with pinky slightly elevated.',
      'Pause for 1 second at parallel shoulder height.',
      'Control descent without momentum or hip bouncing.'
    ]
  },
  'Chest-Supported Neutral Dumbbell Row': {
    name: 'Chest-Supported Neutral Dumbbell Row',
    equipment: 'Dumbbells & 45° Incline Bench',
    maleVideoUrl: `${BASE_REPO}videos/0293-BJ0Hz5L.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0293-BJ0Hz5L.gif`,
    posterUrl: `${BASE_REPO}images/0293-BJ0Hz5L.jpg`,
    primaryMuscle: 'Mid-Back, Rhomboids & Lower Traps',
    secondaryMuscles: ['Latissimus', 'Rear Delts', 'Biceps'],
    biomechanicalCue: 'Rest chest firmly on bench to eliminate all lumbar momentum; pull elbows straight back.',
    executionCheckpoints: [
      'Retract scapulae tightly at top of row.',
      'Keep neutral palms facing inward.',
      'Stretch lats forward at bottom without lifting chest off bench.'
    ]
  },
  'Face Pulls with High Rope Attachment': {
    name: 'Face Pulls with High Rope Attachment',
    equipment: 'Cable Machine & Long Rope',
    maleVideoUrl: `${BASE_REPO}videos/0177-CuaWCmC.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0177-CuaWCmC.gif`,
    posterUrl: `${BASE_REPO}images/0177-CuaWCmC.jpg`,
    primaryMuscle: 'Rear Deltoids & Rotator Cuff (Infraspinatus)',
    secondaryMuscles: ['Middle Traps', 'Rhomboids'],
    biomechanicalCue: 'Pull rope directly toward eye level while rotating knuckles back into a double bicep flex position.',
    executionCheckpoints: [
      'External rotation of shoulders at peak pull.',
      'Thumbs pointing behind you at finish.',
      'Hold 1.5-second isometric squeeze per rep.'
    ]
  },
  'Single-Arm Dumbbell Row (Kroc Style)': {
    name: 'Single-Arm Dumbbell Row (Kroc Style)',
    equipment: 'Heavy Dumbbell & Flat Bench',
    maleVideoUrl: `${BASE_REPO}videos/0293-BJ0Hz5L.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0293-BJ0Hz5L.gif`,
    posterUrl: `${BASE_REPO}images/0293-BJ0Hz5L.jpg`,
    primaryMuscle: 'Latissimus Dorsi & Rhomboids',
    secondaryMuscles: ['Posterior Deltoid', 'Brachialis'],
    biomechanicalCue: 'Pull dumbbell in an arc toward hip pocket rather than straight vertical to maximize lat activation.',
    executionCheckpoints: [
      'Flat back parallel to ground.',
      'Avoid rotating torso excessively during lift.',
      'Full lat stretch at bottom with scapular protraction.'
    ]
  },
  'Standing Dumbbell / Barbell Shrugs': {
    name: 'Standing Dumbbell / Barbell Shrugs',
    equipment: 'Dumbbells or Barbell',
    maleVideoUrl: `${BASE_REPO}videos/0095-dG7tG5y.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0406-NJzBsGJ.gif`,
    posterUrl: `${BASE_REPO}images/0095-dG7tG5y.jpg`,
    primaryMuscle: 'Upper Trapezius & Levator Scapulae',
    secondaryMuscles: ['Forearms', 'Neck Extensors'],
    biomechanicalCue: 'Elevate shoulders directly toward ears in a clean vertical path without rolling neck or shoulders.',
    executionCheckpoints: [
      'Vertical elevation only (no rolling backwards).',
      'Hold 2-second peak squeeze at top.',
      'Lower under control to stretch trap fibers.'
    ]
  },
  'Reverse Pec Deck / Rear Delt Flyes': {
    name: 'Reverse Pec Deck / Rear Delt Flyes',
    equipment: 'Rear Delt Flye Machine',
    maleVideoUrl: `${BASE_REPO}videos/1022-tc5dYrf.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1022-tc5dYrf.gif`,
    posterUrl: `${BASE_REPO}images/1022-tc5dYrf.jpg`,
    primaryMuscle: 'Posterior Deltoids',
    secondaryMuscles: ['Infraspinatus', 'Rhomboids'],
    biomechanicalCue: 'Keep slight elbow bend, lead movement with back of wrists, drive outward without arching back.',
    executionCheckpoints: [
      'Seat adjusted so handles align directly with rear delts.',
      'Keep chest pressed flat into pad.',
      'Slow eccentric return before weights touch stack.'
    ]
  },

  // ==========================================
  // DAY 3: ARMS DAY
  // ==========================================
  'Close-Grip Barbell Bench Press': {
    name: 'Close-Grip Barbell Bench Press',
    equipment: 'Barbell & Flat Bench',
    maleVideoUrl: `${BASE_REPO}videos/0030-J6Dx1Mu.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0030-J6Dx1Mu.gif`,
    posterUrl: `${BASE_REPO}images/0030-J6Dx1Mu.jpg`,
    primaryMuscle: 'Triceps Brachii (All 3 Heads)',
    secondaryMuscles: ['Inner Chest', 'Front Delts'],
    biomechanicalCue: 'Grip bar shoulder-width apart; keep elbows tucked tight against ribcage during entire path.',
    executionCheckpoints: [
      'Shoulder-width grip (avoid overly narrow grip that stresses wrists).',
      'Lower bar to lower sternum.',
      'Explosive tricep lockout at top.'
    ]
  },
  'Incline Dumbbell Bicep Curls': {
    name: 'Incline Dumbbell Bicep Curls',
    equipment: 'Dumbbells & 45° Incline Bench',
    maleVideoUrl: `${BASE_REPO}videos/0315-F3xgbjF.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0315-F3xgbjF.gif`,
    posterUrl: `${BASE_REPO}images/0315-F3xgbjF.jpg`,
    primaryMuscle: 'Biceps Brachii (Long Head / Outer Peak)',
    secondaryMuscles: ['Brachialis', 'Forearm Flexors'],
    biomechanicalCue: 'Arms hang perpendicular to floor behind torso to place maximum stretch on biceps long head tendon.',
    executionCheckpoints: [
      'Start with supinated palms facing forward.',
      'Curl without swinging elbows forward.',
      'Peak contraction at top, slow 3-second descent.'
    ]
  },
  'Overhead Cable Triceps Extension': {
    name: 'Overhead Cable Triceps Extension',
    equipment: 'Cable Machine & Tricep Rope',
    maleVideoUrl: `${BASE_REPO}videos/0194-2IxROQ1.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0194-2IxROQ1.gif`,
    posterUrl: `${BASE_REPO}images/0194-2IxROQ1.jpg`,
    primaryMuscle: 'Triceps Long Head',
    secondaryMuscles: ['Lateral Tricep Head', 'Anconeus'],
    biomechanicalCue: 'Extend elbows fully overhead and flare rope ends outward at completion to lock out long head.',
    executionCheckpoints: [
      'Elbows stationary pointing forward.',
      'Deep eccentric stretch behind head.',
      'Spread rope apart at top lockout.'
    ]
  },
  'Standing Barbell / EZ-Bar Spider Curls': {
    name: 'Standing Barbell / EZ-Bar Spider Curls',
    equipment: 'EZ-Bar & Preacher Bench',
    maleVideoUrl: `${BASE_REPO}videos/0454-Ye5Qxb0.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0454-Ye5Qxb0.gif`,
    posterUrl: `${BASE_REPO}images/0454-Ye5Qxb0.jpg`,
    primaryMuscle: 'Biceps Short Head (Inner Thickness)',
    secondaryMuscles: ['Brachialis'],
    biomechanicalCue: 'Torso angled over vertical edge of bench to strictly isolate biceps with zero hip momentum.',
    executionCheckpoints: [
      'Upper arms fixed against vertical pad.',
      'Curl bar up toward chin.',
      'Squeeze biceps hard for 1 second at top.'
    ]
  },
  'Triceps Straight-Bar Pushdown': {
    name: 'Triceps Straight-Bar Pushdown',
    equipment: 'Cable Stack & Straight/V-Bar',
    maleVideoUrl: `${BASE_REPO}videos/0241-gAwDzB3.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0241-gAwDzB3.gif`,
    posterUrl: `${BASE_REPO}images/0241-gAwDzB3.jpg`,
    primaryMuscle: 'Triceps Lateral & Medial Heads',
    secondaryMuscles: ['Anconeus'],
    biomechanicalCue: 'Pin elbows to sides like hinges; push bar down smoothly until elbows lock completely.',
    executionCheckpoints: [
      'Upper body tilted slightly forward with firm core.',
      'Elbows locked at side without swinging.',
      'Full lockout squeeze at bottom.'
    ]
  },
  'Standing Hammer Curls with Cross-Body Arc': {
    name: 'Standing Hammer Curls with Cross-Body Arc',
    equipment: 'Dumbbells',
    maleVideoUrl: `${BASE_REPO}videos/0313-slDvUAU.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0313-slDvUAU.gif`,
    posterUrl: `${BASE_REPO}images/0313-slDvUAU.jpg`,
    primaryMuscle: 'Brachialis & Brachioradialis',
    secondaryMuscles: ['Biceps Long Head'],
    biomechanicalCue: 'Neutral grip with thumbs up; curl across chest toward opposite pectoral to build arm width.',
    executionCheckpoints: [
      'Strict neutral hammer grip.',
      'Controlled cadence without torso swaying.',
      'Squeeze forearm and outer bicep at peak.'
    ]
  },
  'Dumbbell Concentration Curls': {
    name: 'Dumbbell Concentration Curls',
    equipment: 'Dumbbell & Flat Bench',
    maleVideoUrl: `${BASE_REPO}videos/0297-gvsWLQw.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0297-gvsWLQw.gif`,
    posterUrl: `${BASE_REPO}images/0297-gvsWLQw.jpg`,
    primaryMuscle: 'Biceps Brachii Peak',
    secondaryMuscles: ['Brachialis'],
    biomechanicalCue: 'Anchor elbow against inner thigh; curl weight up toward face with focused mind-muscle connection.',
    executionCheckpoints: [
      'Tricep braced firmly against inner knee.',
      'Pure elbow flexion without shoulder involvement.',
      'Supinate wrist slightly at top.'
    ]
  },
  'Single-Arm Cable Tricep Kickbacks': {
    name: 'Single-Arm Cable Tricep Kickbacks',
    equipment: 'Low Cable Pulley',
    maleVideoUrl: `${BASE_REPO}videos/1728-vvNjDJS.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1728-vvNjDJS.gif`,
    posterUrl: `${BASE_REPO}images/1728-vvNjDJS.jpg`,
    primaryMuscle: 'Triceps Lateral Head',
    secondaryMuscles: ['Posterior Deltoid'],
    biomechanicalCue: 'Constant cable tension at lockout; extend arm straight back parallel with torso.',
    executionCheckpoints: [
      'Upper arm held stationary parallel to torso.',
      'Full lockout of elbow.',
      'Slow 2-second return to 90 degrees.'
    ]
  },
  'Seated Wrist Curls & Reverse Wrist Curls': {
    name: 'Seated Wrist Curls & Reverse Wrist Curls',
    equipment: 'Dumbbell & Knee Support',
    maleVideoUrl: `${BASE_REPO}videos/1415-YtaCTYl.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1415-YtaCTYl.gif`,
    posterUrl: `${BASE_REPO}images/1415-YtaCTYl.jpg`,
    primaryMuscle: 'Forearm Flexors & Extensors',
    secondaryMuscles: ['Grip Strength Muscles'],
    biomechanicalCue: 'Rest forearms on thighs; curl wrists upward through full range of motion.',
    executionCheckpoints: [
      'Allow dumbbell to roll to fingertips at bottom.',
      'Curl wrist up with full squeeze.',
      'Alternate with reverse grip for complete forearm density.'
    ]
  },

  // ==========================================
  // DAY 4: LEG DAY
  // ==========================================
  'Barbell Back Squat (High or Low Bar)': {
    name: 'Barbell Back Squat (High or Low Bar)',
    equipment: 'Olympic Barbell & Squat Rack',
    maleVideoUrl: `${BASE_REPO}videos/0043-qXTaZnJ.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0043-qXTaZnJ.gif`,
    posterUrl: `${BASE_REPO}images/0043-qXTaZnJ.jpg`,
    primaryMuscle: 'Quadriceps & Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Core & Erector Spinae'],
    biomechanicalCue: 'Break at hips and knees simultaneously; drive knees outward over toes and break parallel depth.',
    executionCheckpoints: [
      'Chest proud with upper back shelf firmly locked under bar.',
      'Depth: Hip crease descends below top of kneecap.',
      'Drive aggressively through mid-foot with hips and chest ascending together.'
    ]
  },
  'Romanian Deadlift (RDL)': {
    name: 'Romanian Deadlift (RDL)',
    equipment: 'Barbell or Heavy Dumbbells',
    maleVideoUrl: `${BASE_REPO}videos/0085-wQ2c4XD.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0085-wQ2c4XD.gif`,
    posterUrl: `${BASE_REPO}images/0085-wQ2c4XD.jpg`,
    primaryMuscle: 'Hamstrings & Glute-Ham Tie-In',
    secondaryMuscles: ['Erector Spinae', 'Lats & Grip'],
    biomechanicalCue: 'Push hips back like closing a car door with your glutes; keep soft knees and flat neutral spine.',
    executionCheckpoints: [
      'Barbell tracks close along thighs to mid-shin.',
      'Feel massive eccentric hamstring stretch before reversing.',
      'Squeeze glutes to stand tall without hyper-arching lower back.'
    ]
  },
  'Bulgarian Split Squat': {
    name: 'Bulgarian Split Squat',
    equipment: 'Dumbbells & Flat Bench',
    maleVideoUrl: `${BASE_REPO}videos/0410-qx4fgX7.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0410-qx4fgX7.gif`,
    posterUrl: `${BASE_REPO}images/0410-qx4fgX7.jpg`,
    primaryMuscle: 'Quadriceps, Glute Medius & Hip Stabilizers',
    secondaryMuscles: ['Hamstrings', 'Adductors'],
    biomechanicalCue: 'Elevate rear foot on bench; drop front knee down until back knee almost grazes gym floor.',
    executionCheckpoints: [
      '80% of bodyweight loaded through front heel.',
      'Maintain upright or slight forward torso lean for glute emphasis.',
      'Drive straight up through front mid-foot.'
    ]
  },
  '45-Degree Leg Press (Foot Placement Mid-Stance)': {
    name: '45-Degree Leg Press (Foot Placement Mid-Stance)',
    equipment: '45-Degree Sled Leg Press',
    maleVideoUrl: `${BASE_REPO}videos/1425-WWD6FzI.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1425-WWD6FzI.gif`,
    posterUrl: `${BASE_REPO}images/1425-WWD6FzI.jpg`,
    primaryMuscle: 'Quadriceps Sweep',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    biomechanicalCue: 'Place feet shoulder-width in center of plate; lower sled until knees reach 90 degrees without butt lifting.',
    executionCheckpoints: [
      'Lower back glued flat into back pad (no pelvic tuck/butt wink).',
      'Controlled 3-second negative descent.',
      'Stop short of hard knee lockout at top.'
    ]
  },
  'Lying or Seated Hamstring Leg Curl': {
    name: 'Lying or Seated Hamstring Leg Curl',
    equipment: 'Leg Curl Machine',
    maleVideoUrl: `${BASE_REPO}videos/0586-17lJ1kr.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0586-17lJ1kr.gif`,
    posterUrl: `${BASE_REPO}images/0586-17lJ1kr.jpg`,
    primaryMuscle: 'Biceps Femoris & Semitendinosus',
    secondaryMuscles: ['Gastrocnemius (Calves)'],
    biomechanicalCue: 'Curl pad fully into glutes; keep hips pinned flat against bench to prevent lumbar assistance.',
    executionCheckpoints: [
      'Dorsiflex toes (pull toes toward shins) for greater hamstring recruitment.',
      'Hold 1-second peak squeeze at full contraction.',
      'Slow 3-second negative extension.'
    ]
  },
  'Leg Extension (Quad Burnout)': {
    name: 'Leg Extension (Quad Burnout)',
    equipment: 'Leg Extension Machine',
    maleVideoUrl: `${BASE_REPO}videos/0585-my33uHU.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0585-my33uHU.gif`,
    posterUrl: `${BASE_REPO}images/0585-my33uHU.jpg`,
    primaryMuscle: 'Rectus Femoris & Vastus Lateralis',
    secondaryMuscles: ['Patellar Tendon Mechanism'],
    biomechanicalCue: 'Drive shin pad upward smoothly; pause and flare quads at top lockout for complete peak tension.',
    executionCheckpoints: [
      'Knee joint aligned with machine pivot axis.',
      'Hold top contraction for 1 full second.',
      'Do not let weights slam into stack at bottom.'
    ]
  },
  'Walking Dumbbell Lunges': {
    name: 'Walking Dumbbell Lunges',
    equipment: 'Dumbbells',
    maleVideoUrl: `${BASE_REPO}videos/0336-RRWFUcw.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0336-RRWFUcw.gif`,
    posterUrl: `${BASE_REPO}images/0336-RRWFUcw.jpg`,
    primaryMuscle: 'Glutes & Quadriceps',
    secondaryMuscles: ['Calves', 'Core Balance'],
    biomechanicalCue: 'Take long strides; drop trailing knee gently toward ground while keeping front shin near vertical.',
    executionCheckpoints: [
      'Torso upright with shoulders pinned back.',
      'Drive through front heel to step into next repetition.',
      'Continuous forward fluid motion.'
    ]
  },
  'Standing Calf Raises on Edge Block': {
    name: 'Standing Calf Raises on Edge Block',
    equipment: 'Elevated Calf Block & Barbell/Machine',
    maleVideoUrl: `${BASE_REPO}videos/1372-8ozhUIZ.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1372-8ozhUIZ.gif`,
    posterUrl: `${BASE_REPO}images/1372-8ozhUIZ.jpg`,
    primaryMuscle: 'Gastrocnemius (Diamond Calf Muscle)',
    secondaryMuscles: ['Soleus', 'Achilles Tendon'],
    biomechanicalCue: 'Full deep stretch at bottom for 2 seconds to eliminate Achilles elastic rebound; explode onto big toes.',
    executionCheckpoints: [
      'Heels sink below block for full fascial stretch.',
      'Rise all the way onto balls of feet.',
      'Hold top peak contraction for 1.5 seconds.'
    ]
  },
  'Seated Tibialis & Soleus Calf Raises': {
    name: 'Seated Tibialis & Soleus Calf Raises',
    equipment: 'Seated Calf Machine',
    maleVideoUrl: `${BASE_REPO}videos/0594-bOOdeyc.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0594-bOOdeyc.gif`,
    posterUrl: `${BASE_REPO}images/0594-bOOdeyc.jpg`,
    primaryMuscle: 'Soleus (Deep Calf) & Tibialis Anterior',
    secondaryMuscles: ['Ankle Stabilizers'],
    biomechanicalCue: 'With knees bent at 90 degrees, gastrocnemius is slackened, directly isolating the soleus muscle.',
    executionCheckpoints: [
      'Padded lever resting securely on lower thighs.',
      'Full downward heel stretch.',
      'Slow controlled rhythm with zero bouncing.'
    ]
  },

  // ==========================================
  // DAY 5: ENDURANCE & CORE/ABS DAY
  // ==========================================
  'Hanging Leg Raises / Captain Chair Knee Tucks': {
    name: 'Hanging Leg Raises / Captain Chair Knee Tucks',
    equipment: 'Pull-Up Bar or Captain Chair',
    maleVideoUrl: `${BASE_REPO}videos/0472-I3tsCnC.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/2801-yT9tk17.gif`,
    posterUrl: `${BASE_REPO}images/0472-I3tsCnC.jpg`,
    primaryMuscle: 'Lower Rectus Abdominis',
    secondaryMuscles: ['Iliopsoas (Hip Flexors)', 'Obliques', 'Grip'],
    biomechanicalCue: 'Roll pelvis upward toward sternum rather than merely swinging legs up to strictly fire the lower abdominal wall.',
    executionCheckpoints: [
      'Posterior pelvic tilt at the top of each rep.',
      'Avoid swinging or using body momentum.',
      'Controlled 3-second descent.'
    ]
  },
  'Ab Wheel Rollouts (Kneeling)': {
    name: 'Ab Wheel Rollouts (Kneeling)',
    equipment: 'Ab Roller Wheel & Knee Mat',
    maleVideoUrl: `${BASE_REPO}videos/0084-7M66AVi.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0971-zhF9lW4.gif`,
    posterUrl: `${BASE_REPO}images/0084-7M66AVi.jpg`,
    primaryMuscle: 'Transverse Abdominis & Rectus Abdominis',
    secondaryMuscles: ['Lats', 'Serratus Anterior', 'Hip Flexors'],
    biomechanicalCue: 'Tuck pelvis under (hollow body posture); roll out until nose is inches from floor, pull back with core.',
    executionCheckpoints: [
      'Never allow lower back to sag or hyperextend.',
      'Arms stay straight; initiation comes from contracting abs.',
      'Inhale on roll-out, exhale forcefully on roll-back.'
    ]
  },
  'Standing Cable Woodchoppers (High-to-Low)': {
    name: 'Standing Cable Woodchoppers (High-to-Low)',
    equipment: 'Cable Machine & Single Handle',
    maleVideoUrl: `${BASE_REPO}videos/1011-S1JXDAG.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1011-S1JXDAG.gif`,
    posterUrl: `${BASE_REPO}images/1011-S1JXDAG.jpg`,
    primaryMuscle: 'Internal & External Obliques',
    secondaryMuscles: ['Transverse Abdominis', 'Shoulders'],
    biomechanicalCue: 'Rotate through thoracic spine and hips; chop diagonally across body with locked straight arms.',
    executionCheckpoints: [
      'Pivot on back foot during rotational swing.',
      'Keep core braced like taking a punch.',
      'Slow return to starting high position.'
    ]
  },
  'Heavy Kettlebell Farmer Walks': {
    name: 'Heavy Kettlebell Farmer Walks',
    equipment: 'Heavy Kettlebells or Dumbbells',
    maleVideoUrl: `${BASE_REPO}videos/2133-qPEzJjA.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/2133-qPEzJjA.gif`,
    posterUrl: `${BASE_REPO}images/2133-qPEzJjA.jpg`,
    primaryMuscle: 'Core Anti-Lateral Flexion, Traps & Grip',
    secondaryMuscles: ['Forearms', 'Glutes', 'Calves'],
    biomechanicalCue: 'Stand tall with proud chest, retract shoulder blades, take heel-to-toe marching strides without swaying.',
    executionCheckpoints: [
      'Weights held off thighs with zero hip swinging.',
      'Shoulders level and square.',
      'Controlled nasal breathing under heavy load.'
    ]
  },
  'Russian Twists with Medicine Ball': {
    name: 'Russian Twists with Medicine Ball',
    equipment: 'Medicine Ball or Weight Plate',
    maleVideoUrl: `${BASE_REPO}videos/0014-r7cT9YD.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0014-r7cT9YD.gif`,
    posterUrl: `${BASE_REPO}images/0014-r7cT9YD.jpg`,
    primaryMuscle: 'Obliques & Transverse Abdominis',
    secondaryMuscles: ['Hip Flexors', 'Rectus Abdominis'],
    biomechanicalCue: 'Lean torso back 45 degrees into V-sit; rotate ball from hip to hip with controlled rotational torque.',
    executionCheckpoints: [
      'Keep feet elevated or lightly grounded.',
      'Rotate shoulders and eyes with ball.',
      'Tap ball gently beside hip without bouncing.'
    ]
  },
  'Plank to Push-Up Transitions': {
    name: 'Plank to Push-Up Transitions',
    equipment: 'Gym Floor Mat',
    maleVideoUrl: `${BASE_REPO}videos/3544-5VXmnV5.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/3544-5VXmnV5.gif`,
    posterUrl: `${BASE_REPO}images/3544-5VXmnV5.jpg`,
    primaryMuscle: 'Anterior Core, Triceps & Shoulders',
    secondaryMuscles: ['Chest', 'Glutes'],
    biomechanicalCue: 'Transition from forearm plank up to palm push-up position while keeping hips completely still and flat.',
    executionCheckpoints: [
      'Zero side-to-side hip rocking.',
      'Alternate leading arm every 5 reps.',
      'Glutes and quads continuously squeezed.'
    ]
  },
  'Hollow Body Hold & Rockers': {
    name: 'Hollow Body Hold & Rockers',
    equipment: 'Bodyweight & Mat',
    maleVideoUrl: `${BASE_REPO}videos/0459-UVo2Qs2.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0459-UVo2Qs2.gif`,
    posterUrl: `${BASE_REPO}images/0459-UVo2Qs2.jpg`,
    primaryMuscle: 'Deep Midline & Anterior Chain',
    secondaryMuscles: ['Hip Flexors', 'Serratus'],
    biomechanicalCue: 'Press lower back into the floor until zero space remains; extend arms and legs into a rigid gymnastics banana arc.',
    executionCheckpoints: [
      'Lumbar spine permanently pressed flat to mat.',
      'Arms by ears with toes pointed.',
      'Rock gently like a solid wooden cradle without bending knees.'
    ]
  },
  'HIIT Conditioning: Assault Bike / Row Intervals': {
    name: 'HIIT Conditioning: Assault Bike / Row Intervals',
    equipment: 'Air Bike or Rowing Ergometer',
    maleVideoUrl: `${BASE_REPO}videos/0003-1ZFqTDN.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0003-1ZFqTDN.gif`,
    posterUrl: `${BASE_REPO}images/0003-1ZFqTDN.jpg`,
    primaryMuscle: 'Cardiovascular Aerobic/Anaerobic Engine',
    secondaryMuscles: ['Full Body Kinetic Chain'],
    biomechanicalCue: 'Maximum wattage output during 20-second sprint; synchronize arm push-pull with explosive leg drive.',
    executionCheckpoints: [
      'Drive aggressively through pedals or footboard.',
      'Maintain strong upright posture during exhaustion.',
      'Active recovery pedal during rest interval.'
    ]
  },

  // ==========================================
  // DAY 6: ACTIVE RECOVERY / FUNCTIONAL
  // ==========================================
  'Turkish Get-Up with Light Kettlebell': {
    name: 'Turkish Get-Up with Light Kettlebell',
    equipment: 'Kettlebell (8-16kg)',
    maleVideoUrl: `${BASE_REPO}videos/0551-Ha7SZ3y.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0551-Ha7SZ3y.gif`,
    posterUrl: `${BASE_REPO}images/0551-Ha7SZ3y.jpg`,
    primaryMuscle: 'Glenohumeral Joint Stability & Full-Body Kinetic Integration',
    secondaryMuscles: ['Core', 'Glutes', 'Traps'],
    biomechanicalCue: 'Keep wrist locked and eyes fixed on the kettlebell bell throughout roll to elbow, hand bridge, lunge, and stand.',
    executionCheckpoints: [
      'Shoulder packed tight in socket.',
      'Deliberate step-by-step transition (elbow -> hand -> hip sweep -> lunge).',
      'Reverse motion with exact same control.'
    ]
  },
  'Deep Kettlebell Goblet Squat with Hip Prying': {
    name: 'Deep Kettlebell Goblet Squat with Hip Prying',
    equipment: 'Kettlebell (12-20kg)',
    maleVideoUrl: `${BASE_REPO}videos/0534-ZA8b5hc.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0534-ZA8b5hc.gif`,
    posterUrl: `${BASE_REPO}images/0534-ZA8b5hc.jpg`,
    primaryMuscle: 'Hip Mobility, Adductors & Deep Squat Pattern',
    secondaryMuscles: ['Quadriceps', 'Core'],
    biomechanicalCue: 'Hold kettlebell at chest; squat into deep bottom position and use elbows to gently pry knees outward.',
    executionCheckpoints: [
      'Tall spine with chest up against bell.',
      'Gentle weight shift side-to-side at bottom.',
      'Breathe deeply into pelvis.'
    ]
  },
  "World's Greatest Stretch into Thoracic Windmill": {
    name: "World's Greatest Stretch into Thoracic Windmill",
    equipment: 'Bodyweight & Mat',
    maleVideoUrl: `${BASE_REPO}videos/1688-K9VL0Jq.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1688-K9VL0Jq.gif`,
    posterUrl: `${BASE_REPO}images/1688-K9VL0Jq.jpg`,
    primaryMuscle: 'Hip Flexors, Hamstrings & Thoracic Spine',
    secondaryMuscles: ['Adductors', 'Shoulders'],
    biomechanicalCue: 'Deep runner lunge with inside elbow touching floor, then rotate chest up and gaze toward ceiling hand.',
    executionCheckpoints: [
      'Back knee off ground and glute squeezed.',
      'Full 180-degree thoracic arm sweep.',
      'Hold twist for 3 deep diaphragmatic breaths.'
    ]
  },
  'Bird-Dog & Deadbug Kinetic Chains': {
    name: 'Bird-Dog & Deadbug Kinetic Chains',
    equipment: 'Bodyweight & Mat',
    maleVideoUrl: `${BASE_REPO}videos/0276-iny3m5y.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0276-iny3m5y.gif`,
    posterUrl: `${BASE_REPO}images/0276-iny3m5y.jpg`,
    primaryMuscle: 'Contralateral Kinetic Stability & Deep Spinal Erectors',
    secondaryMuscles: ['Glutes', 'Core Transverse'],
    biomechanicalCue: 'Reach opposite arm and leg out long like stretching between two walls; avoid pelvic tilting.',
    executionCheckpoints: [
      'Neutral spine parallel with ground.',
      'Hold extension for 2 seconds per rep.',
      'Maintain zero movement in spine.'
    ]
  },
  'Resistance Band Shoulder Dislocates & Pull-Aparts': {
    name: 'Resistance Band Shoulder Dislocates & Pull-Aparts',
    equipment: 'Light Loop Resistance Band',
    maleVideoUrl: `${BASE_REPO}videos/0977-sTg7iys.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0977-sTg7iys.gif`,
    posterUrl: `${BASE_REPO}images/0977-sTg7iys.jpg`,
    primaryMuscle: 'Rotator Cuff & Scapular Retractors',
    secondaryMuscles: ['Rear Delts', 'Trapezius'],
    biomechanicalCue: 'Pull band across chest with straight arms, then gently guide overhead and behind back without shrugging.',
    executionCheckpoints: [
      'Wide grip on band to avoid forcing stiff shoulders.',
      'Smooth continuous circular arc.',
      'Retract shoulder blades on each pull.'
    ]
  },
  '90/90 Hip Internal & External Rotator Flow': {
    name: '90/90 Hip Internal & External Rotator Flow',
    equipment: 'Bodyweight & Gym Floor',
    maleVideoUrl: `${BASE_REPO}videos/0984-vIICElP.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/0984-vIICElP.gif`,
    posterUrl: `${BASE_REPO}images/0984-vIICElP.jpg`,
    primaryMuscle: 'Hip Capsule (Internal & External Rotators)',
    secondaryMuscles: ['Piriformis', 'Psoas', 'Glute Medius'],
    biomechanicalCue: 'Both legs seated at 90-degree angles; transition knees across without using hands on floor if mobility allows.',
    executionCheckpoints: [
      'Tall upright posture.',
      'Hinge forward over front shin for deep glute stretch.',
      'Smooth pivot of knees to opposite side.'
    ]
  },
  'Zone 2 Steady-State Aerobic Flush (Treadmill Incline / Row)': {
    name: 'Zone 2 Steady-State Aerobic Flush (Treadmill Incline / Row)',
    equipment: 'Incline Treadmill or Rower',
    maleVideoUrl: `${BASE_REPO}videos/3666-rjiM4L3.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/3666-rjiM4L3.gif`,
    posterUrl: `${BASE_REPO}images/3666-rjiM4L3.jpg`,
    primaryMuscle: 'Cardiovascular Mitochondrial Capillarization & Blood Flow',
    secondaryMuscles: ['Calves', 'Tibialis', 'Glutes'],
    biomechanicalCue: 'Keep effort at a conversational pace (Zone 2 heart rate: ~60-70% max HR) to flush metabolic lactate.',
    executionCheckpoints: [
      'Steady 12-15% incline walk at 3.0-3.5 mph.',
      'Nasal breathing maintained continuously.',
      'Zero joint pounding.'
    ]
  },

  // ==========================================
  // DAY 7: REST / MOBILITY DAY
  // ==========================================
  'Foam Roller Thoracic Spine Extension': {
    name: 'Foam Roller Thoracic Spine Extension',
    equipment: 'High-Density Foam Roller',
    maleVideoUrl: `${BASE_REPO}videos/1363-JbC2iaV.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1363-JbC2iaV.gif`,
    posterUrl: `${BASE_REPO}images/1363-JbC2iaV.jpg`,
    primaryMuscle: 'Thoracic Spine & Intercostal Fascia',
    secondaryMuscles: ['Chest Wall', 'Lats'],
    biomechanicalCue: 'Support head with hands; gently arch upper back backwards over roller while keeping hips on floor.',
    executionCheckpoints: [
      'Roller placed across mid-upper back (never lumbar lower back).',
      'Deep exhale as you extend over roller.',
      'Pause for 15-20 seconds per spinal segment.'
    ]
  },
  'Couch Stretch (Deep Hip Flexor & Psoas Opener)': {
    name: 'Couch Stretch (Deep Hip Flexor & Psoas Opener)',
    equipment: 'Wall / Box & Knee Pad',
    maleVideoUrl: `${BASE_REPO}videos/1564-tFGKm99.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1564-tFGKm99.gif`,
    posterUrl: `${BASE_REPO}images/1564-tFGKm99.jpg`,
    primaryMuscle: 'Psoas Major, Iliacus & Rectus Femoris',
    secondaryMuscles: ['Hip Capsule'],
    biomechanicalCue: 'Back knee pinned to corner of wall/bench; squeeze back glute hard to open tight hip flexors.',
    executionCheckpoints: [
      'Posterior pelvic tilt with tucked tailbone.',
      'Torso upright without excessive lower back arch.',
      'Hold 60-90 seconds per leg.'
    ]
  },
  'Elevated Pigeon Pose or Figure-4 Stretch': {
    name: 'Elevated Pigeon Pose or Figure-4 Stretch',
    equipment: 'Plyo Box / Bench or Floor Mat',
    maleVideoUrl: `${BASE_REPO}videos/2567-QY39eBr.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/2567-QY39eBr.gif`,
    posterUrl: `${BASE_REPO}images/2567-QY39eBr.jpg`,
    primaryMuscle: 'Piriformis, Gluteus Medius & Deep External Rotators',
    secondaryMuscles: ['IT Band Fascia'],
    biomechanicalCue: 'Shin rested horizontally across box or floor; hinge forward from hips with flat neutral spine.',
    executionCheckpoints: [
      'Square hips toward front surface.',
      'Lengthen spine forward before sinking down.',
      'Breathe into outer hip tension for 60 seconds.'
    ]
  },
  "Child's Pose with Lat & Quadratus Lumborum Reach": {
    name: "Child's Pose with Lat & Quadratus Lumborum Reach",
    equipment: 'Floor Mat',
    maleVideoUrl: `${BASE_REPO}videos/1346-f38OEuO.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1346-f38OEuO.gif`,
    posterUrl: `${BASE_REPO}images/1346-f38OEuO.jpg`,
    primaryMuscle: 'Latissimus Dorsi, QL & Lumbar Decompression',
    secondaryMuscles: ['Spine', 'Shoulders'],
    biomechanicalCue: 'Knees wide, sink glutes onto heels; walk hands diagonally to the right side to open left lat and flank.',
    executionCheckpoints: [
      'Head resting gently between arms.',
      'Deep belly breaths expanding posterior ribs.',
      'Hold each lateral reach for 45-60 seconds.'
    ]
  },
  'Hamstring & Calf Flossing with Mobility Band': {
    name: 'Hamstring & Calf Flossing with Mobility Band',
    equipment: 'Mobility Strap or Heavy Resistance Band',
    maleVideoUrl: `${BASE_REPO}videos/1599-xTjr103.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1599-xTjr103.gif`,
    posterUrl: `${BASE_REPO}images/1599-xTjr103.jpg`,
    primaryMuscle: 'Hamstring Fascia & Sciatic Nerve Gliding',
    secondaryMuscles: ['Gastrocnemius', 'Achilles'],
    biomechanicalCue: 'Lying on back, loop band around ball of foot; alternate pointing and flexing ankle at full extension.',
    executionCheckpoints: [
      'Leg held vertical with straight knee.',
      'Pump ankle smoothly 15-20 times per leg.',
      'Gentle neuro-fascial release without aggressive pulling.'
    ]
  },
  'Box Breathing Protocol (4s in, 4s hold, 4s out, 4s hold)': {
    name: 'Box Breathing Protocol (4s in, 4s hold, 4s out, 4s hold)',
    equipment: 'Quiet Space & Comfortable Seating/Mat',
    maleVideoUrl: `${BASE_REPO}videos/1363-JbC2iaV.gif`,
    femaleVideoUrl: `${BASE_REPO}videos/1363-JbC2iaV.gif`,
    posterUrl: `${BASE_REPO}images/1363-JbC2iaV.jpg`,
    primaryMuscle: 'Autonomic Parasympathetic Nervous System (Vagus Nerve)',
    secondaryMuscles: ['Diaphragm', 'Intercostals'],
    biomechanicalCue: 'Inhale 4s through nose, hold 4s lungs full, exhale 4s smoothly, hold 4s lungs empty to trigger recovery state.',
    executionCheckpoints: [
      'Chest still, abdomen expands horizontally 360 degrees.',
      'Heart rate decelerates on extended hold.',
      'Practice for 5-10 minutes to end the training week.'
    ]
  }
};

/**
 * Fallback visual when an exact title match is not found
 */
export const DEFAULT_EXERCISE_VIDEO: ExerciseVideoVisual = {
  name: 'Standard Movement Demonstration',
  equipment: 'Gym Equipment',
  maleVideoUrl: `${BASE_REPO}videos/0025-EIeI8Vf.gif`,
  femaleVideoUrl: `${BASE_REPO}videos/0025-EIeI8Vf.gif`,
  posterUrl: `${BASE_REPO}images/0025-EIeI8Vf.jpg`,
  primaryMuscle: 'Full Kinetic Chain',
  secondaryMuscles: ['Core', 'Stabilizers'],
  biomechanicalCue: 'Maintain neutral spine, control eccentric descent, and drive forcefully on concentric phase.',
  executionCheckpoints: [
    'Lock core and retract scapulae.',
    'Controlled cadence matching prescribed tempo.',
    'Full range of motion with zero momentum.'
  ]
};

/**
 * Retrieve verified exercise video demonstration by exact or partial exercise name
 */
export function getExerciseVideoVisual(exerciseName: string, gender: 'male' | 'female' = 'male'): {
  videoUrl: string;
  posterUrl: string;
  details: ExerciseVideoVisual;
  altText: string;
} {
  let visual = EXERCISE_VIDEO_DATABASE[exerciseName];

  if (!visual) {
    // Try relaxed matching
    const clean = exerciseName.toLowerCase();
    const key = Object.keys(EXERCISE_VIDEO_DATABASE).find(k => 
      clean.includes(k.toLowerCase()) || k.toLowerCase().includes(clean)
    );
    visual = key ? EXERCISE_VIDEO_DATABASE[key] : DEFAULT_EXERCISE_VIDEO;
  }

  const videoUrl = gender === 'female' ? visual.femaleVideoUrl : visual.maleVideoUrl;
  const altText = `Looping video demonstration of a fit ${gender === 'female' ? 'woman' : 'man'} executing ${visual.name} with proper ${visual.equipment} form`;

  return {
    videoUrl,
    posterUrl: visual.posterUrl,
    details: visual,
    altText
  };
}
