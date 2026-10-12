'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import {
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
  Compass,
  Award,
  Terminal,
  Code2,
  Zap,
  Target,
  Send,
  Check,
  CheckCircle2,
  RotateCcw,
  Layers3,
  FileCheck2,
  Cpu,
  Search,
} from 'lucide-react';
import { PageMascot, FloatingMascot } from '@/components/mascot/PageMascot';
import { InteractiveExperienceSection } from './InteractiveExperienceSection';

export type Persona = 'students' | 'colleges' | 'companies';

/* -------------------------------------------------------------------------- */
/*                               DATA DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

export interface ShowcaseTab {
  id: string;
  name: string;
  badge?: string;
  icon: 'compass' | 'sparkles' | 'terminal' | 'award';
  tabColor: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  mockupType: 'compass' | 'qalam' | 'drills' | 'vault';
}

export interface WorkflowStage {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  restingTeaser: string;
  narrative: string;
  badge: string;
  badgeColor: string;
  checklist: Array<{
    text: string;
    iconColor: string;
  }>;
  bottomCardTitle: string;
  bottomBgGradient: string;
  mockupType: 'discover' | 'build' | 'verify' | 'connect';
}

export interface PersonaStoryData {
  persona: Persona;
  targetLink: string;
  navLabel: string;
  eyebrow: string;
  storyHeading: string;
  storySub: string;
  primaryColor: string;
  ambientGradient: string;
  radialGlowColor: string;
  stats: Array<{ value: string; label: string }>;
  showcaseTabs: ShowcaseTab[];
  workflowStages: WorkflowStage[];
}

// NOTE: targetLink order must strictly remain: /students, /colleges, /enterprise for invariant tests
export const ROLES: Record<Persona, PersonaStoryData> = {
  students: {
    persona: 'students',
    targetLink: '/students',
    navLabel: 'For Students',
    eyebrow: 'FROM AMBITION TO VERIFIED CAPABILITY',
    storyHeading: 'Build capabilities that speak louder than a résumé.',
    storySub:
      'Pathwisse replaces uncalibrated job applications with an interactive journey from career discovery to verified, inspectable code artifacts.',
    primaryColor: '#2458ae',
    ambientGradient:
      'linear-gradient(135deg, #a5e5eb 0%, #bdecf2 25%, #91d0f5 65%, #c5f0ec 100%)',
    radialGlowColor: 'rgba(36, 88, 174, 0.15)',
    stats: [
      { value: '94%', label: 'Target Role Match' },
      { value: '24/24', label: 'Verified Unit Tests' },
      { value: '1,840+', label: 'Projects Built' },
    ],
    showcaseTabs: [
      {
        id: 'compass',
        name: 'Career Compass',
        icon: 'compass',
        tabColor: '#5DDFD7',
        headline: 'Calibrate your trajectory with real-time capability diagnostics',
        description:
          'Giving you complete visibility into required skills and foundational milestones, Pathwisse maps exactly what to build next without guesswork.',
        ctaText: 'Explore Student Path',
        ctaLink: '/students',
        bgGradient: '#dcecfe',
        mockupType: 'compass',
      },
      {
        id: 'qalam',
        name: 'Qalam AI',
        badge: 'Beta',
        icon: 'sparkles',
        tabColor: '#DBEE9F',
        headline: 'Your 24/7 AI mentor for code review & system design',
        description:
          'Add Qalam to any project sprint to unblock architecture challenges, review pull requests, and explain complex distributed systems on your schedule.',
        ctaText: 'Try Qalam AI',
        ctaLink: '/students',
        bgGradient: '#f0f8db',
        mockupType: 'qalam',
      },
      {
        id: 'drills',
        name: 'Drills Engine',
        badge: 'New',
        icon: 'terminal',
        tabColor: '#B89FFA',
        headline: 'Actionable, inspectable test suites for every milestone',
        description:
          'Finish every week knowing 24/24 unit tests were verified, technical decision memos were captured, and cryptographic proof was published.',
        ctaText: 'View Practice Lab',
        ctaLink: '/students',
        bgGradient: '#f0ebfc',
        mockupType: 'drills',
      },
      {
        id: 'vault',
        name: 'Evidence Vault',
        badge: 'New',
        icon: 'award',
        tabColor: '#5DDFD7',
        headline: 'Flexible, built-in capability proof tools',
        description:
          'Package verified git commits upfront, document technical trade-offs, and send inspectable proof dossiers that make it easy to get hired.',
        ctaText: 'See Evidence Dossier',
        ctaLink: '/students',
        bgGradient: '#dbf6f4',
        mockupType: 'vault',
      },
    ],
    workflowStages: [
      {
        id: 'discover',
        stageNumber: '01',
        title: 'Discover',
        subtitle: 'Career Diagnostics & Role Fit',
        restingTeaser: 'Calibrate role fit through practical interest & skill diagnostics.',
        narrative:
          'A student selects a target role. Move from blind applications to an empirical career trajectory grounded in diagnostic benchmarks and prerequisite roadmaps.',
        badge: 'Diagnostics Calibrated',
        badgeColor: '#2458ae',
        checklist: [
          { text: 'Target role and prerequisite skills calibrate automatically', iconColor: '#5DDFD7' },
          { text: 'Diagnostic benchmark evaluates foundational knowledge', iconColor: '#5DDFD7' },
          { text: 'Personalized milestone sprint roadmap generated in seconds', iconColor: '#2458ae' },
        ],
        bottomCardTitle: 'Candidate Calibration Radar',
        bottomBgGradient: 'linear-gradient(135deg, #cdeafe 0%, #bde3fe 100%)',
        mockupType: 'discover',
      },
      {
        id: 'build',
        stageNumber: '02',
        title: 'Learn & Build',
        subtitle: 'Production Git Repos & PRs',
        restingTeaser: 'Ship production-grade code with 24/24 passing unit tests.',
        narrative:
          'Build real distributed task queues, REST APIs, and analytics dashboards with AI guidance. Qalam reviews pull requests and reinforces production engineering trade-offs.',
        badge: 'Production Grade',
        badgeColor: '#f59e0b',
        checklist: [
          { text: 'Real repository templates with unit tests and Docker scaffolds', iconColor: '#F8961F' },
          { text: 'Qalam AI provides real-time architectural decision feedback', iconColor: '#F8961F' },
          { text: 'Clean commit histories and technical decision memos documented', iconColor: '#10B981' },
        ],
        bottomCardTitle: 'Qalam Code Review Studio',
        bottomBgGradient: 'linear-gradient(135deg, #fee0b2 0%, #fbd18b 50%, #f79c3b 100%)',
        mockupType: 'build',
      },
      {
        id: 'verify',
        stageNumber: '03',
        title: 'Verify',
        subtitle: 'Automated Tests & Code Reviews',
        restingTeaser: 'Cryptographically verified capabilities backed by empirical test suites.',
        narrative:
          'Say goodbye to keyword-stuffed résumés. Every capstone project runs through automated test runners, verifying API latency, schema design, and unit test coverage.',
        badge: 'Verified Artifact',
        badgeColor: '#8b5cf6',
        checklist: [
          { text: '24/24 Unit and integration tests passing in CI runner', iconColor: '#B89FFA' },
          { text: 'Architecture review score: Top 5% modular API design', iconColor: '#B89FFA' },
          { text: 'Immutable cryptographic verification seal published to dossier', iconColor: '#8b5cf6' },
        ],
        bottomCardTitle: 'Automated Test Matrix',
        bottomBgGradient: 'linear-gradient(135deg, #ede7fd 0%, #dfd3fb 100%)',
        mockupType: 'verify',
      },
      {
        id: 'connect',
        stageNumber: '04',
        title: 'Connect',
        subtitle: 'Direct Unmediated Interviews',
        restingTeaser: 'Get shortlisted directly through inspectable code and project proof.',
        narrative:
          'Hiring teams and partner companies discover your capability dossier without recruiters filtering by college brand. Direct interview invitations issued with verified retention confidence.',
        badge: 'Direct Matching',
        badgeColor: '#10b981',
        checklist: [
          { text: 'Inspectable technical proof dossier shared directly with hiring teams', iconColor: '#B89FFA' },
          { text: 'Zero résumé keyword spam; evaluation grounded in real code', iconColor: '#DBEE9F' },
          { text: 'Fast-track interview rounds unlocked through verified proof', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Fast-Track Interview Unlocked',
        bottomBgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        mockupType: 'connect',
      },
    ],
  },
  colleges: {
    persona: 'colleges',
    targetLink: '/colleges',
    navLabel: 'For Colleges',
    eyebrow: 'INSTITUTIONAL PLACEMENT INTELLIGENCE',
    storyHeading: 'Know who is ready before placement season begins.',
    storySub:
      'Pathwisse gives academic leaders continuous, evidence-grounded visibility into student cohort readiness, diagnosing skill deficits months ahead of campus drives.',
    primaryColor: '#7c3aed',
    ambientGradient:
      'linear-gradient(135deg, #ddd6fe 0%, #ede9fe 35%, #bae6fd 70%, #d8b4fe 100%)',
    radialGlowColor: 'rgba(124, 58, 237, 0.15)',
    stats: [
      { value: '640', label: 'Students Tracked' },
      { value: '78.4%', label: 'Batch Placement Ready' },
      { value: '+14.2%', label: 'Sprint Lift Boost' },
    ],
    showcaseTabs: [
      {
        id: 'compass',
        name: 'Cohort Radar',
        icon: 'compass',
        tabColor: '#B89FFA',
        headline: 'Real-time readiness tracking for 640 engineering students',
        description:
          'Giving training and placement teams complete cohort visibility across batches, Pathwisse is the easiest way to know who is placement-ready early.',
        ctaText: 'Explore College Platform',
        ctaLink: '/colleges',
        bgGradient: '#f3e8ff',
        mockupType: 'compass',
      },
      {
        id: 'qalam',
        name: 'Syllabus AI',
        badge: 'Beta',
        icon: 'sparkles',
        tabColor: '#DBEE9F',
        headline: 'Automated skill deficit diagnostic assistant',
        description:
          'Diagnose whether students struggle with System Design or SQL optimization, and dispatch targeted curriculum acceleration sprints with zero friction.',
        ctaText: 'Request College Demo',
        ctaLink: '/colleges/request-demo',
        bgGradient: '#f0f8db',
        mockupType: 'qalam',
      },
      {
        id: 'drills',
        name: 'Sprint Engine',
        badge: 'New',
        icon: 'terminal',
        tabColor: '#6BB1FF',
        headline: 'Actionable cohort lifts with +14.2% measured boost',
        description:
          'Deploy modular catch-up sprints to at-risk students, elevating overall batch placement readiness to 78.4% before enterprise recruiters arrive.',
        ctaText: 'View Sprint Model',
        ctaLink: '/colleges',
        bgGradient: '#dcecfe',
        mockupType: 'drills',
      },
      {
        id: 'vault',
        name: 'Proof Seal',
        badge: 'New',
        icon: 'award',
        tabColor: '#5DDFD7',
        headline: '1,840+ verified repositories with zero résumé spam',
        description:
          'Arm your campus placement drives with authenticated student code dossiers backed by passing unit tests and permanent git commit records.',
        ctaText: 'Inspect Proof Dossier',
        ctaLink: '/colleges',
        bgGradient: '#dbf6f4',
        mockupType: 'vault',
      },
    ],
    workflowStages: [
      {
        id: 'discover',
        stageNumber: '01',
        title: 'Discover',
        subtitle: 'Cohort Readiness Audits',
        restingTeaser: 'Ingest cohorts and map initial readiness bars.',
        narrative:
          'A college ingests 640 engineering students. Run continuous baseline capability audits to map department readiness distributions months ahead of drive day.',
        badge: 'Audit Active',
        badgeColor: '#7c3aed',
        checklist: [
          { text: '640 Engineering students enrolled in readiness telemetry', iconColor: '#B89FFA' },
          { text: 'Department baseline scored (Full Stack: 190/226)', iconColor: '#6BB1FF' },
          { text: 'Readiness trajectory calibrated at 78.4% ready', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Cohort Diagnostic Scan',
        bottomBgGradient: 'linear-gradient(135deg, #ede7fd 0%, #dfd3fb 100%)',
        mockupType: 'discover',
      },
      {
        id: 'build',
        stageNumber: '02',
        title: 'Learn & Build',
        subtitle: 'Targeted Acceleration Sprints',
        restingTeaser: 'Diagnose deficits 90 days before company visits.',
        narrative:
          'Before campus placement season starts, identify priority gaps in system design and database indexing. Enroll cohorts automatically in targeted sprint tracks.',
        badge: 'Sprints Active',
        badgeColor: '#f59e0b',
        checklist: [
          { text: 'SQL deficit detected for 64% of cohort', iconColor: '#F8961F' },
          { text: 'System design priority deficit flagged early', iconColor: '#F8961F' },
          { text: 'Targeted acceleration sprint enrolled automatically', iconColor: '#10B981' },
        ],
        bottomCardTitle: 'Curriculum Acceleration Hub',
        bottomBgGradient: 'linear-gradient(135deg, #fee0b2 0%, #fbd18b 50%, #f79c3b 100%)',
        mockupType: 'build',
      },
      {
        id: 'verify',
        stageNumber: '03',
        title: 'Verify',
        subtitle: 'Institutional Proof Seal',
        restingTeaser: 'Audit 1,840+ project git trees and tests.',
        narrative:
          'While students complete sprints, our code audit engine inspects authenticity, commit frequency, and unit test pass rates with 0 inflated claims.',
        badge: 'Institutional Seal',
        badgeColor: '#8b5cf6',
        checklist: [
          { text: '1,840+ project repositories audited for depth', iconColor: '#5DDFD7' },
          { text: '0 inflated resume claims permitted in pool', iconColor: '#5DDFD7' },
          { text: 'Institutional audit seal published to portal', iconColor: '#F8961F' },
        ],
        bottomCardTitle: 'Institutional Audit Seal',
        bottomBgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        mockupType: 'verify',
      },
      {
        id: 'connect',
        stageNumber: '04',
        title: 'Connect',
        subtitle: 'Placement Drive Sieve',
        restingTeaser: 'Direct candidate pipelines to top corporate partners.',
        narrative:
          'Share calibrated student pools with visiting recruiters. Employers review inspectable decision memos and achieve 3.4x higher Day-1 conversions.',
        badge: 'Recruiter Matching',
        badgeColor: '#10b981',
        checklist: [
          { text: '18 hiring partners access curated talent portal', iconColor: '#6BB1FF' },
          { text: 'Recruiters shortlist candidates by code quality', iconColor: '#DBEE9F' },
          { text: '3.4x Day-1 placement conversion lift achieved', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Campus Placement Sieve',
        bottomBgGradient: 'linear-gradient(135deg, #cdeafe 0%, #bde3fe 100%)',
        mockupType: 'connect',
      },
    ],
  },
  companies: {
    persona: 'companies',
    targetLink: '/enterprise',
    navLabel: 'For Companies',
    eyebrow: 'EVIDENCE-GROUNDED TALENT DISCOVERY',
    storyHeading: 'Hire with evidence. Look behind the résumé.',
    storySub:
      'Résumés are uncalibrated claims; coding quizzes test memorization. Pathwisse lets hiring teams evaluate early-career engineers through authentic code architectures, real technical decision memos, and verifiable readiness signals.',
    primaryColor: '#0d9488',
    ambientGradient:
      'linear-gradient(135deg, #a7f3d0 0%, #cbf3ef 30%, #bae6fd 65%, #99f6e4 100%)',
    radialGlowColor: 'rgba(13, 148, 136, 0.15)',
    stats: [
      { value: '5 Days', label: 'Average Time-to-Hire' },
      { value: '0', label: 'Inflated Resume Claims' },
      { value: '96%', label: '1st-Year Retention Rate' },
    ],
    showcaseTabs: [
      {
        id: 'compass',
        name: 'Dossier Review',
        icon: 'compass',
        tabColor: '#5DDFD7',
        headline: 'Review authentic code architectures in under 60 seconds',
        description:
          'Inspect pull requests, architecture design memos, and test suite pass rates directly before scheduling your first engineering screen.',
        ctaText: 'Explore Talent Directory',
        ctaLink: '/hire',
        bgGradient: '#dbf6f4',
        mockupType: 'compass',
      },
      {
        id: 'qalam',
        name: 'Sieve AI',
        badge: 'Beta',
        icon: 'sparkles',
        tabColor: '#DBEE9F',
        headline: 'Match open roles against verified git capabilities',
        description:
          'Input your team’s required tech stack. Sieve AI filters past uncalibrated résumé keywords to locate candidates who have pushed passing tests.',
        ctaText: 'Request Enterprise Demo',
        ctaLink: '/enterprise/request-demo',
        bgGradient: '#f0f8db',
        mockupType: 'qalam',
      },
      {
        id: 'drills',
        name: 'Trade-Off Drills',
        badge: 'New',
        icon: 'terminal',
        tabColor: '#6BB1FF',
        headline: 'Inspect architectural trade-offs, not memorized puzzles',
        description:
          'Evaluate how junior engineers handle Redis concurrency limits, database connection pooling, and schema version migrations in real code.',
        ctaText: 'View Evidence Model',
        ctaLink: '/enterprise',
        bgGradient: '#dcecfe',
        mockupType: 'drills',
      },
      {
        id: 'vault',
        name: 'Immutable Proof',
        badge: 'New',
        icon: 'award',
        tabColor: '#5DDFD7',
        headline: 'Defensible talent shortlists with verifiable confidence',
        description:
          'Every shortlisted candidate comes with inspectable repository links, test execution logs, and rubrics calibrated for fast engineering onboarding.',
        ctaText: 'Hire Verified Talent',
        ctaLink: '/hire',
        bgGradient: '#dcfce7',
        mockupType: 'vault',
      },
    ],
    workflowStages: [
      {
        id: 'discover',
        stageNumber: '01',
        title: 'Discover',
        subtitle: 'Talent Capability Sieve',
        restingTeaser: 'Filter by verified technical abilities instead of college tiers.',
        narrative:
          'A hiring team posts role requirements. The capability sieve matches engineers based on verified projects, test execution metrics, and architecture scores.',
        badge: 'Role Calibrated',
        badgeColor: '#0d9488',
        checklist: [
          { text: 'Role requirements mapped to empirical capability domains', iconColor: '#5DDFD7' },
          { text: 'Candidates ranked by actual code quality over college pedigree', iconColor: '#5DDFD7' },
          { text: 'Real engineering trade-offs evaluated upfront', iconColor: '#0d9488' },
        ],
        bottomCardTitle: 'Talent Capability Sieve',
        bottomBgGradient: 'linear-gradient(135deg, #cdeafe 0%, #bde3fe 100%)',
        mockupType: 'discover',
      },
      {
        id: 'build',
        stageNumber: '02',
        title: 'Learn & Build',
        subtitle: 'Architectural Drills Review',
        restingTeaser: 'Inspect actual git trees and architecture decisions.',
        narrative:
          'Evaluate code quality, schema migrations, and commit discipline before scheduling the first technical screen. Look directly into working repositories.',
        badge: 'Repo Inspected',
        badgeColor: '#f59e0b',
        checklist: [
          { text: 'Inspectable GitHub repository commit history', iconColor: '#F8961F' },
          { text: 'Technical decision memo explaining design trade-offs', iconColor: '#F8961F' },
          { text: 'Zero uncalibrated claims; every line of code tested', iconColor: '#10B981' },
        ],
        bottomCardTitle: 'Repository Inspection Suite',
        bottomBgGradient: 'linear-gradient(135deg, #fee0b2 0%, #fbd18b 50%, #f79c3b 100%)',
        mockupType: 'build',
      },
      {
        id: 'verify',
        stageNumber: '03',
        title: 'Verify',
        subtitle: 'Automated Test Verification',
        restingTeaser: '100% verified test passes and cryptographic audit records.',
        narrative:
          'Eliminate false positives from memorized LeetCode answers with authentic production trade-off rubrics and continuous automated test verification.',
        badge: 'Verified Dossier',
        badgeColor: '#8b5cf6',
        checklist: [
          { text: '24/24 Tests passing in sandboxed evaluation harness', iconColor: '#B89FFA' },
          { text: 'Top 5% modular API architecture review badge', iconColor: '#B89FFA' },
          { text: 'Cryptographic proof hash verifies authentic student authorship', iconColor: '#8b5cf6' },
        ],
        bottomCardTitle: 'Candidate Dossier Verified',
        bottomBgGradient: 'linear-gradient(135deg, #ede7fd 0%, #dfd3fb 100%)',
        mockupType: 'verify',
      },
      {
        id: 'connect',
        stageNumber: '04',
        title: 'Connect',
        subtitle: 'Fast-Track Technical Offer',
        restingTeaser: 'Slash technical screening cycles from weeks to 5 business days.',
        narrative:
          'Schedule direct final-round technical chats without initial screening rounds. Extend fast-track offers with high certainty and 96% first-year retention.',
        badge: 'Fast-Track Hire',
        badgeColor: '#10b981',
        checklist: [
          { text: 'Direct scheduling into engineering final round', iconColor: '#DBEE9F' },
          { text: 'Technical interview conversion rate elevated by 3.8x', iconColor: '#5DDFD7' },
          { text: 'Candidate joins with verified production readiness from Day 1', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Engineering Offer Extended',
        bottomBgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        mockupType: 'connect',
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*                        PATTERN D: LIQUID GOOEY MARQUEE                     */
/* -------------------------------------------------------------------------- */

