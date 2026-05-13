# Session: Home "Start-Play" button for mockup app

- **Created:** 2026-05-13
- **Updated:** 2026-05-13
- **Status:** done
- **User:** Armanc
- **Ticket:** [#3 — Add "Start-Play" button to Home for mockup app](https://github.com/KorpusaKurdi/korpusa-kurdi/issues/3)

## Goal
Add an entry point on `index.html` that opens the mockup app — and build a first version of `mockup.html` so visitors can actually try the contribution loop. The three pages (`index.html`, `docs.html`, `mockup.html`) must feel like one ecosystem: shared header, theme toggle, localStorage.

## Progress
- Extracted shared CSS/JS into `assets/shared.css` and `assets/shared.js` (theme tokens, nav, theme toggle, footer). All three pages now consume it.
- `index.html`: hero CTA `Join the corpus` → **"Try the app →"** linking to `mockup.html`; the phone mockup itself is now clickable (`.phone-link` with a hover "Try it →" pill); nav `Contribute` and `#cta` CTAs also point to `mockup.html`.
- `docs.html`: switched to shared assets; nav `Contribute` → "Try the app" → `mockup.html`; inline theme script removed.
- `mockup.html` (new) — first version of the app:
  - **Shell:** shared top nav + responsive tabs (bottom bar on mobile, left rail ≥ 720 px).
  - **Today:** greeting w/ Fraunces display, daily progress bar, stats (total / this week / region), recent activity feed, community-pulse callout.
  - **Contribute:** mixed feed of up to 5 tasks per day from a seed pool; three live task types — form-choice (incl. inline "Other…" input), free-text, **voice with real `MediaRecorder` + live waveform** (graceful fallback if mic blocked); skip flow; "you're done for today" success card.
  - **Profile:** avatar + identity, in-place edit of name/dialect/region, full contribution log, danger-zone reset.
  - **Onboarding:** 2-step first-launch modal (welcome → identity), with Kurmancî/Soranî/Southern/Other radios and region quick-suggest chips (Amed/Hewlêr/Sine/Mehabad/Qamişlo).
- All DOM construction uses safe `createElement` / `textContent` — no `innerHTML` writes anywhere.

## Decisions
- **Ecosystem strategy:** extract shared CSS/JS to `assets/` rather than copying inline per page. Trade-off: one more pattern, but eliminates duplication when the nav/theme evolves.
- **CTA placement:** primary hero button replaces "Join the corpus" rather than being added as a third button — "Try the app" is concrete and converts better than the abstract original copy.
- **App shape:** bottom-tab on mobile, left rail on tablet/desktop. Tabs are CSS-swapped sections inside one HTML file, with URL hash deep-linking (`mockup.html#contribute`) and `kk-tab` remembering the last view.
- **Tasks in v1:** all three task types live — including real audio capture. Audio is previewed locally only (transcript metadata stored, blob discarded) so we're not pretending to be the corpus backend yet. When the API exists, swap localStorage for a real POST.
- **Identity:** one-time onboarding (skippable). Stored in `kk-profile`. Without identity, contributions are tagged anonymous + unknown region.
- **No innerHTML in JS:** triggered by a security hook; ended up cleaner anyway — all dynamic markup goes through `createElement` + `textContent`, with SVG icons defined once as `<template>` and cloned.
- **Typography accent:** added Fraunces (variable serif) for display headings only (greetings, screen titles, stat values). Keeps the existing system body font intact across the ecosystem.

## localStorage schema (ecosystem)
| Key | Owner | Shape |
|-----|-------|-------|
| `kk-theme` | shared.js (all pages) | `'dark' \| 'light'` |
| `kk-tab` | mockup.html | `'today' \| 'contribute' \| 'profile'` |
| `kk-profile` | mockup.html | `{name, dialect, region, createdAt}` |
| `kk-contributions` | mockup.html | array of `{id, taskId, type, response, audioMeta, name, dialect, region, createdAt}` |

## Next Steps
This session ships an MVP shell — it's deliberately a starting point, not a finished design. Armanc will master `mockup.html` in a new session, bringing his own product direction plus team input. From there we'll keep iterating, but **each refinement becomes its own ticket and its own session** rather than one giant rewrite.

Likely follow-up tickets (created when each is picked up):
- **mockup-master / direction pass** — Armanc + team align on the app's product shape (screens, tone, language model). Output is a refreshed spec that supersedes the v0 choices in this session.
- **Prompt seed set** — replace the 8 generic seed tasks with a real, Kurdish-aware prompt set (Kurmancî / Soranî / Southern, dialect-aware variants, sourced/curated).
- **Backend handoff** — POST endpoint for contributions; swap localStorage for real persistence; server-side dialect/region normalisation.
- **Voice pipeline** — upload audio blobs (currently discarded after preview), storage, transcript stub.
- **Community pulse → live data** — wire the "1,247 entries this week" card to real aggregated stats instead of placeholder copy.
- **Real onboarding flow** — proper region picker (geo / dropdown), consent screen for voice and data use (GDPR-aligned per project goals).
- **i18n** — Kurdish/Turkish/English UI language toggle (separate from dialect-of-contribution).

Refactor stays opportunistic in those tickets — no need for a dedicated cleanup session.
