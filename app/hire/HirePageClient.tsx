'use client';

import { useState, useId, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  FolderGit2,
  Layers,
  ArrowRight,
  Filter,
  Briefcase,
  ChevronRight,
  Sparkles,
  Info,
  Calendar,
  Building,
  Mail,
  MapPin,
  DollarSign,
  Users2
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

export function HirePageClient() {
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<EngineeringRole | null>(null);

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

  // Update role input when user selects a role from the catalogue
  const handleSelectRole = (role: EngineeringRole) => {
    setSelectedRole(role);
    setRoleInput(role.title);
    const formEl = document.getElementById('requirements-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter roles based on stream and search query
  const filteredRoles = ALL_ROLES.filter((role) => {
    const matchesStream = selectedStream === 'all' || role.streamId === selectedStream;
    const matchesQuery =
      searchQuery.trim() === '' ||
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.streamName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStream && matchesQuery;
  });

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
    <div className="bg-[#f8fafc] text-[#0f172a]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0d1e38] text-white pt-24 pb-20 px-6 sm:px-8 border-b border-[#1b345d]">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1a3a6b]/80 text-[#93c5fd] border border-[#255294] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse"></span>
            EMPLOYER TALENT SERVICE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
            Tell us which early-career engineering role you’re hiring for.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#94a3b8] max-w-2xl font-normal leading-relaxed">
            Specify your technical role expectations, required projects, and timeline.
            We match your opening against evaluated candidate capability dossiers across 13 engineering disciplines.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#requirements-form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#2563eb] text-white font-medium text-base hover:bg-[#1d4ed8] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0d1e38]"
            >
              Share hiring requirements
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#role-directory"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#142e54] text-[#cbd5e1] font-medium text-base hover:bg-[#1c3f73] transition-all border border-[#2b4c7e]"
            >
              Explore 206 catalogue roles
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1b345d]/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#94a3b8]">
            <div>
              <div className="font-semibold text-white text-sm mb-1">13 Streams</div>
              <div>System-mapped role catalogue</div>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">Authentic Evidence</div>
              <div>Direct project review rubrics</div>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">No Keyword Fluff</div>
              <div>Inspected architectural decisions</div>
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">Confirmed Availability</div>
              <div>No automated false shortlists</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROLE DIRECTORY (COMPACT LISTS, STREAM FILTER, SEARCH) */}
      <section id="role-directory" className="py-16 px-6 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase">
              ENGINEERING ROLE TAXONOMY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
              Searchable Role Directory (206 Published Roles)
            </h2>
            <p className="text-sm text-[#64748b] mt-1 max-w-2xl">
              Browse standardized entry-level roles across 13 engineering disciplines. Select any role to immediately prefill your hiring requirement.
            </p>
          </div>
          <div className="text-xs text-[#64748b] bg-white px-3 py-2 rounded-md border border-[#e2e8f0] shadow-2xs self-start md:self-auto">
            Showing <strong className="text-[#0f172a]">{filteredRoles.length}</strong> of 206 catalogue roles
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-xs mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title (e.g. Backend Engineer, Embedded, CAD, QA, Drone)..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div className="sm:w-72">
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full py-2 px-3 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              >
                <option value="all">All Engineering Streams (13)</option>
                {ENGINEERING_STREAMS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rolesCount})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stream Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <button
              onClick={() => setSelectedStream('all')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                selectedStream === 'all'
                  ? 'bg-[#1e293b] text-white'
                  : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
              }`}
            >
              All Streams (206)
            </button>
            {ENGINEERING_STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStream(s.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                  selectedStream === s.id
                    ? 'bg-[#1e293b] text-white'
                    : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
              >
                {s.name.replace(' Engineering', '')} ({s.rolesCount})
              </button>
            ))}
          </div>
        </div>

        {/* Directory Listing (Compact Rows) */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-xs divide-y divide-[#f1f5f9] overflow-hidden">
          {filteredRoles.length === 0 ? (
            <div className="p-12 text-center text-[#64748b]">
              <AlertCircle className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
              <p className="font-medium text-[#0f172a]">No engineering roles match your search</p>
              <p className="text-xs mt-1">Try adjusting your search keywords or clearing stream filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStream('all');
                }}
                className="mt-3 text-xs text-[#2563eb] font-semibold hover:underline"
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
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-5 hover:bg-[#f8fafc] transition-colors gap-3 ${
                    isSelected ? 'bg-[#eff6ff] hover:bg-[#eff6ff]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
                      {role.level}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-[#0f172a] truncate">
                        {role.title}
                      </div>
                      <div className="text-xs text-[#64748b] truncate">
                        {role.streamName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    {role.hasPublishedPath && (
                      <span className="hidden md:inline-flex text-[11px] text-[#0369a1] bg-[#e0f2fe] px-2 py-0.5 rounded font-medium border border-[#bae6fd]">
                        Standard Path Mapped
                      </span>
                    )}
                    <button
                      onClick={() => handleSelectRole(role)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#2563eb] text-white'
                          : 'bg-[#f1f5f9] text-[#1e293b] hover:bg-[#2563eb] hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select role'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Directory Disclaimer */}
        <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] text-xs text-[#475569]">
          <Info className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#0f172a]">Catalogue Notice:</strong> These 206 roles represent standardized engineering career paths mapped in the Pathwisse curriculum. Candidate readiness and cohort availability are evaluated against individual requirements upon request.
          </div>
        </div>
      </section>

      {/* 3. CANDIDATE EVIDENCE ARTIFACT EXAMPLE */}
      <section className="py-16 bg-[#f1f5f9] border-y border-[#e2e8f0] px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase">
              AUTHENTIC ARTIFACT AUDIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
              Sample Candidate Evidence Dossier
            </h2>
            <p className="text-sm text-[#64748b] mt-2">
              Instead of unverified self-reported resumes, review evaluated technical project deliverables, contribution commits, and architectural decision records.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#cbd5e1] shadow-sm overflow-hidden">
            {/* Artifact Header Banner */}
            <div className="bg-[#0f172a] text-white p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1e293b]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#2563eb] text-[11px] font-mono font-semibold uppercase tracking-wide text-white">
                  Sample Project Artifact
                </span>
                <span className="text-xs text-[#94a3b8]">Verified Capstone Evaluation</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#38bdf8]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rubric Inspected by Senior Technical Reviewer</span>
              </div>
            </div>

            {/* Artifact Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#f1f5f9] pb-6">
                <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1">
                  Evaluated Project Title
                </div>
                <h3 className="text-xl font-bold text-[#0f172a]">
                  Distributed Key-Value Store with Raft Consensus & Log Compaction
                </h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  A high-throughput distributed state machine implemented in Go, featuring leader election, log replication with heartbeats, and disk-backed state snapshots.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-4 h-4 text-[#2563eb]" />
                    Individual Contribution
                  </div>
                  <ul className="text-xs text-[#334155] space-y-2 list-disc pl-4">
                    <li>Authored RPC transport layer and serialization protocols.</li>
                    <li>Designed split-brain network partition safety tests in Docker.</li>
                    <li>Optimized disk fsync latency, improving write ops/sec by 28%.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-[#2563eb]" />
                    Technical Decision Record
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    <strong>Trade-off:</strong> Opted for gRPC over custom TCP sockets to standardize timeout deadlines and tracing, accepting an 8% serialisation overhead in exchange for robust observability.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#2563eb]" />
                    Evaluation Signals
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[#334155]">
                      <span>Code Modularization:</span>
                      <strong className="text-[#059669]">Proficient (4/5)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#334155]">
                      <span>Concurrency Safety:</span>
                      <strong className="text-[#059669]">Exemplary (5/5)</strong>
                    </div>
                    <div className="flex justify-between items-center text-[#334155]">
                      <span>Test Coverage:</span>
                      <strong className="text-[#059669]">88% Automated</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artifact Explicit Limitation Notice */}
              <div className="p-4 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#1e40af] flex items-start gap-3">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#2563eb]" />
                <div>
                  <strong>Illustrative Evaluation Artifact:</strong> This dossier represents an authentic capstone rubric used in Pathwisse technical evaluations. Individual candidate dossiers are provided with anonymized candidate consent once hiring requirements and roles are confirmed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HIRING PROCESS (4 STEPS) */}
      <section className="py-16 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase">
            STRUCTURED WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
            How Hiring with Pathwisse Works
          </h2>
          <p className="text-sm text-[#64748b] mt-1">
            Predictable, transparent hiring grounded in verified capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Share requirements',
              desc: 'Submit your open roles, technical stack, openings, location model, and hiring timeline below.',
            },
            {
              step: '02',
              title: 'Confirm availability',
              desc: 'Our academic and talent team reviews matched candidate cohorts and verifies immediate readiness.',
            },
            {
              step: '03',
              title: 'Review relevant profiles',
              desc: 'Inspect detailed candidate project artifacts, code rubrics, and technical decision records.',
            },
            {
              step: '04',
              title: 'Interview and select',
              desc: 'Conduct your final technical and culture conversations, and make direct offers to ready talent.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-2xs relative flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-bold text-[#cbd5e1] font-mono">{item.step}</span>
                <h3 className="font-bold text-base text-[#0f172a] mt-2 mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HIRING OPTIONS */}
      <section className="py-12 bg-white border-y border-[#e2e8f0] px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase">
                ENGAGEMENT MODELS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] mt-0.5">
                Supported Hiring Options
              </h2>
            </div>
            <span className="text-xs text-[#64748b]">Fair compensation standards required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#2563eb]" />
                <h3 className="font-bold text-base text-[#0f172a]">Paid Internships</h3>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                3 to 6-month hands-on internships for pre-final and final-year students. Must offer stipend compensation and meaningful engineering project supervision.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="flex items-center gap-2 mb-2">
                <Users2 className="w-4 h-4 text-[#2563eb]" />
                <h3 className="font-bold text-base text-[#0f172a]">Entry-Level Employment</h3>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Full-time Associate Engineer, Graduate Trainee, and Junior Specialist roles for graduating cohorts. Direct employment with verifiable technical foundations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REQUIREMENTS FORM */}
      <section id="requirements-form" className="py-16 px-6 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#cbd5e1] shadow-sm">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase">
              EMPLOYER INTAKE FORM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
              Share Your Hiring Requirements
            </h2>
            <p className="text-sm text-[#64748b] mt-1">
              Provide details regarding your open position. Our talent partnership team will review candidate availability and respond with relevant project dossiers.
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="p-8 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#16a34a] mx-auto mb-3" />
              <h3 className="text-xl font-bold text-[#14532d]">
                Hiring Requirements Received
              </h3>
              <p className="text-sm text-[#166534] mt-2 max-w-lg mx-auto">
                Thank you. We have logged your requirement for <strong>{roleInput}</strong>. A talent partnership lead will evaluate active cohorts and contact you at <strong>{email}</strong> within 1-2 business days.
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
                  className="px-5 py-2 text-xs font-semibold bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors"
                >
                  Submit another requirement
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Role Notification Banner */}
              {selectedRole && (
                <div className="p-3.5 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-between text-xs text-[#1e40af]">
                  <div>
                    Prefilled from catalogue: <strong>{selectedRole.title}</strong> ({selectedRole.streamName})
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole(null);
                      setRoleInput('');
                    }}
                    className="text-[#2563eb] underline font-medium hover:text-[#1d4ed8]"
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Technologies Ltd."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hiring@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Target Engineering Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    placeholder="e.g. Backend Engineer (Node/Python/Go)"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                  <p className="text-[11px] text-[#64748b] mt-1">
                    Select from directory above or enter custom title.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Hiring Type *
                  </label>
                  <select
                    value={hiringType}
                    onChange={(e) => setHiringType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  >
                    <option value="Entry-level Employment">Entry-level Full-Time Employment</option>
                    <option value="Paid Internship">Paid Internship (3 - 6 months)</option>
                    <option value="Internship to Full-Time">Internship with Pre-Placement Offer (PPO)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Number of Openings
                  </label>
                  <select
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  >
                    <option value="1">1 opening</option>
                    <option value="2-5">2 - 5 openings</option>
                    <option value="6-15">6 - 15 openings</option>
                    <option value="16+">16+ bulk openings</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Work Location / Mode
                  </label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  >
                    <option value="On-site / Hybrid">On-site / Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="Open to Discussion">Open to Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  >
                    <option value="Immediate (Next 30 days)">Immediate (&lt; 30 days)</option>
                    <option value="Next 1-3 months">1 - 3 months</option>
                    <option value="Upcoming Graduating Cohort">Upcoming Graduating Cohort</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Required Technical Skills & Tools
                  </label>
                  <input
                    type="text"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    placeholder="e.g. React, PostgreSQL, Docker, Go, Git"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Compensation / Stipend Range
                  </label>
                  <input
                    type="text"
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                    placeholder="e.g. ₹6-9 LPA or ₹25k/mo stipend"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                  Additional Requirement Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Share details regarding team size, domain requirements, interview format, or specific candidate prerequisites..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-[#0f172a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
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
                  I agree that Pathwisse may process these details to evaluate candidate availability and contact our organization regarding this hiring requirement. <a href="/trust/privacy" className="text-[#2563eb] underline">Privacy notice</a>.
                </label>
              </div>

              {formStatus === 'error' && (
                <div className="p-3 rounded-lg bg-[#fef2f2] border border-[#fecaca] text-xs text-[#b91c1c] flex items-center gap-2">
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
      <section className="py-16 px-6 sm:px-8 max-w-4xl mx-auto border-t border-[#e2e8f0]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-wider text-[#2563eb] uppercase">
            TRANSPARENT ANSWERS
          </span>
          <h2 className="text-2xl font-bold text-[#0f172a] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <details className="group bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>Which engineering roles does Pathwisse support?</span>
              <span className="text-[#94a3b8] group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              We support 206 standardized entry-level roles across 13 engineering disciplines: Computer Science, Civil, Mechanical, Electrical, Chemical, Biomedical, Aerospace, Electronics & Communication, Environmental, Industrial & Manufacturing, Petroleum, Robotics & Automation, and Materials Science.
            </p>
          </details>

          <details className="group bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>Does Pathwisse charge recruitment or placement fees?</span>
              <span className="text-[#94a3b8] group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              Hiring partnership models vary based on company requirements (standard cohort placement access vs. customized talent intelligence sprints). We do not claim zero-cost hiring; terms and engagement scopes are agreed upon transparently during initial requirements review.
            </p>
          </details>

          <details className="group bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>How are candidate capabilities evaluated?</span>
              <span className="text-[#94a3b8] group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              Candidates are evaluated on concrete capstone deliverables, code modularity, concurrency handling, test suites, and written architectural decision memos. We do not rely solely on automated multiple-choice tests or keyword parsing.
            </p>
          </details>

          <details className="group bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-2xs">
            <summary className="font-semibold text-sm text-[#0f172a] cursor-pointer flex justify-between items-center list-none">
              <span>What happens after submitting our requirement?</span>
              <span className="text-[#94a3b8] group-open:rotate-180 transition-transform">▼</span>
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
