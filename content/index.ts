import { APP_AUTH_URL, CAREER_VOICE_URL } from '@/lib/site-config';
import {
  blogPostSchema,
  careerSchema,
  type BlogPost,
  type Career,
  type HubData,
  type PageData,
  pageSchema,
  skillSchema,
  type Skill,
} from './schema';

const page = (input: Omit<PageData, 'status' | 'audience'> & Partial<Pick<PageData, 'status' | 'audience'>>) =>
  pageSchema.parse({ status: 'published', audience: 'all', ...input });

const sections = (focus: string): [string, string][] => [
  ['Problem', focus],
  ['Pathwisse approach', 'Pathwisse connects direction, skill development, applied projects, readiness signals, and decision support in one capability system.'],
  ['Product experience', 'The experience moves from diagnosis to guided action, then turns progress into evidence that students, placement teams, and enterprises can use.'],
  ['Outcome', 'The result is a clearer next step, stronger visibility into capability, and a more useful conversation about readiness.'],
];

const mk = (slug: string, title: string, description: string, kind: PageData['kind'] = 'product', cta = 'Talk to Pathwisse', href = '/contact', noindex = false) =>
  page({
    slug,
    title,
    description,
    eyebrow: slug.split('/')[0].replace('-', ' ').toUpperCase(),
    kind,
    cta,
    href,
    noindex,
    sections: sections(description),
    faq: [['Is this page using real customer data?', 'No. Product visuals on the website use illustrative product experience unless approved customer evidence is clearly published.']],
    related: ['product', 'students', 'colleges', 'enterprise'],
  });

export const careers: Career[] = [
  ['data-analyst', 'Data Analyst', 'Analyze data, explain patterns, and help teams make better decisions.', ['Clean and prepare data', 'Write SQL queries', 'Build dashboards', 'Explain findings'], ['Reliable analysis', 'Clear dashboards'], ['SQL', 'Power BI', 'Communication'], ['Python'], ['Data foundations', 'SQL', 'Visualization', 'Analytics projects'], ['Customer insights dashboard'], ['business-analyst', 'ai-engineer']],
  ['business-analyst', 'Business Analyst', 'Translate business problems into requirements, analysis, and practical decisions.', ['Map processes', 'Gather requirements', 'Analyze metrics', 'Coordinate stakeholders'], ['Clear requirements', 'Better process decisions'], ['Communication', 'SQL'], ['Power BI'], ['Business context', 'Requirements', 'Data basics', 'Case practice'], ['Process improvement brief'], ['data-analyst', 'product-manager']],
  ['product-manager', 'Product Manager', 'Define product direction, prioritize work, and connect user needs with business outcomes.', ['Understand users', 'Prioritize opportunities', 'Write product requirements', 'Measure adoption'], ['Clear product decisions', 'Aligned teams'], ['Communication'], ['SQL', 'Power BI'], ['User research', 'Problem framing', 'Prioritization', 'Metrics'], ['Feature discovery memo'], ['business-analyst', 'data-analyst']],
  ['full-stack-developer', 'Full Stack Developer', 'Build web applications across frontend, backend, data, and deployment workflows.', ['Build interfaces', 'Create APIs', 'Work with databases', 'Ship features'], ['Working applications', 'Maintainable code'], ['JavaScript', 'Communication'], ['Python', 'SQL'], ['Web foundations', 'Frontend', 'Backend APIs', 'Databases'], ['Career dashboard app'], ['ai-engineer', 'product-manager']],
  ['ai-engineer', 'AI Engineer', 'Build AI-enabled systems that combine models, product context, data, and evaluation.', ['Design AI workflows', 'Integrate models', 'Evaluate outputs', 'Build safe product experiences'], ['Useful AI features', 'Reliable evaluation'], ['Python', 'Communication'], ['SQL'], ['Python', 'Data basics', 'Model integration', 'Evaluation'], ['AI support assistant prototype'], ['data-analyst', 'full-stack-developer']],
].map(([slug, name, shortSummary, responsibilities, roleOutcomes, requiredSkills, optionalSkills, roadmap, projects, relatedCareers]) =>
  careerSchema.parse({
    slug,
    name,
    shortSummary,
    responsibilities,
    roleOutcomes,
    requiredSkills,
    optionalSkills,
    roadmap,
    projects,
    relatedCareers,
    interviewPreparation: ['Project walkthrough', 'Role-specific scenarios', 'Communication practice'],
    product: 'product/career-roadmaps',
    faq: [['How should I use this roadmap?', 'Use it as guidance, then validate direction through practice, projects, and conversations.']],
    references: [],
    seoTitle: `${name} Career Roadmap`,
    metaDescription: shortSummary,
  }),
);

