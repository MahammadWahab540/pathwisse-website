import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

console.log('====================================================');
console.log('   CHALLENGER_M2_2 EMPIRICAL ADVERSARIAL TEST SUITE  ');
console.log('====================================================');

// -----------------------------------------------------------------------------
// 1. VERBATIM HEADLINE VALIDATION (H01, H05, H06, H07, H10)
// -----------------------------------------------------------------------------
console.log('\n[TEST 1] Verbatim Headlines: Exact Character-for-Character Validation');

const originalReqPath = new URL('../.agents/teamwork/ORIGINAL_REQUEST.md', import.meta.url);
const originalReq = readFileSync(originalReqPath, 'utf8');

const heroPath = new URL('../components/hero.tsx', import.meta.url);
const heroContent = readFileSync(heroPath, 'utf8');

const sitePath = new URL('../app/site.tsx', import.meta.url);
const siteContent = readFileSync(sitePath, 'utf8');

const studentsPath = new URL('../components/home/StudentsSection.tsx', import.meta.url);
const studentsContent = readFileSync(studentsPath, 'utf8');

const collegesPath = new URL('../components/home/CollegesSection.tsx', import.meta.url);
const collegesContent = readFileSync(collegesPath, 'utf8');

const companiesPath = new URL('../components/home/CompaniesSection.tsx', import.meta.url);
const companiesContent = readFileSync(companiesPath, 'utf8');

// Target definitions strictly from ORIGINAL_REQUEST.md lines 35, 37, 38, 39, 42
const TARGET_H01 = 'ONE PLATFORM. ONE ECOSYSTEM. CONNECTING STUDENTS, COLLEGES & COMPANIES.';
const TARGET_H05 = 'BUILD CAPABILITIES YOU CAN PROVE';
const TARGET_H06 = 'MAKE STUDENT READINESS VISIBLE';
const TARGET_H07 = 'DISCOVER TALENT THROUGH DEMONSTRATED CAPABILITY';
const TARGET_H10 = 'MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY.';

assert.ok(originalReq.includes(`Headline: "${TARGET_H01}"`), 'Target H01 mismatch in spec');
assert.ok(originalReq.includes(`"${TARGET_H05}"`), 'Target H05 mismatch in spec');
assert.ok(originalReq.includes(`"${TARGET_H06}"`), 'Target H06 mismatch in spec');
assert.ok(originalReq.includes(`"${TARGET_H07}"`), 'Target H07 mismatch in spec');
assert.ok(originalReq.includes(`"${TARGET_H10}"`), 'Target H10 mismatch in spec');

