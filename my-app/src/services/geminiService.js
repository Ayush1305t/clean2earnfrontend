import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, //in your .env file kept outside the src file and store VITE_GEMINI_API_KEY="Your Api key"
});

/**
 * Convert a dataUrl (base64) or Blob/File to base64 string.
 */
const toBase64 = (source) => {
  if (typeof source === "string" && source.startsWith("data:")) {
    // It's already a dataUrl — strip the prefix
    return { base64: source.split(",")[1], mimeType: source.split(";")[0].split(":")[1] };
  }
  // It's a Blob/File
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(source);
    reader.onload = () => {
      const dataUrl = reader.result;
      resolve({
        base64: dataUrl.split(",")[1],
        mimeType: dataUrl.split(";")[0].split(":")[1],
      });
    };
    reader.onerror = reject;
  });
};

/**
 * @param {string|Blob} beforeImage  - dataUrl string or Blob
 * @param {string|Blob} afterImage   - dataUrl string or Blob
 * @param {object} beforeMeta        - { date, time, location }
 * @param {object} afterMeta         - { date, time, location }
 * @returns {Promise<{verdict: string, confidence: string, details: string}>}
 */
export const geminiService = async (beforeImage, afterImage, beforeMeta = {}, afterMeta = {}) => {
  try {
    const before = await toBase64(beforeImage);
    const after = await toBase64(afterImage);

    const buildLocationStr = (meta) => {
      if (!meta) return "unknown";
      const loc = meta.location
        ? `Lat ${meta.location.latitude}, Lon ${meta.location.longitude} (±${meta.location.accuracy}m)`
        : "location unavailable";
      return `Date: ${meta.date || "N/A"}, Time: ${meta.time || "N/A"}, GPS: ${loc}`;
    };

    const prompt = `You are a strict cleaning validation AI for the Rewards – Clean India initiative.

BEFORE photo metadata: ${buildLocationStr(beforeMeta)}
AFTER photo metadata: ${buildLocationStr(afterMeta)}

Analyse the two images carefully:
- Image 1 (BEFORE cleaning): Shows the area before cleanup
- Image 2 (AFTER cleaning): Shows the area after cleanup

Evaluate:
1. Is the area visibly cleaner in the AFTER photo compared to BEFORE?
2. Are both photos of the same or very similar location?
3. Is there any sign of fraud (e.g., photos taken in different places, showing a clean area in BEFORE)?

Respond ONLY in the following JSON format (no markdown, no extra text):
{
  "verdict": "CLEANED" or "NOT_CLEANED" or "FRAUD_DETECTED",
  "confidence": "HIGH" or "MEDIUM" or "LOW",
  "details": "One sentence explaining your decision"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: before.mimeType, data: before.base64 } },
            { inlineData: { mimeType: after.mimeType, data: after.base64 } },
            { text: prompt },
          ],
        },
      ],
    });

    const raw = response.candidates[0].content.parts[0].text.trim();

    // Try to parse JSON
    try {
      const parsed = JSON.parse(raw);
      return parsed;
    } catch {
      // Fallback: extract verdict from raw text
      const upper = raw.toUpperCase();
      if (upper.includes("NOT_CLEANED") || upper.includes("NOT CLEANED")) {
        return { verdict: "NOT_CLEANED", confidence: "LOW", details: raw };
      }
      if (upper.includes("FRAUD")) {
        return { verdict: "FRAUD_DETECTED", confidence: "LOW", details: raw };
      }
      return { verdict: "CLEANED", confidence: "LOW", details: raw };
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};