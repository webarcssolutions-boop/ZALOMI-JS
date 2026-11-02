import React from 'react';
import { Image, View } from 'react-native';
import { COLORS, MAX_WIDTH, useLayout } from '../theme/theme';
import { T, Icon, Press } from '../theme/ui';
import { Logo } from './Header';
import { FOOTER_QUICK, FOOTER_PROGRAMS } from '../data/nav';
import { useRouter } from '../navigation/Router';
import { CONFIG } from '../config';

const SOCIAL = [
  ['twitter', require('../../assets/images/social_twitter.png')],
  ['facebook', require('../../assets/images/social_facebook.png')],
  ['instagram', require('../../assets/images/social_instagram.png')],
  ['linkedin', require('../../assets/images/social_linkedin.png')],
  ['youtube', require('../../assets/images/social_youtube.png')],
];

export function SocialRow({ size = 26, boxed = false }) {
  const { navigate } = useRouter();
  return (
    <View style={{ flexDirection: 'row', gap: boxed ? 10 : 12 }}>
      {SOCIAL.map(([key, source]) => (
        <Press key={key} onPress={() => navigate(CONFIG.social[key])} accessibilityLabel={key}
          style={boxed ? { width: size + 14, height: size + 14 } : null}>
          <Image source={source} style={{ width: boxed ? size + 14 : size, height: boxed ? size + 14 : size }} resizeMode="contain" />
        </Press>
      ))}
    </View>
  );
}

function Col({ title, children, divider }) {
  return (
    <View style={{ flex: 1, minWidth: 0, paddingLeft: divider ? 36 : 0, borderLeftWidth: divider ? 1 : 0, borderColor: '#fff' }}>
      <T w="b" size={16} color="#fff" style={{ marginBottom: 18 }}>{title}</T>
      {children}
    </View>
  );
}

const FLink = ({ label, to }) => {
  const { navigate } = useRouter();
  return (
    <Press onPress={() => navigate(to)} hoverStyle={{ opacity: 0.7 }} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6 }}>
      <Icon name="chevron-right" size={14} color="#fff" />
      <T w="m" size={12} color="#fff">{label}</T>
    </Press>
  );
};

const CRow = ({ icon, children }) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
    <Icon name={icon} size={18} color="#fff" style={{ marginTop: 1 }} />
    <View style={{ flex: 1 }}>{children}</View>
  </View>
);

export default function Footer() {
  const { isDesktop, isMobile, pad } = useLayout();
  const { navigate } = useRouter();
  const c = CONFIG.contact;
  const brand = (
    <View style={{ flex: isDesktop ? 1.2 : undefined }}>
      <Logo width={isMobile ? 130 : 150} light onPress={() => navigate('/')} />
      <T w="m" size={12} color="#fff" style={{ marginTop: 10, marginBottom: 18 }}>
        Empowering learners. Building careers.{'\n'}Creating global opportunities.
      </T>
      <SocialRow />
    </View>
  );
  const quick = <Col title="Quick Links" divider={isDesktop}>{FOOTER_QUICK.map(([l, t]) => <FLink key={l} label={l} to={t} />)}</Col>;
  const progs = <Col title="Programs" divider={isDesktop}>{FOOTER_PROGRAMS.map(([l, t]) => <FLink key={l} label={l} to={t} />)}</Col>;
  const contact = (
    <Col title="Contact Us" divider={isDesktop}>
      <CRow icon="map-marker"><T w="m" size={12} color="#fff">{c.address.join('\n')}</T></CRow>
      <CRow icon="phone"><T w="m" size={12} color="#fff">{c.phone}</T></CRow>
      <CRow icon="whatsapp"><T w="m" size={12} color="#fff">{c.whatsapp}</T></CRow>
      <CRow icon="email-outline"><T w="m" size={12} color="#fff">{c.email}</T></CRow>
    </Col>
  );
  return (
    <View style={{ backgroundColor: COLORS.navy, width: '100%' }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' }}>
        <View style={{ paddingHorizontal: pad, paddingTop: isMobile ? 36 : 44, paddingBottom: 24 }}>
          {isDesktop ? (
            <View style={{ flexDirection: 'row', gap: 36 }}>{brand}{quick}{progs}{contact}</View>
          ) : (
            <View style={{ gap: 28 }}>
              {brand}
              <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 28 }}>{quick}{progs}</View>
              {contact}
            </View>
          )}
          <View style={{ height: 1, backgroundColor: '#fff', marginTop: 30, marginBottom: 14 }} />
          <View style={{ flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 8 }}>
            <T size={10} color="#fff">(C) 2026 Zalomi School of Skills. All rights reserved.</T>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Press onPress={() => navigate('/legal/privacy')}><T size={10} color="#fff">Privacy Policy</T></Press>
              <T size={10} color="#fff">|</T>
              <Press onPress={() => navigate('/legal/terms')}><T size={10} color="#fff">Terms & Conditions</T></Press>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
