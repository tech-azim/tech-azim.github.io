# Portfolio redesign — direction document

This document is the strategy and design system behind `portfolio_redesign.html`.
Open that file in a browser to see the system applied. This document explains
**why** each decision was made, so you can keep iterating without losing the
through-line.

---

## 1. What changed and why

### Critical (legal) — done
- Removed every restricted-employer project from `src/datas/portfolio.ts`
  (the four entries tagged with that company plus their slugs).
- Removed every image asset associated with those projects from
  `public/project/` (13 CRM/HRIS screenshots plus two client product shots).
- Removed the restricted-employer entry from `src/datas/experience.ts` and
  the matching CRM item from `keyProjects`.
- Removed the "show that company first" sort logic from
  `src/components/PortfolioSection.tsx` and `src/pages/workspace/index.tsx`.
- Replaced an in-prose mention of one of those client products in the
  freelance entry with non-confidential alternatives.

> **You will need to decide** how to represent Feb 2025 → present on your
> CV/site (since that period was the restricted role). The cleanest option
> is "Independent / Contract Fullstack &amp; UI Developer." The redesign
> mockup uses exactly this framing in the hero
> (`Currently · Independent / Contract`).

### Strategic (positioning) — done
- The hero reframes you from "Fullstack Developer" → **"UI/UX developer who
  actually ships the frontend."** That's the exact niche where most product
  teams hire — designers who can implement, or frontend devs with design
  taste — and it's the lane where you have the strongest evidence.
- Selected work is cut from 19 projects to **4 case studies + 2 OSS packages.**
  The original list was a CV; the new list is a portfolio. (Recruiters
  scanning at speed need fewer, deeper stories — not more, shallower ones.)
- Each case study now follows **Problem → Process → Key decisions → Outcome.**
  This is the universal case-study structure for design and design-engineering
  roles, and it forces specificity instead of feature lists.

---

## 2. Selected projects (the 4 you keep)

| # | Project | Why it stays | What it proves |
|---|---|---|---|
| 01 | **IFG Life — Insurance mobile** | Public, recognizable, non-confidential surface (life.id). Performance + offline-first work translates to any company. | You can own a critical-path frontend track inside a multi-team agile org. |
| 02 | **Learnova — Certification platform** | Public product, end-to-end ownership, real journey-mapping work. | You design AND build, you can run a multi-actor product (participant / assessor / admin) solo. |
| 03 | **Dimedika — EHR for clinics** | Genuine field-research story. Showcases healthcare UX constraint thinking. | You make UX decisions from observed behavior, not assumptions. |
| 04 | **Kopi Kita — AI CRM** | Latest. Personal. Public demo + source. Hits the AI-product zeitgeist without being a toy. | You ship side projects, you have applied LLM/RAG experience, you have an opinion about how AI tools should feel. |

Plus a small "Also published" band for `msteams-azim` and `docusign-azim` —
proof of public, maintained code, without taking a case-study slot.

### Projects intentionally cut from the front of the site

- `OBS Investment`, `Sandbox POS`, `TweakMove POS`, `Fishlog WMS`, `Keep My
  Space`, `Sherpa`, `Sakeena`, `Eroses`, `Hygearfit`, `Waterhub`. These are
  fine projects but they would dilute the four you actually want recruiters
  to remember. **Move them to a `/archive` page**, linked at the bottom of
  the home page as "Older work, 2021–2023 →". Don't delete — they support
  the breadth claim in About, and they're useful in interviews.

---

## 3. Design system

### Palette
The current site is dark + tech-yellow (`#0F0F0F` / `#FACC15`). That reads as
"developer template" — it's a code-editor palette, not a designer's
palette. The redesign uses a paper-warm light theme with one accent.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAF7F2` | Page background — paper, not stark white |
| `--bg-2` | `#F2EDE5` | Subtle dividers, alternating bands |
| `--ink` | `#171717` | Primary text |
| `--ink-2` | `#3F3F3F` | Body copy |
| `--ink-3` | `#6B6B6B` | Captions, mono labels |
| `--rule` | `#E5DFD5` | Hairline rules |
| `--accent` | `#C84A1F` | Terracotta — single accent |
| `--accent-soft` | `#F4E4DC` | Outcome callouts |

