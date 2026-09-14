import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const content = readFileSync(new URL('../content/index.ts', import.meta.url), 'utf8');
const config = readFileSync(new URL('../lib/site-config.ts', import.meta.url), 'utf8');
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');

for (const route of [
  'students',
  'colleges',
  'enterprise',
  'product/career-voice',
  'enterprise/upskilling',
  'enterprise/talent-intelligence',
  'compare/data-analyst-vs-business-analyst',
  'resources/blog/choose-career-path',
  'trust/privacy',
  'data-analyst',
  'sql',
]) {
  assert.match(content, new RegExp(route.replaceAll('/', '\\/')), `missing ${route}`);
}

for (const legacy of ['/products', '/enterprises', '/privacy']) {
  assert.match(config, new RegExp(legacy.replace('/', '\\/')), `missing redirect ${legacy}`);
}

assert.match(config, /https:\/\/pathwisse\.com/, 'production site URL default must be pathwisse.com');
assert.doesNotMatch(sitemap, /pathwisse-capability/, 'sitemap should not use preview URL');
