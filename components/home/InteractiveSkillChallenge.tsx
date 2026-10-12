'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  prompt: string;
  options: { key: string; label: string }[];
  correctKey: string;
  explanation: string;
  hint: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Product Management',
    question: 'Which skill is most important for a Product Manager?',
    prompt: 'Choose the best answer to see instant feedback.',
    options: [
      { key: 'A', label: 'Figma' },
      { key: 'B', label: 'User Research' },
      { key: 'C', label: 'Docker' },
      { key: 'D', label: 'C++' },
    ],
    correctKey: 'B',
    explanation:
      'User research helps product managers understand real user needs, discover validated problem spaces, and make better prioritization decisions.',
    hint: 'Think about which capability directly uncovers what users actually need before building features.',
  },
  {
    id: 2,
    category: 'Product Strategy & Growth',
    question: 'Your product has high sign-ups but poor user retention. What should you investigate first?',
    prompt: 'Choose the best answer to see instant feedback.',
    options: [
      { key: 'A', label: 'Add more features' },
      { key: 'B', label: 'Understand why users stop using the product' },
      { key: 'C', label: 'Increase advertising' },
      { key: 'D', label: 'Redesign the logo' },
    ],
    correctKey: 'B',
    explanation:
      'Investigating churn patterns and qualitative drop-off feedback identifies friction before spending resources on acquisition or extra features.',
    hint: 'Adding more water to a leaky bucket does not fix the leak.',
  },
  {
    id: 3,
    category: 'Backend Architecture',
    question: 'Your database query takes 1.8s under heavy traffic. What is the highest-leverage first step?',
    prompt: 'Choose the best answer to see instant feedback.',
    options: [
      { key: 'A', label: 'Re-write the entire backend in Rust' },
      { key: 'B', label: 'Run EXPLAIN ANALYZE and evaluate index coverage' },
      { key: 'C', label: 'Upgrade the database hardware immediately' },
      { key: 'D', label: 'Disable database transactions' },
    ],
    correctKey: 'B',
    explanation:
      'Running EXPLAIN ANALYZE reveals full table scans and missing indexes, typically resolving latency bottlenecks in minutes without costly infrastructure changes.',
    hint: 'Diagnose where the engine is spending its execution cycles before changing hardware or languages.',
  },
];

export function InteractiveSkillChallenge() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQ = QUESTIONS[currentIdx];
  const isCorrect = selectedKey === currentQ.correctKey;

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    setHasAnswered(true);
  };

  const handleNext = () => {
    setSelectedKey(null);
    setHasAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  const handleReset = () => {
    setSelectedKey(null);
    setHasAnswered(false);
  };

  return (
    <section
      id="try-it-yourself"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-slate-100"
    >
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-100/30 via-indigo-100/20 to-teal-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Try It Yourself
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-slate-900 leading-[1.14]">
          Experience how Pathwisse helps you{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            build a skill.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 font-normal mt-3 leading-relaxed">
          Solve a quick challenge and see how learning, feedback and verification work.
        </p>
      </div>

      {/* Brilliant.org Inspired Interactive Challenge Card */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-10 transition-all">
        {/* Top Progress Bar & Category */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-mono font-semibold tracking-wider text-slate-500 uppercase">
              {currentQ.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Question {currentIdx + 1} of {QUESTIONS.length}
            </span>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden flex">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-all duration-300 ${
                    i <= currentIdx ? 'bg-blue-600' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Question & Multiple Choice Options */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
                {currentQ.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {currentQ.prompt}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isThisSelected = selectedKey === opt.key;
                const isThisCorrect = opt.key === currentQ.correctKey;

                let stateClasses =
                  'bg-slate-50/80 hover:bg-slate-100/80 text-slate-700 border-slate-200/80';
                if (hasAnswered) {
                  if (isThisSelected && isCorrect) {
                    stateClasses =
                      'bg-blue-50 text-blue-900 border-blue-400 ring-2 ring-blue-500/20';
                  } else if (isThisSelected && !isCorrect) {
                    stateClasses =
                      'bg-rose-50 text-rose-900 border-rose-300 ring-2 ring-rose-500/20';
                  } else if (isThisCorrect) {
                    stateClasses =
                      'bg-emerald-50 text-emerald-900 border-emerald-300';
                  } else {
                    stateClasses = 'opacity-50 bg-slate-50 text-slate-400 border-slate-100';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelect(opt.key)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border text-left text-sm font-medium transition-all duration-200 ${stateClasses} cursor-pointer group`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        isThisSelected && isCorrect
                          ? 'bg-blue-600 text-white'
                          : isThisSelected && !isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 group-hover:border-slate-300'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Instant Feedback & Explanation Panel */}
          <div className="lg:col-span-5 min-h-[220px] flex flex-col justify-between">
            {hasAnswered ? (
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 animate-in fade-in-50 ${
                  isCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="text-emerald-600" size={20} />
                      <span className="text-base font-bold text-emerald-800">
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="text-amber-600" size={20} />
                      <span className="text-base font-bold text-amber-800">
                        Not quite yet
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 mb-6 font-normal">
                  {isCorrect ? currentQ.explanation : currentQ.hint}
                </p>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60">
                  {!isCorrect && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <RotateCcw size={13} />
                      Try again
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>Next question</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center text-slate-400 min-h-[220px]">
                <Sparkles size={24} className="text-slate-300 mb-2" />
                <span className="text-xs font-medium text-slate-500">
                  Select an answer on the left
                </span>
                <span className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                  Experience real-time diagnostic evaluation and reasoning.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