> **One accent rule.** `#C84A1F` appears only in three places: case-study
> numbers, the bullet arrows inside case-study lists, and the outcome
> callouts. Resist the urge to use it for buttons, hover states, and links
> simultaneously — that's where the "AI-generated template" feel creeps in.

> **Dark mode optional.** A real designer's portfolio that ships only one
> mode reads as more committed than one with a toggle bolted on. Keep the
> light theme as the only theme for v1.

### Typography
Three families, each with one job. No more.

| Family | Role | Why |
|---|---|---|
| **Fraunces** (variable serif) | Display headings, quote text | Modern serif with optical sizing — gives the "real designer's portfolio" feel. Inter alone is too generic. |
| **Inter** | Body, navigation, UI | Workhorse. Pair with Fraunces is well-trodden but for good reason. |
| **JetBrains Mono** | Eyebrows, metadata, technical labels, captions | Signals craft. Confines all "tech" energy to small text where it belongs. |

#### Type scale (px)
```
Display 1 (hero)   72–92  Fraunces 300, line-height 1.02, letter-spacing -0.025em
Display 2 (h2)     34–52  Fraunces 300, letter-spacing -0.02em
Heading (h3)       28–32  Fraunces 400
Lede               26     Fraunces 300, line-height 1.3
Body               17     Inter 400, line-height 1.55
Body small         15     Inter 400
Eyebrow / meta     11–13  JetBrains Mono, uppercase, letter-spacing 0.06–0.08em
```

> **Hierarchy lever, not size.** Differences come from family + weight +
> casing, not from going bigger. That's what makes typography feel "designed"
> rather than "scaled."

### Spacing
Vertical rhythm uses an 8px grid, but section padding is intentionally
larger than most templates (`90–120px` on desktop) to give the prose room.
Whitespace is the single cheapest credibility upgrade.

| Token | Value | Use |
|---|---|---|
| Section padding (Y) | 90px desktop, 56px mobile | Breathing room between major sections |
| Case-study gap | 56px | Between sticky meta column and case body |
| Reading column max-width | ~620–680px | Case bodies, About, Contact lede |
| Page max-width | 1180px | Outer wrap |
| Gutter | 32px desktop / 22px mobile | Edges of the wrap |

### Layout patterns

1. **Sticky meta column.** Each case study uses a 2-column layout: a sticky
   left column with project metadata (number, title, role, stack, link), and
   a scrolling right column with Problem/Process/Decisions/Outcome. The meta
   stays anchored as you scroll the body — readers always see what project
   they're inside.

2. **Inverted section bands.** The Open Source band uses `--ink` as a
   background to break the page rhythm without using gradients or images.
   One inverted band on a long page is enough.

3. **Eyebrow → headline → deck.** Every section opens with this triplet.
   Mono eyebrow, serif headline, sans deck. Predictable scanning structure.

4. **Hairline rules over cards.** Case studies are separated by a 1px rule,
   not by a card with a shadow. Cards add visual noise; rules don't.

### Iconography & motion
- **No icons** in the v1 redesign. The mock uses an `→` glyph and `↗` for
  external links. That's it. Add icons only when each one earns its place.
- **No on-scroll animations.** The brief explicitly bans these. The mock
  has zero JS. The only motion is the cursor pulse next to "Open to roles"
  (CSS-only) and hover transitions on links.

---

## 4. Section-by-section copy

The mockup uses these. Tweak voice but keep the structure.

### Hero
> **Eyebrow:** Portfolio · Bandung, ID → Remote
> **Headline:** UI/UX developer who *actually ships* the frontend.
> **Lede:** I'm Azim. I design product interfaces and build them. Five years
> in, mostly across insurance, healthcare, and education tools — the kind of
> software people use because they have to, not because they want to. I try
> to make those products feel less like that.
>
> **Meta row:** Currently · Independent / Contract  |  Based · Bandung, Indonesia
> | Stack · Figma → React / Next.js

