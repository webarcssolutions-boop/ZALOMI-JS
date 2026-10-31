import React, { useState } from 'react';
import { View } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { T, Icon, Section, Press } from '../theme/ui';
import { Field, SelectField } from '../components/Field';
import { COURSES, getCourse } from '../data/courses';
import { CONFIG } from '../config';
import { useRouter } from '../navigation/Router';
import { startPayment } from '../services/payment';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const rupee = (n) => '₹' + Number(n).toLocaleString('en-IN');

/** Admission form + online payment (Razorpay). The amount is calculated on the server. */
export default function Admission() {
  const { isMobile, isDesktop } = useLayout();
  const { route, navigate } = useRouter();
  const preset = getCourse(route.params.course);
  const [f, setF] = useState({ name: '', email: '', phone: '', course: preset ? preset.slug : '' });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const chosen = getCourse(f.course);
  const amount = chosen && chosen.fee ? chosen.fee : CONFIG.payment.registrationFee;
  const options = [{ value: '', label: 'General registration' }, ...COURSES.map((c) => ({ value: c.slug, label: c.title }))];

  const pay = async () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your name';
    if (!emailOk(f.email.trim())) e.email = 'Enter a valid email address';
    if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number';
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setMsg('');
    try {
      const res = await startPayment({
        courseSlug: f.course || undefined, name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(),
        description: chosen ? chosen.title + ' - admission' : 'Admission registration',
      });
      if (res.status === 'cancelled') setMsg('Payment was cancelled. You have not been charged.');
      else navigate(`/payment-result?status=${res.status}&id=${encodeURIComponent(res.paymentId || '')}&amount=${amount}`);
    } catch (ex) {
      setMsg(ex.message);
    }
    setBusy(false);
  };

  return (
    <View>
      <Section bg={COLORS.skyBand} vPad={isMobile ? 28 : 48}>
        <T w="m" size={14} color={COLORS.teal} style={{ letterSpacing: 3 }}>ADMISSION</T>
        <T w="xb" size={isMobile ? 32 : 52} lh={isMobile ? 40 : 62} style={{ marginTop: 6 }}>Take the First Step</T>
        <T w="m" size={isMobile ? 15 : 18} color={COLORS.blue} style={{ marginTop: 10, maxWidth: 640 }}>
          Reserve your seat by paying the registration fee online. Our admissions team will contact you to complete the process.
        </T>
      </Section>
      <Section bg="#fff" vPad={isMobile ? 28 : 52}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 36 }}>
          <View style={{ flex: 1.4, backgroundColor: '#D6F0FA', borderRadius: 24, padding: isMobile ? 20 : 32, zIndex: 5 }}>
            <T w="b" size={22} color="#0F3C57" style={{ marginBottom: 20 }}>Your details</T>
            <Field label="Full Name*" value={f.name} onChangeText={set('name')} error={err.name} style={{ marginBottom: 16 }} />
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 16 }}>
              <Field style={{ flex: 1 }} label="Email Address*" value={f.email} onChangeText={set('email')} keyboardType="email-address" autoCapitalize="none" error={err.email} />
              <Field style={{ flex: 1 }} label="Phone Number*" value={f.phone} onChangeText={set('phone')} keyboardType="phone-pad" error={err.phone} />
            </View>
            <SelectField label="Course / Program" value={f.course} options={options} onChange={set('course')} />
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.navy, borderRadius: 24, padding: isMobile ? 22 : 32 }}>
            <T w="b" size={22} color="#fff">Payment summary</T>
            <View style={{ marginTop: 20, gap: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T w="m" size={14} color="#CFE3F3">{chosen ? chosen.title : 'Registration fee'}</T>
                <T w="b" size={14} color="#fff">{rupee(amount)}</T>
              </View>
              <View style={{ height: 1, backgroundColor: '#fff', opacity: 0.3 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T w="b" size={16} color="#fff">Total</T>
                <T w="xb" size={22} color="#fff" lh={28}>{rupee(amount)}</T>
              </View>
            </View>
            <Press onPress={busy ? undefined : pay} hoverStyle={{ opacity: 0.9 }}
              style={{ marginTop: 26, backgroundColor: COLORS.orange, borderRadius: 999, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10, opacity: busy ? 0.6 : 1 }}>
              <Icon name="lock-outline" size={18} color="#fff" />
              <T w="b" size={15} color="#fff">{busy ? 'Please wait...' : `Pay ${rupee(amount)}`}</T>
            </Press>
            {msg ? <T w="m" size={13} color="#FFD7D7" style={{ marginTop: 14 }}>{msg}</T> : null}
            <T w="m" size={11.5} color="#CFE3F3" lh={17} style={{ marginTop: 18 }}>
              Secure payment via Razorpay: UPI, cards, net banking and wallets. We never see or store your card details.
            </T>
          </View>
        </View>
      </Section>
    </View>
  );
}
