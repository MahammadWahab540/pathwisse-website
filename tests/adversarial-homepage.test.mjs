import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

console.log('--- STARTING ADVERSARIAL HOMEPAGE TEST SUITE ---');

// ----------------------------------------------------------------------------
// TEST 1: EMPIRICAL AST PARSING OF app/site.tsx (HOMEPAGE COMPONENT)
// ----------------------------------------------------------------------------
console.log('[Test 1] Parsing AST of app/site.tsx to verify exact component sequence...');

const sitePath = new URL('../app/site.tsx', import.meta.url).pathname;
// On Windows, handle leading slash from new URL
const normalizedSitePath = process.platform === 'win32' && sitePath.startsWith('/')
  ? sitePath.slice(1)
  : sitePath;

const siteCode = readFileSync(normalizedSitePath, 'utf8');

const sourceFile = ts.createSourceFile(
  'site.tsx',
  siteCode,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
);

// Helper to extract JSX element tag name
function getTagName(node) {
  if (ts.isJsxElement(node)) {
    return node.openingElement.tagName.getText(sourceFile);
  }
  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText(sourceFile);
  }
  if (ts.isJsxFragment(node)) {
    return '<>';
  }
  return null;
}

// Find HomePage function in AST
let homePageNode = null;
function findHomePage(node) {
  if (
    (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) &&
    node.name &&
    node.name.getText(sourceFile) === 'HomePage'
  ) {
    homePageNode = node;
    return;
  }
  ts.forEachChild(node, findHomePage);
}
findHomePage(sourceFile);

assert.ok(homePageNode, 'HomePage export must exist in app/site.tsx AST');

// Find return statement inside HomePage
let returnNode = null;
function findReturn(node) {
  if (ts.isReturnStatement(node)) {
    returnNode = node;
    return;
  }
  ts.forEachChild(node, findReturn);
}
findReturn(homePageNode);

assert.ok(returnNode, 'HomePage must contain a return statement');

const returnExpression = returnNode.expression;
assert.ok(returnExpression, 'Return statement must have an expression');

// Extract children of the root JSX Fragment
let rootChildren = [];
if (ts.isJsxFragment(returnExpression)) {
  rootChildren = returnExpression.children
    .map(getTagName)
    .filter((name) => name !== null && name !== '');
} else if (ts.isParenthesizedExpression(returnExpression) && ts.isJsxFragment(returnExpression.expression)) {
  rootChildren = returnExpression.expression.children
    .map(getTagName)
    .filter((name) => name !== null && name !== '');
}

console.log('Root JSX Fragment children:', rootChildren);

// Root should contain Header, main, Footer
assert.ok(rootChildren.includes('Header'), 'Root fragment must contain Header');
assert.ok(rootChildren.includes('main'), 'Root fragment must contain main element');
assert.ok(rootChildren.includes('Footer'), 'Root fragment must contain Footer');

// Now inspect <main> element children
let mainElement = null;
function findMain(node) {
  if (ts.isJsxElement(node) && node.openingElement.tagName.getText(sourceFile) === 'main') {
    mainElement = node;
    return;
  }
  ts.forEachChild(node, findMain);
}
findMain(returnExpression);

assert.ok(mainElement, 'main element must be present in HomePage JSX');

// Check main props
const mainIdAttr = mainElement.openingElement.attributes.properties.find(
  (prop) => prop.name && prop.name.getText(sourceFile) === 'id'
);
assert.ok(mainIdAttr, 'main element must have id attribute');
assert.equal(mainIdAttr.initializer.text, 'main', 'main element id must be "main"');

// Get all JSX elements inside <main>
const mainChildren = mainElement.children
  .map(getTagName)
  .filter((name) => name !== null && name !== '');

console.log('Direct children inside <main id="main"> in AST order:');
mainChildren.forEach((child, i) => console.log(`  ${i + 1}. <${child}>`));

