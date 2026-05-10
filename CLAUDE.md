# KorpusaKurdî

GIT_SCOPE: personal

A living corpus for the Kurdish language — collecting real usage data from speakers, attaching geographic metadata to every contribution, and using statistical and LLM-based analysis to surface variation while preserving minority forms. **Descriptive, not prescriptive.**

> **Project status:** very early. This repo serves as project homepage + engineering documentation + development sandbox. As workstreams (mobile, API, workers) start, they will split into separate repos under the [KorpusaKurdi](https://github.com/KorpusaKurdi) GitHub org.

---

## LLM Onboarding

**Start here, then follow the boot sequence in `.ai/README.md`.**

```
1. This file                          -> project overview (what + why)
2. .ai/README.md                      -> how to work
3. .ai/sessions/_tracker.md           -> where we left off
4. Active session files (in_progress) -> pick up current work
5. docs.html                          -> engineering documentation (living)
```

This entry path is **LLM-agnostic** — Claude, Cursor, Copilot, or any other tool should use it. Each tool's native config (e.g. `CLAUDE.md` for Claude) just points here.

---

## Project Structure

```
korpusa-kurdi/
├── .ai/                    # LLM workspace (sessions, tracker) — see .ai/README.md
├── assets/                 # Static assets — single source of truth
│   ├── logo.svg            #   Brand mark (favicon + nav, both pages)
│   ├── _old_logo.svg       #   Archived previous logo
├── index.html              # Project pitch / homepage (root of korpusa-kurdi.pages.dev)
├── docs.html               # Engineering documentation (living doc)
├── CLAUDE.md               # This file
└── .gitignore
```

---

## Pinned Links

- **Org:** https://github.com/KorpusaKurdi
- **Repo:** https://github.com/KorpusaKurdi/korpusa-kurdi
- **Kanban:** https://github.com/orgs/KorpusaKurdi/projects/1/views/1
- **PROD env:** https://korpusa-kurdi.pages.dev/

---

## Quick Start

This is currently a static HTML site — no build step.

```bash
# Local preview (any static server)
python3 -m http.server 8080
# then open http://localhost:8080
```

Cloudflare Pages auto-deploys from `main` to https://korpusa-kurdi.pages.dev/.

---

## Editing Conventions

- **Logo:** edit `assets/logo.svg` only. Both pages reference it for favicon and nav. Do not inline duplicate gradients or re-create the mark in CSS.
- **Pages:**
  - `index.html` — pitch (anchors `#problem`, `#how`, `#impact`, `#tech`, `#cta`).
  - `docs.html` — engineering doc with numbered sections + TOC. Preserve numbering when editing.
- **Cross-page links** between `index.html` and `docs.html` should resolve to those filenames directly (no historic `korpusakurdi-pitch.html`).
- **Section 5 of `docs.html`** ("Repositories & code organisation") explicitly distinguishes *today* (only this repo) from *target* (polyrepo). When the target shifts, update both the table and the callout.

---

## Tech (today)

| Layer | Technology |
|-------|------------|
| Site | Static HTML / inline CSS |
| Hosting | Cloudflare Pages |
| Asset format | Inline SVG for vector marks |

The full target stack (mobile, API, workers, NLP, infra) is documented in `docs.html` §7 — currently *planned*, not live.