export const skills: Skill[] = [
  ['sql', 'SQL', 'Use databases to query, join, aggregate, and explain structured data.', ['Analytics', 'Reporting'], ['data-analyst', 'business-analyst'], ['Data tables'], ['Select and filter', 'Joins', 'Aggregations', 'Window functions'], ['Write joins', 'Analyze metrics'], ['Customer insights dashboard'], ['power-bi', 'python']],
  ['python', 'Python', 'Use Python for analysis, automation, data workflows, and AI-enabled product work.', ['Automation', 'Data analysis', 'AI prototypes'], ['data-analyst', 'ai-engineer', 'full-stack-developer'], ['Programming basics'], ['Syntax', 'Data structures', 'Files', 'APIs'], ['Clean a dataset', 'Call an API'], ['AI support assistant prototype'], ['sql', 'communication']],
  ['power-bi', 'Power BI', 'Build dashboards that turn data into clear operational and business decisions.', ['Dashboards', 'Business reviews'], ['data-analyst', 'business-analyst'], ['Data basics'], ['Import data', 'Model data', 'DAX basics', 'Dashboard design'], ['Build KPI cards', 'Explain trends'], ['Sales performance analysis'], ['sql', 'communication']],
  ['communication', 'Communication', 'Explain context, decisions, tradeoffs, and evidence so people can act.', ['Interviews', 'Stakeholder updates', 'Project walkthroughs'], ['data-analyst', 'business-analyst', 'product-manager', 'ai-engineer'], ['Clear thinking'], ['Summaries', 'Structured explanations', 'Stakeholder updates'], ['Explain a project', 'Write a decision memo'], ['Project reflection portfolio'], ['sql', 'power-bi']],
].map(([slug, name, description, whereUsed, careerList, prerequisites, progression, exercises, projects, relatedSkills]) =>
  skillSchema.parse({
    slug,
    name,
    description,
    whereUsed,
    careers: careerList,
    prerequisites,
    progression,
    exercises,
    projects,
    relatedSkills,
    faq: [['Can this skill be practiced on Pathwisse?', 'Yes. Skill pages connect to exercises, projects, and readiness context.']],
    resources: [],
    cta: `Build ${name} evidence`,
  }),
);

const primaryPages = [
  mk('students', 'For students: know what to do next', 'Find direction, follow structured roadmaps, build skills and projects, practice consistently, and understand career readiness.', 'student', 'Start on Pathwisse', APP_AUTH_URL),
  mk('colleges', 'For colleges and placement teams', 'Measure student readiness, identify skill gaps, track cohort progress, and improve placement conversations.', 'college', 'Request demo', '/contact?interest=college'),
  mk('enterprise', 'For enterprises: hire with evidence, upskill with direction', 'Assess employees, identify capability gaps, guide role-based upskilling, and prepare for evidence-led hiring.', 'workforce', 'Request demo', '/contact?interest=upskilling'),
];

const productPages = [
  ['product', 'Pathwisse Platform', 'The connected capability platform for career direction, roadmaps, practice, projects, readiness, and analytics.', 'product', APP_AUTH_URL],
  ['product/career-voice', 'Career Voice', 'A guided career conversation that helps students compare directions and choose a useful next step.', 'student', CAREER_VOICE_URL],
  ['product/career-roadmaps', 'Career Roadmaps', 'Role-based paths that connect skills, projects, practice, and readiness milestones.', 'product', '/students/career-roadmaps'],
  ['product/practice-lab', 'Practice Lab', 'Daily practice that helps learners build consistency and convert learning into usable skills.', 'student', APP_AUTH_URL],
  ['product/projects', 'Projects', 'Applied work that captures problem context, decisions, outputs, and reflection as evidence of capability.', 'product', '/students/projects'],
  ['product/skill-passport', 'Skill Passport', 'A portable view of demonstrated skills, projects, progress, and readiness context.', 'product', APP_AUTH_URL],
  ['product/readiness-scoring', 'Readiness Scoring', 'A transparent readiness layer for students, cohorts, candidates, and employees.', 'college', '/colleges/placement-readiness'],
  ['product/analytics', 'Analytics', 'Dashboards for cohort progress, skill gaps, journeys, and workforce capability.', 'college', '/contact?interest=college'],
  ['product/integrations', 'Integrations', 'A practical integration layer for college systems, workforce workflows, CRM, and automation partners.', 'product', '/contact?interest=general'],
].map(([slug, title, description, kind, href]) => mk(slug, title, description, kind as PageData['kind'], 'Explore', href));