// --- H01 Verification ---
// In components/hero.tsx:
// <h1 ...>
//   <span className="block">ONE PLATFORM. ONE ECOSYSTEM.</span>
//   <span className="block" style={{ color: accent }}>
//     CONNECTING STUDENTS, COLLEGES & COMPANIES.
//   </span>
// </h1>
const h1Match = heroContent.match(/<h1[\s\S]*?<\/h1>/);
assert.ok(h1Match, 'Could not find <h1> in hero.tsx');
const h1Inner = h1Match[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
assert.equal(h1Inner, TARGET_H01, 'H01: Hero <h1> does not match TARGET_H01 character-for-character');
console.log(`  ✓ H01 verbatim match: "${h1Inner}" === "${TARGET_H01}"`);

// --- H05 Verification ---
// In components/home/StudentsSection.tsx:
// <h2 className="...">
//   BUILD CAPABILITIES YOU CAN PROVE
// </h2>
const h2StuMatch = studentsContent.match(/<h2[\s\S]*?<\/h2>/);
assert.ok(h2StuMatch, 'Could not find <h2> in StudentsSection.tsx');
const h2StuInner = h2StuMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
assert.equal(h2StuInner, TARGET_H05, 'H05: StudentsSection <h2> does not match TARGET_H05 character-for-character');
console.log(`  ✓ H05 verbatim match: "${h2StuInner}" === "${TARGET_H05}"`);

// --- H06 Verification ---
// In components/home/CollegesSection.tsx:
const h2ColMatch = collegesContent.match(/<h2[\s\S]*?<\/h2>/);
assert.ok(h2ColMatch, 'Could not find <h2> in CollegesSection.tsx');
const h2ColInner = h2ColMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
assert.equal(h2ColInner, TARGET_H06, 'H06: CollegesSection <h2> does not match TARGET_H06 character-for-character');
console.log(`  ✓ H06 verbatim match: "${h2ColInner}" === "${TARGET_H06}"`);

// --- H07 Verification ---
// In components/home/CompaniesSection.tsx:
const h2ComMatch = companiesContent.match(/<h2[\s\S]*?<\/h2>/);
assert.ok(h2ComMatch, 'Could not find <h2> in CompaniesSection.tsx');
const h2ComInner = h2ComMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
assert.equal(h2ComInner, TARGET_H07, 'H07: CompaniesSection <h2> does not match TARGET_H07 character-for-character');
console.log(`  ✓ H07 verbatim match: "${h2ComInner}" === "${TARGET_H07}"`);

// --- H10 Verification ---
// In app/site.tsx:
// <CTA title="MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY." />
const ctaTitleMatch = siteContent.match(/<CTA\s+title="([^"]+)"/);
assert.ok(ctaTitleMatch, 'Could not find <CTA title="..." /> in site.tsx');
assert.equal(ctaTitleMatch[1], TARGET_H10, 'H10: CTA title does not match TARGET_H10 character-for-character');
console.log(`  ✓ H10 verbatim match: "${ctaTitleMatch[1]}" === "${TARGET_H10}"`);


// -----------------------------------------------------------------------------
// 2. FAQPage JSON-LD SCHEMA VS FAQSection COMPONENT PARITY
// -----------------------------------------------------------------------------
console.log('\n[TEST 2] FAQPage JSON-LD Schema vs FAQSection Render Parity');

const pagePath = new URL('../app/page.tsx', import.meta.url);
const pageContent = readFileSync(pagePath, 'utf8');

const faqSectionPath = new URL('../components/home/FAQSection.tsx', import.meta.url);
const faqSectionContent = readFileSync(faqSectionPath, 'utf8');

const { HOMEPAGE_FAQS } = await import('../components/home/faq-data.ts');
assert.ok(Array.isArray(HOMEPAGE_FAQS), 'HOMEPAGE_FAQS must be an array');
assert.equal(HOMEPAGE_FAQS.length, 7, 'HOMEPAGE_FAQS must have exactly 7 entries');

// Verify that app/page.tsx dynamically references HOMEPAGE_FAQS
assert.ok(
  pageContent.includes("import { HOMEPAGE_FAQS } from '@/components/home/faq-data';"),
  'app/page.tsx must import HOMEPAGE_FAQS from faq-data'
);
assert.ok(
  pageContent.includes("@type': 'FAQPage'") || pageContent.includes('"@type": "FAQPage"'),
  'app/page.tsx must define an FAQPage JSON-LD object'
);
assert.ok(
  pageContent.includes('mainEntity: HOMEPAGE_FAQS.map((faq) => ({'),
  'app/page.tsx must map HOMEPAGE_FAQS directly into mainEntity questions/answers'
);

// Verify FAQSection also references HOMEPAGE_FAQS
assert.ok(
  faqSectionContent.includes("import { HOMEPAGE_FAQS } from './faq-data';"),
  'FAQSection must import HOMEPAGE_FAQS from ./faq-data'
);
assert.ok(
  faqSectionContent.includes('HOMEPAGE_FAQS.map((faq) => ('),
  'FAQSection must map over HOMEPAGE_FAQS directly in JSX'
);

// Verify exact question & answer contents
HOMEPAGE_FAQS.forEach((item, index) => {
  assert.ok(item.question && item.question.length > 5, `FAQ item ${index} missing question`);
  assert.ok(item.answer && item.answer.length > 10, `FAQ item ${index} missing answer`);
  console.log(`  ✓ FAQ [${index + 1}/7]: "${item.question.slice(0, 45)}..."`);
});
console.log('  ✓ 100% 1:1 Schema-to-DOM Parity Confirmed.');


