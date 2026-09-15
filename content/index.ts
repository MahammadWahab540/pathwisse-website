import { APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';
import {
  careerSchema,
  type Career,
  type HubData,
  type PageData,
  pageSchema,
  skillSchema,
  type Skill,
} from './schema';

const page = (input: Omit<PageData, 'status' | 'audience'> & Partial<Pick<PageData, 'status' | 'audience'>>) =>
  pageSchema.parse({ status: 'published', audience: 'all', ...input });

const mk = (slug: string, title: string, description: string, kind: PageData['kind'] = 'product', cta = 'Request a demo', href = '/contact', noindex = false) =>
  page({
    slug,
    title,
    description,
    eyebrow: slug.split('/')[0].replace('-', ' ').toUpperCase(),
    kind,
    cta,
    href,
    noindex,
    sections: [],
    faq: [],
    related: [],
  });

// ─── CAREERS ────────────────────────────────────────────────────────────────
export const careers: Career[] = [
  ['data-analyst', 'Data Analyst', 'Analyze data, explain patterns, and help teams make better decisions.', ['Clean and prepare data', 'Write SQL queries', 'Build dashboards', 'Explain findings clearly'], ['Reliable analysis', 'Clear dashboards'], ['SQL', 'Power BI', 'Communication'], ['Python'], ['Data foundations', 'SQL', 'Visualization', 'Analytics projects'], ['Customer insights dashboard'], ['business-analyst', 'ai-engineer']],
  ['business-analyst', 'Business Analyst', 'Translate business problems into requirements, analysis, and practical decisions.', ['Map processes', 'Gather requirements', 'Analyse metrics', 'Coordinate stakeholders'], ['Clear requirements', 'Better process decisions'], ['Communication', 'SQL'], ['Power BI'], ['Business context', 'Requirements', 'Data basics', 'Case practice'], ['Process improvement brief'], ['data-analyst', 'product-manager']],
  ['product-manager', 'Product Manager', 'Define product direction, prioritise work, and connect user needs with business outcomes.', ['Understand users', 'Prioritise opportunities', 'Write product requirements', 'Measure adoption'], ['Clear product decisions', 'Aligned teams'], ['Communication'], ['SQL', 'Power BI'], ['User research', 'Problem framing', 'Prioritisation', 'Metrics'], ['Feature discovery memo'], ['business-analyst', 'data-analyst']],
  ['full-stack-developer', 'Full Stack Developer', 'Build web applications across frontend, backend, data, and deployment workflows.', ['Build interfaces', 'Create APIs', 'Work with databases', 'Ship features'], ['Working applications', 'Maintainable code'], ['JavaScript', 'Communication'], ['Python', 'SQL'], ['Web foundations', 'Frontend', 'Backend APIs', 'Databases'], ['Career dashboard app'], ['ai-engineer', 'product-manager']],
  ['ai-engineer', 'AI Engineer', 'Build AI-enabled systems that combine models, product context, data, and evaluation.', ['Design AI workflows', 'Integrate models', 'Evaluate outputs', 'Build safe product experiences'], ['Useful AI features', 'Reliable evaluation'], ['Python', 'Communication'], ['SQL'], ['Python', 'Data basics', 'Model integration', 'Evaluation'], ['AI support assistant prototype'], ['data-analyst', 'full-stack-developer']],
].map(([slug, name, shortSummary, responsibilities, roleOutcomes, requiredSkills, optionalSkills, roadmap, projects, relatedCareers]) =>
  careerSchema.parse({
    slug, name, shortSummary, responsibilities, roleOutcomes, requiredSkills, optionalSkills, roadmap, projects, relatedCareers,
    interviewPreparation: ['Project walkthrough', 'Role-specific scenarios', 'Communication practice'],
    product: 'product',
    faq: [['How should I use this roadmap?', 'Use it as a starting point, then validate direction through practice, projects, and real conversations with people in the role.']],
    references: [],
    seoTitle: `${name} Career Roadmap — Pathwisse`,
    metaDescription: shortSummary,
  }),
);

// ─── SKILLS ─────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  ['sql', 'SQL', 'Use databases to query, join, aggregate, and explain structured data.', ['Analytics', 'Reporting'], ['data-analyst', 'business-analyst'], ['Data tables'], ['Select and filter', 'Joins', 'Aggregations', 'Window functions'], ['Write joins', 'Analyse metrics'], ['Customer insights dashboard'], ['power-bi', 'python']],
  ['python', 'Python', 'Use Python for analysis, automation, data workflows, and AI-enabled product work.', ['Automation', 'Data analysis', 'AI prototypes'], ['data-analyst', 'ai-engineer', 'full-stack-developer'], ['Programming basics'], ['Syntax', 'Data structures', 'Files', 'APIs'], ['Clean a dataset', 'Call an API'], ['AI support assistant prototype'], ['sql', 'communication']],
  ['power-bi', 'Power BI', 'Build dashboards that turn data into clear operational and business decisions.', ['Dashboards', 'Business reviews'], ['data-analyst', 'business-analyst'], ['Data basics'], ['Import data', 'Model data', 'DAX basics', 'Dashboard design'], ['Build KPI cards', 'Explain trends'], ['Sales performance analysis'], ['sql', 'communication']],
  ['communication', 'Communication', 'Explain context, decisions, tradeoffs, and evidence so people can act on it.', ['Interviews', 'Stakeholder updates', 'Project walkthroughs'], ['data-analyst', 'business-analyst', 'product-manager', 'ai-engineer'], ['Clear thinking'], ['Summaries', 'Structured explanations', 'Stakeholder updates'], ['Explain a project', 'Write a decision memo'], ['Project reflection portfolio'], ['sql', 'power-bi']],
].map(([slug, name, description, whereUsed, careerList, prerequisites, progression, exercises, projects, relatedSkills]) =>
  skillSchema.parse({
    slug, name, description, whereUsed,
    careers: careerList,
    prerequisites, progression, exercises, projects, relatedSkills,
    faq: [['Can I practice this skill on Pathwisse?', 'Yes. Skill guides connect to exercises, structured projects, and readiness context on the platform.']],
    resources: [],
    cta: `Build ${name} evidence`,
  }),
);

// ─── PRIMARY AUDIENCE PAGES ──────────────────────────────────────────────────
const primaryPages = [
  page({
    slug: 'students',
    title: 'For Students — Build career readiness with proof',
    description: 'Move from uncertainty to a clear direction. Get a structured roadmap, build verified skills through practice and projects, and demonstrate real readiness for the roles you want.',
    eyebrow: 'FOR STUDENTS',
    kind: 'student',
    cta: 'Start building',
    href: APP_AUTH_URL,
    sections: [
      ['Career direction first', 'Start by understanding which roles fit your interests, strengths, and context. Pathwisse helps you compare options and choose one useful direction instead of staying stuck between possibilities.'],
      ['Structured roadmaps', 'Follow role-based paths that connect skills, practice, and applied projects. Each step builds on the last, turning learning into visible progress you can discuss in interviews.'],
      ['Verified skill proof', 'Build a profile grounded in evidence — live projects, mentor-reviewed rubrics, code repositories, and readiness context — rather than course certificates alone.'],
      ['Placement readiness', 'Understand where you are strong, where gaps exist, and which opportunities match your current evidence. Pathwisse helps you apply with context, not guesswork.'],
    ],
    faq: [
      ['Is Pathwisse only for engineering students?', 'No. Pathwisse supports students across domains, with career roadmaps for roles in data, product, business analysis, full-stack development, and AI engineering.'],
      ['Do I need to pay to start?', 'You can begin a career audit and explore direction for free. Talk to your placement office — many colleges provide Pathwisse access to all students as part of their employability programme.'],
    ],
    related: ['colleges', 'product', 'contact'],
  }),
  page({
    slug: 'colleges',
    title: 'Pathwisse Employability Operating System for Colleges',
    description: 'See where every student stands, build the skills employers need, connect learning with real work, and continuously improve placement outcomes.',
    eyebrow: 'EMPLOYABILITY OPERATING SYSTEM',
    kind: 'college',
    cta: 'Request institutional demo',
    href: '/contact?interest=college',
    sections: [
      ['The Institutional Problem: Fragmented Initiatives & Hidden Gaps', 'Higher education does not suffer from a lack of activities — it suffers from fragmentation. Academics, isolated skill courses, guest lectures, student projects, mentoring, and placement drives operate in disconnected silos. Leadership cannot see who is genuinely becoming employable until placement season arrives, resulting in last-minute scrambles, unverified resume claims, and missed opportunities.'],
      ['Not Another LMS: The 7-Layer Employability Operating System', 'Pathwisse is not another LMS delivering passive video lectures. It is the institutional operating system that connects learning → evidence → employability → placement outcomes across the college:\n\n• Diagnose (CareerVoice): Understand student goals, communication, readiness, and career clarity from Year 1.\n• Predict (Student Intelligence): Identify placement-ready, at-risk, and intervention-needed students across departments.\n• Develop (Pathwisse Learning): Role-specific personalized skills, structured 12-month roadmaps, daily practice, and milestone projects.\n• Experience (Enterprise Projects): Students solve real company problems instead of only completing static theoretical courses.\n• Validate (Skill Passport): Objective, tamper-proof evidence of skills, code repositories, assessments, and verified performance.\n• Connect (Job Intelligence): Map student cohorts against relevant jobs, emerging roles, and real-time market demand.\n• Measure (Employability Analytics): Department, batch, and institution-level employability outcomes.'],
      ['The Institutional Narrative: From Enrollment to Employment', 'Pathwisse structures institutional career preparation into a continuous, compounding progression:\n\nUnderstand students → Predict outcomes → Build skills → Give real experience → Match opportunities → Measure employability.\n\nDeans, Principals, and TPO Heads gain continuous visibility from Year 1, turning employability from an end-of-year gamble into a measurable institutional capability.'],
      ['Departmental Benchmarking & Executive Oversight', 'Department Heads (HODs) track their branch-specific skill curves, practice consistency, and capstone project submissions. Institutional leadership receives executive readiness briefings, department benchmark comparisons, and early risk alerts for batches falling behind before placement drives start.'],
      ['Accreditation & Regulatory Alignment', 'Pathwisse is built to automate evidence gathering and documentation for key institutional frameworks: NEP 2020 (skill-centric progression, Academic Bank of Credits), AICTE (internship tracking, industry linkages), UGC (career counseling records), NAAC & NIRF (outcome tracking and automated evidence collation), NBA (Outcome-Based Education and PO/CO competency mapping), and DPDP Act 2023.'],
    ],
    faq: [
      ['How does Pathwisse differ from traditional LMS and assessment portals?', 'An LMS hosts videos; an assessment portal gives test scores. Pathwisse is an Employability Operating System that connects student career diagnosis, daily practice, enterprise projects, verified skill evidence, candidate-job matching, and institutional outcome analytics in one closed loop.'],
      ['How does management track progress across different departments and batches?', 'Leadership dashboards provide real-time aggregate and departmental views, tracking student activation rates, roadmap progression, practice consistency, and placement probability across branches.'],
      ['What is the typical deployment timeline for a university or college?', 'Through the Pathwisse Accelerator, institutions typically complete department configuration, roster onboarding, and faculty enablement within 2 to 4 weeks.'],
    ],
    related: ['colleges/placement-teams', 'how-it-works', 'outcomes', 'contact'],
  }),
  page({
    slug: 'enterprise',
    title: 'For Enterprises — Hire with evidence. Upskill with direction.',
    description: 'Assess your workforce, identify capability gaps, run role-based upskilling journeys, and discover talent through demonstrated skill evidence — not just resumes.',
    eyebrow: 'FOR ENTERPRISES',
    kind: 'workforce',
    cta: 'Request a demo',
    href: '/contact?interest=upskilling',
    sections: [
      ['Workforce capability assessment', 'Understand what your teams can currently do against what roles require. Move beyond skills lists to actual applied work evidence.'],
      ['Role-based upskilling journeys', 'Create structured paths that close specific skill gaps with practice, projects, and applied milestones. Track progress and measure readiness movement over time.'],
      ['AI workforce readiness', 'Map AI-related skills, identify gaps, and build practical upskilling paths for teams who need to work effectively alongside AI tools and systems.'],
      ['Internal mobility and hiring intelligence', 'Identify people ready for new roles and show what they need to build next. Discover candidates through demonstrated capability, not just profiles. (Hiring intelligence in development.)'],
    ],
    faq: [
      ['How is Pathwisse different from an LMS?', 'An LMS delivers content. Pathwisse builds capability evidence — it tracks whether someone can actually do the work, through applied projects, readiness scores, and structured practice, not just course completion.'],
      ['What size organisations does Pathwisse serve?', 'Pathwisse works with enterprises of 200+ employees. Pricing is tailored by employee count, roles, integration requirements, and rollout scope.'],
    ],
    related: ['product', 'colleges', 'contact'],
  }),
];

