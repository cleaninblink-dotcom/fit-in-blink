import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  X, 
  RefreshCw 
} from 'lucide-react';
import { Exercise } from '../types';
import { getExerciseVideoVisual } from '../utils/exerciseVideos';
import { useFitness } from '../context/FitnessContext';

interface HumanExerciseThumbnailProps {
  exercise: Exercise;
  dayName?: string;
}

export const HumanExerciseThumbnail: React.FC<HumanExerciseThumbnailProps> = ({
  exercise,
  dayName,
}) => {
  const { preferredModelGender, setPreferredModelGender } = useFitness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrueFullscreen, setIsTrueFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeGender, setActiveGender] = useState<'male' | 'female'>(preferredModelGender);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Sync with global context if it updates
  useEffect(() => {
    setActiveGender(preferredModelGender);
  }, [preferredModelGender]);

  // Sync browser native fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsTrueFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation inside modal (Space to play/pause, F to toggle fullscreen, Esc to exit)
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          setIsModalOpen(false);
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleNativeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const visualData = getExerciseVideoVisual(exercise.name, activeGender);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(prev => !prev);
  };

  const toggleGender = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = activeGender === 'male' ? 'female' : 'male';
    setActiveGender(next);
    setPreferredModelGender(next);
    setVideoLoaded(false);
    setHasError(false);
  };

  const openFullscreenStudy = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const toggleNativeFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsTrueFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsTrueFullscreen(false);
    }
  };

  const closeFullscreenStudy = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Interactive Click-to-Expand Exercise Video Card */}
      <div 
        id={`exercise-video-${exercise.id}`}
        role="button"
        tabIndex={0}
        onClick={openFullscreenStudy}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFullscreenStudy(e);
          }
        }}
        className="relative group cursor-pointer w-full sm:w-60 md:w-72 lg:w-80 h-52 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 hover:border-lime-500 bg-slate-900 shrink-0 transition-all duration-300 shadow-sm hover:shadow-md select-none focus:outline-none focus:ring-2 focus:ring-lime-400"
        title="Click to expand full-screen high-definition video demonstration"
      >
        {/* Looping Video Demo Element with HD clarity enhancement */}
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[#09090b] via-[#121215] to-[#09090b] flex items-center justify-center">
          {isPlaying ? (
            <img
              src={visualData.videoUrl}
              alt={visualData.altText}
              onLoad={() => setVideoLoaded(true)}
              onError={() => setHasError(true)}
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              className="w-full h-full transition-all duration-300 filter contrast-[1.08] brightness-[1.04] saturate-[1.06] object-contain object-center p-1.5"
            />
          ) : (
            <img
              src={visualData.posterUrl || visualData.videoUrl}
              alt={visualData.altText}
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              className="w-full h-full filter brightness-75 contrast-[1.05] object-contain object-center p-1.5"
            />
          )}
        </div>

        {/* Sole Overlay Element: Clean Full-Screen Indicator */}
        <div className="absolute bottom-2.5 right-2.5 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white group-hover:text-slate-950 font-mono bg-slate-900/80 group-hover:bg-lime-400 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 group-hover:border-lime-400 shadow-xs transition-all">
            <Maximize2 className="w-3 h-3" />
            <span>Full Screen</span>
          </span>
        </div>
      </div>

      {/* Full-Screen Video Demonstration Modal / Theater View */}
      {isModalOpen && (
        <div 
          id={`fullscreen-exercise-video-${exercise.id}`}
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 overflow-hidden"
          onClick={closeFullscreenStudy}
        >
          {/* Top Theater Header Navigation Bar */}
          <div 
            className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-[#27272a] bg-[#121215]/90 backdrop-blur-md shrink-0 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#bef264] animate-pulse hidden sm:inline-block" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase font-bold text-[#bef264] tracking-wider">
                    {dayName || 'Daily Routine'} • Full-Screen Form Study
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    HD 1080p Master
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase text-white tracking-tight">
                  {exercise.name}
                </h2>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Gender Model Switcher */}
              <button
                type="button"
                onClick={toggleGender}
                className="px-3 py-1.5 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-[#bef264] text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                title="Switch between Fit Man and Fit Woman athletic demonstration"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#bef264]" />
                <span>Model: <strong className="text-[#bef264]">{activeGender === 'female' ? 'Woman' : 'Man'}</strong></span>
              </button>

              {/* Native Browser Fullscreen Toggle Button */}
              <button
                type="button"
                onClick={toggleNativeFullscreen}
                className="p-2 rounded-xl border border-[#27272a] bg-[#18181b] hover:bg-[#27272a] hover:border-[#bef264] text-white flex items-center justify-center transition-colors cursor-pointer shadow"
                title={isTrueFullscreen ? "Exit Edge-to-Edge Fullscreen (F)" : "Enter Edge-to-Edge Fullscreen (F)"}
              >
                {isTrueFullscreen ? <Minimize2 className="w-4 h-4 text-[#bef264]" /> : <Maximize2 className="w-4 h-4 text-white" />}
              </button>

              {/* Exit Full-Screen Button */}
              <button
                type="button"
                onClick={closeFullscreenStudy}
                className="px-3.5 py-1.5 rounded-xl bg-[#27272a] hover:bg-rose-900/40 hover:border-rose-500/50 border border-transparent text-white hover:text-rose-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Exit Full-Screen View [Esc]"
              >
                <X className="w-4 h-4" />
                <span className="hidden md:inline">Exit [Esc]</span>
              </button>
            </div>
          </div>

          {/* Full-Screen Theater Center Stage - Completely Unobstructed */}
          <div 
            className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden cursor-pointer select-none"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            title={isPlaying ? "Click video to pause" : "Click video to resume"}
          >
            {/* The Large High-Definition Looping Video Element */}
            {isPlaying ? (
              <img
                src={visualData.videoUrl}
                alt={visualData.altText}
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                className="max-w-full max-h-full object-contain filter contrast-[1.09] brightness-[1.04] saturate-[1.06]"
              />
            ) : (
              <img
                src={visualData.posterUrl || visualData.videoUrl}
                alt={visualData.altText}
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                className="max-w-full max-h-full object-contain filter brightness-90 contrast-[1.06]"
              />
            )}
          </div>

          {/* Bottom Specifications Drawer */}
          <div 
            className="p-4 sm:px-8 sm:py-4 bg-[#121215] border-t border-[#27272a] flex items-center justify-between gap-4 flex-wrap shrink-0 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prescribed Metrics Chips */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap font-mono text-xs">
              <span className="bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-xl text-zinc-300">
                Sets: <strong className="text-white">{exercise.sets}</strong>
              </span>
              <span className="bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-xl text-zinc-300">
                Reps: <strong className="text-[#bef264]">{exercise.reps}</strong>
              </span>
              <span className="bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-xl text-zinc-300">
                Rest: <strong className="text-white">{exercise.restSeconds}s</strong>
              </span>
              <span className="bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-xl text-zinc-300">
                Tempo: <strong className="text-[#bef264]">{exercise.tempo}</strong>
              </span>
              <span className="bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-xl text-zinc-300">
                Equipment: <strong className="text-white">{visualData.details.equipment}</strong>
              </span>
              <span className="bg-[#18181b] border border-[#27272a] px-3 py-1.5 rounded-xl text-zinc-300">
                Target: <strong className="text-[#bef264]">{visualData.details.primaryMuscle}</strong>
              </span>
            </div>

            {/* Quick Exit Button */}
            <button
              type="button"
              onClick={closeFullscreenStudy}
              className="px-5 py-2 rounded-xl bg-[#bef264] hover:bg-[#a3e635] text-black font-black uppercase tracking-wider text-xs shadow-lg shadow-[#bef264]/20 transition-all cursor-pointer ml-auto"
            >
              Done Studying Form
            </button>
          </div>
        </div>
      )}
    </>
  );
};


