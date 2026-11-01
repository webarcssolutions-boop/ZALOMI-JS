import React, { useState } from 'react';
import { Text, View, Pressable, Image, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONT, MAX_WIDTH, useLayout } from './theme';

/** Text with Montserrat weights: w = r | m | sb | b | xb */
export function T({ w = 'r', size = 16, color = COLORS.navy, align, lh, style, children, ...rest }) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: FONT[w], fontSize: size, color, textAlign: align, lineHeight: lh || Math.round(size * 1.5) }, style]}
    >
      {children}
    </Text>
  );
}

export function Icon({ name, size = 24, color = COLORS.navy, style }) {
  return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />;
}

/** Icon inside a thin navy circle (as used throughout the designs) */
export function IconCircle({ name, size = 72, iconSize, color = COLORS.navy, ring = COLORS.navy, bg = 'transparent', style }) {
  return (
    <View
      style={[
        { width: size, height: size, borderRadius: size / 2, borderWidth: 1.5, borderColor: ring, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      <Icon name={name} size={iconSize || size * 0.5} color={color} />
    </View>
  );
}

/** Full-bleed background band with a centred, padded inner column */
export function Section({ bg, style, innerStyle, children, vPad }) {
  const { pad, isMobile } = useLayout();
  const v = vPad !== undefined ? vPad : isMobile ? 36 : 56;
  return (
    <View style={[{ width: '100%', backgroundColor: bg }, style]}>
      <View style={[{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: pad, paddingVertical: v }, innerStyle]}>
        {children}
      </View>
    </View>
  );
}

/** Responsive grid using percentage columns + padding gutters */
export function Grid({ cols = 4, gap = 20, style, children, itemStyle }) {
  const items = React.Children.toArray(children);
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -gap / 2 }, style]}>
      {items.map((c, i) => (
        <View key={i} style={[{ width: `${100 / cols}%`, padding: gap / 2 }, itemStyle]}>
          {c}
        </View>
      ))}
    </View>
  );
}

/** Shared interactive feedback for links, buttons, cards, and menu items. */
export function Press({
  onPress,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  disabled,
  style,
  children,
  hoverStyle,
  focusStyle,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const isWeb = Platform.OS === 'web';
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={(event) => { setHovered(true); if (onHoverIn) onHoverIn(event); }}
      onHoverOut={(event) => { setHovered(false); if (onHoverOut) onHoverOut(event); }}
      onPressIn={(event) => { setPressed(true); if (onPressIn) onPressIn(event); }}
      onPressOut={(event) => { setPressed(false); if (onPressOut) onPressOut(event); }}
      onFocus={(event) => { setFocused(true); if (onFocus) onFocus(event); }}
      onBlur={(event) => { setFocused(false); if (onBlur) onBlur(event); }}
      disabled={disabled}
      style={[
        style,
        !disabled && (hovered || focused) ? (hoverStyle || { opacity: 0.9 }) : null,
        !disabled && pressed ? { opacity: 0.76 } : null,
        isWeb ? { cursor: disabled ? 'default' : 'pointer', transition: 'opacity 160ms ease' } : null,
        isWeb && focused ? (focusStyle === undefined ? { outlineColor: COLORS.blue, outlineWidth: 2, outlineStyle: 'solid' } : focusStyle) : null,
      ]}
      accessibilityRole="button"
      {...rest}
    >
      {children}
    </Pressable>
  );
}

/** Buttons used across the designs.
 *  variant: filled (indigo) | filledNavy | filledRed | outlineOrange | outlineNavy | outlineWhite | soft */
export function Btn({ label, onPress, variant = 'outlineOrange', arrow = true, size = 'md', style, full }) {
  const sm = size === 'sm';
  const v = {
    filled: { bg: COLORS.indigo, fg: '#fff', bd: COLORS.indigo },
    filledNavy: { bg: COLORS.navy, fg: '#fff', bd: COLORS.navy },
    filledRed: { bg: COLORS.red, fg: '#fff', bd: COLORS.red },
    outlineOrange: { bg: 'transparent', fg: COLORS.orange, bd: COLORS.orange },
    outlineNavy: { bg: 'transparent', fg: COLORS.navy, bd: COLORS.navy },
    outlineWhite: { bg: 'transparent', fg: '#fff', bd: '#fff' },
    outlineRed: { bg: 'transparent', fg: COLORS.red, bd: COLORS.red },
  }[variant];
  return (
    <Press
      onPress={onPress}
      hoverStyle={{ opacity: 0.85 }}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: full ? 'stretch' : 'flex-start',
          justifyContent: 'center',
          gap: 8,
          backgroundColor: v.bg,
          borderColor: v.bd,
          borderWidth: 1.2,
          borderRadius: 999,
          paddingHorizontal: sm ? 14 : 22,
          paddingVertical: sm ? 6 : 10,
        },
        style,
      ]}
    >
      <T w="sb" size={sm ? 11 : 13} color={v.fg} lh={sm ? 14 : 18}>{label}</T>
      {arrow ? <Icon name="arrow-right" size={sm ? 14 : 18} color={v.fg} /> : null}
    </Press>
  );
}

export function Img({ asset, style, resizeMode = 'cover', ratio = true, ...rest }) {
  return (
    <Image
      source={asset.src}
      style={[ratio ? { width: '100%', aspectRatio: asset.w / asset.h } : null, style]}
      resizeMode={resizeMode}
      {...rest}
    />
  );
}
