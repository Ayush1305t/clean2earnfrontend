const Verification = require("../models/Verification");
const User = require("../models/User");
const { requestCleaningVerification } = require("../services/groqService");

const DAILY_LIMIT = 2;
const CLEANUP_REWARD_COINS = 25;
const CLEANUP_REWARD_IMPACT = 15;

const parseVerificationPayload = (rawResult) => {
  const cleaned = String(rawResult)
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleaned);
};

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// Reverse geocoding function to get city name from coordinates
const getLocationLabel = async (meta = {}) => {
  const location = meta.location;

  if (!location?.latitude || !location?.longitude) {
    return "Location unavailable";
  }

  try {
    // Use Nominatim (OpenStreetMap) for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`,
      {
        headers: {
          "User-Agent": "Eco-Coins-App/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();

    // Try to get the city name, falling back to address components
    const cityName =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      data.name ||
      `Lat ${location.latitude.toFixed(2)}, Lon ${location.longitude.toFixed(2)}`;

    return cityName;
  } catch (error) {
    console.error("Geocoding error:", error);
    // Fall back to coordinates if geocoding fails
    return `Lat ${location.latitude.toFixed(2)}, Lon ${location.longitude.toFixed(2)}`;
  }
};

const countTodayVerifiedCleanups = async (userId) => {
  const { start, end } = getTodayRange();

  return Verification.countDocuments({
    user: userId,
    verdict: "CLEANED",
    createdAt: { $gte: start, $lte: end },
  });
};

const verifyCleanup = async (req, res) => {
  try {
    const { beforeImage, afterImage, beforeMeta = {}, afterMeta = {} } = req.body;

    if (!beforeImage || !afterImage) {
      return res.status(400).json({
        error: "Both images are required.",
      });
    }

    const currentCount = await countTodayVerifiedCleanups(req.user._id);

    if (currentCount >= DAILY_LIMIT) {
      return res.status(403).json({
        error: "Daily cleanup limit reached. You can submit again tomorrow.",
      });
    }

    const rawResult = await requestCleaningVerification({
      beforeImage,
      afterImage,
      beforeMeta,
      afterMeta,
    });

    let parsed;
    try {
      parsed = parseVerificationPayload(rawResult);
    } catch {
      parsed = {
        verdict: "FRAUD_DETECTED",
        confidence: "LOW",
        details: "AI response could not be parsed.",
      };
    }

    const verdict = parsed.verdict || "FRAUD_DETECTED";
    const isApproved = verdict === "CLEANED";
    const activityLocation = await getLocationLabel(afterMeta);
    const coinsEarned = isApproved ? CLEANUP_REWARD_COINS : 0;

    await Verification.create({
      user: req.user._id,
      verdict,
      confidence: parsed.confidence || "LOW",
      details: parsed.details || "",
      coinsEarned,
      activityLocation,
      beforeMeta,
      afterMeta,
    });

    let updatedUser = null;
    let todayMissions = currentCount;

    if (isApproved) {
      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: {
            ecoCoins: CLEANUP_REWARD_COINS,
            cleanups: 1,
            impactScore: CLEANUP_REWARD_IMPACT,
          },
          $push: {
            activities: {
              location: activityLocation,
              coins: CLEANUP_REWARD_COINS,
              createdAt: new Date(),
            },
          },
        },
        { new: true }
      );

      todayMissions += 1;
    } else {
      updatedUser = await User.findById(req.user._id);
    }

    return res.json({
      ...parsed,
      awardedCoins: coinsEarned,
      todayMissions,
      hasDailyLimitReached: todayMissions >= DAILY_LIMIT,
      updatedStats: updatedUser
        ? {
          coins: updatedUser.ecoCoins,
          cleanups: updatedUser.cleanups,
          impact: updatedUser.impactScore,
          recentActivity: updatedUser.activities.slice(-5).reverse(),
        }
        : null,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Verify cleanup error:", error);
    return res.status(500).json({
      error: error.message || "Server error during verification.",
    });
  }
};

module.exports = { verifyCleanup };