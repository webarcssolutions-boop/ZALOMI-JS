// iOS / Android: opens a Razorpay-hosted Payment Link in the in-app browser.
// (Works in Expo Go. For a fully native checkout, use react-native-razorpay in a development build.)
import * as WebBrowser from 'expo-web-browser';
import { api } from './api';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function startPayment({ courseSlug, name, email, phone, description }) {
  const link = await api.createPaymentLink({ courseSlug, name, email, phone, description });
  await WebBrowser.openBrowserAsync(link.shortUrl);
  // The browser was closed - ask the server whether the link got paid.
  for (let i = 0; i < 4; i += 1) {
    const st = await api.linkStatus(link.id);
    if (st.status === 'paid') return { status: 'success', paymentId: st.paymentId, orderId: link.id };
    if (st.status === 'cancelled' || st.status === 'expired') return { status: 'failed' };
    await wait(1500);
  }
  return { status: 'cancelled' };
}
