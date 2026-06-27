'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle, ArrowRight, FileText, BarChart2,
  BookOpen, TrendingUp, Shield, Table2, Plug,
} from 'lucide-react'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import { FinanceCalc } from './calc'
import { EnrollmentDrawer } from '@/components/enrollment/enrollment-drawer'

// ─────────────────────────────────────────────────────
// CONTENT
// ─────────────────────────────────────────────────────

const NL = {
  meta: {
    title: 'Finance & Accounting Inhouse Training — Claude Desktop + Excel | Suritargets',
    description:
      'Suritargets zet Claude op in jullie accountantskantoor. We brengen use-cases in kaart, bouwen tools en trainen het team. Jullie abonnement, onze begeleiding.',
  },
  badge: 'Finance Pro & Claude · Hands on Deck In-House Training',
  hero: {
    kicker: 'Voor accountants‑ & advieskantoren',
    title: 'Wij zetten Claude op in jullie finance —',
    titleHighlight: 'jullie houden de regie',
    lede: 'Het kantoor neemt zelf een Claude-abonnement bij Anthropic; Suritargets levert de begeleiding, implementatie en R&D — use-cases in kaart brengen, tools bouwen en het team trainen.',
    stats: [
      { value: '$45+', label: 'uurtarief · instelbaar' },
      { value: '~6 wk', label: 'van fundament tot borging' },
      { value: 'eigen', label: 'abonnement bij Anthropic' },
      { value: '3', label: 'tools voor 90% van het werk' },
    ],
  },
  why: {
    label: '01 · Het uitgangspunt',
    title: 'Waarom — en waar de grens ligt',
    subtitle:
      'AI verwijdert taken, geen rollen. Het versnelt het opstellen; de beoordeling en de handtekening blijven bij de accountant. Dat onderscheid is het fundament van het hele programma.',
    can: {
      tag: 'Wat AI overneemt',
      title: 'Het voorbereidende werk',
      items: [
        'Transactiecodering, bankreconciliatie, factuurmatching en uitgavencategorisatie — op schaal',
        'Lezen en doorzoeken van lange documenten: jaarrekeningen, contracten, fiscale stukken',
        'Concept-rapportages, variance-analyse en narratief bij de cijfers',
        'Werk dat normaal twee tot drie paar handen kostte',
      ],
    },
    cant: {
      tag: 'Wat de mens houdt',
      title: 'Het oordeel en de verantwoording',
      items: [
        'Adviseren over een complexe herstructurering of een nieuwe casus',
        'Een onduidelijke regelwijziging interpreteren',
        'Verantwoordelijkheid dragen voor een oordeel',
        'De handtekening onder de jaarrekening',
      ],
    },
    pull: 'De juiste vraag is niet "welk model is het best" maar "waar gaat de meeste tijd verloren". Kies eerst de knelpunt-workflow, dan het gereedschap — niet andersom.',
    impactTitle: 'Wat verandert er — de tijdwinst',
    impactTag: 'Indicatief · per workflow',
    impactLegend: ['Handmatig', 'Met Claude'],
    impactNote:
      'Indicatieve voorbeelden; de werkelijke winst valideren we op jullie eigen processen in de R&D-fase. AI versnelt het opstellen — de beoordeling en de handtekening blijven bij de accountant.',
    tasks: [
      { task: 'Maandafsluiting voorbereiden', before: '± 2 dagen', after: '± 3 uur', afterPct: 20 },
      { task: 'Jaarrekening doorlezen & samenvatten', before: '± 4 uur', after: '± 30 min', afterPct: 13 },
      { task: 'Fiscaal & compliance research', before: '± 3 uur', after: '± 25 min', afterPct: 15 },
      { task: 'Conceptrapport voor cliënt', before: '± 3 uur', after: '± 40 min', afterPct: 22 },
    ],
  },
  anthropic: {
    label: '02 · Het gereedschap',
    title: 'Wat Anthropic levert',
    subtitle:
      'Vier ingangen tot hetzelfde model. Voor een kantoor draait het om de eerste drie — de API is alleen relevant zodra je workflows wilt automatiseren.',
    note: '"De AI" is Claude — een model dat tekst begrijpt, redeneert en schrijft. Claude Code is diezelfde Claude die niet alleen meedenkt, maar ook zélf taken uitvoert: bestanden bewerken, een CSV reconciliëren, een tool bouwen. Elk betaald seat geeft toegang tot Claude Code; alleen de hoeveelheid gebruik verschilt.',
    cards: [
      {
        pin: 'Dagelijks gebruik',
        title: 'Claude Desktop & app',
        body: 'De chat-interface op desktop, web en mobiel. Één plek voor research, het lezen van stukken, concept-brieven aan cliënten en het uitleggen van cijfers in gewone taal.',
        use: 'De basislaag voor elke medewerker — analyse, drafting, klantcommunicatie.',
      },
      {
        pin: 'Bestanden & taken',
        title: 'Claude Cowork',
        body: 'De desktop-agent voor bestand- en taakbeheer: leest documenten, haalt data eruit, vult spreadsheets en doorloopt taken met meerdere stappen. Beschikbaar vanaf Pro.',
        use: 'Maandafsluiting voorbereiden, dossiers samenstellen, repetitief voorwerk.',
      },
      {
        pin: 'Automatisering',
        title: 'Claude Code',
        body: 'De agentische tool om taken te delegeren. De motor onder maatwerk: scripts die CSV\'s reconciliëren, exports klaarzetten of een eigen tool bouwen. Inbegrepen in betaalde plannen.',
        use: 'Hiermee bouwt Suritargets de automatiseringen die jullie use-cases dekken.',
      },
      {
        pin: 'In bestaande tools',
        title: 'Connectors & Claude in Excel',
        body: 'Claude koppelt aan Google Drive, Gmail, agenda en — via connectors — aan boekhoud- en kantoorsystemen. Claude in Excel brengt het model rechtstreeks in het spreadsheet.',
        use: 'Het model naar de data brengen, niet de data naar het model.',
      },
    ],
  },
  role: {
    label: '03 · Onze rol',
    title: 'Wat Suritargets levert',
    subtitle:
      'Wij verkopen geen abonnementen. Het kantoor neemt Claude rechtstreeks bij Anthropic af; wij zorgen dat het werkt — van use-case tot werkende tool — en trainen het team.',
    note: 'Rolverdeling: Anthropic levert het model (jullie abonnement). Suritargets levert het denkwerk en het maatwerk eromheen — onderzoek, opzet, tools en training, gefactureerd per uur.',
    steps: [
      {
        n: '01',
        title: 'R&D & use-cases in kaart',
        body: 'We brengen jullie werkprocessen in kaart, vinden waar AI het meeste tijd wint, en prioriteren de use-cases die de moeite waard zijn. Geen losse trucs — een onderbouwde roadmap.',
      },
      {
        n: '02',
        title: 'Implementeren & inrichten',
        body: 'Het abonnement opzetten, seats indelen, beveiliging en privacy goedzetten, en de bronnen (Xero, Drive, Excel) koppelen aan Claude en Cowork.',
      },
      {
        n: '03',
        title: 'Tools bouwen',
        body: 'De geprioriteerde use-cases bouwen we uit tot werkende tools met Claude Code — reconciliatie-scripts, export-automatiseringen, een eigen interne assistent op jullie regelgeving.',
      },
      {
        n: '04',
        title: 'Training & begeleiding',
        body: 'Het team leren werken met Claude per workflow, een promptbibliotheek opbouwen, en de guardrails inslijpen. Na de uitrol draait het kantoor zelfstandig.',
      },
    ],
  },
  toolstack: {
    label: '04 · De inrichting',
    title: 'De toolstack voor een accountantskantoor',
    titleEn: 'Finance & Accounting Professionals',
    subtitle:
      'Eén sterk algemeen model als ruggengraat, en daaromheen alleen specialisten waar het echt nodig is. Per workflow het juiste gereedschap — dit brengen we samen met jullie in kaart.',
    note: 'Test elke laag eerst op je eigen documenttypes — niet elk topmodel leest financiële tabellen even accuraat. Dit valideren we in de R&D-fase.',
    cols: ['Workflow', 'Beste aanpak', 'Strategie', 'Waarom'],
    rows: [
      {
        workflow: 'Bonnen, facturen & data-invoer',
        approach: 'Document-extractietool (Dext-type) óf eigen OCR-pipeline',
        strategy: 'Bouwen' as const,
        why: 'Gestructureerde extractie is betrouwbaarder dan een los taalmodel; precies waar internationale tools het minst op Suriname aansluiten.',
      },
      {
        workflow: 'Bankreconciliatie & categorisatie',
        approach: 'Embedded AI in Xero of QuickBooks',
        strategy: 'Kopen' as const,
        why: 'Werkt in Suriname, past zich aan lokale belasting aan en leert van historische transacties.',
      },
      {
        workflow: 'Jaarrekening, rapportage & variance',
        approach: 'Claude — de ruggengraat',
        strategy: 'Claude' as const,
        why: 'Lange-document-redenering plus narratief. Hier verslaat een sterk algemeen model de gespecialiseerde tools.',
      },
      {
        workflow: 'Belasting & compliance research',
        approach: 'Claude mét de SR-regelgeving aangeleverd',
        strategy: 'Claude' as const,
        why: 'Er bestaat geen lokale TaxGPT. We voeren de wet (vierschijven-tarief, SRD-drempels) als herbruikbare context aan.',
      },
      {
        workflow: 'Fraude- & anomaliedetectie',
        approach: 'Bij groot volume een aparte tool; anders Claude op gemarkeerde posten',
        strategy: 'Claude' as const,
        why: 'Een enterprise-detectieplatform is overkill voor een gemiddeld kantoor. Schaal bepaalt de keuze.',
      },
      {
        workflow: "Forecasting & scenario's",
        approach: 'Claude + Excel (Datarails bij zware modellen)',
        strategy: 'Claude' as const,
        why: "Het model bouwt het raamwerk en de scenario's; de accountant valideert de aannames.",
      },
    ],
  },
  cowork: {
    label: '05 · De koppeling',
    title: 'Cowork efficiënter maken',
    subtitle:
      'Cowork wordt pas krachtig als het bij de data kan. We koppelen de bronnen waar het kantoor toch al in werkt, dan haalt de agent context op in plaats van dat iemand het handmatig aanlevert.',
    sourcesLabel: 'Bronnen die wij koppelen — finance & kantoor:',
    sources: ['Xero / QuickBooks', 'Google Drive (dossiers)', 'Gmail / Outlook', 'Google Agenda', 'Excel / Sheets', 'Belastingdienst-exports (CSV)', 'Eigen mappenstructuur'],
    body: 'Zodra deze gekoppeld zijn, kan Cowork een maandafsluiting voorbereiden, een dossier samenstellen of een conceptrapport schrijven op basis van de échte cijfers — met de accountant die nakijkt en goedkeurt, niet vanaf nul schrijft.',
    privacy: {
      title: 'Privacy & cliëntvertrouwelijkheid',
      body: 'Op Team-plannen worden gesprekken standaard niet gebruikt om het model te trainen — een contractuele waarborg die voor een accountantskantoor zwaar weegt. Wij zetten bij de inrichting de data- en privacy-instellingen meteen goed, vóórdat de eerste cliëntdata erin gaat.',
    },
    usecasesLabel: 'Finance use-cases — waar Claude direct helpt:',
    usecases: [
      { title: 'Reconciliatie', sub: 'posten matchen & afwijkingen markeren' },
      { title: 'Documenten lezen', sub: 'jaarrekening, contract, fiscale stukken' },
      { title: 'Rapportage', sub: 'conceptrapport + narratief bij cijfers' },
      { title: 'Forecast', sub: "scenario's & cashflow-prognose" },
    ],
    excelNote: 'Illustratieve weergave van Claude in Excel; bedragen zijn voorbeelddata.',
  },
  plans: {
    label: '06 · Het abonnement',
    title: 'Welk abonnement neemt het kantoor',
    subtitle:
      'Dit kost en kiest het kantoor zelf, rechtstreeks bij Anthropic — wij verkopen het niet. We adviseren de juiste keuze en zetten het op. Prijzen per juni 2026 in US$.',
    note: 'We bevestigen de actuele specificatie op claude.com/pricing vóór aanschaf. Een kantoor landt vrijwel altijd op Team (minimaal 5 seats).',
    directCost:
      'Het abonnement is een directe kost van het kantoor aan Anthropic en staat los van onze begeleiding.',
    recommended: 'Aanbevolen',
    items: [
      {
        name: 'Pro',
        price: '$20',
        per: '/mnd',
        ann: '$17/mnd jaarlijks',
        features: ['Eén gebruiker', 'Claude Code & Cowork inbegrepen', 'Bestanden & code-uitvoering', 'Geen centraal beheer'],
        who: 'Voor een solo-evaluatie vooraf',
        rec: false,
      },
      {
        name: 'Team Standard',
        price: '$25',
        per: '/seat/mnd',
        ann: '$20/seat jaarlijks',
        features: ['Min. 5 seats · beheer & SSO', 'Gedeelde projecten', 'Geen training op gesprekken', 'Claude Code & Cowork per seat'],
        who: 'Dagelijkse chat: junior & administratie',
        rec: false,
      },
      {
        name: 'Team Premium',
        price: '$125',
        per: '/seat/mnd',
        ann: '$100/seat jaarlijks',
        features: ['Min. 5 seats · alles van Standard', '~5× het gebruik van Standard', 'Hoogste Claude Code-capaciteit', 'Voor power-users & automatisering'],
        who: 'Partners, senior & de AI-champion',
        rec: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        per: '',
        ann: 'offerte via sales',
        features: ['Hybride: seat + verbruik per token', 'Audit-logs & rolgebaseerde toegang', 'Data-governance & SLA\'s', 'Pas relevant boven ~150 seats'],
        who: 'Nu nog niet nodig voor dit kantoor',
        rec: false,
      },
    ],
  },
  team: {
    label: '07 · De indeling',
    title: 'Teamindeling — wie krijgt wat',
    subtitle:
      'Niet iedereen hoeft een Premium-seat. De zware seats gaan naar wie automatiseert en modelleert; de rest werkt prima op Standard.',
    roles: [
      {
        seat: 'Premium-seat',
        title: 'Partner / Directie',
        body: 'Scenario-analyse, strategisch advies, board-rapportage en het hoogste gebruiksvolume. Hier compresseert AI de meeste uren.',
        prem: true,
      },
      {
        seat: 'Premium-seat',
        title: 'Senior / AI-champion',
        body: 'Beheert na de uitrol de automatiseringen en de promptbibliotheek, en is het interne aanspreekpunt. De spil van de adoptie.',
        prem: true,
      },
      {
        seat: 'Standard-seat',
        title: 'Junior & administratie',
        body: 'Dagelijks drafting, dossiers nakijken, klantcommunicatie en research. Inclusief basis Claude Code — tegen een vijfde van de Premium-prijs.',
        prem: false,
      },
    ],
  },
  calculator: {
    label: '08 · De investering',
    title: 'Wat kost dit voor uw kantoor',
    subtitle:
      'Twee kostenposten. Het Anthropic-abonnement betaalt het kantoor zelf rechtstreeks. De Suritargets-begeleiding is scope-gedreven: uren × uurtarief, met optionele doorlopende ondersteuning.',
    calcLabels: {
      premSeats: 'Premium-seats',
      stdSeats: 'Standard-seats',
      usecases: 'Use-cases / tools te bouwen',
      rate: 'Uurtarief begeleiding',
      support: 'Doorlopende ondersteuning',
      annual: 'Jaarlijks',
      monthly: 'Maandelijks',
      premHint: 'Partners, senior, AI-champion — full Claude Code',
      stdHint: 'Junior & administratie — dagelijks gebruik',
      ucHint: 'Bepaalt de bouw-uren',
      rateHint: 'Instelbaar · standaard $45/uur',
      supHint: 'Optioneel retainer na livegang — doorlopende begeleiding',
      billingLabel: 'Seat-facturatie',
      clientHeader: 'Het kantoor zelf · abonnement aan Anthropic',
      suriHeader: 'Suritargets begeleiding · eenmalig',
      supHeader: 'Suritargets · doorlopende ondersteuning',
      foundation: 'Fundament & inrichting',
      training: 'Training',
      tools: 'Tools bouwen',
      handover: 'Borging & overdracht',
      perMonth: 'Per maand',
      perYear: 'Per jaar',
      totalLabel: 'Suritargets begeleiding · jaar 1',
      totalNote1: 'Eenmalige investering',
      totalNote2: 'ondersteuning',
      clientNote: 'Anthropic abonnement (Claude licentie)',
      firstYear: 'Uw totale investering · jaar 1',
      seatWarn1: 'min. 5 seats',
      seatWarn2: 'Standard-seat(s) meegerekend',
      scenTitle: 'Scenario\'s',
      scenItems: [
        {
          lvl: 'Instap',
          title: '5 × Standard',
          sub: '$100/mnd · abonnement | $1.260 · begeleiding',
          desc: 'Het hele team op dagelijks gebruik, lichte uitrol. Puur drafting, analyse en research.',
        },
        {
          lvl: 'Aanbevolen',
          title: '2 × Premium + 3 × Standard',
          sub: '$260/mnd · abonnement | $1.800 · begeleiding',
          desc: 'De champion en partners op vol vermogen, de rest op Standard. Balans voor een kantoor van 5.',
        },
        {
          lvl: 'Power',
          title: '5 × Premium + API',
          sub: '$500+/mnd · abonnement | $2.340 · begeleiding',
          desc: 'Volledig op Premium plus API-budget voor maatwerk. Voor een kantoor dat AI tot kern maakt.',
        },
      ],
      cautionTitle: 'Drie dingen om vooraf helder te hebben',
      cautionBody:
        'Het abonnement betaalt het kantoor zelf — rechtstreeks aan Anthropic, in US$, regel een internationale betaalmethode. · Het 5-seat-minimum: een kantoor van 2 of 3 betaalt toch voor 5 seats. · De begeleiding is eenmalig; een doorlopende ondersteuning houdt het terugkerend.',
    },
  },
  rollout: {
    label: '09 · Het uitrolprogramma',
    title: 'Finance Pro & Claude — Hands on Deck In-House Training',
    intro:
      'Van fundament tot borging in zes weken. Eerst inrichten en beveiligen, dan koppelen, dan trainen per workflow, dan borgen en meten. De urenraming hieronder is de begeleiding door Suritargets à $45/uur.',
    phases: [
      {
        weeks: 'Week 1–2',
        phase: 'Fundament',
        title: 'Inrichten & beveiligen',
        items: [
          'Het (door het kantoor afgenomen) Team-plan opzetten, seats toewijzen, SSO & beheer activeren',
          'Privacy- en data-instellingen goedzetten vóór de eerste cliëntdata',
          'De AI-champion aanwijzen — de interne motor van de adoptie',
        ],
        hours: 12,
      },
      {
        weeks: 'Week 2–3',
        phase: 'Koppelen',
        title: 'Workflows verbinden & use-cases',
        items: [
          'Xero/QuickBooks, Drive, Gmail en agenda koppelen aan Claude & Cowork',
          'Use-cases in kaart brengen en prioriteren (R&D)',
          'SR-regelgeving als herbruikbare context klaarzetten',
        ],
        hours: 8,
      },
      {
        weeks: 'Week 3–5',
        phase: 'Bouwen & trainen',
        title: 'Tools bouwen & hands-on training',
        items: [
          'De geprioriteerde use-cases uitbouwen tot werkende tools (Claude Code)',
          'Per team trainen: reconciliatie, rapportage, fiscaal research, klantcommunicatie',
          'Promptbibliotheek opbouwen + de guardrail inslijpen: AI stelt op, de mens tekent',
        ],
        hours: 16,
      },
      {
        weeks: 'Week 5–6+',
        phase: 'Borgen',
        title: 'Meten & overdragen',
        items: [
          "SOP's vastleggen zodat kennis niet bij één persoon blijft",
          'Bespaarde uren per workflow meten — de businesscase hardmaken',
          'Overdracht aan de champion; verdere uren alleen op verzoek',
        ],
        hours: 4,
      },
    ],
    totalLabel: 'Begeleiding totaal',
    totalSub: '40 uur × $45 — aanbevolen scope (5 seats · 2 use-cases), eenmalig door Suritargets',
    totalPrice: '$1.800',
    totalPer: 'eenmalig',
    principles: [
      {
        n: 'Begin bij de bottleneck',
        title: 'Één workflow eerst',
        body: 'We pakken de duurste wekelijkse taak en zetten daar één tool een week lang op echt werk. Pas daarna uitbreiden.',
      },
      {
        n: 'Champion, geen comité',
        title: 'Één eigenaar',
        body: 'Adoptie staat of valt bij één interne trekker die we opleiden tot intern aanspreekpunt.',
      },
      {
        n: 'Test op eigen data',
        title: 'Vertrouw, maar verifieer',
        body: 'We valideren elke laag op jullie eigen documenttypes voordat een proces erop leunt.',
      },
    ],
  },
  cta: {
    label: 'Klaar om te starten?',
    title: 'Neem contact op voor meer informatie of om je aan te melden.',
    button: 'Neem contact op',
  },
}

