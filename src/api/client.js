const TOKEN_KEY = 'fpt_token';

async function parseBody(res) {
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function request(path, { method = 'GET', body, headers } = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${process.env.REACT_APP_API_URL || ''}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await parseBody(res);
  if (!res.ok) {
    const error = new Error(data.message || `Request failed (${res.status})`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export function storeToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export const api = {
  register: (body) => request('/api/auth/register', { method: 'POST', body }),
  login: (body) => request('/api/auth/login', { method: 'POST', body }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  me: () => request('/api/auth/me'),
  getSubscription: () => request('/api/billing/subscription'),
  getInvoices: () => request('/api/billing/invoices'),
  createPortal: () => request('/api/billing/portal', { method: 'POST' }),
  sendContact: (body) => request('/api/contact', { method: 'POST', body }),
};
