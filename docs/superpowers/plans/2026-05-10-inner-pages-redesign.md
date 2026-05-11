# Habito Inner Pages Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 5 inner pages (About, Shop, Product, Join, Contact) so each has a distinct visual motif that matches the homepage's design quality.

**Architecture:** Single-stylesheet (`styles/main.css`) with new page-specific CSS appended at the bottom under clearly labeled comment blocks. New JS animations added to `js/main.js` as named functions, scoped via `data-page` attribute on `<body>`. No new files created.

**Tech Stack:** Vanilla HTML/CSS, vanilla JS, GSAP 3.12.5 + ScrollTrigger (CDN). Local server: `python -m http.server 8080` from project root → `http://localhost:8080`

**Spec:** `docs/superpowers/specs/2026-05-10-inner-pages-redesign.md`

---

## Pre-flight

- [ ] Start local server: `cd "C:/Web Developer/Full Stack Developer/Claude Code/Projects/habitolife-redesign" && python -m http.server 8080`
- [ ] Open `http://localhost:8080/about.html` in browser — note current state

---

## Task 1: Prep — data-page attributes + shared utilities

**Files:**
- Modify: `about.html` — add `data-page="about"` to `<body>`
- Modify: `all-products.html` — add `data-page="shop"` to `<body>`
- Modify: `product.html` — add `data-page="product"` to `<body>`
- Modify: `join.html` — add `data-page="join"` to `<body>`
- Modify: `contact.html` — add `data-page="contact"` to `<body>`
- Modify: `styles/main.css` — append shared page-utility CSS
- Modify: `js/main.js` — add page-scoped animation dispatcher

- [ ] **Step 1: Add data-page to all 5 bodies**

In each HTML file, change:
```html
<body>
```
to the appropriate:
```html
<body data-page="about">
<!-- or data-page="shop" / "product" / "join" / "contact" -->
```

- [ ] **Step 2: Append shared utility CSS to end of main.css**

```css
/* ==============================================
   PAGE UTILITIES (shared across inner pages)
   ============================================== */

/* Red accent underline used on H2s */
.h2-red-rule { display: block; width: 40px; height: 2px; background: var(--red); margin-top: 10px; }

/* Dark section text overrides */
.dark-section { background: #1C1F2A; }
.dark-section .eyebrow { color: rgba(255,255,255,0.45); }
.dark-section h2 { color: #FFFFFF; }
.dark-section p { color: rgba(255,255,255,0.62); }

/* White inputs on dark backgrounds */
.input--dark {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: #FFFFFF;
  border-radius: var(--radius-btn);
  padding: 12px 16px;
  width: 100%;
  transition: border-color 0.2s;
}
.input--dark::placeholder { color: rgba(255,255,255,0.3); }
.input--dark:focus { border-color: rgba(255,255,255,0.35); }

.select--dark {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: #FFFFFF;
  border-radius: var(--radius-btn);
  padding: 12px 16px;
  width: 100%;
}
.textarea--dark {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  color: #FFFFFF;
  border-radius: var(--radius-btn);
  padding: 12px 16px;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s;
}
.textarea--dark::placeholder { color: rgba(255,255,255,0.3); }
.textarea--dark:focus { border-color: rgba(255,255,255,0.35); }
```

- [ ] **Step 3: Add page dispatcher to bottom of main.js**

```js
// Page-specific animations — dispatched by data-page attribute
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'about') initAboutPage();
  if (page === 'shop') initShopPage();
  if (page === 'product') initProductPage();
  if (page === 'join') initJoinPage();
  if (page === 'contact') initContactPage();
});

function initAboutPage() {}
function initShopPage() {}
function initProductPage() {}
function initJoinPage() {}
function initContactPage() {}
```

- [ ] **Step 4: Verify**

Open each page in browser — nothing should change visually yet. Check console for JS errors.

---

## Task 2: About Page — Hero (Diagonal Stats Split)

**Files:**
- Modify: `about.html` lines 29–36 (PAGE HERO section)
- Modify: `styles/main.css` — append About section

- [ ] **Step 1: Replace the PAGE HERO section in about.html**

Remove this block (lines 29–36):
```html
<!-- PAGE HERO -->
<section style="background:#1C1F2A;padding:100px 0 88px;text-align:center;">
  <div class="container gsap-reveal">
    <span class="eyebrow" style="color:rgba(255,255,255,0.45);">Our Story</span>
    <h1 style="color:#FFFFFF;max-width:700px;margin:20px auto 24px;">MORE VALUE.<br>NO GIMMICKS.</h1>
    <p style="color:rgba(255,255,255,0.62);max-width:520px;margin:0 auto;font-size:1.0625rem;line-height:1.75;">Habito was built for people who are tired of overpaying for supplements they can barely pronounce. We strip away the marketing overhead and put the value back in the product.</p>
  </div>
</section>
```

Replace with:
```html
<!-- PAGE HERO — DIAGONAL STATS SPLIT -->
<section class="about-hero">
  <div class="about-hero__left">
    <div class="about-hero__founding">
      <span class="about-hero__year">2022</span>
      <span class="about-hero__city">Saint George, UT</span>
    </div>
    <div class="about-hero__tagline">MORE VALUE.<br>NO GIMMICKS.</div>
  </div>
  <div class="about-hero__right">
    <div class="about-stat gsap-reveal">
      <span class="about-stat__num" data-target="10000">0</span>
      <span class="about-stat__suffix">+</span>
      <span class="about-stat__label">Members</span>
    </div>
    <div class="about-stat gsap-reveal">
      <span class="about-stat__num" data-target="18">0</span>
      <span class="about-stat__label">Products</span>
    </div>
    <div class="about-stat gsap-reveal">
      <span class="about-stat__num" data-target="0">0</span>
      <span class="about-stat__prefix">$</span>
      <span class="about-stat__label">Ad Spend</span>
    </div>
  </div>
  <div class="about-hero__redline"></div>
</section>
```

- [ ] **Step 2: Append About hero CSS to main.css**

```css
/* ==============================================
   PAGE: ABOUT
   ============================================== */

.about-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 560px;
  position: relative;
  overflow: hidden;
}

.about-hero__left {
  background: var(--red);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 64px;
  clip-path: polygon(0 0, 95% 0, 100% 100%, 0 100%);
  position: relative;
  z-index: 1;
}

.about-hero__year {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(5rem, 10vw, 9rem);
  color: #FFFFFF;
  line-height: 1;
  letter-spacing: -0.04em;
  display: block;
  margin-bottom: 8px;
}

.about-hero__city {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: block;
  margin-bottom: 40px;
}

.about-hero__tagline {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.about-hero__right {
  background: #1C1F2A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 64px 80px 80px;
  gap: 48px;
}

.about-stat {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 6px;
}

.about-stat__num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #FFFFFF;
  line-height: 1;
  letter-spacing: -0.03em;
}

.about-stat__suffix,
.about-stat__prefix {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--red);
  line-height: 1;
}

.about-stat__label {
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-top: 6px;
}

.about-hero__redline {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--red);
  z-index: 2;
}

@media (max-width: 768px) {
  .about-hero { grid-template-columns: 1fr; }
  .about-hero__left { clip-path: none; padding: 56px 32px 48px; }
  .about-hero__right { padding: 48px 32px 64px; gap: 36px; }
}
```

- [ ] **Step 3: Implement stat counter in initAboutPage() in main.js**

Replace the empty `initAboutPage()` function:
```js
function initAboutPage() {
  // Stat counters — count up when scrolled into view
  document.querySelectorAll('.about-stat__num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let started = false;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        const duration = 1400;
        const start = performance.now();
        (function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        })(start);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
  });

  // Hero slide-in (GSAP)
  if (typeof gsap !== 'undefined') {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      gsap.from('.about-hero__left', { x: -60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
      gsap.from('.about-hero__right .about-stat', {
        x: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2
      });
    }
  }
}
```

- [ ] **Step 4: Verify**

Open `http://localhost:8080/about.html`. The hero should show a red left panel with `2022` in huge type and a dark right panel with 3 animated counters. The diagonal clip should create a slanted seam.

---

## Task 3: About Page — Manifesto, Values Tape, Commitments

**Files:**
- Modify: `about.html` — replace MISSION, CORE VALUES, HABITO STORY, COMMITMENTS sections
- Modify: `styles/main.css` — append to About section

- [ ] **Step 1: Replace MISSION section (lifestyle-split) in about.html**

Remove the entire `<!-- MISSION — LIFESTYLE SPLIT -->` section (lines 39–53) and replace with:
```html
<!-- MANIFESTO BLOCK -->
<section class="about-manifesto dark-section section">
  <div class="container">
    <div class="about-manifesto__inner gsap-reveal">
      <div class="about-manifesto__quote-mark" aria-hidden="true">"</div>
      <blockquote class="about-manifesto__quote">
        You pay for the product,<br>not the marketing.
      </blockquote>
      <div class="about-manifesto__prose-grid">
        <div>
          <span class="eyebrow" style="color:rgba(255,255,255,0.45);">How We Started</span>
          <p>Habito was founded in Saint George, Utah by a small team frustrated with the supplement market's worst habits — hidden ingredients, inflated prices, and relentless upsells. They set out to build a brand that could deliver clinical-quality nutrition without the six-figure marketing budget baked into every bottle.</p>
          <p style="margin-top:20px;">Starting with a tight catalog of high-priority formulas, Habito grew through word of mouth and repeat customers who noticed the difference.</p>
        </div>
        <div>
          <span class="eyebrow" style="color:rgba(255,255,255,0.45);">The Standard</span>
          <p>Every product we've added has passed the same test: does this provide real value at an honest price? No celebrity endorsements. No detox teas. No miracle cures. Just solid nutrition science in capsule and powder form.</p>
          <p style="margin-top:20px;" class="about-manifesto__location">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" aria-hidden="true" style="display:inline;vertical-align:middle;margin-right:6px;"><path d="M6 0C2.686 0 0 2.686 0 6c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/><circle cx="6" cy="6" r="2" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/></svg>
            Saint George, UT
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace CORE VALUES section in about.html**

Remove the entire `<!-- CORE VALUES -->` section (the `section.section.section--base` block with `about-values-grid`) and replace with:
```html
<!-- VALUES TAPE -->
<section class="section section--lift">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:48px;">
      <span class="eyebrow">Core Values</span>
      <h2>WHAT WE STAND FOR.</h2>
    </div>
  </div>
  <div class="about-values-tape gsap-stagger">
    <div class="about-value-block">
      <span class="about-value-block__num">01</span>
      <div class="about-value-block__divider"></div>
      <div class="about-value-block__content">
        <h3 class="about-value-block__title">Clean Ingredients</h3>
        <p class="about-value-block__text">No artificial fillers, no proprietary blends, no underdosed formulas. Every ingredient listed with its exact dose.</p>
      </div>
    </div>
    <div class="about-value-block">
      <span class="about-value-block__num">02</span>
      <div class="about-value-block__divider"></div>
      <div class="about-value-block__content">
        <h3 class="about-value-block__title">Pure Performance</h3>
        <p class="about-value-block__text">Clinically-researched dosages of compounds proven to work — not compounds that look good on a label.</p>
      </div>
    </div>
    <div class="about-value-block">
      <span class="about-value-block__num">03</span>
      <div class="about-value-block__divider"></div>
      <div class="about-value-block__content">
        <h3 class="about-value-block__title">Real Results</h3>
        <p class="about-value-block__text">Third-party tested and verified. What the label says is what you get — every batch, every time.</p>
      </div>
    </div>
    <div class="about-value-block">
      <span class="about-value-block__num">04</span>
      <div class="about-value-block__divider"></div>
      <div class="about-value-block__content">
        <h3 class="about-value-block__title">No Gimmicks</h3>
        <p class="about-value-block__text">No detox teas, no magic pills, no miracle cures. Just solid nutrition science in capsule and powder form.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Remove the old HABITO STORY section from about.html**

Remove the entire `<!-- THE HABITO STORY -->` section (the `section` with `about-story-grid`). Its content is now in the Manifesto block above.

- [ ] **Step 4: Replace COMMITMENTS section in about.html**

Remove the entire `<!-- OUR COMMITMENTS -->` section and replace with:
```html
<!-- COMMITMENTS — STAGGERED 2-COL -->
<section class="section section--base">
  <div class="container">
    <div class="about-commitments-split">
      <div class="about-commitments-split__lead gsap-reveal">
        <span class="eyebrow">Our Promises</span>
        <h2>OUR COMMITMENTS.</h2>
        <span class="h2-red-rule"></span>
      </div>
      <div class="about-commitments-split__list gsap-stagger">
        <div class="about-commitment-row">
          <span class="about-commitment-row__num">01</span>
          <div>
            <p class="about-commitment-row__title">Ingredient Transparency</p>
            <p class="about-commitment-row__text">Full label disclosure, exact doses, no proprietary blends. You know exactly what you're taking and why.</p>
          </div>
        </div>
        <div class="about-commitment-row">
          <span class="about-commitment-row__num">02</span>
          <div>
            <p class="about-commitment-row__title">Community First</p>
            <p class="about-commitment-row__text">Members get access to pricing, products, and community resources that the general public doesn't. We grow together.</p>
          </div>
        </div>
        <div class="about-commitment-row">
          <span class="about-commitment-row__num">03</span>
          <div>
            <p class="about-commitment-row__title">Honest Pricing</p>
            <p class="about-commitment-row__text">Prices reflect ingredient cost and manufacturing — not ad spend. We publish our reasoning when we change a price.</p>
          </div>
        </div>
        <div class="about-commitment-row">
          <span class="about-commitment-row__num">04</span>
          <div>
            <p class="about-commitment-row__title">Quality Sourcing</p>
            <p class="about-commitment-row__text">Every raw material is vetted for purity and potency before it enters our supply chain. Third-party lab reports on request.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Append About manifesto + values tape + commitments CSS to main.css**

```css
/* --- About: Manifesto Block --- */
.about-manifesto { position: relative; }

.about-manifesto__inner { position: relative; }

.about-manifesto__quote-mark {
  font-family: Georgia, serif;
  font-size: 14rem;
  color: rgba(210,38,48,0.08);
  line-height: 1;
  position: absolute;
  top: -40px;
  left: -20px;
  pointer-events: none;
  user-select: none;
}

.about-manifesto__quote {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  color: #FFFFFF;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-style: normal;
  border: none;
  padding: 0;
  margin: 0 0 64px;
  max-width: 840px;
  position: relative;
}

.about-manifesto__prose-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}
.about-manifesto__prose-grid p { color: rgba(255,255,255,0.62); line-height: 1.8; }
.about-manifesto__location { color: rgba(255,255,255,0.35) !important; font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; }

@media (max-width: 768px) {
  .about-manifesto__prose-grid { grid-template-columns: 1fr; gap: 32px; }
  .about-manifesto__quote-mark { font-size: 7rem; }
}

/* --- About: Values Tape --- */
.about-values-tape {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.about-value-block {
  display: flex;
  flex-direction: column;
  padding: 48px 40px;
  border-right: 1px solid var(--border);
  position: relative;
}
.about-value-block:last-child { border-right: none; }

.about-value-block__num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: var(--red);
  margin-bottom: 20px;
  display: block;
}

.about-value-block__divider {
  width: 24px;
  height: 2px;
  background: var(--red);
  margin-bottom: 20px;
}

.about-value-block__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--white);
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

.about-value-block__text {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
}

@media (max-width: 768px) {
  .about-values-tape { grid-template-columns: 1fr 1fr; }
  .about-value-block { padding: 32px 24px; }
  .about-value-block:nth-child(odd) { border-right: 1px solid var(--border); }
  .about-value-block:nth-child(even) { border-right: none; }
  .about-value-block:nth-child(1),
  .about-value-block:nth-child(2) { border-bottom: 1px solid var(--border); }
}

/* --- About: Commitments Split --- */
.about-commitments-split {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: start;
}

.about-commitments-split__lead { position: sticky; top: 80px; }

.about-commitment-row {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid var(--border);
  align-items: start;
}
.about-commitment-row:first-child { border-top: 1px solid var(--border); }

.about-commitment-row__num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: var(--red);
  padding-top: 3px;
}

.about-commitment-row__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--white);
  margin-bottom: 10px;
}

.about-commitment-row__text {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .about-commitments-split { grid-template-columns: 1fr; gap: 40px; }
  .about-commitments-split__lead { position: static; }
}
```

- [ ] **Step 6: Verify**

Open `http://localhost:8080/about.html`. Scroll through all sections. Check: manifesto quote renders large with faint quote mark, values tape is a horizontal 4-col strip with vertical rules, commitments have a 2-col sticky-lead layout.

---

## Task 4: Shop Page — Editorial Header + Redesigned Cards

**Files:**
- Modify: `all-products.html` — replace hero section, update cards + sidebar + add category dividers
- Modify: `styles/main.css` — append Shop section

- [ ] **Step 1: Replace the catalog hero in all-products.html**

Remove this block:
```html
<!-- PAGE HERO -->
<section style="background:#1C1F2A;" class="catalog-hero">
  <div class="container gsap-reveal">
    <span class="eyebrow" style="color:rgba(255,255,255,0.45);">Habito Essentials</span>
    <h1 style="color:#FFFFFF;margin-bottom:12px;">ALL PRODUCTS.</h1>
    <p style="color:rgba(255,255,255,0.55);">Clean supplements. Real ingredients. No gimmicks.</p>
    <p class="catalog-hero__count" style="color:rgba(255,255,255,0.28);">18 products across 4 categories</p>
  </div>
</section>
```

Replace with:
```html
<!-- CATALOG HEADER — EDITORIAL STRIP -->
<div class="catalog-header">
  <div class="container catalog-header__row">
    <div>
      <span class="eyebrow">Habito Essentials</span>
      <h1 class="catalog-header__title">ALL PRODUCTS.</h1>
    </div>
    <p class="catalog-header__count">18 products · 4 categories</p>
  </div>
</div>
```

- [ ] **Step 2: Redesign the sidebar in all-products.html**

Replace the entire `<aside class="catalog-sidebar">` block with:
```html
<aside class="catalog-sidebar catalog-sidebar--v2">
  <div class="filter-section">
    <p class="filter-label">Category</p>
    <label class="filter-toggle">
      <input type="checkbox" checked>
      <span class="filter-toggle__label">Capsules <span class="filter-toggle__count">11</span></span>
    </label>
    <label class="filter-toggle">
      <input type="checkbox">
      <span class="filter-toggle__label">Gummies <span class="filter-toggle__count">2</span></span>
    </label>
    <label class="filter-toggle">
      <input type="checkbox">
      <span class="filter-toggle__label">Liquid <span class="filter-toggle__count">2</span></span>
    </label>
    <label class="filter-toggle">
      <input type="checkbox">
      <span class="filter-toggle__label">Powder <span class="filter-toggle__count">3</span></span>
    </label>
  </div>
  <div class="filter-rule"></div>
  <div class="filter-section">
    <p class="filter-label">Health Goal</p>
    <label class="filter-toggle"><input type="checkbox"><span class="filter-toggle__label">Endurance</span></label>
    <label class="filter-toggle"><input type="checkbox"><span class="filter-toggle__label">Strength</span></label>
    <label class="filter-toggle"><input type="checkbox"><span class="filter-toggle__label">Recovery</span></label>
    <label class="filter-toggle"><input type="checkbox"><span class="filter-toggle__label">Focus</span></label>
    <label class="filter-toggle"><input type="checkbox"><span class="filter-toggle__label">Blood Sugar</span></label>
    <label class="filter-toggle"><input type="checkbox"><span class="filter-toggle__label">Immunity</span></label>
  </div>
  <div class="filter-rule"></div>
  <div class="filter-section">
    <p class="filter-label">Price Range</p>
    <input type="range" min="0" max="100" value="80" style="width:100%;accent-color:var(--red);margin:8px 0;">
    <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-ghost);">
      <span>$0</span><span>$80</span>
    </div>
  </div>
</aside>
```

- [ ] **Step 3: Update all product cards in all-products.html**

Replace every `.product-card` in the `products-grid--3col` with the new v2 structure. Here is the pattern — apply it to all 18 cards:
```html
<!-- Pattern for a standard card: -->
<div class="product-card product-card--v2">
  <a href="product.html" class="product-card__image-wrap">
    <img src="images/products/blood-sugar.jpg" alt="Blood Sugar Support" loading="lazy">
  </a>
  <div class="product-card__body">
    <p class="product-card__name">Blood Sugar Support</p>
    <p class="product-card__benefit">Balanced glucose. Sustained energy.</p>
    <p class="product-card__price">$29.99</p>
    <a href="product.html" class="product-card__add-btn">ADD TO CART +</a>
  </div>
</div>

<!-- Pattern for a bestseller card (add top-accent + badge inside image-wrap at bottom-left): -->
<div class="product-card product-card--v2 product-card--bestseller">
  <a href="product.html" class="product-card__image-wrap">
    <img src="images/products/blood-sugar.jpg" alt="Blood Sugar Support" loading="lazy">
    <span class="product-card__badge">Best Seller</span>
  </a>
  <div class="product-card__body">
    <p class="product-card__name">Blood Sugar Support</p>
    <p class="product-card__benefit">Balanced glucose. Sustained energy.</p>
    <p class="product-card__price">$29.99</p>
    <a href="product.html" class="product-card__add-btn">ADD TO CART +</a>
  </div>
</div>
```

