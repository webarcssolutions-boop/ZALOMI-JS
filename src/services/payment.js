// Fallback entry. Metro automatically picks payment.web.js on web and payment.native.js on iOS/Android.
export { startPayment } from './payment.native';
