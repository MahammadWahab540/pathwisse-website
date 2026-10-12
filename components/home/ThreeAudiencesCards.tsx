'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  BarChart2,
  Check,
  Sparkles,
} from 'lucide-react';

interface AudienceCardData {
  id: 'students' | 'colleges' | 'companies';
  title: string;
  description: string;
  href: string;
  accent: {
    border: string;
    bg: string;
    glow: string;
    buttonBg: string;
    badgeBg: string;
    iconColor: string;
  };
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export function ThreeAudiencesCards() {
  const [activeAudience, setActiveAudience] = useState<'students' | 'colleges' | 'companies'>('students');

  return (
    <section
      id="audiences"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-slate-100"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          One Network. Three Audiences.
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-slate-900 leading-[1.14]">
          Built for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            students, colleges and companies.
          </span>
        </h2>
      </div>

      {/* 3 Interactive Cards matching the Reference Design */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* CARD 1: For Students */}
        <div
          onClick={() => setActiveAudience('students')}
          className={`relative group rounded-3xl p-7 bg-gradient-to-b from-blue-50/40 to-white/90 border transition-all duration-300 flex flex-col justify-between ${
            activeAudience === 'students'
              ? 'border-blue-300 shadow-[0_16px_36px_rgba(59,130,246,0.12)] ring-1 ring-blue-400/40 -translate-y-1'
              : 'border-slate-200/80 hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          <div>
            {/* Audience Icon */}
            <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
              <GraduationCap size={20} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              For Students
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Build skills, create real projects, and get discovered.
            </p>
          </div>

          {/* Visual Mini Mockup: Step Stack (Learn, Build, Verify, Get Hired) */}
          <div className="relative my-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80 backdrop-blur-sm overflow-hidden">
            <div className="space-y-2">
              {[
                { label: 'Learn', active: true },
                { label: 'Build', active: true },
                { label: 'Verify', active: true },
                { label: 'Get Hired', active: false },
              ].map((step, idx) => (
                <div
                  key={step.label}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    idx === 2
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white/80 text-slate-700 border border-slate-200/60'
                  }`}
                >
                  <span>{step.label}</span>
                  {idx < 3 ? (
                    <Check size={13} className={idx === 2 ? 'text-white' : 'text-blue-500'} strokeWidth={2.5} />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA Button */}
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
              Explore student journey
            </span>
            <Link
              href="/students"
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-blue-500/20"
              aria-label="Explore For Students"
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* CARD 2: For Colleges */}
        <div
          onClick={() => setActiveAudience('colleges')}
          className={`relative group rounded-3xl p-7 bg-gradient-to-b from-amber-50/40 to-white/90 border transition-all duration-300 flex flex-col justify-between ${
            activeAudience === 'colleges'
              ? 'border-amber-300 shadow-[0_16px_36px_rgba(245,158,11,0.12)] ring-1 ring-amber-400/40 -translate-y-1'
              : 'border-slate-200/80 hover:border-amber-200 hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          <div>
            {/* Audience Icon */}
            <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
              <Building2 size={20} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              For Colleges
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Develop student capabilities and showcase outcomes.
            </p>
          </div>

          {/* Visual Mini Mockup: Cohort Dashboard & Student Avatars */}
          <div className="relative my-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/40">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-200/80 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                  640
                </div>
                <span className="text-xs font-semibold text-slate-800">Engineering Cohort</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-600">+14.2% lift</span>
            </div>

            {/* Growth Bar Chart Visual */}
            <div className="flex items-end gap-2 h-16 pt-2 px-1">
              {[
                { height: '45%', label: 'DSA' },
                { height: '65%', label: 'SQL' },
                { height: '84%', label: 'FullStack', active: true },
                { height: '61%', label: 'AI' },
              ].map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      bar.active ? 'bg-amber-500' : 'bg-amber-200/70'
                    }`}
                    style={{ height: bar.height }}
                  />
                  <span className="text-[9px] text-slate-500 font-medium truncate w-full text-center">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA Button */}
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 group-hover:text-amber-600 transition-colors">
              Explore college solutions
            </span>
            <Link
              href="/colleges"
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-amber-500/20"
              aria-label="Explore For Colleges"
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* CARD 3: For Companies */}
        <div
          onClick={() => setActiveAudience('companies')}
          className={`relative group rounded-3xl p-7 bg-gradient-to-b from-teal-50/40 to-white/90 border transition-all duration-300 flex flex-col justify-between ${
            activeAudience === 'companies'
              ? 'border-teal-300 shadow-[0_16px_36px_rgba(20,184,166,0.12)] ring-1 ring-teal-400/40 -translate-y-1'
              : 'border-slate-200/80 hover:border-teal-200 hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          <div>
            {/* Audience Icon */}
            <div className="w-10 h-10 rounded-2xl bg-teal-100/80 text-teal-600 flex items-center justify-center mb-6 shadow-sm">
              <Briefcase size={20} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              For Companies
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              Discover verified talent and hire with confidence.
            </p>
          </div>

          {/* Visual Mini Mockup: Verified Talent Card */}
          <div className="relative my-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-100/80 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                AK
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Ananya K.</div>
                <div className="text-[10px] text-slate-500 truncate">Associate Full Stack Engineer</div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                94% Match
              </span>
            </div>

            {/* Verified Skill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-200/80 text-teal-800 text-[11px] font-medium shadow-sm">
              <CheckCircle2 size={13} className="text-teal-600" />
              <span>Verified Skill: Distributed Async Queues</span>
            </div>
          </div>

          {/* Footer CTA Button */}
          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 group-hover:text-teal-600 transition-colors">
              Explore enterprise discovery
            </span>
            <Link
              href="/enterprise"
              className="w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-teal-500/20"
              aria-label="Explore For Companies"
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
