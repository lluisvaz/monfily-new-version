# ElevateLP Behavior Sweep

## Browser Capture
- Desktop screenshot: `docs/design-references/elevate-landing-desktop-full.png`
- Mobile screenshot: `docs/design-references/elevate-landing-mobile-full.png`
- Extraction JSON: `docs/research/elevate-extraction-desktop.json`
- DOM tree: `docs/research/elevate-dom-tree.json`

## Observed Behaviors
- No fixed header or nav.
- No scroll-driven section switching.
- No videos, carousels, accordions, modals, or dropdowns.
- Original Elementor page includes fade-in animation classes, but the visible page is static after load.
- Form radio options are click-driven. Labels have dark background, rounded border, and selected state from the native radio.
- CTA button has static pink gradient, glow shadow, and a diagonal shine highlight.

## Responsive Behavior
- Desktop `1440px`: centered `1140px` column, form card 1140px wide, footer logo/text in a row.
- Mobile `390px`: content stacks; heading wraps to 2 lines; form card nearly full width; footer logo and text stack vertically.
- Elementor breakpoints in page config: mobile max `767px`, tablet max `1024px`.
