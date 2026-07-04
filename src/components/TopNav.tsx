import { Settings, Smile, User } from 'lucide-react';
import { AppMode, InteractionState } from '../types';
import { GlassCard } from './GlassCard';

interface TopNavProps {
  mode: AppMode;
  state: InteractionState;
  onHome: () => void;
}

function WaveLogo() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-full h-full text-blue-500" fill="currentColor">
        <path d="M8 20 Q 12 10 16 20 T 24 20 T 32 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="8" cy="20" r="4" fill="#60a5fa" />
        <circle cx="16" cy="14" r="5" fill="#3b82f6" />
        <circle cx="24" cy="26" r="4.5" fill="#818cf8" />
        <circle cx="32" cy="20" r="3" fill="#93c5fd" />
      </svg>
    </div>
  );
}

export function TopNav({ mode, state, onHome }: TopNavProps) {
  return (
    <div className="w-full px-8 py-6 flex items-center justify-between absolute top-0 left-0 z-50">
      <button 
        onClick={onHome}
        className="flex items-center gap-2 group transition-opacity hover:opacity-80"
      >
        <WaveLogo />
        <span className="font-semibold text-[22px] tracking-tight text-[#1a2b4c]">VocalMind</span>
      </button>

      <div className="flex items-center gap-4">
        <GlassCard className="px-4 py-1.5 flex items-center gap-2.5 rounded-full border-white/80 bg-white/40 shadow-sm">
          <div className={`w-2 h-2 rounded-full ${state === 'idle' ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'}`} />
          <span className="text-[14px] font-medium text-slate-600 capitalize">
            {state === 'idle' ? 'ready' : state}
          </span>
        </GlassCard>

        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/80 transition-colors text-slate-600 shadow-sm">
          <Smile className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/80 transition-colors text-slate-600 shadow-sm">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
