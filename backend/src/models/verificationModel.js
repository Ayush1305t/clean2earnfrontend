const DEFAULT_SUCCESS_MESSAGE = "Verification completed.";

const createHttpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateVerificationRequest = (body = {}) => {
  const { beforeImage, afterImage, beforeMeta = {}, afterMeta = {} } = body;

  if (!beforeImage?.base64 || !afterImage?.base64) {
    throw createHttpError(400, "Both before and after images are required.");
  }

  return { beforeImage, afterImage, beforeMeta, afterMeta };
};

const normalizeVerificationResult = (raw = "") => {
  try {
    return JSON.parse(raw);
  } catch {
    const upper = String(raw).toUpperCase();

    if (upper.includes("NOT_CLEANED") || upper.includes("NOT CLEANED")) {
      return { verdict: "NOT_CLEANED", confidence: "LOW", details: raw };
    }

    if (upper.includes("FRAUD")) {
      return { verdict: "FRAUD_DETECTED", confidence: "LOW", details: raw };
    }

    return {
      verdict: "CLEANED",
      confidence: "LOW",
      details: raw || DEFAULT_SUCCESS_MESSAGE,
    };
  }
};

module.exports = {
  createHttpError,
  validateVerificationRequest,
  normalizeVerificationResult,
};
