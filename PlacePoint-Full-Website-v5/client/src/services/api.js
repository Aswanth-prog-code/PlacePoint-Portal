const configuredApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').trim().replace(/\/+$/, '');
// Accept either the backend origin (https://api.example.com) or an API base
// that already ends in /api (https://api.example.com/api).
const API_URL = configuredApiUrl.endsWith('/api')
  ? configuredApiUrl
  : `${configuredApiUrl}/api`;

export function studentStorageKey(base, email) {
  const normalizedEmail = String(email || 'guest').trim().toLowerCase();
  return `${base}:${normalizedEmail}`;
}

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('placepoint-token');
  const endpoint = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
  let response;

  try {
    response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
  } catch (error) {
    const detail = error instanceof TypeError
      ? `Cannot reach the PlacePoint API at ${API_URL}. Check that the backend is deployed/running and that VITE_API_URL points to it.`
      : error.message;
    throw new Error(detail);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(data.message || `API endpoint not found: ${options.method || 'GET'} ${endpoint}. Confirm that the latest PlacePoint backend is deployed.`);
    }
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

export function currentProfile() {
  try { return JSON.parse(localStorage.getItem('placepoint-profile') || 'null'); }
  catch { return null; }
}

export async function saveProgressToServer(progress) {
  const profile = currentProfile();
  if (!profile?.email) return;
  const pendingKey = studentStorageKey('placepoint-pending-progress', profile.email);
  let pending = {};
  try { pending = JSON.parse(localStorage.getItem(pendingKey) || '{}'); } catch { pending = {}; }
  const merged = { ...pending, ...progress };
  try {
    const result = await apiRequest('/progress', { method: 'PUT', body: JSON.stringify(merged) });
    localStorage.removeItem(pendingKey);
    return result;
  } catch (error) {
    localStorage.setItem(pendingKey, JSON.stringify(merged));
    throw error;
  }
}
