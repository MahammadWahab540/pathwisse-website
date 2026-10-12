'use client';

import React, { useState } from 'react';
import {
  Compass,
  FileCode2,
  ShieldCheck,
  Users2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GitPullRequest,
  Check,
  Terminal,
} from 'lucide-react';

interface JourneyStep {
  step: string;
  title: string;
  description: string;
  accent: {
    color: string;
    border: string;
    glow: string;
    bg: string;
    iconColor: string;
    badgeBg: string;
  };
  icon: React.ComponentType<{ size?: number; className?: string }>;
  interactivePreview: {
    badge: string;
    heading: string;
    details: string;
    deliverable: string;
    metrics: { label: string; value: string }[];
  };
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Learn',
    description: 'Follow personalised roadmaps and build skills.',
    accent: {
      color: '#3B82F6',
      border: 'border-blue-200',
      glow: 'rgba(59, 130, 246, 0.25)',
      bg: 'bg-blue-50/70',
      iconColor: 'text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-700',
    },
    icon: Compass,
    interactivePreview: {
      badge: 'PHASE 01 // CALIBRATION',
      heading: 'Personalized Skill Roadmaps Grounded in Production Standards',
      details:
        'Instead of generic video playlists, follow adaptive learning milestones mapped directly to actual engineering team hiring rubrics.',
      deliverable: 'Core systems foundations, API contract design, relational query optimization.',
      metrics: [
        { label: 'Role Alignment', value: '96%' },
        { label: 'Curated Modules', value: '18 Sprints' },
      ],
    },
  },
  {
    step: '02',
    title: 'Build',
    description: 'Work on real projects with AI guidance.',
    accent: {
      color: '#A855F7',
      border: 'border-purple-200',
      glow: 'rgba(168, 85, 247, 0.25)',
      bg: 'bg-purple-50/70',
      iconColor: 'text-purple-600',
      badgeBg: 'bg-purple-100 text-purple-700',
    },
    icon: FileCode2,
    interactivePreview: {
      badge: 'PHASE 02 // REAL ARTIFACTS',
      heading: 'Production-Grade Projects Built With Inspectable Code Trees',
      details:
        'Build scalable microservices and full-stack applications with automated linter feedback, architecture trade-off memos, and real pull requests.',
      deliverable: 'Redis-backed asynchronous queue, rate limiting middleware, clean database migrations.',
      metrics: [
        { label: 'Test Coverage', value: '94%+' },
        { label: 'Real PR Reviews', value: 'Automated + Peer' },
      ],
    },
  },
  {
    step: '03',
    title: 'Verify',
    description: 'Showcase your work and get verified.',
    accent: {
      color: '#F59E0B',
      border: 'border-amber-200',
      glow: 'rgba(245, 158, 11, 0.25)',
      bg: 'bg-amber-50/70',
      iconColor: 'text-amber-600',
      badgeBg: 'bg-amber-100 text-amber-700',
    },
    icon: ShieldCheck,
    interactivePreview: {
      badge: 'PHASE 03 // EVIDENCE DOSSIER',
      heading: 'Cryptographically Verified Capability Dossier',
      details:
        'Automated test suites and engineering rubrics verify your code quality, architecture choices, and problem-solving depth under realistic constraints.',
      deliverable: 'Inspectable proof ledger containing test suite reports, architectural memos, and rubric scores.',
      metrics: [
        { label: 'Verification Audit', value: '100% Code-Level' },
        { label: 'Pass Rate', value: '24/24 Tests Passing' },
      ],
    },
  },
  {
    step: '04',
    title: 'Connect',
    description: 'Get matched with colleges, companies and opportunities.',
    accent: {
      color: '#14B8A6',
      border: 'border-teal-200',
      glow: 'rgba(20, 184, 166, 0.25)',
      bg: 'bg-teal-50/70',
      iconColor: 'text-teal-600',
      badgeBg: 'bg-teal-100 text-teal-700',
    },
    icon: Users2,
    interactivePreview: {
      badge: 'PHASE 04 // UNMEDIATED ACCESS',
      heading: 'Direct Discovery by Recruiters and Placement Deans',
      details:
        'Bypass résumé spam filters. Companies filter and discover your talent directly through verifiable proof of work and live candidate dossiers.',
      deliverable: 'Immediate visibility across hiring pipelines and institutional placement audits.',
      metrics: [
        { label: 'Interview Conversion', value: '3.8x Lift' },
        { label: 'Time to Shortlist', value: '< 48 Hours' },
      ],
    },
  },
];

