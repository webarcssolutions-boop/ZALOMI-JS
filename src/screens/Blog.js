import React from 'react';
import { View, Image } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { IMG } from '../theme/images';
import { T, Icon, Btn, Section, Press } from '../theme/ui';
import PageHero from '../components/PageHero';
import { POSTS, getPost, SAMPLE_BODY } from '../data/blog';
import { useRouter } from '../navigation/Router';

export function Blog() {
  const { isMobile, isDesktop } = useLayout();
  const { navigate } = useRouter();
  return (
    <View>
      <PageHero img="blog_hero" eyebrow="NEWS, BLOGS, EVENTS" title="News, Blogs & Events" titleSize={52} textWidth="50%" desktopAspectRatio={3.6} />
      <Section bg="#fff" vPad={isMobile ? 30 : 44}>
        <T w="b" size={isMobile ? 24 : 28}>Insights. Tips. Opportunities.</T>
        <T w="m" size={isMobile ? 18 : 21} color={COLORS.blue} lh={isMobile ? 25 : 29} style={{ marginTop: 8, marginBottom: 24 }}>
          Stay informed with the latest updates, expert advice and inspiring stories from the world of education, skills and global opportunities.
        </T>
        <View style={{ gap: 22 }}>
          {POSTS.map((p) => {
            const a = IMG[p.img];
            return (
              <View key={p.slug} style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'center' : 'stretch', minHeight: isDesktop ? 230 : undefined, gap: isDesktop ? 22 : 14,
                borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 8, backgroundColor: '#fff',
                shadowColor: COLORS.teal, shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 }}>
                <View style={{ width: isDesktop ? 300 : '100%', aspectRatio: 1.45, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                  <Image source={a.src} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </View>
                <View style={{ flex: 1, paddingVertical: isMobile ? 6 : 10, paddingHorizontal: isMobile ? 6 : 0 }}>
                  <T w="m" size={13} color={COLORS.teal} style={{ letterSpacing: 1.5 }}>{p.category}</T>
                  <T w="b" size={isMobile ? 20 : 24} lh={isMobile ? 28 : 32} style={{ marginTop: 6 }}>{p.title}</T>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 10 }}>
                    <Icon name="calendar-month-outline" size={18} color={COLORS.teal} />
                    <T w="m" size={12}>{p.date}</T>
                  </View>
                  <T w="m" size={isMobile ? 15 : 16} color={COLORS.text} lh={isMobile ? 23 : 24} style={{ maxWidth: 520 }}>{p.summary}</T>
                </View>
                <Btn label="Read More" variant="filledNavy" onPress={() => navigate('/blog/' + p.slug)} style={{ marginRight: isDesktop ? 40 : 0, alignSelf: isDesktop ? 'center' : 'flex-start', marginLeft: isDesktop ? 0 : 6, marginBottom: isDesktop ? 0 : 6 }} />
              </View>
            );
          })}
        </View>
      </Section>
    </View>
  );
}

export function BlogDetail() {
  const { route, navigate, goBack } = useRouter();
  const { isMobile } = useLayout();
  const p = getPost(route.params.slug);
  if (!p) return <Section bg="#fff"><T w="b" size={22}>Post not found</T><Btn label="All posts" style={{ marginTop: 16 }} onPress={() => navigate('/blog')} /></Section>;
  const a = IMG[p.img];
  return (
    <Section bg="#fff" vPad={isMobile ? 26 : 50} innerStyle={{ maxWidth: 980 }}>
      <Press onPress={() => navigate('/blog')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 18 }}>
        <Icon name="arrow-left" size={20} /><T w="sb" size={14}>Back to News, Blogs & Events</T>
      </Press>
      <Image source={a.src} style={{ width: '100%', aspectRatio: 1.9, borderRadius: 10 }} resizeMode="cover" />
      <T w="m" size={13} color={COLORS.teal} style={{ letterSpacing: 1.5, marginTop: 22 }}>{p.category}</T>
      <T w="xb" size={isMobile ? 28 : 40} lh={isMobile ? 36 : 50} style={{ marginTop: 6 }}>{p.title}</T>
      <T w="m" size={13} color={COLORS.muted} style={{ marginTop: 8, marginBottom: 20 }}>{p.date}</T>
      <T w="m" size={18} color={COLORS.ink} lh={30} style={{ marginBottom: 14 }}>{p.summary}</T>
      {SAMPLE_BODY.map((t, i) => <T key={i} w="r" size={18} color={COLORS.ink} lh={30} style={{ marginBottom: 14 }}>{t}</T>)}
      <Btn label="Register / Enquire" variant="filledNavy" style={{ marginTop: 10 }} onPress={() => navigate('/contact')} />
    </Section>
  );
}