const EN: typeof NL = {
  meta: {
    title: 'Finance & Accounting Inhouse Training — Claude Desktop + Excel | Suritargets',
    description:
      'Suritargets sets up Claude in your accounting firm. We map use-cases, build tools and train your team. Your subscription, our guidance.',
  },
  badge: 'Finance Pro & Claude · Hands on Deck In-House Training',
  hero: {
    kicker: 'For accounting and advisory firms',
    title: 'We set up Claude in your finance —',
    titleHighlight: 'you keep control',
    lede: 'Your firm takes a Claude subscription directly with Anthropic; Suritargets provides the guidance, implementation and R&D — mapping use-cases, building tools and training your team.',
    stats: [
      { value: '$45+', label: 'hourly rate · adjustable' },
      { value: '~6 wk', label: 'from foundation to handover' },
      { value: 'own', label: 'subscription with Anthropic' },
      { value: '3', label: 'tools for 90% of the work' },
    ],
  },
  why: {
    label: '01 · The starting point',
    title: 'Why — and where the line is',
    subtitle:
      'AI removes tasks, not roles. It accelerates drafting; the review and the signature stay with the accountant. That distinction is the foundation of the entire programme.',
    can: {
      tag: 'What AI takes over',
      title: 'The preparatory work',
      items: [
        'Transaction coding, bank reconciliation, invoice matching and expense categorisation — at scale',
        'Reading and searching long documents: annual reports, contracts, fiscal documents',
        'Draft reports, variance analysis and narrative alongside the figures',
        'Work that normally required two or three pairs of hands',
      ],
    },
    cant: {
      tag: 'What humans keep',
      title: 'Judgement and accountability',
      items: [
        'Advising on a complex restructuring or a new case',
        'Interpreting an unclear regulatory change',
        'Taking responsibility for a judgement',
        'The signature on the annual accounts',
      ],
    },
    pull: 'The right question is not "which model is best" but "where is the most time lost". Choose the bottleneck workflow first, then the tool — not the other way around.',
    impactTitle: 'What changes — the time savings',
    impactTag: 'Indicative · per workflow',
    impactLegend: ['Manual', 'With Claude'],
    impactNote:
      'Indicative examples; actual savings are validated on your own processes in the R&D phase. AI accelerates drafting — the review and signature stay with the accountant.',
    tasks: [
      { task: 'Prepare month-end close', before: '± 2 days', after: '± 3 hours', afterPct: 20 },
      { task: 'Read & summarise annual report', before: '± 4 hours', after: '± 30 min', afterPct: 13 },
      { task: 'Tax & compliance research', before: '± 3 hours', after: '± 25 min', afterPct: 15 },
      { task: 'Draft client report', before: '± 3 hours', after: '± 40 min', afterPct: 22 },
    ],
  },
  anthropic: {
    label: '02 · The tools',
    title: 'What Anthropic delivers',
    subtitle:
      'Four entry points to the same model. For a firm, the first three matter most — the API is only relevant when automating workflows.',
    note: '"The AI" is Claude — a model that understands, reasons and writes. Claude Code is that same Claude that not only thinks along, but also executes tasks: editing files, reconciling a CSV, building a tool. Every paid seat gives access to Claude Code; only the amount of usage differs.',
    cards: [
      {
        pin: 'Daily use',
        title: 'Claude Desktop & app',
        body: 'The chat interface on desktop, web and mobile. One place for research, reading documents, draft client letters and explaining figures in plain language.',
        use: 'The base layer for every employee — analysis, drafting, client communication.',
      },
      {
        pin: 'Files & tasks',
        title: 'Claude Cowork',
        body: 'The desktop agent for file and task management: reads documents, extracts data, fills spreadsheets and completes multi-step tasks. Available from Pro.',
        use: 'Prepare month-end close, compile files, repetitive prep work.',
      },
      {
        pin: 'Automation',
        title: 'Claude Code',
        body: "The agentic tool for delegating tasks from the desktop. The engine behind custom solutions: scripts that reconcile CSVs, prepare exports or build a custom tool. Included in paid plans.",
        use: "This is how Suritargets builds the automations that cover your use-cases.",
      },
      {
        pin: 'In existing tools',
        title: 'Connectors & Claude in Excel',
        body: 'Claude connects to Google Drive, Gmail, calendar and — via connectors — to bookkeeping and office systems. Claude in Excel brings the model directly into the spreadsheet.',
        use: 'Bring the model to the data, not the data to the model.',
      },
    ],
  },
  role: {
    label: '03 · Our role',
    title: 'What Suritargets delivers',
    subtitle:
      "We don't sell subscriptions. The firm takes Claude directly with Anthropic; we make it work — from use-case to working tool — and train the team.",
    note: 'Division: Anthropic delivers the model (your subscription). Suritargets delivers the thinking and the custom work around it — research, setup, tools and training, billed per hour.',
    steps: [
      {
        n: '01',
        title: 'R&D & use-case mapping',
        body: 'We map your work processes, find where AI saves the most time, and prioritise the use-cases worth pursuing. No loose tricks — a substantiated roadmap.',
      },
      {
        n: '02',
        title: 'Implement & set up',
        body: 'Setting up the subscription, assigning seats, configuring security and privacy, and connecting the sources (Xero, Drive, Excel) to Claude and Cowork.',
      },
      {
        n: '03',
        title: 'Build tools',
        body: 'We build the prioritised use-cases into working tools with Claude Code — reconciliation scripts, export automations, a custom internal assistant on your regulations.',
      },
      {
        n: '04',
        title: 'Training & guidance',
        body: 'Teaching the team to work with Claude per workflow, building a prompt library, and embedding the guardrails. After the rollout, the firm runs independently.',
      },
    ],
  },
  toolstack: {
    label: '04 · The setup',
    title: 'The toolstack for an accounting firm',
    titleEn: 'Finance & Accounting Professionals',
    subtitle:
      'One strong general model as backbone, and specialists around it only where truly needed. The right tool per workflow — we map this together.',
    note: 'Test each layer first on your own document types — not every top model reads financial tables equally accurately. We validate this in the R&D phase.',
    cols: ['Workflow', 'Best approach', 'Strategy', 'Why'],
    rows: [
      {
        workflow: 'Receipts, invoices & data entry',
        approach: 'Document extraction tool (Dext-type) or custom OCR pipeline',
        strategy: 'Bouwen' as const,
        why: 'Structured extraction is more reliable than a loose language model; exactly where international tools fit Suriname least.',
      },
      {
        workflow: 'Bank reconciliation & categorisation',
        approach: 'Embedded AI in Xero or QuickBooks',
        strategy: 'Kopen' as const,
        why: 'Works in Suriname, adapts to local tax and learns from historical transactions.',
      },
      {
        workflow: 'Annual report, reporting & variance',
        approach: 'Claude — the backbone',
        strategy: 'Claude' as const,
        why: 'Long-document reasoning plus narrative. Here a strong general model beats specialised tools.',
      },
      {
        workflow: 'Tax & compliance research',
        approach: 'Claude with local regulations supplied',
        strategy: 'Claude' as const,
        why: 'There is no local TaxGPT. We supply the law (four-bracket rate, SRD thresholds) as reusable context.',
      },
      {
        workflow: 'Fraud & anomaly detection',
        approach: 'Separate tool at large volume; otherwise Claude on flagged entries',
        strategy: 'Claude' as const,
        why: 'An enterprise detection platform is overkill for an average firm. Scale determines the choice.',
      },
      {
        workflow: 'Forecasting & scenarios',
        approach: 'Claude + Excel (Datarails for heavy models)',
        strategy: 'Claude' as const,
        why: 'The model builds the framework and scenarios; the accountant validates the assumptions.',
      },
    ],
  },
  cowork: {
    label: '05 · The integration',
    title: 'Making Cowork more efficient',
    subtitle:
      'Cowork becomes powerful when it can access data. We connect the sources the firm already works in — then the agent retrieves context instead of someone supplying it manually.',
    sourcesLabel: 'Sources we connect — finance & office:',
    sources: ['Xero / QuickBooks', 'Google Drive (files)', 'Gmail / Outlook', 'Google Calendar', 'Excel / Sheets', 'Tax Authority exports (CSV)', 'Own folder structure'],
    body: 'Once connected, Cowork can prepare a month-end close, compile a file or write a draft report based on the actual figures — with the accountant checking and approving, not starting from scratch.',
    privacy: {
      title: 'Privacy & client confidentiality',
      body: 'On Team plans, conversations are not used to train the model by default — a contractual guarantee that weighs heavily for an accounting firm. We configure the data and privacy settings immediately during setup, before the first client data goes in.',
    },
    usecasesLabel: 'Finance use-cases — where Claude helps directly:',
    usecases: [
      { title: 'Reconciliation', sub: 'match entries & flag discrepancies' },
      { title: 'Read documents', sub: 'annual report, contract, fiscal documents' },
      { title: 'Reporting', sub: 'draft report + narrative alongside figures' },
      { title: 'Forecast', sub: 'scenarios & cashflow projections' },
    ],
    excelNote: 'Illustrative representation of Claude in Excel; amounts are example data.',
  },
  plans: {
    label: '06 · The subscription',
    title: 'Which subscription does the firm take',
    subtitle:
      "This is what the firm costs and chooses itself, directly with Anthropic — we don't sell it. We advise on the right choice and set it up. Prices per June 2026 in US$.",
    note: 'We confirm the current specification at claude.com/pricing before purchase. A firm almost always lands on Team (minimum 5 seats).',
    directCost:
      'The subscription is a direct cost from the firm to Anthropic and is separate from our guidance.',
    recommended: 'Recommended',
    items: [
      {
        name: 'Pro',
        price: '$20',
        per: '/mo',
        ann: '$17/mo annually',
        features: ['One user', 'Claude Code & Cowork included', 'Files & code execution', 'No central management'],
        who: 'For a solo evaluation in advance',
        rec: false,
      },
      {
        name: 'Team Standard',
        price: '$25',
        per: '/seat/mo',
        ann: '$20/seat annually',
        features: ['Min. 5 seats · management & SSO', 'Shared projects', 'No training on conversations', 'Claude Code & Cowork per seat'],
        who: 'Daily chat: junior & administration',
        rec: false,
      },
      {
        name: 'Team Premium',
        price: '$125',
        per: '/seat/mo',
        ann: '$100/seat annually',
        features: ['Min. 5 seats · everything from Standard', '~5× the usage of Standard', 'Highest Claude Code capacity', 'For power users & automation'],
        who: 'Partners, senior & the AI champion',
        rec: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        per: '',
        ann: 'quote via sales',
        features: ['Hybrid: seat + usage per token', 'Audit logs & role-based access', 'Data governance & SLAs', 'Relevant above ~150 seats'],
        who: 'Not yet needed for this firm',
        rec: false,
      },
    ],
  },
  team: {
    label: '07 · The structure',
    title: 'Team structure — who gets what',
    subtitle:
      'Not everyone needs a Premium seat. Heavy seats go to those who automate and model; the rest works fine on Standard.',
    roles: [
      {
        seat: 'Premium seat',
        title: 'Partner / Management',
        body: 'Scenario analysis, strategic advice, board reporting and the highest usage volume. Here AI compresses the most hours.',
        prem: true,
      },
      {
        seat: 'Premium seat',
        title: 'Senior / AI champion',
        body: 'Manages the automations and prompt library after rollout, and is the internal point of contact. The pivot of adoption.',
        prem: true,
      },
      {
        seat: 'Standard seat',
        title: 'Junior & administration',
        body: 'Daily drafting, file review, client communication and research. Including basic Claude Code — at a fifth of the Premium price.',
        prem: false,
      },
    ],
  },
  calculator: {
    label: '08 · The investment',
    title: 'What does this cost your firm',
    subtitle:
      'Two cost items. The Anthropic subscription is paid directly by the firm. Suritargets guidance is scope-driven: hours × hourly rate, with optional ongoing support.',
    calcLabels: {
      premSeats: 'Premium seats',
      stdSeats: 'Standard seats',
      usecases: 'Use-cases / tools to build',
      rate: 'Guidance hourly rate',
      support: 'Ongoing support',
      annual: 'Annual',
      monthly: 'Monthly',
      premHint: 'Partners, senior, AI champion — full Claude Code',
      stdHint: 'Junior & administration — daily use',
      ucHint: 'Determines the build hours',
      rateHint: 'Adjustable · default $45/hour',
      supHint: 'Optional retainer after go-live — ongoing guidance',
      billingLabel: 'Seat billing',
      clientHeader: 'The firm itself · subscription to Anthropic',
      suriHeader: 'Suritargets guidance · one-off',
      supHeader: 'Suritargets · ongoing support',
      foundation: 'Foundation & setup',
      training: 'Training',
      tools: 'Build tools',
      handover: 'Handover & embed',
      perMonth: 'Per month',
      perYear: 'Per year',
      totalLabel: 'Suritargets guidance · year 1',
      totalNote1: 'One-off investment',
      totalNote2: 'support',
      clientNote: 'Anthropic subscription (Claude licence)',
      firstYear: 'Your total investment · year 1',
      seatWarn1: 'min. 5 seats',
      seatWarn2: 'Standard seat(s) included',
      scenTitle: 'Scenarios',
      scenItems: [
        {
          lvl: 'Entry',
          title: '5 × Standard',
          sub: '$100/mo · subscription | $1,260 · guidance',
          desc: 'Full team on daily use, light rollout. Pure drafting, analysis and research.',
        },
        {
          lvl: 'Recommended',
          title: '2 × Premium + 3 × Standard',
          sub: '$260/mo · subscription | $1,800 · guidance',
          desc: 'Champion and partners at full power, the rest on Standard. Balance for a firm of 5.',
        },
        {
          lvl: 'Power',
          title: '5 × Premium + API',
          sub: '$500+/mo · subscription | $2,340 · guidance',
          desc: 'Fully on Premium plus API budget for custom solutions. For a firm making AI core.',
        },
      ],
      cautionTitle: 'Three things to clarify upfront',
      cautionBody:
        'The subscription is paid directly to Anthropic in US$ — arrange an international payment method. · The 5-seat minimum: a firm of 2 or 3 still pays for 5 seats. · Guidance is one-off; ongoing support makes it recurring.',
    },
  },
  rollout: {
    label: '09 · The rollout programme',
    title: 'Finance Pro & Claude — Hands on Deck In-House Training',
    intro:
      'From foundation to handover in six weeks. First set up and secure, then connect, then train per workflow, then embed and measure. Hours below are Suritargets guidance at $45/hour.',
    phases: [
      {
        weeks: 'Week 1–2',
        phase: 'Foundation',
        title: 'Set up & secure',
        items: [
          'Set up the (firm-taken) Team plan, assign seats, activate SSO & management',
          'Configure privacy and data settings before the first client data',
          'Appoint the AI champion — the internal engine of adoption',
        ],
        hours: 12,
      },
      {
        weeks: 'Week 2–3',
        phase: 'Connect',
        title: 'Connect workflows & use-cases',
        items: [
          'Connect Xero/QuickBooks, Drive, Gmail and calendar to Claude & Cowork',
          'Map and prioritise use-cases (R&D)',
          'Set up local regulations as reusable context',
        ],
        hours: 8,
      },
      {
        weeks: 'Week 3–5',
        phase: 'Build & train',
        title: 'Build tools & hands-on training',
        items: [
          'Build prioritised use-cases into working tools (Claude Code)',
          'Train per team: reconciliation, reporting, tax research, client communication',
          'Build prompt library + embed guardrail: AI drafts, human signs',
        ],
        hours: 16,
      },
      {
        weeks: 'Week 5–6+',
        phase: 'Embed',
        title: 'Measure & hand over',
        items: [
          "Document SOPs so knowledge doesn't stay with one person",
          'Measure saved hours per workflow — make the business case concrete',
          'Hand over to champion; further hours only on request',
        ],
        hours: 4,
      },
    ],
    totalLabel: 'Total guidance',
    totalSub: '40 hours × $45 — recommended scope (5 seats · 2 use-cases), one-off by Suritargets',
    totalPrice: '$1,800',
    totalPer: 'one-off',
    principles: [
      {
        n: 'Start at the bottleneck',
        title: 'One workflow first',
        body: 'We take the most expensive weekly task and put one tool on it for a week on real work. Only then expand.',
      },
      {
        n: 'Champion, not committee',
        title: 'One owner',
        body: 'Adoption stands or falls with one internal driver we train as the internal point of contact.',
      },
      {
        n: 'Test on own data',
        title: 'Trust, but verify',
        body: 'We validate each layer on your own document types before a process depends on it.',
      },
    ],
  },
  cta: {
    label: 'Ready to start?',
    title: 'Get in touch for more information or to enrol.',
    button: 'Get in touch',
  },
}

