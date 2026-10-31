import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, IconCircle, Btn, Section, Grid } from '../theme/ui';
import PageHero from '../components/PageHero';
import { useRouter } from '../navigation/Router';

export default function Academy() {
  const { isMobile, isDesktop, isTablet, pad } = useLayout();
  const { navigate } = useRouter();
  const j = IMG.academy_journey;
  const feats = [
    { icon: 'account-group', title: 'Practical Learning', desc: 'Hands on training with real world projects.' },
    { icon: 'monitor-account', title: 'Industry Experts', desc: 'Learn from experienced Professionals.' },
    { icon: 'laptop', title: 'Modern Labs', desc: 'State of the art infrastructure & tools.' },
    { icon: 'briefcase', title: 'Placement Support', desc: 'Guidance for better career opportunities.' },
  ];
  return (
    <View>
      <PageHero img="academy_hero" eyebrow="ACADEMY" title={'Build Skills. Gain Confidence.\nCreate Opportunities.'} titleSize={48} textWidth="52%"
        body="Zalomi Academy offers industry relevant, hands on training programs designed to equip you with practical skills and real world experience. Our goal is to help you become job ready, future ready and confident in your career journey."
        cta="Explore our Courses" onCta={() => navigate('/courses')} />
      <Section bg="#F5F9FC" vPad={isMobile ? 34 : 54}>
        <T w="b" size={isMobile ? 22 : 28}>Why Choose Our Academy ?</T>
        <T w="m" size={isMobile ? 15 : 18} color={COLORS.blue} lh={isMobile ? 23 : 28} style={{ marginTop: 14, maxWidth: 700 }}>
          We provide a supportive learning environment with expert trainers, modern facilities and strong industry connections to help you achieve your goals.
        </T>
        <View style={{ marginTop: isMobile ? 24 : 46 }}>
          <Grid cols={isMobile ? 2 : isTablet ? 2 : 4} gap={20}>
            {feats.map((f) => (
              <View key={f.title} style={{ alignItems: 'center', flex: 1 }}>
                <IconCircle name={f.icon} size={isMobile ? 64 : 80} />
                <T w="b" size={isMobile ? 15 : 18} align="center" style={{ marginTop: 14 }}>{f.title}</T>
                <T w="m" size={12} align="center" color={COLORS.text} style={{ marginTop: 6, maxWidth: 190 }}>{f.desc}</T>
              </View>
            ))}
          </Grid>
        </View>
      </Section>
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', backgroundColor: '#C1E6F9' }}>
        <Image source={j.src} style={isDesktop ? { width: '55.5%', aspectRatio: j.w / j.h } : { width: '100%', aspectRatio: j.w / j.h }} resizeMode="cover" />
        <View style={{ flex: 1, justifyContent: 'center', padding: isMobile ? 24 : pad }}>
          <T w="b" size={isMobile ? 24 : 30} lh={isMobile ? 32 : 40}>Your Learning Journey{'\n'}Starts Here</T>
          <T w="m" size={isMobile ? 15 : 18} color={COLORS.blue} lh={isMobile ? 24 : 28} style={{ marginTop: 18 }}>
            At Zalomi Academy, we focus on building practical skills, industry knowledge and confidence - helping you take the next step towards a successful career.
          </T>
          <Btn label="View all Courses" style={{ marginTop: 24 }} onPress={() => navigate('/courses')} />
        </View>
      </View>
    </View>
  );
}
