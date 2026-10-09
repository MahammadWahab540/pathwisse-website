'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Terminal,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { APP_AUTH_URL } from '@/lib/site-config';
import { STUDENT_OUTCOME_CARDS, StudentOutcomeCard } from './cards-data';

export { STUDENT_OUTCOME_CARDS, type StudentOutcomeCard };

export function PerspectiveCardsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  // Animation and physics state
  const stateRef = useRef({
    aimX: 0,
    aimY: 0,
    curX: 0,
    curY: 0,
    clock: 0,
    last: 0,
    raf: 0,
    hover: new Array(STUDENT_OUTCOME_CARDS.length).fill(0),
    hoverAim: new Array(STUDENT_OUTCOME_CARDS.length).fill(0),
  });

  const cardsCount = STUDENT_OUTCOME_CARDS.length;

  // Mathematics mirroring the Framer perspective card layout algorithm
  const computeCardTransform = (index: number, card: StudentOutcomeCard, containerW: number, containerH: number) => {
    const s = stateRef.current;
    const baseAngle = -140 * (Math.PI / 180);
    const angleStep = (Math.PI * 2) / cardsCount;
    const angle = baseAngle + index * angleStep;

    const spreadX = 74; // Spread width percentage
    const spreadY = 72; // Spread height percentage
    const ux = (Math.cos(angle) * spreadX) / 200;
    const uy = (Math.sin(angle) * spreadY) / 200;

    const baseDepth = card.depth;
    const zn = baseDepth * 0.7 + Math.sin(angle) * 0.3;
    const range = 240; // Depth range in px

    const scaleFactor = Math.min(Math.max(containerW / 1200, 0.45), 1);
    const tilt = 26; // Tilt intensity in degrees
    const rotX = -Math.sin(angle) * tilt;
    const rotY = Math.cos(angle) * tilt;
    const rotZ = ((index % 3) - 1) * 4;

    // Parallax mouse offsets
    const parallaxStrength = 36 * scaleFactor;
    const parallaxDepth = 0.8;
    const depthMultiplier = Math.max(0.2, 1 + zn * parallaxDepth);
    const px = -s.curX * parallaxStrength * depthMultiplier;
    const py = -s.curY * parallaxStrength * depthMultiplier;

    // Float oscillation
    const floatAmount = 5 * scaleFactor;
    const floatOffset = Math.sin(s.clock * 1.4 + index * 1.2) * floatAmount;

    // Hover dynamic values
    const hoverVal = s.hover[index] || 0;
    const hoverLift = 65 * scaleFactor * hoverVal;
    const hoverScale = 1 + 0.08 * hoverVal;
    const flattenFactor = 1 - 0.5 * hoverVal;

    const posX = ux * containerW + px;
    const posY = uy * containerH + py + floatOffset;
    const posZ = zn * range * scaleFactor + hoverLift;

    return {
      transform: `translate(-50%, -50%) translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, ${posZ.toFixed(2)}px) rotateX(${(rotX * flattenFactor).toFixed(2)}deg) rotateY(${(rotY * flattenFactor).toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${hoverScale.toFixed(3)})`,
      opacity: 1 - Math.max(0, -zn) * 0.25,
      zIndex: Math.round(posZ + 300),
    };
  };

  useEffect(() => {
    let active = true;

    const loop = (timestamp: number) => {
      if (!active) return;
      const s = stateRef.current;
      const delta = s.last ? Math.min(0.05, (timestamp - s.last) / 1000) : 0.016;
      s.last = timestamp;
      s.clock += delta;

      // Smooth mouse interpolation
      const smooth = 1 - Math.exp(-delta * 6);
      s.curX += (s.aimX - s.curX) * smooth;
      s.curY += (s.aimY - s.curY) * smooth;

      // Smooth hover interpolation
      const hoverSmooth = 1 - Math.exp(-delta * 12);
      for (let i = 0; i < cardsCount; i++) {
        s.hover[i] += (s.hoverAim[i] - s.hover[i]) * hoverSmooth;
      }

      // Apply transforms
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;

        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const card = STUDENT_OUTCOME_CARDS[idx];
          const t = computeCardTransform(idx, card, w, h);
          el.style.transform = t.transform;
          el.style.opacity = String(t.opacity);
          el.style.zIndex = String(t.zIndex);
        });

        // Stage 3D tilt
        if (stageRef.current) {
          const tiltDeg = 3.5;
          stageRef.current.style.transform = `rotateX(${(-s.curY * tiltDeg).toFixed(2)}deg) rotateY(${(s.curX * tiltDeg).toFixed(2)}deg)`;
        }
      }

      s.raf = requestAnimationFrame(loop);
    };

    stateRef.current.last = performance.now();
    stateRef.current.raf = requestAnimationFrame(loop);

    return () => {
      active = false;
      cancelAnimationFrame(stateRef.current.raf);
    };
  }, [cardsCount]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    stateRef.current.aimX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    stateRef.current.aimY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
  };

  const handlePointerLeave = () => {
    stateRef.current.aimX = 0;
    stateRef.current.aimY = 0;
  };

  const setHoverIndex = (index: number, val: number) => {
    stateRef.current.hoverAim[index] = val;
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedCardIndex === null) return;
    if (e.key === 'Escape') {
      setSelectedCardIndex(null);
    } else if (e.key === 'ArrowLeft') {
      setSelectedCardIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : cardsCount - 1));
    } else if (e.key === 'ArrowRight') {
      setSelectedCardIndex((prev) => (prev !== null && prev < cardsCount - 1 ? prev + 1 : 0));
    }
  }, [selectedCardIndex, cardsCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[820px] md:h-[920px] lg:h-[960px] overflow-hidden select-none bg-gradient-to-b from-[#FAFBFD] via-[#F4F7FC] to-[#FFFFFF]"
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Background radial atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(37, 99, 235, 0.07) 0%, rgba(248, 250, 252, 0) 65%)',
        }}
      />

      {/* 3D Perspective Stage holding the orbiting outcome cards */}
      <div 
        ref={stageRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {STUDENT_OUTCOME_CARDS.map((card, idx) => {
          const Icon = card.icon;
          const baseSize = 160;
          const width = card.shape === 'portrait' ? baseSize * 0.85 : card.shape === 'landscape' ? baseSize * 1.35 : baseSize;
          const height = card.shape === 'portrait' ? baseSize * 1.25 : card.shape === 'landscape' ? baseSize * 0.95 : baseSize;

          return (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              role="button"
              tabIndex={0}
              aria-label={`View outcome: ${card.title}`}
              onClick={() => setSelectedCardIndex(idx)}
              onPointerEnter={() => setHoverIndex(idx, 1)}
              onPointerLeave={() => setHoverIndex(idx, 0)}
              className="absolute left-1/2 top-1/2 pointer-events-auto cursor-pointer focus:outline-none group"
              style={{
                width: `${width * card.size}px`,
                height: `${height * card.size}px`,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
            >
              {/* Perspective Card Surface */}
              <div 
                className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between transition-shadow duration-300 border border-white/20"
                style={{
                  background: card.gradient,
                  boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
                }}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold tracking-wider text-white uppercase">
                    STAGE {card.stageNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-white/25 text-white tracking-widest uppercase backdrop-blur-md">
                      DEMO
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Card Main Details */}
                <div>
                  <span className="text-[10px] font-semibold text-white/70 block uppercase tracking-wide mb-1">
                    {card.stageName}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-white/80 line-clamp-2 mt-1 leading-snug">
                    {card.caption}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-white/90 font-medium">
                  <span>{card.metrics}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#173c6e] transition-colors">
                    <ArrowRight className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>

              {/* Outside Subtle Label */}
              <div 
                className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-[11px] font-semibold text-[#142e50] block tracking-tight">
                  {card.title}
                </span>
                <span className="text-[9px] text-[#708093] block">
                  {card.caption}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Statement / Hero Overlay (S01 Verbatim Headline & Primary CTA) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6">
        <div className="max-w-[620px] text-center flex flex-col items-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#e1e7ec] shadow-sm mb-5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#2458ae] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#142e50]">
              The Student Capability Engine
            </span>
          </div>

          {/* S01 Master Headline (Verbatim) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#142e50] leading-[1.05] mb-5">
            DON&apos;T JUST LEARN. <br />
            <span className="text-[#2458ae]">PROVE WHAT YOU CAN DO.</span>
          </h1>

          {/* Subtitle / Body Copy */}
          <p className="text-base sm:text-lg text-[#586a80] leading-relaxed max-w-[500px] mb-8">
            From your very first career audit to verified project evidence and direct employer shortlists. Built for ambitious students who want their work to speak for itself.
          </p>

          {/* S01 Primary CTA: Start Your Path */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-3">
            <a
              href={APP_AUTH_URL}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #173c6e 0%, #2563eb 100%)',
                boxShadow: '0 12px 30px -5px rgba(37, 99, 235, 0.45)',
              }}
            >
              <span>Start Your Path</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <a
              href="#journey-breakdown"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm text-[#142e50] bg-white/80 hover:bg-white border border-[#dce5ef] shadow-sm transition-all"
            >
              <span>Explore The 7 Stages</span>
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-[#708093]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Verified evidence
            </span>
            <span>•</span>
            <span>Free student diagnostic</span>
            <span>•</span>
            <span>Zero resume fluff</span>
          </div>
        </div>
      </div>

      {/* Perspective Card Detail Modal with S11 Real Product UI Mockups & Demo Badges */}
      {selectedCardIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0b0e]/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCardIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-modal-title"
        >
          <div 
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#e5eaf0] shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCardIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors focus:ring-2 focus:ring-[#2458ae] focus:outline-none"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {(() => {
              const card = STUDENT_OUTCOME_CARDS[selectedCardIndex];
              const Icon = card.icon;
              const mockup = card.demoMockup;

              return (
                <div className="space-y-6">
                  {/* Modal Header */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md"
                      style={{ background: card.gradient }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2458ae]">
                          {card.badge}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          SAMPLE PREVIEW
                        </span>
                      </div>
                      <h2 id="student-modal-title" className="text-2xl font-extrabold text-[#142e50] tracking-tight">
                        {card.title}
                      </h2>
                      <p className="text-xs font-semibold text-[#2458ae]">
                        {card.caption}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#586a80] leading-relaxed">
                    {card.description}
                  </p>

                  {/* S11 Real Product UI Mockup Box with Sample Demo Badge */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 p-4 sm:p-5 shadow-inner space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                          {mockup.title}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {mockup.badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{mockup.subtitle}</span>
                    </div>

                    {/* Metric Cards Row */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {mockup.metrics.map((m, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
                          <span className="block text-[10px] font-mono text-slate-400">{m.label}</span>
                          <span className="block text-xs font-bold text-white mt-0.5">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Terminal / Code / Output preview */}
                    <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-start gap-2">
                      <Terminal className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-500" />
                      <span className="line-clamp-2">{mockup.codeOrOutput}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mockup.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Capability Outcomes Checklist */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                    <b className="text-xs font-bold uppercase tracking-wider text-[#142e50]">
                      Key Capability Outcomes
                    </b>
                    <ul className="space-y-2">
                      {card.details.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#334155] leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Modal Footer Controls */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCardIndex((prev) => (prev! > 0 ? prev! - 1 : cardsCount - 1))}
                        className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#2458ae]"
                        aria-label="Previous card"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-xs font-semibold text-slate-500">
                        {selectedCardIndex + 1} of {cardsCount}
                      </span>
                      <button
                        onClick={() => setSelectedCardIndex((prev) => (prev! < cardsCount - 1 ? prev! + 1 : 0))}
                        className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#2458ae]"
                        aria-label="Next card"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <a
                      href={APP_AUTH_URL}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#173c6e] hover:bg-[#2563eb] transition-colors shadow-md hover:shadow-lg"
                    >
                      <span>Start Your Path</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
