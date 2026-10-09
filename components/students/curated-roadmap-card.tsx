'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { CuratedRoadmapCardData } from './cards-data';

interface CuratedRoadmapCardProps {
  role: CuratedRoadmapCardData;
  className?: string;
}

export function CuratedRoadmapCard({ role, className = '' }: CuratedRoadmapCardProps) {
  const { colors } = role;

  // Custom vector line symbols crafted specifically for each profession
  const renderRoleSymbol = () => {
    switch (role.objectType) {
      case 'data':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 15 65 L 85 65" stroke={colors.stackBorder} strokeWidth="2" opacity="0.4" />
            <path d="M 15 15 L 15 65" stroke={colors.stackBorder} strokeWidth="2" opacity="0.4" />
            <path d="M 18 55 L 38 35 L 58 45 L 82 20" stroke={colors.accent} strokeWidth="3" />
            <circle cx="18" cy="55" r="4" fill={colors.cardBg} stroke={colors.accent} strokeWidth="3" />
            <circle cx="38" cy="35" r="4" fill={colors.cardBg} stroke={colors.accent} strokeWidth="3" />
            <circle cx="58" cy="45" r="4" fill={colors.cardBg} stroke={colors.accent} strokeWidth="3" />
            <circle cx="82" cy="20" r="5" fill={colors.accent} stroke={colors.cardBg} strokeWidth="2" />
            <rect x="25" y="48" width="8" height="17" fill={colors.accent} opacity="0.15" />
            <rect x="45" y="38" width="8" height="27" fill={colors.accent} opacity="0.15" />
            <rect x="65" y="28" width="8" height="37" fill={colors.accent} opacity="0.15" />
          </svg>
        );
      case 'product':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="14" y="16" width="30" height="20" rx="4" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <rect x="56" y="16" width="30" height="20" rx="4" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <rect x="35" y="46" width="30" height="20" rx="4" fill={colors.accent} opacity="0.15" stroke={colors.accent} strokeWidth="2.5" />
            <path d="M 44 26 L 56 26" stroke={colors.stackBorder} strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 29 36 L 29 56 L 35 56" stroke={colors.stackBorder} strokeWidth="2" />
            <path d="M 71 36 L 71 56 L 65 56" stroke={colors.stackBorder} strokeWidth="2" />
            <circle cx="50" cy="56" r="3" fill={colors.accent} />
          </svg>
        );
      case 'ai':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="20" cy="24" r="5" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <circle cx="20" cy="56" r="5" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <circle cx="50" cy="18" r="5" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <circle cx="50" cy="40" r="6" fill={colors.accent} stroke={colors.cardBg} strokeWidth="2" />
            <circle cx="50" cy="62" r="5" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <circle cx="80" cy="40" r="7" fill={colors.cardBg} stroke={colors.accent} strokeWidth="3" />
            <path d="M 25 24 L 45 18 M 25 24 L 44 40 M 25 56 L 44 40 M 25 56 L 45 62" stroke={colors.stackBorder} opacity="0.3" strokeWidth="2" />
            <path d="M 55 18 L 74 38 M 56 40 L 73 40 M 55 62 L 74 42" stroke={colors.accent} strokeWidth="2.5" />
          </svg>
        );
      case 'software':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="15" y="15" width="70" height="50" rx="5" fill={colors.cardBg} stroke={colors.stackBorder} strokeWidth="2" />
            <line x1="15" y1="27" x2="85" y2="27" stroke={colors.stackBorder} strokeWidth="1.5" opacity="0.4" />
            <circle cx="23" cy="21" r="2" fill={colors.accent} />
            <circle cx="30" cy="21" r="2" fill={colors.accent} opacity="0.6" />
            <circle cx="37" cy="21" r="2" fill={colors.accent} opacity="0.3" />
            <path d="M 28 42 L 36 49 L 28 56" stroke={colors.accent} strokeWidth="3" />
            <line x1="43" y1="56" x2="57" y2="56" stroke={colors.accent} strokeWidth="3" />
            <path d="M 62 37 L 70 37" stroke={colors.stackBorder} strokeWidth="2" opacity="0.4" />
            <path d="M 62 45 L 75 45" stroke={colors.stackBorder} strokeWidth="2" opacity="0.4" />
          </svg>
        );
      case 'design':
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="16" y="16" width="68" height="48" rx="6" fill={colors.cardBg} stroke={colors.stackBorder} strokeWidth="2" />
            <path d="M 16 30 L 84 30" stroke={colors.stackBorder} strokeWidth="1.5" opacity="0.3" />
            <rect x="24" y="38" width="22" height="18" rx="3" fill={colors.accent} opacity="0.18" />
            <path d="M 54 38 L 74 38 M 54 46 L 70 46 M 54 54 L 66 54" stroke={colors.stackBorder} strokeWidth="2" opacity="0.4" />
            <path d="M 42 48 L 52 58 L 47 60 L 45 66 L 41 64 L 43 58 Z" fill={colors.accent} stroke={colors.cardBg} strokeWidth="1.5" />
          </svg>
        );
      case 'business':
      default:
        return (
          <svg viewBox="0 0 100 80" className="w-full h-full" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="22" y="20" width="24" height="20" rx="3" fill={colors.cardBg} stroke={colors.accent} strokeWidth="2.5" />
            <rect x="54" y="20" width="24" height="20" rx="3" fill={colors.accent} opacity="0.2" stroke={colors.accent} strokeWidth="2.5" />
            <rect x="22" y="46" width="56" height="18" rx="3" fill={colors.cardBg} stroke={colors.stackBorder} strokeWidth="2" />
            <circle cx="34" cy="55" r="3" fill={colors.accent} />
            <circle cx="50" cy="55" r="3" fill={colors.accent} />
            <circle cx="66" cy="55" r="3" fill={colors.accent} />
          </svg>
        );
    }
  };

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border-2 transition-all duration-300 overflow-hidden ${className}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.stackBorder,
        boxShadow: '4px 6px 0px rgba(0, 0, 0, 0.08)',
        minHeight: '580px',
      }}
    >
      {/* Halftone texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${colors.text} 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
        }}
      />

      {/* TOP SECTION: Wordmark + Step Indicator */}
      <div className="relative z-10 px-5 pt-4 pb-2 border-b border-black/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-['Outfit'] font-bold text-xs tracking-tight" style={{ color: colors.text }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
          <span>Path<span style={{ color: colors.accent }}>wisse</span></span>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-wider font-semibold opacity-75" style={{ color: colors.subtext }}>
          ROADMAP · BLUEPRINT
        </div>
      </div>

      {/* 4 Offset Layer Stack Visual */}
      <div className="relative z-10 px-6 pt-5 pb-3 flex items-center justify-center">
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 opacity-20 pointer-events-none">
          <div className="w-full h-px" style={{ backgroundColor: colors.stackBorder }} />
          <div className="w-full h-px" style={{ backgroundColor: colors.stackBorder }} />
          <div className="w-full h-px" style={{ backgroundColor: colors.stackBorder }} />
        </div>

        <div className="relative w-44 h-32 sm:w-48 sm:h-34 transition-transform duration-300 group-hover:scale-105">
          <div
            className="absolute inset-0 rounded-xl border border-black/20"
            style={{
              backgroundColor: colors.bg,
              transform: 'translate(12px, 12px) rotate(4deg)',
              opacity: 0.45,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl border border-black/25"
            style={{
              backgroundColor: colors.tagBg,
              transform: 'translate(8px, 8px) rotate(-2.5deg)',
              opacity: 0.7,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl border border-black/30 shadow-xs"
            style={{
              backgroundColor: colors.cardBg,
              transform: 'translate(4px, 4px) rotate(1deg)',
              opacity: 0.9,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl border-2 p-3.5 flex flex-col justify-between shadow-sm transition-all"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.stackBorder,
              transform: 'translate(0px, 0px)',
            }}
          >
            <div className="flex items-center justify-between text-[8px] font-mono font-bold" style={{ color: colors.subtext }}>
              <span>PW-ROADMAP.{role.slug.slice(0, 3).toUpperCase()}</span>
              <span>VERIFIED</span>
            </div>
            <div className="w-full h-16 flex items-center justify-center p-1">
              {renderRoleSymbol()}
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono" style={{ color: colors.subtext }}>
              <span>CURATED SPEC</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }} />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="relative z-10 px-5 sm:px-6 py-3 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span
              className="inline-block px-2.5 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-wider font-extrabold border border-black/10"
              style={{
                backgroundColor: colors.tagBg,
                color: colors.tagText,
              }}
            >
              {role.roleFamily}
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
              {role.level}
            </span>
          </div>

          {/* Role Title */}
          <h3
            className="font-mono text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase"
            style={{ color: colors.text }}
          >
            {role.roleTitle}
          </h3>
        </div>

        {/* S10 Specific Attributes: Salary Range & Market Demand */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl border border-black/[0.08] bg-white/70">
          <div className="flex flex-col">
            <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              Salary Range
            </span>
            <span className="text-xs font-bold mt-0.5" style={{ color: colors.text }}>
              {role.salaryRange}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
              <TrendingUp className="w-3 h-3 text-sky-600" />
              Market Demand
            </span>
            <span className="text-xs font-bold mt-0.5" style={{ color: colors.text }}>
              {role.marketDemand}
            </span>
          </div>
        </div>

        {/* S10 Specific Attributes: Core Skills */}
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Core Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {role.coreSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border border-black/10 bg-white/90"
                style={{ color: colors.text }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities list */}
        <div className="space-y-1.5 pt-1">
          {role.responsibilities.map((resp, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs font-medium leading-snug"
              style={{ color: colors.text }}
            >
              <span className="font-mono text-[10px] opacity-60 font-bold shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <span className="line-clamp-1">{resp}</span>
            </div>
          ))}
        </div>

        {/* Metadata Line */}
        <div
          className="pt-2 border-t border-black/[0.08] font-mono text-[10px] tracking-tight font-bold"
          style={{ color: colors.subtext }}
        >
          {role.skillsCount} SKILLS · {role.projectsCount} PROJECTS · {role.level} PATH
        </div>
      </div>

      {/* S10 BOTTOM ACTIONS: "Try for free" + "Explore Roadmap" link */}
      <div className="relative z-10 px-5 sm:px-6 pb-5 pt-2 flex items-center gap-2.5">
        <a
          href={role.tryForFreeUrl}
          className="flex-1 py-2.5 px-3 rounded-lg border text-center font-mono text-xs font-bold transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
          style={{
            backgroundColor: colors.tryFreeBg,
            borderColor: colors.stackBorder,
            color: colors.tryFreeText,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Try for free</span>
        </a>

        <Link
          href={role.exploreUrl}
          className="py-2.5 px-3.5 rounded-lg text-center font-mono text-xs font-bold transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1 shrink-0"
          style={{
            backgroundColor: colors.ctaBg,
            color: colors.ctaText,
          }}
        >
          <span>Explore Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
