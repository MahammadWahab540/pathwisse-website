import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

console.log('======================================================================');
console.log('   CHALLENGER ADVERSARIAL TEST: INSTITUTIONS & ENTERPRISE (M4)        ');
console.log('======================================================================');

const rootDir = resolve('.');
const collegesPagePath = resolve(rootDir, 'app/colleges/page.tsx');
const collegesDemoPath = resolve(rootDir, 'app/colleges/request-demo/page.tsx');
const enterprisePagePath = resolve(rootDir, 'app/enterprise/page.tsx');
const enterpriseDemoPath = resolve(rootDir, 'app/enterprise/request-demo/page.tsx');
const hirePagePath = resolve(rootDir, 'app/hire/page.tsx');
const hireClientPath = resolve(rootDir, 'app/hire/HirePageClient.tsx');
const leadFormPath = resolve(rootDir, 'components/forms/IntentLeadForm.tsx');
const leadValidationPath = resolve(rootDir, 'lib/lead-validation.ts');
const contentIndexPath = resolve(rootDir, 'content/index.ts');

const collegesPageContent = readFileSync(collegesPagePath, 'utf8');
const collegesDemoContent = readFileSync(collegesDemoPath, 'utf8');
const enterprisePageContent = readFileSync(enterprisePagePath, 'utf8');
const enterpriseDemoContent = readFileSync(enterpriseDemoPath, 'utf8');
const hirePageContent = readFileSync(hirePagePath, 'utf8');
const hireClientContent = readFileSync(hireClientPath, 'utf8');
const leadFormContent = readFileSync(leadFormPath, 'utf8');
const leadValidationContent = readFileSync(leadValidationPath, 'utf8');
const contentIndexContent = readFileSync(contentIndexPath, 'utf8');

// Helper to extract text from JSX element
function extractText(str) {
  return str.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 1: AST / DOM SEQUENCE OF /colleges (C01–C07)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 1] Verifying exact DOM/AST structure and section sequence of /colleges...');

const expectedCollegeSequence = [
  { tag: '<Header />', desc: 'Universal Header' },
  { tag: 'Institutional Placement Intelligence', desc: 'C01 Hero Eyebrow' },
  { tag: 'Know who is ready', desc: 'C01 Hero Headline' },
  { tag: 'B.Tech 2027 Cohort Overview', desc: 'C02 Placement Cockpit Mockup' },
  { tag: 'INSTITUTIONAL PARTNERSHIP PILLARS', desc: 'C04 4 Institutional Pillars' },
  { tag: 'id="cohort-intelligence"', desc: 'C03 Skill Gap Deficit Analytics' },
  { tag: 'id="proof-dossier"', desc: 'C05 Proof Dossier & Verification Artifacts' },
  { tag: '4-WEEK FAST-TRACK DEPLOYMENT', desc: 'C07 Onboarding Timeline' },
  { tag: '<CTABand', desc: 'C06 Institutional Lead Capture CTA' },
  { tag: '<Footer />', desc: 'Universal Footer' },
];

let lastCollegePos = -1;
for (const item of expectedCollegeSequence) {
  const pos = collegesPageContent.indexOf(item.tag);
  assert.ok(pos !== -1, `Missing expected section or landmark: "${item.tag}" (${item.desc}) in app/colleges/page.tsx`);
  assert.ok(pos > lastCollegePos, `Sequence violation: "${item.tag}" (${item.desc}) at index ${pos} appeared out of order (previous at ${lastCollegePos})`);
  lastCollegePos = pos;
  console.log(`  ✓ Verified landmark sequence: ${item.desc} ("${item.tag}")`);
}
console.log('  -> PASS: All /colleges sections adhere to sequential DOM flow.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 2: AST / DOM SEQUENCE OF /enterprise (E01–E06)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 2] Verifying exact DOM/AST structure and section sequence of /enterprise...');

