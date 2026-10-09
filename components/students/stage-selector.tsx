'use client';

import React, { useState, useEffect } from 'react';
import { STUDENT_OUTCOME_CARDS } from './cards-data';

export function StageSelector() {
  const [activeStageId, setActiveStageId] = useState<string>('career-direction');

  // Track active stage as user scrolls
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-stage-id');
          if (id) setActiveStageId(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1,
    });

    STUDENT_OUTCOME_CARDS.forEach((card) => {
      const el = document.getElementById(`stage-${card.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleStageClick = (cardId: string) => {
    setActiveStageId(cardId);
    const element = document.getElementById(`stage-${cardId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      aria-label="Capabilities Navigation" 
      className="border-y border-[#e5eaf0] bg-[#f8fafc] py-6 sticky top-16 sm:top-20 z-20 backdrop-blur-md bg-[#f8fafc]/95"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2458ae] block">
              7 CAPABILITIES SEQUENCE
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#142e50] tracking-tight">
              Interactive Stage Selector
            </h2>
          </div>

          {/* Interactive Horizontal Scroll Selector */}
          <nav 
            className="flex items-center gap-2 overflow-x-auto py-1 w-full lg:w-auto scrollbar-none touch-pan-x pl-0.5 pr-2"
            aria-label="Student 7 capability stages"
          >
            {STUDENT_OUTCOME_CARDS.map((card, idx) => {
              const isActive = activeStageId === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleStageClick(card.id)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2458ae] ${
                    isActive
                      ? 'bg-[#173c6e] text-white shadow-md scale-[1.02]'
                      : 'bg-white text-[#142e50] hover:bg-slate-100 border border-[#dce4ee]'
                  }`}
                >
                  <span 
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive ? 'bg-white text-[#173c6e]' : 'bg-[#173c6e] text-white'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{card.stageName}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
