// src/services/api.js
const API_BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export async function fetchWithAuth(endpoint, options = {}) {
  let token = localStorage.getItem('token');

  if (!token) {
    alert('Oturumunuz sonlandı. Lütfen yeniden giriş yapın.');
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
      // Token yenileme işlemi
      const refreshResponse = await fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refreshToken'),
        }),
      });

      if (refreshResponse.ok) {
        const { token: newToken } = await refreshResponse.json();
        localStorage.removeItem('token');
        localStorage.setItem('token', newToken);

        // Yeni token ile isteği tekrar yap
        headers.set('Authorization', `Bearer ${newToken}`);
        return fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
      } else {
        // Refresh token başarısızsa oturumu sonlandır
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        alert('Oturumunuzun süresi doldu. Lütfen yeniden giriş yapın.');
        window.location.href = '/login';
        return;
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Bir hata oluştu.');
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
