const toBase64 = (source) => {
  if (typeof source === "string" && source.startsWith("data:")) {
    return { base64: source.split(",")[1], mimeType: source.split(";")[0].split(":")[1] };
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

export const grokService = async (beforeImage, afterImage, beforeMeta = {}, afterMeta = {}) => {
  try {
    const before = await toBase64(beforeImage);
    const after = await toBase64(afterImage);

    const response = await fetch("/api/verify-cleaning", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        beforeImage: before,
        afterImage: after,
        beforeMeta,
        afterMeta,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Verification failed");
    }

    return data;
  } catch (error) {
    console.error("Grok Error:", error);
    throw error;
  }
};
