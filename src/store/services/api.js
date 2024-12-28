// src/services/api.js
const API_BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login';
    return;
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
