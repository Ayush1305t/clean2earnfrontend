import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

import VisualStories from '../components/VisualStories';

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-10 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
        <div className="flex-1 space-y-1 z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
              Clean the <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-blue-dark pb-1 pr-3 tracking-normal">World</span>, <br />
              Earn <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-emerald-500 to-forest-green pb-1 pr-3 tracking-normal">Rewards</span>.
            </h1>
            <p className="mt-0 text-xl text-slate-600 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
              Join the AI-powered movement addressing environmental cleanliness. 
              Verify your cleanups, earn digital coins, and redeem them for exclusive rewards.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <Link to="/upload" className="px-8 py-4 rounded-xl bg-light-green hover:bg-light-green-dark text-white font-bold text-lg shadow-lg shadow-light-green/30 transition-all flex items-center gap-2 hover:-translate-y-1">
              Start Earning
              <ArrowRight size={20} />
            </Link>
            <Link to="/impact" className="px-8 py-4 rounded-xl glass hover:bg-sky-blue/20 font-bold text-lg transition-all flex items-center gap-2 hover:-translate-y-1 text-slate-800">
              View Impact
            </Link>
            <Link to="/join-beta" className="px-8 py-4 rounded-xl border-2 border-sky-blue glass hover:border-light-green font-bold text-lg transition-all flex items-center gap-2 hover:-translate-y-1 text-slate-800 group">
              Join Beta
              <Sparkles size={20} className="text-light-green-dark group-hover:animate-pulse" />
            </Link>
          </motion.div>
        </div>

        {/* Storyboard Animation */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 w-full flex justify-center lg:justify-end"
        >
          <VisualStories />
        </motion.div>

      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-light-green/10 mt-12 backdrop-blur-md border-y border-sky-blue/20 relative overflow-hidden">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-slate-950 mb-6"
            >
              How it works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              Three simple steps to make a measurable difference and get rewarded for your efforts in maintaining a cleaner environment.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "1. Capture & Verify", desc: "Take before and after photos of your cleanup. Our AI verifies authenticity preventing misuse." },
              { icon: Award, title: "2. Earn Coins", desc: "Get rewarded instantly with Eco-Coins for your verified positive real-world actions." },
              { icon: Sparkles, title: "3. Redeem Rewards", desc: "Use your hard-earned coins for exclusive discounts and perks from eco-friendly partners." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="glass-dark p-10 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 border-white/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-blue-dark flex items-center justify-center mb-8 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300 shadow-emerald-500/20">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed font-medium">{feature.desc}</p>
                
                {/* Decorative background element */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
                
                {/* Subtle border shine on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/20 rounded-3xl transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
