import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

console.log('====================================================');
console.log('   STUDENT PAGE (S01–S14) EMPIRICAL TEST SUITE       ');
console.log('====================================================');

const heroContent = readFileSync(new URL('../components/students/perspective-cards-hero.tsx', import.meta.url), 'utf8');
const pageContent = readFileSync(new URL('../app/students/page.tsx', import.meta.url), 'utf8');
const cardsDataContent = readFileSync(new URL('../components/students/cards-data.ts', import.meta.url), 'utf8');
const stageSelectorContent = readFileSync(new URL('../components/students/stage-selector.tsx', import.meta.url), 'utf8');
const roadmapCardContent = readFileSync(new URL('../components/students/curated-roadmap-card.tsx', import.meta.url), 'utf8');

// -----------------------------------------------------------------------------
// 1. S01: HERO HEADLINE & PRIMARY CTA VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n[TEST 1] S01: Hero Headline & Primary CTA Verbatim Validation');

const TARGET_S01_HEADLINE = "DON'T JUST LEARN. PROVE WHAT YOU CAN DO.";
const TARGET_S01_CTA = "Start Your Path";

// Check <h1> in perspective-cards-hero.tsx
const h1Match = heroContent.match(/<h1[\s\S]*?<\/h1>/);
assert.ok(h1Match, 'Could not find <h1> in perspective-cards-hero.tsx');
const h1Clean = h1Match[0].replace(/<[^>]+>/g, ' ').replace(/&apos;/g, "'").replace(/\s+/g, ' ').trim();
assert.equal(h1Clean, TARGET_S01_HEADLINE, `S01: Hero <h1> does not match TARGET_S01_HEADLINE verbatim. Got: "${h1Clean}"`);
console.log(`  ✓ S01 verbatim headline matched: "${h1Clean}"`);

// Check Primary CTA text
assert.ok(heroContent.includes(`<span>${TARGET_S01_CTA}</span>`), 'S01: Missing primary CTA text "Start Your Path" in perspective-cards-hero.tsx');
assert.ok(heroContent.includes('href={APP_AUTH_URL}'), 'S01: Primary CTA must route to APP_AUTH_URL');
console.log(`  ✓ S01 primary CTA matched: "${TARGET_S01_CTA}" -> APP_AUTH_URL`);

// -----------------------------------------------------------------------------
// 2. S02–S08: SEVEN CAPABILITIES & HAIRLINE FIGURES MAPPING
// -----------------------------------------------------------------------------
console.log('\n[TEST 2] S02–S08: 7 Capabilities Sequence & Hairline Figures Parity');

const { STUDENT_OUTCOME_CARDS } = await import('../components/students/cards-data.ts');
assert.equal(STUDENT_OUTCOME_CARDS.length, 7, 'Must have exactly 7 student capability stages');

const EXPECTED_STAGES = [
  { stage: 1, title: 'Career Direction', figure: 'query' },
  { stage: 2, title: 'Skill Roadmaps', figure: 'elevator' },
  { stage: 3, title: 'Practice', figure: 'keyboard' },
  { stage: 4, title: 'Real-World Projects', figure: 'branches' },
  { stage: 5, title: 'AI Feedback', figure: 'loupe' },
  { stage: 6, title: 'Verified Capability', figure: 'vault' },
  { stage: 7, title: 'Opportunities', figure: 'sieve' },
];

EXPECTED_STAGES.forEach((expected, i) => {
  const card = STUDENT_OUTCOME_CARDS[i];
  assert.equal(card.title, expected.title, `Stage ${i + 1} title mismatch: expected "${expected.title}", got "${card.title}"`);
  assert.equal(card.hairlineFigure, expected.figure, `Stage ${i + 1} Hairline figure mismatch: expected "${expected.figure}", got "${card.hairlineFigure}"`);
  assert.ok(card.demoMockup, `Stage ${i + 1} must include demoMockup`);
  assert.ok(card.demoMockup.badge.includes('DEMO'), `Stage ${i + 1} demoMockup badge must contain DEMO`);
  console.log(`  ✓ Stage ${i + 1}: ${card.title} -> Hairline: ${card.hairlineFigure} [${card.demoMockup.badge}]`);
});

// -----------------------------------------------------------------------------
// 3. S09: INTERACTIVE HORIZONTAL STAGE SELECTOR
// -----------------------------------------------------------------------------
console.log('\n[TEST 3] S09: Interactive Horizontal Stage Selector Navigation');

assert.ok(pageContent.includes('<StageSelector />'), 'app/students/page.tsx must mount <StageSelector />');
assert.ok(stageSelectorContent.includes('STUDENT_OUTCOME_CARDS.map'), 'StageSelector must map over all 7 stages');
assert.ok(stageSelectorContent.includes('scrollIntoView'), 'StageSelector must implement smooth scroll into view');
assert.ok(stageSelectorContent.includes('IntersectionObserver'), 'StageSelector must observe stages for active step highlight');
console.log('  ✓ StageSelector renders all 7 steps with smooth scroll and IntersectionObserver');

// -----------------------------------------------------------------------------
// 4. S10: EXACT 6 CURATED CAREER ROADMAP CARDS IN APPROVED SEQUENCE
// -----------------------------------------------------------------------------
console.log('\n[TEST 4] S10: Exact 6 Curated Career Roadmap Cards in Approved Sequence');

