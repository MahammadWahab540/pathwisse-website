import { Header, Footer } from '@/app/site';
import { IntentLeadForm } from '@/components/forms/IntentLeadForm';
import { CheckCircle2, ShieldCheck, Sparkles, Building2, TrendingUp, Users } from 'lucide-react';

export const metadata = {
  title: 'Request Enterprise Demo | Pathwisse',
  description: 'Request a Pathwisse enterprise demo for early-career talent intelligence, candidate verification, and evidence-based technical hiring.',
};

export default function Page() {
  const highlights = [
    {
      title: 'Inspectable candidate evidence',
      description: 'Review verifiable technical project portfolios, design trade-offs, and architecture decisions before scheduling screens.',
      icon: ShieldCheck,
    },
    {
      title: 'Role-calibrated readiness scores',
      description: 'Match candidate proof against your specific junior and associate engineering benchmarks with zero resume keyword noise.',
      icon: TrendingUp,
    },
    {
      title: 'Accelerated technical hiring',
      description: 'Skip 1,000 uncalibrated applicants and shortlist evaluated candidates who can contribute from day one.',
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
                  <Building2 className="w-3.5 h-3.5 text-[#2458ae]" />
                  Talent Intelligence
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#142e50] tracking-tight leading-[1.08] mb-5">
                  Hire with evidence. <br />
                  <span className="text-[#2458ae]">Inspect capability.</span>
                </h1>
                <p className="text-base sm:text-lg text-[#586a80] leading-relaxed">
                  Tell us about your open engineering roles and hiring timeline. Our solutions team will configure a dedicated walkthrough of our candidate dossiers and verification platform.
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
                  SOC 2 & ISO Ready
                </span>
                <span>•</span>
                <span>Response within 24 business hours</span>
              </div>
            </div>

            {/* Right Column: Framer-Inspired Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 md:p-12 shadow-xl shadow-[#142e50]/5">
                <IntentLeadForm variant="enterprise" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
