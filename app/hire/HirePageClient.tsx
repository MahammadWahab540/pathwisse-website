'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  FolderGit2,
  Layers,
  ArrowRight,
  ChevronRight,
  Info,
  Briefcase,
  Users2,
  Check,
  Building2,
  Mail,
  Compass,
  Code2,
  ExternalLink,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import {
  ENGINEERING_STREAMS,
  ALL_ROLES,
  type EngineeringRole,
  type EngineeringStream
} from '@/lib/roles-catalogue';
import { MotionSubmitButton } from '@/components/ui/motion-submit-button';
import { Checkbox } from '@/components/ui/checkbox';
import { track } from '@/app/tracking';
import { HairlineFigure } from '@/components/ui/hairline-figure';

// Representative curriculum competencies and capstone projects for authentic previewing
const STREAM_PROJECT_PREVIEWS: Record<string, {
  projectTitle: string;
  projectDescription: string;
  contributions: string[];
  techTradeoff: string;
  signals: { label: string; score: string }[];
}> = {
  cse: {
    projectTitle: 'Distributed Key-Value Store with Raft Consensus & Log Compaction',
    projectDescription: 'High-throughput replicated state machine in Go featuring leader election, RPC log replication with heartbeats, and disk-backed state snapshots.',
    contributions: [
      'Engineered RPC transport layer and serialization protocols using Protobuf.',
      'Designed split-brain network partition safety suites in containerized Docker testbeds.',
      'Optimized disk fsync flush cycles, reducing tail p99 write latency by 28%.'
    ],
    techTradeoff: 'Adopted gRPC with explicit deadline contexts over raw TCP sockets to enforce timeouts and distributed tracing across microservices.',
    signals: [
      { label: 'Concurrency Safety', score: '5/5 (Thread-sanitized)' },
      { label: 'System Modularization', score: 'Proficient' },
      { label: 'Automated Test Coverage', score: '88% Unit & Integration' },
    ]
  },
  mech: {
    projectTitle: 'Parametric Topology Optimization of Automotive Suspension Knuckle',
    projectDescription: 'Finite element analysis (FEA) and additive manufacturing redesign for lightweight aluminum knuckle bearing 2.5G braking and bump loads.',
    contributions: [
      'Calculated dynamic load cases adhering to SAE Baja structural guidelines.',
      'Performed linear static and vibrational modal simulations in ANSYS Workbench.',
      'Achieved 34% component mass reduction while preserving minimum safety factor 1.8.'
    ],
    techTradeoff: 'Opted for AlSi10Mg selective laser sintering over forged steel casting to eliminate tooling lead times for low-volume EV prototypes.',
    signals: [
      { label: 'FEA Mesh Convergence', score: 'Verified (< 2% error)' },
      { label: 'GD&T Compliance', score: 'ASME Y14.5 Standard' },
      { label: 'Manufacturability Review', score: 'Approved for DMLS' },
    ]
  },
  civil: {
    projectTitle: 'Seismic Response Assessment of Multi-Storey RCC Framed Structure',
    projectDescription: 'Dynamic response spectrum analysis and structural rebar detailing for G+8 commercial building in Zone IV adhering to IS 1893 & IS 13920.',
    contributions: [
      'Modeled 3D spatial frame structure in ETABS with shear walls and soft storey checks.',
      'Automated column-beam interaction diagrams and foundation load exports.',
      'Drafted structural schedules and ductile reinforcement detailing in AutoCAD.'
    ],
    techTradeoff: 'Incorporated central dual core shear walls to restrict story drift under 0.004h without inflating structural column cross-sections.',
    signals: [
      { label: 'Drift & Displacement', score: 'Within IS 1893 limits' },
      { label: 'Ductile Detailing', score: 'Compliant with IS 13920' },
      { label: 'BOQ Accuracy', score: 'Itemized material estimates' },
    ]
  },
  ece: {
    projectTitle: 'FPGA-Accelerated Fixed-Point FFT Pipeline for Radar Signal Processing',
    projectDescription: 'Verilog hardware description of 1024-point Radix-2² pipelined Fast Fourier Transform targeted for Xilinx Artix-7 architecture.',
    contributions: [
      'Architected butterfly computation stages with fixed-point roundoff truncation.',
      'Synthesized design with zero timing violations at 150 MHz system clock.',
      'Developed cocotb Python co-simulation harness validating against NumPy FFT golden references.'
    ],
    techTradeoff: 'Selected pipelined streaming architecture over shared-memory in-place FFT to sustain continuous 1.2 GSPS radar baseband processing.',
    signals: [
      { label: 'Timing Closure', score: 'WNS: +0.42ns @ 150MHz' },
      { label: 'Hardware Resource Use', score: '42% LUTs, 18 DSP48E1' },
      { label: 'Bit-Exact Verification', score: 'Zero discrepancy vs NumPy' },
    ]
  },
  robotics: {
    projectTitle: 'Autonomous Mobile Robot SLAM & Dynamic Obstacle Trajectory Tracking',
    projectDescription: 'ROS 2 Nav2 stack implementation on differential-drive robot utilizing 2D LiDAR, wheel odometry EKF fusion, and TEB local planner.',
    contributions: [
      'Configured Cartographer SLAM with custom robot urdf and transform trees.',
      'Implemented costmap inflation layers mitigating collision risks with human pedestrians.',
      'Validated path tracking accuracy within ±2.5 cm across 500m indoor warehouse trials.'
    ],
    techTradeoff: 'Chose TEB Local Planner over DWA for superior dynamic obstacle avoidance and reverse trajectory handling in narrow corridors.',
    signals: [
      { label: 'Localization Stability', score: 'EKF covariance bounded' },
      { label: 'Latency', score: '< 20ms planner recomputation' },
      { label: 'Sim2Real Parity', score: 'Benchmarked in Gazebo + TurtleBot' },
    ]
  }
};

