import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Platform, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';

import { COLORS, MAX_WIDTH } from './src/theme/theme';
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

function Shell() {
  const { route } = useRouter();
  const scroller = useRef(null);
  const Screen = SCREENS[route.name] || Home;

  useEffect(() => {
    scroller.current && scroller.current.scrollTo({ y: 0, animated: false });
    if (Platform.OS === 'web') document.title = `${TITLES[route.name] || 'Home'} | Zalomi School of Skills`;
  }, [route.path]);

  return (
    <View style={{ flex: 1, backgroundColor: '#EEF3F8' }}>
      <ScrollView ref={scroller} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={Platform.OS === 'web'}>
        <View style={{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', backgroundColor: '#fff', flexGrow: 1 }}>
          <Header />
          <Screen key={route.path} />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [loaded] = useFonts({
    Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold,
  });
  if (!loaded) {
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
