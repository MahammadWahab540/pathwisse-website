'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { X, Sparkles } from 'lucide-react';

const DIRECTIONS = [
  'up-left',
  'up',
  'up-right',
  'left',
  'center',
  'right',
  'down-left',
  'down',
  'down-right',
] as const;

const REACTIONS = [
  'blink',
  'heart',
  'sparkle',
  'surprised',
  'wink',
  'bashful',
  'sleepy',
  'dizzy',
  'delighted',
] as const;

type Direction = (typeof DIRECTIONS)[number];
type Reaction = (typeof REACTIONS)[number];

const CLOCKWISE: Direction[] = [
  'right',
  'down-right',
  'down',
  'down-left',
  'left',
  'up-left',
  'up',
  'up-right',
];
const SECTOR = (Math.PI * 2) / CLOCKWISE.length;
const HYSTERESIS = 0.12;
const DEAD_ZONE = 70;

const PAYOFFS: Reaction[] = ['heart', 'sparkle', 'delighted'];
const BOOP_PAYOFF = 120;
const BOOP_END = 620;
const SQUASH_MS = 420;
const DIZZY_AFTER = 4;
const DIZZY_WINDOW = 1600;
const DIZZY_END = 1200;

const SQUASH: Keyframe[] = [
  { transform: 'scale(1, 1)', easing: 'ease-in' },
  { transform: 'scale(1.12, 0.84)', offset: 0.18, easing: 'ease-out' },
  { transform: 'scale(0.94, 1.10)', offset: 0.45, easing: 'ease-in-out' },
  { transform: 'scale(1.04, 0.96)', offset: 0.72, easing: 'ease-in-out' },
  { transform: 'scale(1, 1)' },
];

