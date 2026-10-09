'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HOMEPAGE_FAQS } from './faq-data';

export function FAQSection() {
  return (
    <section
      id="faq"
      className="py-20 px-6 sm:px-8 max-w-4xl mx-auto scroll-mt-20 border-t border-[#edf2f7]"
      aria-label="Frequently asked questions"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2458ae] bg-[#edf4fc] px-3 py-1 rounded-full inline-block mb-3 border border-[#d6e5f8]">
          CLEAR ANSWERS
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-['Outfit'] tracking-tight text-[#0f172a]">
          Frequently Asked Questions
        </h2>
        <p className="text-base text-[#475569] mt-3 max-w-xl mx-auto">
          Everything you need to know about the Pathwisse capability ecosystem across students, colleges, and hiring enterprises.
        </p>
      </div>

      <div className="space-y-4">
        {HOMEPAGE_FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] open:bg-white open:border-[#cbd5e1] open:shadow-xs transition-colors p-5 sm:p-6"
          >
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-base sm:text-lg text-[#0f172a] select-none">
              <span>{faq.question}</span>
              <span className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] group-open:rotate-180 group-open:text-[#2458ae] transition-transform">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="pt-4 text-sm sm:text-base text-[#475569] leading-relaxed border-t border-[#f1f5f9] mt-4">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
