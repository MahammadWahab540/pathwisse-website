'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
  Compass,
  Award,
  ShieldCheck,
  BarChart3,
  Users,
  CheckCircle2,
  Terminal,
  Code2,
  Zap,
  Target,
  Sliders,
  Send,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
} from 'lucide-react';
import { PageMascot, FloatingMascot } from '@/components/mascot/PageMascot';

export type Persona = 'students' | 'colleges' | 'companies';

/* -------------------------------------------------------------------------- */
/*                               DATA DEFINITIONS                             */
/* -------------------------------------------------------------------------- */

export interface ShowcaseTab {
  id: string;
  name: string;
  badge?: string;
  icon: string;
  tabColor: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  mockupType: string;
}

export interface WorkflowStage {
  id: string;
  title: string;
  restingTeaser: string;
  narrative: string;
  checklist: Array<{
    text: string;
    iconColor: string;
  }>;
  bottomCardTitle: string;
  bottomBgGradient: string;
  mockupType: string;
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
  showcaseTabs: ShowcaseTab[];
  workflowStages: WorkflowStage[];
}

// NOTE: targetLink order must remain: /students, /colleges, /enterprise for invariant tests
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
    showcaseTabs: [
      {
        id: 'scheduling',
        name: 'Career Compass',
        icon: 'compass',
        tabColor: '#5DDFD7',
        headline: 'Book meetings with the world’s #1 career intelligence tool',
        description:
          'Giving you complete control and total customization, Pathwisse is the easiest and most powerful way to calibrate your trajectory and find time to build.',
        ctaText: 'Learn more',
        ctaLink: '/students',
        bgGradient: '#dcecfe',
        mockupType: 'calendar',
      },
      {
        id: 'callie',
        name: 'Qalam AI',
        badge: 'Beta',
        icon: 'sparkles',
        tabColor: '#DBEE9F',
        headline: 'Introducing your 24/7 AI capability mentor',
        description:
          'Add Qalam to any project sprint to unblock architecture challenges, review pull requests, and explain complex distributed systems on your behalf.',
        ctaText: 'Learn more',
        ctaLink: '/students',
        bgGradient: '#f0f8db',
        mockupType: 'callie',
      },
      {
        id: 'notetaker',
        name: 'Drills Engine',
        badge: 'New',
        icon: 'terminal',
        tabColor: '#B89FFA',
        headline: 'Actionable, inspectable test suites for every milestone',
        description:
          'Finish every week knowing 24/24 unit tests were verified, technical decision memos were captured, and cryptographic proof was published.',
        ctaText: 'Learn more',
        ctaLink: '/students',
        bgGradient: '#f0ebfc',
        mockupType: 'notetaker',
      },
      {
        id: 'payments',
        name: 'Evidence Vault',
        badge: 'New',
        icon: 'award',
        tabColor: '#5DDFD7',
        headline: 'Flexible, built-in capability proof tools',
        description:
          'Package verified git commits upfront, document technical trade-offs, and send inspectable proof dossiers that make it easy to get hired.',
        ctaText: 'Learn more',
        ctaLink: '/students',
        bgGradient: '#dbf6f4',
        mockupType: 'payments',
      },
    ],
    workflowStages: [
      {
        id: 'book',
        title: 'Book',
        restingTeaser: 'Book the meeting and get paid with zero back-and-forth.',
        narrative:
          'A student selects a target role. Share a capability dossier or ask Qalam to calibrate milestone sprints that work for hiring teams.',
        checklist: [
          { text: 'Target role and prerequisite skills calibrate automatically', iconColor: '#5DDFD7' },
          { text: 'Diagnostic benchmark evaluates foundations', iconColor: '#5DDFD7' },
          { text: 'Student secures personalized milestone trajectory', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Candidate Consultation',
        bottomBgGradient: 'linear-gradient(135deg, #cdeafe 0%, #bde3fe 100%)',
        mockupType: 'stage-book',
      },
      {
        id: 'prep',
        title: 'Prep',
        restingTeaser: 'Never walk into a meeting cold.',
        narrative:
          'Before the interview, get all of the info you need in one place. Qalam reviews your client’s contact history and helps you show up prepared.',
        checklist: [
          { text: 'Contact details automatically update', iconColor: '#F8961F' },
          { text: 'Your client interactions are in one place', iconColor: '#F8961F' },
          { text: 'Qalam helps you prep', iconColor: '#10B981' },
        ],
        bottomCardTitle: 'Get answers instantly ✦',
        bottomBgGradient: 'linear-gradient(135deg, #fee0b2 0%, #fbd18b 50%, #f79c3b 100%)',
        mockupType: 'stage-prep',
      },
      {
        id: 'capture',
        title: 'Capture',
        restingTeaser: 'Focus on the conversation. Notetaker handles the notes.',
        narrative:
          'While you run the project, the proof engine captures every commit. The test recap and action items are delivered right after the sprint.',
        checklist: [
          { text: 'Automated test suite joins and verifies code', iconColor: '#B89FFA' },
          { text: 'You get a ready-to-share technical recap memo', iconColor: '#B89FFA' },
          { text: 'Recap is stored in verified talent profile', iconColor: '#F8961F' },
        ],
        bottomCardTitle: 'Automated Test Recap',
        bottomBgGradient: 'linear-gradient(135deg, #ede7fd 0%, #dfd3fb 100%)',
        mockupType: 'stage-capture',
      },
      {
        id: 'followup',
        title: 'Follow up',
        restingTeaser: 'Work moves forward after the meeting ends.',
        narrative:
          'Review an automated offer draft based on the dossier, add an additional code review link, and add Qalam to the email to schedule the final round.',
        checklist: [
          { text: 'Dossier drafts a follow-up interview invitation', iconColor: '#B89FFA' },
          { text: 'Qalam finds time for the final technical chat', iconColor: '#DBEE9F' },
          { text: 'Candidate receives direct offer via verified proof', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Fast-Track Offer Extended',
        bottomBgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        mockupType: 'stage-followup',
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
    showcaseTabs: [
      {
        id: 'scheduling',
        name: 'Cohort Radar',
        icon: 'compass',
        tabColor: '#B89FFA',
        headline: 'Real-time readiness tracking for 640 engineering students',
        description:
          'Giving training and placement teams complete cohort visibility across batches, Pathwisse is the easiest way to know who is placement-ready early.',
        ctaText: 'Learn more',
        ctaLink: '/colleges',
        bgGradient: '#f3e8ff',
        mockupType: 'calendar',
      },
      {
        id: 'callie',
        name: 'Syllabus AI',
        badge: 'Beta',
        icon: 'sparkles',
        tabColor: '#DBEE9F',
        headline: 'Automated skill deficit diagnostic assistant',
        description:
          'Diagnose whether students struggle with System Design or SQL optimization, and dispatch targeted curriculum acceleration sprints with zero friction.',
        ctaText: 'Learn more',
        ctaLink: '/colleges',
        bgGradient: '#f0f8db',
        mockupType: 'callie',
      },
      {
        id: 'notetaker',
        name: 'Sprint Engine',
        badge: 'New',
        icon: 'terminal',
        tabColor: '#6BB1FF',
        headline: 'Actionable cohort lifts with +14.2% measured boost',
        description:
          'Deploy modular catch-up sprints to at-risk students, elevating overall batch placement readiness to 78.4% before enterprise recruiters arrive.',
        ctaText: 'Learn more',
        ctaLink: '/colleges',
        bgGradient: '#dcecfe',
        mockupType: 'notetaker',
      },
      {
        id: 'payments',
        name: 'Proof Seal',
        badge: 'New',
        icon: 'award',
        tabColor: '#5DDFD7',
        headline: '1,840+ verified repositories with zero résumé spam',
        description:
          'Arm your campus placement drives with authenticated student code dossiers backed by passing unit tests and permanent git commit records.',
        ctaText: 'Learn more',
        ctaLink: '/colleges',
        bgGradient: '#dbf6f4',
        mockupType: 'payments',
      },
    ],
    workflowStages: [
      {
        id: 'book',
        title: 'Book',
        restingTeaser: 'Ingest cohorts and map initial readiness bars.',
        narrative:
          'A college ingests 640 engineering students. Run continuous baseline capability audits to map department readiness distributions.',
        checklist: [
          { text: '640 Engineering students enrolled in telemetry', iconColor: '#B89FFA' },
          { text: 'Department baseline scored (Full Stack: 190/226)', iconColor: '#6BB1FF' },
          { text: 'Readiness trajectory calibrated at 78.4% ready', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Cohort Diagnostic Scan',
        bottomBgGradient: 'linear-gradient(135deg, #ede7fd 0%, #dfd3fb 100%)',
        mockupType: 'stage-book',
      },
      {
        id: 'prep',
        title: 'Prep',
        restingTeaser: 'Diagnose deficits 90 days before company visits.',
        narrative:
          'Before campus placement season starts, get all deficit diagnostics in one place. Identify priority gaps in system design and database indexing.',
        checklist: [
          { text: 'SQL deficit detected for 64% of cohort', iconColor: '#F8961F' },
          { text: 'System design priority deficit flagged early', iconColor: '#F8961F' },
          { text: 'Targeted acceleration sprint enrolled automatically', iconColor: '#10B981' },
        ],
        bottomCardTitle: 'Get answers instantly ✦',
        bottomBgGradient: 'linear-gradient(135deg, #fee0b2 0%, #fbd18b 50%, #f79c3b 100%)',
        mockupType: 'stage-prep',
      },
      {
        id: 'capture',
        title: 'Capture',
        restingTeaser: 'Audit 1,840+ project git trees and tests.',
        narrative:
          'While students complete sprints, our code audit engine inspects authenticity, commit frequency, and unit test pass rates with 0 inflated claims.',
        checklist: [
          { text: '1,840+ project repositories audited for depth', iconColor: '#5DDFD7' },
          { text: '0 inflated resume claims permitted in pool', iconColor: '#5DDFD7' },
          { text: 'Institutional audit seal published to portal', iconColor: '#F8961F' },
        ],
        bottomCardTitle: 'Institutional Audit Seal',
        bottomBgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        mockupType: 'stage-capture',
      },
      {
        id: 'followup',
        title: 'Follow up',
        restingTeaser: 'Direct candidate pipelines to top corporate partners.',
        narrative:
          'Share calibrated student pools with visiting recruiters. Employers review inspectable decision memos and achieve 3.4x higher Day-1 conversions.',
        checklist: [
          { text: '18 hiring partners access curated talent portal', iconColor: '#6BB1FF' },
          { text: 'Recruiters shortlist candidates by code quality', iconColor: '#DBEE9F' },
          { text: '3.4x Day-1 placement conversion lift achieved', iconColor: '#5DDFD7' },
        ],
        bottomCardTitle: 'Campus Placement Sieve',
        bottomBgGradient: 'linear-gradient(135deg, #cdeafe 0%, #bde3fe 100%)',
        mockupType: 'stage-followup',
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
    showcaseTabs: [
      {
        id: 'scheduling',
        name: 'Dossier Review',
        icon: 'compass',
        tabColor: '#5DDFD7',
        headline: 'Review authentic code architectures in under 60 seconds',
        description:
          'Inspect real technical decision memos, modular API designs, and passing unit test suites before scheduling a single screening call.',
        ctaText: 'Learn more',
        ctaLink: '/enterprise',
        bgGradient: '#dbf6f4',
        mockupType: 'calendar',
      },
      {
        id: 'callie',
        name: 'Talent Sieve',
        badge: 'Beta',
        icon: 'sparkles',
        tabColor: '#DBEE9F',
        headline: 'Sieve 500+ applicants by actual code quality',
        description:
          'Filter applicant pipelines by verified test pass rates, architectural maintainability scores, and database design instead of college pedigree.',
        ctaText: 'Learn more',
        ctaLink: '/enterprise',
        bgGradient: '#f0f8db',
        mockupType: 'callie',
      },
      {
        id: 'notetaker',
        name: 'Role Calibrate',
        badge: 'New',
        icon: 'terminal',
        tabColor: '#B89FFA',
        headline: 'Define exact capability bars your team needs',
        description:
          'Specify required distributed task handling, SQL transactions, or containerization to evaluate candidates against real day-one responsibilities.',
        ctaText: 'Learn more',
        ctaLink: '/enterprise',
        bgGradient: '#f0ebfc',
        mockupType: 'notetaker',
      },
      {
        id: 'payments',
        name: 'Direct Pipeline',
        badge: 'New',
        icon: 'award',
        tabColor: '#5DDFD7',
        headline: 'Shrink engineering hiring cycles from 6 weeks to 5 days',
        description:
          'Hire day-one contributors through an authenticated talent network with defensible technical proof and zero recruitment regret.',
        ctaText: 'Learn more',
        ctaLink: '/enterprise',
        bgGradient: '#dcecfe',
        mockupType: 'payments',
      },
    ],
    workflowStages: [
      {
        id: 'book',
        title: 'Book',
        restingTeaser: 'Calibrate role thresholds with zero generic noise.',
        narrative:
          'Define the exact competency bars for the role—distributed systems, SQL transaction isolation, and error boundaries—before posting requirements.',
        checklist: [
          { text: 'Associate Full Stack threshold set to 85+ score', iconColor: '#5DDFD7' },
          { text: 'Required artifact criteria specified in rubric', iconColor: '#DBEE9F' },
          { text: 'Direct evidence match filters enabled', iconColor: '#6BB1FF' },
        ],
        bottomCardTitle: 'Associate Engineer Spec',
        bottomBgGradient: 'linear-gradient(135deg, #cdeafe 0%, #bde3fe 100%)',
        mockupType: 'stage-book',
      },
      {
        id: 'prep',
        title: 'Prep',
        restingTeaser: 'Sieve 450 candidate applications in seconds.',
        narrative:
          'Before the interview loop, get all candidate evidence in one place. Sieve applicant pools by verified git trees and 24/24 unit test passes.',
        checklist: [
          { text: '450 applications sieved by test pass rate', iconColor: '#F8961F' },
          { text: 'Top 18 high-signal candidates surfaced', iconColor: '#F8961F' },
          { text: '0 keyword spam permitted in final shortlist', iconColor: '#10B981' },
        ],
        bottomCardTitle: 'Get answers instantly ✦',
        bottomBgGradient: 'linear-gradient(135deg, #fee0b2 0%, #fbd18b 50%, #f79c3b 100%)',
        mockupType: 'stage-prep',
      },
      {
        id: 'capture',
        title: 'Capture',
        restingTeaser: 'Inspect technical decision memos in <60 seconds.',
        narrative:
          'Engineering managers review authentic architectural trade-offs, database schemas, and unit test coverage before the first screening call.',
        checklist: [
          { text: 'Technical decision memo reviewed in <60s', iconColor: '#DBEE9F' },
          { text: 'SQL schema and indexes scored at 91/100', iconColor: '#5DDFD7' },
          { text: 'Code maintainability verified at 88/100', iconColor: '#B89FFA' },
        ],
        bottomCardTitle: 'Sample Dossier · Ananya K.',
        bottomBgGradient: 'linear-gradient(135deg, #ede7fd 0%, #dfd3fb 100%)',
        mockupType: 'stage-capture',
      },
      {
        id: 'followup',
        title: 'Follow up',
        restingTeaser: 'Fast-track high-conviction offers in 5 business days.',
        narrative:
          'Conduct one focused 30-minute architectural discussion and extend offers with 96% first-year retention confidence backed by permanent proof.',
        checklist: [
          { text: 'Generic screening rounds eliminated via proof', iconColor: '#5DDFD7' },
          { text: 'Focused 30-min architecture review completed', iconColor: '#6BB1FF' },
          { text: 'Offer extended in 5 business days', iconColor: '#DBEE9F' },
        ],
        bottomCardTitle: 'Fast-Track Offer Extended',
        bottomBgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
        mockupType: 'stage-followup',
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function EcosystemSection() {
  const [activePersona, setActivePersona] = useState<Persona>('students');
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(1); // Default to 'Prep' to match Calendly screenshot!
  
  // Interactive Showcase Mockup States
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [monthOffset, setMonthOffset] = useState<number>(0); // 0: July 2026, -1: June 2026, 1: August 2026
  const [consultationDuration, setConsultationDuration] = useState<'30 min' | '45 min' | '60 min'>('45 min');
  const [consultationPlatform, setConsultationPlatform] = useState<'Zoom' | 'Meet'>('Zoom');
  const [qalamPromptSelected, setQalamPromptSelected] = useState<string | null>(null);
  const [drillsStatus, setDrillsStatus] = useState<'idle' | 'running' | 'success'>('success');
  const [stageChatInput, setStageChatInput] = useState<string>('');
  const [stageChatAnswer, setStageChatAnswer] = useState<string | null>(null);

  const months = ['June 2026', 'July 2026', 'August 2026'];
  const currentMonthName = months[monthOffset + 1] || 'July 2026';

  const currentStory = ROLES[activePersona];
  const activeTab = currentStory.showcaseTabs[activeTabIdx] || currentStory.showcaseTabs[0];

  useEffect(() => {
    setActiveTabIdx(0);
    setActiveStageIdx(1);
    setSelectedDate(15);
    setMonthOffset(0);
    setStageChatAnswer(null);
    setStageChatInput('');
  }, [activePersona]);

  const handleRunDrills = () => {
    setDrillsStatus('running');
    setTimeout(() => {
      setDrillsStatus('success');
    }, 450);
  };

  const handleStagePromptClick = (promptText: string) => {
    setStageChatInput(promptText);
    if (promptText.includes('budget')) {
      setStageChatAnswer(
        'Acme Co. approved 4 headcount with top-tier compensation benchmarks for candidates demonstrating verified Redis queue & PostgreSQL transactions.'
      );
    } else if (promptText.includes('stakeholders')) {
      setStageChatAnswer(
        'Lead Platform Architect, VP of Engineering, and 2 Senior Backend Peers will review the technical decision memo directly.'
      );
    } else {
      setStageChatAnswer(
        'Evaluation covers distributed task workers, transactional isolation, and automated unit test suites with >= 90% branch coverage.'
      );
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                  RENDER CALENDLY-INSPIRED MOCKUPS                        */
  /* ------------------------------------------------------------------------ */

  const renderShowcaseMockup = (type: string) => {
    if (type === 'calendar') {
      // Calendly July 2026 Interactive Calendar (from Screenshot 1)
      const clickableDays = [1, 2, 6, 7, 8, 9, 15, 16, 20, 21, 22, 23, 27, 28, 29, 30];

      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Decorative patterned background pills */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-10 h-32 rounded-full bg-blue-500/40 shrink-0" />
            ))}
          </div>

          {/* Floating White Calendar Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] rounded-[24px] bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(7,26,49,0.12)] border border-slate-100"
          >
            {/* Calendar Header with interactive months */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMonthOffset((prev) => Math.max(-1, prev - 1))}
                aria-label="Previous Month"
                className="p-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <span className="text-sm font-semibold text-slate-800">{currentMonthName}</span>
              <motion.button
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMonthOffset((prev) => Math.min(1, prev + 1))}
                aria-label="Next Month"
                className="p-1 rounded-full text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-400 uppercase mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Interactive Calendar grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <span className="p-2 text-slate-300"></span>
              <span className="p-2 text-slate-300"></span>
              <span className="p-2 text-slate-300"></span>
              
              {/* Day 1 - 31 */}
              {[...Array(31)].map((_, idx) => {
                const day = idx + 1;
                const isClickable = clickableDays.includes(day);
                const isSelected = selectedDate === day;

                if (!isClickable) {
                  return (
                    <span key={day} className="p-2 text-slate-400 select-none">
                      {day}
                    </span>
                  );
                }

                return (
                  <motion.button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                    className="relative p-2 font-bold cursor-pointer text-blue-600 focus:outline-none flex items-center justify-center"
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeCalendarDate"
                        className="absolute inset-0.5 rounded-full bg-[#3B82F6] shadow-md z-0"
                        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                      />
                    )}
                    <span className={`relative z-10 ${isSelected ? 'text-white' : ''}`}>
                      {day}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected feedback pill */}
            <motion.div
              layout
              className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500"
            >
              <span className="font-semibold text-blue-600">Selected Slot:</span>
              <span className="font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                July {selectedDate}, 10:00 AM
              </span>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    if (type === 'payments') {
      // Calendly Payments Consultation Card (from Screenshot 2)
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Decorative patterned background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-36 rounded-2xl bg-teal-400/30 shrink-0 rotate-12" />
            ))}
          </div>

          {/* Floating White Consultation Card with Interactive Controls */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(7,26,49,0.12)] border border-slate-100 flex flex-col items-center text-center"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md mb-3 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Consultant Avatar"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <strong className="text-base font-bold text-slate-900 mb-1">Consultation</strong>
            <span className="text-xs text-slate-500 mb-4">Technical Capability Review</span>

            {/* Interactive Duration Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 mb-4 w-full justify-center">
              {(['30 min', '45 min', '60 min'] as const).map((dur) => {
                const isSelected = consultationDuration === dur;
                return (
                  <motion.button
                    key={dur}
                    type="button"
                    onClick={() => setConsultationDuration(dur)}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-3 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                      isSelected ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="consultationDuration"
                        className="absolute inset-0 bg-white rounded-lg shadow-xs z-0"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{dur}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Interactive Platform Badge */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-100 w-full justify-center">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Clock size={15} className="text-teal-600" />
                <span>{consultationDuration}</span>
              </span>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => setConsultationPlatform((p) => (p === 'Zoom' ? 'Meet' : 'Zoom'))}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer text-[11px]"
              >
                <Video size={13} className="text-teal-600" />
                <span>{consultationPlatform}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    if (type === 'callie') {
      // Qalam AI interactive chat card
      const promptSuggestions = [
        'Explain Redis DLQ worker',
        'Review PR #42 SQL indexes',
        'Check distributed lock',
      ];

      return (
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-[320px] rounded-[24px] bg-white p-5 shadow-[0_12px_40px_rgba(7,26,49,0.12)] border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-500" />
                <strong className="text-xs font-bold text-slate-900">Qalam AI Assistant</strong>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online</span>
              </span>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="p-3 rounded-xl bg-slate-50 text-slate-700">
                <span className="text-[10px] text-slate-400 font-mono block mb-1">Qalam</span>
                <span>
                  {qalamPromptSelected === 'Explain Redis DLQ worker'
                    ? 'A dead-letter queue isolates messages exceeding 3 retry attempts with exponential backoff, preventing cascade worker starvation.'
                    : qalamPromptSelected === 'Review PR #42 SQL indexes'
                    ? 'Added B-Tree index on (tenant_id, created_at DESC) reduces median query latency from 140ms to 4.2ms.'
                    : qalamPromptSelected === 'Check distributed lock'
                    ? 'Redlock algorithm acquired lock token with 500ms TTL and atomic release script.'
                    : 'You finished Redis task queue fundamentals. Ready to write the dead-letter queue worker?'}
                </span>
              </div>
            </div>

            {/* Clickable prompt suggestions */}
            <div className="space-y-1.5 mb-3">
              <span className="text-[10px] text-slate-400 font-mono block">Ask Qalam:</span>
              <div className="flex flex-wrap gap-1">
                {promptSuggestions.map((prompt) => (
                  <motion.button
                    key={prompt}
                    type="button"
                    onClick={() => setQalamPromptSelected(prompt)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-[10px] px-2 py-1 rounded-md border text-left cursor-pointer transition-colors ${
                      qalamPromptSelected === prompt
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span className="font-semibold text-emerald-600">Suggested Action</span>
              <span className="text-slate-700 font-medium">Start Milestone 03 →</span>
            </div>
          </motion.div>
        </div>
      );
    }

    // Default Notetaker / Drills card
    return (
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative z-10 w-full max-w-[320px] rounded-[24px] bg-slate-900 text-slate-100 p-5 shadow-2xl border border-slate-800 font-mono text-xs"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
              <Terminal size={13} className="text-blue-400" />
              <span>test_harness.ts</span>
            </span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                drillsStatus === 'running'
                  ? 'text-amber-400 bg-amber-950/40 animate-pulse'
                  : 'text-emerald-400 bg-emerald-950/40'
              }`}
            >
              {drillsStatus === 'running' ? 'RUNNING SUITE...' : '24/24 PASSING'}
            </span>
          </div>
          
          <div className="space-y-1.5 text-[11px] text-slate-300 mb-4">
            <motion.p
              animate={{ opacity: drillsStatus === 'running' ? 0.4 : 1 }}
              transition={{ delay: 0.03 }}
              className="text-emerald-400 flex items-center gap-1.5"
            >
              <span>✓</span>
              <span>queue_connected (12ms)</span>
            </motion.p>
            <motion.p
              animate={{ opacity: drillsStatus === 'running' ? 0.4 : 1 }}
              transition={{ delay: 0.06 }}
              className="text-emerald-400 flex items-center gap-1.5"
            >
              <span>✓</span>
              <span>retries_throttled_to_3 (45ms)</span>
            </motion.p>
            <motion.p
              animate={{ opacity: drillsStatus === 'running' ? 0.4 : 1 }}
              transition={{ delay: 0.09 }}
              className="text-emerald-400 flex items-center gap-1.5"
            >
              <span>✓</span>
              <span>payload_signature_verified (8ms)</span>
            </motion.p>
          </div>

          <motion.button
            type="button"
            onClick={handleRunDrills}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Zap size={12} className="text-amber-400" />
            <span>Re-run test suite</span>
          </motion.button>
        </motion.div>
      </div>
    );
  };

  return (
    <section
      id="ecosystem"
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-[#fafbfd] border-t border-slate-200/80"
      aria-label="Calendly-Inspired Interactive Product Experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================= */}
        {/* TOP AUDIENCE SWITCHER                                          */}
        {/* ============================================================= */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase mb-3 block"
            style={{ color: currentStory.primaryColor }}
          >
            {currentStory.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-tight max-w-3xl mb-4">
            {currentStory.storyHeading}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mb-6">
            {currentStory.storySub}
          </p>

          <div
            role="tablist"
            aria-label="Select Audience Persona"
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white border border-slate-200 shadow-xs"
          >
            {(['students', 'colleges', 'companies'] as Persona[]).map((persona) => {
              const isSelected = activePersona === persona;
              const labels: Record<Persona, { title: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
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
                  onClick={() => setActivePersona(persona)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected ? 'text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="audience-pill-glow"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: currentStory.primaryColor }}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <ItemIcon size={15} />
                    <span>{labels[persona].title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 1: CALENDLY-INSPIRED INTERACTIVE PRODUCT SHOWCASE     */}
        {/* (EXACT REPLICATION FROM SCREENSHOTS 1 & 2)                    */}
        {/* ============================================================= */}
        <div className="relative mb-28 sm:mb-36">
          {/* Ambient Banner Gradient Container */}
          <div
            className="w-full rounded-[36px] sm:rounded-[44px] p-4 sm:p-8 lg:p-14 relative transition-all duration-700 overflow-hidden"
            style={{ background: currentStory.ambientGradient }}
          >
            {/* Top-Center Floating Icon Squircle Dock (Attached to Top of Card) */}
            <div className="relative z-20 flex justify-center mb-0">
              <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xs mb-[-24px]">
                {currentStory.showcaseTabs.map((tab, idx) => {
                  const isSelected = activeTabIdx === idx;
                  return (
                    <div key={tab.id} className="relative">
                      <motion.button
                        type="button"
                        onClick={() => setActiveTabIdx(idx)}
                        aria-label={tab.name}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-colors cursor-pointer outline-none ${
                          isSelected ? 'shadow-md' : 'bg-white/60 hover:bg-white text-slate-700'
                        }`}
                        style={{ backgroundColor: isSelected ? tab.tabColor : 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {/* Dynamic SVG Icon based on type */}
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

                        {/* Calendly's exact curved downward bridge connecting icon into white card with spring glide */}
                        {isSelected && (
                          <motion.div
                            layoutId="dockStemBridge"
                            className="absolute left-1/2 top-full h-[14px] w-[32px] -translate-x-1/2 pointer-events-none z-30"
                            transition={{ type: 'spring', stiffness: 480, damping: 28 }}
                          >
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
                          </motion.div>
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Pure-White Squircle Card */}
            <div className="relative z-10 w-full rounded-[28px] sm:rounded-[36px] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(7,26,49,0.08)] mt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activePersona}-${activeTab.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
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
                      <motion.a
                        href={activeTab.ctaLink}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 border-b-[1.5px] border-slate-900 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-colors cursor-pointer"
                      >
                        <span>{activeTab.ctaText}</span>
                        <ArrowRight size={14} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Right Column: Tinted Mockup Box with Floating White Card */}
                  <div
                    className="lg:col-span-6 rounded-[24px] overflow-hidden min-h-[300px] sm:min-h-[340px] flex items-center justify-center relative transition-colors duration-500"
                    style={{ backgroundColor: activeTab.bgGradient }}
                  >
                    {renderShowcaseMockup(activeTab.mockupType)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 2: 4-STAGE EXPANDING ACCORDION                        */}
        {/* (EXACT REPLICATION FROM SCREENSHOT 3)                         */}
        {/* Book -> Prep -> Capture -> Follow up                          */}
        {/* ============================================================= */}
        <div className="mb-24 sm:mb-32">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-tight">
              meetings, so you have more space for what matters.
            </h3>
          </div>

          {/* 4 Cards Side-by-Side on Desktop */}
          <div className="hidden lg:flex items-stretch gap-4 w-full">
            {currentStory.workflowStages.map((stage, idx) => {
              const isActive = activeStageIdx === idx;

              return (
                <motion.div
                  key={stage.id}
                  layout
                  transition={{ type: 'spring', stiffness: 350, damping: 28, mass: 0.8 }}
                  onClick={() => setActiveStageIdx(idx)}
                  whileHover={{ y: isActive ? 0 : -4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative rounded-[32px] bg-white border border-slate-200/80 shadow-sm transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                    isActive ? 'flex-[2.6] p-8 ring-2 ring-slate-900/5' : 'flex-1 p-6 hover:shadow-md'
                  }`}
                >
                  {/* Card Top Content */}
                  <div>
                    <h4 className="text-2xl font-bold font-['Outfit'] text-slate-900 mb-2">
                      {stage.title}
                    </h4>

                    {/* Resting Teaser */}
                    {!isActive && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {stage.restingTeaser}
                      </p>
                    )}

                    {/* Active Expanded Narrative & Checklist */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4 my-3"
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {stage.narrative}
                        </p>

                        {/* Checklist with circular colored icon badges and vertical connector line */}
                        <div className="space-y-1 py-1">
                          {stage.checklist.map((item, cIdx) => (
                            <React.Fragment key={item.text}>
                              <motion.div
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: cIdx * 0.035, // Complies with physics-no-excessive-stagger (<= 50ms)
                                  duration: 0.25,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="flex items-center gap-3"
                              >
                                <span
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-900 shrink-0 shadow-2xs"
                                  style={{ backgroundColor: item.iconColor }}
                                >
                                  ✓
                                </span>
                                <span className="text-xs text-slate-600 font-medium leading-tight">
                                  {item.text}
                                </span>
                              </motion.div>
                              {cIdx < stage.checklist.length - 1 && (
                                <div className="ml-2.5 h-2 w-[1.5px] bg-slate-200" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Card Bottom Visual Layer (Present on ALL 4 Cards!) */}
                  <div
                    className={`w-full rounded-[24px] overflow-hidden transition-all duration-300 mt-4 relative flex items-center justify-center ${
                      isActive ? 'min-h-[220px] p-4 shadow-inner' : 'h-[140px] p-2'
                    }`}
                    style={{ background: stage.bottomBgGradient }}
                  >
                    {/* Active Glowing Chat Box or Stage Visual */}
                    {isActive ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                        className="w-full h-full rounded-[20px] bg-white p-4 shadow-md flex flex-col justify-between"
                      >
                        {idx === 1 ? (
                          // Prep Stage (Exact match from Calendly Screenshot 3)
                          <>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{stage.bottomCardTitle}</span>
                                </span>
                                {stageChatAnswer && (
                                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                    Answered
                                  </span>
                                )}
                              </div>

                              {stageChatAnswer ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-950 mb-2 leading-relaxed"
                                >
                                  <span className="font-bold block text-[10px] text-amber-700 uppercase mb-0.5 font-mono">
                                    Qalam Intelligence:
                                  </span>
                                  {stageChatAnswer}
                                </motion.div>
                              ) : (
                                <div className="space-y-1.5 text-[10px] text-slate-600 mb-2">
                                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono">
                                    Suggested:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {[
                                      'What’s Acme Co.’s budget?',
                                      'Who are the main stakeholders?',
                                      'What’s the required tech stack?',
                                    ].map((promptText) => (
                                      <motion.button
                                        key={promptText}
                                        type="button"
                                        whileHover={{ scale: 1.04, y: -1 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleStagePromptClick(promptText);
                                        }}
                                        className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium cursor-pointer transition-colors text-left"
                                      >
                                        {promptText}
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Interactive Input Bar */}
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (stageChatInput.trim()) {
                                  handleStagePromptClick(stageChatInput);
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center justify-between p-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] text-slate-500 focus-within:border-blue-400 focus-within:bg-white transition-colors"
                            >
                              <div className="flex items-center gap-2 pl-2 w-full">
                                <Sparkles size={13} className="text-slate-400 shrink-0" />
                                <input
                                  type="text"
                                  value={stageChatInput}
                                  onChange={(e) => setStageChatInput(e.target.value)}
                                  placeholder="Help me prep for my next meeting"
                                  className="w-full bg-transparent text-[11px] text-slate-800 placeholder-slate-400 outline-none"
                                />
                              </div>
                              <motion.button
                                type="submit"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-6 h-6 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-2xs"
                              >
                                <Send size={10} />
                              </motion.button>
                            </form>
                          </>
                        ) : idx === 0 ? (
                          // Stage 0: Book
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-900">{stage.bottomCardTitle}</span>
                                <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
                                  Milestone Locked
                                </span>
                              </div>
                              <div className="space-y-1.5 text-[11px] text-slate-600">
                                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                                  <span>Associate Full Stack Milestone</span>
                                  <span className="font-bold text-blue-600">85+ Benchmark</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono text-center">
                              Diagnostic calibration confirmed
                            </div>
                          </div>
                        ) : idx === 2 ? (
                          // Stage 2: Capture
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-900">{stage.bottomCardTitle}</span>
                                <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">
                                  Verified Artifact
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-slate-900 text-slate-100 font-mono text-[10px] space-y-1">
                                <p className="text-emerald-400">✓ API Architecture Score: 95/100</p>
                                <p className="text-emerald-400">✓ SQL Query Isolation: 91/100</p>
                                <p className="text-emerald-400">✓ Code Maintainability: 88/100</p>
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono text-center">
                              Audit ready in under 60 seconds
                            </div>
                          </div>
                        ) : (
                          // Stage 3: Follow up
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-900">{stage.bottomCardTitle}</span>
                                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                                  Cryptographic Proof
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-950 font-medium">
                                Fast-track offer issued with verified 96% first-year retention confidence.
                              </div>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono text-center">
                              Hiring cycle: 5 business days
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      /* Resting Abstract Silhouette (Exact Match from Calendly Screenshot 3) */
                      <div className="w-full h-full flex flex-col items-center justify-center relative">
                        {idx === 0 && (
                          <svg className="w-20 h-20 text-blue-600/35" viewBox="0 0 100 100" fill="currentColor">
                            <rect x="25" y="25" width="50" height="50" rx="12" />
                            <circle cx="50" cy="50" r="14" fill="#FFFFFF" fillOpacity="0.4" />
                          </svg>
                        )}
                        {idx === 1 && (
                          <svg className="w-20 h-20 text-amber-600/40" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M20,80 C20,40 40,20 60,20 C80,20 90,50 90,80 Z" />
                          </svg>
                        )}
                        {idx === 2 && (
                          <svg className="w-20 h-20 text-purple-600/35" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M30,20 L70,20 C76,20 80,24 80,30 L80,80 L30,80 Z" />
                            <circle cx="45" cy="45" r="10" fill="#FFFFFF" fillOpacity="0.4" />
                          </svg>
                        )}
                        {idx === 3 && (
                          <svg className="w-20 h-20 text-emerald-600/35" viewBox="0 0 100 100" fill="currentColor">
                            <circle cx="50" cy="50" r="30" />
                            <path d="M40,50 L47,57 L62,42" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        )}
                        <span className="text-[10px] font-mono font-semibold text-slate-600/70 tracking-wider uppercase mt-1">
                          Click to expand
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Tablet Fallback with Touch Navigation */}
          <div className="lg:hidden space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {currentStory.workflowStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    activeStageIdx === idx ? 'bg-slate-900 w-6' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to ${stage.title}`}
                />
              ))}
            </div>

            {currentStory.workflowStages.map((stage, idx) => {
              const isActive = activeStageIdx === idx;
              return (
                <motion.div
                  key={stage.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`rounded-[24px] bg-white border transition-all p-6 cursor-pointer ${
                    isActive ? 'border-slate-300 shadow-md ring-1 ring-slate-900/5' : 'border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold font-['Outfit'] text-slate-900">
                      {stage.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{stage.restingTeaser}</p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25 }}
                      className="pt-3 border-t border-slate-100 space-y-4"
                    >
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
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

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
              href="/anatomy"
              className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 hover:border-teal-400 text-teal-800 hover:text-teal-900 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-2xs"
            >
              <span>Physical Anatomy Rig</span>
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
