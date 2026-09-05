import React, { useEffect, useRef } from 'react';

interface GoogleAdUnitProps {
  slot?: string;
  client?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const GoogleAdUnit: React.FC<GoogleAdUnitProps> = ({
  slot = '1600236671',
  client = 'ca-pub-9398536967947214',
  format = 'auto',
  responsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    if (isPushed.current) return;
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch (err) {
      console.warn('Google AdSense render notice:', err);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden my-4 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full max-w-5xl bg-white/60 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-3 shadow-2xs text-center">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
          Advertisement
        </div>
        <div className="min-h-[90px] flex items-center justify-center overflow-hidden">
          {/* Chair Ad Unit */}
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '250px', width: '100%' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
      </div>
    </div>
  );
};