const expectedMainChildren = [
  'Hero',
  'EcosystemSection',
  'StudentsSection',
  'CollegesSection',
  'CompaniesSection',
  'TrustProofSection',
  'FAQSection',
  'CTA',
];

assert.equal(
  mainChildren.length,
  expectedMainChildren.length,
  `Expected exactly ${expectedMainChildren.length} sections inside <main>, but found ${mainChildren.length}: ${JSON.stringify(mainChildren)}`
);

expectedMainChildren.forEach((expected, i) => {
  assert.equal(
    mainChildren[i],
    expected,
    `Section at position ${i + 1} inside <main> must be <${expected}>, but got <${mainChildren[i]}>`
  );
});

// Full page hierarchy sequence:
const fullSequence = [...mainChildren, 'Footer'];
const expectedFullSequence = [
  'Hero',
  'EcosystemSection',
  'StudentsSection',
  'CollegesSection',
  'CompaniesSection',
  'TrustProofSection',
  'FAQSection',
  'CTA',
  'Footer',
];

assert.deepEqual(
  fullSequence,
  expectedFullSequence,
  'Full sequence must be Hero -> Ecosystem -> Students -> Colleges -> Companies -> Trust/Proof -> FAQ -> Final CTA -> Footer'
);

console.log('✓ PASS: AST sequence matches approved 9-stage sequence verbatim with zero extraneous elements.');

// ----------------------------------------------------------------------------
// TEST 2: STRESS-TEST ALL CTA LINKS & ANCHOR TAGS ACROSS HOMEPAGE SECTIONS
// ----------------------------------------------------------------------------
console.log('\n[Test 2] Stress-testing all CTA links and anchor tags across homepage sections...');

const projectRoot = new URL('../', import.meta.url).pathname;
const normalizedProjectRoot = process.platform === 'win32' && projectRoot.startsWith('/')
  ? projectRoot.slice(1)
  : projectRoot;

// Helper to check if an internal route is valid
function verifyRouteExists(route) {
  // Strip query string and hash if any
  const cleanRoute = route.split('?')[0].split('#')[0];
  if (cleanRoute === '/' || cleanRoute === '') return true;

  // Direct page path in app directory
  const relativePagePath = join(normalizedProjectRoot, 'app', cleanRoute, 'page.tsx');
  if (existsSync(relativePagePath)) {
    return true;
  }

  const routeKey = cleanRoute.startsWith('/') ? cleanRoute.slice(1) : cleanRoute;

  // Check content file for page or hub definition
  const contentFile = readFileSync(join(normalizedProjectRoot, 'content/index.ts'), 'utf8');
  
  if (
    contentFile.includes(`'${routeKey}'`) ||
    contentFile.includes(`"${routeKey}"`) ||
    contentFile.includes(`${routeKey}: {`) ||
    contentFile.includes(`'${routeKey}': {`)
  ) {
    return true;
  }

  // Check dynamic compare route
  if (cleanRoute.startsWith('/compare/')) {
    const compareSlug = cleanRoute.replace('/compare/', '');
    if (contentFile.includes(compareSlug)) return true;
  }

  // Check dynamic product route
  if (cleanRoute.startsWith('/product/')) {
    const productSlug = cleanRoute.replace('/product/', '');
    if (contentFile.includes(productSlug)) return true;
  }

  return false;
}

// Regex to find all href="..." in code
function extractHrefs(code) {
  const hrefRegex = /href=(?:["']([^"']+)["']|\{([^}]+)\})/g;
  const hrefs = [];
  let match;
  while ((match = hrefRegex.exec(code)) !== null) {
    if (match[1]) {
      hrefs.push(match[1]);
    } else if (match[2]) {
      hrefs.push(match[2].trim());
    }
  }
  return hrefs;
}

