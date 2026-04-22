const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verdict: {
      type: String,
      enum: ["CLEANED", "NOT_CLEANED", "FRAUD_DETECTED"],
      default: "NOT_CLEANED",
    },
    confidence: {
      type: String,
      default: "LOW",
    },
    details: {
      type: String,
      default: "",
    },
    coinsEarned: {
      type: Number,
      default: 0,
    },
    activityLocation: {
      type: String,
      default: "Location unavailable",
    },
    beforeMeta: {
      type: Object,
      default: {},
    },
    afterMeta: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", verificationSchema);