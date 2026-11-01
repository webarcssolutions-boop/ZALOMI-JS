import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Platform, Pressable, View } from 'react-native';
import { IMG } from '../theme/images';
import { COLORS } from '../theme/theme';
import { useRouter } from '../navigation/Router';
import { T } from '../theme/ui';

// Icon centres as fractions of the moving-icon artwork (width x height).
const NODES = [
  { x: 0.158, y: 0.067, dotX: 0.027, dotY: 0.119, title: 'Academy', to: '/academy' },
  { x: 0.483, y: 0.17, dotX: 0.371, dotY: 0.223, title: 'Zalomi Care', to: '/zalomi-care' },
  { x: 0.686, y: 0.293, dotX: 0.553, dotY: 0.337, title: 'Courses', to: '/courses' },
  { x: 0.818, y: 0.442, dotX: 0.653, dotY: 0.458, title: 'Career Labs', to: '/career-labs' },
  { x: 0.863, y: 0.6, dotX: 0.689, dotY: 0.604, title: 'Languages', to: '/courses/languages' },
  { x: 0.803, y: 0.759, dotX: 0.64, dotY: 0.739, title: 'Study Abroad', to: '/study-abroad' },
];

/** The complete arc illustration sways gently as one piece. */
export default function MovingIcons({ height = 640, style }) {
  const a = IMG.moving_icon;
  const width = (height * a.w) / a.h;
  const sway = useRef(new Animated.Value(0)).current;
  const labels = useRef(new Animated.Value(0)).current;
  const iconHovers = useRef(NODES.map(() => new Animated.Value(0))).current;
  const [pointerNear, setPointerNear] = useState(false);
  const { navigate } = useRouter();
  const native = Platform.OS !== 'web';

  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(sway, { toValue: 1, duration: 6500, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
      Animated.timing(sway, { toValue: 0, duration: 6500, easing: Easing.inOut(Easing.sin), useNativeDriver: native }),
    ]));
    animation.start();
    return () => animation.stop();
  }, []);

  useEffect(() => {
    Animated.timing(labels, {
      toValue: pointerNear ? 1 : 0,
      duration: pointerNear ? 220 : 160,
      useNativeDriver: native,
    }).start();
  }, [labels, native, pointerNear]);

  const rotation = sway.interpolate({ inputRange: [0, 1], outputRange: ['-1.2deg', '1.2deg'] });
  const iconSize = width * 0.26;
  const popoutZoom = 1.45;
  const setIconHover = (index, hovered) => {
    Animated.spring(iconHovers[index], {
      toValue: hovered ? 1 : 0,
      useNativeDriver: native,
      speed: hovered ? 20 : 24,
      bounciness: hovered ? 8 : 4,
    }).start();
  };

  return (
    <Animated.View
      onPointerEnter={Platform.OS === 'web' ? () => setPointerNear(true) : undefined}
      onPointerLeave={Platform.OS === 'web' ? () => setPointerNear(false) : undefined}
      style={[{ width, height, transform: [{ rotate: rotation }] }, style]}
    >
      <Image source={a.src} style={{ width, height }} resizeMode="contain" />
      {NODES.map((n, i) => (
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
              backgroundColor: COLORS.mint,
              opacity: iconHovers[i],
              transform: [{ scale: iconHovers[i].interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.15] }) }],
            }}
          />
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: n.x * width - iconSize * 0.675,
              top: n.y * height - iconSize * 0.675,
              width: iconSize * 1.35,
              height: iconSize * 1.35,
              borderRadius: iconSize,
              opacity: iconHovers[i],
              transform: [{ scale: iconHovers[i].interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
            }}
          >
            <View
              style={{
                flex: 1,
                borderRadius: iconSize,
                overflow: 'hidden',
                backgroundColor: COLORS.navy,
                borderWidth: 3,
                borderColor: '#fff',
                shadowColor: COLORS.navy,
                shadowOpacity: 0.22,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 6,
              }}
            >
              <Image
                source={a.src}
                resizeMode="stretch"
                tintColor="#fff"
                style={{
                  position: 'absolute',
                  left: iconSize * 0.675 - popoutZoom * n.x * width,
                  top: iconSize * 0.675 - popoutZoom * n.y * height,
                  width: popoutZoom * width,
                  height: popoutZoom * height,
                }}
              />
            </View>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              left: n.x * width - width * 0.13,
              top: n.y * height - height * 0.065,
              width: width * 0.26,
              height: height * 0.13,
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
                width: '100%', height: '100%',
                cursor: Platform.OS === 'web' ? 'pointer' : undefined,
              }}
            />
          </Animated.View>
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: n.dotX * width - 150,
              top: n.dotY * height - 10,
              width: 122,
              opacity: labels,
            }}
          >
            <T w="sb" size={14} color={COLORS.navy} lh={20} align="right">{n.title}</T>
          </Animated.View>
        </React.Fragment>
      ))}
    </Animated.View>
  );
}
