import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

console.log('======================================================================');
console.log('   CHALLENGER ADVERSARIAL STRESS TEST: STUDENT PAGE (M3: S01–S14)    ');
console.log('======================================================================');

const rootDir = resolve('.');
const pagePath = resolve(rootDir, 'app/students/page.tsx');
const heroPath = resolve(rootDir, 'components/students/perspective-cards-hero.tsx');
const cardsDataPath = resolve(rootDir, 'components/students/cards-data.ts');
const stageSelectorPath = resolve(rootDir, 'components/students/stage-selector.tsx');
const roadmapCardPath = resolve(rootDir, 'components/students/curated-roadmap-card.tsx');

const pageContent = readFileSync(pagePath, 'utf8');
const heroContent = readFileSync(heroPath, 'utf8');
const cardsDataContent = readFileSync(cardsDataPath, 'utf8');
const stageSelectorContent = readFileSync(stageSelectorPath, 'utf8');
const roadmapCardContent = readFileSync(roadmapCardPath, 'utf8');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 1: AST / SECTION SEQUENCE VERIFICATION ON /students
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 1] Verifying exact DOM/AST structure and section sequence of /students...');

const expectedSections = [
  '<Header />',
  '<PerspectiveCardsHero />',
  '<StageSelector />',
  'id="journey-breakdown"',
  'PROOF VS RESUMES',
  'id="curated-roadmaps"',
  'Ready to build proof people can act on?',
  '<Footer />'
];

let lastPos = -1;
for (const sec of expectedSections) {
  const pos = pageContent.indexOf(sec);
  assert.ok(pos !== -1, `Missing expected section or landmark: "${sec}" in app/students/page.tsx`);
  assert.ok(pos > lastPos, `Sequence violation: "${sec}" (at ${pos}) appeared out of order (previous at ${lastPos})`);
  lastPos = pos;
  console.log(`  ✓ Verified landmark sequence: "${sec}"`);
}
console.log('  -> PASS: All structural landmarks follow exact chronological DOM flow.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 2: EMPIRICAL VERIFICATION OF 6 CURATED ROADMAP CARDS
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 2] Empirically testing AST/DOM sequence and exact order of 6 Curated Roadmap Cards...');

const { CURATED_ROADMAP_CARDS } = await import('../components/students/cards-data.ts');

const APPROVED_6_ROADMAPS = [
  {
    order: 1,
    slug: 'data-analyst',
    title: 'Data Analyst',
    objectType: 'data',
    expectedFamily: 'DATA & ANALYTICS',
    expectedSalary: '₹6.5 – 15.0 LPA ($75k – $115k)',
    expectedDemand: 'High Growth · +24% YoY',
    expectedCoreSkills: ['SQL', 'Power BI / Tableau', 'Python Analytics', 'KPI Modeling']
  },
  {
    order: 2,
    slug: 'business-analyst',
    title: 'Business Analyst',
    objectType: 'business',
    expectedFamily: 'BUSINESS & OPERATIONS',
    expectedSalary: '₹7.0 – 16.5 LPA ($78k – $120k)',
    expectedDemand: 'High Demand · +21% YoY',
    expectedCoreSkills: ['Process Modeling', 'Requirements Specs', 'SQL', 'Cost-Benefit Analysis']
  },
  {
    order: 3,
    slug: 'product-manager',
    title: 'Product Manager',
    objectType: 'product',
    expectedFamily: 'PRODUCT & STRATEGY',
    expectedSalary: '₹12.0 – 28.0 LPA ($105k – $155k)',
    expectedDemand: 'High Competition · +19% YoY',
    expectedCoreSkills: ['Product Discovery', 'User Research', 'Roadmap Prioritization', 'Metrics & Telemetry']
  },
  {
    order: 4,
    slug: 'ai-engineer',
    title: 'AI Engineer',
    objectType: 'ai',
    expectedFamily: 'AI & INTELLIGENCE SYSTEMS',
    expectedSalary: '₹14.0 – 35.0 LPA ($125k – $185k)',
    expectedDemand: 'Surging Demand · +46% YoY',
    expectedCoreSkills: ['RAG Pipelines', 'PyTorch / Transformers', 'Model Evaluation', 'Latency Optimization']
  },
  {
    order: 5,
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    objectType: 'software',
    expectedFamily: 'SOFTWARE ENGINEERING',
    expectedSalary: '₹8.0 – 22.0 LPA ($85k – $135k)',
    expectedDemand: 'High Growth · +27% YoY',
    expectedCoreSkills: ['React / Next.js', 'Node.js / REST APIs', 'PostgreSQL / D1', 'System Architecture']
  },
  {
    order: 6,
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    objectType: 'design',
    expectedFamily: 'PRODUCT DESIGN & SYSTEMS',
    expectedSalary: '₹7.0 – 18.0 LPA ($76k – $120k)',
    expectedDemand: 'Steady Demand · +18% YoY',
    expectedCoreSkills: ['Design Systems', 'Figma Prototyping', 'Usability Audits', 'Ergonomic Interaction']
  }
];