export function HirePageClient() {
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<EngineeringRole | null>(null);

  // Active previewed stream tab for Candidate Dossier
  const [previewStreamKey, setPreviewStreamKey] = useState<string>('cse');

  // Form State
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [openings, setOpenings] = useState('1-3');
  const [compensation, setCompensation] = useState('');
  const [workMode, setWorkMode] = useState('On-site / Hybrid');
  const [timeline, setTimeline] = useState('Immediate (Next 30 days)');
  const [hiringType, setHiringType] = useState('Entry-level Employment');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [formStatus, setFormStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [requestId, setRequestId] = useState('');

  useEffect(() => {
    setRequestId(crypto.randomUUID());
  }, []);

  // Filter roles based on stream and search query
  const filteredRoles = useMemo(() => {
    return ALL_ROLES.filter((role) => {
      const matchesStream = selectedStream === 'all' || role.streamId === selectedStream;
      const matchesQuery =
        searchQuery.trim() === '' ||
        role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.streamName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStream && matchesQuery;
    });
  }, [selectedStream, searchQuery]);

  // Handle selecting a role
  const handleSelectRole = (role: EngineeringRole) => {
    setSelectedRole(role);
    setRoleInput(role.title);
    
    // Automatically switch candidate preview if relevant
    if (role.streamId in STREAM_PROJECT_PREVIEWS) {
      setPreviewStreamKey(role.streamId);
    }

    const formEl = document.getElementById('requirements-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePreview = STREAM_PROJECT_PREVIEWS[previewStreamKey] || STREAM_PROJECT_PREVIEWS.cse;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'saving') return;

    if (!consent) {
      setErrorMessage('Please confirm consent for Pathwisse to review and respond to this hiring requirement.');
      setFormStatus('error');
      return;
    }

    if (!company.trim()) {
      setErrorMessage('Please specify your company or organization name.');
      setFormStatus('error');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid corporate or business email address.');
      setFormStatus('error');
      return;
    }

    if (!roleInput.trim()) {
      setErrorMessage('Please specify the role you are hiring for.');
      setFormStatus('error');
      return;
    }

    setFormStatus('saving');
    setErrorMessage('');

    const structuredMessage = [
      `Hiring Requirement Details:`,
      `- Role: ${roleInput}`,
      `- Stream Fit: ${selectedRole ? selectedRole.streamName : 'General / Multi-discipline'}`,
      `- Engagement Type: ${hiringType}`,
      `- Number of Openings: ${openings}`,
      `- Location & Work Mode: ${workMode}`,
      `- Target Timeline: ${timeline}`,
      `- Compensation / Stipend: ${compensation || 'Not specified'}`,
      `- Key Technical Skills: ${requiredSkills || 'Not specified'}`,
      additionalNotes ? `- Additional Context: ${additionalNotes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: requestId || crypto.randomUUID(),
          name: `${company} Hiring Lead`,
          email: email.trim().toLowerCase(),
          organization: company.trim(),
          organization_type: 'Employer',
          designation: 'Hiring Manager / Talent Lead',
          interest: 'hiring',
          message: structuredMessage,
          consent: true,
          source: '/hire',
          landing_page: typeof window !== 'undefined' ? window.location.href : '/hire',
          audience: 'enterprise',
        }),
      });

      const data = await res.json() as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit hiring requirements. Please try again.');
      }

      setFormStatus('success');
      track('form_submit', roleInput, { interest: 'hiring' });
    } catch (err: unknown) {
      setFormStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'We encountered an error submitting your requirement. Please verify your connection or try again.'
      );
      track('form_error', roleInput, { interest: 'hiring' });
    }
  };

  return (
    <div className="bg-[#fcfdfd] text-[#0f172a] selection:bg-[#2458ae]/15 selection:text-[#173c6e]">
      {/* 1. HERO SECTION: RESTRAINED, TYPOGRAPHIC, NO AI SLOP */}
      <section className="border-b border-[#e2e8f0] bg-white pt-24 pb-20 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-[#173c6e]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2458ae]"></span>
            <span>Early-Career Technical Talent Intake</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0f172a] leading-[1.12] max-w-4xl">
            Tell us which early-career engineering role you’re hiring for.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#475569] max-w-2xl font-normal leading-relaxed">
            Specify your technical role expectations, required projects, and timeline. We match your opening against evaluated candidate capability dossiers across 13 engineering disciplines.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#requirements-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#173c6e] text-white font-medium text-sm hover:bg-[#122f56] transition-colors focus-visible:ring-2 focus-visible:ring-[#173c6e] focus-visible:ring-offset-2"
            >
              Share hiring requirements
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#role-directory"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#f8fafc] text-[#1e293b] font-medium text-sm hover:bg-[#f1f5f9] border border-[#cbd5e1] transition-colors"
            >
              Search 206 catalogue roles
            </a>
          </div>

          {/* Core System Parameters */}
          <div className="mt-14 pt-8 border-t border-[#f1f5f9] grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <div className="font-semibold text-[#0f172a] text-sm mb-1">13 Engineering Streams</div>
              <div className="text-[#64748b] leading-relaxed">System-mapped role catalogue</div>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a] text-sm mb-1">Authentic Evidence</div>
              <div className="text-[#64748b] leading-relaxed">Direct project review rubrics</div>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a] text-sm mb-1">Direct Verification</div>
              <div className="text-[#64748b] leading-relaxed">Inspected architectural decisions</div>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a] text-sm mb-1">Cohort Matching</div>
              <div className="text-[#64748b] leading-relaxed">No automated false shortlists</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCHABLE ROLE DIRECTORY: HIGH SCANABILITY, KEYBOARD FRIENDLY, COMPACT */}
      <section id="role-directory" className="py-20 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight">
              Catalogue of 206 Early-Career Engineering Roles
            </h2>
            <p className="text-sm text-[#475569] mt-2 max-w-2xl leading-relaxed">
              Select any role below to prefill your hiring requirement form. Search by role title, technical keywords, or filter by engineering discipline.
            </p>
          </div>
          <div className="text-xs text-[#475569] bg-[#f8fafc] px-3.5 py-2 rounded-md border border-[#e2e8f0] self-start md:self-auto">
            Showing <strong className="text-[#0f172a] font-semibold">{filteredRoles.length}</strong> of 206 roles
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#cbd5e1] shadow-2xs mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles (e.g. Backend, Embedded, CAD, QA, Robotics, Site Engineer)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
              />
            </div>
            <div className="sm:w-72">
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full py-2.5 px-3 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
              >
                <option value="all">All Disciplines (13 Streams)</option>
                {ENGINEERING_STREAMS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rolesCount})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Discipline Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedStream('all')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                selectedStream === 'all'
                  ? 'bg-[#173c6e] text-white'
                  : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
              }`}
            >
              All (206)
            </button>
            {ENGINEERING_STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStream(s.id)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                  selectedStream === s.id
                    ? 'bg-[#173c6e] text-white'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
              >
                {s.name.replace(' Engineering', '')} ({s.rolesCount})
              </button>
            ))}
          </div>
        </div>

        {/* Directory Listing (Clean, Compact, Accessible) */}
        <div className="bg-white rounded-xl border border-[#cbd5e1] shadow-2xs divide-y divide-[#f1f5f9] overflow-hidden">
          {filteredRoles.length === 0 ? (
            <div className="p-12 text-center text-[#64748b]">
              <AlertCircle className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
              <p className="font-semibold text-sm text-[#0f172a]">No engineering roles match your criteria</p>
              <p className="text-xs mt-1">Try modifying your search keywords or resetting the stream filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStream('all');
                }}
                className="mt-4 text-xs text-[#173c6e] font-semibold underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredRoles.map((role) => {
              const isSelected = selectedRole?.id === role.id;
              return (
                <div
                  key={role.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-6 hover:bg-[#fbfcfd] transition-colors gap-3 ${
                    isSelected ? 'bg-[#f4f7fb] hover:bg-[#f4f7fb]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                      {role.level}
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-[#0f172a] truncate">
                        {role.title}
                      </div>
                      <div className="text-xs text-[#64748b] truncate mt-0.5">
                        {role.streamName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    {role.hasPublishedPath && (
                      <span className="hidden md:inline-flex text-[11px] text-[#173c6e] bg-[#edf2f8] px-2.5 py-0.5 rounded font-medium border border-[#d5e0ee]">
                        Published Path Mapped
                      </span>
                    )}
                    <button
                      onClick={() => handleSelectRole(role)}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#173c6e] text-white shadow-2xs'
                          : 'bg-[#f1f5f9] text-[#1e293b] hover:bg-[#173c6e] hover:text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Prefilled</span>
                        </>
                      ) : (
                        <>
                          <span>Select role</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Informational Disclosure */}
        <div className="mt-4 flex items-start gap-2.5 p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#475569] leading-relaxed">
          <Info className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#0f172a] font-semibold">Catalogue Disclosure:</strong> These 206 roles reflect standardized competency frameworks mapped across Pathwisse curricula. Candidate availability is confirmed directly upon review of your requirements.
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CANDIDATE EVIDENCE DOSSIER (STREAM EXPLORER) */}
      <section className="py-20 bg-[#f8fafc] border-y border-[#e2e8f0] px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight">
              Sample Candidate Evidence Dossier
            </h2>
            <p className="text-sm text-[#475569] mt-2 leading-relaxed">
              Review authentic capstone deliverables, code decisions, and evaluation rubrics instead of self-reported résumé bullet points.
            </p>
          </div>

          {/* Stream Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 text-xs">
            <span className="text-[#64748b] font-medium mr-2 shrink-0">Discipline sample:</span>
            {[
              { id: 'cse', label: 'Computer Science' },
              { id: 'mech', label: 'Mechanical' },
              { id: 'civil', label: 'Civil' },
              { id: 'ece', label: 'ECE & Hardware' },
              { id: 'robotics', label: 'Robotics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPreviewStreamKey(tab.id)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
                  previewStreamKey === tab.id
                    ? 'bg-[#173c6e] text-white'
                    : 'bg-white border border-[#cbd5e1] text-[#475569] hover:bg-[#f1f5f9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dossier Card Container */}
          <div className="bg-white rounded-xl border border-[#cbd5e1] shadow-2xs overflow-hidden">
            {/* Dossier Header */}
            <div className="p-5 sm:px-7 border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#f1f5f9] text-[#173c6e] border border-[#e2e8f0]">
                  Project Evidence Preview
                </span>
                <span className="text-xs text-[#64748b]">Reviewed Capstone Deliverable</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#059669] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Rubric Inspected by Technical Evaluator</span>
              </div>
            </div>

            {/* Dossier Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                  {activePreview.projectTitle}
                </h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  {activePreview.projectDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-semibold text-[#0f172a] mb-2.5 flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4 text-[#173c6e]" />
                    Individual Contribution
                  </div>
                  <ul className="text-xs text-[#334155] space-y-2 list-disc pl-4 leading-relaxed">
                    {activePreview.contributions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-semibold text-[#0f172a] mb-2.5 flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-[#173c6e]" />
                    Technical Decision Record
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    {activePreview.techTradeoff}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-semibold text-[#0f172a] mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#173c6e]" />
                    Evaluation Signals
                  </div>
                  <div className="space-y-2.5 text-xs">
                    {activePreview.signals.map((sig, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#334155]">
                        <span>{sig.label}:</span>
                        <strong className="text-[#059669] font-medium">{sig.score}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dossier Disclaimer */}
              <div className="p-3.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] text-xs text-[#475569] flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#64748b]" />
                <div>
                  <strong className="text-[#0f172a]">Illustrative Artifact Notice:</strong> Candidate dossiers contain anonymized project code repositories, commit histories, and recorded evaluation memos, delivered following requirement confirmation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HIRING PROCESS (4 STEPS) */}
      <section className="py-20 px-6 sm:px-10 max-w-5xl mx-auto">
        <div className="max-w-xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight">
            How Hiring with Pathwisse Works
          </h2>
          <p className="text-sm text-[#475569] mt-2 leading-relaxed">
            A structured, transparent pathway from open requirement to candidate selection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Share requirements',
              desc: 'Submit your target roles, required skills, hiring timeline, and openings via the form below.',
              figure: 'keyboard' as const,
              label: 'Interactive requirements keyboard',
            },
            {
              step: '2',
              title: 'Confirm availability',
              desc: 'We match your role against active cohorts and confirm immediate learner availability.',
              figure: 'riffle' as const,
              label: 'Active candidate cohort cards',
            },
            {
              step: '3',
              title: 'Review candidate dossiers',
              desc: 'Inspect verified project artifacts, architectural trade-off memos, and technical rubrics.',
              figure: 'branches' as const,
              label: 'Verifiable Git commit tree',
            },
            {
              step: '4',
              title: 'Interview and select',
              desc: 'Conduct your final conversations with pre-evaluated candidates and extend direct offers.',
              figure: 'vault' as const,
              label: 'Secured credential offer vault',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 sm:p-6 rounded-xl bg-white border border-[#cbd5e1] shadow-2xs flex flex-col justify-between group hover:border-[#173c6e] hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#173c6e] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#e2e8f0]">
                    Step {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748b]">0{item.step}/04</span>
                </div>
                <div className="w-full max-w-[130px] mx-auto my-3">
                  <HairlineFigure figure={item.figure} interactiveHint intensity={0.65} label={item.label} />
                </div>
                <h3 className="font-semibold text-base text-[#0f172a] mt-2 mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HIRING OPTIONS */}
      <section className="py-16 bg-white border-y border-[#e2e8f0] px-6 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0f172a] tracking-tight">
              Supported Engagement Models
            </h2>
            <p className="text-xs text-[#64748b] mt-1">
              Pathwisse supports standard institutional placement models requiring fair compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#173c6e]" />
                <h3 className="font-semibold text-base text-[#0f172a]">Paid Internships</h3>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                3 to 6-month hands-on internships for pre-final and final-year students. Roles must offer monthly stipend compensation and meaningful technical mentorship.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 mb-2">
                <Users2 className="w-4 h-4 text-[#173c6e]" />
                <h3 className="font-semibold text-base text-[#0f172a]">Entry-Level Employment</h3>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Full-time Graduate Trainee, Associate Engineer, and Junior Specialist roles for graduating cohorts, evaluated across structured engineering foundation paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REQUIREMENTS FORM */}
      <section id="requirements-form" className="py-20 px-6 sm:px-10 max-w-4xl mx-auto">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#cbd5e1] shadow-2xs">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight">
              Share Your Hiring Requirements
            </h2>
            <p className="text-sm text-[#64748b] mt-1 leading-relaxed">
              Submit your opening details below. Our talent partnership team will review candidate availability and respond with relevant project dossiers.
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="p-8 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#16a34a] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-[#14532d]">
                Hiring Requirements Received
              </h3>
              <p className="text-sm text-[#166534] mt-2 max-w-lg mx-auto leading-relaxed">
                Thank you. We have recorded your requirement for <strong>{roleInput}</strong>. A talent partnership lead will evaluate active cohorts and contact you at <strong>{email}</strong> within 1-2 business days.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormStatus('idle');
                    setCompany('');
                    setEmail('');
                    setRoleInput('');
                    setSelectedRole(null);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors"
                >
                  Submit another requirement
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Role Prefill Notification */}
              {selectedRole && (
                <div className="p-3.5 rounded-lg bg-[#edf2f8] border border-[#d5e0ee] flex items-center justify-between text-xs text-[#173c6e]">
                  <div>
                    Prefilled from catalogue: <strong>{selectedRole.title}</strong> ({selectedRole.streamName})
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole(null);
                      setRoleInput('');
                    }}
                    className="text-[#173c6e] underline font-semibold hover:text-[#0c213d]"
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Technologies Ltd."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hiring@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Target Engineering Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    placeholder="e.g. Backend Engineer (Node/Python/Go)"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  />
                  <p className="text-[11px] text-[#64748b] mt-1">
                    Select from directory above or enter custom title.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Hiring Type *
                  </label>
                  <select
                    value={hiringType}
                    onChange={(e) => setHiringType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  >
                    <option value="Entry-level Employment">Entry-level Full-Time Employment</option>
                    <option value="Paid Internship">Paid Internship (3 - 6 months)</option>
                    <option value="Internship to Full-Time">Internship with Pre-Placement Offer (PPO)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Number of Openings
                  </label>
                  <select
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  >
                    <option value="1">1 opening</option>
                    <option value="2-5">2 - 5 openings</option>
                    <option value="6-15">6 - 15 openings</option>
                    <option value="16+">16+ bulk openings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Work Location / Mode
                  </label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  >
                    <option value="On-site / Hybrid">On-site / Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="Open to Discussion">Open to Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  >
                    <option value="Immediate (Next 30 days)">Immediate (&lt; 30 days)</option>
                    <option value="Next 1-3 months">1 - 3 months</option>
                    <option value="Upcoming Graduating Cohort">Upcoming Graduating Cohort</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Required Technical Skills & Tools
                  </label>
                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    placeholder="e.g. React, PostgreSQL, Docker, Go, Git"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                    Compensation / Stipend Range
                  </label>
                  <input
                    type="text"
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                    placeholder="e.g. ₹6-9 LPA or ₹25k/mo stipend"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Additional Requirement Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Share details regarding team size, domain requirements, interview format, or specific candidate prerequisites..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173c6e]"
                />
              </div>

              {/* Consent Row */}
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(val) => setConsent(val === true)}
                />
                <label htmlFor="consent" className="text-xs text-[#475569] leading-relaxed cursor-pointer">
                  I agree that Pathwisse may process these details to evaluate candidate availability and contact our organization regarding this hiring requirement. <a href="/trust/privacy" className="text-[#173c6e] underline">Privacy notice</a>.
                </label>
              </div>

              {formStatus === 'error' && (
                <div className="p-3.5 rounded-lg bg-[#fef2f2] border border-[#fecaca] text-xs text-[#b91c1c] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <MotionSubmitButton
                status={formStatus}
                idleText="Submit Hiring Requirements"
                savingText="Submitting requirement..."
                successText="Requirement Submitted"
                type="submit"
                className="w-full sm:w-auto"
              />
            </form>
          )}
        </div>
      </section>

      {/* 7. DISCLOSURE FAQS */}
      <section className="py-20 px-6 sm:px-10 max-w-4xl mx-auto border-t border-[#e2e8f0]">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0f172a] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <details className="group bg-white p-5 rounded-xl border border-[#cbd5e1] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>Which engineering roles does Pathwisse support?</span>
              <ChevronDown className="w-4 h-4 text-[#94a3b8] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              We support 206 standardized entry-level roles across 13 engineering disciplines: Computer Science, Civil, Mechanical, Electrical, Chemical, Biomedical, Aerospace, Electronics & Communication, Environmental, Industrial & Manufacturing, Petroleum, Robotics & Automation, and Materials Science.
            </p>
          </details>

          <details className="group bg-white p-5 rounded-xl border border-[#cbd5e1] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>Does Pathwisse charge recruitment or placement fees?</span>
              <ChevronDown className="w-4 h-4 text-[#94a3b8] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              Hiring partnership models vary based on company requirements (standard cohort placement access vs. customized talent intelligence sprints). We do not claim zero-cost hiring; terms and engagement scopes are agreed upon transparently during initial requirements review.
            </p>
          </details>

          <details className="group bg-white p-5 rounded-xl border border-[#cbd5e1] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>How are candidate capabilities evaluated?</span>
              <ChevronDown className="w-4 h-4 text-[#94a3b8] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              Candidates are evaluated on concrete capstone deliverables, code modularity, concurrency handling, test suites, and written architectural decision memos. We do not rely solely on automated multiple-choice tests or keyword parsing.
            </p>
          </details>

          <details className="group bg-white p-5 rounded-xl border border-[#cbd5e1] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>What happens after submitting our requirement?</span>
              <ChevronDown className="w-4 h-4 text-[#94a3b8] group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              Within 1-2 business days, our talent team evaluates candidate cohorts matching your role specifications, verifies their availability and interest, and shares anonymized evidence dossiers for your initial review.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
