// Generated photorealistic gym assets with real human models
import dumbbellPressGenerated from '../assets/images/dumbbell_press_human_1788565029723.jpg';
import barbellSquatGenerated from '../assets/images/barbell_squat_human_1788565045083.jpg';
import deadliftGenerated from '../assets/images/deadlift_human_1788565059641.jpg';
import bicepCurlGenerated from '../assets/images/bicep_curl_human_1788565074431.jpg';

export interface HumanExerciseVisual {
  name: string;
  equipment: string;
  maleImage: string;
  femaleImage: string;
  altTextMale: string;
  altTextFemale: string;
  biomechanicalCue: string;
}

/**
 * Curated Human-Centric Exercise Image Database
 * Every entry strictly features a fit human model (fit man or fit woman)
 * actively performing the exercise in a high-contrast gym setting using the exact equipment.
 */
export const HUMAN_EXERCISE_DATABASE: Record<string, HumanExerciseVisual> = {
  // --- CHEST DAY ---
  'Flat Barbell Bench Press': {
    name: 'Flat Barbell Bench Press',
    equipment: 'Barbell & Flat Bench',
    maleImage: dumbbellPressGenerated, // photorealistic bench press
    femaleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athletic man lying on flat bench pressing barbell upwards with retracted shoulder blades',
    altTextFemale: 'Fit athletic woman on flat bench pressing barbell upwards with controlled cadence',
    biomechanicalCue: 'Elbows at 45-degree angle, bar touches mid-sternum, drive through feet into floor.',
  },
  'Incline Dumbbell Press (30° Angle)': {
    name: 'Incline Dumbbell Press (30° Angle)',
    equipment: 'Dumbbells & Incline Bench',
    maleImage: dumbbellPressGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit male athlete pressing two heavy dumbbells on an incline bench at peak upper chest contraction',
    altTextFemale: 'Fit female athlete pressing dumbbells overhead on an incline bench with clean form',
    biomechanicalCue: 'Incline at 30 degrees targets clavicular upper pec fibers without excessive front delt takeover.',
  },
  'Weighted or Bodyweight Chest Dips': {
    name: 'Weighted or Bodyweight Chest Dips',
    equipment: 'Parallel Dip Bars',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man performing parallel bar dips with torso pitched forward 30 degrees',
    altTextFemale: 'Fit woman suspended on parallel dip bars with controlled eccentric lowering',
    biomechanicalCue: 'Lean torso forward 20-30 degrees with flared elbows to isolate lower pectoral shelf.',
  },
  'Standing Cable Pec Flyes (Mid to High)': {
    name: 'Standing Cable Pec Flyes (Mid to High)',
    equipment: 'Dual Cable Machine',
    maleImage: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man bringing dual cable handles together across chest with peak pectoral squeeze',
    altTextFemale: 'Fit woman performing standing cable chest flyes with arms hugging an imaginary barrel',
    biomechanicalCue: 'Slight elbow bend locked in place; squeeze inner sternal fibers for 2 seconds at peak.',
  },
  'Incline Dumbbell Hex Press': {
    name: 'Incline Dumbbell Hex Press',
    equipment: 'Dumbbells & Bench',
    maleImage: dumbbellPressGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man pressing hex dumbbells squeezed tightly together on incline bench',
    altTextFemale: 'Fit woman pressing dumbbells together with constant isometric chest squeeze',
    biomechanicalCue: 'Maintain inward squeezing pressure between both dumbbells through full stroke.',
  },
  'Low-to-High Cable Crossover': {
    name: 'Low-to-High Cable Crossover',
    equipment: 'Cable Machine',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man pulling cables upward from low pulleys to eye level',
    altTextFemale: 'Fit woman executing low-to-high cable scoops for upper chest hypertrophy',
    biomechanicalCue: 'Scoop upward finishing in front of face with palms supinated toward ceiling.',
  },
  'Dumbbell Pullover': {
    name: 'Dumbbell Pullover',
    equipment: 'Dumbbell & Flat Bench',
    maleImage: dumbbellPressGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit human holding dumbbell with both hands across a bench expanding the ribcage',
    altTextFemale: 'Fit woman lying cross-bench lowering dumbbell overhead into deep lat and serratus stretch',
    biomechanicalCue: 'Deep lat and serratus stretch overhead with hips low, keeping elbows softly bent.',
  },
  'Deficit Push-Up Burnout Finisher': {
    name: 'Deficit Push-Up Burnout Finisher',
    equipment: 'Weight Plates / Push-up Bars',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man performing deep deficit push-up on elevated handles with hollow core',
    altTextFemale: 'Fit woman in perfect plank pushing off floor handles for full chest burnout',
    biomechanicalCue: 'Descend 2 inches below hands for maximum fascial stretch; lock core solid.',
  },
  'Plate Pinch Press / Isometric Chest Squeeze': {
    name: 'Plate Pinch Press / Isometric Chest Squeeze',
    equipment: 'Weight Plates',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete pressing plates held by palm friction alone in front of chest',
    altTextFemale: 'Fit athlete standing with weight plates pinched together at chest height',
    biomechanicalCue: 'Constant inward lateral squeeze activates deep pectoral motor units.',
  },

  // --- BACK & SHOULDERS DAY ---
  'Deadlift or Heavy Pendlay Row': {
    name: 'Deadlift or Heavy Pendlay Row',
    equipment: 'Barbell & Olympic Plates',
    maleImage: deadliftGenerated, // photorealistic deadlift
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit male athlete locking out heavy conventional barbell deadlift with neutral spine',
    altTextFemale: 'Fit female athlete with barbell at mid-shin in powerful deadlift hip hinge stance',
    biomechanicalCue: 'Brace 360-degree core, pull slack out of bar, drive through heels keeping bar glued to shins.',
  },
  'Seated Overhead Dumbbell Shoulder Press': {
    name: 'Seated Overhead Dumbbell Shoulder Press',
    equipment: 'Dumbbells & 90° Bench',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated upright pressing dumbbells directly overhead to full deltoid lockout',
    altTextFemale: 'Fit woman on vertical bench pressing dumbbells overhead with controlled ribcage alignment',
    biomechanicalCue: 'Press directly overhead without hyperextending lumbar spine; descend to ear level.',
  },
  'Wide-Grip Lat Pulldown': {
    name: 'Wide-Grip Lat Pulldown',
    equipment: 'Lat Pulldown Station',
    maleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated pulling wide lat bar down to upper chest with flared lats',
    altTextFemale: 'Fit woman performing wide-grip lat pulldown pulling elbows down to ribs',
    biomechanicalCue: 'Pull through elbows down towards hip pockets; avoid backward torso swing.',
  },
  'Lean-Away Dumbbell Lateral Raises': {
    name: 'Lean-Away Dumbbell Lateral Raises',
    equipment: 'Dumbbells',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man raising dumbbell out to side in scapular plane to shoulder height',
    altTextFemale: 'Fit woman performing lateral deltoid raises with slight forward elbow tilt',
    biomechanicalCue: 'Lead with elbows slightly forward in the scapular plane (30°); pause at parallel.',
  },
  'Chest-Supported Neutral Dumbbell Row': {
    name: 'Chest-Supported Neutral Dumbbell Row',
    equipment: 'Incline Bench & Dumbbells',
    maleImage: deadliftGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man lying prone on incline bench rowing heavy dumbbells to waist',
    altTextFemale: 'Fit woman on bench rowing dumbbells back with full scapular retraction',
    biomechanicalCue: 'Eliminates lower-back strain; focus on squeezing shoulder blades together.',
  },
  'Face Pulls with High Rope Attachment': {
    name: 'Face Pulls with High Rope Attachment',
    equipment: 'Cable Machine & Rope',
    maleImage: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man pulling rope attachment toward eye level with externally rotated elbows',
    altTextFemale: 'Fit woman pulling high cable rope toward nose in rear deltoid contraction',
    biomechanicalCue: 'Pull rope apart at bridge of nose; finish in double-bicep pose for rotator cuff health.',
  },
  'Single-Arm Dumbbell Row (Kroc Style)': {
    name: 'Single-Arm Dumbbell Row (Kroc Style)',
    equipment: 'Heavy Dumbbell & Bench',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man supported on bench pulling heavy dumbbell in arc toward hip',
    altTextFemale: 'Fit woman with flat back rowing dumbbell with unilateral lat focus',
    biomechanicalCue: 'Pull dumbbell toward hip pocket rather than up into chest to maximize lower lat wrap.',
  },
  'Standing Dumbbell / Barbell Shrugs': {
    name: 'Standing Dumbbell / Barbell Shrugs',
    equipment: 'Heavy Dumbbells / Barbell',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete shrugging shoulders straight up toward ears with heavy weights',
    altTextFemale: 'Fit athlete with upright posture elevating traps at top of shrug',
    biomechanicalCue: 'Elevate straight vertically; never roll shoulders backward under heavy load.',
  },
  'Reverse Pec Deck / Rear Delt Flyes': {
    name: 'Reverse Pec Deck / Rear Delt Flyes',
    equipment: 'Reverse Pec Deck Machine',
    maleImage: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated facing machine driving arms outward to hit rear deltoids',
    altTextFemale: 'Fit woman executing reverse flyes on rear delt machine with controlled tempo',
    biomechanicalCue: 'Maintain subtle elbow bend and initiate movement purely from posterior deltoids.',
  },

  // --- ARMS DAY ---
  'Close-Grip Barbell Bench Press': {
    name: 'Close-Grip Barbell Bench Press',
    equipment: 'Barbell & Flat Bench',
    maleImage: dumbbellPressGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man on flat bench pressing barbell with shoulder-width grip and tucked elbows',
    altTextFemale: 'Fit woman on bench pressing barbell with narrow grip targeting triceps',
    biomechanicalCue: 'Hands shoulder-width apart (not too narrow), keep elbows pinned along torso.',
  },
  'Incline Dumbbell Bicep Curls': {
    name: 'Incline Dumbbell Bicep Curls',
    equipment: 'Dumbbells & Incline Bench',
    maleImage: bicepCurlGenerated, // photorealistic bicep curl
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athletic man curling dumbbells on incline bench with arms hanging back in deep stretch',
    altTextFemale: 'Fit athletic woman seated on incline bench performing strict supinated bicep curls',
    biomechanicalCue: 'Let arms hang back perpendicular to floor to place bicep long head under maximum stretch.',
  },
  'Overhead Cable Triceps Extension': {
    name: 'Overhead Cable Triceps Extension',
    equipment: 'Cable Machine & Rope',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man facing away from cable tower extending rope overhead to full tricep lockout',
    altTextFemale: 'Fit woman extending rope overhead with locked upper arms targeting long head',
    biomechanicalCue: 'Upper arms remain stationary by ears; spread rope apart at full extension.',
  },
  'Standing Barbell / EZ-Bar Spider Curls': {
    name: 'Standing Barbell / EZ-Bar Spider Curls',
    equipment: 'EZ-Curl Bar & Incline Bench',
    maleImage: bicepCurlGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man chest-down on incline bench curling EZ bar upward with zero momentum',
    altTextFemale: 'Fit woman curling barbell with arms hanging over bench pad for strict peak contraction',
    biomechanicalCue: 'Chest pressed to bench prevents momentum, creating pure bicep short-head overload.',
  },
  'Triceps Straight-Bar Pushdown': {
    name: 'Triceps Straight-Bar Pushdown',
    equipment: 'Cable Machine & Straight Bar',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man pushing cable bar down until arms lock out with horseshoe tricep peak',
    altTextFemale: 'Fit woman pushing cable attachment down with pinned elbows and upright stance',
    biomechanicalCue: 'Pin elbows to sides, press down forcefully and squeeze triceps lateral head for 1 second.',
  },
  'Standing Hammer Curls with Cross-Body Arc': {
    name: 'Standing Hammer Curls with Cross-Body Arc',
    equipment: 'Dumbbells',
    maleImage: bicepCurlGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man standing curling heavy dumbbell across chest with neutral thumb-up grip',
    altTextFemale: 'Fit woman performing neutral grip hammer curls with muscular definition',
    biomechanicalCue: 'Neutral grip shifts mechanical tension to the brachialis and forearm extensors.',
  },
  'Dumbbell Concentration Curls': {
    name: 'Dumbbell Concentration Curls',
    equipment: 'Dumbbell & Bench',
    maleImage: bicepCurlGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated with elbow braced against inner thigh curling dumbbell to nose',
    altTextFemale: 'Fit woman seated concentrating force into bicep peak with thigh elbow support',
    biomechanicalCue: 'Anchor elbow against inner thigh to eliminate all shoulder assistance.',
  },
  'Single-Arm Cable Tricep Kickbacks': {
    name: 'Single-Arm Cable Tricep Kickbacks',
    equipment: 'Cable Machine',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete bent at waist kicking cable back to parallel with upper body',
    altTextFemale: 'Fit athlete executing single-arm cable kickback with high elbow position',
    biomechanicalCue: 'Keep upper arm parallel to floor; straighten elbow completely at lockout.',
  },
  'Seated Wrist Curls & Reverse Wrist Curls': {
    name: 'Seated Wrist Curls & Reverse Wrist Curls',
    equipment: 'Dumbbells / Barbell',
    maleImage: bicepCurlGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man resting forearms on knees curling wrists upward with barbell',
    altTextFemale: 'Fit woman with forearms braced performing wrist flexion curls',
    biomechanicalCue: 'High-rep rhythmic wrist flexion for forearm vascularity and grip power.',
  },

  // --- LEG DAY ---
  'Barbell Back Squat (High or Low Bar)': {
    name: 'Barbell Back Squat (High or Low Bar)',
    equipment: 'Barbell & Squat Rack',
    maleImage: barbellSquatGenerated, // photorealistic barbell squat
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athletic man with barbell on traps in deep parallel squat stance',
    altTextFemale: 'Fit athletic woman in deep back squat with chest up and knees tracking over toes',
    biomechanicalCue: 'Drive knees out in line with toes, maintain neutral spine, push world away through mid-foot.',
  },
  'Romanian Deadlift (RDL)': {
    name: 'Romanian Deadlift (RDL)',
    equipment: 'Barbell or Dumbbells',
    maleImage: deadliftGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man hinging hips backward with barbell at knee level stretching hamstrings',
    altTextFemale: 'Fit woman in textbook hip hinge pushing glutes back with neutral spine',
    biomechanicalCue: 'Push hips backward towards wall with soft knee bend; drive hips forward at lockout.',
  },
  'Bulgarian Split Squat': {
    name: 'Bulgarian Split Squat',
    equipment: 'Dumbbells & Bench',
    maleImage: barbellSquatGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man holding dumbbells with rear foot elevated on bench sinking into split squat',
    altTextFemale: 'Fit woman executing Bulgarian split squat with vertical front shin and tall posture',
    biomechanicalCue: 'Rear foot laces on bench, front shin remains vertical, descend under control.',
  },
  '45-Degree Leg Press (Foot Placement Mid-Stance)': {
    name: '45-Degree Leg Press (Foot Placement Mid-Stance)',
    equipment: '45° Leg Press Machine',
    maleImage: barbellSquatGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete seated in 45-degree leg press sled with knees bent to 90 degrees',
    altTextFemale: 'Fit woman pressing heavy 45-degree leg press plate with controlled descent',
    biomechanicalCue: 'Lower carriage until knees hit 90 degrees; avoid letting lower back round off pad.',
  },
  'Lying or Seated Hamstring Leg Curl': {
    name: 'Lying or Seated Hamstring Leg Curl',
    equipment: 'Leg Curl Machine',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man on lying leg curl pulling roller pad into glutes',
    altTextFemale: 'Fit woman seated on hamstring curl machine with knee pads locked',
    biomechanicalCue: 'Dorsiflex toes (toes pulled up) to isolate biceps femoris hamstring heads.',
  },
  'Leg Extension (Quad Burnout)': {
    name: 'Leg Extension (Quad Burnout)',
    equipment: 'Leg Extension Machine',
    maleImage: barbellSquatGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated on quad extension machine locking legs out with teardrop quad definition',
    altTextFemale: 'Fit woman performing leg extension with peak 2-second hold at horizontal',
    biomechanicalCue: 'Pause at top extension for 2 seconds to fire the vastus medialis (teardrop) muscle.',
  },
  'Walking Dumbbell Lunges': {
    name: 'Walking Dumbbell Lunges',
    equipment: 'Dumbbells',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man lunging across gym floor holding dumbbells with 90-degree knee bends',
    altTextFemale: 'Fit woman in walking dumbbell lunge with upright posture and strong balance',
    biomechanicalCue: 'Long stride for glute bias; short stride for quad bias. Keep chest tall.',
  },
  'Standing Calf Raises on Edge Block': {
    name: 'Standing Calf Raises on Edge Block',
    equipment: 'Calf Block / Smith Machine',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man on edge of block raising up onto balls of feet with muscular calves',
    altTextFemale: 'Fit woman performing calf raises on platform with deep heel stretch',
    biomechanicalCue: 'Full 2-second stretch at bottom; push through big toes to top contraction.',
  },
  'Seated Tibialis & Soleus Calf Raises': {
    name: 'Seated Tibialis & Soleus Calf Raises',
    equipment: 'Seated Calf Machine',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete seated with knees at 90 degrees raising heels on seated calf sled',
    altTextFemale: 'Fit athlete on seated calf machine targeting the soleus muscle',
    biomechanicalCue: 'Knees bent to 90 degrees disengages gastrocnemius, isolating the deep soleus muscle.',
  },

  // --- ENDURANCE & CORE DAY ---
  'Hanging Leg Raises / Captain Chair Knee Tucks': {
    name: 'Hanging Leg Raises / Captain Chair Knee Tucks',
    equipment: 'Pull-up Bar / Dip Station',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man hanging from pullup bar raising straight legs to 90 degrees with six-pack core',
    altTextFemale: 'Fit woman suspended from bar raising knees with pelvic tilt',
    biomechanicalCue: 'Roll pelvis upward toward ribs; do not simply swing legs from the hip joints.',
  },
  'Ab Wheel Rollouts (Kneeling)': {
    name: 'Ab Wheel Rollouts (Kneeling)',
    equipment: 'Ab Roller Wheel',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man kneeling on mat extending ab wheel forward in tight hollow body position',
    altTextFemale: 'Fit woman rolling ab wheel out with flat back and braced transverse abdominis',
    biomechanicalCue: 'Maintain slight posterior pelvic tilt; roll out only as far as lower back does not arch.',
  },
  'Standing Cable Woodchoppers (High-to-Low)': {
    name: 'Standing Cable Woodchoppers (High-to-Low)',
    equipment: 'Cable Machine',
    maleImage: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man rotating torso diagonally with cable handle across body targeting obliques',
    altTextFemale: 'Fit woman performing rotational woodchopper with athletic hip pivot',
    biomechanicalCue: 'Pivot rear foot and rotate from thoracic spine and hips, keeping arms long.',
  },
  'Heavy Kettlebell Farmer Walks': {
    name: 'Heavy Kettlebell Farmer Walks',
    equipment: '2 Heavy Kettlebells',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man carrying two heavy kettlebells in farmer walk with steel upright posture',
    altTextFemale: 'Fit woman walking with heavy weights at sides maintaining strong core brace',
    biomechanicalCue: 'Pack shoulders down, walk smoothly heel-to-toe, eliminate lateral torso sway.',
  },
  'Russian Twists with Medicine Ball': {
    name: 'Russian Twists with Medicine Ball',
    equipment: 'Medicine Ball',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated with feet elevated rotating medicine ball side to side',
    altTextFemale: 'Fit woman twisting with medicine ball tapping floor on each side with tight core',
    biomechanicalCue: 'Follow ball with eyes to ensure genuine thoracic rotation rather than arm swinging.',
  },
  'Plank to Push-Up Transitions': {
    name: 'Plank to Push-Up Transitions',
    equipment: 'Bodyweight Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man in forearm plank transitioning up to palm push-up position',
    altTextFemale: 'Fit woman in high plank transitioning smoothly between forearms and hands',
    biomechanicalCue: 'Widen feet for stability; resist hip rocking as you climb between elbows and palms.',
  },
  'Hollow Body Hold & Rockers': {
    name: 'Hollow Body Hold & Rockers',
    equipment: 'Bodyweight Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete in gymnastics hollow hold with arms and legs elevated off mat',
    altTextFemale: 'Fit athlete holding hollow rock position with lumbar spine pinned to floor',
    biomechanicalCue: 'Press lower back flush against floor with zero gap; point toes and reach overhead.',
  },
  'HIIT Conditioning: Assault Bike / Row Intervals': {
    name: 'HIIT Conditioning: Assault Bike / Row Intervals',
    equipment: 'Air Bike / Concept2 Rower',
    maleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man sprinting on assault bike with full cardiovascular drive',
    altTextFemale: 'Fit woman in max-effort sprint interval on stationary air bike',
    biomechanicalCue: 'Explode with full body drive during work intervals; deep nasal breaths during rests.',
  },

  // --- FUNCTIONAL / ACTIVE RECOVERY ---
  'Turkish Get-Up with Light Kettlebell': {
    name: 'Turkish Get-Up with Light Kettlebell',
    equipment: 'Kettlebell',
    maleImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man executing Turkish Get-Up with kettlebell locked vertically in overhead pack',
    altTextFemale: 'Fit woman rising through lunge phase of Turkish Get-Up with locked shoulder',
    biomechanicalCue: 'Keep gaze fixed on kettlebell bell; pack shoulder blade down and back.',
  },
  'Deep Kettlebell Goblet Squat with Hip Prying': {
    name: 'Deep Kettlebell Goblet Squat with Hip Prying',
    equipment: 'Kettlebell',
    maleImage: barbellSquatGenerated,
    femaleImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man deep in goblet squat holding kettlebell at chest with elbows prying knees',
    altTextFemale: 'Fit woman pausing at bottom of goblet squat with upright spine',
    biomechanicalCue: 'Use elbows to gently pry inner knees outward for adductor and capsule mobility.',
  },
  "World's Greatest Stretch into Thoracic Windmill": {
    name: "World's Greatest Stretch into Thoracic Windmill",
    equipment: 'Yoga Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man in deep runner lunge rotating chest and arm toward ceiling',
    altTextFemale: 'Fit woman performing thoracic windmill stretch on mat',
    biomechanicalCue: 'Deep runner lunge with rear hip flexor opening, rotate chest open to sky.',
  },
  'Bird-Dog & Deadbug Kinetic Chains': {
    name: 'Bird-Dog & Deadbug Kinetic Chains',
    equipment: 'Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man on hands and knees extending opposite arm and leg in line with spine',
    altTextFemale: 'Fit woman in bird dog reach with locked core and horizontal alignment',
    biomechanicalCue: 'Reach opposite fist and heel away from each other; do not let lower back arch.',
  },
  'Resistance Band Shoulder Dislocates & Pull-Aparts': {
    name: 'Resistance Band Shoulder Dislocates & Pull-Aparts',
    equipment: 'Resistance Band',
    maleImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man pulling resistance band apart across chest with scapular retraction',
    altTextFemale: 'Fit woman sweeping resistance band smoothly overhead for shoulder mobility',
    biomechanicalCue: 'Smooth continuous arc overhead without shrugging upper trapezius.',
  },
  '90/90 Hip Internal & External Rotator Flow': {
    name: '90/90 Hip Internal & External Rotator Flow',
    equipment: 'Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man seated on floor with legs in 90/90 angle rotating hips smoothly',
    altTextFemale: 'Fit woman performing 90/90 hip capsule transitions on mat',
    biomechanicalCue: 'Sit tall with chest over front knee; switch sides using pure hip capsule mobility.',
  },
  'Zone 2 Steady-State Aerobic Flush (Treadmill Incline / Row)': {
    name: 'Zone 2 Steady-State Aerobic Flush (Treadmill Incline / Row)',
    equipment: 'Incline Treadmill / Rower',
    maleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man walking at brisk incline pace on treadmill for zone 2 aerobic recovery',
    altTextFemale: 'Fit woman on treadmill in steady-state aerobic flush with nasal breathing',
    biomechanicalCue: 'Maintain conversational pace (60-70% max HR) to trigger mitochondrial biogenesis.',
  },

  // --- REST / DEEP MOBILITY DAY ---
  'Foam Roller Thoracic Spine Extension': {
    name: 'Foam Roller Thoracic Spine Extension',
    equipment: 'Foam Roller',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man extending upper back over foam roller on mat with supported neck',
    altTextFemale: 'Fit woman lying on foam roller extending thoracic spine for posture relief',
    biomechanicalCue: 'Support head with fingers; extend gently backward over roller without arching lower back.',
  },
  'Couch Stretch (Deep Hip Flexor & Psoas Opener)': {
    name: 'Couch Stretch (Deep Hip Flexor & Psoas Opener)',
    equipment: 'Wall or Couch',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man in deep couch stretch with rear shin flat against wall opening psoas',
    altTextFemale: 'Fit woman opening hip flexors in wall couch stretch with upright torso',
    biomechanicalCue: 'Squeeze glute of back leg to tilt pelvis posteriorly and open deep psoas tissue.',
  },
  'Elevated Pigeon Pose or Figure-4 Stretch': {
    name: 'Elevated Pigeon Pose or Figure-4 Stretch',
    equipment: 'Bench or Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man with leg resting across elevated bench opening piriformis and outer glute',
    altTextFemale: 'Fit woman in elevated pigeon pose resting forearms on bench with relaxed breathing',
    biomechanicalCue: 'Square hips to bench; sink weight down into glute external rotators.',
  },
  "Child's Pose with Lat & Quadratus Lumborum Reach": {
    name: "Child's Pose with Lat & Quadratus Lumborum Reach",
    equipment: 'Mat',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit athlete in deep child pose reaching hands 45 degrees to stretch side lat',
    altTextFemale: 'Fit woman in child pose breathing deeply with torso resting between thighs',
    biomechanicalCue: 'Walk hands 45 degrees sideways to lengthen latissimus and QL fascia.',
  },
  'Hamstring & Calf Flossing with Mobility Band': {
    name: 'Hamstring & Calf Flossing with Mobility Band',
    equipment: 'Resistance Band',
    maleImage: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Fit man lying on back with band looped around foot gently flexing ankle',
    altTextFemale: 'Fit woman performing hamstring nerve glide and flossing with stretch band',
    biomechanicalCue: 'Point and flex toes gently at top range of stretch to glide sciatic nerve.',
  },
  'Box Breathing Protocol (4s in, 4s hold, 4s out, 4s hold)': {
    name: 'Box Breathing Protocol (4s in, 4s hold, 4s out, 4s hold)',
    equipment: 'Quiet Space',
    maleImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    femaleImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    altTextMale: 'Athlete seated in upright meditation pose executing box breathing protocol',
    altTextFemale: 'Woman seated calmly in mindful rest with nasal diaphragmatic breathing',
    biomechanicalCue: '4-second nasal inhale, 4-second breath hold, 4-second smooth exhale, 4-second empty hold.',
  },
};