// ─── THE PATHWISSE PRODUCT SUPERSTRUCTURE (9 CONNECTED PRODUCTS + PLATFORM) ───
const productPages = [
  page({
    slug: 'product',
    title: 'Pathwisse Employability Intelligence System — Master Architecture',
    description: 'A connected architecture across Understand, Develop, Prove, Intelligence, and Outcomes. Built on an evidence graph that turns learning into verifiable placement outcomes.',
    eyebrow: 'THE SUPERSTRUCTURE',
    kind: 'product',
    cta: 'Explore institutional architecture',
    href: '/contact?interest=college',
    sections: [
      ['The Broken System: Disconnected Silos & AI Horoscopes', 'Most higher education platforms operate in disconnected vacuums: LMS portals track video watch time, assessment vendors output isolated test scores, and placement cells maintain outdated spreadsheets. Signals are lost across semesters. When recruiters arrive, institutions scramble to manufacture readiness instead of proving it systematically.'],
      ['The Three Core Phases: Understand, Develop, Prove', 'Pathwisse organizes capability development into three rigorous, compounding phases:\n\n1. UNDERSTAND (CareerVoice): Surface student career intent, communication readiness, and diagnostic clarity before training begins.\n2. DEVELOP (Career Roadmaps & Practice Lab): Role-specific 12-month paths paired with daily adaptive practice across aptitude, reasoning, and technical stacks.\n3. PROVE (Enterprise Projects & Skill Passport): Real company briefs and code repositories verified into a cryptographic capability passport.'],
      ['The Intelligence & Outcomes Layer', 'Above the execution phases sits the Pathwisse Intelligence Layer:\n\n• Readiness Intelligence: Multi-factor clinical diagnostic scoring with explainable drivers.\n• Job Intelligence: Real-time labour market demand radar and skill mapping.\n• Placement Intelligence: Candidate-job matching, cohort tiering, and 30-day intervention planning.\n• Employability Analytics: Executive boardroom telemetry for deans, HODs, and accreditation bodies (NEP 2020, NAAC, NIRF, NBA).'],
      ['Built on Evidence, Not Assumptions: The Data Backbone', 'Pathwisse does not rely on generic claims. The intelligence graph continuously compounds from 9 synchronized data streams:\n\nINPUTS:\n• Student profile & academic history\n• CareerVoice conversation transcripts & communication metrics\n• Practice Lab attempt velocity & accuracy heatmaps\n• Milestone roadmap progression\n• Enterprise project code repositories & mentor rubric evaluations\n• Skill Passport credentials\n• Live job-market demand feeds\n\nCOMPUTATION:\n• Pathwisse Intelligence Graph calculates skill trees, confidence intervals, and placement probabilities.\n\nOUTPUTS:\n• Explainable readiness scores, 30-day intervention prescriptions, recruiter match cohorts, and institutional telemetry.'],
      ['The Closed Loop: The Defensible Moat', 'Pathwisse does not collect data just to report it. Each new signal changes the next action:\n\nCareerVoice signal → skill gap → roadmap → practice → project evidence → job match → placement outcome → better next recommendation.\n\nThis compounding feedback loop ensures that as cohorts progress, institutional placement velocity continuously lifts.'],
    ],
    faq: [
      ['Is Pathwisse an LMS or an assessment tool?', 'Neither. Pathwisse is an Employability Intelligence System that bridges diagnostics, structured learning paths, real company projects, and placement matching into one unified operating system.'],
      ['Can institutions license individual modules or the full suite?', 'Colleges can deploy the complete Employability Operating System or phase rollouts starting with CareerVoice diagnostics and the Placement Command Center.'],
    ],
    related: ['product/career-voice', 'product/career-roadmaps', 'product/placement-intelligence', 'colleges'],
  }),
  page({
    slug: 'product/career-voice',
    title: 'CareerVoice — Voice-Led Career Discovery & Diagnostic',
    description: 'Voice-led career discovery, communication assessment, readiness diagnosis, and actionable guidance. Know what the student can actually do before training begins.',
    eyebrow: 'UNDERSTAND · DIAGNOSTIC ENTRY POINT',
    kind: 'product',
    cta: 'Experience CareerVoice',
    href: CAREER_VOICE_URL,
    sections: [
      ['The Broken System: Marks Without Clarity or Communication Proof', 'Colleges know student marks, CGPA, and attendance, but they have zero visibility into career clarity, spoken communication capability, or authentic intent. Students get pushed into generic placement training without understanding which role fits them or why they struggle in live interviews.'],
      ['Data Evidence: Where the Placement Breakdown Begins', 'Over 70% of final-year students cite career confusion, while campus recruiters reject up to 65% of technically eligible candidates at the first behavioral or communication round. Traditional multiple-choice questionnaires fail to capture spontaneous reasoning, tone, articulation, or problem-framing.'],
      ['How Pathwisse Changes It: The Voice-Led Transformation', 'BEFORE: Students fill out static interest surveys; placement cells guess role readiness from branch names.\nPATHWISSE: Students engage in an immersive voice-led career conversation. The AI listens, probes trade-offs, and evaluates communication nuances and role alignment.\nAFTER: Students receive an immediate diagnostic clarity report; the institution gets a baseline map of cohort communication and career intent.'],
      ['Built on Evidence, Not Assumptions: The CareerVoice Pipeline', 'INPUTS:\n• Audio voice session recordings & spoken responses\n• Self-reported career goals and role interests\n• Spontaneous technical explanations & scenario responses\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Natural language parsing evaluates vocabulary depth, structural coherence, confidence metrics, and role-fit vectors against market benchmarks.\n\nOUTPUTS:\n• Career clarity profile (target roles ranked by fit)\n• Objective Interview Readiness Index (IRI) score\n• Granular communication and reasoning strength/gap breakdown\n• Immediate next roadmap prescription.'],
      ['Real Outcomes: From Uncertainty to a Concrete First Step', 'Students eliminate months of career anxiety by committing to a role-based trajectory backed by evidence. Placement cells identify communication bottlenecks across first- and second-year cohorts early enough to intervene.'],
      ['Trust & Governance: Safe, Explainable Diagnostics', 'Audio transcripts are transparently accessible to students and faculty advisors. Scoring rubrics are explainable, purpose-limited, and compliant with DPDP 2023 consent standards.'],
      ['Next Step in the Loop: From Diagnostic to Structured Roadmap', 'A CareerVoice diagnostic only becomes valuable when it powers action. Once a student’s strengths and gaps are mapped, Pathwisse automatically transitions them into their personalized Career Roadmap.'],
    ],
    faq: [
      ['Can students use CareerVoice on mobile devices?', 'Yes. CareerVoice runs seamlessly in any modern browser on mobile or desktop with no app installation required.'],
      ['How does CareerVoice evaluate communication objectively?', 'The engine measures structural coherence, explanation logic, vocabulary appropriateness, and conversational confidence against established professional interview rubrics.'],
    ],
    related: ['product/career-roadmaps', 'product/practice-lab', 'product/readiness-intelligence'],
  }),
  page({
    slug: 'product/career-roadmaps',
    title: 'Career Roadmaps — Personalized Role-Based Learning Paths',
    description: 'Personalized role-based learning paths with skills, stages, topics, and milestones. Turn scattered course completion into a 12-month structured progression.',
    eyebrow: 'DEVELOP · STRUCTURED PROGRESSION',
    kind: 'product',
    cta: 'Explore career roadmaps',
    href: '/students/career-roadmaps',
    sections: [
      ['The Broken System: The Fragmented Course Trap', 'Students jump between random YouTube tutorials, disjointed certification courses, and last-minute coding cram sessions. They collect certificates but cannot assemble a coherent portfolio of skills that matches real job requirements.'],
      ['Data Evidence: Why Certification Does Not Equal Job Readiness', 'Recruiters report that fewer than 15% of certificate holders can write production-ready code or explain architectural decisions. Without progressive milestones, students drop out of self-paced courses with less than 10% completion rates.'],
      ['How Pathwisse Changes It: The Milestone Journey', 'BEFORE: Scattered syllabi, generic course lists, and uncoordinated learning across semesters.\nPATHWISSE: A role-specific 12-month spatial roadmap structured into progressive stages: Foundations → Core Skills → Practice Sprints → Applied Enterprise Milestone.\nAFTER: Students know their exact next step every single day; placement teams track cohort milestone completion velocities.'],
      ['Built on Evidence, Not Assumptions: The Roadmap Pipeline', 'INPUTS:\n• Target role selection & CareerVoice diagnostic baseline\n• Completed prerequisites and module quiz checkpoints\n• Practice Lab streak data and project rubric grades\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Dynamically adapts milestone pacing based on student mastery velocity, unlocking advanced modules as prerequisite capabilities are verified.\n\nOUTPUTS:\n• Personalized stage-by-stage learning trajectory\n• Role-specific topic explainers and practice prompts\n• Real-time milestone progress tracking for faculty and TPOs.'],
      ['Real Outcomes: Coherent Capability Compounded Over Time', 'Students complete 4x more learning modules when guided by a spatial milestone map. Faculty and HODs see exactly where department cohorts are progressing along role-based trajectories.'],
      ['Trust & Governance: Industry-Vetted Syllabi', 'Every Career Roadmap is curated with inputs from senior engineers, hiring managers, and corporate partners, ensuring curriculum alignment with modern industry standards.'],
      ['Next Step in the Loop: From Structured Roadmap to Daily Practice', 'A roadmap defines the destination; daily practice builds the muscle. Follow your roadmap milestones into the Pathwisse Practice Lab.'],
    ],
    faq: [
      ['Can institutions customize roadmaps to match university academic calendars?', 'Yes. Placement cells and HODs can align roadmap milestones with internal semester exams, internship periods, and campus placement schedules.'],
      ['What roles are supported on Career Roadmaps?', 'Pathwisse provides comprehensive roadmaps for Data Analyst, Business Analyst, Product Manager, Full Stack Developer, AI Engineer, and Cloud Operations.'],
    ],
    related: ['product/practice-lab', 'product/enterprise-projects', 'product/career-voice'],
  }),
  page({
    slug: 'product/practice-lab',
    title: 'Practice Lab — Daily Performance Cockpit & Skill Sprints',
    description: 'Daily aptitude, reasoning, communication, technical, and interview practice. Build lasting employability habits with game-like consistency and adaptive challenges.',
    eyebrow: 'DEVELOP · HABIT & MASTERY',
    kind: 'product',
    cta: 'Launch Practice Lab',
    href: APP_AUTH_URL,
    sections: [
      ['The Broken System: Passive Video Consumption Without Repetition', 'Watching a tutorial video creates the illusion of learning. When faced with an unscripted coding problem or an aptitude speed test in a 45-minute placement screening, students freeze because they have never built daily muscle memory.'],
      ['Data Evidence: Retention Plummets Without Daily Retrieval', 'Cognitive research shows that 75% of passive technical content is forgotten within 48 hours without active recall. Campus recruitment tests reject 60% of applicants solely on aptitude and reasoning cutoffs.'],
      ['How Pathwisse Changes It: The Daily Performance Cockpit', 'BEFORE: Binge-watching tutorials the weekend before campus placement drives.\nPATHWISSE: A daily performance cockpit featuring streak tracking, daily missions, timed aptitude sprints, and adaptive coding challenges tailored to weak areas.\nAFTER: Students build verified 30-day practice streaks, improving problem-solving speed, accuracy, and confidence under timed test conditions.'],
      ['Built on Evidence, Not Assumptions: The Practice Lab Pipeline', 'INPUTS:\n• Daily attempt logs, submission accuracy, and completion times\n• Problem difficulty ratings and topic tags (SQL, Aptitude, Reasoning, Verbal)\n• Error patterns and repeat attempts\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Spaced repetition algorithm identifies recurring weak spots and serves targeted micro-challenges before performance decays.\n\nOUTPUTS:\n• Daily mission prompts tailored to individual skill gaps\n• Visual practice heatmaps and streak analytics\n• Objective aptitude and problem-solving readiness scores.'],
      ['Real Outcomes: 3x Higher Screening Pass Rates', 'Students with an active 14+ day practice streak pass corporate aptitude and initial technical screenings at triple the rate of intermittent learners.'],
      ['Trust & Governance: Integrity & Anti-Plagiarism Verification', 'Practice Lab records typing cadence, execution integrity, and step-by-step reasoning steps to ensure all streak data reflects authentic student effort.'],
      ['Next Step in the Loop: From Daily Practice to Enterprise Projects', 'Daily drills build speed; now prove you can solve complex company problems. Take your verified skills into Enterprise Projects.'],
    ],
    faq: [
      ['What areas are covered in the daily practice lab?', 'Practice Lab includes Quantitative Aptitude, Logical Reasoning, Verbal Communication, SQL queries, core programming languages, and scenario-based interview questions.'],
      ['How much time does a daily mission take?', 'Missions are designed as high-intensity, 15- to 25-minute sprints that students can complete consistently every day without overwhelming their academic schedule.'],
    ],
    related: ['product/enterprise-projects', 'product/skill-passport', 'product/career-roadmaps'],
  }),
  page({
    slug: 'product/enterprise-projects',
    title: 'Enterprise Projects — Real Company Briefs & Measurable Evidence',
    description: 'Real-world projects sourced from companies to create practical experience and measurable evidence. Move beyond toy homework into production-grade work.',
    eyebrow: 'PROVE · APPLIED EXPERIENCE',
    kind: 'product',
    cta: 'Explore enterprise projects',
    href: '/contact?interest=college',
    sections: [
      ['The Broken System: Generic Clones & Unverifiable Homework', 'Recruiters review thousands of resumes featuring the exact same clone projects: basic to-do apps, generic weather dashboards, and copy-pasted tutorial code. None of these demonstrate whether a candidate can solve ambiguous, messy business problems.'],
      ['Data Evidence: Resumes With Clone Projects Get Ignored', 'Hiring managers spend an average of 6 seconds per resume. Resumes with generic tutorial projects are discarded because they provide zero signal regarding real architecture, error handling, data cleaning, or trade-off decisions.'],
      ['How Pathwisse Changes It: Production-Grade Industry Briefs', 'BEFORE: Students copy boilerplate tutorials from GitHub repositories.\nPATHWISSE: Students work on structured briefs sourced from real enterprise requirements (FinTech churn models, e-commerce data pipelines, fraud anomaly detection). Work is submitted through GitHub pull requests and graded against industry rubrics.\nAFTER: Students present production-grade repositories with architectural documentation, unit tests, and video walkthroughs.'],
      ['Built on Evidence, Not Assumptions: The Project Pipeline', 'INPUTS:\n• Company project specification briefs & edge-case requirements\n• Student code submissions, Git commit histories, and pull requests\n• Industry mentor rubric evaluations and feedback logs\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Static analysis evaluates code modularity, test coverage, edge-case resilience, and documentation clarity, validating true authorship and skill depth.\n\nOUTPUTS:\n• Production-grade capstone repositories\n• Mentor-signed rubric evaluations\n• Evidence artifacts verified into the student Skill Passport.'],
      ['Real Outcomes: Candidates Interviewers Want to Talk To', 'During technical interviews, discussions shift from defensive textbook grilling to deep, engaging walkthroughs of real architecture and decisions made on the project.'],
      ['Trust & Governance: Authentic Verification & Code Attribution', 'All project repositories are validated for original contribution through commit history analysis and viva voce defense recordings.'],
      ['Next Step in the Loop: From Project Artifacts to Skill Passport', 'Your completed project code and mentor rubrics are sealed into your tamper-proof Skill Passport.'],
    ],
    faq: [
      ['Who designs the enterprise project briefs?', 'Briefs are crafted in collaboration with corporate tech leaders and engineering partners to replicate real-world sprint tasks.'],
      ['Are these projects eligible for university semester capstone credits?', 'Yes. Many partner colleges map Pathwisse Enterprise Projects directly into their academic curriculum and NEP 2020 experiential learning requirements.'],
    ],
    related: ['product/skill-passport', 'product/readiness-intelligence', 'product/practice-lab'],
  }),
  page({
    slug: 'product/skill-passport',
    title: 'Skill Passport — Verified Capability Record & Tamper-Proof Credentials',
    description: 'A verified digital record of skills, assessments, projects, achievements, and capability evidence. Resumes contain claims; the Skill Passport provides proof.',
    eyebrow: 'PROVE · VERIFIED CAPABILITY',
    kind: 'product',
    cta: 'View sample passport',
    href: APP_AUTH_URL,
    sections: [
      ['The Broken System: Resumes Full of Unverified Claims', 'Anyone can write "Expert in Python, SQL, and Machine Learning" on a multi-page PDF resume. Recruiters have no way to verify whether the applicant has solved real problems or simply memorized interview keywords.'],
      ['Data Evidence: Resume Fraud & Screening Friction', 'Surveys reveal that over 55% of resumes contain exaggerated technical claims, forcing recruiters to run extensive, costly screening rounds just to filter out unqualified candidates.'],
      ['How Pathwisse Changes It: The Living Digital Passport', 'BEFORE: Static, text-only PDF resumes that recruiters distrust.\nPATHWISSE: A tamper-proof digital credential passport linking directly to verified code repositories, live demo URLs, CareerVoice communication IRI scores, and mentor evaluations.\nAFTER: Recruiters review candidate evidence with complete confidence; students stand out with undeniable proof of work.'],
      ['Built on Evidence, Not Assumptions: The Passport Pipeline', 'INPUTS:\n• CareerVoice communication index ratings\n• Practice Lab streak and accuracy milestones\n• Enterprise Project code links and mentor rubric evaluations\n• Proctored assessment checkpoints\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Cryptographically aggregates cross-platform signals into a unified, tamper-proof capability graph with unique verification hashes.\n\nOUTPUTS:\n• Public verified capability profile with unique verification hash\n• Recruiter-ready candidate evidence drawers\n• Dynamic skills constellation mapped to market standards.'],
      ['Real Outcomes: Instant Shortlisting by Corporate Recruiters', 'Placement cells using Skill Passport packages report a 40% reduction in recruiter shortlisting cycles, as hiring partners bypass preliminary filtering.'],
      ['Trust & Governance: Tamper-Proof & Privacy-Preserving', 'Students control sharing permissions. Every credential is cryptographically stamped and cannot be retroactively altered or forged.'],
      ['Next Step in the Loop: From Verified Credentials to Readiness Intelligence', 'Verified credentials feed the clinical diagnostic model: discover your multi-factor score in Readiness Intelligence.'],
    ],
    faq: [
      ['Can recruiters verify a Skill Passport without logging in?', 'Yes. Every Skill Passport generates a secure, shareable public link with cryptographic verification badges and one-click code inspection.'],
      ['How does the Skill Passport integrate with college placement records?', 'TPOs can export batch portfolios directly in recruiter-ready formats, attaching verified credentials to campus drive applications.'],
    ],
    related: ['product/readiness-intelligence', 'product/job-intelligence', 'product/enterprise-projects'],
  }),
  page({
    slug: 'product/readiness-intelligence',
    title: 'Readiness Intelligence — Explainable Multi-Factor Scoring & Gap Analysis',
    description: 'Student readiness scoring, skill-gap analysis, recommendations, and intervention planning. A single test score cannot explain employability.',
    eyebrow: 'INTELLIGENCE · DIAGNOSTIC ENGINE',
    kind: 'product',
    cta: 'Explore readiness scoring',
    href: '/contact?interest=college',
    sections: [
      ['The Broken System: Oversimplified Cutoff Scores', 'Institutions traditionally evaluate students using single metrics: CGPA or a one-off aptitude test score. This binary cutoff ignores communication ability, project execution, practice consistency, and role-fit nuances.'],
      ['Data Evidence: High CGPA Does Not Guarantee Placement', 'Up to 40% of students with top-tier academic scores struggle to secure offers because their spoken communication or applied problem-solving skills fall short during technical rounds.'],
      ['How Pathwisse Changes It: Clinical Multi-Factor Diagnostic Modeling', 'BEFORE: Relying on CGPA cutoffs that fail to predict interview success.\nPATHWISSE: A multi-dimensional readiness model synthesizing technical depth, spoken communication, project evidence, and practice consistency into an explainable score.\nAFTER: Students and faculty see transparent factor trees and actionable prescriptions explaining exactly what needs improvement to achieve job-readiness.'],
      ['Built on Evidence, Not Assumptions: The Readiness Pipeline', 'INPUTS:\n• Spoken communication signals from CareerVoice\n• Practice Lab speed and accuracy metrics\n• Enterprise Project quality and test coverage\n• Target role market requirements\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Weighs individual capability dimensions against role-specific hiring thresholds, computing multi-factor readiness scores and confidence intervals.\n\nOUTPUTS:\n• Explainable 0–100 Readiness Score with detailed factor tree\n• "Why this changed" delta logs tracking milestone progress\n• Granular skill-gap diagnostic alerts and 30-day intervention prescriptions.'],
      ['Real Outcomes: Targeted Support That Moves the Needle', 'Instead of generic placement classes, students receive hyper-targeted micro-interventions tailored to their specific deficit (e.g., spoken articulation or SQL subqueries).'],
      ['Trust & Governance: Explainability Over Black-Box Predictions', 'No black-box guesses. Every score is fully deconstructed into tangible evidence drivers, giving students and mentors transparent reasons for every rating.'],
      ['Next Step in the Loop: From Readiness Scoring to Job Intelligence', 'Once readiness is diagnosed, discover which market opportunities match your profile in Job Intelligence.'],
    ],
    faq: [
      ['How is the Readiness Score updated over time?', 'The score updates dynamically in real time as students complete practice missions, submit code repositories, and participate in mock interviews.'],
      ['Can placement teams filter students by specific readiness factors?', 'Yes. TPOs can filter candidates by individual factors (e.g., Technical Score > 80 AND Communication Index > 75) for specialized recruiter drives.'],
    ],
    related: ['product/job-intelligence', 'product/placement-intelligence', 'product/skill-passport'],
  }),
  page({
    slug: 'product/job-intelligence',
    title: 'Job Intelligence — Real-Time Labour Market Radar & Role Mapping',
    description: 'Job discovery, role-demand analysis, skill-demand mapping, and opportunity intelligence. Understand real-time industry demand before preparing.',
    eyebrow: 'INTELLIGENCE · MARKET RADAR',
    kind: 'product',
    cta: 'Explore market intelligence',
    href: '/contact?interest=college',
    sections: [
      ['The Broken System: Preparing for Yesterday’s Job Market', 'Curriculums and placement training typically lag industry realities by 3 to 5 years. Colleges prepare students for legacy stacks while employers seek modern tools, cloud paradigms, and AI-enabled workflows.'],
      ['Data Evidence: The Rapidly Widening Skill Mismatch', 'Over 60% of entry-level job descriptions have altered their core skill requirements in the past 24 months, rendering static syllabus prep insufficient for modern hiring bars.'],
      ['How Pathwisse Changes It: The Live Market Radar', 'BEFORE: Relying on outdated placement brochures and historical recruiter assumptions.\nPATHWISSE: A continuous labour market radar scanning live job postings to map emerging skill combinations, salary percentile bands, and role clusters.\nAFTER: Students and institutions align their roadmaps with live market demand, ensuring preparation matches active hiring requirements.'],
      ['Built on Evidence, Not Assumptions: The Job Radar Pipeline', 'INPUTS:\n• Real-time data from thousands of corporate job descriptions\n• Industry compensation reports and hiring volume trends\n• Emerging skill co-occurrence patterns (e.g., Python + SQL + Vector DBs)\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Maps unstructured job requirements into structured skill graphs, cross-referencing industry demand against campus cohort capability.\n\nOUTPUTS:\n• Live role demand heatmaps and emerging skill streams\n• Compensation benchmarks and regional hiring trends\n• Instant candidate-to-job matching matrices for campus placement cells.'],
      ['Real Outcomes: High-Value Placement Drives', 'Colleges attract higher-tier recruiters with competitive packages by proactively showcasing students trained in high-demand, emerging skill clusters.'],
      ['Trust & Governance: Verified Corporate Demand Data', 'Market data is scrubbed of phantom listings and deduplicated, providing accurate, trustworthy demand telemetry.'],
      ['Next Step in the Loop: From Market Demand to Placement Intelligence', 'Match identified market opportunities with placement-ready student cohorts in Placement Intelligence.'],
    ],
    faq: [
      ['How frequently is labour market intelligence refreshed?', 'Market radar data is updated continuously from live industry postings, corporate partner mandates, and recruitment feeds.'],
      ['Can colleges identify which corporate recruiters hire for specific stacks?', 'Yes. Placement cells can search which companies are actively hiring for specific skill profiles to drive targeted corporate outreach.'],
    ],
    related: ['product/placement-intelligence', 'product/readiness-intelligence', 'product/employability-analytics'],
  }),
  page({
    slug: 'product/placement-intelligence',
    title: 'Placement Intelligence — Command Center & Automated Candidate Matching',
    description: 'Candidate-job matching, eligibility filtering, placement probability, cohort readiness, and intervention tracking. The Placement Command Center.',
    eyebrow: 'INTELLIGENCE · PLACEMENT COMMAND',
    kind: 'product',
    cta: 'Request TPO command demo',
    href: '/contact?interest=college',
    sections: [
      ['The Broken System: Manual Spreadsheets & Panic on Placement Day', 'Placement coordinators manage thousands of student profiles across scattered Excel files, manual WhatsApp groups, and unverified resume submissions. When a recruiter shares an urgent JD, coordinators scramble to identify eligible candidates manually.'],
      ['Data Evidence: The Cost of Inefficient Placement Operations', 'Over 30% of eligible students miss recruitment drives due to manual communication breakdowns, while recruiters waste valuable interview slots on unvetted candidates.'],
      ['How Pathwisse Changes It: The Placement Command Center', 'BEFORE: Chasing students across spreadsheets and guessing who is ready for tomorrow’s drive.\nPATHWISSE: An automated command center that segments cohorts into 4 actionable tiers (Placement Ready, Nearly Ready, Need Intervention, High Risk) and matches candidates to JDs in seconds.\nAFTER: TPOs generate 1-click recruiter export packages backed by verified code repositories and Interview Readiness Index scores.'],
      ['Built on Evidence, Not Assumptions: The Matching Pipeline', 'INPUTS:\n• Comprehensive student Skill Passport and Readiness Scores\n• Recruiter job description specifications and cutoff thresholds\n• Past institutional placement conversion benchmarks\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Computes candidate-job fit vectors, eligibility rules, and explainable placement probability ratings.\n\nOUTPUTS:\n• Segmented candidate shortlists: Strong Match, Moderate Match, Intervention Needed\n• Branded recruiter export packages with verified portfolio links\n• Automated 30-day intervention prescriptions for nearly ready students.'],
      ['Real Outcomes: Faster Shortlisting & Higher Conversion', 'TPOs reduce screening turnaround from 3 days to 30 seconds, while recruiter conversion rates rise by over 25% due to evidence-backed shortlisting.'],
      ['Trust & Governance: Institutional Control & Data Privacy', 'Placement teams retain complete editorial control over all candidate shortlists. No student data is shared with recruiters without explicit institutional authorization.'],
      ['Next Step in the Loop: From Placement Operations to Employability Analytics', 'Monitor cohort placement trajectories and departmental performance in Employability Analytics.'],
    ],
    faq: [
      ['How does candidate matching work when a company posts a new opening?', 'The engine parses the job requirements and instantly filters the student database into strong matches, moderate matches, and students requiring a brief intervention sprint.'],
      ['Can placement teams customize the 30-day intervention plans?', 'Yes. TPOs and faculty coordinators can adjust the prescribed sprints to align with department workshop calendars and guest mentor sessions.'],
    ],
    related: ['product/employability-analytics', 'colleges/placement-teams', 'product/job-intelligence'],
  }),
  page({
    slug: 'product/employability-analytics',
    title: 'Employability Analytics — Institutional Boardroom Telemetry & Outcome Lift',
    description: 'Dashboards for colleges to track student readiness, department performance, skill gaps, and placement outcomes. Executive boardroom visibility.',
    eyebrow: 'OUTCOMES · INSTITUTIONAL EXECUTIVE',
    kind: 'product',
    cta: 'Request executive briefing',
    href: '/contact?interest=college',
    sections: [
      ['The Broken System: End-of-Year Autopsies', 'College leadership only learns about placement outcomes after final-semester campus drives conclude. By the time failure or underperformance is visible in annual reports, the batch has graduated and it is too late to intervene.'],
      ['Data Evidence: Accreditation Penalties & Enrollment Decline', 'Underperforming placement statistics directly damage NIRF rankings, NAAC grades, and future student enrollment. Without continuous telemetry, leadership cannot identify which departments are slipping.'],
      ['How Pathwisse Changes It: The Executive Boardroom Telemetry', 'BEFORE: Looking at static placement reports 6 months after graduation.\nPATHWISSE: Real-time executive dashboards displaying department-by-department readiness curves, skill gap maps, and forecasted placement probabilities starting from Year 1.\nAFTER: Leadership conducts data-driven reviews and allocates coaching resources proactively to elevate institutional outcomes.'],
      ['Built on Evidence, Not Assumptions: The Analytics Pipeline', 'INPUTS:\n• Real-time progress data from CareerVoice, Practice Lab, and Projects\n• Placement Command Center match and conversion telemetry\n• Historical batch performance and recruiter hiring trends\n\nPATHWISSE INTELLIGENCE GRAPH:\n• Aggregates student-level capability vectors into departmental and institutional benchmarks, modeling predictive outcome trajectories.\n\nOUTPUTS:\n• Executive boardroom dashboards with branch-by-branch benchmarking\n• Automated compliance exports for NEP 2020, AICTE, UGC, NAAC, and NIRF\n• Early risk alerts identifying departments needing institutional intervention.'],
      ['Real Outcomes: Predictable, Compounding Institutional Reputation', 'Institutions elevate average package medians, achieve higher placement percentages, and substantiate mandatory accreditation metrics with automated evidence.'],
      ['Trust & Governance: Role-Based Access & Regulatory Compliance', 'Secure role-based views for Principals, Deans, HODs, and Placement Heads, fully aligned with Indian data governance standards.'],
      ['Closing the Loop: Re-Engage Through CareerVoice', 'Employability telemetry informs next year’s institutional curriculum, starting the cycle anew with incoming cohorts in CareerVoice.'],
    ],
    faq: [
      ['Can reports be exported for NAAC and NIRF submissions?', 'Yes. The analytics engine produces pre-formatted documentation aligned directly with NAAC criteria and NIRF placement parameters.'],
      ['Do different stakeholders see different dashboards?', 'Yes. College Principals and Deans see institution-wide macro metrics, while HODs see granular department data, and TPOs see operational candidate pipelines.'],
    ],
    related: ['colleges', 'product/career-voice', 'product/placement-intelligence'],
  }),
];


