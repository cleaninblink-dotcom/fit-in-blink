import React from 'react';
import { Layers, Dumbbell, Apple, Compass, Sparkles } from 'lucide-react';

export type ActiveViewType = 'all' | 'workout' | 'nutrition' | 'guide';

interface SectionNavTabsProps {
  activeView: ActiveViewType;
  onSelectView: (view: ActiveViewType) => void;
  durationMinutes: number;
}

interface TabItem {
  id: ActiveViewType;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: 'neon' | 'orange' | 'cyan';
}

const TABS: TabItem[] = [
  {
    id: 'all',
    label: 'Full Daily Plan',
    subtitle: 'All-in-One 24h Protocol',
    icon: Layers,
    accentColor: 'neon',
  },
  {
    id: 'workout',
    label: 'Workout Routine',
    subtitle: 'Split, Sets & Rest Timer',
    icon: Dumbbell,
    accentColor: 'neon',
  },
  {
    id: 'nutrition',
    label: 'Diet & Macros',
    subtitle: 'Calories & Mifflin-St Jeor',
    icon: Apple,
    accentColor: 'orange',
  },
  {
    id: 'guide',
    label: 'Fitness Guide & Coach',
    subtitle: 'Sports Science & Live AI',
    icon: Compass,
    accentColor: 'neon',
  },
];

export const SectionNavTabs: React.FC<SectionNavTabsProps> = ({
  activeView,
  onSelectView,
  durationMinutes,
}) => {
  return (
    <nav
      id="section-navigation-tabs"
      aria-label="Main Section Navigation"
      className="sticky top-16 sm:top-20 z-30 bg-[#121212]/95 backdrop-blur-md border-b border-[#262626] py-2 sm:py-2.5 transition-all shadow-md"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* 4 Main View Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 w-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => {
                    onSelectView(tab.id);
                    // Smoothly ensure top of content is in view
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 sm:gap-2.5 select-none ${
                    isActive
                      ? tab.accentColor === 'orange'
                        ? 'bg-[#2a170e] border-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.3)] ring-1 ring-[#FF5500]'
                        : 'bg-[#14291c] border-[#00FF66] text-white shadow-[0_0_15px_rgba(0,255,102,0.3)] ring-1 ring-[#00FF66]'
                      : 'bg-[#181818] hover:bg-[#202020] border-[#292929] hover:border-[#383838] text-slate-400 hover:text-white'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                      isActive
                        ? tab.accentColor === 'orange'
                          ? 'bg-[#FF5500] text-white'
                          : 'bg-[#00FF66] text-black'
                        : 'bg-[#222222] text-slate-400 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs sm:text-sm font-black uppercase tracking-tight truncate leading-tight font-heading ${
                          isActive
                            ? tab.accentColor === 'orange'
                              ? 'text-[#FF5500]'
                              : 'text-[#00FF66]'
                            : 'text-white'
                        }`}
                      >
                        {tab.label}
                      </span>
                      {isActive && (
                        <span
                          className={`hidden lg:inline-block w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
                            tab.accentColor === 'orange' ? 'bg-[#FF5500]' : 'bg-[#00FF66]'
                          }`}
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 hidden xs:block truncate leading-tight mt-0.5 font-medium">
                      {tab.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
