import { z } from 'zod';
import { CONSENT_VERSION } from './site-config';

export const analyticsEvents = [
  'page_view',
  'audience_select',
  'product_view',
  'career_view',
  'skill_view',
  'blog_view',
  'comparison_view',
  'cta_click',
  'form_start',
  'form_error',
  'form_submit',
  'lead_submit',
  'career_audit_start',
  'career_audit_complete',
  'webinar_view',
  'webinar_register',
  'demo_request',
  'pricing_view',
  'career_voice_click',
  'platform_click',
  'related_content_click',
  'scroll_50',
  'scroll_90',
  'waitlist_submit',
] as const;

export type AnalyticsEventName = typeof analyticsEvents[number];

export const analyticsEventSchema = z.object({
  event: z.enum(analyticsEvents),
  page: z.string().min(1).max(240),
  target: z.string().max(80).default(''),
  session_id: z.string().max(120).default(''),
  consent_version: z.string().max(40).default(CONSENT_VERSION),
  properties: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}),
});
