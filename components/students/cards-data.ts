import React from 'react';
import { 
  Compass, 
  Map, 
  Code2, 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
} from 'lucide-react';
import type { HairlineFigureName } from '@/components/ui/hairline-figure';

export interface DemoMockupData {
  badge: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  codeOrOutput: string;
}

export interface StudentOutcomeCard {
  id: string;
  stageNumber: string;
  stageName: string;
  title: string;
  caption: string;
  description: string;
  shape: 'square' | 'portrait' | 'landscape';
  size: number;
  depth: number;
  tint: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  hairlineFigure: HairlineFigureName;
  badge: string;
  metrics: string;
  details: string[];
  demoMockup: DemoMockupData;
}

export const STUDENT_OUTCOME_CARDS: StudentOutcomeCard[] = [
  {
    id: 'career-direction',
    stageNumber: '01',
    stageName: 'Career Direction',
    title: 'Career Direction',
    caption: 'Discover What Fits',
    description: 'Diagnose your strengths, evaluate role archetypes, and eliminate guesswork with AI-assisted career discovery.',
    shape: 'landscape',
    size: 1.25,
    depth: 0.35,
    tint: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    icon: Compass,
    hairlineFigure: 'query',
    badge: 'STAGE 1 · AUDIT',
    metrics: '94% clarity rate',
    details: [
      'Interactive Career Voice diagnostic review',
      'Role archetype comparison tailored to your degree',
      'Clarity score on foundational readiness'
    ],
    demoMockup: {
      badge: 'SAMPLE AUDIT DATA · DEMO',
      title: 'Career Voice Diagnostic Radar',
      subtitle: 'Interest Profile: Systems Engineering & Analytics',
      metrics: [
        { label: 'Clarity Score', value: '94%' },
        { label: 'Top Archetype', value: 'Full Stack Engineer' },
        { label: 'Confidence', value: 'High' }
      ],
      tags: ['Strengths Mapped', 'Role Fit Diagnosed', 'Zero Guesswork'],
      codeOrOutput: 'Role Fit: Full Stack Developer (92% fit) · Secondary: AI Systems (84% fit)'
    }
  },
  {
    id: 'skill-roadmaps',
    stageNumber: '02',
    stageName: 'Skill Roadmaps',
    title: 'Skill Roadmaps',
    caption: 'Shortest Useful Path',
    description: 'Follow milestone-based learning modules structured by engineering managers and industry practitioners.',
    shape: 'portrait',
    size: 0.95,
    depth: -0.4,
    tint: '#0284C7',
    gradient: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
    icon: Map,
    hairlineFigure: 'elevator',
    badge: 'STAGE 2 · ROADMAP',
    metrics: 'Zero course overload',
    details: [
      'Prerequisite tree mapping each capability',
      'Curated references and zero-bloat resources',
      'Granular progress checkpoints and milestones'
    ],
    demoMockup: {
      badge: 'CURATED PATHWAY · DEMO',
      title: 'Milestone Learning Roadmap',
      subtitle: 'Shortest Useful Path: Foundational to Production',
      metrics: [
        { label: 'Curated Sprints', value: '6 Modules' },
        { label: 'Video Bloat', value: '0%' },
        { label: 'Milestones', value: 'Defensible' }
      ],
      tags: ['Prerequisite Trees', 'Defensible Milestones', 'Practitioner Reviewed'],
      codeOrOutput: 'Sprint 1: Core Fundamentals → Sprint 2: Systems Architecture → Sprint 3: Production Deploy'
    }
  },
  {
    id: 'practice',
    stageNumber: '03',
    stageName: 'Practice',
    title: 'Practice',
    caption: 'Code & Architecture Drills',
    description: 'Solve real-world problems with interactive coding sandboxes, SQL workbench queries, and system drills.',
    shape: 'square',
    size: 1.05,
    depth: -0.15,
    tint: '#2563EB',
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
    icon: Code2,
    hairlineFigure: 'keyboard',
    badge: 'STAGE 3 · DRILLS',
    metrics: 'Active problem solving',
    details: [
      'Daily engineering and analytical challenges',
      'Automated test runners with immediate feedback',
      'Build problem-solving muscle memory'
    ],
    demoMockup: {
      badge: 'LIVE WORKBENCH · DEMO',
      title: 'Interactive Code & SQL Workbench',
      subtitle: 'Automated Test Runners & Execution Benchmarks',
      metrics: [
        { label: 'Test Suite', value: '18/18 Passing' },
        { label: 'Execution', value: '12ms' },
        { label: 'Drills Completed', value: '42' }
      ],
      tags: ['SQL Workbench', 'Algorithm Drills', 'Instant Test Feedback'],
      codeOrOutput: 'SELECT user_id, count(*) as commits FROM repo_activity GROUP BY user_id HAVING commits > 5;'
    }
  },
  {
    id: 'real-world-projects',
    stageNumber: '04',
    stageName: 'Real-World Projects',
    title: 'Real-World Projects',
    caption: 'Proof Over Certificates',
    description: 'Engineer full-stack web platforms, distributed APIs, and data intelligence pipelines that solve authentic industry briefs.',
    shape: 'landscape',
    size: 1.35,
    depth: 0.45,
    tint: '#F97316',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
    icon: Briefcase,
    hairlineFigure: 'branches',
    badge: 'STAGE 4 · EVIDENCE',
    metrics: 'Inspectable code repos',
    details: [
      'Documented engineering design documents',
      'Architecture trade-offs & production deploy',
      'Interactive live demos recruiters can test'
    ],
    demoMockup: {
      badge: 'VERIFIED REPO · DEMO',
      title: 'Distributed Task Queue Platform',
      subtitle: 'Production Git Tree with Architecture Memo',
      metrics: [
        { label: 'Active Branches', value: '4' },
        { label: 'Passing Tests', value: '24' },
        { label: 'Architecture Memo', value: 'v1.2 Approved' }
      ],
      tags: ['Production Git Commits', 'Trade-Off Memos', 'Live Deploy Preview'],
      codeOrOutput: 'git merge feature/redis-failover --strategy-option=theirs (24 unit tests passing)'
    }
  },
  {
    id: 'ai-feedback',
    stageNumber: '05',
    stageName: 'AI Feedback',
    title: 'AI Feedback',
    caption: 'Continuous Mentorship',
    description: 'Receive instant architectural reviews, code complexity analysis, and actionable next-step recommendations 24/7.',
    shape: 'square',
    size: 0.9,
    depth: -0.3,
    tint: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)',
    icon: Sparkles,
    hairlineFigure: 'loupe',
    badge: 'STAGE 5 · FEEDBACK',
    metrics: 'Instant mentor review',
    details: [
      'Line-by-line syntax & algorithmic optimization',
      'Interview-grade code cleanliness checks',
      'Adaptive prompt questions testing your understanding'
    ],
    demoMockup: {
      badge: 'AI REVIEW ENGINE · DEMO',
      title: 'Continuous Architectural Review',
      subtitle: 'Algorithmic Complexity & Cleanliness Audit',
      metrics: [
        { label: 'Cleanliness Score', value: '98/100' },
        { label: 'Complexity', value: 'O(N) Optimal' },
        { label: 'Review Latency', value: '<2s' }
      ],
      tags: ['Syntax Optimization', 'Architectural Guidance', 'Interview Standards'],
      codeOrOutput: 'Review Note: Clean concurrency boundaries; connection pool handles backpressure gracefully.'
    }
  },
  {
    id: 'verified-capability',
    stageNumber: '06',
    stageName: 'Verified Capability',
    title: 'Verified Capability',
    caption: 'Immutable Readiness Signal',
    description: 'Translate completed projects into verified skill signals that bypass keyword filters and traditional resume screening.',
    shape: 'portrait',
    size: 1.15,
    depth: 0.25,
    tint: '#10B981',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    icon: ShieldCheck,
    hairlineFigure: 'vault',
    badge: 'STAGE 6 · VERIFICATION',
    metrics: 'Verifiable proof artifact',
    details: [
      'Cryptographically verifiable student profile',
      'Demonstrated skill percentile across cohorts',
      'Inspectable proof of work link for recruiters'
    ],
    demoMockup: {
      badge: 'IMMUTABLE PROOF · DEMO',
      title: 'Verified Skill Passport',
      subtitle: 'Verifiable Readiness Signal for Hiring Teams',
      metrics: [
        { label: 'Cohort Percentile', value: 'Top 6%' },
        { label: 'Verified Artifacts', value: '3 Projects' },
        { label: 'Verification ID', value: '#PW-84920' }
      ],
      tags: ['Tamper-Evident Hash', 'Recruiter Audit Link', 'Zero Resume Fluff'],
      codeOrOutput: 'Credential Hash: sha256:7f83b165... Issued by Pathwisse Capability Layer'
    }
  },
  {
    id: 'opportunities',
    stageNumber: '07',
    stageName: 'Opportunities',
    title: 'Opportunities',
    caption: 'Shortlisted by Evidence',
    description: 'Get matched directly to hiring teams and campus drives that prioritize demonstrated capability over arbitrary cutoffs.',
    shape: 'landscape',
    size: 1.2,
    depth: -0.2,
    tint: '#059669',
    gradient: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    icon: TrendingUp,
    hairlineFigure: 'sieve',
    badge: 'STAGE 7 · PLACEMENT',
    metrics: 'Direct shortlist matching',
    details: [
      'Pre-qualified role applications without cold outreach',
      'Placement office cohort intelligence integration',
      'Direct interview invites from hiring partners'
    ],
    demoMockup: {
      badge: 'TALENT SHORTLIST · DEMO',
      title: 'Direct Employer Shortlist Matching',
      subtitle: 'Recruiter Inbound Based on Demonstrated Proof',
      metrics: [
        { label: 'Hiring Matches', value: '4 Partners' },
        { label: 'Interview Invites', value: 'Direct' },
        { label: 'Resume Screening', value: 'Bypassed' }
      ],
      tags: ['Campus Drive Integration', 'Pre-Qualified Fast Track', 'Evidence-Based Hiring'],
      codeOrOutput: 'Shortlisted by 3 Enterprise Partners for Associate Full Stack & Data Engineering roles.'
    }
  }
];

