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
import { Hero } from '@/components/hero';
import { NewsletterForm } from '@/components/newsletter-form';
import { LiquidGlassFooter } from '@/components/footer/LiquidGlassFooter';
import { CTABand } from '@/components/shared/CTABand';

export const APP = APP_AUTH_URL;

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
    headline: 'Discover talent through demonstrated capability.',
    summary: 'Evaluate candidates by inspecting actual project decisions, code architecture, and verified readiness signals.',
    cta: 'Request a demo',
    href: '/enterprise/request-demo',
    status: 'Talent Intelligence',
    stat: '4.8x',
    statLabel: 'higher signal-to-hire',
    nav: ['Evidence', 'Candidate Fit', 'Project Proof', 'Direct Shortlist'],
    steps: [
      ['Can they do the work?', 'Inspect capability behind the résumé.', 'Review verifiable project artifacts, problem-solving depth, and architectural trade-offs.', 'Evidence trail', 'Verified projects'],
      ['Who fits this role?', 'Compare candidates against actual role expectations.', 'Signals become actionable when evaluated against the concrete engineering work a role requires.', 'Candidate fit', '92% match'],
      ['How was it evaluated?', 'Transparent assessment criteria.', 'Every readiness score is grounded in code reviews, system design choices, and practice consistency.', 'Signal integrity', 'Inspected proof'],
      ['How fast can we shortlist?', 'Hire with evidence without sorting 1,000 resumes.', 'Identify candidates with demonstrated readiness who can contribute effectively from day one.', 'Shortlist speed', '< 48 hours'],
    ],
  },
};

