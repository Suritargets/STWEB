export const siteConfig = {
  name: 'Suritargets',
  tagline: 'Niet van de plank. Volledig op maat.',
  taglineEn: 'Not off the shelf. Fully tailored.',
  description:
    'Business tech support op maat voor het Caribisch gebied. Research, FinTech, Web & App Services, Forensics en Education.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com',
  address: {
    street: 'Dr. Sophie Redmonstraat 244',
    city: 'Paramaribo',
    country: 'Suriname',
  },
  email: 'info@suritargets.com',
  founder: 'Ken Alimoestar',
  nav: [
    { label: 'Over ons', href: '/about', comingSoon: false },
    { label: 'Services', href: '/services', comingSoon: false },
    { label: 'Cases', href: '/case-studies', comingSoon: false },
    { label: 'Insights', href: '/insights', comingSoon: false },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/suritargets/?viewAsMember=true',
    youtube: 'https://youtube.com/@suritargets',
    tiktok: 'https://tiktok.com/@suritargets',
  },
} as const
