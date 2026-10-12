'use client';

import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  active?: boolean;
  hovered?: boolean;
  reacting?: boolean;
}

/**
 * 1. StudentCapabilityIcon
 * A connected, ascending capability path representing learning, skill development, and progress.
 * On hover/active/reacting: next node highlights, light travels between connected nodes, cascade node pop.
 */
export function StudentCapabilityIcon({
  size = 20,
  className = '',
  strokeWidth = 1.75,
  active = false,
  hovered = false,
  reacting = false,
  ...props
}: IconProps) {
  const isEngaged = active || hovered || reacting;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-300 ${reacting ? 'animate-icon-pop' : ''} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Structural ground datum */}
      <line
        x1="3.5"
        y1="20.5"
        x2="20.5"
        y2="20.5"
        className="transition-opacity duration-300"
        strokeOpacity={isEngaged ? 0.8 : 0.35}
      />
      
      {/* Base ascending stepped trajectory connecting capability nodes */}
      <path
        d="M4.5 17.5 L10.5 11.5 L15 14 L19.5 5.5"
        className="transition-all duration-300"
        strokeOpacity={isEngaged ? 1 : 0.85}
        strokeWidth={reacting ? strokeWidth + 0.3 : strokeWidth}
      />

      {/* Traveling light signal pulse when hovered, active, or reacting */}
      {isEngaged && (
        <path
          d="M4.5 17.5 L10.5 11.5 L15 14 L19.5 5.5"
          stroke="currentColor"
          strokeWidth={strokeWidth + (reacting ? 1 : 0.5)}
          strokeDasharray={reacting ? '6 8' : '4 16'}
          className="animate-flow-dash"
          style={reacting ? { animationDuration: '1.2s' } : undefined}
        />
      )}
      
      {/* Peak capability summit arrow / graduation notch */}
      <path
        d="M15.5 5.5 H19.5 V9.5"
        className={`transition-transform duration-300 ${
          reacting
            ? 'translate-x-1 -translate-y-1'
            : isEngaged
            ? 'translate-x-0.5 -translate-y-0.5'
            : ''
        }`}
      />
      
      {/* Capability milestones on the path with staggered cascade node pops */}
      <circle
        cx="4.5"
        cy="17.5"
        r={reacting ? 2.2 : 1.5}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-1' : 'transition-all duration-300'}
        style={{ transformOrigin: '4.5px 17.5px' }}
      />
      <circle
        cx="10.5"
        cy="11.5"
        r={reacting ? 2.6 : isEngaged ? 2 : 1.5}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-2' : 'transition-all duration-300'}
        style={{ transformOrigin: '10.5px 11.5px' }}
      />
      <circle
        cx="15"
        cy="14"
        r={reacting ? 2.4 : isEngaged ? 1.75 : 1.25}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-3' : 'transition-all duration-300'}
        style={{ transformOrigin: '15px 14px' }}
      />
      <circle
        cx="19.5"
        cy="5.5"
        r={reacting ? 3 : isEngaged ? 2.25 : 1.5}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-4' : 'transition-all duration-300'}
        style={{ transformOrigin: '19.5px 5.5px', opacity: isEngaged ? 1 : 0.8 }}
      />
      {/* Extra flare halo on summit when reacting */}
      {reacting && (
        <circle
          cx="19.5"
          cy="5.5"
          r="4.5"
          stroke="currentColor"
          strokeWidth="0.75"
          fill="none"
          className="animate-ping"
          style={{ transformOrigin: '19.5px 5.5px', animationDuration: '0.8s' }}
        />
      )}
    </svg>
  );
}

/**
 * 2. CollegeInstitutionIcon
 * A minimal institutional structure integrated with learner nodes.
 * On hover/active/reacting: learner nodes illuminate progressively, connections expand, gleam wave.
 */