type AudienceKey = keyof typeof audienceData;

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Pathwisse home" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Outfit', sans-serif", fontSize: '23px', fontWeight: 700, letterSpacing: '-0.02em', color: '#1F3861' }}>
        <span style={{ display: 'block', width: '10px', height: '10px', borderRadius: '50%', background: '#1F3861' }} />
        <span>Path<span style={{ color: '#2458ae' }}>wisse</span></span>
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
          <summary>Students <ChevronDown size={13} /></summary>
          <div className="dropdown">
            <a href="/students">For Students</a>
            <a href="/career-audit/start">Career Audit & Assessment</a>
          </div>
        </details>
        <details>
          <summary>Colleges <ChevronDown size={13} /></summary>
          <div className="dropdown">
            <a href="/colleges">For Colleges & Placement</a>
            <a href="/colleges/request-demo">Request Partnership Demo</a>
          </div>
        </details>
        <details>
          <summary>Enterprise <ChevronDown size={13} /></summary>
          <div className="dropdown">
            <a href="/enterprise">Talent & Hiring Intelligence</a>
            <a href="/enterprise/request-demo">Request Enterprise Demo</a>
          </div>
        </details>
        <details>
          <summary>Products <ChevronDown size={13} /></summary>
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
            <summary>Resources <ChevronDown size={13} /></summary>
            <div className="dropdown">
              <a href="/resources">Resource Hub</a>
              <a href="/resources/blog">Blog & Insights</a>
              <a href="/careers">Career Roadmaps</a>
              <a href="/skills">Skill Guides</a>
              <a href="/compare/data-analyst-vs-business-analyst">Role Comparisons</a>
              <a href={CAREER_VOICE_URL} target="_blank" rel="noopener noreferrer">Career Voice Audit</a>
            </div>
          </details>
          <a href="/pricing" className="text-sm font-semibold text-[#142e50] hover:text-[#2458ae] transition-colors py-2 px-1">
            Pricing
          </a>
          <a href="/hire" className="text-sm font-semibold text-[#142e50] hover:text-[#2458ae] transition-colors py-2 px-1">
            Hire Talent
          </a>
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
  return <LiquidGlassFooter />;
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
      <div className="story-visual relative rounded-2xl border border-[#dce6f2] bg-gradient-to-br from-[#f8fafc] via-white to-[#edf4fc] p-6 shadow-xl overflow-hidden flex flex-col justify-between min-h-[460px]">
        {/* Top Header of the Dossier */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#173c6e] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              PW
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2458ae] block">Verified Skill Passport</span>
              <strong className="text-sm text-[#0f172a] font-['Outfit'] block">Aravind Kumar · Full-Stack Eng.</strong>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> Verified Evidence
          </span>
        </div>

        {/* Middle: 3 Pillars of Evidence */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">Algorithmic</span>
            <div className="text-xl font-bold text-[#173c6e] font-['Outfit']">94<span className="text-xs text-[#64748b] font-normal">/100</span></div>
            <p className="text-[10px] text-[#475569] mt-1 leading-snug">Consistent test suite pass rate</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">Architecture</span>
            <div className="text-xl font-bold text-[#2458ae] font-['Outfit']">Top 5%</div>
            <p className="text-[10px] text-[#475569] mt-1 leading-snug">Modular API design & schema</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs">
            <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide block mb-1">Projects</span>
            <div className="text-xl font-bold text-[#0f172a] font-['Outfit']">4 Shipped</div>
            <p className="text-[10px] text-[#475569] mt-1 leading-snug">Verifiable GitHub repositories</p>
          </div>
        </div>

        {/* Recent Artifact Trail */}
        <div className="rounded-xl bg-white border border-[#e2e8f0] p-4 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#0f172a] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2458ae]" /> Distributed Task Queue
            </span>
            <span className="text-[10px] text-[#64748b] font-mono">PR #42 · Merged</span>
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">
            Architected Redis-backed async job worker with exponential backoff and dead-letter queues. Complete test coverage across 24 edge cases.
          </p>
        </div>

        {/* Bottom Bar: Actionable Proof */}
        <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#64748b]">
          <span className="flex items-center gap-1.5">
            <span className="text-[#10b981] font-bold">✓</span> Evaluated by Senior Technical Reviewers
          </span>
          <span className="font-medium text-[#173c6e]">Inspect Technical Memo ↗</span>
        </div>
      </div>
      <div className="story-copy">
        <span className="eyebrow">PROGRESS WITH A PURPOSE</span>
        <h2>One evidence layer. Many decisions.</h2>
        <p>Pathwisse turns learning and applied work into signals that can be inspected, discussed, and improved. It is calm by design: fewer vague promises, more visible next steps.</p>
        <div className="narrative-stack">{cards.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        <a className="text-link" href="/product">Meet the Pathwisse Platform <ArrowUpRight size={16} /></a>
      </div>
    </section>
  );
}

