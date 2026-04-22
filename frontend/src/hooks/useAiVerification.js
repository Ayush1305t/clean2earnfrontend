import { useCallback, useState } from "react";
import { verifyCleaningPhotos } from "../services/verificationService";

const useAiVerification = () => {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const verify = useCallback(async (beforePhoto, afterPhoto) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await verifyCleaningPhotos(
        beforePhoto.dataUrl,
        afterPhoto.dataUrl,
        beforePhoto.meta,
        afterPhoto.meta,
      );

      setResult(response);
      setStatus("done");
      return response;
    } catch (nextError) {
      setError(nextError.message || "Verification failed");
      setStatus("error");
      throw nextError;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, verify, reset };
};

export default useAiVerification;