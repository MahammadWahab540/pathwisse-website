'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Terminal,
  Award,
  Sparkles,
  Zap,
  Sliders,
  ChevronRight,
  Eye,
  CheckCircle2,
  RefreshCw,
  Sun,
  Moon,
  Layers,
  ArrowRight
} from 'lucide-react';

/* ========================================================================== */
/*                   ANATOMY SKILL CRAFT STYLING & ISOMETRIC MATH              */
/* ========================================================================== */

// Standard Isometric Camera Projection: Azimuth 42 deg, Elevation 30 deg
export function projectIso(
  x: number,
  y: number,
  z: number,
  originX: number = 300,
  originY: number = 210,
  scale: number = 1.05
): [number, number] {
  // cos(30 deg) = 0.866025, sin(30 deg) = 0.5
  const isoX = (x - y) * 0.866025 * scale + originX;
  const isoY = (x + y) * 0.5 * 0.57735 * scale - z * scale + originY;
  return [Number(isoX.toFixed(2)), Number(isoY.toFixed(2))];
}

/* ========================================================================== */
/*                             SHARED SVG HELPERS                             */
/* ========================================================================== */

// Isometric Block (Base slabs, carriages, rails)
export function IsoBlock({
  x,
  y,
  z,
  w,
  d,
  h,
  originX = 300,
  originY = 210,
  scale = 1.05,
  tone = 'mid', // 'lo' | 'mid' | 'hi' | 'lit' | 'accent'
  accentColor,
  crease = true,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  originX?: number;
  originY?: number;
  scale?: number;
  tone?: 'lo' | 'mid' | 'hi' | 'lit' | 'accent';
  accentColor?: string;
  crease?: boolean;
}) {
  const p000 = projectIso(x, y, z, originX, originY, scale);
  const p100 = projectIso(x + w, y, z, originX, originY, scale);
  const p110 = projectIso(x + w, y + d, z, originX, originY, scale);
  const p010 = projectIso(x, y + d, z, originX, originY, scale);

  const p001 = projectIso(x, y, z + h, originX, originY, scale);
  const p101 = projectIso(x + w, y, z + h, originX, originY, scale);
  const p111 = projectIso(x + w, y + d, z + h, originX, originY, scale);
  const p011 = projectIso(x, y + d, z + h, originX, originY, scale);

  // Top face
  const topD = `M ${p001[0]} ${p001[1]} L ${p101[0]} ${p101[1]} L ${p111[0]} ${p111[1]} L ${p011[0]} ${p011[1]} Z`;
  // Front-left face (y + d facing camera-left)
  const leftD = `M ${p010[0]} ${p010[1]} L ${p110[0]} ${p110[1]} L ${p111[0]} ${p111[1]} L ${p011[0]} ${p011[1]} Z`;
  // Front-right face (x + w facing camera-right)
  const rightD = `M ${p100[0]} ${p100[1]} L ${p110[0]} ${p110[1]} L ${p111[0]} ${p111[1]} L ${p101[0]} ${p101[1]} Z`;

  const topColor =
    tone === 'accent'
      ? accentColor || '#5DDFD7'
      : tone === 'lit'
      ? 'var(--anatomy-lit-top)'
      : tone === 'hi'
      ? '#383e4e'
      : tone === 'mid'
      ? '#262b36'
      : '#1a1e27';

  const leftColor =
    tone === 'accent'
      ? accentColor || '#42b8b1'
      : tone === 'lit'
      ? '#e2e8f0'
      : tone === 'hi'
      ? '#272c38'
      : tone === 'mid'
      ? '#1a1e27'
      : '#12151b';

  const rightColor =
    tone === 'accent'
      ? accentColor || '#32928d'
      : tone === 'lit'
      ? '#cbd5e1'
      : tone === 'hi'
      ? '#1e222b'
      : tone === 'mid'
      ? '#14171e'
      : '#0e1015';

  return (
    <g className="iso-block">
      {/* Front-left side */}
      <path d={leftD} fill={leftColor} stroke="var(--anatomy-outline, #07090d)" strokeWidth="0.5" />
      {/* Front-right side */}
      <path d={rightD} fill={rightColor} stroke="var(--anatomy-outline, #07090d)" strokeWidth="0.5" />
      {/* Top face */}
      <path d={topD} fill={topColor} stroke="var(--anatomy-outline, #07090d)" strokeWidth="0.5" />
      {crease && (
        <path
          d={`M ${p111[0]} ${p111[1]} L ${p110[0]} ${p110[1]}`}
          stroke="var(--anatomy-outline, #07090d)"
          strokeWidth="0.6"
        />
      )}
    </g>
  );
}