type RouteSeed = [string, string, string, PageData['kind']?];
const routeTitles: RouteSeed[] = [
  ['students/career-audit', 'Career audit for students', 'Understand where you are starting from and which directions deserve your attention first.', 'student'],
  ['students/career-roadmaps', 'Student career roadmaps', 'Follow a structured path from direction to skills, projects, evidence, and readiness.', 'student'],
  ['students/skill-sprints', 'Skill sprints', 'Build one useful capability at a time with focused practice and applied tasks.', 'student'],
  ['students/projects', 'Student projects', 'Create evidence through projects that show decisions, constraints, and outcomes.', 'student'],
  ['students/daily-practice', 'Daily practice', 'Turn consistency into visible progress through small, role-relevant tasks.', 'student'],
  ['students/career-readiness', 'Career readiness', 'Understand strengths, gaps, next steps, and interview preparation without guessing.', 'student'],
  ['students/pricing', 'Student pricing', 'Simple student plans for career direction, practice, projects, and readiness support.', 'pricing'],
  ['students/success-stories', 'Student success stories', 'Approved student journeys will appear here as Pathwisse publishes verified stories.', 'customer'],
  ['colleges/overview', 'College overview', 'A connected view of readiness for placement teams, management, and faculty.', 'college'],
  ['colleges/placement-teams', 'Placement teams', 'See who is ready, who needs support, and which interventions should happen next.', 'college'],
  ['colleges/management', 'College management', 'Track employability initiatives with clearer visibility into cohort progress and readiness.', 'college'],
  ['colleges/faculty', 'Faculty enablement', 'Connect project-based learning and skill practice to student readiness outcomes.', 'college'],
  ['colleges/student-readiness-audit', 'Student readiness audit', 'Start with an evidence-based view of cohort readiness and priority gaps.', 'college'],
  ['colleges/career-accelerator', 'Career accelerator', 'Run structured career readiness journeys across students, roles, and cohorts.', 'college'],
  ['colleges/placement-readiness', 'Placement readiness', 'Prepare students for opportunities using readiness signals and project evidence.', 'college'],
  ['colleges/student-analytics', 'Student analytics', 'Measure skill gaps, practice consistency, project progress, and role readiness.', 'college'],
  ['colleges/project-based-learning', 'Project-based learning for colleges', 'Make applied work visible and useful for readiness conversations.', 'college'],
  ['colleges/implementation', 'College implementation', 'Plan onboarding, cohort setup, faculty alignment, and reporting workflows.', 'college'],
  ['colleges/integrations', 'College integrations', 'Connect Pathwisse with workflows that placement and academic teams already use.', 'college'],
  ['colleges/pricing', 'College pricing', 'Discuss cohort size, implementation scope, and partnership model with the Pathwisse team.', 'pricing'],
  ['colleges/request-demo', 'Request a college demo', 'Share your placement readiness goals and explore a partnership conversation.', 'campaign'],
  ['enterprise/overview', 'Enterprise overview', 'One capability system for workforce assessment, upskilling, mobility, and hiring intelligence.', 'workforce'],
  ['enterprise/workforce-assessment', 'Workforce assessment', 'Assess current capability against role expectations and business needs.', 'workforce'],
  ['enterprise/upskilling', 'Enterprise upskilling', 'Create role-based journeys that close skill gaps and make workforce progress visible.', 'workforce'],
  ['enterprise/ai-readiness', 'AI workforce readiness', 'Map AI-related skills, gaps, and applied practice needs across teams.', 'workforce'],
  ['enterprise/internal-mobility', 'Internal mobility', 'Identify people ready for new roles and show what they need to build next.', 'workforce'],
  ['enterprise/graduate-training', 'Graduate training', 'Move early talent from onboarding to role readiness through structured paths and projects.', 'workforce'],
  ['enterprise/project-based-learning', 'Project-based learning for enterprises', 'Use applied projects to build and verify practical capability.', 'workforce'],
  ['enterprise/talent-intelligence', 'Talent and hiring intelligence', 'A developing product for discovering candidates through evidence of capability.', 'hiring'],
  ['enterprise/skill-verification', 'Skill verification', 'Review demonstrated skills through practice, project work, and readiness context.', 'workforce'],
  ['enterprise/implementation', 'Enterprise implementation', 'Plan roles, capability maps, journeys, integrations, reporting, and rollout.', 'workforce'],
  ['enterprise/integrations', 'Enterprise integrations', 'Prepare CRM, HR, learning, email, and automation workflows without tight provider coupling.', 'workforce'],
  ['enterprise/request-demo', 'Request an enterprise demo', 'Explore workforce upskilling, assessment, internal mobility, or hiring intelligence.', 'campaign'],
  ['career-audit/start', 'Start your career audit', 'Begin with a guided audit to clarify possible career directions.', 'student'],
  ['career-audit/assessment', 'Career audit assessment', 'Answer practical questions about interests, skills, constraints, and goals.', 'student'],
  ['career-audit/result', 'Career audit result', 'Review likely directions, skill gaps, project ideas, and a recommended next step.', 'student'],
  ['career-audit/roadmap', 'Career audit roadmap', 'Turn guidance into a simple roadmap with skills, practice, and projects.', 'student'],
  ['pricing/students', 'Student pricing', 'Choose a student plan for direction, practice, projects, and readiness.', 'pricing'],
  ['pricing/colleges', 'College pricing', 'Discuss cohort pricing, implementation, and partnership support.', 'pricing'],
  ['pricing/enterprise', 'Enterprise pricing', 'Request pricing for workforce assessment, upskilling, and capability intelligence.', 'pricing'],
  ['company/about', 'About Pathwisse', 'Pathwisse helps people and teams turn capability into visible, actionable proof.', 'company'],
  ['company/careers', 'Careers at Pathwisse', 'Future Pathwisse roles will be published here.', 'company'],
  ['company/partners', 'Pathwisse partners', 'Partnership routes for colleges, training partners, and ecosystem partners.', 'company'],
  ['company/contact', 'Contact Pathwisse', 'Reach the Pathwisse team for student, college, enterprise, or partner enquiries.', 'company'],
  ['company/press', 'Press', 'Company background and media resources will appear here as approved materials are published.', 'company'],
  ['trust/security', 'Security', 'How Pathwisse thinks about data protection, access, infrastructure, and secure product development.', 'trust'],
  ['trust/privacy', 'Privacy', 'Pathwisse privacy notice for website visitors, leads, students, partners, and enterprise conversations.', 'trust'],
  ['trust/compliance', 'Compliance', 'A practical view of Pathwisse compliance readiness and responsible data handling.', 'trust'],
  ['trust/dpdp', 'DPDP', 'India DPDP-oriented privacy readiness and consent principles for Pathwisse experiences.', 'trust'],
  ['trust/terms', 'Terms', 'Terms for using Pathwisse website and related public resources.', 'trust'],
  ['customers', 'Customers', 'Verified customer stories will be published as approved case studies become available.', 'customer'],
  ['customers/students', 'Student stories', 'Approved student stories will focus on direction, readiness, and project evidence.', 'customer'],
  ['customers/colleges', 'College stories', 'Approved college stories will focus on readiness visibility and placement support.', 'customer'],
  ['customers/enterprises', 'Enterprise stories', 'Approved enterprise stories will focus on workforce capability and upskilling journeys.', 'customer'],
  ['customers/case-studies/sample', 'Case study placeholder', 'Approved case studies will use context, challenge, approach, evidence, outcome, limitations, and CTA.', 'customer'],
];
const routePages = routeTitles.map(([slug, title, description, kind]) => mk(slug, title, description, kind));

