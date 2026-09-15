'use client';

import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Compass,
  GraduationCap,
  Layers3,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';

export const APP = APP_AUTH_URL;

const audienceData = {
  colleges: {
    label: 'Colleges',
    eyebrow: 'PLACEMENT COMMAND CENTER',
    headline: 'Know who is ready. Know what they are missing. Know which opportunity fits them.',
    summary: 'The Placement Command Center — segment cohorts, match candidates to job requirements, predict placement probability with transparent drivers, and run targeted 30-day interventions.',
    cta: 'Request TPO console demo',
    href: '/contact?interest=college',
    status: 'Placement Command Center',
    stat: '312',
    statLabel: 'placement ready',
    nav: ['Cohort', 'Job Match', 'Prediction', 'Intervention'],
    steps: [
      ['Who is ready for tomorrow’s drive?', 'Student Readiness Intelligence', 'Instead of an unvetted spreadsheet of 1,200 names, segment cohorts instantly: 312 Placement Ready, 428 Nearly Ready, 306 Need Intervention, and 154 High Risk.', 'Placement ready', '312 students'],
      ['Which candidate fits this job?', 'Job Intelligence & Matching', 'When an employer posts a mandate (e.g., Python + SQL + APIs), Pathwisse instantly matches 126 eligible candidates with verified project proof.', 'Role match', '72 strong fits'],
      ['Why is the student predicted this way?', 'Explainable Placement Prediction', 'A transparent 78% placement probability based on technical proof, communication IRI, aptitude, and code repositories — not an AI horoscope.', 'Prediction', '78% probability'],
      ['How do we lift at-risk students?', '30-Day Intervention Engine', 'Prescribe targeted sprints: advanced SQL, aptitude labs, and mock interviews — then measure probability lift to close the loop.', 'Readiness lift', '+26% conversion'],
    ],
  },
  students: {
    label: 'Students',
    eyebrow: 'FOR STUDENTS',
    headline: 'Build readiness recruiters can verify.',
    summary: 'Get a structured roadmap, build skills through daily practice and applied projects, and demonstrate real readiness — not just course certificates.',
    cta: 'Start building',
    href: APP,
    status: 'Personal path',
    stat: '72%',
    statLabel: 'readiness momentum',
    nav: ['Direction', 'Roadmap', 'Proof', 'Readiness'],
    steps: [
      ['What role actually fits me?', 'Start with Career Voice.', 'Compare roles, understand your starting point, and choose one useful direction. Career Voice helps you move past uncertainty to a first concrete step.', 'Role fit', 'Data Analyst'],
      ['What should I build next?', 'Follow the shortest useful path.', 'Role-based roadmaps connect skills, daily practice, and applied projects so your progress is structured, not scattered across random courses.', 'Next skill', 'SQL joins'],
      ['How do I prove I can do the work?', 'Evidence, not just certificates.', 'Projects capture the problem, your decisions, your output, and your reflection — giving you a richer story than a course completion badge.', 'Project proof', '3 signals'],
      ['Am I ready to apply?', 'Know your readiness score.', 'Your readiness score shows where you are strong, where gaps remain, and which opportunities match your current demonstrated capability.', 'Next action', 'Apply with context'],
    ],
  },
  enterprise: {
    label: 'Enterprises',
    eyebrow: 'FOR ENTERPRISES',
    headline: 'Hire with evidence. Upskill with direction.',
    summary: 'Assess workforce capability, close skill gaps with role-based journeys, and discover candidates through demonstrated skill evidence — not just CVs.',
    cta: 'Partner with us',
    href: '/contact?interest=upskilling',
    status: 'Capability system',
    stat: '+23%',
    statLabel: 'capability lift',
    nav: ['Assess', 'Upskill', 'Hire', 'Mobility'],
    steps: [
      ['Where are our workforce gaps?', 'Map capability against role requirements.', 'Pathwisse assesses current skills against what each role actually demands — using applied work evidence, not survey responses.', 'Skills gap', 'Product team'],
      ['How do we close those gaps?', 'Role-based upskilling journeys.', 'Assign structured paths that close specific gaps with skill modules, daily practice, and applied projects. Track readiness movement, not just completion rates.', 'On track', '6 / 8 modules'],
      ['Can this candidate do the work?', 'Look behind the resume.', 'Hiring teams can review skill evidence, project context, and readiness scores as the Talent Intelligence product develops. Join the waitlist.', 'Evidence', '4 projects'],
      ['Who is ready for the next role?', 'Make internal mobility visible.', 'Identify people ready to grow and show what they need to build next. Evidence-based conversations instead of guesswork.', 'Mobility-ready', '18 people'],
    ],
  },
};


