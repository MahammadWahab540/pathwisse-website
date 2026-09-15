'use client';

import {
  AudioLines,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  Flame,
  GitBranch,
  Layers3,
  Radio,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Dashboard } from './site';

export function Experience({ kind, slug }: { kind: string; slug?: string }) {
  // ── 1. CAREERVOICE (Cinematic dark immersive voice interface) ──────────
  if (slug === 'product/career-voice' || kind === 'voice') {
    return (
      <div style={{ background: '#0a1220', borderRadius: 16, border: '1px solid #1e2c46', color: '#fff', padding: 24, boxShadow: '0 25px 60px rgba(7,16,33,0.4)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontSize: 11, letterSpacing: 1.2, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>CAREERVOICE AUDIT ACTIVE</span>
          </div>
          <span style={{ fontSize: 11, color: '#38bdf8', background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(56,189,248,0.3)', padding: '3px 10px', borderRadius: 20 }}>AI Voice Diagnostic</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0', textAlign: 'center' }}>
          {/* Luminous Orb */}
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #60a5fa, #1d4ed8 60%, #0f172a)', boxShadow: '0 0 45px rgba(59,130,246,0.5), inset 0 0 20px #93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <AudioLines size={44} color="#fff" />
          </div>

          {/* Waveform Bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 28, marginBottom: 16 }}>
            {[14, 22, 10, 26, 18, 28, 16, 24, 12, 20, 28, 14, 22, 16].map((h, i) => (
              <span key={i} style={{ width: 3, height: h, background: i % 2 === 0 ? '#38bdf8' : '#f59e0b', borderRadius: 2, opacity: 0.85 }} />
            ))}
          </div>

          <p style={{ fontSize: 13, color: '#cbd5e1', maxWidth: 380, fontStyle: 'italic', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: 10 }}>
            &ldquo;I enjoy building data pipelines in SQL and Python, but I feel uncertain explaining trade-offs during live technical interviews...&rdquo;
          </p>
        </div>

        {/* Floating Evidence Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8 }}>
            <span style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>Career Clarity</span>
            <b style={{ fontSize: 14, color: '#38bdf8' }}>Data Analyst</b>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8 }}>
            <span style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>Communication IRI</span>
            <b style={{ fontSize: 14, color: '#10b981' }}>76 / 100</b>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 10, borderRadius: 8 }}>
            <span style={{ fontSize: 10, color: '#94a3b8', display: 'block' }}>Priority Gap</span>
            <b style={{ fontSize: 14, color: '#f59e0b' }}>System Design</b>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. CAREER ROADMAPS (Spatial vertical journey map) ─────────────────
  if (slug === 'product/career-roadmaps') {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 20px 50px rgba(23,60,110,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>SPATIAL LEARNING MAP</span>
            <h4 style={{ fontSize: 16, margin: '2px 0 0', fontWeight: 600 }}>Data Analyst: 12-Month Path</h4>
          </div>
          <span style={{ fontSize: 11, color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>Stage 02 of 04</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 12, borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} /></span>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13, display: 'block' }}>Stage 01: Foundations & Analytical Thinking</b>
              <small style={{ color: '#64748b', fontSize: 11 }}>Structured thinking · Data cleaning · Excel models</small>
            </div>
            <span style={{ fontSize: 10, color: '#059669', fontWeight: 600, background: '#d1fae5', padding: '3px 8px', borderRadius: 12 }}>Completed</span>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 12, borderRadius: 10, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Compass size={16} /></span>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13, display: 'block', color: '#1e40af' }}>Stage 02: Relational SQL & Data Aggregations</b>
              <small style={{ color: '#3b82f6', fontSize: 11 }}>Joins · Subqueries · Window functions (6 / 8 done)</small>
            </div>
            <span style={{ fontSize: 10, color: '#1d4ed8', fontWeight: 600, background: '#dbeafe', padding: '3px 8px', borderRadius: 12 }}>In Progress</span>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 12, borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9', opacity: 0.7 }}>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>03</span>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13, display: 'block' }}>Stage 03: Applied Enterprise Project</b>
              <small style={{ color: '#64748b', fontSize: 11 }}>E-Commerce Customer Retention & Anomaly Brief</small>
            </div>
            <span style={{ fontSize: 10, color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: 12 }}>Milestone</span>
          </div>
        </div>
      </div>
    );
  }

  // ── 3. PRACTICE LAB (Game-like performance cockpit) ───────────────────
  if (slug === 'product/practice-lab') {
    return (
      <div style={{ background: '#0f172a', borderRadius: 16, border: '1px solid #1e293b', color: '#fff', padding: 24, boxShadow: '0 25px 60px rgba(15,23,42,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flame size={20} color="#f97316" />
            <b style={{ fontSize: 14, color: '#fdba74' }}>18-Day Practice Streak</b>
          </div>
          <span style={{ fontSize: 11, color: '#a7f3d0', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', padding: '3px 10px', borderRadius: 20 }}>Top 5% Consistency</span>
        </div>

        {/* Daily Mission Card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: '#94a3b8', letterSpacing: 0.8, textTransform: 'uppercase' }}>TODAY&apos;S MISSION</span>
            <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>2 / 3 Tasks Done</span>
          </div>
          <p style={{ fontSize: 13, margin: 0, fontWeight: 500 }}>Advanced SQL: Window Frame Framing & Partition Aggregations</p>
        </div>

        {/* Compact Challenge Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 12 }}>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>Aptitude Lab</span>
            <b style={{ display: 'block', fontSize: 14, margin: '4px 0', color: '#38bdf8' }}>92% Accuracy</b>
            <small style={{ fontSize: 10, color: '#64748b' }}>Data Sufficiency · Speed test</small>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 12 }}>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>Interview Lab</span>
            <b style={{ display: 'block', fontSize: 14, margin: '4px 0', color: '#10b981' }}>8.4 / 10 Rubric</b>
            <small style={{ fontSize: 10, color: '#64748b' }}>Reasoning & trade-off explanation</small>
          </div>
        </div>
      </div>
    );
  }

  // ── 4. ENTERPRISE PROJECTS (Editorial case study & task board) ────────
  if (slug === 'product/enterprise-projects') {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 20px 50px rgba(23,60,110,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>COMPANY PROJECT BRIEF</span>
            <h4 style={{ fontSize: 16, margin: '2px 0 0', fontWeight: 600 }}>FinTech Merchant Churn Model</h4>
          </div>
          <span style={{ fontSize: 11, color: '#0f766e', background: '#ccfbf1', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>Production Grade</span>
        </div>

        <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.6, background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0', margin: '0 0 16px' }}>
          Sourced from partner enterprise specs: Ingest raw transaction logs, write clean SQL aggregation views, and build an explainable churn alert pipeline.
        </p>

        {/* Task Board Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, background: '#f8fafc' }}>
            <span style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>01. DATA INGESTION</span>
            <b style={{ display: 'block', fontSize: 11, margin: '6px 0 2px', color: '#059669' }}><Check size={11} style={{ display: 'inline' }} /> Completed</b>
            <small style={{ fontSize: 10, color: '#94a3b8' }}>Schema parsed</small>
          </div>
          <div style={{ border: '1px solid #bfdbfe', borderRadius: 8, padding: 10, background: '#eff6ff' }}>
            <span style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 700 }}>02. SQL QUERIES</span>
            <b style={{ display: 'block', fontSize: 11, margin: '6px 0 2px', color: '#2563eb' }}>Under Review</b>
            <small style={{ fontSize: 10, color: '#60a5fa' }}>GitHub PR #4</small>
          </div>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, background: '#f8fafc', opacity: 0.6 }}>
            <span style={{ fontSize: 9, color: '#64748b', fontWeight: 700 }}>03. DASHBOARD</span>
            <b style={{ display: 'block', fontSize: 11, margin: '6px 0 2px', color: '#64748b' }}>Pending</b>
            <small style={{ fontSize: 10, color: '#94a3b8' }}>Visual narrative</small>
          </div>
        </div>
      </div>
    );
  }

  // ── 5. SKILL PASSPORT (Premium digital passport) ──────────────────────
  if (slug === 'product/skill-passport') {
    return (
      <div style={{ background: 'linear-gradient(145deg, #111e38, #182e56)', borderRadius: 16, border: '1px solid #2d4575', color: '#fff', padding: 24, boxShadow: '0 25px 60px rgba(17,30,56,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: 16, marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1.4, color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700 }}>PATHWISSE VERIFIED PASSPORT</span>
            <h4 style={{ fontSize: 17, margin: '4px 0 0', fontWeight: 600 }}>Candidate ID: PW-2026-9184</h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', padding: '4px 10px', borderRadius: 20 }}>
            <ShieldCheck size={14} color="#34d399" />
            <span style={{ fontSize: 11, color: '#a7f3d0', fontWeight: 600 }}>Tamper Proof</span>
          </div>
        </div>

        {/* Skill Constellation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>Verified Skill</span>
            <b style={{ display: 'block', fontSize: 13, color: '#fff', margin: '4px 0' }}>SQL Analytics (Level 4)</b>
            <span style={{ fontSize: 10, color: '#38bdf8' }}>✓ 18 Query Benchmarks</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: 10, color: '#94a3b8' }}>Verified Capstone</span>
            <b style={{ display: 'block', fontSize: 13, color: '#fff', margin: '4px 0' }}>FinTech Churn Model</b>
            <span style={{ fontSize: 10, color: '#34d399' }}>✓ Live Repo + Mentor Sign-off</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
          <span>Verification Hash: 8f4b...c392</span>
          <span style={{ color: '#60a5fa' }}>Share with Recruiters ↗</span>
        </div>
      </div>
    );
  }

  // ── 6. READINESS INTELLIGENCE (Clinical diagnostic dashboard) ─────────
  if (slug === 'product/readiness-intelligence') {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 20px 50px rgba(23,60,110,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>CLINICAL READINESS DIAGNOSTIC</span>
            <h4 style={{ fontSize: 16, margin: '2px 0 0', fontWeight: 600 }}>Multi-Factor Capability Model</h4>
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong style={{ fontSize: 24, color: '#2563eb', fontWeight: 700 }}>82%</strong>
            <small style={{ display: 'block', fontSize: 9, color: '#64748b' }}>Placement Probability</small>
          </div>
        </div>

        {/* Factor Tree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {[
            ['Technical Depth (SQL, Python, DB)', 88, '#2563eb'],
            ['Communication & Interview Index (IRI)', 76, '#10b981'],
            ['Enterprise Project Proof & Repos', 90, '#8b5cf6'],
            ['Aptitude & Problem Solving Consistency', 72, '#f59e0b'],
          ].map(([label, score, color]) => (
            <div key={label as string}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: '#475569', fontWeight: 500 }}>{label as string}</span>
                <b style={{ color: color as string }}>{score as number}%</b>
              </div>
              <div style={{ height: 6, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${score}%`, height: '100%', background: color as string, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Why this changed delta */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: 8, fontSize: 11, color: '#166534', display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={16} color="#16a34a" />
          <span><b>+8% Readiness Lift:</b> Completed Capstone project review and 14-day aptitude sprint.</span>
        </div>
      </div>
    );
  }

  // ── 7. JOB INTELLIGENCE (Live market radar & demand streams) ──────────
  if (slug === 'product/job-intelligence') {
    return (
      <div style={{ background: '#0b1320', borderRadius: 16, border: '1px solid #1e2c46', color: '#fff', padding: 24, boxShadow: '0 25px 60px rgba(11,19,32,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Radio size={16} color="#38bdf8" />
            <b style={{ fontSize: 13, color: '#e2e8f0' }}>Live Labour Market Radar</b>
          </div>
          <span style={{ fontSize: 10, color: '#38bdf8', background: 'rgba(56,189,248,0.15)', padding: '3px 8px', borderRadius: 12 }}>3,400+ Live Postings</span>
        </div>

        {/* Market Streams */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <b style={{ fontSize: 13, color: '#fff' }}>Data Analyst & BI Specialist</b>
              <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>+34% YoY Demand</span>
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Top Required: SQL Joins, Power BI DAX, Python Automation, Stakeholder Memos</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <b style={{ fontSize: 13, color: '#fff' }}>Full Stack & AI Engineer</b>
              <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600 }}>₹6–14 LPA Median</span>
            </div>
            <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>Top Required: React, Node.js/Python, Vector DBs, REST APIs, Git evidence</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b' }}>
          <span>Matched against campus student profiles</span>
          <span style={{ color: '#38bdf8' }}>126 instant matches available</span>
        </div>
      </div>
    );
  }

  // ── 8. PLACEMENT INTELLIGENCE (Operational Command Center) ────────────
  if (slug === 'product/placement-intelligence' || slug === 'colleges/placement-teams') {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 20px 50px rgba(23,60,110,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>COMMAND CENTER COHORT TIERS</span>
            <h4 style={{ fontSize: 16, margin: '2px 0 0', fontWeight: 600 }}>2026 Placement Batch (1,200 Students)</h4>
          </div>
          <span style={{ fontSize: 11, color: '#059669', background: '#d1fae5', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>Active Drive</span>
        </div>

        {/* 4 Actionable Tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, padding: 10, textAlign: 'center' }}>
            <b style={{ fontSize: 18, color: '#059669', display: 'block' }}>312</b>
            <span style={{ fontSize: 10, color: '#065f46', fontWeight: 600 }}>Placement Ready</span>
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: 10, textAlign: 'center' }}>
            <b style={{ fontSize: 18, color: '#2563eb', display: 'block' }}>428</b>
            <span style={{ fontSize: 10, color: '#1e40af', fontWeight: 600 }}>Nearly Ready</span>
          </div>
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 10, textAlign: 'center' }}>
            <b style={{ fontSize: 18, color: '#d97706', display: 'block' }}>306</b>
            <span style={{ fontSize: 10, color: '#92400e', fontWeight: 600 }}>Intervention</span>
          </div>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 10, textAlign: 'center' }}>
            <b style={{ fontSize: 18, color: '#dc2626', display: 'block' }}>154</b>
            <span style={{ fontSize: 10, color: '#991b1b', fontWeight: 600 }}>High Risk</span>
          </div>
        </div>

        {/* Company Match Decision */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Mandate: Software Engineer (₹8 LPA | Python + SQL)</span>
            <span style={{ fontSize: 11, color: '#2563eb', fontWeight: 700 }}>72 Strong Matches</span>
          </div>
        </div>
      </div>
    );
  }

  // ── 9. EMPLOYABILITY ANALYTICS (Executive boardroom view) ─────────────
  if (slug === 'product/employability-analytics' || slug === 'colleges/overview') {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 20px 50px rgba(23,60,110,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: 1, color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>INSTITUTIONAL BOARDROOM METRICS</span>
            <h4 style={{ fontSize: 16, margin: '2px 0 0', fontWeight: 600 }}>Employability & Accreditation Telemetry</h4>
          </div>
          <span style={{ fontSize: 11, color: '#4338ca', background: '#e0e7ff', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>NIRF & NAAC Ready</span>
        </div>

        {/* Branch Benchmarking Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[
            ['Computer Science & Engg', 86, '+14% YoY lift'],
            ['Information Technology', 81, '+9% YoY lift'],
            ['Electronics & Communication', 74, '+18% YoY lift'],
            ['Mechanical & Core Branches', 62, '+22% YoY lift'],
          ].map(([branch, pct, note]) => (
            <div key={branch as string} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: 6, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{branch as string}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: '#059669' }}>{note as string}</span>
                <b style={{ fontSize: 13, color: '#1e293b', minWidth: 36, textAlign: 'right' }}>{pct as number}%</b>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>
          Continuous institutional telemetry: Learning → Evidence → Employability → Placement
        </div>
      </div>
    );
  }

  // ── DEFAULT FALLBACK (Students, Enterprises, etc.) ───────────────────
  if (kind === 'student') return <Dashboard />;

  return <Dashboard kind={kind} />;
}
