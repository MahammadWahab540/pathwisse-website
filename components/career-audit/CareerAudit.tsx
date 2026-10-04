'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { track } from '@/app/tracking';

const questions = [
  { id: 'work', label: 'Which work feels most interesting right now?', options: [ ['analytics','Finding patterns in data'], ['business','Solving business process problems'], ['product','Shaping product decisions'], ['engineering','Building working software'], ['ai','Building AI-assisted workflows'] ] },
  { id: 'strength', label: 'Which strength do you already use often?', options: [ ['communication','Explaining ideas clearly'], ['logic','Breaking problems into steps'], ['data','Working with numbers or evidence'], ['building','Making things work'], ['strategy','Choosing what matters most'] ] },
  { id: 'proof', label: 'What proof do you currently have?', options: [ ['none','No project yet'], ['practice','Practice exercises'], ['project','One or more projects'], ['internship','Internship or work sample'] ] },
  { id: 'pace', label: 'How much time can you practice each week?', options: [ ['light','2–3 hours'], ['steady','4–6 hours'], ['deep','7+ hours'] ] },
  { id: 'confidence', label: 'What feels most unclear?', options: [ ['direction','Which role to choose'], ['skills','Which skills to learn'], ['projects','Which project to build'], ['interviews','How to explain myself'] ] },
];

const roles = {
  analytics: { title: 'Data Analyst', skills: ['SQL', 'Power BI', 'Communication'], project: 'Customer insights dashboard', path: '/careers/data-analyst' },
  business: { title: 'Business Analyst', skills: ['Communication', 'SQL', 'Process mapping'], project: 'Process improvement brief', path: '/careers/business-analyst' },
  product: { title: 'Product Manager', skills: ['User research', 'Prioritization', 'Metrics'], project: 'Feature discovery memo', path: '/careers/product-manager' },
  engineering: { title: 'Full Stack Developer', skills: ['JavaScript', 'APIs', 'Databases'], project: 'Career dashboard app', path: '/careers/full-stack-developer' },
  ai: { title: 'AI Engineer', skills: ['Python', 'AI workflow design', 'Evaluation'], project: 'AI support assistant prototype', path: '/careers/ai-engineer' },
};

type AnswerMap = Record<string,string>;
type Mode = 'start' | 'assessment' | 'result' | 'roadmap';
const key = 'pathwisse-career-audit';

function score(answers: AnswerMap) {
  const tally: Record<string, number> = { analytics: 0, business: 0, product: 0, engineering: 0, ai: 0 };
  if (answers.work) tally[answers.work] += 4;
  if (answers.strength === 'data') tally.analytics += 2;
  if (answers.strength === 'logic') { tally.analytics += 1; tally.engineering += 2; tally.ai += 1; }
  if (answers.strength === 'communication') { tally.business += 2; tally.product += 1; }
  if (answers.strength === 'building') tally.engineering += 2;
  if (answers.strength === 'strategy') tally.product += 2;
  if (answers.confidence === 'direction') tally.product += 1;
  if (answers.confidence === 'skills') tally.analytics += 1;
  if (answers.confidence === 'projects') tally.engineering += 1;
  if (answers.confidence === 'interviews') tally.business += 1;
  return Object.entries(tally).sort((a,b) => b[1] - a[1]).map(([role]) => role as keyof typeof roles);
}

