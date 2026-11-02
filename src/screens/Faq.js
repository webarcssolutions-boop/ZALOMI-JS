import React, { useState } from 'react';
import { View } from 'react-native';
import { COLORS, useLayout } from '../theme/theme';
import { T, Icon, Section, Press } from '../theme/ui';
import PageHero from '../components/PageHero';
import { FAQS } from '../data/faq';

export default function Faq() {
  const { isMobile } = useLayout();
  const [open, setOpen] = useState(0);
  return (
    <View>
      <PageHero img="faq_hero" eyebrow="SUPPORT" title="FAQ" titleSize={56} desktopAspectRatio={3.6} />
      <Section bg="#fff" vPad={isMobile ? 30 : 56} innerStyle={{ maxWidth: 1250 }}>
        <T w="b" size={isMobile ? 20 : 26} style={{ marginBottom: 22 }}>Find Answers to Your Questions</T>
        <View style={{ gap: isMobile ? 14 : 30 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <View key={f.q}>
                <Press onPress={() => setOpen(isOpen ? null : i)} hoverStyle={{ backgroundColor: '#C4E9F5' }}
                  style={{ backgroundColor: COLORS.skyCard, borderRadius: 6, flexDirection: 'row', alignItems: 'center', paddingHorizontal: isMobile ? 14 : 24, paddingVertical: isMobile ? 14 : 18 }}>
                  <T w="m" size={isMobile ? 14 : 16} style={{ width: isMobile ? 28 : 56 }}>{i + 1}.</T>
                  <T w="m" size={isMobile ? 14 : 16} style={{ flex: 1 }}>{f.q}</T>
                  <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={28} />
                </Press>
                {isOpen ? (
                  <View style={{ paddingHorizontal: isMobile ? 14 : 80, paddingVertical: 16 }}>
                    <T w="m" size={isMobile ? 14 : 15} color={COLORS.text} lh={isMobile ? 22 : 24}>{f.a}</T>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </Section>
    </View>
  );
}
