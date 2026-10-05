export interface RoleCardData {
  slug: string;
  roleName: string;
  roleFamily: string;
  familyCategory: 'technology' | 'data' | 'product' | 'design' | 'business' | 'finance' | 'marketing' | 'operations' | 'engineering';
  responsibilities: [string, string, string];
  skillsCount: number;
  projectsCount: number;
  level: string; // e.g., 'FOUNDATION', 'SPECIALIST', 'PRACTITIONER'
  // Distinctive Color System for this role family
  colors: {
    bg: string;             // Dominant editorial background
    cardBg: string;         // Front card background
    stackBorder: string;    // Clean crisp dark/contrast outline
    accent: string;         // Illustration / accent color
    text: string;           // High-contrast primary text
    subtext: string;        // Readable secondary metadata
    tagBg: string;          // Pill category background
    tagText: string;        // Pill category text
    ctaBg: string;          // Primary CTA background
    ctaText: string;        // Primary CTA text
    tryFreeBg: string;      // Try for free button background
    tryFreeText: string;    // Try for free button text
  };
  objectType: 'data' | 'product' | 'software' | 'ai' | 'design' | 'security' | 'mechanical' | 'marketing' | 'business' | 'devops';
  tryForFreeUrl: string;
  exploreUrl: string;
}

