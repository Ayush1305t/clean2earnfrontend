import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // GSAP context for clean cleanup and scoping
    const ctx = gsap.context(() => {
      const streaks = gsap.utils.toArray('.gsap-streak');
      
      streaks.forEach((streak) => {
        const resetStreak = () => {
          gsap.set(streak, {
            y: gsap.utils.random(0, window.innerHeight),
            x: '-30vw',
            scaleX: gsap.utils.random(0.5, 2.5),
            opacity: 0,
          });
        };

        resetStreak();

        // Animate the laser streak smoothly across the screen
        gsap.to(streak, {
          x: '120vw',
          // Much more visible streaks
          opacity: gsap.utils.random(0.4, 0.8),
          duration: gsap.utils.random(5, 12),
          delay: gsap.utils.random(0, 4),
          ease: "none",
          repeat: -1,
          onRepeat: resetStreak
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      
      {/* GSAP Light Streaks moving horizontally - Made thicker and brighter */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={`streak-${i}`} 
          className={`gsap-streak absolute h-[2px] w-[30vw] bg-gradient-to-r from-transparent ${i % 2 === 0 ? 'via-pink-500' : 'via-blue-500'} to-transparent blur-[2px]`}
        />
      ))}

      {/* Framer Motion Geometric Abstract Topology Grid - Drastically increased opacity */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Concentric expanding rings */}
          {[...Array(18)].map((_, i) => (
            <motion.circle 
              key={`circle-${i}`}
              cx="50" cy="50" r={i * 3 + 6} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.15"
              animate={{ 
                r: [i * 3 + 6, i * 3 + 8, i * 3 + 6],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ duration: 6 + (i * 0.5), repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          {/* Radar sweeping lines */}
          {[...Array(16)].map((_, i) => (
             <line 
               key={`line-${i}`}
               x1="50" y1="50" 
               x2={50 + 60 * Math.cos((i * 22.5) * Math.PI / 180)} 
               y2={50 + 60 * Math.sin((i * 22.5) * Math.PI / 180)} 
               stroke="currentColor" 
               strokeWidth="0.1"
             />
          ))}
        </svg>
      </motion.div>

      {/* Softer vignette shadow overlay to let the background pop more */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.15)_150%)] mix-blend-overlay" />
    </div>
  );
};

export default AnimatedBackground;
