'use client';

import React from 'react';
import {
  ShieldCheck,
  Target,
  Sparkles,
  GitCommit,
  CheckCircle2,
  Clock,
  Activity,
} from 'lucide-react';

export function TrustProofSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Evidence-Led',
      description:
        'Signals are derived from real Git commits, test suite coverage, and technical architectural trade-offs.',
      detail: '100% inspectable code repositories without proxy metrics.',
    },
    {
      icon: Target,
      title: 'Actionable Diagnostics',
      description:
        'Every score highlights immediate, measurable next steps for students, educators, and institutions.',
      detail: 'Clear 30-day sprints rather than vague percentage numbers.',
    },
    {
      icon: Sparkles,
      title: 'AI-Assisted Guidance',
      description:
        'Intelligent analysis augments human review without replacing engineering rigor or human judgment.',
      detail: 'Deep syntax and complexity evaluation with human rubric parity.',
    },
  ];

  const metrics = [
    {
      icon: GitCommit,
      stat: '100%',
      label: 'Code-Level Audits',
      sub: 'Direct GitHub PR & commit inspection',
    },
    {
      icon: CheckCircle2,
      stat: '0',
      label: 'Fabricated Credentials',
      sub: 'Real project execution, not video completion',
    },
    {
      icon: Clock,
      stat: '< 60s',
      label: 'Recruiter Audit Time',
      sub: 'Defensible technical dossiers ready for review',
    },
    {
      icon: Activity,
      stat: 'Pre-Season',
      label: 'Continuous Readiness Tracking',
      sub: 'Early cohort deficit detection before drives',
    },
  ];

  return (
    <section
      id="trust-section"
      className="py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#edf2f7]"
      aria-label="Trust and authentic verification section"
    >
      <div className="max-w-3xl mb-14 text-center sm:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae] bg-[#edf4fc] px-3 py-1 rounded-full inline-block mb-3 border border-[#d6e5f8]">
          AUTHENTIC VERIFICATION
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] tracking-tight text-[#0f172a] leading-[1.15]">
          Signals grounded in applied work, not marketing claims.
        </h2>
        <p className="text-base sm:text-lg text-[#334155] mt-4 leading-relaxed max-w-2xl">
          We do not fabricate partner logos or inflate placement claims. Every Pathwisse signal is
          built directly on inspectable code commits, verified project execution, and transparent
          diagnostic rubrics.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="p-7 rounded-2xl bg-white border border-[#dce6f2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#edf4fc] text-[#2458ae] flex items-center justify-center mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold font-['Outfit'] text-[#0f172a] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#f1f5f9] text-xs font-medium text-[#173c6e]">
                {pillar.detail}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Authentic Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="p-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#64748b] mb-1">
                <Icon size={14} className="text-[#2458ae]" />
                <span className="truncate">{m.label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#173c6e]">
                {m.stat}
              </div>
              <p className="text-xs text-[#64748b] mt-1">{m.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
