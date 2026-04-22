import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, X } from "lucide-react";

const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: {
    accent: "from-emerald-500 to-teal-400",
    ring: "ring-emerald-500/20",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-500"
  },
  error: {
    accent: "from-rose-500 to-orange-400",
    ring: "ring-rose-500/20",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-500"
  },
  info: {
    accent: "from-sky-500 to-cyan-400",
    ring: "ring-sky-500/20",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-500"
  }
};

const ToastIcon = ({ type }) => {
  if (type === "success") {
    return <CheckCircle2 size={20} />;
  }

  if (type === "error") {
    return <CircleAlert size={20} />;
  }

  return <CheckCircle2 size={20} />;
};

const ToastViewport = ({ toasts, removeToast }) => {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-24">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.92 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className={`pointer-events-auto relative overflow-hidden rounded-3xl border border-white/20 bg-white/85 p-4 shadow-2xl ring-1 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/85 ${style.ring}`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${style.iconBg} ${style.iconColor}`}>
                  <ToastIcon type={toast.type} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {toast.title}
                  </p>
                  {toast.message ? (
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {toast.message}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-full p-1.5 text-slate-400 transition hover:bg-black/5 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-slate-200"
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ title, message = "", type = "info", duration = 3500 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setToasts((current) => [...current, { id, title, message, type }]);

    window.setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const value = useMemo(() => ({
    showToast,
    success: (title, message, options = {}) =>
      showToast({ title, message, type: "success", ...options }),
    error: (title, message, options = {}) =>
      showToast({ title, message, type: "error", ...options }),
    info: (title, message, options = {}) =>
      showToast({ title, message, type: "info", ...options })
  }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};