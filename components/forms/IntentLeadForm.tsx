'use client';

import React, { useRef, useState } from 'react';
import { Check, ArrowRight, Building, User, Mail, Phone, Briefcase, Users, Layers, Calendar, MessageSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { MotionSubmitButton } from '@/components/ui/motion-submit-button';
import { track } from '@/app/tracking';

type Field = { 
  name: string; 
  label: string; 
  required?: boolean; 
  type?: string; 
  placeholder?: string; 
  textarea?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

const configs = {
  college: {
    interest: 'college',
    title: 'Request a student readiness audit',
    subtitle: 'See how Pathwisse measures cohort readiness before placement season begins.',
    success: 'Your college demo request has been saved.',
    button: 'Request college demo',
    fields: [
      { name: 'organization', label: 'College / University name', required: true, placeholder: 'e.g. Stanford University', icon: Building },
      { name: 'name', label: 'Placement head / contact name', required: true, placeholder: 'Dr. John Doe', icon: User },
      { name: 'email', label: 'Official email address', required: true, type: 'email', placeholder: 'name@college.edu', icon: Mail },
      { name: 'phone', label: 'Phone number', required: true, placeholder: '+91 90000 00000', icon: Phone },
      { name: 'student_count', label: 'Approx. student count', placeholder: 'e.g. 1,200 students', icon: Users },
      { name: 'graduation_year', label: 'Target graduation year', placeholder: 'e.g. 2027', icon: Calendar },
      { name: 'requested_program', label: 'Requested program focus', placeholder: 'Readiness audit, career accelerator, placement analytics…', icon: Layers },
      { name: 'placement_challenges', label: 'Key placement challenges', textarea: true, placeholder: 'Tell us where students currently need the most support…', icon: MessageSquare },
    ] as Field[],
  },
  enterprise: {
    interest: 'upskilling',
    title: 'Configure your enterprise walkthrough',
    subtitle: 'Share your team structure and technical skill requirements to tailor your private session.',
    success: 'Your enterprise request has been saved.',
    button: 'Request enterprise demo',
    fields: [
      { name: 'organization', label: 'Company name', required: true, placeholder: 'Acme Corporation', icon: Building },
      { name: 'name', label: 'Full name', required: true, placeholder: 'Sarah Jenkins', icon: User },
      { name: 'email', label: 'Work email', required: true, type: 'email', placeholder: 'sarah@company.com', icon: Mail },
      { name: 'phone', label: 'Direct phone (optional)', placeholder: '+1 (555) 000-0000', icon: Phone },
      { name: 'designation', label: 'Role / Designation', placeholder: 'VP of Engineering, Head of L&D, Talent Director…', icon: Briefcase },
      { name: 'employee_count', label: 'Engineering / Team size', placeholder: 'e.g. 250 - 500 team members', icon: Users },
      { name: 'skills_needed', label: 'Priority skills or roles', placeholder: 'AI engineering, distributed systems, data analytics…', icon: Layers },
      { name: 'timeline', label: 'Implementation timeline', placeholder: 'Current quarter, within 6 months, exploratory…', icon: Calendar },
      { name: 'training_requirements', label: 'Capability requirements & notes', textarea: true, placeholder: 'Describe your current capability gaps, tech stack, or learning objectives…', icon: MessageSquare },
    ] as Field[],
  },
};

export function IntentLeadForm({ variant }: { variant: keyof typeof configs }) {
  const config = configs[variant];
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const requestId = useRef('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'saving') return;
    if (!requestId.current) requestId.current = crypto.randomUUID();

    if (!consent) {
      setState('error');
      setMessage('Please confirm consent so the Pathwisse solutions team can respond.');
      return;
    }

    const form = new FormData(e.currentTarget);
    const q = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const extras: Record<string, string> = {};

    for (const [k, v] of form.entries()) {
      if (!['name', 'email', 'phone', 'organization', 'designation', 'website'].includes(k)) {
        extras[k] = String(v).slice(0, 500);
      }
    }

    const params = Object.fromEntries(
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].map((k) => [
        k,
        (q.get(k) || '').slice(0, 160),
      ])
    );

    setState('saving');
    setMessage('');

    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: requestId.current,
          name: form.get('name'),
          email: form.get('email'),
          phone: form.get('phone') || '',
          organization: form.get('organization'),
          designation: form.get('designation') || '',
          organization_type: variant,
          interest: config.interest,
          audience: variant === 'college' ? 'colleges' : 'enterprise',
          source: typeof window !== 'undefined' ? window.location.pathname : '/enterprise/request-demo',
          landing_page: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          campaign_id: q.get('campaign_id') || (typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '') : ''),
          campaign_name: typeof document !== 'undefined' ? document.title : '',
          message: JSON.stringify(extras),
          website: form.get('website') || '',
          consent,
          ...params,
        }),
      });

      const result = (await r.json()) as { error?: string };
      if (!r.ok) throw new Error(result.error || 'Unable to save your request.');

      setState('success');
      setMessage(config.success);
      track(variant === 'college' ? 'demo_request' : 'lead_submit', variant);
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Unable to save your request.');
      track('form_error', variant);
    }
  }

  if (state === 'success') {
    return (
      <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
          <Check className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#142e50] tracking-tight">Request Received</h2>
        <p className="text-sm text-[#586a80] max-w-md mx-auto leading-relaxed">{message}</p>
        <p className="text-xs text-[#8a98a8]">A solutions specialist will reach out within 24 business hours.</p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2458ae] hover:underline"
          >
            Back to Pathwisse <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} onFocus={() => track('form_start', variant)} className="space-y-6">
      <div className="border-b border-[#eef2f6] pb-4">
        <h2 className="text-2xl font-extrabold text-[#142e50] tracking-tight leading-snug">
          {config.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#586a80] mt-1 leading-relaxed">
          {config.subtitle}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {config.fields.map((f) => {
          const Icon = f.icon;
          const isFullWidth = f.textarea || f.name === 'organization' || f.name === 'training_requirements';

          return (
            <div
              key={f.name}
              className={`space-y-1.5 ${isFullWidth ? 'sm:col-span-2' : ''}`}
            >
              <label
                htmlFor={f.name}
                className="text-xs font-semibold text-[#142e50] flex items-center justify-between"
              >
                <span>
                  {f.label}
                  {f.required && <span className="text-red-500 ml-0.5">*</span>}
                </span>
              </label>

              <div className="relative group">
                {Icon && !f.textarea && (
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a0ae] group-focus-within:text-[#2458ae] transition-colors pointer-events-none">
                    <Icon className="w-4 h-4" />
                  </div>
                )}

                {f.textarea ? (
                  <textarea
                    id={f.name}
                    name={f.name}
                    required={f.required}
                    maxLength={2000}
                    placeholder={f.placeholder}
                    rows={4}
                    className="w-full rounded-xl border border-[#d5dfeb] bg-[#ffffff] p-3 text-sm text-[#142e50] placeholder:text-[#94a0ae] focus:border-[#2458ae] focus:ring-2 focus:ring-[#2458ae]/15 transition-all outline-none resize-y"
                  />
                ) : (
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type || 'text'}
                    required={f.required}
                    maxLength={254}
                    placeholder={f.placeholder}
                    className={`w-full rounded-xl border border-[#d5dfeb] bg-[#ffffff] h-11 text-sm text-[#142e50] placeholder:text-[#94a0ae] focus:border-[#2458ae] focus:ring-2 focus:ring-[#2458ae]/15 transition-all outline-none ${
                      Icon ? 'pl-10 pr-3.5' : 'px-3.5'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Honeypot field for spam bots */}
      <div className="honeypot" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="website">Leave empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Consent row */}
      <div className="pt-2">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#eef2f6]">
          <Checkbox
            id={`${variant}-consent`}
            checked={consent}
            onCheckedChange={(v) => {
              setConsent(v === true);
              if (state === 'error') setState('idle');
            }}
            className="mt-0.5"
          />
          <label htmlFor={`${variant}-consent`} className="text-xs text-[#586a80] leading-relaxed cursor-pointer select-none">
            I agree that Pathwisse may use these details to contact me regarding workforce capability solutions and demo scheduling. <a href="/trust/privacy" className="underline hover:text-[#142e50]">Data notice</a>.
          </label>
        </div>
      </div>

      {/* Error message */}
      {state === 'error' && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 leading-snug">
          {message}
        </div>
      )}

      {/* The Motion Submit CTA Button */}
      <div className="pt-2">
        <MotionSubmitButton
          status={state}
          idleText={config.button}
          savingText="Submitting demo request…"
          successText="Demo Request Saved"
          type="submit"
        />
      </div>

      <p className="text-[11px] text-center text-[#8a98a8]">
        No credit card required. Encrypted with TLS 1.3 enterprise standards.
      </p>
    </form>
  );
}