const expectedEnterpriseSequence = [
  { tag: '<Header />', desc: 'Universal Header' },
  { tag: 'Early-Career Talent Intelligence', desc: 'E01 Hero Eyebrow' },
  { tag: 'Hire with evidence.', desc: 'E01 Hero Headline' },
  { tag: 'SAMPLE DOSSIER · DEMO', desc: 'E02 Candidate Evidence Dossier Mockup' },
  { tag: 'id="evidence-model"', desc: 'E03 6 Capability Advantage Pillars' },
  { tag: 'EVIDENCE-LED HIRING WORKFLOW', desc: 'E04 4-Step Technical Hiring Workflow' },
  { tag: 'id="compliance-security"', desc: 'E06 Compliance, Security & DPDP' },
  { tag: '<CTABand', desc: 'E05 Enterprise Lead Capture CTA' },
  { tag: '<Footer />', desc: 'Universal Footer' },
];

let lastEnterprisePos = -1;
for (const item of expectedEnterpriseSequence) {
  const pos = enterprisePageContent.indexOf(item.tag);
  assert.ok(pos !== -1, `Missing expected section or landmark: "${item.tag}" (${item.desc}) in app/enterprise/page.tsx`);
  assert.ok(pos > lastEnterprisePos, `Sequence violation: "${item.tag}" (${item.desc}) at index ${pos} appeared out of order (previous at ${lastEnterprisePos})`);
  lastEnterprisePos = pos;
  console.log(`  ✓ Verified landmark sequence: ${item.desc} ("${item.tag}")`);
}
console.log('  -> PASS: All /enterprise sections adhere to sequential DOM flow.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 3: VERBATIM COPY CHECKS FOR C01 AND E01 HEADLINES & PROPOSITIONS
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 3] Character-for-character verbatim copy verification for C01 and E01...');

// C01 Verbatim Checks
const c01HeadlineRaw = collegesPageContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];
assert.ok(c01HeadlineRaw, 'C01: Failed to extract <h1> from colleges page');
const c01Headline = extractText(c01HeadlineRaw);
const expectedC01Headline = 'Know who is ready before placement season begins.';
assert.equal(c01Headline, expectedC01Headline, `C01 Headline mismatch: expected "${expectedC01Headline}", got "${c01Headline}"`);
console.log(`  ✓ C01 Headline verbatim: "${c01Headline}"`);

const expectedC01Eyebrow = 'Institutional Placement Intelligence';
assert.ok(
  collegesPageContent.includes(expectedC01Eyebrow) ||
  collegesPageContent.includes(expectedC01Eyebrow.toUpperCase()),
  'C01 Eyebrow text missing'
);
console.log(`  ✓ C01 Eyebrow verbatim: "${expectedC01Eyebrow}"`);

const expectedC01Subheadline = 'Move from late-stage placement panic to continuous, evidence-grounded visibility. Track cohort progress, diagnose specific skill gaps early, and shortlist verified student talent with defensible proof.';
assert.ok(collegesPageContent.includes(expectedC01Subheadline), 'C01 Subheadline verbatim match failed');
console.log(`  ✓ C01 Subheadline verbatim: "${expectedC01Subheadline}"`);

// E01 Verbatim Checks
const e01HeadlineRaw = enterprisePageContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];
assert.ok(e01HeadlineRaw, 'E01: Failed to extract <h1> from enterprise page');
const e01Headline = extractText(e01HeadlineRaw);
const expectedE01Headline = 'Hire with evidence. Look behind the résumé.';
assert.equal(e01Headline, expectedE01Headline, `E01 Headline mismatch: expected "${expectedE01Headline}", got "${e01Headline}"`);
console.log(`  ✓ E01 Headline verbatim: "${e01Headline}"`);

const expectedE01Eyebrow = 'Early-Career Talent Intelligence';
assert.ok(
  enterprisePageContent.includes(expectedE01Eyebrow) ||
  enterprisePageContent.includes(expectedE01Eyebrow.toUpperCase()),
  'E01 Eyebrow text missing'
);
console.log(`  ✓ E01 Eyebrow verbatim: "${expectedE01Eyebrow}"`);

const expectedE01Subheadline = 'Résumés are uncalibrated claims; coding quizzes test memorization. Pathwisse lets hiring teams evaluate early-career engineers through authentic code architectures, real technical decision memos, and verifiable readiness signals.';
assert.ok(enterprisePageContent.includes(expectedE01Subheadline), 'E01 Subheadline verbatim match failed');
console.log(`  ✓ E01 Subheadline verbatim: "${expectedE01Subheadline}"`);