export const PATHWISSE_ROLE_CARDS: RoleCardData[] = [
  {
    slug: 'data-analyst',
    roleName: 'Data Analyst',
    roleFamily: 'DATA & ANALYTICS',
    familyCategory: 'data',
    responsibilities: [
      'Query and structure raw operational data',
      'Build predictive executive KPI dashboards',
      'Translate metrics into commercial decisions'
    ],
    skillsCount: 14,
    projectsCount: 5,
    level: 'FOUNDATION',
    colors: {
      bg: '#EAF5F0',
      cardBg: '#FFFFFF',
      stackBorder: '#123E2E',
      accent: '#0D7A53',
      text: '#0B2C20',
      subtext: '#2C5A48',
      tagBg: '#D5ECE2',
      tagText: '#0D7A53',
      ctaBg: '#0D7A53',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#0D7A53',
    },
    objectType: 'data',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=data-analyst',
    exploreUrl: '/careers/data-analyst',
  },
  {
    slug: 'product-manager',
    roleName: 'Product Manager',
    roleFamily: 'PRODUCT & STRATEGY',
    familyCategory: 'product',
    responsibilities: [
      'Frame ambiguous customer friction points',
      'Prioritize roadmap with engineering tradeoffs',
      'Align cross-functional execution cohorts'
    ],
    skillsCount: 18,
    projectsCount: 6,
    level: 'PRACTITIONER',
    colors: {
      bg: '#FAF3EA',
      cardBg: '#FFFFFF',
      stackBorder: '#4A2A0C',
      accent: '#C86011',
      text: '#381C04',
      subtext: '#6B4522',
      tagBg: '#F3E4D1',
      tagText: '#B85006',
      ctaBg: '#C86011',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#C86011',
    },
    objectType: 'product',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=product-manager',
    exploreUrl: '/careers/product-manager',
  },
  {
    slug: 'ai-engineer',
    roleName: 'AI Engineer',
    roleFamily: 'AI & INTELLIGENCE SYSTEMS',
    familyCategory: 'data',
    responsibilities: [
      'Fine-tune domain models & evaluate outputs',
      'Architect robust multi-agent RAG pipelines',
      'Benchmark latency and hallucination boundaries'
    ],
    skillsCount: 24,
    projectsCount: 8,
    level: 'SPECIALIST',
    colors: {
      bg: '#F3EFFE',
      cardBg: '#FFFFFF',
      stackBorder: '#2E195E',
      accent: '#6E39D6',
      text: '#200F43',
      subtext: '#4C307B',
      tagBg: '#E4DBFB',
      tagText: '#622FCA',
      ctaBg: '#6E39D6',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#6E39D6',
    },
    objectType: 'ai',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=ai-engineer',
    exploreUrl: '/careers/ai-engineer',
  },
  {
    slug: 'full-stack-developer',
    roleName: 'Full Stack Developer',
    roleFamily: 'SOFTWARE ENGINEERING',
    familyCategory: 'technology',
    responsibilities: [
      'Engineer modular web and client architectures',
      'Implement resilient REST & GraphQL services',
      'Deploy database schemas with strict ACID integrity'
    ],
    skillsCount: 22,
    projectsCount: 7,
    level: 'CORE',
    colors: {
      bg: '#EAF0FC',
      cardBg: '#FFFFFF',
      stackBorder: '#122B57',
      accent: '#1E58B8',
      text: '#0C1F40',
      subtext: '#27477A',
      tagBg: '#D7E5FA',
      tagText: '#174FA8',
      ctaBg: '#1E58B8',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#1E58B8',
    },
    objectType: 'software',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=full-stack-developer',
    exploreUrl: '/careers/full-stack-developer',
  },
  {
    slug: 'business-analyst',
    roleName: 'Business Analyst',
    roleFamily: 'BUSINESS & OPERATIONS',
    familyCategory: 'business',
    responsibilities: [
      'Deconstruct complex operational workflows',
      'Author technical specifications & user stories',
      'Model cost-benefit cases for executive buy-in'
    ],
    skillsCount: 16,
    projectsCount: 5,
    level: 'CORE',
    colors: {
      bg: '#F6F3EE',
      cardBg: '#FFFFFF',
      stackBorder: '#393327',
      accent: '#8C6C23',
      text: '#262218',
      subtext: '#564D3B',
      tagBg: '#ECE6D6',
      tagText: '#7D5F18',
      ctaBg: '#8C6C23',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#8C6C23',
    },
    objectType: 'business',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=business-analyst',
    exploreUrl: '/careers/business-analyst',
  },
  {
    slug: 'ui-ux-designer',
    roleName: 'UI/UX Designer',
    roleFamily: 'PRODUCT DESIGN & SYSTEMS',
    familyCategory: 'design',
    responsibilities: [
      'Design accessible tokens & component systems',
      'Prototype ergonomic interactive touchpoints',
      'Conduct usability labs & heuristic audits'
    ],
    skillsCount: 17,
    projectsCount: 6,
    level: 'CORE',
    colors: {
      bg: '#FCEDEE',
      cardBg: '#FFFFFF',
      stackBorder: '#4F181D',
      accent: '#C7384A',
      text: '#3D0E13',
      subtext: '#7A2C35',
      tagBg: '#F8DBDE',
      tagText: '#B8283A',
      ctaBg: '#C7384A',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#C7384A',
    },
    objectType: 'design',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=ui-ux-designer',
    exploreUrl: '/careers/ui-ux-designer',
  },
  {
    slug: 'cybersecurity-analyst',
    roleName: 'Cybersecurity Analyst',
    roleFamily: 'SECURITY & INFRASTRUCTURE',
    familyCategory: 'technology',
    responsibilities: [
      'Monitor telemetry for adversarial intrusions',
      'Audit access boundaries & perimeter policies',
      'Execute vulnerability scans & incident drills'
    ],
    skillsCount: 20,
    projectsCount: 6,
    level: 'SPECIALIST',
    colors: {
      bg: '#EEF6F8',
      cardBg: '#FFFFFF',
      stackBorder: '#103942',
      accent: '#0E758A',
      text: '#09252B',
      subtext: '#205561',
      tagBg: '#DBEEF2',
      tagText: '#0B687C',
      ctaBg: '#0E758A',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#0E758A',
    },
    objectType: 'security',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=cybersecurity-analyst',
    exploreUrl: '/careers/cybersecurity-analyst',
  },
  {
    slug: 'devops-cloud-engineer',
    roleName: 'DevOps & Cloud Engineer',
    roleFamily: 'CLOUD PLATFORMS',
    familyCategory: 'technology',
    responsibilities: [
      'Provision immutable infrastructure with Terraform',
      'Automate deterministic CI/CD deployment pipelines',
      'Instrument distributed tracing & cluster alerts'
    ],
    skillsCount: 21,
    projectsCount: 7,
    level: 'SPECIALIST',
    colors: {
      bg: '#EDF5FD',
      cardBg: '#FFFFFF',
      stackBorder: '#123359',
      accent: '#1969B3',
      text: '#0D243F',
      subtext: '#224D7A',
      tagBg: '#D8EAF9',
      tagText: '#135999',
      ctaBg: '#1969B3',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#1969B3',
    },
    objectType: 'devops',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=devops-cloud-engineer',
    exploreUrl: '/careers/devops-cloud-engineer',
  },
  {
    slug: 'mechanical-cad-engineer',
    roleName: 'Mechanical CAD Engineer',
    roleFamily: 'CORE ENGINEERING & HARDWARE',
    familyCategory: 'engineering',
    responsibilities: [
      'Design parametric CAD assemblies & tooling',
      'Simulate finite element stress distributions (FEA)',
      'Prepare GD&T blueprints for CNC manufacturing'
    ],
    skillsCount: 19,
    projectsCount: 5,
    level: 'CORE',
    colors: {
      bg: '#F9ECEB',
      cardBg: '#FFFFFF',
      stackBorder: '#4F1B18',
      accent: '#B8322A',
      text: '#380E0C',
      subtext: '#732A25',
      tagBg: '#F3DAD8',
      tagText: '#A8251D',
      ctaBg: '#B8322A',
      ctaText: '#FFFFFF',
      tryFreeBg: '#FFFFFF',
      tryFreeText: '#B8322A',
    },
    objectType: 'mechanical',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=mechanical-cad-engineer',
    exploreUrl: '/careers/mechanical-cad-engineer',
  },
];
