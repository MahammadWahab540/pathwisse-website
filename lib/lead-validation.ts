import { z } from 'zod';

const clean = (max: number) => z.string().trim().max(max).default('');

export const leadSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254).transform((v) => v.toLowerCase()),
  phone: clean(40),
  organization: clean(160),
  organization_type: clean(60),
  designation: clean(100),
  interest: z.enum(['student', 'college', 'upskilling', 'hiring', 'events', 'story', 'general']),
  message: clean(2000),
  audience: clean(40),
  campaign_id: clean(120),
  campaign_name: clean(160),
  source: clean(240),
  landing_page: clean(240),
  referrer: clean(500),
  utm_source: clean(100),
  utm_medium: clean(100),
  utm_campaign: clean(120),
  utm_term: clean(120),
  utm_content: clean(160),
  consent: z.literal(true),
  website: z.string().optional(),
  attribution: z.record(z.string(), z.string()).optional(),
}).superRefine((value, ctx) => {
  if (value.website) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Unable to accept this enquiry.', path: ['website'] });
  if (['college', 'upskilling', 'hiring'].includes(value.interest) && !value.organization) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Organization is required.', path: ['organization'] });
  }
});

export type LeadInput = z.infer<typeof leadSchema>;
