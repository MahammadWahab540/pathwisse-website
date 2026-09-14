import { z } from 'zod';

export const statusSchema = z.enum(['draft', 'review', 'scheduled', 'published', 'archived']);
export const audienceSchema = z.enum(['students', 'colleges', 'enterprise', 'all']);
export const pageKindSchema = z.enum(['student','college','workforce','hiring','product','career','skill','campaign','article','guide','comparison','pricing','trust','company','customer']);

export const faqSchema = z.tuple([z.string(), z.string()]);
export const sectionSchema = z.tuple([z.string(), z.string()]);

export const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  eyebrow: z.string().optional(),
  kind: pageKindSchema.optional(),
  cta: z.string().optional(),
  href: z.string().optional(),
  sections: z.array(sectionSchema),
  faq: z.array(faqSchema).optional(),
  related: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  noindex: z.boolean().optional(),
  status: statusSchema.default('published'),
  audience: audienceSchema.default('all'),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
});

export type PageData = z.infer<typeof pageSchema>;
export type HubData = { title: string; description: string; items: string[]; noindex?: boolean };

export const blogPostSchema = z.object({
  title: z.string(), slug: z.string(), excerpt: z.string(), body: z.string(), heroImage: z.string().optional(), ogImage: z.string().optional(),
  author: z.string(), authorBio: z.string(), category: z.string(), tags: z.array(z.string()), publishDate: z.string(), modifiedDate: z.string(),
  status: statusSchema, featured: z.boolean().default(false), seoTitle: z.string(), metaDescription: z.string(), canonical: z.string().optional(),
  audience: audienceSchema, relatedCareers: z.array(z.string()).default([]), relatedSkills: z.array(z.string()).default([]), relatedProducts: z.array(z.string()).default([]), relatedGuides: z.array(z.string()).default([]),
  ctaType: z.string(), ctaUrl: z.string(), faq: z.array(faqSchema).default([]), references: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

export const careerSchema = z.object({
  slug: z.string(), name: z.string(), shortSummary: z.string(), responsibilities: z.array(z.string()), roleOutcomes: z.array(z.string()), requiredSkills: z.array(z.string()), optionalSkills: z.array(z.string()), roadmap: z.array(z.string()), projects: z.array(z.string()), relatedCareers: z.array(z.string()), interviewPreparation: z.array(z.string()), product: z.string(), faq: z.array(faqSchema), references: z.array(z.object({ label: z.string(), url: z.string() })).default([]), seoTitle: z.string(), metaDescription: z.string(),
});
export type Career = z.infer<typeof careerSchema>;

export const skillSchema = z.object({
  slug: z.string(), name: z.string(), description: z.string(), whereUsed: z.array(z.string()), careers: z.array(z.string()), prerequisites: z.array(z.string()), progression: z.array(z.string()), exercises: z.array(z.string()), projects: z.array(z.string()), relatedSkills: z.array(z.string()), faq: z.array(faqSchema), resources: z.array(z.object({ label: z.string(), url: z.string() })).default([]), cta: z.string(),
});
export type Skill = z.infer<typeof skillSchema>;
