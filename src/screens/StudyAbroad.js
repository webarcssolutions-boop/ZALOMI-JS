import React, { useRef, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, Btn, Section, Grid, Press } from '../theme/ui';
import PageHero from '../components/PageHero';
import { SupportCard } from '../components/cards';
import { useRouter } from '../navigation/Router';

const DEST = [
  { name: 'UK', img: 'dest_uk' }, { name: 'AUSTRALIA', img: 'dest_australia' }, { name: 'GERMANY', img: 'dest_germany' },
  { name: 'CANADA', img: 'dest_canada' }, { name: 'RUSSIA', img: 'dest_russia' },
];

function Destinations() {
  const { isMobile, isTablet } = useLayout();
  const ref = useRef(null);
  const [boxW, setBoxW] = useState(0);
  const [x, setX] = useState(0);
  const perView = isMobile ? 1.4 : isTablet ? 3 : 5;
  const gap = 18;
  const itemW = boxW ? (boxW - gap * (Math.floor(perView) - 1)) / perView : 200;
  const maxX = Math.max(0, DEST.length * (itemW + gap) - gap - boxW);
  const scrollTo = (nx) => {
    const v = Math.max(0, Math.min(maxX, nx));
    ref.current && ref.current.scrollTo({ x: v, animated: true });
    setX(v);
  };
  const Arrow = ({ dir }) => (
    <Press onPress={() => scrollTo(x + dir * (itemW + gap))} style={{ padding: 4 }} hoverStyle={{ opacity: 0.6 }} accessibilityLabel={dir < 0 ? 'Previous' : 'Next'}>
      <Icon name={dir < 0 ? 'chevron-left' : 'chevron-right'} size={isMobile ? 28 : 40} color={COLORS.navy} />
    </Press>
  );
  return (
    <View style={{ backgroundColor: '#D6EEF9', borderRadius: 12, padding: isMobile ? 18 : 28 }}>
      <T w="b" size={isMobile ? 22 : 28}>Top Destinations</T>
      <T w="m" size={isMobile ? 14 : 17} color={COLORS.blue} lh={isMobile ? 22 : 26} style={{ marginTop: 8, marginBottom: 18 }}>
        Study in leading countries with world class education, cutting edge facilities and global exposure.
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Arrow dir={-1} />
        <View style={{ flex: 1 }} onLayout={(e) => setBoxW(e.nativeEvent.layout.width)}>
          <ScrollView ref={ref} horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}
            onScroll={(e) => setX(e.nativeEvent.contentOffset.x)}>
            {DEST.map((d, i) => {
              const a = IMG[d.img];
              return (
                <View key={d.name} style={{ width: itemW, marginRight: i < DEST.length - 1 ? gap : 0, borderRadius: 10, overflow: 'hidden' }}>
                  <View style={{ width: '100%', aspectRatio: 1.05, overflow: 'hidden' }}>
                    <Image source={a.src} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  </View>
                  <View style={{ height: 42, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                    <T w="sb" size={14} style={{ letterSpacing: 3 }}>{d.name}</T>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Arrow dir={1} />
      </View>
    </View>
  );
}

export default function StudyAbroad() {
  const { isMobile, isTablet, isDesktop } = useLayout();
  const { navigate } = useRouter();
  const j = IMG.abroad_journey;
  const sup = [
    { icon: 'school', title: 'University Selection', desc: 'Find the right university and course for your goals.' },
    { icon: 'file-document-edit-outline', title: 'Application Support', desc: 'Guidance with applications, documents and interviews.' },
    { icon: 'passport', title: 'Visa Guidance', desc: 'Step by step support for your student visa.' },
    { icon: 'airplane', title: 'Accommodation & Travel', desc: 'Safe stay, easy travel, peace of mind.' },
    { icon: 'shield-heart-outline', title: 'Pre Departure Support', desc: 'Orientation, travel tips and ongoing assistance.' },
  ];
  return (
    <View>
      <PageHero img="abroad_hero" eyebrow="STUDY ABROAD" title="Study Abroad" titleSize={56} textWidth="44%"
        body={'Explore world class universities, gain International exposure and build a global career with Zalomi Edulab.'} bodyColor={COLORS.blue}
        cta="Explore Your Options" onCta={() => navigate('/admission')} />
      <Section bg="#fff" vPad={isMobile ? 28 : 40}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', gap: 32 }}>
          <View style={{ flex: isDesktop ? 1 : undefined }}>
            <T w="xb" size={isMobile ? 24 : 28} lh={isMobile ? 32 : 36}>Your Global Education{'\n'}Journey Begins Here</T>
            <T w="m" size={isMobile ? 14 : 16} color={COLORS.blue} lh={isMobile ? 23 : 25} style={{ marginTop: 18, maxWidth: 560 }}>
              Gain an internationally recognized degree, experience diverse cultures, and unlock global career opportunities. Zalomi Edulab provides end to end support from university selection to visa, travel and accommodation, making your study abroad journey smooth and stress free.
            </T>
            <Btn label="Get Expert Guidance" size="sm" style={{ marginTop: 18 }} onPress={() => navigate('/contact')} />
          </View>
          <Image source={j.src} style={{ width: isDesktop ? '40%' : '100%', aspectRatio: j.w / j.h, borderRadius: 10 }} resizeMode="cover" />
        </View>
        <T w="xb" size={isMobile ? 22 : 26} style={{ marginTop: 40, marginBottom: 18 }}>Our Support Includes</T>
        <Grid cols={isMobile ? 1 : isTablet ? 2 : 5} gap={isMobile ? 14 : 22}>
          {sup.map((s) => <SupportCard key={s.title} {...s} minH={190} />)}
        </Grid>
        <View style={{ marginTop: 34 }}><Destinations /></View>
      </Section>
    </View>
  );
}
