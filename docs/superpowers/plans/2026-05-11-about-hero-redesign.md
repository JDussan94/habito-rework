# About Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the diagonal red/dark stats-split hero on about.html with a full-bleed cinematic photo hero — centered headline, dark overlay, grain, red radial glow, no stats.

**Architecture:** Three file changes: replace the hero HTML in about.html, swap out the old about-hero CSS block in main.css, and rewrite initAboutPage() in main.js to remove the stat counters and old slide-in animation. No new files needed.

**Tech Stack:** Vanilla HTML/CSS/JS. GSAP already loaded globally via CDN.

---

## Files

- Modify: `about.html` — lines 29–55 (hero section)
- Modify: `styles/main.css` — lines 1438–1548 (PAGE: ABOUT block, old hero rules)
- Modify: `js/main.js` — lines 235–269 (initAboutPage function)

---

## Task 1: Replace the hero HTML in about.html

**Files:**
- Modify: `about.html`

- [ ] **Step 1: Open about.html and locate the hero section**

  The section to replace is lines 29–55:

  ```html
  <!-- PAGE HERO — DIAGONAL STATS SPLIT -->
  <section class="about-hero">
    <div class="about-hero__left"> ... </div>
    <div class="about-hero__right"> ... </div>
    <div class="about-hero__redline"></div>
  </section>
  ```

- [ ] **Step 2: Replace that entire section with the new hero**

  ```html
  <!-- PAGE HERO — CINEMATIC PHOTO -->
  <section class="about-hero">
    <div class="about-hero__photo"></div>
    <div class="about-hero__overlay"></div>
    <div class="about-hero__grain"></div>
    <div class="about-hero__glow"></div>
    <div class="about-hero__content">
      <p class="about-hero__eyebrow">Est. 2022 &middot; Saint George, UT</p>
      <h1 class="about-hero__headline">We Build<br><em>Habits,</em><br>Not Hype.</h1>
      <p class="about-hero__sub">Clean ingredients. Honest prices. No celebrity endorsements, no miracle cures &mdash; just nutrition that works.</p>
    </div>
  </section>
  ```

- [ ] **Step 3: Verify the file**

  Open `about.html` and confirm:
  - No remaining `.about-hero__left`, `.about-hero__right`, `.about-hero__redline`, or `.about-stat` elements
  - The new section has exactly 5 children: `__photo`, `__overlay`, `__grain`, `__glow`, `__content`
  - The `<em>` tag wraps only `Habits,`

---

## Task 2: Swap the about-hero CSS block in main.css

**Files:**
- Modify: `styles/main.css`

- [ ] **Step 1: Remove all old about-hero rules (lines 1438–1548)**

  Delete every rule from `.about-hero {` through the closing `}` of the mobile media query (line 1548), leaving `/* PAGE: ABOUT */` header and the `.textarea--dark:focus` rule below it intact.

  Rules to remove: `.about-hero`, `.about-hero__left`, `.about-hero__year`, `.about-hero__city`, `.about-hero__tagline`, `.about-hero__right`, `.about-stat`, `.about-stat__num`, `.about-stat__suffix`, `.about-stat__prefix`, `.about-stat__label`, `.about-hero__redline`, and the `@media (max-width: 768px)` block that only references those classes.

- [ ] **Step 2: Insert new about-hero rules in their place, directly under `/* PAGE: ABOUT */`**

  ```css
  .about-hero {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }

  .about-hero__photo {
    position: absolute;
    inset: 0;
    background-image: url('images/about-hero.jpg');
    background-size: cover;
    background-position: center 30%;
    filter: grayscale(0.35);
  }

  .about-hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(28,31,42,0.65) 0%, rgba(28,31,42,0.82) 100%);
  }

  .about-hero__grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E");
    opacity: 0.5;
    pointer-events: none;
  }

  .about-hero__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 640px;
    height: 260px;
    background: radial-gradient(ellipse, rgba(210,38,48,0.14) 0%, transparent 70%);
    pointer-events: none;
  }

  .about-hero__content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px;
  }

  .about-hero__eyebrow {
    font-family: var(--font-body);
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 20px;
  }

  .about-hero__headline {
    font-family: var(--font-display);
    font-weight: 900;
    font-size: clamp(3rem, 8vw, 6rem);
    color: #FFFFFF;
    line-height: 0.93;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    margin: 0;
  }

  .about-hero__headline em {
    font-style: normal;
    color: var(--red);
  }

  .about-hero__sub {
    margin-top: 24px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: rgba(255,255,255,0.5);
    max-width: 400px;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .about-hero { min-height: 60vh; }
    .about-hero__glow { width: 320px; height: 160px; }
  }
  ```

- [ ] **Step 3: Verify**

  Confirm no remaining references to `.about-hero__left`, `.about-hero__right`, `.about-hero__tagline`, `.about-hero__year`, `.about-hero__city`, `.about-hero__redline`, `.about-stat`, `.about-stat__num`, `.about-stat__suffix`, `.about-stat__prefix`, `.about-stat__label` anywhere in the `/* PAGE: ABOUT */` block.

---

## Task 3: Rewrite initAboutPage() in main.js

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Locate initAboutPage (lines 235–269)**

  The current function has two blocks:
  1. Stat counter — `querySelectorAll('.about-stat__num')` (lines 237–257)
  2. GSAP hero slide-in — `gsap.from('.about-hero__left', ...)` and `gsap.from('.about-hero__right .about-stat', ...)` (lines 263–267)

  Both reference elements that no longer exist. Replace the entire function body.

- [ ] **Step 2: Replace the function body**

  ```js
  function initAboutPage() {
    if (typeof gsap === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.from('.about-hero__content', { y: 32, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.15 });
  }
  ```

  The function signature and closing brace stay the same — only the body changes.

- [ ] **Step 3: Verify**

  Confirm no remaining references to `.about-stat__num`, `.about-hero__left`, `.about-hero__right` inside `initAboutPage`.

---

## Task 4: Visual verification and commit

- [ ] **Step 1: Start the local server**

  Run from the project root:
  ```
  python -m http.server 8080
  ```
  Open `http://localhost:8080/about.html`.

- [ ] **Step 2: Visual checklist**

  - [ ] Hero is full-bleed, photo visible behind the overlay (placeholder gradient will show if `images/about-hero.jpg` is missing — that is expected)
  - [ ] Dark overlay present, text is clearly readable
  - [ ] Headline reads "We Build / **Habits,** / Not Hype." with "Habits," in red
  - [ ] Eyebrow "Est. 2022 · Saint George, UT" in red above the headline
  - [ ] Subtitle visible below the headline in muted white
  - [ ] No stats, no top red bar, no left red bar
  - [ ] Mobile (resize to < 768px): hero shrinks to 60vh, layout still centered
  - [ ] Sections below hero (Manifesto, Values Tape, Commitments) render unchanged

- [ ] **Step 3: Commit**

  ```bash
  git add about.html styles/main.css js/main.js
  git commit -m "feat: replace about hero with cinematic photo hero"
  ```
