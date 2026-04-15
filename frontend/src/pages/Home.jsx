import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroAnimation from '../components/HeroAnimation';

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col-reverse lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
              Clean the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-500">World</span>, <br />
              Earn <span className="text-pink-500 dark:text-pink-400 text-glow">Rewards</span>.
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Join the AI-powered movement addressing environmental cleanliness. 
              Verify your cleanups, earn digital coins, and redeem them for exclusive rewards.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/upload" className="px-8 py-4 rounded-xl bg-pink-500 hover:bg-pink-600 dark:bg-pink-500 dark:hover:bg-pink-400 text-white font-bold text-lg shadow-lg dark:shadow-pink-500/20 transition-all flex items-center gap-2 hover:-translate-y-1">
              Start Earning
              <ArrowRight size={20} />
            </Link>
            <Link to="/impact" className="px-8 py-4 rounded-xl glass hover:bg-white/40 dark:hover:bg-white/10 font-bold text-lg transition-all flex items-center gap-2 hover:-translate-y-1 text-slate-900 dark:text-white">
              View Impact
            </Link>
            <Link to="/join-beta" className="px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-white/10 glass hover:border-pink-500 dark:hover:border-pink-500 font-bold text-lg transition-all flex items-center gap-2 hover:-translate-y-1 text-slate-900 dark:text-white group">
              Join Beta
              <Sparkles size={20} className="text-pink-500 group-hover:animate-pulse" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="flex-1 w-full flex justify-center lg:justify-end xl:mr-10 relative"
        >
          {/* Decorative glow behind the animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-pink-400/20 dark:bg-pink-500/10 blur-[100px] rounded-full z-[-1]" />
          <HeroAnimation />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-white/30 dark:bg-black/20 mt-12 backdrop-blur-md border-y border-black/5 dark:border-white/5 relative overflow-hidden">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-slate-950 dark:text-white mb-6"
            >
              How it works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto"
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
                className="glass p-10 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-indigo-500 flex items-center justify-center mb-8 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                
                {/* Decorative background element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
