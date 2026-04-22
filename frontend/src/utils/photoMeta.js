export const formatLocationText = (locationMeta, locationError) => {
  if (locationMeta) {
    return `GPS: ${locationMeta.latitude}, ${locationMeta.longitude} (+/-${locationMeta.accuracy}m)`;
  }

  if (locationError) {
    return `Location: ${locationError}`;
  }

  return "Requesting location access...";
};

export const formatPhotoMeta = (meta = {}) => {
  const date = meta.date || "N/A";
  const time = meta.time || "N/A";
  const location = meta.location
    ? `${meta.location.latitude}, ${meta.location.longitude}`
    : "Location unavailable";

  return { date, time, location };
};