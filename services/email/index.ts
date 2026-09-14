import type { LeadInput } from '@/lib/lead-validation';

export async function enqueueLeadEmail(_lead: LeadInput) {
  return { status: 'not_configured' as const };
}