type AudienceKey = keyof typeof audienceData;

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Pathwisse home">
      <svg width="36" height="34" viewBox="0 0 44 40" fill="none" aria-hidden="true">
        <path d="M29 5H16v12H5v17h13v-9h16V14" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
        <circle cx="37" cy="5" r="4" fill="#f5913f" />
      </svg>
      <span>Path<span className="blue">wisse</span></span>
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
          <summary>Solutions <ChevronDown size={13} /></summary>
          <div className="dropdown">
            <a href="/colleges"><GraduationCap size={14} /> For Colleges</a>
            <a href="/students"><Users size={14} /> For Students</a>
            <a href="/colleges/placement-teams"><BriefcaseBusiness size={14} /> Placement Teams</a>
            <a href="/enterprise"><BarChart3 size={14} /> For Enterprises</a>
          </div>
        </details>
        <details>
          <summary>Platform <ChevronDown size={13} /></summary>
          <div className="dropdown dropdown-wide">
            <a href="/product" className="dropdown-lead">Platform Superstructure ↗</a>
            <a href="/product/career-voice">CareerVoice <small className="dropdown-tag">· Understand</small></a>
            <a href="/product/career-roadmaps">Career Roadmaps <small className="dropdown-tag">· Develop</small></a>
            <a href="/product/practice-lab">Practice Lab <small className="dropdown-tag">· Develop</small></a>
            <a href="/product/enterprise-projects">Enterprise Projects <small className="dropdown-tag">· Prove</small></a>
            <a href="/product/skill-passport">Skill Passport <small className="dropdown-tag">· Prove</small></a>
            <a href="/product/readiness-intelligence">Readiness Intelligence</a>
            <a href="/product/job-intelligence">Job Intelligence</a>
            <a href="/product/placement-intelligence">Placement Intelligence</a>
            <a href="/product/employability-analytics">Employability Analytics</a>
          </div>
        </details>
        <a href="/pricing">Pricing</a>
        <details>
          <summary>Resources <ChevronDown size={13} /></summary>
          <div className="dropdown">
            <a href="/resources/blog">Blog</a>
            <a href="/careers/data-analyst">Career Roadmaps</a>
            <a href="/skills/sql">Skill Guides</a>
            <a href="/compare/data-analyst-vs-business-analyst">Role Comparisons</a>
          </div>
        </details>
        <a href="/company/about">About</a>
      </nav>
      <div className="nav-actions">
        <a className="login" href={APP}>Log in <ArrowUpRight size={14} /></a>
        <a className="button small" href="/contact?interest=college">Request demo <ArrowRight size={14} /></a>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div><Logo /><p>Structured roadmaps.<br />Verified skill proof.<br />Placement readiness reporting.</p></div>
        <div><b>Solutions</b><a href="/colleges">Pathwisse for Colleges</a><a href="/colleges/placement-teams">Placement Command Center</a><a href="/students">Pathwisse for Students</a><a href="/enterprise">Pathwisse for Enterprises</a><a href="/pricing">Institutional Pricing</a></div>
        <div><b>Platform Products</b><a href="/product">Platform Superstructure</a><a href="/product/career-voice">CareerVoice</a><a href="/product/career-roadmaps">Career Roadmaps</a><a href="/product/practice-lab">Practice Lab</a><a href="/product/enterprise-projects">Enterprise Projects</a><a href="/product/skill-passport">Skill Passport</a><a href="/product/placement-intelligence">Placement Intelligence</a></div>
        <div><b>Intelligence & Outcomes</b><a href="/product/readiness-intelligence">Readiness Intelligence</a><a href="/product/job-intelligence">Job Intelligence</a><a href="/product/placement-intelligence">Placement Intelligence</a><a href="/product/employability-analytics">Employability Analytics</a><a href="/how-it-works">How It Works</a><a href="/outcomes">Institutional Outcomes</a></div>
        <div><b>Company</b><a href="/company/about">About Us</a><a href="/company/partners">Partnerships</a><a href="/contact">Contact</a><a href="mailto:partnership@pathwisse.com">partnership@pathwisse.com</a></div>
        <div><b>Legal & Trust</b><a href="/trust/privacy">Privacy Policy</a><a href="/trust/terms">Terms of Service</a><a href="/trust/security">Security</a><a href="/trust/compliance">Compliance (NEP/NAAC/NIRF)</a></div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Pathwisse (Shaquantum Labs Private Limited). All rights reserved.</span>
        <span><a href="/trust/privacy">Privacy</a><span className="dot" /><a href="/trust/terms">Terms</a><span className="dot" />Institutional Employability Operating System.</span>
      </div>
    </footer>
  );
}

