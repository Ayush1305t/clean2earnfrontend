import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Trash2, TreeDeciduous } from 'lucide-react';

const Impact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 tracking-tight">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Impact</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          See the collective difference our community is making around the globe. Every single action counts towards a cleaner planet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          { label: "Active Users", value: "12,450", icon: Users, color: "text-blue-500", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
          { label: "Waste Removed (kg)", value: "85,320", icon: Trash2, color: "text-emerald-500", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]" },
          { label: "Areas Cleaned", value: "4,120", icon: Globe, color: "text-cyan-500", glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]" },
          { label: "Trees Equivalent", value: "1,500", icon: TreeDeciduous, color: "text-green-500", glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]" },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: "spring" }}
            className={`card-pro p-8 rounded-3xl flex flex-col items-center justify-center text-center group transition-all duration-300 ${stat.glow} hover:-translate-y-2 border-slate-100 dark:border-slate-800`}
          >
            <div className={`p-5 rounded-2xl bg-black/5 dark:bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
              <stat.icon size={40} />
            </div>
            <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mb-3">{stat.value}</p>
            <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-pro rounded-3xl p-8 md:p-12 border-slate-100 dark:border-slate-800"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
          <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
            Community Leaderboard
          </h2>
          <div className="card-pro px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800">
            Current Season: Spring 2026
          </div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              key={i} 
              className="flex items-center gap-4 md:gap-6 p-4 rounded-2xl card-pro hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.01] border-slate-100 dark:border-slate-800"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${i === 1 ? 'bg-gradient-to-r from-yellow-400 to-amber-600 scale-110' : i === 2 ? 'bg-gradient-to-r from-slate-300 to-slate-500' : i === 3 ? 'bg-gradient-to-r from-amber-600 to-orange-800' : 'bg-slate-800 dark:bg-slate-700'}`}>
                #{i}
              </div>
              <div className="w-14 h-14 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-colors">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=EcoWarrior${i}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-slate-800 dark:text-white">EcoWarrior{i}</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{150 - i * 12} cleanups verified</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-900 dark:text-primary-light">
                  {12500 - i * 850} <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">Coins</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Impact;
