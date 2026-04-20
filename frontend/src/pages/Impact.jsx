import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Trash2, TreeDeciduous, Leaf, Crown, Medal, Award } from 'lucide-react';

const FloatingLeaves = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] opacity-40 z-0">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -50, x: Math.random() * 600 - 300, rotate: 0, opacity: 0 }}
        animate={{ 
          y: 600, 
          x: `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`, 
          rotate: [0, 180, 360], 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ duration: 8 + Math.random() * 7, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        className={`absolute top-0 left-1/2 drop-shadow-sm ${i % 2 === 0 ? 'text-emerald-400' : 'text-teal-300'}`}
      >
        <Leaf size={16 + Math.random() * 14} className="fill-current opacity-50" />
      </motion.div>
    ))}
  </div>
);

const Impact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-950 mb-6 tracking-tight">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-blue-dark">Impact</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          See the collective difference our community is making around the globe. Every single action counts towards a cleaner planet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          { label: "Active Users", value: "12,450", icon: Users, color: "text-sky-blue", glow: "group-hover:shadow-[0_0_30px_rgba(135,206,235,0.3)]" },
          { label: "Waste Removed (kg)", value: "85,320", icon: Trash2, color: "text-light-green-dark", glow: "group-hover:shadow-[0_0_30px_rgba(90,168,90,0.3)]" },
          { label: "Areas Cleaned", value: "4,120", icon: Globe, color: "text-sky-blue-dark", glow: "group-hover:shadow-[0_0_30px_rgba(74,159,181,0.3)]" },
          { label: "Trees Equivalent", value: "1,500", icon: TreeDeciduous, color: "text-light-green", glow: "group-hover:shadow-[0_0_30px_rgba(144,238,144,0.3)]" },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            className={`card-pro p-8 rounded-3xl flex flex-col items-center justify-center text-center group transition-all duration-300 ${stat.glow} hover:-translate-y-2 border-sky-blue/20`}
          >
            <div className={`p-5 rounded-2xl bg-sky-blue/5 mb-6 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
              <stat.icon size={40} />
            </div>
            <p className="text-4xl md:text-5xl font-black text-slate-950 mb-3">{stat.value}</p>
            <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="card-pro rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden bg-white/90 dark:bg-white/90 backdrop-blur-3xl border border-sky-blue/20 shadow-2xl"
      >
        <FloatingLeaves />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <TreeDeciduous size={36} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 drop-shadow-sm">
                Eco Champions
              </h2>
              <p className="text-emerald-600 font-bold mt-1 text-sm uppercase tracking-widest">Global Leaderboard</p>
            </div>
          </div>
          <div className="px-5 py-2.5 rounded-full bg-white dark:bg-white border border-slate-200 dark:border-slate-300 shadow-sm backdrop-blur-md flex items-center gap-2 relative overflow-hidden group cursor-pointer hover:border-emerald-300 transition-colors">
            <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10" />
            <span className="text-sm font-black text-slate-700 relative z-10 tracking-wide">Season: Spring 2026</span>
          </div>
        </div>
        
        <div className="space-y-4 relative z-10">
          {[1, 2, 3, 4, 5].map((i) => {
            const isTop3 = i <= 3;
            const rankStyles = {
              1: 'bg-gradient-to-r from-amber-100 to-yellow-50/50 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] transform scale-[1.02]',
              2: 'bg-gradient-to-r from-slate-100 to-slate-50/50 border-slate-300 shadow-[0_0_20px_rgba(148,163,184,0.2)]',
              3: 'bg-gradient-to-r from-orange-100 to-orange-50/50 border-orange-300 shadow-[0_0_20px_rgba(251,146,60,0.2)]',
              default: 'bg-white dark:bg-white border-slate-200 shadow-sm hover:bg-emerald-50 hover:border-emerald-200'
            };
            
            const badgeStyles = {
              1: 'bg-gradient-to-br from-yellow-400 to-amber-600 shadow-amber-500/50',
              2: 'bg-gradient-to-br from-slate-300 to-slate-500 shadow-slate-500/50',
              3: 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/50',
              default: 'bg-slate-200 text-slate-500 border border-slate-300'
            };

            const RankIcon = i === 1 ? Crown : i === 2 || i === 3 ? Medal : Award;

            return (
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1), type: "spring", stiffness: 100 }}
                key={i} 
                className={`flex items-center gap-4 md:gap-8 p-5 rounded-3xl border transition-all duration-500 group ${rankStyles[i] || rankStyles.default}`}
              >
                {/* Ranking Badge */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg relative z-10 transition-transform group-hover:scale-110 duration-300 ${badgeStyles[i] || badgeStyles.default}`}>
                    {isTop3 ? <RankIcon size={28} className="drop-shadow-md" /> : `#${i}`}
                  </div>
                  {i === 1 && <div className="absolute inset-0 bg-yellow-400 rounded-2xl blur-xl opacity-50 animate-pulse" />}
                </div>

                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-emerald-100 overflow-hidden border-4 border-white shadow-md relative group-hover:border-emerald-200 transition-colors">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=NatureHero${i}&backgroundColor=e6f6ee`} alt="Avatar" className="w-full h-full object-cover" />
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className={`font-black text-xl truncate ${i === 1 ? 'text-amber-600' : 'text-slate-800'}`}>EcoHero{i}</p>
                    {i === 1 && <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-widest border border-amber-200">MVP</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Leaf size={14} className="text-emerald-500" />
                    <p className="text-sm text-emerald-700 font-bold">{150 - i * 12} verify actions</p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right pl-4">
                  <p className={`text-2xl md:text-3xl font-black ${isTop3 ? 'text-slate-900' : 'text-slate-700'}`}>
                    {12500 - i * 850}
                  </p>
                  <p className="text-[10px] md:text-xs font-black text-emerald-600 uppercase tracking-widest">
                    Eco Coins
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Impact;