// Isometric Cylinder / Round Knob (Bushings, Knurled thimbles, Screws)
export function IsoCylinder({
  x,
  y,
  z,
  radius,
  h,
  originX = 300,
  originY = 210,
  scale = 1.05,
  knurl = false,
  tone = 'mid',
  accentColor,
}: {
  x: number;
  y: number;
  z: number;
  radius: number;
  h: number;
  originX?: number;
  originY?: number;
  scale?: number;
  knurl?: boolean;
  tone?: 'lo' | 'mid' | 'hi' | 'lit' | 'accent';
  accentColor?: string;
}) {
  const bottomCenter = projectIso(x, y, z, originX, originY, scale);
  const topCenter = projectIso(x, y, z + h, originX, originY, scale);
  const rx = radius * 0.866025 * scale;
  const ry = radius * 0.5 * scale;

  return (
    <g className="iso-cylinder">
      {/* Body */}
      <rect
        x={bottomCenter[0] - rx}
        y={topCenter[1]}
        width={rx * 2}
        height={bottomCenter[1] - topCenter[1]}
        fill={accentColor ? '#2d3340' : '#1a1e27'}
        stroke="var(--anatomy-outline, #07090d)"
        strokeWidth="0.5"
      />
      {/* Bottom curved rim */}
      <ellipse
        cx={bottomCenter[0]}
        cy={bottomCenter[1]}
        rx={rx}
        ry={ry}
        fill="#12151b"
        stroke="var(--anatomy-outline, #07090d)"
        strokeWidth="0.5"
      />
      {/* Knurled hatching lines */}
      {knurl && (
        <g opacity="0.45">
          {[-0.6, -0.3, 0, 0.3, 0.6].map((offset, i) => (
            <line
              key={i}
              x1={topCenter[0] + rx * offset}
              y1={topCenter[1]}
              x2={bottomCenter[0] + rx * offset}
              y2={bottomCenter[1]}
              stroke="#64748b"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.5"
            />
          ))}
        </g>
      )}
      {/* Top cap */}
      <ellipse
        cx={topCenter[0]}
        cy={topCenter[1]}
        rx={rx}
        ry={ry}
        fill={accentColor || '#333b49'}
        stroke="var(--anatomy-outline, #07090d)"
        strokeWidth="0.6"
      />
      {/* Tiny center dot */}
      <circle cx={topCenter[0]} cy={topCenter[1]} r="0.75" fill="#f8fafc" />
    </g>
  );
}