export function Dashboard({ kind = 'student' }: { kind?: string }) {
  const placement = kind === 'college';
  const workforce = kind === 'workforce';
  const hire = kind === 'hiring';
  const context = placement
    ? ['Placement intelligence', 'COHORT OVERVIEW', 'A clearer view of readiness.', 'Cohort learning progress']
    : workforce
      ? ['Workforce intelligence', 'TEAM CAPABILITY', 'Build the skills you need next.', 'Role-based learning path']
      : hire
        ? ['Talent intelligence', 'CANDIDATE EVIDENCE', 'Look beyond the resume.', 'Evidence trail']
        : ['My workspace', 'YOUR CAREER, IN MOTION', 'Small steps. Real progress.', 'Your learning roadmap'];

  return (
    <div className="dashboard">
      <div className="dash-top"><span className="mini-logo">↗</span><b>pathwisse</b><span className="dash-type">{context[0]}</span><span className="avatar">AK</span></div>
      <div className="dash-body">
        <aside>
          <span className="side-active"><Layers3 size={15} /> Overview</span>
          <span><Compass size={15} /> Roadmap</span>
          <span><Target size={15} /> Skills</span>
          <span><BriefcaseBusiness size={15} /> Proof</span>
          <div className="side-bottom">Your next chapter<br /><b>starts with a step.</b></div>
        </aside>
        <div className="dash-content">
          <div className="dash-title"><div><span className="eyebrow">{context[1]}</span><h3>{context[2]}</h3></div><span className="live-pill">● On track</span></div>
          <div className="career-strip"><div className="career-icon"><BarChart3 size={22} /></div><div><small>{workforce ? 'ROLE-BASED PATH' : hire ? 'ROLE SIGNALS' : 'YOUR CHOSEN PATH'}</small><b>Data Analyst <ArrowUpRight size={15} /></b></div><span className="level">{workforce ? 'Product team' : hire ? 'Verified context' : 'Foundations → Job-ready'}</span></div>
          <div className="dash-grid">
            <div className="roadmap">
              <div className="box-heading"><b>{context[3]}</b><span>View all ↗</span></div>
              {[['01', 'Data foundations', 'Completed'], ['02', 'SQL & databases', 'In progress'], ['03', 'Data visualization', 'Up next']].map(([num, title, status], i) => (
                <div className="roadmap-row" key={num}><span className={'step step-' + i}>{i === 0 ? <Check size={13} /> : num}</span><div><b>{title}</b><small>{status}</small></div>{i === 1 && <span className="mini-progress">6 / 8</span>}</div>
              ))}
            </div>
            <div className="readiness"><span>Readiness snapshot</span><div className="ring"><div><strong>72<span>%</span></strong><small>Building momentum</small></div></div><div className="readiness-note">Progress you can see</div></div>
          </div>
          <div className="next-task"><span className="task-icon">⌘</span><div><small>PUT YOUR SKILLS TO WORK</small><b>Customer insights dashboard</b><span>Applied SQL · Data storytelling</span></div><span className="task-arrow">↗</span></div>
        </div>
      </div>
      <div className="dash-foot"><span>Illustrative product experience · Sample data</span><span>Learning → Practice → Proof</span></div>
    </div>
  );
}