const LIQUID_TICKER_ITEMS = [
  { before: 'PR Submitted', after: 'Capability Verified', tone: 'blue' },
  { before: 'Coursework Done', after: 'Production Grade', tone: 'purple' },
  { before: 'Diagnostic Passed', after: 'Interview Unlocked', tone: 'teal' },
  { before: 'Architecture Drafted', after: 'Benchmark Certified', tone: 'indigo' },
  { before: 'Cohort Gap Flagged', after: 'Targeted Sprint Deployed', tone: 'amber' },
  { before: 'Tests Verified (24/24)', after: 'Dossier Published', tone: 'emerald' },
];

function LiquidGooeyMarquee() {
  const filterId = useId();

  return (
    <div className="w-full relative overflow-hidden py-4 border-b border-slate-200/70 bg-gradient-to-r from-slate-50 via-white to-slate-50">
      {/* Inline SVG Liquid Goo Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" />
          </filter>
        </defs>
      </svg>

      <div className="flex items-center gap-3 max-w-7xl mx-auto px-4">
        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Proof Stream</span>
        </div>

        {/* Continuous Drifting Ticker */}
        <div className="overflow-hidden relative flex-1 mask-fade-edges">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {[...LIQUID_TICKER_ITEMS, ...LIQUID_TICKER_ITEMS].map((item, idx) => (
              <div
                key={`${item.before}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs"
              >
                <span className="text-slate-600 font-medium">{item.before}</span>
                <span className="text-slate-400 font-mono">→</span>
                <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{item.after}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MAIN ECOSYSTEM COMPONENT                        */
/* -------------------------------------------------------------------------- */

export function EcosystemSection() {
  const [activePersona, setActivePersona] = useState<Persona>('students');
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  // Qalam interactive chat state
  const [qalamInput, setQalamInput] = useState<string>('');
  const [qalamTyping, setQalamTyping] = useState<boolean>(false);
  const [qalamActivePrompt, setQalamActivePrompt] = useState<string>('Review my Redis Task Queue PR');
  const [qalamResponse, setQalamResponse] = useState<string>(
    'Architecture Review: Top 5% modular API design & clean schema migration. Redis asynchronous worker verified with exponential backoff and 24/24 passing unit tests.'
  );

  // Auto-advance timer (5.5s interval per REA spec)
  const isHoveredRef = useRef<boolean>(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveStageIdx((prev) => (prev + 1) % 4);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const currentStory = ROLES[activePersona];
  const activeTab = currentStory.showcaseTabs[activeTabIdx] || currentStory.showcaseTabs[0];

  // Stage hover debouncer (60ms debounce per REA Pattern A spec)
  const handleStagePointerEnter = (idx: number) => {
    isHoveredRef.current = true;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setActiveStageIdx(idx);
    }, 60);
  };

  const handleStagePointerLeave = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    isHoveredRef.current = false;
  };

  const handleStagePointerDown = (idx: number) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setActiveStageIdx(idx);
  };

  // Keyboard navigation for tablist
  const handleStageKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveStageIdx((idx + 1) % 4);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveStageIdx((idx - 1 + 4) % 4);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveStageIdx(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveStageIdx(3);
    }
  };

  // Interactive Qalam prompt selection
  const handleQalamPrompt = (promptText: string) => {
    setQalamActivePrompt(promptText);
    setQalamTyping(true);
    setTimeout(() => {
      setQalamTyping(false);
      if (promptText.includes('Redis')) {
        setQalamResponse(
          'Architecture Review: Top 5% modular API design & clean schema migration. Redis asynchronous worker verified with exponential backoff and 24/24 passing unit tests.'
        );
      } else if (promptText.includes('SQL')) {
        setQalamResponse(
          'SQL Query Isolation: 91/100. Indexed joins on foreign keys confirmed; window functions optimized for sub-12ms execution latency.'
        );
      } else if (promptText.includes('System Design')) {
        setQalamResponse(
          'System Design Benchmark: Verified resilient partition tolerance, idempotency tokens on write endpoints, and automated dead-letter queue routing.'
        );
      } else {
        setQalamResponse(
          `Capability Verified: Candidate demonstrates high architectural clarity for "${promptText}". Passing unit tests and clean commit discipline recorded.`
        );
      }
    }, 450);
  };

  /* ------------------------------------------------------------------------ */
  /*                    RENDER LOWER MOCKUP (4 STAGES)                        */
  /* ------------------------------------------------------------------------ */

  const renderStageMockup = (mockupType: WorkflowStage['mockupType']) => {
    switch (mockupType) {
      case 'discover':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-[20px] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900">Foundational Radar</span>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Benchmark 85+
              </span>
            </div>
            <div className="space-y-2 py-2">
              {[
                { name: 'Core Data Structures', score: '94%', color: '#2458ae' },
                { name: 'API System Design', score: '88%', color: '#5DDFD7' },
                { name: 'Database Indexing', score: '91%', color: '#7c3aed' },
              ].map((m) => (
                <div key={m.name} className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                    <span>{m.name}</span>
                    <span className="font-mono font-bold" style={{ color: m.color }}>{m.score}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: m.score, backgroundColor: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-slate-50">
              Verified baseline calibration confirmed
            </div>
          </div>
        );

      case 'build':
        return (
          <div className="w-full h-full p-3.5 flex flex-col justify-between bg-white rounded-[20px] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>Qalam Assistant</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                PR Approved
              </span>
            </div>

            <div className="my-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-800 space-y-1">
              <div className="text-[10px] font-mono font-bold text-amber-700 uppercase">
                {qalamActivePrompt}
              </div>
              {qalamTyping ? (
                <div className="flex items-center gap-1 text-slate-400 text-xs py-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: '100ms' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '200ms' }}>●</span>
                </div>
              ) : (
                <p className="text-[10.5px] text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {qalamResponse}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {[
                'Review Redis PR',
                'Diagnose SQL',
                'System Design',
              ].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleQalamPrompt(p)}
                  className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 text-[10px] font-medium transition-colors cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        );

      case 'verify':
        return (
          <div className="w-full h-full p-3.5 flex flex-col justify-between bg-slate-900 rounded-[20px] shadow-md text-slate-100 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-200 font-mono">Test Matrix · Runner #419</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full font-bold">
                24/24 PASSING
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 text-[10.5px] font-mono space-y-1">
              <p className="text-emerald-400">✓ API Architecture Score: 95/100</p>
              <p className="text-emerald-400">✓ SQL Query Isolation: 91/100</p>
              <p className="text-emerald-400">✓ Code Maintainability: 88/100</p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono text-center flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Cryptographic hash seal verified</span>
            </div>
          </div>
        );

      case 'connect':
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-white rounded-[20px] shadow-sm border border-emerald-200/60">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900">Direct Recruiter Match</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                Direct Offer
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 text-[11px] text-emerald-950">
              <span className="font-bold block text-[10.5px]">Fast-track offer issued</span>
              <p className="text-[10px] text-emerald-800 leading-relaxed">
                Candidate shortlisted via verified distributed task queue and 24/24 test passes.
              </p>
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-center">
              Average hiring cycle: 5 business days
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="ecosystem"
      className="relative w-full py-16 sm:py-24 overflow-hidden bg-[#fafbfd] border-t border-slate-200/80"
      aria-label="Pathwisse Capability Ecosystem"
    >
      {/* Pattern D: Liquid Gooey Status Marquee */}
      <LiquidGooeyMarquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        {/* ============================================================= */}
        {/* TOP AUDIENCE SWITCHER (PATTERN B: HERO PERSONA STAGE SWITCHER) */}
        {/* ============================================================= */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 relative">
          {/* Dynamic Ambient Radial Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] pointer-events-none blur-3xl opacity-60 transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${currentStory.radialGlowColor} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          <span
            className="text-xs font-mono font-bold tracking-widest uppercase mb-3 block transition-colors duration-300"
            style={{ color: currentStory.primaryColor }}
          >
            {currentStory.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-tight max-w-3xl mb-4">
            {currentStory.storyHeading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
            {currentStory.storySub}
          </p>

          {/* Interactive Audience Pill Strip with Sliding Squircle */}
          <div
            role="tablist"
            aria-label="Select Audience Persona"
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-slate-200 shadow-xs relative z-10"
          >
            {(['students', 'colleges', 'companies'] as Persona[]).map((persona) => {
              const isSelected = activePersona === persona;
              const labels: Record<
                Persona,
                { title: string; icon: React.ComponentType<{ size?: number; className?: string }> }
              > = {
                students: { title: 'For Students', icon: GraduationCap },
                colleges: { title: 'For Colleges', icon: Building2 },
                companies: { title: 'For Companies', icon: BriefcaseBusiness },
              };
              const ItemIcon = labels[persona].icon;

              return (
                <button
                  key={persona}
                  type="button"
                  role="tab"
                  id={`audience-tab-${persona}`}
                  aria-selected={isSelected}
                  onClick={() => {
                    setActivePersona(persona);
                    setActiveTabIdx(0);
                    setActiveStageIdx(0);
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  style={{
                    backgroundColor: isSelected ? currentStory.primaryColor : 'transparent',
                    transition: 'background-color 300ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ItemIcon size={15} />
                    <span>{labels[persona].title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Persona Reactive Key Stats Ticker */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-8 py-3 px-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-2xs">
            {currentStory.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span
                  className="block text-xl sm:text-2xl font-bold font-mono tracking-tight"
                  style={{ color: currentStory.primaryColor }}
                >
                  {stat.value}
                </span>
                <span className="text-[11px] font-medium text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 1: INTERACTIVE FLAGSHIP CAPABILITIES SHOWCASE         */}
        {/* ============================================================= */}
        <div className="relative mb-24 sm:mb-32">
          {/* Ambient Banner Gradient Container */}
          <div
            className="w-full rounded-[36px] sm:rounded-[44px] p-4 sm:p-8 lg:p-14 relative transition-all duration-700 overflow-hidden"
            style={{ background: currentStory.ambientGradient }}
          >
            {/* Top-Center Floating Icon Squircle Dock */}
            <div className="relative z-20 flex justify-center mb-0">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xs mb-[-24px]">
                {currentStory.showcaseTabs.map((tab, idx) => {
                  const isSelected = activeTabIdx === idx;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTabIdx(idx)}
                      aria-label={tab.name}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer outline-none hover:scale-105 active:scale-95 ${
                        isSelected ? 'shadow-md scale-105' : 'bg-white/60 hover:bg-white text-slate-700'
                      }`}
                      style={{
                        backgroundColor: isSelected ? tab.tabColor : 'rgba(255, 255, 255, 0.7)',
                        transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {tab.icon === 'compass' && (
                        <Compass size={22} className={isSelected ? 'text-[#071A31]' : 'text-slate-600'} />
                      )}
                      {tab.icon === 'sparkles' && (
                        <Sparkles size={22} className={isSelected ? 'text-[#071A31]' : 'text-slate-600'} />
                      )}
                      {tab.icon === 'terminal' && (
                        <Terminal size={22} className={isSelected ? 'text-[#071A31]' : 'text-slate-600'} />
                      )}
                      {tab.icon === 'award' && (
                        <Award size={22} className={isSelected ? 'text-[#071A31]' : 'text-slate-600'} />
                      )}

                      {/* Calendly's exact curved downward bridge connecting icon into white card */}
                      {isSelected && (
                        <div className="absolute left-1/2 top-full h-[14px] w-[32px] -translate-x-1/2 pointer-events-none z-30">
                          <svg
                            aria-hidden="true"
                            className="w-full h-full"
                            viewBox="0 0 32 14"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M25.0486 0C25.0486 0 20.3636 0.869539 20.3636 7C20.3636 13.1305 32 14 32 14L0 14C0 14 11.6364 13.1305 11.6364 7C11.6364 0.869539 6.95136 0 6.95136 0L25.0486 0Z"
                              fill="#FFFFFF"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Pure-White Squircle Card */}
            <div className="relative z-10 w-full rounded-[28px] sm:rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(7,26,49,0.08)] mt-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Heading, Description, Underlined CTA */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center text-xs text-[#071A31]"
                      style={{ backgroundColor: activeTab.tabColor }}
                    >
                      {activeTab.icon === 'compass' && <Compass size={12} />}
                      {activeTab.icon === 'sparkles' && <Sparkles size={12} />}
                      {activeTab.icon === 'terminal' && <Terminal size={12} />}
                      {activeTab.icon === 'award' && <Award size={12} />}
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{activeTab.name}</span>
                    {activeTab.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-slate-100 text-slate-600">
                        {activeTab.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                    {activeTab.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    {activeTab.description}
                  </p>

                  <div className="pt-2">
                    <a
                      href={activeTab.ctaLink}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 border-b-[1.5px] border-slate-900 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-colors cursor-pointer group"
                    >
                      <span>{activeTab.ctaText}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Tinted Mockup Box with Floating White Card */}
                <div
                  className="lg:col-span-6 rounded-[24px] overflow-hidden min-h-[300px] sm:min-h-[340px] p-6 flex items-center justify-center relative transition-colors duration-500"
                  style={{ backgroundColor: activeTab.bgGradient }}
                >
                  {/* Pattern C: Embedded Qalam Interactive Showcase Mockup */}
                  {activeTab.mockupType === 'qalam' ? (
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                            <Sparkles size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Qalam AI Mentor</div>
                            <div className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Live Engine Ready</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          v2.4
                        </span>
                      </div>

                      {/* Live Conversation Balloon */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-mono text-amber-800 font-bold uppercase block">
                          Prompt: &ldquo;{qalamActivePrompt}&rdquo;
                        </span>
                        {qalamTyping ? (
                          <div className="flex items-center gap-1 text-slate-400 py-1 text-xs">
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce" style={{ animationDelay: '100ms' }}>●</span>
                            <span className="animate-bounce" style={{ animationDelay: '200ms' }}>●</span>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-700 leading-relaxed font-sans">
                            {qalamResponse}
                          </p>
                        )}
                      </div>

                      {/* Interactive Prompt Pills */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Simulate Prompt:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Review my Redis Task Queue PR',
                            'Diagnose SQL Deficit',
                            'Check System Design Benchmark',
                          ].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => handleQalamPrompt(p)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Input Simulation Bar */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (qalamInput.trim()) {
                            handleQalamPrompt(qalamInput);
                            setQalamInput('');
                          }
                        }}
                        className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <input
                          type="text"
                          value={qalamInput}
                          onChange={(e) => setQalamInput(e.target.value)}
                          placeholder="Ask Qalam about your code architecture..."
                          className="w-full text-xs text-slate-800 placeholder-slate-400 px-2 outline-none"
                        />
                        <button
                          type="submit"
                          aria-label="Send query to Qalam"
                          className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          <Send size={12} />
                        </button>
                      </form>
                    </div>
                  ) : activeTab.mockupType === 'compass' ? (
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-900">Capability Diagnostic Map</span>
                        <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                          94% Match
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-800">Target: Full Stack Engineer</span>
                          <span className="text-xs font-mono font-bold text-blue-600">Level 2</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                          <span className="text-xs text-slate-600">Active Sprint: Distributed Cache</span>
                          <span className="text-xs font-mono text-emerald-600 font-bold">Week 3/4</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                          <span className="text-xs text-slate-600">Unit Test Coverage</span>
                          <span className="text-xs font-mono text-slate-900 font-bold">96.4%</span>
                        </div>
                      </div>
                    </div>
                  ) : activeTab.mockupType === 'drills' ? (
                    <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 space-y-3 text-slate-100 font-mono">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs text-slate-300">Terminal · Sprint Test Harness</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                          ALL PASS
                        </span>
                      </div>
                      <div className="text-[11px] space-y-1 text-slate-300">
                        <p className="text-emerald-400">PASS tests/queue-worker.spec.ts (12 tests)</p>
                        <p className="text-emerald-400">PASS tests/schema-migration.spec.ts (8 tests)</p>
                        <p className="text-emerald-400">PASS tests/rate-limiter.spec.ts (4 tests)</p>
                        <p className="text-slate-500 pt-1">Time: 1.48s, estimated latency: 8ms</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200/80 p-5 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-900">Verified Evidence Seal</span>
                        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                          Immutable
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                        <span className="font-mono text-[10px] text-slate-400 uppercase block">SHA-256 Proof:</span>
                        <p className="font-mono text-[10px] text-slate-800 break-all">
                          e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                        </p>
                      </div>
                      <div className="text-[11px] text-slate-600 flex items-center justify-between">
                        <span>Candidate: Ananya K.</span>
                        <span className="font-bold text-blue-600">Ready for Interview</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 2: MULTI-STAGE HORIZONTAL ACCORDION DECK             */}
        {/* (PATTERN A: TIMELINE FEATURE DECK / VERIFIED LIFECYCLE)       */}
        {/* ============================================================= */}
        <div className="mb-24 sm:mb-32">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase mb-2 block"
              style={{ color: currentStory.primaryColor }}
            >
              THE 4-STAGE LIFECYCLE
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-tight">
              A verified capability lifecycle built for proof, not speculation.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto">
              Hover or click across each stage to inspect how ambition transforms into unmediated opportunity.
            </p>
          </div>

          {/* Pattern A: Horizontal Expandable Accordion Deck on Desktop (>= 1024px) */}
          <div
            role="tablist"
            aria-label="Verified Capability Lifecycle Stages"
            className="hidden lg:flex items-stretch gap-3 w-full"
            onPointerLeave={handleStagePointerLeave}
          >
            {currentStory.workflowStages.map((stage, idx) => {
              const isActive = activeStageIdx === idx;

              return (
                <div
                  key={stage.id}
                  role="tab"
                  id={`stage-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`stage-panel-${stage.id}`}
                  tabIndex={0}
                  onPointerEnter={() => handleStagePointerEnter(idx)}
                  onPointerDown={() => handleStagePointerDown(idx)}
                  onKeyDown={(e) => handleStageKeyDown(e, idx)}
                  style={{
                    flex: isActive ? '2.8' : '1',
                    minWidth: isActive ? '380px' : '230px',
                    transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                    borderColor: isActive ? currentStory.primaryColor : '#e2e8f0',
                  }}
                  className={`relative rounded-[32px] bg-white border shadow-xs transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-6 select-none ${
                    isActive
                      ? 'shadow-[0_20px_48px_-12px_rgba(15,23,42,0.14)] ring-2 ring-slate-900/5'
                      : 'hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Card Top Content */}
                  <div>
                    {/* Stage Number & Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {stage.stageNumber}
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: isActive ? `${currentStory.primaryColor}15` : '#f1f5f9',
                          color: isActive ? currentStory.primaryColor : '#64748b',
                        }}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 mb-1">
                      {stage.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mb-3">
                      {stage.subtitle}
                    </p>

                    {/* Zero Layout Shift Stack (CSS Grid cell with overlapping children) */}
                    <div className="grid grid-cols-1 grid-rows-1">
                      {/* Resting description */}
                      <div
                        style={{
                          gridArea: '1 / 1',
                          opacity: isActive ? 0 : 1,
                          transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                          pointerEvents: isActive ? 'none' : 'auto',
                          transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms',
                        }}
                      >
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                          {stage.restingTeaser}
                        </p>
                      </div>

                      {/* Active expanded narrative & checklist */}
                      <div
                        style={{
                          gridArea: '1 / 1',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                          pointerEvents: isActive ? 'auto' : 'none',
                          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms',
                        }}
                        className="space-y-3"
                      >
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                          {stage.narrative}
                        </p>

                        {/* Checklist items */}
                        <div className="space-y-1.5 pt-1">
                          {stage.checklist.map((item, cIdx) => (
                            <div key={item.text} className="flex items-start gap-2">
                              <span
                                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-900 shrink-0 mt-0.5"
                                style={{ backgroundColor: item.iconColor }}
                              >
                                ✓
                              </span>
                              <span className="text-[11.5px] text-slate-700 font-medium leading-tight">
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Visual Area */}
                  <div
                    className={`w-full rounded-[22px] overflow-hidden transition-all duration-500 mt-5 relative flex items-center justify-center ${
                      isActive ? 'min-h-[220px] shadow-inner' : 'h-[130px]'
                    }`}
                    style={{ background: stage.bottomBgGradient }}
                  >
                    {isActive ? (
                      renderStageMockup(stage.mockupType)
                    ) : (
                      /* Resting Abstract Silhouette */
                      <div className="w-full h-full flex flex-col items-center justify-center relative p-3 text-center">
                        {idx === 0 && (
                          <Compass size={32} className="text-blue-600/40 mb-1" />
                        )}
                        {idx === 1 && (
                          <Code2 size={32} className="text-amber-600/40 mb-1" />
                        )}
                        {idx === 2 && (
                          <Terminal size={32} className="text-purple-600/40 mb-1" />
                        )}
                        {idx === 3 && (
                          <Award size={32} className="text-emerald-600/40 mb-1" />
                        )}
                        <span className="text-[10px] font-mono font-semibold text-slate-600/70 tracking-wider uppercase">
                          Hover to inspect
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile & Tablet Fallback Vertical Accordion (< 1024px) */}
          <div className="lg:hidden space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {currentStory.workflowStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeStageIdx === idx ? 'bg-slate-900 w-6' : 'bg-slate-300 w-2'
                  }`}
                  aria-label={`Go to ${stage.title}`}
                />
              ))}
            </div>

            {currentStory.workflowStages.map((stage, idx) => {
              const isActive = activeStageIdx === idx;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`rounded-[24px] bg-white border transition-all p-6 cursor-pointer ${
                    isActive
                      ? 'border-slate-300 shadow-md ring-1 ring-slate-900/5'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 mr-2">
                        {stage.stageNumber}
                      </span>
                      <h4 className="text-xl font-bold font-['Outfit'] text-slate-900 inline">
                        {stage.title}
                      </h4>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isActive ? `${currentStory.primaryColor}15` : '#f1f5f9',
                        color: isActive ? currentStory.primaryColor : '#64748b',
                      }}
                    >
                      {stage.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{stage.subtitle}</p>

                  {isActive ? (
                    <div className="pt-3 border-t border-slate-100 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed">{stage.narrative}</p>
                      <div className="space-y-2">
                        {stage.checklist.map((item) => (
                          <div key={item.text} className="flex items-center gap-2.5">
                            <span
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900 shrink-0"
                              style={{ backgroundColor: item.iconColor }}
                            >
                              ✓
                            </span>
                            <span className="text-xs text-slate-600 font-medium">{item.text}</span>
                          </div>
                        ))}
                      </div>
                      <div
                        className="w-full rounded-2xl overflow-hidden min-h-[190px] p-3"
                        style={{ background: stage.bottomBgGradient }}
                      >
                        {renderStageMockup(stage.mockupType)}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 line-clamp-2">{stage.restingTeaser}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* INTERACTIVE EXPERIENCE & OUTCOMES SHOWCASE                    */}
        {/* ============================================================= */}
        <InteractiveExperienceSection
          activePersona={activePersona}
          onPersonaChange={setActivePersona}
        />

        {/* ============================================================= */}
        {/* EXPLORER LINK STRIP                                           */}
        {/* ============================================================= */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
              CONTINUE EXPLORING THE ECOSYSTEM
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-800">
              Dedicated evidence workspaces for each participant in the Pathwisse network.
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={ROLES.students.targetLink}
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 text-slate-800 hover:text-blue-600 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>Explore Students</span>
              <ArrowRight size={13} />
            </a>
            <a
              href={ROLES.colleges.targetLink}
              className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500 text-slate-800 hover:text-purple-600 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>Explore Colleges</span>
              <ArrowRight size={13} />
            </a>
            <a
              href={ROLES.companies.targetLink}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Explore Companies</span>
              <ArrowRight size={13} />
            </a>
            <a
              href="/hire"
              className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 hover:border-teal-400 text-teal-800 hover:text-teal-900 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>Hire Talent Directory</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Live Cursor-Tracking Mascot Companion */}
        <div className="mt-12 flex justify-center">
          <PageMascot audience={activePersona} size={88} />
        </div>
      </div>

      <FloatingMascot audience={activePersona} />
    </section>
  );
}
