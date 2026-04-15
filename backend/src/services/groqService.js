const { createHttpError } = require("../models/verificationModel");
const { buildPrompt } = require("../utils/promptBuilder");

const parseGroqResponse = async (response) => {
  const rawResponseText = await response.text();

  try {
    return rawResponseText ? JSON.parse(rawResponseText) : {};
  } catch {
    return { raw: rawResponseText };
  }
};

const getApiKey = () => process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

const requestCleaningVerification = async ({
  beforeImage,
  afterImage,
  beforeMeta = {},
  afterMeta = {},
}) => {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw createHttpError(500, "Server Groq key missing. Add GROQ_API_KEY in backend.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
  });

  const data = await parseGroqResponse(response);

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.message ||
      data?.detail ||
      data?.raw ||
      `Groq request failed with status ${response.status}.`;

    throw createHttpError(response.status, message);
  }

  const raw = String(data?.choices?.[0]?.message?.content || "").trim();

  if (!raw) {
    throw createHttpError(502, "Groq returned an empty response.");
  }

  return raw;
};

module.exports = { requestCleaningVerification };
