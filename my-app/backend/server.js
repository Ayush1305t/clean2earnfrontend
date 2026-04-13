const express = require("express");

process.loadEnvFile();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: "25mb" }));

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

const parseModelText = (raw = "") => {
  try {
    return JSON.parse(raw);
  } catch {
    const upper = raw.toUpperCase();
    if (upper.includes("NOT_CLEANED") || upper.includes("NOT CLEANED")) {
      return { verdict: "NOT_CLEANED", confidence: "LOW", details: raw };
    }
    if (upper.includes("FRAUD")) {
      return { verdict: "FRAUD_DETECTED", confidence: "LOW", details: raw };
    }
    return { verdict: "CLEANED", confidence: "LOW", details: raw || "Verification completed." };
  }
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/verify-cleaning", async (req, res) => {
  try {
    const apiKey =
      process.env.GROQ_API_KEY ||
      process.env.GROK_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Server Groq key missing. Add GROQ_API_KEY in backend.",
      });
    }

    const { beforeImage, afterImage, beforeMeta = {}, afterMeta = {} } = req.body || {};

    if (!beforeImage?.base64 || !afterImage?.base64) {
      return res.status(400).json({ error: "Both before and after images are required." });
    }

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: buildPrompt(beforeMeta, afterMeta),
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${beforeImage.mimeType};base64,${beforeImage.base64}`,
                  },
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${afterImage.mimeType};base64,${afterImage.base64}`,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const rawResponseText = await groqResponse.text();
    let data = {};

    try {
      data = rawResponseText ? JSON.parse(rawResponseText) : {};
    } catch {
      data = { raw: rawResponseText };
    }

    if (!groqResponse.ok) {
      const message =
        data?.error?.message ||
        data?.message ||
        data?.detail ||
        data?.raw ||
        `Groq request failed with status ${groqResponse.status}.`;
      return res.status(groqResponse.status).json({ error: message });
    }

    const raw = String(data?.choices?.[0]?.message?.content || "").trim();

    if (!raw) {
      return res.status(502).json({ error: "Groq returned an empty response." });
    }

    return res.json(parseModelText(raw));
  } catch (error) {
    console.error("Verify cleaning error:", error);
    return res.status(500).json({ error: error.message || "Server error during verification." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

