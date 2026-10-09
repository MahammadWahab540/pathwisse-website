'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  BriefcaseBusiness,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { HairlineFigure, type HairlineFigureName } from '@/components/ui/hairline-figure';

type EcosystemRole = 'students' | 'colleges' | 'companies';

interface RoleContent {
  id: EcosystemRole;
  title: string;
  badge: string;
  targetLink: string;
  linkLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  figure: HairlineFigureName;
  figureLabel: string;
  decisionHeadline: string;
  decisionDescription: string;
  capabilityInput: string;
  systemAction: string;
  tangibleOutcome: string;
  metricValue: string;
  metricLabel: string;
}

const ROLES: Record<EcosystemRole, RoleContent> = {
  students: {
    id: 'students',
    title: 'Students & Learners',
    badge: 'STUDENT PATHWAY',
    targetLink: '/students',
    linkLabel: 'Explore Student Experience',
    icon: GraduationCap,
    figure: 'branches',
    figureLabel: 'Student project commit & branch flow',
    decisionHeadline: 'What should I build and prove next?',
    decisionDescription:
      'Students turn raw curiosity and course assignments into defensible technical projects with inspectable pull requests and architecture memos.',
    capabilityInput: 'Course assignments, SQL drills, full-stack code commits',
    systemAction: 'Automated test suite evaluation, complexity checks & trade-off review',
    tangibleOutcome: 'Verified Skill Passport with 94/100 pass rate and deployable repository',
    metricValue: '94%',
    metricLabel: 'verified artifact audit rate',
  },
  colleges: {
    id: 'colleges',
    title: 'Colleges & Placement',
    badge: 'INSTITUTIONAL COHORT',
    targetLink: '/colleges',
    linkLabel: 'Explore College Solutions',
    icon: Users,
    figure: 'plot',
    figureLabel: 'Cohort placement analytics plot',
    decisionHeadline: 'Who is placement-ready and who needs targeted support?',
    decisionDescription:
      'Placement directors and deans gain continuous visibility across entire engineering cohorts months before recruitment drives begin.',
    capabilityInput: 'Department-wide cohort practice metrics and milestone completions',
    systemAction: 'Cross-branch deficit diagnostics in DSA, SQL, and system design',
    tangibleOutcome: 'Actionable sprint interventions with +14.2% cohort readiness lift',
    metricValue: '+14.2%',
    metricLabel: 'placement readiness lift post-sprints',
  },
  companies: {
    id: 'companies',
    title: 'Enterprises & Hiring Teams',
    badge: 'TALENT INTELLIGENCE',
    targetLink: '/enterprise',
    linkLabel: 'Explore Enterprise Solutions',
    icon: BriefcaseBusiness,
    figure: 'vault',
    figureLabel: 'Candidate proof verification vault',
    decisionHeadline: 'Who can actually do the work from day one?',
    decisionDescription:
      'Engineering leaders discover candidates through demonstrated problem-solving, architectural decision logs, and verified code repositories.',
    capabilityInput: 'Target engineering benchmarks and role performance rubrics',
    systemAction: 'Code-level audit of distributed systems, concurrency, and schema design',
    tangibleOutcome: 'Defensible candidate shortlists delivered in under 48 hours',
    metricValue: '< 48h',
    metricLabel: 'average time to verified shortlist',
  },
};

