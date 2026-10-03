'use client';

import React from 'react';
import { ArrowRight, Check, Loader2, Sparkles, AlertCircle } from 'lucide-react';

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
  successText = 'Request received',
  errorText = 'Try again',
  className = '',
  disabled,
  ...props
}: MotionSubmitButtonProps) {
  const isSaving = status === 'saving';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <button
      {...props}
      disabled={disabled || isSaving || isSuccess}
      className={`relative group overflow-hidden select-none transition-all duration-300 ease-out active:scale-[0.98] ${className}`}
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
        width: '100%',
        minHeight: '52px',
        cursor: isSaving ? 'wait' : isSuccess ? 'default' : 'pointer',
        background: isSuccess
          ? '#10B981'
          : isError
          ? '#EF4444'
          : 'linear-gradient(135deg, #163664 0%, #204e8d 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: isSuccess
          ? '0 12px 28px -6px rgba(16, 185, 129, 0.45)'
          : isError
          ? '0 12px 28px -6px rgba(239, 68, 68, 0.45)'
          : '0 12px 28px -6px rgba(22, 54, 100, 0.4)',
      }}
    >
      {/* Light sheen animation across surface on hover */}
      <span 
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
      />

      {/* Submitting state with responsive spinner */}
      {isSaving && (
        <span className="flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-200">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span>{savingText}</span>
        </span>
      )}

      {/* Success state with check seal transition */}
      {isSuccess && (
        <span className="flex items-center gap-2.5 animate-in zoom-in-95 duration-200">
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </span>
          <span>{successText}</span>
        </span>
      )}

      {/* Error state */}
      {isError && (
        <span className="flex items-center gap-2.5 animate-in zoom-in-95 duration-200">
          <AlertCircle className="h-4 w-4 text-white" />
          <span>{errorText}</span>
        </span>
      )}

      {/* Idle state with interactive arrow bubble */}
      {!isSaving && !isSuccess && !isError && (
        <span className="flex items-center justify-between w-full">
          <span>{idleText}</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:translate-x-1 transition-all duration-200">
            <ArrowRight className="h-4 w-4 text-white" />
          </span>
        </span>
      )}
    </button>
  );
}
