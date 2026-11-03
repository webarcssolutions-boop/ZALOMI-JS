import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Btn, ContentFrame } from '../theme/ui';

/**
 * Banner used by every inner page. Desktop: text overlaid on the left of the banner image
 * (the supplied images already fade to the page colour on the left). Tablet/mobile: text above, image below.
 */
export default function PageHero({
  img, eyebrow, title, titleColor = COLORS.navy, sub, subColor = COLORS.blue, body, bodyColor = COLORS.blue,
  cta, onCta, ctaVariant = 'outlineOrange', bg, titleSize = 60, textScale = 1, textWidth = '46%', bodyWidth = '100%', textOffsetY = 0, desktopAspectRatio, imageOverlay, children,
}) {
  const a = IMG[img];
  const { isDesktop, isMobile, pad, sc } = useLayout();
  const f = isDesktop ? sc : 1;
  const tSize = Math.round((isDesktop ? titleSize * f : isMobile ? Math.min(titleSize, 34) : Math.min(titleSize, 44)) * textScale);
  const text = (
    <View>
      {eyebrow ? <T w="m" size={Math.round((isMobile ? 13 : 17 * f) * textScale)} color={COLORS.teal} style={{ letterSpacing: 3, marginBottom: 8 }}>{eyebrow}</T> : null}
      <T w="xb" size={tSize} lh={Math.round(tSize * 1.15)} color={titleColor}>{title}</T>
      {sub ? <T w="m" size={Math.round((isMobile ? 15 : 20 * f) * textScale)} color={subColor} style={{ marginTop: 14 }}>{sub}</T> : null}
      {body ? <T w="m" size={Math.round((isMobile ? 14 : 16 * f) * textScale)} color={bodyColor} lh={Math.round((isMobile ? 14 : 16 * f) * textScale * 1.55)} style={{ marginTop: 14, width: bodyWidth }}>{body}</T> : null}
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
    <View style={{ width: '100%', aspectRatio: desktopAspectRatio || a.w / a.h, backgroundColor: bg || a.left }}>
      <Image source={a.src} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} resizeMode="cover" />
      {imageOverlay ? <Image source={imageOverlay} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} resizeMode="stretch" /> : null}
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center' }}>
        <ContentFrame style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{ width: textWidth, transform: [{ translateY: textOffsetY }] }}>{text}</View>
        </ContentFrame>
      </View>
    </View>
  );
}
