import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Clock, CheckCircle2, Zap, ArrowRight, Leaf } from "lucide-react";

const Clean = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-8 overflow-hidden relative">
      
      {/* PROFESSIONAL ENVIRONMENTAL BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:%234ade80;stop-opacity:0.08"/><stop offset="100%25" style="stop-color:%2310b981;stop-opacity:0.03"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad2)"/><path opacity="0.04" d="M0,300 Q300,200 600,300 T1200,300 L1200,800 L0,800 Z" fill="%234ade80"/><circle cx="150" cy="200" r="90" fill="%2310b981" opacity="0.025"/><circle cx="1050" cy="350" r="130" fill="%234ade80" opacity="0.025"/></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/65 via-black/75 to-black/85 pointer-events-none" />

      {/* SUBTLE ANIMATED ACCENTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* CONTAINER */}
      <div className="relative w-full max-w-lg z-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-green-300 transition-colors duration-300 font-semibold flex items-center gap-2">
            ← Back to Home
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 backdrop-blur-md">
            <Zap size={14} className="text-green-300 animate-bounce" />
            <span className="text-xs font-bold text-green-300">Ready to Clean</span>
          </div>
        </div>

        {/* ICON WITH PROFESSIONAL ANIMATION */}
        <div className="text-center mb-10">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-emerald-500/30 rounded-full blur-3xl group-hover:from-green-500/50 group-hover:to-emerald-500/40 transition-all duration-300" />
            <div className="relative text-7xl transform group-hover:scale-110 transition-transform duration-300 cursor-pointer">
              🧹
            </div>
          </div>
        </div>

        {/* PROFESSIONAL TITLE */}
        <h1 className="text-5xl font-black mb-4 text-center">
          <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">Begin Your</span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">Cleanup Journey</span>
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed text-center font-medium">
          Capture authentic <span className="text-green-300 font-semibold">before</span> and <span className="text-green-300 font-semibold">after</span> photos. Our advanced AI technology verifies real environmental impact.
        </p>

        {/* INFO CARDS WITH PROFESSIONAL STYLING */}
        <div className="space-y-4 mb-10">
          
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 backdrop-blur-md transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/60 p-5 flex items-start gap-4">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Camera size={26} className="text-green-300 mt-0.5 shrink-0 relative z-10 group-hover:scale-125 transition-transform duration-300" />
            <div className="relative z-10 text-left">
              <p className="font-bold text-white text-base">Live Camera Capture</p>
              <p className="text-sm text-gray-400 mt-1">High-definition before & after documentation</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 backdrop-blur-md transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/60 p-5 flex items-start gap-4">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MapPin size={26} className="text-green-300 mt-0.5 shrink-0 relative z-10 group-hover:scale-125 transition-transform duration-300" />
            <div className="relative z-10 text-left">
              <p className="font-bold text-white text-base">Location & Timestamp</p>
              <p className="text-sm text-gray-400 mt-1">Automatic GPS coordinates and precise timing</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 backdrop-blur-md transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/60 p-5 flex items-start gap-4">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CheckCircle2 size={26} className="text-green-300 mt-0.5 shrink-0 relative z-10 group-hover:scale-125 transition-transform duration-300" />
            <div className="relative z-10 text-left">
              <p className="font-bold text-white text-base">AI Verification</p>
              <p className="text-sm text-gray-400 mt-1">Grok helps verify authentic environmental improvement</p>
            </div>
          </div>

        </div>

        {/* PROFESSIONAL ACTION BUTTONS */}
        <div className="space-y-3 mb-8">
          <button 
            onClick={() => navigate("/clean")}
            className="group relative w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-4 px-6 rounded-xl font-bold hover:from-green-300 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-green-500/40 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            <Camera size={22} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10 font-bold">Start Cleaning Now</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-all duration-300 ease-out" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="group w-full border-2 border-gray-700/60 text-gray-300 py-3 px-6 rounded-xl font-bold hover:border-green-400/60 hover:text-green-300 hover:bg-green-500/10 transition-all duration-300 backdrop-blur-sm active:scale-95"
          >
            Back to Home
          </button>
        </div>

        {/* PROFESSIONAL TIP */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 text-center">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-green-300">💡 Pro Tip:</span> Ensure clear visual difference between before and after for optimal AI recognition
          </p>
        </div>

      </div>

    </div>
  );
};

export default Clean;
