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
- Visual review on real devices (mobile + desktop).
- If we keep going: real Kurdish-aware prompt set (currently seeded with 8 generic prompts), POST endpoint for contributions, server-side dialect normalisation, dashboard linkback from the community-pulse card.
