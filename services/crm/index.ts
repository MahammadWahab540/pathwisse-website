import type { LeadInput } from '@/lib/lead-validation';

export type LeadSyncResult = { status: 'not_configured' | 'synced' | 'failed'; detail?: string };

export async function syncLeadToCrm(_lead: LeadInput): Promise<LeadSyncResult> {
  const webhook = typeof process !== 'undefined' ? process.env?.CRM_WEBHOOK_URL : undefined;
  if (!webhook) return { status: 'not_configured' };
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ source: 'pathwisse_website', lead: _lead }),
    });
    return response.ok ? { status: 'synced' } : { status: 'failed', detail: String(response.status) };
  } catch {
    return { status: 'failed' };
  }
}
