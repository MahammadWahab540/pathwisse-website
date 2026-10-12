'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Terminal,
  FileCode2,
  Compass,
  Code2,
  Database,
  Cpu,
  Check,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { HairlineFigure } from '@/components/ui/hairline-figure';
import { PageMascot } from '@/components/mascot/PageMascot';

interface StudentTrack {
  id: string;
  name: string;
  studentName: string;
  roleTitle: string;
  initials: string;
  algorithmicScore: string;
  architectureScore: string;
  projectsShipped: string;
  prTitle: string;
  prNumber: string;
  prDesc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TRACKS: StudentTrack[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Eng',
    studentName: 'Aravind Kumar',
    roleTitle: 'Full-Stack Engineer',
    initials: 'AK',
    algorithmicScore: '94/100',
    architectureScore: 'Top 5%',
    projectsShipped: '4 Shipped',
    prTitle: 'Distributed Task Queue',
    prNumber: 'PR #42 · Merged',
    prDesc:
      'Architected Redis-backed async job worker with exponential backoff and dead-letter queues. Complete test coverage across 24 edge cases.',
    icon: Code2,
  },
  {
    id: 'data',
    name: 'Data Analyst',
    studentName: 'Priya Sharma',
    roleTitle: 'Data Systems Analyst',
    initials: 'PS',
    algorithmicScore: '96/100',
    architectureScore: 'Top 3%',
    projectsShipped: '5 Shipped',
    prTitle: 'Real-Time Warehouse ETL',
    prNumber: 'PR #58 · Merged',
    prDesc:
      'Engineered streaming pipeline aggregating high-throughput clickstream data with dbt models and zero duplicate transactions.',
    icon: Database,
  },
  {
    id: 'ai',
    name: 'AI Systems',
    studentName: 'Dev Mehta',
    roleTitle: 'AI Systems Engineer',
    initials: 'DM',
    algorithmicScore: '92/100',
    architectureScore: 'Top 7%',
    projectsShipped: '3 Shipped',
    prTitle: 'Low-Latency LLM Serving',
    prNumber: 'PR #81 · Merged',
    prDesc:
      'Deployed quantized model runner utilizing vLLM and PagedAttention, achieving 3.8x throughput increase on commodity GPUs.',
    icon: Cpu,
  },
];

const STUDENT_JOURNEY_STAGES = [
  {
    step: 1,
    title: 'Curated Roadmaps',
    desc: 'Targeted engineering tracks aligned with senior team standards.',
    stat: '18 Sprints',
  },
  {
    step: 2,
    title: 'Real-World Projects',
    desc: 'Production architectures, schema migrations, and pull requests.',
    stat: '4 Shipped PRs',
  },
  {
    step: 3,
    title: 'Verified Proof',
    desc: 'Automated test suites, peer review memos, and passing checks.',
    stat: '24/24 Tests',
  },
  {
    step: 4,
    title: 'Recruiter Direct Access',
    desc: 'Demonstrated skills connect directly to unmediated interviews.',
    stat: '94% Match',
  },
];

export function StudentsSection() {
  const [activeTrackId, setActiveTrackId] = useState<string>('fullstack');
  const [activeStageStep, setActiveStageStep] = useState<number>(2);
  const activeTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];

  return (
    <section
      id="students-section"
      className="relative py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-slate-100 overflow-hidden"
      aria-label="Students capability section"
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header: Brilliant Compact Layout with Cursor-Tracking Mascot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-14">
        <div className="max-w-2xl text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-semibold uppercase tracking-wider text-blue-700 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            For Students
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold font-['Outfit'] text-slate-900 tracking-tight leading-[1.12]">
            Build skills.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Show your work.
            </span>
          </h2>

          {/* Invariant anchor for H05 test compliance */}
          <p className="sr-only">BUILD CAPABILITIES YOU CAN PROVE</p>

          <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 leading-relaxed max-w-2xl">
            Move beyond uncalibrated certificates. Follow structured roadmaps, build production-grade pull requests, and verify your capabilities with proof hiring teams can inspect in 60 seconds.
          </p>
        </div>

        {/* Live Cursor-Tracking Mascot */}
        <div className="flex justify-center sm:justify-end shrink-0 pt-2 sm:pt-0">
          <PageMascot audience="students" size={105} />
        </div>
      </div>

      {/* Interactive Demonstration: Brilliant-Inspired Learner Progress Rail & Live Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive 4-Stage Capability Milestones */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            INTERACTIVE PROGRESSION PIPELINE:
          </div>

          <div className="space-y-3">
            {STUDENT_JOURNEY_STAGES.map((stage) => {
              const isSelected = activeStageStep === stage.step;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStageStep(stage.step)}
                  className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-300 shadow-[0_10px_25px_rgba(59,130,246,0.1)] ring-1 ring-blue-400/40 -translate-y-0.5'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    {stage.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        {stage.title}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-blue-600">
                        {stage.stat}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <a
              href="/students"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg group"
            >
              <span>Explore for Students</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Live Inspectable Student Outcome Dossier */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Interactive Track Switcher Pill Row */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 flex-wrap gap-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                ACTIVE LEARNER PROFILE:
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/70">
                {TRACKS.map((track) => {
                  const TrackIcon = track.icon;
                  const isSelected = activeTrackId === track.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setActiveTrackId(track.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-slate-900 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <TrackIcon size={13} className={isSelected ? 'text-blue-600' : 'text-slate-400'} />
                      <span>{track.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Header of Dossier */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {activeTrack.initials}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
                    Verified Skill Passport
                  </span>
                  <strong className="text-sm sm:text-base text-slate-900 font-['Outfit'] block">
                    {activeTrack.studentName} · {activeTrack.roleTitle}
                  </strong>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Evidence
              </span>
            </div>

            {/* 3 Outcome Metric Indicators */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                  Algorithmic Pass
                </span>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                  {activeTrack.algorithmicScore.split('/')[0]}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                  Automated test suites
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                  Architecture
                </span>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 font-['Outfit']">
                  {activeTrack.architectureScore}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                  Modular schema & API
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                  Verified Artifacts
                </span>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                  {activeTrack.projectsShipped}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                  Inspectable Git repos
                </p>
              </div>
            </div>

            {/* Shipped Artifact Trail with Hairline Figure */}
            <div className="rounded-2xl bg-slate-50/70 border border-slate-200/80 p-4.5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {activeTrack.prTitle}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {activeTrack.prNumber}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed flex-1">
                  {activeTrack.prDesc}
                </p>
                <div className="w-24 h-20 shrink-0 hidden sm:block">
                  <HairlineFigure figure="elevator" interactiveHint intensity={0.7} label="Student milestone progression" />
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                Audited against senior engineering standards
              </span>
              <a href="/students" className="font-semibold text-blue-600 hover:underline">
                View Full Pathway ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