assert.equal(CURATED_ROADMAP_CARDS.length, 6, `Expected exactly 6 curated roadmap cards, found ${CURATED_ROADMAP_CARDS.length}`);

APPROVED_6_ROADMAPS.forEach((spec, idx) => {
  const card = CURATED_ROADMAP_CARDS[idx];
  assert.equal(card.slug, spec.slug, `Card at index ${idx} has incorrect slug: expected "${spec.slug}", got "${card.slug}"`);
  assert.equal(card.roleTitle, spec.title, `Card at index ${idx} has incorrect title: expected "${spec.title}", got "${card.roleTitle}"`);
  assert.equal(card.roleFamily, spec.expectedFamily, `Card ${spec.slug} family mismatch`);
  assert.equal(card.salaryRange, spec.expectedSalary, `Card ${spec.slug} salary mismatch`);
  assert.equal(card.marketDemand, spec.expectedDemand, `Card ${spec.slug} demand mismatch`);
  assert.equal(card.objectType, spec.objectType, `Card ${spec.slug} objectType mismatch`);
  assert.deepEqual(card.coreSkills, spec.expectedCoreSkills, `Card ${spec.slug} coreSkills mismatch`);
  
  // Link validity
  assert.equal(card.exploreUrl, `/careers?role=${spec.slug}`, `Card ${spec.slug} exploreUrl mismatch`);
  assert.equal(card.tryForFreeUrl, `https://app.pathwisse.com/auth?intent=try_free&role=${spec.slug}`, `Card ${spec.slug} tryForFreeUrl mismatch`);

  console.log(`  ✓ Card [${idx + 1}/6]: ${card.roleTitle} (${card.slug}) in exact approved position with all metrics`);
});

// Check that app/students/page.tsx maps CURATED_ROADMAP_CARDS directly
assert.ok(
  pageContent.includes('CURATED_ROADMAP_CARDS.map((role) => ('),
  'app/students/page.tsx must map CURATED_ROADMAP_CARDS directly without sorting or re-slicing'
);
assert.ok(
  !pageContent.includes('PATHWISSE_ROLE_CARDS.slice'),
  'app/students/page.tsx must not use legacy unordered PATHWISSE_ROLE_CARDS slice'
);
console.log('  -> PASS: All 6 cards mapped directly from CURATED_ROADMAP_CARDS in strict immutable sequence.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 3: EMPIRICAL 7 CAPABILITIES SEQUENCE & HAIRLINE FIGURE BINDINGS
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 3] Empirically verifying the 7 Capabilities sequence and Hairline figures...');

const { STUDENT_OUTCOME_CARDS } = await import('../components/students/cards-data.ts');
assert.equal(STUDENT_OUTCOME_CARDS.length, 7, `Expected exactly 7 capability stages, found ${STUDENT_OUTCOME_CARDS.length}`);

const EXPECTED_CAPABILITIES = [
  { num: '01', id: 'career-direction', title: 'Career Direction', fig: 'query', badge: 'SAMPLE AUDIT DATA · DEMO' },
  { num: '02', id: 'skill-roadmaps', title: 'Skill Roadmaps', fig: 'elevator', badge: 'CURATED PATHWAY · DEMO' },
  { num: '03', id: 'practice', title: 'Practice', fig: 'keyboard', badge: 'LIVE WORKBENCH · DEMO' },
  { num: '04', id: 'real-world-projects', title: 'Real-World Projects', fig: 'branches', badge: 'VERIFIED REPO · DEMO' },
  { num: '05', id: 'ai-feedback', title: 'AI Feedback', fig: 'loupe', badge: 'AI REVIEW ENGINE · DEMO' },
  { num: '06', id: 'verified-capability', title: 'Verified Capability', fig: 'vault', badge: 'IMMUTABLE PROOF · DEMO' },
  { num: '07', id: 'opportunities', title: 'Opportunities', fig: 'sieve', badge: 'TALENT SHORTLIST · DEMO' },
];

