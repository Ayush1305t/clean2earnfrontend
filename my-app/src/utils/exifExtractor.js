/**
 * Simple utility to extract and format photo metadata
 * Includes: date, time, location, timestamp
 */

export const extractPhotoMetadata = (photo) => {
  if (!photo || !photo.meta) return null;

  const { date, time, isoTimestamp, location } = photo.meta;

  return {
    date,
    time,
    isoTimestamp,
    location: location ? {
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy,
      formatted: `${location.latitude}, ${location.longitude} (±${location.accuracy}m)`
    } : null,
    hasLocation: !!location
  };
};

export const formatMetadata = (meta) => {
  if (!meta) return {};

  return {
    dateTime: `${meta.date} at ${meta.time}`,
    coordinates: meta.location?.formatted || "Location not available",
    timestamp: new Date(meta.isoTimestamp).getTime(),
  };
};

export const getLocationStatus = (locationMeta, locationError) => {
  if (locationMeta) {
    return {
      status: "success",
      message: `GPS: ${locationMeta.latitude}, ${locationMeta.longitude} (±${locationMeta.accuracy}m)`,
      color: "green"
    };
  }
  if (locationError) {
    return {
      status: "error",
      message: `Location: ${locationError}`,
      color: "red"
    };
  }
  return {
    status: "pending",
    message: "Requesting location access...",
    color: "gray"
  };
};
