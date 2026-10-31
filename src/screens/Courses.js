import React from 'react';
import { View } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { T, Section, Grid } from '../theme/ui';
import PageHero from '../components/PageHero';
import { CourseCard } from '../components/cards';
import { COURSES } from '../data/courses';
import { useRouter } from '../navigation/Router';

export default function Courses() {
  const { isMobile, isTablet } = useLayout();
  const { navigate } = useRouter();
  return (
    <View>
      <PageHero img="courses_hero" eyebrow="ZALOMI COURSES & PROGRAM" title="Courses & Program" titleSize={54}
        sub={'Practical Skills, Real world opportunities.\nChoose your course. Build your future.'} subColor={COLORS.blue} />
      <Section bg="#fff" vPad={isMobile ? 30 : 56}>
        <T w="xb" size={isMobile ? 24 : 32} lh={isMobile ? 32 : 40}>11 Industry Focused Courses & 5</T>
        <T w="xb" size={isMobile ? 24 : 32} lh={isMobile ? 32 : 40} color="#3AA6D0">For a Brighter Future</T>
        <T w="m" size={isMobile ? 14 : 18} color={COLORS.blue} lh={isMobile ? 22 : 28} style={{ marginTop: 14, maxWidth: 1000 }}>
          Gain hands on skills, industry knowledge and real world experience with out carefully designed program courses. Choose your path and build a successful career.
        </T>
        <View style={{ marginTop: 34 }}>
          <Grid cols={isMobile ? 1 : isTablet ? 2 : 4} gap={isMobile ? 18 : 26}>
            {COURSES.map((c) => <CourseCard key={c.slug} c={c} onPress={() => navigate('/courses/' + c.slug)} />)}
          </Grid>
        </View>
      </Section>
    </View>
  );
}
