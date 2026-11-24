// Determine whether the app is running in portfolio demo mode.
// 1. Explicit override via VITE_DEMO_MODE=true.
// 2. In production (e.g. Vercel deployment), if VITE_API_URL is missing or points to localhost/127.0.0.1,
//    demo mode is automatically enabled so that the deployed site never attempts to call a local backend.
// 3. In local development (import.meta.env.DEV), demo mode is false by default so that full-stack
//    development with Express and MongoDB works seamlessly.
export const isDemoMode = (() => {
  if (import.meta.env.VITE_DEMO_MODE === 'true') return true;
  if (import.meta.env.DEV) return false;
  const configured = (import.meta.env.VITE_API_URL || '').trim();
  if (!configured) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configured)) return true;
  return false;
})();

const resolveApiUrl = () => {
  if (isDemoMode) return '';
  const base = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '')).trim().replace(/\/+$/, '');
  if (!base) return '';
  return base.endsWith('/api') ? base : `${base}/api`;
};

export const API_URL = resolveApiUrl();

export function studentStorageKey(base, email) {
  const normalizedEmail = String(email || 'guest').trim().toLowerCase();
  return `${base}:${normalizedEmail}`;
}

export async function apiRequest(path, options = {}) {
  if (isDemoMode) {
    throw new Error('PlacePoint is running in portfolio demo mode. Backend API and database are available in local development.');
  }

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
      ? `Cannot reach the PlacePoint API at ${API_URL}. Check that the backend is running locally and that MongoDB is active.`
      : error.message;
    throw new Error(detail);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(data.message || `API endpoint not found: ${options.method || 'GET'} ${endpoint}. Confirm that the PlacePoint backend is running.`);
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
  if (isDemoMode) return null;
  const profile = currentProfile();
  if (!profile?.email) return null;
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
