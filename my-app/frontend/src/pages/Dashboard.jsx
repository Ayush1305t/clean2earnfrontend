import {
  ArrowRight,
  Award,
  Camera,
  CheckCircle2,
  Coins,
  Gift,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SiteNavbar from "../component/SiteNavbar";

const stats = [
  {
    title: "Total Coins",
    value: "180",
    note: "+24 this week",
    icon: Coins,
    accent: "from-amber-300 to-yellow-500",
  },
  {
    title: "Cleanups",
    value: "42",
    note: "7 verified this month",
    icon: Camera,
    accent: "from-green-300 to-emerald-500",
  },
  {
    title: "City Rank",
    value: "#15",
    note: "Top 8% of cleaners",
    icon: Trophy,
    accent: "from-lime-300 to-green-500",
  },
  {
    title: "Today's Goal",
    value: "1/2",
    note: "1 cleanup left today",
    icon: Target,
    accent: "from-cyan-300 to-emerald-500",
  },
];

const milestones = [
  { label: "Weekly streak", value: "6 days", helper: "Stay active for 1 more day" },
  { label: "Areas transformed", value: "18", helper: "Across Bangalore hotspots" },
  { label: "Verified impact", value: "96%", helper: "High trust recognition rate" },
];

const activities = [
  {
    title: "MG Road, Bangalore",
    time: "2 hours ago",
    coins: "+10",
    detail: "Plastic waste cleared and roadside restored",
    positive: true,
  },
  {
    title: "Connaught Place, Delhi",
    time: "Yesterday",
    coins: "+20",
    detail: "Double reward for a community cleanup challenge",
    positive: true,
  },
  {
    title: "Partner reward redeemed",
    time: "2 days ago",
    coins: "-200",
    detail: "20% discount unlocked with your saved coins",
    positive: false,
  },
];

const leaderboard = [
  { name: "Aarav", score: 260, badge: "Neighborhood Hero" },
  { name: "You", score: 180, badge: "Rising Eco Star" },
  { name: "Diya", score: 170, badge: "Weekend Warrior" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const progressPercent = 90;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234ade80' stop-opacity='0.08'/%3E%3Cstop offset='100%25' stop-color='%2310b981' stop-opacity='0.02'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1400' height='900' fill='url(%23g)'/%3E%3Ccircle cx='180' cy='220' r='130' fill='%234ade80' opacity='0.05'/%3E%3Ccircle cx='1160' cy='180' r='160' fill='%2310b981' opacity='0.04'/%3E%3Cpath d='M0 620 Q300 520 620 620 T1400 610 V900 H0 Z' fill='%234ade80' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/75 to-black/95" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-10 top-24 h-44 w-44 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute bottom-16 right-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <SiteNavbar active="Dashboard" ctaLabel="Start Cleaning" ctaPath="/clean" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="overflow-hidden rounded-[28px] border border-green-500/20 bg-gradient-to-br from-gray-900/70 via-black/70 to-emerald-950/50 p-6 shadow-2xl shadow-green-900/20 backdrop-blur-xl md:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300">
                <Sparkles size={16} />
                AI verified profile
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                <TrendingUp size={16} className="text-green-300" />
                +12% stronger than last week
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-green-300/80">
                Welcome Back
              </p>
              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                Your cleanup journey is creating
                <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                  {" "}
                  visible impact.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 md:text-lg">
                You are just 20 coins away from your next reward, and your recent
                cleanup streak is helping your city rank climb faster.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {milestones.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                >
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-green-300">{item.helper}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/clean")}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-4 font-bold text-black shadow-lg shadow-green-500/40 transition-all duration-300 hover:from-green-300 hover:to-emerald-400 active:scale-95"
              >
                <Camera size={20} className="transition-transform duration-300 group-hover:scale-110" />
                Start New Cleanup
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-green-400/30 bg-white/5 px-6 py-4 font-semibold text-green-200 transition-all duration-300 hover:border-green-400/60 hover:bg-green-500/10"
              >
                <Gift size={20} />
                Explore Rewards
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                  Reward Progress
                </p>
                <h2 className="mt-3 text-2xl font-black text-white">20 coins to go</h2>
              </div>
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-3 text-green-300">
                <Award size={26} />
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-5">
              <p className="text-sm font-medium text-gray-300">Next unlock</p>
              <p className="mt-2 text-3xl font-black text-white">20% partner discount</p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Redeem at your favorite eco-conscious food and shopping partners.
              </p>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-gray-400">180 / 200 coins</span>
                <span className="font-semibold text-green-300">{progressPercent}%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-800/90">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 shadow-lg shadow-green-500/30"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "Complete one more verified cleanup today",
                "Redeem after your next successful submission",
                "Maintain your streak for bonus coins",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-300" />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ title, value, note, icon: Icon, accent }) => (
            <div
              key={title}
              className="group rounded-[24px] border border-white/10 bg-gradient-to-br from-gray-900/80 to-black/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-500/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{title}</p>
                  <h3 className="mt-3 text-4xl font-black text-white">{value}</h3>
                </div>
                <div className={`rounded-2xl bg-gradient-to-br ${accent} p-3 text-black shadow-lg`}>
                  <Icon size={22} />
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-green-300">{note}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                  Recent Activity
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Every cleanup adds to your story
                </h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-green-300">
                <MapPin size={22} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {activities.map((item) => (
                <div
                  key={`${item.title}-${item.time}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 transition-colors duration-300 hover:border-green-500/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-lg font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-gray-400">{item.time}</p>
                      <p className="mt-3 text-sm leading-6 text-gray-300">{item.detail}</p>
                    </div>
                    <div
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                        item.positive
                          ? "border border-green-500/30 bg-green-500/15 text-green-300"
                          : "border border-red-500/30 bg-red-500/15 text-red-300"
                      }`}
                    >
                      {item.coins} coins
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 backdrop-blur-xl md:p-7">
              <p className="text-sm uppercase tracking-[0.3em] text-green-300/80">
                Weekend Challenge
              </p>
              <h2 className="mt-3 text-3xl font-black text-white">
                Clean 2 locations.
                <br />
                Earn a 30-coin boost.
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                You have already completed one location today. Finish one more to
                unlock the bonus.
              </p>
              <button
                onClick={() => navigate("/clean")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-green-400/30 bg-black/30 px-5 py-3 font-semibold text-green-200 transition-all duration-300 hover:border-green-400/60 hover:bg-black/40"
              >
                Join challenge
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                    Leaderboard Snapshot
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    You are closing in fast
                  </h2>
                </div>
                <Trophy size={24} className="text-green-300" />
              </div>

              <div className="mt-6 space-y-3">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.name}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${
                      entry.name === "You"
                        ? "border-green-500/40 bg-green-500/10"
                        : "border-white/10 bg-black/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-black text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white">{entry.name}</p>
                        <p className="text-sm text-gray-400">{entry.badge}</p>
                      </div>
                    </div>
                    <p className="font-black text-green-300">{entry.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
