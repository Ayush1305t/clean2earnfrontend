import { getApiUrl, parseApiResponse } from '../utils/api';

export const buildApiUrl = (path) => getApiUrl(path);

const api = {
  async get(path, options = {}) {
    const response = await fetch(buildApiUrl(path), {
      method: 'GET',
      headers: options.headers || {},
    });

    const data = await parseApiResponse(response);

    if (!response.ok) {
      const error = new Error(data.message || data.error || 'Request failed');
      error.response = { data, status: response.status };
      throw error;
    }

    return { data, status: response.status };
  },
};

export default api;
