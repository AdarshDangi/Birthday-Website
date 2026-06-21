# 🎂 Happy 16th Birthday — Site Guide

A single-page, mobile-first birthday celebration site. Built with plain
HTML, CSS, and JavaScript — no frameworks, no build step. Open
`index.html` in any browser and it just works.

## Files

```
birthday-site/
├── index.html          ← page structure (13 sections)
├── style.css            ← all visual design
├── script.js             ← all interactivity + the CONFIG block
├── manifest.json        ← lets it be "added to home screen" (PWA)
├── sw.js                ← offline support
└── assets/
    ├── photos/          ← put your real JPG/PNG photos here
    └── music.mp3         ← optional, add your own birthday song here
```

## 1. The only file you really need to edit: `script.js`

Open `script.js` and look for the `CONFIG` block at the very top.
Everything personal lives there:

- `friendName` — replace `"Friend's Name"` with the real name. It
  automatically updates the hero section and the final screen.
- `message` — the personal letter that types itself out.
- `appreciations` — the 16 cards. Keep exactly 16 items for the "16
  things" theme, or trim/add and adjust the section title.
- `photos` — captions for each gallery photo. The actual images go in
  `assets/photos/` (see below).
- `giftMessage` — the surprise revealed inside the gift box.
- `timeline` — six placeholder friendship milestones from 2010 to
  2026. **These are generic placeholders — replace them with real
  memories** for the timeline to feel personal.
- `balloonMessages` — the short notes hidden inside the balloons.

The birthday date logic (`birthDate`, `birthdayTarget`) is already set
for 22 November 2010 → 22 November 2026, so you shouldn't need to
touch it.

## 2. Adding real photos

Drop image files into `assets/photos/` named exactly:
`photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`,
`photo6.jpg` (or update the `src` paths in `CONFIG.photos` to match
whatever you name them). If a file is missing, a soft placeholder
icon shows automatically instead of a broken image — the site never
looks broken, even before you add photos.

## 3. Adding music

Add an MP3 file at `assets/music.mp3`. The floating music button in
the bottom-right corner will play/pause it. If no file is present,
tapping the button just shows a friendly reminder — nothing breaks.

## 4. Sharing it on Instagram

Host the whole `birthday-site` folder anywhere that serves static
files (GitHub Pages, Netlify, Vercel, etc. all work for free), then
share that URL as your Instagram link. The "Share This Page" button
on the final screen uses the native share sheet on mobile.

## 5. Notes

- Wishes left on the "Wish Wall" are stored in the visitor's own
  browser (`localStorage`) — there's no server, so wishes aren't
  shared between different people's phones. If you want a wall that
  collects everyone's wishes in one place, that needs a small backend
  (ask if you'd like help adding one).
- The site respects the "reduce motion" accessibility setting on
  phones — animations calm down automatically for visitors who have
  that turned on.
- Tap "Made with 💜 just for you" on the final screen five times fast
  for a hidden surprise.
