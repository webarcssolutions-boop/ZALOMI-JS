import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Platform, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { COLORS } from './src/theme/theme';
import { RouterProvider, useRouter } from './src/navigation/Router';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

import Home from './src/screens/Home';
import About from './src/screens/About';
import Courses from './src/screens/Courses';
import CourseDetail from './src/screens/CourseDetail';
import CareerLabs from './src/screens/CareerLabs';
import Academy from './src/screens/Academy';
import ZalomiCare from './src/screens/ZalomiCare';
import StudyAbroad from './src/screens/StudyAbroad';
import { Blog, BlogDetail } from './src/screens/Blog';
import Faq from './src/screens/Faq';
import Contact from './src/screens/Contact';
import Admission from './src/screens/Admission';
import { PaymentResult, StudentPortal, Legal } from './src/screens/Misc';

const SCREENS = {
  home: Home, about: About, courses: Courses, course: CourseDetail, careerLabs: CareerLabs, academy: Academy, care: ZalomiCare,
  abroad: StudyAbroad, blog: Blog, post: BlogDetail, faq: Faq, contact: Contact, admission: Admission,
  paymentResult: PaymentResult, portal: StudentPortal, legal: Legal,
};

const TITLES = {
  home: 'Home', about: 'About Us', courses: 'Courses & Program', course: 'Course', careerLabs: 'Career Labs', academy: 'Academy',
  care: 'Zalomi Care', abroad: 'Study Abroad', blog: 'News, Blogs & Events', post: 'News', faq: 'FAQ', contact: 'Contact Us',
  admission: 'Admission', paymentResult: 'Payment', portal: 'Student Portal', legal: 'Legal',
};

const FONTS = {
  Montserrat_400Regular: require('./assets/fonts/Montserrat-Regular.ttf'),
  Montserrat_500Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
  Montserrat_600SemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
  Montserrat_700Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
  Montserrat_800ExtraBold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
};

function Shell() {
  const { route } = useRouter();
  const scroller = useRef(null);
  const Screen = SCREENS[route.name] || Home;

  useEffect(() => {
    scroller.current && scroller.current.scrollTo({ y: 0, animated: false });
    if (Platform.OS === 'web') document.title = `${TITLES[route.name] || 'Home'} | Zalomi School of Skills`;
  }, [route.path]);

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}>
      <ScrollView ref={scroller} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={Platform.OS === 'web'}>
        <View style={{ width: '100%', backgroundColor: '#fff', flexGrow: 1 }}>
          <Header />
          <Screen key={route.path} />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [loaded, error] = useFonts(FONTS);

  useEffect(() => {
    if (error) console.error('Unable to load Montserrat fonts; continuing with system fonts.', error);
  }, [error]);

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.headerBg }}>
        <ActivityIndicator size="large" color={COLORS.navy} />
      </View>
    );
  }
  return (
    <RouterProvider>
      <StatusBar style="dark" />
      <Shell />
    </RouterProvider>
  );
}
