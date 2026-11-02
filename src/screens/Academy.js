import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Btn, Section, Grid } from '../theme/ui';
import PageHero from '../components/PageHero';
import { useRouter } from '../navigation/Router';

export default function Academy() {
  const { isMobile, isDesktop, isTablet, pad } = useLayout();
  const { navigate } = useRouter();
  const j = IMG.academy_journey;
  const feats = [
    { iconImage: require('../../assets/images/academy_feature_practical.png'), title: 'Practical Learning', desc: 'Hands on training with real world projects.' },
    { iconImage: require('../../assets/images/academy_feature_industry.png'), title: 'Industry Experts', desc: 'Learn from experienced Professionals.' },
    { iconImage: require('../../assets/images/academy_feature_labs.png'), title: 'Modern Labs', desc: 'State of the art infrastructure & tools.' },
    { iconImage: require('../../assets/images/academy_feature_placement.png'), title: 'Placement Support', desc: 'Guidance for better career opportunities.' },
  ];
  return (
    <View>
      <PageHero img="academy_hero" eyebrow="ACADEMY" title={'Build Skills. Gain Confidence.\nCreate Opportunities.'} titleSize={48} textWidth="74%" bodyWidth="80%" textOffsetY={-20}
        body="Zalomi Academy offers industry relevant, hands on training programs designed to equip you with practical skills and real world experience. Our goal is to help you become job ready, future ready and confident in your career journey."
        cta="Explore our Courses" onCta={() => navigate('/courses')} />
      <Section bg="#F5F9FC" vPad={isMobile ? 34 : 54}>
        <T w="b" size={isMobile ? 22 : 28}>Why Choose Our Academy ?</T>
        <T w="m" size={isMobile ? 15 : isDesktop ? 24 : 18} color={COLORS.blue} lh={isMobile ? 23 : isDesktop ? 31 : 28} style={{ marginTop: 14, maxWidth: isDesktop ? 920 : 700 }}>
          {isDesktop
            ? <>We provide a supportive learning environment with expert trainers,{'\n'}modern facilities and strong industry connections to help you{'\n'}achieve your goals.</>
            : 'We provide a supportive learning environment with expert trainers, modern facilities and strong industry connections to help you achieve your goals.'}
        </T>
        <View style={{ marginTop: isMobile ? 24 : 46 }}>
          <Grid cols={isMobile ? 2 : isTablet ? 2 : 4} gap={20}>
            {feats.map((f) => (
              <View key={f.title} style={{ alignItems: 'center', flex: 1 }}>
                <Image source={f.iconImage} style={{ width: isMobile ? 64 : 104, height: isMobile ? 64 : 104 }} resizeMode="contain" />
                <T w="b" size={isMobile ? 15 : 18} align="center" style={{ marginTop: 14 }}>{f.title}</T>
                <T w="m" size={12} align="center" color={COLORS.text} style={{ marginTop: 6, maxWidth: 190 }}>{f.desc}</T>
              </View>
            ))}
          </Grid>
        </View>
      </Section>
      <View style={{ backgroundColor: '#C1E6F9' }}>
        {isDesktop ? (
          <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
            <Image source={j.src} style={{ width: '50%', aspectRatio: j.w / j.h }} resizeMode="cover" />
            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 48, paddingVertical: pad }}>
              <T w="b" size={30} lh={40}>Your Learning Journey{'\n'}Starts Here</T>
              <T w="m" size={18} color={COLORS.blue} lh={28} style={{ marginTop: 18, maxWidth: 460 }}>
                At Zalomi Academy, we focus on building practical skills, industry knowledge and confidence - helping you take the next step towards a successful career.
              </T>
              <Btn label="View all Courses" style={{ marginTop: 24 }} onPress={() => navigate('/courses')} />
            </View>
          </View>
        ) : (
          <View>
            <Image source={j.src} style={{ width: '100%', aspectRatio: j.w / j.h }} resizeMode="cover" />
            <View style={{ justifyContent: 'center', padding: pad }}>
              <T w="b" size={isMobile ? 24 : 30} lh={isMobile ? 32 : 40}>Your Learning Journey{'\n'}Starts Here</T>
              <T w="m" size={isMobile ? 15 : 18} color={COLORS.blue} lh={isMobile ? 24 : 28} style={{ marginTop: 18 }}>
                At Zalomi Academy, we focus on building practical skills, industry knowledge and confidence - helping you take the next step towards a successful career.
              </T>
              <Btn label="View all Courses" style={{ marginTop: 24 }} onPress={() => navigate('/courses')} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
