'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BarChart3, Briefcase, TrendingUp, ExternalLink } from 'lucide-react';

interface StatItem {
  id: string;
  metric: string;
  numericTarget: number;
  suffix: string;
  text: string;
  source: string;
  sourceUrl: string;
  accent: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    glow: string;
  };
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const STATS: StatItem[] = [
  {
    id: 'wef',
    metric: '85%',
    numericTarget: 85,
    suffix: '%',
    text: 'of jobs in 2030 will require new skills',
    source: 'World Economic Forum, 2023',
    sourceUrl: 'https://www.weforum.org/publications/the-future-of-jobs-report-2023/',
    accent: {
      bg: 'bg-blue-50/50 hover:bg-blue-50/80',
      border: 'border-blue-100/80 hover:border-blue-300/80',
      iconBg: 'bg-blue-100/70 text-blue-600',
      iconColor: 'text-blue-600',
      glow: 'rgba(59, 130, 246, 0.12)',
    },
    icon: BarChart3,
  },
  {
    id: 'nace',
    metric: '70%',
    numericTarget: 70,
    suffix: '%',
    text: 'of employers use skills-based hiring',
    source: 'NACE, 2025',
    sourceUrl: 'https://www.naceweb.org/talent-acquisition/trends-and-predictions/',
    accent: {
      bg: 'bg-purple-50/50 hover:bg-purple-50/80',
      border: 'border-purple-100/80 hover:border-purple-300/80',
      iconBg: 'bg-purple-100/70 text-purple-600',
      iconColor: 'text-purple-600',
      glow: 'rgba(168, 85, 247, 0.12)',
    },
    icon: Briefcase,
  },
  {
    id: 'linkedin',
    metric: '3x',
    numericTarget: 3,
    suffix: 'x',
    text: 'higher chance of getting noticed with a project portfolio',
    source: 'LinkedIn, 2023',
    sourceUrl: 'https://www.linkedin.com/business/talent/blog/talent-strategy/future-of-recruiting',
    accent: {
      bg: 'bg-teal-50/50 hover:bg-teal-50/80',
      border: 'border-teal-100/80 hover:border-teal-300/80',
      iconBg: 'bg-teal-100/70 text-teal-600',
      iconColor: 'text-teal-600',
      glow: 'rgba(20, 184, 166, 0.12)',
    },
    icon: TrendingUp,
  },
];

export function TheOpportunitySection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    wef: 0,
    nace: 0,
    linkedin: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCounts({
              wef: Math.round(easeOutQuart * 85),
              nace: Math.round(easeOutQuart * 70),
              linkedin: Math.round(easeOutQuart * 3),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="the-opportunity"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-slate-100"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headline and Rationale */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            The Opportunity
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-900 leading-[1.12]">
            Skills open <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              more doors
            </span>{' '}
            than degrees.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-md pt-1">
            Yet most students lack a clear path to build, demonstrate, and get noticed for their capabilities.
          </p>
        </div>

        {/* Right Column: 3 Research-Statistic Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            const displayValue = hasAnimated
              ? `${counts[stat.id]}${stat.suffix}`
              : stat.metric;

            return (
              <div
                key={stat.id}
                className={`relative group flex flex-col justify-between p-6 rounded-2xl bg-white/90 backdrop-blur-sm border ${stat.accent.border} shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300`}
                style={{
                  boxShadow: `0 4px 20px ${stat.accent.glow}`,
                }}
              >
                {/* Header: Metric & Small Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-4xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                    {displayValue}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.accent.iconBg} transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mb-6 min-h-[40px]">
                  {stat.text}
                </p>

                {/* Source Citation */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors">
                  <span className="truncate">{stat.source}</span>
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                    title={`View source: ${stat.source}`}
                    aria-label={`View source citation from ${stat.source}`}
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