const sectionFiles = [
  { name: 'Hero', path: 'components/hero.tsx' },
  { name: 'Ecosystem', path: 'components/home/EcosystemSection.tsx' },
  { name: 'Students', path: 'components/home/StudentsSection.tsx' },
  { name: 'Colleges', path: 'components/home/CollegesSection.tsx' },
  { name: 'Companies', path: 'components/home/CompaniesSection.tsx' },
  { name: 'FAQ', path: 'components/home/FAQSection.tsx' },
  { name: 'Final CTA (app/site.tsx)', path: 'app/site.tsx' },
  { name: 'CTABand', path: 'components/shared/CTABand.tsx' },
];

let totalAnchorsChecked = 0;

for (const { name, path } of sectionFiles) {
  const fullPath = join(normalizedProjectRoot, path);
  const code = readFileSync(fullPath, 'utf8');
  const hrefs = extractHrefs(code);

  console.log(`\nInspecting links in ${name} (${path}):`);
  if (hrefs.length === 0) {
    console.log('  (No direct href literals found)');
  }

  for (const href of hrefs) {
    totalAnchorsChecked++;
    console.log(`  Found href: "${href}"`);

    // 1. Must not be empty
    assert.ok(href && href.length > 0, `Link in ${name} cannot be empty string`);

    // 2. Must not be a dead hash anchor
    assert.notEqual(href, '#', `Dead anchor "#" found in ${name}! Must route to real URL`);
    assert.ok(!href.startsWith('#'), `Unrouted hash anchor "${href}" found in ${name}! Must route to real page`);

    // 3. Must not be javascript:
    assert.ok(!href.startsWith('javascript:'), `Illegal javascript: href found in ${name}`);

    // 4. If variable expression, verify known variables
    if (href === 'APP' || href === 'APP_AUTH_URL' || href === 'primaryAction.href') {
      console.log(`    ↳ Resolves to valid external APP_AUTH_URL`);
      continue;
    }
    if (href === 'role.targetLink') {
      console.log(`    ↳ Resolves to role.targetLink (/students, /colleges, /enterprise)`);
      continue;
    }
    if (href === 'row.href') {
      console.log(`    ↳ Resolves to row.href (/students, /colleges, /enterprise)`);
      continue;
    }
    if (href === 'secondaryAction.href') {
      console.log(`    ↳ Resolves to secondaryAction.href (/contact)`);
      continue;
    }

    // 5. If external URL:
    if (href.startsWith('http://') || href.startsWith('https://')) {
      assert.ok(
        href.startsWith('https://app.pathwisse.com/auth') ||
        href.startsWith('https://'),
        `External link "${href}" must be HTTPS`
      );
      console.log(`    ↳ Valid external URL`);
      continue;
    }

    // 6. If internal route:
    if (href.startsWith('/')) {
      const exists = verifyRouteExists(href);
      assert.ok(exists, `Internal route "${href}" in ${name} does not exist in app/ or content/ (would 404!)`);
      console.log(`    ↳ Verified real internal route (exists in codebase)`);
      continue;
    }
  }
}

