'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FolderGit2,
  Code2,
  Users,
  Compass,
  Layers,
  GraduationCap,
  Building2,
  BriefcaseBusiness,
} from 'lucide-react';

export type ExperiencePersona = 'students' | 'colleges' | 'companies';

interface InteractiveExperienceSectionProps {
  activePersona: ExperiencePersona;
  onPersonaChange?: (persona: ExperiencePersona) => void;
}

export function InteractiveExperienceSection({
  activePersona,
  onPersonaChange,
}: InteractiveExperienceSectionProps) {
  // ---------------------------------------------------------------------------
  // INTERACTIVE STATES
  // ---------------------------------------------------------------------------

  // Student Feature 1 (Career Discovery)
  const [selectedRole, setSelectedRole] = useState<'designer' | 'analyst' | 'developer'>('designer');

  // Student Feature 2 (Roadmap Steps)
  const [roadmapStep, setRoadmapStep] = useState<number>(3);
  const [roadmapDone, setRoadmapDone] = useState<boolean>(false);

  // Student Feature 3 (Interactive Quiz)
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizXp, setQuizXp] = useState<number>(120);

  // Student Feature 4 (Qalam Interactive Agent)
  const [agentUserMsg, setAgentUserMsg] = useState<string>('What should I learn next?');
  const [agentBotReply, setAgentBotReply] = useState<string>(
    'Try user research basics next. Start with one interview, then summarize what you learned into 3 key takeaways.'
  );

  // Student Feature 5 (Project Evidence)
  const [projectEvidenceVisible, setProjectEvidenceVisible] = useState<boolean>(false);

  // College Feature 1 (Skill Focus)
  const [skillFocused, setSkillFocused] = useState<boolean>(false);

  // College Feature 2 (Student Risk)
  const [selectedStudentRisk, setSelectedStudentRisk] = useState<'A' | 'B' | 'C'>('A');

  // College Feature 3 (Intervention)
  const [interventionPreviewed, setInterventionPreviewed] = useState<boolean>(false);

  // Company Feature 1 (Talent Candidate)
  const [selectedCandidate, setSelectedCandidate] = useState<'AS' | 'NK' | 'RM'>('AS');

  // Company Feature 2 (Skills Matching tags)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'APIs', 'Git']);

  // Company Feature 4 (Challenge Preview)
  const [challengePreviewed, setChallengePreviewed] = useState<boolean>(false);

  // Helper for skill matching score
  const matchScore = Math.min(98, 55 + selectedSkills.length * 10 + (selectedSkills.length === 3 ? 1 : 0));

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAgentPrompt = (question: string) => {
    const replies: Record<string, string> = {
      'Help with my next skill':
        'Focus on a practical skill you can use this week. Learn one concept, practice it, then demonstrate it in a pull request.',
      'Suggest a project':
        'Try a simple user-research project: interview three peers and create one measurable UI improvement proposal.',
      'Explain a concept':
        'An API is a bridge that lets two software systems exchange information securely. Try sketching an endpoint request and response.',
    };
    setAgentUserMsg(question);
    setAgentBotReply(replies[question] || 'Let us break that challenge into smaller testable milestones.');
  };

  // ---------------------------------------------------------------------------
  // PERSONA CONTENT DEFINITIONS
  // ---------------------------------------------------------------------------

  const contentMap = {
    students: {
      storyLabel: 'THE STUDENT EXPERIENCE',
      storyHeading: 'More than lessons. A path from curiosity to capability.',
      storySub:
        'Every step should help you answer one question: what can I do next, and how can I demonstrate it?',
      outcomeHeading: 'Progress is useful. Proof is powerful.',
      outcomeSub:
        'Pathwisse connects learning, real work, and the opportunities students become ready for.',
      outcomes: [
        {
          icon: '◇',
          title: 'Clearer direction',
          desc: 'Explore careers with role clarity and actionable skill prerequisites.',
        },
        {
          icon: '↗',
          title: 'Visible progress',
          desc: 'See exactly what has been completed, what is next, and why it matters.',
        },
        {
          icon: '✓',
          title: 'Proof of capability',
          desc: 'Demonstrate abilities through verifiable project repositories, not quiz scores.',
        },
      ],
    },
    colleges: {
      storyLabel: 'THE COLLEGE EXPERIENCE',
      storyHeading: 'From student data to student progress.',
      storySub:
        'Know where each cohort stands, identify who needs help early, and make institutional impact visible before placement season.',
      outcomeHeading: 'Know what is changing. Know what to do.',
      outcomeSub:
        'Move beyond static completion reports toward actionable student progress and demonstrated skills.',
      outcomes: [
        {
          icon: '◎',
          title: 'Earlier intervention',
          desc: 'Identify students and skills that need attention 90 days before company visits.',
        },
        {
          icon: '▥',
          title: 'Cohort visibility',
          desc: 'Understand capability distribution across departments, batches, and programs.',
        },
        {
          icon: '↗',
          title: 'Career readiness',
          desc: 'Track concrete project work and pass rates that support authentic employability.',
        },
      ],
    },
    companies: {
      storyLabel: 'THE COMPANY EXPERIENCE',
      storyHeading: 'Go beyond the résumé. See capability in action.',
      storySub:
        'Connect with emerging engineering talent through verified skill evidence, inspectable code architectures, and benchmarked readiness.',
      outcomeHeading: 'Better signals. More meaningful matches.',
      outcomeSub:
        'Eliminate the gap between uncalibrated candidate profiles and demonstrated engineering ability.',
      outcomes: [
        {
          icon: '✓',
          title: 'Skill evidence',
          desc: 'Review demonstrated capability and verified test suites in under 60 seconds.',
        },
        {
          icon: '◎',
          title: 'Relevant discovery',
          desc: 'Find candidates matching the real architecture work your engineering teams build.',
        },
        {
          icon: '↗',
          title: 'Talent connections',
          desc: 'Fast-track promising engineers directly into final-round technical interviews.',
        },
      ],
    },
  };

  const currentContent = contentMap[activePersona];

  return (
    <div className="w-full mt-20 pt-16 border-t border-slate-200/90 relative">
      {/* Background Subtle Tech Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* ------------------------------------------------------------------- */}
      {/* SECTION HEADER                                                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 text-xs font-mono font-bold tracking-widest uppercase mb-3">
          <Sparkles size={12} className="text-blue-600" />
          <span>{currentContent.storyLabel}</span>
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-tight">
          {currentContent.storyHeading}
        </h3>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          {currentContent.storySub}
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 5 INTERACTIVE FEATURE ROWS                                          */}
      {/* ------------------------------------------------------------------- */}
      <div className="space-y-16 sm:space-y-24 max-w-6xl mx-auto px-4 sm:px-6">
        {/* ================================================================= */}
        {/* FOR STUDENTS                                                      */}
        {/* ================================================================= */}
        {activePersona === 'students' && (
          <>
            {/* FEATURE 1: CAREER DISCOVERY */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
                  01 / 05 · EXPLORATION
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Discover careers that fit who you are.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Explore roles through your interests, strengths, and goals rather than choosing a career blindly. Understand what each role actually involves, which skills matter, and where to begin.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Find a direction before choosing a course.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#fbf0e7] border border-orange-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                {/* Interactive UI Pane */}
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Explore Careers</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                      For You
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Based on your interests • Interactive sample roles</p>

                  <div className="space-y-2">
                    {[
                      {
                        id: 'designer',
                        title: 'Product Designer',
                        sub: 'Research • Design • Prototyping',
                        match: '92%',
                        icon: '◈',
                      },
                      {
                        id: 'analyst',
                        title: 'Data Analyst',
                        sub: 'SQL • Insights • Storytelling',
                        match: '86%',
                        icon: '⌘',
                      },
                      {
                        id: 'developer',
                        title: 'Software Developer',
                        sub: 'Programming • Systems • APIs',
                        match: '82%',
                        icon: '{ }',
                      },
                    ].map((role) => {
                      const isSel = selectedRole === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id as any)}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            isSel
                              ? 'border-blue-500 bg-blue-50/60 shadow-xs'
                              : 'border-slate-200/80 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                              {role.icon}
                            </span>
                            <div>
                              <span className="text-xs font-bold text-slate-900 block">{role.title}</span>
                              <span className="text-[10px] text-slate-500">{role.sub}</span>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                            {role.match}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/60 text-center font-medium">
                    ✦ Selected:{' '}
                    <strong className="text-slate-900">
                      {selectedRole === 'designer'
                        ? 'Product Designer'
                        : selectedRole === 'analyst'
                        ? 'Data Analyst'
                        : 'Software Developer'}
                    </strong>{' '}
                    • Explore related skills.
                  </div>
                </div>
              </div>
            </article>

            {/* FEATURE 2: ROADMAP STEPS */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-2 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">
                  02 / 05 · GUIDED MILESTONES
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  A learning path made for where you want to go.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Turn a career goal into a clear sequence of skills, stages, and practical milestones. See what you have finished, what is next, and why that next step matters.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>One clear next action. Every time.</span>
                </div>
              </div>

              <div className="order-2 lg:order-1 p-6 sm:p-8 rounded-[32px] bg-[#eaf4e9] border border-emerald-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                {/* Interactive UI Pane */}
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Your Career Roadmap</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                      On Track
                    </span>
                  </div>

                  <div className="space-y-3 py-1">
                    {[
                      {
                        num: 1,
                        title: 'Explore the role',
                        desc: 'Career discovery • Completed',
                        done: true,
                      },
                      {
                        num: 2,
                        title: 'Learn the fundamentals',
                        desc: 'Core concepts • Completed',
                        done: true,
                      },
                      {
                        num: 3,
                        title: 'Build practical skills',
                        desc: 'Research, tools, and real examples',
                        done: roadmapStep > 3,
                        now: roadmapStep === 3,
                      },
                      {
                        num: 4,
                        title: 'Complete a project',
                        desc: 'Make your work visible with code proof',
                        done: roadmapStep > 4,
                        now: roadmapStep === 4,
                      },
                    ].map((st) => (
                      <div key={st.num} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                            st.done
                              ? 'bg-emerald-600 text-white'
                              : st.now
                              ? 'border-2 border-blue-600 bg-blue-50 text-blue-700'
                              : 'border border-slate-300 text-slate-400 bg-white'
                          }`}
                        >
                          {st.done ? '✓' : st.num}
                        </div>
                        <div className="text-left flex-1">
                          <span className="text-xs font-bold text-slate-900 block leading-tight">
                            {st.title}
                          </span>
                          <span className="text-[10.5px] text-slate-500">{st.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={roadmapDone}
                      onClick={() => {
                        if (roadmapStep === 3) {
                          setRoadmapStep(4);
                        } else {
                          setRoadmapStep(5);
                          setRoadmapDone(true);
                        }
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        roadmapDone
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      }`}
                    >
                      {roadmapDone ? 'All Milestones Completed ✓' : 'Mark Next Milestone ✓'}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-2 font-mono">
                      {roadmapDone
                        ? '✓ All project milestones authenticated in dossier.'
                        : '✓ One meaningful milestone recorded at a time.'}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* FEATURE 3: INTERACTIVE QUIZ CHALLENGE */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-purple-600 uppercase">
                  03 / 05 · ACTIVE PRACTICE
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Learn by doing, not just watching.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Work through short challenges, interactive exercises, and progress milestones that make learning active. Build consistency through authentic feedback and achievable wins.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Gamification that reinforces real learning.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#f1effd] border border-purple-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                {/* Interactive UI Pane */}
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Quick Skill Challenge</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                      ✦ {quizXp} XP
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-purple-700 tracking-wider uppercase font-bold block">
                    INTERACTIVE CHALLENGE
                  </span>
                  <p className="text-xs font-bold text-slate-900">
                    What is the main engineering purpose of an API?
                  </p>

                  <div className="space-y-2 pt-1">
                    {[
                      { id: 'A', text: 'A. Design webpage color themes', correct: false },
                      { id: 'B', text: 'B. Let software systems communicate', correct: true },
                      { id: 'C', text: 'C. Store a local computer’s electrical power', correct: false },
                    ].map((opt) => {
                      const isChosen = quizSelected === opt.id;
                      const showResult = quizSelected !== null;

                      let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-700';
                      if (showResult) {
                        if (opt.correct) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isChosen && !opt.correct) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={showResult}
                          onClick={() => {
                            setQuizSelected(opt.id);
                            if (opt.correct) {
                              setQuizXp(140);
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  {quizSelected ? (
                    <div
                      className={`text-[11px] p-2 rounded-lg text-center font-medium ${
                        quizSelected === 'B'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {quizSelected === 'B'
                        ? '✓ Correct! +20 XP awarded for API system architecture understanding.'
                        : 'Try again: an API connects software systems with protocol contracts.'}
                    </div>
                  ) : (
                    <p className="text-[10.5px] text-slate-400 text-center font-mono">
                      Choose an answer to test your understanding.
                    </p>
                  )}
                </div>
              </div>
            </article>

            {/* FEATURE 4: MEET QALAM AGENT */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-2 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
                  04 / 05 · REAL-TIME GUIDANCE
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Meet Qalam, your guide when you get stuck.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Ask what a topic means, why a skill matters, or which direction to explore next. Get guided explanations and prompts that help you think, practice, and make progress without robotic answers.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>A helpful guide, not an answer machine.</span>
                </div>
              </div>

              <div className="order-2 lg:order-1 p-6 sm:p-8 rounded-[32px] bg-[#edf3fe] border border-blue-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                {/* Interactive UI Pane */}
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-blue-600" />
                      <span>Ask Qalam</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                      Learning Guide
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 leading-relaxed">
                      Hello! Where would you like a little clarity today?
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white font-medium text-right ml-6">
                      {agentUserMsg}
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 leading-relaxed">
                      {agentBotReply}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {[
                      'Help with my next skill',
                      'Suggest a project',
                      'Explain a concept',
                    ].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleAgentPrompt(q)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* FEATURE 5: MAKE SOMETHING REAL (PROJECT PROOF) */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-orange-600 uppercase">
                  05 / 05 · CAPSTONE PROOF
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Make something real. Show what you can do.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Apply new skills to practical briefs, submit real work, and improve it with feedback. Bring your strongest projects together as evidence of capability for future opportunities.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                  <span>A portfolio built on work, not claims.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#fff1ed] border border-orange-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                {/* Interactive UI Pane */}
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Build a Real Project</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                      Portfolio Ready
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-xs">
                    Design a student career dashboard
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Create a clear next-step experience for learners with real metrics and research notes.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-medium">
                      ✓ User flows
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-medium">
                      ✓ Wireframes
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-medium">
                      ✓ Prototype
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">3 Artifacts</span>
                      <span className="text-[10px] text-slate-400">Ready to review</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProjectEvidenceVisible(true)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      View Evidence ↗
                    </button>
                  </div>

                  {projectEvidenceVisible && (
                    <div className="text-[11px] p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                      ✓ Example evidence unlocked: <b>research notes, wireframes, and clickable prototype.</b>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </>
        )}

        {/* ================================================================= */}
        {/* FOR COLLEGES                                                      */}
        {/* ================================================================= */}
        {activePersona === 'colleges' && (
          <>
            {/* FEATURE 1: SKILL GAPS */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-purple-600 uppercase">
                  01 / 05 · COHORT DEFICIT SCAN
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Know exactly where skill gaps exist.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  View student and cohort capability against role-relevant skill requirements. Identify patterns across departments and prioritize what to accelerate next.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Move from assumptions to skill intelligence.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#f1effd] border border-purple-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Skill Gap Overview</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-mono text-[10px] font-bold">
                      B.Tech · Year 4
                    </span>
                  </div>

                  <div className="space-y-2 py-1">
                    {[
                      { name: 'Analytical skills', pct: '82%', color: '#7c3aed' },
                      { name: 'Programming', pct: '67%', color: '#2563eb' },
                      { name: 'Communication', pct: '74%', color: '#10b981' },
                      { name: 'Applied projects', pct: '43%', color: '#f59e0b' },
                    ].map((s) => (
                      <div key={s.name} className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>{s.name}</span>
                          <span className="font-mono font-bold" style={{ color: s.color }}>{s.pct}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: s.pct, backgroundColor: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-between">
                    <span>Priority gap: <b>Applied projects</b></span>
                    <button
                      type="button"
                      onClick={() => setSkillFocused(true)}
                      className="px-2 py-0.5 bg-amber-200/70 hover:bg-amber-300 rounded font-bold text-[10px] cursor-pointer"
                    >
                      Focus Skill →
                    </button>
                  </div>
                  {skillFocused && (
                    <p className="text-[10px] text-emerald-700 font-mono text-center">
                      ✓ Targeted sprint dispatched for 43% deficit cohort.
                    </p>
                  )}
                </div>
              </div>
            </article>

            {/* FEATURE 2: SPOT STUDENTS AT RISK */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-2 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase">
                  02 / 05 · HUMAN INTERVENTIONS
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Spot students who need support earlier.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Bring learning signals together to surface students who may be losing momentum. Give educators a starting point for timely human review, not automated verdicts.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Make early support possible.</span>
                </div>
              </div>

              <div className="order-2 lg:order-1 p-6 sm:p-8 rounded-[32px] bg-[#fbf0e7] border border-amber-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Student Support Signals</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono text-[10px] font-bold">
                      Human Review
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: 'A', name: 'Student A', reason: 'Low recent learning activity' },
                      { id: 'B', name: 'Student B', reason: 'Stalled milestone progress' },
                      { id: 'C', name: 'Student C', reason: 'Needs project code guidance' },
                    ].map((st) => {
                      const isSel = selectedStudentRisk === st.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setSelectedStudentRisk(st.id as any)}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            isSel
                              ? 'border-amber-500 bg-amber-50/70'
                              : 'border-slate-200/80 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{st.name}</span>
                            <span className="text-[10px] text-slate-500">{st.reason}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Review
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[11px] p-2 rounded-lg bg-slate-50 text-slate-700 text-center font-medium border border-slate-200">
                    Selected: <b>Student {selectedStudentRisk}</b> • Recommend educator check-in.
                  </div>
                </div>
              </div>
            </article>

            {/* FEATURE 3: WORKFLOW SUPPORT */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">
                  03 / 05 · ACTIONABLE SUPPORT
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Turn insights into thoughtful action.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Create targeted nudges, mentoring check-ins, and skill reinforcement programs for at-risk groups. Track whether those interventions help students return to progress.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Insights are useful only when educators can act.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#eaf4e9] border border-emerald-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Support Workflow</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                      Draft
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { step: 1, title: 'Select students needing help', sub: 'From educator-reviewed signals' },
                      { step: 2, title: 'Assign focused practice task', sub: 'Reinforce specific missing skill' },
                      { step: 3, title: 'Schedule a human check-in', sub: 'Support, not automated verdict' },
                    ].map((w) => (
                      <div key={w.step} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          {w.step}
                        </span>
                        <div>
                          <strong className="text-xs text-slate-900 block leading-tight">{w.title}</strong>
                          <span className="text-[10px] text-slate-500">{w.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setInterventionPreviewed(true)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Preview Support Plan ↗
                  </button>

                  {interventionPreviewed && (
                    <p className="text-[10px] text-emerald-700 font-mono text-center">
                      ✓ Preview: educator review → practice task → check-in → monitor improvement.
                    </p>
                  )}
                </div>
              </div>
            </article>
          </>
        )}

        {/* ================================================================= */}
        {/* FOR COMPANIES                                                     */}
        {/* ================================================================= */}
        {activePersona === 'companies' && (
          <>
            {/* FEATURE 1: CANDIDATES WITH DEMONSTRATED SKILLS */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-teal-600 uppercase">
                  01 / 05 · VERIFIED DOSSIERS
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  See the work behind the profile.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Discover emerging talent with skills connected to projects, code assessments, and practical evidence. Spend less time guessing from self-reported résumés.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  <span>Proof matters more than polished claims.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#eaf4e9] border border-teal-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Demonstrated Skills</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-mono text-[10px] font-bold">
                      Demo Profiles
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: 'AS', name: 'Aarav S.', role: 'Frontend development • 3 projects', tag: 'Proof' },
                      { id: 'NK', name: 'Nisha K.', role: 'Data analytics • 2 projects', tag: 'Proof' },
                      { id: 'RM', name: 'Riya M.', role: 'Product design • 4 projects', tag: 'Proof' },
                    ].map((c) => {
                      const isSel = selectedCandidate === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedCandidate(c.id as any)}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                            isSel
                              ? 'border-teal-500 bg-teal-50/70'
                              : 'border-slate-200/80 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                              {c.id}
                            </span>
                            <div>
                              <strong className="text-xs text-slate-900 block leading-tight">{c.name}</strong>
                              <span className="text-[10px] text-slate-500">{c.role}</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {c.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[11px] p-2 rounded-lg bg-slate-50 text-slate-700 text-center font-medium border border-slate-200">
                    Selected: <b>{selectedCandidate === 'AS' ? 'Aarav S.' : selectedCandidate === 'NK' ? 'Nisha K.' : 'Riya M.'}</b> • Review project evidence.
                  </div>
                </div>
              </div>
            </article>

            {/* FEATURE 2: SKILL MATCHING RADAR */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-2 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
                  02 / 05 · REQUIREMENT FILTER
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Start with the skills the role needs.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  Define the capabilities you are looking for, then explore talent against that specific need. Give engineering teams a more useful first signal than university tiers or generic keyword matches.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Discover by demonstrated skills and working code.</span>
                </div>
              </div>

              <div className="order-2 lg:order-1 p-6 sm:p-8 rounded-[32px] bg-[#edf3fe] border border-blue-200/60 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Role Criteria Matching</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                      Skills Match
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">Click skills to recalculate candidate alignment:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'APIs', 'SQL', 'UI design', 'Git', 'Testing'].map((skill) => {
                      const isSel = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSel
                              ? 'bg-blue-600 text-white font-bold shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {skill} {isSel ? '✓' : '+'}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-teal-800 uppercase font-bold block">
                        ILLUSTRATIVE MATCH
                      </span>
                      <span className="text-2xl font-bold font-mono text-teal-700">{matchScore}%</span>
                      <span className="text-[10.5px] text-teal-800 block">Skill alignment index</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center text-xs font-bold font-mono text-teal-800 bg-white">
                      {selectedSkills.length}/6
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center font-mono">
                    Add or remove skills to recalibrate candidate matches.
                  </p>
                </div>
              </div>
            </article>

            {/* FEATURE 3: PROJECT EVIDENCE DOSSIER */}
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <div className="order-1 lg:order-1 space-y-4">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-900 uppercase">
                  03 / 05 · PRE-INTERVIEW AUDIT
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 tracking-tight leading-snug">
                  Review projects before the first interview.
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  See what candidates built, how they approached the problem, and which skills the work demonstrates. Use concrete artifacts to inform better technical conversations.
                </p>
                <div className="pt-2 text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span>Inspect pull requests and unit test pass rates.</span>
                </div>
              </div>

              <div className="order-2 lg:order-2 p-6 sm:p-8 rounded-[32px] bg-[#f5f3f1] border border-slate-200/80 shadow-xs relative overflow-hidden flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Project Evidence</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                      Example Artifact
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-xs">
                    Built a support-ticket triage tool
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center py-1">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="text-sm font-bold text-slate-900 block font-mono">4</strong>
                      <span className="text-[10px] text-slate-400">Work artifacts</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="text-sm font-bold text-slate-900 block font-mono">3</strong>
                      <span className="text-[10px] text-slate-400">Skills applied</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="text-sm font-bold text-slate-900 block font-mono">1</strong>
                      <span className="text-[10px] text-slate-400">Real problem</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10.5px] font-medium">
                      API integration
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10.5px] font-medium">
                      Logic
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10.5px] font-medium">
                      24/24 Unit Tests
                    </span>
                  </div>

                  <p className="text-[10.5px] text-emerald-700 font-mono text-center pt-1">
                    ✓ Review the work behind the listed skills before scheduling screens.
                  </p>
                </div>
              </div>
            </article>
          </>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* OUTCOME GRID SECTION                                                */}
      {/* ------------------------------------------------------------------- */}
      <div className="mt-24 sm:mt-32 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-[36px] bg-slate-50/80 border border-slate-200/80 p-8 sm:p-12 text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase block mb-2">
            BUILT AROUND REAL OUTCOMES
          </span>
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Outfit'] text-slate-900 tracking-tight">
            {currentContent.outcomeHeading}
          </h4>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2 mb-10 leading-relaxed">
            {currentContent.outcomeSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {currentContent.outcomes.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-2"
              >
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 font-mono font-bold text-sm flex items-center justify-center">
                  {item.icon}
                </span>
                <h5 className="text-base font-bold text-slate-900 pt-1">{item.title}</h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
