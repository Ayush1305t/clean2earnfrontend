const User = require("../models/User");
const Verification = require("../models/Verification");

const LEADERBOARD_LIMIT = 5;

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const leaderboardSort = {
  ecoCoins: -1,
  impactScore: -1,
  cleanups: -1,
  createdAt: 1,
};

const buildLeaderboard = async () => {
  const leaders = await User.find({})
    .sort(leaderboardSort)
    .limit(LEADERBOARD_LIMIT)
    .select("name ecoCoins impactScore cleanups");

  return leaders.map((user, index) => ({
    rank: index + 1,
    name: user.name,
    coins: user.ecoCoins || 0,
    impact: user.impactScore || 0,
    cleanups: user.cleanups || 0,
  }));
};

const calculateRank = async (user) => {
  const ecoCoins = user.ecoCoins || 0;
  const impactScore = user.impactScore || 0;
  const cleanups = user.cleanups || 0;

  const usersAbove = await User.countDocuments({
    $or: [
      { ecoCoins: { $gt: ecoCoins } },
      { ecoCoins, impactScore: { $gt: impactScore } },
      {
        ecoCoins,
        impactScore,
        cleanups: { $gt: cleanups },
      },
      {
        ecoCoins,
        impactScore,
        cleanups,
        createdAt: { $lt: user.createdAt },
      },
    ],
  });

  return usersAbove + 1;
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { start, end } = getTodayRange();
    const todayMissions = await Verification.countDocuments({
      user: userId,
      verdict: "CLEANED",
      createdAt: { $gte: start, $lte: end },
    });
    const [leaderboard, rank] = await Promise.all([
      buildLeaderboard(),
      calculateRank(user),
    ]);

    const hasClaimedDaily = user.lastClaimedDailyMission && 
      user.lastClaimedDailyMission >= start && 
      user.lastClaimedDailyMission <= end;

    res.json({
      coins: user.ecoCoins,
      cleanups: user.cleanups,
      impact: user.impactScore,
      rank,
      activities: user.activities.slice(-5).reverse(),
      todayMissions,
      hasDailyLimitReached: todayMissions >= 2,
      hasClaimedDaily: !!hasClaimedDaily,
      leaderboard,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.claimDailyMission = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { start, end } = getTodayRange();
    
    const hasClaimedDaily = user.lastClaimedDailyMission && 
      user.lastClaimedDailyMission >= start && 
      user.lastClaimedDailyMission <= end;

    if (hasClaimedDaily) {
      return res.status(400).json({ message: "You have already claimed today's mission reward." });
    }

    const todayMissions = await Verification.countDocuments({
      user: userId,
      verdict: "CLEANED",
      createdAt: { $gte: start, $lte: end },
    });

    if (todayMissions < 2) {
       return res.status(400).json({ message: "You haven't completed 2 missions today yet." });
    }

    // Award 200 coins
    user.ecoCoins += 200;
    user.lastClaimedDailyMission = new Date();
    
    // Add to activity logs
    user.activities.push({
      location: "Daily Mission Bonus",
      coins: 200,
      createdAt: new Date()
    });

    await user.save();

    res.json({ message: "Claimed successfully! +200 ECO Coins", coins: user.ecoCoins });
  } catch (err) {
    console.error("Claim error:", err);
    res.status(500).json({ message: "Server error" });
  }
};