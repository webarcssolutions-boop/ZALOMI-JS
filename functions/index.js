const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const nodemailer = require('nodemailer');

const smtpAppPassword = defineSecret('SMTP_APP_PASSWORD');
const contactEmail = 'webarcssolutions@gmail.com';
const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
const str = (value, maxLength) => String(value || '').trim().slice(0, maxLength);

exports.contact = onRequest(
  { region: 'us-central1', secrets: [smtpAppPassword] },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.set('Allow', 'POST').status(405).json({ error: 'Method not allowed.' });
      return;
    }

    const body = req.body || {};
    const enquiry = {
      name: str(body.name, 100),
      email: str(body.email, 120),
      phone: str(body.phone, 20),
      program: str(body.program, 100),
      message: str(body.message, 2000),
      at: new Date().toISOString(),
    };

    if (
      enquiry.name.length < 2 ||
      !emailOk(enquiry.email) ||
      enquiry.phone.replace(/\D/g, '').length < 10 ||
      enquiry.message.length < 5
    ) {
      res.status(400).json({ error: 'Please fill in all required fields.' });
      return;
    }

    const appPassword = smtpAppPassword.value();
    if (!appPassword) {
      res.status(503).json({ error: 'Contact email is not configured yet. Please try again later.' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: contactEmail, pass: appPassword },
    });

    try {
      await transporter.sendMail({
        from: { name: 'Zalomi Website', address: contactEmail },
        to: contactEmail,
        replyTo: enquiry.email,
        subject: `Website enquiry: ${enquiry.name}`,
        text: [
          'New message from the Zalomi School of Skills website',
          '',
          `Name: ${enquiry.name}`,
          `Email: ${enquiry.email}`,
          `Phone: ${enquiry.phone}`,
          `Program of interest: ${enquiry.program || 'Not specified'}`,
          '',
          'Message:',
          enquiry.message,
          '',
          `Received: ${enquiry.at}`,
        ].join('\n'),
      });
      res.json({ ok: true });
    } catch (error) {
      console.error('Contact email delivery failed:', error);
      res.status(502).json({ error: 'We could not send your message right now. Please try again later.' });
    } finally {
      transporter.close();
    }
  }
);
