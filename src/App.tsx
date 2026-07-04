import { useState, useEffect } from 'react';
import { AppMode, InteractionState, EmotionState } from './types';
import { TopNav } from './components/TopNav';
import { HomeView } from './views/HomeView';
import { InteractionView } from './views/InteractionView';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

function BackgroundDecorations({ state }: { state: InteractionState }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#fcfbf9]">
      {/* Central Warm Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.6, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[1000px] max-h-[1000px] rounded-full blur-[120px] bg-gradient-to-tr from-orange-100/60 to-rose-50/60"
      />

      {/* Subtle Golden Soundwaves */}
      <div className="absolute top-[45%] left-0 w-full h-[200px] -translate-y-1/2 opacity-40">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            animate={{ d: ["M0 100 Q 360 150, 720 100 T 1440 100", "M0 100 Q 360 130, 720 100 T 1440 100", "M0 100 Q 360 150, 720 100 T 1440 100"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            d="M0 100 Q 360 150, 720 100 T 1440 100" 
            stroke="url(#goldGradient)" strokeWidth="1.5" filter="blur(1px)" 
          />
          <motion.path 
            animate={{ d: ["M0 100 Q 360 50, 720 100 T 1440 100", "M0 100 Q 360 70, 720 100 T 1440 100", "M0 100 Q 360 50, 720 100 T 1440 100"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            d="M0 100 Q 360 50, 720 100 T 1440 100" 
            stroke="url(#goldGradient)" strokeWidth="2" filter="blur(2px)" opacity="0.6"
          />
          <motion.path 
            animate={{ d: ["M0 100 Q 360 180, 720 100 T 1440 100", "M0 100 Q 360 160, 720 100 T 1440 100", "M0 100 Q 360 180, 720 100 T 1440 100"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            d="M0 100 Q 360 180, 720 100 T 1440 100" 
            stroke="url(#goldGradient)" strokeWidth="0.5" filter="blur(0.5px)" opacity="0.8"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0" />
              <stop offset="20%" stopColor="#fde68a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="80%" stopColor="#fde68a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient Cloud Layers at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#fcfbf9] via-[#fcfbf9]/90 to-transparent z-0" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[40%] bg-white/60 rounded-[100%] blur-[60px]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[40%] bg-white/60 rounded-[100%] blur-[60px]" />
      
      {/* Sparkles / Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('home');
  const [interactionState, setInteractionState] = useState<InteractionState>('idle');
  const [emotion, setEmotion] = useState<EmotionState>(null);

  const handleStart = (mode: AppMode) => {
    setAppMode(mode);
    setInteractionState('idle');
    setEmotion(null);
  };

  const handleEnd = () => {
    setAppMode('home');
    setInteractionState('idle');
    setEmotion(null);
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans overflow-hidden relative">
      <BackgroundDecorations state={interactionState} />

      <TopNav mode={appMode} state={interactionState} onHome={handleEnd} />

      <main className="relative z-10 w-full h-screen flex flex-col items-center justify-center pt-20">
        <AnimatePresence mode="wait">
          {appMode === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full"
            >
              <HomeView state={interactionState} onStart={handleStart} />
            </motion.div>
          ) : (
            <motion.div 
              key="interaction"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-full"
            >
              <InteractionView 
                mode={appMode} 
                state={interactionState} 
                emotion={emotion} 
                onEnd={handleEnd} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
