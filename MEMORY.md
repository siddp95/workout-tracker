# Workout Tracker — Project Memory

## What This Is
A single-file iOS web app for tracking and guiding workouts with audio. Built as a pure HTML/CSS/JS file — no frameworks, no backend. Designed to be opened in Safari on iPhone and added to the Home Screen for a native app feel.

## Current Status
- v1.0 complete and functional
- File: `workout-tracker.html`
- Next: deploy as a PWA to GitHub Pages (see "Deployment Plan" + "Next Up" below)

## Deployment Plan (decided 2026-04-29)
**Goal:** Get the app on Sidd's iPhone, share the URL with a few friends. Future feature on the roadmap: in-app workout sharing between users.

**Decision: PWA hosted on GitHub Pages.**
- Rejected Capacitor / native iOS app — overkill for personal use, App Store / TestFlight dance not worth it for sharing with a few friends.
- Plain hosted HTML would also work, but the PWA polish (manifest, icon, service worker, fullscreen launch, offline support) is ~30 min of work and makes "Add to Home Screen" feel like a native app.

**Future routine-sharing: start at Level 1 (URL-encoded, no backend).**
Routines are tiny (<1KB) — base64-encode the JSON into a share URL like `app.com/#r=eyJuYW1lI...`. Recipient taps link → app decodes and offers to import. Zero infra, zero cost. Don't pre-build a backend. Only graduate to a real backend (Level 2: pin-code sharing, or Level 3: accounts) if friends actually want a persistent shared library.

## Next Up: Phase 1 — PWA-ify the app
All work happens in this folder.

1. Create an app icon — 180×180 PNG (iOS home screen size). Simple is fine.
2. Create `manifest.json` — name, icon reference, theme color, fullscreen display mode.
3. Create `sw.js` — service worker that caches the HTML so the app works offline after first load.
4. Update `workout-tracker.html`:
   - Link the manifest
   - Add iOS-specific meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-touch-icon`, etc.)
   - Register the service worker
5. Rename `workout-tracker.html` → `index.html` (or add an `index.html` that loads the tracker) so GitHub Pages serves a clean root URL.

## Phase 2 — Deploy to GitHub Pages (Sidd drives, Claude guides)
1. Create a public GitHub repo
2. Push the files
3. Enable GitHub Pages in repo settings (Source: `main` branch)
4. Get URL like `siddthekidd.github.io/workout-tracker`
5. Open URL on iPhone in Safari → Share → Add to Home Screen
6. Send same URL to friends

## Core Features (Built)
- Home screen with saved routines, filterable by tag (Stretch / Strength / Cardio)
- Add / Edit routine screen with drag-to-reorder exercise rows
- Each exercise row: Exercise name, Sets, Time (in seconds)
- Active workout screen with circular countdown timer ring
- Full audio guidance via Web Speech API (speechSynthesis)
- localStorage persistence — routines survive app restarts
- Dark theme, iOS-style UI, fullscreen via "Add to Home Screen"

## Data Model
Each routine stored in localStorage under key "routines":
```json
{
  "id": "string",
  "name": "string",
  "tag": "Stretch | Strength | Cardio | null",
  "exercises": [
    { "name": "string", "sets": number, "time": number }
  ]
}
```

## Audio Sequence (Exact)
For each exercise set:
1. Say "[Exercise name], set [N]" (skip set number if only 1 set)
2. Wait 1 second
3. Say "Begin"
4. Timer runs silently
5. At 10 seconds remaining → say "10 seconds"
6. At 5 seconds remaining → say "5, 4, 3, 2, 1" (one per second)
7. Say "Next"
8. Wait 1 second
9. Continue to next set or next exercise
10. After final set of final exercise → say "Workout complete"

Special case: if exercise name is "Rest" → just say "Rest" then "Begin", skip set announcement.

## Design Decisions
- No rep tracking — only Sets + Time (in seconds)
- No dedicated rest period field — user adds "Rest, 1, 60" as a regular exercise row
- Tag is optional, single-select per routine
- Routine name is required to save
- Tapping routine card (not play button) opens edit screen pre-filled
- Pause freezes timer and audio; Resume picks up where it left off
- Skip immediately ends current set/exercise and moves to next

## Tech Stack
- Pure HTML + CSS + JavaScript (single file)
- Web Speech API for audio
- localStorage for data persistence
- Google Fonts: DM Sans + DM Mono

## Known Limitations / Future Ideas
- No rep-based exercises (by design for now)
- No workout history or logging
- No custom tags (only Stretch / Strength / Cardio)
- No iCloud sync — data is local to the device/browser
- Drag-to-reorder on exercise rows is visual only (not yet wired with touch drag events)

## Siddarth's Preferences
- Keep it simple — simplest solution first
- Short responses for small tasks, detailed when it matters
- Push back if going in the wrong direction
