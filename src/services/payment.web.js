// Razorpay Standard Checkout for the web build.
import { CONFIG } from '../config';
import { api } from './api';

let scriptPromise;
function loadCheckout() {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = resolve;
      s.onerror = () => { scriptPromise = null; reject(new Error('Could not load the payment window. Check your internet connection.')); };
      document.body.appendChild(s);
    });
  }
  return scriptPromise;
}

/** @returns {Promise<{status:'success'|'failed'|'cancelled', paymentId?:string, orderId?:string, message?:string}>} */
export async function startPayment({ courseSlug, name, email, phone, description }) {
  await loadCheckout();
  const order = await api.createOrder({ courseSlug, name, email, phone });
  return new Promise((resolve) => {
    const rzp = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,
      name: CONFIG.payment.brandName,
      description: description || 'Admission fee',
      prefill: { name, email, contact: phone },
      notes: { courseSlug: courseSlug || 'registration' },
      theme: { color: '#222F63' },
      modal: { ondismiss: () => resolve({ status: 'cancelled' }) },
      handler: async (resp) => {
        try {
          await api.verifyPayment({
            razorpay_order_id: resp.razorpay_order_id,
            razorpay_payment_id: resp.razorpay_payment_id,
            razorpay_signature: resp.razorpay_signature,
          });
          resolve({ status: 'success', paymentId: resp.razorpay_payment_id, orderId: resp.razorpay_order_id });
        } catch (e) {
          resolve({ status: 'failed', message: e.message });
        }
      },
    });
    rzp.on('payment.failed', (r) => resolve({ status: 'failed', message: r && r.error && r.error.description }));
    rzp.open();
  });
}
