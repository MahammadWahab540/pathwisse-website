'use client';

import React from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

interface MotionSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: 'idle' | 'saving' | 'success' | 'error';
  idleText?: string;
  savingText?: string;
  successText?: string;
}

export function MotionSubmitButton({
  status,
  idleText = 'Send enquiry',
  savingText = 'Saving your request…',
  successText = 'Saved successfully',
  className = '',
  disabled,
  ...props
}: MotionSubmitButtonProps) {
  const isSaving = status === 'saving';
  const isSuccess = status === 'success';

  return (
    <button
      {...props}
      disabled={disabled || isSaving || isSuccess}
      className={`relative group overflow-hidden select-none transition-all duration-300 ease-out active:scale-[0.98] ${className}`}
      style={{
        borderRadius: '9999px',
        padding: '14px 28px',
        fontWeight: 600,
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '100%',
        minHeight: '52px',
        cursor: isSaving ? 'wait' : isSuccess ? 'default' : 'pointer',
        background: isSuccess
          ? '#10B981'
          : 'linear-gradient(135deg, #163664 0%, #1e4a8a 100%)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isSuccess
          ? '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
          : '0 10px 25px -5px rgba(22, 54, 100, 0.35)',
      }}
    >
      {/* Submitting state */}
      {isSaving && (
        <span className="flex items-center gap-2 animate-in fade-in duration-200">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span>{savingText}</span>
        </span>
      )}

      {/* Success state */}
      {isSuccess && (
        <span className="flex items-center gap-2 animate-in zoom-in-95 duration-200">
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </span>
          <span>{successText}</span>
        </span>
      )}

      {/* Idle / Error state */}
      {!isSaving && !isSuccess && (
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
