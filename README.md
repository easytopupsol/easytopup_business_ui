# EasyTopup V3.5 — Compact Country Flag Grid

This release retains the V3.4 full-globe responsive fix, Docker/Next.js project and dark/light theme.

**Country by Region:** 12 former large scenic-photo cards are replaced with self-hosted PNG flag tiles. Cards show only a country flag, name, and enquiry arrow. No external image requests. Responsive columns: 4 desktop, 3 at <=1100px, 2 at <=720px. On narrow phones, compact vertically-arranged flag/name tiles avoid crowding. Filter buttons (All/Asia Pacific/Beyond Asia) and WhatsApp enquiry links are retained.

**Changed files:** `src/components/sections/World.tsx`, `src/data/content.ts`, `src/styles/country-flags.css`, `src/app/layout.tsx`, `public/assets/flags/*.png`, `package.json`, `docker-compose.yml`. Removed unused scenic fallback illustrations.

## Local run

```bash
npm install
npm run dev
```

## Docker run

```bash
cp .env.docker.example .env
docker compose up -d --build
curl http://127.0.0.1:3050/api/health
```

Deploy as a separate service behind your existing Nginx homepage. Keep Agent/Dealer/Customer/Admin/API routes unchanged. Confirm the domain URLs in `.env` before building (NEXT_PUBLIC values are compiled during build).

## Validation

Country flag artwork is bundled locally so it can render offline. Responsive layout checks cover 320px through 1440px and light/dark colors, using a focused browser fixture. These checks are not a substitute for a production Next.js build in your environment.

---

# EasyTopup Next.js V3.4 — Passport Globe Containment Fix

**Changed:** `src/components/sections/World.tsx`, `src/styles/responsive.css`, and `src/lib/globe.ts`.

- Fixed the International Destinations / **PASSPORT TO EVERYWHERE** panel where the globe was visibly clipped at small widths.
- Replaced absolute-sized globe canvas with a **dedicated, square `.spotlight-globe-stage` in the CSS grid flow**, centered with proportional sizing. The panel adjusts its height to the globe instead of cropping it.
- Removed legacy forced 400–500px canvas width/height, negative top offsets and external floating animation for this panel. The Earth still rotates within the canvas itself.
- Contained decorative orbit lines, labels, and the `12+` caption within their card; light/dark modes maintained.
- Updated Canvas rendering lifecycle with `ResizeObserver` so orientation/layout changes update the resolution.
- Tested static V2-equivalent markup with V3.4 styles in headless Chromium at **320, 375, 390, 430, 600, 768, 900, 1024, 1440 and 1920px** in both theme variants (`qa/globe-viewport-checks.json`). Canvas and stage stayed within their map, no adjacent text overlap or horizontal page overflow. This is a focused visual/layout check, **not a production Next.js build**.
- Other homepage 3D phone/globe changes from V3.3, portal links, Poppins, brand favicon, and Docker files remain unchanged.

### Local run

```bash
npm install
npm run dev
```

### Docker

```bash
cp .env.docker.example .env
docker compose up -d --build
curl http://127.0.0.1:3050/api/health
```

**Deployment safety:** On the EasyTopup server, retain Nginx `location /agent`, `/dealer`, `/customer`, `/admin`, and backend API configurations. Only route `/` to the landing page once tested.

---

## V3.3 Responsive Hero Fix (Oct 26, 2026)

The homepage globe/phone overlap has been corrected in `src/styles/responsive.css`, imported **last** in `src/app/layout.tsx`. Desktop uses true two-column grid; screens <=900px use a separate image stage below text; phones <=400px receive smaller mockup and stacked buttons. The animated globe and device are retained. Every device position is relative to the stage (no hardcoded viewport offsets). The country globe also scales to available space.

Preview reference screenshots: `previews/preview-v3-3-mobile-dark.png`, `previews/preview-v3-3-desktop-light.png` and two alternate theme screenshots. These render the same hero markup and styles using the original V2 static preview as a stand-in, not a full Next.js build. Browser positioning checks on 12 viewports appear in `qa/responsive-check-results.json`.

If you have an older deployed Docker image, rebuild with `docker compose build --no-cache` then `docker compose up -d` and hard refresh browser. This ZIP does **not** include `node_modules`. Install with `npm install` before local `npm run build`.

# EasyTopup — Cinematic 3D V3.3 (Next.js + Docker)

A fully componentized, accessible **Next.js 16 App Router + React 19 + TypeScript** conversion of the supplied EasyTopup V2 landing page, with new light/dark theming and expanded 3D scroll/motion effects.


## V3.2 — compact professional UI refresh

