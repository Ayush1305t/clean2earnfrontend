import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coins, Image as ImageIcon, History, Trophy, TrendingUp, CheckCircle, Zap, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const navigate = useNavigate();
  const [missionsCompleted, setMissionsCompleted] = React.useState(0);
  const [isClaimed, setIsClaimed] = React.useState(false);
  const [showClaimAnimation, setShowClaimAnimation] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('eco_mission_count');
    const claimed = localStorage.getItem('eco_mission_claimed') === 'true';
    if (saved) setMissionsCompleted(parseInt(saved));
    setIsClaimed(claimed);
  }, []);

  const handleClaim = () => {
    setShowClaimAnimation(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500']
    });
    
    // Simulate claim process
    setTimeout(() => {
      setIsClaimed(true);
      localStorage.setItem('eco_mission_claimed', 'true');
      setShowClaimAnimation(false);
      
      // Bonus animation: decrease progress bar
      setTimeout(() => {
        setMissionsCompleted(0);
        localStorage.setItem('eco_mission_count', '0');
        localStorage.setItem('eco_mission_claimed', 'false');
        setIsClaimed(false);
      }, 2000);
    }, 3000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-10">
        
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg font-medium">
              Monitor your environmental impact and reward balance.
            </p>
          </div>
          <button 
            onClick={() => navigate('/upload')}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/50 dark:hover:bg-white/10 transition-all font-bold text-slate-900 dark:text-white hover:scale-102 active:scale-95 shadow-sm"
          >
            <div className="p-2 bg-primary-light/10 rounded-lg">
              <ImageIcon size={22} className="text-primary-light" />
            </div>
            Upload Cleanup
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Total Eco-Coins", value: "1,250", icon: Coins, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Verified Cleanups", value: "24", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Impact Score", value: "850", icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50" },
            { label: "Global Rank", value: "#142", icon: Trophy, color: "text-purple-600", bg: "bg-purple-50" },
          ].map((stat, idx) => (
            <div key={idx} className="card-pro p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 border-slate-100 dark:border-slate-800">
              <div className="flex flex-col gap-6 z-10 relative">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
                  <stat.icon size={32} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{stat.label}</p>
                  <p className="text-4xl font-extrabold text-slate-950 dark:text-white mt-1">{stat.value}</p>
                </div>
              </div>
              <div className={`absolute -right-12 -bottom-12 w-32 h-32 ${stat.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </div>
          ))}
        </motion.div>

        {/* Daily Challenges Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div variants={item} className="lg:col-span-2 card-pro rounded-[2.5rem] p-10 min-h-[450px] flex flex-col border-slate-100 dark:border-slate-800 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Trophy size={32} className="text-amber-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-950 dark:text-white leading-tight">
                    Daily Challenges
                  </h2>
                  <p className="text-slate-500 font-bold">Complete daily challenges and win more coins</p>
                </div>
              </div>
              
              <div className="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700">
                Resets in 12h 45m
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-6 px-4">
              <div className="w-full max-w-2xl space-y-8">
                {/* Progress Header */}
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-5xl font-black text-deep-forest dark:text-white">{missionsCompleted}</span>
                    <span className="text-2xl font-bold text-slate-400">/2</span>
                    <p className="text-slate-500 font-bold mt-1">Missions Completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 font-black text-xl">+200 ECO BONUS</p>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Active Reward</p>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(missionsCompleted / 2) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)] relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:24px_24px] animate-[slide_1s_linear_infinite]" />
                  </motion.div>
                </div>

                {/* Info Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Zap size={18} className="text-emerald-500" />
                      </div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Upload 2 cleanup sessions to unlock the daily bonus treasure.
                      </p>
                   </div>
                   <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Gift size={18} className="text-blue-500" />
                      </div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Each completed mission also grants standard verification rewards.
                      </p>
                   </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  {missionsCompleted < 2 ? (
                    <button 
                      onClick={() => navigate('/upload')}
                      className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-indigo-700 text-slate-900 dark:text-white font-black text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25 group border border-white/10"
                    >
                      Complete today mission
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : !isClaimed ? (
                    <button 
                      onClick={handleClaim}
                      className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 dark:text-white font-black text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30 animate-pulse"
                    >
                      <Gift size={24} />
                      Claim 200 ECO Coins
                    </button>
                  ) : (
                    <div className="w-full py-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 font-black text-xl flex items-center justify-center gap-3">
                      <CheckCircle size={24} />
                      Mission Fully Completed!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Claim Animation Overlay */}
            <AnimatePresence>
              {showClaimAnimation && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(245,158,11,0.5)]">
                      <Coins size={64} className="text-slate-900 dark:text-white animate-bounce" />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">CLAIMED!</h3>
                    <p className="text-2xl font-bold text-amber-500">+200 ECO Coins Added</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={item} className="card-pro rounded-[2.5rem] p-10 flex flex-col border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-8 font-sans">Recent Activity</h2>
            <div className="space-y-6 flex-1">
              {[
                { place: "Central Park", time: "2 hours ago", coins: 50, img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=200&auto=format&fit=crop" },
                { place: "Santa Monica Beach", time: "5 hours ago", coins: 75, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200&auto=format&fit=crop" },
                { place: "Golden Gate Bridge", time: "Yesterday", coins: 120, img: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=200&auto=format&fit=crop" },
                { place: "Yosemite Valley", time: "2 days ago", coins: 200, img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=200&auto=format&fit=crop" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-5 p-4 rounded-[1.5rem] hover:bg-white/60 dark:hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-slate-100 dark:bg-slate-800 flex-shrink-0 relative overflow-hidden shadow-inner">
                     <img 
                       src={activity.img} 
                       alt={activity.place} 
                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                     />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-950 dark:text-white text-base group-hover:text-emerald-500 transition-colors">{activity.place}</p>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-tight">
                      {activity.time} • <span className="text-emerald-500">+{activity.coins} coins</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border border-emerald-100 dark:border-emerald-500/20">
                    <CheckCircle size={20} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
              View Detailed Log
            </button>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default Dashboard;
