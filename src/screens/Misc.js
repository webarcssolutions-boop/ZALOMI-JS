import React, { useState } from 'react';
import { View } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { T, Icon, Btn, Section } from '../theme/ui';
import { Field } from '../components/Field';
import { useRouter } from '../navigation/Router';
import { CONFIG } from '../config';

export function PaymentResult() {
  const { route, navigate } = useRouter();
  const { isMobile } = useLayout();
  const ok = route.params.status === 'success';
  return (
    <Section bg="#fff" vPad={isMobile ? 40 : 80} innerStyle={{ alignItems: 'center', maxWidth: 760 }}>
      <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: ok ? '#DDF3E8' : '#FBE3E3', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={ok ? 'check-bold' : 'close-thick'} size={52} color={ok ? '#1E8E5A' : COLORS.red} />
      </View>
      <T w="xb" size={isMobile ? 26 : 36} lh={isMobile ? 34 : 46} align="center" style={{ marginTop: 22 }}>{ok ? 'Payment successful' : 'Payment failed'}</T>
      <T w="m" size={16} color={COLORS.text} lh={25} align="center" style={{ marginTop: 12 }}>
        {ok
          ? 'Thank you! Your seat request has been received. Our admissions team will contact you shortly.'
          : 'We could not complete your payment. No money has been taken, or it will be refunded automatically. Please try again.'}
      </T>
      {ok && route.params.id ? <T w="sb" size={13} color={COLORS.muted} style={{ marginTop: 14 }}>Payment ID: {route.params.id}</T> : null}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Btn label="Back to Home" variant="filledNavy" onPress={() => navigate('/')} />
        {!ok ? <Btn label="Try again" variant="outlineOrange" onPress={() => navigate('/admission')} /> : null}
      </View>
    </Section>
  );
}

export function StudentPortal() {
  const { isMobile } = useLayout();
  const [f, setF] = useState({ id: '', pw: '' });
  const [note, setNote] = useState('');
  return (
    <Section bg={COLORS.skyBand} vPad={isMobile ? 36 : 70} innerStyle={{ alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: 480, backgroundColor: '#fff', borderRadius: 20, padding: isMobile ? 22 : 34 }}>
        <T w="xb" size={28} lh={36}>Student Portal</T>
        <T w="m" size={14} color={COLORS.blue} lh={21} style={{ marginTop: 6, marginBottom: 22 }}>Sign in to see your classes, materials and results.</T>
        <Field label="Student ID or Email" value={f.id} onChangeText={(v) => setF({ ...f, id: v })} autoCapitalize="none" style={{ marginBottom: 14 }} />
        <Field label="Password" value={f.pw} onChangeText={(v) => setF({ ...f, pw: v })} secure autoCapitalize="none" />
        <Btn label="Sign in" variant="filledNavy" full style={{ marginTop: 20 }}
          onPress={() => setNote('The portal back-end is not connected yet. Add your portal address in src/config.js (portalUrl) to link this page to it.')} />
        {note ? <T w="m" size={12.5} color={COLORS.text} lh={19} style={{ marginTop: 14 }}>{note}</T> : null}
      </View>
    </Section>
  );
}

const LEGAL = {
  privacy: { title: 'Privacy Policy', body: [
    'This is a placeholder privacy policy for Zalomi School of Skills. Replace it with your approved policy text before launch.',
    'We collect the details you submit through our forms (name, email, phone, course interest) only to respond to your enquiry and process your admission. Online payments are handled by Razorpay; we do not store card or UPI details.',
    `For any privacy question, write to ${CONFIG.contact.email}.`] },
  terms: { title: 'Terms & Conditions', body: [
    'This is a placeholder for the Terms & Conditions of Zalomi School of Skills. Replace it with your approved text before launch.',
    'Fees, batch timings and refund rules should be listed here, as agreed with the admissions team.',
    `For clarifications, contact ${CONFIG.contact.email}.`] },
};

export function Legal() {
  const { route } = useRouter();
  const { isMobile } = useLayout();
  const d = LEGAL[route.params.kind] || LEGAL.privacy;
  return (
    <Section bg="#fff" vPad={isMobile ? 30 : 60} innerStyle={{ maxWidth: 900 }}>
      <T w="xb" size={isMobile ? 28 : 40} lh={isMobile ? 36 : 50} style={{ marginBottom: 20 }}>{d.title}</T>
      {d.body.map((t, i) => <T key={i} w="r" size={16} color={COLORS.ink} lh={26} style={{ marginBottom: 14 }}>{t}</T>)}
    </Section>
  );
}
