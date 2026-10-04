import { Header, Footer } from '@/app/site';
import { IntentLeadForm } from '@/components/forms/IntentLeadForm';
import { CheckCircle2, GraduationCap, BarChart3, Users, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Request College Demo | Pathwisse',
  description: 'Request a Pathwisse demo for student readiness, placement analytics, and institutional partnership.',
};

export default function Page() {
  const highlights = [
    {
      title: 'Real-time cohort capability diagnostics',
      description: 'Audit technical strengths, framework proficiencies, and readiness deficits across entire departments before recruiters arrive.',
      icon: BarChart3,
    },
    {
      title: 'Targeted placement acceleration',
      description: 'Replace generic training workshops with milestone-driven sprints calibrated to tier-1 employer hiring standards.',
      icon: GraduationCap,
    },
    {
      title: 'Zero resume fluff, 100% verified proof',
      description: 'Empower students to present verifiable code architectures, Git repositories, and automated evaluation badges directly to visiting recruiters.',
      icon: Sparkles,
    },
  ];

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-[#FAFBFD] py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Context, Trust & Value Proposition */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173c6e]/10 text-[#173c6e] text-xs font-bold uppercase tracking-wider mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2458ae]" />
                  Institutional Partnership
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#142e50] tracking-tight leading-[1.08] mb-5">
                  Measure readiness. <br />
                  <span className="text-[#2458ae]">Elevate placements.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#586a80] leading-relaxed">
                  Share your cohort size, target graduation year, and placement goals. Our academic solutions team will prepare a customized cohort audit walkthrough for your campus.
                </p>
              </div>

              <div className="space-y-5 pt-6 border-t border-[#e2e8f0]">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-center shrink-0 text-[#2458ae]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-[#142e50] leading-snug">
                          {item.title}
                        </h2>
                        <p className="text-xs text-[#586a80] leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-between text-xs text-[#586a80]">
                <span className="flex items-center gap-1.5 font-semibold text-[#142e50]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Campus-Wide Diagnostics
                </span>
                <span>•</span>
                <span>Response within 24 business hours</span>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 md:p-12 shadow-xl shadow-[#142e50]/5">
                <IntentLeadForm variant="college" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

