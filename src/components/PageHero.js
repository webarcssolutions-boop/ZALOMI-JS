import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Btn } from '../theme/ui';

/**
 * Banner used by every inner page. Desktop: text overlaid on the left of the banner image
 * (the supplied images already fade to the page colour on the left). Tablet/mobile: text above, image below.
 */
export default function PageHero({
  img, eyebrow, title, titleColor = COLORS.navy, sub, subColor = COLORS.blue, body, bodyColor = COLORS.blue,
  cta, onCta, ctaVariant = 'outlineOrange', bg, titleSize = 60, textWidth = '46%', children,
}) {
  const a = IMG[img];
  const { isDesktop, isMobile, pad, sc } = useLayout();
  const f = isDesktop ? sc : 1;
  const tSize = isDesktop ? Math.round(titleSize * f) : isMobile ? Math.min(titleSize, 34) : Math.min(titleSize, 44);
  const text = (
    <View>
      {eyebrow ? <T w="m" size={isMobile ? 13 : Math.round(17 * f)} color={COLORS.teal} style={{ letterSpacing: 3, marginBottom: 8 }}>{eyebrow}</T> : null}
      <T w="xb" size={tSize} lh={Math.round(tSize * 1.15)} color={titleColor}>{title}</T>
      {sub ? <T w="m" size={isMobile ? 15 : Math.round(20 * f)} color={subColor} style={{ marginTop: 14 }}>{sub}</T> : null}
      {body ? <T w="m" size={isMobile ? 14 : Math.round(16 * f)} color={bodyColor} lh={Math.round((isMobile ? 14 : 16 * f) * 1.55)} style={{ marginTop: 14 }}>{body}</T> : null}
      {cta ? <Btn label={cta} onPress={onCta} variant={ctaVariant} style={{ marginTop: 22 }} /> : null}
      {children}
    </View>
  );
  if (!isDesktop) {
    return (
      <View style={{ backgroundColor: bg || a.left }}>
        <View style={{ paddingHorizontal: pad, paddingTop: 28, paddingBottom: 18 }}>{text}</View>
        <Image source={a.src} style={{ width: '100%', aspectRatio: a.w / a.h }} resizeMode="cover" />
      </View>
    );
  }
  return (
    <View style={{ width: '100%', aspectRatio: a.w / a.h, backgroundColor: bg || a.left }}>
      <Image source={a.src} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} resizeMode="cover" />
      <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: textWidth, justifyContent: 'center', paddingLeft: pad }}>{text}</View>
    </View>
  );
}
