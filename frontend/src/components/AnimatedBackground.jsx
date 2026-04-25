import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Artistic Tree Silhouette component
  const TreeSilhouette = ({ side }) => (
    <div 
      className={`absolute bottom-0 ${side === 'left' ? '-left-24 lg:-left-12' : '-right-24 lg:-right-12'} h-[120%] aspect-[1/2.5] opacity-[0.07] pointer-events-none z-[-1] hidden sm:block`}
      style={{ transform: 'translateZ(0)' }}
    >
      <svg viewBox="0 0 200 500" className="w-full h-full text-forest-green fill-current">
        <path d="M100 500 L95 450 Q90 400 90 350 Q90 300 70 250 Q50 200 60 150 Q70 100 90 50 Q100 10 100 0 Q100 10 110 50 Q130 100 140 150 Q150 200 130 250 Q110 300 110 350 Q110 400 105 450 L100 500" />
        <path d="M90 380 Q50 360 20 380" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
        <path d="M110 340 Q150 320 180 340" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
        <path d="M85 280 Q40 250 10 270" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
        <path d="M115 230 Q160 200 190 220" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <path d="M95 160 Q60 130 35 145" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <circle cx="40" cy="370" r="30" opacity="0.4" />
        <circle cx="160" cy="330" r="25" opacity="0.4" />
        <circle cx="30" cy="270" r="20" opacity="0.4" />
        <circle cx="170" cy="215" r="18" opacity="0.4" />
        <circle cx="50" cy="140" r="15" opacity="0.4" />
        <circle cx="100" cy="60" r="20" opacity="0.4" />
      </svg>
    </div>
  );

  // Redesigned falling flower component
  const FloatingFlower = ({ delay, duration, startX, scale }) => (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        top: '-50px',
        width: '35px',
        height: '35px',
        filter: isMobile ? 'none' : 'blur(0.5px)', // Remove blur on mobile
        willChange: 'transform, opacity',
        zIndex: 0,
        transform: 'translateZ(0)',
      }}
      initial={{ y: '0vh', x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, 50, -30, 40, -10],
        rotate: [0, 180, 360, 540, 720],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: `scale(${scale})` }}>
        <path d="M50 50 Q60 20 70 50 Q60 80 50 50" fill="#D03B7A" opacity="0.8" />
        <circle cx="50" cy="50" r="6" fill="#FFD700" opacity="0.7" />
      </svg>
    </motion.div>
  );

  // Redesigned falling leaf component
  const FloatingLeaf = ({ delay, duration, startX, scale }) => (
    <motion.div
      className="absolute"
      style={{
        left: `${startX}%`,
        top: '-50px',
        width: '45px',
        height: '45px',
        filter: isMobile ? 'none' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))', // Simplify shadow on mobile
        willChange: 'transform, opacity',
        zIndex: 0,
        transform: 'translateZ(0)',
      }}
      initial={{ y: '0vh', x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, -40, 30, -50, 20],
        rotate: [0, 120, 240, 310, 360],
        opacity: [0, 0.5, 0.5, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: `scale(${scale})` }}>
        <defs>
          <linearGradient id={`leafGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d5a27" />
            <stop offset="100%" stopColor="#1b3d1b" />
          </linearGradient>
        </defs>
        <path d="M50 10 Q65 35 60 70 Q50 60 40 70 Q35 35 50 10" fill={`url(#leafGrad-${delay})`} opacity="0.9" />
      </svg>
    </motion.div>
  );

  // Optimized morphing blob
  const MorphingBlob = ({ delay, size, x, y, color, duration }) => (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle at 30% 30%, ${color}20, ${color}02)`,
        filter: isMobile ? 'blur(30px)' : 'blur(60px)', // Reduce blur on mobile
        opacity: 0.1,
        willChange: 'transform',
        zIndex: -2,
        transform: 'translateZ(0)',
      }}
      animate={{
        scale: [1, 1.15, 0.9, 1.1, 1],
        x: [0, 20, -15, 10, 0],
        y: [0, -20, 15, -10, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  // Memoized decorative elements with reduced counts for mobile
  const decorElements = useMemo(() => {
    const leafCount = isMobile ? 8 : 25;
    const flowerCount = isMobile ? 6 : 20;
    const orbCount = isMobile ? 2 : 4;

    return {
      fallingLeaves: [...Array(leafCount)].map((_, i) => ({
        id: i,
        delay: Math.random() * 20,
        duration: 12 + Math.random() * 10,
        startX: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.6
      })),
      fallingFlowers: [...Array(flowerCount)].map((_, i) => ({
        id: i,
        delay: Math.random() * 25,
        duration: 15 + Math.random() * 12,
        startX: Math.random() * 100,
        scale: 0.4 + Math.random() * 0.5
      })),
      orbs: [...Array(orbCount)].map((_, i) => ({
        id: i,
        delay: i * 3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#90EE90', '#87CEEB', '#E6E6FA', '#228B22'][i % 4]
      }))
    };
  }, [isMobile]);

  // Subtle noise texture component - skip on mobile for performance
  const NoiseLayer = () => {
    if (isMobile) return null;
    return (
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          zIndex: 1,
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden" style={{ transform: 'translateZ(0)' }}>
      {/* Base Atmospheric Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEFDFB] via-[#F0FFF4] to-[#E0F2FE]" />
      
      {/* Mesh Gradient Aurora */}
      <div className="absolute inset-0 z-0">
        <MorphingBlob delay={0} size={isMobile ? "400px" : "800px"} x="-20" y="-10" color="#90EE90" duration={25} />
        <MorphingBlob delay={5} size={isMobile ? "350px" : "700px"} x="60" y="50" color="#87CEEB" duration={35} />
        {!isMobile && (
          <>
            <MorphingBlob delay={12} size="750px" x="10" y="40" color="#E6E6FA" duration={40} />
            <MorphingBlob delay={18} size="650px" x="80" y="-5" color="#FFF0F5" duration={30} />
            <MorphingBlob delay={22} size="850px" x="-5" y="70" color="#D1FAE5" duration={45} />
          </>
        )}
      </div>

      <NoiseLayer />

      <div className="relative z-10 w-full h-full">
        <TreeSilhouette side="left" />
        <TreeSilhouette side="right" />
      </div>

      <div className="absolute inset-0 z-20">
        {decorElements.fallingLeaves.map(leaf => (
          <FloatingLeaf
            key={`leaf-${leaf.id}`}
            delay={leaf.delay}
            duration={leaf.duration}
            startX={leaf.startX}
            scale={leaf.scale}
          />
        ))}

        {decorElements.fallingFlowers.map(flower => (
          <FloatingFlower
            key={`flower-${flower.id}`}
            delay={flower.delay}
            duration={flower.duration}
            startX={flower.startX}
            scale={flower.scale}
          />
        ))}
      </div>

      {/* Orbs */}
      <div className="absolute inset-0 z-5 opacity-30">
        {decorElements.orbs.map(orb => (
          <motion.div
            key={`orb-${orb.id}`}
            className="absolute rounded-full"
            style={{
              width: isMobile ? '150px' : '250px',
              height: isMobile ? '150px' : '250px',
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle, ${orb.color}20, transparent)`,
              filter: isMobile ? 'blur(20px)' : 'blur(40px)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;

