
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  ecoCoins: {
    type: Number,
    default: 0,
  },

  cleanups: {
    type: Number,
    default: 0,
  },

  impactScore: {
    type: Number,
    default: 0,
  },

  activities: [
    {
      location: String,
      coins: Number,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  lastClaimedDailyMission: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);