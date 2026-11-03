import { Platform, useWindowDimensions } from 'react-native';

export const COLORS = {
  navy: '#222F63',
  navyDeep: '#1B2750',
  ink: '#1F2A55',
  teal: '#1FB0C0',
  blue: '#3A8FCB',
  blueSoft: '#4A9AD0',
  sky: '#D6EFF9',
  skyCard: '#D0EFF8',
  skyLight: '#EAF6FC',
  skyBand: '#E0F4FC',
  headerBg: '#F7FAFD',
  pageBg: '#F7FAFD',
  mint: '#D3EFE4',
  mintCard: '#CDEBDD',
  indigo: '#3F51B5',
  orange: '#F28C3C',
  red: '#D9363E',
  white: '#FFFFFF',
  border: '#1FA7B8',
  text: '#2B3566',
  muted: '#5B6794',
};

export const FONT = {
  r: 'Montserrat_400Regular',
  m: 'Montserrat_500Medium',
  sb: 'Montserrat_600SemiBold',
  b: 'Montserrat_700Bold',
  xb: 'Montserrat_800ExtraBold',
};

export const TYPOGRAPHY_SCALE = 1.1;

export const MAX_WIDTH = 1600; // overall site frame
export const BP = { mobile: 700, desktop: 1400 };

export function getWindowsDisplayScale(scale, width) {
  return Platform.OS === 'web' && width >= BP.mobile && typeof navigator !== 'undefined' && /^win/i.test(navigator.platform)
    ? scale
    : 1;
}

/** Responsive helper: the desktop layout matches the supplied designs;
 *  tablet/mobile re-flow the same content into stacked layouts. */
export function useLayout() {
  const { width: w, scale } = useWindowDimensions();
  const displayScale = getWindowsDisplayScale(scale, w);
  const layoutWidth = w * displayScale;
  const width = Math.min(layoutWidth, MAX_WIDTH);
  const isMobile = layoutWidth < BP.mobile;
  const isDesktop = layoutWidth >= BP.desktop;
  const isTablet = !isMobile && !isDesktop;
  const pad = isMobile ? 20 : isTablet ? 36 : Math.round(Math.max(48, Math.min(96, width * 0.055)));
  // font scale so the 1440px design shrinks gracefully on desktop screens
  const sc = isDesktop ? Math.min(1, Math.max(0.72, width / 1440)) : 1;
  return { width, rawWidth: w, isMobile, isTablet, isDesktop, pad, sc };
}
