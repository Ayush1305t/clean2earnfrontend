import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const UploadScanner = ({ imageUrl, onScanComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onScanComplete });
      
      // The laser moves up and down
      tl.fromTo('.scanner-laser', 
        { top: '0%' },
        {
          top: '95%',
          duration: 1.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 3 // Up, Down, Up, Down -> finishes back at top
        }
      );
      
      tl.to('.scanner-overlay', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [onScanComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden rounded-xl bg-white group">
      {/* Background Image that is being scanned */}
      <img src={imageUrl} alt="Scan target" className="absolute inset-0 w-full h-full object-cover filter contrast-125 sepia-[0.2]" />
      
      {/* Overlay darkening */}
      <div className="scanner-overlay absolute inset-0 bg-sky-blue/40 mix-blend-multiply z-10" />
      
      {/* GSAP Laser Line */}
      <div className="scanner-laser absolute left-0 w-full h-1 bg-light-green shadow-[0_0_25px_4px_rgba(144,238,144,0.9)] z-30" />
      
      {/* Framer Motion Crosshairs & Scanning Text UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="scanner-overlay absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
      >
        <div className="w-40 h-40 border-2 border-dashed border-sky-blue rounded-2xl relative flex items-center justify-center shadow-[inset_0_0_20px_rgba(135,206,235,0.2)] bg-sky-blue/5">
           {/* Targeting corners */}
           <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-light-green-dark rounded-tl-lg" />
           <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-light-green-dark rounded-tr-lg" />
           <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-light-green-dark rounded-bl-lg" />
           <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-light-green-dark rounded-br-lg" />
           <span className="text-sky-blue font-mono text-sm tracking-[0.3em] font-extrabold bg-white/90 px-3 py-1.5 rounded border border-sky-blue/30 shadow-[0_0_15px_rgba(135,206,235,0.3)]">
             ANALYZING
           </span>
        </div>
        
        {/* Animated grid lines in the background of the scanner box */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(135,206,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(135,206,235,0.05)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-screen" />
      </motion.div>
    </div>
  );
};

export default UploadScanner;