- **Self-hosted Poppins** via `@fontsource/poppins` at weights 400–900 (no runtime CDN request). The package is installed during `npm install` / Docker build.
- New `src/styles/refinement.css` loaded **after** legacy/theme/animation styles, controlling the compact typography scale, section spacing, card dimensions and responsive breakpoints. Edit this file for design tuning.
- Consistent light-mode backgrounds/text/navigation across hero, operators, signal section, pinned 3D journey, destinations, portals, contact and footer. The decorative mock-phone screen intentionally remains dark for contrast.
- Smaller mobile layout, tablet grid adjustments, compact navigation, readable touch targets, and retained 3D hover/scroll animation.
- Verify both themes at widths **320, 375, 430, 768, 1024, 1440px** in browser DevTools before production deployment.

## Connect the GitHub remote

Repository: `https://github.com/easytopupsol/easytopup_business_ui.git` (default branch: `main`).

After extracting the ZIP, from the project root:

**Windows:** double-click `scripts\setup-git-remote.cmd`, or run `scripts\setup-git-remote.cmd` in Command Prompt / PowerShell.

**Ubuntu / macOS:** `bash scripts/setup-git-remote.sh`.

Both scripts initialize Git if necessary, add `origin` (or update it if already present), switch to local `main`, and print the remote. **Neither script commits nor pushes.** To upload after verifying that your GitHub account has write permission:

```bash
git add .
git commit -m "Initial commit - EasyTopup Next.js 3D Website"
git push -u origin main
```

The GitHub connection used for checking this repo had read-only permission. Pushing from your machine needs an authenticated GitHub identity with write access. Keep `.env` secrets out of Git; `.gitignore` excludes real environment files but includes the two `.env*.example` templates.

---

## Run locally (Windows PowerShell, macOS or Linux)

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

Requires **Node.js >=20.9**. Node.js 22 is recommended. The ZIP **does not bundle node_modules**. For the containerized version use `docker compose up -d --build` instead.

## Project structure

```text
src/
  app/
    layout.tsx                  Metadata, global CSS, no-flash theme bootstrap
    page.tsx                    Page composition (server component)
    favicon.ico / icon.png      Genuine EasyTopup logo mark for browser favicon
    apple-icon.png              Original logo mark for Apple touch icon
    api/health/route.ts         Lightweight Docker health check
  components/
    layout/Header.tsx           Sticky responsive header and portal menu
    sections/
      Hero.tsx                  Cinematic hero and 3D floating recharge phone
      Operators.tsx             7 Singapore operator showcase cards
      Journey.tsx               3-part pinned scroll journey & 3D cube
      World.tsx                 12 country photo cards and React filters
      Portals.tsx               Existing customer/agent/dealer links
      Contact.tsx               WhatsApp and contact links
      Footer.tsx                Address & company details
      Ticker.tsx                Kinetic marquee
      SignalBreak.tsx           Transition illustration
      ChatFloat.tsx             Floating WhatsApp button
    ui/
      GlobeCanvas.tsx           Canvas mounting, lifecycle cleanup
      ExperienceController.tsx Scroll reveals, parallax, progress, 3D card tilt
      ThemeToggle.tsx           Light/dark persisted in localStorage
      ThemeAndMotionControls.tsx Reduced motion override controls
  data/
    content.ts                  Operators & destination content
    land-dots.json             Low-resolution geographic points
  lib/
    globe.ts                    Reusable Canvas 2D 3D sphere renderer
    links.ts                    Configurable portal URLs and enquiry links
  styles/
    responsive.css             V3.3 final hero/grid/phone-stage layout fixes
    legacy.css                  Original V2 visual system, preserved
    theme.css                   New theme tokens, light styling, controls
    animations.css              Enhanced 3D and cinematic motion
    refinement.css              Compact Poppins design, complete light theme and responsive fixes
public/assets/                  Original full EasyTopup logo and twelve offline country SVG fallbacks
Dockerfile                      Multi-stage Node 22 standalone production image
docker-compose.yml              Localhost-bound port 3050, health checks and restart
.dockerignore                   Excludes node_modules, .env and build outputs
.env.docker.example             Docker build-time public configuration
deploy/nginx-root-location.example.conf  Nginx landing page proxy sample
```

## Functional scope

- Fully responsive presentation site, including original contact/address and all seven operator names.
- 12 countries, accurate flag labels and interactive filtering (All / Asia Pacific / Beyond Asia).
- CSS 3D transforms: hover tilt, depth/parallax phone, animated 3D experience cube, glass cards, orbit rings.
- Custom Canvas 2D 3D sphere with actual geographical land dots and outbound Singapore arcs.
- Dark/light theme toggle **persists** between visits; defaults to device appearance.
- Reduced-motion detection, pause button, keyboard links, labelled menu, scroll-triggered reveal.
- Separate client components only for browser interactions; static content server-rendered by Next.

