# Zalomi School of Skills - Website Build Plan

**Stack:** React Native + Expo (JavaScript), one codebase for Web, Android and iOS.
**Rule:** desktop (>=1024 px) follows the supplied designs; tablet and phone re-flow the same content into stacked layouts.

## 1. Sitemap (from your design documents)
| Route | Screen | Source design |
|---|---|---|
| `/` | Home | home_page.pdf + home_page_moving_icon.png |
| `/about` | About Us | about_us_page.pdf |
| `/courses` | Courses & Program (11 courses + 5 programs) | courses___programs_page.pdf |
| `/courses/:slug` | Course detail (Learn More) | derived |
| `/career-labs` | Career Labs | career_labs_page.pdf |
| `/academy` | Academy | academy_page.pdf |
| `/zalomi-care` | Zalomi Care | zalomi_care_page.pdf |
| `/study-abroad` | Study Abroad (+ destination carousel) | study_abroad_page.pdf |
| `/blog`, `/blog/:slug` | News, Blogs & Events + detail | BLOGS_PAGE.pdf |
| `/faq` | FAQ accordion | FAQ_PAGE.pdf |
| `/contact` | Contact form, map, campus | CONTACT_US_PAGE.pdf |
| `/admission` | Admission form + **online payment** | added (payment gateway) |
| `/payment-result` | Success / failure | added |
| `/student-portal` | Login screen (or link to your portal) | nav pill in all designs |
| `/legal/privacy`, `/legal/terms` | Footer links | footer in all designs |

## 2. Architecture
```
App.js                      fonts, router, page shell (header + screen + footer)
src/config.js               contact details, API URL, fee, social links   <- edit here
src/theme/                  colours, Montserrat fonts, useLayout() breakpoints, UI kit, image map
src/components/             Header (dropdowns + mobile menu), Footer, PageHero, MovingIcons, cards, Field
src/screens/                one file per page
src/data/                   courses, blog posts, FAQ, navigation (content lives here, not in screens)
src/navigation/Router.js    dependency-free router (URL hash on web, history stack on native)
src/services/               api.js + payment.web.js / payment.native.js
assets/images/              optimised images cut from your PDFs, logo, moving-icon art
server/                     Node/Express: contact form + Razorpay payments + webhook
```

## 3. Responsive strategy
- `useLayout()` -> `isMobile (<700)`, `isTablet (700-1023)`, `isDesktop (>=1024)`; font sizes scale slightly between 1024 and 1440 px.
- Desktop: text is overlaid on the banner images exactly like the designs. Tablet/phone: text block first, image below.
- Card grids: 4 or 5 columns -> 2 -> 1. Header: full menu -> hamburger with accordion.
- Whole site is a centred frame, max width 1600 px.

## 4. Payment gateway (Razorpay - India, UPI/cards/net-banking/wallets)
1. User fills the Admission form (course optional) and presses **Pay**.
2. App sends only the **course slug** to the server; the **server decides the amount** (`server/fees.js`, `REGISTRATION_FEE`).
3. Web: server creates an Order -> Razorpay Checkout pop-up -> signature verified on the server (`/verify`).
4. Android/iOS: server creates a hosted Payment Link -> opens in the in-app browser -> app checks `/link-status`.
5. Webhook (`/api/payments/webhook`) confirms payments even if the user closes the tab.
6. Payments and enquiries are stored in `server/data/*.json` (replace with a real DB when you go live).

## 5. Build phases / checklist
1. [x] Extract images + logo from the PDFs, optimise (about 6 MB total)
2. [x] Theme, router, UI kit, header/footer
3. [x] All 11 design pages + detail pages
4. [x] Responsive rules
5. [x] Payment + contact backend
6. [ ] **You:** install, run, add real content (see README "Content to replace")
7. [ ] **You:** Razorpay test keys -> test payment -> live keys
8. [ ] **You:** deploy web (static) + server, build apps with EAS
