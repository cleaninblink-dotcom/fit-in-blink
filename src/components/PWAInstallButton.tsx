import React from 'react';
import { Download, Smartphone, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  variant?: 'header' | 'banner' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenModal,
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // If already running in standalone mode, show minimal or hide
  if (isInstalled) {
    if (variant === 'pill') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#bef264] bg-[#bef264]/10 border border-[#bef264]/20 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3" />
          <span>App Installed</span>
        </span>
      );
    }
    return null;
  }

  const handleClick = async () => {
    // If native prompt is ready, try triggering prompt first, or open modal
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        onOpenModal();
      }
    } else {
      onOpenModal();
    }
  };

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-[#18181b] via-[#1f1f23] to-[#18181b] border border-[#bef264]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-black/40 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#bef264]/10 border border-[#bef264]/30 rounded-xl text-[#bef264] shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Install Fit in Blink on Your Device</span>
              <span className="text-[10px] font-mono bg-[#bef264] text-black font-extrabold px-1.5 py-0.2 rounded">PWA</span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Get instant offline access, full-screen workouts, and zero browser lag.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id="banner-install-app-btn"
            onClick={handleClick}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-[#bef264]/10 cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Install App</span>
          </button>
          <button
            id="banner-guide-app-btn"
            onClick={onOpenModal}
            className="px-3 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold text-xs rounded-xl transition cursor-pointer"
            title="Installation Guide"
          >
            Guide
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      id="header-install-app-btn"
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#18181b] hover:bg-[#27272a] border border-[#bef264]/40 hover:border-[#bef264] text-[#bef264] hover:text-[#d9f99d] rounded-full text-xs font-bold transition-all group cursor-pointer shrink-0 active:scale-95 shadow-sm shadow-[#bef264]/10 ${className}`}
      title="Install Fit in Blink in your browser or home screen"
      aria-label="Install App"
    >
      <Download className="w-3.5 h-3.5 stroke-[2.5] text-[#bef264] group-hover:translate-y-0.5 transition-transform" />
      <span className="text-[10px] sm:text-xs uppercase tracking-wider font-extrabold">Install</span>
    </button>
  );
};