// ─── PLACEMENT & INSTITUTIONAL PAGES ─────────────────────────────────────────
const institutionalPages = [
  page({
    slug: 'colleges/placement-teams',
    title: 'Placement Intelligence & Execution System — Command Center',
    description: 'Know who is ready. Know what they are missing. Know which opportunity fits them. Make the job-to-student decision with verified evidence.',
    eyebrow: 'PLACEMENT COMMAND CENTER',
    kind: 'college',
    cta: 'Request TPO console demo',
    href: '/contact?interest=college',
    sections: [
      ['The TPO’s Daily Decision: "Who can I send for this company tomorrow?"', 'Placement Officers and TPOs don’t need another student-learning platform or an unverified spreadsheet of 1,200 names. When a corporate recruiter arrives with specific technical stacks and cutoff criteria, placement teams need instant, objective answers to three core questions: Who is ready? What are they missing? Which opportunity fits them best?'],
      ['CareerVoice: Scaled Diagnostic Intelligence', 'Run CareerVoice diagnostics across hundreds or thousands of students simultaneously. The Placement Cell instantly surfaces student career intent, communication evidence, confidence, role preferences, career clarity, and granular strength-and-gap profiles before training begins.'],
      ['Student Readiness Intelligence: Actionable Cohort Segmentation', 'Instead of an unmanageable list of 1,200 students, the TPO Command Center automatically segments cohorts into actionable tiers:\n\n• 312 Placement Ready: Verified capstone code, strong communication index, immediate recruiter shortlist.\n• 428 Nearly Ready: 1 or 2 specific technical or aptitude gaps away from qualification.\n• 306 Need Intervention: Significant skill deficits requiring structured remedial sprints.\n• 154 High Risk: Inactive or unengaged students identified early for faculty advisor follow-up.'],
      ['Explainable Placement Prediction (No AI Horoscopes)', 'Every student is evaluated with an explainable Placement Probability score (e.g., 78%), backed by transparent, verifiable drivers:\n\n• Technical readiness & code quality\n• Communication & Interview Readiness Index (IRI)\n• Production-grade enterprise project evidence\n• Daily aptitude consistency & problem-solving speed\n• Activity streaks & milestone velocity\n• Target role alignment to market benchmarks\n\nTPOs see precisely why a student is predicted at that level and what specific action will move them up.'],
      ['Job Intelligence: Instant Candidate-to-Job Matching', 'When an employer posts a mandate — for example: Software Engineer | ₹8 LPA | Python + SQL + APIs — Pathwisse evaluates the cohort against demonstrated capability:\n\n• 126 eligible students identified\n• 72 strong matches (shortlisted instantly with verified proof)\n• 38 moderate matches (minor gap in 1 skill)\n• 16 need intervention\n\nRecruiter export packages include clean, verified portfolios with live code repositories, capstone demos, and readiness rubrics.'],
      ['The 30-Day Intervention Engine: Closing the Placement Loop', 'Pathwisse never stops at passive prediction. For a student with 52% placement probability, the engine automatically prescribes a targeted 30-day intervention:\n\n• Advanced SQL sprint\n• 2 targeted aptitude practice modules\n• CareerVoice communication simulation\n• Backend API integration project\n• AI mock interview checkpoint\n\nThe platform monitors completion and measures whether placement probability rises, directly lifting conversion rates.'],
      ['The End-to-End System Loop', 'CareerVoice finds the gaps → Pathwisse closes the gaps → Enterprise Projects create evidence → Job Intelligence finds opportunities → Placement Intelligence predicts and improves outcomes.'],
    ],
    faq: [
      ['How does candidate matching work when a recruiter provides a job description?', 'Job Intelligence extracts the required technical stack, project expectations, and communication thresholds, instantly filtering your student roster into strong, moderate, and intervention tiers with verified proof.'],
      ['Can placement teams export candidate data directly for corporate recruiters?', 'Yes. TPOs can generate clean, branded recruiter packages with verified code repositories, live project links, and Interview Readiness Index scores.'],
      ['How does the Intervention Engine ensure at-risk students actually improve?', 'The system prescribes specific, milestone-based 30-day sprints and tracks daily submission velocity, re-evaluating placement probability as tasks and mock interviews are completed.'],
    ],
    related: ['colleges', 'colleges/student-analytics', 'colleges/placement-readiness', 'contact'],
  }),
  page({
    slug: 'colleges/student-analytics',
    title: 'Student Analytics — Cohort progress, skill gaps, and readiness trends',
    description: 'Dashboards for placement teams and management: batch-level readiness, individual student progress, shared skill gaps, and intervention tracking — all in one view.',
    eyebrow: 'STUDENT ANALYTICS',
    kind: 'college',
    cta: 'See analytics in a demo',
    href: '/contact?interest=college',
    sections: [
      ['Batch-level readiness overview', 'See the proportion of your cohort that is job-ready, in progress, or at risk — broken down by department, role target, and skill area.'],
      ['Skill gap mapping', 'Identify which technical and soft skills are most commonly weak across your cohort. Prioritise skill sprints and targeted workshops based on real data, not assumptions.'],
      ['Individual student timelines', 'Drill into any student\'s journey: which roadmap they are on, which skills they have demonstrated, how consistent their practice has been, and what projects they have completed.'],
    ],
    faq: [['Is student data shared with recruiters automatically?', 'No. Student evidence is only shared in recruiter exports that the placement team explicitly generates and approves.']],
    related: ['colleges', 'colleges/placement-teams', 'contact'],
  }),
  page({
    slug: 'colleges/placement-readiness',
    title: 'Placement Readiness — Prepare students for opportunities with evidence',
    description: 'Readiness scoring that gives students, placement teams, and recruiters a clear, consistent signal about who is prepared and what they need next.',
    eyebrow: 'PLACEMENT READINESS',
    kind: 'college',
    cta: 'Request a readiness demo',
    href: '/contact?interest=college',
    sections: [
      ['What readiness actually means', 'Readiness on Pathwisse is a composite of demonstrated skills, project quality, practice consistency, and role-fit context — not just attendance or CGPA.'],
      ['A signal recruiters can trust', 'When a student shares their readiness profile with a recruiter, it links to live project evidence, verified skill assessments, and a structured career roadmap — context that resumes cannot provide.'],
      ['Continuous movement, not a one-time score', 'Readiness updates as students practice and build. Placement teams can see which interventions produced the most readiness movement across a cohort.'],
    ],
    faq: [['How is readiness calculated?', 'Readiness combines skill demonstration levels, project completion and quality, practice consistency, and role-specific requirements. The exact weights are configurable per institution.']],
    related: ['colleges', 'colleges/placement-teams', 'students'],
  }),
  page({
    slug: 'colleges/overview',
    title: 'College Overview — Full platform for institutional employability',
    description: 'A complete view of how Pathwisse serves colleges: from student career direction and roadmaps to placement team analytics, faculty visibility, and management reporting.',
    eyebrow: 'COLLEGE OVERVIEW',
    kind: 'college',
    cta: 'Request a demo',
    href: '/contact?interest=college',
    sections: [
      ['For students', 'Career direction, structured roadmaps, daily practice, applied projects, and verified readiness — all in one student workspace.'],
      ['For placement teams', 'Live cohort readiness dashboards, early warning alerts, skill gap maps, and pre-filtered recruiter exports.'],
      ['For faculty', 'Visibility into student progress by cohort, project submission tracking, and curriculum alignment with real-world role requirements.'],
      ['For management', 'Institution-level employability metrics, NAAC/NIRF-aligned reporting, and trend data across departments and batches.'],
    ],
    faq: [['How is Pathwisse different from other placement management tools?', 'Most placement tools track recruiters and offer letters. Pathwisse tracks student capability — the readiness and evidence that determine whether students get shortlisted in the first place.']],
    related: ['colleges/placement-teams', 'colleges/student-analytics', 'contact'],
  }),
];