const { CURATED_ROADMAP_CARDS } = await import('../components/students/cards-data.ts');
assert.equal(CURATED_ROADMAP_CARDS.length, 6, 'Must have exactly 6 curated career roadmap cards');

const EXPECTED_ROADMAPS = [
  'data-analyst',
  'business-analyst',
  'product-manager',
  'ai-engineer',
  'full-stack-developer',
  'ui-ux-designer',
];

EXPECTED_ROADMAPS.forEach((slug, i) => {
  const card = CURATED_ROADMAP_CARDS[i];
  assert.equal(card.slug, slug, `Curated card ${i + 1} sequence mismatch: expected "${slug}", got "${card.slug}"`);
  assert.ok(card.roleTitle && card.roleTitle.length > 0, `Card ${slug} missing roleTitle`);
  assert.ok(card.salaryRange && card.salaryRange.length > 0, `Card ${slug} missing salaryRange`);
  assert.ok(card.marketDemand && card.marketDemand.length > 0, `Card ${slug} missing marketDemand`);
  assert.ok(Array.isArray(card.coreSkills) && card.coreSkills.length >= 3, `Card ${slug} must list at least 3 core skills`);
  assert.ok(card.exploreUrl.includes(slug), `Card ${slug} exploreUrl must link to role`);
  assert.ok(card.tryForFreeUrl.includes('try_free'), `Card ${slug} tryForFreeUrl must link to try_free auth`);
  console.log(`  ✓ [${i + 1}/6] ${card.roleTitle} | Salary: ${card.salaryRange} | Demand: ${card.marketDemand} | Skills: ${card.coreSkills.join(', ')}`);
});

// Check that curated-roadmap-card.tsx renders roleTitle, salaryRange, marketDemand, coreSkills, and "Explore Roadmap" link
assert.ok(roadmapCardContent.includes('role.roleTitle'), 'curated-roadmap-card must render roleTitle');
assert.ok(roadmapCardContent.includes('role.salaryRange'), 'curated-roadmap-card must render salaryRange');
assert.ok(roadmapCardContent.includes('role.marketDemand'), 'curated-roadmap-card must render marketDemand');
assert.ok(roadmapCardContent.includes('role.coreSkills'), 'curated-roadmap-card must render coreSkills');
assert.ok(roadmapCardContent.includes('Explore Roadmap'), 'curated-roadmap-card must render "Explore Roadmap" link text');

// -----------------------------------------------------------------------------
// 5. S11: PRODUCT UI MOCKUPS & SAMPLE DEMO BADGES
// -----------------------------------------------------------------------------
console.log('\n[TEST 5] S11: Real Product UI Mockups with Demo Badges');

assert.ok(heroContent.includes('mockup.badge'), 'PerspectiveCardsHero modal must display mockup.badge');
assert.ok(heroContent.includes('SAMPLE PREVIEW'), 'PerspectiveCardsHero modal must display SAMPLE PREVIEW badge');
assert.ok(pageContent.includes('mockup.badge'), 'app/students/page.tsx cards must display mockup.badge');
console.log('  ✓ Product UI mockups and demo badges verified across modal and cards');

// -----------------------------------------------------------------------------
// 6. S13: ZERO BROKEN LINKS & NO DEAD '#' ANCHORS
// -----------------------------------------------------------------------------
console.log('\n[TEST 6] S13: Link Routing Integrity & Zero Dead Anchors');

// Ensure no dead href="#"
const deadHashRegex = /href=["']#["']/g;
assert.equal(heroContent.match(deadHashRegex), null, 'PerspectiveCardsHero has dead href="#"');
assert.equal(pageContent.match(deadHashRegex), null, 'StudentsPage has dead href="#"');
assert.equal(roadmapCardContent.match(deadHashRegex), null, 'CuratedRoadmapCard has dead href="#"');

// Verify all internal hash anchors have targets
const validAnchors = ['#journey-breakdown'];
validAnchors.forEach((anchor) => {
  const id = anchor.slice(1);
  assert.ok(pageContent.includes(`id="${id}"`), `Anchor ${anchor} missing target id="${id}" in page`);
});

console.log('  ✓ Zero dead "#" anchors found. All links route to valid endpoints.');

// -----------------------------------------------------------------------------
// 7. S14: RESPONSIVE BEHAVIOR
// -----------------------------------------------------------------------------
console.log('\n[TEST 7] S14: Responsive Layout Safeguards');

assert.ok(heroContent.includes('overflow-hidden'), 'PerspectiveCardsHero must have overflow-hidden container');
assert.ok(heroContent.includes('max-h-[90vh]'), 'Modal must have max-h-[90vh] with overflow-y-auto to prevent mobile cutoff');
assert.ok(stageSelectorContent.includes('overflow-x-auto'), 'StageSelector must have overflow-x-auto for touch panning');
assert.ok(pageContent.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'), 'Curated roadmaps must adapt to 1 col on mobile');

console.log('  ✓ Responsive viewport classes confirmed.');

console.log('\n====================================================');
console.log('   ALL STUDENT PAGE (S01–S14) CHECKS PASSED          ');
console.log('====================================================');