## Fix: `Can't resolve @fontsource/poppins/400.css`

`@fontsource/poppins` is required by `src/app/layout.tsx`. The ZIP does **not** include `node_modules`; install dependencies in the **same directory containing this `package.json`** after extracting or pulling updates.

On Windows PowerShell:

```powershell
npm install
npm run verify:fonts
npm run build
```

If it still fails due to an older install:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run repair:fonts
npm run verify:fonts
npm run build
```

Linux/macOS:

```bash
npm install
npm run verify:fonts
npm run build
```

Docker builds install the package from `package.json` in the deps stage. After changing files, rebuild this one service only, with a clean layer when necessary:

```bash
docker compose build --no-cache easytopup-landing
docker compose up -d --no-deps easytopup-landing
```

Do **not** copy `node_modules` from Windows into Linux Docker. Do not use `docker compose down` on unrelated services, and do not push `.env` secrets into Git. `npm install` and a Docker build require internet access to npm registry unless packages are already cached. The lockfile is created by `npm install`; commit it for reproducible future builds.

## Docker deployment — Linux server / Ubuntu / Vultr

Prerequisites: **Docker Engine** with the Compose V2 plugin and network access to Docker Hub and npm registry during the image build. The current source ZIP does **not** include `node_modules` or a dependency lockfile. The Docker image installs dependencies while building (uses `npm ci` if you later generate `package-lock.json`).

1. Unzip the project on your server in a **new directory**; never replace the running EasyTopup app folders.
2. Set the public links and listen port:

```bash
cp .env.docker.example .env
nano .env  # adjust portal URLs or port if required
```

3. Build and start **only the landing page**:

```bash
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 easytopup-landing
curl -fsS http://127.0.0.1:3050/api/health
curl -I http://127.0.0.1:3050/
```

Expected health-check JSON: `{ "status": "ok", "service": "easytopup-landing" }`. Container listens on port 3000 internally; host binds `127.0.0.1:3050` by default. No public port is exposed.

4. Once it works locally, back up the **existing** Nginx config and website. Keep every configured location for `/agent`, `/dealer`, `/customer`, `/admin`, `/api`, `/admin40`, `/agent40`, `/dealer40`, `/customer40` and any other live paths. In the existing `server` block only, replace its landing-page `location /` routing with the sample at `deploy/nginx-root-location.example.conf`. Do not overwrite the entire Nginx file or change your SSL/Certbot setup. Test before reloading:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

5. Test both the new `/` page and every existing portal/API path before calling the rollout complete. Roll back by restoring the saved Nginx root location; the app containers remain untouched.

### Standalone Docker commands (without Compose)

```bash
docker build -t easytopup-landing:3.1.0 .
docker run -d --name easytopup-landing-v3 --restart unless-stopped \
  -p 127.0.0.1:3050:3000 easytopup-landing:3.1.0
```

Note: Unlike Compose, a plain `docker build` uses the Dockerfile default portal URLs unless you provide `--build-arg NEXT_PUBLIC_CUSTOMER_URL=...` (similarly for the other public links).

### Favicons

`src/app/favicon.ico`, `src/app/icon.png` and `src/app/apple-icon.png` were produced from **the blue/green brand mark in the original EasyTopup logo**. The original full logo remains at `public/assets/easytopup-logo.jpg`. Next.js automatically adds browser favicon references using App Router metadata file conventions. If you still see the previous icon after deploying, hard-refresh or clear the browser favicon cache.

### Safe integration and deployment

The user-facing landing page **does not replace** the Agent, Dealer, or Customer applications and **does not implement payment or recharge transactions**. Links remain set to `https://easytopup.shop/agent`, `/dealer`, `/customer`; customize using `.env.local` copied from `.env.example`.

**Important:** Do not replace the root of the EasyTopup production Nginx configuration until you confirm its existing path routing. Keep `/agent`, `/dealer`, `/customer`, `/admin` and API routes as currently configured. Deploy this Next app on a new port (e.g. 3050), verify locally via `curl`, then change only the root `location /` route. Back up the current site and Nginx config first. No deployment has been performed by this package; Docker instructions are included for your server.

The country photos use optional public Unsplash image URLs; local SVG posters always work without internet. Operator letter/symbol artwork is illustrative, not licensed official branding. Service availability remains subject to confirmation.

## Useful commands

```bash
npm run dev          # Hot-reload development server
npm run build        # Next production build
npm run start        # Next production server
npm run typecheck    # TS verification
npm run lint         # Linting
```