console.log('  -> PASS: C01 and E01 headlines, eyebrows, and subheadlines match 100% character-for-character.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 4: PRECISE COHORT READINESS NUMBERS & METRICS (C02 & C03)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 4] Verifying precise cohort readiness numbers and metrics on /colleges...');

const expectedMetrics = [
  { label: 'Cohort Size', needle: '640 Students' },
  { label: 'Overall Readiness', needle: '78.4% ready' },
  { label: 'Sprint Lift', needle: '+14.2% lift after sprints' },
  { label: 'Full Stack Readiness %', needle: '84% ready' },
  { label: 'Full Stack Count', needle: '190 / 226 Students' },
  { label: 'Data Readiness %', needle: '72% ready' },
  { label: 'Data Count', needle: '144 / 200 Students' },
  { label: 'AI Readiness %', needle: '61% ready' },
  { label: 'AI Count', needle: '130 / 214 Students' },
  { label: 'DSA Deficit Status', needle: '88% On Track' },
  { label: 'SQL Deficit Status', needle: '64% Needs Sprints' },
  { label: 'System Design Deficit Status', needle: '52% Priority Gap' },
  { label: 'Verified Project Artifacts', needle: '1,840+' },
  { label: 'Inflated Résumé Claims', needle: '0' },
  { label: 'Inspectable Git Trees', needle: '100%' },
  { label: 'Passing Tests Badge', needle: '24/24 TESTS PASSING' },
];

for (const metric of expectedMetrics) {
  assert.ok(collegesPageContent.includes(metric.needle), `Metric check failed: missing "${metric.needle}" (${metric.label})`);
  console.log(`  ✓ Verified metric: ${metric.label} -> "${metric.needle}"`);
}
console.log('  -> PASS: All cohort readiness numbers match approved specifications precisely.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 5: CANDIDATE EVIDENCE DOSSIER PRECISION (E02)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 5] Verifying candidate evidence dossier data on /enterprise...');

const expectedDossier = [
  { field: 'Candidate Name', needle: 'Ananya K.' },
  { field: 'Target Role', needle: 'Target: Associate Full Stack Engineer' },
  { field: 'Role Match', needle: '94% Role Match' },
  { field: 'Artifacts Count', needle: '3 Verified Artifacts' },
  {
    field: 'Technical Decision Memo Text',
    needle: 'Distributed Task Queue with Redis async worker, exponential backoff, dead-letter queue, 24 passing unit tests.'
  },
  {
    field: 'Architecture Review Text',
    needle: 'Architecture Review: Top 5% modular API design & clean schema migration'
  },
  { field: 'API Architecture Score', needle: '95/100' },
  { field: 'SQL Query Score', needle: '91/100' },
  { field: 'Code Maintainability Score', needle: '88/100' },
  { field: 'Sample Badge', needle: 'SAMPLE DOSSIER · DEMO' },
];

for (const item of expectedDossier) {
  assert.ok(enterprisePageContent.includes(item.needle), `Dossier check failed: missing "${item.needle}" (${item.field})`);
  console.log(`  ✓ Verified dossier field: ${item.field} -> "${item.needle}"`);
}
console.log('  -> PASS: Candidate evidence dossier data matches specification character-for-character.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 6: HAIRLINE FIGURE ASSIGNMENTS (C04 & E03)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 6] Verifying exact Hairline figure assignments across college and enterprise pillars...');

// 4 College Pillars: plot, loupe, branches, sieve
const collegePillars = [
  { title: 'Pre-Season Readiness Audits', expectedFigure: 'plot' },
  { title: 'Targeted Acceleration Sprints', expectedFigure: 'loupe' },
  { title: 'Inspectable Proof of Work', expectedFigure: 'branches' },
  { title: 'Direct Recruiter Matching', expectedFigure: 'sieve' },
];

