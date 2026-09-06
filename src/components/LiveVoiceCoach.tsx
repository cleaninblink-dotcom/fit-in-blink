import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneOff,
  Sparkles,
  Send,
  Radio,
  RefreshCw,
  AlertCircle,
  X,
  User,
  Bot,
  Zap,
  Languages,
} from 'lucide-react';
import { float32To16BitPCM, LiveAudioPlayer } from '../utils/liveAudio';
import { UserProfile } from '../types';

interface LiveVoiceCoachProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfile;
  initialTopicPrompt?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}

type CoachLanguage = 'hinglish' | 'english' | 'hindi';

const QUICK_PROMPTS_BY_LANG: Record<CoachLanguage, string[]> = {
  hinglish: [
    'Bhai, squats ke liye solid form cues batao',
    'Post-workout meal me kitna protein chahiye?',
    'Heavy sets ke beech kitna rest lena chahiye?',
    'Workout se pehle kya khana best rahega?',
    'Plateau break karne ki ek top tip do',
    'Aaj mera energy thoda down hai, kya karun?',
  ],
  english: [
    'Form check cues for barbell bench press',
    'What should I eat before training?',
    'How much rest between heavy compound sets?',
    'Best post-workout recovery meal',
    'How to push past a muscle hypertrophy plateau?',
  ],
  hindi: [
    'स्क्वैट्स के लिए सही तकनीक और फॉर्म बताइए',
    'वर्कआउट के बाद प्रोटीन कब लेना चाहिए?',
    'सेट्स के बीच कितना आराम लेना सही है?',
    'मांसपेशियों के विकास के लिए मुख्य टिप्स',
  ],
};

