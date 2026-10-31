import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, IconCircle, Btn, Section, Grid } from '../theme/ui';
import { StatsStrip } from '../components/cards';
import { useRouter } from '../navigation/Router';

const H3 = ({ children }) => {
  const { isMobile } = useLayout();
  return <T w="b" size={isMobile ? 17 : 19} style={{ marginBottom: 18 }}>{children}</T>;
};

function MiniCard({ icon, title, desc, center, h }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#C2E7F9', borderRadius: 10, padding: 20, minHeight: h, alignItems: center ? 'center' : 'flex-start' }}>
      <IconCircle name={icon} size={52} />
      <T w="b" size={13} align={center ? 'center' : 'left'} style={{ marginTop: 12 }}>{title}</T>
      <T w="m" size={11.5} color={COLORS.text} lh={17} align={center ? 'center' : 'left'} style={{ marginTop: 8 }}>{desc}</T>
    </View>
  );
}

export default function About() {
  const { isMobile, isTablet, isDesktop, pad, sc } = useLayout();
  const { navigate } = useRouter();
  const campus = IMG.campus, path = IMG.about_path, banner = IMG.about_banner;
  return (
    <View>
      {/* Top strip */}
      <View style={{ backgroundColor: '#BDE5F8' }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'stretch' : 'flex-start' }}>
          <View style={{ flex: isDesktop ? 1 : undefined, justifyContent: 'center', paddingHorizontal: pad, paddingVertical: isMobile ? 26 : 40 }}>
            <T w="xb" size={isMobile ? 34 : Math.round(54 * sc)}>About Us</T>
            <T w="m" size={isMobile ? 15 : 20} color={COLORS.teal} lh={isMobile ? 22 : 28} style={{ marginTop: 10 }}>
              Empowering learners. Building careers.{'\n'}Creating global opportunities.
            </T>
            <Icon name="arrow-right" size={24} color={COLORS.navy} style={{ marginTop: 14 }} />
          </View>
          <Image source={campus.src} style={isDesktop ? { width: '38%', aspectRatio: campus.w / campus.h } : { width: '100%', aspectRatio: campus.w / campus.h }} resizeMode="cover" />
        </View>
      </View>

      {/* Mission */}
      <Section bg="#F6F9FC" vPad={isMobile ? 30 : 50}>
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
            <Image source={path.src} style={{ width: '100%', aspectRatio: path.w / path.h }} resizeMode="contain" />
          </View>
        </View>
        <View style={{ marginTop: isMobile ? 20 : 10 }}><StatsStrip /></View>
      </Section>

      {/* Competence */}
      <Section bg="#F6F9FC" vPad={isMobile ? 16 : 24}>
        <H3>Crafting Competence Through Practical Mastery</H3>
        <Grid cols={isMobile ? 1 : isTablet ? 2 : 4} gap={22}>
          <MiniCard icon="cog-outline" title="Technical & Vocational Mastery" desc="Hands on training in computer and smartphone servicing and specialized technical disciplines." h={170} />
          <MiniCard icon="lightbulb-on-outline" title="Zalomi Care" desc="Zalomi Care is Zalomi's dedicated brand for smartphone, computer, and electronic gadget service and maintenance." h={170} />
          <MiniCard icon="translate" title="Communication & Language Development" desc="Building articulate, confident communicators prepared for modern professional environments." h={170} />
          <MiniCard icon="head-cog-outline" title="Entrepreneurial Readiness" desc="Cultivating commercial awareness and strategic thinking to help visionaries turn skills into sustainable enterprises." h={170} />
        </Grid>
        <View style={{ height: 18 }} />
        <H3>Illuminating Pathways & Global Aspirations</H3>
        <Grid cols={isMobile ? 1 : 2} gap={22}>
          <WideCard icon="compass-outline" title="Career Lab & Assessments" desc="Utilizing psychometric tools and career Lab initiatives to uncover inherent strengths and match individual aspirations with the right paths." />
          <WideCard icon="web" title="Global Mobility & Higher Education" desc="Providing structured guidance for international education, global career opportunities, and language proficiency requirements." />
        </Grid>
        <View style={{ height: 18 }} />
        <H3>Building a Collaborative Skill Ecosystem</H3>
        <Grid cols={isMobile ? 1 : isTablet ? 2 : 3} gap={28}>
          <MiniCard center icon="school-outline" title="Schools & Colleges" desc="Partnering with educational institution to create industry relevant learning pathways." h={170} />
          <MiniCard center icon="account-group-outline" title="Employers & Industry" desc="Connecting learners with real world opportunities and industry experts." h={170} />
          <MiniCard center icon="hand-heart-outline" title="Community Impact" desc="Creating inclusive access to quality education and skill development for all." h={170} />
        </Grid>
      </Section>

      {/* Purpose banner */}
      <View style={{ marginTop: 24 }}>
        {isDesktop ? (
          <View style={{ width: '100%', aspectRatio: banner.w / banner.h, backgroundColor: banner.left }}>
            <Image source={banner.src} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="cover" />
            <View style={{ position: 'absolute', left: pad, top: 0, bottom: 0, width: '52%', justifyContent: 'center' }}>
              <PurposeText />
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: banner.left }}>
            <View style={{ padding: 24 }}><PurposeText /></View>
            <Image source={banner.src} style={{ width: '100%', aspectRatio: banner.w / banner.h }} resizeMode="cover" />
          </View>
        )}
      </View>
    </View>
  );
}

function WideCard({ icon, title, desc }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#C2E7F9', borderRadius: 10, padding: 20, flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
      <IconCircle name={icon} size={52} />
      <View style={{ flex: 1 }}>
        <T w="b" size={13}>{title}</T>
        <T w="m" size={11.5} color={COLORS.text} lh={17} style={{ marginTop: 6 }}>{desc}</T>
      </View>
    </View>
  );
}

function PurposeText() {
  const { isMobile, sc } = useLayout();
  const { navigate } = useRouter();
  const s = isMobile ? 32 : Math.round(56 * sc);
  return (
    <View>
      <T w="xb" size={s} lh={Math.round(s * 1.12)} color="#fff">Your Potential.{'\n'}Our Purpose.</T>
      <T w="m" size={isMobile ? 13 : 13} color="#fff" lh={20} style={{ marginTop: 12, maxWidth: 560 }}>
        At Zalomi School of Skills, our goal is to make purposeful, high value education accessible to all. We are dedicated to nurturing an environment where every learner can discover their true potential, master marketable skills, and step into the future with absolute clarity, confidence and vision.
      </T>
      <Btn label="Explore our programs" variant="outlineOrange" size="sm" style={{ marginTop: 14 }} onPress={() => navigate('/courses')} />
    </View>
  );
}
