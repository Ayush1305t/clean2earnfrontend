import { useState, useRef, useCallback } from "react";

const useCamera = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null); // { dataUrl, blob, meta }
  const [locationMeta, setLocationMeta] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Request geolocation
  const fetchLocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation not supported");
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
            accuracy: Math.round(pos.coords.accuracy),
          };
          setLocationMeta(loc);
          resolve(loc);
        },
        (err) => {
          setLocationError(err.message);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      // Try to get rear/back camera (environment facing)
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 }, 
            height: { ideal: 720 } 
          },
          audio: false,
        });
      } catch (err) {
        // Fallback to any available camera if rear camera not found
        console.warn("Rear camera not found, using default camera");
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
      }
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsStreaming(true);
      // Check which camera is being used
      const videoTrack = stream.getVideoTracks()[0];
      console.log("Camera being used:", videoTrack.getSettings().facingMode);
      // Pre-fetch location while camera is loading
      fetchLocation();
    } catch (err) {
      console.error("Camera error:", err);
      throw new Error("Could not access camera. Please allow camera permissions.");
    }
  }, [fetchLocation]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  // Capture a frame from the video
  const capturePhoto = useCallback(async () => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    // Build timestamp metadata
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });

    // Refresh location at capture time
    const loc = await fetchLocation();

    const meta = {
      date: dateStr,
      time: timeStr,
      isoTimestamp: now.toISOString(),
      location: loc,
    };

    // Convert dataUrl -> Blob for backend AI verification
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    const photo = { dataUrl, blob, meta };
    setCapturedPhoto(photo);
    return photo;
  }, [fetchLocation]);

  const clearPhoto = useCallback(() => {
    setCapturedPhoto(null);
  }, []);

  return {
    videoRef,
    isStreaming,
    capturedPhoto,
    locationMeta,
    locationError,
    startCamera,
    stopCamera,
    capturePhoto,
    clearPhoto,
  };
};

export default useCamera;
