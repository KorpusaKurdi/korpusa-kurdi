# Session: Design & docs foundation pass

- **Created:** 2026-05-10
- **Updated:** 2026-05-10
- **Status:** done
- **User:** Armanc

## Goal
Get the static homepage + engineering doc into a publishable foundation — working brand, polished shared navigation, expanded documentation, mobile-friendly layout, and an LLM-agnostic `.ai/` workspace so future sessions can pick up cleanly.

## Progress

### Brand & assets
- Created `assets/logo.svg` as single source of truth for the brand mark. Both pages reference it for favicon + nav (no inline duplicates).
- Redesigned the logo: red top-left / **white middle** / green bottom-right diagonal with a 21-ray Roj sun centered on the white band (yellow `#f4c542`). Old design archived as `assets/_old_logo.svg`.
- Moved `KurdistanFlag.png` and the new SVG into `assets/` (web-standard); removed `_resource/`.

### Pages
- `docs.html` — added new sections, in order:
  - **§4 Data analysis & outputs** — 6-step horizontal flow (Contribute → Normalise → Aggregate → Detect → LLM-assist → Publish) + metrics table + 9-card outputs grid + descriptive-guarantee callout.
  - **§5 Resources & prior art** — 4 categories (Datasets, Voice & speech, NLP tools, Comparable platforms) as 2-column card grids. Conservative URL policy: only canonical URLs (HF kurdish-corpus, Mozilla Common Voice, Sina Ahmadi's KLPT). Removed the duplicate lists from the Appendix.
- `docs.html` §6 "Repositories & code organisation" reframed: target polyrepo + "Today vs. target" callout noting only `korpusa-kurdi` exists; live/planned status pills per repo; org slug fixed to `KorpusaKurdi`; `kk-docs` row dropped (its role is filled by this repo).
- `docs.html` got a "Pinned links" callout at the top of the content (Org / Repo / Kanban / PROD env).
- `index.html` phone mockup: `Welcome back, Nûrî` → `Welcome back, Armanc`.
- Fixed all `korpusakurdi-pitch.html` references → `index.html` (5 spots in docs nav).

### Navigation (shared header)
- Made the `<nav>` block structurally identical on both pages — same brand link, same 5 anchor links (Problem · How · Impact · Tech · Research) using `index.html#X` everywhere, same Contribute CTA pointing to `index.html#cta`. Only the Pitch ↔ Docs label/href differs.
- `Docs` (on index) and `Pitch` (on docs) restyled from plain text to **outline buttons** matching the Contribute CTA's dimensions — transparent fill, 1px border, `font-weight: 600`, accent-warm hover with halo.
- Section-anchor color unified to `var(--muted)` on both pages (index used to inherit gold accent from the global `a{}` rule — that was the color mismatch).
- `scrollbar-gutter: stable` on `html` so the page width is constant across both pages → toggle and Pitch/Docs button now sit at the **same pixel position** on every navigation.
- Theme toggle redesigned: emoji → custom monochrome SVG sun (8-ray, echoing the Roj rays) and crescent moon. CSS-driven crossfade-rotate on theme change (JS no longer sets icons imperatively). Warm accent hover with soft halo, scale-press on click.

### Mobile fixes (docs.html)
- Long inline code/text was forcing horizontal overflow → `overflow-wrap: break-word` on body, `overflow-wrap: anywhere; word-break: break-word` on `<code>`, `min-width: 0` on grid children so wide blocks scroll inside themselves.
- Tightened typography on `≤540px` (smaller h1/h2/h3, reduced section padding, `.wrap` padding 22px → 16px, table font 12px).
- TOC restructured into `<details>`/`<summary>` accordion. Desktop: summary hidden, list always visible (unchanged). Mobile: tappable "Contents ▾" bar, **sticky at `top: 54px`** under the nav, expanded list has `max-height: 60vh` with internal scroll. Chevron rotates 180° on open.
- Mobile nav: Docs/Pitch link previously hidden inside the `<ul>` that gets `display:none` on `≤540px`. Moved it into `.nav-actions` (always visible).

### Workspace scaffolding
- `.gitignore` — `.DS_Store`, `node_modules`, `.env*`, plus `.claude/`, `_claude-files/`, `.superpowers/` so personal LLM config stays local.
- `CLAUDE.md` (root) — LLM-agnostic project entry point: status, structure, pinned links, quick start, editing conventions, `GIT_SCOPE: personal`.
- `.ai/README.md` — boot sequence + session template + 10-day archival rule. Lighter than HinbunaKurdi (no `rules/` subfolder yet — project is too small for shared standards to crystallise).
- `.ai/sessions/_tracker.md` — initial empty kanban with documented format.

## Decisions

- **Logo as inline SVG** rather than PNG/ICO. Crisp at any size, works for favicon + nav from one file, no additional asset pipeline.
- **`assets/` over `_resource/`**. Web-standard, framework-agnostic — explicitly OK'd vs. the workspace `_`-prefix convention.
- **Conservative URL policy** in §5 Resources. Only included direct links for resources whose canonical URL is unambiguous (HF kurdish-corpus, Mozilla Common Voice, Sina Ahmadi's KLPT). For everything else, named the resource with a hint to search HF/GitHub — avoids URL rot and avoids fabricating links.
- **Truly shared header** (identical HTML except the Pitch/Docs label) over a JS-rendered shared component. No build step needed; the small duplication is worth keeping the project static.
- **`<details>` for mobile TOC** over a JS hamburger or sticky-with-overlay. Native, accessible, no JS, works as a pure CSS state-toggle.
- **Sticky-on-mobile TOC** rather than a static block at the top of the doc body. Long doc + 20 sections → users need to jump frequently; keeping the jump menu permanently in reach is the difference between usable and not.
- **Section placement**: §4 Data analysis after Scientific approach (concept-before-engineering), §5 Resources after Data analysis (audit before build). Both placements chosen by Armanc; required two rounds of renumbering downstream sections (§4-§18 → §5-§19, then §5-§19 → §6-§20).

## Next Steps
- (Optional) Add a small "back to top" affordance on long docs pages.
- (Optional) Verify the live deploy on `korpusa-kurdi.pages.dev` matches the local preview after this lands.
- Future session: when the `kk-mobile` / `kk-api` repos spin up, update `docs.html` §6 status pills from `planned` → `live`, and update `CLAUDE.md` to reflect that this repo is no longer the dev sandbox.
