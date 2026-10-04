import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-150 outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* CMP-01: Primary Button */
        default:
          "bg-[#173c6e] text-white hover:bg-[#122f56] active:bg-[#0c213d] focus-visible:ring-[#173c6e] shadow-sm",
        /* CMP-01: Primary Accent Variant */
        primary:
          "bg-[#173c6e] text-white hover:bg-[#122f56] active:bg-[#0c213d] focus-visible:ring-[#173c6e] shadow-sm",
        accent:
          "bg-[#2458ae] text-white hover:bg-[#1e4a8a] active:bg-[#163868] focus-visible:ring-[#2458ae] shadow-sm",
        /* CMP-02: Secondary Button */
        secondary:
          "bg-[#f1f5f9] text-[#173c6e] hover:bg-[#e2e8f0] active:bg-[#cbd5e1] border border-[#e2e8f0] focus-visible:ring-[#173c6e]",
        /* CMP-03: Text Button / Link */
        ghost:
          "bg-transparent text-[#173c6e] hover:bg-[#f1f5f9] active:bg-[#e2e8f0] focus-visible:ring-[#173c6e]",
        link:
          "bg-transparent text-[#2458ae] hover:underline focus-visible:ring-[#2458ae] p-0 h-auto",
        /* CMP-04: Inverse Button (for dark navy cards and hero panels) */
        inverse:
          "bg-white text-[#142e50] hover:bg-slate-100 active:bg-slate-200 shadow-md focus-visible:ring-white focus-visible:ring-offset-[#142e50]",
        inverseOutline:
          "bg-white/10 text-white hover:bg-white/20 active:bg-white/30 border border-white/25 focus-visible:ring-white focus-visible:ring-offset-[#142e50]",
        /* CMP-05: Destructive Button */
        destructive:
          "bg-[#dc2626] text-white hover:bg-[#b91c1c] active:bg-[#991b1b] focus-visible:ring-[#dc2626] shadow-sm",
        outline:
          "border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-[#f8fafc] active:bg-[#f1f5f9] focus-visible:ring-[#173c6e] shadow-2xs",
      },
      /* CMP-06: 40px + 48px sizes, plus compact sizes */
      size: {
        default: "h-10 px-5 py-2 text-sm rounded-lg",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-5 py-2 text-sm rounded-lg", // 40px
        lg: "h-12 px-7 py-3 text-base rounded-xl font-semibold", // 48px
        pill: "h-11 px-7 py-2.5 text-sm rounded-full font-semibold",
        icon: "h-10 w-10 p-0 rounded-lg",
        "icon-sm": "h-8 w-8 p-0 rounded-md",
        "icon-xs": "size-6 rounded-md",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-current" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }

