import { CONFIG } from '../config';

async function request(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(CONFIG.apiUrl + path, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new Error('Cannot reach the server. Please check your connection and try again.');
  }
  let data = {};
  try { data = await res.json(); } catch (e) { /* empty body */ }
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export const api = {
  sendContact: (form) => request('/api/contact', { method: 'POST', body: form }),
  // Amount is decided by the SERVER from courseSlug (never trust the browser for prices)
  createOrder: (payload) => request('/api/payments/create-order', { method: 'POST', body: payload }),
  verifyPayment: (payload) => request('/api/payments/verify', { method: 'POST', body: payload }),
  createPaymentLink: (payload) => request('/api/payments/create-link', { method: 'POST', body: payload }),
  linkStatus: (id) => request('/api/payments/link-status/' + encodeURIComponent(id)),
};
