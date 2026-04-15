import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, UploadCloud, Cpu, CheckCircle, Coins, Leaf, Trash2 } from 'lucide-react';

export default function HeroAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 0,
      title: "1. Capture",
      icon: <Camera size={56} className="text-blue-500 drop-shadow-md" />,
      subIcon: <Trash2 size={28} className="text-slate-400 absolute -bottom-3 -right-3" />,
      color: "bg-blue-500/10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]",
      desc: "Locate and photograph environmental waste."
    },
    {
      id: 1,
      title: "2. Upload",
      icon: <UploadCloud size={56} className="text-purple-500 drop-shadow-md" />,
      subIcon: (
        <motion.div 
          animate={{ y: [0, -20], opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }} 
          className="absolute -top-6"
        >
          <UploadCloud size={20} className="text-purple-400" />
        </motion.div>
      ),
      color: "bg-purple-500/10 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      desc: "Submit your photo to the Clean2Earn network."
    },
    {
      id: 2,
      title: "3. AI Verify",
      icon: <Cpu size={56} className="text-cyan-500 drop-shadow-md" />,
      subIcon: (
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.5, type: 'spring' }}
        >
           <CheckCircle size={28} className="text-emerald-500 absolute -bottom-3 -right-3 bg-white dark:bg-slate-900 rounded-full" />
        </motion.div>
      ),
      color: "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]",
      desc: "Our AI verifies the cleanup authenticity."
    },
    {
      id: 3,
      title: "4. Earn Coins",
      icon: <Coins size={64} className="text-amber-500 drop-shadow-lg" />,
      subIcon: (
        <motion.div 
          animate={{ y: [0, -30], opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }} 
          className="absolute -top-6 text-emerald-500 font-extrabold text-xl"
        >
          +50
        </motion.div>
      ),
      color: "bg-amber-500/10 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.4)]",
      desc: "Receive Eco-Coins directly to your wallet."
    }
  ];

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mx-auto">
      {/* Background Decorative Rings Removed per user request */}

      {/* Main Device Mockup (Phone style) */}
      <div className="relative z-10 w-[280px] h-[560px] glass rounded-[3rem] border-4 border-slate-200/50 dark:border-slate-800/80 shadow-2xl flex flex-col items-center p-6 overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl">
        {/* Dynamic Notch */}
        <div className="w-32 h-7 bg-slate-300/80 dark:bg-slate-950/80 rounded-b-xl absolute top-0 shadow-inner" />

        <div className="flex-1 w-full flex flex-col items-center justify-center mt-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`w-44 h-44 rounded-[2rem] flex items-center justify-center relative border-2 ${steps[step].color} bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-xl transition-colors duration-500`}
            >
              {steps[step].icon}
              {steps[step].subIcon}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${step}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-10 text-center"
            >
              <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">{steps[step].title}</h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-3 px-2 leading-relaxed">
                {steps[step].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress indicators bottom */}
        <div className="flex gap-3 mb-6 mt-4 bg-black/5 dark:bg-white/5 py-2 px-4 rounded-full">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${i === step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-300 dark:bg-slate-700'}`}
              animate={{ scale: i === step ? 1.4 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          ))}
        </div>
        <div className="w-1/3 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full mb-2" />
      </div>
      
      {/* Floating decorative elements around the phone */}
      <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-1/4 glass p-4 rounded-2xl border border-emerald-500/30 shadow-lg z-20 hidden md:block">
        <Leaf className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" size={36} />
      </motion.div>
      <motion.div animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-6 bottom-1/4 glass p-4 rounded-2xl border border-amber-500/30 shadow-lg z-20 hidden md:block">
        <Coins className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" size={36} />
      </motion.div>
    </div>
  );
}
