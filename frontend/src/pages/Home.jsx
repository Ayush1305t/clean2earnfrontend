import { Trophy, Camera, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SiteNavbar from "../component/SiteNavbar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:%234ade80;stop-opacity:0.05"/><stop offset="100%25" style="stop-color:%2310b981;stop-opacity:0.02"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><path opacity="0.03" d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="%234ade80"/><circle cx="100" cy="150" r="80" fill="%2310b981" opacity="0.02"/><circle cx="1100" cy="250" r="120" fill="%234ade80" opacity="0.02"/><circle cx="600" cy="100" r="100" fill="%2310b981" opacity="0.015"/></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 pointer-events-none" />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      <SiteNavbar active="Home" ctaLabel="Sign In" ctaPath="/dashboard" />

      {/* HERO SECTION */}
      <div className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-95px)] px-4 py-12 z-10">
        
        <div className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/40 backdrop-blur-lg hover:bg-green-500/20 transition-all duration-300">
          <Sparkles size={16} className="text-green-300 animate-spin" style={{ animationDuration: "3s" }} />
          <span className="text-sm font-semibold text-green-300">Verified by AI Technology</span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
          <span className="text-white">Clean Environment.</span>
          <br />
          <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">Earn & Impact.</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl leading-relaxed font-medium">
          Contribute to a cleaner India. Capture verified cleanup activities, get rewarded with coins, and make a real environmental difference.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-14 w-full max-w-xl">
          <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-xl p-5 backdrop-blur-md hover:border-green-500/50 hover:bg-gray-800/60 transition-all duration-300">
            <div className="relative">
              <div className="text-3xl font-black text-green-300">2.5M+</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Active Contributors</div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-xl p-5 backdrop-blur-md hover:border-green-500/50 hover:bg-gray-800/60 transition-all duration-300">
            <div className="relative">
              <div className="text-3xl font-black text-green-300">500K+</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Areas Cleaned</div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-xl p-5 backdrop-blur-md hover:border-green-500/50 hover:bg-gray-800/60 transition-all duration-300">
            <div className="relative">
              <div className="text-3xl font-black text-green-300">98%</div>
              <div className="text-xs text-gray-400 font-medium mt-1">Accuracy Rate</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mb-16">
          <button 
            onClick={() => navigate("/clean")}
            className="group relative flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold py-4 px-8 rounded-xl hover:from-green-300 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-green-500/50 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
          >
            <Camera size={22} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10 font-bold">Start Cleaning</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-all duration-300 ease-out" />
          </button>

          <button 
            onClick={() => navigate("/dashboard")}
            className="group flex-1 border-2 border-green-400/60 text-green-300 font-bold py-4 px-8 rounded-xl hover:border-green-400 hover:text-green-200 hover:bg-green-500/10 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 backdrop-blur-sm"
          >
            <Trophy size={22} className="group-hover:scale-110 transition-transform duration-300" />
            Dashboard
          </button>
        </div>

        <div className="w-full max-w-4xl">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">How it Works</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 hover:border-green-500/40 backdrop-blur-md transition-all duration-300">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="font-bold text-lg mb-2 text-white">Capture Reality</h3>
              <p className="text-sm text-gray-400">Take high-quality before & after photos using your device camera</p>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 hover:border-green-500/40 backdrop-blur-md transition-all duration-300">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="font-bold text-lg mb-2 text-white">AI Verification</h3>
              <p className="text-sm text-gray-400">Our Grok vision check analyzes images for genuine cleanup proof</p>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 hover:border-green-500/40 backdrop-blur-md transition-all duration-300">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-bold text-lg mb-2 text-white">Get Rewards</h3>
              <p className="text-sm text-gray-400">Earn coins instantly and redeem for exclusive rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
