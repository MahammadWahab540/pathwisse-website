import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface CTABandProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  className?: string;
}

export function CTABand({
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}: CTABandProps) {
  return (
    <section className={`py-16 md:py-20 bg-[#173c6e] text-white border-t border-[#122f56] ${className}`}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] tracking-tight text-white mb-4 leading-tight">
          {title}
        </h2>

        {/* Description: 60ch max width constraint, approx 16px below heading */}
        <p className="text-[#e2e8f0] text-base sm:text-lg max-w-[60ch] mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          {description}
        </p>

        {/* Actions row: 32px below description, centered with proper contrast */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            variant="inverse"
            size="lg"
            className="shadow-lg hover:shadow-xl font-bold transition-all text-[#173c6e]"
          >
            <a
              href={primaryAction.href}
              {...(primaryAction.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {primaryAction.label} <ArrowRight size={18} />
            </a>
          </Button>

          {secondaryAction && (
            <Button
              asChild
              variant="inverseOutline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white transition-all font-semibold"
            >
              <a
                href={secondaryAction.href}
                {...(secondaryAction.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {secondaryAction.label} <ArrowUpRight size={17} />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
