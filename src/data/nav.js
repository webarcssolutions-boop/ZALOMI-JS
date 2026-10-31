export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/courses', children: [
      { label: 'Courses & Programs', to: '/courses' },
      { label: 'Admission', to: '/admission' },
      { label: 'FAQ', to: '/faq' },
  ] },
  { label: 'Career Labs', to: '/career-labs', children: [
      { label: 'Career Labs', to: '/career-labs' },
      { label: 'Psychometric Test', to: '/courses/psychometric-test' },
      { label: 'Career Counselling', to: '/courses/career-counselling' },
  ] },
  { label: 'Academy', to: '/academy' },
  { label: 'Zalomi Care', to: '/zalomi-care' },
  { label: 'Study Abroad', to: '/study-abroad' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_QUICK = [
  ['Home', '/'], ['Academy', '/academy'], ['Zalomi Care', '/zalomi-care'], ['Career Labs', '/career-labs'], ['Study Abroad', '/study-abroad'],
];
export const FOOTER_PROGRAMS = [
  ['Courses', '/courses'], ['Blog', '/blog'], ['Events', '/blog'], ['FAQ', '/faq'], ['Admission', '/admission'], ['Student Portal', '/student-portal'],
];