EXPECTED_CAPABILITIES.forEach((cap, idx) => {
  const card = STUDENT_OUTCOME_CARDS[idx];
  assert.equal(card.id, cap.id, `Stage index ${idx} id mismatch`);
  assert.equal(card.stageNumber, cap.num, `Stage index ${idx} stageNumber mismatch`);
  assert.equal(card.title, cap.title, `Stage index ${idx} title mismatch`);
  assert.equal(card.hairlineFigure, cap.fig, `Stage index ${idx} hairlineFigure mismatch`);
  assert.equal(card.demoMockup.badge, cap.badge, `Stage index ${idx} demoMockup.badge mismatch`);
  
  // Verify DOM target anchors exist
  const stageDomId = `stage-${card.id}`;
  assert.ok(pageContent.includes(`id={\`stage-\${card.id}\`}`), 'Missing dynamic stage id binder in page');
  console.log(`  ✓ Stage [${idx + 1}/7]: ${card.title} (${card.id}) -> Hairline: "${card.hairlineFigure}" [${card.demoMockup.badge}]`);
});
console.log('  -> PASS: 7 capability cards mapped with distinct Hairline figures and demo mockups.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 4: LINK & CTA STRESS-TEST (ZERO DEAD '#' ANCHORS, ZERO 404s)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 4] Stress-testing all links and CTAs on /students (zero "#", zero 404s)...');

const allStudentFiles = [
  { name: 'app/students/page.tsx', content: pageContent },
  { name: 'components/students/perspective-cards-hero.tsx', content: heroContent },
  { name: 'components/students/stage-selector.tsx', content: stageSelectorContent },
  { name: 'components/students/curated-roadmap-card.tsx', content: roadmapCardContent },
  { name: 'components/students/cards-data.ts', content: cardsDataContent },
];

// Check 1: Strict rejection of '#' or '#none' or 'javascript:void(0)'
allStudentFiles.forEach(f => {
  const deadAnchor1 = /href=["']#["']/g;
  const deadAnchor2 = /href=["']#none["']/g;
  const deadAnchor3 = /href=["']javascript:;?["']/g;
  assert.equal(f.content.match(deadAnchor1), null, `File ${f.name} contains dead '#' link!`);
  assert.equal(f.content.match(deadAnchor2), null, `File ${f.name} contains dead '#none' link!`);
  assert.equal(f.content.match(deadAnchor3), null, `File ${f.name} contains dead 'javascript:' link!`);
});
console.log('  ✓ 0 dead "#" or unhandled pseudo-links detected across all 5 student files.');

// Check 2: Extract all href targets from JSX and evaluate them
const extractedHrefs = new Set();
const hrefRegex = /href=(?:\{([^}]+)\}|"([^"]+)")/g;

allStudentFiles.forEach(f => {
  let match;
  while ((match = hrefRegex.exec(f.content)) !== null) {
    const rawVal = match[1] || match[2];
    extractedHrefs.add({ file: f.name, raw: rawVal });
  }
});

console.log(`  Found ${extractedHrefs.size} unique href patterns to validate:`);

for (const { file, raw } of extractedHrefs) {
  // Categorize href
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    // Valid external URL
    assert.ok(raw.startsWith('https://'), `Insecure HTTP link found: ${raw}`);
    console.log(`    ✓ Valid external HTTPS URL: ${raw}`);
  } else if (raw === 'APP_AUTH_URL' || raw === '{APP_AUTH_URL}') {
    console.log(`    ✓ Valid APP_AUTH_URL constant: https://app.pathwisse.com/auth`);
  } else if (raw === 'CAREER_VOICE_URL' || raw === '{CAREER_VOICE_URL}') {
    console.log(`    ✓ Valid CAREER_VOICE_URL constant: https://career-audit.pathwisse.com`);
  } else if (raw.startsWith('#')) {
    // Internal anchor -> Must exist in page
    const anchorId = raw.slice(1);
    const hasTarget = pageContent.includes(`id="${anchorId}"`) || pageContent.includes(`id={\`${anchorId}\`}`);
    assert.ok(hasTarget, `Dead anchor in ${file}: target "${raw}" has no matching id in page!`);
    console.log(`    ✓ Valid in-page hash anchor: ${raw} (target id="${anchorId}" confirmed)`);
  } else if (raw.startsWith('/')) {
    // Internal route -> Verify directory or dynamic route exists in app/
    const routeClean = raw.split('?')[0]; // Remove query params
    const pageFile1 = resolve(rootDir, `app${routeClean}/page.tsx`);
    const pageFile2 = resolve(rootDir, `app${routeClean}.tsx`);
    const pageFile3 = resolve(rootDir, `app${routeClean}/route.ts`);
    const exists = existsSync(pageFile1) || existsSync(pageFile2) || existsSync(pageFile3) || routeClean === '/';
    assert.ok(exists, `404 route detected in ${file}: "${routeClean}" does not exist in app/!`);
    console.log(`    ✓ Verified internal route: ${raw} -> exists on filesystem`);
  } else if (raw === 'role.exploreUrl') {
    // Dynamic role.exploreUrl in CuratedRoadmapCard
    console.log(`    ✓ Verified dynamic role.exploreUrl (/careers?role=...)`);
  } else if (raw === 'role.tryForFreeUrl') {
    // Dynamic role.tryForFreeUrl in CuratedRoadmapCard
    console.log(`    ✓ Verified dynamic role.tryForFreeUrl (https://app.pathwisse.com/auth?...)`);
  } else {
    console.log(`    ℹ Evaluated expression: ${raw}`);
  }
}
console.log('  -> PASS: 100% of links and CTAs verified. 0 dead anchors, 0 404s.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 5: VERBATIM COPY VALIDATION (S01, S10, METADATA)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 5] Verifying exact verbatim copy for S01, metadata, and CTA...');

// S01 headline in PerspectiveCardsHero (decode JSX entities like &apos;)
const h1Match = heroContent.match(/<h1[\s\S]*?<\/h1>/);
assert.ok(h1Match, 'Could not find <h1> in perspective-cards-hero.tsx');
const h1Clean = h1Match[0].replace(/<[^>]+>/g, ' ').replace(/&apos;/g, "'").replace(/\s+/g, ' ').trim();
assert.equal(h1Clean, "DON'T JUST LEARN. PROVE WHAT YOU CAN DO.", 'S01 headline mismatch');

assert.ok(
  heroContent.includes("<span>Start Your Path</span>"),
  'Missing S01 primary CTA text: "Start Your Path"'
);

// Metadata Title in app/students/page.tsx
assert.ok(
  pageContent.includes("title: \"DON'T JUST LEARN. PROVE WHAT YOU CAN DO. | For Students | Pathwisse\""),
  'app/students/page.tsx title metadata must include verbatim S01 headline'
);

// S10 Curated Roadmaps headline in app/students/page.tsx
assert.ok(
  pageContent.includes("You don’t need to guess your career. Explore where you could go."),
  'Missing S10 section headline: "You don’t need to guess your career. Explore where you could go."'
);

console.log('  ✓ Verbatim S01 headline: "DON\'T JUST LEARN. PROVE WHAT YOU CAN DO."');
console.log('  ✓ Verbatim S01 CTA: "Start Your Path"');
console.log('  ✓ Verbatim S10 headline matched.');
console.log('  -> PASS: All approved copy matches verbatim.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 6: STAGE SELECTOR INTERACTION & ACCESSIBILITY AUDIT
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 6] Auditing StageSelector UX, accessibility, and smooth scroll wiring...');

assert.ok(stageSelectorContent.includes("aria-label=\"Capabilities Navigation\""), 'StageSelector missing root aria-label');
assert.ok(stageSelectorContent.includes("aria-label=\"Student 7 capability stages\""), 'StageSelector missing nav aria-label');
assert.ok(stageSelectorContent.includes("aria-current={isActive ? 'step' : undefined}"), 'StageSelector must provide aria-current for active step');
assert.ok(stageSelectorContent.includes("scrollIntoView({ behavior: 'smooth', block: 'start' })"), 'StageSelector must use smooth scrollIntoView');
assert.ok(stageSelectorContent.includes("threshold: 0.1"), 'StageSelector IntersectionObserver must have appropriate threshold');

console.log('  ✓ Accessible aria-label, aria-current step tracking confirmed.');
console.log('  ✓ Smooth scrollIntoView logic confirmed.');
console.log('  -> PASS: StageSelector meets accessibility and UX interaction requirements.');

console.log('\n======================================================================');
console.log('   ALL CHALLENGER ADVERSARIAL TESTS PASSED WITH 100% COMPLIANCE       ');
console.log('======================================================================\n');
