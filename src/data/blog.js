// Titles, categories, dates and summaries come from the design (Blogs page + Home page).
// The full article text is SAMPLE copy - replace it with the real posts or load them from a CMS/API.
export const POSTS = [
  { slug: 'international-education-fair-2027', category: 'INTERNATIONAL EDUCATION', title: 'International Education Fair 2027', date: 'January, 2026', img: 'blog_1',
    summary: 'Explore top universities, meet global representatives and get expert guidance for your future.' },
  { slug: 'career-guidance-workshop', category: 'CAREER GUIDANCE', title: 'Career Guidance Workshop', date: 'January, 2026', img: 'blog_2',
    summary: 'Get expert advice on career options, skill development and the right path for your future.' },
  { slug: 'digital-marketing-masterclass', category: 'DIGITAL SKILLS', title: 'Digital Marketing Masterclass', date: 'January, 2026', img: 'blog_3',
    summary: 'Learn the latest digital marketing strategies and boost your career in the online world.' },
  { slug: 'exciting-interactive-forum', category: 'EDUCATION SKILLS', title: 'Exciting & Interactive Forum', date: 'January, 2026', img: 'blog_4',
    summary: 'Connect, learn and grow with industry experts, mentors and fellow learners.' },
];

// Shown on the Home page ("Latest News, Blogs & Events")
export const HOME_NEWS = [
  { slug: 'new-batch-admissions-2027', category: 'ADMISSIONS', title: 'New Batch Admissions Open for 2027', date: 'November 15, 2026', img: 'home_news1',
    summary: 'Join our upcoming batches and take the first step towards a brighter future with Zalomi.' },
  { slug: 'international-education-fair-2027', category: 'INTERNATIONAL EDUCATION', title: 'International Education Fair 2027', date: 'November 15, 2026', img: 'home_news2',
    summary: 'Explore global universities, meet counsellors and plan your study abroad journey.' },
  { slug: 'webinar-career-opportunities', category: 'CAREER GUIDANCE', title: 'Webinar on Career Opportunities', date: 'November 15, 2026', img: 'home_news3',
    summary: 'Learn from industry experts about current trends and future opportunities across various sectors.' },
];

export const ALL_POSTS = [...POSTS, HOME_NEWS[0], HOME_NEWS[2]];
export const getPost = (slug) => ALL_POSTS.find((p) => p.slug === slug);

export const SAMPLE_BODY = [
  'Details for this update will be published here. Replace this sample text with the full article from your admin panel or CMS.',
  'Join the Zalomi team, meet industry experts and learn how the right skills and the right guidance can open doors locally and abroad.',
  'For registration, dates and venue, please contact our support team using the details on the Contact page.',
];
