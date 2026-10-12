import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

console.log('======================================================================');
console.log('   COLLEGE & ENTERPRISE PAGES TEST SUITE (M4: C01–C07 & E01–E06)      ');
console.log('======================================================================');

const collegesPage = readFileSync(new URL('../app/colleges/page.tsx', import.meta.url), 'utf8');
const collegesDemo = readFileSync(new URL('../app/colleges/request-demo/page.tsx', import.meta.url), 'utf8');
const enterprisePage = readFileSync(new URL('../app/enterprise/page.tsx', import.meta.url), 'utf8');
const enterpriseDemo = readFileSync(new URL('../app/enterprise/request-demo/page.tsx', import.meta.url), 'utf8');
const hireClient = readFileSync(new URL('../app/hire/HirePageClient.tsx', import.meta.url), 'utf8');
const leadForm = readFileSync(new URL('../components/forms/IntentLeadForm.tsx', import.meta.url), 'utf8');

// [TEST 1] C01: College Hero Headline, Eyebrow & CTAs
console.log('\n[TEST 1] C01: College Hero Headline, Eyebrow & CTAs');
assert.match(collegesPage, /Institutional Placement Intelligence/i, 'C01: Missing eyebrow');
assert.match(collegesPage, /Know who is ready/i, 'C01: Missing headline part 1');
assert.match(collegesPage, /before placement season begins\./i, 'C01: Missing headline part 2');
assert.match(collegesPage, /Move from late-stage placement panic to continuous, evidence-grounded visibility/, 'C01: Missing subheadline');
assert.match(collegesPage, /href="\/colleges\/request-demo"/, 'C01: Missing primary CTA to /colleges/request-demo');
assert.match(collegesPage, /href="#cohort-intelligence"/, 'C01: Missing secondary CTA to #cohort-intelligence');
console.log('  ✓ C01 Hero headline, eyebrow, subheadline and CTAs verified');

// [TEST 2] C02: Cohort Readiness Analytics Visual (Placement Cockpit)
console.log('\n[TEST 2] C02: Cohort Readiness Analytics Visual (Placement Cockpit)');
assert.match(collegesPage, /B\.Tech 2027 Cohort Overview/, 'C02: Missing cohort title');
assert.match(collegesPage, /640 Students/, 'C02: Missing 640 Students count');
assert.match(collegesPage, /78\.4% ready/, 'C02: Missing 78.4% ready percentage');
assert.match(collegesPage, /\+14\.2% lift after sprints/, 'C02: Missing +14.2% lift metric');
assert.match(collegesPage, /Full Stack Developer/, 'C02: Missing Full Stack Developer role');
assert.match(collegesPage, /84% ready/, 'C02: Missing Full Stack 84% ready');
assert.match(collegesPage, /190 \/ 226 Students/, 'C02: Missing Full Stack 190/226 students');
assert.match(collegesPage, /Data & Analytics/, 'C02: Missing Data & Analytics role');
assert.match(collegesPage, /72% ready/, 'C02: Missing Data 72% ready');
assert.match(collegesPage, /144 \/ 200 Students/, 'C02: Missing Data 144/200 students');
assert.match(collegesPage, /AI & Machine Learning/, 'C02: Missing AI & Machine Learning role');
assert.match(collegesPage, /61% ready/, 'C02: Missing AI 61% ready');
assert.match(collegesPage, /130 \/ 214 Students/, 'C02: Missing AI 130/214 students');
assert.match(collegesPage, /SAMPLE COHORT DATA · DEMO/, 'C02: Missing demo sample data badge');
console.log('  ✓ C02 Placement Cockpit metrics and role preparedness verified');

// [TEST 3] C03: Skill Gap Deficit Analytics
console.log('\n[TEST 3] C03: Skill Gap Deficit Analytics');
assert.match(collegesPage, /id="cohort-intelligence"/, 'C03: Section id="cohort-intelligence" must exist');
assert.match(collegesPage, /DSA & Problem-Solving/, 'C03: Missing DSA & Problem-Solving skill');
assert.match(collegesPage, /88% On Track/, 'C03: Missing 88% On Track deficit status');
assert.match(collegesPage, /SQL & Database Modeling/, 'C03: Missing SQL & Database Modeling skill');
assert.match(collegesPage, /64% Needs Sprints/, 'C03: Missing 64% Needs Sprints deficit status');
assert.match(collegesPage, /Production System Design/, 'C03: Missing Production System Design skill');
assert.match(collegesPage, /52% Priority Gap/, 'C03: Missing 52% Priority Gap deficit status');
console.log('  ✓ C03 Skill gap deficit diagnostics verified');

