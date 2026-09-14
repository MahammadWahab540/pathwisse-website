import type { LeadInput } from '@/lib/lead-validation';

export async function enqueueLeadAutomation(_lead: LeadInput) {
  return { status: 'not_configured' as const };
}
