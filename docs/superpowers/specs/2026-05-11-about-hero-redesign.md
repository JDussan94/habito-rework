# About Hero Redesign

**Date:** 2026-05-11
**Status:** Approved

## What Changes

Replace the current `about-hero` section (diagonal red/dark stats split) with a full-bleed cinematic photo hero — centered layout, no stats, no top bar.

## Visual Design

**Background:** Full-viewport photo with `background-size: cover`, `background-position: center 30%`. Photo is desaturated slightly (`filter: grayscale(0.35)` on the img layer). A placeholder image path (`images/about-hero.jpg`) is used; the client will supply a real asset.

**Overlay:** `linear-gradient(to bottom, rgba(28,31,42,0.65) 0%, rgba(28,31,42,0.82) 100%)` — same Iron Shadow base color used throughout the site.

**Grain:** Same canvas-noise SVG data URI used on the homepage hero (`opacity: 0.5`), applied as a pseudo-element.

**Red radial glow:** `radial-gradient(ellipse, rgba(210,38,48,0.14) 0%, transparent 70%)` centered behind the headline. Purely atmospheric, no structural role.

**Height:** `min-height: 80vh` on desktop, `min-height: 60vh` on mobile.

## Content

```
Est. 2022 · Saint George, UT          ← eyebrow, Fire Pulse red, 10px tracked caps
We Build
Habits,                               ← "Habits," in Fire Pulse red
Not Hype.                             ← rest in white

Clean ingredients. Honest prices.     ← subtitle, rgba(255,255,255,0.5)
No celebrity endorsements, no miracle
cures — just nutrition that works.
```

No stats row. No CTA button. No top or left accent bar.

## HTML Structure

```html
<section class="about-hero">
  <div class="about-hero__photo"></div>
  <div class="about-hero__overlay"></div>
  <div class="about-hero__grain"></div>
  <div class="about-hero__glow"></div>
  <div class="about-hero__content">
    <p class="about-hero__eyebrow">Est. 2022 · Saint George, UT</p>
    <h1 class="about-hero__headline">We Build <em>Habits,</em> Not Hype.</h1>
    <p class="about-hero__sub">Clean ingredients. Honest prices. No celebrity endorsements, no miracle cures — just nutrition that works.</p>
  </div>
</section>
```

## CSS

All styles appended to `styles/main.css` under the existing `/* PAGE: ABOUT */` block. The old `.about-hero`, `.about-hero__left`, `.about-hero__right`, `.about-hero__year`, `.about-hero__city`, `.about-hero__tagline`, `.about-hero__redline`, `.about-stat`, `.about-stat__num`, `.about-stat__suffix`, `.about-stat__prefix`, `.about-stat__label` rules are removed. New rules replace them.

Mobile breakpoint (`max-width: 768px`): reduce `min-height` to `60vh`, scale headline font down.

## JS

Remove the `about-stat` counter animation from `initAboutPage()` in `js/main.js` — there are no stats to animate. The function can remain but the `querySelectorAll('.about-stat__num')` block is deleted.

## Out of Scope

- No change to the Manifesto, Values Tape, or Commitments sections.
- No new JS animations added.
- Placeholder image only — client supplies the real photo.
