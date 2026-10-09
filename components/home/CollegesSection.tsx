'use client';

import React from 'react';
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { HairlineFigure } from '@/components/ui/hairline-figure';

export function CollegesSection() {
  return (
    <section
      id="colleges-section"
      className="py-20 px-6 sm:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#edf2f7]"
      aria-label="Colleges and placement teams section"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Placement Cockpit Visual Instrument */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative rounded-2xl border border-[#dce6f2] bg-gradient-to-br from-[#f8fafc] via-white to-[#edf4fc] p-6 sm:p-7 shadow-lg overflow-hidden">
            {/* Cockpit Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#173c6e] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  <Building2 size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2458ae] block">
                    Placement Cockpit
                  </span>
                  <strong className="text-sm text-[#0f172a] font-['Outfit'] block">
                    B.Tech Class of 2027 · Cohort Overview
                  </strong>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" /> Live Analytics
              </span>
            </div>

            {/* 3 Cohort Readiness Metrics */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Enrolled
                </span>
                <div className="text-xl font-bold text-[#173c6e] font-['Outfit']">640</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Total cohort in diagnostic
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Placement Ready
                </span>
                <div className="text-xl font-bold text-[#10b981] font-['Outfit']">78.4%</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  502 students interview-cleared
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
                <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">
                  Readiness Lift
                </span>
                <div className="text-xl font-bold text-[#2458ae] font-['Outfit']">+14.2%</div>
                <p className="text-[10px] text-[#475569] mt-1 leading-snug">
                  Gain after 30-day sprint
                </p>
              </div>
            </div>

            {/* Department Progress Bars & Hairline Figure */}
            <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f1f5f9]">
                <span className="font-semibold text-[#0f172a]">Department Readiness Breakdown</span>
                <span className="text-[10px] text-[#64748b] font-mono">CSE / IT / ECE</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-[#334155] mb-1">
                    <span>Computer Science & Engineering (310)</span>
                    <span className="font-semibold text-[#173c6e]">84% Ready</span>
                  </div>
                  <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#173c6e] h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#334155] mb-1">
                    <span>Information Technology (160)</span>
                    <span className="font-semibold text-[#2458ae]">79% Ready</span>
                  </div>
                  <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#2458ae] h-full rounded-full" style={{ width: '79%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#334155] mb-1">
                    <span>Electronics & Communication (170)</span>
                    <span className="font-semibold text-[#64748b]">71% Ready</span>
                  </div>
                  <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#94a3b8] h-full rounded-full" style={{ width: '71%' }} />
                  </div>
                </div>
              </div>

              {/* Deficit Alert with Hairline Plot */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#b45309] bg-[#fffbeb] p-2.5 rounded-lg border border-[#fef3c7] flex-1">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>Deficit alert: System architecture sprint recommended for ECE.</span>
                </div>
                <div className="w-20 h-16 shrink-0 hidden sm:block">
                  <HairlineFigure figure="plot" interactiveHint intensity={0.7} label="Cohort placement analytics plot" />
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-3 mt-4 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#10b981]" />
                Cohort-level diagnostic transparency
              </span>
              <a href="/colleges" className="font-medium text-[#173c6e] hover:underline">
                View Placement Cockpit ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Copy & Institutional Value */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae] bg-[#edf4fc] px-3 py-1 rounded-full inline-block border border-[#d6e5f8]">
            FOR COLLEGES & PLACEMENT TEAMS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-[1.15]">
            MAKE STUDENT READINESS VISIBLE
          </h2>

          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Eliminate late placement-season uncertainty. Gain department-wide diagnostic visibility,
            track cohort skill gaps before drives begin, and connect job-ready students with tier-1
            recruitment partners.
          </p>

          {/* 4 Placement Advantage Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <BarChart3 size={15} className="text-[#2458ae]" />
                <span>Pre-Season Visibility</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Know exact cohort preparedness months in advance rather than guessing in October.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <AlertCircle size={15} className="text-[#2458ae]" />
                <span>Deficit Diagnostics</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Spot specific gaps in DSA, SQL, or communication across departments early.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <TrendingUp size={15} className="text-[#2458ae]" />
                <span>Intervention Sprints</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Deploy 30-day guided acceleration tracks to lift readiness percentages by double digits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173c6e] mb-1.5">
                <CheckCircle2 size={15} className="text-[#2458ae]" />
                <span>Recruiter Alignment</span>
              </div>
              <p className="text-xs text-[#475569] leading-normal">
                Share defensible technical proof with hiring partners to speed up campus offers.
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="pt-4">
            <a
              href="/colleges"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#173c6e] hover:bg-[#1f4a86] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg group"
            >
              <span>Explore for Colleges</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
