'use client';

import React, { useState } from 'react';
import { Send, Check, Loader2, Mail } from 'lucide-react';

export function NewsletterForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'saving') return;
    if (!email || !email.includes('@')) {
      setState('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setState('saving');
    setMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          name: email.split('@')[0],
          email: email.trim().toLowerCase(),
          interest: 'newsletter',
          consent: true,
          source: typeof window !== 'undefined' ? window.location.pathname : '/newsletter',
          landing_page: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          audience: 'students',
        }),
      });

      const res = await response.json() as { error?: string };
      if (!response.ok) {
        throw new Error(res.error || 'Failed to subscribe. Please try again.');
      }

      setState('success');
      setMessage('You’re subscribed! Expect thoughtful updates.');
      setEmail('');
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Subscription error. Please try again.');
    }
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center p-1.5 rounded-full bg-white border border-[#d5dfeb] shadow-sm focus-within:border-[#2458ae] focus-within:ring-2 focus-within:ring-[#2458ae]/20 transition-all duration-200"
      >
        <div className="pl-3.5 pr-2 text-[#708093] flex items-center">
          <Mail className="h-4 w-4" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== 'idle') setState('idle');
          }}
          disabled={state === 'saving' || state === 'success'}
          placeholder="your.email@domain.com"
          aria-label="Newsletter email subscription"
          required
          className="flex-1 min-w-0 bg-transparent text-sm text-[#142e50] placeholder:text-[#94a0ae] focus:outline-none py-1.5"
        />
        <button
          type="submit"
          disabled={state === 'saving' || state === 'success'}
          aria-label="Subscribe to newsletter"
          className="relative inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all duration-200 select-none cursor-pointer disabled:cursor-not-allowed"
          style={{
            background: state === 'success' ? '#10B981' : '#173c6e',
          }}
        >
          {state === 'saving' ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Joining…</span>
            </>
          ) : state === 'success' ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span>Subscribed</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <Send className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-xs text-left px-3 ${
            state === 'success' ? 'text-emerald-600 font-medium' : 'text-red-500'
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  );
}