collegePillars.forEach((pillar) => {
  const pattern = new RegExp(`title:\\s*['"]${pillar.title}['"][\\s\\S]*?figure:\\s*['"]${pillar.expectedFigure}['"]`);
  assert.ok(pattern.test(collegesPageContent), `College pillar "${pillar.title}" must be paired with figure "${pillar.expectedFigure}"`);
  console.log(`  ✓ College Pillar: "${pillar.title}" -> Hairline: "${pillar.expectedFigure}"`);
});

// 6 Enterprise Pillars: exploded, terminal, vault, keyboard, sieve, branches
const enterprisePillars = [
  { title: 'Inspectable Code Architecture', expectedFigure: 'exploded' },
  { title: 'Algorithmic Consistency Drills', expectedFigure: 'terminal' },
  { title: 'Immutable Skill Verification', expectedFigure: 'vault' },
  { title: 'Real Production Trade-Offs', expectedFigure: 'keyboard' },
  { title: 'Direct Evidence Shortlisting', expectedFigure: 'sieve' },
  { title: 'Zero Résumé Keyword Spam', expectedFigure: 'branches' },
];

enterprisePillars.forEach((pillar) => {
  const pattern = new RegExp(`figure:\\s*['"]${pillar.expectedFigure}['"][\\s\\S]*?title:\\s*['"]${pillar.title}['"]`);
  assert.ok(pattern.test(enterprisePageContent), `Enterprise pillar "${pillar.title}" must be paired with figure "${pillar.expectedFigure}"`);
  console.log(`  ✓ Enterprise Pillar: "${pillar.title}" -> Hairline: "${pillar.expectedFigure}"`);
});

// Demo pages Hairline figures
assert.match(collegesDemoContent, /figure="plot"/, 'colleges/request-demo must use Hairline figure "plot"');
console.log('  ✓ College Demo Page -> Hairline: "plot"');
assert.match(enterpriseDemoContent, /figure="vault"/, 'enterprise/request-demo must use Hairline figure "vault"');
console.log('  ✓ Enterprise Demo Page -> Hairline: "vault"');