Why it works: no "passionate," no "innovative," no "creative." It says what
you do, where you stand, and lands one observation that signals taste ("the
kind of software people use because they have to"). That last sentence is
what makes it sound like a person, not a template.

### Case-study skeleton (use for every one)

```
Eyebrow: 0X / 04 — YYYY
Headline: Project — short noun phrase
Role row: <role> · <duration> · <team shape>
One-sentence context (2 lines max)
[Stack chips]
Live link

Problem    — 2–4 sentences. What was broken? Be specific.
Process    — 2–4 bullets. Verbs first ("Profiled", "Mapped", "Co-designed").
Key decisions — 2–4 bullets. Each one is a tradeoff you owned.
Outcome    — 1 short paragraph in a callout box. Numbers if you have them,
             qualitative if you don't. NEVER fabricate metrics.
```

### About
- Open with one sentence that compresses the value prop.
- Three short paragraphs: how you got here / how you work / something human.
- Three "factrow" stats at the bottom — only stats you can defend in
  interview. (Years, industries, OSS packages. Not "150+ projects".)

### Skills — three groups
Use the exact groupings in the mockup. **Don't list 30 things.** 6–7 per
group. List by frequency of current use, not by exposure history. If
something is on your CV but you haven't touched it in 2 years, leave it off
the portfolio (keep it on the CV).

### Contact
- One large headline. One supporting sentence about what roles you're
  actually open to. Then links.
- Don't add a contact form. A contact form on a designer's portfolio is a
  red flag — it usually signals "I copy-pasted a Bootstrap template." A
  `mailto:` link is more honest and more usable.

---

## 5. Tone — what to remove from the current copy

These exact phrases (or near-equivalents) appear in the current site or
data files. **Cut all of them:**

| Cut | Why |
|---|---|
| "passionate" | Universally on the cliché blacklist. |
| "hardworking", "dedicated" | Same. |
| "Enterprise Solutions I've Built" | Vendor brochure voice. |
| "Want to See Detailed Case Studies?" | LinkedIn growth-hacker voice. |
| "150+ projects delivered", "95% client satisfaction" | Unverifiable round numbers — they read as fake even when they're true. |
| "scalable, maintainable solutions" | Resume-ese. Doesn't say anything. |
| "translating business requirements into" | Same. |

Replace with concrete observations. "I cut policy-screen load from 2s to
under 1s" beats "passionate about performance" by an order of magnitude.

### A short voice rubric

- **Specific over scenic.** "Two clinics, half-day each" beats "extensive
  field research."
- **Verbs over nouns.** "Profiled the render tree" beats "performance
  optimization."
- **Owned tradeoffs, not just wins.** "Cut billing from v1" is more
  trustworthy than "delivered comprehensive feature set."
- **A little dry humor is fine.** The mockup has one — "excellent for the
  focus, mediocre for the bandwidth." Use sparingly.

---

## 6. Visual credibility upgrades

The biggest credibility lift on a UI/UX portfolio comes from how project
visuals are treated. A few principles, in priority order:

1. **One hero shot per case study, not a gallery.** A single, well-cropped
   image of the most interesting screen beats six shots of every screen.
   Galleries dilute. Pick the screen that earned the case study.
2. **Show the design, not the chrome.** Crop out browser bars, OS chrome,
   and device frames unless the device frame *is* the point (a tablet for
   Dimedika, a phone for IFG Life). For desktop UIs, a clean flat crop
   reads more designerly than a 3D mockup of a MacBook on a desk.
3. **Use device frames where they tell a story.**
   - Dimedika → tablet frame, because the "designed for the in-room tablet"
     story is the case study.
   - IFG Life → phone frame, because mobile context is the story.
   - Learnova / Kopi Kita → flat browser crop, no frame.
4. **Annotate one decision per project, not the whole UI.** A small mono
   caption pointing at one detail ("calendar-first home, no patient list")
   teaches more than a feature tour. Use sparingly — one per case study.
5. **Process artifacts beat polished mockups for credibility.** A
   whiteboard photo of journey mapping, a Figma frame of the discarded
   alternative flow, or a profiler screenshot on a real device — these read
   as evidence, not marketing. One per case study, slotted into the Process
   section.
6. **Resist gradient backgrounds behind project shots.** They scream
   template. A flat warm color sampled from the project itself works.
7. **Run a visual sanity check.** Pull every project image into a single
   Figma board. If they look like a coordinated set, you're done. If
   they look like a Pinterest grid, you have work.

> Suggested image plan for each case study:
>
> - **IFG Life** → 1 phone-framed hero (policy summary screen) +
>   1 process artifact (a short before/after of the load timeline).
> - **Learnova** → 1 flat hero (assessor console) + 1 wireframe
>   comparing the two-page vs single-page assessor flow you tested.
> - **Dimedika** → 1 tablet-framed hero (calendar home) + 1 photo or
>   sketch from the clinic shadow session.
> - **Kopi Kita** → 1 flat hero (chat + dashboard side by side) +
>   1 short prompt-iteration snippet showing the "summer drink in November"
>   evolution.

---

## 7. Implementation path

You don't have to rewrite the Next.js app to ship the redesign. Suggested
sequence, smallest steps first:

1. **(Done by me) Legal purge** — `portfolio.ts`, `experience.ts`,
   `PortfolioSection.tsx`, `workspace/index.tsx`, image assets.
2. **Review the mockup** in `portfolio_redesign.html` against this doc.
   Mark anything you'd push back on.
3. **Replace `pages/index.tsx`** with the new section structure. The
   existing `Navigation` and `Footer` components can be kept; the rest of
   the page (hero with rotating service cards, the existing
   `PortfolioSection`, the dark skills grid, the certification grid) gets
   replaced by the new sections from the mockup.
4. **Refactor `PortfolioSection`** to render Problem/Process/Decisions/
   Outcome. The new `PortfolioItem` shape in `portfolio.ts` already keeps
   the existing fields working — but you'll want to extend the interface
   with optional `problem`, `process`, `decisions`, `outcome` fields and
   then fill them in for the four case studies.
5. **Move older projects** to a `/archive` page so the front page stays
   focused. Link to it from the bottom of `Selected work`.
6. **Type system swap** — install Fraunces, Inter, and JetBrains Mono via
   `next/font/google` (replace the current `Geist` import in `_app.tsx` /
   `index.tsx`).
7. **Palette swap** — search-and-replace the dark/yellow tokens
   (`#0F0F0F`, `#FACC15`, `#F3F4F6`) for the new ones in `globals.css`.
   Doing this as a Tailwind theme extension is cleaner than literal hex
   replacement, but either works for v1.
8. **Cull skills** — current `skills` object in `experience.ts` lists
   everything; the redesign uses three lean groups. Keep the full object
   for other pages but render only the curated subset on the home page.
9. **Replace the "150+ projects / 95% satisfaction" stats** with the
   honest "5+ / 6 / 2" stats in the About section.
10. **One round of image work** following the visual credibility plan in
    §6. This is the highest-leverage hour you'll spend.

---

## 8. Anti-checklist — things to NOT add later

It's tempting to "improve" a designer's portfolio with the wrong upgrades.
A short list of things that consistently make these sites worse:

- A custom cursor.
- A loading screen with the brand mark.
- A horizontal-scrolling project section.
- A "skills percentage" bar (100% React, 80% Vue…).
- A testimonials carousel.
- A blog section with one post from 18 months ago.
- A 3D model of yourself.
- A toggle that switches between "Designer Mode" and "Developer Mode."
- A chatbot that pretends to be you.
- "Made with ❤ in Bandung" in the footer.

If any of these would visibly improve your portfolio, the underlying work
is the actual problem — not the decoration.

---

## 9. Open questions for you

Before I refactor the actual Next.js app (if you want me to), I'd want
answers to:

1. **Feb 2025 → present** — how do you want this period framed on the
   site? Options: (a) "Independent / Contract" merged with the freelance
   period, (b) a separate generic "Studio of one" entry, (c) leave it off
   entirely and let recent project dates speak.
2. **Resume / CV link** — do you want a downloadable PDF, or just a
   LinkedIn link? The mockup wires both, but pick one to maintain.
3. **The `/workspace`, `/article`, and `/support` pages** — these exist in
   the current app but feel off-strategy for a UI/UX hiring portfolio. My
   recommendation: hide them from primary nav, leave them indexable only
   via direct URL. Confirm before I touch them.
4. **Older projects archive** — should I generate `/archive` with the 12+
   cut projects, or remove them from the data file too?
5. **Photo of you** — currently `azim.png` in `/public`. Designer
   portfolios are split on this. If you keep one, use one black-and-white
   environmental shot, not a head-on portrait.

Send answers and I'll cut the v1 React refactor.
