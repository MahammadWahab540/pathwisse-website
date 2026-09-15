import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const content = readFileSync(new URL('../content/index.ts', import.meta.url), 'utf8');
const config = readFileSync(new URL('../lib/site-config.ts', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');

// Core pages that must exist in content/index.ts
for (const route of [
  'students',
  'colleges',
  'enterprise',
  'product',
  'product/career-voice',
  'product/career-roadmaps',
  'product/practice-lab',
  'product/enterprise-projects',
  'product/skill-passport',
  'product/readiness-intelligence',
  'product/job-intelligence',
  'product/placement-intelligence',
  'product/employability-analytics',
  'enterprise/upskilling',
  'enterprise/talent-intelligence',
  'colleges/placement-teams',
  'colleges/placement-readiness',
  'compare/data-analyst-vs-business-analyst',
  'trust/privacy',
  'data-analyst',
  'sql',
  'pricing',
]) {
  assert.match(content, new RegExp(route.replaceAll('/', '\\/')), `missing page: ${route}`);
}

// Legacy redirects must exist in site-config
for (const legacy of ['/products', '/enterprises', '/privacy']) {
  assert.match(config, new RegExp(legacy.replace('/', '\\/')), `missing redirect ${legacy}`);
}

// Blog posts are now served from DB, not content/index.ts
assert.doesNotMatch(content, /blogPosts/, 'blogPosts array should no longer be in content/index.ts');

assert.match(config, /https:\/\/pathwisse\.com/, 'production site URL default must be pathwisse.com');
assert.doesNotMatch(sitemap, /pathwisse-capability/, 'sitemap should not use preview URL');
