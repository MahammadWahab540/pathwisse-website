'use client';

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileCheck2,
  Cpu,
} from 'lucide-react';
import { HairlineFigure } from '@/components/ui/hairline-figure';

export function CompaniesSection() {
  return (
    <section
      id="companies-section"
      className="py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#edf2f7]"
      aria-label="Enterprises and hiring teams section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative Copy & Enterprise Advantages */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae] bg-[#edf4fc] px-3 py-1 rounded-full inline-block border border-[#d6e5f8]">
            FOR ENTERPRISES & HIRING TEAMS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.15]">
            DISCOVER TALENT THROUGH DEMONSTRATED CAPABILITY
          </h2>

          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Résumés are uncalibrated claims; coding tests reward memorization. Evaluate early-career
            talent through authentic code architectures, technical decision memos, and verified
            readiness signals.
          </p>

          {/* 4 Hiring Intelligence Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <FileCheck2 size={15} className="text-[#2458ae]" />
                <span>Code-Level Proof</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Inspect real GitHub PRs, system designs, and test suites instead of self-reported CV bullet points.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <Clock size={15} className="text-[#2458ae]" />
                <span>Shortlist in &lt; 48 Hours</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Skip filtering 1,000 uncalibrated applicants; receive pre-qualified candidates who meet your bar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <Cpu size={15} className="text-[#2458ae]" />
                <span>Role-Fit Calibration</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Every candidate is benchmarked against real production engineering stacks and technical trade-offs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <ShieldCheck size={15} className="text-[#2458ae]" />
                <span>Zero Resume Spam</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Verified candidate dossiers provide defensible evaluation evidence for hiring managers and committees.
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <a
              href="/enterprise"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#173c6e] hover:bg-[#1f4a86] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg group"
            >
              <span>Explore for Companies</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Candidate Evidence Dossier Visual Instrument */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl border border-[#dce6f2] bg-gradient-to-br from-[#f8fafc] via-white to-[#edf4fc] p-6 sm:p-7 shadow-lg overflow-hidden">
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#173c6e] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  AK
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2458ae] block">
                    Candidate Evidence Dossier
                  </span>
                  <strong className="text-sm text-[#0f172a] font-['Outfit'] block">
                    Ananya K. · Full Stack Engineer Candidate
                  </strong>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> 94% Role Match
              </span>
            </div>

            {/* 3 Technical Evaluation Dimensions */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Architecture
                </span>
                <div className="text-xl font-bold text-[#173c6e] font-['Outfit']">94th %ile</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Strict types & clean separation
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Concurrency
                </span>
                <div className="text-xl font-bold text-[#2458ae] font-['Outfit']">Top 6%</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Redis queue with backoff logic
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Decisions
                </span>
                <div className="text-xl font-bold text-[#0f172a] font-['Outfit']">Audited</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Documented scalability memo
                </p>
              </div>
            </div>

            {/* Inspected Technical Artifact & Hairline Loupe */}
            <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0f172a] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2458ae]" /> Distributed Task Queue Worker
                </span>
                <span className="text-[10px] text-[#64748b] font-mono">24/24 Tests Passed</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-xs text-[#475569] leading-relaxed flex-1">
                  Engineered asynchronous task execution pipeline with Redis persistence, idempotency keys, and automated dead-letter retries. Complete benchmark coverage.
                </p>
                <div className="w-24 h-20 shrink-0 hidden sm:block">
                  <HairlineFigure figure="loupe" interactiveHint intensity={0.65} label="Technical candidate inspection" />
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-3 mt-4 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#10b981]" />
                Zero guesswork hiring signals
              </span>
              <a href="/enterprise" className="font-medium text-[#173c6e] hover:underline">
                Explore Talent Intelligence ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
