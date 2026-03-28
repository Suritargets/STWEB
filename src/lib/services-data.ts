export type ServiceCluster = {
  slug: string
  name: string
  nameEn: string
  shortDescription: string
  shortDescriptionEn: string
  description: string
  whoIsItFor: string
  deliverables: string[]
  icon: string
}

export const services: ServiceCluster[] = [
  {
    slug: 'dashboarding',
    name: 'Dashboarding & Data Visualisatie',
    nameEn: 'Dashboarding & Data Visualization',
    shortDescription: 'Op maat gemaakte dashboards en data visualisaties voor betere besluitvorming.',
    shortDescriptionEn: 'Custom-built dashboards and data visualizations for smarter decisions.',
    description:
      'Wij bouwen volledig op maat gemaakte dashboards en data visualisatie platformen. Van real-time KPI-overzichten tot complexe business intelligence tools — ontworpen voor uw data, uw processen en uw team. Geen standaard software, alles custom made.',
    whoIsItFor:
      'Organisaties die data hebben maar er geen helder beeld uit kunnen halen. Ideaal voor management, financiële teams en operationele afdelingen.',
    deliverables: [
      'Custom dashboard ontwikkeling',
      'Real-time data visualisatie',
      'KPI & management rapportage',
      'Data pipeline integratie',
      'Interactieve grafieken en analyses',
      'ERP & systeem koppelingen',
    ],
    icon: 'bar-chart',
  },
  {
    slug: 'web-applications',
    name: 'Web & Applicaties',
    nameEn: 'Web & Application Development',
    shortDescription: 'Custom web applicaties, platforms en tools — volledig op maat gebouwd.',
    shortDescriptionEn: 'Custom web applications, platforms and internal tools — built from scratch.',
    description:
      'Van concept tot live platform: wij bouwen web- en business applicaties die aansluiten op uw processen. Inclusief ERP-systemen op maat, interne tools en klantgerichte platforms. Geen van-de-plank-templates — alles custom made voor uw organisatie.',
    whoIsItFor:
      'Bedrijven die een custom platform, ERP-systeem, interne tool of klantgerichte applicatie nodig hebben.',
    deliverables: [
      'Web applicatie ontwikkeling',
      'ERP systemen op maat',
      'Financiële applicaties',
      'Interne bedrijfstools',
      'UI/UX design (wireframes, prototypes)',
      'Mobile-first responsive interfaces',
    ],
    icon: 'monitor',
  },
  {
    slug: 'marketing-ai',
    name: 'Marketing met AI',
    nameEn: 'AI-Powered Marketing Services',
    shortDescription: 'Slimmere marketing met AI — content, campagnes en analyse op een hoger niveau.',
    shortDescriptionEn: 'Smarter marketing powered by AI — content, campaigns and analytics elevated.',
    description:
      'Wij combineren marketingexpertise met AI-technologie om Caribische bedrijven een competitief voordeel te geven. Van AI-gedreven contentcreatie tot geautomatiseerde campagnes en klantanalyse — marketing die werkt én schaalbaar is.',
    whoIsItFor:
      'Bedrijven en merken in Suriname en de regio die hun marketinginspanningen willen versterken met slimme technologie.',
    deliverables: [
      'AI contentcreatie & copywriting',
      'Geautomatiseerde campagnestrategie',
      'Doelgroepanalyse met AI',
      'Social media automatisering',
      'SEO & digitale zichtbaarheid',
      'Marketingperformance rapportage',
    ],
    icon: 'sparkles',
  },
  {
    slug: 'forensics',
    name: 'Forensics & Integriteit',
    nameEn: 'Forensics & Integrity Services',
    shortDescription: 'Digitaal forensisch onderzoek en integriteitsaudits.',
    shortDescriptionEn: 'Digital forensic investigation and integrity audits.',
    description:
      'Wij bieden digitaal forensisch onderzoek, compliance-audits en integriteitsreviews voor overheid, financiële instellingen en bedrijven. Vertrouwelijk, grondig en onafhankelijk.',
    whoIsItFor:
      'Overheidsinstanties, financiële instellingen, en bedrijven die een onafhankelijk forensisch onderzoek nodig hebben.',
    deliverables: [
      'Digitaal forensisch onderzoek',
      'Compliance & integriteitsaudit',
      'Rapportage & aanbevelingen',
      'Incident response begeleiding',
    ],
    icon: 'shield-check',
  },
  {
    slug: 'education',
    name: 'Education',
    nameEn: 'Education & Skills Development',
    shortDescription: 'Praktische trainingen in AI, trading, automatisering en applicatieontwikkeling.',
    shortDescriptionEn: 'Hands-on training in AI, trading, automation and application development.',
    description:
      'Suritargets Education biedt praktijkgerichte cursussen voor professionals en ondernemers die willen meegroeien met technologie. Van AI-basiskennis tot vibe coding en financiële applicaties — toegankelijk, direct toepasbaar en volledig op de Caribische markt afgestemd.',
    whoIsItFor:
      'Professionals, ondernemers en teams die concrete vaardigheden willen opbouwen in AI, technologie en moderne bedrijfsvoering.',
    deliverables: [
      'AI — Artificial Intelligence praktijktraining',
      'Trading met AI — geautomatiseerde handelsstrategieën',
      'Automatisering — processen en workflows',
      'Vibe Coding — bouwen met AI-gestuurde development',
      'Applicatieontwikkeling — van idee naar werkend product',
      'Financiële applicaties — FinTech tools en platforms',
      'ERP op maat — implementatie en beheer',
    ],
    icon: 'graduation-cap',
  },
]