Bestseller cards (currently have `product-card__badge`): Blood Sugar Support, NO2, Creatine. Apply `product-card--bestseller` to these 3.

- [ ] **Step 4: Add category dividers in the products grid in all-products.html**

Inside `<div class="products-grid--3col gsap-stagger">`, add a `.catalog-divider` before each new category group. Place them at these positions in the grid:
```html
<!-- Before Gummies group (after the 11 capsule cards) -->
<div class="catalog-divider">GUMMIES</div>

<!-- Before Liquid group -->
<div class="catalog-divider">LIQUID</div>

<!-- Before Powder group -->
<div class="catalog-divider">POWDER</div>
```

- [ ] **Step 5: Append Shop CSS to main.css**

```css
/* ==============================================
   PAGE: SHOP
   ============================================== */

.catalog-header {
  padding: 48px 0 0;
  background: var(--dark-base);
  border-bottom: 1px solid var(--border);
}

.catalog-header__row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 24px;
}

.catalog-header__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-top: 8px;
}

.catalog-header__count {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-ghost);
}

/* Sidebar v2 */
.catalog-sidebar--v2 { padding-top: 24px; }

.filter-rule {
  height: 1px;
  background: var(--red);
  margin: 20px 0;
  width: 24px;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 0;
}

.filter-toggle input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border: 1.5px solid rgba(28,31,42,0.25);
  border-radius: 1px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  transition: background 0.15s, border-color 0.15s;
}

.filter-toggle input[type="checkbox"]:checked {
  background: var(--red);
  border-color: var(--red);
}

.filter-toggle input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 3px;
  width: 5px;
  height: 8px;
  border: 1.5px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

.filter-toggle__label {
  font-size: 0.8125rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s;
}

.filter-toggle:has(input:checked) .filter-toggle__label { color: var(--white); }

.filter-toggle__count {
  font-size: 0.6875rem;
  color: var(--text-ghost);
}

/* Product card v2 — light theme */
.product-card--v2 {
  background: #FFFFFF;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 4px rgba(28,31,42,0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.product-card--v2:hover {
  box-shadow: 0 4px 20px rgba(28,31,42,0.1);
  transform: translateY(-2px);
}

.product-card--v2 .product-card__image-wrap {
  background: var(--dark-lift);
  height: 240px;
  border-radius: 0;
}

.product-card--v2 .product-card__name {
  color: var(--white);
  font-size: 0.9375rem;
}

.product-card--v2 .product-card__benefit {
  color: var(--text-muted);
}

.product-card--v2 .product-card__price {
  color: var(--red);
  font-size: 1.0625rem;
}

.product-card--v2 .product-card__add-btn {
  background: transparent;
  color: var(--white);
  border: 1px solid rgba(28,31,42,0.15);
  font-size: 0.6875rem;
  padding: 12px 0;
  margin: 0 -20px;
  width: calc(100% + 40px);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.product-card--v2 .product-card__add-btn:hover {
  background: var(--red);
  color: #FFFFFF;
  border-color: var(--red);
}

/* Bestseller red top border */
.product-card--bestseller { border-top: 2px solid var(--red); }

.product-card--v2 .product-card__badge {
  top: auto;
  bottom: 10px;
  left: 10px;
  background: #1C1F2A;
  color: var(--red);
  font-size: 0.6rem;
}

/* Catalog category divider */
.catalog-divider {
  grid-column: 1 / -1;
  background: #1C1F2A;
  padding: 20px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: rgba(255,255,255,0.9);
  margin: 8px 0;
  border-radius: var(--radius-card);
}

@media (max-width: 768px) {
  .catalog-header__row { flex-direction: column; align-items: flex-start; gap: 8px; }
}
```

- [ ] **Step 6: Verify**

Open `http://localhost:8080/all-products.html`. Check: editorial header at top (no dark hero), custom checkbox filters in sidebar, white product cards with light shadow, red top border on bestsellers, Iron Shadow category divider headers in the grid.

---

## Task 5: Product Detail Page — Dark Science Panel + Ingredient Bar

**Files:**
- Modify: `product.html` — redesign purchase zone, breadcrumb, add ingredient data bar, update ingredient cards
- Modify: `styles/main.css` — append Product section

- [ ] **Step 1: Move breadcrumb above dark zone and restyle in product.html**

The breadcrumb currently sits inside `<main>` before the product section. Keep it there but replace its inner content:
```html
<!-- BREADCRUMB -->
<div class="breadcrumb breadcrumb--light">
  <div class="container">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__item"><a href="index.html">Home</a></li>
      <li class="breadcrumb__sep" aria-hidden="true">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="var(--red)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </li>
      <li class="breadcrumb__item"><a href="all-products.html">Shop</a></li>
      <li class="breadcrumb__sep" aria-hidden="true">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="var(--red)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </li>
      <li class="breadcrumb__item"><a href="all-products.html">Capsules</a></li>
      <li class="breadcrumb__sep" aria-hidden="true">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="var(--red)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </li>
      <li class="breadcrumb__item breadcrumb__item--active">Blood Sugar Support</li>
    </ol>
  </div>
</div>
```

- [ ] **Step 2: Replace the PRODUCT DETAIL section in product.html**

