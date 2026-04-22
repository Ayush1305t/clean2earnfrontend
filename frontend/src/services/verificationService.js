import { buildApiUrl } from "../lib/api";
import { getAuthToken } from "../utils/api";

const toBase64Payload = (source) => {
  if (typeof source === "string" && source.startsWith("data:")) {
    return {
      base64: source.split(",")[1],
      mimeType: source.split(";")[0].split(":")[1],
    };
  }

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

export const verifyCleaningPhotos = async (
  beforeImage,
  afterImage,
  beforeMeta = {},
  afterMeta = {},
) => {
  const token = getAuthToken();
  const before = await toBase64Payload(beforeImage);
  const after = await toBase64Payload(afterImage);

  const response = await fetch(buildApiUrl("/api/verify-cleaning"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      beforeImage: before,
      afterImage: after,
      beforeMeta,
      afterMeta,
    }),
  });

  const rawText = await response.text();
  let data = {};

  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = { error: rawText || "Server returned an invalid response." };
  }

  if (!response.ok) {
    throw new Error(data?.error || "Verification failed");
  }

  if (!rawText) {
    throw new Error("Server returned an empty response.");
  }

  return data;
};
