const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  async getWeather(lat?: number, lon?: number, city?: string) {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat.toString());
    if (lon) params.append('lon', lon.toString());
    if (city) params.append('city', city);

    const response = await fetch(
      `${API_BASE_URL}/weather/?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    return response.json();
  },

  async getFashionTrends(category?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);

    const response = await fetch(
      `${API_BASE_URL}/fashion/trends?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch fashion trends');
    }
    return response.json();
  },
};