Remove `<section class="section product-section--dark">` and its entire contents. Replace with:
```html
<!-- PRODUCT ZONE — DARK SCIENCE PANEL -->
<section class="product-zone">
  <div class="container">
    <div class="product-detail__grid gsap-reveal">
      <!-- LEFT: Images -->
      <div class="product-detail__media">
        <div class="product-zone__image-wrap">
          <div class="product-zone__glow" aria-hidden="true"></div>
          <img src="images/products/blood-sugar.jpg" alt="Blood Sugar Support" loading="lazy">
        </div>
        <div class="product-detail__thumbnails">
          <div class="product-detail__thumb active">
            <img src="images/products/blood-sugar.jpg" alt="Blood Sugar Support view 1">
          </div>
          <div class="product-detail__thumb">
            <img src="images/products/blood-sugar-2.jpg" alt="view 2">
          </div>
          <div class="product-detail__thumb">
            <img src="images/products/blood-sugar-3.jpg" alt="view 3">
          </div>
          <div class="product-detail__thumb">
            <img src="images/products/blood-sugar-4.jpg" alt="view 4">
          </div>
        </div>
      </div>

      <!-- RIGHT: Info -->
      <div class="product-detail__info">
        <span class="eyebrow" style="color:rgba(255,255,255,0.45);">Capsules</span>
        <h1 class="product-detail__name">Blood Sugar Support</h1>

        <div class="product-detail__rating">
          <span class="product-detail__stars">★★★★★</span>
          <span style="color:rgba(255,255,255,0.45);font-size:0.875rem;">4.8 (124 reviews)</span>
        </div>

        <div class="product-detail__price-row">
          <span class="product-detail__price-member">$29.99</span>
          <span class="product-detail__price-retail">$44.99</span>
          <span class="price-badge">Member Price</span>
        </div>

        <div>
          <p class="product-detail__format-label">Format</p>
          <div class="format-selector">
            <button type="button" class="format-btn active">Capsules (60ct)</button>
            <button type="button" class="format-btn">Capsules (120ct)</button>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:16px;">
          <div class="qty-control">
            <button type="button" aria-label="Decrease quantity">−</button>
            <span class="qty-control__value">1</span>
            <button type="button" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn--primary product-zone__add-btn">Add to Cart →</button>
        </div>

        <div class="trust-badges">
          <div class="trust-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14M5 8a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2M5 8V6a2 2 0 012-2h10a2 2 0 012 2v2"/></svg>
            Free Shipping
          </div>
          <div class="trust-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            3rd-Party Tested
          </div>
          <div class="trust-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
            30-Day Returns
          </div>
        </div>

        <p class="product-detail__desc">Support healthy blood sugar levels naturally with our clinically-dosed formula. Featuring berberine, chromium, and Ceylon cinnamon — three of the most researched compounds for glucose metabolism and insulin sensitivity. Clean ingredients. No fillers. No proprietary blends.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add ingredient data bar between purchase zone and ingredients in product.html**

After the closing `</section>` of the product-zone, before `<!-- KEY INGREDIENTS -->`, insert:
```html
<!-- INGREDIENT DATA BAR -->
<div class="ingredient-data-bar gsap-stagger">
  <div class="ingredient-data-bar__item">
    <span class="ingredient-data-bar__dose">500mg</span>
    <span class="ingredient-data-bar__name">Berberine HCl</span>
  </div>
  <div class="ingredient-data-bar__item">
    <span class="ingredient-data-bar__dose">250mg</span>
    <span class="ingredient-data-bar__name">Ceylon Cinnamon</span>
  </div>
  <div class="ingredient-data-bar__item">
    <span class="ingredient-data-bar__dose">200mcg</span>
    <span class="ingredient-data-bar__name">Chromium Picolinate</span>
  </div>
</div>
```

- [ ] **Step 4: Redesign KEY INGREDIENTS section in product.html**

Replace the `<!-- KEY INGREDIENTS -->` section with:
```html
<!-- KEY INGREDIENTS -->
<section class="section section--lift">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:40px;">
      <span class="eyebrow">What's Inside</span>
      <h2>Key Ingredients</h2>
      <span class="h2-red-rule"></span>
    </div>
    <div class="ingredients-grid gsap-stagger">
      <div class="ingredient-card--v2">
        <p class="ingredient-card--v2__name">Berberine HCl</p>
        <p class="ingredient-card--v2__dosage">500mg per serving</p>
        <p class="ingredient-card--v2__benefit">Clinically studied for glucose metabolism and insulin sensitivity. Activates AMPK — the same pathway targeted by metformin.</p>
      </div>
      <div class="ingredient-card--v2">
        <p class="ingredient-card--v2__name">Ceylon Cinnamon</p>
        <p class="ingredient-card--v2__dosage">250mg per serving</p>
        <p class="ingredient-card--v2__benefit">True cinnamon (not cassia) shown to reduce fasting blood glucose and improve lipid profiles in multiple RCTs.</p>
      </div>
      <div class="ingredient-card--v2">
        <p class="ingredient-card--v2__name">Chromium Picolinate</p>
        <p class="ingredient-card--v2__dosage">200mcg per serving</p>
        <p class="ingredient-card--v2__benefit">An essential trace mineral that enhances insulin receptor binding and improves glucose uptake into cells.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Update Related Products section to use product-card--v2 in product.html**

In `<!-- RELATED PRODUCTS -->`, add `product-card--v2` class to all 4 `.product-card` divs.

- [ ] **Step 6: Append Product CSS to main.css**

```css
/* ==============================================
   PAGE: PRODUCT
   ============================================== */

.breadcrumb--light {
  background: var(--dark-base);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
}

.breadcrumb--light .breadcrumb__list { display: flex; align-items: center; gap: 8px; }

.breadcrumb--light .breadcrumb__item a {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  transition: color 0.2s;
}
.breadcrumb--light .breadcrumb__item a:hover { color: var(--red); }
.breadcrumb--light .breadcrumb__item--active {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--white);
}

.breadcrumb--light .breadcrumb__sep { display: flex; align-items: center; }

/* Product Zone */
.product-zone {
  background: #1C1F2A;
  padding: 80px 0;
}

.product-zone .product-detail__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.product-zone__image-wrap {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: rgba(255,255,255,0.04);
}

.product-zone__image-wrap img {
  width: 100%;
  height: 480px;
  object-fit: cover;
  display: block;
}

.product-zone__glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, rgba(210,38,48,0.18) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.product-detail__thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.product-detail__thumb {
  width: 72px;
  height: 72px;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: border-color 0.2s;
  flex-shrink: 0;
}
.product-detail__thumb img { width: 100%; height: 100%; object-fit: cover; }
.product-detail__thumb.active { border-color: var(--red); }
.product-detail__thumb:hover { border-color: rgba(255,255,255,0.3); }

.product-detail__name {
  font-size: clamp(2rem, 4vw, 3rem);
  color: #FFFFFF;
  margin: 12px 0 16px;
}

.product-detail__rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}
.product-detail__stars { color: var(--red); font-size: 1rem; letter-spacing: 2px; }

.product-detail__price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.product-detail__price-member {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: #FFFFFF;
}
.product-detail__price-retail {
  font-size: 1rem;
  color: rgba(255,255,255,0.3);
  text-decoration: line-through;
}
.price-badge {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: var(--red);
  color: #FFFFFF;
  padding: 3px 8px;
  border-radius: 2px;
}

.product-detail__format-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.35);
  margin-bottom: 10px;
}

.format-selector { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.format-btn {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.55);
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: all 0.2s;
}
.format-btn.active, .format-btn:hover { border-color: var(--red); color: #FFFFFF; background: rgba(210,38,48,0.1); }

.qty-control {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: var(--radius-btn);
  overflow: hidden;
}
.qty-control button {
  width: 40px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: rgba(255,255,255,0.6);
  transition: background 0.15s, color 0.15s;
}
.qty-control button:hover { background: rgba(255,255,255,0.06); color: #FFFFFF; }
.qty-control__value {
  width: 48px;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
  border-left: 1px solid rgba(255,255,255,0.12);
  border-right: 1px solid rgba(255,255,255,0.12);
}

.product-zone__add-btn { flex: 1; justify-content: center; }

.trust-badges {
  display: flex;
  gap: 16px;
  margin: 24px 0;
  flex-wrap: wrap;
}
.trust-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.45);
}
.trust-badge svg { color: rgba(255,255,255,0.3); flex-shrink: 0; }

.product-detail__desc {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.75;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 24px;
  margin-top: 8px;
}

/* Ingredient Data Bar */
.ingredient-data-bar {
  background: var(--red);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.ingredient-data-bar__item {
  padding: 24px 32px;
  border-right: 1px solid rgba(255,255,255,0.15);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ingredient-data-bar__item:last-child { border-right: none; }

.ingredient-data-bar__dose {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  line-height: 1;
}

.ingredient-data-bar__name {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.65);
}

/* Ingredient cards v2 */
.ingredient-card--v2 {
  border-left: 2px solid var(--red);
  padding: 24px 28px;
  background: var(--dark-base);
  transition: background 0.2s;
}
.ingredient-card--v2:hover { background: rgba(210,38,48,0.04); }

.ingredient-card--v2__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.0625rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--white);
  margin-bottom: 4px;
}

.ingredient-card--v2__dosage {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.ingredient-card--v2__benefit {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
}

@media (max-width: 768px) {
  .product-zone .product-detail__grid { grid-template-columns: 1fr; gap: 40px; }
  .product-zone__image-wrap img { height: 300px; }
  .ingredient-data-bar { grid-template-columns: 1fr; }
  .ingredient-data-bar__item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); }
  .ingredient-data-bar__item:last-child { border-bottom: none; }
}
```

