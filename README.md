<<<<<<< HEAD
# Zalomi School of Skills - Website (React Expo, JavaScript)

One codebase: **Web + Android + iOS**. Backend for payments / contact form is in `server/`.

## 1. Run the website
```bash
npm install
npx expo install --check      # aligns package versions with your Expo SDK (answer Yes if it asks)
cp .env.example .env          # set EXPO_PUBLIC_API_URL (backend address)
npx expo start --web          # website at http://localhost:8081
npx expo start                # scan the QR code with Expo Go for phone
```
Phone view in the browser: open DevTools -> device toolbar, or just narrow the window (< 700 px).

## 2. Run the backend (contact form + payments)
```bash
cd server
npm install
cp .env.example .env          # add Razorpay TEST keys
npm start                     # http://localhost:4000
```
Phone testing: set `EXPO_PUBLIC_API_URL` to your computer's LAN address, e.g. `http://192.168.1.10:4000`.

### Razorpay setup
1. Create a Razorpay account -> Settings -> API Keys -> generate **test** keys -> put in `server/.env`.
2. Set the fee in `server/.env` (`REGISTRATION_FEE`) and/or per course in `server/fees.js`.
3. (Recommended) Dashboard -> Webhooks -> URL `https://YOUR-SERVER/api/payments/webhook`, events `payment.captured`, `payment.failed`, `payment_link.paid`; put the secret in `RAZORPAY_WEBHOOK_SECRET`.
4. Test with Razorpay test cards/UPI, then switch to live keys.

## 3. Deploy
- **Web:** `npm run build:web` -> upload the `dist/` folder to any static host (Netlify, Vercel, Hostinger...). Uses hash URLs (`/#/courses`), so no server rewrite rules are needed.
- **Server:** deploy `server/` to Render / Railway / a VPS; put its https URL in `EXPO_PUBLIC_API_URL` before building the web/app, and in `CORS_ORIGINS` on the server.
- **Apps:** `npm i -g eas-cli` -> `eas build` for Play Store / App Store.

## 4. Content to replace (placeholders)
| What | Where |
|---|---|
| Phone numbers (+91 09999999999), address, email, social links, registration fee | `src/config.js` |
| Course syllabus bullets, duration, mode, fees | `src/data/courses.js` |
| FAQ answers (design had questions only) | `src/data/faq.js` |
| Blog article text | `src/data/blog.js` |
| Privacy / Terms text | `src/screens/Misc.js` |
| Student portal URL (if you have an LMS) | `src/config.js` -> `portalUrl` |
| Contact form email notification | `server/index.js` (TODO marker) |

## 5. Notes on the design conversion
- Images, logo and the diagonal "Bridging the Gap" cut-out were extracted from your PDFs (`assets/images`).
- **Icons** are drawn with the vector icon set (MaterialCommunityIcons) in the same navy-circle style, because the PDFs only contain them as flattened artwork. To use the exact originals, export them as PNG/SVG and swap them in `IconCircle` (`src/theme/ui.js`).
- The animated icon arc on the Home hero uses your `home_page_moving_icon.png`; it floats and a highlight ring moves icon to icon.
- Spelling fixed from the designs: Poratal->Portal, Addmission->Admission, Educatoion->Education, Guidence->Guidance, Contant->Content, Litaracy->Literacy, Languges->Languages, Couselling->Counselling, Psycometric->Psychometric, "Sent Us"->"Send Us", accomodation, experiance, enviornment, "Evey", "succes", "age of 13", "All rights reserved", etc.
- The course cards in the design were numbered "1., 2., 2., 2." (looks like a template slip), so numbers are not shown.
- Heading "Career Labs" button links to Contact; "Explore Your Options" links to Admission - change in the screen files if you prefer other targets.

## 6. Security notes
Amounts are computed on the server, payment signatures are verified on the server, and Razorpay secrets live only in `server/.env`. Never put the secret key in the Expo app.
=======
# ZALOMI-JS
>>>>>>> 614d5f5df3529350206501e1ce93f416682c8f2c
