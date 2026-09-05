import { DayRotation } from '../types';
import { SEVEN_DAY_ROTATION } from './workouts';

export interface CycleStatus {
  activeDayId: number; // 1 to 7
  activeDayRotation: DayRotation;
  elapsedDays: number;
  cycleNumber: number; // Cycle count (1-indexed)
  dayInCycle: number; // 1 to 7
  timeRemainingMs: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  progressPercent: number; // 0 to 100% of the 24-hour period
  cycleStartedAt: number; // timestamp in ms
}

const CYCLE_STORAGE_KEY = 'fit_in_blink_cycle_start_time';
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

/**
 * Gets or initializes the cycle start timestamp.
 * If none exists, initializes it to current timestamp so Day 1 (Chest) starts immediately.
 */
export function getStoredCycleStartTime(): number {
  try {
    const stored = localStorage.getItem(CYCLE_STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= Date.now()) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not retrieve cycle start timestamp:', e);
  }

  // Initialize to now
  const now = Date.now();
  setStoredCycleStartTime(now);
  return now;
}

/**
 * Sets the cycle start timestamp in localStorage.
 */
export function setStoredCycleStartTime(timestampMs: number): void {
  try {
    localStorage.setItem(CYCLE_STORAGE_KEY, timestampMs.toString());
  } catch (e) {
    console.warn('Could not store cycle start timestamp:', e);
  }
}

/**
 * Resets the cycle to start right now at Day 1 (Chest Day).
 */
export function resetCycleToDayOne(): number {
  const now = Date.now();
  setStoredCycleStartTime(now);
  return now;
}

/**
 * Sets the active cycle day by offsetting the cycle start time.
 * @param targetDayId 1 to 7
 */
export function setCycleToSpecificDay(targetDayId: number): number {
  const normalizedDay = Math.max(1, Math.min(7, targetDayId));
  const dayOffsetMs = (normalizedDay - 1) * TWENTY_FOUR_HOURS_MS;
  const now = Date.now();
  const newStartTime = now - dayOffsetMs;
  setStoredCycleStartTime(newStartTime);
  return newStartTime;
}

/**
 * Calculates the current status of the endless 24-hour cycle.
 */
export function calculateCycleStatus(cycleStartedAt: number, currentTime: number = Date.now()): CycleStatus {
  // Ensure we don't have future timestamps causing negative elapsed times
  const safeStartTime = Math.min(cycleStartedAt, currentTime);
  const elapsedMs = Math.max(0, currentTime - safeStartTime);

  // Total elapsed 24-hour blocks
  const elapsedDays = Math.floor(elapsedMs / TWENTY_FOUR_HOURS_MS);

  // Day within 7-day rotation: 1 (Chest), 2 (Back & Shoulders), 3 (Arms), 4 (Legs), 5 (Endurance & Core), 6 (Active Recovery), 7 (Rest)
  const dayIndex = elapsedDays % 7; // 0 to 6
  const activeDayId = dayIndex + 1; // 1 to 7

  // Cycle loop iteration count (1 for first 7 days, 2 for days 8-14, etc.)
  const cycleNumber = Math.floor(elapsedDays / 7) + 1;

  // Time remaining in current 24-hour block
  const msInCurrentDay = elapsedMs % TWENTY_FOUR_HOURS_MS;
  const timeRemainingMs = TWENTY_FOUR_HOURS_MS - msInCurrentDay;

  const totalRemainingSeconds = Math.floor(timeRemainingMs / 1000);
  const hoursRemaining = Math.floor(totalRemainingSeconds / 3600);
  const minutesRemaining = Math.floor((totalRemainingSeconds % 3600) / 60);
  const secondsRemaining = totalRemainingSeconds % 60;

  const progressPercent = Math.min(100, Math.max(0, (msInCurrentDay / TWENTY_FOUR_HOURS_MS) * 100));

  const activeDayRotation = SEVEN_DAY_ROTATION.find((r) => r.id === activeDayId) || SEVEN_DAY_ROTATION[0];

  return {
    activeDayId,
    activeDayRotation,
    elapsedDays,
    cycleNumber,
    dayInCycle: activeDayId,
    timeRemainingMs,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    progressPercent,
    cycleStartedAt: safeStartTime,
  };
}
