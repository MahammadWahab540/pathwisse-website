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
import { FAQSection } from '@/components/home/FAQSection';

export const APP = APP_AUTH_URL;

export function Logo() {
  return (
    <a
      className="logo"
      href="/"
      aria-label="Pathwisse home"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '23px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#1F3861',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#1F3861',
          }}
        />
        <span>
          Path<span style={{ color: '#2458ae' }}>wisse</span>
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Logo />
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        <details>
          <summary>
            Students <ChevronDown size={13} />
          </summary>
          <div className="dropdown">
            <a href="/students">For Students</a>
            <a href="/career-audit/start">Career Audit & Assessment</a>
          </div>
        </details>
        <details>
          <summary>
            Colleges <ChevronDown size={13} />
          </summary>
          <div className="dropdown">
            <a href="/colleges">For Colleges & Placement</a>
            <a href="/colleges/request-demo">Request Partnership Demo</a>
          </div>
        </details>
        <details>
          <summary>
            Enterprise <ChevronDown size={13} />
          </summary>
          <div className="dropdown">
            <a href="/enterprise">Talent & Hiring Intelligence</a>
            <a href="/enterprise/request-demo">Request Enterprise Demo</a>
          </div>
        </details>
        <details>
          <summary>
            Products <ChevronDown size={13} />
          </summary>
          <div className="dropdown">
            <a href="/product">Pathwisse Platform</a>
            <a href="/product/career-voice">Career Voice</a>
            <a href="/product/career-roadmaps">Career Roadmaps</a>
            <a href="/product/practice-lab">Practice Lab</a>
            <a href="/product/projects">Applied Projects</a>
            <a href="/product/skill-passport">Skill Passport</a>
            <a href="/product/readiness-scoring">Readiness Scoring</a>
            <a href="/product/analytics">Analytics & Signals</a>
            <a href="/product/integrations">Integrations</a>
          </div>
        </details>
        <details>
          <summary>
            Resources <ChevronDown size={13} />
          </summary>
          <div className="dropdown">
            <a href="/resources">Resource Hub</a>
            <a href="/resources/blog">Blog & Insights</a>
            <a href="/careers">Career Roadmaps</a>
            <a href="/skills">Skill Guides</a>
            <a href="/compare/data-analyst-vs-business-analyst">Role Comparisons</a>
            <a href={CAREER_VOICE_URL} target="_blank" rel="noopener noreferrer">
              Career Voice Audit
            </a>
          </div>
        </details>
        <a
          href="/pricing"
          className="text-sm font-semibold text-[#142e50] hover:text-[#2458ae] transition-colors py-2 px-1"
        >
          Pricing
        </a>
        <a
          href="/hire"
          className="text-sm font-semibold text-[#142e50] hover:text-[#2458ae] transition-colors py-2 px-1"
        >
          Hire Talent
        </a>
      </nav>
      <div className="nav-actions">
        <a className="login" href={APP}>
          Log in <ArrowUpRight size={14} />
        </a>
        <a className="button small" href={APP}>
          Get started <ArrowRight size={14} />
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
      description="Start with what you know, build what you can show, and move forward with evidence. Connect with the Pathwisse ecosystem today."
      primaryAction={{
        label: 'Get Started Now',
        href: APP,
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
