const buildLocationStr = (meta = {}) => {
  const loc = meta.location
    ? `Lat ${meta.location.latitude}, Lon ${meta.location.longitude} (+/-${meta.location.accuracy}m)`
    : "location unavailable";

  return `Date: ${meta.date || "N/A"}, Time: ${meta.time || "N/A"}, GPS: ${loc}`;
};

const buildPrompt = (beforeMeta = {}, afterMeta = {}) => `You are a strict cleaning validation AI for the Rewards - Clean India initiative.

BEFORE photo metadata: ${buildLocationStr(beforeMeta)}
AFTER photo metadata: ${buildLocationStr(afterMeta)}

Analyse the two images carefully:
- Image 1 (BEFORE cleaning): Shows the area before cleanup
- Image 2 (AFTER cleaning): Shows the area after cleanup

Evaluate:
1. Is the area visibly cleaner in the AFTER photo compared to BEFORE?
2. Are both photos of the same or very similar location?
3. Is there any sign of fraud?

Respond ONLY in the following JSON format (no markdown, no extra text):
{
  "verdict": "CLEANED" or "NOT_CLEANED" or "FRAUD_DETECTED",
  "confidence": "HIGH" or "MEDIUM" or "LOW",
  "details": "One sentence explaining your decision"
}`;

module.exports = { buildPrompt, buildLocationStr };
