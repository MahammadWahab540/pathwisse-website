export interface FAQItem {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: 'What is Pathwisse and how does the ecosystem connect the three stakeholders?',
    answer:
      'Pathwisse is a connected capability intelligence platform. For students, it provides structured role roadmaps and verifiable project portfolios. For colleges, it offers real-time cohort readiness diagnostics and placement acceleration. For enterprises, it provides inspectable technical evidence to discover and hire early-career talent without sorting through uncalibrated resumes.',
  },
  {
    question: 'How does capability proof differ from traditional course certificates?',
    answer:
      'Traditional course certificates only prove video completion. Pathwisse capability proof is built on demonstrated project artifacts, architectural trade-offs, code repositories, test pass rates, and consistent deliberate practice that recruiters can audit in under a minute.',
  },
  {
    question: 'What is Career Voice and when should a student use it?',
    answer:
      "Career Voice is Pathwisse's interactive career audit guide accessible via voice or text. It allows students to audit their interests, compare roles, diagnose capability gaps, and define a clear, immediate next action without getting overwhelmed by generic courses.",
  },
  {
    question: 'How do colleges use Pathwisse before campus placement drives begin?',
    answer:
      "Placement cells and faculty use Pathwisse's Placement Cockpit to evaluate cohort skill preparedness months in advance, identify department-wide deficits in areas like DSA or system design, and run targeted acceleration sprints to lift placement percentages.",
  },
  {
    question: 'Can enterprises integrate Pathwisse with existing recruitment workflows?',
    answer:
      'Yes. Enterprises can search candidate dossiers by verified role fit, review technical decision memos and code repositories, and fast-track shortlists directly into their ATS or interviewing pipeline.',
  },
  {
    question: 'Is Pathwisse free for individual students?',
    answer:
      'Students can explore role cards, access foundational roadmaps, and take the initial Career Voice diagnostic for free. Advanced verification sprints and institutional cohort tools are provided through university partnerships and enterprise programs.',
  },
  {
    question: 'How does Pathwisse ensure evaluation integrity and data security?',
    answer:
      'Pathwisse implements DPDP compliance, role-based access control, and strict verification protocols. Every readiness signal is grounded in inspectable code reviews, system design choices, and practice consistency rather than uncalibrated resume claims or multiple-choice tests.',
  },
];
