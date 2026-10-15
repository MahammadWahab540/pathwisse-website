'use client';

import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Compass,
  Layers3,
  Menu,
  Target,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';
import { Hero } from '@/components/hero';
import { LiquidGlassFooter } from '@/components/footer/LiquidGlassFooter';
import { CTABand } from '@/components/shared/CTABand';
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { StudentsSection } from '@/components/home/StudentsSection';
import { CollegesSection } from '@/components/home/CollegesSection';
import { CompaniesSection } from '@/components/home/CompaniesSection';
import { TrustProofSection } from '@/components/home/TrustProofSection';
import { EvidenceSorterSection } from '@/components/home/EvidenceSorterSection';
import { FAQSection } from '@/components/home/FAQSection';

import { BrandLogo } from '@/components/icons/BrandLogo';

export const APP = APP_AUTH_URL;

export function Logo({ height = 38, showTagline = true }: { height?: number; showTagline?: boolean }) {
  return (
    <a
      className="logo"
      href="/"
      aria-label="Pathwisse home"
      style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
    >
      <BrandLogo height={height} showTagline={showTagline} />
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header" style={{ maxWidth: '1360px', height: '80px', borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }}>
      <Logo />
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation" style={{ gap: '28px' }}>
        <a href="/product" className="text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-colors">
          How It Works
        </a>
        <a href="/students" className="text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-colors">
          For Students
        </a>
        <a href="/colleges" className="text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-colors">
          For Colleges
        </a>
        <a href="/enterprise" className="text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-colors">
          For Companies
        </a>
        <a href="/company/about" className="text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-colors">
          Our Vision
        </a>
        <details>
          <summary className="text-[13px] font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer">
            Resources <ChevronDown size={12} className="opacity-70" />
          </summary>
          <div className="dropdown">
            <a href="/resources">Resource Hub</a>
            <a href="/resources/blog">Blog & Insights</a>
            <a href="/careers">Career Roadmaps</a>
            <a href="/skills">Skill Guides</a>
            <a href="/compare/data-analyst-vs-business-analyst">Role Comparisons</a>
            <a href="/pricing">Pricing Plans</a>
            <a href="/hire">Hire Talent</a>
            <a href={CAREER_VOICE_URL} target="_blank" rel="noopener noreferrer">
              Career Voice Audit
            </a>
          </div>
        </details>
      </nav>
      <div className="nav-actions" style={{ gap: '20px' }}>
        <button
          type="button"
          aria-label="Search"
          className="text-slate-500 hover:text-slate-800 transition-colors p-1"
          onClick={() => {
            window.location.href = '/resources';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <a className="login" href={APP} style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
          Log in
        </a>
        <a
          className="cta-pill-button"
          href={APP}
          style={{
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '9px 18px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
          }}
        >
          <span>Get started</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return <LiquidGlassFooter />;
}

export function Dashboard({ kind = 'student' }: { kind?: string }) {
  const placement = kind === 'college';
  const workforce = kind === 'workforce';
  const hire = kind === 'hiring';
  const context = placement
    ? [
        'Placement intelligence',
        'COHORT OVERVIEW',
        'A clearer view of readiness.',
        'Cohort learning progress',
      ]
    : workforce
      ? [
          'Workforce intelligence',
          'TEAM CAPABILITY',
          'Build the skills you need next.',
          'Role-based learning path',
        ]
      : hire
        ? ['Talent intelligence', 'CANDIDATE EVIDENCE', 'Look beyond the resume.', 'Evidence trail']
        : [
            'My workspace',
            'YOUR CAREER, IN MOTION',
            'Small steps. Real progress.',
            'Your learning roadmap',
          ];

  return (
    <div className="dashboard">
      <div className="dash-top">
        <span className="mini-logo">↗</span>
        <b>pathwisse</b>
        <span className="dash-type">{context[0]}</span>
        <span className="avatar">AK</span>
      </div>
      <div className="dash-body">
        <aside>
          <span className="side-active">
            <Layers3 size={15} /> Overview
          </span>
          <span>
            <Compass size={15} /> Roadmap
          </span>
          <span>
            <Target size={15} /> Skills
          </span>
          <span>
            <BriefcaseBusiness size={15} /> Proof
          </span>
          <div className="side-bottom">
            Your next chapter
            <br />
            <b>starts with a step.</b>
          </div>
        </aside>
        <div className="dash-content">
          <div className="dash-title">
            <div>
              <span className="eyebrow">{context[1]}</span>
              <h3>{context[2]}</h3>
            </div>
            <span className="live-pill">● On track</span>
          </div>
          <div className="career-strip">
            <div className="career-icon">
              <BarChart3 size={22} />
            </div>
            <div>
              <small>
                {workforce ? 'ROLE-BASED PATH' : hire ? 'ROLE SIGNALS' : 'YOUR CHOSEN PATH'}
              </small>
              <b>
                Data Analyst <ArrowUpRight size={15} />
              </b>
            </div>
            <span className="level">
              {workforce
                ? 'Product team'
                : hire
                  ? 'Verified context'
                  : 'Foundations → Job-ready'}
            </span>
          </div>
          <div className="dash-grid">
            <div className="roadmap">
              <div className="box-heading">
                <b>{context[3]}</b>
                <span>View all ↗</span>
              </div>
              {[
                ['01', 'Data foundations', 'Completed'],
                ['02', 'SQL & databases', 'In progress'],
                ['03', 'Data visualization', 'Up next'],
              ].map(([num, title, status], i) => (
                <div className="roadmap-row" key={num}>
                  <span className={'step step-' + i}>{i === 0 ? <Check size={13} /> : num}</span>
                  <div>
                    <b>{title}</b>
                    <small>{status}</small>
                  </div>
                  {i === 1 && <span className="mini-progress">6 / 8</span>}
                </div>
              ))}
            </div>
            <div className="readiness">
              <span>Readiness snapshot</span>
              <div className="ring">
                <div>
                  <strong>
                    72<span>%</span>
                  </strong>
                  <small>Building momentum</small>
                </div>
              </div>
              <div className="readiness-note">Progress you can see</div>
            </div>
          </div>
          <div className="next-task">
            <span className="task-icon">⌘</span>
            <div>
              <small>PUT YOUR SKILLS TO WORK</small>
              <b>Customer insights dashboard</b>
              <span>Applied SQL · Data storytelling</span>
            </div>
            <span className="task-arrow">↗</span>
          </div>
        </div>
      </div>
      <div className="dash-foot">
        <span>Illustrative product experience · Sample data</span>
        <span>Learning → Practice → Proof</span>
      </div>
    </div>
  );
}

export function CTA({
  title = 'MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY.',
}: {
  title?: string;
}) {
  return (
    <CTABand
      title={title}
      closingHeadline="Students build capabilities → Colleges develop talent → Companies discover proven problem-solvers."
      description="One continuous capability network. Turn learning into demonstrable proof, make readiness visible early, and discover talent with confidence."
      primaryAction={{
        label: 'Explore the Pathwisse Network →',
        href: '/students',
      }}
      secondaryAction={{
        label: 'Contact Solutions Team',
        href: '/contact',
      }}
    />
  );
}

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* 1. Hero Section (H01 & H02) */}
        <Hero accent="#2458ae" />

        {/* 2. Ecosystem Section (H03 & H04) */}
        <EcosystemSection />

        {/* 3. Students Section (H05) */}
        <StudentsSection />

        {/* 4. Colleges & Placement Teams Section (H06) */}
        <CollegesSection />

        {/* 5. Companies Section (H07) */}
        <CompaniesSection />

        {/* Interactive Visible Evidence: demonstrate project artifacts before Trust & Proof. */}
        <EvidenceSorterSection />

        {/* 6. Trust & Proof Section (H08) */}
        <TrustProofSection />

        {/* 7. FAQ Section (H09) */}
        <FAQSection />

        {/* 8. Final CTA Section (H10) */}
        <CTA title="MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY." />
      </main>
      {/* 9. LiquidGlassFooter (H11) */}
      <Footer />
    </>
  );
}
