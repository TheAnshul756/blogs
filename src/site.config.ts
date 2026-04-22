export const siteConfig = {
  title: "Anshul's Space",
  description: 'Thoughts, learnings, and explorations — books, software, and life.',
  author: 'Anshul',
  url: 'https://theanshul756.github.io/blogs',
  email: 'anshulasawa2011@gmail.com',
  social: {
    github: 'https://github.com/TheAnshul756',
    linkedin: 'https://www.linkedin.com/in/asawa-anshul/',
  },
  newsletter: {
    enabled: true,
    action: 'https://buttondown.email/api/emails/embed-subscribe/anshulasawa',
  },
  contact: {
    formspree: 'https://formspree.io/f/maqalqnd',
  },
  giscus: {
    repo: 'TheAnshul756/blogs',
    repoId: 'R_kgDOSE37Iw',
    category: 'Announcements',
    categoryId: 'DIC_kwDOSE37I84C7cXG',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom',
    theme: 'preferred_color_scheme',
    lang: 'en',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
    { label: 'Tags', href: '/tags' },
    { label: 'Categories', href: '/categories' },
    { label: 'Series', href: '/series' },
    { label: 'Archive', href: '/archive' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
