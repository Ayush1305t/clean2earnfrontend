
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, ArrowLeft, Camera, CheckCircle, Coins,
  Loader2, MapPin, RefreshCw, ShieldCheck, Leaf,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCamera from "../hooks/useCamera";
import useAiVerification from "../hooks/useAiVerification";
import { formatLocationText, formatPhotoMeta } from "../utils/photoMeta";
import { getAuthToken } from "../utils/api";
import api from "../lib/api";
import realLeaf from "../assets/logo/real-leaf.png";

const trackerSteps = ["Before", "After", "Verify", "Done"];
const StepTracker = ({ step }) => (
  <div className="w-full max-w-3xl mb-12">
    <div className="relative mb-5 px-2">
      <div
        className="h-[6px] overflow-hidden rounded-full"
        style={{
          background: "rgba(15, 23, 42, 0.08)",
        }}
      >
        <motion.div
          className="relative h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / trackerSteps.length) * 100}%` }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(90deg, #0ea5e9 0%, #14b8a6 34%, #22c55e 68%, #84cc16 100%)",
            boxShadow: "0 0 14px rgba(34,197,94,0.28)",
          }}
        >
          <motion.div
            className="absolute inset-y-0 w-20"
            animate={{ x: ["-25%", "360%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              filter: "blur(3px)",
            }}
          />
        </motion.div>
      </div>
    </div>

    <div className="relative z-10 flex justify-between gap-3">
      {trackerSteps.map((label, index) => {
        const active = step >= index;
        const current = step === index;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              animate={{
                scale: current ? 1.06 : 1,
                y: current ? -1 : 0,
                boxShadow: active ? "0 0 14px rgba(34,197,94,0.2)" : "none",
              }}
              transition={{ duration: 0.5 }}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500"
              style={{
                background: active
                  ? "linear-gradient(135deg, #14b8a6, #22c55e)"
                  : "rgba(226, 232, 240, 0.85)",
                border: active
                  ? "1px solid rgba(16,185,129,0.32)"
                  : "1px solid rgba(148, 163, 184, 0.24)",
              }}
            >
              {active ? (
                <CheckCircle size={18} className="text-white" />
              ) : (
                <span className="text-slate-700 text-sm font-bold">{index + 1}</span>
              )}
            </motion.div>
            <span className={`text-center text-[11px] font-semibold uppercase tracking-[0.22em] ${active ? 'text-black' : 'text-black/70'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

const PhotoCard = ({ label, photo }) => {
  const meta = formatPhotoMeta(photo?.meta);
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-video"
      style={{
        background: 'rgba(1,18,8,0.8)',
        border: '1px solid rgba(16,185,129,0.15)',
      }}
    >
      {photo ? (
        <>
          <img src={photo.dataUrl} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-4"
            style={{ background: 'linear-gradient(to top, rgba(1,18,8,0.95), transparent)' }}
          >
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-xs text-slate-300">{meta.date} | {meta.time}</div>
            <div className="text-xs text-slate-400 truncate">{meta.location}</div>
          </div>
          <div className="absolute top-3 right-3">
            <span className="eco-badge text-xs">Captured</span>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-600">
          <Camera size={32} className="opacity-40" />
          <p className="text-sm">No photo captured yet</p>
        </div>
      )}
    </div>
  );
};

const Upload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [captureBusy, setCaptureBusy] = useState(false);
  const [todayMissions, setTodayMissions] = useState(0);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [dailyStatusLoading, setDailyStatusLoading] = useState(true);

  const { videoRef, isStreaming, locationMeta, locationError, startCamera, stopCamera, capturePhoto } = useCamera();
  const { status, result, error, verify, reset } = useAiVerification();

  const locationText = useMemo(
    () => formatLocationText(locationMeta, locationError),
    [locationMeta, locationError],
  );

  useEffect(() => { return () => stopCamera(); }, [stopCamera]);

  useEffect(() => {
    const fetchDashboardSnapshot = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setDailyStatusLoading(false);
          return;
        }
        const res = await api.get("/api/dashboard", { headers: { Authorization: `Bearer ${token}` } });
        setTodayMissions(res.data.todayMissions || 0);
        setDailyLimitReached(Boolean(res.data.hasDailyLimitReached));
      } catch (e) { console.error(e); }
      finally { setDailyStatusLoading(false); }
    };

    fetchDashboardSnapshot();
  }, []);

  useEffect(() => {
    if (step === 2 && beforePhoto && afterPhoto && status === "idle") {
      verify(beforePhoto, afterPhoto).catch(() => {});
    }
  }, [afterPhoto, beforePhoto, status, step, verify]);

  useEffect(() => { if (status === "done") setStep(3); }, [status]);

  useEffect(() => {
    if (status === "done" && result) {
      if (typeof result.todayMissions === "number") {
        setTodayMissions(result.todayMissions);
        setDailyLimitReached(Boolean(result.hasDailyLimitReached));
      }
    }
  }, [result, status]);

  const openCamera = async () => {
    setCameraError(null);
    if (dailyLimitReached) { setCameraError("Daily cleanup limit reached. Come back tomorrow."); return; }
    try { await startCamera(); } catch (e) { setCameraError(e.message); }
  };

  const handleCapture = async () => {
    setCaptureBusy(true); setCameraError(null);
    try {
      const photo = await capturePhoto();
      if (!photo) throw new Error("Unable to capture photo.");
      stopCamera();
      if (step === 0) { setBeforePhoto(photo); setStep(1); }
      else if (step === 1) { setAfterPhoto(photo); setStep(2); }
    } catch (e) { setCameraError(e.message || "Unable to capture photo."); }
    finally { setCaptureBusy(false); }
  };

  const handleReset = () => {
    stopCamera(); reset(); setBeforePhoto(null); setAfterPhoto(null); setCameraError(null); setStep(0);
  };

  const titles = ["Capture Before Photo", "Capture After Photo", "Verify Cleanup", "Complete"];
  const subtitles = [
    "Use the rear camera to photograph the dirty area before cleaning.",
    "Capture the same area after cleaning so AI can compare both images.",
    "Comparing both images, timestamps, and GPS data.",
    "Verification complete.",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div
          className="mb-4 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(220,252,231,0.88), rgba(224,242,254,0.9))",
            border: "1px solid rgba(16,185,129,0.16)",
            boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
          }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.14), rgba(14,165,233,0.16))",
              border: "1px solid rgba(16,185,129,0.12)",
            }}
          >
            <img src={realLeaf} alt="Clean2Earn logo" className="h-5 w-5 object-contain" />
          </div>
          <span
            className="text-[12px] md:text-[13px] font-black uppercase tracking-[0.32em]"
            style={{
              color: "#0f766e",
              fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
            }}
          >
            Clean2Earn Verification Suite
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          <span
            style={{
              color: '#0f172a',
              textShadow: '0 2px 10px rgba(255,255,255,0.18)',
            }}
          >
            Real Camera
          </span>{' '}
          <span
            style={{
              color: '#059669',
              textShadow: '0 8px 20px rgba(5,150,105,0.18)',
            }}
          >
            AI Verification
          </span>
        </h1>
        <p className="text-black text-lg max-w-2xl mx-auto">
          Capture real before/after photos with location metadata, then let our AI verify your cleanup.
        </p>
      </motion.div>

      <StepTracker step={step} />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full rounded-3xl p-6 md:p-8"
        style={{
          background: 'rgba(1,18,8,0.8)',
          border: '1px solid rgba(16,185,129,0.15)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Card header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{titles[step]}</h2>
            <p className="text-slate-400 mt-1.5 text-sm max-w-xl">{subtitles[step]}</p>
            <p className="text-sm text-black mt-2 font-medium">Today's submissions: {todayMissions}/2</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 transition-colors shrink-0"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <ArrowLeft size={15} />
            Dashboard
          </button>
        </div>

        {step < 2 && (
          <>
            {dailyLimitReached && !dailyStatusLoading && (
              <div className="mb-6 p-4 rounded-xl flex items-center gap-3 text-sm"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                <span className="text-amber-300">Daily limit reached. Come back tomorrow for more submissions.</span>
              </div>
            )}

            {/* Camera view */}
            <div
              className="rounded-[2rem] overflow-hidden aspect-video relative"
              style={{
                background: 'linear-gradient(135deg, rgba(2,12,10,0.98), rgba(5,28,23,0.94), rgba(8,45,37,0.9))',
                border: '1px solid rgba(52,211,153,0.18)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 20px 45px rgba(0,0,0,0.35)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at top left, rgba(45,212,191,0.12), transparent 28%), radial-gradient(circle at bottom right, rgba(34,197,94,0.12), transparent 34%)',
                }}
              />
              {!isStreaming && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(52,211,153,0.16), rgba(34,211,238,0.14))',
                      border: '1px solid rgba(103,232,249,0.18)',
                    }}
                  >
                    <Camera size={34} className="text-emerald-300" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-base font-semibold text-emerald-50">Camera access panel</p>
                    <p className="text-sm text-slate-400">Open the rear camera when you are ready to capture the cleanup scene.</p>
                  </div>
                </div>
              )}
              <video ref={videoRef} autoPlay playsInline muted
                className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
              />
              {/* Corner brackets */}
              {isStreaming && (
                <>
                  <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-500 rounded-tl-lg opacity-70" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-500 rounded-tr-lg opacity-70" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-500 rounded-bl-lg opacity-70" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-500 rounded-br-lg opacity-70" />
                </>
              )}
            </div>

            {/* Location */}
            <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}
            >
              <MapPin size={15} className="text-emerald-500 shrink-0" />
              <span className="text-slate-400">{locationText}</span>
            </div>

            {cameraError && (
              <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertTriangle size={15} className="text-red-400 shrink-0" />
                <span className="text-red-300">{cameraError}</span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {!isStreaming ? (
                <button
                  onClick={openCamera}
                  disabled={dailyLimitReached || dailyStatusLoading}
                  className="inline-flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    background: 'linear-gradient(135deg, #6ee7b7, #2dd4bf)',
                    boxShadow: '0 18px 30px rgba(45,212,191,0.2)',
                  }}
                >
                  <Camera size={16} />
                  {dailyLimitReached ? "Daily Limit Reached" : "Open Camera"}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCapture}
                    disabled={captureBusy || dailyLimitReached}
                    className="inline-flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-950 transition-all disabled:opacity-60"
                    style={{
                      background: step === 0
                        ? 'linear-gradient(135deg, #fde68a, #f59e0b)'
                        : 'linear-gradient(135deg, #86efac, #22c55e)',
                      boxShadow: step === 0
                        ? '0 18px 32px rgba(245,158,11,0.2)'
                        : '0 18px 32px rgba(34,197,94,0.22)',
                    }}
                  >
                    {captureBusy ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
                    {captureBusy ? "Capturing..." : step === 0 ? "Capture Before Photo" : "Capture After Photo"}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="inline-flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-bold text-rose-100 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, rgba(127,29,29,0.92), rgba(190,24,93,0.82))',
                      border: '1px solid rgba(251,113,133,0.34)',
                      boxShadow: '0 16px 30px rgba(159,18,57,0.18)',
                    }}
                  >
                    Close Camera
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {step >= 2 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <PhotoCard label="Before" photo={beforePhoto} />
              <PhotoCard label="After" photo={afterPhoto} />
            </div>

            {/* Loading */}
            {status === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl p-8 flex flex-col items-center text-center gap-4"
                style={{ background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 rounded-full"
                  style={{ border: '2px solid rgba(14,165,233,0.15)', borderTopColor: '#0ea5e9' }}
                />
                <h3 className="text-xl font-bold text-slate-100">Analyzing Cleanup</h3>
                <p className="text-slate-400 text-sm max-w-sm">Comparing images, timestamps, and GPS location data...</p>
              </motion.div>
            )}

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <div className="flex items-center gap-2 font-bold mb-2 text-red-400">
                  <AlertTriangle size={18} /> Verification failed
                </div>
                <p className="text-red-300 text-sm">{error}</p>
                <button onClick={handleReset} className="mt-4 btn-eco-ghost text-sm border-red-500/30 text-red-400 hover:bg-red-500/10">
                  Start Again
                </button>
              </motion.div>
            )}

            {/* Done */}
            {status === "done" && result && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: result.verdict === "CLEANED"
                      ? 'rgba(16,185,129,0.08)'
                      : 'rgba(245,158,11,0.06)',
                    border: result.verdict === "CLEANED"
                      ? '1px solid rgba(16,185,129,0.25)'
                      : '1px solid rgba(245,158,11,0.2)',
                  }}
                >
                  <ShieldCheck size={48} className="mx-auto mb-4 text-emerald-400" style={{ filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.5))' }} />
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">
                    {result.verdict === "CLEANED"
                      ? "Cleanup Verified!"
                      : result.verdict === "FRAUD_DETECTED"
                        ? "Verification Flagged"
                        : "Needs More Cleaning"}
                  </h3>
                  <p className="text-slate-400 max-w-xl mx-auto text-sm mb-5">{result.details}</p>
                  {result.awardedCoins > 0 && (
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}
                    >
                      <Coins size={16} />
                      +{result.awardedCoins} Rewards Earned
                    </div>
                  )}
                  <div className="mt-4 text-xs text-slate-500">Confidence: {result.confidence}</div>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="flex justify-center pt-2">
              <button onClick={handleReset} className="btn-eco-ghost">
                <RefreshCw size={15} />
                Reset Flow
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;
