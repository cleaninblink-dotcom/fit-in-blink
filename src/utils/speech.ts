// Web Speech API Voice Coach Utilities for fitinblink
// Provides motivational, crystal-clear spoken cues during auto-workouts

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  interrupt?: boolean;
}

let preferredVoice: SpeechSynthesisVoice | null = null;
let isVoicesInitialized = false;

// Initialize preferred athletic, natural-sounding voice
function initVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const updateVoice = () => {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // Prefer high quality English voices
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel') ||
            v.name.includes('Karen') ||
            v.name.includes('Premium'))
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

      if (preferred) {
        preferredVoice = preferred;
      }
    } catch {
      // Graceful fallback
    }
  };

  updateVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined && !isVoicesInitialized) {
    window.speechSynthesis.onvoiceschanged = updateVoice;
    isVoicesInitialized = true;
  }
}

// Check Web Speech API availability
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

// Stop current speech playback
export function cancelSpeech(): void {
  try {
    if (isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // Ignore error
  }
}

// Core speech synthesis function
export function speakText(text: string, options: SpeechOptions = {}): void {
  if (!isSpeechSynthesisSupported()) return;

  const {
    rate = 1.05, // Crisp, energetic cadence
    pitch = 1.0,
    volume = 1.0,
    interrupt = true,
  } = options;

  try {
    // Ensure voices are loaded
    initVoices();

    // Resume engine if paused or suspended by browser power saving
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    if (interrupt) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.5, Math.min(2.0, rate));
    utterance.pitch = Math.max(0.5, Math.min(2.0, pitch));
    utterance.volume = Math.max(0, Math.min(1.0, volume));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Safety fallback: if engine hangs, resume after timeout
    const resumeInterval = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (!window.speechSynthesis.speaking) {
          clearInterval(resumeInterval);
        } else if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }
    }, 1000);

    utterance.onend = () => clearInterval(resumeInterval);
    utterance.onerror = () => clearInterval(resumeInterval);

    window.speechSynthesis.speak(utterance);
  } catch {
    // Graceful fallback if blocked by browser policy
  }
}

/**
 * Audio Cue 1: Exercise Start
 * Spoken when an exercise starts, announces movement name, target reps, and set number.
 */
export function speakExerciseStart(
  exerciseName: string,
  setNumber: number,
  totalSets: number,
  reps?: string
): void {
  const cleanName = exerciseName.replace(/[^\w\s-]/gi, '').trim();
  let message = '';

  if (setNumber === 1) {
    if (reps) {
      message = `Next up: ${cleanName}. Set 1 of ${totalSets}. Aim for ${reps} reps. Let's go!`;
    } else {
      message = `Starting ${cleanName}. Set 1 of ${totalSets}. Begin!`;
    }
  } else {
    message = `Set ${setNumber} of ${totalSets}, ${cleanName}. Let's get it!`;
  }

  speakText(message, { rate: 1.06 });
}

/**
 * Audio Cue 2: Set Transitions & Rest Break Start
 * Spoken immediately upon finishing a set, announces rest duration and encouragement.
 */
export function speakSetTransition(
  completedSetNumber: number,
  totalSets: number,
  breakSeconds: number = 15
): void {
  const motivationalTips = [
    'Great work!',
    'Solid effort!',
    'Strong finish!',
    'Well done!',
  ];
  const tip = motivationalTips[(completedSetNumber - 1) % motivationalTips.length];
  const message = `Set ${completedSetNumber} complete! ${tip} Take ${breakSeconds} seconds to recover.`;

  speakText(message, { rate: 1.05 });
}

/**
 * Audio Cue 3: Rest Timer Completion
 * Spoken when the recovery timer hits 0 (or is skipped), prompting immediate action for the next set or exercise.
 */
export function speakRestComplete(
  nextSetNumber: number,
  totalSets: number,
  nextExerciseName?: string,
  isNewExercise: boolean = false
): void {
  let message = '';

  if (isNewExercise && nextExerciseName) {
    const cleanName = nextExerciseName.replace(/[^\w\s-]/gi, '').trim();
    message = `Rest over! Next exercise: ${cleanName}. Set 1, start!`;
  } else {
    message = `Rest complete! Set ${nextSetNumber} of ${totalSets}. Let's work!`;
  }

  speakText(message, { rate: 1.08 });
}

/**
 * Audio Cue 4: Final 3-second countdown tick (Optional vocal count)
 */
export function speakCountdown(seconds: number): void {
  if (seconds === 3) {
    speakText('Three', { rate: 1.2, interrupt: false });
  } else if (seconds === 2) {
    speakText('Two', { rate: 1.2, interrupt: false });
  } else if (seconds === 1) {
    speakText('One', { rate: 1.2, interrupt: false });
  }
}

/**
 * Audio Cue 5: Full Workout Completion Fanfare
 */
export function speakWorkoutComplete(): void {
  const message = 'Workout complete! Outstanding job crushing your daily routine today!';
  speakText(message, { rate: 1.03 });
}