// ─────────────────────────────────────────────────────
// STRATEGY PILL
// ─────────────────────────────────────────────────────

const PILL_STYLES: Record<string, string> = {
  Bouwen: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Kopen:  'bg-[#2B3494]/8 text-[#2B3494] border border-[#2B3494]/20',
  Claude: 'bg-[#2B3494] text-white',
  Build:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Buy:    'bg-[#2B3494]/8 text-[#2B3494] border border-[#2B3494]/20',
}

// ─────────────────────────────────────────────────────
// PAGE CONTENT COMPONENT
// ─────────────────────────────────────────────────────

export function FinanceAccountingContent({ locale }: { locale: string }) {
  const c = locale === 'nl' ? NL : EN
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [financeData, setFinanceData] = useState<Record<string, unknown>>({})

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-[#2B3494] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="px-(--section-padding-x) pt-14 pb-16 max-w-360 mx-auto relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] shrink-0" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-white font-bold">{c.badge}</span>
            </div>
            <p className="font-mono text-[11px] tracking-widest uppercase text-white/70 mb-4">{c.hero.kicker}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] max-w-3xl">
              {c.hero.title}{' '}
              <span className="border-b-4 border-[#E8192C] pb-0.5">{c.hero.titleHighlight}</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{c.hero.lede}</p>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-0">
              {c.hero.stats.map((s) => (
                <div key={s.label} className="pr-6 mr-6 border-r border-white/15 last:border-r-0 last:mr-0 last:pr-0">
                  <div className="font-mono font-bold text-3xl text-white">{s.value}</div>
                  <div className="text-xs text-white/55 mt-1.5">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 01 WHY ────────────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">01</span>
              {c.why.label.replace('01 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.why.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.why.subtitle}</p>
          </AnimatedSection>

          {/* Can / Can't grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedSection delay={40}>
              <div className="border border-border rounded-xl p-7 bg-surface h-full">
                <span className="font-mono text-[11px] tracking-widest uppercase text-emerald-600 font-bold">{c.why.can.tag}</span>
                <h3 className="text-lg font-bold text-[#2B3494] mt-2 mb-4">{c.why.can.title}</h3>
                <ul className="space-y-3">
                  {c.why.can.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="border border-[#2B3494]/20 rounded-xl p-7 bg-[#2B3494] h-full">
                <span className="font-mono text-[11px] tracking-widest uppercase text-white/70 font-bold">{c.why.cant.tag}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-4">{c.why.cant.title}</h3>
                <ul className="space-y-3">
                  {c.why.cant.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Pull quote */}
          <AnimatedSection delay={120}>
            <div className="mt-6 border-l-4 border-[#2B3494] bg-[#2B3494]/5 rounded-r-xl px-6 py-5">
              <p className="font-semibold text-[#20266E] leading-relaxed">{c.why.pull}</p>
            </div>
          </AnimatedSection>

          {/* Impact bars */}
          <AnimatedSection delay={160}>
            <div className="mt-10 border border-border rounded-xl bg-surface p-7">
              <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                <h3 className="font-bold text-[#2B3494] text-xl">{c.why.impactTitle}</h3>
                <span className="font-mono text-[11px] tracking-wider uppercase text-muted-foreground">{c.why.impactTag}</span>
              </div>
              <div className="flex gap-5 mb-6 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#9aa3d6]" />{c.why.impactLegend[0]}</span>
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#E8192C]" />{c.why.impactLegend[1]}</span>
              </div>
              <div className="space-y-6">
                {c.why.tasks.map((row) => (
                  <div key={row.task} className="border-t border-border pt-4">
                    <p className="font-semibold text-sm text-foreground mb-3">{row.task}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="w-20 font-mono text-[11px] text-muted-foreground shrink-0">{c.why.impactLegend[0]}</span>
                        <div className="flex-1 h-3 bg-border rounded-full overflow-hidden"><div className="h-full bg-[#9aa3d6] rounded-full w-full" /></div>
                        <span className="w-24 text-right font-mono text-xs text-foreground font-medium shrink-0">{row.before}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 font-mono text-[11px] text-muted-foreground shrink-0">{c.why.impactLegend[1]}</span>
                        <div className="flex-1 h-3 bg-border rounded-full overflow-hidden"><div className="h-full bg-[#E8192C] rounded-full" style={{ width: `${row.afterPct}%` }} /></div>
                        <span className="w-24 text-right font-mono text-xs text-foreground font-medium shrink-0">{row.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground italic">{c.why.impactNote}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 02 ANTHROPIC ─────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">02</span>
              {c.anthropic.label.replace('02 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.anthropic.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.anthropic.subtitle}</p>
            <div className="mt-5 flex gap-3 items-start bg-[#2B3494]/5 border border-[#2B3494]/15 rounded-xl p-4">
              <span className="w-6 h-6 rounded-md bg-[#E8192C] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</span>
              <p className="text-sm text-[#20266E]">{c.anthropic.note}</p>
            </div>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.anthropic.cards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 30}>
                <div className="border border-border rounded-xl p-6 bg-surface h-full hover:border-[#2B3494]/30 transition-colors">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#E8192C] font-bold">{card.pin}</span>
                  <h3 className="text-lg font-bold text-[#2B3494] mt-2 mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                  <div className="mt-4 pt-3 border-t border-border text-xs text-foreground">
                    <span className="font-bold">→ </span>{card.use}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 OUR ROLE ──────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">03</span>
              {c.role.label.replace('03 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.role.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.role.subtitle}</p>

            <div className="mt-5 inline-flex items-center gap-2 border border-[#E8192C]/30 bg-red-50 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#E8192C] font-bold">Finance Pro & Claude · Hands on Deck In-House Training</span>
            </div>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.role.steps.map((step, i) => (
              <AnimatedSection key={step.n} delay={i * 30}>
                <div className="border border-border rounded-xl p-6 bg-background flex gap-5">
                  <span className="w-10 h-10 rounded-lg bg-[#2B3494] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">{step.n}</span>
                  <div>
                    <h3 className="font-bold text-[#2B3494] mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={140}>
            <div className="mt-6 flex gap-3 items-start bg-[#2B3494]/5 border border-[#2B3494]/15 rounded-xl p-4">
              <span className="w-6 h-6 rounded-md bg-[#2B3494]/20 text-[#2B3494] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">i</span>
              <p className="text-sm text-[#20266E]">{c.role.note}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 04 TOOLSTACK ─────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">04</span>
              {c.toolstack.label.replace('04 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.toolstack.title}</h2>
            <p className="font-mono text-sm text-muted-foreground mt-1">{c.toolstack.titleEn}</p>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.toolstack.subtitle}</p>
          </AnimatedSection>

          <AnimatedSection delay={60}>
            <div className="mt-8 border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#2B3494]">
                    {c.toolstack.cols.map((col) => (
                      <th key={col} className="text-left px-4 py-3 font-mono text-[10px] tracking-widest uppercase text-white/80 font-medium">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.toolstack.rows.map((row, i) => (
                    <tr key={row.workflow} className={i % 2 === 0 ? 'bg-background' : 'bg-surface'}>
                      <td className="px-4 py-3 font-semibold text-foreground border-t border-border align-top">{row.workflow}</td>
                      <td className="px-4 py-3 text-muted-foreground border-t border-border align-top">{row.approach}</td>
                      <td className="px-4 py-3 border-t border-border align-top">
                        <span className={`inline-block font-mono text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-md ${PILL_STYLES[row.strategy] ?? 'bg-surface text-muted-foreground'}`}>
                          {row.strategy}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground border-t border-border align-top text-xs leading-relaxed">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground italic">{c.toolstack.note}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 05 COWORK ────────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">05</span>
              {c.cowork.label.replace('05 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.cowork.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.cowork.subtitle}</p>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <AnimatedSection delay={40}>
              <div>
                <p className="font-semibold text-muted-foreground mb-3 text-sm">{c.cowork.sourcesLabel}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {c.cowork.sources.map((s) => (
                    <span key={s} className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-2 text-sm bg-background font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />{s}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.cowork.body}</p>

                {/* Use-cases mini-grid */}
                <p className="font-semibold text-muted-foreground mb-3 text-sm">{c.cowork.usecasesLabel}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {c.cowork.usecases.map((uc, i) => {
                    const icons = [CheckCircle, FileText, BarChart2, TrendingUp]
                    const Ic = icons[i] ?? CheckCircle
                    return (
                      <div key={uc.title} className="flex gap-3 items-center border border-border rounded-lg p-3 bg-background">
                        <span className="w-9 h-9 rounded-lg bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center shrink-0">
                          <Ic size={17} strokeWidth={1.5} />
                        </span>
                        <div>
                          <div className="font-semibold text-sm text-foreground">{uc.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{uc.sub}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Claude in Excel mockup */}
                <div className="border border-border rounded-xl overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 bg-surface px-4 py-3 border-b border-border">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-border" />
                      <span className="w-2.5 h-2.5 rounded-full bg-border" />
                      <span className="w-2.5 h-2.5 rounded-full bg-border" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">MonthlyClose.xlsx</span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-[#2B3494] bg-[#2B3494]/8 px-2 py-1 rounded font-bold">Claude in Excel</span>
                  </div>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-surface">
                        <th className="w-8 border border-border px-2 py-2 font-mono text-[10px] text-muted-foreground" />
                        <th className="border border-border px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground text-left">A · Description</th>
                        <th className="border border-border px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground text-left">B · Amount (USD)</th>
                        <th className="border border-border px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground text-left">C · Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'Revenue', '184,200', <span key="ok1" className="text-emerald-600 font-semibold text-xs">✓ ok</span>],
                        ['2', 'Cost of Goods Sold', '92,400', <span key="ok2" className="text-emerald-600 font-semibold text-xs">✓ ok</span>],
                        ['3', 'Personnel Costs', '61,800', <span key="warn" className="text-amber-600 font-semibold text-xs">⚠ review</span>],
                        ['4', 'Net Result', <strong key="result" className="text-[#2B3494] font-bold">30,000</strong>, <span key="form" className="font-mono text-[11px] text-muted-foreground">=B1−B2−B3</span>],
                      ].map((row) => (
                        <tr key={String(row[0])}>
                          <td className="border border-border px-2 py-2 font-mono text-[11px] text-muted-foreground text-center bg-surface">{row[0]}</td>
                          <td className="border border-border px-3 py-2 text-foreground">{row[1]}</td>
                          <td className="border border-border px-3 py-2 font-mono text-right text-foreground">{row[2]}</td>
                          <td className="border border-border px-3 py-2">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-[#2B3494] px-4 py-3 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white/15 text-white flex items-center justify-center text-sm shrink-0">✦</span>
                    <span className="text-sm text-white"><strong>Claude:</strong> reconciliation complete — row 3 (Personnel) deviates from prior month, flagged for review.</span>
                    <span className="ml-auto bg-[#E8192C] text-white font-mono text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">3h → 12 min</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground italic">{c.cowork.excelNote}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={80}>
              <div className="bg-[#2B3494] rounded-xl p-6 text-white h-fit sticky top-24">
                <h4 className="font-bold text-white text-base relative pl-4 mb-3">
                  <span className="absolute left-0 top-0.5 bottom-0.5 w-1 bg-[#E8192C] rounded" />
                  {c.cowork.privacy.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">{c.cowork.privacy.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 06 PLANS ─────────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">06</span>
              {c.plans.label.replace('06 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.plans.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.plans.subtitle}</p>
            <div className="mt-5 flex gap-3 items-start bg-[#2B3494]/5 border border-[#2B3494]/15 rounded-xl p-4">
              <span className="text-[#2B3494] font-bold shrink-0">$</span>
              <p className="text-sm text-[#20266E]">{c.plans.directCost}</p>
            </div>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.plans.items.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 30}>
                <div className={`border rounded-xl p-6 flex flex-col h-full relative ${plan.rec ? 'border-2 border-[#E8192C] shadow-lg shadow-[#E8192C]/10' : 'border-border bg-surface'}`}>
                  {plan.rec && (
                    <div className="absolute -top-3 left-4 bg-[#E8192C] text-white font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                      {c.plans.recommended}
                    </div>
                  )}
                  <div className="font-bold text-[#2B3494] text-lg">{plan.name}</div>
                  <div className="font-mono font-bold text-2xl mt-2 text-foreground">
                    {plan.price}<span className="text-sm text-muted-foreground font-normal">{plan.per}</span>
                  </div>
                  <div className="text-xs text-emerald-600 font-mono font-medium mt-0.5">{plan.ann}</div>
                  <ul className="mt-4 space-y-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight size={12} className="text-[#2B3494] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-border text-xs font-semibold text-foreground">{plan.who}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground italic">{c.plans.note}</p>
        </div>
      </section>

      {/* ── 07 TEAM ──────────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">07</span>
              {c.team.label.replace('07 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.team.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.team.subtitle}</p>
          </AnimatedSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.team.roles.map((role, i) => (
              <AnimatedSection key={role.title} delay={i * 30}>
                <div className="border border-border rounded-xl overflow-hidden bg-background h-full">
                  <div className={`px-5 py-4 ${role.prem ? 'bg-[#2B3494]' : 'bg-[#2B3494]/8'}`}>
                    <span className={`font-mono text-[10px] tracking-widest uppercase font-bold ${role.prem ? 'text-white/70' : 'text-[#2B3494]'}`}>{role.seat}</span>
                    <h3 className={`font-bold mt-1 text-base ${role.prem ? 'text-white' : 'text-[#2B3494]'}`}>{role.title}</h3>
                  </div>
                  <div className="p-5 text-sm text-muted-foreground leading-relaxed">{role.body}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 CALCULATOR ────────────────────────────────── */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] mb-4 font-bold flex items-center gap-3">
              <span className="w-7 h-7 rounded-md bg-[#2B3494]/8 text-[#2B3494] flex items-center justify-center text-[10px] font-bold">08</span>
              {c.calculator.label.replace('08 · ', '')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2B3494] tracking-tight">{c.calculator.title}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{c.calculator.subtitle}</p>
          </AnimatedSection>

          <AnimatedSection delay={60}>
            <div className="mt-8">
              <FinanceCalc
                labels={c.calculator.calcLabels}
                onRequestQuote={(data) => {
                  setFinanceData(data)
                  setDrawerOpen(true)
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 09 ROLLOUT ───────────────────────────────────── */}
      <section className="bg-[#2B3494]">
        <div className="px-(--section-padding-x) py-(--section-padding-y) max-w-360 mx-auto">
          <AnimatedSection>
            <p className="font-mono text-[11px] tracking-widest uppercase text-white/70 mb-4 font-bold">
              {c.rollout.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight max-w-2xl">{c.rollout.title}</h2>
            <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">
              <strong className="text-white">Van fundament tot borging in zes weken.</strong>{' '}
              {c.rollout.intro.replace('Van fundament tot borging in zes weken. ', '').replace('From foundation to handover in six weeks. ', '')}
            </p>
          </AnimatedSection>

          <div className="mt-10 space-y-0">
            {c.rollout.phases.map((phase, i) => (
              <AnimatedSection key={phase.phase} delay={i * 40}>
                <div className="grid grid-cols-[140px_1fr_80px] gap-6 py-6 border-t border-white/15 items-start">
                  <div>
                    <div className="font-mono font-bold text-white text-sm">{phase.weeks}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-1">{phase.phase}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-3">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                          <ArrowRight size={12} className="text-white/40 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-white text-xl">{phase.hours}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-1">uur</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* Total */}
            <div className="grid grid-cols-[140px_1fr_80px] gap-6 pt-5 border-t border-white/15 items-baseline">
              <div className="col-span-2">
                <p className="font-bold text-white text-base">{c.rollout.totalLabel}</p>
                <p className="text-white/50 text-xs mt-1">{c.rollout.totalSub}</p>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-white text-2xl border-b-2 border-[#E8192C] pb-0.5 inline-block">{c.rollout.totalPrice}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mt-1">{c.rollout.totalPer}</div>
              </div>
            </div>
          </div>

          {/* Principles */}
          <AnimatedSection delay={100}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/15">
              {c.rollout.principles.map((p) => (
                <div key={p.n}>
                  <div className="font-mono font-bold text-white text-sm mb-2">{p.n}</div>
                  <h4 className="font-bold text-white text-base mb-2">{p.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <AnimatedSection>
        <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-gold/30">
          <div className="max-w-360 mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{c.cta.label}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-xl">{c.cta.title}</h2>
            </div>
            <CtaButton href="/contact">{c.cta.button}</CtaButton>
          </div>
        </section>
      </AnimatedSection>

      {/* ── ENROLLMENT DRAWER ────────────────────────────── */}
      <EnrollmentDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        course={{
          slug: 'finance-accounting-claude',
          name: 'Finance & Accounting Training',
          type: 'finance',
        }}
        financeData={financeData}
      />
    </>
  )
}
