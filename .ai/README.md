# .ai — LLM Workspace

> **Type:** Guide · **Status:** Active · **Updated:** 2026-05-10

This folder is the shared brain for any LLM working on this project. It is **LLM-agnostic** — Claude, Cursor, Copilot, or any other tool should use this as their entry point after reading the project's root `CLAUDE.md` (or equivalent).

Each LLM has its own config file that points here:
- **Claude:** `CLAUDE.md` at the repo root (auto-loaded)
- **Cursor:** `.cursor/rules` (future)
- **Others:** README references

---

## Boot Sequence

When starting a session, follow this order:

```
1. CLAUDE.md (root)              -> project overview (what + why)
2. .ai/README.md (this file)     -> how to work
3. .ai/sessions/_tracker.md      -> where we left off
4. Active session files          -> pick up ongoing work
5. docs.html (root)              -> engineering documentation (live)
```

---

## Folder Structure

```
.ai/
├── README.md          <- You are here
└── sessions/          # Kanban-style session tracking
    ├── _tracker.md    #   Session history index — start here
    ├── *.md           #   Individual session files
    └── _archived/     #   Sessions older than 10 days (created lazily)
```

A `rules/` folder will be added later if shared way-of-working standards crystallise. For now this project is small enough to live without them — conventions are inline in `CLAUDE.md`.

---

## Sessions

A session = a focused chunk of work (a feature, a refactor, a content pass, a bug fix). One session per file.

### Naming
`sessions/YYYY-MM-DD-<short-topic>.md`
Example: `sessions/2026-05-10-logo-redesign.md`

### File template
```markdown
# Session: <title>

- **Created:** YYYY-MM-DD
- **Updated:** YYYY-MM-DD
- **Status:** in_progress | done | paused
- **User:** <name>

## Goal
What this session aims to accomplish.

## Progress
What has been done so far.

## Decisions
Key decisions made during this session, with the *why*.

## Next Steps
What remains to be done.
```

### Tracker
`sessions/_tracker.md` is the index — append a one-line entry whenever you create or close a session. It is the first place to look to understand where the project is right now.

### Archival (10-day rule)
On session start:
1. Read `_tracker.md`.
2. For any session with `Updated` > 10 days ago and status ≠ `done`:
   - Ask the user: "Is *<session title>* finalised? I'd like to archive it."
   - If no clear answer → move to `_archived/`.
3. Sessions with status `done` → move to `_archived/` immediately.

---

## For New LLMs / New Developers

1. Your tool reads its entry file (e.g. `CLAUDE.md`).
2. That file points here.
3. Read this file to learn how the workspace works.
4. Check `_tracker.md` to see current state.
5. Read active session files to understand ongoing work.
6. Check `docs.html` for project specifications and architecture.
