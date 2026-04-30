# Workout Tracker

A simple iOS web app for tracking and guiding workouts with audio.

## Files
- `workout-tracker.html` — the full app (open this in Safari on iPhone)
- `MEMORY.md` — project memory for Claude sessions
- `README.md` — this file

## How to Use on iPhone
1. Transfer `workout-tracker.html` to your iPhone (AirDrop or iCloud Drive)
2. Open it in **Safari**
3. Tap Share → **Add to Home Screen**
4. Launch from your home screen — runs fullscreen like a native app

## How to Use in Cowork
1. Open this folder as a Cowork project
2. Start a Claude session inside the project
3. Claude will read MEMORY.md automatically and pick up where we left off

## Building a Routine
Each exercise row takes three values:
- **Exercise name** — e.g. "Bench press"
- **Sets** — number of sets
- **Time** — seconds per set

To add a rest between exercises, add a row: `Rest / 1 / 60`

## Audio Flow
For each set: name → Begin → [timer] → "10 seconds" → 5-4-3-2-1 → Next → next set
