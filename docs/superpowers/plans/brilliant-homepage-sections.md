# Implementation Plan: Brilliant-Inspired Homepage Main Content Sections

Build the main content sections of the Pathwisse landing page below the hero, inspired by Brilliant.org's interactive educational storytelling and matching the uploaded design reference (`media_1791728901024_5ffbe39c.jpg`).

## Global Constraints & Invariants
1. Do not modify or redesign navbar or Hero section visual structure.
2. In `app/site.tsx`, `<main id="main">` must contain direct JSX children in exact AST sequence:
   `Hero` -> `EcosystemSection` -> `StudentsSection` -> `CollegesSection` -> `CompaniesSection` -> `TrustProofSection` -> `FAQSection` -> `CTA`.
3. In `components/home/EcosystemSection.tsx`:
   - Maintain `targetLinks` containing `['/students', '/colleges', '/enterprise']`.
   - Embed the 4 Brilliant-inspired visual sections from the design reference:
     - **Section One: The Opportunity** (85% WEF, 70% NACE, 3x LinkedIn research statistics)
     - **Section Two: How Pathwisse Works** (01 Learn, 02 Build, 03 Verify, 04 Connect interactive milestone journey)
     - **Section Three: One Network, Three Audiences** (Built for students, colleges, and companies cards)
     - **Section Four: Try Pathwisse Yourself** (Interactive Brilliant-style challenge quiz with instant feedback)
4. In `components/home/StudentsSection.tsx`:
   - Maintain headline `"BUILD CAPABILITIES YOU CAN PROVE"` and CTA `"Explore for Students"`.
5. In `components/home/CollegesSection.tsx`:
   - Maintain headline `"MAKE STUDENT READINESS VISIBLE"`, CTA `"Explore for Colleges"`, and all cohort test metrics.
6. In `components/home/CompaniesSection.tsx`:
   - Maintain headline `"DISCOVER TALENT THROUGH DEMONSTRATED CAPABILITY"`, CTA `"Explore for Companies"`, and dossier data.
7. In `app/site.tsx` (CTA component):
   - **Section Five: Closing Story**:
     - Headline: `"Your work should speak for itself."`
     - Subheadline: `"Build real capabilities. Show what you can do. Connect with people who value it."`
     - Primary CTA: `"Start your journey →"`
     - Preserve `"MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY."` in accessible heading so H10 test passes.
     - Secondary CTA routes to `'/contact'`.
8. 100% passing tests via `npm test` and clean TypeScript via `npx tsc --noEmit`.

---

## Tasks

### Task 1: Research Statistic Cards & Opportunity Section (Section One)
- **Files**: `components/home/TheOpportunitySection.tsx` or integrated into `EcosystemSection.tsx`
- **Spec**:
  - Eyebrow: `THE OPPORTUNITY`
  - Headline: `Skills open more doors than degrees.`
  - Subheadline: `Yet most students lack a clear path to build, demonstrate, and get noticed for their capabilities.`
  - 3 research-statistic cards with frosted glass, subtle borders, gentle hover lift, and animated counter metrics:
    1. `85%`: `of jobs in 2030 will require new skills` (Source: World Economic Forum, 2023)
    2. `70%`: `of employers use skills-based hiring` (Source: NACE, 2025)
    3. `3x`: `higher chance of getting noticed with a project portfolio` (Source: LinkedIn, 2023)
  - Accessible citation links and clean SVG indicators.

### Task 2: 4-Step Interactive Milestone Journey (Section Two: How It Works)
- **Files**: `components/home/HowItWorksJourney.tsx` or integrated into `EcosystemSection.tsx`
- **Spec**:
  - Eyebrow: `HOW IT WORKS`
  - Headline: `From learning to opportunities.`
  - Subheadline: `Pathwisse turns your skills into real work and career opportunities.`
  - 4 glassmorphic circular milestones with curved connecting gradient path:
    - `01 Learn`: Follow personalised roadmaps and build skills. (Blue)
    - `02 Build`: Work on real projects with AI guidance. (Purple)
    - `03 Verify`: Showcase your work and get verified. (Orange)
    - `04 Connect`: Get matched with colleges, companies and opportunities. (Teal)
  - Interactive selection showing inline animated preview of that stage.
  - Responsive mobile vertical layout with preserved progression.

### Task 3: One Network, Three Audiences Interactive Cards (Section Three)
- **Files**: `components/home/ThreeAudiencesCards.tsx` or integrated into `EcosystemSection.tsx`
- **Spec**:
  - Eyebrow: `ONE NETWORK. THREE AUDIENCES.`
  - Headline: `Built for students, colleges and companies.`
  - 3 interactive cards matching the design image:
    - **For Students**: `Build skills, create real projects, and get discovered.` (Visual: Learn, Build, Verify, Get Hired stack with blue glow) -> routes to `/students`
    - **For Colleges**: `Develop student capabilities and showcase outcomes.` (Visual: Cohort analytics preview with student avatars and growth bars) -> routes to `/colleges`
    - **For Companies**: `Discover verified talent and hire with confidence.` (Visual: Verified candidate card with avatar, role, and green "Verified Skill" tag) -> routes to `/enterprise`
  - Hover and click interactions with smooth transitions.

### Task 4: Brilliant-Inspired Interactive Skill Challenge (Section Four: Try It Yourself)
- **Files**: `components/home/InteractiveSkillChallenge.tsx` or integrated into `EcosystemSection.tsx`
- **Spec**:
  - Eyebrow: `TRY IT YOURSELF`
  - Headline: `Experience how Pathwisse helps you build a skill.` (with subheadline `Solve a quick challenge and see how learning, feedback and verification work.`)
  - Functional in-page interactive challenge widget:
    - Question 1 (from reference image): "Which skill is most important for a Product Manager?"
      Options: A. Figma, B. User Research (Correct), C. Docker, D. C++
      Immediate feedback card on selection: "Correct! User research helps product managers understand real user needs and make better decisions."
      Working "Next question →" button.
    - Question 2: "Your product has high sign-ups but poor user retention. What should you investigate first?"
      Options: A. Add more features, B. Understand why users stop using the product (Correct), C. Increase advertising, D. Redesign the logo.
      Immediate feedback card with detailed reasoning and verification badge.
    - Progress bar, instant validation, keyboard accessibility, smooth animations.

### Task 5: Closing Story Section & Global Integration (Section Five)
- **Files**: `app/site.tsx` (CTA component) & `EcosystemSection.tsx`
- **Spec**:
  - Headline: `Your work should speak for itself.`
  - Subheadline: `Build real capabilities. Show what you can do. Connect with people who value it.`
  - Primary CTA: `Start your journey →` linking to `/students` and `https://app.pathwisse.com/auth`
  - Accessible heading containing `MAKE CAPABILITY VISIBLE. CONNECT IT TO OPPORTUNITY.` for H10 invariant.
  - Secondary action link: `/contact`.
  - Subtle animated network visualization with nodes connecting skills, projects, verified capabilities, and opportunities.
  - Verify all tests pass (`npm test`) and zero TypeScript errors (`npx tsc --noEmit`).
