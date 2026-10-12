'use client';

import React from 'react';

interface BrandLogoProps {
  height?: number;
  className?: string;
  showTagline?: boolean;
}

/**
 * Official Pathwisse Brand Logo
 * Extracted directly from brand identity guidelines with transparent alpha:
 * - Stepped circuit path mark with vibrant orange energy node
 * - "Path" in deep navy blue (#103567) + "wisse" in royal blue (#2563EB)
 * - Tagline: "FROM POTENTIAL TO POSSIBILITY"
 */
export function BrandLogo({ height = 40, className = '', showTagline = true }: BrandLogoProps) {
  const src = showTagline
    ? '/brand/pathwisse-logo-clean.png'
    : '/brand/pathwisse-logo-compact.png';

  return (
    <img
      src={src}
      alt="Pathwisse - From Potential to Possibility"
      style={{ height: `${height}px`, width: 'auto' }}
      className={`object-contain shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
}

/**
 * Official Pathwisse Brand Mark (Icon Only)
 * Stepped circuit pathway with orange energy node
 */
export function BrandLogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/brand/pathwisse-mark-clean.png"
      alt="Pathwisse Mark"
      style={{ height: `${size}px`, width: 'auto' }}
      className={`object-contain shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
}
