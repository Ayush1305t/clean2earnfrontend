import { useCallback, useRef, useState } from "react";

const buildTimestamp = () => {
  const now = new Date();

  return {
    date: now.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    isoTimestamp: now.toISOString(),
  };
};

const getRearCameraDeviceId = async () => {
  if (!navigator.mediaDevices?.enumerateDevices) return null;

  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoInputs = devices.filter((device) => device.kind === "videoinput");

  const rearCamera = videoInputs.find((device) =>
    /(back|rear|environment)/i.test(device.label),
  );

  return rearCamera?.deviceId || null;
};

const useCamera = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [locationMeta, setLocationMeta] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const fetchLocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        const error = "Geolocation not supported";
        setLocationError(error);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nextLocation = {
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
            accuracy: Math.round(position.coords.accuracy),
          };

          setLocationMeta(nextLocation);
          setLocationError(null);
          resolve(nextLocation);
        },
        (error) => {
          setLocationError(error.message);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
        },
      );
    });
  }, []);

  const startCamera = useCallback(async () => {
    try {
      let stream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch {
        const rearDeviceId = await getRearCameraDeviceId();

        if (rearDeviceId) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: rearDeviceId },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
        } else {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: "environment" },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
        }
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsStreaming(true);
      fetchLocation();
    } catch {
      throw new Error("Could not access rear camera. Please allow camera permission and try again.");
    }
  }, [fetchLocation]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const timestamp = buildTimestamp();
    const location = await fetchLocation();

    return {
      dataUrl,
      meta: {
        ...timestamp,
        location,
      },
    };
  }, [fetchLocation]);

  return {
    videoRef,
    isStreaming,
    locationMeta,
    locationError,
    startCamera,
    stopCamera,
    capturePhoto,
  };
};

export default useCamera;