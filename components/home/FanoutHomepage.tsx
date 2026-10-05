'use client';

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Search,
  Code2,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Compass,
  FileCode2,
  FolderGit2,
  Flame,
  Binary,
  GitBranch,
  Play,
  Copy,
  Check
} from 'lucide-react';
import { AtomicGlobe } from '@/components/AtomicGlobe';
import { LiquidGlassFooter } from '@/components/footer/LiquidGlassFooter';
import { APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';
import { ENGINEERING_STREAMS } from '@/lib/roles-catalogue';

export function FanoutHomepage() {
  const [activeTab, setActiveTab] = useState<'students' | 'colleges' | 'enterprise'>('students');
  const [streamFilter, setStreamFilter] = useState('cse');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeSpecTab, setActiveSpecTab] = useState<'architecture' | 'code' | 'evaluation'>('architecture');

  // Filter roles dynamically based on stream & search query
  const currentStream = useMemo(() => {
    return ENGINEERING_STREAMS.find((s) => s.id === streamFilter) || ENGINEERING_STREAMS[0];
  }, [streamFilter]);

  const filteredRoles = useMemo(() => {
    let list = currentStream.roles;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q));
    }
    return list;
  }, [currentStream, searchQuery]);

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#1d1d1d] font-sans antialiased selection:bg-[#173c6e] selection:text-white">
      {/* ── TOP UTILITY STRIP / NOTIFICATION ── */}
      <div className="border-b border-[#dedee2] bg-white text-[11px] font-mono tracking-tight text-[#4a4a4a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-[#173c6e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ab673] animate-pulse" />
              PATHWISSE SYS.2026
            </span>
            <span className="text-[#dedee2]">|</span>
            <span className="hidden sm:inline text-[#6e6e6e]">
              206 Engineering Roles Mapped · 13 Streams · Verifiable Proof Layer
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/hire"
              className="hover:text-[#173c6e] transition-colors flex items-center gap-1 text-[11px] font-medium"
            >
              <span>Employer Hiring Portal</span>
              <ArrowUpRight className="w-3 h-3 text-[#929292]" />
            </a>
            <span className="text-[#dedee2]">|</span>
            <a
              href={APP_AUTH_URL}
              className="text-[#173c6e] hover:underline font-semibold"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* ── MINIMALIST FANOUT-STYLE NAVBAR ── */}
      <header className="sticky top-0 z-40 bg-[#f7f7f8]/90 backdrop-blur-md border-b border-[#dedee2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-[#173c6e] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs group-hover:scale-105 transition-transform">
                PW
              </div>
              <span className="font-bold text-lg tracking-tight text-[#173c6e]">
                Path<span className="text-[#2458ae]">wisse</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[#4a4a4a]">
              <a
                href="/students"
                className="px-3 py-1.5 rounded-md hover:text-[#173c6e] hover:bg-[#e8e8ea]/60 transition-colors"
              >
                For Students
              </a>
              <a
                href="/colleges"
                className="px-3 py-1.5 rounded-md hover:text-[#173c6e] hover:bg-[#e8e8ea]/60 transition-colors"
              >
                Colleges & Placement
              </a>
              <a
                href="/enterprise"
                className="px-3 py-1.5 rounded-md hover:text-[#173c6e] hover:bg-[#e8e8ea]/60 transition-colors"
              >
                Enterprise Hiring
              </a>
              <a
                href="/hire"
                className="px-3 py-1.5 rounded-md hover:text-[#173c6e] hover:bg-[#e8e8ea]/60 transition-colors flex items-center gap-1"
              >
                <span>Hire Talent</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-[#2458ae]/10 text-[#2458ae]">
                  206
                </span>
              </a>
              <a
                href="/resources"
                className="px-3 py-1.5 rounded-md hover:text-[#173c6e] hover:bg-[#e8e8ea]/60 transition-colors"
              >
                Roadmaps & Lab
              </a>
              <a
                href="/pricing"
                className="px-3 py-1.5 rounded-md hover:text-[#173c6e] hover:bg-[#e8e8ea]/60 transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={APP_AUTH_URL}
              className="text-xs font-semibold text-[#4a4a4a] hover:text-[#173c6e] px-3 py-1.5 transition-colors hidden sm:inline-block"
            >
              Log in
            </a>
            <a
              href={APP_AUTH_URL}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#173c6e] text-white text-xs font-semibold hover:bg-[#122f56] transition-colors shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: DENSE, TECHNICAL, ATOMIC GLOBE CENTERPIECE ── */}
      <section className="relative border-b border-[#dedee2] bg-white overflow-hidden py-14 sm:py-20 lg:py-24">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#173c6e 1px, transparent 1px), linear-gradient(90deg, #173c6e 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Technical Narrative & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Mono System Kicker */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#f4f4f5] border border-[#dedee2] text-[11px] font-mono text-[#4a4a4a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#173c6e]" />
                <span className="font-semibold text-[#173c6e]">CAPABILITY INTELLIGENCE</span>
                <span className="text-[#dedee2]">/</span>
                <span>ENTRY-LEVEL & PLACEMENT READINESS</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1d] leading-[1.08] font-['Outfit']">
                Mapped engineering learning.{' '}
                <span className="text-[#173c6e]">Turn capability into verified proof.</span>
              </h1>

              {/* Subtitle / Lead Paragraph */}
              <p className="text-base sm:text-lg text-[#4a4a4a] max-w-2xl leading-relaxed">
                Connect structured career roadmaps, daily hands-on practice, and verifiable GitHub
                project artifacts. Built for engineers seeking clarity, colleges tracking placement
                signals, and companies hiring with evidence.
              </p>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={APP_AUTH_URL}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#173c6e] text-white text-sm font-semibold hover:bg-[#122f56] transition-all shadow-xs"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/hire"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white border border-[#dedee2] text-[#272727] text-sm font-semibold hover:bg-[#f4f4f5] hover:border-[#c9c9cf] transition-all shadow-2xs"
                >
                  <Search className="w-4 h-4 text-[#6e6e6e]" />
                  <span>Browse 206 Mapped Roles</span>
                </a>

                <a
                  href={CAREER_VOICE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono font-medium text-[#4a4a4a] hover:text-[#173c6e] transition-colors"
                >
                  <span>Career Voice AI</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#929292]" />
                </a>
              </div>

              {/* System Metric Micro-Tiles */}
              <div className="pt-6 border-t border-[#e8e8ea] grid grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <div className="text-lg font-bold text-[#173c6e] font-sans">13 Streams</div>
                  <div className="text-[11px] text-[#6e6e6e] mt-0.5">CSE, Mech, Civil, ECE...</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#2458ae] font-sans">206 Roles</div>
                  <div className="text-[11px] text-[#6e6e6e] mt-0.5">Entry-level competencies</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#1d1d1d] font-sans">100% Inspectable</div>
                  <div className="text-[11px] text-[#6e6e6e] mt-0.5">Evidence & code reviews</div>
                </div>
              </div>
            </div>

            {/* Right Column: Atomic Globe Live Centerpiece */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-2xl border border-[#dedee2] bg-[#f7f7f8] p-3 shadow-xs flex flex-col items-center justify-center overflow-hidden">
                {/* Globe Top Metadata Tag */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-[10px] font-mono text-[#6e6e6e]">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/80 border border-[#dedee2] backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ab673]" />
                    GLOBAL TALENT MESH
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/80 border border-[#dedee2]">
                    ROTATION: ACTIVE
                  </span>
                </div>

                {/* Atomic Globe Component */}
                <div className="w-[320px] h-[320px] sm:w-[360px] sm:h-[360px]">
                  <AtomicGlobe
                    theme="custom"
                    palette={{
                      backdrop: 'transparent',
                      ink: '#173c6e',
                      tint: '#2458ae',
                      accent: '#2458ae',
                      backFade: 0.18,
                      labelFill: '#ffffff',
                      labelInk: '#0f172a',
                      accentInk: '#ffffff',
                    }}
                    dotSize={4.2}
                    spin={0.06}
                    tilt={15}
                    cursorMode="sonar"
                    reach={0.55}
                    routesOn={true}
                    routeMode="mesh"
                    routeStyle="pulse"
                    places={[
                      { label: 'BENGALURU', lat: 12.9716, lng: 77.5946 },
                      { label: 'HYDERABAD', lat: 17.385, lng: 78.4867 },
                      { label: 'LONDON', lat: 51.5074, lng: -0.1278 },
                      { label: 'NEW YORK', lat: 40.7128, lng: -74.006 },
                      { label: 'SINGAPORE', lat: 1.3521, lng: 103.8198 },
                      { label: 'SAN FRANCISCO', lat: 37.7749, lng: -122.4194 },
                    ]}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Globe Bottom Status Bar */}
                <div className="absolute bottom-3 left-4 right-4 z-20 pt-2 border-t border-[#dedee2]/60 flex items-center justify-between text-[10px] font-mono text-[#4a4a4a]">
                  <span>LAT/LNG SYNCHRONIZED</span>
                  <span className="text-[#173c6e] font-semibold">CAMPUS ↔ INDUSTRY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE WORKSPACE: THREE VIEWS, ONE CAPABILITY SYSTEM ── */}
      <section className="py-16 sm:py-20 border-b border-[#dedee2] bg-[#f7f7f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-[11px] font-mono text-[#2458ae] font-semibold uppercase tracking-wider mb-2">
                // SYSTEM ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1d] font-['Outfit']">
                One evidence layer. Three distinct operating views.
              </h2>
              <p className="text-sm text-[#6e6e6e] mt-1 max-w-xl">
                The exact same verifiable evidence serves every stakeholder without synthetic scores or résumé guessing.
              </p>
            </div>

            {/* Segmented Filter Control */}
            <div className="inline-flex p-1 rounded-lg bg-[#e8e8ea] border border-[#dedee2] text-xs font-medium self-start md:self-auto">
              {(
                [
                  { id: 'students', label: 'For Students' },
                  { id: 'colleges', label: 'Placement Teams' },
                  { id: 'enterprise', label: 'Enterprises' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#173c6e] font-semibold shadow-xs'
                      : 'text-[#4a4a4a] hover:text-[#1d1d1d]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Interactive Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Overview Box */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-[#dedee2] p-6 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f4f4f5] border border-[#dedee2] text-[10px] font-mono font-medium text-[#4a4a4a]">
                  <span>ACTIVE PERSPECTIVE:</span>
                  <span className="text-[#173c6e] font-semibold uppercase">
                    {activeTab}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1d1d1d] font-['Outfit']">
                  {activeTab === 'students' && 'Know what to do next with concrete steps.'}
                  {activeTab === 'colleges' && 'Continuous visibility into cohort job readiness.'}
                  {activeTab === 'enterprise' && 'Discover candidates through inspectable code.'}
                </h3>

                <p className="text-sm text-[#4a4a4a] leading-relaxed">
                  {activeTab === 'students' &&
                    'Start with clear direction, follow structured curricula, and turn everyday programming practice into inspectable artifacts that speak for you in interviews.'}
                  {activeTab === 'colleges' &&
                    'Stop waiting for final-semester placement surprises. Inspect skill milestones, problem-solving frequency, and identify priority gaps months before campus hiring drives begin.'}
                  {activeTab === 'enterprise' &&
                    'Bypass 500-resume spam. Directly review actual pull requests, architectural trade-offs, and algorithmic diagnostic scores evaluated by standard rubrics.'}
                </p>

                <div className="pt-2 space-y-2.5">
                  {(activeTab === 'students'
                    ? [
                        'Daily structured roadmaps across 206 roles',
                        'Practice lab with instant automated feedback',
                        'Verifiable project passport linked to GitHub',
                      ]
                    : activeTab === 'colleges'
                    ? [
                        'Real-time branch & section readiness telemetry',
                        'Automated weakness detection across core topics',
                        'Direct recruiter shortlist generation',
                      ]
                    : [
                        'Granular skill rubrics without keyword filtering',
                        'Inspectable GitHub repository artifacts',
                        'Direct scheduling with pre-verified talent',
                      ]
                  ).map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#272727]">
                      <CheckCircle2 className="w-4 h-4 text-[#2ab673] shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#e8e8ea] flex items-center justify-between">
                <a
                  href={
                    activeTab === 'students'
                      ? '/students'
                      : activeTab === 'colleges'
                      ? '/colleges'
                      : '/enterprise'
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173c6e] hover:underline"
                >
                  <span>Explore {activeTab} blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] font-mono text-[#929292]">v2.6 SPEC</span>
              </div>
            </div>

            {/* Right Interactive Telemetry Mockup */}
            <div className="lg:col-span-7 bg-[#1d1d1d] rounded-xl border border-[#36373b] p-5 text-white shadow-md flex flex-col justify-between font-mono text-xs">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#36373b]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f87171]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f0a45b]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4ed08a]" />
                  </div>
                  <span className="text-[11px] text-[#a9b0ba] ml-2">
                    pathwisse-telemetry --view={activeTab}
                  </span>
                </div>
                <span className="text-[10px] text-[#4ed08a] bg-[#4ed08a]/10 px-2 py-0.5 rounded border border-[#4ed08a]/20">
                  LIVE BUFFER
                </span>
              </div>

              {/* Terminal Body Content */}
              <div className="py-5 space-y-4 font-mono">
                {activeTab === 'students' && (
                  <>
                    <div className="text-[#a9b0ba]">
                      <span className="text-[#6ea2ff]">$</span> pathwisse student status --id=STU_9021
                    </div>
                    <div className="p-3 bg-[#111213] rounded-lg border border-[#2a2b2e] space-y-2">
                      <div className="flex justify-between text-[#f2f4f7]">
                        <span>ROLE PATH: Full-Stack Engineer (Junior)</span>
                        <span className="text-[#4ed08a]">COMPLETION: 74%</span>
                      </div>
                      <div className="w-full bg-[#2a2b2e] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#6ea2ff] h-full w-[74%]" />
                      </div>
                      <div className="text-[11px] text-[#a9b0ba] pt-1">
                        CURRENT LAB: Distributed Log Compaction (Go) · 18/20 tests passing
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 bg-[#111213] rounded border border-[#2a2b2e]">
                        <span className="text-[#747d89] block text-[10px]">VERIFIED COMMITS</span>
                        <span className="text-white text-sm font-bold">142 Merged</span>
                      </div>
                      <div className="p-2.5 bg-[#111213] rounded border border-[#2a2b2e]">
                        <span className="text-[#747d89] block text-[10px]">RUBRIC SCORE</span>
                        <span className="text-[#4ed08a] text-sm font-bold">92.4 / 100</span>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'colleges' && (
                  <>
                    <div className="text-[#a9b0ba]">
                      <span className="text-[#6ea2ff]">$</span> pathwisse cohort inspect --batch=2026 --stream=CSE
                    </div>
                    <div className="p-3 bg-[#111213] rounded-lg border border-[#2a2b2e] space-y-2">
                      <div className="flex justify-between text-[#f2f4f7]">
                        <span>TOTAL ENROLLED: 420 STUDENTS</span>
                        <span className="text-[#6ea2ff]">JOB READY: 284 (67.6%)</span>
                      </div>
                      <div className="text-[11px] text-[#a9b0ba]">
                        PRIORITY REVISION AREA: Distributed Caching & SQL Index Tuning
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-[#111213] rounded border border-[#2a2b2e]">
                        <span className="text-[10px] text-[#747d89] block">TIER 1 READY</span>
                        <span className="text-white font-bold text-sm">94</span>
                      </div>
                      <div className="p-2 bg-[#111213] rounded border border-[#2a2b2e]">
                        <span className="text-[10px] text-[#747d89] block">IN REVIEW</span>
                        <span className="text-[#f0a45b] font-bold text-sm">190</span>
                      </div>
                      <div className="p-2 bg-[#111213] rounded border border-[#2a2b2e]">
                        <span className="text-[10px] text-[#747d89] block">NEED SUPPORT</span>
                        <span className="text-[#f87171] font-bold text-sm">136</span>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'enterprise' && (
                  <>
                    <div className="text-[#a9b0ba]">
                      <span className="text-[#6ea2ff]">$</span> pathwisse talent query --role=&quot;Backend Engineer&quot; --min-score=85
                    </div>
                    <div className="p-3 bg-[#111213] rounded-lg border border-[#2a2b2e] space-y-2">
                      <div className="flex justify-between text-[#f2f4f7]">
                        <span>CANDIDATES MATCHED: 38 PROFILES</span>
                        <span className="text-[#4ed08a]">EVIDENCE INSPECTED</span>
                      </div>
                      <div className="text-[11px] text-[#a9b0ba]">
                        TOP CANDIDATE: #ID-4401 · Raft Consensus in Go · 100% Code Health Pass
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1 text-[#a9b0ba]">
                      <span>Average Time to Shortlist: &lt; 24h</span>
                      <span className="text-[#6ea2ff]">1-Click Review Dossier ↗</span>
                    </div>
                  </>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="pt-3 border-t border-[#36373b] flex items-center justify-between text-[10px] text-[#747d89]">
                <span>Status: Deterministic Proof Engine Connected</span>
                <span>Port 443 SSL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 206 ROLES & 13 STREAMS CATALOGUE DIRECTORY (FANOUT DENSE BROWSER) ── */}
      <section className="py-16 sm:py-20 border-b border-[#dedee2] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-[11px] font-mono text-[#173c6e] font-semibold uppercase tracking-wider mb-2">
                // SYSTEM CATALOGUE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1d] font-['Outfit']">
                Explore 206 Mapped Early-Career Roles
              </h2>
              <p className="text-sm text-[#6e6e6e] mt-1 max-w-xl">
                Every role is structured with published career paths, required engineering competencies, and verified capstone rubrics.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#929292] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search roles (e.g. React, QA, BIM)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-md bg-[#f7f7f8] border border-[#dedee2] focus:outline-none focus:border-[#173c6e] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Stream Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-[#dedee2] no-scrollbar">
            {ENGINEERING_STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStreamFilter(s.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-all ${
                  streamFilter === s.id
                    ? 'bg-[#173c6e] text-white font-semibold shadow-2xs'
                    : 'bg-[#f4f4f5] text-[#4a4a4a] hover:bg-[#e8e8ea] hover:text-[#1d1d1d]'
                }`}
              >
                {s.name} ({s.rolesCount})
              </button>
            ))}
          </div>

          {/* Roles Dense Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredRoles.map((role) => (
              <a
                key={role.id}
                href={`/hire?role=${encodeURIComponent(role.title)}`}
                className="group p-3.5 rounded-lg border border-[#dedee2] hover:border-[#173c6e] bg-[#f7f7f8]/50 hover:bg-white transition-all flex items-start justify-between gap-3 shadow-2xs"
              >
                <div>
                  <div className="text-xs font-semibold text-[#1d1d1d] group-hover:text-[#173c6e] transition-colors">
                    {role.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-[#6e6e6e]">
                    <span className="px-1.5 py-0.2 rounded bg-[#e8e8ea] text-[#4a4a4a]">
                      {role.level}
                    </span>
                    {role.hasPublishedPath && (
                      <span className="text-[#2ab673] flex items-center gap-1 font-semibold">
                        <span className="w-1 h-1 rounded-full bg-[#2ab673]" />
                        Path Published
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#929292] group-hover:text-[#173c6e] group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
              </a>
            ))}
          </div>

          {/* View Full Directory Link */}
          <div className="mt-8 text-center pt-6 border-t border-[#dedee2]">
            <a
              href="/hire"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#f4f4f5] hover:bg-[#e8e8ea] text-xs font-semibold text-[#173c6e] border border-[#dedee2] transition-colors"
            >
              <span>Inspect Full Directory on Hire Talent Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROOF INSPECTION LAB BENCH: CODE & ARTIFACT PREVIEW ── */}
      <section className="py-16 sm:py-20 border-b border-[#dedee2] bg-[#f7f7f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <div className="text-[11px] font-mono text-[#2458ae] font-semibold uppercase tracking-wider mb-2">
              // VERIFICATION LAB
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1d] font-['Outfit']">
              How real candidate proof is inspected.
            </h2>
            <p className="text-sm text-[#6e6e6e] mt-1">
              No generic test scores or inflated self-assessments. Every artifact provides code architecture, architectural trade-offs, and automated rubric testing.
            </p>
          </div>

          {/* Inspection Bench Container */}
          <div className="bg-white rounded-xl border border-[#dedee2] overflow-hidden shadow-xs">
            {/* Bench Header */}
            <div className="p-4 sm:p-5 border-b border-[#dedee2] bg-[#fafafa] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#173c6e] text-white flex items-center justify-center font-bold text-xs">
                  GO
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1d1d1d] flex items-center gap-2">
                    <span>Distributed Key-Value Store with Raft Consensus</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">
                      EVIDENCE #CSE-RAFT-09
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6e6e6e]">
                    Authored by Candidate · Reviewed by Senior Staff Evaluator
                  </div>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 text-xs font-mono bg-[#e8e8ea] p-1 rounded-md">
                {(['architecture', 'code', 'evaluation'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveSpecTab(t)}
                    className={`px-3 py-1 rounded capitalize transition-all ${
                      activeSpecTab === t
                        ? 'bg-white text-[#173c6e] font-semibold shadow-2xs'
                        : 'text-[#4a4a4a] hover:text-[#1d1d1d]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Bench Content */}
            <div className="p-6">
              {activeSpecTab === 'architecture' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 p-4 rounded-lg bg-[#f7f7f8] border border-[#dedee2]">
                    <span className="text-[10px] font-mono text-[#2458ae] font-semibold block">
                      SYSTEM ARCHITECTURE
                    </span>
                    <h4 className="text-sm font-bold text-[#1d1d1d]">Raft Election & Replication</h4>
                    <p className="text-xs text-[#4a4a4a] leading-relaxed">
                      Implemented election timeouts with randomized jitter (150ms-300ms) to avoid split votes. Handled RPC message drops and network partitions cleanly.
                    </p>
                  </div>
                  <div className="space-y-2 p-4 rounded-lg bg-[#f7f7f8] border border-[#dedee2]">
                    <span className="text-[10px] font-mono text-[#2458ae] font-semibold block">
                      PERFORMANCE METRIC
                    </span>
                    <h4 className="text-sm font-bold text-[#1d1d1d]">Tail Latency p99: 14ms</h4>
                    <p className="text-xs text-[#4a4a4a] leading-relaxed">
                      Optimized disk flush cycles with batched fsync calls, handling up to 12,500 persistent ops/sec in containerized benchmarking cluster.
                    </p>
                  </div>
                  <div className="space-y-2 p-4 rounded-lg bg-[#f7f7f8] border border-[#dedee2]">
                    <span className="text-[10px] font-mono text-[#2458ae] font-semibold block">
                      ENGINEERING TRADE-OFF
                    </span>
                    <h4 className="text-sm font-bold text-[#1d1d1d]">Linearizable Read Leases</h4>
                    <p className="text-xs text-[#4a4a4a] leading-relaxed">
                      Adopted leader leases for read queries instead of quorum rounds, cutting query overhead by 40% with strict clock drift guards.
                    </p>
                  </div>
                </div>
              )}

              {activeSpecTab === 'code' && (
                <div className="rounded-lg bg-[#1d1d1d] text-[#f2f4f7] p-4 font-mono text-xs overflow-x-auto">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#36373b] text-[11px] text-[#a9b0ba]">
                    <span>raft/election.go</span>
                    <button
                      onClick={handleCopyCode}
                      className="hover:text-white flex items-center gap-1 text-[10px]"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-[#4ed08a]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] leading-relaxed text-[#a9b0ba]">
                    <span className="text-[#6ea2ff]">func</span> (rf *Raft){' '}
                    <span className="text-[#f0a45b]">startElection</span>() &#123;{'\n'}
                    {'  '}rf.currentTerm++{'\n'}
                    {'  '}rf.state = Candidate{'\n'}
                    {'  '}rf.votedFor = rf.me{'\n'}
                    {'  '}votesReceived := 1{'\n'}
                    {'\n'}
                    {'  '}args := RequestVoteArgs&#123;{'\n'}
                    {'    '}Term: rf.currentTerm,{'\n'}
                    {'    '}CandidateId: rf.me,{'\n'}
                    {'    '}LastLogIndex: rf.getLastLog().Index,{'\n'}
                    {'    '}LastLogTerm: rf.getLastLog().Term,{'\n'}
                    {'  '}&#125;{'\n'}
                    {'\n'}
                    {'  '}<span className="text-[#747d89]">// Broadcast vote requests to all peers asynchronously</span>{'\n'}
                    {'  '}<span className="text-[#6ea2ff]">for</span> peer := <span className="text-[#6ea2ff]">range</span> rf.peers &#123;{'\n'}
                    {'    '}<span className="text-[#6ea2ff]">go</span> rf.sendRequestVote(peer, &amp;args, &amp;votesReceived){'\n'}
                    {'  '}&#125;{'\n'}
                    &#125;
                  </pre>
                </div>
              )}

              {activeSpecTab === 'evaluation' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded border border-[#dedee2] bg-[#f7f7f8]">
                      <span className="text-[10px] font-mono text-[#6e6e6e] block">CONCURRENCY SAFETY</span>
                      <strong className="text-sm font-bold text-[#1d1d1d]">ThreadSanitizer Clean</strong>
                    </div>
                    <div className="p-3 rounded border border-[#dedee2] bg-[#f7f7f8]">
                      <span className="text-[10px] font-mono text-[#6e6e6e] block">TEST COVERAGE</span>
                      <strong className="text-sm font-bold text-[#2ab673]">91.4% Coverage</strong>
                    </div>
                    <div className="p-3 rounded border border-[#dedee2] bg-[#f7f7f8]">
                      <span className="text-[10px] font-mono text-[#6e6e6e] block">DOCUMENTATION</span>
                      <strong className="text-sm font-bold text-[#1d1d1d]">Architectural RFC Included</strong>
                    </div>
                    <div className="p-3 rounded border border-[#dedee2] bg-[#f7f7f8]">
                      <span className="text-[10px] font-mono text-[#6e6e6e] block">STATUS</span>
                      <strong className="text-sm font-bold text-[#173c6e]">Verified Competency</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="py-16 sm:py-20 bg-[#173c6e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 text-[11px] font-mono text-blue-200">
            <span>GET STARTED WITH PATHWISSE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit']">
            Ready to turn potential into verified capability?
          </h2>

          <p className="text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Whether you are an engineering student preparing for your career, a college tracking placement readiness, or a company seeking inspectable talent.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_AUTH_URL}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-[#173c6e] text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/hire"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#2458ae] text-white text-sm font-semibold hover:bg-[#1e4a8a] transition-colors"
            >
              <span>Share Hiring Requirements</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <LiquidGlassFooter />
    </div>
  );
}