console.log('  -> PASS: All 12 Hairline isometric figures are correctly mapped.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 7: STRESS TEST ALL LINKS AND CTAS (0 DEAD '#' ANCHORS, 0 404s)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 7] Stress-testing all links and CTAs across /colleges, /enterprise, and /hire...');

// 7A: Check for dead '#' anchors
const filesToCheckHrefs = [
  { name: 'app/colleges/page.tsx', content: collegesPageContent },
  { name: 'app/colleges/request-demo/page.tsx', content: collegesDemoContent },
  { name: 'app/enterprise/page.tsx', content: enterprisePageContent },
  { name: 'app/enterprise/request-demo/page.tsx', content: enterpriseDemoContent },
  { name: 'app/hire/page.tsx', content: hirePageContent },
  { name: 'app/hire/HirePageClient.tsx', content: hireClientContent },
];

for (const file of filesToCheckHrefs) {
  assert.doesNotMatch(file.content, /href="#"/, `Dead anchor href="#" found in ${file.name}`);
  assert.doesNotMatch(file.content, /href=\{"#"\}|\bhref='#'/, `Dead anchor href='#' found in ${file.name}`);
  console.log(`  ✓ Zero dead '#' anchors in ${file.name}`);
}

// 7B: Check hash fragment anchor resolutions
// In /colleges:
assert.ok(collegesPageContent.includes('href="#cohort-intelligence"'), 'Colleges hero must link to #cohort-intelligence');
assert.ok(collegesPageContent.includes('id="cohort-intelligence"'), 'Colleges page must have target id="cohort-intelligence"');
console.log('  ✓ Hash fragment #cohort-intelligence resolves to valid target id');

// In /enterprise:
assert.ok(enterprisePageContent.includes('href="#evidence-model"'), 'Enterprise hero must link to #evidence-model');
assert.ok(enterprisePageContent.includes('id="evidence-model"'), 'Enterprise page must have target id="evidence-model"');
console.log('  ✓ Hash fragment #evidence-model resolves to valid target id');

// In /hire:
assert.ok(hireClientContent.includes('href="#requirements-form"'), 'Hire page must link to #requirements-form');
assert.ok(hireClientContent.includes('id="requirements-form"'), 'Hire page must have target id="requirements-form"');
assert.ok(hireClientContent.includes('href="#role-directory"'), 'Hire page must link to #role-directory');
assert.ok(hireClientContent.includes('id="role-directory"'), 'Hire page must have target id="role-directory"');
console.log('  ✓ Hash fragments #requirements-form and #role-directory resolve to valid target ids');

// 7C: Check destination route validity (0 404s)
// Extract all internal hrefs across the files
const internalHrefs = new Set();
const hrefRegex = /href="(\/[^"#?]*)(?:[#?][^"]*)?"/g;

for (const file of filesToCheckHrefs) {
  let m;
  while ((m = hrefRegex.exec(file.content)) !== null) {
    internalHrefs.add(m[1]);
  }
}

console.log(`  Found ${internalHrefs.size} unique internal routes to validate:`, Array.from(internalHrefs));

for (const route of internalHrefs) {
  // Check if route maps to a Next.js page in app/ or dynamic route in content/index.ts
  const cleanRoute = route.replace(/^\//, '');
  const pagePathDirect = resolve(rootDir, 'app', cleanRoute, 'page.tsx');
  const pagePathDirectTs = resolve(rootDir, 'app', cleanRoute, 'page.ts');
  const pagePathRoot = cleanRoute === '' ? resolve(rootDir, 'app/page.tsx') : null;
  
  const existsAsPage = existsSync(pagePathDirect) || existsSync(pagePathDirectTs) || (pagePathRoot && existsSync(pagePathRoot));
  const existsInContent = contentIndexContent.includes(`'${cleanRoute}'`) || contentIndexContent.includes(`"${cleanRoute}"`);
  
  assert.ok(
    existsAsPage || existsInContent,
    `404 Route Failure: Route "${route}" does not exist in filesystem (app/${cleanRoute}/page.tsx) or content catalog (content/index.ts)`
  );
  console.log(`  ✓ Route "${route}" verified: ${existsAsPage ? 'Filesystem Page' : 'Content Catalog Page'}`);
}
console.log('  -> PASS: 0 dead anchors and 0 404 routes verified across all pages.');

// -----------------------------------------------------------------------------
// ADVERSARIAL TEST 8: LEAD CAPTURE FORM CONFIG & VALIDATION INTEGRATION (C06 & E05)
// -----------------------------------------------------------------------------
console.log('\n[CHALLENGE 8] Verifying lead capture form configuration and Zod schema integration...');

// College form fields in IntentLeadForm
const requiredCollegeFields = ['organization', 'name', 'email', 'phone', 'student_count', 'graduation_year', 'requested_program', 'placement_challenges'];
for (const field of requiredCollegeFields) {
  assert.ok(
    leadFormContent.includes(`name: '${field}'`),
    `College lead form config missing field "${field}"`
  );
  console.log(`  ✓ College lead form field verified: "${field}"`);
}

// Enterprise form fields in IntentLeadForm
const requiredEnterpriseFields = ['organization', 'name', 'email', 'designation', 'employee_count', 'skills_needed', 'timeline', 'training_requirements'];
for (const field of requiredEnterpriseFields) {
  assert.ok(
    leadFormContent.includes(`name: '${field}'`),
    `Enterprise lead form config missing field "${field}"`
  );
  console.log(`  ✓ Enterprise lead form field verified: "${field}"`);
}

// Check Zod schema enforces organization for 'college' and 'upskilling' (enterprise)
assert.ok(
  leadValidationContent.includes("['college', 'upskilling', 'hiring'].includes(value.interest)"),
  'Zod schema must enforce organization requirement for college and enterprise/upskilling'
);
assert.ok(
  leadValidationContent.includes("Organization is required."),
  'Zod schema must specify "Organization is required."'
);
console.log('  ✓ Lead validation schema correctly enforces organization requirement for college & enterprise');

console.log('\n======================================================================');
console.log('   ALL CHALLENGER ADVERSARIAL CHECKS PASSED (M4: C01–C07 & E01–E06)   ');
console.log('======================================================================\n');
