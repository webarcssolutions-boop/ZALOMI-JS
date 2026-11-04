import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, IconCircle, Btn, Section, Grid, Press, ContentFrame } from '../theme/ui';
import { StatsStrip } from '../components/cards';
import MovingIcons from '../components/MovingIcons';
import { HOME_NEWS } from '../data/blog';
import { useRouter } from '../navigation/Router';

const Eyebrow = ({ children, color = COLORS.teal }) => (
  <T w="b" size={15} color={color} style={{ letterSpacing: 3, marginBottom: 6 }}>{children}</T>
);

function Hero() {
  const { isDesktop, isMobile, pad, sc, width } = useLayout();
  const { navigate } = useRouter();
  const w = IMG.home_hero_woman;
  const h1 = isDesktop ? Math.round(62 * sc) : isMobile ? 36 : 48;
  const artHeight = Math.min(isMobile ? 330 : 460, Math.max(220, (width - pad * 2) * 0.78));
  const text = (
    <View style={{ maxWidth: isDesktop ? 600 : 560 }}>
      <T w="xb" size={h1} lh={Math.round(h1 * 1.2)}>Asses.{'\n'}Learn.{'\n'}Build Skills.</T>
      <T w="xb" size={h1} lh={Math.round(h1 * 1.2)} color={COLORS.indigo}>Go Global.</T>
      <T w="m" size={isMobile ? 15 : 18} color="#27A39B" style={{ marginTop: 18, maxWidth: 480 }}>
        Practical technology training and language pathways designed to prepare you for real - world careers.
      </T>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        <Btn label="Explore Courses" variant="filled" onPress={() => navigate('/courses')} />
        <Btn label="Talk to an Adviser" variant="filled" onPress={() => navigate('/contact')} />
      </View>
    </View>
  );
  if (!isDesktop) {
    return (
      <View style={{ backgroundColor: COLORS.mint, overflow: 'hidden' }}>
        <View style={{ paddingHorizontal: pad, paddingTop: 30 }}>{text}</View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 10, height: artHeight }}>
          <Image source={w.src} style={{ width: artHeight * w.w / w.h, height: artHeight }} resizeMode="contain" />
          <MovingIcons height={artHeight * 0.9} style={{ marginLeft: 8, marginBottom: 14 }} />
        </View>
      </View>
    );
  }
  const H = Math.round(780 * Math.max(0.78, sc));
  return (
    <View style={{ backgroundColor: COLORS.mint, height: H, overflow: 'hidden' }}>
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center' }}>
        <ContentFrame style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{ width: '48%' }}>{text}</View>
        </ContentFrame>
      </View>
      <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center' }}>
        <ContentFrame pointerEvents="box-none" style={{ height: '100%', paddingHorizontal: 0 }}>
          <Image pointerEvents="none" source={w.src} style={{ position: 'absolute', bottom: 0, left: '49%', width: H * 0.96 * w.w / w.h, height: H * 0.96 }} resizeMode="contain" />
          <MovingIcons height={H * 0.9} style={{ position: 'absolute', right: 0, top: H * 0.05 }} />
        </ContentFrame>
      </View>
    </View>
  );
}