// ─── ENTERPRISE PAGES ─────────────────────────────────────────────────────────
const enterprisePages = [
  page({
    slug: 'enterprise/upskilling',
    title: 'Enterprise Upskilling — Role-based capability journeys',
    description: 'Close workforce skill gaps with structured, role-based upskilling. Assess teams, assign learning paths, track applied practice, and measure readiness movement.',
    eyebrow: 'ENTERPRISE UPSKILLING',
    kind: 'workforce',
    cta: 'Request a demo',
    href: '/contact?interest=upskilling',
    sections: [
      ['Start with an honest assessment', 'Map current skills against role requirements to find the gaps that actually matter — not a generic skills survey, but a capability picture grounded in applied work.'],
      ['Role-based learning journeys', 'Assign structured paths that close specific gaps through skill modules, daily practice, and applied projects. Each journey is tailored to the role, not generic training content.'],
      ['Progress that management can see', 'Track whether upskilling is working. Dashboards show skill movement, project quality, and readiness progression — so L&D decisions are based on evidence, not completion rates.'],
    ],
    faq: [['Can we integrate Pathwisse with our existing LMS?', 'Yes. Pathwisse is designed to work alongside existing learning tools, pulling structured practice and project evidence into a unified readiness picture.']],
    related: ['enterprise', 'enterprise/talent-intelligence', 'contact'],
  }),
  page({
    slug: 'enterprise/talent-intelligence',
    title: 'Talent Intelligence — Discover candidates through evidence (In development)',
    description: 'A developing hiring product for discovering candidates through demonstrated skills, project evidence, and verified readiness context — not just CVs and application forms.',
    eyebrow: 'TALENT INTELLIGENCE',
    kind: 'hiring',
    cta: 'Join the hiring waitlist',
    href: '/contact?interest=hiring',
    sections: [
      ['Look behind the resume', 'Talent Intelligence will allow hiring teams to discover candidates through verified project evidence, skill demonstration levels, and readiness context — reducing the noise of unverified CV claims.'],
      ['Role-specific evidence matching', 'Match candidates to roles based on demonstrated capability in the specific skills each position requires — rather than keyword matching or degree filters.'],
      ['Currently in development', 'Talent Intelligence is being built with early enterprise partners. Join the waitlist to shape the product and get early access.'],
    ],
    faq: [['When will Talent Intelligence launch?', 'We are working with a small group of enterprise partners on early access. Contact us to discuss joining the development programme.']],
    related: ['enterprise', 'enterprise/upskilling', 'contact'],
  }),
  page({
    slug: 'enterprise/overview',
    title: 'Enterprise Overview — Workforce capability, upskilling, and hiring',
    description: 'Pathwisse for enterprises: workforce assessment, role-based upskilling journeys, AI readiness mapping, internal mobility, and hiring intelligence in development.',
    eyebrow: 'ENTERPRISE OVERVIEW',
    kind: 'workforce',
    cta: 'Request a demo',
    href: '/contact?interest=upskilling',
    sections: [
      ['Workforce capability assessment', 'Understand what teams can currently do against what roles require. Applied work evidence, not skills surveys.'],
      ['Role-based upskilling', 'Close gaps with structured learning paths, practice, and project milestones. Track readiness movement over time.'],
      ['AI workforce readiness', 'Map AI-related skill needs, identify gaps, and build practical upskilling paths for teams working alongside AI.'],
      ['Hiring intelligence (in development)', 'Discover candidates through demonstrated capability, not just profiles. Currently in development with early partners.'],
    ],
    faq: [['Is Pathwisse suitable for companies outside India?', 'Pathwisse currently focuses on the Indian market and is expanding. Contact us to discuss your location and workforce context.']],
    related: ['enterprise/upskilling', 'enterprise/talent-intelligence', 'contact'],
  }),
];