export const LiveVoiceCoach: React.FC<LiveVoiceCoachProps> = ({
  isOpen,
  onClose,
  profile,
  initialTopicPrompt,
}) => {
  const [connectionStatus, setConnectionStatus] = useState<
    'disconnected' | 'connecting' | 'connected' | 'error'
  >('disconnected');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isCoachSpeaking, setIsCoachSpeaking] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  
  // Mixed language state: default to Hinglish per user request!
  const [language, setLanguage] = useState<CoachLanguage>('hinglish');

  // Refs for audio hardware and WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);
  const audioPlayerRef = useRef<LiveAudioPlayer | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const isMicMutedRef = useRef(isMicMuted);
  isMicMutedRef.current = isMicMuted;

  // Cleanup all audio resources
  const cleanupAudio = useCallback(() => {
    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch (_) {}
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current && inputAudioCtxRef.current.state !== 'closed') {
      try {
        inputAudioCtxRef.current.close();
      } catch (_) {}
      inputAudioCtxRef.current = null;
    }
    if (audioPlayerRef.current) {
      audioPlayerRef.current.close();
      audioPlayerRef.current = null;
    }
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (_) {}
      wsRef.current = null;
    }
    setMicVolume(0);
    setIsCoachSpeaking(false);
  }, []);

  // Connect to Gemini Live API WebSocket with selected language
  const startSession = useCallback(async (targetLang?: CoachLanguage) => {
    cleanupAudio();
    setConnectionStatus('connecting');
    setErrorMessage(null);

    const activeLang = targetLang || language;

    // Initialize output audio player
    audioPlayerRef.current = new LiveAudioPlayer((speaking) => {
      setIsCoachSpeaking(speaking);
    });

    try {
      // 1. Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      // 2. Set up Web Audio Context for 16kHz microphone stream
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioCtxClass({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputCtx;

      const source = inputCtx.createMediaStreamSource(stream);
      // ScriptProcessor with 4096 buffer size
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // 3. Connect to server WebSocket with language parameter
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws?lang=${activeLang}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        // If initial topic provided, send initial prompt
        if (initialTopicPrompt) {
          setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'text', text: initialTopicPrompt }));
              setMessages((prev) => [
                ...prev,
                {
                  id: Math.random().toString(),
                  sender: 'user',
                  text: initialTopicPrompt,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
            }
          }, 600);
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'audio' && data.audio) {
            audioPlayerRef.current?.playChunk(data.audio);
          } else if (data.type === 'interrupted') {
            audioPlayerRef.current?.stopAll();
            setIsCoachSpeaking(false);
          } else if (data.type === 'model_transcription' && data.text) {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.sender === 'coach') {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: last.text + ' ' + data.text },
                ];
              }
              return [
                ...prev,
                {
                  id: Math.random().toString(),
                  sender: 'coach',
                  text: data.text,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ];
            });
          } else if (data.type === 'user_transcription' && data.text) {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.sender === 'user') {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: last.text + ' ' + data.text },
                ];
              }
              return [
                ...prev,
                {
                  id: Math.random().toString(),
                  sender: 'user',
                  text: data.text,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ];
            });
          } else if (data.type === 'error') {
            setErrorMessage(data.message || 'Live session error');
            setConnectionStatus('error');
          }
        } catch (err) {
          console.error('[Live Voice] Error parsing WS message:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('[Live Voice] WS error:', err);
        setErrorMessage('WebSocket connection failure. Make sure server is reachable.');
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
      };

      // 4. Audio Processing loop: stream PCM chunks
      processor.onaudioprocess = (e) => {
        if (isMicMutedRef.current) {
          setMicVolume(0);
          return;
        }

        const inputChannelData = e.inputBuffer.getChannelData(0);

        // Calculate RMS for visualizer
        let sum = 0;
        for (let i = 0; i < inputChannelData.length; i++) {
          sum += inputChannelData[i] * inputChannelData[i];
        }
        const rms = Math.sqrt(sum / inputChannelData.length);
        setMicVolume(Math.min(1, rms * 5));

        // Convert Float32 to 16-bit Linear PCM Base64
        const base64Chunk = float32To16BitPCM(inputChannelData);

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: 'audio',
              audio: base64Chunk,
            })
          );
        }
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);
    } catch (err: any) {
      console.error('[Live Voice] Failed to initialize mic or socket:', err);
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Microphone permission was denied. Please allow microphone access to use the live voice coach.'
          : err.message || 'Failed to initialize audio stream.'
      );
      setConnectionStatus('error');
    }
  }, [cleanupAudio, initialTopicPrompt, language]);

  // Handle switching language
  const handleLanguageChange = (newLang: CoachLanguage) => {
    if (newLang === language) return;
    setLanguage(newLang);
    if (connectionStatus === 'connected' || connectionStatus === 'connecting') {
      startSession(newLang);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    setIsMicMuted((prev) => !prev);
  };

  // Send Text Prompt to Coach
  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    const textToSend = textInput.trim();
    wsRef.current.send(JSON.stringify({ type: 'text', text: textToSend }));

    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setTextInput('');
  };

  // Quick Prompt Selection
  const handleSelectQuickPrompt = (promptText: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify({ type: 'text', text: promptText }));
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'user',
        text: promptText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Auto-connect on open, cleanup on close
  useEffect(() => {
    if (isOpen) {
      startSession();
    } else {
      cleanupAudio();
    }

    return () => {
      cleanupAudio();
    };
  }, [isOpen, startSession, cleanupAudio]);

  if (!isOpen) return null;

  const currentPrompts = QUICK_PROMPTS_BY_LANG[language] || QUICK_PROMPTS_BY_LANG.hinglish;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#181818] border border-[#2a2a2a] rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-slate-100">
        
        {/* Header - High Energy Dark Theme */}
        <div className="px-5 py-4 bg-[#121212] text-white flex items-center justify-between border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                  isCoachSpeaking
                    ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.5)]'
                    : 'bg-[#222222] text-[#00FF66] border border-[#333333]'
                }`}
              >
                <Zap className="w-5 h-5" />
              </div>
              {connectionStatus === 'connected' && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00FF66] border-2 border-[#121212] rounded-full animate-pulse shadow-[0_0_8px_#00FF66]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight text-white flex items-center gap-1.5 font-heading">
                  Coach Zephyr <span className="text-xs font-mono font-bold text-[#00FF66]">Live Voice</span>
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#222222] text-[#00FF66] border border-[#333333]">
                  Hinglish / English
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {connectionStatus === 'connecting'
                  ? 'Connecting to real-time high-speed audio...'
                  : connectionStatus === 'connected'
                  ? isCoachSpeaking
                    ? 'Coach is speaking...'
                    : isMicMuted
                    ? 'Microphone muted'
                    : 'Listening to your voice hands-free'
                  : connectionStatus === 'error'
                  ? 'Voice session interrupted'
                  : 'Ready to connect'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-[#262626] rounded-xl transition-colors cursor-pointer"
              title="Close Voice Coach"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Language Selection Bar (Hinglish / English / Hindi) */}
        <div className="px-5 py-2.5 bg-[#141414] border-b border-[#242424] flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <Languages className="w-3.5 h-3.5 text-[#00FF66]" />
            <span className="uppercase tracking-wider text-[11px] font-mono">Coach Language:</span>
          </div>

          <div className="flex items-center gap-1 bg-[#1e1e1e] p-1 rounded-xl border border-[#2e2e2e]">
            <button
              type="button"
              onClick={() => handleLanguageChange('hinglish')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                language === 'hinglish'
                  ? 'bg-[#00FF66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)] font-black'
                  : 'text-slate-400 hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              <span>⚡ Hinglish (Hindi + Eng)</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('english')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                language === 'english'
                  ? 'bg-[#00FF66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)] font-black'
                  : 'text-slate-400 hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('hindi')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                language === 'hindi'
                  ? 'bg-[#00FF66] text-black shadow-[0_0_12px_rgba(0,255,102,0.4)] font-black'
                  : 'text-slate-400 hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              <span>हिंदी</span>
            </button>
          </div>
        </div>

        {/* Live Audio Visualizer Stage - Deep Slate-Black with Neon Glow */}
        <div className="bg-[#0e0e0e] px-6 py-6 text-center border-b border-[#242424] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Ambient Glows */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              isCoachSpeaking
                ? 'bg-radial from-[#00FF66]/20 via-transparent to-transparent opacity-100'
                : micVolume > 0.1
                ? 'bg-radial from-[#FF5500]/20 via-transparent to-transparent opacity-100'
                : 'opacity-0'
            }`}
          />

          {/* Animated Neon Wave Bars */}
          <div className="h-16 flex items-center justify-center gap-1.5 z-10">
            {Array.from({ length: 18 }).map((_, i) => {
              const centerDist = Math.abs(i - 8.5);
              let heightMultiplier = 0.2;

              if (isCoachSpeaking) {
                // Sine wave pattern for speaking coach
                heightMultiplier =
                  0.3 + Math.sin(Date.now() / 150 + i * 0.7) * 0.45 + (1 - centerDist / 9) * 0.35;
              } else if (!isMicMuted && micVolume > 0.05) {
                // Audio volume reactive for user speaking
                heightMultiplier =
                  0.2 + micVolume * (1 - centerDist / 9) * (0.8 + Math.random() * 0.4);
              }

              const clampedHeight = Math.max(8, Math.min(56, Math.round(heightMultiplier * 56)));

              return (
                <span
                  key={i}
                  style={{ height: `${clampedHeight}px` }}
                  className={`w-1.5 rounded-full transition-all duration-75 ${
                    isCoachSpeaking
                      ? 'bg-[#00FF66] shadow-[0_0_12px_#00FF66]'
                      : micVolume > 0.05
                      ? 'bg-[#FF5500] shadow-[0_0_12px_#FF5500]'
                      : 'bg-[#2a2a2a]'
                  }`}
                />
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 z-10 flex-wrap justify-center">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider ${
                isCoachSpeaking
                  ? 'bg-[#00FF66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)] font-black'
                  : !isMicMuted && connectionStatus === 'connected'
                  ? 'bg-[#182a1e] text-[#00FF66] border border-[#00FF66]/30'
                  : 'bg-[#222222] text-slate-400 border border-[#333333]'
              }`}
            >
              <Radio className="w-3 h-3 animate-pulse" />
              {isCoachSpeaking
                ? 'Coach Speaking'
                : isMicMuted
                ? 'Mic Muted'
                : 'Listening Live'}
            </span>
            {profile && (
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
                Context: <span className="text-[#00FF66] font-bold">{profile.weight}kg</span> • <span className="text-[#FF5500] font-bold">{profile.goal}</span>
              </span>
            )}
          </div>
        </div>

        {/* Live Conversation Transcript & Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#141414] min-h-[160px] max-h-[300px]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Sparkles className="w-8 h-8 text-[#00FF66] mb-2 animate-pulse" />
              <p className="text-sm font-bold text-slate-200">
                {language === 'hinglish' 
                  ? 'Mic me bolna shuru karo ya niche diye sawal select karo' 
                  : 'Start speaking into your mic or pick a prompt below'}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                {language === 'hinglish'
                  ? 'Coach Zephyr Hindi aur English mix me real-time form cues, motivation aur nutrition guidance dega.'
                  : 'Coach Zephyr streams real-time spoken coaching, form cues, and workout pacing.'}
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'coach' && (
                  <div className="w-7 h-7 rounded-lg bg-[#222222] text-[#00FF66] border border-[#333333] flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#00FF66] text-black font-medium shadow-sm'
                      : 'bg-[#1e1e1e] text-slate-100 border border-[#2e2e2e]'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[10px] mt-1 block font-mono ${msg.sender === 'user' ? 'text-black/70' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-[#FF5500] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Error Alert if Any */}
        {errorMessage && (
          <div className="px-4 py-2 bg-rose-950/80 border-t border-rose-800 text-rose-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => startSession()}
              className="font-bold underline cursor-pointer text-rose-300 shrink-0 hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-[#181818] border-t border-[#262626] overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00FF66]" /> Quick:
          </span>
          {currentPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectQuickPrompt(prompt)}
              className="px-2.5 py-1 text-xs font-bold bg-[#222222] hover:bg-[#2c2c2c] hover:border-[#00FF66]/50 text-slate-300 hover:text-[#00FF66] rounded-lg border border-[#333333] whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Controls and Fallback Text Form */}
        <div className="p-3 sm:p-4 bg-[#121212] border-t border-[#262626] flex flex-col gap-2.5">
          <form onSubmit={handleSendText} className="flex items-center gap-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={language === 'hinglish' ? "Coach se kuch bhi pucho (e.g. 'Aaj ka workout tips')..." : "Type a question for Coach Zephyr..."}
              className="flex-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66]"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || connectionStatus !== 'connected'}
              className="p-2.5 bg-[#00FF66] hover:bg-[#00e65c] disabled:opacity-30 text-black font-bold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-[0_0_12px_rgba(0,255,102,0.3)]"
              title="Send text prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                disabled={connectionStatus !== 'connected'}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isMicMuted
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-[#222222] hover:bg-[#2c2c2c] text-slate-200 border border-[#333333]'
                }`}
              >
                {isMicMuted ? (
                  <>
                    <MicOff className="w-3.5 h-3.5 text-rose-400" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span>Mute Mic</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isCoachSpeaking) {
                    audioPlayerRef.current?.stopAll();
                    setIsCoachSpeaking(false);
                  }
                }}
                disabled={!isCoachSpeaking}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 bg-[#222222] hover:bg-[#2c2c2c] border border-[#333333] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Stop speaking"
              >
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Interrupt Coach</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => startSession()}
                className="p-2 text-slate-400 hover:text-white hover:bg-[#222222] rounded-xl transition-colors border border-[#333333] cursor-pointer"
                title="Reconnect Session"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FF5500] hover:bg-[#e04b00] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(255,85,0,0.3)] active:scale-95"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>End Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
