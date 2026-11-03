import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, IconCircle, Btn, Section, Grid, ContentFrame } from '../theme/ui';
import { StatsStrip } from '../components/cards';
import { useRouter } from '../navigation/Router';

const H3 = ({ children }) => {
  const { isMobile } = useLayout();
  return <T w="b" size={isMobile ? 17 : 19} style={{ marginBottom: 18 }}>{children}</T>;
};

function CardIcon({ name, image, size }) {
  return image
    ? <Image source={image.src} style={{ width: size, height: size }} resizeMode="contain" />
    : <IconCircle name={name} size={size} />;
}

function MiniCard({ icon, iconImage, title, desc, center, h }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#C2E7F9', borderRadius: 7, padding: 20, minHeight: h, alignItems: center ? 'center' : 'flex-start' }}>
      <CardIcon name={icon} image={iconImage} size={52} />
      <T w="b" size={13} align={center ? 'center' : 'left'} style={{ marginTop: 12 }}>{title}</T>
      <T w="m" size={11.5} color={COLORS.text} lh={17} align={center ? 'center' : 'left'} style={{ marginTop: 8 }}>{desc}</T>
    </View>
  );
}

export default function About() {
  const { isMobile, isTablet, isDesktop, width, pad, sc } = useLayout();
  const { navigate } = useRouter();
  const campus = IMG.campus, path = IMG.about_path, banner = IMG.about_banner;
  const referenceCardLayout = width >= 900;
  const purposeBannerHeight = Math.max(Math.round(width * banner.h / banner.w), Math.round(300 * sc));
  return (
    <View>
      {/* Top strip */}
      <View style={{ backgroundColor: '#BDE5F8' }}>
        {isDesktop ? (
          <View style={{ width: '100%', height: 400, overflow: 'hidden' }}>
            <View style={{ position: 'absolute', top: 0, right: 0, height: '100%', aspectRatio: campus.w / campus.h }}>
              <Image source={campus.src} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            <ContentFrame style={{ height: '100%', justifyContent: 'center' }}>
              <View style={{ width: '52%' }}>
                <T w="xb" size={Math.round(54 * sc)}>About Us</T>
                <T w="m" size={20} color={COLORS.teal} lh={28} style={{ marginTop: 10 }}>
                  Empowering learners. Building careers.{'\n'}Creating global opportunities.
                </T>
                <Icon name="arrow-right" size={24} color={COLORS.navy} style={{ marginTop: 14 }} />
              </View>
            </ContentFrame>
          </View>
        ) : (
          <ContentFrame style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 0, paddingVertical: 0 }}>
            <View style={{ paddingHorizontal: pad, paddingVertical: isMobile ? 26 : 40 }}>
              <T w="xb" size={isMobile ? 34 : Math.round(54 * sc)}>About Us</T>
              <T w="m" size={isMobile ? 15 : 20} color={COLORS.teal} lh={isMobile ? 22 : 28} style={{ marginTop: 10 }}>
                Empowering learners. Building careers.{'\n'}Creating global opportunities.
              </T>
              <Icon name="arrow-right" size={24} color={COLORS.navy} style={{ marginTop: 14 }} />
            </View>
            <Image source={campus.src} style={{ width: '100%', aspectRatio: campus.w / campus.h }} resizeMode="cover" />
          </ContentFrame>
        )}
      </View>

      {/* Mission */}
      <Section bg="#F6F9FC" vPad={isMobile ? 24 : 30}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 36, alignItems: 'center' }}>
          <View style={{ flex: isDesktop ? 1 : undefined }}>
            <T w="xb" size={isMobile ? 24 : 30} style={{ marginBottom: 14 }}>Our Mission</T>
            <T w="m" size={isMobile ? 14 : 15} color={COLORS.ink} lh={isMobile ? 23 : 25} style={{ marginBottom: 16 }}>
              Zalomi School of Skills is an education and skill development ecosystem founded on a single, transformative purpose: to bridge the gap between academic knowledge and industry reality, turning learning into meaningful career success and entrepreneurial drive. We empower students, working professionals, and aspiring innovators with the hands on capabilities, confidence and direction needed to chart a purposeful path forward.
            </T>
            <T w="m" size={isMobile ? 14 : 15} color={COLORS.ink} lh={isMobile ? 23 : 25}>
              Deeply rooted in the cultural ethos of Kerala and enriched by a nuanced understanding of India, GCC and Europe, our vision aligns contemporary education with real world workplace expectations. We believe true learning transcends text; it builds competence, fuels initiative, and prepares individuals to thrive in a dynamically evolving global economy.
            </T>
          </View>
          <View style={{ flex: isDesktop ? 1 : undefined, width: isDesktop ? undefined : '100%' }}>
            <View style={{ width: '100%', aspectRatio: path.w / path.h }}>
              <Image source={path.src} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
          </View>
        </View>
        <View style={{ marginTop: isMobile ? 20 : 10 }}><StatsStrip iconScale={1.75} /></View>
      </Section>

      {/* Competence */}
      <Section bg="#F6F9FC" vPad={isMobile ? 16 : 12}>
        <H3>Crafting Competence Through Practical Mastery</H3>
        <Grid
          cols={isMobile ? 1 : referenceCardLayout ? 4 : 2}
          gap={referenceCardLayout ? 0 : 22}
          style={referenceCardLayout ? { justifyContent: 'space-between', marginHorizontal: 0 } : undefined}
          itemStyle={referenceCardLayout ? { width: '20.5%', padding: 0 } : undefined}
        >
          <MiniCard iconImage={IMG.about_technical_icon} title="Technical & Vocational Mastery" desc="Hands on training in computer and smartphone servicing and specialized technical disciplines." h={211} />
          <MiniCard iconImage={IMG.about_care_icon} title="Zalomi Care" desc="Zalomi Care is Zalomi's dedicated brand for smartphone, computer, and electronic gadget service and maintenance." h={211} />
          <MiniCard iconImage={IMG.about_communication_icon} title="Communication & Language Development" desc="Building articulate, confident communicators prepared for modern professional environments." h={211} />
          <MiniCard iconImage={IMG.about_entrepreneurial_icon} title="Entrepreneurial Readiness" desc="Cultivating commercial awareness and strategic thinking to help visionaries turn skills into sustainable enterprises." h={211} />
        </Grid>
        <View style={{ height: 18 }} />
        <H3>Illuminating Pathways & Global Aspirations</H3>
        <Grid
          cols={isMobile ? 1 : 2}
          gap={referenceCardLayout ? 0 : 22}
          style={referenceCardLayout ? { justifyContent: 'space-between', marginHorizontal: 0 } : undefined}
          itemStyle={referenceCardLayout ? { width: '49%', padding: 0 } : undefined}
        >
          <WideCard iconImage={IMG.about_career_lab_icon} title="Career Lab & Assessments" desc="Utilizing psychometric tools and career Lab initiatives to uncover inherent strengths and match individual aspirations with the right paths." />
          <WideCard iconImage={IMG.about_global_mobility_icon} title="Global Mobility & Higher Education" desc="Providing structured guidance for international education, global career opportunities, and language proficiency requirements." />
        </Grid>
        <View style={{ height: 18 }} />
        <H3>Building a Collaborative Skill Ecosystem</H3>
        <Grid
          cols={isMobile ? 1 : referenceCardLayout ? 3 : isTablet ? 2 : 3}
          gap={referenceCardLayout ? 0 : 28}
          style={referenceCardLayout ? { justifyContent: 'space-between', marginHorizontal: 0 } : undefined}
          itemStyle={referenceCardLayout ? { width: '25%', padding: 0 } : undefined}
        >
          <MiniCard center iconImage={IMG.about_schools_icon} title="Schools & Colleges" desc="Partnering with educational institution to create industry relevant learning pathways." h={195} />
          <MiniCard center iconImage={IMG.about_employers_icon} title="Employers & Industry" desc="Connecting learners with real world opportunities and industry experts." h={195} />
          <MiniCard center iconImage={IMG.about_community_icon} title="Community Impact" desc="Creating inclusive access to quality education and skill development for all." h={195} />
        </Grid>
      </Section>

      {/* Purpose banner */}
      <View style={{ marginTop: 24 }}>
        {isDesktop ? (
          <View style={{ width: '100%', minHeight: purposeBannerHeight, backgroundColor: banner.left }}>
            <Image source={banner.src} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="stretch" />
            <ContentFrame style={{ minHeight: purposeBannerHeight, paddingVertical: Math.round(16 * sc), justifyContent: 'center' }}>
              <View style={{ width: '52%' }}><PurposeText /></View>
            </ContentFrame>
          </View>
        ) : (
          <View style={{ backgroundColor: banner.left }}>
            <View style={{ paddingHorizontal: pad, paddingVertical: 24 }}><PurposeText /></View>
            <Image source={banner.src} style={{ width: '100%', aspectRatio: banner.w / banner.h }} resizeMode="cover" />
          </View>
        )}
      </View>
    </View>
  );
}

