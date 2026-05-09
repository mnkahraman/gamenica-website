# GAMENICA Website Agent Notes

This is a static HTML/CSS/JavaScript website for GAMENICA, intended for immediate production publishing.

## Core Rules

- The default public language is English.
- Do not move or rename `/privacy-policy/`; live apps depend on this URL.
- Do not move or rename `/support/`; it is the public support destination.
- Keep pages static and dependency-free unless there is a strong reason to add a build system.
- Keep visible text production-ready. Do not include internal phrases such as "site is ready", "homepage can grow", "new cards can be added", or implementation notes.
- Preserve the GAMENICA brand colors: orange `#ff6a00` and blue `#3294e6`.
- Use the provided logo asset `/gamenica1-Photoroom.png` for the main logo, favicon links, and navigation logo.

## App Portfolio

- App cards live in `index.html` inside the `#apps` section.
- Local app icons live in `assets/app-icons/`.
- Prefer local downloaded App Store icons over hotlinking Apple CDN images.
- Each app card should include:
  - app name
  - short user-facing description
  - category tags
  - App Store link
  - Support link
- If Android links are added later, include them beside the App Store links without removing the existing iOS links.

## Pages

- `index.html`: main marketing and portfolio page.
- `support/index.html`: support contact and supported apps.
- `privacy-policy/index.html`: legal/privacy page. Update styling as needed, but be careful with policy text changes.
- Shared styling is in `assets/site.css`.
- Shared behavior is in `assets/site.js`.

## Design Direction

- The site should feel like a polished mobile apps and games studio, not only a children’s games site.
- Keep the hero visually strong and product-focused.
- Use real product/app visuals where available.
- Avoid decorative complexity that makes text harder to read.
- Cards should stay compact, scan-friendly, and responsive.
- Maintain mobile responsiveness for all new sections.

## Verification Before Publishing

- Run `node --check assets/site.js` after JavaScript edits.
- Check these routes locally:
  - `/`
  - `/support/`
  - `/privacy-policy/`
- Confirm app icons load from `assets/app-icons/`.
- Confirm the navigation logo uses `/gamenica1-Photoroom.png`.
- Check for accidental non-English public copy unless intentionally added.

