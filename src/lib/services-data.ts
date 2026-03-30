export type ServiceCluster = {
  slug: string
  type: 'business' | 'individual'
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
    type: 'business',
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
    type: 'business',
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
    type: 'business',
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
    type: 'business',
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
    type: 'business',
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

  {
    slug: 'business-consulting',
    type: 'business',
    name: 'Business Consulting & Advisory',
    nameEn: 'Business Consulting & Advisory',
    shortDescription: 'Strategisch advies en begeleiding voor bedrijven die willen groeien, optimaliseren of herstructureren.',
    shortDescriptionEn: 'Strategic advice and guidance for businesses looking to grow, optimize or restructure.',
    description:
      'Wij helpen bedrijven in Suriname en de Caribische regio met strategische vraagstukken die echt tellen. Van bedrijfsoptimalisatie en procesverbetering tot groeistrategie en herstructurering — wij brengen internationale management expertise naar uw organisatie. Praktisch, direct toepasbaar en afgestemd op uw lokale context.',
    whoIsItFor:
      'Eigenaren, directeuren en managers van bedrijven die tegen groeiuitdagingen aanlopen, hun operatie willen optimaliseren of een strategische heroriëntatie nodig hebben.',
    deliverables: [
      'Strategische bedrijfsanalyse en advies',
      'Groei- en expansiestrategie',
      'Procesoptimalisatie en efficiencyverbetering',
      'Organisatiestructuur en herstructurering',
      'Change management begeleiding',
      'Businessplan en financiële projecties',
      'Managementrapportages en KPI-frameworks',
    ],
    icon: 'briefcase',
  },
  {
    slug: 'startup-to-founder',
    type: 'business',
    name: 'From Startup to Founder',
    nameEn: 'From Startup to Founder',
    shortDescription: 'Van startup idee naar werkend bedrijf — begeleiding voor ambitieuze ondernemers in Suriname.',
    shortDescriptionEn: 'From startup idea to functioning business — guidance for ambitious entrepreneurs in Suriname.',
    description:
      'U heeft een idee dat groter is dan een bijproject. Wij begeleiden u door het volledige traject: van het valideren van uw concept tot het opzetten van uw bedrijfsstructuur, het aantrekken van uw eerste klanten en het bouwen van een fundament dat schaalbaar is. Geen theorie — praktische stappen die werken in de Caribische markt.',
    whoIsItFor:
      'Ambitieuze ondernemers en startups in Suriname die een serieus bedrijf willen bouwen en begeleiding zoeken van iemand die de lokale markt én internationale best practices kent.',
    deliverables: [
      'Conceptvalidatie en marktonderzoek',
      'Business model ontwikkeling (canvas)',
      'Go-to-market strategie voor Suriname & regio',
      'Bedrijfsregistratie en juridische opzet advies',
      'Pitch deck en investeerderspresentatie',
      'Eerste klanten & salesstrategie',
      'Groeiplan en mijlpalen roadmap',
      'Mentorschap en accountability sessies',
    ],
    icon: 'trending-up',
  },

  /* ─── Individual services ──────────────────────────────── */
  {
    slug: 'pioneering-fundamentals',
    type: 'individual',
    name: 'Pioneering Fundamentals',
    nameEn: 'Pioneering Fundamentals',
    shortDescription: 'De grondbeginselen van ondernemerschap en innovatie — voor wie klaar is om te beginnen.',
    shortDescriptionEn: 'The fundamentals of entrepreneurship and innovation — for those ready to start.',
    description:
      'Pioneering Fundamentals is het startpunt voor iedereen die serieus aan de slag wil met ondernemen en innovatie. U leert de kernprincipes die succesvolle pioniers onderscheiden: van mindset en zelfleiderschap tot het herkennen van kansen en het nemen van de eerste stap. Praktisch, persoonlijk en direct toepasbaar — ook zonder voorkennis.',
    whoIsItFor:
      'Particulieren die willen beginnen met ondernemen of innoveren maar nog geen duidelijk startpunt hebben. Ideaal voor jong talent, herintreders en iedereen die klaar is voor een nieuwe richting.',
    deliverables: [
      'Ondernemers mindset & zelfleiderschap',
      'Kansen herkennen in uw omgeving',
      'Basisprincipes van innovatie en creativiteit',
      'Uw persoonlijke sterktes in kaart brengen',
      'Eerste stappen zetten als ondernemer',
      'Persoonlijk actieplan',
      '1-op-1 coachingssessies',
    ],
    icon: 'compass',
  },
  {
    slug: 'education-1op1',
    type: 'individual',
    name: 'Education 1-op-1',
    nameEn: 'Personal Education & Coaching',
    shortDescription: 'Persoonlijke begeleiding in AI, tech en moderne skills — op uw eigen tempo.',
    shortDescriptionEn: 'One-on-one education in AI, technology and modern skills at your own pace.',
    description:
      'U heeft een vraag of wil iets beter begrijpen — wij leggen het uit in uw eigen tempo, op uw niveau. Of het nu gaat om AI & Technologie, Trading met AI of Blockchain & Development: wij begeleiden u praktisch en persoonlijk.',
    whoIsItFor:
      'Particulieren en professionals die extra uitleg nodig hebben of een nieuw onderwerp willen begrijpen zonder een groepstraining te volgen.',
    deliverables: [
      'Persoonlijke sessies op uw tempo',
      'AI & Technologie uitleg en toepassingen',
      'Trading met AI — strategie en tools',
      'Blockchain & Development basics',
      'Praktische oefeningen en voorbeelden',
      'Follow-up via chat na de sessie',
    ],
    icon: 'book-open',
  },
  {
    slug: 'begeleiding-innovation',
    type: 'individual',
    name: 'Begeleiding in Innovation',
    nameEn: 'Innovation Coaching',
    shortDescription: 'Van idee naar eerste stap — wij begeleiden u van concept tot businesscase.',
    shortDescriptionEn: 'From idea to first step — we guide you from concept to business case.',
    description:
      'U heeft een idee maar weet niet waar te beginnen. Wij helpen u het uit te werken, de haalbaarheid te toetsen en de eerste concrete stappen te bepalen. Geen vage adviezen — we werken samen aan een helder plan.',
    whoIsItFor:
      'Ondernemers en particulieren met een idee of plan dat ze willen uitwerken maar nog niet weten hoe te starten.',
    deliverables: [
      'Uw idee uitwerken en structureren',
      'Validatie en haalbaarheidscheck',
      'Marktverkenning en doelgroepanalyse',
      'Eerste stappen en actieplan bepalen',
      'Persoonlijke coaching sessies',
      'Schriftelijke samenvatting van het plan',
    ],
    icon: 'rocket',
  },
  {
    slug: 'begeleiding-blockchain',
    type: 'individual',
    name: 'Begeleiding in Blockchain',
    nameEn: 'Blockchain & Web3 Guidance',
    shortDescription: 'Begrijp blockchain praktisch — van basics tot uw eigen use case.',
    shortDescriptionEn: 'Understand blockchain practically — from basics to your own use case.',
    description:
      'Wil u begrijpen hoe blockchain werkt en wat het voor u kan betekenen? Wij leggen het praktisch en begrijpelijk uit. Van de basisprincipes van crypto en Web3 tot het verkennen van uw eigen use case — zonder jargon, met echte voorbeelden.',
    whoIsItFor:
      'Particulieren en ondernemers die blockchain willen begrijpen en willen ontdekken hoe het relevant kan zijn voor hun situatie.',
    deliverables: [
      'Blockchain basics in begrijpelijke taal',
      'Crypto & Web3 praktisch uitgelegd',
      'Uw eigen use case verkennen',
      'Overzicht van relevante tools en platforms',
      'Persoonlijke Q&A sessies',
      'Praktische voorbeelden uit de regio',
    ],
    icon: 'bitcoin',
  },
  {
    slug: 'digital-trail',
    type: 'individual',
    name: 'Digital Trail / Resume Social',
    nameEn: 'Digital Presence & Personal Branding',
    shortDescription: 'Uw professionele aanwezigheid online opbouwen — zodat u gevonden wordt.',
    shortDescriptionEn: 'Build your professional online presence so the right people find you.',
    description:
      'Uw online profiel is uw digitale visitekaartje. Wij helpen u een sterke professionele aanwezigheid op te bouwen — van LinkedIn optimalisatie tot een persoonlijk digitaal portfolio — zodat u opvalt bij de juiste mensen en kansen.',
    whoIsItFor:
      'Particulieren die hun carrière willen versterken, op zoek zijn naar werk of opdrachten, of hun professionele reputatie online willen opbouwen.',
    deliverables: [
      'LinkedIn profiel audit en optimalisatie',
      'Persoonlijk digitaal portfolio opzet',
      'Online reputatie strategie',
      'Content tips voor zichtbaarheid',
      'Personal branding advies',
      'Actieplan voor online aanwezigheid',
    ],
    icon: 'user-circle',
  },
  {
    slug: 'forensics-personal',
    type: 'individual',
    name: 'Forensics & Integriteit (Persoonlijk)',
    nameEn: 'Personal Forensics & Integrity',
    shortDescription: 'Persoonlijk forensisch advies en discreet onderzoek voor uw situatie.',
    shortDescriptionEn: 'Personal forensic advice and discreet investigation for your situation.',
    description:
      'Heeft u een persoonlijke situatie waarbij discretie en onderzoek nodig zijn? Wij helpen u vertrouwelijk. Of het nu gaat om persoonlijk forensisch advies, een vertrouwelijk onderzoek of een discrete rapportage — wij behandelen uw zaak met de nodige zorgvuldigheid.',
    whoIsItFor:
      'Particulieren die in een situatie zitten waarbij zij behoefte hebben aan onafhankelijk, vertrouwelijk onderzoek of advies.',
    deliverables: [
      'Persoonlijk forensisch advies op maat',
      'Vertrouwelijk onderzoek',
      'Discrete en schriftelijke rapportage',
      'Begeleiding bij vervolgstappen',
    ],
    icon: 'shield',
  },
]