function getStep(active: AudienceKey, step: number) {
  const item = audienceData[active].steps[step];
  return { question: item[0], title: item[1], text: item[2], metric: item[3], value: item[4] };
}

function AudienceWorkspace({ active }: { active: AudienceKey }) {
  const data = audienceData[active];
  return (
    <div className="audience-workspace" aria-live="polite">
      <div className="workspace-top"><div><span className="workspace-mark">Pathwisse</span><b>{data.status}</b></div><span className="workspace-badge">{data.statLabel}</span></div>
      <div className="workspace-body">
        <aside className="workspace-side">{data.nav.map((item, index) => <span className={index === 0 ? 'active' : ''} key={item}>{item}</span>)}</aside>
        <div className="workspace-main">
          <div className="workspace-hero-line"><div><small>{data.eyebrow}</small><h3>{data.headline}</h3></div><strong>{data.stat}</strong></div>
          <div className="signal-grid">
            {data.steps.map((item, index) => (
              <div className={index === 0 ? 'signal-card primary' : 'signal-card'} key={item[1]}>
                <span>{item[3]}</span><b>{item[4]}</b><p>{item[2]}</p>
              </div>
            ))}
          </div>
          <div className="proof-rail"><span>Diagnose</span><span>Guide</span><span>Practice</span><span>Prove</span><span>Act</span></div>
        </div>
      </div>
    </div>
  );
}

function AudienceExperience() {
  const [active, setActive] = useState<AudienceKey>('students');
  const [step, setStep] = useState(0);
  const data = audienceData[active];
  const current = getStep(active, step);

  function choose(key: AudienceKey) {
    setActive(key);
    setStep(0);
  }

  return (
    <section className="interactive-audience" id="audiences">
      <div className="section-kicker">
        <span className="eyebrow">THREE VIEWS. ONE CAPABILITY SYSTEM.</span>
        <h2>Pathwisse adapts to the person asking the question.</h2>
        <p>The same evidence layer serves three different decisions: what should I do next, who needs support, and who can do the work.</p>
      </div>
      <div className="audience-tabs" role="tablist" aria-label="Choose audience view">
        {(Object.keys(audienceData) as AudienceKey[]).map((key) => (
          <button type="button" role="tab" aria-selected={active === key} className={active === key ? 'active' : ''} onClick={() => choose(key)} key={key}>
            {key === 'colleges' && <GraduationCap size={18} />}
            {key === 'students' && <Users size={18} />}
            {key === 'enterprise' && <BriefcaseBusiness size={18} />}
            {audienceData[key].label}
          </button>
        ))}
      </div>
      <div className="audience-stage">
        <div className="audience-story">
          <span className="eyebrow">{data.eyebrow}</span>
          <h3>{data.headline}</h3>
          <p>{data.summary}</p>
          <div className="story-chooser" aria-label={`${data.label} journey steps`}>
            {data.steps.map((item, index) => (
              <button type="button" className={step === index ? 'active' : ''} onClick={() => setStep(index)} key={item[1]}>
                <small>{String(index + 1).padStart(2, '0')}</small><span>{item[0]}</span>
              </button>
            ))}
          </div>
          <div className="active-story"><span>{current.metric}</span><h4>{current.title}</h4><p>{current.text}</p></div>
          <a className="button" href={data.href}>{data.cta} <ArrowRight size={16} /></a>
        </div>
        <div className="audience-product"><AudienceWorkspace active={active} /></div>
      </div>
    </section>
  );
}

