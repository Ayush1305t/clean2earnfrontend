import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, UploadCloud, Cpu, CheckCircle, Coins, Leaf, Trash2 } from 'lucide-react';

import realLeaf from '../assets/logo/real-leaf.png';

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
      icon: <Camera size={56} className="text-sky-blue drop-shadow-md" />,
      subIcon: <Trash2 size={28} className="text-slate-400 absolute -bottom-3 -right-3" />,
      color: "bg-sky-blue/10 border-sky-blue/30 shadow-[0_0_30px_rgba(135,206,235,0.2)]",
      desc: "Locate and photograph environmental waste."
    },
    {
      id: 1,
      title: "2. Upload",
      icon: <UploadCloud size={56} className="text-light-green drop-shadow-md" />,
      subIcon: (
        <motion.div 
          animate={{ y: [0, -20], opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }} 
          className="absolute -top-6"
        >
          <UploadCloud size={20} className="text-light-green-dark" />
        </motion.div>
      ),
      color: "bg-light-green/10 border-light-green/30 shadow-[0_0_30px_rgba(144,238,144,0.2)]",
      desc: "Submit your photo to the Clean2Earn network."
    },
    {
      id: 2,
      title: "3. AI Verify",
      icon: <Cpu size={56} className="text-sky-blue-dark drop-shadow-md" />,
      subIcon: (
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.5, type: 'spring' }}
        >
           <CheckCircle size={28} className="text-light-green-dark absolute -bottom-3 -right-3 bg-white rounded-full" />
        </motion.div>
      ),
      color: "bg-sky-blue/10 border-sky-blue/30 shadow-[0_0_30px_rgba(135,206,235,0.2)]",
      desc: "Our AI verifies the cleanup authenticity."
    },
    {
      id: 3,
      title: "4. Earn Coins",
      icon: <Coins size={64} className="text-light-green-dark drop-shadow-lg" />,
      subIcon: (
        <motion.div 
          animate={{ y: [0, -30], opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }} 
          className="absolute -top-6 text-light-green-dark font-extrabold text-xl"
        >
          +50
        </motion.div>
      ),
      color: "bg-light-green/10 border-light-green/30 shadow-[0_0_40px_rgba(144,238,144,0.4)]",
      desc: "Receive Eco-Coins directly to your wallet."
    }
  ];

  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mx-auto">
      {/* Background Decorative Rings Removed per user request */}

      {/* Main Device Mockup (Phone style) */}
      <div className="relative z-10 w-[280px] h-[560px] glass rounded-[3rem] border-4 border-sky-blue/50 shadow-2xl flex flex-col items-center p-6 overflow-hidden bg-white/70 backdrop-blur-2xl">
        {/* Dynamic Notch */}
        <div className="w-32 h-7 bg-slate-200 rounded-b-xl absolute top-0 shadow-inner" />

        <div className="flex-1 w-full flex flex-col items-center justify-center mt-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`w-44 h-44 rounded-[2rem] flex items-center justify-center relative border-2 ${steps[step].color} bg-white/90 backdrop-blur-xl shadow-xl transition-colors duration-500`}
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
              <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">{steps[step].title}</h3>
              <p className="text-sm font-medium text-slate-600 mt-3 px-2 leading-relaxed">
                {steps[step].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Progress indicators bottom */}
        <div className="flex gap-3 mb-6 mt-4 bg-sky-blue/5 py-2 px-4 rounded-full">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${i === step ? 'bg-light-green-dark shadow-[0_0_10px_rgba(90,168,90,0.8)]' : 'bg-slate-300'}`}
              animate={{ scale: i === step ? 1.4 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          ))}
        </div>
        <div className="w-1/3 h-1.5 bg-slate-300 rounded-full mb-2" />
      </div>
      
      {/* Floating decorative elements around the phone */}
      <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-1/4 glass p-4 rounded-2xl border border-light-green/50 shadow-lg z-20 hidden md:block">
        <img src={realLeaf} alt="Real Leaf" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(144,238,144,0.6)]" />
      </motion.div>
      <motion.div animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -right-6 bottom-1/4 glass p-4 rounded-2xl border border-sky-blue/50 shadow-lg z-20 hidden md:block">
        <Coins className="text-sky-blue-dark drop-shadow-[0_0_15px_rgba(74,159,181,0.5)]" size={36} />
      </motion.div>
    </div>
  );
}