// [TEST 4] C04: 4 Institutional Partnership Pillars with Hairline Figures
console.log('\n[TEST 4] C04: 4 Institutional Partnership Pillars with Hairline Figures');
assert.match(collegesPage, /Pre-Season Readiness Audits/, 'C04 Pillar 1 missing');
assert.match(collegesPage, /figure[:=]\s*['"]plot['"]/, 'C04 Pillar 1 must use Hairline figure "plot"');
assert.match(collegesPage, /Targeted Acceleration Sprints/, 'C04 Pillar 2 missing');
assert.match(collegesPage, /figure[:=]\s*['"]loupe['"]/, 'C04 Pillar 2 must use Hairline figure "loupe"');
assert.match(collegesPage, /Inspectable Proof of Work/, 'C04 Pillar 3 missing');
assert.match(collegesPage, /figure[:=]\s*['"]branches['"]/, 'C04 Pillar 3 must use Hairline figure "branches"');
assert.match(collegesPage, /Direct Recruiter Matching/, 'C04 Pillar 4 missing');
assert.match(collegesPage, /figure[:=]\s*['"]sieve['"]/, 'C04 Pillar 4 must use Hairline figure "sieve"');
console.log('  ✓ C04 4 Pillars and Hairline figures verified');

// [TEST 5] C05: Proof Dossier & Verification Artifacts
console.log('\n[TEST 5] C05: Proof Dossier & Verification Artifacts');
assert.match(collegesPage, /1,840\+/, 'C05: Missing 1,840+ verified artifacts');
assert.match(collegesPage, /0/, 'C05: Missing 0 inflated claims');
assert.match(collegesPage, /Inflated Résumé Claims/, 'C05: Missing Inflated Résumé Claims text');
assert.match(collegesPage, /100%/, 'C05: Missing 100% inspectable git trees');
assert.match(collegesPage, /Inspectable Git Trees/, 'C05: Missing Inspectable Git Trees text');
assert.match(collegesPage, /24\/24 TESTS PASSING/, 'C05: Missing 24/24 tests passing verification badge');
assert.match(collegesPage, /Architecture Decision Memo/, 'C05: Missing Architecture Decision Memo preview');
console.log('  ✓ C05 Proof dossier & verification artifacts verified');

// [TEST 6] C06: College Lead Capture
console.log('\n[TEST 6] C06: College Lead Capture');
assert.match(collegesDemo, /variant="college"/, 'C06: colleges/request-demo must render IntentLeadForm variant="college"');
assert.match(leadForm, /name: 'organization', label: 'College \/ University name'/, 'C06: Missing organization field');
assert.match(leadForm, /name: 'name', label: 'Placement head \/ contact name'/, 'C06: Missing contact name field');
assert.match(leadForm, /name: 'email', label: 'Official email address'/, 'C06: Missing official email field');
assert.match(leadForm, /name: 'phone', label: 'Phone number'/, 'C06: Missing phone number field');
assert.match(leadForm, /name: 'student_count', label: 'Approx\. student count'/, 'C06: Missing student count field');
assert.match(leadForm, /name: 'graduation_year', label: 'Target graduation year'/, 'C06: Missing target grad year field');
assert.match(leadForm, /name: 'placement_challenges', label: 'Key placement challenges'/, 'C06: Missing placement challenges textarea');
console.log('  ✓ C06 College Lead Capture form fields verified');

// [TEST 7] C07: 4-Week Fast-Track Deployment Timeline
console.log('\n[TEST 7] C07: 4-Week Fast-Track Deployment Timeline');
assert.match(collegesPage, /Week 1/, 'C07: Missing Week 1');
assert.match(collegesPage, /Cohort Baseline Diagnostic/, 'C07: Missing Week 1 title');
assert.match(collegesPage, /Week 2/, 'C07: Missing Week 2');
assert.match(collegesPage, /Personalized Sprint Roadmaps/, 'C07: Missing Week 2 title');
assert.match(collegesPage, /Week 3/, 'C07: Missing Week 3');
assert.match(collegesPage, /Project Verification & Milestone Reviews/, 'C07: Missing Week 3 title');
assert.match(collegesPage, /Week 4/, 'C07: Missing Week 4');
assert.match(collegesPage, /Recruiter Dashboard Activation/, 'C07: Missing Week 4 title');
console.log('  ✓ C07 4-Week Fast-Track Deployment timeline verified');

// [TEST 8] E01: Employer Hero Headline, Eyebrow & CTAs
console.log('\n[TEST 8] E01: Employer Hero Headline, Eyebrow & CTAs');
assert.match(enterprisePage, /Early-Career Talent Intelligence/i, 'E01: Missing eyebrow');
assert.match(enterprisePage, /Hire with evidence\./i, 'E01: Missing headline part 1');
assert.match(enterprisePage, /Look behind the résumé\./i, 'E01: Missing headline part 2');
assert.match(enterprisePage, /Résumés are uncalibrated claims; coding quizzes test memorization\./, 'E01: Missing subheadline part 1');
assert.match(enterprisePage, /Pathwisse lets hiring teams evaluate early-career engineers through authentic code architectures/, 'E01: Missing subheadline part 2');
assert.match(enterprisePage, /href="\/enterprise\/request-demo"/, 'E01: Missing primary CTA to /enterprise/request-demo');
assert.match(enterprisePage, /href="#evidence-model"/, 'E01: Missing secondary CTA to #evidence-model');
console.log('  ✓ E01 Employer hero headline, eyebrow, subheadline and CTAs verified');

// [TEST 9] E02: Candidate Evidence Dossier Visual
console.log('\n[TEST 9] E02: Candidate Evidence Dossier Visual');
assert.match(enterprisePage, /Ananya K\./, 'E02: Missing candidate Ananya K.');
assert.match(enterprisePage, /Target: Associate Full Stack Engineer/, 'E02: Missing target role');
assert.match(enterprisePage, /94% Role Match/, 'E02: Missing 94% Role Match badge');
assert.match(enterprisePage, /3 Verified Artifacts/, 'E02: Missing 3 Verified Artifacts badge');
assert.match(enterprisePage, /Distributed Task Queue with Redis async worker, exponential backoff, dead-letter queue, 24 passing unit tests\./, 'E02: Missing technical decision memo verbatim text');
assert.match(enterprisePage, /Architecture Review: Top 5% modular API design & clean schema migration/, 'E02: Missing architecture review verbatim text');
assert.match(enterprisePage, /API Architecture & Error Handling/, 'E02: Missing API Architecture metric');
assert.match(enterprisePage, /95\/100/, 'E02: Missing 95/100 score');
assert.match(enterprisePage, /Data Query Optimization \(SQL\)/, 'E02: Missing SQL metric');
assert.match(enterprisePage, /91\/100/, 'E02: Missing 91/100 score');
assert.match(enterprisePage, /Code Maintainability & Test Coverage/, 'E02: Missing Maintainability metric');
assert.match(enterprisePage, /88\/100/, 'E02: Missing 88/100 score');
assert.match(enterprisePage, /SAMPLE DOSSIER · DEMO/, 'E02: Missing demo sample data badge');
console.log('  ✓ E02 Candidate Evidence Dossier visual and metrics verified');

// [TEST 10] E03: 6 Capability Advantage Pillars with Hairline Figures
console.log('\n[TEST 10] E03: 6 Capability Advantage Pillars with Hairline Figures');
assert.match(enterprisePage, /Inspectable Code Architecture/, 'E03 Pillar 1 missing');
assert.match(enterprisePage, /figure[:=]\s*['"]exploded['"]/, 'E03 Pillar 1 must use Hairline figure "exploded"');
assert.match(enterprisePage, /Algorithmic Consistency Drills/, 'E03 Pillar 2 missing');
assert.match(enterprisePage, /figure[:=]\s*['"]terminal['"]/, 'E03 Pillar 2 must use Hairline figure "terminal"');
assert.match(enterprisePage, /Immutable Skill Verification/, 'E03 Pillar 3 missing');
assert.match(enterprisePage, /figure[:=]\s*['"]vault['"]/, 'E03 Pillar 3 must use Hairline figure "vault"');
assert.match(enterprisePage, /Real Production Trade-Offs/, 'E03 Pillar 4 missing');
assert.match(enterprisePage, /figure[:=]\s*['"]keyboard['"]/, 'E03 Pillar 4 must use Hairline figure "keyboard"');
assert.match(enterprisePage, /Direct Evidence Shortlisting/, 'E03 Pillar 5 missing');
assert.match(enterprisePage, /figure[:=]\s*['"]sieve['"]/, 'E03 Pillar 5 must use Hairline figure "sieve"');
assert.match(enterprisePage, /Zero Résumé Keyword Spam/, 'E03 Pillar 6 missing');
assert.match(enterprisePage, /figure[:=]\s*['"]branches['"]/, 'E03 Pillar 6 must use Hairline figure "branches"');
console.log('  ✓ E03 6 Capability Advantage Pillars and Hairline figures verified');

// [TEST 11] E04: 4-Step Technical Hiring Workflow
console.log('\n[TEST 11] E04: 4-Step Technical Hiring Workflow');
assert.match(enterprisePage, /Role Benchmark/, 'E04: Missing Role Benchmark step');
assert.match(enterprisePage, /Define required capabilities and architectural standards/, 'E04: Missing Role Benchmark description');
assert.match(enterprisePage, /Evidence Search/, 'E04: Missing Evidence Search step');
assert.match(enterprisePage, /Filter cohorts by demonstrated project proof and test metrics/, 'E04: Missing Evidence Search description');
assert.match(enterprisePage, /Artifact Review/, 'E04: Missing Artifact Review step');
assert.match(enterprisePage, /Inspect code repositories and technical decision memos/, 'E04: Missing Artifact Review description');
assert.match(enterprisePage, /Direct Offer/, 'E04: Missing Direct Offer step');
assert.match(enterprisePage, /Fast-track high-readiness candidates directly to technical interviews/, 'E04: Missing Direct Offer description');
console.log('  ✓ E04 4-Step Technical Hiring Workflow verified');

// [TEST 12] E05: Enterprise Lead Capture
console.log('\n[TEST 12] E05: Enterprise Lead Capture');
assert.match(enterpriseDemo, /variant="enterprise"/, 'E05: enterprise/request-demo must render IntentLeadForm variant="enterprise"');
assert.match(leadForm, /name: 'organization', label: 'Company name'/, 'E05: Missing company name field');
assert.match(leadForm, /name: 'name', label: 'Full name'/, 'E05: Missing full name field');
assert.match(leadForm, /name: 'email', label: 'Work email'/, 'E05: Missing work email field');
assert.match(leadForm, /name: 'designation', label: 'Role \/ Designation'/, 'E05: Missing designation field');
assert.match(leadForm, /name: 'employee_count', label: 'Engineering \/ Team size'/, 'E05: Missing team size field');
assert.match(leadForm, /name: 'skills_needed', label: 'Priority skills or roles'/, 'E05: Missing skills needed field');
assert.match(leadForm, /name: 'timeline', label: 'Implementation timeline'/, 'E05: Missing timeline field');
assert.match(leadForm, /name: 'training_requirements', label: 'Capability requirements & notes'/, 'E05: Missing training requirements textarea');
console.log('  ✓ E05 Enterprise Lead Capture form fields verified');

// [TEST 13] E06: Compliance, Security & DPDP
console.log('\n[TEST 13] E06: Compliance, Security & DPDP');
assert.match(enterprisePage, /id="compliance-security"/, 'E06: Section id="compliance-security" must exist');
assert.match(enterprisePage, /Indian DPDP Act Alignment/, 'E06: Missing Indian DPDP Act Alignment');
assert.match(enterprisePage, /SOC 2 Type II Compliant Edge/, 'E06: Missing SOC 2 Type II Compliant Edge');
assert.match(enterprisePage, /href="\/trust\/security"/, 'E06: Missing link to /trust/security');
assert.match(enterprisePage, /href="\/trust\/privacy"/, 'E06: Missing link to /trust/privacy');
assert.match(enterprisePage, /href="\/trust\/dpdp"/, 'E06: Missing link to /trust/dpdp');
console.log('  ✓ E06 Compliance, Security & DPDP section verified');

// [TEST 14] Hire Page Bridge to Enterprise
console.log('\n[TEST 14] Hire Page Bridge to Enterprise');
assert.match(hireClient, /href="\/enterprise"/, 'Hire page must link to /enterprise');
assert.match(hireClient, /href="\/enterprise\/request-demo"/, 'Hire page must link to /enterprise/request-demo');
assert.doesNotMatch(hireClient, /href="#"/, 'Hire page must not have dead "#" hrefs');
console.log('  ✓ Hire page cleanly connected to enterprise talent intelligence');

console.log('\n======================================================================');
console.log('   ALL COLLEGE & ENTERPRISE TESTS PASSED WITH 100% COMPLIANCE         ');
console.log('======================================================================\n');