export function EcosystemSection() {
  const [activeRole, setActiveRole] = useState<EcosystemRole>('students');
  const role = ROLES[activeRole];

  return (
    <section
      id="ecosystem"
      className="relative py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Three-sided capability ecosystem"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-14 text-center sm:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae] bg-[#edf4fc] px-3 py-1 rounded-full inline-block mb-3 border border-[#d6e5f8]">
          THE THREE-SIDED CAPABILITY LAYER
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-[#0f172a] leading-[1.15]">
          Three Views. One Shared Capability Layer.
        </h2>
        <p className="text-base sm:text-lg text-[#334155] mt-4 leading-relaxed max-w-2xl">
          The same evidence layer powers three distinct decisions: students know what to learn next,
          colleges know who is ready and who needs support, and enterprises hire with defensible proof.
        </p>
      </div>

      {/* Interactive 3-way Role Switcher */}
      <div
        className="flex flex-wrap gap-2.5 p-1.5 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] max-w-xl mb-10"
        role="tablist"
        aria-label="Ecosystem audience perspectives"
      >
        {(['students', 'colleges', 'companies'] as EcosystemRole[]).map((key) => {
          const item = ROLES[key];
          const Icon = item.icon;
          const isSelected = activeRole === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveRole(key)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#173c6e] shadow-sm border border-[#cbd5e1]'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/50'
              }`}
            >
              <Icon size={16} className={isSelected ? 'text-[#2458ae]' : 'text-[#94a3b8]'} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Ecosystem Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive Story & Decision Details */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#dce6f2] bg-white p-7 sm:p-9 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae]">
                {role.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#10b981] bg-[#ecfdf5] px-2.5 py-1 rounded-full border border-[#a7f3d0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Live Ecosystem State
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-snug">
              {role.decisionHeadline}
            </h3>

            <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
              {role.decisionDescription}
            </p>

            {/* 3-Step Data Flow Breakdown */}
            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                  <GitPullRequest size={14} className="text-[#2458ae]" />
                  <span>1. Input to Capability Layer</span>
                </div>
                <p className="text-sm text-[#1e293b] font-medium">{role.capabilityInput}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f9ff] border border-[#bae6fd]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0369a1] uppercase tracking-wider mb-1">
                  <ShieldCheck size={14} className="text-[#0284c7]" />
                  <span>2. Shared System Evaluation</span>
                </div>
                <p className="text-sm text-[#0c4a6e] font-medium">{role.systemAction}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                  <CheckCircle2 size={14} className="text-[#10b981]" />
                  <span>3. Verifiable Decision Output</span>
                </div>
                <p className="text-sm text-[#1e293b] font-medium">{role.tangibleOutcome}</p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-8 mt-8 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-4">
            <a
              href={role.targetLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173c6e] hover:bg-[#1f4a86] text-white text-sm font-semibold transition-all shadow-xs"
            >
              <span>{role.linkLabel}</span>
              <ArrowRight size={15} />
            </a>

            <div className="flex items-center gap-2 text-xs text-[#64748b]">
              <TrendingUp size={14} className="text-[#2458ae]" />
              <span>Grounded in applied engineering artifacts</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hairline Isometric Visual & Signal Stat */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#dce6f2] bg-gradient-to-br from-[#f8fafc] via-white to-[#edf4fc] p-7 sm:p-9 shadow-sm relative overflow-hidden">
          {/* Top Metric Indicator */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748b] block mb-1">
                Ecosystem Metric
              </span>
              <div className="text-4xl font-extrabold font-['Outfit'] text-[#173c6e]">
                {role.metricValue}
              </div>
              <p className="text-xs text-[#475569] mt-1">{role.metricLabel}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#e2e8f0] flex items-center justify-center text-[#173c6e] font-bold text-xs">
              PW
            </div>
          </div>

          {/* Hairline Isometric Figure Display */}
          <div className="my-8 flex flex-col items-center justify-center">
            <div className="w-48 h-36 sm:w-56 sm:h-44 flex items-center justify-center">
              <HairlineFigure
                figure={role.figure}
                interactiveHint
                intensity={0.7}
                label={role.figureLabel}
              />
            </div>
            <span className="text-[11px] font-mono text-[#64748b] mt-3">
              Hover to interact with capability physics
            </span>
          </div>

          {/* Bottom Trust Note */}
          <div className="pt-4 border-t border-[#e2e8f0] text-xs text-[#64748b] flex items-center justify-between">
            <span>Verified System Signal</span>
            <span className="font-semibold text-[#173c6e]">Pathwisse Core Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
}
