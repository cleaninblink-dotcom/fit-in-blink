import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, X, Plus, Minus, BellRing } from 'lucide-react';
import { playRestCompleteChime } from '../utils/audio';

interface FloatingRestTimerProps {
  initialSeconds: number;
  exerciseName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FloatingRestTimer: React.FC<FloatingRestTimerProps> = ({
  initialSeconds,
  exerciseName,
  isOpen,
  onClose,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [totalDuration, setTotalDuration] = useState<number>(initialSeconds);

  // Sync when initialSeconds changes
  useEffect(() => {
    if (isOpen) {
      setSecondsRemaining(initialSeconds);
      setTotalDuration(initialSeconds);
      setIsRunning(true);
    }
  }, [initialSeconds, isOpen]);

  // Countdown loop
  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isRunning]);

  // Handle countdown complete
  useEffect(() => {
    if (!isOpen || !isRunning) return;
    if (secondsRemaining === 0) {
      playRestCompleteChime();
      setIsRunning(false);
    }
  }, [secondsRemaining, isOpen, isRunning]);

  if (!isOpen) return null;

  const progressPct = totalDuration > 0 ? ((totalDuration - secondsRemaining) / totalDuration) * 100 : 100;
  const isFinished = secondsRemaining === 0;

  const adjustTime = (delta: number) => {
    setSecondsRemaining((prev) => {
      const next = Math.max(0, prev + delta);
      if (next > totalDuration) setTotalDuration(next);
      return next;
    });
    if (!isRunning && secondsRemaining + delta > 0) {
      setIsRunning(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m > 0 ? `${m}:` : ''}${s < 10 && m > 0 ? `0${s}` : s}s`;
  };

  return (
    <div 
      id="floating-rest-timer"
      className="fixed bottom-5 right-5 z-50 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-900/10 p-5 transition-all animate-in fade-in slide-in-from-bottom-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-lime-500 animate-pulse' : isFinished ? 'bg-cyan-500' : 'bg-amber-500'}`} />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {isFinished ? 'Rest Complete!' : 'Active Rest Timer'}
          </span>
        </div>
        <button
          id="close-rest-timer-btn"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Exercise context */}
      <div className="text-xs text-slate-500 truncate mb-3 font-medium">
        Next set: <span className="text-slate-900 font-bold">{exerciseName}</span>
      </div>

      {/* Timer & Controls Display */}
      <div className="flex items-center justify-between gap-4">
        {/* Large Countdown */}
        <div>
          <div className={`font-mono text-3xl font-black tracking-tight ${isFinished ? 'text-lime-700' : 'text-slate-950'}`}>
            {formatTime(secondsRemaining)}
          </div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
            {isFinished ? 'Ready to lift!' : `${secondsRemaining}s left`}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            id="timer-minus-15-btn"
            onClick={() => adjustTime(-15)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs transition-colors cursor-pointer"
            title="Minus 15 seconds"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button
            id="timer-play-pause-btn"
            onClick={() => setIsRunning(!isRunning)}
            className={`p-2.5 rounded-xl font-bold transition-all shadow-xs cursor-pointer ${
              isRunning 
                ? 'bg-lime-400 text-slate-950 hover:bg-lime-500' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <button
            id="timer-plus-15-btn"
            onClick={() => adjustTime(15)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs transition-colors cursor-pointer"
            title="Add 15 seconds"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4 p-0.5 border border-slate-200">
        <div 
          className="bg-lime-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
};
