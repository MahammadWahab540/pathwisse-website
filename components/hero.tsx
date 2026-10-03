'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface HeroProps {
  accent?: string;
  autoplay?: boolean;
}

interface Particle {
  k: number;
  i: number;
  n: number;
  a: number;
  r: number;
  sx: number;
  sy: number;
  ph: number;
  sp: number;
  d: number;
  s: number;
}

interface Dust {
  x: number;
  y: number;
  ph: number;
  sp: number;
  s: number;
  a: number;
  dp: number;
}

interface OpportunityCoord {
  ang: number;
  r: number;
}

function parseRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
  if (!m) return [59, 130, 246];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function Hero({ accent = '#3B82F6', autoplay = true }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [hot, setHot] = useState<number>(-1);

  // Animation internal state holder
  const animRef = useRef<{
    tl: number;
    seek: number | null;
    t: number;
    last: number;
    mx: number | null;
    my: number | null;
    pvx: number;
    pvy: number;
    hot: number;
    hm: [number, number, number];
    stage: number;
    paused: boolean;
    manual: boolean;
    running: boolean;
    W: number;
    H: number;
    dpr: number;
    ctx: CanvasRenderingContext2D | null;
    raf: number;
    accentRgb: [number, number, number];
    rm: boolean;
    ord: Particle[];
    links: [number, number][];
    dust: Dust[];
    co: OpportunityCoord[];
  }>({
    tl: 0,
    seek: null,
    t: 0,
    last: 0,
    mx: null,
    my: null,
    pvx: 0,
    pvy: 0,
    hot: -1,
    hm: [0, 0, 0],
    stage: 0,
    paused: false,
    manual: false,
    running: false,
    W: 0,
    H: 0,
    dpr: 1,
    ctx: null,
    raf: 0,
    accentRgb: parseRgb(accent),
    rm: false,
    ord: [],
    links: [],
    dust: [],
    co: [],
  });

  // Keep animRef in sync with props/state
  useEffect(() => {
    animRef.current.accentRgb = parseRgb(accent);
  }, [accent]);

  useEffect(() => {
    animRef.current.paused = open;
    animRef.current.hot = open ? hot : -1;
  }, [open, hot]);

  useEffect(() => {
    animRef.current.manual = !autoplay;
  }, [autoplay]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const r = cv.getBoundingClientRect();
    animRef.current.mx = e.clientX - r.left;
    animRef.current.my = e.clientY - r.top;
  }, []);

  const onPointerLeave = useCallback(() => {
    animRef.current.mx = null;
    animRef.current.my = null;
  }, []);

  const openPaths = useCallback(() => {
    animRef.current.paused = true;
    animRef.current.seek = 3.7;
    setOpen(true);
    setHot(-1);
  }, []);

  const closePaths = useCallback(() => {
    animRef.current.paused = false;
    setOpen(false);
    setHot(-1);
  }, []);

  const seekStage = useCallback((idx: number) => {
    animRef.current.seek = idx + 0.15;
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const h = animRef.current;
    h.rm = !!(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (h.rm) h.tl = 3.7;

    // Initialize particles deterministically
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    const rings = [
      [0.28, 6],
      [0.5, 12],
      [0.72, 18],
      [0.94, 24],
    ];
    h.ord = [];
    rings.forEach((rn, k) => {
      for (let i = 0; i < rn[1]; i++) {
        const a = (i / rn[1]) * Math.PI * 2 + rnd() * 0.12;
        const sr = Math.sqrt(rnd()) * 1.5 + 0.1;
        const sa = rnd() * Math.PI * 2;
        h.ord.push({
          k,
          i,
          n: rn[1],
          a,
          r: rn[0] + (rnd() - 0.5) * 0.04,
          sx: Math.cos(sa) * sr,
          sy: Math.sin(sa) * sr,
          ph: rnd() * 6.283,
          sp: 0.2 + rnd() * 0.3,
          d: 0.4 + rnd() * 0.6,
          s: 1.3 + rnd() * 1.1,
        });
      }
    });

    const byRing: number[][] = [[], [], [], []];
    h.ord.forEach((p, idx) => byRing[p.k].push(idx));
    h.links = [];
    h.ord.forEach((p, idx) => {
      const same = byRing[p.k];
      h.links.push([idx, same[(p.i + 1) % same.length]]);
      if (p.k < 3) {
        let best = -1;
        let bd = 9;
        byRing[p.k + 1].forEach((q) => {
          let d = Math.abs(h.ord[q].a - p.a);
          d = Math.min(d, Math.PI * 2 - d);
          if (d < bd) {
            bd = d;
            best = q;
          }
        });
        if (best >= 0) h.links.push([idx, best]);
      }
    });

    h.dust = [];
    for (let i = 0; i < 46; i++) {
      const a = rnd() * Math.PI * 2;
      const r = 0.9 + rnd() * 1.3;
      h.dust.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r,
        ph: rnd() * 6.283,
        sp: 0.15 + rnd() * 0.3,
        s: 0.7 + rnd() * 1.0,
        a: 0.25 + rnd() * 0.3,
        dp: 0.3 + rnd() * 0.7,
      });
    }

    const deg = [-110, -80, -45, -12, 22, 55, 90, 125];
    const rr = [1.46, 1.38, 1.52, 1.42, 1.5, 1.36, 1.5, 1.44];
    h.co = deg.map((d, i) => ({ ang: (d * Math.PI) / 180, r: rr[i] }));

    h.running = true;
    h.last = 0;

    const ss = (a: number, b: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;
    const mixc = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
      mix(a[0], b[0], t),
      mix(a[1], b[1], t),
      mix(a[2], b[2], t),
    ];
    const rgba = (c: [number, number, number], a: number) =>
      `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.max(0, a).toFixed(3)})`;

    const STEEL: [number, number, number] = [142, 160, 188];
    const NAVY: [number, number, number] = [31, 56, 97];
    const LINK: [number, number, number] = [75, 101, 144];
    const EM: [number, number, number] = [16, 185, 129];

    const frame = (ts: number) => {
      if (!h.running) return;

      const dt = h.last ? Math.min(0.05, (ts - h.last) / 1000) : 0.016;
      h.last = ts;
      h.t += dt;

      const W = cv.clientWidth;
      const H = cv.clientHeight;
      if (!W || !H) {
        h.raf = requestAnimationFrame(frame);
        return;
      }

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (W !== h.W || H !== h.H || dpr !== h.dpr) {
        h.W = W;
        h.H = H;
        h.dpr = dpr;
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
      }

      const ctx = h.ctx || (h.ctx = cv.getContext('2d'));
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Timeline progression
      if (h.seek != null) {
        h.tl += (h.seek - h.tl) * Math.min(1, dt * 3.2);
        if (Math.abs(h.seek - h.tl) < 0.01) {
          h.tl = h.seek;
          h.seek = null;
        }
      } else if (!h.paused && !h.rm && !h.manual) {
        h.tl += dt / 5.6;
        if (h.tl >= 4.6) h.tl = 0;
      }

      const tl = h.tl;
      const st = Math.max(0, Math.min(3, Math.floor(tl + 0.1)));
      if (st !== h.stage) {
        h.stage = st;
        setStage(st);
      }

      const ACC = h.accentRgb;

      for (let i = 0; i < 3; i++) {
        const tgt = h.hot === i ? 1 : 0;
        h.hm[i] += (tgt - h.hm[i]) * Math.min(1, dt * 4);
      }
      const hm = h.hm;
      let cap = ss(0.7, 1.6, tl);
      let pr = ss(1.9, 2.7, tl);
      let op = ss(2.9, 3.8, tl);
      cap = Math.max(cap, hm[2]);
      pr = Math.max(pr, hm[0]);
      op = Math.max(op, hm[1]);

      let m = Math.min(1, tl / 0.12);
      if (tl > 4.3) m = Math.max(0, (4.6 - tl) / 0.3);

      const wide = W >= 1000;
      const R = wide ? Math.min(W * 0.2, H * 0.28) : Math.min(W * 0.34, H * 0.17);
      const cx = wide ? Math.max(W * 0.6, W - R * 1.75 - 24) : W * 0.5;
      const cy = wide ? H * 0.5 : H * 0.27;

      const tx = h.mx == null ? 0 : (h.mx - W / 2) / W;
      const ty = h.my == null ? 0 : (h.my - H / 2) / H;
      h.pvx += (tx - h.pvx) * Math.min(1, dt * 2.5);
      h.pvy += (ty - h.pvy) * Math.min(1, dt * 2.5);

      const hx = cx + h.pvx * 14;
      const hy = cy + h.pvy * 14;

      // Atmosphere
      const atm = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 1.75);
      atm.addColorStop(0, rgba(ACC, 0.09 * m));
      atm.addColorStop(1, rgba(ACC, 0));
      ctx.fillStyle = atm;
      ctx.fillRect(0, 0, W, H);

      if (pr > 0.01) {
        const gr = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.9);
        gr.addColorStop(0, rgba(EM, (0.1 * pr + 0.06 * hm[0]) * m));
        gr.addColorStop(1, rgba(EM, 0));
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
      }

      // Far field dust
      for (let i = 0; i < h.dust.length; i++) {
        const d = h.dust[i];
        const x = cx + d.x * R + Math.sin(h.t * d.sp + d.ph) * 6 + h.pvx * 60 * d.dp;
        const y = cy + d.y * R + Math.cos(h.t * d.sp * 0.8 + d.ph) * 6 + h.pvy * 60 * d.dp;
        ctx.fillStyle = rgba(STEEL, d.a * m * (1 - 0.5 * op));
        ctx.beginPath();
        ctx.arc(x, y, d.s, 0, 6.283);
        ctx.fill();
      }

      // Capability: scattered points organise into rings
      const pts: [number, number][] = [];
      for (let i = 0; i < h.ord.length; i++) {
        const p = h.ord[i];
        const ang = p.a + h.t * (p.k % 2 ? 0.03 : -0.022) * cap;
        const ox = Math.cos(ang) * p.r;
        const oy = Math.sin(ang) * p.r;
        const dx = Math.sin(h.t * p.sp + p.ph) * 0.035;
        const dy = Math.cos(h.t * p.sp * 0.9 + p.ph) * 0.035;
        const ux = p.sx + (ox - p.sx) * cap + dx * (1 - 0.7 * cap);
        const uy = p.sy + (oy - p.sy) * cap + dy * (1 - 0.7 * cap);
        pts.push([cx + ux * R + h.pvx * 40 * p.d, cy + uy * R + h.pvy * 40 * p.d]);
      }

      if (cap > 0.01) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(LINK, 0.26 * cap * m * (1 + hm[2] * 1.2));
        ctx.beginPath();
        for (let i = 0; i < h.links.length; i++) {
          const a = pts[h.links[i][0]];
          const b = pts[h.links[i][1]];
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
        }
        ctx.stroke();
      }

      for (let i = 0; i < h.ord.length; i++) {
        const p = h.ord[i];
        ctx.fillStyle = rgba(mixc(STEEL, NAVY, Math.min(1, cap * 0.8 + hm[2] * 0.3)), (0.5 + 0.4 * cap) * m);
        ctx.beginPath();
        ctx.arc(pts[i][0], pts[i][1], p.s * (1 + 0.4 * hm[2]), 0, 6.283);
        ctx.fill();
      }

      // Proof: emerald verification ring closes around learner
      const rRing = 0.17 * R;
      const track = ss(1.5, 2.0, tl) * 0.14 * m;
      if (track > 0.002) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(NAVY, track);
        ctx.beginPath();
        ctx.arc(hx, hy, rRing, 0, 6.283);
        ctx.stroke();
      }

      if (pr > 0.002) {
        ctx.lineWidth = 2 + hm[0];
        ctx.lineCap = 'round';
        ctx.strokeStyle = rgba(EM, 0.95 * m);
        ctx.beginPath();
        ctx.arc(hx, hy, rRing, -Math.PI / 2, -Math.PI / 2 + pr * Math.PI * 2);
        ctx.stroke();
      }

      const rp = (tl - 2.7) / 0.9;
      if (rp > 0 && rp < 1) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(EM, Math.pow(1 - rp, 2) * 0.4 * m);
        ctx.beginPath();
        ctx.arc(hx, hy, rRing + rp * (0.9 * R - rRing), 0, 6.283);
        ctx.stroke();
      }

      if (hm[0] > 0.02) {
        const q = (h.t * 0.45) % 1;
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(EM, Math.pow(1 - q, 2) * 0.35 * hm[0] * m);
        ctx.beginPath();
        ctx.arc(hx, hy, rRing + q * (0.9 * R - rRing), 0, 6.283);
        ctx.stroke();
      }

      // Status chip: VERIFIED
      const chipA = ss(2.55, 2.85, tl) * m;
      if (chipA > 0.01 && cap > 0.5) {
        const label = 'VERIFIED';
        const anyCtx = ctx as unknown as { letterSpacing?: string; roundRect?: (x: number, y: number, w: number, h: number, r: number) => void };
        if (typeof anyCtx.letterSpacing === 'string') {
          anyCtx.letterSpacing = '1.2px';
        }
        const tw = ctx.measureText(label).width;
        const bw = tw + 34;
        const bh = 24;
        const bx = hx + rRing + 14;
        const by = hy - bh / 2;

        ctx.fillStyle = rgba([255, 255, 255], 0.9 * chipA);
        ctx.beginPath();
        if (typeof anyCtx.roundRect === 'function') {
          anyCtx.roundRect(bx, by, bw, bh, 8);
        } else {
          ctx.rect(bx, by, bw, bh);
        }
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(EM, 0.35 * chipA);
        ctx.stroke();

        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = rgba([4, 120, 87], chipA);
        ctx.beginPath();
        ctx.moveTo(bx + 9, by + 12.5);
        ctx.lineTo(bx + 12.5, by + 16);
        ctx.lineTo(bx + 18, by + 8.5);
        ctx.stroke();

        ctx.fillStyle = rgba([4, 120, 87], chipA);
        ctx.textBaseline = 'middle';
        ctx.fillText(label, bx + 24, by + bh / 2 + 0.5);
        if (typeof anyCtx.letterSpacing === 'string') {
          anyCtx.letterSpacing = '0px';
        }
      }

      // Opportunity rays
      const cf = wide ? 1 : 0.8;
      for (let i = 0; i < h.co.length; i++) {
        const c = h.co[i];
        const dist = c.r * R * cf;
        const x = cx + Math.cos(c.ang) * dist + h.pvx * 22;
        const y = cy + Math.sin(c.ang) * dist + h.pvy * 22;
        const lp = Math.max(0, Math.min(1, op * 1.5 - i * 0.07));
        const np = Math.max(0, Math.min(1, op * 1.5 - i * 0.07 - 0.9));
        if (lp > 0.001) {
          const ex = hx + (x - hx) * lp;
          const ey = hy + (y - hy) * lp;
          ctx.lineWidth = 1;
          ctx.strokeStyle = rgba(ACC, (0.38 + 0.3 * hm[1]) * m);
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          if (lp >= 1) {
            const u = (h.t * (0.26 + 0.2 * hm[1]) + i * 0.37) % 1;
            ctx.fillStyle = rgba(ACC, Math.sin(Math.PI * u) * 0.95 * m);
            ctx.beginPath();
            ctx.arc(hx + (x - hx) * u, hy + (y - hy) * u, 2, 0, 6.283);
            ctx.fill();
          }
        }
        const na = 0.3 + 0.7 * np;
        ctx.fillStyle = rgba(mixc(STEEL, ACC, np), na * m);
        ctx.beginPath();
        ctx.arc(x, y, 2.2 + 1.2 * np + 1.5 * hm[1] * np, 0, 6.283);
        ctx.fill();
        if (np > 0.01) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = rgba(ACC, np * 0.6 * m);
          ctx.beginPath();
          ctx.arc(x, y, 7 + 2 * hm[1], 0, 6.283);
          ctx.stroke();
        }
      }

      // Center Learner node
      const br = 1 + 0.12 * Math.sin(h.t * 1.6);
      const hc = mixc(NAVY, EM, pr);
      const hr = (2.8 + 1.6 * pr + 1.2 * hm[0]) * br;
      ctx.fillStyle = rgba(hc, 0.14 * m);
      ctx.beginPath();
      ctx.arc(hx, hy, hr * 3.2, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = rgba(hc, (0.85 + 0.15 * pr) * m);
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, 6.283);
      ctx.fill();

      h.raf = requestAnimationFrame(frame);
    };

    h.raf = requestAnimationFrame(frame);

    return () => {
      h.running = false;
      cancelAnimationFrame(h.raf);
    };
  }, []);

  const pathways = [
    {
      label: 'For Learners',
      text: 'Build capability. Solve real problems. Prove what you can do.',
      href: '/students',
      hotIndex: 0,
    },
    {
      label: 'For Employers',
      text: 'Discover verified talent through demonstrated capability, not résumé signals alone.',
      href: '/enterprise',
      hotIndex: 1,
    },
    {
      label: 'For Colleges',
      text: 'Transform students from credential holders into proven, industry-ready problem-solvers.',
      href: '/colleges',
      hotIndex: 2,
    },
  ];

  const stages = [
    { label: 'Potential', aria: 'Show Potential' },
    { label: 'Capability', aria: 'Show Capability' },
    { label: 'Proof', aria: 'Show Proof' },
    { label: 'Opportunity', aria: 'Show Opportunity' },
  ];

  return (
    <section
      ref={rootRef}
      className="pw-root"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label="Pathwisse interactive hero"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pw-canvas" />

      {/* Top action row */}
      <div className="pw-top">
        <div />

        <button
          type="button"
          className="txtbtn"
          onClick={closePaths}
          aria-label="Close pathways"
          style={{
            opacity: open ? 1 : 0,
            visibility: open ? 'visible' : 'hidden',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          <span>Close</span>
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Main hero display area */}
      <div className="pw-main">
        <div className="pw-col">
          {/* Default Hero Presentation */}
          <div
            className="pw-hero"
            style={{
              opacity: open ? 0 : 1,
              visibility: open ? 'hidden' : 'visible',
              transform: open ? 'translateY(-10px)' : 'translateY(0px)',
              pointerEvents: open ? 'none' : 'auto',
              transition: open
                ? 'opacity .25s ease, transform .25s ease, visibility 0s linear .25s'
                : 'opacity .5s ease .1s, transform .5s ease .1s, visibility 0s',
            }}
          >
            <h1 className="rise rise-1">
              <span className="block">Potential,</span>
              <span className="block" style={{ color: accent }}>
                made provable.
              </span>
            </h1>

            <p className="rise rise-2 pw-description">
              We&apos;re building a world where people are discovered for what they can actually do, not for degrees,
              résumés, or credentials.
            </p>

            <div className="rise rise-3 pw-cta-wrap">
              <button type="button" className="cta" onClick={openPaths}>
                <span className="cta-glow" style={{ background: accent }} />
                <span className="cta-content">
                  <span>Find your path</span>
                  <ArrowRight className="cta-arrow" size={18} aria-hidden="true" />
                </span>
              </button>
            </div>

            <p className="rise rise-4 pw-kicker">
              The capability and verification network connecting real problem-solvers with high-growth companies.
            </p>
          </div>

          {/* Interactive Pathways Overlay Panel */}
          <div
            className="pw-paths"
            style={{
              opacity: open ? 1 : 0,
              visibility: open ? 'visible' : 'hidden',
              pointerEvents: open ? 'auto' : 'none',
              transition: open
                ? 'opacity .35s ease .05s, visibility 0s'
                : 'opacity .2s ease, visibility 0s linear .2s',
            }}
          >
            <div className="glass">
              <ul className="pw-paths-list">
                {pathways.map((row, i) => {
                  const dl = (0.15 + i * 0.08).toFixed(2);
                  const isHovered = hot === row.hotIndex;
                  const isDimmed = hot >= 0 && !isHovered;
                  return (
                    <li
                      key={row.label}
                      style={{
                        borderTop: i === 0 ? 'none' : '1px solid rgba(31, 56, 97, 0.08)',
                        opacity: open ? 1 : 0,
                        transform: open ? 'translateY(0px)' : 'translateY(12px)',
                        transition: open
                          ? `opacity .5s ease ${dl}s, transform .6s cubic-bezier(.2,.7,.2,1) ${dl}s`
                          : 'opacity .2s ease, transform .2s ease',
                      }}
                    >
                      <a
                        className="pw-path-row"
                        href={row.href}
                        onMouseEnter={() => setHot(row.hotIndex)}
                        onMouseLeave={() => setHot(-1)}
                        onFocus={() => setHot(row.hotIndex)}
                        onBlur={() => setHot(-1)}
                        style={{
                          background: isHovered ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                          opacity: isDimmed ? 0.55 : 1,
                        }}
                      >
                        <span className="pw-path-text">
                          <span className="pw-path-label">{row.label}</span>
                          <span className="pw-path-title">{row.text}</span>
                        </span>
                        <span className="arr">
                          <ArrowRight size={22} aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Stage Stepper Navigation */}
      <nav
        aria-label="From potential to opportunity"
        className="stg-nav"
        style={{
          opacity: open ? 0 : 1,
          visibility: open ? 'hidden' : 'visible',
          pointerEvents: open ? 'none' : 'auto',
          transition: 'opacity .3s ease',
        }}
      >
        {stages.map((st, i) => {
          const isActive = i === stage;
          const isFilled = i <= stage;
          return (
            <button
              type="button"
              className="stg"
              key={st.label}
              onClick={() => seekStage(i)}
              aria-label={st.aria}
              aria-current={isActive ? 'step' : 'false'}
            >
              <span className="stg-track">
                <span
                  className="stg-fill"
                  style={{
                    width: isFilled ? '100%' : '0%',
                    background: accent,
                  }}
                />
              </span>
              <span
                className="stg-l"
                style={{
                  color: isActive ? '#0B111E' : '#5B6B83',
                }}
              >
                {st.label}
              </span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
