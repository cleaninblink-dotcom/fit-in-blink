import React from 'react';
import { Layers, Dumbbell, Apple } from 'lucide-react';

export type ActiveViewType = 'all' | 'workout' | 'nutrition';

interface SectionNavTabsProps {
  activeView: ActiveViewType;
  onSelectView: (view: ActiveViewType) => void;
  durationMinutes: number;
}

interface TabItem {
  id: ActiveViewType;
  label: string;
  mobileLabel: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: 'neon' | 'orange';
}

const TABS: TabItem[] = [
  {
    id: 'all',
    label: 'Full Daily Plan',
    mobileLabel: 'All Plan',
    subtitle: 'All-in-One 24h Protocol',
    icon: Layers,
    accentColor: 'neon',
  },
  {
    id: 'workout',
    label: 'Workout Routine',
    mobileLabel: 'Workout',
    subtitle: 'Split, Sets & Timer',
    icon: Dumbbell,
    accentColor: 'neon',
  },
  {
    id: 'nutrition',
    label: 'Diet & Macros',
    mobileLabel: 'Nutrition',
    subtitle: 'Target Calories & Macros',
    icon: Apple,
    accentColor: 'orange',
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
      className="sticky top-14 sm:top-16 z-30 bg-[#191D26] border-b border-[#31353E] py-1.5 sm:py-2 transition-all shadow-md"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* 3 Main View Tabs */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2.5 w-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => {
                    onSelectView(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative p-1.5 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2.5 select-none ${
                    isActive
                      ? tab.accentColor === 'orange'
                        ? 'bg-[#2A201A] border-[#F97316] text-white shadow-[0_0_15px_rgba(249,115,22,0.35)] ring-1 ring-[#F97316]'
                        : 'bg-[#1E293B] border-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.35)] ring-1 ring-[#2563EB]'
                      : 'bg-[#252B37] hover:bg-[#2C3342] border-[#31353E] hover:border-[#3B82F6]/40 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                      isActive
                        ? tab.accentColor === 'orange'
                          ? 'bg-[#F97316] text-white'
                          : 'bg-[#2563EB] text-white'
                        : 'bg-[#191D26] text-[#94A3B8] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-tight truncate leading-tight font-heading ${
                          isActive
                            ? tab.accentColor === 'orange'
                              ? 'text-[#F97316]'
                              : 'text-[#60A5FA]'
                            : 'text-white'
                        }`}
                      >
                        <span className="sm:hidden">{tab.mobileLabel}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </span>
                      {isActive && (
                        <span
                          className={`hidden lg:inline-block w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
                            tab.accentColor === 'orange' ? 'bg-[#F97316]' : 'bg-[#60A5FA]'
                          }`}
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-[#94A3B8] hidden md:block truncate leading-tight mt-0.5 font-medium">
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