export function CollegeInstitutionIcon({
  size = 20,
  className = '',
  strokeWidth = 1.75,
  active = false,
  hovered = false,
  reacting = false,
  ...props
}: IconProps) {
  const isEngaged = active || hovered || reacting;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-300 ${reacting ? 'animate-icon-pop' : ''} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Institutional apex / pediment */}
      <path
        d="M3.5 8 L12 3.5 L20.5 8"
        className={`transition-opacity duration-300 ${reacting ? 'animate-icon-spark' : ''}`}
        strokeOpacity={isEngaged ? 1 : 0.9}
        strokeWidth={reacting ? strokeWidth + 0.3 : strokeWidth}
      />
      <line x1="3" y1="9" x2="21" y2="9" strokeOpacity={isEngaged ? 0.95 : 0.7} />
      
      {/* Foundation threshold base */}
      <line
        x1="3"
        y1="20.5"
        x2="21"
        y2="20.5"
        strokeOpacity={isEngaged ? 0.95 : 0.6}
        strokeWidth={reacting ? strokeWidth + 0.3 : strokeWidth}
      />
      
      {/* Synchronized cohort columns with progressively illuminated learner nodes */}
      {/* Cohort 1 */}
      <line
        x1="6.5"
        y1="9.5"
        x2="6.5"
        y2="20"
        className="transition-opacity duration-300"
        strokeOpacity={isEngaged ? 0.85 : 0.5}
      />
      <circle
        cx="6.5"
        cy="14.5"
        r={reacting ? 2.5 : isEngaged ? 2 : 1.5}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-1' : 'transition-all duration-200'}
        style={{ transformOrigin: '6.5px 14.5px', opacity: isEngaged ? 1 : 0.65 }}
      />

      {/* Cohort 2 (Center) */}
      <line
        x1="12"
        y1="9.5"
        x2="12"
        y2="20"
        className="transition-opacity duration-300"
        strokeOpacity={isEngaged ? 0.95 : 0.6}
      />
      <circle
        cx="12"
        cy="13.5"
        r={reacting ? 2.8 : isEngaged ? 2.25 : 1.5}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-2' : 'transition-all duration-300'}
        style={{ transformOrigin: '12px 13.5px', opacity: isEngaged ? 1 : 0.8 }}
      />
      {reacting && (
        <circle
          cx="12"
          cy="13.5"
          r="4.5"
          stroke="currentColor"
          strokeWidth="0.75"
          fill="none"
          className="animate-ping"
          style={{ transformOrigin: '12px 13.5px', animationDuration: '0.8s' }}
        />
      )}

      {/* Cohort 3 */}
      <line
        x1="17.5"
        y1="9.5"
        x2="17.5"
        y2="20"
        className="transition-opacity duration-300"
        strokeOpacity={isEngaged ? 0.85 : 0.5}
      />
      <circle
        cx="17.5"
        cy="14.5"
        r={reacting ? 2.5 : isEngaged ? 2 : 1.5}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-3' : 'transition-all duration-400'}
        style={{ transformOrigin: '17.5px 14.5px', opacity: isEngaged ? 1 : 0.65 }}
      />
    </svg>
  );
}

/**
 * 3. CompanyConnectionIcon
 * Two entities connected through a verification bridge.
 * On hover/active/reacting: animated verified signal pulses, magnetic inward snap, laser link flash.
 */
export function CompanyConnectionIcon({
  size = 20,
  className = '',
  strokeWidth = 1.75,
  active = false,
  hovered = false,
  reacting = false,
  ...props
}: IconProps) {
  const isEngaged = active || hovered || reacting;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-300 ${reacting ? 'animate-icon-pop' : ''} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Left Entity (Enterprise Partner) */}
      <circle
        cx="7.5"
        cy="12"
        r="4"
        className={`transition-all duration-300 ${reacting ? 'animate-magnetic-left' : ''}`}
        strokeOpacity={isEngaged ? 1 : 0.85}
        strokeWidth={reacting ? strokeWidth + 0.3 : strokeWidth}
      />
      <circle cx="7.5" cy="12" r={reacting ? 2 : 1.5} fill="currentColor" stroke="none" />

      {/* Right Entity (Verified Candidate Talent) */}
      <circle
        cx="16.5"
        cy="12"
        r="4"
        className={`transition-all duration-300 ${reacting ? 'animate-magnetic-right' : ''}`}
        strokeOpacity={isEngaged ? 1 : 0.85}
        strokeWidth={reacting ? strokeWidth + 0.3 : strokeWidth}
      />
      <circle cx="16.5" cy="12" r={reacting ? 2 : 1.5} fill="currentColor" stroke="none" />

      {/* Interlocking connection conduit / verification bridge */}
      <path
        d="M10.5 9.5 C11.5 11, 12.5 11, 13.5 9.5"
        className="transition-opacity duration-300"
        strokeOpacity={isEngaged ? 1 : 0.6}
      />
      <path
        d="M10.5 14.5 C11.5 13, 12.5 13, 13.5 14.5"
        className="transition-opacity duration-300"
        strokeOpacity={isEngaged ? 1 : 0.6}
      />
      
      {/* Central verification link */}
      <line
        x1="11.5"
        y1="12"
        x2="12.5"
        y2="12"
        strokeWidth={reacting ? strokeWidth + 1 : isEngaged ? strokeWidth + 0.5 : strokeWidth}
        className="transition-all duration-200"
      />

      {/* Verification signal notch */}
      <circle
        cx="12"
        cy="12"
        r={reacting ? 2.5 : isEngaged ? 1.5 : 0.75}
        fill="currentColor"
        stroke="none"
        className={reacting ? 'animate-node-pop-2' : 'transition-all duration-300'}
        style={{ transformOrigin: '12px 12px' }}
      />
      {reacting && (
        <circle
          cx="12"
          cy="12"
          r="4.5"
          stroke="currentColor"
          strokeWidth="0.75"
          fill="none"
          className="animate-ping"
          style={{ transformOrigin: '12px 12px', animationDuration: '0.8s' }}
        />
      )}
    </svg>
  );
}

