require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
const FEES = require('./fees');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const origins = (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true }));
// keep the raw body for webhook signature checks
app.use(express.json({ limit: '100kb', verify: (req, _res, buf) => { req.rawBody = buf; } }));

const razor = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;
const contactMailer = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_APP_PASSWORD
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_APP_PASSWORD },
    })
  : null;
const contactRecipient = process.env.CONTACT_TO_EMAIL || 'webarcssolutions@gmail.com';
const needRazor = (res) => {
  if (!razor) { res.status(503).json({ error: 'Payments are not configured yet.' }); return false; }
  return true;
};

// ---- tiny JSON-file store (swap for a real database in production) ----
function append(file, row) {
  const p = path.join(DATA_DIR, file);
  const rows = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
  rows.push(row);
  fs.writeFileSync(p, JSON.stringify(rows, null, 2));
}
function updateRow(file, match, patch) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return;
  const rows = JSON.parse(fs.readFileSync(p, 'utf8'));
  rows.forEach((r) => { if (match(r)) Object.assign(r, patch); });
  fs.writeFileSync(p, JSON.stringify(rows, null, 2));
}

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
const str = (v, n = 300) => String(v || '').trim().slice(0, n);
const amountFor = (slug) => Number(FEES[slug] || process.env.REGISTRATION_FEE || 500);

function customerFrom(b) {
  const c = { name: str(b.name, 100), email: str(b.email, 120), phone: str(b.phone, 20) };
  if (c.name.length < 2 || !emailOk(c.email) || c.phone.replace(/\D/g, '').length < 10) return null;
  return c;
}

app.get('/api/health', (_req, res) => res.json({ ok: true, payments: !!razor }));

// ---- Contact form ----
app.post('/api/contact', async (req, res) => {
  const b = req.body || {};
  const row = { name: str(b.name, 100), email: str(b.email, 120), phone: str(b.phone, 20), program: str(b.program, 100), message: str(b.message, 2000), at: new Date().toISOString() };
  if (row.name.length < 2 || !emailOk(row.email) || row.phone.replace(/\D/g, '').length < 10 || row.message.length < 5) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  if (!contactMailer) {
    return res.status(503).json({ error: 'Email delivery is not configured yet. Please contact us by email.' });
  }
  append('enquiries.json', row);
  try {
    await contactMailer.sendMail({
      from: { name: 'Zalomi Website', address: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER },
      to: contactRecipient,
      replyTo: row.email,
      subject: `Website enquiry: ${row.name}`,
      text: [
        'New message from the Zalomi School of Skills website',
        '',
        `Name: ${row.name}`,
        `Email: ${row.email}`,
        `Phone: ${row.phone}`,
        `Program of interest: ${row.program || 'Not specified'}`,
        '',
        'Message:',
        row.message,
        '',
        `Received: ${row.at}`,
      ].join('\n'),
    });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return res.status(502).json({ error: 'We could not send your message right now. Please try again later.' });
  }
  console.log('New enquiry emailed to', contactRecipient, 'from', row.email);
  res.json({ ok: true });
});

// ---- Payments: web (Razorpay Checkout) ----
app.post('/api/payments/create-order', async (req, res) => {
  if (!needRazor(res)) return;
  const cust = customerFrom(req.body || {});
  if (!cust) return res.status(400).json({ error: 'Please enter a valid name, email and phone number.' });
  const slug = str(req.body.courseSlug, 80);
  const amountRupees = amountFor(slug);
  try {
    const order = await razor.orders.create({
      amount: Math.round(amountRupees * 100), currency: 'INR', receipt: 'zal_' + Date.now(),
      notes: { courseSlug: slug || 'registration', name: cust.name, email: cust.email, phone: cust.phone },
    });
    append('payments.json', { orderId: order.id, amount: amountRupees, courseSlug: slug, ...cust, status: 'created', at: new Date().toISOString() });
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (e) {
    console.error('create-order', e);
    res.status(502).json({ error: 'Could not start the payment. Please try again.' });
  }
});

app.post('/api/payments/verify', (req, res) => {
  if (!needRazor(res)) return;
  const { razorpay_order_id: oid, razorpay_payment_id: pid, razorpay_signature: sig } = req.body || {};
  if (!oid || !pid || !sig) return res.status(400).json({ error: 'Missing payment details.' });
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(oid + '|' + pid).digest('hex');
  const a = Buffer.from(expected), b = Buffer.from(String(sig));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(400).json({ error: 'Payment verification failed.' });
  updateRow('payments.json', (r) => r.orderId === oid, { status: 'paid', paymentId: pid });
  res.json({ ok: true });
});

// ---- Payments: iOS / Android (hosted payment link) ----
app.post('/api/payments/create-link', async (req, res) => {
  if (!needRazor(res)) return;
  const cust = customerFrom(req.body || {});
  if (!cust) return res.status(400).json({ error: 'Please enter a valid name, email and phone number.' });
  const slug = str(req.body.courseSlug, 80);
  const amountRupees = amountFor(slug);
  try {
    const link = await razor.paymentLink.create({
      amount: Math.round(amountRupees * 100), currency: 'INR', description: str(req.body.description, 120) || 'Admission fee',
      customer: { name: cust.name, email: cust.email, contact: cust.phone }, notify: { sms: true, email: true },
      reference_id: 'zal_' + Date.now(), notes: { courseSlug: slug || 'registration' },
    });
    append('payments.json', { orderId: link.id, amount: amountRupees, courseSlug: slug, ...cust, status: 'created', at: new Date().toISOString() });
    res.json({ id: link.id, shortUrl: link.short_url });
  } catch (e) {
    console.error('create-link', e);
    res.status(502).json({ error: 'Could not start the payment. Please try again.' });
  }
});

app.get('/api/payments/link-status/:id', async (req, res) => {
  if (!needRazor(res)) return;
  try {
    const link = await razor.paymentLink.fetch(req.params.id);
    const paid = link.payments && link.payments.find((p) => p.status === 'captured');
    if (link.status === 'paid') updateRow('payments.json', (r) => r.orderId === link.id, { status: 'paid', paymentId: paid && paid.payment_id });
    res.json({ status: link.status, paymentId: paid && paid.payment_id });
  } catch (e) {
    res.status(502).json({ error: 'Could not check the payment status.' });
  }
});

// ---- Razorpay webhook (add https://YOUR-SERVER/api/payments/webhook in the Razorpay dashboard) ----
app.post('/api/payments/webhook', (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const sig = req.headers['x-razorpay-signature'];
  if (!secret || !sig) return res.status(400).end();
  const expected = crypto.createHmac('sha256', secret).update(req.rawBody).digest('hex');
  if (expected !== sig) return res.status(400).end();
  const ev = req.body.event;
  const p = req.body.payload && req.body.payload.payment && req.body.payload.payment.entity;
  if (ev === 'payment.captured' && p) updateRow('payments.json', (r) => r.orderId === p.order_id, { status: 'paid', paymentId: p.id });
  if (ev === 'payment.failed' && p) updateRow('payments.json', (r) => r.orderId === p.order_id, { status: 'failed' });
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Zalomi server on http://localhost:${PORT}  (payments ${razor ? 'ON' : 'OFF - add Razorpay keys in .env'})`));
