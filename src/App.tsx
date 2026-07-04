import { useState, useEffect } from 'react';
import { AppMode, InteractionState, EmotionState } from './types';
import { TopNav } from './components/TopNav';
import { HomeView } from './views/HomeView';
import { InteractionView } from './views/InteractionView';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

function BackgroundDecorations({ state, emotion }: { state: InteractionState, emotion: EmotionState }) {
  const isComfort = state === 'comfort' || (state === 'feedback' && (emotion === 'anxious' || emotion === 'tired'));
  const isAnalyzing = state === 'analyzing';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Gradient */}
      <motion.div 
        animate={{
          background: isComfort 
            ? 'linear-gradient(135deg, #fdfbfb 0%, #f4eae6 100%)' 
            : 'linear-gradient(135deg, #f8f9fa 0%, #e8f0f6 100%)'
        }}
        transition={{ duration: 3 }}
        className="absolute inset-0"
      />
      
      {/* Soft Focal Light Fields */}
      <motion.div 
        animate={{
          scale: isAnalyzing ? [1, 1.1, 1] : [1, 1.05, 1],
          opacity: isAnalyzing ? [0.5, 0.7, 0.5] : 0.4,
          x: ['-5%', '0%', '-5%'],
          y: ['-5%', '5%', '-5%']
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px]",
          isComfort ? "bg-orange-100/60" : "bg-blue-100/60"
        )}
      />
      
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: 0.3,
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px]",
          isComfort ? "bg-rose-100/50" : "bg-indigo-100/50"
        )}
      />

      {/* Cloud-like soft overlays */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[50px] mix-blend-overlay" />

      {/* Fine Particles */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjAuNSIgZmlsbD0icmdiYSgxMDAsIDE1MCwgMjU1LCAwLjQpIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMC41IiBmaWxsPSJyZ2JhKDEwMCwgMTUwLCAyNTUsIDAuNCkiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI0MCIgcj0iMSIgZmlsbD0icmdiYSgxMDAsIDE1MCwgMjU1LCAwLjIpIi8+PC9zdmc+')] background-repeat" />
      
      {/* Subtle Soundwave Line */}
      <motion.div 
        animate={{ 
          opacity: (state === 'listening' || state === 'analyzing') ? 0.4 : 0.1,
          scaleY: state === 'listening' ? [1, 1.5, 1] : 1
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent blur-[2px]" 
      />
    </div>
  );
}

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('home');
  const [interactionState, setInteractionState] = useState<InteractionState>('idle');
  const [emotion, setEmotion] = useState<EmotionState>(null);

  // Simulation logic for demonstrating the flow automatically
  useEffect(() => {
    let timers: number[] = [];

    if (appMode !== 'home') {
      // Flow: idle (2s) -> listening (4s) -> analyzing (4s) -> feedback (3s) -> comfort (or stay feedback)
      timers.push(window.setTimeout(() => setInteractionState('listening'), 2000));
      timers.push(window.setTimeout(() => setInteractionState('analyzing'), 7000));
      timers.push(window.setTimeout(() => {
        setInteractionState('feedback');
        setEmotion('calm'); // Simulate detection result
      }, 12000));
      
      // Let's simulate a tired/anxious state transition after some time to show the comfort mode
      timers.push(window.setTimeout(() => {
        setInteractionState('analyzing');
      }, 18000));
      
      timers.push(window.setTimeout(() => {
        setInteractionState('feedback');
        setEmotion('anxious');
      }, 21000));

      timers.push(window.setTimeout(() => {
        setInteractionState('comfort');
      }, 23000));
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [appMode]);

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
      <BackgroundDecorations state={interactionState} emotion={emotion} />

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