function EcosystemStory() {
  const cards = useMemo(() => [
    ['The problem', 'Colleges manage employability through disconnected courses, spreadsheets, and last-minute placement drives — with no continuous visibility into student readiness.'],
    ['The Pathwisse approach', 'One system connects career direction, structured roadmaps, daily practice, applied projects, readiness scoring, and placement analytics.'],
    ['What each audience gets', 'Students get a structured path and verified proof. Placement teams get live cohort intelligence. Management gets NAAC/NIRF-aligned reporting.'],
    ['The outcome', 'Students know exactly what to build next. Placement teams know who is ready and who needs support. Recruiters get pre-filtered, evidence-backed student exports.'],
  ], []);

  return (
    <section className="ecosystem-story">
      <div className="story-visual"><img src="/pathwisse-ecosystem.png" alt="Pathwisse institutional employability platform — connecting students, placement teams, faculty, and enterprise" loading="lazy" width="1792" height="1024" /><span className="visual-caption">From enrollment to placement — one continuous readiness system.</span></div>
      <div className="story-copy">
        <span className="eyebrow">ONE SYSTEM. THREE AUDIENCES.</span>
        <h2>The operating system for institutional employability.</h2>
        <p>Pathwisse turns the student journey into a structured, verifiable path — from career direction and skill-building to placement readiness and recruiter exports. Colleges get live visibility. Students get proof that travels with them.</p>
        <div className="narrative-stack">{cards.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        <a className="text-link" href="/product">Explore the Pathwisse Platform <ArrowUpRight size={16} /></a>
      </div>
    </section>
  );
}

function ProductEcosystem() {
  return (
    <section className="products-section">
      <div className="section-heading"><div><span className="eyebrow">THE PATHWISSE PLATFORM</span><h2>Every feature is connected. Every signal is useful.</h2></div><a className="text-link" href="/product">Explore the platform <ArrowUpRight size={16} /></a></div>
      <div className="product-feature">
        <div><span className="product-badge"><AudioLines size={19} /> CAREER VOICE</span><h3>Career direction, before the roadmap begins.</h3><p>A guided career conversation that helps students compare roles, understand their starting point, and choose one useful next step — by voice or text. Works as a standalone tool or integrated into your institutional placement programme.</p><a className="text-link" href="/product/career-voice">Try Career Voice <ArrowUpRight size={16} /></a></div>
        <div className="voice-visual"><div className="voice-orb"><AudioLines size={52} /></div><blockquote>What role actually<br />fits me right now?</blockquote><span>Direction → Roadmap → Proof → Readiness</span></div>
      </div>
      <div className="product-pair">
        <a href="/colleges/placement-teams"><span className="eyebrow">PLACEMENT TEAM TOOLS</span><h3>Live cohort readiness, early warnings, and recruiter exports.</h3><p>Placement coordinators get real-time visibility into who is job-ready, who needs intervention, and how to generate pre-filtered recruiter exports backed by verified skill evidence.</p><span className="text-link">Explore placement tools <ArrowUpRight size={16} /></span></a>
        <a href="/enterprise/upskilling"><span className="eyebrow">ENTERPRISE UPSKILLING</span><h3>Capability gaps become role-based journeys.</h3><p>Assess teams, identify skill gaps against role requirements, assign structured upskilling paths, and track readiness movement — not just course completion.</p><span className="text-link">Explore enterprise upskilling <ArrowUpRight size={16} /></span></a>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="trust-band">
      {[
        [ShieldCheck, 'Verified evidence', 'Every skill signal is grounded in applied work, projects, and practice — not just course certificates.'],
        [Target, 'Placement-ready reporting', 'NAAC, NIRF, and AICTE-aligned reporting built into the institutional analytics dashboard.'],
        [Sparkles, 'Continuous visibility', 'Placement teams move from end-of-year reviews to real-time cohort readiness intelligence.'],
      ].map(([Icon, title, text]) => {
        const TrustIcon = Icon as typeof ShieldCheck;
        return <div key={title as string}><TrustIcon size={20} /><b>{title as string}</b><p>{text as string}</p></div>;
      })}
    </section>
  );
}

export function CTA({ title = 'Ready to build placement readiness at scale?' }: { title?: string }) {
  return (
    <section className="cta-section">
      <span className="eyebrow">GET STARTED WITH PATHWISSE</span>
      <h2>{title}</h2>
      <div className="button-row"><a className="button orange" href="/contact?interest=college">Request a demo <ArrowRight size={16} /></a><a className="light-link" href={CAREER_VOICE_URL}>Try Career Voice free <ArrowUpRight size={16} /></a></div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="orange-line" />INSTITUTIONAL EMPLOYABILITY PLATFORM</div>
            <h1>Structured roadmaps. Verified skill proof. Placement readiness<span className="orange-text">.</span></h1>
            <p>Pathwisse is the operating system for college placement teams — giving students a structured path from career direction to verified readiness, and giving placement coordinators the live cohort intelligence they need to act early.</p>
            <div className="button-row"><a className="button" href="/contact?interest=college">Request a demo <ArrowRight size={16} /></a><a className="text-link" href={CAREER_VOICE_URL}>Try Career Voice <ArrowUpRight size={16} /></a></div>
            <div className="hero-note"><span className="tiny-check"><Check size={11} /></span>Trusted by placement teams, students, and educators. Aligned with NEP 2020, NAAC, NIRF, and AICTE frameworks.</div>
          </div>
          <div className="hero-product">
            <div className="floating-label"><span className="proof-icon"><Check size={16} /></span><div><b>Cohort readiness, live.</b><small>Direction → Practice → Proof → Placement</small></div></div>
            <AudienceWorkspace active="colleges" />
            <div className="path-caption"><span className="path-line" />One platform. Colleges, students, and enterprises.</div>
          </div>
        </section>
        <TrustBand />
        <AudienceExperience />
        <EcosystemStory />
        <ProductEcosystem />
        <section className="resources-section">
          <div className="section-heading"><div><span className="eyebrow">CAREER RESOURCES</span><h2>Role guides, skill paths, and placement tools.</h2></div><a href="/resources/blog" className="text-link">Read the blog <ArrowUpRight size={16} /></a></div>
          <div className="resource-grid">
            {[
              ['CAREER ROADMAP', 'Data Analyst', 'From data foundations to SQL, dashboards, and placement-ready analytics projects.', '/careers/data-analyst', <Compass size={55} key="icon" />],
              ['ROLE COMPARISON', 'Data Analyst vs Business Analyst', 'Compare responsibilities, required skills, projects, and transition paths between two popular roles.', '/compare/data-analyst-vs-business-analyst', <Layers3 size={55} key="icon" />],
              ['FOR PLACEMENT TEAMS', 'Readiness before placement season.', 'How placement teams can move from last-minute urgency to continuous, actionable cohort visibility.', '/colleges/placement-teams', <BarChart3 size={55} key="icon" />],
            ].map((x, index) => (
              <a className="resource-item" href={x[3] as string} key={x[1] as string}><div className={'resource-art art-0' + (index + 1)}><span>{x[4]}</span><small>{x[0] as string}</small><ArrowUpRight /></div><h3>{x[1] as string}</h3><p>{x[2] as string}</p></a>
            ))}
          </div>
        </section>
        <CTA title="Give your placement team the visibility they need." />
      </main>
      <Footer />
    </>
  );
}
