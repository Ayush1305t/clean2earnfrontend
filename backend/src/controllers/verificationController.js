const {
  validateVerificationRequest,
  normalizeVerificationResult,
} = require("../models/verificationModel");
const { requestCleaningVerification } = require("../services/groqService");

const getHealth = (_req, res) => {
  res.json({ ok: true });
};

const verifyCleaning = async (req, res) => {
  try {
    const payload = validateVerificationRequest(req.body);
    const result = await requestCleaningVerification(payload);

    return res.json(normalizeVerificationResult(result));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Verify cleaning error:", error);
    return res.status(500).json({
      error: error.message || "Server error during verification.",
    });
  }
};

module.exports = { getHealth, verifyCleaning };