- [ ] **Step 7: Verify**

Open `http://localhost:8080/product.html`. Check: white breadcrumb strip at top with red chevrons, full Iron Shadow background on purchase zone, red glow behind product image, Fire Pulse red data bar with large dose numbers between sections, left-bordered ingredient cards.

---

## Task 6: Join Page — Bold Value Wall

**Files:**
- Modify: `join.html` — redesign hero, what's included, picker cards, form
- Modify: `styles/main.css` — append Join section

- [ ] **Step 1: Replace JOIN HERO section in join.html**

Remove the entire `<!-- JOIN HERO -->` section and replace with:
```html
<!-- JOIN HERO — RED VALUE WALL -->
<section class="join-hero">
  <canvas class="join-hero__grain" aria-hidden="true"></canvas>
  <div class="container join-hero__inner gsap-reveal">
    <span class="eyebrow" style="color:rgba(255,255,255,0.55);">One-Time · No Recurring Fees</span>
    <div class="join-hero__price">
      <span class="join-hero__currency">$</span>
      <span class="join-hero__amount">75</span>
    </div>
    <p class="join-hero__sub">Get over $150 in supplements, gear, and permanent member pricing.</p>
    <div class="join-hero__items">
      <div class="join-hero__item-tile">
        <span class="join-hero__item-num">01</span>
        <span class="join-hero__item-title">Best-Seller Bundle</span>
      </div>
      <div class="join-hero__item-tile">
        <span class="join-hero__item-num">02</span>
        <span class="join-hero__item-title">Exclusive Tee</span>
      </div>
      <div class="join-hero__item-tile">
        <span class="join-hero__item-num">03</span>
        <span class="join-hero__item-title">Shaker Bottle</span>
      </div>
      <div class="join-hero__item-tile">
        <span class="join-hero__item-num">04</span>
        <span class="join-hero__item-title">Member Pricing Forever</span>
      </div>
    </div>
    <a href="#signup" class="join-hero__cta">Join Habito — $75 →</a>
  </div>
</section>
```

- [ ] **Step 2: Replace WHAT'S INCLUDED section in join.html**

Remove the entire `<!-- WHAT'S INCLUDED -->` section and replace with:
```html
<!-- WHAT'S INCLUDED — DARK EDITORIAL LIST -->
<section class="join-included dark-section section">
  <div class="container">
    <div class="join-included__grid">
      <div class="gsap-reveal">
        <span class="eyebrow" style="color:rgba(255,255,255,0.45);">Your Bundle</span>
        <h2 style="color:#FFFFFF;">WHAT YOU GET.</h2>
        <span class="h2-red-rule"></span>
        <p style="color:rgba(255,255,255,0.55);margin-top:24px;max-width:320px;line-height:1.75;">Everything you need to start your Habito journey — shipped directly to your door with free delivery.</p>
      </div>
      <div class="join-included__list gsap-stagger">
        <div class="join-included__item">
          <span class="join-included__num">01</span>
          <div>
            <p class="join-included__title">Collection of Best-Selling Products</p>
            <p class="join-included__text">A hand-picked selection of Habito's top-rated supplements across multiple health goals — worth over $150 at retail pricing.</p>
          </div>
        </div>
        <div class="join-included__item">
          <span class="join-included__num">02</span>
          <div>
            <p class="join-included__title">Exclusive Early-Supporter T-Shirt</p>
            <p class="join-included__text">A limited-edition Habito tee available only to founding members. Clean design, premium fit, built to last.</p>
          </div>
        </div>
        <div class="join-included__item">
          <span class="join-included__num">03</span>
          <div>
            <p class="join-included__title">Habito Shaker Bottle</p>
            <p class="join-included__text">A durable, leak-proof 28oz shaker with the Habito mark. Your daily companion for powders and hydration.</p>
          </div>
        </div>
        <div class="join-included__item">
          <span class="join-included__num">04</span>
          <div>
            <p class="join-included__title">Free Shipping + Member Pricing Forever</p>
            <p class="join-included__text">One-time fee unlocks free shipping on all future orders and exclusive member pricing on every product — permanently.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update picker cards in join.html**

Replace every `.picker-card` with the v2 structure (keep existing JS toggle behavior — `.selected` class still works):
```html
<div class="picker-card picker-card--v2 selected" role="checkbox" aria-checked="true">
  <div class="picker-card__swatch"></div>
  <p class="picker-card__name">Blood Sugar Support</p>
  <span class="picker-card__check" aria-hidden="true">
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4l3.5 3.5L11 1" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </span>
</div>
```

Apply this pattern to all 8 picker cards. Remove the `<img src="https://picsum.photos/...">` from each — replace with `<div class="picker-card__swatch"></div>`. Keep `selected` on the 4 that are currently selected.

- [ ] **Step 4: Replace SIGN-UP FORM section in join.html**

Remove the entire `<!-- SIGN-UP FORM -->` section and replace with:
```html
<!-- SIGN-UP FORM — DARK WITH ORDER SUMMARY -->
<section class="join-form-section dark-section" id="signup">
  <div class="container join-form-section__grid">
    <!-- FORM -->
    <div class="join-form__fields gsap-reveal">
      <span class="eyebrow" style="color:rgba(255,255,255,0.45);">Almost There</span>
      <h2 style="color:#FFFFFF;margin-bottom:32px;">COMPLETE YOUR ORDER.</h2>
      <form>
        <div class="form-grid" style="margin-bottom:16px;">
          <div class="form-field">
            <label class="form-label" style="color:rgba(255,255,255,0.45);" for="first-name">First Name</label>
            <input class="input--dark" type="text" id="first-name" placeholder="John">
          </div>
          <div class="form-field">
            <label class="form-label" style="color:rgba(255,255,255,0.45);" for="last-name">Last Name</label>
            <input class="input--dark" type="text" id="last-name" placeholder="Smith">
          </div>
          <div class="form-field">
            <label class="form-label" style="color:rgba(255,255,255,0.45);" for="email">Email</label>
            <input class="input--dark" type="email" id="email" placeholder="john@example.com">
          </div>
          <div class="form-field">
            <label class="form-label" style="color:rgba(255,255,255,0.45);" for="phone">Phone</label>
            <input class="input--dark" type="tel" id="phone" placeholder="(555) 000-0000">
          </div>
          <div class="form-field form-field--full">
            <label class="form-label" style="color:rgba(255,255,255,0.45);" for="address">Shipping Address</label>
            <input class="input--dark" type="text" id="address" placeholder="123 Main St, City, ST 00000">
          </div>
        </div>
        <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;font-size:11px;padding:16px;">Join Habito — $75 →</button>
        <p style="text-align:center;font-size:11px;color:rgba(255,255,255,0.3);margin-top:12px;">No recurring charges. One-time payment only.</p>
      </form>
    </div>
    <!-- ORDER SUMMARY -->
    <div class="join-order-summary gsap-reveal">
      <p class="eyebrow" style="color:rgba(255,255,255,0.45);">Order Summary</p>
      <div class="join-order-summary__items">
        <div class="join-order-summary__line">
          <span>Best-Seller Bundle</span>
          <span style="color:rgba(255,255,255,0.3);text-decoration:line-through;">$120.00</span>
        </div>
        <div class="join-order-summary__line">
          <span>Exclusive Tee</span>
          <span style="color:rgba(255,255,255,0.3);text-decoration:line-through;">$18.00</span>
        </div>
        <div class="join-order-summary__line">
          <span>Shaker Bottle</span>
          <span style="color:rgba(255,255,255,0.3);text-decoration:line-through;">$14.00</span>
        </div>
        <div class="join-order-summary__line">
          <span>Free Shipping</span>
          <span style="color:rgba(255,255,255,0.3);text-decoration:line-through;">$9.99</span>
        </div>
      </div>
      <div class="join-order-summary__total">
        <span style="font-family:var(--font-display);font-weight:700;color:#FFFFFF;">Total Today</span>
        <span class="join-order-summary__price">$75</span>
      </div>
      <p style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:16px;line-height:1.6;">Your membership includes permanent member pricing on all 18+ products. One-time payment. No recurring charges.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Append Join CSS to main.css**

