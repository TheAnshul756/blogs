export const siteConfig = {
  title: 'Dev Notes',
  description: 'A tech blog about software, systems, and the craft of building.',
  author: 'Anshul',
  url: 'https://theanshul756.github.io/blogs',
  email: 'hello@example.com',
  social: {
    github: 'https://github.com/TheAnshul756',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
  },
  newsletter: {
    enabled: true,
    action: 'https://buttondown.email/api/emails/embed-subscribe/your-username',
  },
  contact: {
    formspree: 'https://formspree.io/f/your-form-id',
  },
  giscus: {
    repo: 'TheAnshul756/blogs',
    repoId: 'REPLACE_WITH_REPO_ID',
    category: 'Announcements',
    categoryId: 'REPLACE_WITH_CATEGORY_ID',
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
