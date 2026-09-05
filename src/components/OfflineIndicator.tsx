import React from 'react';
import { WifiOff, Sparkles } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offline-indicator-banner"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center justify-between gap-3 bg-[#18181b] border border-amber-500/40 text-amber-200 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400 shrink-0">
          <WifiOff className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>Offline Mode Active</span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
          <p className="text-[11px] text-[#a1a1aa] mt-0.5 leading-tight">
            Fit in Blink is cached offline. All workouts and macro targets work seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};
