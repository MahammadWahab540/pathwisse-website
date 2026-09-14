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
  function save(next: AnswerMap) { setAnswers(next); try { localStorage.setItem(key, JSON.stringify(next)); } catch {} }
  if (mode === 'start') return <section className="audit-shell"><div className="audit-copy"><span className="eyebrow">CAREER AUDIT</span><h1>Find the next useful direction.</h1><p>This is guidance, not a psychological test. Pathwisse uses your interests, current proof, practice time, and uncertainty to suggest a practical career direction and roadmap.</p><a className="button" href="/career-audit/assessment" onClick={() => track('career_audit_start','student')}>Start the audit <ArrowRight size={16}/></a></div><AuditPanel top={top} readiness={readiness}/></section>;
  if (mode === 'assessment') return <section className="audit-page"><span className="eyebrow">CAREER AUDIT ASSESSMENT</span><h1>Answer five practical questions.</h1><div className="question-list">{questions.map((q, index) => <fieldset key={q.id}><legend>{index + 1}. {q.label}</legend>{q.options.map(([value,label]) => <button type="button" className={answers[q.id] === value ? 'selected' : ''} onClick={() => save({ ...answers, [q.id]: value })} key={value}>{label}</button>)}</fieldset>)}</div><a className={Object.keys(answers).length >= questions.length ? 'button' : 'button disabled'} href="/career-audit/result" onClick={(e) => { if (Object.keys(answers).length < questions.length) e.preventDefault(); else track('career_audit_complete','student'); }}>See my result <ArrowRight size={16}/></a></section>;
  if (mode === 'result') return <section className="audit-shell"><div className="audit-copy"><span className="eyebrow">YOUR AUDIT RESULT</span><h1>{top.title} looks like the strongest first path.</h1><p>This recommendation is based on your selected interests and current proof. Treat it as a direction to test through skills, practice, and one strong project.</p><div className="audit-result-grid"><div><b>Skills to explore</b>{top.skills.map(s => <span key={s}>{s}</span>)}</div><div><b>Suggested project</b><span>{top.project}</span></div><div><b>Current readiness guidance</b><span>{readiness}% illustrative readiness</span></div></div><a className="button" href="/career-audit/roadmap">Generate roadmap <ArrowRight size={16}/></a></div><AuditPanel top={top} readiness={readiness}/></section>;
  return <section className="audit-page"><span className="eyebrow">PERSONALIZED ROADMAP</span><h1>Your first 30-day roadmap for {top.title}.</h1><div className="roadmap-plan">{['Clarify role expectations','Build the first core skill','Practice with small tasks','Create one project artifact','Prepare your project explanation'].map((step,i)=><div key={step}><span>{String(i+1).padStart(2,'0')}</span><h2>{step}</h2><p>{i===1?`Start with ${top.skills[0]} and connect it to a real task.`:i===3?`Build: ${top.project}. Capture your problem, choices, output, and reflection.`:'Keep the step small enough to complete and visible enough to prove progress.'}</p></div>)}</div><div className="button-row"><a className="button" href={top.path}>Open {top.title} roadmap <ArrowRight size={16}/></a><a className="text-link" href="https://careervoice.pathwisse.com">Continue in Career Voice <ArrowRight size={16}/></a></div></section>;
}

function AuditPanel({ top, readiness }: { top: { title:string; skills:string[]; project:string }, readiness: number }) {
  return <div className="audit-panel"><span>Illustrative result</span><h2>{top.title}</h2><div className="audit-meter"><strong>{readiness}%</strong><small>direction confidence</small></div>{top.skills.map(skill => <p key={skill}><CheckCircle2 size={16}/>{skill}</p>)}<em>Recommended proof: {top.project}</em></div>;
}
