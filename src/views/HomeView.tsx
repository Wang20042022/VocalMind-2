import { motion } from 'motion/react';
import { Camera, Mic, FileText, ShieldCheck, Heart, Cloud, Wind, Smile, Play, MessageCircle, Ear } from 'lucide-react';
import { AppMode, InteractionState } from '../types';
import { Avatar } from '../components/Avatar';
import { GlassCard } from '../components/GlassCard';
import { cn } from '../lib/utils';

interface HomeViewProps {
  state: InteractionState;
  onStart: (mode: AppMode) => void;
}

export function HomeView({ state, onStart }: HomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-[calc(100vh-100px)] relative px-10 pt-10">
      
      {/* Background Floating Tags (Positioned exactly as in image) */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }} 
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[26%] px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white text-slate-500 text-[14px] shadow-sm flex items-center gap-2 z-0"
      >
        <Cloud className="w-4 h-4 text-orange-300" /> calm
      </motion.div>

      <motion.div 
        animate={{ y: [5, -5, 5] }} 
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[45%] left-[28%] px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white text-slate-500 text-[14px] shadow-sm flex items-center gap-2 z-0"
      >
        <Heart className="w-4 h-4 text-orange-300" /> gentle
      </motion.div>

      <motion.div 
        animate={{ y: [5, -5, 5] }} 
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[28%] right-[28%] px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white text-slate-500 text-[14px] shadow-sm flex items-center gap-2 z-0"
      >
        <ShieldCheck className="w-4 h-4 text-orange-300" /> safe
      </motion.div>

      <motion.div 
        animate={{ y: [-5, 5, -5] }} 
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[52%] right-[24%] px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white text-slate-500 text-[14px] shadow-sm flex items-center gap-2 z-0"
      >
        <Smile className="w-4 h-4 text-orange-300" /> with you
      </motion.div>

      {/* Top Titles */}
      <div className="flex flex-col items-center justify-center mt-10 z-10">
        <h1 className="text-[44px] font-semibold tracking-tight text-[#1a2b4c] mb-3">
          没关系，我会陪着你。
        </h1>
        <p className="text-[17px] text-slate-500">
          如果你愿意，我们可以继续聊一会儿。
        </p>
      </div>

      {/* Main Center Area with Avatar and Left Card */}
      <div className="relative flex-1 flex items-center justify-center w-full z-10">
        
        {/* Left Suggestion Card */}
        <div className="absolute left-[12%] xl:left-[15%] top-1/2 -translate-y-1/2 z-20">
          <GlassCard className="p-5 w-[240px] bg-white/70 border-white shadow-lg rounded-3xl">
            <h3 className="text-[14px] font-medium text-slate-700 flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-orange-400" /> 要不要试试这样？
            </h3>
            <ul className="space-y-4 text-[13px] text-slate-500">
              <li className="flex items-center gap-3">
                <Wind className="w-4 h-4 text-slate-400" />
                深呼吸一下
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                继续聊聊现在的感受
              </li>
              <li className="flex items-center gap-3">
                <Ear className="w-4 h-4 text-slate-400" />
                我在听
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* Central Avatar */}
        <div className="mt-[-40px]">
          <Avatar state={state} emotion={null} />
        </div>

      </div>

      {/* Bottom Area: Buttons and Footer */}
      <div className="w-full flex flex-col items-center justify-end pb-8 z-20">
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          
          <button 
            onClick={() => onStart('video')}
            className="flex items-center gap-3 px-8 py-[18px] rounded-[24px] bg-gradient-to-r from-[#4F8AFF] to-[#7AA8FF] hover:from-[#3D76F5] hover:to-[#6395F5] text-white shadow-[0_12px_24px_rgba(79,138,255,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform hover:-translate-y-0.5 group"
          >
            <Camera className="w-5 h-5 text-white/90" />
            <span className="font-medium text-[16px]">开始视频对话</span>
            <span className="ml-1 opacity-80 group-hover:translate-x-1 transition-transform">›</span>
          </button>

          <button 
            onClick={() => onStart('audio')}
            className="flex items-center gap-3 px-8 py-[18px] rounded-[24px] bg-white/80 hover:bg-white backdrop-blur-xl border border-white text-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5 group"
          >
            <Mic className="w-5 h-5 text-[#8892B0]" />
            <span className="font-medium text-[16px]">开始语音对话</span>
            <span className="ml-1 text-slate-400 group-hover:translate-x-1 transition-transform">›</span>
          </button>

          <button className="flex items-center gap-3 px-8 py-[18px] rounded-[24px] bg-gradient-to-r from-[#FFF5ED] to-[#FFEBE0] hover:from-[#FFE8DB] hover:to-[#FFDFCD] backdrop-blur-xl border border-white text-[#B56D4A] shadow-[0_8px_20px_rgba(255,150,100,0.06)] transition-transform hover:-translate-y-0.5 group">
            <FileText className="w-5 h-5 text-[#E5A87F]" />
            <span className="font-medium text-[16px]">查看上次情绪记录</span>
            <span className="ml-1 opacity-60 group-hover:translate-x-1 transition-transform">›</span>
          </button>
          
        </div>

        {/* Privacy Footer */}
        <div className="flex items-center justify-center gap-2 text-[13px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          你的隐私对我们很重要。所有对话内容均安全加密，仅用于情绪分析与陪伴。
        </div>

      </div>

    </div>
  );
}