const campaignSlugs = [
  'campaigns/students/free-career-audit',
  'campaigns/students/career-readiness-test',
  'campaigns/students/job-readiness-score',
  'campaigns/students/webinar/sample-webinar',
  'campaigns/students/event/sample-event',
  'campaigns/colleges/college-readiness-audit',
  'campaigns/colleges/placement-readiness',
  'campaigns/colleges/student-employability-audit',
  'campaigns/colleges/campus-to-career',
  'campaigns/colleges/request-demo',
  'campaigns/enterprise/enterprise-skill-audit',
  'campaigns/enterprise/ai-workforce-readiness',
  'campaigns/enterprise/workforce-upskilling-assessment',
  'campaigns/enterprise/graduate-training',
  'campaigns/enterprise/request-demo',
  'campaigns/partners/university-partnerships',
  'campaigns/partners/training-partners',
  'campaigns/partners/ecosystem-partners',
].map((slug) => mk(slug, slug.split('/').pop()!.replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase()), 'A focused campaign landing page with UTM attribution, campaign context, lead capture, and noindex by default.', 'campaign', slug.includes('students') ? 'Start audit' : 'Request demo', slug.includes('students') ? '/career-audit/start' : '/contact', true));

export const blogPosts: BlogPost[] = [
  ['choose-career-path', 'How to choose a career path when everything feels open', 'A practical guide for turning uncertainty into a first useful direction.', 'Career Direction', 'students'],
  ['placement-readiness-before-season', 'What placement readiness should measure before placement season', 'A placement-team guide to readiness signals, cohort gaps, and timely support.', 'Placement Readiness', 'colleges'],
  ['hire-with-evidence-upskill-with-direction', 'Hire with evidence, upskill with direction', 'How enterprises can connect hiring signals, workforce gaps, and role-based learning.', 'Enterprise Capability', 'enterprise'],
].map(([slug, title, excerpt, category, audience]) => blogPostSchema.parse({
  slug,
  title,
  excerpt,
  body: `${excerpt} Pathwisse connects the idea to practical skill signals, projects, readiness, and the next useful action.`,
  author: 'Pathwisse Team',
  authorBio: 'The Pathwisse team writes about career direction, readiness, and capability evidence.',
  category,
  tags: [audience, 'readiness'],
  publishDate: '2026-09-14',
  modifiedDate: '2026-09-14',
  status: 'published',
  featured: slug === 'choose-career-path',
  seoTitle: title,
  metaDescription: excerpt,
  audience,
  relatedCareers: ['data-analyst'],
  relatedSkills: ['communication'],
  relatedProducts: ['product/career-voice'],
  relatedGuides: ['resources/guides'],
  ctaType: audience === 'students' ? 'career_voice' : 'demo',
  ctaUrl: audience === 'students' ? CAREER_VOICE_URL : '/contact',
  faq: [['How should I use this guide?', 'Use it to choose a next step, then validate progress with practice and project evidence.']],
  references: [],
}));

