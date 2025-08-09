## Project Rules

These rules define the tech stack, site structure, conventions, and quality bars. Tasks in `To-Do.md` must follow these rules.

### Tech Stack

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **UI**: shadcn/ui (Radix primitives) — use shadcn components wherever possible
- **Animation**: Framer Motion (minimal, tasteful)
- **Content**: Primary data derived from `muhammadfahim.tex` compiled to JSON; optional MDX for rich pages
- **Icons**: `lucide-react`
- **Analytics**: Plausible or Umami (privacy-friendly)
- **Deployment**: Static export to GitHub Pages (`out/` + `.nojekyll`)

### Site Structure (App Router routes)

- `/` — Home: hero, short bio, featured projects, skills summary, contact CTA
- `/projects` — Projects index (filters/tags); cards link to detail pages
- `/projects/[slug]` — Project detail (MDX or JSON + components)
- `/experience` — Work/education timeline from resume JSON
- `/skills` — Categorized skills with proficiency indicators
- `/resume` — HTML-rendered resume + download link to `resume.pdf`
- `/contact` — Form to reach out (external form service)
- Optional: `/blog`, `/blog/[slug]` (MDX) if enabled later

### Content Source of Truth

- The file `muhammadfahim.tex` is the canonical resume.
- A script (`scripts/parse-resume.ts`) converts LaTeX → `data/resume.json`.
- Pages read from `data/resume.json` (with small per-page overrides allowed).
- If parsing fails for any section, the page should render gracefully with fallbacks.

### Static Export Rules (GitHub Pages)

- `next.config.ts` must include:
  - `output: 'export'`
  - `images: { unoptimized: true }`
  - `trailingSlash: true`
- Emit `.nojekyll` into the `out/` directory on export.
- This repository is a user site (`adnangif.github.io`), so no `basePath` needed.

### Design & UX

- Prefer shadcn/ui components; extend via `cn`/`class-variance-authority` when needed.
- Respect dark mode (class strategy). Provide a theme toggle in header.
- Keep animations subtle; honor `prefers-reduced-motion`.
- Typography: use an accessible, legible font pair; ensure proper scale and contrast.

### Accessibility

- Semantic HTML, proper alt text, visible focus states.
- Keyboard navigable menus and dialogs (Radix/shadcn handles much of this).
- Color contrast ≥ WCAG AA.

### Performance

- Aim for Lighthouse ≥ 95 on mobile/desktop.
- Pre-generate OG images; optimize images in `public/` (lossless compression in CI or precommit).
- Avoid heavy client libraries; prefer server components when possible.

### SEO

- Provide default metadata, per-route overrides, canonical URLs.
- Include `sitemap.xml` and `robots.txt`.
- Add Schema.org JSON-LD for Person and Projects when data is ready.

### Project Conventions

- **Code style**: TypeScript strict; descriptive names; early returns; small components.
- **Linting/format**: ESLint + Prettier. CI must `typecheck`, `lint`, and `build`.
- **Pre-commit hooks**: Husky + lint-staged to run lint and formatting on staged files.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`…).
- **Branches/PRs**: Feature branches + PR review before merge when feasible.
- **File structure** (App Router):
  - `app/` — routes (`page.tsx`, `layout.tsx`), metadata
  - `components/ui/` — shadcn generated
  - `components/` — site components (Header, Footer, Cards…)
  - `lib/` — utilities (resume loader, seo, analytics)
  - `data/` — generated JSON from LaTeX
  - `content/` — optional MDX for project/blog content
  - `public/` — static assets (images, icons, og images)
  - `scripts/` — maintenance scripts (parse resume, image tasks)

### Using shadcn/ui

- Prefer provided components before creating custom ones.
- If custom is required, follow shadcn tokens, spacing, and states for consistency.
- Keep components headless-friendly and accessible.

### Framer Motion Guidelines

- Limit to page transitions and small interactions.
- Wrap animations with reduced-motion checks.

### Resume Handling

- LaTeX → JSON parser should extract: profile, links, skills, experience, education, projects, awards.
- Never block page render on parser errors; log and continue.
- Keep `data/resume.json` checked in for deterministic builds.

### Deployment Workflow

- Use GitHub Actions to build, export, and deploy Pages.
- On `main` push: `npm ci`, `npm run build`, `next export`, touch `.nojekyll`, upload artifact, deploy.

### Linting Discipline

- Run `npm run lint` locally before committing.
- Pre-commit hook runs ESLint and Prettier on staged files (`lint-staged`).
- No disabled ESLint rules without justification. Fix or refactor instead of ignoring.
- Treat ESLint errors as CI blockers.

### Live Browser Checks

- Use the built-in browser tooling to validate pages after major changes:
  - Start the dev server locally and open the site in the browser tool for smoke tests.
  - Verify navigation, dark mode toggle, focus states, and critical flows.
  - Capture snapshots/screenshots when relevant and fix any console errors before merging.

### Change Management

- Any change to stack, routes, or design tokens must be reflected here first, then implemented.