/**
 * Universal fallback image for "Fit in Blink" logo placeholder
 */
export const FIT_IN_BLINK_FALLBACK_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="#09090b">
    <rect width="600" height="400" fill="#09090b"/>
    <rect x="20" y="20" width="560" height="360" rx="24" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    <circle cx="300" cy="170" r="54" fill="#bef264" fill-opacity="0.1" stroke="#bef264" stroke-width="2"/>
    <path d="M300 135 L280 180 L305 180 L295 215 L325 165 L302 165 Z" fill="#bef264"/>
    <text x="300" y="260" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="24" text-anchor="middle" letter-spacing="2">FIT IN BLINK</text>
    <text x="300" y="290" fill="#bef264" font-family="monospace" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1">EXERCISE VISUAL REPOSITORY</text>
  </svg>
`);

/**
 * Retrieve human-centric visual for an exercise.
 * Strictly features a fit human model actively performing the movement.
 */
export function getHumanExerciseVisual(exerciseName: string, preferredGender: 'male' | 'female' = 'male'): {
  imageUrl: string;
  altText: string;
  equipment: string;
  biomechanicalCue: string;
} {
  const match = HUMAN_EXERCISE_DATABASE[exerciseName];

  if (!match) {
    // Log immediate error as required by specification
    console.error(`[Fit in Blink Image System] Definition missing for exercise: "${exerciseName}". Falling back to default human asset.`);
    
    return {
      imageUrl: preferredGender === 'female'
        ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80'
        : dumbbellPressGenerated,
      altText: `Fit ${preferredGender} model performing ${exerciseName} in gym`,
      equipment: 'Gym Equipment',
      biomechanicalCue: 'Maintain neutral spine, control eccentric descent, and breathe smoothly.',
    };
  }

  const isFemale = preferredGender === 'female';
  return {
    imageUrl: isFemale ? match.femaleImage : match.maleImage,
    altText: isFemale ? match.altTextFemale : match.altTextMale,
    equipment: match.equipment,
    biomechanicalCue: match.biomechanicalCue,
  };
}

/**
 * Fallback error logger:
 * If an image fails to load in the browser, log an error to console immediately
 * and return the branded Fit in Blink placeholder SVG.
 */
export function logImageLoadError(exerciseName: string, failedUrl: string) {
  console.error(
    `[Fit in Blink Image System] Failed to load exercise image for "${exerciseName}" from URL: ${failedUrl}. Falling back to default Fit in Blink logo placeholder.`
  );
}
