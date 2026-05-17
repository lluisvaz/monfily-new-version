# Cria24 Landingpage Specification

## Overview
- **Target file:** `frontend/src/pages/landingpage.tsx`
- **Styles:** `frontend/src/index.css`, `.cria24-*`
- **Screenshots:** `docs/design-references/cria24/cria24-desktop-full.png`, `docs/design-references/cria24/cria24-mobile-full.png`
- **Interaction model:** static + click-driven portfolio and FAQ + mobile video

## Computed Styles
- Body font: `Inter, "Inter Fallback", system-ui, sans-serif`.
- Display font: `Sora, "Sora Fallback", system-ui, sans-serif`.
- Main colors: `rgb(10, 10, 10)`, `rgb(247, 247, 243)`, `rgb(247, 246, 243)`, `rgb(245, 242, 238)`, `rgb(255, 107, 0)`, `rgb(163, 163, 163)`.
- Section number desktop: `120px`, weight `200`, line-height `108px`, letter-spacing `-4.8px`, color `rgb(163, 163, 163)`.
- Section number mobile: `80px`, weight `200`, line-height `72px`, letter-spacing `-3.2px`.

## Assets
- Downloaded via `scripts/download-cria24-assets.mjs`.
- Stored in `frontend/public/cria24-assets/`.

## Text Content
- Preserved Cria24 headline, section copy, process cards, portfolio labels, profile bio, testimonials, value stack, plans, guarantee, FAQ, CTA, and footer.

## Local Implementation Notes
- Old ElevateLP route implementation was removed.
- Route remains registered as `/landingpage` in `frontend/src/App.tsx`.
- The existing language loader bypass for non-language routes remains in place so `/landingpage` is not blocked by geo-language detection.
