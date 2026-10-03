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
  badge: string;
  metrics: string;
  details: string[];
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
    badge: 'STAGE 1 · AUDIT',
    metrics: '94% clarity rate',
    details: [
      'Interactive Career Voice diagnostic review',
      'Role archetype comparison tailored to your degree',
      'Clarity score on foundational readiness'
    ]
  },
  {
    id: 'skill-roadmap',
    stageNumber: '02',
    stageName: 'Skill Roadmap',
    title: 'Skill Roadmap',
    caption: 'Shortest Useful Path',
    description: 'Follow milestone-based learning modules structured by engineering managers and industry practitioners.',
    shape: 'portrait',
    size: 0.95,
    depth: -0.4,
    tint: '#0284C7',
    gradient: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
    icon: Map,
    badge: 'STAGE 2 · ROADMAP',
    metrics: 'Zero course overload',
    details: [
      'Prerequisite tree mapping each capability',
      'Curated references and zero-bloat resources',
      'Granular progress checkpoints and milestones'
    ]
  },
  {
    id: 'deliberate-practice',
    stageNumber: '03',
    stageName: 'Practice',
    title: 'Deliberate Practice',
    caption: 'Code & Architecture Drills',
    description: 'Solve real-world problems with interactive coding sandboxes, SQL workbench queries, and system drills.',
    shape: 'square',
    size: 1.05,
    depth: -0.15,
    tint: '#2563EB',
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
    icon: Code2,
    badge: 'STAGE 3 · DRILLS',
    metrics: 'Active problem solving',
    details: [
      'Daily engineering and analytical challenges',
      'Automated test runners with immediate feedback',
      'Build problem-solving muscle memory'
    ]
  },
  {
    id: 'real-projects',
    stageNumber: '04',
    stageName: 'Real Projects',
    title: 'Real Projects',
    caption: 'Proof Over Certificates',
    description: 'Engineer full-stack web platforms, distributed APIs, and data intelligence pipelines that solve authentic industry briefs.',
    shape: 'landscape',
    size: 1.35,
    depth: 0.45,
    tint: '#F97316',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
    icon: Briefcase,
    badge: 'STAGE 4 · EVIDENCE',
    metrics: 'Inspectable code repos',
    details: [
      'Documented engineering design documents',
      'Architecture trade-offs & production deploy',
      'Interactive live demos recruiters can test'
    ]
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
    badge: 'STAGE 5 · FEEDBACK',
    metrics: 'Instant mentor review',
    details: [
      'Line-by-line syntax & algorithmic optimization',
      'Interview-grade code cleanliness checks',
      'Adaptive prompt questions testing your understanding'
    ]
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
    badge: 'STAGE 6 · VERIFICATION',
    metrics: 'Verifiable proof artifact',
    details: [
      'Cryptographically verifiable student profile',
      'Demonstrated skill percentile across cohorts',
      'Inspectable proof of work link for recruiters'
    ]
  },
  {
    id: 'job-opportunities',
    stageNumber: '07',
    stageName: 'Job Opportunities',
    title: 'Job Opportunities',
    caption: 'Shortlisted by Evidence',
    description: 'Get matched directly to hiring teams and campus drives that prioritize demonstrated capability over arbitrary cutoffs.',
    shape: 'landscape',
    size: 1.2,
    depth: -0.2,
    tint: '#059669',
    gradient: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    icon: TrendingUp,
    badge: 'STAGE 7 · PLACEMENT',
    metrics: 'Direct shortlist matching',
    details: [
      'Pre-qualified role applications without cold outreach',
      'Placement office cohort intelligence integration',
      'Direct interview invites from hiring partners'
    ]
  }
];
