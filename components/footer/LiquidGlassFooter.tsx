'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Shield, Compass } from 'lucide-react';
import { Logo } from '@/app/site';
import { NewsletterForm } from '@/components/newsletter-form';
import { APP_URL, CAREER_VOICE_URL, LEGAL_ENTITY } from '@/lib/site-config';

interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'Pathwisse Platform', href: '/product' },
      { label: 'Career Voice', href: CAREER_VOICE_URL, isExternal: true, badge: 'AI' },
      { label: 'Projects & Artifacts', href: '/product/projects' },
      { label: 'Readiness Scoring', href: '/product/readiness-scoring' },
      { label: 'Cohort Analytics', href: '/colleges/student-analytics' },
    ],
  },
  {
    title: 'Audience Paths',
    links: [
      { label: 'Students Overview', href: '/students' },
      { label: 'Career Roadmaps', href: '/careers' },
      { label: 'College Placement Teams', href: '/colleges' },
      { label: 'Talent Intelligence', href: '/enterprise' },
      { label: 'Enterprise Request Demo', href: '/enterprise/request-demo' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resource Hub', href: '/resources' },
      { label: 'Engineering & Role Guides', href: '/resources/blog' },
      { label: 'Skills Directory', href: '/skills' },
      { label: 'Role Comparisons', href: '/compare' },
      { label: 'Career Audit Diagnostic', href: '/career-audit/start' },
    ],
  },
  {
    title: 'Company & Trust',
    links: [
      { label: 'About Pathwisse', href: '/company/about' },
      { label: 'Partners & Campuses', href: '/company/partners' },
      { label: 'Contact Team', href: '/contact' },
      { label: 'Privacy & Security', href: '/trust/privacy' },
      { label: 'Terms of Service', href: '/trust/terms' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/pathwisse',
    svg: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/pathwisse',
    svg: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/pathwisse',
    svg: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export function LiquidGlassFooter() {
  return (
    <footer className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto text-[#142e50]">
      {/* Outer Liquid Glass Capsule Container */}
      <div
        className="relative rounded-[36px] sm:rounded-[44px] p-[2px] transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(220, 230, 245, 0.8) 25%, rgba(185, 205, 235, 0.45) 50%, rgba(225, 235, 250, 0.75) 75%, rgba(255, 255, 255, 0.9) 100%)',
          boxShadow: '0 24px 60px -15px rgba(20, 46, 80, 0.12), 0 8px 24px -6px rgba(20, 46, 80, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
        }}
      >
        {/* Inner Glass Body with Backdrop Blur & Specular Reflections */}
        <div
          className="relative rounded-[34px] sm:rounded-[42px] overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.92) 0%, rgba(246, 250, 255, 0.88) 45%, rgba(238, 244, 252, 0.82) 100%)',
          }}
        >
          {/* Specular Liquid Highlights */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(36, 88, 174, 0.25) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full blur-3xl opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-12 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)',
            }}
          />

          {/* Top Row: Brand & Newsletter Glass Bar */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-14 border-b border-[#142e50]/[0.08]">
            {/* Brand Intro Column */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-block">
                <Logo />
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#56687e] max-w-md">
                Pathwisse transforms student coursework and daily practice into verifiable capability proof that hiring teams can inspect with defensible evidence.
              </p>

              {/* Glass Feature Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#1f3d6b] bg-white/70 border border-white/80 shadow-[0_2px_8px_rgba(31,61,107,0.06)]">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Evidence
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#1f3d6b] bg-white/70 border border-white/80 shadow-[0_2px_8px_rgba(31,61,107,0.06)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#2458ae]" />
                  Career Voice Diagnostic
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#1f3d6b] bg-white/70 border border-white/80 shadow-[0_2px_8px_rgba(31,61,107,0.06)]">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  Structured Roadmaps
                </span>
              </div>
            </div>

            {/* Newsletter Glass Card */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div
                className="p-6 sm:p-7 rounded-[26px] border border-white/90 shadow-[0_12px_32px_-8px_rgba(20,46,80,0.07)] backdrop-blur-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(240, 245, 255, 0.55) 100%)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#142e50] tracking-tight">
                      Stay ahead of industry hiring signals
                    </h3>
                    <p className="text-xs text-[#5e7085] mt-0.5">
                      Curated roadmaps, placement trends, and capability benchmarks delivered monthly.
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#2458ae]/10 text-[#2458ae]">
                    Zero Spam
                  </span>
                </div>
                <NewsletterForm className="max-w-none" />
              </div>
            </div>
          </div>

          {/* Middle Row: Structured Navigation Links */}
          <div className="relative z-10 py-12 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#76879b]">
                  {column.title}
                </h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => {
                    const content = (
                      <span className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-[#46576b] hover:text-[#173c6e] transition-colors py-0.5">
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200/50">
                            {link.badge}
                          </span>
                        )}
                        {link.isExternal && (
                          <ArrowUpRight className="w-3 h-3 text-[#8ca0b6] group-hover:text-[#173c6e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        )}
                      </span>
                    );

                    return (
                      <li key={link.label}>
                        {link.isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.label} (opens in new tab)`}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link href={link.href}>
                            {content}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Row: Liquid Glass Pill Bar */}
          <div className="relative z-10 pt-8 border-t border-[#142e50]/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright & Legal Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-[#627386]">
              <span>© {new Date().getFullYear()} {LEGAL_ENTITY}</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <Link href="/trust/privacy" className="hover:text-[#173c6e] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/trust/terms" className="hover:text-[#173c6e] transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-300">•</span>
              <Link href="/trust/security" className="hover:text-[#173c6e] transition-colors">
                Security
              </Link>
            </div>

            {/* Glass Social & Portal Buttons */}
            <div className="flex items-center gap-2.5">
              {/* App Portal Link */}
              <a
                href={APP_URL}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#142e50] bg-white/70 hover:bg-white border border-white/90 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <span>App Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2458ae]" />
              </a>

              {/* Social Media Pill Icons */}
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Pathwisse on ${item.name}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#55677c] hover:text-[#173c6e] bg-white/60 hover:bg-white border border-white/80 shadow-sm transition-all hover:scale-110 active:scale-95"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
