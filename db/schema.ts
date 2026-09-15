import {sql} from 'drizzle-orm';
import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';

export const blogPosts=sqliteTable('blog_posts',{
  slug:text('slug').primaryKey(),
  title:text('title').notNull(),
  excerpt:text('excerpt').notNull(),
  body:text('body').notNull(),
  heroImage:text('hero_image').notNull().default(''),
  ogImage:text('og_image').notNull().default(''),
  author:text('author').notNull().default('Pathwisse Team'),
  authorBio:text('author_bio').notNull().default(''),
  category:text('category').notNull(),
  tags:text('tags').notNull().default('[]'),
  publishDate:text('publish_date').notNull(),
  modifiedDate:text('modified_date').notNull(),
  status:text('status').notNull().default('draft'),
  featured:integer('featured').notNull().default(0),
  seoTitle:text('seo_title').notNull(),
  metaDescription:text('meta_description').notNull(),
  canonical:text('canonical').notNull().default(''),
  audience:text('audience').notNull().default('all'),
  relatedCareers:text('related_careers').notNull().default('[]'),
  relatedSkills:text('related_skills').notNull().default('[]'),
  relatedProducts:text('related_products').notNull().default('[]'),
  relatedGuides:text('related_guides').notNull().default('[]'),
  ctaType:text('cta_type').notNull().default('demo'),
  ctaUrl:text('cta_url').notNull().default('/contact'),
  faq:text('faq').notNull().default('[]'),
  references:text('references').notNull().default('[]'),
  createdAt:text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt:text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
},(t)=>[
  index('blog_status_date').on(t.status,t.publishDate),
  index('blog_category').on(t.category),
]);
export const leads=sqliteTable('leads',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull().default(''),organization:text('organization').notNull().default(''),organizationType:text('organization_type').notNull().default(''),designation:text('designation').notNull().default(''),interest:text('interest').notNull(),message:text('message').notNull().default(''),audience:text('audience').notNull().default(''),campaignId:text('campaign_id').notNull().default(''),campaignName:text('campaign_name').notNull().default(''),source:text('source').notNull(),landingPage:text('landing_page').notNull().default(''),referrer:text('referrer').notNull().default(''),utmSource:text('utm_source').notNull().default(''),utmMedium:text('utm_medium').notNull().default(''),utmCampaign:text('utm_campaign').notNull().default(''),utmTerm:text('utm_term').notNull().default(''),utmContent:text('utm_content').notNull().default(''),attribution:text('attribution').notNull().default('{}'),consent:integer('consent').notNull(),leadStatus:text('lead_status').notNull().default('new'),leadScore:integer('lead_score').notNull().default(0),owner:text('owner').notNull().default(''),crmSyncStatus:text('crm_sync_status').notNull().default('not_configured'),createdAt:text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),updatedAt:text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)},t=>[index('leads_email_created').on(t.email,t.createdAt),index('leads_campaign_created').on(t.campaignId,t.createdAt)]);
export const events=sqliteTable('events',{id:integer('id').primaryKey({autoIncrement:true}),event:text('event').notNull(),page:text('page').notNull(),target:text('target').notNull().default(''),properties:text('properties').notNull().default('{}'),sessionId:text('session_id').notNull().default(''),consentVersion:text('consent_version').notNull().default(''),createdAt:text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)});