export function HowItWorksJourney() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <section
      id="how-it-works"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-teal-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          How It Works
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-slate-900 leading-[1.14]">
          From learning to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            opportunities.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 leading-relaxed">
          Pathwisse turns your skills into real work and career opportunities.
        </p>
      </div>

      {/* 4-Step Interactive Horizontal Journey Rail */}
      <div className="relative mb-12 sm:mb-16">
        {/* Desktop Curved Gradient Line */}
        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2.5px] -z-0">
          <svg className="w-full h-10 overflow-visible" viewBox="0 0 1000 40" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#A855F7" stopOpacity="0.8" />
                <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,20 Q 250,5 500,20 T 1000,20"
              stroke="url(#journeyGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 4"
              className="opacity-70"
            />
          </svg>
        </div>

        {/* 4 Glassmorphic Milestone Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStepIndex === idx;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`relative flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 text-left cursor-pointer group ${
                  isSelected
                    ? 'bg-white shadow-[0_16px_36px_rgba(0,0,0,0.08)] ring-2 ring-slate-900/10 -translate-y-1'
                    : 'bg-white/60 hover:bg-white/90 hover:shadow-md hover:-translate-y-0.5'
                } border border-slate-200/70 backdrop-blur-sm`}
              >
                {/* Step Number Pill */}
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors mb-3">
                  {item.step}
                </span>

                {/* Glassmorphic Circular Icon */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 relative mb-4 ${
                    isSelected ? 'scale-110 shadow-lg' : 'group-hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'white' : 'rgba(255, 255, 255, 0.85)',
                    border: `2px solid ${isSelected ? item.accent.color : 'rgba(226, 232, 240, 0.8)'}`,
                    boxShadow: isSelected
                      ? `0 0 24px ${item.accent.glow}, 0 4px 12px rgba(0,0,0,0.06)`
                      : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <Icon
                    size={26}
                    className={`transition-colors duration-300 ${isSelected ? item.accent.iconColor : 'text-slate-600 group-hover:text-slate-900'}`}
                  />
                  {isSelected && (
                    <span
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
                      style={{ backgroundColor: item.accent.color }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>

                {/* Milestone Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed text-center">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Stage Preview / Deep-Dive Panel (No modal, smooth in-page expansion) */}
      <div className="relative bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 overflow-hidden transition-all duration-500">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: activeStep.accent.color }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Phase Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeStep.accent.color }}
              />
              {activeStep.interactivePreview.badge}
            </div>

            <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
              {activeStep.interactivePreview.heading}
            </h4>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              {activeStep.interactivePreview.details}
            </p>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Verified Deliverables & Artifacts:
              </span>
              <p className="text-sm font-mono text-emerald-400">
                {activeStep.interactivePreview.deliverable}
              </p>
            </div>
          </div>

          {/* Right: Telemetry & Benchmark Metrics */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {activeStep.interactivePreview.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 text-center"
                >
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white block mb-1">
                    {metric.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-xs text-slate-400">
              <span>Explore full pipeline rubric</span>
              <span
                className="font-medium cursor-pointer flex items-center gap-1 hover:underline"
                style={{ color: activeStep.accent.color }}
                onClick={() => {
                  const nextIdx = (activeStepIndex + 1) % JOURNEY_STEPS.length;
                  setActiveStepIndex(nextIdx);
                }}
              >
                Next milestone →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