function ProductEcosystem() {
  return (
    <section className="products-section">
      <div className="section-heading"><div><span className="eyebrow">THE PATHWISSE ECOSYSTEM</span><h2>Focused products. One direction of travel.</h2></div><a className="text-link" href="/product">Explore all products <ArrowUpRight size={16} /></a></div>
      <div className="product-feature">
        <div><span className="product-badge"><AudioLines size={19} /> CAREER VOICE</span><h3>Start with the question beneath the question.</h3><p>A guided career audit for interests, role comparison, evidence review, diagnosis, and a next action. Answer by voice or text, then move with more confidence.</p><a className="text-link" href="/product/career-voice">Find your career voice <ArrowUpRight size={16} /></a></div>
        <div className="voice-visual"><div className="voice-orb"><AudioLines size={52} /></div><blockquote>What could my next<br />chapter look like?</blockquote><span>Understand → Choose → Audit → Next action</span></div>
      </div>
      <div className="product-pair">
        <a href="/enterprise"><span className="eyebrow">TALENT INTELLIGENCE</span><h3>Hiring signals become verifiable capability proof.</h3><p>Discover early-career talent through demonstrated skills, real code projects, and validated problem-solving.</p><span className="text-link">Explore hiring intelligence <ArrowUpRight size={16} /></span></a>
        <a href="/enterprise/request-demo"><span className="eyebrow">EVALUATION PLATFORM</span><h3>Shortlist candidates with inspected evidence.</h3><p>Skip résumé guesswork with actionable readiness metrics and comprehensive project portfolios.</p><span className="text-link">Request enterprise demo <ArrowUpRight size={16} /></span></a>
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

export function CTA({ title = 'Turn potential into proof people can act on.' }: { title?: string }) {
  return (
    <CTABand
      title={title}
      description="Start with what you know, build what you can show, and move forward with evidence."
      primaryAction={{
        label: "Find your path",
        href: APP,
      }}
      secondaryAction={{
        label: "Let's build together",
        href: "/contact",
      }}
    />
  );
}

export function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero accent="#3B82F6" />
        <TrustBand />
        <AudienceExperience />
        <EcosystemStory />
        <ProductEcosystem />
        <section className="resources-section">
          <div className="section-heading"><div><span className="eyebrow">GUIDES & ROADMAPS</span><h2>Structured blueprints for every stage of capability.</h2></div><a href="/resources" className="text-link">Explore all resources <ArrowUpRight size={16} /></a></div>
          <div className="resource-grid">
            {[
              ['CAREER ROADMAP', 'Data Analyst Roadmap', 'Turn questions into structured data models and actionable business signals.', '/careers/data-analyst', <Compass size={55} key="icon" />],
              ['STRATEGIC GUIDE', 'How to choose a career path', 'A practical framework for turning uncertainty into your first clear direction.', '/resources/blog/choose-career-path', <Layers3 size={55} key="icon" />],
              ['FOR EMPLOYERS', 'Hire with Evidence', 'How leading engineering teams identify talent through demonstrated capability.', '/enterprise', <BriefcaseBusiness size={55} key="icon" />],
            ].map((x, index) => (
              <a className="resource-item" href={x[3] as string} key={x[1] as string}><div className={'resource-art art-0' + (index + 1)}><span>{x[4]}</span><small>{x[0] as string}</small><ArrowUpRight /></div><h3>{x[1] as string}</h3><p>{x[2] as string}</p></a>
            ))}
          </div>
        </section>
        <section className="faq" id="faq" style={{ maxWidth: '960px', margin: '4rem auto 2rem', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="eyebrow" style={{ color: '#2563EB', fontWeight: 600, letterSpacing: '0.05em' }}>CLEAR ANSWERS</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem', color: '#0F172A' }}>Frequently asked questions about Pathwisse</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0' }}>
              <summary style={{ fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#1E293B' }}>
                What is Pathwisse and how does it work? <span>+</span>
              </summary>
              <p style={{ marginTop: '0.75rem', color: '#475569', lineHeight: '1.65' }}>
                Pathwisse is a connected capability intelligence platform that turns learning and applied work into verifiable proof. For students, it provides role roadmaps, project evidence, and Career Voice diagnostics. For colleges, it delivers pre-season placement readiness signals and cohort gap analytics. For enterprises, it powers evidence-grounded talent discovery and hiring intelligence.
              </p>
            </details>
            <details style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0' }}>
              <summary style={{ fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#1E293B' }}>
                How is capability proof different from standard course certificates? <span>+</span>
              </summary>
              <p style={{ marginTop: '0.75rem', color: '#475569', lineHeight: '1.65' }}>
                Course certificates confirm completion rather than competence. Pathwisse builds verifiable capability proof from demonstrated project artifacts, code decisions, architectural trade-offs, and consistent problem-solving practice that interviewers and managers can inspect directly.
              </p>
            </details>
            <details style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1.25rem 1.5rem', border: '1px solid #E2E8F0' }}>
              <summary style={{ fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#1E293B' }}>
                What is Career Voice and who should use it? <span>+</span>
              </summary>
              <p style={{ marginTop: '0.75rem', color: '#475569', lineHeight: '1.65' }}>
                Career Voice is an interactive career audit interface accessible via voice or text. It helps learners and career switchers analyze their interests, compare roles, diagnose skill gaps, and define a clear, immediate next action without getting overwhelmed by vague advice.
              </p>
            </details>
          </div>
        </section>
        <CTA title="Turn potential into proof people can act on." />
      </main>
      <Footer />
    </>
  );
}
