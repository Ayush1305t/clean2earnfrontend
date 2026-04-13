import { useState, useEffect } from "react";
import { Camera, CheckCircle, XCircle, AlertTriangle, MapPin, Clock, Loader2, RotateCcw, Trophy, ArrowRight } from "lucide-react";
import useCamera from "../hooks/useCamera";
import { grokService } from "../services/grokService";
import { useNavigate } from "react-router-dom";
import SiteNavbar from "../component/SiteNavbar";

// ─── Step indicator ───────────────────────────────────────────
const steps = ["Before", "After", "Verify", "Done"];

const StepBar = ({ current }) => (
  <div className="flex items-center gap-0 mb-14">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center w-full">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 relative
                ${done ? "bg-gradient-to-br from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30" : 
                active ? "bg-gradient-to-br from-green-400 to-emerald-500 text-black ring-4 ring-green-400/40 shadow-lg shadow-green-500/30" : 
                "bg-gray-800/50 text-gray-500 border border-gray-700"}`}
            >
              {done ? <CheckCircle size={20} /> : i + 1}
            </div>
            <span className={`text-xs mt-2 font-semibold transition-colors duration-300
              ${active || done ? "text-green-300" : "text-gray-500"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-1 flex-1 mx-2 mb-6 rounded-full transition-all duration-700 
              ${done ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/20" : "bg-gray-800/50"}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Camera step component ────────────────────────────────────
const CameraStep = ({ stepIndex, title, subtitle, onCapture }) => {
  const { videoRef, isStreaming, capturedPhoto, locationMeta, locationError, startCamera, stopCamera, capturePhoto, clearPhoto } = useCamera();
  const [error, setError] = useState(null);
  const [capturing, setCapturing] = useState(false);

  const handleStart = async () => {
    setError(null);
    try {
      await startCamera();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCapture = async () => {
    setCapturing(true);
    try {
      const photo = await capturePhoto();
      if (photo) {
        stopCamera();
        onCapture(photo);
      }
    } catch (e) {
      setError("Failed to capture photo. Please try again.");
    }
    setCapturing(false);
  };

  const handleRetake = () => {
    clearPhoto();
    handleStart();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <StepBar current={stepIndex} />

      <div className="text-center mb-8">
        <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
          {stepIndex === 0 ? "📸" : "✅"} {title}
        </h1>
        <p className="text-gray-400 font-medium text-lg">{subtitle}</p>
      </div>

      {/* Camera / Preview Box */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-950 aspect-video mb-6 shadow-2xl backdrop-blur-md hover:border-green-500/50 transition-all duration-300">
        {!isStreaming && !capturedPhoto && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-600">
            <Camera size={56} className="opacity-40" />
            <p className="text-sm">Camera preview will appear here</p>
          </div>
        )}

        {/* Live video feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
        />

        {/* Captured photo preview */}
        {capturedPhoto && (
          <img src={capturedPhoto.dataUrl} alt="captured" className="w-full h-full object-cover" />
        )}

        {/* Scanning overlay on live feed */}
        {isStreaming && !capturedPhoto && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-green-400 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-green-400 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-green-400 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-green-400 rounded-br-lg" />
          </div>
        )}

        {/* Photo meta overlay */}
        {capturedPhoto && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-2 text-xs text-gray-300 flex flex-wrap gap-3">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-green-400" />
              {capturedPhoto.meta.time} · {capturedPhoto.meta.date}
            </span>
            {capturedPhoto.meta.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-green-400" />
                {capturedPhoto.meta.location.latitude}, {capturedPhoto.meta.location.longitude}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Location status */}
      {!capturedPhoto && (
        <div className={`flex items-center gap-2 text-xs mb-5 px-4 py-3 rounded-lg w-full backdrop-blur-md transition-all duration-300
          ${locationMeta ? "bg-green-500/15 text-green-300 border border-green-500/40 shadow-lg shadow-green-500/10" :
            locationError ? "bg-red-500/15 text-red-300 border border-red-500/40" :
            "bg-gray-800/40 text-gray-400 border border-gray-700/50"}`}>
          <MapPin size={14} className="shrink-0" />
          <span className="font-medium">
            {locationMeta
              ? `GPS: ${locationMeta.latitude}, ${locationMeta.longitude} (±${locationMeta.accuracy}m)`
              : locationError
              ? `Location: ${locationError}`
              : "Requesting location access..."}
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 text-red-300 bg-red-500/15 border border-red-500/40 rounded-xl px-4 py-3 text-sm mb-5 w-full backdrop-blur-md">
          <AlertTriangle size={18} className="shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Action buttons */}
      {!capturedPhoto ? (
        <button
          onClick={isStreaming ? handleCapture : handleStart}
          disabled={capturing}
          className="group w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/40 disabled:opacity-50 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          {capturing ? <Loader2 size={20} className="animate-spin relative z-10" /> : <Camera size={20} className="relative z-10" />}
          <span className="relative z-10">{capturing ? "Capturing…" : isStreaming ? "📸 Capture Photo" : "Open Camera"}</span>
        </button>
      ) : (
        <div className="flex gap-3 w-full">
          <button
            onClick={handleRetake}
            className="group flex-1 py-4 rounded-xl font-bold text-gray-300 border-2 border-gray-700 hover:border-green-400/60 hover:text-green-300 hover:bg-green-500/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-300" /> Retake
          </button>
          <button
            onClick={() => onCapture(capturedPhoto)}
            className="group flex-1 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/40 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Use Photo ✓</span>
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Verify step ──────────────────────────────────────────────
const VerifyStep = ({ beforePhoto, afterPhoto, onDone }) => {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runVerification = async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await grokService(
        beforePhoto.dataUrl,
        afterPhoto.dataUrl,
        beforePhoto.meta,
        afterPhoto.meta
      );
      setResult(res);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError(e?.message || "Verification failed. Please try again.");
      setStatus("error");
    }
  };

  useEffect(() => {
    runVerification();
  }, []);

  const verdictConfig = {
    CLEANED: { icon: <CheckCircle size={72} className="text-green-300" />, color: "green", label: "🎉 Verified! Beautifully Cleaned", bg: "bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-green-500/40" },
    NOT_CLEANED: { icon: <XCircle size={72} className="text-red-300" />, color: "red", label: "❌ Needs More Cleaning", bg: "bg-gradient-to-br from-red-500/15 to-orange-500/10 border-red-500/40" },
    FRAUD_DETECTED: { icon: <AlertTriangle size={72} className="text-yellow-300" />, color: "yellow", label: "⚠️ Unusual Activity Detected", bg: "bg-gradient-to-br from-yellow-500/15 to-orange-500/10 border-yellow-500/40" },
  };

  const cfg = result ? verdictConfig[result.verdict] || verdictConfig["CLEANED"] : null;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      <StepBar current={2} />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">🤖 AI Verification</h1>
        <p className="text-gray-400 font-medium text-lg">Grok is analyzing your photos...</p>
      </div>

      {/* Photo comparison */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {[{ label: "Before", photo: beforePhoto }, { label: "After", photo: afterPhoto }].map(({ label, photo }) => (
          <div key={label} className="group relative rounded-xl overflow-hidden border border-gray-700/50 aspect-video bg-gradient-to-br from-gray-900/50 to-gray-950 backdrop-blur-md hover:border-green-500/40 transition-all duration-300">
            <img src={photo.dataUrl} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg">{label}</div>
            {photo.meta?.location && (
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md text-[11px] text-gray-300 px-2 py-1.5 rounded-lg flex items-center gap-1">
                <MapPin size={10} className="text-green-300 shrink-0" />
                <span className="truncate">{photo.meta.location.latitude}, {photo.meta.location.longitude}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status */}
      {status === "loading" && (
        <div className="flex flex-col items-center gap-5 py-10 w-full">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-green-400/20 border-t-green-300 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 text-base font-medium">Analyzing with Grok...</p>
        </div>
      )}

      {status === "error" && (
        <div className="w-full bg-gradient-to-br from-red-500/15 to-orange-500/10 border border-red-500/40 rounded-2xl p-6 text-center backdrop-blur-md">
          <XCircle size={56} className="text-red-300 mx-auto mb-4" />
          <p className="text-red-300 font-bold mb-4 text-lg">{error}</p>
          <button onClick={runVerification} className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-sm font-semibold transition-all duration-300">
            Retry Verification
          </button>
        </div>
      )}

      {status === "done" && result && cfg && (
        <div className={`w-full border rounded-2xl p-8 text-center ${cfg.bg} backdrop-blur-md`}>
          <div className="flex justify-center mb-5 animate-bounce">{cfg.icon}</div>
          <h2 className="text-3xl font-black text-white mb-4">{cfg.label}</h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Confidence Level:</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md
              ${result.confidence === "HIGH" ? "bg-green-500/30 text-green-300 border border-green-500/40" :
                result.confidence === "MEDIUM" ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/40" :
                "bg-gray-700/50 text-gray-300 border border-gray-600/50"}`}>
              {result.confidence}
            </span>
          </div>

          {result.details && (
            <p className="text-gray-400 text-base leading-relaxed mb-8 font-medium">{result.details}</p>
          )}

          <button
            onClick={() => onDone(result)}
            className="w-full group py-4 rounded-xl font-bold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 active:scale-95 transition-all duration-300 shadow-lg shadow-green-500/40 flex items-center justify-center gap-2 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Continue to Results</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-all duration-300" />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Done step ────────────────────────────────────────────────
const DoneStep = ({ result, beforePhoto, afterPhoto }) => {
  const navigate = useNavigate();
  const isSuccess = result?.verdict === "CLEANED";
  const coins = isSuccess ? 50 : 0;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto text-center">
      <StepBar current={3} />

      <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 animate-bounce ring-4 transition-all duration-300
        ${isSuccess ? "bg-gradient-to-br from-green-500/20 to-emerald-500/10 ring-green-400/40" : "bg-gradient-to-br from-red-500/20 to-orange-500/10 ring-red-400/40"}`}>
        {isSuccess ? <Trophy size={64} className="text-green-300" /> : <XCircle size={64} className="text-red-300" />}
      </div>

      <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
        {isSuccess ? "🎉 Success!" : "⏰ Try Again!"}
      </h1>
      <p className="text-gray-400 font-medium mb-10 leading-relaxed text-lg">
        {isSuccess
          ? "Your cleanup has been AI-verified! You've made a real environmental impact."
          : "The area needs more cleaning. Please ensure visible improvement before submitting."}
      </p>

      {isSuccess && (
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/40 backdrop-blur-md rounded-2xl px-8 py-8 mb-10 w-full shadow-lg shadow-green-500/10">
          <p className="text-gray-300 text-sm mb-2 uppercase tracking-widest font-bold">Coins Earned</p>
          <p className="text-7xl font-black text-transparent bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text">+{coins}</p>
          <p className="text-gray-400 text-base mt-3 font-medium">Clean2Earn coins added to your account</p>
        </div>
      )}

      {/* Side by side summary */}
      <div className="grid grid-cols-2 gap-4 w-full mb-10">
        {[{ label: "Before", photo: beforePhoto }, { label: "After", photo: afterPhoto }].map(({ label, photo }) => (
          <div key={label} className="group relative rounded-xl overflow-hidden border border-gray-700/50 aspect-video bg-gradient-to-br from-gray-900/50 to-gray-950 backdrop-blur-md hover:border-green-500/40 transition-all duration-300">
            <img src={photo.dataUrl} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={() => navigate("/clean")}
          className="group flex-1 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/40 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Camera size={20} className="relative z-10" />
          <span className="relative z-10">Clean Again</span>
          <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-all duration-300" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 py-4 rounded-xl font-bold text-gray-300 border-2 border-gray-700 hover:border-green-400/60 hover:text-green-300 hover:bg-green-500/10 active:scale-95 transition-all duration-300 backdrop-blur-sm"
        >
          Home
        </button>
      </div>
    </div>
  );
};

// ─── Main CleaningFlow page ────────────────────────────────────
const CleaningFlow = () => {
  const [step, setStep] = useState(0);
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  const handleBeforeCapture = (photo) => {
    setBeforePhoto(photo);
    setStep(1);
  };

  const handleAfterCapture = (photo) => {
    setAfterPhoto(photo);
    setStep(2);
  };

  const handleVerificationDone = (result) => {
    setVerificationResult(result);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* PROFESSIONAL ENVIRONMENTAL BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" style="stop-color:%234ade80;stop-opacity:0.06"/><stop offset="100%25" style="stop-color:%2310b981;stop-opacity:0.02"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad3)"/><path opacity="0.035" d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="%234ade80"/></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/85 pointer-events-none" />

      {/* SUBTLE ANIMATED ACCENTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <SiteNavbar
        active="Clean"
        ctaLabel="Dashboard"
        ctaPath="/dashboard"
        rightSlot={
          <div className="hidden items-center gap-3 rounded-full border border-green-500/40 bg-green-500/15 px-4 py-2 text-xs font-bold text-green-300 backdrop-blur-md md:flex">
            <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />
            Live Camera Mode
          </div>
        }
      />

      {/* Content */}
      <div className="relative px-4 py-12 z-10">
        {step === 0 && (
          <CameraStep
            stepIndex={0}
            title="Take Before Photo"
            subtitle="Capture the dirty area before you clean it."
            onCapture={handleBeforeCapture}
          />
        )}
        {step === 1 && (
          <CameraStep
            stepIndex={1}
            title="Take After Photo"
            subtitle="Now capture the same area after cleaning it up."
            onCapture={handleAfterCapture}
          />
        )}
        {step === 2 && beforePhoto && afterPhoto && (
          <VerifyStep
            beforePhoto={beforePhoto}
            afterPhoto={afterPhoto}
            onDone={handleVerificationDone}
          />
        )}
        {step === 3 && beforePhoto && afterPhoto && verificationResult && (
          <DoneStep
            result={verificationResult}
            beforePhoto={beforePhoto}
            afterPhoto={afterPhoto}
          />
        )}
      </div>
    </div>
  );
};

export default CleaningFlow;
