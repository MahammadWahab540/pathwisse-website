'use client';

import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Terminal,
  FileCode2,
  Compass,
} from 'lucide-react';
import { HairlineFigure } from '@/components/ui/hairline-figure';

export function StudentsSection() {
  return (
    <section
      id="students-section"
      className="py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#edf2f7]"
      aria-label="Students capability section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative Copy & Value Points */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae] bg-[#edf4fc] px-3 py-1 rounded-full inline-block border border-[#d6e5f8]">
            FOR STUDENTS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.15]">
            BUILD CAPABILITIES YOU CAN PROVE
          </h2>

          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Move beyond generic course certificates. Follow structured role roadmaps, solve real
            engineering briefs, and build inspectable project portfolios that hiring managers can audit in
            60 seconds.
          </p>

          {/* 4 Applied Capability Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <Compass size={15} className="text-[#2458ae]" />
                <span>Career Direction</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Audit strengths with Career Voice and select high-demand role targets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <Terminal size={15} className="text-[#2458ae]" />
                <span>Deliberate Practice</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                SQL workbenches, code drills, and algorithmic optimization exercises.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <FileCode2 size={15} className="text-[#2458ae]" />
                <span>Production Briefs</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Build full-stack architectures with written technical decision memos.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <GitBranch size={15} className="text-[#2458ae]" />
                <span>Verified Evidence</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Immutable GitHub PR history and cryptographically checkable passports.
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <a
              href="/students"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#173c6e] hover:bg-[#1f4a86] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg group"
            >
              <span>Explore for Students</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Verified Skill Passport Visual Instrument */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl border border-[#dce6f2] bg-gradient-to-br from-[#f8fafc] via-white to-[#edf4fc] p-6 sm:p-7 shadow-lg overflow-hidden">
            {/* Header of Dossier */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#173c6e] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  AK
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2458ae] block">
                    Verified Skill Passport
                  </span>
                  <strong className="text-sm text-[#0f172a] font-['Outfit'] block">
                    Aravind Kumar · Full-Stack Engineer
                  </strong>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> Verified Evidence
              </span>
            </div>

            {/* 3 Outcome Metric Indicators */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Algorithmic
                </span>
                <div className="text-xl font-bold text-[#173c6e] font-['Outfit']">
                  94<span className="text-xs text-[#64748b] font-normal">/100</span>
                </div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Automated test suite pass rate
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Architecture
                </span>
                <div className="text-xl font-bold text-[#2458ae] font-['Outfit']">Top 5%</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Modular API design & schema
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Projects
                </span>
                <div className="text-xl font-bold text-[#0f172a] font-['Outfit']">4 Shipped</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Inspectable GitHub repositories
                </p>
              </div>
            </div>

            {/* Shipped Artifact Trail with Hairline Figure */}
            <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0f172a] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2458ae]" /> Distributed Task Queue
                </span>
                <span className="text-[10px] text-[#64748b] font-mono">PR #42 · Merged</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-xs text-[#475569] leading-relaxed flex-1">
                  Architected Redis-backed async job worker with exponential backoff and dead-letter queues. Complete test coverage across 24 edge cases.
                </p>
                <div className="w-24 h-20 shrink-0 hidden sm:block">
                  <HairlineFigure figure="elevator" interactiveHint intensity={0.7} label="Student milestone progression" />
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-3 mt-4 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#10b981]" />
                Audited against senior engineering standards
              </span>
              <a href="/students" className="font-medium text-[#173c6e] hover:underline">
                Inspect Student Pathway ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
