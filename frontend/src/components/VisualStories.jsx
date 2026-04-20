import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Coins, Users, CheckCircle } from 'lucide-react';

// Import images (Vite will handle these)
import step1 from '../assets/story/step1.png';
import step2 from '../assets/story/step2.png';
import step3 from '../assets/story/step3.png';
import step4 from '../assets/story/step4.png';

const stories = [
  {
    id: 1,
    image: step1,
    title: "Spotted Pollution",
    desc: "Everything starts with noticing. Snap a photo of any litter or dirty area.",
    icon: Camera,
    badge: "Step 1: Capture",
    accent: "#ef4444" // red-500
  },
  {
    id: 2,
    image: step2,
    title: "Nature Restored",
    desc: "Clean the space and capture the 'After' state to show your impact.",
    icon: Sparkles,
    badge: "Step 2: Clean",
    accent: "#10b981" // emerald-500
  },
  {
    id: 3,
    image: step3,
    title: "Rewards Verified",
    desc: "Our AI verifies your cleanup and awards you digital Eco-Coins instantly.",
    icon: Coins,
    badge: "Step 3: Earn",
    accent: "#f59e0b" // amber-500
  },
  {
    id: 4,
    image: step4,
    title: "Eco Community",
    desc: "Join a growing community and inspire others to protect our planet.",
    icon: Users,
    badge: "Step 4: Inspire",
    accent: "#0ea5e9" // sky-500
  }
];

const VisualStories = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 4500); // Cycle every 4.5 seconds

    return () => clearInterval(timer);
  }, [isHovered]);

  const current = stories[index];

  return (
    <div 
      className="relative w-full max-w-[340px] lg:max-w-[420px] aspect-[4/6] rounded-[2rem] overflow-hidden group shadow-2xl transition-all duration-500 hover:shadow-sky-blue/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={current.image} 
            alt={current.title} 
            className="w-full h-full object-cover"
          />
          {/* Darker overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bars */}
      <div className="absolute top-6 left-0 right-0 px-8 flex gap-2 z-20">
        {stories.map((s, i) => (
          <div key={s.id} className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            {i === index && (
              <motion.div 
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
              />
            )}
            {i < index && <div className="w-full h-full bg-white/60" />}
          </div>
        ))}
      </div>

      {/* Floating UI Elements */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ui-${current.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-20"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest mb-2"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: current.accent }} />
            {current.badge}
          </motion.div>

          {/* Title & Description */}
          <h3 className="text-xl md:text-2xl font-black text-white mb-1.5 tracking-tight">
            {current.title}
          </h3>
          <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-medium mb-4">
            {current.desc}
          </p>

          {/* Icon Badge */}
          <div className="flex items-center justify-between">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3"
              style={{ backgroundColor: current.accent }}
            >
              <current.icon size={32} className="text-white" />
            </div>
            
            {/* Visual Indicator of completion */}
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 overflow-hidden"
                >
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=volunteer${i + current.id}`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                +1k
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interaction Hints */}
      <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
    </div>
  );
};

export default VisualStories;
