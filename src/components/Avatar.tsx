import { motion } from 'motion/react';
import { InteractionState, EmotionState } from '../types';
import { cn } from '../lib/utils';

interface AvatarProps {
  state: InteractionState;
  emotion: EmotionState;
}

export function Avatar({ state }: AvatarProps) {
  // Float animation for the whole avatar
  const floatAnim = {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="relative w-[500px] h-[400px] flex items-center justify-center mt-8">
      
      {/* Background Ripples / Light Floor */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-4 w-[400px] h-[60px] rounded-[100%] bg-gradient-to-b from-white/40 to-white/0 blur-md pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 w-[280px] h-[30px] rounded-[100%] border-[2px] border-white/60 blur-[1px] pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.8)]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[40px] w-[180px] h-[20px] rounded-[100%] border-[1.5px] border-white pointer-events-none shadow-[0_0_15px_rgba(255,255,255,1)]" 
      />

      {/* Main Avatar Entity */}
      <motion.div
        animate={floatAnim}
        className="relative z-10 w-[360px] h-[260px]"
      >
        {/* Main Cloud Body Base */}
        <div className="absolute inset-0 z-10">
          {/* Center mass */}
          <div className="absolute top-[20%] left-[15%] right-[15%] bottom-[10%] rounded-[100px] bg-gradient-to-br from-white/95 via-[#e8f0fe]/90 to-[#d2e3fc]/80 backdrop-blur-xl shadow-[inset_0_10px_30px_rgba(255,255,255,1),0_20px_40px_rgba(150,180,250,0.15)] border border-white/60" />
          
          {/* Top Bump */}
          <div className="absolute -top-[5%] left-[25%] right-[25%] h-[160px] rounded-full bg-gradient-to-b from-white to-[#e8f0fe]/90 shadow-[inset_0_15px_20px_rgba(255,255,255,1)]" />
          
          {/* Left Bump */}
          <div className="absolute top-[25%] -left-[5%] w-[160px] h-[160px] rounded-full bg-gradient-to-tr from-white/90 to-[#e8f0fe]/80 shadow-[inset_15px_15px_20px_rgba(255,255,255,0.9)]" />
          
          {/* Right Bump */}
          <div className="absolute top-[25%] -right-[5%] w-[160px] h-[160px] rounded-full bg-gradient-to-tl from-white/90 to-[#e8f0fe]/80 shadow-[inset_-15px_15px_20px_rgba(255,255,255,0.9)]" />
        </div>

        {/* Shading and Glassy Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay">
          <div className="absolute inset-0 rounded-[100px] shadow-[inset_0_-20px_40px_rgba(100,150,255,0.4)]" />
          {/* Glossy highlights */}
          <div className="absolute top-[5%] left-[30%] w-[40%] h-[30%] bg-gradient-to-b from-white to-transparent rounded-[100%] opacity-80 blur-[2px]" />
          <div className="absolute top-[30%] left-[5%] w-[20%] h-[30%] bg-gradient-to-r from-white to-transparent rounded-[100%] opacity-70 blur-[2px]" />
          <div className="absolute top-[30%] right-[5%] w-[20%] h-[30%] bg-gradient-to-l from-white to-transparent rounded-[100%] opacity-70 blur-[2px]" />
        </div>

        {/* Particles/Stars on the cloud */}
        <div className="absolute top-[20%] left-[20%] w-3 h-3 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white] z-30" />
        <div className="absolute top-[40%] right-[15%] w-4 h-4 bg-white rounded-full blur-[1.5px] shadow-[0_0_15px_white] z-30 opacity-80" />
        <div className="absolute top-[60%] left-[10%] w-2 h-2 bg-white rounded-full blur-[0.5px] shadow-[0_0_8px_white] z-30 opacity-60" />
        
        {/* Floating dust around the cloud */}
        <motion.div animate={{y:[-10,10,-10], opacity:[0.5,1,0.5]}} transition={{duration:3, repeat:Infinity}} className="absolute -top-[10%] left-[10%] text-white text-xl z-30 blur-[1px]">✨</motion.div>
        <motion.div animate={{y:[10,-10,10], opacity:[0.3,0.8,0.3]}} transition={{duration:4, repeat:Infinity}} className="absolute top-[10%] -right-[10%] text-white text-lg z-30 blur-[0.5px]">✨</motion.div>

        {/* Face Elements */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 z-30">
          {/* Eyes */}
          <div className="flex gap-[60px] items-center justify-center">
            {/* Left Eye */}
            <div className="w-[28px] h-[32px] bg-[#1a2b4c] rounded-[14px] shadow-sm relative overflow-hidden">
              <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-white rounded-full opacity-90" />
              <div className="absolute bottom-2 left-1.5 w-1.5 h-1.5 bg-blue-200/80 rounded-full" />
            </div>
            
            {/* Right Eye */}
            <div className="w-[28px] h-[32px] bg-[#1a2b4c] rounded-[14px] shadow-sm relative overflow-hidden">
               <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-white rounded-full opacity-90" />
               <div className="absolute bottom-2 left-1.5 w-1.5 h-1.5 bg-blue-200/80 rounded-full" />
            </div>
          </div>

          {/* Mouth */}
          <svg className="w-8 h-4 mt-5 relative z-20 text-[#1a2b4c]/70" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 4 Q12 10 18 4" />
          </svg>
        </div>

        {/* Central Glowing Core (Orange Voiceprint Core) */}
        <motion.div 
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: `0 0 60px rgba(255, 180, 100, 0.8), inset 0 0 30px rgba(255,255,255,0.9)`
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            "absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[110px] h-[110px] rounded-full flex items-center justify-center z-40",
            "bg-gradient-to-br from-[#fff6e5] to-[#ffdcb3] border-2 border-white/80"
          )}
        >
          {/* Core Inner Ring */}
          <div className="absolute inset-2 rounded-full border border-white/60 bg-white/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            {/* Embedded Soundwave */}
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
               <motion.path 
                 animate={{
                   d: [
                     "M 0 10 Q 5 10 10 10 T 20 10 T 30 10 T 40 10",
                     "M 0 10 Q 5 2 10 10 T 20 15 T 30 5 T 40 10",
                     "M 0 10 Q 5 18 10 10 T 20 5 T 30 15 T 40 10",
                     "M 0 10 Q 5 10 10 10 T 20 10 T 30 10 T 40 10"
                   ]
                 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 d="M 0 10 Q 5 10 10 10 T 20 10 T 30 10 T 40 10"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               />
            </svg>
          </div>
        </motion.div>

        {/* Cloud Arms (Holding the core) */}
        <div className="absolute bottom-[10px] left-[100px] w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-white to-[#e8f0fe] shadow-[2px_-2px_10px_rgba(0,0,0,0.05),inset_5px_5px_10px_rgba(255,255,255,1)] z-50" />
        <div className="absolute bottom-[10px] right-[100px] w-[50px] h-[50px] rounded-full bg-gradient-to-tl from-white to-[#e8f0fe] shadow-[-2px_-2px_10px_rgba(0,0,0,0.05),inset_-5px_5px_10px_rgba(255,255,255,1)] z-50" />

      </motion.div>
    </div>
  );
}

