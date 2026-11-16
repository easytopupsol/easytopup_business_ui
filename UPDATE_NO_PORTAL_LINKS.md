# EasyTopup Business Landing — Portal Login/Redirect Removal

## Changes
- Removed the **Login** dropdown from the desktop/tablet navbar.
- Removed Agent, Dealer and Customer login links from mobile navigation.
- Changed Agent / Dealer / Customer cards to **non-clickable, informational** cards; removed `href`, `ENTER PORTAL` text, arrows and link-like hover behavior.
- Updated in-page headings/labels: `Portals` -> `Our solutions` and `CHOOSE YOUR PORTAL` -> `SEE OUR SOLUTIONS`.
- Removed unused portal redirect URL definitions and environment examples. WhatsApp contact and existing marketing sections are unchanged.
- Added responsive-safe styling that prevents nonclickable cards from behaving like interactive controls.

## Deploy
```bash
npm ci
npm run typecheck
npm run build
# Or rebuild only the business landing image using its existing docker-compose.yml
# docker compose up -d --build
```

This changes **only the marketing Business UI**, not Agent/Dealer/Customer applications or Nginx reverse proxy routing. Direct portal URLs can still work when accessed elsewhere; restricting those routes requires separate server changes.