```css
/* ==============================================
   PAGE: JOIN
   ============================================== */

.join-hero {
  background: var(--red);
  padding: 100px 0 88px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.join-hero__grain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.06;
}

.join-hero__inner { position: relative; z-index: 1; }

.join-hero__price {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  line-height: 1;
  margin: 16px 0 12px;
}

.join-hero__currency {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: rgba(255,255,255,0.7);
  margin-top: 16px;
}

.join-hero__amount {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(7rem, 14vw, 11rem);
  color: #FFFFFF;
  letter-spacing: -0.05em;
}

.join-hero__sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  max-width: 480px;
  margin: 0 auto 40px;
  line-height: 1.65;
}

.join-hero__items {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.join-hero__item-tile {
  background: rgba(0,0,0,0.15);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-card);
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 160px;
}

.join-hero__item-num {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.45);
}

.join-hero__item-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #FFFFFF;
}

.join-hero__cta {
  display: inline-block;
  background: #1C1F2A;
  color: #FFFFFF;
  font-family: var(--font-cta);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 16px 40px;
  border-radius: var(--radius-btn);
  transition: background 0.2s;
}
.join-hero__cta:hover { background: #0a0c11; }

/* Join included list */
.join-included__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  align-items: start;
}

.join-included__list { display: flex; flex-direction: column; }

.join-included__item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  padding: 28px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  align-items: start;
}
.join-included__item:first-child { border-top: 1px solid rgba(255,255,255,0.08); }

.join-included__num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: var(--red);
  padding-top: 3px;
}

.join-included__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  margin-bottom: 8px;
}

.join-included__text {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.65;
}

/* Picker card v2 */
.picker-card--v2 {
  background: var(--dark-lift);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-card);
  padding: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
}
.picker-card--v2:hover { border-color: rgba(210,38,48,0.4); }
.picker-card--v2.selected { border-color: var(--red); background: rgba(210,38,48,0.04); }

.picker-card__swatch {
  width: 100%;
  height: 64px;
  background: var(--border);
  border-radius: 2px;
}
.picker-card--v2.selected .picker-card__swatch { background: rgba(210,38,48,0.12); }

.picker-card--v2 .picker-card__name {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--white);
}

.picker-card__check {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 0.2s, transform 0.2s;
}
.picker-card--v2.selected .picker-card__check { opacity: 1; transform: scale(1); }

/* Join form */
.join-form-section { padding: 80px 0; }

.join-form-section__grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 64px;
  align-items: start;
}

.join-order-summary {
  position: sticky;
  top: 80px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-card);
  padding: 32px;
}

.join-order-summary__items { margin: 24px 0; display: flex; flex-direction: column; gap: 12px; }

.join-order-summary__line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.55);
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.join-order-summary__total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 16px;
}

.join-order-summary__price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2.5rem;
  color: #FFFFFF;
  letter-spacing: -0.03em;
}

@media (max-width: 768px) {
  .join-hero__items { gap: 6px; }
  .join-hero__item-tile { min-width: 140px; }
  .join-included__grid { grid-template-columns: 1fr; gap: 40px; }
  .join-form-section__grid { grid-template-columns: 1fr; gap: 40px; }
  .join-order-summary { position: static; }
}
```

- [ ] **Step 6: Add grain to join hero in initJoinPage() in main.js**

