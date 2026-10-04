import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/app/site';
import { absoluteUrl, CAREER_VOICE_URL, APP_AUTH_URL } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/shared/CTABand';
import { ArrowRight, CheckCircle2, Split, Sparkles, BookOpen } from 'lucide-react';

interface ComparisonData {
  title: string;
  roleA: {
    name: string;
    tagline: string;
    focus: string;
    skills: string[];
    typicalDay: string;
    bestFor: string;
  };
  roleB: {
    name: string;
    tagline: string;
    focus: string;
    skills: string[];
    typicalDay: string;
    bestFor: string;
  };
  matrix: {
    dimension: string;
    roleAVal: string;
    roleBVal: string;
  }[];
  verdict: {
    chooseAIf: string[];
    chooseBIf: string[];
  };
}

const COMPARISONS: Record<string, ComparisonData> = {
  'data-analyst-vs-business-analyst': {
    title: 'Data Analyst vs Business Analyst: Which Path Fits You?',
    roleA: {
      name: 'Data Analyst',
      tagline: 'Translates raw database rows into actionable metric dashboards.',
      focus: 'Data extraction, SQL pipelines, exploratory analysis, and visualization.',
      skills: ['SQL & Joins', 'Tableau / Power BI', 'Python (pandas)', 'Statistical modeling'],
      typicalDay: 'Querying analytical warehouses, validating metric accuracy, creating dashboards, and investigating anomalies.',
      bestFor: 'Learners who enjoy quantitative logic, working in SQL, and discovering numerical truths.',
    },
    roleB: {
      name: 'Business Analyst',
      tagline: 'Translates messy organizational problems into concrete system requirements.',
      focus: 'Stakeholder interviews, requirements memos, process flows, and strategic decision support.',
      skills: ['Business case synthesis', 'Process modeling', 'Basic SQL & Excel', 'Cross-functional communication'],
      typicalDay: 'Facilitating requirement workshops with business heads, mapping user journeys, and prioritizing product backlogs.',
      bestFor: 'Learners who love communication, organizational strategy, and bridging technical and business domains.',
    },
    matrix: [
      { dimension: 'Primary Output', roleAVal: 'Clean dashboards, SQL pipelines & analysis memos', roleBVal: 'PRDs, process maps & stakeholder alignment' },
      { dimension: 'Core Tooling', roleAVal: 'PostgreSQL, Snowflake, Power BI, Python', roleBVal: 'Jira, Confluence, Lucidchart, Excel, SQL' },
      { dimension: 'Technical Depth', roleAVal: 'Moderate to High (Coding & complex queries)', roleBVal: 'Low to Moderate (Logic & systems thinking)' },
      { dimension: 'Career Trajectory', roleAVal: 'Senior Analyst → Analytics Engineer → Data Scientist', roleBVal: 'Senior BA → Product Manager → Strategy Lead' },
    ],
    verdict: {
      chooseAIf: [
        'You prefer working with data structures, querying tables, and writing code.',
        'You enjoy finding objective root causes in numbers rather than managing opinions.',
        'You want a clear path toward Analytics Engineering or Data Science.'
      ],
      chooseBIf: [
        'You thrive on interacting with diverse stakeholders and guiding strategic direction.',
        'You enjoy writing structured documentation, user stories, and feature specs.',
        'You are interested in evolving toward Product Management or Business Leadership.'
      ]
    }
  },
  'product-manager-vs-business-analyst': {
    title: 'Product Manager vs Business Analyst: Roles, Ownership & Trajectory',
    roleA: {
      name: 'Product Manager',
      tagline: 'Owns the "Why" and "What" of what engineering builds.',
      focus: 'User research, feature prioritization, roadmap strategy, and business outcomes.',
      skills: ['Product Discovery', 'Roadmap prioritisations', 'User interviews', 'Metrics evaluation'],
      typicalDay: 'Prioritizing sprint goals, reviewing customer feedback with designers, analyzing adoption drop-off, and aligning leadership.',
      bestFor: 'Entrepreneurs, strategic thinkers, and leaders comfortable with high ambiguity.',
    },
    roleB: {
      name: 'Business Analyst',
      tagline: 'Owns the detailed functional requirements and execution specification.',
      focus: 'Process modeling, technical specification, edge cases, and business workflow.',
      skills: ['Functional specifications', 'Data modeling', 'Process architecture', 'Acceptance criteria'],
      typicalDay: 'Writing detailed acceptance criteria, clarifying edge cases for developers, and auditing process bottlenecks.',
      bestFor: 'Detail-oriented thinkers who excel at clarity, systems architecture, and structured execution.',
    },
    matrix: [
      { dimension: 'Accountability', roleAVal: 'Product success, adoption & business ROI', roleBVal: 'Requirement clarity, process adherence & delivery accuracy' },
      { dimension: 'Ambiguity Level', roleAVal: 'Very High (Defining problems from scratch)', roleBVal: 'Moderate (Solving predefined business problems)' },
      { dimension: 'Primary Partner', roleAVal: 'Designers, Tech Leads & Executive Sponsors', roleBVal: 'Engineers, QA Teams & Domain Subject Experts' },
      { dimension: 'Key Metric', roleAVal: 'Retention, Conversion, Feature Adoption', roleBVal: 'Sprint velocity, Spec completeness, Defect reduction' },
    ],
    verdict: {
      chooseAIf: [
        'You want to decide which problems the team should solve and own customer outcomes.',
        'You are energized by talking to customers, testing hypotheses, and setting strategy.',
        'You enjoy high-responsibility leadership without direct managerial authority.'
      ],
      chooseBIf: [
        'You love digging into the details, workflows, edge cases, and explicit requirements.',
        'You prefer a well-defined problem space with concrete operational criteria.',
        'You want to be the authoritative bridge between software developers and business owners.'
      ]
    }
  },
  'data-scientist-vs-data-analyst': {
    title: 'Data Scientist vs Data Analyst: Machine Learning vs Business Signals',
    roleA: {
      name: 'Data Scientist',
      tagline: 'Builds predictive models and automated machine learning systems.',
      focus: 'Statistical learning, predictive modeling, NLP, and model evaluation.',
      skills: ['Python / PyTorch', 'Mathematics & Probability', 'Feature Engineering', 'Model Deployment'],
      typicalDay: 'Training predictive algorithms, validating training sets against drift, and building production inference pipelines.',
      bestFor: 'Individuals with strong mathematics backgrounds who enjoy algorithmic experimentation.',
    },
    roleB: {
      name: 'Data Analyst',
      tagline: 'Answers historical business questions with verified metric proofs.',
      focus: 'Explaining what happened, diagnosing why it happened, and measuring business impact.',
      skills: ['SQL & Joins', 'Dashboard Design', 'Business intuition', 'Data storytelling'],
      typicalDay: 'Analyzing customer cohorts, creating leadership KPI decks, and advising executives on product changes.',
      bestFor: 'Learners who want fast feedback loops, direct business impact, and practical data problem solving.',
    },
    matrix: [
      { dimension: 'Primary Goal', roleAVal: 'Predict future outcomes with ML algorithms', roleBVal: 'Explain current and historical performance' },
      { dimension: 'Prerequisites', roleAVal: 'Linear algebra, calculus, advanced algorithms', roleBVal: 'Relational logic, SQL, business metrics' },
      { dimension: 'Time to Employment', roleAVal: 'Longer (requires specialized depth)', roleBVal: 'Faster (focused, high-demand entry roles)' },
      { dimension: 'Core Artifact', roleAVal: 'Trained model, feature store, evaluation pipeline', roleBVal: 'Executive dashboard, diagnostic memo, data model' },
    ],
    verdict: {
      chooseAIf: [
        'You have strong foundations in university math, statistics, and programming.',
        'You want to research and train algorithmic models that make automated predictions.',
        'You are willing to spend significant time learning machine learning theory.'
      ],
      chooseBIf: [
        'You want to get into the data industry quickly by mastering SQL and business analytics.',
        'You want to advise product and commercial teams on strategic decisions.',
        'You prefer high-velocity delivery over prolonged model optimization cycles.'
      ]
    }
  }
};