const careerPages = careers.map(c => page({ slug: `careers/${c.slug}`, title: `${c.name} career roadmap`, description: c.shortSummary, eyebrow: 'CAREER ROADMAP', kind: 'career', cta: 'Explore with Career Voice', href: CAREER_VOICE_URL, sections: [['What this role does', c.responsibilities.join('. ') + '.'], ['Skills to build', `Required: ${c.requiredSkills.join(', ')}. Useful optional skills: ${c.optionalSkills.join(', ')}.`], ['Roadmap', c.roadmap.join(' → ') + '.'], ['Projects', c.projects.join(', ') + '.'], ['Interview preparation', c.interviewPreparation.join('. ') + '.']], faq: c.faq, related: [c.product, ...c.requiredSkills.map(s => `skills/${s.toLowerCase().replaceAll(' ', '-')}`)] }));
const skillPages = skills.map(s => page({ slug: `skills/${s.slug}`, title: `${s.name} skill guide`, description: s.description, eyebrow: 'SKILL GUIDE', kind: 'skill', cta: s.cta, href: APP_AUTH_URL, sections: [['Where it is used', s.whereUsed.join('. ') + '.'], ['Progression', s.progression.join(' → ') + '.'], ['Exercises', s.exercises.join('. ') + '.'], ['Projects', s.projects.join(', ') + '.']], faq: s.faq, related: [...s.careers.map(c => `careers/${c}`), ...s.relatedSkills.map(k => `skills/${k}`)] }));
const comparisonPages = [
  mk('compare/data-analyst-vs-business-analyst', 'Data Analyst vs Business Analyst', 'Compare responsibilities, skills, tools, projects, learning curve, and transition paths without treating one role as universally better.', 'comparison', 'Find your direction', CAREER_VOICE_URL),
  mk('compare/product-manager-vs-business-analyst', 'Product Manager vs Business Analyst', 'Understand how product management and business analysis differ across ownership, decisions, skills, and project evidence.', 'comparison', 'Explore with Career Voice', CAREER_VOICE_URL),
  mk('compare/data-scientist-vs-data-analyst', 'Data Scientist vs Data Analyst', 'Compare analytics and data science through responsibilities, skills, tools, projects, and transition paths.', 'comparison', 'Build your roadmap', APP_AUTH_URL),
];
const blogPages = blogPosts.map(post => page({ slug: `resources/blog/${post.slug}`, title: post.title, description: post.excerpt, eyebrow: post.category.toUpperCase(), kind: 'article', cta: post.ctaType === 'career_voice' ? 'Explore with Career Voice' : 'Talk to Pathwisse', href: post.ctaUrl, sections: [['Summary', post.excerpt], ['Guide', post.body], ['Related next step', `Related careers: ${post.relatedCareers.join(', ')}. Related skills: ${post.relatedSkills.join(', ')}.`]], faq: post.faq, related: [...post.relatedProducts, ...post.relatedCareers.map(c => `careers/${c}`)] }));
const resourcePages = [
  mk('resources', 'Pathwisse resources', 'Career guides, placement guides, templates, reports, webinars, case studies, and practical capability content.', 'guide', 'Explore guides', '/resources/guides'),
  mk('resources/blog', 'Pathwisse blog', 'Practical writing about career direction, readiness, placement intelligence, and workforce capability.', 'article', 'Read featured article', '/resources/blog/choose-career-path'),
  mk('resources/blog/category/career-direction', 'Career Direction articles', 'Articles about choosing a path, building a roadmap, and deciding what to do next.', 'article', 'Try Career Voice', CAREER_VOICE_URL),
  mk('resources/blog/tag/career-roadmaps', 'Career roadmap articles', 'Articles tagged with career roadmaps, skills, projects, and readiness.', 'article', 'Explore roadmaps', '/students/career-roadmaps'),
  mk('resources/blog/author/pathwisse-team', 'Pathwisse Team', 'Articles from the Pathwisse team on capability, readiness, and career direction.', 'article', 'Read latest posts', '/resources/blog'),
  ...['guides', 'templates', 'reports', 'webinars', 'case-studies', 'career-guides', 'placement-guides'].map(kind => mk(`resources/${kind}`, `Pathwisse ${kind.replace('-', ' ')}`, `A scalable library for ${kind.replace('-', ' ')} connected to products, careers, skills, and campaigns.`, 'guide', 'Talk to Pathwisse', '/contact')),
];

const all = [...primaryPages, ...productPages, ...routePages, ...campaignSlugs, ...careerPages, ...skillPages, ...comparisonPages, ...blogPages, ...resourcePages];
export const pages: Record<string, PageData> = Object.fromEntries(all.map(p => [p.slug, p]));


