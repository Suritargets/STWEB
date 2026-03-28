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
    { label: 'Cases', href: '/case-studies', comingSoon: true },
    { label: 'Insights', href: '/insights', comingSoon: true },
  ],
  social: {
    linkedin: 'https://linkedin.com/company/suritargets',
  },
} as const