function WideCard({ icon, iconImage, title, desc }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#C2E7F9', borderRadius: 7, padding: 12, flexDirection: 'row', gap: 16, alignItems: 'flex-start', minHeight: 98 }}>
      <CardIcon name={icon} image={iconImage} size={52} />
      <View style={{ flex: 1 }}>
        <T w="b" size={13}>{title}</T>
        <T w="m" size={11.5} color={COLORS.text} lh={17} style={{ marginTop: 6 }}>{desc}</T>
      </View>
    </View>
  );
}

function PurposeText() {
  const { isMobile, isDesktop, width, sc } = useLayout();
  const { navigate } = useRouter();
  const s = isMobile ? 32 : isDesktop ? Math.round(56 * sc) : Math.min(42, Math.round(width * 0.04));
  return (
    <View style={{ width: '100%', maxWidth: 560 }}>
      <T w="xb" size={s} lh={Math.round(s * 1.12)} color="#fff">Your Potential.{'\n'}Our Purpose.</T>
      <T w="m" size={13} color="#fff" lh={20} style={{ marginTop: 12, width: '100%' }}>
        At Zalomi School of Skills, our goal is to make purposeful, high value education accessible to all. We are dedicated to nurturing an environment where every learner can discover their true potential, master marketable skills, and step into the future with absolute clarity, confidence and vision.
      </T>
      <Btn label="Explore our programs" variant="outlineOrange" size="sm" style={{ marginTop: 14 }} onPress={() => navigate('/courses')} />
    </View>
  );
}