type Props = { params: Promise<{ comparisonSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparisonSlug } = await params;
  const data = COMPARISONS[comparisonSlug];
  if (!data) return { title: 'Comparison Not Found' };

  return {
    title: `${data.title} | Pathwisse`,
    description: `Side-by-side comparison of ${data.roleA.name} and ${data.roleB.name}. Compare tools, responsibilities, career trajectory, and take the guided career audit.`,
    alternates: { canonical: absoluteUrl(`/compare/${comparisonSlug}`) },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { comparisonSlug } = await params;
  const data = COMPARISONS[comparisonSlug];
  if (!data) notFound();

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#f8fafc]">
        {/* Header Section */}
        <section className="bg-white border-b border-[#e2e8f0] pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edf2f8] text-[#173c6e] text-xs font-semibold mb-6 border border-[#d5e0ee]">
              <Split className="w-3.5 h-3.5 text-[#2458ae]" />
              <span>Role Comparison & Decision Framework</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] text-[#0f172a] tracking-tight leading-tight mb-6">
              {data.title}
            </h1>
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Neither role is universally better. Choose the direction that matches how you think, what you enjoy building, and how quickly you want to be job-ready.
            </p>
          </div>
        </section>

        {/* Side-by-Side Dual Profile Cards */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Role A Card */}
            <div className="rounded-2xl border border-[#cbd5e1] bg-white p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173c6e] block mb-2">OPTION A</span>
              <h2 className="text-2xl font-bold font-['Outfit'] text-[#0f172a] mb-2">{data.roleA.name}</h2>
              <p className="text-sm text-[#475569] mb-6 leading-relaxed">{data.roleA.tagline}</p>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-[#0f172a] block mb-1">Core Focus:</strong>
                  <p className="text-[#475569] leading-relaxed">{data.roleA.focus}</p>
                </div>
                <div>
                  <strong className="text-[#0f172a] block mb-1">Key Competencies:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {data.roleA.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-[#edf2f8] text-[#173c6e] font-semibold">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-[#0f172a] block mb-1">Typical Working Day:</strong>
                  <p className="text-[#475569] leading-relaxed">{data.roleA.typicalDay}</p>
                </div>
              </div>
            </div>

            {/* Role B Card */}
            <div className="rounded-2xl border border-[#cbd5e1] bg-white p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae] block mb-2">OPTION B</span>
              <h2 className="text-2xl font-bold font-['Outfit'] text-[#0f172a] mb-2">{data.roleB.name}</h2>
              <p className="text-sm text-[#475569] mb-6 leading-relaxed">{data.roleB.tagline}</p>

              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-[#0f172a] block mb-1">Core Focus:</strong>
                  <p className="text-[#475569] leading-relaxed">{data.roleB.focus}</p>
                </div>
                <div>
                  <strong className="text-[#0f172a] block mb-1">Key Competencies:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {data.roleB.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#2458ae] font-semibold">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-[#0f172a] block mb-1">Typical Working Day:</strong>
                  <p className="text-[#475569] leading-relaxed">{data.roleB.typicalDay}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Matrix Table */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="rounded-2xl border border-[#e2e8f0] bg-white overflow-hidden shadow-xs">
            <div className="p-6 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <h3 className="text-lg font-bold font-['Outfit'] text-[#0f172a]">
                Direct Comparison Matrix
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#fbfcfd] text-[#64748b]">
                    <th className="py-3.5 px-6 font-semibold w-1/4">Dimension</th>
                    <th className="py-3.5 px-6 font-semibold w-3/8 text-[#173c6e]">{data.roleA.name}</th>
                    <th className="py-3.5 px-6 font-semibold w-3/8 text-[#2458ae]">{data.roleB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {data.matrix.map((row) => (
                    <tr key={row.dimension} className="hover:bg-[#f8fafc]">
                      <td className="py-4 px-6 font-semibold text-[#0f172a]">{row.dimension}</td>
                      <td className="py-4 px-6 text-[#334155]">{row.roleAVal}</td>
                      <td className="py-4 px-6 text-[#334155]">{row.roleBVal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Verdict: Choose X If... */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#e2e8f0]">
              <h4 className="text-lg font-bold font-['Outfit'] text-[#0f172a] mb-4">
                Choose {data.roleA.name} If...
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                {data.verdict.chooseAIf.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#e2e8f0]">
              <h4 className="text-lg font-bold font-['Outfit'] text-[#0f172a] mb-4">
                Choose {data.roleB.name} If...
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                {data.verdict.chooseBIf.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2458ae] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <CTABand
          title="Still unsure? Test your direction in 5 minutes."
          description="Take our guided Career Voice audit. Answer diagnostic questions to assess your strengths and get a tailored role recommendation."
          primaryAction={{
            label: "Start Career Voice Audit",
            href: CAREER_VOICE_URL,
            external: true,
          }}
          secondaryAction={{
            label: "Explore All Roadmaps",
            href: "/careers",
          }}
        />
      </main>
      <Footer />
    </>
  );
}