/**
 * 4. CapabilityNetworkIcon
 * A recognizable connected-node symbol unifying Students, Colleges, and Companies.
 */
export function CapabilityNetworkIcon({
  size = 20,
  className = '',
  strokeWidth = 1.75,
  active = false,
  hovered = false,
  ...props
}: IconProps) {
  const isEngaged = active || hovered;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-300 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Central Ecosystem Hub Nexus */}
      <circle cx="12" cy="13" r={isEngaged ? 2.5 : 2} fill="currentColor" stroke="none" />
      <circle
        cx="12"
        cy="13"
        r={isEngaged ? 5 : 4.25}
        strokeOpacity={isEngaged ? 0.6 : 0.3}
        className="transition-all duration-300"
      />

      {/* Top Node (Colleges & Institutional Readiness) */}
      <circle cx="12" cy="4.5" r="2" />
      <line x1="12" y1="6.5" x2="12" y2="10.75" strokeOpacity={isEngaged ? 1 : 0.7} />

      {/* Bottom-Left Node (Students & Demonstrated Capability) */}
      <circle cx="5" cy="19" r="2" />
      <line x1="6.5" y1="17.5" x2="10.25" y2="14.5" strokeOpacity={isEngaged ? 1 : 0.7} />

      {/* Bottom-Right Node (Companies & Talent Discovery) */}
      <circle cx="19" cy="19" r="2" />
      <line x1="17.5" y1="17.5" x2="13.75" y2="14.5" strokeOpacity={isEngaged ? 1 : 0.7} />
    </svg>
  );
}

/**
 * 5. Five Refined Capability Journey Milestone Glyphs
 */

// Milestone 1: Career Direction (Compass orientation vector)
export function CareerDirectionIcon({
  size = 14,
  className = '',
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
      <polygon points="16.5 7.5 13.5 13.5 7.5 16.5 10.5 10.5 16.5 7.5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Milestone 2: Structured Learning (Stepped modular roadmap)
export function StructuredLearningIcon({
  size = 14,
  className = '',
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="4" y="4.5" width="16" height="4" rx="1.5" strokeOpacity="0.4" />
      <rect x="4" y="10" width="16" height="4" rx="1.5" strokeOpacity="0.7" />
      <rect x="4" y="15.5" width="16" height="4" rx="1.5" />
      <line x1="7.5" y1="4.5" x2="7.5" y2="19.5" strokeOpacity="0.6" />
    </svg>
  );
}

// Milestone 3: Real-World Projects (Production modular architecture cube)
export function RealWorldProjectsIcon({
  size = 14,
  className = '',
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z" />
      <line x1="12" y1="12" x2="20" y2="7.5" />
      <line x1="12" y1="12" x2="4" y2="7.5" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Milestone 4: Verified Skills (Audited proof seal & benchmark check)
export function VerifiedSkillsIcon({
  size = 14,
  className = '',
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3.5 L14.7 5.7 L18.2 5.5 L19.5 8.7 L22.4 10.6 L21.7 14.1 L23 17.3 L19.8 18.9 L18.9 22.3 L15.5 21.8 L12.8 23.9 L10.5 21.8 L7.1 22.3 L6.2 18.9 L3 17.3 L4.3 14.1 L3.6 10.6 L6.5 8.7 L7.8 5.5 L11.3 5.7 Z" strokeOpacity="0.4" />
      <circle cx="12" cy="12" r="6.5" />
      <path d="M9.5 12 L11.2 13.8 L14.8 10.2" />
    </svg>
  );
}

// Milestone 5: Opportunity (Direct matching gateway portal)
export function OpportunityIcon({
  size = 14,
  className = '',
  strokeWidth = 1.75,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" strokeOpacity="0.3" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3.5 V6" />
      <path d="M12 18 V20.5" />
      <path d="M3.5 12 H6" />
      <path d="M18 12 H20.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
