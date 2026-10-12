'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  StudentCapabilityIcon,
  CollegeInstitutionIcon,
  CompanyConnectionIcon,
  CapabilityNetworkIcon,
  CareerDirectionIcon,
  StructuredLearningIcon,
  RealWorldProjectsIcon,
  VerifiedSkillsIcon,
  OpportunityIcon,
} from '@/components/icons/hero-icons';

export type ContextPanelMode =
  | 'none'
  | 'students'
  | 'colleges'
  | 'companies'
  | 'network'
  | 'milestone';

interface ContextPanelProps {
  mode: ContextPanelMode;
  selectedMilestoneId?: number;
  onClose: () => void;
  onSelectMilestone?: (id: number) => void;
}

export function ContextPanel({
  mode,
  selectedMilestoneId = 1,
  onClose,
  onSelectMilestone,
}: ContextPanelProps) {
  // Students tab active step
  const [studentStep, setStudentStep] = useState(0);

  // Colleges ecosystem active node
  const [collegeNode, setCollegeNode] = useState(0);

  // Network active audience
  const [networkAudience, setNetworkAudience] = useState<'students' | 'colleges' | 'companies'>('students');

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (mode !== 'none') {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onClose]);

  if (mode === 'none') return null;

  // 1. STUDENTS PROGRESSION DATA
  const studentSteps = [
    {
      title: 'Discover your direction',
      desc: 'Take an evidence-grounded career audit to identify your natural aptitudes and current foundations, mapping them to real-world roles.',
      deliverable: 'Personalized Career Blueprint & Readiness Baseline',
    },
    {
      title: 'Build relevant skills',
      desc: 'Follow curated, Phase → Skill → Stage roadmaps designed with industry engineers. No generic video watching—learn through structured application.',
      deliverable: 'Core Framework Mastery & Technical Drills',
    },
    {
      title: 'Complete real projects',
      desc: 'Build authentic engineering systems from professional briefs with architectural decision memos, database schemas, and unit test suites.',
      deliverable: 'Production Git Repositories with 24/24 Passing Tests',
    },
    {
      title: 'Verify your capabilities',
      desc: 'Subject your work to automated rubric reviews, algorithmic consistency audits, and verifiable capability scoring.',
      deliverable: 'Immutable Skill Passport & Verified Capability Badges',
    },
    {
      title: 'Unlock opportunities',
      desc: 'Enter the capability-first hiring pipeline where top companies discover and shortlist you based on inspectable technical proof.',
      deliverable: 'Fast-Tracked Recruiter Introductions & Placement Offers',
    },
  ];

  // 2. COLLEGES ECOSYSTEM FLOW DATA
  const collegeNodes = [
    {
      label: 'College',
      role: 'Institutional Command',
      desc: 'Placement directors and deans gain continuous, pre-season cohort radar visibility across every department and branch.',
      metric: '640+ Cohort Size Tracking',
    },
    {
      label: 'Learners',
      role: 'Synchronized Cohorts',
      desc: 'Track student sprint participation, lab engagement, and progress velocity without manual spreadsheet chasing.',
      metric: '78.4% Average Readiness Lift',
    },
    {
      label: 'Skills',
      role: 'Deficit Diagnostics',
      desc: 'Identify curriculum deficits early—pinpointing exactly where students struggle in DSA, SQL, or System Design before campus hiring starts.',
      metric: 'Real-Time Skill Gap Heatmaps',
    },
    {
      label: 'Evidence',
      role: 'Inspectable Proof',
      desc: 'Turn unverified student résumé claims into transparent, defensible code portfolios and verified evaluation dossiers.',
      metric: '1,840+ Audited Artifacts',
    },
    {
      label: 'Outcomes',
      role: 'Placement Conversions',
      desc: 'Deliver pre-vetted, verified student talent pools to enterprise campus partners, multiplying higher-tier placement conversions.',
      metric: '3.4x Faster Recruiter Shortlisting',
    },
  ];

  // 3. MILESTONES DATA
  const milestoneData: Record<
    number,
    {
      name: string;
      color: string;
      whatHappens: string;
      whatYouProduce: string;
      outcomeEnabled: string;
      Icon: typeof CareerDirectionIcon;
    }
  > = {
    1: {
      name: 'Career Direction',
      color: '#8B5CF6',
      whatHappens:
        'Diagnostic evaluation assesses your cognitive strengths, programming aptitudes, and current foundations.',
      whatYouProduce:
        'A personalized career roadmap mapped to market-validated roles (Data, Full Stack, AI, etc.).',
      outcomeEnabled:
        'Zero wasted semesters wandering between unrelated tutorial tracks.',
      Icon: CareerDirectionIcon,
    },
    2: {
      name: 'Structured Learning',
      color: '#3B82F6',
      whatHappens:
        'Progressive curricular mastery moving step-by-step from core syntax through production paradigms.',
      whatYouProduce:
        'Hands-on lab completions, algorithmic problem submissions, and clean schema migrations.',
      outcomeEnabled:
        'Battle-tested fundamentals ready to write production-grade software.',
      Icon: StructuredLearningIcon,
    },
    3: {
      name: 'Real-World Projects',
      color: '#A855F7',
      whatHappens:
        'Engineering briefs modeled after enterprise production systems with real constraints and specs.',
      whatYouProduce:
        'Modular API architectures, database transactions, background workers, and comprehensive unit tests.',
      outcomeEnabled:
        'A defensible portfolio of real engineering artifacts that speak louder than GPA.',
      Icon: RealWorldProjectsIcon,
    },
    4: {
      name: 'Verified Skills',
      color: '#F59E0B',
      whatHappens:
        'Automated code-level evaluations, static analysis, and rubric verifications inspect your deliverables.',
      whatYouProduce:
        'An immutable Skill Passport documenting verified competencies with defensible rubrics.',
      outcomeEnabled:
        'Hiring managers can audit and trust your capability in under 60 seconds.',
      Icon: VerifiedSkillsIcon,
    },
    5: {
      name: 'Opportunity',
      color: '#2563EB',
      whatHappens:
        'High-intent enterprise hiring teams discover and invite candidates based on demonstrated capability.',
      whatYouProduce:
        'Direct recruiter conversations, technical interview fast-tracks, and verified talent dossiers.',
      outcomeEnabled:
        'High-conviction job and internship placements based on proven ability, not pedigree.',
      Icon: OpportunityIcon,
    },
  };

  const currentMilestone = milestoneData[selectedMilestoneId] || milestoneData[1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-2xl bg-white/98 backdrop-blur-2xl rounded-2xl border border-slate-200/80 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.25)] overflow-hidden max-h-[90vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            {mode === 'students' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
                <StudentCapabilityIcon size={13} className="text-purple-600" active={true} reacting={true} />
                <span>Student Experience</span>
              </span>
            )}
            {mode === 'colleges' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                <CollegeInstitutionIcon size={13} className="text-blue-600" active={true} reacting={true} />
                <span>College Solutions</span>
              </span>
            )}
            {mode === 'companies' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
                <CompanyConnectionIcon size={13} className="text-amber-700" active={true} reacting={true} />
                <span>Enterprise Discovery</span>
              </span>
            )}
            {mode === 'network' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                <CapabilityNetworkIcon size={13} className="text-slate-600" />
                <span>Capability Network</span>
              </span>
            )}
            {mode === 'milestone' && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `${currentMilestone.color}15`,
                  color: currentMilestone.color,
                  border: `1px solid ${currentMilestone.color}30`,
                }}
              >
                <currentMilestone.Icon size={13} />
                <span>Milestone {selectedMilestoneId} of 5</span>
              </span>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* ========================================================= */}
          {/* 1. STUDENTS VIEW: INTERACTIVE 5-STEP CAPABILITY PATH     */}
          {/* ========================================================= */}
          {mode === 'students' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  The Student Capability Journey
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Turn coursework and curiosity into verified engineering capability that employers trust.
                </p>
              </div>

              {/* Interactive Step Navigator */}
              <div className="grid grid-cols-5 gap-1.5 bg-slate-100/80 p-1.5 rounded-xl">
                {studentSteps.map((step, idx) => {
                  const isActive = studentStep === idx;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setStudentStep(idx)}
                      className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all text-center flex flex-col items-center gap-1 ${
                        isActive
                          ? 'bg-white text-purple-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                      <span className="truncate w-full text-[11px]">{step.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Details Card */}
              <div className="p-5 rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50/40 to-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">
                    Stage 0{studentStep + 1} of 05
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Step Progression
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  {studentSteps[studentStep].title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {studentSteps[studentStep].desc}
                </p>
                <div className="pt-2 border-t border-purple-100/60 flex items-center gap-2 text-xs font-medium text-purple-800">
                  <CheckCircle2 size={15} className="text-purple-600 shrink-0" />
                  <span>Deliverable: {studentSteps[studentStep].deliverable}</span>
                </div>
              </div>

              {/* Step Action Switcher + Primary CTA */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={studentStep === 0}
                    onClick={() => setStudentStep((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={studentStep === studentSteps.length - 1}
                    onClick={() =>
                      setStudentStep((prev) => Math.min(studentSteps.length - 1, prev + 1))
                    }
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                  >
                    Next Step
                  </button>
                </div>

                <a
                  href="/students"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Explore Your Path</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. COLLEGES VIEW: INTERACTIVE ECOSYSTEM DIAGRAM           */}
          {/* ========================================================= */}
          {mode === 'colleges' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Institutional Placement Ecosystem
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  How Pathwisse transforms campus placement operations from late-season panic to continuous readiness visibility.
                </p>
              </div>

              {/* Interactive Flow Diagram Nodes */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Ecosystem Flow (Select any node)
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {collegeNodes.map((node, idx) => {
                    const isSelected = collegeNode === idx;
                    return (
                      <button
                        key={node.label}
                        type="button"
                        onClick={() => setCollegeNode(idx)}
                        className={`p-2.5 rounded-xl text-center border transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50/80 text-blue-800 shadow-xs ring-1 ring-blue-400/30'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-[10px] font-mono opacity-60">0{idx + 1}</div>
                        <div className="text-xs font-bold mt-0.5 truncate">{node.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Ecosystem Node Details */}
              <div className="p-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/30 to-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                    {collegeNodes[collegeNode].role}
                  </span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md">
                    {collegeNodes[collegeNode].metric}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Flow Stage: {collegeNodes[collegeNode].label}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {collegeNodes[collegeNode].desc}
                </p>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Continuous cohort analytics across 640+ students
                </span>

                <a
                  href="/colleges"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Explore College Solutions</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. COMPANIES VIEW: TALENT CAPABILITY DISCOVERY PREVIEW    */}
          {/* ========================================================= */}
          {mode === 'companies' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Candidate Evidence Dossier
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-100 text-amber-800">
                    DEMO · ILLUSTRATIVE
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Discover verified early-career engineers through authentic code architectures, not keyword claims.
                </p>
              </div>

              {/* Sample Candidate Profile Card */}
              <div className="p-5 rounded-xl border border-amber-200/80 bg-white shadow-xs space-y-4">
                {/* Candidate Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="text-base font-bold text-slate-900">Ananya K.</div>
                    <div className="text-xs font-medium text-slate-500">
                      Target: Associate Full Stack Engineer
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck size={13} />
                      <span>94% Role Match</span>
                    </span>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      3 Audited Artifacts
                    </div>
                  </div>
                </div>

                {/* Demonstrated Capability Signals */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Verified Competency Signals
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="text-base font-bold text-slate-900">95/100</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">API Design</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="text-base font-bold text-slate-900">91/100</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">SQL &amp; DB</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <div className="text-base font-bold text-slate-900">88/100</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Code Maintainability</div>
                    </div>
                  </div>
                </div>

                {/* Technical Decision Memo Excerpt */}
                <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 text-xs space-y-1">
                  <div className="font-semibold text-amber-900">
                    Verified Project: Distributed Task Queue
                  </div>
                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    Redis async worker with exponential backoff, dead-letter queue processing, and 24 passing unit tests. Architecture Review: Top 5% modular schema design.
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Zero résumé keyword spam · 100% inspectable Git trees
                </span>

                <a
                  href="/enterprise"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Discover Talent</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. NETWORK VIEW: THREE-SIDED ECOSYSTEM EXPLORER          */}
          {/* ========================================================= */}
          {mode === 'network' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  The Pathwisse Capability Network
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Connecting Students, Colleges, and Companies through one shared capability layer.
                </p>
              </div>

              {/* Audience Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-100">
                <button
                  type="button"
                  onClick={() => setNetworkAudience('students')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                    networkAudience === 'students'
                      ? 'bg-white text-purple-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <StudentCapabilityIcon size={14} />
                  <span>For Students</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNetworkAudience('colleges')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                    networkAudience === 'colleges'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CollegeInstitutionIcon size={14} />
                  <span>For Colleges</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNetworkAudience('companies')}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                    networkAudience === 'companies'
                      ? 'bg-white text-amber-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CompanyConnectionIcon size={14} />
                  <span>For Companies</span>
                </button>
              </div>

              {/* Audience Specific Content */}
              {networkAudience === 'students' && (
                <div className="p-5 rounded-xl border border-purple-100 bg-purple-50/30 space-y-3">
                  <h4 className="text-base font-bold text-purple-900">
                    Students turn learning into verified capability
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Stop collecting unread tutorial bookmarks. Work on real-world projects, earn automated capability scores, and build an immutable Skill Passport that proves your readiness to hire.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <a
                      href="/students"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900"
                    >
                      <span>Explore Student Roadmap</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              )}

              {networkAudience === 'colleges' && (
                <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/30 space-y-3">
                  <h4 className="text-base font-bold text-blue-900">
                    Colleges make student readiness visible before placement season
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Track cohort skill progression, identify curriculum gaps in DSA and system design, and accelerate campus placement shortlists with verified evidence dossiers.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <a
                      href="/colleges"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      <span>View Institutional Platform</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              )}

              {networkAudience === 'companies' && (
                <div className="p-5 rounded-xl border border-amber-100 bg-amber-50/30 space-y-3">
                  <h4 className="text-base font-bold text-amber-900">
                    Companies discover talent based on demonstrated capability
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Skip keyword spam and uncalibrated coding quizzes. Evaluate early-career talent through inspectable code architectures, passing tests, and verified problem-solving ability.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <a
                      href="/enterprise"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900"
                    >
                      <span>Browse Talent Discovery Model</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              )}

              {/* Action row */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  One platform. One ecosystem.
                </span>

                <a
                  href="https://app.pathwisse.com/auth"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Get Started with Pathwisse</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. MILESTONE VIEW: FIVE-STAGE JOURNEY DETAIL               */}
          {/* ========================================================= */}
          {mode === 'milestone' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {currentMilestone.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Step {selectedMilestoneId} of 5
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  How capability is forged, verified, and connected to opportunity at this stage.
                </p>
              </div>

              {/* Milestone Step Selector */}
              <div className="grid grid-cols-5 gap-1.5 bg-slate-100/70 p-1.5 rounded-xl">
                {[1, 2, 3, 4, 5].map((id) => {
                  const m = milestoneData[id];
                  const isCurrent = id === selectedMilestoneId;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onSelectMilestone?.(id)}
                      className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center flex flex-col items-center gap-1 ${
                        isCurrent
                          ? 'bg-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      style={{
                        color: isCurrent ? m.color : undefined,
                      }}
                    >
                      <span className="text-[10px] font-mono opacity-60">0{id}</span>
                      <span className="text-[11px] truncate w-full">{m.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Three Detail Sections for Milestone */}
              <div className="space-y-3">
                {/* 1. What Happens */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    1. What happens at this stage
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentMilestone.whatHappens}
                  </p>
                </div>

                {/* 2. What Student Produces */}
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    2. What the student produces
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentMilestone.whatYouProduce}
                  </p>
                </div>

                {/* 3. Outcome Enabled */}
                <div
                  className="p-4 rounded-xl border space-y-1"
                  style={{
                    backgroundColor: `${currentMilestone.color}08`,
                    borderColor: `${currentMilestone.color}25`,
                  }}
                >
                  <div
                    className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: currentMilestone.color }}
                  >
                    3. What outcome it enables
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentMilestone.outcomeEnabled}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={selectedMilestoneId <= 1}
                    onClick={() => onSelectMilestone?.(selectedMilestoneId - 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={selectedMilestoneId >= 5}
                    onClick={() => onSelectMilestone?.(selectedMilestoneId + 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                  >
                    Next Milestone
                  </button>
                </div>

                <a
                  href="/students"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold shadow-sm transition-all"
                  style={{ backgroundColor: currentMilestone.color }}
                >
                  <span>Explore Your Path</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
