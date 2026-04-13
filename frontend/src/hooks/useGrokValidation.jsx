import { useState } from "react";
import { grokService } from "../services/grokService";

const useGrokValidation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const validate = async (beforeImage, afterImage) => {
    setLoading(true);
    try {
      const res = await grokService(beforeImage, afterImage);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult("Error");
    }
    setLoading(false);
  };

  return { loading, result, validate };
};

export default useGrokValidation;