// Specifically test the EcosystemSection ROLES array target links
const ecoCode = readFileSync(join(normalizedProjectRoot, 'components/home/EcosystemSection.tsx'), 'utf8');
const targetLinks = [...ecoCode.matchAll(/targetLink:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
assert.deepEqual(targetLinks, ['/students', '/colleges', '/enterprise'], 'EcosystemSection must route students, colleges, and companies');
for (const link of targetLinks) {
  assert.ok(verifyRouteExists(link), `Ecosystem target link "${link}" must exist`);
}

// Specifically test Hero pathways hrefs
const heroCode = readFileSync(join(normalizedProjectRoot, 'components/hero.tsx'), 'utf8');
const pathwayHrefs = [...heroCode.matchAll(/href:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
assert.ok(pathwayHrefs.includes('/students'), 'Hero pathways must include /students');
assert.ok(pathwayHrefs.includes('/colleges'), 'Hero pathways must include /colleges');
assert.ok(pathwayHrefs.includes('/enterprise'), 'Hero pathways must include /enterprise');
for (const link of pathwayHrefs) {
  assert.ok(verifyRouteExists(link), `Hero pathway href "${link}" must exist`);
}

// Specifically test Hero primary auth link
assert.ok(
  heroCode.includes('https://app.pathwisse.com/auth'),
  'Hero primary CTA must point to https://app.pathwisse.com/auth'
);

// Specifically test CTA component in app/site.tsx
const siteCodeAgain = readFileSync(join(normalizedProjectRoot, 'app/site.tsx'), 'utf8');
assert.ok(
  siteCodeAgain.includes("href: '/contact'"),
  'CTA secondary action must route to /contact'
);
assert.ok(verifyRouteExists('/contact'), '/contact route must exist');

console.log(`\n✓ PASS: Checked ${totalAnchorsChecked} link references across all sections. 0 dead hash anchors, 0 404s found.`);

// ----------------------------------------------------------------------------
// TEST 3: VERBATIM COPY & SPECIFICATION STRESS TESTS (H01-H10)
// ----------------------------------------------------------------------------
console.log('\n[Test 3] Verifying approved copy verbatim across H01-H10...');

// H01 & H02
assert.ok(heroCode.includes('ONE PLATFORM. ONE ECOSYSTEM.'), 'H01 headline part 1 mismatch');
assert.ok(heroCode.includes('CONNECTING STUDENTS, COLLEGES & COMPANIES.'), 'H01 headline part 2 mismatch');
assert.ok(
  heroCode.includes(
    'Where ambitious students turn real coursework into verified capability, colleges gain continuous pre-season placement readiness visibility, and leading companies discover talent through inspectable technical proof.'
  ),
  'H02 subheadline copy mismatch'
);

// H05
const stuCode = readFileSync(join(normalizedProjectRoot, 'components/home/StudentsSection.tsx'), 'utf8');
assert.ok(stuCode.includes('BUILD CAPABILITIES YOU CAN PROVE'), 'H05 headline mismatch');
assert.ok(stuCode.includes('Explore for Students'), 'H05 CTA label mismatch');

// H06
const colCode = readFileSync(join(normalizedProjectRoot, 'components/home/CollegesSection.tsx'), 'utf8');
assert.ok(colCode.includes('MAKE STUDENT READINESS VISIBLE'), 'H06 headline mismatch');
assert.ok(colCode.includes('Explore for Colleges'), 'H06 CTA label mismatch');

// H07
const comCode = readFileSync(join(normalizedProjectRoot, 'components/home/CompaniesSection.tsx'), 'utf8');
assert.ok(comCode.includes('DISCOVER TALENT THROUGH DEMONSTRATED CAPABILITY'), 'H07 headline mismatch');
assert.ok(comCode.includes('Explore for Companies'), 'H07 CTA label mismatch');

// H08
const truCode = readFileSync(join(normalizedProjectRoot, 'components/home/TrustProofSection.tsx'), 'utf8');
assert.ok(truCode.includes('100%'), 'H08 100% code audits missing');
assert.ok(truCode.includes('Code-Level Audits'), 'H08 Code-Level Audits label missing');
assert.ok(truCode.includes('< 60s'), 'H08 <60s recruiter audit time missing');
assert.ok(truCode.includes('Pre-Season'), 'H08 Pre-Season tracking missing');

// H09
const faqDataCode = readFileSync(join(normalizedProjectRoot, 'components/home/faq-data.ts'), 'utf8');
const pageCode = readFileSync(join(normalizedProjectRoot, 'app/page.tsx'), 'utf8');
assert.ok(faqDataCode.includes('HOMEPAGE_FAQS'), 'HOMEPAGE_FAQS missing');
assert.ok(pageCode.includes('HOMEPAGE_FAQS'), 'FAQPage schema in app/page.tsx must use HOMEPAGE_FAQS');

// H10
assert.ok(
  siteCodeAgain.includes('MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY.'),
  'H10 CTA headline mismatch'
);

console.log('✓ PASS: All approved headlines and copy match verbatim.');
console.log('\n--- ADVERSARIAL HOMEPAGE TEST SUITE COMPLETED WITH 100% SUCCESS ---');
