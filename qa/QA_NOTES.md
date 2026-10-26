# Responsive layout QA — V3.3

Tested with headless Chromium using the original V2 static hero markup plus the Next.js project theme, refinement, animation and responsive CSS layers. This is a CSS/DOM alignment smoke test, **not** a compiled Next.js runtime or production deployment test.

Screen widths checked: 320, 360, 375, 390, 430, 600, 768, 900, 1024, 1280, 1440, 1920 CSS pixels. At each size:
- Document scroll width matched viewport width (no unwanted horizontal scroll)
- Hero text and visual stage did not intersect
- 3D phone stayed within the hero art stage
- Art stage stayed inside its hero section
- Browser reported no page script errors in the standalone layout harness

Additional visual snapshots show dark/light versions at 390 and 1440px.

Next step before production: run `npm install && npm run build`, visually inspect in a real Next.js session on your machine, then rebuild the Docker image. Registry access was unavailable in the packaging environment, so no actual `next build` or Docker build is claimed.