function Tiles() {
  const { isMobile } = useLayout();
  const { navigate } = useRouter();
  const tiles = [
    { icon: require('../../assets/images/home_icon_career.png'), title: 'Career Labs', sub: 'Discover your path', to: '/career-labs' },
    { icon: require('../../assets/images/home_icon_academy.png'), title: 'Academy', sub: 'Build your skills', to: '/academy' },
    { icon: require('../../assets/images/home_icon_care.png'), title: 'Zalomi Care', sub: 'Start your business', to: '/zalomi-care' },
    { icon: require('../../assets/images/home_icon_abroad.png'), title: 'Study Abroad', sub: 'Go Global', to: '/study-abroad' },
  ];
  const cards = tiles.map((t) => (
    <Press key={t.title} onPress={() => navigate(t.to)} hoverStyle={{ opacity: 0.9 }}
      style={{ backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', paddingVertical: 22, paddingHorizontal: 10, flex: isMobile ? 1 : undefined, width: isMobile ? undefined : '19.5%' }}>
      <Image source={t.icon} style={{ width: isMobile ? 54 : 66, height: isMobile ? 54 : 66 }} resizeMode="contain" />
      <T w="b" size={14} style={{ marginTop: 12 }} color="#222">{t.title}</T>
      <T w="m" size={12} color="#222" style={{ marginBottom: 8 }}>{t.sub}</T>
      <Icon name="arrow-right" size={26} />
    </Press>
  ));
  return (
    <Section bg={COLORS.skyBand} vPad={isMobile ? 28 : 34}
      innerStyle={{ paddingTop: isMobile ? 24 : 28, paddingBottom: 0 }}>
      {isMobile ? (
        <Grid cols={2} gap={14}>{cards}</Grid>
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>{cards}</View>
      )}
    </Section>
  );
}

function Bridging() {
  const { isMobile, isDesktop, sc } = useLayout();
  const { navigate } = useRouter();
  const a = IMG.home_bridge;
  const h2 = isDesktop ? Math.round(52 * sc) : isMobile ? 30 : 40;
  return (
    <Section bg={COLORS.skyBand} vPad={isMobile ? 24 : 30}
      innerStyle={{ paddingTop: isDesktop ? 144 : 6, paddingBottom: isDesktop ? 144 : 6 }}>
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', gap: 30 }}>
        <View style={{ flex: isDesktop ? 1 : undefined }}>
          <T w="xb" size={h2} lh={Math.round(h2 * 1.25)}>Bridging the Gap{'\n'}Between Learning</T>
          <T w="xb" size={h2} lh={Math.round(h2 * 1.25)} color="#2A7B9B">and Real-World Success</T>
          <T w="m" size={isMobile ? 15 : 18} color={COLORS.ink} lh={isMobile ? 24 : 28} style={{ marginTop: 20, maxWidth: 520 }}>
            Zalomi School of skills empowers students, Professionals and future innovators with hand on training, industry - relevant skills and global opportunities
          </T>
          <Btn label="Learn More" variant="filled" style={{ marginTop: 24 }} onPress={() => navigate('/about')} />
        </View>
        <View style={{ flex: isDesktop ? 1 : undefined, alignItems: isDesktop ? 'flex-end' : 'center', width: isDesktop ? undefined : '100%', transform: isDesktop ? [{ translateY: 20 }] : undefined }}>
          <View style={{ width: isMobile ? 300 : 520, aspectRatio: a.w / a.h }}>
            <Image source={a.src} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          </View>
        </View>
      </View>
    </Section>
  );
}

function Programs() {
  const { isMobile, isTablet, isDesktop } = useLayout();
  const { navigate } = useRouter();
  const w = IMG.home_programs_woman;
  const cards = [
    { img: 'home_card_career', icon: require('../../assets/images/home_icon_career.png'), title: 'Career Labs', desc: 'Discover your skills, explore careers, shape your future.', tint: '#E3F6F1', btn: '#6CCBB0', to: '/career-labs' },
    { img: 'home_card_academy', icon: require('../../assets/images/home_icon_academy.png'), title: 'Academy', desc: 'Build in -demand skills and industry ready confidence.', tint: '#E0F3FC', btn: '#5BC0EB', to: '/academy' },
    { img: 'home_card_care', icon: require('../../assets/images/home_icon_care.png'), title: 'Zalomi Care', desc: 'Guidance for your business journey from learning to launch.', tint: '#FDF3F5', btn: '#E8505B', to: '/zalomi-care' },
    { img: 'home_card_abroad', icon: require('../../assets/images/home_icon_abroad.png'), title: 'Study Abroad', desc: 'Global education opportunities for a brighter tomorrow.', tint: '#DCEFFA', btn: COLORS.navy, to: '/study-abroad' },
  ];
  return (
    <Section bg="#F7FBFE" vPad={isMobile ? 16 : 12}
      innerStyle={{ paddingTop: isDesktop ? 0 : 6, paddingBottom: 0 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52 }}>
        <View>
          <Eyebrow>OUR PROGRAMS</Eyebrow>
          <T w="xb" size={isMobile ? 30 : 46} lh={isMobile ? 38 : 56}>Our Programs</T>
          <T w="m" size={isMobile ? 15 : 18} color={COLORS.blue}>Choose your path. Build your future.</T>
        </View>
        {!isMobile ? (
          <View style={{ width: 190, height: 170, alignItems: 'center', justifyContent: 'flex-end', marginRight: 60, transform: [{ translateY: 20 }] }}>
            <View style={{ position: 'absolute', bottom: 0, width: 145, height: 145, borderRadius: 73, backgroundColor: '#9FE0D0' }} />
            <Image source={w.src} style={{ height: 190, aspectRatio: w.w / w.h, marginBottom: 0 }} resizeMode="contain" />
          </View>
        ) : null}
      </View>
      <Grid cols={isMobile ? 1 : isTablet ? 2 : 4} gap={isMobile ? 18 : 14}>
        {cards.map((c) => {
          const im = IMG[c.img];
          return (
            <View key={c.title} style={{ flex: 1, height: '100%', borderRadius: 4, overflow: 'hidden', backgroundColor: c.tint }}>
              <View style={{ width: '100%', aspectRatio: 1.35, overflow: 'hidden' }}>
                <Image source={im.src} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              </View>
              <View style={{ padding: 20, paddingTop: 22, flex: 1 }}>
                <Image source={c.icon} style={{ width: 48, height: 48, tintColor: c.btn }} resizeMode="contain" />
                <T w="b" size={15} color="#222" style={{ marginTop: 14, minHeight: 23 }}>{c.title}</T>
                <T w="m" size={13} color="#333" lh={19} style={{ marginTop: 6, marginBottom: 18, minHeight: 40 }}>{c.desc}</T>
                <View style={{ flex: 1 }} />
                <Press onPress={() => navigate(c.to)} style={{ alignSelf: 'flex-start', flexDirection: 'row', gap: 6, alignItems: 'center', borderWidth: 1, borderColor: c.btn, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 5 }}>
                  <T w="sb" size={10.5} color={c.btn === COLORS.navy ? COLORS.navy : c.btn}>Learn More</T>
                  <Icon name="arrow-right" size={13} color={c.btn} />
                </Press>
              </View>
            </View>
          );
        })}
      </Grid>
    </Section>
  );
}

function CoursesBand() {
  const { isMobile, isDesktop } = useLayout();
  const { navigate } = useRouter();
  const a = IMG.home_courses;
  const titleSize = isDesktop ? 36 : isMobile ? 30 : 32;
  return (
    <Section bg="#F4FAFE" vPad={isMobile ? 12 : 16}>
      <View style={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, backgroundColor: '#F4FAFE', borderRadius: 10, paddingLeft: isMobile ? 12 : 16, paddingRight: isMobile ? 12 : 0 }}>
        <View style={{ flex: 1 }}>
          <Eyebrow color="#27A39B">ZALOMI COURSES & PROGRAM</Eyebrow>
          <T w="xb" size={titleSize} lh={Math.round(titleSize * 1.2)}>11 Courses & 5 Program</T>
          <T w="m" size={isMobile ? 15 : 17} color={COLORS.ink} style={{ marginTop: 6 }}>Industry focused courses for a future ready you.</T>
          <Btn label="View All Courses" variant="outlineRed" style={{ marginTop: 20 }} onPress={() => navigate('/courses')} />
        </View>
        <View style={{ width: isMobile ? '100%' : '36%', aspectRatio: a.w / a.h, borderRadius: 18, overflow: 'hidden' }}>
          <Image source={a.src} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      </View>
    </Section>
  );
}

function AbroadBanner() {
  const { isMobile, isDesktop, pad, sc } = useLayout();
  const { navigate } = useRouter();
  const a = IMG.home_abroad_banner;
  const h2 = isDesktop ? Math.round(52 * sc) : isMobile ? 28 : 38;
  const textBlock = (
    <View style={{ maxWidth: 560 }}>
      <T w="m" size={15} color="#fff" style={{ letterSpacing: 3, opacity: 0.85 }}>STUDY ABROAD</T>
      <T w="xb" size={h2} lh={Math.round(h2 * 1.2)} color="#fff" style={{ marginTop: 6 }}>Your Global{'\n'}Education Gateway</T>
      <T w="m" size={isMobile ? 14 : 17} color="#fff" style={{ marginTop: 12 }}>Top universities. Expert guidance. End to end support.</T>
      <Btn label="Explore more" variant="outlineWhite" style={{ marginTop: 18 }} onPress={() => navigate('/study-abroad')} />
    </View>
  );
  return (
    <Section bg="#fff" vPad={isMobile ? 6 : 8} innerStyle={{ paddingTop: 0, paddingHorizontal: isMobile ? 0 : pad }}>
      {isDesktop ? (
        <View style={{ width: '100%', aspectRatio: a.w / a.h, borderRadius: 10, overflow: 'hidden', backgroundColor: a.left }}>
          <Image source={a.src} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="cover" />
          <View style={{ position: 'absolute', left: 48, top: 0, bottom: 0, justifyContent: 'center' }}>{textBlock}</View>
        </View>
      ) : (
        <View style={{ backgroundColor: a.left }}>
          <View style={{ paddingHorizontal: isMobile ? pad : 0, paddingVertical: 24 }}>{textBlock}</View>
          <Image source={a.src} style={{ width: '100%', aspectRatio: a.w / a.h }} resizeMode="cover" />
        </View>
      )}
    </Section>
  );
}

function News() {
  const { isMobile, isTablet } = useLayout();
  const { navigate } = useRouter();
  return (
    <Section bg="#F7FBFE" vPad={isMobile ? 34 : 56}>
      <T w="xb" size={isMobile ? 26 : 38} lh={isMobile ? 34 : 48}>Latest News, Blogs & Events</T>
      <View style={{ width: 150, height: 3, backgroundColor: '#B23A48', marginTop: 2, marginBottom: 6 }} />
      <T w="b" size={isMobile ? 14 : 16} color="#27A39B" style={{ marginBottom: 26 }}>Stay updated with our latest news, events, and opportunities</T>
      <Grid cols={isMobile ? 1 : isTablet ? 2 : 3} gap={isMobile ? 18 : 40}>
        {HOME_NEWS.map((n) => (
          <View key={n.slug} style={{ flex: 1, height: '100%', backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', shadowColor: '#0B2B4A', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 3 }}>
            <View style={{ width: '100%', aspectRatio: 1.6, overflow: 'hidden' }}>
              <Image source={IMG[n.img].src} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            <View style={{ padding: 20, flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Icon name="calendar-month-outline" size={16} color={COLORS.teal} />
                <T w="m" size={10.5} color={COLORS.ink}>{n.date}</T>
              </View>
              <T w="b" size={17} lh={23} style={{ minHeight: 46 }}>{n.title}</T>
              <T w="m" size={12.5} color={COLORS.text} lh={19} style={{ marginTop: 8, marginBottom: 16, minHeight: 76 }}>{n.summary}</T>
              <View style={{ flex: 1 }} />
              <Press onPress={() => navigate('/blog/' + n.slug)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <T w="sb" size={11} color={COLORS.navy}>Read More</T>
                <Icon name="arrow-right" size={14} />
              </Press>
            </View>
          </View>
        ))}
      </Grid>
    </Section>
  );
}

function CtaBanner() {
  const { isMobile, isDesktop, pad, sc } = useLayout();
  const { navigate } = useRouter();
  const a = IMG.home_cta;
  const h2 = isDesktop ? Math.round(46 * sc) : isMobile ? 28 : 36;
  const textBlock = (
    <View style={{ maxWidth: 560, alignItems: isDesktop ? 'flex-start' : 'flex-start' }}>
      <T w="xb" size={h2} lh={Math.round(h2 * 1.25)} color="#fff">Take the First Step{'\n'}Towards Your Future</T>
      <T w="m" size={isMobile ? 14 : 15} color="#E8F4F8" style={{ marginTop: 10 }}>Join Zalomi School of Skills today and turn your dream into reality.</T>
      <Btn label="Apply Now" variant="filledRed" style={{ marginTop: 18 }} onPress={() => navigate('/admission')} />
    </View>
  );
  if (!isDesktop) {
    return (
      <View style={{ backgroundColor: '#286383' }}>
        <Image source={a.src} style={{ width: '100%', aspectRatio: a.w / a.h }} resizeMode="cover" />
        <View style={{ paddingHorizontal: pad, paddingVertical: 24 }}>{textBlock}</View>
      </View>
    );
  }
  return (
    <View style={{ width: '100%', aspectRatio: a.w / a.h, backgroundColor: '#286383' }}>
      <Image source={a.src} style={{ position: 'absolute', width: '100%', height: '100%' }} resizeMode="cover" />
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center' }}>
        <ContentFrame style={{ height: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
          {textBlock}
        </ContentFrame>
      </View>
    </View>
  );
}

export default function Home() {
  const { isMobile } = useLayout();
  return (
    <View>
      <Hero />
      <Tiles />
      <Bridging />
      <Programs />
      <CoursesBand />
      <AbroadBanner />
      <Section bg="#fff" vPad={isMobile ? 20 : 30}><StatsStrip iconScale={1.75} /></Section>
      <News />
      <CtaBanner />
    </View>
  );
}