// Mechanical Coil Spring
export function IsoSpring({
  x,
  y,
  zStart,
  zEnd,
  radius = 6,
  turns = 5,
  originX = 300,
  originY = 210,
  scale = 1.05,
  color = '#94a3b8',
}: {
  x: number;
  y: number;
  zStart: number;
  zEnd: number;
  radius?: number;
  turns?: number;
  originX?: number;
  originY?: number;
  scale?: number;
  color?: string;
}) {
  const points: [number, number][] = [];
  const totalSteps = turns * 16;
  const dz = (zEnd - zStart) / totalSteps;

  for (let step = 0; step <= totalSteps; step++) {
    const angle = (step / 16) * Math.PI * 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    const pz = zStart + dz * step;
    points.push(projectIso(px, py, pz, originX, originY, scale));
  }

  const pathD = points.reduce((acc, [px, py], i) => (i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`), '');

  return (
    <path
      d={pathD}
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="iso-spring"
    />
  );
}

/* ========================================================================== */
/*                                FIGURE 1                                    */
/*           THE CANDIDATE SIEVE & OPTICAL COMPARATOR (COMPANY)               */
/* ========================================================================== */

export function CandidateSieveFigure({
  theme = 'dark',
}: {
  theme?: 'dark' | 'light';
}) {
  const [thresholdScore, setThresholdScore] = useState<number>(85);
  const [selectedCandidate, setSelectedCandidate] = useState<number>(0);
  const [inspectingMemo, setInspectingMemo] = useState<boolean>(true);

  const candidates = [
    {
      name: 'Ananya K.',
      role: 'Associate Full Stack Engineer',
      matchScore: 94,
      gitStatus: '24/24 PASSING',
      memoExcerpt: 'Distributed task queue with Redis async worker, DLQ, 24 unit tests.',
      sqlScore: '91/100',
      archScore: '95/100',
    },
    {
      name: 'Vikram R.',
      role: 'Backend Platform Engineer',
      matchScore: 91,
      gitStatus: '22/22 PASSING',
      memoExcerpt: 'PostgreSQL transaction isolation with optimistic concurrency locking.',
      sqlScore: '96/100',
      archScore: '89/100',
    },
    {
      name: 'Priya S.',
      role: 'Systems & Microservices',
      matchScore: 88,
      gitStatus: '20/20 PASSING',
      memoExcerpt: 'Dockerized event stream consumer with exponential retry backoff.',
      sqlScore: '87/100',
      archScore: '92/100',
    },
  ];

  const current = candidates[selectedCandidate];
  const meetsBar = current.matchScore >= thresholdScore;

  // Carriage slides along X axis between candidate inspection stations
  const carriageX = -40 + selectedCandidate * 48;

  return (
    <div className={`iso-card-wrap rounded-3xl p-6 sm:p-8 border shadow-xl ${
      theme === 'dark' ? 'bg-[#0f1117] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Figure Frame Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/30">
            FIG 1
          </span>
          <span className="font-semibold tracking-wider text-slate-400 uppercase">
            CANDIDATE SIEVE & OPTICAL COMPARATOR
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Sliders size={13} className="text-teal-400" />
          <span>Capability Threshold: <strong>{thresholdScore}+ Score</strong></span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden rounded-2xl bg-[#090b10] border border-slate-800/60 flex items-center justify-center">
        {/* Soft Ambient Halo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[420px] h-[220px] rounded-full bg-teal-500/20 blur-3xl" />
        </div>

        <svg viewBox="0 0 600 380" className="w-full h-full max-w-[640px] drop-shadow-2xl">
          {/* Base Surface Granite Plate */}
          <IsoBlock x={-140} y={-80} z={-14} w={280} d={160} h={14} tone="lo" />
          {/* Levelling Feet */}
          {[-125, 125].map((fx) =>
            [-65, 65].map((fy) => (
              <IsoCylinder key={`${fx}-${fy}`} x={fx} y={fy} z={-18} radius={5} h={4} />
            ))
          )}
          {/* Corner Screws */}
          {[-128, 128].map((sx) =>
            [-68, 68].map((sy) => (
              <IsoCylinder key={`${sx}-${sy}`} x={sx} y={sy} z={0} radius={2} h={1} />
            ))
          )}

          {/* Metric Linear Ruler Strip on Base */}
          <IsoBlock x={-120} y={64} z={0} w={240} d={8} h={1} tone="hi" />

          {/* Dual Ground Tool-Steel Rails */}
          <IsoBlock x={-110} y={-30} z={4} w={220} d={5} h={5} tone="mid" />
          <IsoBlock x={-110} y={20} z={4} w={220} d={5} h={5} tone="mid" />

          {/* Left Station: Knurled Micrometer Threshold Thimble */}
          <IsoCylinder x={-115} y={-5} z={0} radius={14} h={16} knurl={true} accentColor="#2458ae" />
          <IsoCylinder x={-115} y={-5} z={16} radius={10} h={26} knurl={true} />
          {/* Degree / Tick marks on thimble */}
          <IsoCylinder x={-115} y={-5} z={42} radius={6} h={8} knurl={false} accentColor="#5DDFD7" />

          {/* Center Station: Sliding Evidence Loupe Carriage */}
          <g className="transition-transform duration-500 ease-out" style={{ transform: `translate(${selectedCandidate * 18}px, 0)` }}>
            {/* Carriage body on rail bushings */}
            <IsoBlock x={carriageX} y={-36} z={9} w={56} d={62} h={7} tone="lit" />

            {/* Illuminated Glass Inspection Window */}
            <IsoBlock x={carriageX + 6} y={-28} z={16} w={44} d={46} h={2} tone="accent" accentColor={meetsBar ? '#5DDFD7' : '#f87171'} />

            {/* Magnifying Loupe Arm Post */}
            <IsoCylinder x={carriageX + 28} y={-5} z={18} radius={4} h={28} />
            {/* Loupe Outer Ring Barrel */}
            <IsoCylinder x={carriageX + 28} y={-5} z={46} radius={12} h={6} knurl={true} accentColor="#10b981" />

            {/* Inspection Ray Beam down to memo */}
            <line
              x1={projectIso(carriageX + 28, -5, 46)[0]}
              y1={projectIso(carriageX + 28, -5, 46)[1]}
              x2={projectIso(carriageX + 28, -5, 18)[0]}
              y2={projectIso(carriageX + 28, -5, 18)[1]}
              stroke="#5DDFD7"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.8"
            />
          </g>

          {/* Right Station: Precision Role Match Dial Indicator */}
          <IsoBlock x={95} y={-25} z={0} w={35} d={35} h={18} tone="mid" />
          <IsoCylinder x={112} y={-8} z={18} radius={5} h={35} />
          {/* Dial Gauge Body */}
          <IsoCylinder x={112} y={-8} z={53} radius={18} h={7} knurl={true} accentColor="#0f172a" />
          {/* Needle Indicator on dial */}
          <circle
            cx={projectIso(112, -8, 60)[0]}
            cy={projectIso(112, -8, 60)[1]}
            r={14}
            fill="#090b10"
            stroke="#38bdf8"
            strokeWidth="0.8"
          />
          {/* Deflecting Needle Pointer */}
          <line
            x1={projectIso(112, -8, 60)[0]}
            y1={projectIso(112, -8, 60)[1]}
            x2={projectIso(112, -8, 60)[0] + Math.cos((current.matchScore / 100) * Math.PI) * 11}
            y2={projectIso(112, -8, 60)[1] - Math.sin((current.matchScore / 100) * Math.PI) * 11}
            stroke={meetsBar ? '#10b981' : '#f43f5e'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Candidate Output Dispatch Tray */}
          <IsoBlock x={80} y={25} z={0} w={48} d={36} h={4} tone="hi" />
          <IsoBlock x={84} y={28} z={4} w={40} d={30} h={1} tone="accent" accentColor={meetsBar ? '#38bdf8' : '#64748b'} />

          {/* Engraved Pathwisse Spec Label Plate on Base */}
          <rect
            x={projectIso(-115, 66, 1)[0] - 12}
            y={projectIso(-115, 66, 1)[1] - 4}
            width={48}
            height={9}
            fill="#0f172a"
            stroke="#475569"
            strokeWidth="0.4"
            rx="1"
          />
          <text
            x={projectIso(-115, 66, 1)[0] + 12}
            y={projectIso(-115, 66, 1)[1] + 2.5}
            fill="#94a3b8"
            fontSize="4.5"
            fontFamily="monospace"
            textAnchor="middle"
          >
            PATHWISSE · CALIBRATED
          </text>
        </svg>

        {/* Live HUD Floating Tag on Lens */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg font-mono text-[11px] text-slate-300 shadow-lg">
          <span className="text-teal-400 font-bold">{current.matchScore}%</span> Match ·{' '}
          <span className={meetsBar ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
            {meetsBar ? 'BAR SURPASSED' : 'DEFICIT'}
          </span>
        </div>
      </div>

      {/* Interactive Controls & Candidate Selector Bar */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">SELECT CANDIDATE DOSSIER:</span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
              {candidates.map((cand, idx) => (
                <button
                  key={cand.name}
                  type="button"
                  onClick={() => setSelectedCandidate(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedCandidate === idx
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cand.name}
                </button>
              ))}
            </div>
          </div>

          {/* Threshold Slider Knob */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">BAR:</span>
            <input
              type="range"
              min="80"
              max="95"
              value={thresholdScore}
              onChange={(e) => setThresholdScore(Number(e.target.value))}
              className="accent-teal-500 cursor-pointer w-28"
            />
            <span className="font-bold text-teal-400">{thresholdScore}+</span>
          </div>
        </div>

        {/* Inspected Technical Evidence Callout */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-slate-200">{current.name}</span>
            <span className="text-slate-400 ml-2">({current.role})</span>
            <p className="text-slate-400 text-[11px] mt-0.5 font-mono">
              Memo: &ldquo;{current.memoExcerpt}&rdquo;
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
              {current.gitStatus}
            </span>
            <span className="text-blue-400 font-bold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/60">
              API: {current.archScore}
            </span>
            <span className="text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
              SQL: {current.sqlScore}
            </span>
          </div>
        </div>
      </div>

      {/* Card Legend & Mechanical Readout */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 mt-4 text-[11px] font-mono text-slate-400">
        <div>HINT: Drag slider or select dossier to see comparator carriage inspect proof.</div>
        <div className="text-slate-300 font-bold">
          TELEMETRY: Sieve active · Audit latency: &lt;60s · 0 Keyword Spam
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*                                FIGURE 2                                    */
/*      THE INSTITUTIONAL DIAGNOSTIC CENTRIFUGE & SPRINT INTERVENOR           */
/* ========================================================================== */

export function InstitutionalDiagnosticFigure({
  theme = 'dark',
}: {
  theme?: 'dark' | 'light';
}) {
  const [sprintActivated, setSprintActivated] = useState<boolean>(false);
  const [cohortSize, setCohortSize] = useState<number>(640);

  return (
    <div className={`iso-card-wrap rounded-3xl p-6 sm:p-8 border shadow-xl ${
      theme === 'dark' ? 'bg-[#0f1117] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Figure Frame Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold border border-purple-500/30">
            FIG 2
          </span>
          <span className="font-semibold tracking-wider text-slate-400 uppercase">
            INSTITUTIONAL DIAGNOSTIC CENTRIFUGE & SPRINT DYNAMO
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <RefreshCw size={13} className={sprintActivated ? 'text-emerald-400 animate-spin' : 'text-slate-400'} />
          <span>Intervention: <strong>{sprintActivated ? '4-WEEK SPRINTS ACTIVE' : 'DIAGNOSTIC IDLE'}</strong></span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden rounded-2xl bg-[#090b10] border border-slate-800/60 flex items-center justify-center">
        {/* Soft Ambient Halo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[420px] h-[220px] rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <svg viewBox="0 0 600 380" className="w-full h-full max-w-[640px] drop-shadow-2xl">
          {/* Base Cast Tool Plate */}
          <IsoBlock x={-140} y={-80} z={-14} w={280} d={160} h={14} tone="lo" />
          {/* Feet */}
          {[-125, 125].map((fx) =>
            [-65, 65].map((fy) => (
              <IsoCylinder key={`${fx}-${fy}`} x={fx} y={fy} z={-18} radius={5} h={4} />
            ))
          )}

          {/* Left Intake Stage: Cohort Intake Feeder Funnel */}
          <IsoBlock x={-120} y={-35} z={0} w={40} d={40} h={16} tone="mid" />
          {/* Funnel Hopper */}
          <IsoCylinder x={-100} y={-15} z={16} radius={16} h={24} knurl={true} accentColor="#7c3aed" />
          {/* Feeder Track leading to Centrifuge */}
          <IsoBlock x={-80} y={-18} z={14} w={35} d={6} h={4} tone="hi" />

          {/* Center Stage: The Diagnostic Spectrometer Prism Array */}
          <IsoCylinder x={-15} y={-5} z={0} radius={32} h={12} tone="mid" />
          {/* Triangular Optical Quartz Prism */}
          <IsoBlock x={-26} y={-16} z={12} w={24} d={24} h={22} tone="accent" accentColor="#B89FFA" />

          {/* 3 Refracted Spectral Deficit Bars */}
          {/* 1. DSA Bar (Green 88%) */}
          <IsoBlock x={10} y={-32} z={12} w={sprintActivated ? 48 : 42} d={5} h={5} tone="accent" accentColor="#10b981" />
          {/* 2. SQL Bar (Amber 64% -> lifts to 82% if sprints active) */}
          <IsoBlock x={10} y={-20} z={12} w={sprintActivated ? 44 : 28} d={5} h={5} tone="accent" accentColor={sprintActivated ? '#10b981' : '#f59e0b'} />
          {/* 3. System Design Bar (Red 52% -> lifts to 76% if sprints active) */}
          <IsoBlock x={10} y={-8} z={12} w={sprintActivated ? 40 : 22} d={5} h={5} tone="accent" accentColor={sprintActivated ? '#10b981' : '#ef4444'} />

          {/* Sprint Acceleration Dynamo Plunger & Springs */}
          <IsoCylinder x={80} y={-20} z={0} radius={14} h={20} knurl={true} accentColor="#2563eb" />
          {/* Dual Compression Springs */}
          <IsoSpring x={74} y={-20} zStart={20} zEnd={sprintActivated ? 32 : 44} radius={4} turns={5} color="#60a5fa" />
          <IsoSpring x={86} y={-20} zStart={20} zEnd={sprintActivated ? 32 : 44} radius={4} turns={5} color="#60a5fa" />
          {/* Plunger Stamping Head */}
          <IsoBlock x={70} y={-28} z={sprintActivated ? 32 : 44} w={20} d={16} h={8} tone="lit" />

          {/* Exit Vault Carousel: Verified Credentials Stamping Die */}
          <IsoCylinder x={105} y={22} z={0} radius={22} h={14} tone="mid" />
          {/* Cryptographic Stamped Dossier Tile */}
          <IsoBlock x={92} y={10} z={14} w={26} d={24} h={3} tone="accent" accentColor="#10b981" />

          {/* Laser Verification Conduit */}
          <line
            x1={projectIso(-15, -5, 24)[0]}
            y1={projectIso(-15, -5, 24)[1]}
            x2={projectIso(105, 22, 14)[0]}
            y2={projectIso(105, 22, 14)[1]}
            stroke={sprintActivated ? '#10b981' : '#a855f7'}
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* Nameplate */}
          <rect
            x={projectIso(-120, 66, 1)[0]}
            y={projectIso(-120, 66, 1)[1] - 4}
            width={58}
            height={9}
            fill="#0f172a"
            stroke="#475569"
            strokeWidth="0.4"
            rx="1"
          />
          <text
            x={projectIso(-120, 66, 1)[0] + 29}
            y={projectIso(-120, 66, 1)[1] + 2.5}
            fill="#94a3b8"
            fontSize="4.5"
            fontFamily="monospace"
            textAnchor="middle"
          >
            PATHWISSE · INSTITUTIONAL AUDIT
          </text>
        </svg>

        {/* Live HUD Floating Tag */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg font-mono text-[11px] text-slate-300 shadow-lg">
          Readiness:{' '}
          <span className="text-emerald-400 font-bold">
            {sprintActivated ? '82.6% (+14.2% lift)' : '68.4% Baseline'}
          </span>
        </div>
      </div>

      {/* Interactive Trigger Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-slate-400 block mb-1">
            TARGETED ACCELERATION INTERVENTION:
          </span>
          <button
            type="button"
            onClick={() => setSprintActivated((prev) => !prev)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              sprintActivated
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Zap size={14} className={sprintActivated ? 'text-amber-300' : 'text-slate-400'} />
            <span>{sprintActivated ? 'Reset Baseline Diagnostics' : 'Activate 4-Week Sprint Dynamo'}</span>
          </button>
        </div>

        {/* Deficit Breakdown Indicators */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">DSA</span>
            <span className="font-bold text-emerald-400">88% Ready</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">SQL QUERY</span>
            <span className={`font-bold ${sprintActivated ? 'text-emerald-400' : 'text-amber-400'}`}>
              {sprintActivated ? '84% Solved' : '64% Deficit'}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block">SYSTEM DESIGN</span>
            <span className={`font-bold ${sprintActivated ? 'text-emerald-400' : 'text-rose-400'}`}>
              {sprintActivated ? '76% Certified' : '52% Gap'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Legend & Mechanical Readout */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 mt-4 text-[11px] font-mono text-slate-400">
        <div>HINT: Toggle sprint dynamo to compress springs and verify deficit recovery lift.</div>
        <div className="text-slate-300 font-bold">
          OUTCOME: 640 Cohort · 1,840+ Git Artifacts · 100% Inspectable
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*                                FIGURE 3                                    */
/*           THE 4-STAGE PATHWAY TELEMETRY RIG (CONNECTED LEARNING)           */
/* ========================================================================== */

export function ConnectedPathwayFigure({
  theme = 'dark',
}: {
  theme?: 'dark' | 'light';
}) {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 'discovery',
      name: 'Career Discovery',
      stationRoman: 'I',
      instrument: 'Gimballed Sighting Collimator',
      carriagePos: -90,
      readout: 'CALIBRATION: Aiming student trajectory at hiring demand bars',
      icon: Compass,
      color: '#5DDFD7',
      narrative: 'Students discover market-calibrated engineering trajectories rather than uncalibrated role titles.',
      actionDetail: 'Target requirements, milestone prerequisites, and benchmark rubrics lock in place.',
    },
    {
      id: 'skills',
      name: 'Skills Foundations',
      stationRoman: 'II',
      instrument: 'Diagnostic Micrometer Gauge',
      carriagePos: -30,
      readout: 'MICROMETER: Measuring foundational concept gaps',
      icon: Sparkles,
      color: '#DBEE9F',
      narrative: 'Pinpoint precise gaps in SQL transactions, queue semantics, and error handling before building.',
      actionDetail: 'Diagnostic drills benchmark foundational readiness with zero guesswork.',
    },
    {
      id: 'projects',
      name: 'Projects & Drills',
      stationRoman: 'III',
      instrument: 'Automated Test Harness Press',
      carriagePos: 30,
      readout: 'HARNESS: 24/24 unit test pins verified in code module',
      icon: Terminal,
      color: '#B89FFA',
      narrative: 'Students build authentic production architectures validated by automated test suites.',
      actionDetail: '24/24 unit tests pass, technical decision memos are drafted, and PRs are reviewed.',
    },
    {
      id: 'capability',
      name: 'Verified Capability',
      stationRoman: 'IV',
      instrument: 'Hydraulic Proof Stamping Press',
      carriagePos: 90,
      readout: 'VERIFICATION: Cryptographic seal stamped on dossier',
      icon: Award,
      color: '#5DDFD7',
      narrative: 'Transform finished project code into permanent, inspectable evidence dossiers that employers trust.',
      actionDetail: 'Defensible proof dossier published with cryptographic integrity and inspectable git trees.',
    },
  ];

  const current = stages[activeStage];
  const Icon = current.icon;

  return (
    <div className={`iso-card-wrap rounded-3xl p-6 sm:p-8 border shadow-xl ${
      theme === 'dark' ? 'bg-[#0f1117] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Figure Frame Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 font-bold border border-teal-500/30">
            FIG 3
          </span>
          <span className="font-semibold tracking-wider text-slate-400 uppercase">
            PATHWISSE 4-STAGE GANTRY TELEMETRY RIG
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Active Station: <strong>STATION {current.stationRoman} ({current.name})</strong></span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden rounded-2xl bg-[#090b10] border border-slate-800/60 flex items-center justify-center">
        {/* Soft Ambient Halo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div
            className="w-[440px] h-[220px] rounded-full blur-3xl transition-colors duration-700"
            style={{ backgroundColor: `${current.color}33` }}
          />
        </div>

        <svg viewBox="0 0 600 380" className="w-full h-full max-w-[640px] drop-shadow-2xl">
          {/* Main Ground Tool Bench Bed */}
          <IsoBlock x={-140} y={-75} z={-14} w={280} d={150} h={14} tone="lo" />
          {/* 6 Isolation Feet */}
          {[-125, 0, 125].map((fx) =>
            [-60, 60].map((fy) => (
              <IsoCylinder key={`${fx}-${fy}`} x={fx} y={fy} z={-18} radius={5} h={4} />
            ))
          )}

          {/* Twin Ground Steel Guide Rails running full length */}
          <IsoBlock x={-120} y={-24} z={2} w={240} d={5} h={5} tone="mid" />
          <IsoBlock x={-120} y={24} z={2} w={240} d={5} h={5} tone="mid" />

          {/* Linear Rack-and-Pinion Gear Strip */}
          <IsoBlock x={-120} y={-16} z={2} w={240} d={2} h={2} tone="hi" />

          {/* 4 Physical Stations Stationed Along Rails */}
          {/* Station I: Sighting Collimator Telescope (Discovery) */}
          <g opacity={activeStage === 0 ? 1 : 0.6}>
            <IsoBlock x={-100} y={-48} z={0} w={20} d={20} h={12} tone="mid" />
            <IsoCylinder x={-90} y={-38} z={12} radius={6} h={18} />
            <IsoCylinder x={-90} y={-38} z={30} radius={10} h={6} knurl={true} accentColor="#5DDFD7" />
            <IsoBlock x={-94} y={-38} z={36} w={8} d={28} h={8} tone="lit" />
          </g>

          {/* Station II: Diagnostic Micrometer Caliper (Skills) */}
          <g opacity={activeStage === 1 ? 1 : 0.6}>
            <IsoBlock x={-40} y={-48} z={0} w={20} d={20} h={12} tone="mid" />
            <IsoCylinder x={-30} y={-38} z={12} radius={5} h={24} knurl={true} accentColor="#DBEE9F" />
            {/* Caliper Bow Frame */}
            <IsoBlock x={-35} y={-42} z={36} w={10} d={28} h={4} tone="hi" />
          </g>

          {/* Station III: Test Harness Drill Press (Projects) */}
          <g opacity={activeStage === 2 ? 1 : 0.6}>
            <IsoBlock x={20} y={-48} z={0} w={20} d={20} h={12} tone="mid" />
            <IsoCylinder x={30} y={-38} z={12} radius={5} h={30} />
            <IsoSpring x={30} y={-38} zStart={24} zEnd={42} radius={4} turns={4} color="#B89FFA" />
            {/* Test Head with 24 Test Pins */}
            <IsoBlock x={24} y={-42} z={42} w={12} d={24} h={6} tone="accent" accentColor="#B89FFA" />
          </g>

          {/* Station IV: Hydraulic Proof Seal Press (Verified Capability) */}
          <g opacity={activeStage === 3 ? 1 : 0.6}>
            <IsoBlock x={80} y={-48} z={0} w={20} d={20} h={12} tone="mid" />
            <IsoCylinder x={90} y={-38} z={12} radius={8} h={28} knurl={true} accentColor="#5DDFD7" />
            {/* Stamping Cylinder Head */}
            <IsoBlock x={82} y={-42} z={40} w={16} d={24} h={8} tone="lit" />
          </g>

          {/* Live Traversing Gantry Carriage (Slides to active station position) */}
          <g
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translate(${current.carriagePos * 0.9}px, 0)` }}
          >
            {/* Gantry Truck on Rails */}
            <IsoBlock x={-18} y={-28} z={7} w={36} d={56} h={8} tone="lit" />
            {/* Active Indicator Light Tower */}
            <IsoCylinder x={0} y={0} z={15} radius={6} h={16} accentColor={current.color} />
            <circle
              cx={projectIso(0, 0, 31)[0]}
              cy={projectIso(0, 0, 31)[1]}
              r={5}
              fill={current.color}
              className="animate-pulse"
            />
          </g>

          {/* Front Nameplate */}
          <rect
            x={projectIso(-115, 62, 1)[0]}
            y={projectIso(-115, 62, 1)[1] - 4}
            width={64}
            height={9}
            fill="#0f172a"
            stroke="#475569"
            strokeWidth="0.4"
            rx="1"
          />
          <text
            x={projectIso(-115, 62, 1)[0] + 32}
            y={projectIso(-115, 62, 1)[1] + 2.5}
            fill="#94a3b8"
            fontSize="4.5"
            fontFamily="monospace"
            textAnchor="middle"
          >
            PATHWISSE · CONTINUOUS LEARNING RIG
          </text>
        </svg>

        {/* Live HUD Floating Tag */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg font-mono text-[11px] text-slate-300 shadow-lg flex items-center gap-2">
          <Icon size={14} style={{ color: current.color }} />
          <span>{current.instrument}</span>
        </div>
      </div>

      {/* 4 Interactive Station Selector Buttons */}
      <div className="mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {stages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            const StgIcon = stg.icon;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-slate-600 shadow-md ring-1 ring-teal-500/40'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    STAGE {stg.stationRoman}
                  </span>
                  <StgIcon size={15} style={{ color: stg.color }} />
                </div>
                <strong className={`text-xs block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {stg.name}
                </strong>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: current.color }}
            />
            <strong className="text-sm font-bold text-slate-100">{current.name}</strong>
            <span className="text-[10px] font-mono text-slate-400">({current.instrument})</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{current.narrative}</p>
          <p className="text-[11px] text-teal-400 font-mono flex items-center gap-1.5 pt-1 border-t border-slate-800/60">
            <CheckCircle2 size={13} className="text-teal-400 shrink-0" />
            <span>{current.actionDetail}</span>
          </p>
        </motion.div>
      </div>

      {/* Card Legend & Mechanical Readout */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 mt-4 text-[11px] font-mono text-slate-400">
        <div>HINT: Click any of the 4 stations to drive the gantry carriage and activate the mechanism.</div>
        <div className="text-slate-300 font-bold">{current.readout}</div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/*                       UNIFIED ANATOMY TRILOGY COMPONENT                    */
/* ========================================================================== */

export function AnatomyTrilogy() {
  const [selectedFigure, setSelectedFigure] = useState<number>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const figureTabs = [
    {
      id: 0,
      title: 'Company Sieve & Comparator',
      subtitle: 'Specifying capabilities, comparing evidence & connecting candidates',
      badge: 'Fig 1',
    },
    {
      id: 1,
      title: 'Institutional Centrifuge & Sprint Intervenor',
      subtitle: 'Student intake, visible skill gaps & acceleration sprints',
      badge: 'Fig 2',
    },
    {
      id: 2,
      title: '4-Stage Pathway Telemetry Rig',
      subtitle: 'Career Discovery → Skills → Projects → Verified Capability',
      badge: 'Fig 3',
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Pathwisse Physical Anatomy Figures">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-teal-600 block mb-2">
          CRAFTED ISOMETRIC MECHANISMS · ANATOMY ENGINE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] text-slate-900 tracking-tight mb-4">
          The Physical Anatomy of Pathwisse
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Inspired by precision instruments, dial gauges, and gantry rigs: three interactive physical mechanisms explaining how Pathwisse replaces uncalibrated claims with verifiable engineering proof.
        </p>
      </div>

      {/* Mechanism Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {figureTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedFigure(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectedFigure === tab.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-700">
              {tab.badge}
            </span>
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Active Figure Display */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {selectedFigure === 0 && (
            <motion.div
              key="fig-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <CandidateSieveFigure theme="dark" />
            </motion.div>
          )}

          {selectedFigure === 1 && (
            <motion.div
              key="fig-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <InstitutionalDiagnosticFigure theme="dark" />
            </motion.div>
          )}

          {selectedFigure === 2 && (
            <motion.div
              key="fig-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ConnectedPathwayFigure theme="dark" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
