import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

console.log('====================================================');
console.log('   REVIEWER_M3_2 ADVERSARIAL STRESS TEST SUITE       ');
console.log('====================================================');

const page = readFileSync(new URL('../app/students/page.tsx', import.meta.url), 'utf8');
const hero = readFileSync(new URL('../components/students/perspective-cards-hero.tsx', import.meta.url), 'utf8');
const selector = readFileSync(new URL('../components/students/stage-selector.tsx', import.meta.url), 'utf8');
const cardComp = readFileSync(new URL('../components/students/curated-roadmap-card.tsx', import.meta.url), 'utf8');
const { STUDENT_OUTCOME_CARDS, CURATED_ROADMAP_CARDS } = await import('../components/students/cards-data.ts');

// -----------------------------------------------------------------------------
// [CHECK 1] StageSelector Navigation & ID Binding
// -----------------------------------------------------------------------------
console.log('\n[CHECK 1] StageSelector Target IDs & Smooth Scroll');

// Check that page.tsx dynamically assigns id={`stage-${card.id}`} and data-stage-id={card.id}
assert.ok(
  page.includes('id={`stage-${card.id}`}') || page.includes('id={"stage-" + card.id}'),
  'page.tsx must assign id={`stage-${card.id}`} dynamically to each mapped stage card'
);
assert.ok(
  page.includes('data-stage-id={card.id}'),
  'page.tsx must assign data-stage-id={card.id} to each mapped stage card'
);
assert.ok(page.includes('scroll-mt-32'), 'Stage cards must include scroll-mt-32 for sticky header offset');

// Verify selector queries the exact same ID pattern
assert.ok(
  selector.includes('document.getElementById(`stage-${card.id}`)') ||
  selector.includes('document.getElementById(`stage-${cardId}`)'),
  'stage-selector.tsx must query stage by `stage-${card.id}`'
);

STUDENT_OUTCOME_CARDS.forEach((card, idx) => {
  assert.ok(card.id && card.id.length > 0, `Stage ${idx + 1} must have valid non-empty id`);
  console.log(`  ✓ Stage ${idx + 1} (${card.id}) will bind to runtime DOM ID #stage-${card.id}`);
});

assert.ok(selector.includes('IntersectionObserver'), 'StageSelector must implement IntersectionObserver');
assert.ok(selector.includes('observer.disconnect()'), 'StageSelector must clean up observer on unmount');
assert.ok(selector.includes("behavior: 'smooth'"), 'StageSelector must use smooth scrolling');
assert.ok(selector.includes('overflow-x-auto'), 'StageSelector must have overflow-x-auto for horizontal scrolling');
assert.ok(selector.includes('scrollbar-none'), 'StageSelector must have scrollbar-none');
assert.ok(selector.includes('touch-pan-x'), 'StageSelector must have touch-pan-x for smooth mobile touch');
console.log('  ✓ StageSelector interaction and accessibility attributes verified');

// -----------------------------------------------------------------------------
// [CHECK 2] Link Integrity & 0 Dead '#' Anchors
// -----------------------------------------------------------------------------
console.log('\n[CHECK 2] Comprehensive Link Integrity & Zero Dead Anchors');

const components = [
  { name: 'app/students/page.tsx', src: page },
  { name: 'components/students/perspective-cards-hero.tsx', src: hero },
  { name: 'components/students/stage-selector.tsx', src: selector },
  { name: 'components/students/curated-roadmap-card.tsx', src: cardComp },
];

