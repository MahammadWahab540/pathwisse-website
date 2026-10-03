'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

interface MotionSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: 'idle' | 'saving' | 'success' | 'error';
  idleText?: string;
  savingText?: string;
  successText?: string;
  errorText?: string;
}

export function MotionSubmitButton({
  status,
  idleText = 'Request enterprise demo',
  savingText = 'Sending letter…',
  successText = 'Letter delivered',
  errorText = 'Try again',
  className = '',
  disabled,
  ...props
}: MotionSubmitButtonProps) {
  const isSaving = status === 'saving';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  // Animation cycle progress (0 to 1) for paper folding, wax sealing, and postal flight
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isSaving) {
      startTimeRef.current = performance.now();
      const duration = 2800; // Snappy 2.8s complete animation cycle

      const loop = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const p = Math.min(1, elapsed / duration);
        setProgress(p);

        if (p < 1) {
          animRef.current = requestAnimationFrame(loop);
        }
      };

      animRef.current = requestAnimationFrame(loop);
    } else if (isSuccess) {
      setProgress(1);
    } else {
      setProgress(0);
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isSaving, isSuccess]);

  // Interpolations based on progress
  // Phase 1: Letter paper fold (0.0 -> 0.4)
  // Phase 2: Wax seal stamp press (0.35 -> 0.55)
  // Phase 3: Postal envelope flight / launch (0.55 -> 0.95)
  // Phase 4: Delivered stamp settlement (0.95 -> 1.0)

  // Paper letter fold transforms
  const foldSide = Math.max(0, Math.min(1, (progress - 0.05) / 0.25)); // 0 to 1
  const foldTop = Math.max(0, Math.min(1, (progress - 0.2) / 0.2));   // 0 to 1

  // Wax seal appearance & press
  const sealAppear = Math.max(0, Math.min(1, (progress - 0.35) / 0.15));
  const sealScale = progress >= 0.45 && progress <= 0.55 ? 0.92 : 1;

  // Flight stage (letter swooshes up and forward like a paper glider into the postal air)
  const isFlying = progress >= 0.55 && progress < 0.95;
  const flightProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.38));
  
  // Bezier trajectory
  const flightX = flightProgress * 120; // Fly to the right
  const flightY = -Math.sin(flightProgress * Math.PI) * 55 - (flightProgress * 25); // Arc upwards
  const flightRotate = -8 + flightProgress * 22; // Aerodynamic angle
  const flightScale = 1 - flightProgress * 0.45; // Departs into distance
  const flightOpacity = progress >= 0.88 ? Math.max(0, 1 - (progress - 0.88) / 0.07) : 1;

  return (
    <div className={`relative w-full ${className}`}>
      <button
        {...props}
        disabled={disabled || isSaving || isSuccess}
        className="relative group w-full overflow-hidden select-none transition-all duration-300 ease-out active:scale-[0.98]"
        style={{
          borderRadius: '9999px',
          padding: '14px 28px',
          fontWeight: 650,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          minHeight: '54px',
          cursor: isSaving ? 'wait' : isSuccess ? 'default' : 'pointer',
          background: isSuccess
            ? '#059669'
            : isError
            ? '#DC2626'
            : 'linear-gradient(135deg, #142e50 0%, #1e4a8a 100%)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: isSuccess
            ? '0 12px 28px -6px rgba(5, 150, 105, 0.45)'
            : isError
            ? '0 12px 28px -6px rgba(220, 38, 38, 0.45)'
            : '0 12px 28px -6px rgba(20, 46, 80, 0.42)',
        }}
      >
        {/* Subtle sheen highlight */}
        <span 
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/12 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
        />

        {/* 1. SAVING: Full Letter Motion Animation Stage */}
        {isSaving && (
          <div className="relative flex items-center justify-center gap-4 w-full h-full py-1">
            {/* The 3D Letter & Envelope Assembly */}
            <div 
              className="relative w-11 h-8 shrink-0 select-none pointer-events-none"
              style={{
                perspective: '600px',
                transform: isFlying 
                  ? `translate3d(${flightX}px, ${flightY}px, 0) rotate(${flightRotate}deg) scale(${flightScale})`
                  : 'translate3d(0, 0, 0)',
                opacity: flightOpacity,
                transition: 'transform 0.05s linear',
              }}
            >
              {/* Envelope Body / Base Paper Card */}
              <div 
                className="absolute inset-0 rounded-[4px] bg-[#FAF8F5] border border-[#D5CEC5] shadow-md overflow-hidden flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                }}
              >
                {/* Internal Letter text lines showing before fold */}
                <div 
                  className="w-full h-full p-1.5 flex flex-col gap-1 transition-opacity duration-200"
                  style={{ opacity: foldTop > 0.5 ? 0 : 0.6 }}
                >
                  <div className="w-4/5 h-[1.5px] bg-[#A59E92] rounded" />
                  <div className="w-3/5 h-[1.5px] bg-[#A59E92] rounded" />
                  <div className="w-2/3 h-[1.5px] bg-[#A59E92] rounded" />
                </div>
              </div>

              {/* Envelope Flap 1: Bottom Pocket */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 44 32"
                fill="none"
              >
                <path 
                  d="M0 32 L22 15 L44 32 Z" 
                  fill="#F1EDE6" 
                  stroke="#D3CBC0" 
                  strokeWidth="0.75" 
                />
              </svg>

              {/* Envelope Flap 2: Left Side Fold */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1/2 origin-left transition-transform duration-200"
                style={{
                  transform: `rotateY(${foldSide * 180}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 22 32" fill="none">
                  <path d="M0 0 L22 16 L0 32 Z" fill="#EAE4DB" stroke="#D3CBC0" strokeWidth="0.75" />
                </svg>
              </div>

              {/* Envelope Flap 3: Right Side Fold */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/2 origin-right transition-transform duration-200"
                style={{
                  transform: `rotateY(${-foldSide * 180}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 22 32" fill="none">
                  <path d="M22 0 L0 16 L22 32 Z" fill="#EAE4DB" stroke="#D3CBC0" strokeWidth="0.75" />
                </svg>
              </div>

              {/* Envelope Flap 4: Top Sealing Flap (Folds down over letter) */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-300"
                style={{
                  transform: `rotateX(${-180 + foldTop * 180}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 44 16" fill="none">
                  <path d="M0 0 L22 16 L44 0 Z" fill="#E5DFD5" stroke="#C8BFB2" strokeWidth="0.75" />
                </svg>
              </div>

              {/* Wax Seal Stamp (Appears and seals the paper envelope) */}
              {sealAppear > 0 && (
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center shadow-md transition-transform duration-150"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, #EF4444 0%, #991B1B 75%, #7F1D1D 100%)',
                    transform: `translate(-50%, -50%) scale(${sealAppear * sealScale})`,
                    boxShadow: '0 2px 6px rgba(153, 27, 27, 0.6), inset 0 1px 1px rgba(255,255,255,0.4)',
                    border: '0.5px solid #7F1D1D',
                  }}
                >
                  <span className="text-[7px] font-black text-amber-200 leading-none">P</span>
                </div>
              )}
            </div>

            {/* Stage Text status */}
            <span className="text-white font-medium text-xs tracking-wide">
              {progress < 0.4 
                ? 'Folding letter…' 
                : progress < 0.65 
                ? 'Sealing with wax…' 
                : isFlying 
                ? 'Sending to Pathwisse…' 
                : 'Arriving at destination…'}
            </span>
          </div>
        )}

        {/* 2. SUCCESS: Verified Seal & Delivered Confirmation */}
        {isSuccess && (
          <div className="flex items-center justify-center gap-2.5 animate-in zoom-in-95 duration-200">
            {/* Sealed Gold Wax Badge */}
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #34D399 0%, #059669 80%, #064E3B 100%)',
                boxShadow: '0 2px 8px rgba(6, 78, 59, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
              }}
            >
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
            <span>{successText}</span>
          </div>
        )}

        {/* 3. ERROR: Alert Notice */}
        {isError && (
          <div className="flex items-center justify-center gap-2.5 animate-in zoom-in-95 duration-200">
            <AlertCircle className="h-4 w-4 text-white" />
            <span>{errorText}</span>
          </div>
        )}

        {/* 4. IDLE: Clean Premium Capsule with Interactive Arrow Disc */}
        {!isSaving && !isSuccess && !isError && (
          <div className="flex items-center justify-between w-full">
            <span>{idleText}</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:translate-x-1 transition-all duration-200">
              <ArrowRight className="h-4 w-4 text-white" />
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
