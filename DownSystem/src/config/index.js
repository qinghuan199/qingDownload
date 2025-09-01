// export const API_BASE_URL = window.CONFIG?.apiUrl;

export const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_BASE_API
    : window.CONFIG?.apiUrl || '/api';

