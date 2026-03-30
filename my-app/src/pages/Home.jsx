import { Trophy, Camera } from "lucide-react";


const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-green-400">SwachhCoin</h1>

        <div className="flex gap-6 text-gray-300">
          <p className="hover:text-green-400 cursor-pointer">Home</p>
          <p>Dashboard</p>
          <p>Clean</p>
          <p>Leaderboard</p>
          <p>Rewards</p>
        </div>

        <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center mt-24 px-4">

        <p className="text-green-400 tracking-widest mb-4">
          SWACHHCOIN
        </p>

        <h1 className="text-5xl md:text-6xl font-bold">
          Clean India.{" "}
          <span className="text-green-400">Earn Rewards.</span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl">
          Snap before & after photos of your cleanup, get AI-verified,
          and earn coins redeemable for real discounts.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">

          <button className="bg-green-400 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            Start Cleaning <Camera size={18} />
          </button>

          <button className="border border-green-400 text-green-400 px-6 py-3 rounded-xl flex items-center gap-2">
            View Leaderboard <Trophy size={18} />
          </button>

        </div>
      </div>

    </div>
  );
};

export default Home;