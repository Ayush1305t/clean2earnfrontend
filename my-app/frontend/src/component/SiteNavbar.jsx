import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Clean", path: "/clean" },
  { label: "Leaderboard", path: "/dashboard" },
  //{ label: "Rewards", path: "/dashboard" },
];

export default function SiteNavbar({
  active = "",
  ctaLabel = "Sign In",
  ctaPath = "/dashboard",
  rightSlot = null,
}) {
  const navigate = useNavigate();

  return (
    <nav className="relative sticky top-0 z-50 border-b border-gray-700/30 bg-black/40 px-5 py-4 backdrop-blur-lg md:px-8 md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/30">
            <Leaf size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight md:text-2xl">
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Clean2Earn
            </span>
          </h1>
        </button>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = item.label === active;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`transition-colors duration-300 ${
                  isActive
                    ? "text-green-300"
                    : "text-gray-400 hover:text-green-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {rightSlot}
          <button
            onClick={() => navigate(ctaPath)}
            className="rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-2 text-sm font-bold text-black shadow-lg shadow-green-500/40 transition-all duration-300 hover:from-green-300 hover:to-emerald-400 active:scale-95 md:px-6 md:py-2.5"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </nav>
  );
}
