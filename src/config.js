// ---------------------------------------------------------------
//  Central site configuration - edit this file, not the screens.
// ---------------------------------------------------------------
export const CONFIG = {
  // Empty uses the current origin (Firebase Hosting rewrites /api/contact).
  // Set EXPO_PUBLIC_API_URL in .env to use a separate/local API server.
  apiUrl: process.env.EXPO_PUBLIC_API_URL || '',

  // If you already have a student-portal / LMS, put its URL here.
  // The "Student Portal" button will open it. Leave empty to use the built-in login screen.
  portalUrl: '',

  contact: {
    address: ['Zalomi Tower, Behind Bus station,', 'Kottakkal, Malappuram, Kerala.'],
    phone: '+91 09999999999',
    whatsapp: '+91 09999999999',
    email: 'info@zalomiacademy.com',
  },

  // Social links (replace with the real pages)
  social: {
    twitter: 'https://twitter.com/',
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },

  payment: {
    currency: 'INR',
    // Admission / registration fee charged on the Admission page (in rupees).
    registrationFee: 500,
    // Brand name shown in the payment pop-up
    brandName: 'Zalomi School of Skills',
  },
};
