import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, IconCircle, Btn, Section, Grid } from '../theme/ui';
import PageHero from '../components/PageHero';
import { SupportCard } from '../components/cards';
import { useRouter } from '../navigation/Router';

export default function CareerLabs() {
  const { isMobile, isDesktop, isTablet, pad, sc } = useLayout();
  const { navigate } = useRouter();
  const d = IMG.career_discover;
  const get = [
    { icon: 'head-cog-outline', title: 'Psychometric Assessments', desc: 'Discover your natural talents and potential.' },
    { icon: 'account-voice', title: 'Personalised Counselling', desc: 'Get expert guidance for the right career path.' },
    { icon: 'monitor-account', title: 'Interactive Workshops', desc: 'Build skills and real world awareness' },
    { icon: 'chart-timeline-variant', title: 'Career Guidance & Planning', desc: 'Make informed decisions for your future.' },
  ];
  const guide = [
    { icon: 'school', label: 'Students' }, { icon: 'account-group', label: 'Parents' },
    { icon: 'town-hall', label: 'Schools' }, { icon: 'target-account', label: 'Future Careers' },
  ];
  const s = isMobile ? 26 : Math.round(34 * sc);
  const txt = (
    <View style={{ maxWidth: 560 }}>
      <T w="xb" size={s} lh={Math.round(s * 1.25)}>Discover Your Strengths.{'\n'}Shape Your Future.</T>
      <T w="m" size={isMobile ? 14 : 17} color={COLORS.blue} lh={isMobile ? 22 : 27} style={{ marginTop: 18 }}>
        Cogniva Edu Lab helps children from the age of 13 with psychometric assessments, personalised counselling and interactive workshops to identify their skills and interests. We guide students and parents with clear career pathways for a brighter tomorrow.
      </T>
      <Btn label="Explore Career Labs" style={{ marginTop: 22 }} onPress={() => navigate('/contact')} />
    </View>
  );
  return (
    <View>
      <PageHero img="career_hero" eyebrow="CAREER LABS" title="Career Labs" titleSize={56} />
      <View style={{ backgroundColor: d.left }}>
        {isDesktop ? (
          <View style={{ width: '100%', aspectRatio: d.w / d.h, maxHeight: 640 }}>
            <Image source={d.src} style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '100%' }} resizeMode="cover" />
            <View style={{ position: 'absolute', left: pad, top: 0, bottom: 0, width: '45%', justifyContent: 'center' }}>{txt}</View>
          </View>
        ) : (
          <View><View style={{ padding: 24 }}>{txt}</View><Image source={d.src} style={{ width: '100%', aspectRatio: d.w / d.h }} resizeMode="cover" /></View>
        )}
      </View>
      <Section bg="#EAF6FC" vPad={isMobile ? 28 : 40}>
        <T w="xb" size={isMobile ? 22 : 26} style={{ marginBottom: 20 }}>What You Get</T>
        <Grid cols={isMobile ? 1 : isTablet ? 2 : 4} gap={isMobile ? 16 : 36}>
          {get.map((g) => <SupportCard key={g.title} {...g} bg="#D6EEF9" minH={160} />)}
        </Grid>
        <T w="xb" size={isMobile ? 22 : 26} style={{ marginTop: 34, marginBottom: 18 }}>Guidance For</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#D6EEF9', borderRadius: 10, paddingVertical: 24 }}>
          {guide.map((g, i) => (
            <View key={g.label} style={{ width: isMobile ? '50%' : '25%', alignItems: 'center', paddingVertical: isMobile ? 14 : 4,
              borderLeftWidth: !isMobile && i > 0 ? 2 : 0, borderColor: '#B7DCE8' }}>
              <IconCircle name={g.icon} size={isMobile ? 64 : 84} />
              <T w="b" size={isMobile ? 15 : 19} style={{ marginTop: 14 }}>{g.label}</T>
            </View>
          ))}
        </View>
      </Section>
    </View>
  );
}
