import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Compass,
  Search,
  Sparkles,
  ExternalLink,
  Mic,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  HelpCircle,
  Dumbbell,
  Apple,
  Pill,
  Activity,
  Flame,
  Globe,
  Loader2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { UserProfile } from '../types';

interface FitnessGuideSectionProps {
  profile: UserProfile;
  onOpenVoiceCoach: (initialTopic?: string) => void;
}

interface GroundingSource {
  title: string;
  uri: string;
}

interface GuideResult {
  query: string;
  answer: string;
  sources: GroundingSource[];
  searchQueries: string[];
  timestamp: string;
}

interface CuratedTopic {
  id: string;
  category: 'training' | 'nutrition' | 'supplements' | 'recovery';
  title: string;
  query: string;
  tag: string;
  readTime: string;
}

const CURATED_TOPICS: CuratedTopic[] = [
  {
    id: 'protein-intake',
    category: 'nutrition',
    title: 'Optimal Daily Protein: Scientific Intake by Goal',
    query: 'What is the optimal daily protein intake per kilogram of bodyweight for muscle hypertrophy versus fat loss deficit according to recent sports nutrition studies?',
    tag: 'Nutrition Science',
    readTime: '3 min read',
  },
  {
    id: 'creatine-evidence',
    category: 'supplements',
    title: 'Creatine Monohydrate: Loading, Timing & Hydration',
    query: 'What is the latest scientific consensus on creatine monohydrate loading vs daily maintenance dosing, timing around workouts, and hydration requirements?',
    tag: 'Supplements',
    readTime: '2 min read',
  },
  {
    id: 'hypertrophy-rep-ranges',
    category: 'training',
    title: 'Hypertrophy Rep Ranges: 6-12 vs 15-30 Reps',
    query: 'Does training with 6-12 reps cause more muscle hypertrophy than 15-30 reps when sets are taken close to muscular failure? Cite current sports science research.',
    tag: 'Hypertrophy',
    readTime: '4 min read',
  },
  {
    id: 'squat-knee-pathomechanics',
    category: 'training',
    title: 'Preventing Knee Pain & Valgus in Squats',
    query: 'What are the biomechanical causes and evidence-based corrective exercises for knee caving (valgus) and patellar tendon discomfort during heavy squats?',
    tag: 'Biomechanics',
    readTime: '3 min read',
  },
  {
    id: 'doms-recovery-strategies',
    category: 'recovery',
    title: 'DOMS & Muscle Soreness: What Works vs Myths',
    query: 'What recovery protocols (active recovery, massage guns, cold plunge, compression, sleep) actually accelerate recovery from Delayed Onset Muscle Soreness (DOMS)?',
    tag: 'Recovery',
    readTime: '3 min read',
  },
  {
    id: 'intermittent-fasting-muscle',
    category: 'nutrition',
    title: 'Intermittent Fasting & Muscle Protein Synthesis',
    query: 'How does intermittent fasting (16/8 window) impact muscle protein synthesis and lean muscle retention during a caloric deficit according to clinical research?',
    tag: 'Diet Protocols',
    readTime: '4 min read',
  },
];