// ─── COMPANY / INSTITUTIONAL EXECUTION PAGES ───────────────────────────────────
const companyPages = [
  page({
    slug: 'company/about',
    title: 'About Pathwisse — Shaquantum Labs',
    description: 'Pathwisse is the Employability Operating System for higher education developed by Shaquantum Labs Private Limited, guiding every student from career choice to placement readiness.',
    eyebrow: 'ABOUT',
    kind: 'company',
    cta: 'Get in touch',
    href: '/contact',
    sections: [
      ['The structural challenge', 'Higher education faces a structural challenge in career readiness: academics, skill courses, projects, mentoring, and placement preparation exist in disconnected silos. Pathwisse unifies these into a single, measurable journey.'],
      ['Core belief 01: System, Not Scramble', 'Employability is a cumulative outcome built over years through structured, long-term roadmaps rather than last-minute placement preparation panic.'],
      ['Core belief 02: Evidence Beats Claims', 'Skills must be provable through completed projects, code repositories, and mentor-reviewed rubrics — not just bullet points on a resume.'],
      ['Core belief 03: Support the Quiet', 'The platform is engineered to catch and guide students early, providing structured milestones and proactive support for learners who are less likely to self-advocate.'],
      ['What Pathwisse is NOT', 'Pathwisse is not a job board, not a resume keyword builder, not a quick-fix tool, and not a placement guarantee. It is institutional execution infrastructure.'],
      ['Company and registered office', 'Pathwisse is developed by Shaquantum Labs Private Limited (incorporated in India, Startup India registered). Registered office: 3-49A, Teachers Colony, Madanapalle, Chittoor, Andhra Pradesh, India.'],
    ],
    faq: [
      ['Who can I contact for partnership enquiries?', 'Reach out directly to partnership@pathwisse.com. Our institutional team responds within one business day.'],
      ['How is Pathwisse funded and supported?', 'Pathwisse is a recognized Indian startup operating with institutional partners across higher education.'],
    ],
    related: ['colleges', 'students', 'contact'],
  }),
  page({
    slug: 'company/partners',
    title: 'Partnerships — Colleges, training partners, and ecosystem',
    description: 'Partner with Pathwisse to deliver structured employability infrastructure to your students, learners, or workforce. We work with colleges, training providers, and enterprise ecosystem partners.',
    eyebrow: 'PARTNERSHIPS',
    kind: 'company',
    cta: 'Discuss a partnership',
    href: '/contact?interest=general',
    sections: [
      ['College and university partnerships', 'Institutional partnerships give all enrolled students access to career roadmaps, verified skill proof, and placement readiness tools — with placement team and management dashboards included.'],
      ['Training partner integrations', 'Connect your training programmes with Pathwisse to give learners a verified skills profile and project evidence trail that travels with them into employment.'],
      ['Enterprise ecosystem', 'Enterprise partners can plug Pathwisse readiness signals into their hiring and upskilling workflows, connecting capability evidence with role requirements at scale.'],
    ],
    faq: [['How do I start a partnership conversation?', 'Contact us with your institution name, student count, and the placement challenges you are trying to solve. We will schedule a discovery call within 48 hours.']],
    related: ['colleges', 'enterprise', 'contact'],
  }),
  page({
    slug: 'how-it-works',
    title: 'How It Works — From Enrollment to Employment',
    description: 'The campus-to-career execution system: an 8-step journey that unifies career diagnostics, structured roadmaps, practice labs, verified skill proof, and placement readiness.',
    eyebrow: 'HOW IT WORKS',
    kind: 'product',
    cta: 'Request a demo',
    href: '/contact?interest=college',
    sections: [
      ['01. CV Upload & Baseline Analysis', 'Students upload their existing profile or CV. The system analyzes education, projects, and initial skills to establish a baseline career diagnostic.'],
      ['02. AI Role Matching & Career Choice', 'The platform matches the student profile with suitable target roles and articulates why specific roles offer the best fit based on capability and industry demand.'],
      ['03. Skill Gap Diagnosis', 'Pathwisse identifies the precise technical and communication skills needed to reach the target role, eliminating guesswork from preparation.'],
      ['04. Structured 12-Month Roadmap', 'The platform generates a personalized, milestone-based roadmap. Students move from enrollment to employment through documented, progressive stages.'],
      ['05. Daily Practice Labs & Stage Projects', 'Students build verified skill proof through daily practice (aptitude and communication) and progressive stage projects, culminating in a production-grade capstone.'],
      ['06. Mentoring & Faculty Integration', 'Students connect with faculty advisors and industry mentors who log review sessions, provide rubric feedback, and support milestone completions.'],
      ['07. Interview Readiness Index (IRI)', 'AI-assisted mock evaluations assess communication, technical depth, and role readiness on a 0–100 scale, flagging high-risk areas before live interviews.'],
      ['08. Placement with Verified Skill Passport', 'Students enter placement season with an evidence-backed profile linking directly to code repositories, capstone projects, and readiness scores.'],
    ],
    faq: [
      ['At what year should colleges introduce Pathwisse?', 'Pathwisse is designed to be implemented from Year 1 to Year 4, allowing students to build cumulative evidence progressively rather than during a final-year scramble.'],
      ['Can the roadmap be tailored to our syllabus?', 'Yes. The institutional implementation team can align milestones with internal semester schedules and curriculum requirements.'],
    ],
    related: ['product', 'colleges', 'outcomes'],
  }),
  page({
    slug: 'outcomes',
    title: 'Institutional Outcomes — Measurable Placement Readiness',
    description: 'Placement readiness is measured, not hoped for. Track student activation, roadmap progression, practice consistency, and verified capstone completion across cohorts.',
    eyebrow: 'OUTCOMES',
    kind: 'college',
    cta: 'Request a pilot',
    href: '/contact?interest=college',
    sections: [
      ['Evidence-based outcomes replace claims', 'Replace outdated, unverified multi-page resumes with data-backed candidate profiles. Objective readiness is shared directly with corporate recruiters.'],
      ['Student activation & roadmap progression', 'Track what percentage of students are actively moving through their career roadmaps. Measure milestone completion rates semester by semester.'],
      ['Daily practice consistency', 'Monitor aptitude and communication practice streaks. Consistent effort is recorded as verifiable readiness data rather than last-minute cramming.'],
      ['Capstone project verification', 'Every student builds a production-grade capstone with code repositories and mentor-reviewed rubrics, proving they can execute real work.'],
      ['Benchmark reports & early risk signals', 'Batch-level diagnostic benchmark reports allow placement teams to forecast outcomes and intervene with at-risk students well before campus drives begin.'],
    ],
    faq: [
      ['Are student outcomes publicly visible?', 'No. Institutional data is private to the college. Recruiter exports are only generated by authorized placement personnel.'],
      ['What reports are provided for NAAC/NIRF?', 'Pathwisse automatically aggregates skill progression, training hours, mentoring logs, and placement readiness data needed for accreditation documentation.'],
    ],
    related: ['colleges/placement-teams', 'how-it-works', 'accelerator'],
  }),
  page({
    slug: 'accelerator',
    title: 'Pathwisse Accelerator — Fast-Track Institutional Onboarding',
    description: 'A structured implementation program helping colleges configure cohorts, onboard faculty, and operationalize the placement console within 2 to 4 weeks.',
    eyebrow: 'ACCELERATOR',
    kind: 'college',
    cta: 'Request a pilot',
    href: '/contact?interest=college',
    sections: [
      ['Cohort-based institutional launch', 'A guided rollout track that configures departments, imports student rosters, and aligns milestone calendars with institutional academic schedules.'],
      ['Placement console & TPO enablement', 'Training for placement heads and coordinators on candidate filtering, cohort readiness scoring, early warning interpretation, and corporate recruiter exports.'],
      ['Faculty portal training', 'Educators and mentors learn how to monitor student trajectories, review stage project rubrics, log mentoring sessions, and provide targeted support.'],
      ['Pilot program pathway', 'Institutions can start with a defined pilot cohort (e.g., 200–500 students) before expanding campus-wide, verifying adoption and measurable readiness lift.'],
    ],
    faq: [
      ['What is the typical timeline for the Accelerator?', 'Most partner institutions complete full configuration, staff training, and student onboarding within 2 to 4 weeks.'],
      ['Is technical integration required to start a pilot?', 'No complex IT integration is required for a pilot. Roster imports and web access allow rapid kickoff.'],
    ],
    related: ['colleges', 'how-it-works', 'pricing'],
  }),
];

