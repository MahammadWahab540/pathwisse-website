'use client';

import React from 'react';
import { ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';

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
  savingText = 'Submitting request…',
  successText = 'Request submitted',
  errorText = 'Try again',
  className = '',
  disabled,
  ...props
}: MotionSubmitButtonProps) {
  const isSaving = status === 'saving';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className={`relative w-full ${className}`}>
      <button
        {...props}
        disabled={disabled || isSaving || isSuccess}
        className="relative group w-full overflow-hidden select-none transition-all duration-200 ease-out active:scale-[0.99]"
        style={{
          borderRadius: '12px',
          padding: '14px 24px',
          fontWeight: 600,
          fontSize: '14.5px',
          letterSpacing: '-0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '50px',
          cursor: isSaving ? 'wait' : isSuccess ? 'default' : 'pointer',
          background: isSuccess
            ? '#059669'
            : isError
            ? '#dc2626'
            : '#142e50',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isSuccess
            ? '0 6px 20px -4px rgba(5, 150, 105, 0.35)'
            : isError
            ? '0 6px 20px -4px rgba(220, 38, 38, 0.35)'
            : '0 6px 20px -4px rgba(20, 46, 80, 0.32)',
        }}
      >
        {/* Subtle hover gradient illumination */}
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.06] transition-colors pointer-events-none" />

        {/* 1. SAVING: Clean fast spinner */}
        {isSaving && (
          <div className="flex items-center justify-center gap-2.5 text-white">
            <Loader2 className="h-4 w-4 animate-spin text-white/90" />
            <span className="font-medium text-sm">{savingText}</span>
          </div>
        )}

        {/* 2. SUCCESS: Clean checkmark */}
        {isSuccess && (
          <div className="flex items-center justify-center gap-2 text-white animate-in zoom-in-95 duration-150">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
            <span className="font-semibold text-sm">{successText}</span>
          </div>
        )}

        {/* 3. ERROR: Alert notice */}
        {isError && (
          <div className="flex items-center justify-center gap-2 text-white animate-in zoom-in-95 duration-150">
            <AlertCircle className="h-4 w-4 text-white" />
            <span className="font-medium text-sm">{errorText}</span>
          </div>
        )}

        {/* 4. IDLE: Clean standard Pathwisse button */}
        {!isSaving && !isSuccess && !isError && (
          <div className="flex items-center justify-between w-full">
            <span className="font-medium">{idleText}</span>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:translate-x-0.5 transition-all duration-150">
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