export interface CuratedRoadmapCardData {
  slug: string;
  roleTitle: string;
  roleFamily: string;
  salaryRange: string;
  marketDemand: string;
  coreSkills: string[];
  responsibilities: [string, string, string];
  skillsCount: number;
  projectsCount: number;
  level: string;
  objectType: 'data' | 'product' | 'software' | 'ai' | 'design' | 'business';
  exploreUrl: string;
  tryForFreeUrl: string;
  colors: {
    bg: string;
    cardBg: string;
    stackBorder: string;
    accent: string;
    text: string;
    subtext: string;
    tagBg: string;
    tagText: string;
    ctaBg: string;
    ctaText: string;
    tryFreeBg: string;
    tryFreeText: string;
  };
}

/**
 * EXACT 6 Curated Career Roadmap Cards in Approved Sequence (S10):
 * 1. Data Analyst
 * 2. Business Analyst
 * 3. Product Manager
 * 4. AI Engineer
 * 5. Full Stack Developer
 * 6. UI/UX Designer
 */
export const CURATED_ROADMAP_CARDS: CuratedRoadmapCardData[] = [
  {
    slug: 'data-analyst',
    roleTitle: 'Data Analyst',
    roleFamily: 'DATA & ANALYTICS',
    salaryRange: '₹6.5 – 15.0 LPA ($75k – $115k)',
    marketDemand: 'High Growth · +24% YoY',
    coreSkills: ['SQL', 'Power BI / Tableau', 'Python Analytics', 'KPI Modeling'],
    responsibilities: [
      'Query and structure raw operational data',
      'Build predictive executive KPI dashboards',
      'Translate metrics into commercial decisions'
    ],
    skillsCount: 14,
    projectsCount: 5,
    level: 'FOUNDATION',
    objectType: 'data',
    exploreUrl: '/careers?role=data-analyst',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=data-analyst',
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
  },
  {
    slug: 'business-analyst',
    roleTitle: 'Business Analyst',
    roleFamily: 'BUSINESS & OPERATIONS',
    salaryRange: '₹7.0 – 16.5 LPA ($78k – $120k)',
    marketDemand: 'High Demand · +21% YoY',
    coreSkills: ['Process Modeling', 'Requirements Specs', 'SQL', 'Cost-Benefit Analysis'],
    responsibilities: [
      'Deconstruct complex operational workflows',
      'Author technical specifications & user stories',
      'Model cost-benefit cases for executive buy-in'
    ],
    skillsCount: 16,
    projectsCount: 5,
    level: 'CORE',
    objectType: 'business',
    exploreUrl: '/careers?role=business-analyst',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=business-analyst',
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
  },
  {
    slug: 'product-manager',
    roleTitle: 'Product Manager',
    roleFamily: 'PRODUCT & STRATEGY',
    salaryRange: '₹12.0 – 28.0 LPA ($105k – $155k)',
    marketDemand: 'High Competition · +19% YoY',
    coreSkills: ['Product Discovery', 'User Research', 'Roadmap Prioritization', 'Metrics & Telemetry'],
    responsibilities: [
      'Frame ambiguous customer friction points',
      'Prioritize roadmap with engineering tradeoffs',
      'Align cross-functional execution cohorts'
    ],
    skillsCount: 18,
    projectsCount: 6,
    level: 'PRACTITIONER',
    objectType: 'product',
    exploreUrl: '/careers?role=product-manager',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=product-manager',
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
  },
  {
    slug: 'ai-engineer',
    roleTitle: 'AI Engineer',
    roleFamily: 'AI & INTELLIGENCE SYSTEMS',
    salaryRange: '₹14.0 – 35.0 LPA ($125k – $185k)',
    marketDemand: 'Surging Demand · +46% YoY',
    coreSkills: ['RAG Pipelines', 'PyTorch / Transformers', 'Model Evaluation', 'Latency Optimization'],
    responsibilities: [
      'Fine-tune domain models & evaluate outputs',
      'Architect robust multi-agent RAG pipelines',
      'Benchmark latency and hallucination boundaries'
    ],
    skillsCount: 24,
    projectsCount: 8,
    level: 'SPECIALIST',
    objectType: 'ai',
    exploreUrl: '/careers?role=ai-engineer',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=ai-engineer',
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
  },
  {
    slug: 'full-stack-developer',
    roleTitle: 'Full Stack Developer',
    roleFamily: 'SOFTWARE ENGINEERING',
    salaryRange: '₹8.0 – 22.0 LPA ($85k – $135k)',
    marketDemand: 'High Growth · +27% YoY',
    coreSkills: ['React / Next.js', 'Node.js / REST APIs', 'PostgreSQL / D1', 'System Architecture'],
    responsibilities: [
      'Engineer modular web and client architectures',
      'Implement resilient REST & GraphQL services',
      'Deploy database schemas with strict ACID integrity'
    ],
    skillsCount: 22,
    projectsCount: 7,
    level: 'CORE',
    objectType: 'software',
    exploreUrl: '/careers?role=full-stack-developer',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=full-stack-developer',
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
  },
  {
    slug: 'ui-ux-designer',
    roleTitle: 'UI/UX Designer',
    roleFamily: 'PRODUCT DESIGN & SYSTEMS',
    salaryRange: '₹7.0 – 18.0 LPA ($76k – $120k)',
    marketDemand: 'Steady Demand · +18% YoY',
    coreSkills: ['Design Systems', 'Figma Prototyping', 'Usability Audits', 'Ergonomic Interaction'],
    responsibilities: [
      'Design accessible tokens & component systems',
      'Prototype ergonomic interactive touchpoints',
      'Conduct usability labs & heuristic audits'
    ],
    skillsCount: 17,
    projectsCount: 6,
    level: 'CORE',
    objectType: 'design',
    exploreUrl: '/careers?role=ui-ux-designer',
    tryForFreeUrl: 'https://app.pathwisse.com/auth?intent=try_free&role=ui-ux-designer',
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
  },
];