// ─── TRUST / LEGAL PAGES ─────────────────────────────────────────────────────
const trustPages = [
  page({
    slug: 'trust/privacy',
    title: 'Privacy Policy',
    description: 'How Pathwisse handles data from website visitors, lead forms, students, institutional partners, and enterprise users.',
    eyebrow: 'TRUST',
    kind: 'trust',
    cta: 'Contact us',
    href: '/contact',
    sections: [
      ['Scope', 'This policy explains how Pathwisse (Shaquantum Labs Private Limited) collects and uses information from website visitors, lead forms, demo requests, and institutional enquiries. Platform-level data for enrolled students is governed by institutional agreements.'],
      ['Data collected on this website', 'We collect name, email, phone, organisation, role, message, and consent when you submit a form. Optional analytics only activate after you choose to allow them. We do not ask visitors to submit confidential commercial information through public forms.'],
      ['How we use your data', 'We use submitted information to respond to enquiries, prepare demos, manage partnership conversations, and understand which content is most useful. We do not sell lead data to third parties.'],
      ['Your rights', 'You may request access to, correction of, or deletion of your data at any time by contacting us at partnership@pathwisse.com. We aim to respond within 5 business days.'],
    ],
    faq: [['Is Pathwisse DPDP-compliant?', 'Pathwisse is designed with India\'s Digital Personal Data Protection Act (DPDP 2023) in mind. Consent is explicit, purpose-limited, and tracked with version history.']],
    related: ['trust/terms', 'trust/security', 'trust/compliance'],
  }),
  page({
    slug: 'trust/terms',
    title: 'Terms of Service',
    description: 'Terms for using the Pathwisse website, public resources, and requesting information about the platform.',
    eyebrow: 'TRUST',
    kind: 'trust',
    cta: 'Contact us',
    href: '/contact',
    sections: [
      ['Website use', 'The Pathwisse public website provides information about our platform, partnership options, career resources, and enquiry forms for colleges, students, and enterprises.'],
      ['Accuracy of information', 'Career roadmap content, readiness frameworks, and skill guides are provided as educational guidance. They do not guarantee employment outcomes, admission, or specific salary ranges.'],
      ['Acceptable use', 'Do not misuse contact forms, submit confidential third-party information, attempt to attack or scrape the service, or interfere with website operation.'],
      ['Platform terms', 'Separate terms apply to the Pathwisse platform for enrolled students, institutional partners, and enterprise users. These are provided as part of the institutional or enterprise agreement.'],
    ],
    faq: [['Who do I contact for legal enquiries?', 'Email partnership@pathwisse.com for legal, compliance, or data-related enquiries.']],
    related: ['trust/privacy', 'trust/security', 'trust/compliance'],
  }),
  page({
    slug: 'trust/security',
    title: 'Security',
    description: 'How Pathwisse approaches data protection, access controls, infrastructure security, and responsible handling of student and institutional data.',
    eyebrow: 'TRUST',
    kind: 'trust',
    cta: 'Contact us',
    href: '/contact',
    sections: [
      ['Security principles', 'Pathwisse applies secure HTTP headers, origin validation, server-side input validation, rate limiting, and careful handling of public lead and student data.'],
      ['Data minimisation', 'We collect only what is necessary for the stated purpose. Public forms do not request sensitive commercial information. Student data is scoped to the institutional agreement.'],
      ['Infrastructure', 'The Pathwisse platform is deployed on Cloudflare-compatible infrastructure with encrypted storage, access controls, and audit logging for sensitive operations.'],
      ['Reporting a concern', 'If you identify a security concern with the Pathwisse platform or website, contact us at partnership@pathwisse.com with details. We aim to respond within 24 hours.'],
    ],
    faq: [['Does Pathwisse offer data residency in India?', 'Yes. All institutional and student data is stored and processed with adherence to Indian regulatory guidelines and DPDP 2023 norms.']],
    related: ['trust/privacy', 'trust/terms', 'trust/compliance'],
  }),
  page({
    slug: 'trust/compliance',
    title: 'Regulatory Alignment & Accreditation Compliance',
    description: 'Pathwisse is architected for Indian higher education regulatory frameworks: NEP 2020, AICTE, UGC, NAAC, NIRF, NBA, and DPDP Act 2023.',
    eyebrow: 'COMPLIANCE',
    kind: 'trust',
    cta: 'Request compliance briefing',
    href: '/contact?interest=college',
    sections: [
      ['NEP 2020 Alignment', 'Supports multidisciplinary learning, skill-centric progression, Academic Bank of Credits (ABC) alignment, and experiential project tracking.'],
      ['AICTE Norms', 'Built-in tracking for student internships, industry-academia linkages, employment metrics, and placement cell activity documentation.'],
      ['UGC Guidelines', 'Centralized records for student career counseling, placement reporting, and alumni progression tracking.'],
      ['NAAC & NIRF Documentation', 'Automates evidence gathering and structured reporting for institutional accreditation criteria and annual NIRF submissions.'],
      ['NBA Outcome-Based Education (OBE)', 'Enables mapping of skill competencies and capstone project rubrics to program outcomes (POs) and course outcomes (COs).'],
      ['DPDP Act 2023 Compliance', 'Consent-based data collection, purpose limitation enforcement, and student data principal rights workflows.'],
    ],
    faq: [
      ['Can Pathwisse generate NAAC criterion reports directly?', 'Yes. The institutional analytics module exports structured documentation aligned with NAAC criteria for student support and progression.'],
    ],
    related: ['trust/privacy', 'trust/security', 'colleges'],
  }),
];

