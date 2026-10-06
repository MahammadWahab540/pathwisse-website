'use client';

import React, { useEffect, useState, useId } from 'react';
import {
  Basket,
  Branches,
  Cabinet,
  Dish,
  Drawer,
  Elevator,
  Exploded,
  Keyboard,
  Laptop,
  Lockers,
  Loupe,
  Padlock,
  Patch,
  Phone,
  Phosphor,
  Plot,
  Plug,
  Query,
  Rail,
  Riffle,
  Router,
  Sieve,
  Slow,
  Terminal,
  Terrain,
  Turntable,
  Vault,
  type HairlineProps,
} from '@lucasmarkes/hairline/react';

export type HairlineFigureName =
  | 'basket'
  | 'branches'
  | 'cabinet'
  | 'dish'
  | 'drawer'
  | 'elevator'
  | 'exploded'
  | 'keyboard'
  | 'laptop'
  | 'lockers'
  | 'loupe'
  | 'padlock'
  | 'patch'
  | 'phone'
  | 'phosphor'
  | 'plot'
  | 'plug'
  | 'query'
  | 'rail'
  | 'riffle'
  | 'router'
  | 'sieve'
  | 'slow'
  | 'terminal'
  | 'terrain'
  | 'turntable'
  | 'vault';

const FIGURE_MAP: Record<HairlineFigureName, React.ComponentType<HairlineProps>> = {
  basket: Basket,
  branches: Branches,
  cabinet: Cabinet,
  dish: Dish,
  drawer: Drawer,
  elevator: Elevator,
  exploded: Exploded,
  keyboard: Keyboard,
  laptop: Laptop,
  lockers: Lockers,
  loupe: Loupe,
  padlock: Padlock,
  patch: Patch,
  phone: Phone,
  phosphor: Phosphor,
  plot: Plot,
  plug: Plug,
  query: Query,
  rail: Rail,
  riffle: Riffle,
  router: Router,
  sieve: Sieve,
  slow: Slow,
  terminal: Terminal,
  terrain: Terrain,
  turntable: Turntable,
  vault: Vault,
};

interface HairlineFigureProps {
  figure: HairlineFigureName;
  intensity?: number;
  theme?: 'auto' | 'light' | 'dark';
  label?: string;
  className?: string;
  containerClassName?: string;
  caption?: string;
  showCaption?: boolean;
  interactiveHint?: boolean;
}

export function HairlineFigure({
  figure,
  intensity = 0.65,
  theme = 'light',
  label,
  className = '',
  containerClassName = '',
  caption,
  showCaption = false,
  interactiveHint = false,
}: HairlineFigureProps) {
  const [mounted, setMounted] = useState(false);
  const [liveCaption, setLiveCaption] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const hintId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const Component = FIGURE_MAP[figure] || Terrain;

  return (
    <div
      className={`relative group/hairline select-none flex flex-col items-center justify-center transition-all duration-300 ${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full overflow-hidden transition-transform duration-300 ${
          isHovered ? 'scale-[1.02]' : ''
        } ${className}`}
        style={{ aspectRatio: '5 / 4' }}
      >
        {mounted ? (
          <Component
            intensity={intensity}
            theme={theme}
            label={label || `${figure} isometric illustration`}
            onRead={(text) => setLiveCaption(text)}
            className="w-full h-full cursor-crosshair"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-slate-50/50"
            style={{ aspectRatio: '5 / 4' }}
          >
            <div className="w-8 h-8 rounded-full border border-slate-200 border-t-slate-400 animate-spin opacity-40" />
          </div>
        )}
      </div>

      {interactiveHint && (
        <span
          id={hintId}
          className={`absolute bottom-2 right-2 text-[10px] font-mono tracking-tight px-1.5 py-0.5 rounded bg-white/90 border border-slate-200/80 text-slate-500 shadow-2xs transition-opacity duration-200 pointer-events-none ${
            isHovered ? 'opacity-90' : 'opacity-40'
          }`}
        >
          {isHovered ? '● responsive' : 'hover to test'}
        </span>
      )}

      {showCaption && (liveCaption || caption) && (
        <div className="mt-2 text-center text-xs font-mono text-slate-500 max-w-[280px] leading-tight">
          {liveCaption || caption}
        </div>
      )}
    </div>
  );
}
