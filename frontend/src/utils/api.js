const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const getConfiguredBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL?.trim();
  if (configured) {
    return trimTrailingSlash(configured);
  }

  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:3001`;
  }

  return '';
};

export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getConfiguredBaseUrl();
  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
};

export const parseApiResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return {
    message: text || 'Unexpected server response',
  };
};

export const getAuthToken = () => localStorage.getItem('eco_token') || localStorage.getItem('token');

export const getNetworkErrorMessage = (error, fallbackMessage) => {
  if (error instanceof TypeError) {
    return 'Cannot reach the backend server. Make sure the backend is running on port 3001.';
  }

  return fallbackMessage;
};
