import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Platform, Pressable, View } from 'react-native';
import { IMG } from '../theme/images';
import { COLORS } from '../theme/theme';
import { useRouter } from '../navigation/Router';

// Icon centres as fractions of the moving-icon artwork (width x height).
const NODES = [
  { x: 0.158, y: 0.067, dotX: 0.027, dotY: 0.119, drift: 1.2, title: 'Academy', to: '/academy' },
  { x: 0.483, y: 0.17, dotX: 0.371, dotY: 0.223, drift: 0.7, title: 'Zalomi Care', to: '/zalomi-care' },
  { x: 0.686, y: 0.293, dotX: 0.553, dotY: 0.337, drift: 0.35, title: 'Courses', to: '/courses' },
  { x: 0.818, y: 0.442, dotX: 0.653, dotY: 0.458, drift: -0.15, title: 'Career Labs', to: '/career-labs' },
  { x: 0.863, y: 0.6, dotX: 0.689, dotY: 0.604, drift: -0.2, title: 'Languages', to: '/courses/languages' },
  { x: 0.803, y: 0.759, dotX: 0.64, dotY: 0.739, drift: -0.2, title: 'Study Abroad', to: '/study-abroad' },
];

/** The icons and connector dots move gently along a stationary arc. */
export default function MovingIcons({ height = 640, style }) {
  const a = IMG.moving_icon;
  const width = (height * a.w) / a.h;
  const nodeMotion = useRef(NODES.map(() => new Animated.Value(0))).current;
  const iconHovers = useRef(NODES.map(() => new Animated.Value(0))).current;
  const { navigate } = useRouter();
  const native = Platform.OS !== 'web';

  useEffect(() => {
    const animations = nodeMotion.map((motion, index) => Animated.loop(Animated.sequence([
      Animated.delay(index * 180),
      Animated.timing(motion, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
      Animated.timing(motion, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
    ])));
    animations.forEach((animation) => animation.start());
    return () => animations.forEach((animation) => animation.stop());
  }, []);

  const iconSize = width * 0.25;
  const iconMaskSize = width * 0.27;
  const dotSize = width * 0.032;
  const iconTravel = width * 0.018;
  const setIconHover = (index, hovered) => {
    Animated.spring(iconHovers[index], {
      toValue: hovered ? 1 : 0,
      useNativeDriver: native,
      speed: hovered ? 20 : 24,
      bounciness: hovered ? 8 : 4,
    }).start();
  };

  return (
    <View style={[{ width, height, position: 'relative' }, style]}>
      <Image source={a.src} style={{ width, height, opacity: 0.28, tintColor: '#6983B8' }} resizeMode="contain" />
      {NODES.map((n) => (
        <React.Fragment key={`${n.title}-mask`}>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: n.x * width - iconMaskSize / 2,
              top: n.y * height - iconMaskSize / 2,
              width: iconMaskSize,
              height: iconMaskSize,
              borderRadius: iconMaskSize / 2,
              backgroundColor: COLORS.mint,
            }}
          />
        </React.Fragment>
      ))}
      {NODES.map((n, i) => {
        const travel = nodeMotion[i].interpolate({ inputRange: [0, 1], outputRange: [-iconTravel, iconTravel] });
        const alongArc = nodeMotion[i].interpolate({
          inputRange: [0, 1],
          outputRange: [-iconTravel * n.drift, iconTravel * n.drift],
        });
        return (
          <React.Fragment key={n.title}>
            <Animated.View
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: n.x * width - iconSize / 2,
                top: n.y * height - iconSize / 2,
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize / 2,
                opacity: iconHovers[i].interpolate({ inputRange: [0, 1], outputRange: [0.28, 1] }),
                shadowColor: COLORS.navy,
                shadowOpacity: 0.14,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
                transform: [
                  { translateX: alongArc },
                  { translateY: travel },
                  { translateY: iconHovers[i].interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) },
                ],
              }}
            >
              <View style={{ flex: 1, borderRadius: iconSize / 2, overflow: 'hidden' }}>
                <Image
                  source={a.src}
                  resizeMode="stretch"
                  tintColor={COLORS.navy}
                  style={{
                    position: 'absolute',
                    left: iconSize / 2 - n.x * width,
                    top: iconSize / 2 - n.y * height,
                    width,
                    height,
                  }}
                />
              </View>
            </Animated.View>
            <Animated.View
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: n.dotX * width - dotSize / 2,
                top: n.dotY * height - dotSize / 2,
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: COLORS.navy,
                opacity: iconHovers[i],
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                left: n.x * width - iconSize / 2,
                top: n.y * height - iconSize / 2,
                width: iconSize,
                height: iconSize,
                borderRadius: iconSize / 2,
                transform: [{ translateX: alongArc }, { translateY: travel }],
              }}
            >
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={`Go to ${n.title}`}
                onHoverIn={() => setIconHover(i, true)}
                onHoverOut={() => setIconHover(i, false)}
                onPressIn={() => setIconHover(i, true)}
                onPressOut={() => { if (Platform.OS !== 'web') setIconHover(i, false); }}
                onPress={() => navigate(n.to)}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: iconSize / 2,
                  cursor: Platform.OS === 'web' ? 'pointer' : undefined,
                }}
              />
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
}
