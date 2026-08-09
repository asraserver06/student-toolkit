# Student Toolkit — Build Instructions

## Project Overview
Build a Next.js website with two calculator tools for Pakistani university/CS students:
1. **CGPA Calculator** — semester CGPA from course credit hours + grades
2. **Merit Calculator** — university admission aggregate for NUST, FAST, PU, UET Lahore, and GIKI

Goal: monetize via Google AdSense + display ads. Site must be SEO-friendly, fast, and have real explanatory content per page (not just bare calculators) for AdSense approval.

---

## 1. Project Setup

```
npx create-next-app@latest student-toolkit
```
- TypeScript or JavaScript: either is fine
- Tailwind CSS: **Yes**
- App Router: **Yes**
- Use `/app` directory structure

### Routes to create
- `/` — homepage, lists both tools with short descriptions + links
- `/tools/cgpa-calculator` — CGPA Calculator page
- `/tools/merit-calculator` — Merit Calculator page

Each tool gets its own URL (not a single-page site) — this matters for SEO and lets each tool rank independently.

---

## 2. Design Direction ("Mark Sheet" theme)

A reference HTML file (`reference-design.html`) is included in this folder — use it as the visual and logic source of truth. Port its design tokens and calculator logic into React components.

**Palette:**
- `--paper: #f6f1e4` (background, warm cream)
- `--ink: #1b2a4a` (primary text, deep navy)
- `--ink-soft: #3d4d6b` (secondary text)
- `--red: #a5312b` (accent — buttons, results, "stamp" elements)
- `--red-soft: #c65a4f` (hover state)
- `--gold: #b8923f` (formula note highlight)
- `--card: #fffdf7` (card background)

**Typography:**
- Display/headings: Georgia or Times New Roman serif
- Body/UI: Courier New / monospace (mark-sheet / ledger aesthetic)

**Signature visual motifs:**
- Faint horizontal ruled lines across the page background (like ledger paper)
- A rotated circular "stamp" badge (e.g. "VERIFIED 2026") near the header
- Dashed/dotted borders on result breakdowns (like a receipt or exam mark-sheet)
- Double-line border under the main header

Keep it responsive down to mobile. Visible focus states on all inputs/buttons.

---

## 3. CGPA Calculator — Logic Spec

- Dynamic list of course rows: Course Name (text), Credit Hours (number), Grade (dropdown)
- Grade point scale (4.0 scale):
  ```
  A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7,
  C+ = 2.3, C = 2.0, C- = 1.7, D = 1.0, F = 0.0
  ```
- Add/remove course rows dynamically (start with 3 empty rows)
- Calculation: `CGPA = sum(credit_hours × grade_points) / sum(credit_hours)`
- Show breakdown: each course's contribution + total credit hours + final CGPA
- Validate: ignore rows with 0 or blank credit hours

---

## 4. Merit Calculator — Logic Spec

University selector (tab/button group). Each university has its own formula and field labels. **Do not average or generalize — use exact per-university weightages:**

### NUST
- Formula: `Matric% × 0.10 + FSc Part-1% × 0.15 + NET% × 0.75`
- Field labels: "FSc Part-1 %", "NET Score %"
- Note: "NUST 2026: Matric 10% + FSc Part-1 15% + NET 75%. The entry test dominates — a strong NET score matters far more than school marks."

### FAST (Computing/Business programs)
- Formula: `Matric% × 0.10 + FSc Part-1% × 0.40 + Test% × 0.50`
- Field labels: "FSc Part-1 %", "NU Test %"
- Note: "FAST 2026 (Computing/Business): Matric 10% + FSc Part-1 40% + Entry Test 50%."
- (Optional future addition: FAST Engineering programs use Matric 17% + FSc 50% + Test 33% — could add as a sub-toggle later)

### PU (Punjab University — PUCIT/FCIT)
- Formula: `Matric% × 0.25 + FSc% × 0.50 + Entry Test% × 0.25`
- Field labels: "FSc %", "PU Entry Test %"
- Note: "Punjab University (PUCIT/FCIT) 2026: Matric 25% + FSc 50% + PU Entry Test 25%. Other PU departments may vary — verify with your specific department."

### UET Lahore
- Formula: `Matric% × 0.17 + FSc Part-1% × 0.50 + ECAT% × 0.33`
- Field labels: "FSc Part-1 %", "ECAT %"
- Note: "UET Lahore Fall 2026: Matric 17% + FSc Part-1 50% + ECAT 33%."

### GIKI
- Formula: `FSc% × 0.15 + Admission Test% × 0.85` (**Matric is NOT part of this formula** — hide the Matric input field when GIKI is selected)
- Field labels: "FSc / Last Qualification %", "GIKI Admission Test / SAT %"
- Note: "GIKI 2026: FSc 15% + Admission Test 85%. Matric is required for eligibility only — not counted in the aggregate."

**Behavior:**
- Switching university tabs updates: formula note text, field labels, whether Matric field is shown, and clears the previous result
- Show a full breakdown on calculate: each component's weighted contribution + final aggregate %
- Store all formulas in a single config object (e.g. `lib/meritFormulas.ts`) so adding a new university later is a one-object addition, not a rewrite

---

## 5. Content Requirements (per tool page)

Each tool page needs 300–500 words of surrounding content — required for both AdSense approval and SEO. Structure:
- **How it works** — plain explanation of the calculation
- **FAQ** — 2-4 common questions (e.g. "What grading scale is used?", "Are these formulas official?", "Why doesn't GIKI ask for Matric?")

Draft this content in Cursor first, then have Asra edit it into her own voice before publishing — avoid pure AI-generated boilerplate, both for authenticity and because thin/generic content can hurt AdSense approval.

Always include a disclaimer near merit results: *"Formulas verified against official university admission pages, 2026 cycle. Always confirm against the official portal before applying."*

---

## 6. SEO Basics
- Use Next.js Metadata API for per-page `title` and `description`
- Add `next-sitemap` package, generate `sitemap.xml` + `robots.txt`
- Add Open Graph tags (title, description, image) so shared links preview well on WhatsApp/social
- Submit sitemap to Google Search Console after deploy

---

## 7. Testing Checklist
- CGPA: 0 credit hours ignored, decimal credit hours (e.g. 0.5), all grade options
- Merit: GIKI hides Matric field correctly, switching universities resets result, decimal percentage inputs, values >100 or <0 handled gracefully
- Mobile responsive down to ~360px width
- Keyboard navigation + visible focus states

---

## 8. Deployment
1. Push code to a GitHub repository
2. Connect repo to Vercel (free tier) — auto-deploys on every push to main
3. Free subdomain provided (e.g. `student-toolkit.vercel.app`) — no custom domain needed yet
4. After stable + some traffic: apply for Google AdSense (needs ~15-20 solid indexed pages — plan next 3-4 tools before applying: Citation Generator, Dev Utility Toolkit, etc.)

---

## 9. Roadmap After MVP
Once CGPA + Merit Calculator are live and stable, next tools to add (in priority order):
1. Citation Generator (IEEE/APA/MLA)
2. FYP Documentation Generator (proposal/SRS skeleton)
3. QR Code Generator
4. Password Generator
5. Image Compressor/Resizer
6. Unit Converter
7. PDF Tools (compress/merge/convert)
8. Resume/CV Builder

Each new tool = new route under `/tools/`, reuses the shared Navbar/Footer layout, and needs its own 300-500 word explainer + FAQ content.