export const FitnessGuideSection: React.FC<FitnessGuideSectionProps> = ({
  profile,
  onOpenVoiceCoach,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'training' | 'nutrition' | 'supplements' | 'recovery'
  >('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeGuide, setActiveGuide] = useState<GuideResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedGuides, setSavedGuides] = useState<GuideResult[]>(() => {
    try {
      const saved = localStorage.getItem('fit_saved_guides');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist bookmarks
  const toggleSaveGuide = (guide: GuideResult) => {
    setSavedGuides((prev) => {
      const exists = prev.some((g) => g.query === guide.query);
      let updated: GuideResult[];
      if (exists) {
        updated = prev.filter((g) => g.query !== guide.query);
      } else {
        updated = [guide, ...prev];
      }
      try {
        localStorage.setItem('fit_saved_guides', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  };

  const isCurrentGuideSaved =
    activeGuide && savedGuides.some((g) => g.query === activeGuide.query);

  // Fetch search-grounded guide from server
  const handleFetchGuide = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/fitness-guide/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: trimmed,
          userContext: {
            weight: profile.weight,
            height: profile.heightCm,
            goal: profile.goal,
            calories: profile.workoutDurationMinutes ? 2400 : 2000,
            activityLevel: profile.activityLevel,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch search-grounded guide.');
      }

      const data = await response.json();
      const newGuide: GuideResult = {
        query: trimmed,
        answer: data.answer,
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      setActiveGuide(newGuide);

      // Scroll to active guide container
      const el = document.getElementById('active-guide-container');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err: any) {
      console.error('Failed to generate fitness guide:', err);
      setErrorMessage(
        err.message || 'Unable to connect to Google Search Grounding engine. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetchGuide(searchQuery);
  };

  const filteredTopics = CURATED_TOPICS.filter((topic) => {
    if (selectedCategory === 'all') return true;
    return topic.category === selectedCategory;
  });

  return (
    <section id="fitness-guide-section" className="space-y-6 animate-fade-in">
      {/* Hero Banner / Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                Google Search Grounded
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                gemini-3.5-flash
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-lime-400 font-mono text-[11px] border border-slate-700">
                <Mic className="w-3 h-3" /> Live Voice Coach
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white italic">
              Evidence-Based Fitness Guide
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore scientific sports nutrition, biomechanics cues, supplement data, and injury prevention backed in real time by Google Search data. Talk hands-free with Coach Zephyr via real-time Live Voice.
            </p>
          </div>

          {/* Quick Trigger to Live Voice Coach */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenVoiceCoach()}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-lime-400 hover:bg-lime-300 text-slate-950 rounded-2xl font-black uppercase tracking-wider text-xs sm:text-sm shadow-lg shadow-lime-400/20 transition-all cursor-pointer active:scale-95 group"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping group-hover:bg-slate-900" />
              <Mic className="w-4 h-4" />
              <span>Talk with Live Voice Coach</span>
            </button>
          </div>
        </div>

        {/* Search Bar Grounded in Google Search */}
        <form onSubmit={handleSubmit} className="mt-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700 shadow-inner">
            <div className="flex-1 flex items-center gap-3 px-3">
              <Search className="w-5 h-5 text-lime-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything: e.g., 'How much protein per meal?', 'Squat foot angle biomechanics'..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Searching Web...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-lime-600" />
                  <span>Verify with Search</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 font-mono">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#00FF66] text-black font-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
              : 'bg-[#1a1a1a] hover:bg-[#252525] text-slate-400 hover:text-white border border-[#2c2c2c]'
          }`}
        >
          All Topics
        </button>
        <button
          onClick={() => setSelectedCategory('training')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'training'
              ? 'bg-[#00FF66] text-black font-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
              : 'bg-[#1a1a1a] hover:bg-[#252525] text-slate-400 hover:text-white border border-[#2c2c2c]'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          Biomechanics & Training
        </button>
        <button
          onClick={() => setSelectedCategory('nutrition')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'nutrition'
              ? 'bg-[#FF5500] text-white font-black shadow-[0_0_12px_rgba(255,85,0,0.4)]'
              : 'bg-[#1a1a1a] hover:bg-[#252525] text-slate-400 hover:text-white border border-[#2c2c2c]'
          }`}
        >
          <Apple className="w-3.5 h-3.5" />
          Nutrition Science
        </button>
        <button
          onClick={() => setSelectedCategory('supplements')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'supplements'
              ? 'bg-[#00FF66] text-black font-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
              : 'bg-[#1a1a1a] hover:bg-[#252525] text-slate-400 hover:text-white border border-[#2c2c2c]'
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          Supplements
        </button>
        <button
          onClick={() => setSelectedCategory('recovery')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
            selectedCategory === 'recovery'
              ? 'bg-[#00FF66] text-black font-black shadow-[0_0_12px_rgba(0,255,102,0.4)]'
              : 'bg-[#1a1a1a] hover:bg-[#252525] text-slate-400 hover:text-white border border-[#2c2c2c]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Recovery & Mobility
        </button>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => handleFetchGuide(searchQuery || 'optimal workout nutrition')}
            className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-xs hover:bg-rose-700 cursor-pointer shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      {/* Active Generated Guide Card */}
      {activeGuide && (
        <div
          id="active-guide-container"
          className="bg-[#161616] border border-[#00FF66]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,255,102,0.12)] space-y-6 text-slate-100"
        >
          {/* Guide Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#282828]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#14281a] border border-[#00FF66]/30 text-[#00FF66] font-bold text-xs uppercase tracking-wider font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" /> Verified with Google Search
                </span>
                <span className="text-slate-400 text-xs font-mono">{activeGuide.timestamp}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white capitalize font-heading">
                {activeGuide.query}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleSaveGuide(activeGuide)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border cursor-pointer ${
                  isCurrentGuideSaved
                    ? 'bg-[#14281a] text-[#00FF66] border-[#00FF66]/50 shadow-[0_0_8px_rgba(0,255,102,0.2)]'
                    : 'bg-[#1f1f1f] hover:bg-[#282828] text-slate-300 border-[#333333]'
                }`}
                title="Save guide to bookmarks"
              >
                {isCurrentGuideSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#00FF66]" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Save Guide</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenVoiceCoach(activeGuide.query)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00FF66] hover:bg-[#00e65c] text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(0,255,102,0.4)] active:scale-95"
                title="Discuss this guide with Coach Zephyr live"
              >
                <Mic className="w-3.5 h-3.5 fill-black text-black" />
                <span>Discuss with Coach</span>
              </button>
            </div>
          </div>

          {/* Formatted Guide Body using react-markdown */}
          <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-3">
            <div className="markdown-guide-content space-y-2">
              <Markdown>{activeGuide.answer}</Markdown>
            </div>
          </div>

          {/* Search Grounding Sources & Citations */}
          {activeGuide.sources && activeGuide.sources.length > 0 && (
            <div className="pt-4 border-t border-[#282828]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs uppercase font-bold text-[#00FF66] tracking-wider flex items-center gap-1.5 font-mono">
                  <Globe className="w-3.5 h-3.5 text-[#00FF66]" />
                  Google Search Grounding Sources ({activeGuide.sources.length})
                </h4>
                {activeGuide.searchQueries && activeGuide.searchQueries.length > 0 && (
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-block">
                    Search: {activeGuide.searchQueries.join(' • ')}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {activeGuide.sources.map((source, idx) => {
                  let hostname = '';
                  try {
                    hostname = new URL(source.uri).hostname.replace('www.', '');
                  } catch (_) {
                    hostname = source.uri;
                  }

                  return (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#1c1c1c] hover:bg-[#252525] border border-[#2d2d2d] hover:border-[#00FF66]/40 rounded-2xl flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-100 truncate group-hover:text-[#00FF66]">
                          {source.title}
                        </p>
                        <span className="text-[11px] font-mono text-slate-400 truncate block">
                          {hostname}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00FF66] shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Curated Scientific Guides Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00FF66]" />
            <h3 className="text-lg font-black uppercase tracking-tight text-white font-heading">
              Curated Sports Science Guides
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {filteredTopics.length} Evidence-Based Topics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#161616] hover:border-[#00FF66]/50 border border-[#282828] rounded-3xl p-5 shadow-sm transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1f1f1f] text-slate-300 border border-[#2f2f2f] font-mono">
                    {topic.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {topic.readTime}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-[#00FF66] transition-colors font-heading">
                  {topic.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {topic.query}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleFetchGuide(topic.query)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#00FF66] hover:text-[#00e65c] cursor-pointer disabled:opacity-50"
                >
                  <span>Explore Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenVoiceCoach(topic.query)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-[#252525] rounded-xl transition-colors cursor-pointer"
                  title="Ask Coach Zephyr via Voice"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Guides Drawer / Bar if any */}
      {savedGuides.length > 0 && (
        <div className="bg-[#161616] border border-[#282828] rounded-3xl p-5 space-y-3 shadow-sm text-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 font-heading">
              <Bookmark className="w-4 h-4 text-[#00FF66]" />
              My Saved Guides ({savedGuides.length})
            </h4>
            <button
              onClick={() => {
                setSavedGuides([]);
                try {
                  localStorage.removeItem('fit_saved_guides');
                } catch (_) {}
              }}
              className="text-xs text-slate-400 hover:text-rose-400 cursor-pointer font-mono"
            >
              Clear Saved
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {savedGuides.map((guide, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveGuide(guide);
                  const el = document.getElementById('active-guide-container');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="p-3 bg-[#1c1c1c] hover:bg-[#252525] border border-[#2d2d2d] hover:border-[#00FF66]/40 rounded-2xl cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-white truncate">
                    {guide.query}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {guide.sources.length} sources • {guide.timestamp}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
