# Elevate Landingpage Specification

## Overview
- **Target file:** `frontend/src/pages/landingpage.tsx`
- **Screenshot:** `docs/design-references/elevate-landing-desktop-full.png`
- **Interaction model:** click-driven radio selection, otherwise static

## DOM Structure
- Page wrapper: black full-width route surface.
- Inner column: centered max-width 1140px.
- Hero: VA mark image, arc image, eyebrow, headline with pink gradient price span, subtitle.
- Form card: question heading, two radio labels, CTA button.
- Footer: top divider, logo, copyright text, bottom divider.

## Computed Styles

### Page
- backgroundColor: `rgb(0, 0, 0)`
- desktop content maxWidth: `1140px`
- desktop inner padding: `90px 0px`

### Hero
- Eyebrow: `18px`, `400`, `"Rethink Sans"`, `line-height: 18px`, `letter-spacing: 5px`, color `rgb(249, 61, 96)`.
- H1: `40px`, `500`, `"Rethink Sans"`, `line-height: 40px`, color white.
- Price span gradient: `linear-gradient(90deg, rgb(185, 43, 71) 0%, rgb(249, 61, 96) 35%, rgb(255, 168, 184) 50%, rgb(249, 61, 96) 65%, rgb(185, 43, 71) 100%)`.
- Subtitle: `17px`, `400`, `Inter`, `line-height: 17px`, `letter-spacing: 0.2px`, color `rgb(190, 190, 190)`.

### Form Card
- background: `radial-gradient(rgb(19, 19, 19) 0%, rgb(3, 3, 3) 100%)`
- padding: `35px`
- width: `1140px`
- borderRadius: `25px`
- border: `3px solid rgb(34, 34, 34)`
- question: `26px`, `400`, `"Rethink Sans"`, `line-height: 26px`, white
- option label: `15px`, `400`, `Roboto`, background `rgb(15, 17, 21)`, border `1px solid rgb(42, 47, 58)`, radius `12px`, padding `18px 20px`
- CTA: `15px`, `500`, `"Noto Sans Sora Sompeng"`, `line-height: 15px`, white, radius `72px`, padding `18px 36px`
- CTA background: `linear-gradient(90deg, rgb(197, 44, 75) 0%, rgb(232, 69, 102) 50%, rgb(251, 88, 122) 100%)`
- CTA shadow: `rgba(197, 44, 75, 0.4) 0px 10px 20px 0px, rgba(197, 44, 75, 0.3) 0px 20px 40px 0px, rgba(197, 44, 75, 0.2) 0px 40px 80px 0px, rgba(197, 44, 75, 0.1) 0px 60px 120px 0px`

## States & Behaviors
- Radio selected: local `checked` state, selected label gains brighter border and faint pink glow.
- Button hover: slight lift, brighter filter; original transition is `0.5s`.
- CTA submit: prevent default; original static HTML relies on Elementor form handling and has no direct WhatsApp URL.

## Assets
- `frontend/public/landingpage-assets/fav-icon.png`
- `frontend/public/landingpage-assets/background-graphics-2.png`
- `frontend/public/landingpage-assets/background-graphics-shine-2.png`
- `frontend/public/landingpage-assets/logo-lp-1.png`

## Text Content
- `RESPOSTA RÁPIDA`
- `Landing page premium, por apenas R$ 597`
- `Responde uma pergunta rápida e te chamo no WhatsApp agora.`
- `Você já tem um produto, serviço ou negócio que quer vender pela internet?`
- `Sim, já tenho e quero vender mais`
- `Ainda estou começando e quero estruturar`
- `FALAR NO WHATSAPP AGORA`
- `ElevateLP Webdesign`
- `Todos os Direitos Reservados`

## Responsive Behavior
- **Desktop (1440px):** max-width 1140px, centered; footer row.
- **Tablet (768px):** card width follows viewport with side padding; text wraps.
- **Mobile (390px):** heading and card stack tightly; footer logo/text stack.
- **Breakpoint:** main layout switches at `767px`.
