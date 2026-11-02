import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View, Image, Platform } from 'react-native';
import { COLORS, MAX_WIDTH, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, Press } from '../theme/ui';
import { NAV } from '../data/nav';
import { useRouter } from '../navigation/Router';
import { CONFIG } from '../config';

const isActive = (item, path) => {
  const p = path.split('?')[0];
  if (item.to === '/') return p === '/';
  const kids = (item.children || []).map((c) => c.to);
  return p === item.to || p.startsWith(item.to + '/') || kids.includes(p);
};

export function Logo({ width = 140, light = false, onPress }) {
  const a = light ? IMG.logo_light : IMG.logo;
  return (
    <Press onPress={onPress} accessibilityLabel="Zalomi School of Skills - home">
      <Image source={a.src} style={{ width, height: (width * a.h) / a.w }} resizeMode="contain" />
    </Press>
  );
}

function PortalPill({ onPress, style }) {
  return (
    <Press onPress={onPress} hoverStyle={{ backgroundColor: COLORS.indigo }}
      style={[{ backgroundColor: COLORS.navy, borderRadius: 999, paddingHorizontal: 22, paddingVertical: 9 }, style]}>
      <T w="b" size={13} color="#fff" lh={18}>Student Portal</T>
    </Press>
  );
}

function DesktopNav() {
  const { route, navigate } = useRouter();
  const { sc, pad } = useLayout();
  const [open, setOpen] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [itemLayouts, setItemLayouts] = useState({});
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const indicatorLeft = useRef(new Animated.Value(0)).current;
  const indicatorTop = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const indicatorAnimation = useRef(null);
  const gap = Math.round(36 * sc);
  const size = Math.max(13, Math.round(15 * sc));
  const goPortal = () => (CONFIG.portalUrl ? navigate(CONFIG.portalUrl) : navigate('/student-portal'));
  const activeItem = NAV.find((item) => isActive(item, route.path));
  const indicatorItem = hoveredItem ? NAV.find((item) => item.label === hoveredItem) : activeItem;

  useEffect(() => {
    setHoveredItem(null);
    setOpen(null);
  }, [route.path]);

  useEffect(() => {
    const layout = indicatorItem && itemLayouts[indicatorItem.label];
    if (!layout) return;
    indicatorAnimation.current?.stop();
    const animation = Animated.parallel([
      Animated.timing(indicatorLeft, { toValue: layout.x, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(indicatorTop, { toValue: layout.y + layout.height - 2, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(indicatorWidth, { toValue: layout.width, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
    ]);
    indicatorAnimation.current = animation;
    animation.start();
    return () => animation.stop();
  }, [indicatorItem, itemLayouts, indicatorLeft, indicatorTop, indicatorWidth]);

  const measureItem = (label) => {
    const item = itemRefs.current[label];
    if (!item || !navRef.current) return;
    item.measureLayout(navRef.current, (x, y, width, height) => {
      setItemLayouts((current) => {
        const previous = current[label];
        if (previous && previous.x === x && previous.y === y && previous.width === width && previous.height === height) return current;
        return { ...current, [label]: { x, y, width, height } };
      });
    });
  };

  return (
    <View
      ref={navRef}
      style={{ flexDirection: 'row', alignItems: 'center', gap, position: 'relative' }}
      onPointerLeave={Platform.OS === 'web' ? () => setHoveredItem(null) : undefined}
      onLayout={() => NAV.forEach((item) => measureItem(item.label))}
    >
      {NAV.map((item) => {
        const hasKids = !!item.children;
        return (
          <View key={item.label} ref={(ref) => { itemRefs.current[item.label] = ref; }} style={{ position: 'relative' }}
            onLayout={() => measureItem(item.label)}
            onPointerEnter={Platform.OS === 'web' ? () => {
              setHoveredItem(item.label);
              if (hasKids) setOpen(item.label);
            } : undefined}
            onPointerLeave={hasKids && Platform.OS === 'web' ? () => setOpen(null) : undefined}>
            <Press onPress={() => { setOpen(null); navigate(item.to); }} onFocus={() => setHoveredItem(item.label)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 6 }}
              hoverStyle={{ opacity: 0.7 }} focusStyle={{ outlineStyle: 'none' }}>
              <T w="sb" size={size} lh={size + 6}>{item.label}</T>
              {hasKids ? <Icon name="chevron-down" size={size + 2} color={COLORS.navy} /> : null}
            </Press>
            {hasKids && open === item.label ? (
              <View style={{ position: 'absolute', top: '100%', left: -12, minWidth: 210, backgroundColor: '#fff', borderRadius: 12, paddingVertical: 8,
                shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8, zIndex: 100 }}>
                {item.children.map((c) => (
                  <Press key={c.label} onPress={() => { setOpen(null); navigate(c.to); }} hoverStyle={{ backgroundColor: COLORS.skyLight }}
                    style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
                    <T w="m" size={14}>{c.label}</T>
                  </Press>
                ))}
              </View>
            ) : null}
          </View>
        );
      })}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: indicatorLeft,
          top: indicatorTop,
          width: indicatorWidth,
          height: 2,
          backgroundColor: COLORS.navy,
        }}
      />
      <PortalPill onPress={goPortal} />
    </View>
  );
}

function MobileMenu({ close }) {
  const { route, navigate } = useRouter();
  const [openKey, setOpenKey] = useState(null);
  const go = (to) => { close(); navigate(to); };
  return (
    <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderTopWidth: 1, borderColor: COLORS.sky }}>
      {NAV.map((item) => {
        const hasKids = !!item.children;
        const active = isActive(item, route.path);
        return (
          <View key={item.label}>
            <Press onPress={() => (hasKids ? setOpenKey(openKey === item.label ? null : item.label) : go(item.to))}
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: COLORS.skyLight }}>
              <T w={active ? 'b' : 'sb'} size={16} color={active ? COLORS.indigo : COLORS.navy}>{item.label}</T>
              {hasKids ? <Icon name={openKey === item.label ? 'chevron-up' : 'chevron-down'} size={22} /> : null}
            </Press>
            {hasKids && openKey === item.label
              ? item.children.map((c) => (
                  <Press key={c.label} onPress={() => go(c.to)} style={{ paddingVertical: 12, paddingLeft: 16 }}>
                    <T w="m" size={14} color={COLORS.blue}>{c.label}</T>
                  </Press>
                ))
              : null}
          </View>
        );
      })}
      <View style={{ paddingVertical: 16 }}>
        <PortalPill onPress={() => go(CONFIG.portalUrl || '/student-portal')} style={{ alignSelf: 'flex-start' }} />
      </View>
    </View>
  );
}

export default function Header() {
  const { isDesktop, isMobile, pad } = useLayout();
  const { navigate } = useRouter();
  const [menu, setMenu] = useState(false);
  return (
    <View style={{ backgroundColor: COLORS.headerBg, zIndex: 50, width: '100%' }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          paddingHorizontal: pad, paddingVertical: isDesktop ? 14 : 10, minHeight: isDesktop ? 124 : 72 }}>
          <Logo width={isDesktop ? 150 : isMobile ? 84 : 100} onPress={() => navigate('/')} />
          {isDesktop ? (
            <DesktopNav />
          ) : (
            <Press onPress={() => setMenu(!menu)} accessibilityLabel="Menu" style={{ padding: 6 }}>
              <Icon name={menu ? 'close' : 'menu'} size={30} />
            </Press>
          )}
        </View>
        {!isDesktop && menu ? <MobileMenu close={() => setMenu(false)} /> : null}
      </View>
    </View>
  );
}