for (const comp of components) {
  // Assert no href="#" or href='#'
  const deadMatches = comp.src.match(/href=["']#["']/g);
  assert.equal(deadMatches, null, `Found dead href="#" in ${comp.name}`);

  // Find all internal anchor links like href="#foo"
  const anchorMatches = [...comp.src.matchAll(/href=["'](#[\w-]+)["']/g)];
  for (const match of anchorMatches) {
    const anchorId = match[1].slice(1);
    assert.ok(page.includes(`id="${anchorId}"`), `Anchor #${anchorId} in ${comp.name} has no matching id="${anchorId}" in page.tsx`);
    console.log(`  ✓ Internal anchor ${match[1]} in ${comp.name} successfully resolves to DOM target`);
  }
}
console.log('  ✓ 0 dead hash anchors confirmed across all student components');

// -----------------------------------------------------------------------------
// [CHECK 3] Responsive Layout Attributes & Overflow Safeguards
// -----------------------------------------------------------------------------
console.log('\n[CHECK 3] Responsive Viewport Bounds & Overflow Safeguards');

assert.ok(hero.includes('overflow-hidden'), 'PerspectiveCardsHero must have overflow-hidden container');
assert.ok(hero.includes('max-h-[90vh]'), 'Modal must have max-h-[90vh]');
assert.ok(hero.includes('overflow-y-auto'), 'Modal must have overflow-y-auto');
assert.ok(selector.includes('overflow-x-auto'), 'StageSelector must be horizontally scrollable');
assert.ok(page.includes('grid md:grid-cols-2 lg:grid-cols-3'), 'Stages grid must be 1 col on mobile, 2 col on tablet, 3 col on desktop');
assert.ok(page.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'), 'Curated roadmaps must adapt to 1 col on mobile');
console.log('  ✓ Responsive grid and overflow classes verified across all breakpoints');

// -----------------------------------------------------------------------------
// [CHECK 4] Authentic Demo Badges & Product UI Mockups
// -----------------------------------------------------------------------------
console.log('\n[CHECK 4] Authentic Demo Badges & Real Product UI Mockups');

STUDENT_OUTCOME_CARDS.forEach((card, idx) => {
  const mockup = card.demoMockup;
  assert.ok(mockup, `Stage ${idx + 1} must include demoMockup`);
  assert.ok(mockup.badge.includes('DEMO'), `Stage ${idx + 1} badge must include 'DEMO'`);
  assert.ok(mockup.title.length > 0, `Stage ${idx + 1} mockup missing title`);
  assert.ok(mockup.subtitle.length > 0, `Stage ${idx + 1} mockup missing subtitle`);
  assert.equal(mockup.metrics.length, 3, `Stage ${idx + 1} mockup must have 3 metrics`);
  assert.ok(mockup.tags.length >= 3, `Stage ${idx + 1} mockup must have at least 3 tags`);
  assert.ok(mockup.codeOrOutput.length > 0, `Stage ${idx + 1} mockup must have terminal/code output`);
  console.log(`  ✓ Stage ${idx + 1} (${card.title}): Mockup verified [${mockup.badge}]`);
});

assert.ok(hero.includes('SAMPLE PREVIEW'), 'Modal must display SAMPLE PREVIEW badge');
assert.ok(hero.includes('mockup.badge'), 'Modal must render mockup.badge');
assert.ok(page.includes('mockup.badge'), 'Page stage cards must render mockup.badge');
console.log('  ✓ Real product UI mockups and demo badges verified across modal and cards');

// -----------------------------------------------------------------------------
// [CHECK 5] S01 Verbatim Copy & S10 Roadmap Ordering
// -----------------------------------------------------------------------------
console.log('\n[CHECK 5] Verbatim S01 & Exact S10 Sequence');

const h1Match = hero.match(/<h1[\s\S]*?<\/h1>/);
assert.ok(h1Match, 'Could not find <h1> in perspective-cards-hero.tsx');
const h1Text = h1Match[0].replace(/<[^>]+>/g, ' ').replace(/&apos;/g, "'").replace(/\s+/g, ' ').trim();
assert.equal(h1Text, "DON'T JUST LEARN. PROVE WHAT YOU CAN DO.", 'S01 verbatim headline mismatch');
console.log(`  ✓ S01 Headline matched verbatim: "${h1Text}"`);

const expectedRoadmaps = [
  'data-analyst',
  'business-analyst',
  'product-manager',
  'ai-engineer',
  'full-stack-developer',
  'ui-ux-designer',
];

CURATED_ROADMAP_CARDS.forEach((card, idx) => {
  assert.equal(card.slug, expectedRoadmaps[idx], `S10 card ${idx + 1} sequence mismatch: expected ${expectedRoadmaps[idx]}, got ${card.slug}`);
  console.log(`  ✓ S10 [${idx + 1}/6] ${card.roleTitle} (${card.slug}) in approved order`);
});

console.log('\n====================================================');
console.log('   ALL REVIEWER_M3_2 ADVERSARIAL CHECKS PASSED       ');
console.log('====================================================');