Replace the empty `initJoinPage()` function:
```js
function initJoinPage() {
  // Canvas grain on red hero
  const canvas = document.querySelector('.join-hero__grain');
  if (canvas) {
    const W = canvas.offsetWidth || window.innerWidth;
    const H = canvas.offsetHeight || 600;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const r = Math.random() * 1.8 + 0.2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,0,0,${(Math.random() * 0.5 + 0.1).toFixed(3)})`;
      ctx.fill();
    }
  }

  // $75 scale-in on load
  if (typeof gsap !== 'undefined') {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      gsap.from('.join-hero__price', { scale: 0.88, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
      gsap.from('.join-hero__items', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out', delay: 0.4 });
    }
  }
}
```

- [ ] **Step 7: Verify**

Open `http://localhost:8080/join.html`. Check: full Fire Pulse red hero with `$75` in massive display type, grain texture, 4 numbered tiles, dark Iron Shadow included list with numbered rows, redesigned picker cards with red checkmark, dark form with sticky order summary on the right.

---

## Task 7: Contact Page — Typographic Split

**Files:**
- Modify: `contact.html` — replace hero + form with unified split layout, update FAQ section
- Modify: `styles/main.css` — append Contact section

- [ ] **Step 1: Replace the CONTACT HERO and CONTACT FORM sections in contact.html**

Remove both `<!-- CONTACT HERO -->` and `<!-- CONTACT FORM -->` sections entirely. Replace with this single combined section:
```html
<!-- CONTACT SPLIT -->
<section class="contact-split">
  <div class="contact-split__left gsap-reveal">
    <div class="contact-split__headline">
      <h1 class="contact-split__big">WE'RE HERE<br>TO <span class="contact-split__red">HELP.</span></h1>
    </div>
    <div class="contact-split__info-list">
      <div class="contact-info-row">
        <p class="contact-info-row__label">Address</p>
        <p class="contact-info-row__value">1996 E 2540 S<br>Saint George, UT 84790</p>
      </div>
      <div class="contact-info-row">
        <p class="contact-info-row__label">Email</p>
        <p class="contact-info-row__value">support@habitolife.com</p>
      </div>
      <div class="contact-info-row">
        <p class="contact-info-row__label">Response Time</p>
        <p class="contact-info-row__value">Within 1 business day.<br>Mon–Fri, 9am–5pm MT.</p>
      </div>
    </div>
    <p class="contact-split__location">
      <svg width="12" height="15" viewBox="0 0 12 15" fill="none" aria-hidden="true"><path d="M6 0C2.686 0 0 2.686 0 6c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" stroke="currentColor" stroke-width="1.2"/><circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
      Saint George, UT
    </p>
  </div>
  <div class="contact-split__right gsap-reveal">
    <span class="eyebrow">Send a Message</span>
    <h2 class="contact-split__form-heading">GET IN TOUCH.</h2>
    <form class="contact-split__form">
      <div class="form-grid" style="margin-bottom:16px;">
        <div class="form-field">
          <label class="form-label" for="cf-first">First Name</label>
          <input class="form-input" type="text" id="cf-first" placeholder="John">
        </div>
        <div class="form-field">
          <label class="form-label" for="cf-last">Last Name</label>
          <input class="form-input" type="text" id="cf-last" placeholder="Smith">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="cf-email">Email</label>
          <input class="form-input" type="email" id="cf-email" placeholder="john@example.com">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="cf-topic">Topic</label>
          <select class="form-select" id="cf-topic">
            <option value="">Select a topic</option>
            <option value="order-status">Order Status</option>
            <option value="product-question">Product Question</option>
            <option value="returns-refunds">Returns &amp; Refunds</option>
            <option value="membership">Membership</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="cf-order">Order # (optional)</label>
          <input class="form-input" type="text" id="cf-order" placeholder="HAB-000000">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="cf-message">Message</label>
          <textarea class="form-textarea" id="cf-message" placeholder="Tell us how we can help..."></textarea>
        </div>
      </div>
      <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;font-size:11px;padding:14px;">Send Message →</button>
      <p style="font-size:11px;color:var(--text-ghost);margin-top:10px;text-align:center;">We respect your privacy. Your information is never shared.</p>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Update FAQ section header in contact.html**

Replace the `<!-- FAQ -->` section opening with a richer header:
```html
<!-- FAQ -->
<section class="section faq-section dark-section" style="background:#1C1F2A;">
  <div class="container" style="max-width:800px;">
    <div class="gsap-reveal faq-header" style="margin-bottom:56px;">
      <span class="eyebrow" style="color:rgba(255,255,255,0.45);">Common Questions</span>
      <h2 style="color:#FFFFFF;">COMMON QUESTIONS.</h2>
      <span class="h2-red-rule"></span>
    </div>
    <div class="faq faq--dark">
      <!-- keep all existing faq__item elements unchanged -->
```

Close the section with `</div></div></section>` as before. Keep all 5 `.faq__item` elements exactly as they are — only the wrapping section header changes.

- [ ] **Step 3: Append Contact CSS to main.css**

```css
/* ==============================================
   PAGE: CONTACT
   ============================================== */

.contact-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 60px);
}

.contact-split__left {
  background: #1C1F2A;
  padding: 80px 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-split__big {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(3rem, 6vw, 5.5rem);
  text-transform: uppercase;
  color: #FFFFFF;
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin-bottom: 48px;
}

.contact-split__red { color: var(--red); }

.contact-split__info-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  justify-content: center;
}

.contact-info-row {
  padding: 24px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.contact-info-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.08); }

.contact-info-row__label {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.35);
  margin-bottom: 6px;
}

.contact-info-row__value {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.6;
}

.contact-split__location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  margin-top: 40px;
}

.contact-split__right {
  background: var(--dark-base);
  padding: 80px 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-split__form-heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin: 12px 0 32px;
}

.contact-split__form { width: 100%; }

/* Dark FAQ variant */
.faq--dark .faq__item {
  border-bottom: 1px solid rgba(255,255,255,0.08);
  position: relative;
}

.faq--dark .faq__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--red);
  transition: width 0.2s ease;
}

.faq--dark .faq__item.open::before { width: 2px; }

.faq--dark .faq__question {
  color: rgba(255,255,255,0.7);
  transition: color 0.2s;
}
.faq--dark .faq__item.open .faq__question { color: #FFFFFF; }

.faq--dark .faq__answer p {
  color: rgba(255,255,255,0.5);
}

@media (max-width: 768px) {
  .contact-split { grid-template-columns: 1fr; min-height: auto; }
  .contact-split__left { padding: 56px 32px; min-height: auto; }
  .contact-split__right { padding: 56px 32px; }
  .contact-split__big { font-size: 3rem; margin-bottom: 32px; }
}
```

- [ ] **Step 4: Verify**

Open `http://localhost:8080/contact.html`. Check: full-viewport split (Iron Shadow left with huge type + info rows, white right with form), FAQ section has dark background with red left-border on open items.

---

## Task 8: JS Animations — Product page + final wiring

**Files:**
- Modify: `js/main.js` — fill in initProductPage() and initContactPage()

- [ ] **Step 1: Fill in initProductPage() in main.js**

Replace the empty `initProductPage()`:
```js
function initProductPage() {
  if (typeof gsap === 'undefined') return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Pulsing red glow behind product image
  const glow = document.querySelector('.product-zone__glow');
  if (glow) {
    gsap.to(glow, {
      opacity: 0.5,
      duration: 2.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  // Ingredient data bar stagger on scroll
  const bar = document.querySelector('.ingredient-data-bar');
  if (bar) {
    gsap.from(Array.from(bar.children), {
      scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1
    });
  }
}
```

- [ ] **Step 2: Fill in initContactPage() in main.js**

Replace the empty `initContactPage()`:
```js
function initContactPage() {
  if (typeof gsap === 'undefined') return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  gsap.from('.contact-split__left', {
    x: -50,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.1
  });
  gsap.from('.contact-split__right', {
    x: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.2
  });
}
```

- [ ] **Step 3: Final cross-page verification**

Visit each page and check:
- `http://localhost:8080/about.html` — diagonal split hero, counter animation, horizontal values tape, 2-col commitments
- `http://localhost:8080/all-products.html` — editorial header, custom checkboxes, white cards, category dividers
- `http://localhost:8080/product.html` — dark purchase zone, red glow, ingredient data bar, left-border ingredient cards
- `http://localhost:8080/join.html` — massive `$75` on red, grain texture, numbered tiles, dark included list, sticky order summary
- `http://localhost:8080/contact.html` — full-height split, huge headline, dark FAQ with red left-border on open

- [ ] **Step 4: Mobile check**

Resize browser to 375px width and verify each page stacks cleanly (single column, no overflow, readable text).

- [ ] **Step 5: Console check**

Open DevTools on each page. Zero JS errors should appear.
