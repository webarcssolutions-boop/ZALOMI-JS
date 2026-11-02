import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, View, Image } from 'react-native';
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
    <Press onPress={onPress} style={{ flex: 1, height: '100%', borderRadius: 10, overflow: 'hidden', backgroundColor: bg }} hoverStyle={{ opacity: 0.92 }}>
      <View style={{ width: '100%', aspectRatio: 1.5, overflow: 'hidden' }}>
        <Image source={img.src} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>
      <View style={{ padding: 16, flex: 1 }}>
        <T w="b" size={17} lh={22} style={{ minHeight: 44 }}>{c.title}</T>
        <T w="m" size={12.5} color={COLORS.text} lh={18} style={{ marginTop: 8, marginBottom: 14, minHeight: 90 }}>{c.short}</T>
        <View style={{ flex: 1 }} />
        <Press onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T w="sb" size={11.5} color={COLORS.orange}>Learn More</T>
          <Icon name="arrow-right" size={15} color={COLORS.orange} />
        </Press>
      </View>
    </Press>
  );
}

function StatCounter({ target, suffix = '', size, lineHeight, color, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let frame;
    let start;
    const duration = 1400;
    const animate = (time) => {
      if (start === undefined) start = time;
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <T w="xb" size={size} lh={lineHeight} color={color}>
      {count.toLocaleString('en-US')}{suffix}
    </T>
  );
}

function AnimatedOpportunityIcon({ size, color, active }) {
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) return undefined;
    Animated.spring(entrance, { toValue: 1, useNativeDriver: Platform.OS !== 'web', speed: 14, bounciness: 5 }).start();
    return () => entrance.stopAnimation();
  }, [active, entrance]);

  return (
    <Animated.View style={{ opacity: entrance, transform: [{ scale: entrance }] }}>
      <Icon name="infinity" size={size} color={color} />
    </Animated.View>
  );
}

/** Four-up stats strip (11 Courses | 1000+ | 100% | infinity) */
export function StatsStrip({ onDark }) {
  const { isMobile } = useLayout();
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const col = COLORS.navy;
  const items = [
    { source: require('../../assets/images/stats_11_program.png'), target: 11, label: 'Courses' },
    { source: require('../../assets/images/stats_universities.png'), target: 1000, suffix: '+', label: 'Global Universities' },
    { source: require('../../assets/images/stats_career_support.png'), target: 100, suffix: '%', label: 'Career Support' },
    { source: require('../../assets/images/stats_opportunities.png'), iconBig: true, big: '', label: 'Opportunities' },
  ];

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setActive(true);
      return undefined;
    }

    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <View ref={containerRef} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((it, i) => (
        <View key={i} style={{ width: isMobile ? '50%' : '25%', alignItems: 'center', paddingVertical: isMobile ? 16 : 6,
          borderLeftWidth: !isMobile && i > 0 ? 2 : 0, borderColor: '#29B6E8' }}>
          <Image source={it.source} style={{ width: isMobile ? 40 : 54, height: isMobile ? 40 : 54, tintColor: '#29B6E8' }} resizeMode="contain" />
          {it.iconBig ? <AnimatedOpportunityIcon size={isMobile ? 40 : 54} color={col} active={active} /> : <StatCounter target={it.target} suffix={it.suffix} size={isMobile ? 32 : 46} lineHeight={isMobile ? 40 : 56} color={col} active={active} />}
          <T w="m" size={isMobile ? 13 : 16} color={col}>{it.label}</T>
        </View>
      ))}
    </View>
  );
}
