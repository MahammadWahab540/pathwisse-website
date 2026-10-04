import * as React from "react"
import { cn } from "@/lib/utils"

export interface FieldProps {
  id?: string
  label?: string
  required?: boolean
  optionalBadge?: boolean
  error?: string
  helpText?: string
  children: React.ReactNode
  className?: string
}

export function Field({
  id,
  label,
  required = false,
  optionalBadge = false,
  error,
  helpText,
  children,
  className = "",
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5 text-left w-full", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-[#142e50]">
          <label htmlFor={id} className="cursor-pointer">
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
          {optionalBadge && (
            <span className="text-[11px] font-normal text-slate-400">Optional</span>
          )}
        </div>
      )}

      <div>{children}</div>

      {helpText && !error && (
        <p className="text-[11px] text-slate-500 leading-normal">{helpText}</p>
      )}

      {error && (
        <p id={id ? `${id}-error` : undefined} className="text-xs text-red-600 font-medium flex items-center gap-1" role="alert">
          <span className="text-red-500">⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