// ─── UTILITY PAGES ───────────────────────────────────────────────────────────
const utilityPages = [
  page({
    slug: 'pricing',
    title: 'Pricing — Institutional Employability Plans',
    description: 'Pathwisse uses customized institutional pricing based on cohort size, department scope, and implementation needs. Request a tailored proposal or pilot.',
    eyebrow: 'PRICING',
    kind: 'pricing',
    cta: 'Request a pilot',
    href: '/contact?interest=college',
    sections: [
      ['Institutional pricing model', 'Pathwisse is provided as an enterprise platform license for colleges and universities. Pricing is based on enrolled student count, departments, and support scope.'],
      ['What is included', 'Full access to Student Roadmaps, Daily Practice Labs, Stage Projects, Capstone evaluations, Placement Console, Faculty Portal, and NAAC/NIRF reporting.'],
      ['Structured pilot program', 'Institutions can initiate a defined pilot cohort before campus-wide deployment to experience adoption rates, faculty engagement, and readiness gains.'],
    ],
    faq: [
      ['Do individual students pay directly?', 'Pathwisse is primarily an institutional platform funded by partner colleges for their student body. Optional specialized advanced modules can be offered as student add-ons.'],
      ['How do we receive a formal proposal?', 'Contact partnership@pathwisse.com or submit a demo request with your student count and departments.'],
    ],
    related: ['colleges', 'accelerator', 'contact'],
  }),
  page({
    slug: 'contact',
    title: 'Contact Pathwisse — Request a Demo or Pilot',
    description: 'Connect with the Pathwisse institutional team to request an institutional demo, explore a college pilot, or discuss workforce partnerships.',
    eyebrow: 'CONTACT',
    kind: 'company',
    cta: 'Send message',
    href: '/contact',
    sections: [
      ['For Colleges & Placement Offices', 'Share your institution details, student count, and current placement challenges. We will schedule a personalized demonstration within 48 hours.'],
      ['For Enterprise & Hiring Partners', 'Discover how to access pre-filtered cohorts with verified technical proof and Interview Readiness Index scores.'],
      ['General & Partnership Enquiries', 'Email us directly at partnership@pathwisse.com or write to Shaquantum Labs Private Limited, Madanapalle, Chittoor, Andhra Pradesh, India.'],
    ],
    faq: [['What is the turnaround time for demo requests?', 'Our institutional partnership team typically responds within one business day to schedule a briefing.']],
    related: ['colleges', 'students', 'pricing'],
  }),
];

