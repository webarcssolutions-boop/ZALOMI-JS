import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Platform, View } from 'react-native';
import { IMG } from '../theme/images';
import { COLORS } from '../theme/theme';

// Circle centres as fractions of the "home_page_moving_icon" artwork (width x height).
const NODES = [
  { x: 0.158, y: 0.067 }, // Academy
  { x: 0.483, y: 0.17 },  // Zalomi Care
  { x: 0.686, y: 0.293 }, // Courses
  { x: 0.818, y: 0.442 }, // Career Labs
  { x: 0.863, y: 0.6 },   // Languages
  { x: 0.803, y: 0.759 }, // Study Abroad
];

/** The curved icon timeline beside the hero. The whole artwork floats gently and a
 *  highlight ring travels from icon to icon (the "moving icon" effect). */
export default function MovingIcons({ height = 640, style }) {
  const a = IMG.moving_icon;
  const width = (height * a.w) / a.h;
  const float = useRef(new Animated.Value(0)).current;
  const pulses = useRef(NODES.map(() => new Animated.Value(0))).current;
  const native = Platform.OS !== 'web';

  useEffect(() => {
    const f = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
        Animated.timing(float, { toValue: 0, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
      ])
    );
    const p = Animated.loop(
      Animated.sequence(
        pulses.map((v) =>
          Animated.sequence([
            Animated.timing(v, { toValue: 1, duration: 450, useNativeDriver: native }),
            Animated.timing(v, { toValue: 0, duration: 650, useNativeDriver: native }),
          ])
        )
      )
    );
    f.start();
    p.start();
    return () => { f.stop(); p.stop(); };
  }, []);

  const translateY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const ring = width * 0.26;
  return (
    <Animated.View style={[{ width, height, transform: [{ translateY }] }, style]}>
      <Image source={a.src} style={{ width, height }} resizeMode="contain" />
      {NODES.map((n, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={{
            position: 'absolute', left: n.x * width - ring / 2, top: n.y * height - ring / 2, width: ring, height: ring, borderRadius: ring / 2,
            borderWidth: 3, borderColor: COLORS.teal, backgroundColor: 'rgba(31,176,192,0.12)',
            opacity: pulses[i], transform: [{ scale: pulses[i].interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.08] }) }],
          }}
        />
      ))}
    </Animated.View>
  );
}
