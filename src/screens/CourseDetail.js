import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, Btn, Section } from '../theme/ui';
import { getCourse, COURSES } from '../data/courses';
import { useRouter } from '../navigation/Router';

export default function CourseDetail() {
  const { route, navigate } = useRouter();
  const { isMobile, isDesktop } = useLayout();
  const c = getCourse(route.params.slug);
  if (!c) {
    return (
      <Section bg="#fff"><T w="b" size={24}>Course not found</T><Btn label="View all courses" variant="filledNavy" style={{ marginTop: 18 }} onPress={() => navigate('/courses')} /></Section>
    );
  }
  const a = IMG[c.img];
  const facts = [['Duration', c.duration], ['Mode', c.mode], ['Type', c.kind === 'program' ? 'Program' : 'Course'], ['Fee', c.fee ? `₹${c.fee}` : 'Contact us for fees']];
  return (
    <View>
      <Section bg={COLORS.skyBand} vPad={isMobile ? 30 : 56}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 36, alignItems: 'center' }}>
          <View style={{ flex: isDesktop ? 1 : undefined }}>
            <T w="m" size={14} color={COLORS.teal} style={{ letterSpacing: 3 }}>{c.kind === 'program' ? 'PROGRAM' : 'COURSE'}</T>
            <T w="xb" size={isMobile ? 30 : 48} lh={isMobile ? 38 : 58} style={{ marginTop: 6 }}>{c.title}</T>
            <T w="m" size={isMobile ? 15 : 18} color={COLORS.blue} lh={isMobile ? 24 : 28} style={{ marginTop: 14 }}>{c.short}</T>
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <Btn label="Enrol Now" variant="filledNavy" onPress={() => navigate('/admission?course=' + c.slug)} />
              <Btn label="Talk to an Adviser" variant="outlineNavy" onPress={() => navigate('/contact')} />
            </View>
          </View>
          <Image source={a.src} style={{ width: isDesktop ? '48%' : '100%', aspectRatio: a.w / a.h, borderRadius: 14 }} resizeMode="cover" />
        </View>
      </Section>
      <Section bg="#fff">
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 36 }}>
          <View style={{ flex: 1 }}>
            <T w="b" size={isMobile ? 22 : 28}>What you will learn</T>
            {c.learn.map((l) => (
              <View key={l} style={{ flexDirection: 'row', gap: 10, marginTop: 14, alignItems: 'flex-start' }}>
                <Icon name="check-circle-outline" size={22} color={COLORS.teal} />
                <T w="m" size={16} color={COLORS.ink} style={{ flex: 1 }}>{l}</T>
              </View>
            ))}
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.skyCard, borderRadius: 12, padding: 24 }}>
            {facts.map(([k, v]) => (
              <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#fff' }}>
                <T w="sb" size={15}>{k}</T>
                <T w="m" size={15} color={COLORS.text}>{v}</T>
              </View>
            ))}
          </View>
        </View>
      </Section>
    </View>
  );
}