const campaignCopy: Record<string, { title: string; description: string; cta: string; href: string; sections: [string,string][] }> = {
  'campaigns/students/free-career-audit': { title: 'Free Career Audit for Students', description: 'Get a practical direction, likely role paths, skill gaps, and a first project idea.', cta: 'Start free audit', href: '/career-audit/start', sections: [['Offer','A guided career audit that helps students move from uncertainty to one useful next step.'],['Value proposition','Students receive likely career directions, reasoning, skill gaps, project suggestions, and a roadmap handoff.'],['Lead capture','Campaign attribution is preserved from UTM parameters through the lead workflow.']] },
  'campaigns/students/career-readiness-test': { title: 'Career Readiness Test', description: 'Check whether your skills, projects, and practice habits are ready for the opportunities you want.', cta: 'Take the readiness test', href: '/career-audit/assessment', sections: [['Offer','A fast readiness check grounded in skills, projects, and consistency.'],['Value proposition','Students see what is strong, what is missing, and what to build next.'],['Next step','Move into Pathwisse roadmaps or Career Voice after the audit.']] },
  'campaigns/students/job-readiness-score': { title: 'Job Readiness Score', description: 'Understand your current readiness signal and the next action that would improve it.', cta: 'Get my score', href: '/career-audit/start', sections: [['Offer','An illustrative readiness score based on direction, proof, and practice context.'],['Value proposition','The score is guidance, not certainty, and points to a practical next step.'],['Next step','Build skills and projects on Pathwisse.']] },
  'campaigns/students/webinar/sample-webinar': { title: 'Student Career Direction Webinar', description: 'Join a practical session on choosing a path, building proof, and preparing for opportunities.', cta: 'Register interest', href: '/contact?interest=events', sections: [['Webinar focus','Career direction, role comparison, skill gaps, projects, and readiness.'],['Who should attend','Students who feel stuck between many possible roles.'],['Registration','Event leads preserve source, landing page, and UTM context.']] },
  'campaigns/students/event/sample-event': { title: 'Campus Career Readiness Event', description: 'A student event page for career direction, skill clarity, and project-based readiness.', cta: 'Register interest', href: '/contact?interest=events', sections: [['Event focus','A practical readiness event for students.'],['Outcome','Students leave with one role direction, one skill to build, and one project idea.'],['Registration','Event leads are captured with campaign attribution.']] },
  'campaigns/colleges/college-readiness-audit': { title: 'College Readiness Audit', description: 'See cohort readiness, priority skill gaps, and where placement support should begin.', cta: 'Request readiness audit', href: '/colleges/request-demo?campaign_id=college-readiness-audit', sections: [['Offer','A readiness audit for placement teams that need earlier visibility.'],['Value proposition','Identify who is ready, who needs support, and which gaps need intervention.'],['Lead capture','College name, student count, placement challenges, and program interest are captured in the demo flow.']] },
  'campaigns/colleges/placement-readiness': { title: 'Placement Readiness for Colleges', description: 'Move from placement-season urgency to continuous readiness visibility.', cta: 'Request placement demo', href: '/colleges/request-demo?campaign_id=placement-readiness', sections: [['Offer','A focused placement readiness conversation.'],['Value proposition','Connect skills, projects, practice, and role fit into actionable cohort views.'],['Outcome','Placement teams know who is ready and who needs support.']] },
  'campaigns/colleges/student-employability-audit': { title: 'Student Employability Audit', description: 'Audit employability signals across skills, projects, communication, and role readiness.', cta: 'Request employability audit', href: '/colleges/request-demo?campaign_id=student-employability-audit', sections: [['Offer','A structured employability audit for colleges.'],['Value proposition','Make student readiness more visible before shortlisting begins.'],['Outcome','Prioritize support by cohort, role, and skill gap.']] },
  'campaigns/colleges/campus-to-career': { title: 'Campus to Career Program', description: 'Create a structured journey from student learning to project evidence and placement readiness.', cta: 'Discuss campus program', href: '/colleges/request-demo?campaign_id=campus-to-career', sections: [['Offer','A program narrative for colleges building stronger campus-to-career outcomes.'],['Value proposition','Turn learning, practice, and projects into evidence placement teams can act on.'],['Outcome','Students know what to do next; teams know who needs support.']] },
  'campaigns/colleges/request-demo': { title: 'Request a College Partnership Demo', description: 'Explore Pathwisse for placement teams, readiness audits, analytics, and project-based learning.', cta: 'Request college demo', href: '/colleges/request-demo?campaign_id=college-demo', sections: [['Offer','A demo designed around your college context.'],['Value proposition','Share cohort size, placement challenges, and program needs before the call.'],['Outcome','A clearer implementation conversation.']] },
  'campaigns/enterprise/enterprise-skill-audit': { title: 'Enterprise Skill Audit', description: 'Map workforce capability against role needs, skill gaps, and business priorities.', cta: 'Request skill audit', href: '/enterprise/request-demo?campaign_id=enterprise-skill-audit', sections: [['Offer','A capability audit for enterprise teams.'],['Value proposition','Assess skills, identify gaps, and shape role-based upskilling journeys.'],['Outcome','Know where capability is ready and where it needs direction.']] },
  'campaigns/enterprise/ai-workforce-readiness': { title: 'AI Workforce Readiness', description: 'Assess AI-related capability gaps and build practical upskilling paths for teams.', cta: 'Assess AI readiness', href: '/enterprise/request-demo?campaign_id=ai-workforce-readiness', sections: [['Offer','An AI readiness conversation grounded in roles and applied work.'],['Value proposition','Map skills needed, current gaps, and project-based practice.'],['Outcome','Build AI capability without vague training claims.']] },
  'campaigns/enterprise/workforce-upskilling-assessment': { title: 'Workforce Upskilling Assessment', description: 'Turn employee skill gaps into role-based learning journeys and readiness signals.', cta: 'Request upskilling assessment', href: '/enterprise/request-demo?campaign_id=workforce-upskilling-assessment', sections: [['Offer','A structured starting point for enterprise upskilling.'],['Value proposition','Assess, assign paths, track progress, and measure readiness.'],['Outcome','Upskill with direction.']] },
  'campaigns/enterprise/graduate-training': { title: 'Graduate Training Program', description: 'Move early talent from onboarding to role readiness through structured practice and projects.', cta: 'Discuss graduate training', href: '/enterprise/request-demo?campaign_id=graduate-training', sections: [['Offer','A graduate training path with skills, projects, and readiness milestones.'],['Value proposition','Give early talent a clearer path from learning to applied work.'],['Outcome','Managers see readiness movement over time.']] },
  'campaigns/enterprise/request-demo': { title: 'Request an Enterprise Demo', description: 'Explore workforce assessment, upskilling, AI readiness, internal mobility, and hiring intelligence.', cta: 'Request enterprise demo', href: '/enterprise/request-demo?campaign_id=enterprise-demo', sections: [['Offer','A demo shaped around your workforce context.'],['Value proposition','Share employee count, skills needed, L&D stack, and timeline.'],['Outcome','A clearer path to capability growth.']] },
  'campaigns/partners/university-partnerships': { title: 'University Partnerships', description: 'Partner with Pathwisse to connect student capability, readiness, and placement outcomes.', cta: 'Discuss partnership', href: '/colleges/request-demo?campaign_id=university-partnerships', sections: [['Offer','A partnership path for universities and institutions.'],['Value proposition','Connect student roadmaps, projects, readiness, and placement visibility.'],['Outcome','A stronger campus-to-career system.']] },
  'campaigns/partners/training-partners': { title: 'Training Partner Programs', description: 'Connect partner training with project evidence, readiness signals, and learner outcomes.', cta: 'Discuss partner program', href: '/contact?interest=general&campaign_id=training-partners', sections: [['Offer','A partner path for training providers.'],['Value proposition','Make learner outcomes more visible through projects and readiness.'],['Outcome','Stronger proof for learners and partners.']] },
  'campaigns/partners/ecosystem-partners': { title: 'Pathwisse Ecosystem Partners', description: 'Build a capability ecosystem across students, colleges, enterprises, and training partners.', cta: 'Discuss ecosystem partnership', href: '/contact?interest=general&campaign_id=ecosystem-partners', sections: [['Offer','A partnership route for organizations around capability growth.'],['Value proposition','Connect direction, learning, projects, readiness, and opportunity.'],['Outcome','A more useful bridge between potential and possibility.']] },
};
for (const [slug, copy] of Object.entries(campaignCopy)) Object.assign(pages[slug], copy, { noindex: true, kind: 'campaign' as const, faq: [['Will my campaign source be preserved?','Yes. UTM parameters, landing page, source, referrer, and campaign ID are captured in the lead flow.']] });