function cell(index: number): CSSProperties {
  return { backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%` };
}

function wrap(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

const layer: CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundSize: '300% 300%',
  backgroundRepeat: 'no-repeat',
};

export type MascotAudience = 'students' | 'colleges' | 'companies' | 'general';

const AUDIENCE_QUOTES: Record<MascotAudience, string[]> = {
  students: [
    "🦉 Don't just watch tutorials—build code you can prove!",
    '✨ 24/24 unit tests passing speaks louder than certificates.',
    '🚀 One clear roadmap sprint at a time. Keep building!',
    '💡 I turn my head wherever your pointer goes! Click me to boop!',
  ],
  colleges: [
    '🦉 Pre-season diagnostics detect skill deficits months before placement drives.',
    '📊 Acceleration sprints give cohorts an average +14.2% placement lift!',
    '🎓 Human review first: support students before they lose momentum.',
    '✨ Defensible student proof dossiers make recruiters take notice!',
  ],
  companies: [
    '🦉 Résumés are uncalibrated claims; inspectable code is proof!',
    '🔍 Review actual Redis job queues, PR diffs, and database schemas.',
    '⚡ Evaluate technical trade-offs before the first interview!',
    '🎯 Zero keyword spam. 100% verified engineering capability!',
  ],
  general: [
    '🦉 Pathwisse connects learning, real work, and opportunities.',
    '✨ Progress is useful. Proof of capability is powerful.',
    '👋 Hi there! Move your cursor and I will watch your pointer!',
  ],
};

export interface PageMascotProps {
  audience?: MascotAudience;
  size?: number;
  className?: string;
  showBubbleOnHover?: boolean;
  bubblePlacement?: 'top' | 'bottom';
  label?: string;
}

/**
 * Interactive Cursor-Tracking Mascot Component
 *
 * Uses two 3x3 sprite sheets (directions and reactions) to follow
 * the user's mouse pointer and react with squash animations and
 * heart/sparkle/dizzy expressions when clicked.
 */
export function PageMascot({
  audience = 'general',
  size = 110,
  className = '',
  showBubbleOnHover = false,
  bubblePlacement = 'bottom',
  label = 'Pathwisse Mascot',
}: PageMascotProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const squashRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<number[]>([]);
  const boopsRef = useRef({ count: 0, at: 0 });

  const [direction, setDirection] = useState<Direction>('center');
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [quoteIdx, setQuoteIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Directions and reactions sprite sheets in /public/mascots/
  const directions = '/mascots/owl-directions.webp';
  const reactions = '/mascots/owl-reactions.webp';

  // Aim towards pointer
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let sector = -1;
    let pointer: { x: number; y: number } | null = null;

    const aim = () => {
      const button = buttonRef.current;
      if (!button || !pointer) return;

      const box = button.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height / 2);

      if (Math.hypot(dx, dy) < DEAD_ZONE) {
        sector = -1;
        setDirection('center');
        return;
      }

      const angle = Math.atan2(dy, dx);
      if (sector !== -1 && Math.abs(wrap(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS) {
        return;
      }

      sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
      setDirection(CLOCKWISE[sector]);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      aim();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', aim, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', aim);
    };
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  const boop = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];

    const later = (ms: number, next: Reaction | null) => {
      timersRef.current.push(window.setTimeout(() => setReaction(next), ms));
    };

    const now = Date.now();
    const boops = boopsRef.current;
    boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1;
    boops.at = now;

    const quotes = AUDIENCE_QUOTES[audience] || AUDIENCE_QUOTES.general;
    const nextText = quotes[quoteIdx % quotes.length];
    setQuoteIdx((prev) => prev + 1);
    setBubbleText(nextText);

    // Auto dismiss quote bubble after 4.5 seconds
    timersRef.current.push(
      window.setTimeout(() => {
        setBubbleText(null);
      }, 4500)
    );

    if (boops.count >= DIZZY_AFTER) {
      boops.count = 0;
      setReaction('dizzy');
      setBubbleText('💫 Whoa, too many boops! Give me a second...');
      later(DIZZY_END, null);
    } else {
      setReaction('blink');
      later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length]);
      later(BOOP_END, null);
    }

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      squashRef.current?.animate(SQUASH, { duration: SQUASH_MS, easing: 'linear' });
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Playful Mascot Speech / Quote Bubble */}
      {(bubbleText || (showBubbleOnHover && isHovered)) && (
        <div
          role="status"
          aria-live="polite"
          className={`absolute ${
            bubblePlacement === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
          } z-30 w-56 sm:w-64 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.12)] text-xs text-slate-800 leading-snug animate-in fade-in zoom-in-95 duration-150 pointer-events-auto`}
        >
          <div className="flex items-start justify-between gap-1 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
              <Sparkles size={11} />
              Qalam Guide
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setBubbleText(null);
              }}
              aria-label="Dismiss message"
              className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
          <p className="text-[11px] font-medium text-slate-700">
            {bubbleText || AUDIENCE_QUOTES[audience][0]}
          </p>
          {/* Comic Arrow Tip */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 ${
              bubblePlacement === 'bottom'
                ? 'bottom-full -mb-1.5 border-t border-l border-slate-200'
                : 'top-full -mt-1.5 border-b border-r border-slate-200'
            }`}
          />
        </div>
      )}

      {/* The Mascot Head */}
      <button
        ref={buttonRef}
        type="button"
        onClick={boop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Boop ${label}`}
        title="Click to boop!"
        style={{
          position: 'relative',
          display: 'block',
          flexShrink: 0,
          width: size,
          height: size,
          padding: 0,
          border: 0,
          background: 'transparent',
          appearance: 'none',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          ref={squashRef}
          style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '100%',
            transformOrigin: '50% 78%',
          }}
        >
          {/* Directions Layer */}
          <span
            style={{
              ...layer,
              backgroundImage: `url(${directions})`,
              ...cell(DIRECTIONS.indexOf(direction)),
              opacity: reaction ? 0 : 1,
            }}
          />
          {/* Reactions Layer */}
          <span
            style={{
              ...layer,
              backgroundImage: `url(${reactions})`,
              ...cell(REACTIONS.indexOf(reaction ?? 'blink')),
              opacity: reaction ? 1 : 0,
            }}
          />
        </span>
      </button>

      {/* Subtle Mascot Label */}
      <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-slate-500 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Click to boop</span>
      </div>
    </div>
  );
}

/**
 * Sticky Floating Mascot that sits at the bottom corner of the viewport
 * and follows the pointer as the user explores the page.
 */
export function FloatingMascot({
  audience = 'general',
}: {
  audience?: MascotAudience;
}) {
  return (
    <aside
      aria-label="Interactive Mascot Companion"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-2 rounded-3xl border border-slate-200 shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
        <PageMascot audience={audience} size={84} bubblePlacement="top" />
      </div>
    </aside>
  );
}
