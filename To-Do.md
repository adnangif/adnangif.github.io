## Portfolio To‑Do

Legend: [P0] critical, [P1] important, [P2] nice-to-have. We follow these tasks in priority order and adhere to `rules.md`.

### [P0] Foundation

- [x] **Create Next.js app (App Router, TypeScript) at repo root**
  - `npx create-next-app@latest . --ts --tailwind --eslint --import-alias "@/*"`
- [x] **Configure static export for GitHub Pages**
  - Add `next.config.ts` with `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`
  - Ensure `.nojekyll` is emitted to `out/`
- [x] **Install and initialize shadcn/ui**
  - `npx shadcn@latest init -d`
  - Add components: `button`, `card`, `navigation-menu`, `badge`, `avatar`, `sheet`, `dialog`, `tooltip`, `accordion`, `tabs`
- [x] **Install Framer Motion and lucide-react**
  - `npm i framer-motion lucide-react`
- [x] **Global layout and theming**
  - Implement `app/layout.tsx` with `<ThemeProvider>`, fonts, metadata defaults, and dark mode toggle
  - Header (brand + nav), Footer (links, socials)
- [x] **Decide and scaffold routes** (placeholders conforming to `rules.md`)
  - `/`, `/projects`, `/projects/[slug]`, `/experience`, `/skills`, `/resume`, `/contact`
- [x] **Resume ingestion from LaTeX**
  - Add `muhammadfahim.tex` to repo (if not already)
  - Create script `scripts/parse-resume.ts` to convert LaTeX → `data/resume.json`
  - Wire server utilities to read `data/resume.json`
- [ ] **Home page (v1)**
  - Hero with name, role, CTA; featured projects; skills; contact CTA
- [x] **CI/CD: Deploy to GitHub Pages**
  - Add GitHub Actions workflow to build, `next export`, upload `out/`, and deploy

### [P1] Core Pages and Content

- [ ] **Projects index and detail**
  - Grid list with filters; detail page using MDX or JSON-backed content; use shadcn cards
- [ ] **Experience timeline**
  - From `data/resume.json`; accessible timeline with shadcn components
- [ ] **Skills page**
  - Grouped by category, proficiency indicators
- [ ] **Resume page**
  - Render HTML view from JSON; provide download of compiled `resume.pdf`
  - Optional: CI step to compile LaTeX → PDF (`latexmk -pdf`), else commit PDF manually
- [ ] **Contact page**
  - Form with validation; integrate Formspark/Resend/Netlify Forms
- [ ] **SEO & social**
  - Complete metadata, `sitemap.xml`, `robots.txt`, OG/Twitter images (static)
- [ ] **Analytics**
  - Integrate Plausible/Umami

### [P2] Polish and Optional

- [ ] **MDX blog (optional)**
  - MDX setup for `/blog` and `/blog/[slug]`
- [ ] **Animations polish**
  - Framer Motion micro-interactions and page transitions (respect `prefers-reduced-motion`)
- [ ] **Visual refinements**
  - Custom OG image generation (pre-generated), favicon set, 404 page
- [ ] **Testing**
  - Playwright happy-path nav tests; type-check and lint in CI
- [ ] **Performance**
  - Lighthouse ≥ 95 on mobile/desktop, image optimization workflow
- [ ] **Internationalization (optional)**
  - Prepare i18n structure if needed later

### Backlog / Nice Ideas

- [ ] Case study template with MDX components (Callouts, ImageGallery)
- [ ] Schema.org JSON-LD for Person + Projects
- [ ] RSS (if blog enabled)

### Notes

- We prioritize shadcn/ui components wherever applicable; custom components should align with the same tokens and accessibility patterns.
- Any deviation from `rules.md` requires updating `rules.md` first, then implementing.