Object.assign(pages['trust/privacy'], { title: 'Privacy Policy', description: 'How Pathwisse handles website, lead, campaign, and product-interest data.', sections: [['Scope','This policy explains how Pathwisse collects and uses information from website visitors, lead forms, campaign pages, demo requests, and product-interest journeys.'],['Data collected','We may collect name, email, phone, organization, role, audience, message, consent, source, landing page, referrer, and UTM attribution when you submit a form. Optional analytics only run after consent.'],['Use of data','We use submitted information to respond to enquiries, prepare demos, manage waitlists, understand campaign performance, and improve the website. We do not ask visitors to submit confidential information through public forms.'],['Retention and rights','Production retention, deletion, and access processes should be reviewed with legal counsel before broader data collection.'],['Legal review','This page is a production-ready draft and should receive legal review before launch.']] });
Object.assign(pages['trust/terms'], { title: 'Terms of Service', description: 'Terms for using the Pathwisse website and public resources.', sections: [['Website use','The public website provides information, guides, campaign pages, and enquiry forms for Pathwisse audiences.'],['No guarantee','Career audit and readiness content is guidance. It does not guarantee employment, admission, hiring outcomes, or psychological certainty.'],['Acceptable use','Do not misuse forms, submit confidential third-party information, attack the service, scrape private systems, or interfere with website operation.'],['Product terms','Separate product terms may apply to the Pathwisse platform, Career Voice, institutional pilots, or enterprise deployments.'],['Legal review','These terms are a production-ready draft and should be reviewed by counsel before launch.']] });
Object.assign(pages['trust/security'], { title: 'Security', description: 'Pathwisse security principles for public website and lead-generation systems.', sections: [['Security posture','Pathwisse applies secure headers, origin validation, server-side validation, rate limiting patterns, and careful handling of public lead data.'],['Data minimization','Public forms should collect only the information needed for the stated enquiry or campaign. Sensitive secrets and confidential customer data should not be submitted.'],['Infrastructure','The website is designed for Cloudflare-compatible deployment with D1-backed lead storage and adapter-based integrations.'],['Access and operations','Private lead data must not be exposed publicly. CRM sync failures should not cause data loss.'],['Review','Security controls should be reviewed before production traffic and whenever new integrations are enabled.']] });
Object.assign(pages['trust/compliance'], { title: 'Compliance Disclosure', description: 'A practical disclosure of Pathwisse compliance readiness and review status.', sections: [['Current status','Compliance content on this website is informational and should be reviewed before external procurement or enterprise security review use.'],['Data handling','Lead data is stored first, then adapter-based sync can send records to CRM, email, or automation systems when configured.'],['Customer data','Do not publish customer logos, testimonials, or case study outcomes unless they are approved.'],['Procurement readiness','Enterprise security, privacy, and compliance questionnaires should be answered from verified operational controls.']] });
Object.assign(pages['trust/dpdp'], { title: 'DPDP Policy', description: 'India DPDP-oriented privacy and consent principles for Pathwisse public experiences.', sections: [['Consent','Public forms include explicit consent for Pathwisse to respond to the submitted request. Optional analytics are separate from essential website operation.'],['Purpose limitation','Form data should be used for the purpose stated by the page, such as demo requests, audits, waitlists, events, or partnership enquiries.'],['Data principal rights','Pathwisse should provide a process for access, correction, and deletion requests before production data collection at scale.'],['Legal review','This DPDP page is a readiness draft and should be reviewed by counsel.']] });

