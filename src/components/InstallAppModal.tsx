import React, { useState } from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  Monitor, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  Zap, 
  WifiOff, 
  Maximize2,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { usePWAInstall, PlatformType } from '../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, platform, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'auto' | 'ios' | 'android' | 'desktop'>(() => {
    if (isIOS) return 'ios';
    if (platform === 'android') return 'android';
    if (platform === 'chrome_desktop' || platform === 'edge_desktop' || platform === 'safari_mac') return 'desktop';
    return 'auto';
  });
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    setIsInstalling(true);
    const success = await install();
    setIsInstalling(false);
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div
      id="pwa-install-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="pwa-install-modal"
        className="w-full max-w-lg bg-[#121215] border border-[#27272a] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#27272a] flex items-center justify-between relative bg-gradient-to-b from-[#18181b] to-[#121215]">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Fit in Blink Icon"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-2xl object-cover border border-[#3f3f46] shadow-lg shadow-[#bef264]/10"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#bef264] flex items-center justify-center text-black">
                <Download className="w-3 h-3 stroke-[3]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black uppercase italic tracking-tight text-white">
                  Install Fit in Blink
                </h3>
                <span className="text-[10px] font-mono font-bold text-black bg-[#bef264] px-2 py-0.5 rounded-full uppercase">
                  PWA
                </span>
              </div>
              <p className="text-xs text-[#a1a1aa] mt-0.5">
                Run natively on your device with offline support
              </p>
            </div>
          </div>
          <button
            id="close-install-modal-btn"
            onClick={onClose}
            className="p-2 text-[#71717a] hover:text-white hover:bg-[#27272a] rounded-xl transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Key Benefits Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#bef264]/10 text-[#bef264] shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white leading-tight">Instant Launch</div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">Direct 1-tap dock/home icon</div>
              </div>
            </div>

            <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#bef264]/10 text-[#bef264] shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white leading-tight">Offline Workouts</div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">Works in gym dead-zones</div>
              </div>
            </div>

            <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#bef264]/10 text-[#bef264] shrink-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white leading-tight">Full Screen UI</div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">No URL bars or clutter</div>
              </div>
            </div>

            <div className="p-3 bg-[#18181b] border border-[#27272a] rounded-2xl flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#bef264]/10 text-[#bef264] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white leading-tight">Zero Lag Storage</div>
                <div className="text-[11px] text-[#71717a] leading-tight mt-0.5">Saves sets & custom metrics</div>
              </div>
            </div>
          </div>

          {/* Quick 1-Click Action if Browser Supports Native Prompt */}
          {isInstallable && !installSuccess && (
            <div className="p-4 bg-gradient-to-br from-[#bef264]/10 to-[#18181b] border border-[#bef264]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-sm font-bold text-white">Browser Ready for 1-Click Install</div>
                <div className="text-xs text-[#a1a1aa] mt-0.5">Tap below to add Fit in Blink to your system apps</div>
              </div>
              <button
                id="native-install-button"
                onClick={handleNativeInstall}
                disabled={isInstalling}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#bef264]/20 cursor-pointer shrink-0 disabled:opacity-50"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{isInstalling ? 'Installing...' : 'Install Now'}</span>
              </button>
            </div>
          )}

          {installSuccess && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Installation Successful!</div>
                <div className="text-xs text-emerald-300 mt-0.5">Fit in Blink is now available on your home screen or application launcher.</div>
              </div>
            </div>
          )}

          {/* Platform Tab Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">
                Instructions for your device:
              </span>
              {isInstalled && (
                <span className="text-[10px] font-mono text-[#bef264] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> App is already installed
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#18181b] border border-[#27272a] rounded-xl text-xs">
              <button
                id="tab-ios-guide"
                onClick={() => setActiveTab('ios')}
                className={`py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'ios'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-[#71717a] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iOS / Apple</span>
              </button>

              <button
                id="tab-android-guide"
                onClick={() => setActiveTab('android')}
                className={`py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'android'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-[#71717a] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>

              <button
                id="tab-desktop-guide"
                onClick={() => setActiveTab('desktop')}
                className={`py-2 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'desktop'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-[#71717a] hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
            </div>
          </div>

          {/* Platform Guide Content */}
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-4 sm:p-5">
            {activeTab === 'ios' && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#bef264] uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Safari on iPhone & iPad</span>
                </div>

                <div className="space-y-2.5 text-xs text-[#d4d4d8]">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div className="leading-relaxed">
                      Tap the <strong className="text-white">Share</strong> button <Share2 className="inline w-3.5 h-3.5 text-[#bef264] mx-1" /> in the bottom toolbar of Safari.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div className="leading-relaxed">
                      Scroll down the sheet and select <strong className="text-white">Add to Home Screen</strong> <PlusSquare className="inline w-3.5 h-3.5 text-[#bef264] mx-1" />.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <div className="leading-relaxed">
                      Tap <strong className="text-white">Add</strong> in the top-right corner to place the app on your home screen.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'android' && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#bef264] uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>Chrome / Edge on Android</span>
                </div>

                <div className="space-y-2.5 text-xs text-[#d4d4d8]">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div className="leading-relaxed">
                      Tap the <strong className="text-white">three dots menu (⋮)</strong> in top-right corner of Chrome.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div className="leading-relaxed">
                      Tap <strong className="text-white">Install app</strong> or <strong className="text-white">Add to Home screen</strong>.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <div className="leading-relaxed">
                      Confirm <strong className="text-white">Install</strong> to add Fit in Blink to your app drawer.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'desktop' || activeTab === 'auto') && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#bef264] uppercase tracking-wider">
                  <Monitor className="w-4 h-4" />
                  <span>Chrome / Edge / Safari on PC & Mac</span>
                </div>

                <div className="space-y-2.5 text-xs text-[#d4d4d8]">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </div>
                    <div className="leading-relaxed">
                      Look at the right side of your browser address / URL bar for the <strong className="text-white">Install Icon</strong> (computer monitor with down arrow or +).
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </div>
                    <div className="leading-relaxed">
                      Click <strong className="text-white">Install</strong> to open Fit in Blink in its own standalone, distraction-free desktop window.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#27272a]/40 border border-[#27272a]">
                    <div className="w-6 h-6 rounded-lg bg-[#3f3f46] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </div>
                    <div className="leading-relaxed">
                      On Mac Safari: Choose <strong className="text-white">File → Add to Dock...</strong> from the top system menu.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#27272a] bg-[#18181b] flex items-center justify-between">
          <div className="text-[11px] text-[#71717a] flex items-center gap-1.5 font-mono">
            <span>v1.0.0</span>
            <span>•</span>
            <span>PWA Protocol</span>
          </div>
          <button
            id="dismiss-install-modal-btn"
            onClick={onClose}
            className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
