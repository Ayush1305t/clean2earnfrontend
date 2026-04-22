import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coins, Image as ImageIcon, Trophy, TrendingUp, CheckCircle, Zap, Gift, ArrowRight, Loader2, Crown, Medal, Award, Trees, Leaf } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { getApiUrl, getNetworkErrorMessage, parseApiResponse } from '../utils/api';

const FireworkParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {[...Array(60)].map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 400;
        const xOffset = Math.cos(angle) * velocity;
        const yOffset = Math.sin(angle) * velocity;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [1, 1, 0],
              x: xOffset,
              y: yOffset,
              scale: [0, Math.random() * 1.5 + 0.5],
              rotate: Math.random() * 720
            }}
            transition={{ duration: 1 + Math.random() * 1.5, ease: "easeOut", delay: 0.2 }}
            className={`absolute w-3 h-3 rounded-${Math.random() > 0.5 ? 'full' : 'sm'}`}
            style={{
              backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)]
            }}
          />
        );
      })}
    </div>
  );
};

const LeaderboardCard = ({ leaderboard = [], currentRank }) => {
  if (!leaderboard.length) return null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
      <div className="rounded-[2rem] p-6 md:p-7 relative overflow-hidden bg-white/90 border border-sky-blue/20 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[90px] -ml-28 -mb-28 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <Trees size={30} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">Eco Champions</h3>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-600">Live Leaderboard</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-emerald-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Your rank: #{currentRank || 'N/A'}
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          {leaderboard.map((leader) => {
            const isTop3 = leader.rank <= 3;
            const isCurrentUser = leader.rank === currentRank;
            const rankStyles = {
              1: 'bg-gradient-to-r from-amber-100 to-yellow-50 border-amber-300 shadow-[0_0_28px_rgba(251,191,36,0.22)]',
              2: 'bg-gradient-to-r from-slate-100 to-slate-50 border-slate-300 shadow-[0_0_18px_rgba(148,163,184,0.18)]',
              3: 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300 shadow-[0_0_18px_rgba(251,146,60,0.16)]',
              default: isCurrentUser
                ? 'bg-gradient-to-r from-emerald-50 to-cyan-50 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.14)]'
                : 'bg-white border-slate-200 shadow-sm hover:bg-emerald-50/60 hover:border-emerald-200',
            };

            const badgeStyles = {
              1: 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-amber-500/40',
              2: 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-slate-500/35',
              3: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-orange-500/35',
              default: isCurrentUser
                ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-emerald-500/35'
                : 'bg-slate-200 text-slate-600 border border-slate-300',
            };

            const RankIcon = leader.rank === 1 ? Crown : leader.rank === 2 || leader.rank === 3 ? Medal : Award;

            return (
              <div
                key={leader.rank}
                className={`flex items-center gap-4 md:gap-7 p-5 rounded-3xl border transition-all duration-300 ${rankStyles[leader.rank] || rankStyles.default}`}
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg ${badgeStyles[leader.rank] || badgeStyles.default}`}>
                    {isTop3 ? <RankIcon size={26} className="drop-shadow-md" /> : `#${leader.rank}`}
                  </div>
                  {leader.rank === 1 && <div className="absolute inset-0 rounded-2xl bg-yellow-400/50 blur-xl" />}
                </div>

                <div className="w-16 h-16 rounded-full bg-emerald-100 overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(leader.name)}&backgroundColor=e6f6ee`}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className={`font-black text-xl truncate ${leader.rank === 1 ? 'text-amber-700' : 'text-slate-800'}`}>
                      {leader.name}
                    </p>
                    {isCurrentUser && (
                      <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-widest border border-emerald-200">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Leaf size={14} className="text-emerald-500" />
                    <p className="text-sm text-emerald-700 font-bold">{leader.cleanups || 0} verified actions</p>
                  </div>
                </div>

                <div className="text-right pl-2">
                  <p className={`text-2xl md:text-3xl font-black ${isTop3 ? 'text-slate-900' : 'text-slate-700'}`}>
                    {leader.coins}
                  </p>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                    Eco Coins
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [dashData, setDashData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(getApiUrl('/api/dashboard'), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await parseApiResponse(res);

        if (!res.ok) {
          setFetchError(data.message || 'Failed to load dashboard');
          setLoadingData(false);
          return;
        }

        setDashData(data);
        setIsClaimed(!!data.hasClaimedDaily);
        setLoadingData(false);
      } catch (err) {
        setFetchError(getNetworkErrorMessage(err, 'Network error loading dashboard'));
        setLoadingData(false);
      }
    };

    if (token) fetchDashboard();
  }, [token]);

  const handleClaim = async () => {
    try {
      const res = await fetch(getApiUrl('/api/dashboard/claim'), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await parseApiResponse(res);
      
      if (!res.ok) {
        alert(data.message || "Failed to claim");
        return;
      }

      // Start animation
      setShowClaimAnimation(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF4500']
      });
      
      // Update actual dashboard coins in real-time
      setDashData(prev => ({ ...prev, coins: data.coins }));
      
      setTimeout(() => {
        setIsClaimed(true);
        setShowClaimAnimation(false);
      }, 3000);
    } catch (err) {
      alert(getNetworkErrorMessage(err, "Network error trying to claim."));
    }
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

  if (loadingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-500 font-semibold text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-500 font-semibold text-lg mb-4">{fetchError}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold">
          Retry
        </button>
      </div>
    );
  }

  const missionsCompleted = dashData?.todayMissions || 0;
  const stats = [
    { label: "Total Eco-Coins", value: (dashData?.coins || 0).toLocaleString(), icon: Coins, color: "text-amber-600", bg: "bg-amber-50", darkBg: "dark:bg-amber-950/20", darkColor: "dark:text-amber-400" },
    { label: "Verified Cleanups", value: String(dashData?.cleanups || 0), icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "dark:bg-emerald-950/20", darkColor: "dark:text-emerald-400" },
    { label: "Impact Score", value: String(dashData?.impact || 0), icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50", darkBg: "dark:bg-cyan-950/20", darkColor: "dark:text-cyan-400" },
    { label: "Global Rank", value: dashData?.rank ? `#${dashData.rank}` : 'N/A', icon: Trophy, color: "text-purple-600", bg: "bg-purple-50", darkBg: "dark:bg-purple-950/20", darkColor: "dark:text-purple-400" },
  ];

  const activities = dashData?.activities || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-10">
        
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-950">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-3 text-lg font-medium">
              Monitor your environmental impact and reward balance.
            </p>
          </div>
          <button 
            onClick={() => navigate('/upload')}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-white/50 transition-all font-bold text-slate-900 hover:scale-102 active:scale-95 shadow-sm"
          >
            <div className="p-2 bg-light-green/20 rounded-lg">
              <ImageIcon size={22} className="text-light-green-dark" />
            </div>
            Upload Cleanup
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="card-pro p-8 rounded-[2rem] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 ${stat.bg} ${stat.darkBg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="flex flex-col gap-6 z-10 relative">
                <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.darkBg} flex items-center justify-center ${stat.color} ${stat.darkColor} shadow-inner transition-transform group-hover:scale-110 duration-500`}>
                  <stat.icon size={36} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest text-black mb-1">{stat.label}</p>
                  <p className="text-4xl font-extrabold text-black flex items-baseline gap-1">
                    {stat.value}
                    {stat.label.includes("Coins") && <span className="text-sm font-bold text-black">ECO</span>}
                  </p>
                </div>
              </div>
              
              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>

        {/* Daily Challenges Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div variants={item} className="card-pro rounded-[2rem] p-7 flex flex-col relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-[100px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-400/5 rounded-full blur-[80px] -ml-32 -mb-32" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center shadow-inner">
                  <Trophy size={32} className="text-amber-500 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black leading-tight">
                    Daily Challenges
                  </h2>
                  <p className="text-black font-bold text-sm">Complete daily tasks to boost your rewards</p>
                </div>
              </div>
              
              <div className="px-4 py-2 rounded-full bg-slate-100 text-black font-bold text-sm border border-slate-200/50 backdrop-blur-md">
                {dashData?.hasDailyLimitReached ? 'Completed Today' : `${missionsCompleted}/2 missions done`}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between relative z-10">
              <div className="w-full flex flex-col justify-between flex-1 gap-5">
                {/* Progress Header */}
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-4xl font-black text-black">{missionsCompleted}</span>
                    <span className="text-xl font-bold text-black">/2</span>
                    <p className="text-black font-bold text-sm mt-1">Missions Completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-black font-black text-lg">50 ECO MAX</p>
                    <p className="text-black text-xs font-bold uppercase tracking-widest">Daily Limit</p>
                  </div>
                </div>

                <div className="relative h-5 w-full bg-slate-200 dark:bg-slate-200 rounded-full overflow-hidden border border-slate-300 dark:border-slate-300 p-0.5">
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
                <div className="grid grid-cols-2 gap-3">
                   <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Zap size={16} className="text-emerald-500" />
                      </div>
                      <p className="text-xs font-semibold text-black leading-tight">
                        Maximum 2 cleanups are allowed each day.
                      </p>
                   </div>
                   <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-white border border-slate-200 dark:border-slate-200 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Gift size={16} className="text-blue-500" />
                      </div>
                      <p className="text-xs font-semibold text-black leading-tight">
                        Reward 25 ECO Coins on each verified cleanup.
                      </p>
                   </div>
                </div>

                {/* Action Button */}
                <div>
                  {missionsCompleted < 2 ? (
                    <button 
                      onClick={() => navigate('/upload')}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-indigo-700 text-slate-900 dark:text-white font-black text-base flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25 group border border-white/10"
                    >
                      Complete today mission
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full py-4 rounded-xl bg-slate-200 dark:bg-slate-200 text-slate-500 font-black text-base flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300"
                    >
                      <CheckCircle size={20} className="text-slate-500" />
                      Complete today mission
                    </button>
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
                  className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-white/90 backdrop-blur-md overflow-hidden"
                >
                  <FireworkParticles />
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center relative z-10"
                  >
                    <div className="w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(245,158,11,0.5)]">
                      <Coins size={64} className="text-white animate-bounce" />
                    </div>
                    <h3 className="text-4xl font-black text-black mb-2 px-4 leading-tight">Congratulations<br/>You Have Been Awarded</h3>
                    <p className="text-2xl font-bold text-amber-500 mt-4">+200 ECO Coins Added</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={item} className="card-pro rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden">
            <h2 className="text-2xl font-black text-black mb-8 relative z-10">Recent Activity</h2>
            
            <div className="space-y-4 flex-1 relative z-10">
              {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon size={32} className="text-slate-400" />
                  </div>
                  <p className="text-slate-400 font-semibold">No activities yet</p>
                  <p className="text-slate-400 text-sm mt-1">Upload your first cleanup to get started!</p>
                </div>
              ) : (
                activities.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-white/10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center shadow-md flex-shrink-0">
                      <CheckCircle size={24} className="text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-black text-base line-clamp-1">{activity.location || 'Cleanup'}</p>
                      <p className="text-xs font-bold text-black mt-0.5 uppercase tracking-wide">
                        {new Date(activity.createdAt).toLocaleDateString()} | <span className="text-black">+{activity.coins} coins</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border border-emerald-100 dark:border-emerald-500/20">
                      <CheckCircle size={16} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Full-width Leaderboard below both sections */}
        <LeaderboardCard leaderboard={(dashData?.leaderboard || []).slice(0, 5)} currentRank={dashData?.rank} />

      </motion.div>
    </div>
  );
};

export default Dashboard;
