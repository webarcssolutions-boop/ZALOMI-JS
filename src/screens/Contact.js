import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, Section, Press } from '../theme/ui';
import PageHero from '../components/PageHero';
import { Field, SelectField } from '../components/Field';
import { SocialRow } from '../components/Footer';
import { COURSES } from '../data/courses';
import { CONFIG } from '../config';
import { api } from '../services/api';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Row({ icon, children }) {
  const { isMobile } = useLayout();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: isMobile ? 18 : 26 }}>
      <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: COLORS.skyCard, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={26} color="#0F3C57" />
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

export default function Contact() {
  const { isMobile, isDesktop } = useLayout();
  const c = CONFIG.contact;
  const [f, setF] = useState({ name: '', email: '', phone: '', program: '', message: '' });
  const [err, setErr] = useState({});
  const [state, setState] = useState({ busy: false, ok: false, msg: '' });
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your name';
    if (!emailOk(f.email.trim())) e.email = 'Enter a valid email address';
    if (f.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number';
    if (f.message.trim().length < 5) e.message = 'Please write a short message';
    setErr(e);
    if (Object.keys(e).length) return;
    setState({ busy: true, ok: false, msg: '' });
    try {
      await api.sendContact(f);
      setState({ busy: false, ok: true, msg: 'Thank you! Our team will get back to you soon.' });
      setF({ name: '', email: '', phone: '', program: '', message: '' });
    } catch (ex) {
      setState({ busy: false, ok: false, msg: ex.message });
    }
  };

  const programOptions = [{ value: '', label: 'Not sure yet' }, ...COURSES.map((x) => ({ value: x.title, label: x.title }))];
  const map = IMG.map, campus = IMG.campus;

  return (
    <View>
      <PageHero img="contact_hero" eyebrow="GET IN TOUCH" title="Contact Us" titleSize={56} textWidth="44%"
        body={"We're here to help you with your\nquestions, guidance and next steps."} bodyColor={COLORS.blue} />
      <Section bg="#fff" vPad={isMobile ? 30 : 56}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? 60 : 30 }}>
          <View style={{ flex: isDesktop ? 1 : undefined }}>
            <T w="xb" size={isMobile ? 28 : 40}>Get in Touch</T>
            <T w="m" size={isMobile ? 13 : 13.5} color={COLORS.blue} lh={19} style={{ marginTop: 6, marginBottom: 34, maxWidth: 420 }}>
              Have a question, need more information, or want to speak with our team? We'd love to hear from you.
            </T>
            <Row icon="phone"><T w="b" size={isMobile ? 15 : 17} color="#0F3C57">{c.phone}</T></Row>
            <Row icon="email-outline"><T w="b" size={isMobile ? 15 : 17} color="#0F3C57">{c.email}</T></Row>
            <Row icon="whatsapp"><T w="b" size={isMobile ? 15 : 17} color="#0F3C57">{c.whatsapp}</T></Row>
            <Row icon="map-marker-outline"><T w="b" size={isMobile ? 15 : 17} color="#0F3C57" lh={26}>{c.address.join('\n')}</T></Row>
            <T w="b" size={14} color="#0F3C57" style={{ marginTop: 6, marginBottom: 8 }}>Follow Us</T>
            <SocialRow boxed color="#fff" size={22} />
          </View>
          <View style={{ flex: isDesktop ? 1.1 : undefined, backgroundColor: '#D6F0FA', borderRadius: 24, padding: isMobile ? 20 : 32 }}>
            <T w="b" size={isMobile ? 20 : 24} color="#0F3C57">Send Us a Message</T>
            <T w="m" size={13} color="#0F3C57" lh={19} style={{ marginTop: 6, marginBottom: 22 }}>Fill in the form below and our team will get back to you as soon as possible.</T>
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 16 }}>
              <Field style={{ flex: 1 }} label="Full Name*" value={f.name} onChangeText={set('name')} error={err.name} />
              <Field style={{ flex: 1 }} label="Email Address*" value={f.email} onChangeText={set('email')} keyboardType="email-address" autoCapitalize="none" error={err.email} />
            </View>
            <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 16, zIndex: 5 }}>
              <Field style={{ flex: 1 }} label="Phone Number*" value={f.phone} onChangeText={set('phone')} keyboardType="phone-pad" error={err.phone} />
              <SelectField style={{ flex: 1 }} label="Program of Interest" value={f.program} options={programOptions} onChange={set('program')} />
            </View>
            <Field label="Your Message*" value={f.message} onChangeText={set('message')} multiline minH={150} error={err.message} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
              <Press onPress={submit} hoverStyle={{ opacity: 0.88 }} style={{ backgroundColor: '#0E4D6E', borderRadius: 6, paddingHorizontal: 30, paddingVertical: 14, flexDirection: 'row', gap: 14, alignItems: 'center', opacity: state.busy ? 0.6 : 1 }}>
                <T w="b" size={13} color="#fff">{state.busy ? 'Sending...' : 'Send Message'}</T>
                <Icon name="send" size={20} color="#fff" />
              </Press>
              {state.msg ? <T w="m" size={13} color={state.ok ? '#1E8E5A' : COLORS.red} style={{ flex: 1 }}>{state.msg}</T> : null}
            </View>
          </View>
        </View>

        {/* Visit us strip */}
        <View style={{ marginTop: isMobile ? 34 : 56, flexDirection: isDesktop ? 'row' : 'column', alignItems: 'stretch', borderRadius: 6, overflow: 'hidden' }}>
          <Image source={map.src} style={isDesktop ? { flex: 1.05, aspectRatio: undefined, minHeight: 250 } : { width: '100%', aspectRatio: map.w / map.h }} resizeMode="cover" />
          <View style={{ flex: isDesktop ? 0.95 : undefined, backgroundColor: '#fff', padding: isMobile ? 22 : 30, justifyContent: 'center' }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.skyCard, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="map-marker" size={26} color="#0F3C57" />
            </View>
            <T w="m" size={16} color={COLORS.teal} style={{ letterSpacing: 4, marginTop: 10 }}>VISIT US</T>
            <T w="b" size={isMobile ? 18 : 21} lh={isMobile ? 26 : 29} color="#0F3C57" style={{ marginTop: 8 }}>We'd love to see you{'\n'}at our campus!</T>
            <T w="m" size={12} color="#0F3C57" lh={18} style={{ marginTop: 10 }}>Experience our learning environment, meet our team and explore the opportunities that await you at Zalomi School of Skills.</T>
          </View>
          <Image source={campus.src} style={isDesktop ? { flex: 1.15, aspectRatio: undefined, minHeight: 250 } : { width: '100%', aspectRatio: campus.w / campus.h }} resizeMode="cover" />
        </View>
      </Section>
    </View>
  );
}
