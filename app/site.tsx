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

export const APP = 'https://app.pathwisse.com/auth';

const audienceData = {
  students: {
    label: 'Students',
    eyebrow: 'FOR STUDENTS',
    headline: 'Know what to do next.',
    summary: 'Start with a direction, follow a structured path, and turn daily practice into work you can show.',
    cta: 'Start building',
    href: APP,
    status: 'Personal path',
    stat: '72%',
    statLabel: 'readiness momentum',
    nav: ['Direction', 'Roadmap', 'Proof', 'Opportunities'],
    steps: [
      ['What role fits me?', 'Choose a direction that makes sense.', 'Career Voice and Pathwisse help a student compare roles, understand their starting point, and pick one useful next step.', 'Role fit', 'Data Analyst'],
      ['What should I learn next?', 'Follow the shortest useful path.', 'Roadmaps connect skills, practice, and projects so progress feels concrete instead of scattered across courses.', 'Next skill', 'SQL joins'],
      ['How do I prove it?', 'Build evidence, not only certificates.', 'Projects capture the problem, decisions, work, and reflection, giving students a stronger story for interviews.', 'Project proof', '3 signals'],
      ['Where should I apply?', 'Use readiness to make better choices.', 'Students see where they are strong, where they need support, and which opportunities match their current evidence.', 'Next action', 'Apply with context'],
    ],
  },
  placement: {
    label: 'Placement Teams',
    eyebrow: 'FOR PLACEMENT TEAMS',
    headline: 'Know who is ready and who needs support.',
    summary: 'Move from late placement-season panic to continuous visibility across cohorts, roles, gaps, and interventions.',
    cta: 'Explore partnership',
    href: '/contact?interest=college',
    status: 'Cohort intelligence',
    stat: '61%',
    statLabel: 'job-ready cohort',
    nav: ['Cohort', 'Gaps', 'Shortlist', 'Outcomes'],
    steps: [
      ['Who is actually ready?', 'See readiness before placement season.', 'Placement teams can inspect skills, projects, practice consistency, and role readiness from one view.', 'Ready now', '143 students'],
      ['Who needs support now?', 'Find gaps early enough to act.', 'Shared weak spots become targeted interventions by branch, cohort, skill, or target role.', 'Priority gap', 'SQL practice'],
      ['Who should we send?', 'Shortlist with stronger signals.', 'Role requirements can be compared with demonstrated student evidence instead of relying only on CGPA or resume claims.', 'Role match', '88% fit'],
      ['Did support work?', 'Measure movement over time.', 'Teams can see whether interventions produced stronger work, better readiness, and clearer placement conversations.', 'Readiness lift', '+18%'],
    ],
  },
  enterprise: {
    label: 'Enterprises',
    eyebrow: 'FOR ENTERPRISES',
    headline: 'Hire with evidence. Upskill with direction.',
    summary: 'Use capability signals to discover talent, identify workforce gaps, and create role-based growth journeys.',
    cta: 'Partner with us',
    href: '/contact?interest=upskilling',
    status: 'Capability system',
    stat: '+23%',
    statLabel: 'capability lift',
    nav: ['Evidence', 'Fit', 'Upskill', 'Mobility'],
    steps: [
      ['Can they do the work?', 'Look behind the profile.', 'Hiring teams can review skill evidence, project context, and readiness signals as the Talent Intelligence product develops.', 'Evidence', '4 projects'],
      ['Who fits this role?', 'Compare people with role expectations.', 'Signals become useful when they are evaluated against the actual work a role requires.', 'Candidate fit', '91%'],
      ['Where is the workforce gap?', 'Turn capability gaps into growth paths.', 'Enterprise Upskilling maps current skills to role needs, then assigns learning, practice, and applied projects.', 'Priority team', 'Product'],
      ['Who is ready for the next role?', 'Make internal mobility visible.', 'Managers can discuss growth with better context: what changed, what was demonstrated, and what remains to build.', 'Mobility-ready', '18 people'],
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
            <a href="/students">For students</a>
            <a href="/colleges">For placement teams</a>
            <a href="/enterprises">For enterprises</a>
          </div>
        </details>
        <details>
          <summary>Products <ChevronDown size={13} /></summary>
          <div className="dropdown">
            <a href="/products/platform">Pathwisse Platform</a>
            <a href="/products/career-voice">Career Voice</a>
            <a href="/products/enterprise-upskilling">Enterprise Upskilling</a>
            <a href="/products/talent-intelligence">Talent Intelligence</a>
            <a href="/products">All products</a>
          </div>
        </details>
        <a href="/careers">Explore careers</a>
        <a href="/resources">Resources</a>
      </nav>
      <div className="nav-actions">
        <a className="login" href={APP}>Log in <ArrowUpRight size={14} /></a>
        <a className="button small" href={APP}>Get started <ArrowRight size={14} /></a>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div><Logo /><p>From potential to possibility.<br />Capability you can build on.</p></div>
        <div><b>Solutions</b><a href="/students">Students</a><a href="/colleges">Placement teams</a><a href="/enterprises">Enterprises</a></div>
        <div><b>Products</b><a href="/products/platform">Pathwisse Platform</a><a href="/products/career-voice">Career Voice</a><a href="/products/enterprise-upskilling">Enterprise Upskilling</a><a href="/products/talent-intelligence">Talent Intelligence</a></div>
        <div><b>Explore</b><a href="/careers">Career roadmaps</a><a href="/skills">Skills</a><a href="/projects">Projects</a><a href="/resources">Guides & resources</a><a href="/contact">Partner with us</a></div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Pathwisse. All rights reserved.</span>
        <span><a href="/privacy">Privacy</a><span className="dot" />Built for possibility. Everywhere.</span>
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
            {key === 'students' && <GraduationCap size={18} />}
            {key === 'placement' && <Users size={18} />}
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
    ['Problem', 'Capability is hidden across resumes, courses, spreadsheets, and scattered projects.'],
    ['Pathwisse approach', 'Connect direction, skill growth, practice, and evidence in one readable system.'],
    ['Product experience', 'Give each audience a focused workspace without breaking the shared ecosystem.'],
    ['Outcome', 'Students know what to do next. Teams know who needs support. Enterprises know where capability lives.'],
  ], []);

  return (
    <section className="ecosystem-story">
      <div className="story-visual"><img src="/pathwisse-ecosystem.png" alt="Connected Pathwisse capability system across students, placement teams, and enterprises" loading="lazy" width="1792" height="1024" /><span className="visual-caption">Capability becomes useful when people can act on it.</span></div>
      <div className="story-copy">
        <span className="eyebrow">PROGRESS WITH A PURPOSE</span>
        <h2>One evidence layer. Many decisions.</h2>
        <p>Pathwisse turns learning and applied work into signals that can be inspected, discussed, and improved. It is calm by design: fewer vague promises, more visible next steps.</p>
        <div className="narrative-stack">{cards.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        <a className="text-link" href="/products/platform">Meet the Pathwisse Platform <ArrowUpRight size={16} /></a>
      </div>
    </section>
  );
}

function ProductEcosystem() {
  return (
    <section className="products-section">
      <div className="section-heading"><div><span className="eyebrow">THE PATHWISSE ECOSYSTEM</span><h2>Focused products. One direction of travel.</h2></div><a className="text-link" href="/products">Explore all products <ArrowUpRight size={16} /></a></div>
      <div className="product-feature">
        <div><span className="product-badge"><AudioLines size={19} /> CAREER VOICE</span><h3>Start with the question beneath the question.</h3><p>A guided career audit for interests, role comparison, evidence review, diagnosis, and a next action. Answer by voice or text, then move with more confidence.</p><a className="text-link" href="/products/career-voice">Find your career voice <ArrowUpRight size={16} /></a></div>
        <div className="voice-visual"><div className="voice-orb"><AudioLines size={52} /></div><blockquote>"What could my next<br />chapter look like?"</blockquote><span>Understand → Choose → Audit → Next action</span></div>
      </div>
      <div className="product-pair">
        <a href="/products/enterprise-upskilling"><span className="eyebrow">ENTERPRISE UPSKILLING</span><h3>Capability gaps become role-based journeys.</h3><p>Assess teams, identify gaps, assign structured paths, and review growth through applied work.</p><span className="text-link">Explore workforce upskilling <ArrowUpRight size={16} /></span></a>
        <a href="/products/talent-intelligence"><span className="eyebrow">TALENT INTELLIGENCE <span className="coming">IN DEVELOPMENT</span></span><h3>Hiring signals become easier to inspect.</h3><p>Discover candidates through demonstrated skills, projects, and evidence of capability.</p><span className="text-link">Join the hiring waitlist <ArrowUpRight size={16} /></span></a>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="trust-band">
      {[
        [ShieldCheck, 'Evidence-led', 'Signals are grounded in applied work and readiness context.'],
        [Target, 'Actionable', 'Every view points toward the next useful step.'],
        [Sparkles, 'AI-assisted', 'Guidance supports decisions without replacing human judgement.'],
      ].map(([Icon, title, text]) => {
        const TrustIcon = Icon as typeof ShieldCheck;
        return <div key={title as string}><TrustIcon size={20} /><b>{title as string}</b><p>{text as string}</p></div>;
      })}
    </section>
  );
}

export function CTA({ title = 'Your next chapter starts with clarity.' }: { title?: string }) {
  return (
    <section className="cta-section">
      <span className="eyebrow">POTENTIAL IS JUST THE BEGINNING</span>
      <h2>{title}</h2>
      <div className="button-row"><a className="button orange" href={APP}>Find your path <ArrowRight size={16} /></a><a className="light-link" href="/contact">Let's build together <ArrowUpRight size={16} /></a></div>
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
            <div className="eyebrow hero-eyebrow"><span className="orange-line" />CLARITY. CAPABILITY. POSSIBILITY.</div>
            <h1>Pathwisse turns capability into visible, actionable proof<span className="orange-text">.</span></h1>
            <p>A connected career-readiness and capability system for students, placement teams, and enterprises. Know what to do next, who needs support, and who can do the work.</p>
            <div className="button-row"><a className="button" href="#audiences">Explore the three views <ArrowRight size={16} /></a><a className="text-link" href="/contact">Partner with us <ArrowUpRight size={16} /></a></div>
            <div className="hero-note"><span className="tiny-check"><Check size={11} /></span>Students: know what to do next. Placement teams: know who is ready. Enterprises: hire with evidence and upskill with direction.</div>
          </div>
          <div className="hero-product">
            <div className="floating-label"><span className="proof-icon"><Check size={16} /></span><div><b>Capability, made visible.</b><small>Direction → practice → proof → action</small></div></div>
            <AudienceWorkspace active="students" />
            <div className="path-caption"><span className="path-line" />One Pathwisse system. Three customized experiences.</div>
          </div>
        </section>
        <TrustBand />
        <AudienceExperience />
        <EcosystemStory />
        <ProductEcosystem />
        <section className="resources-section">
          <div className="section-heading"><div><span className="eyebrow">ORGANIC GROWTH INFRASTRUCTURE</span><h2>Pages built for search, answers, and conversion.</h2></div><a href="/resources" className="text-link">Explore resources <ArrowUpRight size={16} /></a></div>
          <div className="resource-grid">
            {[
              ['CAREER ROADMAP', 'Data Analyst', 'Turn questions into useful insights.', '/careers/data-analyst', <Compass size={55} key="icon" />],
              ['PRACTICAL GUIDE', 'Build proof, not just a resume.', 'A guide to projects that show what you can do.', '/guides/build-career-evidence', <Layers3 size={55} key="icon" />],
              ['FOR TEAMS', 'From skill gaps to growth.', 'Make workforce development more focused.', '/workforce/skill-gap-analysis', <BarChart3 size={55} key="icon" />],
            ].map((x, index) => (
              <a className="resource-item" href={x[3] as string} key={x[1] as string}><div className={'resource-art art-0' + (index + 1)}><span>{x[4]}</span><small>{x[0] as string}</small><ArrowUpRight /></div><h3>{x[1] as string}</h3><p>{x[2] as string}</p></a>
            ))}
          </div>
        </section>
        <CTA title="Turn potential into proof people can act on." />
      </main>
      <Footer />
    </>
  );
}