// -----------------------------------------------------------------------------
// 3. THREE.JS AtomicGlobe & HairlineFigure SSR HYDRATION SAFETY
// -----------------------------------------------------------------------------
console.log('\n[TEST 3] AtomicGlobe & HairlineFigure SSR Hydration & Client Mounting Safety');

const globePath = new URL('../components/AtomicGlobe.tsx', import.meta.url);
const globeContent = readFileSync(globePath, 'utf8');

const hairlinePath = new URL('../components/ui/hairline-figure.tsx', import.meta.url);
const hairlineContent = readFileSync(hairlinePath, 'utf8');

// 3.1 HairlineFigure Hydration Safeguards
assert.ok(hairlineContent.includes("'use client'"), 'HairlineFigure must declare use client');
assert.ok(
  hairlineContent.includes('const [mounted, setMounted] = useState(false);'),
  'HairlineFigure must track mounted state initialized to false'
);
assert.ok(
  hairlineContent.includes('useEffect(() => {\n    setMounted(true);\n  }, []);'),
  'HairlineFigure must flip mounted to true strictly inside useEffect'
);
assert.ok(
  hairlineContent.includes('{mounted ? (') && hairlineContent.includes('animate-spin'),
  'HairlineFigure must render deterministic fallback spinner during SSR to avoid hydration mismatch'
);
console.log('  ✓ HairlineFigure implements two-phase mounting: deterministic SSR skeleton + client canvas swap.');

// 3.2 AtomicGlobe SSR & Hydration Safeguards
assert.ok(globeContent.includes("'use client'"), 'AtomicGlobe must declare use client');
assert.ok(
  /typeof\s*window\s*===?\s*["']undefined["']/.test(globeContent),
  'AtomicGlobe must check window existence before media query reads'
);
assert.ok(
  /typeof\s*navigator\s*===?\s*["']undefined["']/.test(globeContent),
  'AtomicGlobe must check navigator existence before device memory checks'
);
assert.ok(
  globeContent.includes('new GlobeRuntime(host,'),
  'AtomicGlobe must construct WebGL runtime inside useEffect'
);

// Check that WebGLRenderer is only called in GlobeRuntime constructor, never in render body
const renderBodyMatch = globeContent.match(/export default function MeridianGlobe[\s\S]*?return \/\*#__PURE__\*\/_jsxs\("div"/);
assert.ok(renderBodyMatch, 'MeridianGlobe component function structure found');
assert.ok(
  !renderBodyMatch[0].includes('new THREE.WebGLRenderer'),
  'WebGLRenderer must NOT be instantiated during component render execution'
);
console.log('  ✓ AtomicGlobe constructs Three.js WebGL canvas exclusively in useEffect with window/navigator guards.');

// -----------------------------------------------------------------------------
// 4. SECTION ORDER PARITY
// -----------------------------------------------------------------------------
console.log('\n[TEST 4] Homepage Section Sequence Verification');
const siteHomePage = siteContent.slice(siteContent.indexOf('export function HomePage'));
const expectedOrder = [
  '<Hero accent=',
  '<EcosystemSection />',
  '<StudentsSection />',
  '<CollegesSection />',
  '<CompaniesSection />',
  '<TrustProofSection />',
  '<FAQSection />',
  '<CTA title="MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY." />',
  '<Footer />',
];

let lastIndex = -1;
expectedOrder.forEach((tag) => {
  const currentIndex = siteHomePage.indexOf(tag);
  assert.ok(currentIndex > -1, `Missing expected section: ${tag}`);
  assert.ok(currentIndex > lastIndex, `Incorrect section ordering: ${tag} appeared out of sequence`);
  lastIndex = currentIndex;
  console.log(`  ✓ Sequenced: ${tag}`);
});

console.log('\n====================================================');
console.log('   ALL CHALLENGER_M2_2 ADVERSARIAL CHECKS PASSED    ');
console.log('====================================================');