// ─── BLOG HUB PAGES (index pages, individual posts served from DB) ────────────
const blogHubPages = [
  mk('resources/blog', 'Pathwisse Blog — Career readiness, placement, and capability', 'Practical writing about career direction, placement readiness, employability, and workforce capability from the Pathwisse team.', 'article', 'Read the latest', '/resources/blog'),
  mk('resources/blog/category/career-direction', 'Career Direction articles', 'Guides on choosing a career path, building a roadmap, and deciding what skill to develop next.', 'article', 'Explore articles', '/resources/blog'),
  mk('resources/blog/tag/placement-readiness', 'Placement readiness articles', 'Articles for students and placement teams on readiness signals, evidence, and preparation strategies.', 'article', 'Explore articles', '/resources/blog'),
  mk('resources/blog/author/pathwisse-team', 'Pathwisse Team articles', 'All articles from the Pathwisse team on institutional employability, career readiness, and workforce capability.', 'article', 'Read latest posts', '/resources/blog'),
];

// ─── CAREER & SKILL PAGES ────────────────────────────────────────────────────
const careerPages = careers.map(c => page({
  slug: `careers/${c.slug}`,
  title: `${c.name} Career Roadmap — Pathwisse`,
  description: c.shortSummary,
  eyebrow: 'CAREER ROADMAP',
  kind: 'career',
  cta: 'Try Career Voice',
  href: CAREER_VOICE_URL,
  sections: [
    ['What this role does', c.responsibilities.join('. ') + '.'],
    ['Skills to build', `Required skills: ${c.requiredSkills.join(', ')}. Useful optional skills: ${c.optionalSkills.join(', ')}.`],
    ['Learning roadmap', c.roadmap.join(' → ') + '.'],
    ['Applied projects', c.projects.join(', ') + '.'],
    ['Interview preparation', c.interviewPreparation.join('. ') + '.'],
  ],
  faq: c.faq,
  related: [c.product, ...c.requiredSkills.map(s => `skills/${s.toLowerCase().replaceAll(' ', '-')}`)],
}));

const skillPages = skills.map(s => page({
  slug: `skills/${s.slug}`,
  title: `${s.name} Skill Guide — Pathwisse`,
  description: s.description,
  eyebrow: 'SKILL GUIDE',
  kind: 'skill',
  cta: s.cta,
  href: APP_AUTH_URL,
  sections: [
    ['Where this skill is used', s.whereUsed.join('. ') + '.'],
    ['How to progress', s.progression.join(' → ') + '.'],
    ['Practice exercises', s.exercises.join('. ') + '.'],
    ['Applied projects', s.projects.join(', ') + '.'],
  ],
  faq: s.faq,
  related: [...s.careers.map(c => `careers/${c}`), ...s.relatedSkills.map(k => `skills/${k}`)],
}));

const comparisonPages = [
  mk('compare/data-analyst-vs-business-analyst', 'Data Analyst vs Business Analyst', 'Compare responsibilities, required skills, tools, applied projects, learning curve, and transition paths between these two roles — without treating one as universally better.', 'comparison', 'Find your direction', CAREER_VOICE_URL),
  mk('compare/product-manager-vs-business-analyst', 'Product Manager vs Business Analyst', 'Understand how product management and business analysis differ across ownership, decisions, skills required, and the evidence each role expects.', 'comparison', 'Explore with Career Voice', CAREER_VOICE_URL),
  mk('compare/data-scientist-vs-data-analyst', 'Data Scientist vs Data Analyst', 'Compare analytics and data science through responsibilities, required tools, applied projects, and typical transition paths.', 'comparison', 'Build your roadmap', APP_AUTH_URL),
];

// ─── REDIRECTS ───────────────────────────────────────────────────────────────
// Legacy paths that point to real pages — handled via legacyRedirects in site-config.ts

// ─── ASSEMBLE ALL PAGES ──────────────────────────────────────────────────────
const all = [
  ...primaryPages,
  ...productPages,
  ...institutionalPages,
  ...enterprisePages,
  ...companyPages,
  ...trustPages,
  ...utilityPages,
  ...blogHubPages,
  ...careerPages,
  ...skillPages,
  ...comparisonPages,
];

export const pages: Record<string, PageData> = Object.fromEntries(all.map(p => [p.slug, p]));

export const hubs: Record<string, HubData> = {
  product: {
    title: 'Pathwisse Products',
    description: 'Explore the 9 connected products across Understand, Develop, Prove, Intelligence, and Outcomes.',
    items: [
      'product/career-voice',
      'product/career-roadmaps',
      'product/practice-lab',
      'product/enterprise-projects',
      'product/skill-passport',
      'product/readiness-intelligence',
      'product/job-intelligence',
      'product/placement-intelligence',
      'product/employability-analytics',
    ],
  },
  careers: { title: 'Career Roadmaps', description: 'Role-specific paths that connect responsibilities, required skills, applied projects, interview preparation, and next steps.', items: careers.map(c => `careers/${c.slug}`) },
  skills: { title: 'Skill Guides', description: 'Skill pages that connect learning progression, practice exercises, applied projects, career connections, and resources.', items: skills.map(s => `skills/${s.slug}`) },
  compare: { title: 'Career Comparisons', description: 'Compare roles by responsibilities, required skills, tools, projects, learning curve, and transition paths.', items: comparisonPages.map(p => p.slug) },
  colleges: { title: 'For Colleges', description: 'Everything colleges need: placement team tools, student analytics, readiness reporting, and faculty visibility.', items: ['colleges', 'colleges/overview', 'colleges/placement-teams', 'colleges/placement-readiness', 'colleges/student-analytics'] },
  'resources/blog/category': { title: 'Blog Categories', description: 'Browse Pathwisse articles by category.', items: ['resources/blog/category/career-direction'] },
  'resources/blog/tag': { title: 'Blog Tags', description: 'Browse Pathwisse articles by tag.', items: ['resources/blog/tag/placement-readiness'] },
};

export const searchable = [
  ...Object.values(pages),
  ...Object.entries(hubs).map(([slug, hub]) => ({ slug, title: hub.title, description: hub.description })),
];

export const indexablePaths = [
  ...Object.entries(pages)
    .filter(([, p]) => !p.draft && !p.noindex && p.status === 'published')
    .map(([slug]) => slug),
  ...Object.keys(hubs),
];
