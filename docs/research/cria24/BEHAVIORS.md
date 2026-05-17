# Cria24 Behavior Sweep

## Captures
- Original desktop: `docs/design-references/cria24/cria24-desktop-full.png`
- Original mobile: `docs/design-references/cria24/cria24-mobile-full.png`
- Local desktop QA: `docs/design-references/cria24/local-cria24-desktop-full.png`
- Local mobile QA: `docs/design-references/cria24/local-cria24-mobile-full.png`

## Observed Behaviors
- No header/nav state.
- No scroll snap.
- Section titles on the source use client-side reveal animations; local clone renders them directly.
- Hero desktop uses a rotated/perspective framed image.
- Hero mobile uses `video-header.mp4`.
- Portfolio has stateful case cycling.
- FAQ is click-driven accordion.
- CTA buttons have hover/lift behavior.

## Responsive Behavior
- Desktop: wide centered content, 3-column steps/value cards, 4-column testimonial grid, desktop hero frame.
- Mobile: single-column content, 2-column testimonials, mobile video hero media, stacked plan cards.
- Breakpoint mirrored at approximately `767px`.
