import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Btn, Section, Grid, ContentFrame } from '../theme/ui';
import PageHero from '../components/PageHero';
import { SupportCard } from '../components/cards';
import { useRouter } from '../navigation/Router';

function Band({ img, children, side = 'left', width = '46%', minH }) {
  const a = IMG[img];
  const { isDesktop, pad } = useLayout();
  if (!isDesktop) {
    return (
      <View style={{ backgroundColor: a.left }}>
        <View style={{ paddingHorizontal: pad, paddingVertical: 24 }}>{children}</View>
        <Image source={a.src} style={{ width: '100%', aspectRatio: a.w / a.h }} resizeMode="cover" />
      </View>
    );
  }
  return (
    <View style={{ width: '100%', aspectRatio: a.w / a.h, backgroundColor: a.left }}>
      <Image source={a.src} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="cover" />
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center' }}>
        <ContentFrame style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{ width }}>{children}</View>
        </ContentFrame>
      </View>
    </View>
  );
}

export default function ZalomiCare() {
  const { isMobile, isTablet, sc } = useLayout();
  const { navigate } = useRouter();
  const sup = [
    { icon: 'account-voice', title: 'Business Planning', desc: 'Turn your ideas into structured plans with guidance and expert advice.' },
    { icon: 'monitor-account', title: 'Mentorship', desc: 'Learn from industry experts and successful entrepreneurs.' },
    { icon: 'currency-inr', title: 'Funding Guidance', desc: 'Get support in exploring funding and investment opportunities.' },
    { icon: 'vector-triangle', title: 'Networking', desc: 'Connect with a growing community of alumni, mentors and industry professionals.' },
    { icon: 'chart-bar', title: 'Career Support', desc: 'Access job opportunities, placement assistance and career counselling.' },
  ];
  const h2 = isMobile ? 24 : Math.round(30 * sc);
  return (
    <View>
      <PageHero img="care_hero" eyebrow="ZALOMI CARE" title="Zalomi Care" titleSize={54} textWidth="50%"
        sub={'Guidance Beyond the Academy.\nSupport for Every Step.'}
        body="Zalomi Care is Zalomi's dedicated brand for smartphone, computer, and electronic gadget service and maintenance. We aim to make dependable technology care accessible while helping skilled professionals become entrepreneurs through a structured franchise network."
        cta="Read More" onCta={() => navigate('/about')} />
      <Band img="care_journey">
        <T w="xb" size={h2} lh={Math.round(h2 * 1.3)}>Your Business Journey{'\n'}Starts Here</T>
        <T w="m" size={isMobile ? 14 : 17} color={COLORS.blue} lh={isMobile ? 22 : 27} style={{ marginTop: 16, maxWidth: 420 }}>
          Guidance, mentorship and support for our students to take their next business or career step with confidence.
        </T>
        <Btn label="Lets Talk" size="sm" style={{ marginTop: 16 }} onPress={() => navigate('/contact')} />
      </Band>
      <Section bg="#fff" vPad={isMobile ? 30 : 40}>
        <T w="xb" size={isMobile ? 22 : 26} style={{ marginBottom: 20 }}>How We Support You</T>
        <Grid cols={isMobile ? 1 : isTablet ? 2 : 5} gap={isMobile ? 14 : 24}>
          {sup.map((s) => <SupportCard key={s.title} {...s} minH={190} />)}
        </Grid>
      </Section>
      <Band img="care_startups" width="48%">
        <T w="xb" size={h2} lh={Math.round(h2 * 1.3)}>From Skills to{'\n'}Successful Startups</T>
        <T w="m" size={isMobile ? 14 : 17} color={COLORS.blue} lh={isMobile ? 22 : 27} style={{ marginTop: 16, maxWidth: 500 }}>
          Zalomi Care empowers you with the right support, resources and connections to turn your skills into real world success, whether you're starting a business or building your career.
        </T>
        <Btn label="Get Started" size="sm" style={{ marginTop: 16 }} onPress={() => navigate('/contact')} />
      </Band>
    </View>
  );
}
