import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, IconCircle, Btn, Press } from '../theme/ui';

/** Light-blue card with icon in a circle, bold title and short text (support / what-you-get cards) */
export function SupportCard({ icon, title, desc, bg = COLORS.skyCard, align = 'center', minH, iconSize = 64 }) {
  const { isMobile } = useLayout();
  return (
    <View style={{ backgroundColor: bg, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 24, alignItems: align === 'center' ? 'center' : 'flex-start', minHeight: minH, flex: 1 }}>
      <IconCircle name={icon} size={iconSize} />
      <T w="b" size={isMobile ? 17 : 18} align={align} lh={24} style={{ marginTop: 14 }}>{title}</T>
      <T w="m" size={12.5} align={align} color={COLORS.text} lh={18} style={{ marginTop: 8 }}>{desc}</T>
    </View>
  );
}

/** Course / program card used on the Courses page */
export function CourseCard({ c, onPress }) {
  const img = IMG[c.img];
  const bg = c.kind === 'program' ? COLORS.mintCard : COLORS.skyCard;
  return (
    <Press onPress={onPress} style={{ flex: 1, borderRadius: 10, overflow: 'hidden', backgroundColor: bg }} hoverStyle={{ opacity: 0.92 }}>
      <Image source={img.src} style={{ width: '100%', aspectRatio: 1.5 }} resizeMode="cover" />
      <View style={{ padding: 16, flex: 1 }}>
        <T w="b" size={17} lh={22}>{c.title}</T>
        <T w="m" size={12.5} color={COLORS.text} lh={18} style={{ marginTop: 8, marginBottom: 14 }}>{c.short}</T>
        <View style={{ flex: 1 }} />
        <Press onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T w="sb" size={11.5} color={COLORS.orange}>Learn More</T>
          <Icon name="arrow-right" size={15} color={COLORS.orange} />
        </Press>
      </View>
    </Press>
  );
}

/** Four-up stats strip (11 Courses | 1000+ | 100% | infinity) */
export function StatsStrip({ onDark }) {
  const { isMobile } = useLayout();
  const col = COLORS.navy;
  const items = [
    { icon: 'file-document-outline', big: '11', label: 'Courses' },
    { icon: 'bank', big: '1000+', label: 'Global Universities' },
    { icon: 'shield-check-outline', big: '100%', label: 'Career Support' },
    { icon: 'hand-heart-outline', iconBig: true, big: '', label: 'Opportunities' },
  ];
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((it, i) => (
        <View key={i} style={{ width: isMobile ? '50%' : '25%', alignItems: 'center', paddingVertical: isMobile ? 16 : 6,
          borderLeftWidth: !isMobile && i > 0 ? 2 : 0, borderColor: '#29B6E8' }}>
          <Icon name={it.icon} size={isMobile ? 40 : 54} color="#29B6E8" />
          {it.iconBig ? <Icon name="infinity" size={isMobile ? 40 : 54} color={col} /> : <T w="xb" size={isMobile ? 32 : 46} lh={isMobile ? 40 : 56} color={col}>{it.big}</T>}
          <T w="m" size={isMobile ? 13 : 16} color={col}>{it.label}</T>
        </View>
      ))}
    </View>
  );
}