Object.assign(pages['pricing/students'], { title: 'Student Pricing', description: 'Self-serve student access for career direction, roadmaps, practice, projects, and readiness.', sections: [['Self-serve plan','Student pricing is structured for self-serve access to direction, roadmaps, skill practice, and project evidence. Final public prices should be published only after approval.'],['Included capabilities','Career audit, role roadmaps, skills, projects, readiness guidance, and Career Voice entry points.'],['When to contact','Students can start directly; college cohorts should use college partnership pricing.']] });
Object.assign(pages['pricing/colleges'], { title: 'College Pricing', description: 'Sales-assisted pricing based on cohort size, readiness scope, implementation, and support.', sections: [['Pricing model','College pricing should be sales-assisted because cohort size, departments, reporting needs, implementation, and support vary.'],['Typical scope','Readiness audit, career accelerator, placement analytics, faculty workflows, and implementation support.'],['Next step','Request a college demo with cohort context and placement challenges.']], href: '/colleges/request-demo' });
Object.assign(pages['pricing/enterprise'], { title: 'Enterprise Pricing', description: 'Sales-assisted pricing for workforce assessment, upskilling, AI readiness, and talent intelligence.', sections: [['Pricing model','Enterprise pricing should be sales-assisted because employee count, roles, integrations, and rollout scope vary.'],['Typical scope','Workforce assessment, role-based upskilling, capability maps, analytics, internal mobility, and hiring intelligence waitlist.'],['Next step','Request an enterprise demo with skills needed, L&D stack, and timeline.']], href: '/enterprise/request-demo' });

const resourceUpdates: Record<string, [string,string][]> = {
  'resources/guides': [['Placement readiness report','A practical guide for identifying skill gaps, project evidence, and readiness movement before placement season.'],['AI readiness report','A workforce guide for mapping AI-related skills to roles and applied projects.']],
  'resources/templates': [['Student employability audit template','A template for placement teams to review readiness by skill, project, and role target.'],['Placement-team checklist','A checklist for moving from late placement-season panic to continuous support.']],
  'resources/reports': [['Campus-to-career benchmark','A report framework for comparing cohort readiness, gaps, and intervention needs.'],['Placement dashboard sample','A sample dashboard outline for readiness, skill gaps, and cohort progress.']],
  'resources/webinars': [['Career direction webinar','A student-focused session on choosing roles and building proof.'],['Placement readiness webinar','A college-focused session on cohort visibility and interventions.']],
  'resources/case-studies': [['Customer proof policy','Approved logos, quotes, and outcomes will be published only after explicit customer approval.'],['Current state','No unapproved testimonials or fabricated outcomes are shown.']],
  'resources/career-guides': [['Data Analyst guide','Skills, projects, and interview preparation for analytics roles.'],['Business Analyst guide','Requirements, process work, communication, and role readiness.']],
  'resources/placement-guides': [['Readiness audit guide','How placement teams can inspect readiness before shortlisting.'],['Project evidence guide','How colleges can make applied work useful for placement conversations.']],
};
for (const [slug, items] of Object.entries(resourceUpdates)) Object.assign(pages[slug], { sections: items.map(([a,b]) => [a,b] as [string,string]), cta: 'Request this resource', href: '/contact?interest=events' });
for (const slug of ['customers','customers/students','customers/colleges','customers/enterprises','customers/case-studies/sample']) Object.assign(pages[slug], { noindex: true, sections: [['Proof policy','Pathwisse will not publish fake logos, testimonials, numbers, or outcomes.'],['Current state','Customer proof pages remain available as draft-like placeholders until approved stories are ready.'],['Next step','Use case study templates internally, then publish only verified customer-approved evidence.']] });
export const hubs: Record<string, HubData> = {
  product: { title: 'Products', description: 'Explore Pathwisse products across direction, practice, projects, readiness, analytics, and integrations.', items: productPages.filter(p => p.slug !== 'product').map(p => p.slug) },
  careers: { title: 'Career roadmaps', description: 'Role pages that connect responsibilities, skills, projects, interview preparation, and next steps.', items: careers.map(c => `careers/${c.slug}`) },
  skills: { title: 'Skill guides', description: 'Skill pages that connect learning progression, practice, projects, careers, and resources.', items: skills.map(s => `skills/${s.slug}`) },
  compare: { title: 'Career comparisons', description: 'Compare roles by responsibilities, skills, tools, projects, learning curve, and transition paths.', items: comparisonPages.map(p => p.slug) },
  'resources/blog/category': { title: 'Blog categories', description: 'Browse Pathwisse articles by category.', items: ['resources/blog/category/career-direction'] },
  'resources/blog/tag': { title: 'Blog tags', description: 'Browse Pathwisse articles by tag.', items: ['resources/blog/tag/career-roadmaps'] },
};

export const searchable = [...Object.values(pages), ...Object.entries(hubs).map(([slug, hub]) => ({ slug, title: hub.title, description: hub.description }))];
export const indexablePaths = [...Object.entries(pages).filter(([, p]) => !p.draft && !p.noindex && p.status === 'published').map(([slug]) => slug), ...Object.keys(hubs)];