export function CareerAudit({ mode }: { mode: Mode }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  useEffect(() => { try { setAnswers(JSON.parse(localStorage.getItem(key) || '{}')); } catch {} }, []);
  const ranked = useMemo(() => score(answers), [answers]);
  const top = roles[ranked[0] || 'analytics'];
  const readiness = Math.min(88, 28 + Object.keys(answers).length * 10 + (answers.proof === 'project' ? 15 : answers.proof === 'internship' ? 20 : 0));
  function save(next: AnswerMap) {
    setAnswers(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }

  function handleComplete() {
    track('career_audit_complete','student');
    // Asynchronously sync to D1 database
    try {
      fetch('/api/career-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          recommendedRole: ranked[0] || 'analytics',
          readinessScore: readiness,
        }),
      }).catch(() => {});
    } catch {}
  }

  if (mode === 'start') {
    const savedCount = Object.keys(answers).length;
    return (
      <section className="audit-shell">
        <div className="audit-copy">
          <span className="eyebrow">CAREER AUDIT DIAGNOSTIC</span>
          <h1>Find the next useful direction.</h1>
          <p>
            This is structured guidance, not a psychological quiz. Pathwisse evaluates your current engineering interests, existing proof artifacts, available weekly practice hours, and key uncertainties to suggest an actionable role trajectory.
          </p>

          {/* AUD-01 to AUD-04: Scope, Time, Save/Resume & Calculation transparency */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 py-4 border-y border-[#e2e8f0]">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
              <strong className="text-sm font-semibold text-[#142e50]">~3 Minutes</strong>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Structure</span>
              <strong className="text-sm font-semibold text-[#142e50]">5 Diagnostic Steps</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Progress</span>
              <strong className="text-sm font-semibold text-[#142e50]">
                {savedCount > 0 ? `${savedCount}/5 saved (Auto-resumes)` : 'Auto-saved locally'}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="button"
              href="/career-audit/assessment"
              onClick={() => track('career_audit_start', 'student')}
            >
              <span>{savedCount > 0 ? 'Resume the audit' : 'Start the audit'}</span>
              <ArrowRight size={16} />
            </a>
            {savedCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem(key);
                    setAnswers({});
                  } catch {}
                }}
                className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
              >
                Reset answers
              </button>
            )}
          </div>
        </div>
        <AuditPanel top={top} readiness={readiness} />
      </section>
    );
  }
  if (mode === 'assessment') return <section className="audit-page"><span className="eyebrow">CAREER AUDIT ASSESSMENT</span><h1>Answer five practical questions.</h1><div className="question-list">{questions.map((q, index) => <fieldset key={q.id}><legend>{index + 1}. {q.label}</legend>{q.options.map(([value,label]) => <button type="button" className={answers[q.id] === value ? 'selected' : ''} onClick={() => save({ ...answers, [q.id]: value })} key={value}>{label}</button>)}</fieldset>)}</div><a className={Object.keys(answers).length >= questions.length ? 'button' : 'button disabled'} href="/career-audit/result" onClick={(e) => { if (Object.keys(answers).length < questions.length) e.preventDefault(); else handleComplete(); }}>See my result <ArrowRight size={16}/></a></section>;
  if (mode === 'result') {
    const alternativeRole = roles[ranked[1] || 'engineering'];
    return (
      <section className="audit-shell">
        <div className="audit-copy">
          <span className="eyebrow">YOUR AUDIT ANALYSIS</span>
          <h1>{top.title} is your highest-fit career trajectory.</h1>
          <p>
            Based directly on your interest in {answers.work ? (answers.work === 'engineering' ? 'shipping working software' : answers.work === 'analytics' ? 'finding patterns in data' : answers.work === 'business' ? 'solving organizational problems' : answers.work === 'ai' ? 'building AI systems' : 'shaping product decisions') : 'core engineering'} and strength in {answers.strength || 'structured logic'}, {top.title} offers your fastest path to employment.
          </p>

          <div className="my-6 p-5 rounded-2xl bg-[#edf5ff] border border-[#cbdcf0]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#173c6e] block mb-2">3 Evidence-Led Reasons For This Fit:</span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#1e3a5f]">
              <li className="flex items-start gap-2">
                <span className="text-[#2458ae] font-bold">1.</span>
                <span><strong>Natural Strength Alignment:</strong> Your inclination toward {answers.strength || 'logic'} maps directly to high-performing {top.title} rubrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2458ae] font-bold">2.</span>
                <span><strong>Fastest Proof Creation:</strong> Building the recommended <em>{top.project}</em> gives you an auditable GitHub artifact within 3 weeks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2458ae] font-bold">3.</span>
                <span><strong>Market Hiring Demand:</strong> Tier-1 tech teams are currently screening candidates with demonstrated skills in {top.skills.join(', ')}.</span>
              </li>
            </ul>
          </div>

          <div className="audit-result-grid">
            <div>
              <b>Skills to Build First</b>
              {top.skills.map(s => <span key={s}>{s}</span>)}
            </div>
            <div>
              <b>Primary Capstone Proof</b>
              <span>{top.project}</span>
            </div>
            <div>
              <b>Alternative Role Fit</b>
              <span>{alternativeRole.title} (Secondary path)</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a className="button" href="/career-audit/roadmap">
              Generate 30-Day Action Roadmap <ArrowRight size={16}/>
            </a>
            <a className="text-link" href={top.path}>
              View complete {top.title} syllabus ↗
            </a>
          </div>
        </div>
        <AuditPanel top={top} readiness={readiness} />
      </section>
    );
  }

  // mode === 'roadmap'
  const roadmapSteps = [
    {
      title: 'Clarify Role Architecture & Technical Bounds',
      task: `Inspect industry job descriptions for ${top.title}. Map standard responsibilities against your existing university syllabus.`,
      duration: 'Week 1 · 4-6 Hours',
      deliverable: '1-page role scope memo & environment setup'
    },
    {
      title: `Build Core Foundational Competency: ${top.skills[0]}`,
      task: `Complete structured exercises in ${top.skills[0]}. Focus on edge-case handling, clean syntax, and automated test passes.`,
      duration: 'Week 2 · 8-10 Hours',
      deliverable: '10 verified exercise submissions in Skill Passport'
    },
    {
      title: `Expand Into Secondary Domain: ${top.skills[1]}`,
      task: `Learn schema design, relational querying, and workflow integration for ${top.skills[1]}.`,
      duration: 'Week 3 · 8-10 Hours',
      deliverable: 'Working data pipeline or modular API backend'
    },
    {
      title: `Ship Verified Capstone Artifact: ${top.project}`,
      task: `Architect, document, and deploy your capstone: "${top.project}". Include architectural decision memos and automated test suites.`,
      duration: 'Week 4 · 12-14 Hours',
      deliverable: 'Public GitHub repo with passing CI/CD workflow'
    },
    {
      title: 'Technical Review & Candidate Dossier Publication',
      task: 'Submit your codebase for peer review. Publish your verified Skill Passport badge for campus recruiters.',
      duration: 'Week 5 · 2-4 Hours',
      deliverable: 'Defensible candidate portfolio URL ready for recruiters'
    }
  ];

  return (
    <section className="audit-page">
      <span className="eyebrow">STRUCTURED 30-DAY MILESTONES</span>
      <h1>Your verifiable roadmap for {top.title}.</h1>
      <p className="text-base text-slate-600 mb-8 max-w-2xl">
        Every milestone produces a concrete artifact. Avoid tutorial hell by building working proofs that recruiters can audit.
      </p>

      <div className="roadmap-plan">
        {roadmapSteps.map((step, i) => (
          <div key={step.title} className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                PHASE 0{i + 1} · {step.duration}
              </span>
            </div>
            <h2 className="text-xl font-bold font-['Outfit'] text-[#0f172a] mb-2">{step.title}</h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">{step.task}</p>
            <div className="pt-3 border-t border-[#f1f5f9] text-xs font-semibold text-[#173c6e] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verifiable Output: {step.deliverable}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="button-row pt-6">
        <a className="button" href={top.path}>
          Start {top.title} Curriculum <ArrowRight size={16}/>
        </a>
        <a className="text-link" href="https://careervoice.pathwisse.com">
          Fine-tune with Career Voice Audio Audit ↗
        </a>
      </div>
    </section>
  );
}

function AuditPanel({ top, readiness }: { top: { title:string; skills:string[]; project:string }, readiness: number }) {
  return (
    <div className="audit-panel">
      <span>Verified Recommendation</span>
      <h2>{top.title}</h2>
      <div className="audit-meter" style={{ '--readiness': `${readiness}%` } as React.CSSProperties}>
        <strong>{readiness}%</strong>
        <small>Role Match Score</small>
      </div>
      <div className="space-y-1.5 my-3">
        {top.skills.map(skill => (
          <p key={skill} className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0"/>{skill}
          </p>
        ))}
      </div>
      <em className="text-xs font-medium text-slate-600 block pt-2 border-t border-slate-200">
        Primary Capstone: {top.project}
      </em>
    </div>
  );
}
