import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'amp-ad': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        layout?: string;
        width?: string | number;
        height?: string | number;
        type?: string;
        'data-ad-client'?: string;
        'data-ad-slot'?: string;
        [key: string]: any;
      };
    }
  }
}

interface GoogleAdUnitProps {
  slot?: string;
  client?: string;
  width?: number | string;
  height?: number | string;
  layout?: string;
  type?: string;
  className?: string;
}

export const GoogleAdUnit: React.FC<GoogleAdUnitProps> = ({
  slot = '1600236671',
  client = 'ca-pub-9398536967947214',
  width = 728,
  height = 90,
  layout = 'fixed',
  type = 'adsense',
  className = '',
}) => {
  return (
    <div 
      id={`amp-ad-unit-${slot}`} 
      className={`w-full overflow-hidden my-6 flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-full max-w-4xl bg-[#161616] border border-[#282828] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 text-center shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase bg-[#1f1f1f] border border-[#333] px-2.5 py-0.5 rounded-full">
            Sponsored Advertisement
          </span>
        </div>
        
        {/* Responsive container for AMP Ad Unit */}
        <div className="w-full overflow-x-auto flex items-center justify-center py-1">
          <amp-ad
            layout={layout}
            width={width}
            height={height}
            type={type}
            data-ad-client={client}
            data-ad-slot={slot}
            style={{ maxWidth: '100%' }}
          >
          </amp-ad>
        </div>
      </div>
    </div>
  );
};


