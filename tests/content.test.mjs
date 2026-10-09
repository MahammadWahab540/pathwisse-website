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

// Milestone M2 Homepage Verifications (H01 - H12)
const heroContent = readFileSync(new URL('../components/hero.tsx', import.meta.url), 'utf8');
const siteContent = readFileSync(new URL('../app/site.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
const studentsContent = readFileSync(new URL('../components/home/StudentsSection.tsx', import.meta.url), 'utf8');
const collegesContent = readFileSync(new URL('../components/home/CollegesSection.tsx', import.meta.url), 'utf8');
const companiesContent = readFileSync(new URL('../components/home/CompaniesSection.tsx', import.meta.url), 'utf8');

// H01: Hero headline verbatim
assert.match(heroContent, /ONE PLATFORM\. ONE ECOSYSTEM\./, 'missing H01 Hero headline part 1');
assert.match(heroContent, /CONNECTING STUDENTS, COLLEGES & COMPANIES\./, 'missing H01 Hero headline part 2');

// H02: Hero subheadline approved copy
assert.match(heroContent, /Where ambitious students turn real coursework into verified capability/, 'missing H02 subheadline');

// H03 & H04: Ecosystem Section in sequence
assert.match(siteContent, /<Hero accent=/, 'missing Hero in site.tsx');
assert.match(siteContent, /<EcosystemSection \/>/, 'missing EcosystemSection in site.tsx');

// H05: Students Section verbatim headline
assert.match(studentsContent, /BUILD CAPABILITIES YOU CAN PROVE/, 'missing H05 Students headline');

// H06: Colleges Section verbatim headline
assert.match(collegesContent, /MAKE STUDENT READINESS VISIBLE/, 'missing H06 Colleges headline');

// H07: Companies Section verbatim headline
assert.match(companiesContent, /DISCOVER TALENT THROUGH DEMONSTRATED CAPABILITY/, 'missing H07 Companies headline');

// H08: Trust & Proof Section
assert.match(siteContent, /<TrustProofSection \/>/, 'missing TrustProofSection in site.tsx');

// H09: FAQ Section & schema sync
assert.match(siteContent, /<FAQSection \/>/, 'missing FAQSection in site.tsx');
assert.match(pageContent, /HOMEPAGE_FAQS/, 'page.tsx must sync HOMEPAGE_FAQS');

// H10: Final CTA verbatim headline
assert.match(siteContent, /MAKE CAPABILITY VISIBLE\. CONNECT IT TO OPPORTUNITY\./, 'missing H10 Final CTA headline');

// 9-Stage exact sequence check in HomePage
const homePageContent = siteContent.slice(siteContent.indexOf('export function HomePage'));
const heroIdx = homePageContent.indexOf('<Hero');
const ecoIdx = homePageContent.indexOf('<EcosystemSection');
const stuIdx = homePageContent.indexOf('<StudentsSection');
const colIdx = homePageContent.indexOf('<CollegesSection');
const comIdx = homePageContent.indexOf('<CompaniesSection');
const truIdx = homePageContent.indexOf('<TrustProofSection');
const faqIdx = homePageContent.indexOf('<FAQSection');
const ctaIdx = homePageContent.indexOf('<CTA');
const footIdx = homePageContent.indexOf('<Footer');

assert.ok(
  heroIdx !== -1 &&
    ecoIdx !== -1 &&
    stuIdx !== -1 &&
    colIdx !== -1 &&
    comIdx !== -1 &&
    truIdx !== -1 &&
    faqIdx !== -1 &&
    ctaIdx !== -1 &&
    footIdx !== -1 &&
    heroIdx < ecoIdx &&
    ecoIdx < stuIdx &&
    stuIdx < colIdx &&
    colIdx < comIdx &&
    comIdx < truIdx &&
    truIdx < faqIdx &&
    faqIdx < ctaIdx &&
    ctaIdx < footIdx,
  'Strict 9-stage sequence must be enforced in HomePage'
);

// Run comprehensive adversarial test suite
await import('./adversarial-homepage.test.mjs');

// Run comprehensive student page test suite (S01 - S14)
await import('./students-page.test.mjs');

// Run empirical challenger adversarial test suite
await import('./challenger-students.test.mjs');

// Run reviewer_m3_2 adversarial stress test suite
await import('./reviewer_m3_2.test.mjs');



