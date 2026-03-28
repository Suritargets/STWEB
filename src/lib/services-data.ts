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
    slug: 'business-support',
    name: 'Business Support',
    nameEn: 'Business Support Services',
    shortDescription: 'FinTech, HR, business strategie en productontwikkeling op maat.',
    shortDescriptionEn: 'FinTech, HR, business strategy and product development tailored to your goals.',
    description:
      'Wij ondersteunen organisaties met strategische business services: van FinTech-implementaties tot HR-processen en productontwikkeling. Geen generieke oplossingen — elk traject is ontworpen voor uw specifieke context.',
    whoIsItFor:
      'Organisaties in de financiële sector, MKB, en bedrijven die hun operationele processen willen moderniseren.',
    deliverables: [
      'FinTech strategie en implementatie',
      'HR proces optimalisatie',
      'Business analyse & roadmap',
      'Product development begeleiding',
    ],
    icon: 'briefcase',
  },
  {
    slug: 'web-applications',
    name: 'Web & Applicaties',
    nameEn: 'Web & Application Services',
    shortDescription: 'UI/UX design, applicatieontwikkeling en web business support.',
    shortDescriptionEn: 'UI/UX design, application development and web business support.',
    description:
      'Van concept tot live platform: wij bouwen web- en mobiele applicaties die aansluiten op uw bedrijfsprocessen. Scherp ontwerp, robuuste technologie, geen van-de-plank-templates.',
    whoIsItFor:
      'Bedrijven die een custom platform, interne tool of klantgerichte applicatie nodig hebben.',
    deliverables: [
      'UI/UX design (wireframes, prototypes)',
      'Web applicatie ontwikkeling',
      'Mobile-first responsive interfaces',
      'Ongoing web business support',
    ],
    icon: 'monitor',
  },
  {
    slug: 'research',
    name: 'Research & Development',
    nameEn: 'Research & Development',
    shortDescription: 'Technologisch onderzoek en innovatie voor uw sector.',
    shortDescriptionEn: 'Technology research and innovation for your sector.',
    description:
      'Wij onderzoeken technologische mogelijkheden en bouwen proof-of-concepts voor organisaties die voorop willen lopen. Van AI-toepassingen tot blockchain-integraties.',
    whoIsItFor:
      'Organisaties die willen innoveren maar niet weten waar te beginnen, of die intern geen R&D capaciteit hebben.',
    deliverables: [
      'Technologie landscape analyse',
      'Proof-of-concept ontwikkeling',
      'Innovatie roadmap',
      'R&D rapportage',
    ],
    icon: 'flask-conical',
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
    nameEn: 'Education & Innovation',
    shortDescription: 'Training in Blockchain, AI, FinTech en business innovatie.',
    shortDescriptionEn: 'Training in Blockchain, AI, FinTech and business innovation.',
    description:
      'Wij verzorgen op maat gemaakte trainingen en workshops voor organisaties die hun teams willen bijscholen in opkomende technologieën en innovatieve bedrijfsmodellen.',
    whoIsItFor:
      'Bedrijven en instellingen die hun medewerkers willen trainen in AI, Blockchain, FinTech of innovatief denken.',
    deliverables: [
      'Blockchain technologie training',
      'AI & machine learning workshop',
      'FinTech innovatie programma',
      'Business innovation masterclass',
    ],
    icon: 'graduation-cap',
  },
]
