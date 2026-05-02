# Habitolife Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 6 production-ready static HTML/CSS pages for Habitolife's supplement e-commerce redesign, deployable to Netlify for client presentation and usable as a Webflow reference.

**Architecture:** Shared `styles/main.css` holds all design tokens, resets, shared components (navbar, footer, buttons, cards, animations). Shared `js/main.js` handles IntersectionObserver scroll reveals, FAQ accordion toggle, and navbar scroll shadow. Each HTML page links to both and adds minimal page-specific `<style>` overrides inline.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, flexbox, grid, keyframe animations), vanilla JS (IntersectionObserver, classList), Google Fonts (Plus Jakarta Sans + Inter), no build step, Netlify Drop deployment.

**Spec:** `docs/superpowers/specs/2026-05-01-habitolife-redesign-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `styles/main.css` | CSS variables, reset, navbar, footer, buttons, cards, grid utilities, all animation keyframes |
| `js/main.js` | IntersectionObserver scroll reveals, FAQ accordion, navbar scroll shadow |
| `index.html` | Home page — all 8 sections |
| `product.html` | Single product page — breadcrumb, detail, ingredients, related |
| `all-products.html` | Catalog — sidebar filters, product grid, pagination |
| `join.html` | Membership enrollment — offer, product picker, form |
| `about.html` | Brand story — mission, values, story, commitments |
| `contact.html` | Contact form + FAQ sidebar + map placeholder |
| `netlify.toml` | Redirect config so all pages resolve without `.html` extension |

---

## Task 1: Project Structure + CSS Design Tokens

**Files:**
- Create: `styles/main.css`
- Create: `js/main.js` (empty shell)

- [ ] **Step 1: Create directory structure**

```bash
cd "C:/Web Developer/Full Stack Developer/Claude Code/Projects/habitolife-redesign"
mkdir -p styles js
```

- [ ] **Step 2: Create `js/main.js` shell**

```js
// Habitolife — shared JS
// Initialized after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbarScroll();
  initFAQ();
});

function initScrollReveal() {}
function initNavbarScroll() {}
function initFAQ() {}
```

- [ ] **Step 3: Create `styles/main.css` — reset + CSS variables**

```css
/* =============================================
   HABITO — DESIGN SYSTEM
   ============================================= */

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }

/* --- CSS Variables --- */
:root {
  --navy:   #1C1F29;
  --red:    #D42F2F;
  --white:  #FFFFFF;
  --gray:   #F7F7F7;
  --border: #EBEBEB;
  --text:   #1C1F29;
  --text-2: #666666;
  --text-3: #888888;

  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body:    'Inter', sans-serif;

  --radius-card: 6px;
  --radius-btn:  3px;

  --section-pad: 52px 40px;
  --max-w: 1200px;
  --gap-grid: 16px;
}

/* --- Base --- */
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  color: var(--text);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 4: Add Google Fonts import at top of `styles/main.css` (before everything else)**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
```

- [ ] **Step 5: Commit**

```bash
git init
git add styles/main.css js/main.js
git commit -m "feat: project setup, design tokens, CSS reset"
```

---

## Task 2: Shared CSS — Navbar + Footer

**Files:**
- Modify: `styles/main.css` (append)

- [ ] **Step 1: Add navbar styles to `styles/main.css`**

```css
/* =============================================
   NAVBAR
   ============================================= */
.navbar {
  background: var(--navy);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  transition: box-shadow 0.3s ease;
}
.navbar.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.35); }

.navbar__logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  color: var(--white);
  letter-spacing: 3px;
  text-transform: uppercase;
}
.navbar__links {
  display: flex;
  gap: 32px;
  align-items: center;
}
.navbar__links a {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  font-weight: 500;
  transition: color 0.2s;
}
.navbar__links a:hover { color: var(--white); }

.navbar__cta {
  background: var(--red);
  color: var(--white) !important;
  padding: 8px 18px;
  border-radius: var(--radius-btn);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background 0.2s !important;
}
.navbar__cta:hover { background: #b82424 !important; }

.navbar__icons {
  display: flex;
  gap: 18px;
  align-items: center;
}
.navbar__icons a {
  color: rgba(255,255,255,0.65);
  font-size: 15px;
  transition: color 0.2s;
}
.navbar__icons a:hover { color: var(--white); }
```

- [ ] **Step 2: Add footer styles to `styles/main.css`**

```css
/* =============================================
   FOOTER
   ============================================= */
.footer {
  background: var(--navy);
  padding: 48px 40px 24px;
}
.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 32px;
}
.footer__brand-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 16px;
  color: var(--white);
  letter-spacing: 3px;
  margin-bottom: 10px;
}
.footer__brand-tag {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
  max-width: 200px;
}
.footer__col-title {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.footer__col a {
  display: block;
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 9px;
  transition: color 0.2s;
}
.footer__col a:hover { color: var(--white); }
.footer__divider {
  border: none;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 18px;
}
.footer__disclaimer {
  font-size: 10px;
  color: rgba(255,255,255,0.25);
  line-height: 1.7;
  margin-bottom: 14px;
  max-width: 720px;
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer__copy { font-size: 11px; color: rgba(255,255,255,0.3); }
```

- [ ] **Step 3: Commit**

```bash
git add styles/main.css
git commit -m "feat: shared navbar and footer styles"
```

---

## Task 3: Shared CSS — Buttons, Cards, Utilities

**Files:**
- Modify: `styles/main.css` (append)

- [ ] **Step 1: Add button styles**

```css
/* =============================================
   BUTTONS
   ============================================= */
.btn {
  display: inline-block;
  border-radius: var(--radius-btn);
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.15s;
}
.btn:active { transform: translateY(1px); }

.btn--primary {
  background: var(--red);
  color: var(--white);
  padding: 13px 28px;
  font-size: 12px;
}
.btn--primary:hover { background: #b82424; }

.btn--white {
  background: var(--white);
  color: var(--red);
  padding: 13px 28px;
  font-size: 12px;
}
.btn--white:hover { background: #f5f5f5; }

.btn--dark {
  background: var(--navy);
  color: var(--white);
  padding: 10px 0;
  font-size: 11px;
  width: 100%;
  text-align: center;
  display: block;
}
.btn--dark:hover { background: #2d3244; }

.btn--ghost {
  color: rgba(255,255,255,0.8);
  font-size: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.4);
  padding-bottom: 2px;
  border-radius: 0;
  transition: color 0.2s, border-color 0.2s;
}
.btn--ghost:hover { color: var(--white); border-color: var(--white); }
```

- [ ] **Step 2: Add product card styles**

```css
/* =============================================
   PRODUCT CARD
   ============================================= */
.product-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.09);
}
.product-card__img {
  background: #F2F2F2;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.product-card__img-inner {
  width: 64px;
  height: 96px;
  background: linear-gradient(90deg, #ddd 25%, #e8e8e8 50%, #ddd 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}
.product-card__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--red);
  color: var(--white);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 3px 8px;
  border-radius: 2px;
  text-transform: uppercase;
}
.product-card__body { padding: 14px; }
.product-card__cat {
  font-size: 9px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.product-card__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  color: var(--text);
  line-height: 1.3;
  margin-bottom: 6px;
}
.product-card__price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}
.product-card__price { font-size: 14px; font-weight: 700; color: var(--text); }
.product-card__price-member { font-size: 10px; color: var(--text-3); }
```

- [ ] **Step 3: Add utility + section styles**

```css
/* =============================================
   UTILITIES + SECTION STYLES
   ============================================= */
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 40px; }
.section { padding: var(--section-pad); }
.section--navy { background: var(--navy); }
.section--gray { background: var(--gray); }
.section--white { background: var(--white); }
.section--red { background: var(--red); }

.section__eyebrow {
  font-size: 10px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.section__eyebrow--muted { color: rgba(255,255,255,0.5); }

.section__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 28px;
  color: var(--text);
  line-height: 1.15;
  margin-bottom: 12px;
}
.section__title--white { color: var(--white); }

.section__sub {
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.7;
}
.section__sub--white { color: rgba(255,255,255,0.55); }

.section__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 28px;
}
.section__link {
  font-size: 11px;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--red);
  padding-bottom: 1px;
  transition: opacity 0.2s;
}
.section__link:hover { opacity: 0.75; }

.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--gap-grid); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gap-grid); }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
```

- [ ] **Step 4: Commit**

```bash
git add styles/main.css
git commit -m "feat: shared button, card, and utility styles"
```

---

## Task 4: Shared CSS — Animations + Keyframes

**Files:**
- Modify: `styles/main.css` (append)

- [ ] **Step 1: Add keyframe definitions**

```css
/* =============================================
   KEYFRAMES
   ============================================= */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- [ ] **Step 2: Add scroll-reveal utility classes**

```css
/* =============================================
   SCROLL REVEAL
   ============================================= */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger delays for grid children */
.reveal-stagger > *:nth-child(1) { transition-delay: 0s; }
.reveal-stagger > *:nth-child(2) { transition-delay: 0.08s; }
.reveal-stagger > *:nth-child(3) { transition-delay: 0.16s; }
.reveal-stagger > *:nth-child(4) { transition-delay: 0.24s; }
.reveal-stagger > *:nth-child(5) { transition-delay: 0.32s; }
.reveal-stagger > *:nth-child(6) { transition-delay: 0.40s; }
```

- [ ] **Step 3: Add marquee + FAQ animation styles**

```css
/* =============================================
   MARQUEE
   ============================================= */
.marquee {
  overflow: hidden;
  background: var(--navy);
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 14px 0;
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 32px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  white-space: nowrap;
}
.marquee__item::after {
  content: '·';
  color: var(--red);
  font-size: 16px;
}

/* =============================================
   FAQ ACCORDION
   ============================================= */
.faq__item {
  border-bottom: 1px solid var(--border);
  padding: 0;
  overflow: hidden;
}
.faq__question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--text);
  user-select: none;
}
.faq__question::after {
  content: '+';
  color: var(--red);
  font-size: 20px;
  font-weight: 400;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 16px;
}
.faq__item.open .faq__question::after {
  transform: rotate(45deg);
}
.faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.7;
}
.faq__item.open .faq__answer {
  max-height: 200px;
  padding-bottom: 18px;
}
```

- [ ] **Step 4: Commit**

```bash
git add styles/main.css
git commit -m "feat: animation keyframes, scroll reveal, marquee, FAQ accordion styles"
```

---

## Task 5: Shared JS — Scroll Reveal, Navbar, FAQ

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Implement `initScrollReveal`**

```js
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
```

- [ ] **Step 2: Implement `initNavbarScroll`**

```js
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:64px;left:0;height:1px;width:1px;';
  document.body.prepend(sentinel);
  const obs = new IntersectionObserver(
    ([entry]) => navbar.classList.toggle('scrolled', !entry.isIntersecting),
    { threshold: 0 }
  );
  obs.observe(sentinel);
}
```

- [ ] **Step 3: Implement `initFAQ`**

```js
function initFAQ() {
  document.querySelectorAll('.faq__question').forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      const isOpen = item.classList.contains('open');
      // Close all open items in same list
      q.closest('.faq').querySelectorAll('.faq__item.open').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
```

- [ ] **Step 4: Open any HTML file in browser and verify no JS errors in console**

Open `index.html` (even empty). Expected: no console errors.

- [ ] **Step 5: Commit**

```bash
git add js/main.js
git commit -m "feat: scroll reveal, navbar shadow, FAQ accordion JS"
```

---

## Task 6: HTML Boilerplate — Shared `<head>` Template

**Files:**
- Reference only (used in Tasks 7–12)

Every HTML page uses this `<head>`. Copy exactly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Habito — [Page Title]</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <a href="index.html" class="navbar__logo">Habito</a>
    <div class="navbar__links">
      <a href="all-products.html">Shop ▾</a>
      <a href="join.html">Join</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="join.html" class="navbar__cta">Join Now</a>
    </div>
    <div class="navbar__icons">
      <a href="#">🔍</a>
      <a href="#">👤</a>
      <a href="#">🛒</a>
    </div>
  </nav>

  <!-- PAGE CONTENT HERE -->

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__grid">
      <div>
        <div class="footer__brand-logo">Habito</div>
        <div class="footer__brand-tag">Choose Better. Live Greater.</div>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Shop</div>
        <a href="all-products.html?cat=capsules">Capsules</a>
        <a href="all-products.html?cat=gummies">Gummies</a>
        <a href="all-products.html?cat=liquid">Liquid</a>
        <a href="all-products.html?cat=powder">Powder</a>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Company</div>
        <a href="about.html">About</a>
        <a href="join.html">Join</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Legal</div>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Return Policy</a>
      </div>
    </div>
    <hr class="footer__divider">
    <p class="footer__disclaimer">These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
    <div class="footer__bottom">
      <span class="footer__copy">© 2026 Habito, LLC. All rights reserved.</span>
      <span class="footer__copy">1996 E 2540 S, Saint George, UT 84790</span>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

No commit for this task — it's reference material for Tasks 7–12.

---

## Task 7: Home Page (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with `<head>` + navbar + footer from Task 6 boilerplate**

Set title to `Habito — Choose Better. Live Greater.`

- [ ] **Step 2: Add hero section**

```html
<!-- HERO -->
<section class="section section--navy hero">
  <div class="hero__text reveal">
    <p class="section__eyebrow">Clean Supplements · No Gimmicks</p>
    <h1 class="hero__headline">Choose Better.<br>Live Greater.</h1>
    <p class="hero__sub">Clean Ingredients · Pure Performance · Real Results · No Gimmicks</p>
    <div class="hero__btns">
      <a href="all-products.html" class="btn btn--primary">Make the Change Today</a>
      <a href="join.html" class="btn btn--ghost">Join &amp; Save</a>
    </div>
  </div>
  <div class="hero__images reveal" style="transition-delay:0.15s">
    <div class="hero__img-box"></div>
    <div class="hero__img-box hero__img-box--tall"></div>
    <div class="hero__img-box"></div>
  </div>
</section>
```

Add to `<style>` in `<head>` (page-specific):

```css
<style>
.hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; padding: 72px 40px; }
.hero__headline { font-family: var(--font-display); font-weight: 800; font-size: 48px; color: var(--white); line-height: 1.05; margin-bottom: 16px; }
.hero__sub { font-size: 13px; color: rgba(255,255,255,0.55); margin-bottom: 32px; line-height: 1.7; }
.hero__btns { display: flex; gap: 16px; align-items: center; }
.hero__images { display: flex; gap: 12px; justify-content: center; align-items: flex-end; }
.hero__img-box { width: 100px; height: 150px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; }
.hero__img-box--tall { height: 180px; }
</style>
```

- [ ] **Step 3: Add marquee benefits bar**

```html
<!-- MARQUEE -->
<div class="marquee">
  <div class="marquee__track">
    <!-- duplicated list for seamless loop -->
    <span class="marquee__item">Steady Endurance</span>
    <span class="marquee__item">Muscle Support</span>
    <span class="marquee__item">Lean Strength</span>
    <span class="marquee__item">Faster Recovery</span>
    <span class="marquee__item">Core Stability</span>
    <span class="marquee__item">Deep Nourishment</span>
    <span class="marquee__item">Sustained Output</span>
    <span class="marquee__item">Peak Performance</span>
    <span class="marquee__item">Daily Resilience</span>
    <span class="marquee__item">Natural Vitality</span>
    <span class="marquee__item">Increased Muscle Power</span>
    <span class="marquee__item">Boost Strength Output</span>
    <span class="marquee__item">Enhance Muscle Density</span>
    <!-- duplicate -->
    <span class="marquee__item">Steady Endurance</span>
    <span class="marquee__item">Muscle Support</span>
    <span class="marquee__item">Lean Strength</span>
    <span class="marquee__item">Faster Recovery</span>
    <span class="marquee__item">Core Stability</span>
    <span class="marquee__item">Deep Nourishment</span>
    <span class="marquee__item">Sustained Output</span>
    <span class="marquee__item">Peak Performance</span>
    <span class="marquee__item">Daily Resilience</span>
    <span class="marquee__item">Natural Vitality</span>
    <span class="marquee__item">Increased Muscle Power</span>
    <span class="marquee__item">Boost Strength Output</span>
    <span class="marquee__item">Enhance Muscle Density</span>
  </div>
</div>
```

- [ ] **Step 4: Add featured products section (4-col grid, 4 real products)**

```html
<!-- FEATURED PRODUCTS -->
<section class="section section--white">
  <div class="section__header reveal">
    <h2 class="section__title">Featured Products</h2>
    <a href="all-products.html" class="section__link">View All →</a>
  </div>
  <div class="grid-4 reveal-stagger">
    <div class="product-card reveal">
      <div class="product-card__img"><div class="product-card__img-inner"></div><span class="product-card__badge">Best Seller</span></div>
      <div class="product-card__body">
        <div class="product-card__cat">Capsules</div>
        <div class="product-card__name">Blood Sugar Support</div>
        <div class="product-card__price-row"><span class="product-card__price">$34.99</span><span class="product-card__price-member">$27.99 members</span></div>
        <a href="product.html" class="btn btn--dark">Add to Cart</a>
      </div>
    </div>
    <div class="product-card reveal">
      <div class="product-card__img"><div class="product-card__img-inner"></div></div>
      <div class="product-card__body">
        <div class="product-card__cat">Powder</div>
        <div class="product-card__name">Pre-Workout Sour Apple</div>
        <div class="product-card__price-row"><span class="product-card__price">$44.99</span><span class="product-card__price-member">$35.99 members</span></div>
        <a href="product.html" class="btn btn--dark">Add to Cart</a>
      </div>
    </div>
    <div class="product-card reveal">
      <div class="product-card__img"><div class="product-card__img-inner"></div></div>
      <div class="product-card__body">
        <div class="product-card__cat">Gummies</div>
        <div class="product-card__name">Creatine (Tropical Punch)</div>
        <div class="product-card__price-row"><span class="product-card__price">$29.99</span><span class="product-card__price-member">$23.99 members</span></div>
        <a href="product.html" class="btn btn--dark">Add to Cart</a>
      </div>
    </div>
    <div class="product-card reveal">
      <div class="product-card__img"><div class="product-card__img-inner"></div></div>
      <div class="product-card__body">
        <div class="product-card__cat">Liquid</div>
        <div class="product-card__name">Trace Minerals+ Fulvic Acid</div>
        <div class="product-card__price-row"><span class="product-card__price">$39.99</span><span class="product-card__price-member">$31.99 members</span></div>
        <a href="product.html" class="btn btn--dark">Add to Cart</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Add value prop section**

```html
<!-- VALUE PROP -->
<section class="section section--navy">
  <div style="text-align:center;margin-bottom:36px;" class="reveal">
    <p class="section__eyebrow">Why Habito</p>
    <h2 class="section__title section__title--white">More value. No gimmicks.</h2>
    <p style="font-size:13px;color:rgba(255,255,255,0.45);margin-top:8px;font-style:italic;">"You pay for the product, not the marketing."</p>
  </div>
  <div class="grid-3 reveal-stagger">
    <div class="value-card reveal">
      <div class="value-card__dot"></div>
      <h3 class="value-card__title">Premium Clean Ingredients</h3>
      <p class="value-card__text">No fillers, no proprietary blends. Every label shows exactly what's inside.</p>
    </div>
    <div class="value-card reveal">
      <div class="value-card__dot"></div>
      <h3 class="value-card__title">Effective, Proven Results</h3>
      <p class="value-card__text">Clinically-studied ingredients dosed to make a real difference in your daily wellness.</p>
    </div>
    <div class="value-card reveal">
      <div class="value-card__dot"></div>
      <h3 class="value-card__title">Community Support</h3>
      <p class="value-card__text">Member pricing, free shipping, and priority access — because loyal customers deserve more.</p>
    </div>
  </div>
</section>
```

Add to page `<style>`:

```css
.value-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 24px; }
.value-card__dot { width: 8px; height: 8px; background: var(--red); border-radius: 50%; margin-bottom: 14px; }
.value-card__title { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--white); margin-bottom: 8px; }
.value-card__text { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.7; }
```

- [ ] **Step 6: Add Join CTA section**

```html
<!-- JOIN CTA -->
<section class="section section--red" style="text-align:center;">
  <div class="reveal">
    <p class="section__eyebrow section__eyebrow--muted">Limited Offer</p>
    <h2 class="section__title section__title--white">Sign up today.<br>Receive exclusive early-supporter gear.</h2>
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin:20px 0 8px;">
      <span style="font-size:18px;color:rgba(255,255,255,0.4);text-decoration:line-through;">$150</span>
      <span style="font-family:var(--font-display);font-weight:800;font-size:52px;color:var(--white);">$75</span>
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:28px;">One-time payment · Products + exclusive T-shirt + shaker bottle</p>
    <a href="join.html" class="btn btn--white">Join Now →</a>
    <div style="display:flex;gap:28px;justify-content:center;margin-top:28px;flex-wrap:wrap;">
      <span style="font-size:11px;color:rgba(255,255,255,0.75);">✓ Best Habito products</span>
      <span style="font-size:11px;color:rgba(255,255,255,0.75);">✓ Exclusive T-shirt</span>
      <span style="font-size:11px;color:rgba(255,255,255,0.75);">✓ Shaker bottle</span>
      <span style="font-size:11px;color:rgba(255,255,255,0.75);">✓ Free shipping always</span>
      <span style="font-size:11px;color:rgba(255,255,255,0.75);">✓ Member pricing forever</span>
    </div>
  </div>
</section>
```

- [ ] **Step 7: Add FAQ section**

```html
<!-- FAQ -->
<section class="section section--white">
  <div style="max-width:680px;margin:0 auto;">
    <div class="reveal" style="margin-bottom:32px;">
      <p class="section__eyebrow">FAQ</p>
      <h2 class="section__title">Got questions? We've got answers.</h2>
    </div>
    <div class="faq reveal">
      <div class="faq__item open">
        <div class="faq__question">How is Habito different?</div>
        <div class="faq__answer">We focus on premium, clean ingredients and effective, proven results — not marketing spend or celebrity endorsements. You pay for the product, not the packaging.</div>
      </div>
      <div class="faq__item">
        <div class="faq__question">Who are your products for?</div>
        <div class="faq__answer">Anyone seeking daily wellness improvements across varied health goals — from endurance and strength to blood sugar support and recovery.</div>
      </div>
      <div class="faq__item">
        <div class="faq__question">How should I choose the right product for me?</div>
        <div class="faq__answer">Match your personal wellness goals to specific product benefits. We offer capsules, gummies, liquid, and powder formats to fit any routine.</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 8: Open `index.html` in browser and verify all sections render correctly**

Expected: navbar (sticky, dark), hero (2-col, white text), marquee scrolling, 4 product cards, value prop (3 cards), red CTA, FAQ (accordion opens/closes).

- [ ] **Step 9: Commit**

```bash
git add index.html
git commit -m "feat: home page — all sections with real content"
```

---

## Task 8: Product Page (`product.html`)

**Files:**
- Create: `product.html`

- [ ] **Step 1: Create file with boilerplate + page-specific styles**

Set title to `Blood Sugar Support — Habito`. Add to `<style>`:

```css
.breadcrumb { background: var(--gray); border-bottom: 1px solid var(--border); padding: 10px 40px; display: flex; gap: 8px; font-size: 11px; color: var(--text-3); }
.breadcrumb a { color: var(--text-3); transition: color 0.2s; }
.breadcrumb a:hover { color: var(--text); }
.breadcrumb__sep { color: #CCC; }
.breadcrumb__current { color: var(--text); font-weight: 600; }
.product-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; padding: 48px 40px; background: var(--white); }
.gallery__main { background: #F2F2F2; border-radius: 8px; height: 340px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
.gallery__main-inner { width: 100px; height: 160px; background: linear-gradient(90deg,#ddd 25%,#e8e8e8 50%,#ddd 75%); background-size:200% 100%; border-radius: 6px; animation: shimmer 1.5s infinite; }
.gallery__thumbs { display: flex; gap: 8px; }
.gallery__thumb { width: 68px; height: 68px; background: #EBEBEB; border-radius: 6px; border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s; }
.gallery__thumb.active { border-color: var(--navy); }
.gallery__thumb:hover { border-color: var(--text-3); }
.prod-cat { font-size: 10px; font-weight: 700; color: var(--red); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 10px; }
.prod-name { font-family: var(--font-display); font-weight: 800; font-size: 30px; color: var(--text); line-height: 1.15; margin-bottom: 14px; }
.prod-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
.prod-stars { color: var(--red); font-size: 14px; }
.prod-rating-count { font-size: 12px; color: var(--text-3); }
.prod-price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px; }
.prod-price { font-family: var(--font-display); font-weight: 800; font-size: 30px; }
.prod-price-member { font-size: 12px; color: var(--text-3); }
.prod-member-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--navy); color: var(--white); font-size: 10px; font-weight: 600; letter-spacing: 1px; padding: 5px 12px; border-radius: var(--radius-btn); margin-bottom: 22px; }
.prod-member-badge span { color: var(--red); }
.prod-divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
.prod-option-label { font-size: 10px; font-weight: 700; color: var(--text); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
.format-btns { display: flex; gap: 10px; margin-bottom: 22px; }
.format-btn { padding: 9px 18px; border: 1.5px solid var(--border); border-radius: 4px; font-size: 12px; font-weight: 600; color: var(--text); cursor: pointer; transition: all 0.2s; }
.format-btn:hover { border-color: var(--navy); }
.format-btn.active { border-color: var(--navy); background: var(--navy); color: var(--white); }
.qty-row { display: flex; gap: 12px; align-items: center; margin-bottom: 18px; }
.qty-control { display: flex; align-items: center; border: 1.5px solid var(--border); border-radius: 4px; }
.qty-btn { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--text); cursor: pointer; user-select: none; }
.qty-val { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; border-left: 1.5px solid var(--border); border-right: 1.5px solid var(--border); }
.add-btn { flex: 1; background: var(--red); color: var(--white); height: 38px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s; }
.add-btn:hover { background: #b82424; }
.trust-row { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 20px; }
.trust-item { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--text-2); }
.prod-desc-label { font-size: 10px; font-weight: 700; color: var(--text); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
.prod-desc-text { font-size: 13px; color: var(--text-2); line-height: 1.75; }
.ingredients-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
.ing-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 18px; }
.ing-name { font-family: var(--font-display); font-weight: 700; font-size: 13px; margin-bottom: 4px; }
.ing-amount { font-size: 11px; color: var(--red); font-weight: 600; margin-bottom: 7px; }
.ing-desc { font-size: 11px; color: var(--text-3); line-height: 1.6; }
```

- [ ] **Step 2: Add breadcrumb + product detail section**

```html
<!-- BREADCRUMB -->
<div class="breadcrumb">
  <a href="index.html">Home</a><span class="breadcrumb__sep">/</span>
  <a href="all-products.html">Shop</a><span class="breadcrumb__sep">/</span>
  <a href="all-products.html?cat=capsules">Capsules</a><span class="breadcrumb__sep">/</span>
  <span class="breadcrumb__current">Blood Sugar Support</span>
</div>

<!-- PRODUCT DETAIL -->
<div class="product-detail">
  <!-- Gallery -->
  <div class="reveal">
    <div class="gallery__main"><div class="gallery__main-inner"></div></div>
    <div class="gallery__thumbs">
      <div class="gallery__thumb active"></div>
      <div class="gallery__thumb"></div>
      <div class="gallery__thumb"></div>
      <div class="gallery__thumb"></div>
    </div>
  </div>
  <!-- Info -->
  <div class="reveal" style="transition-delay:0.1s">
    <div class="prod-cat">Capsules</div>
    <div class="prod-name">Blood Sugar Support</div>
    <div class="prod-rating"><span class="prod-stars">★★★★★</span><span class="prod-rating-count">4.9 · 124 reviews</span></div>
    <div class="prod-price-row"><span class="prod-price">$34.99</span><span class="prod-price-member">or $27.99 for members</span></div>
    <div class="prod-member-badge">🔒 Save <span>20%</span> with membership</div>
    <hr class="prod-divider">
    <div class="prod-option-label">Format</div>
    <div class="format-btns">
      <div class="format-btn active">60 Capsules</div>
      <div class="format-btn">120 Capsules</div>
    </div>
    <div class="qty-row">
      <div class="qty-control">
        <div class="qty-btn">−</div><div class="qty-val">1</div><div class="qty-btn">+</div>
      </div>
      <div class="add-btn">Add to Cart</div>
    </div>
    <div class="trust-row">
      <div class="trust-item">🚚 Free shipping for members</div>
      <div class="trust-item">✅ 3rd-party tested</div>
      <div class="trust-item">↩️ 30-day returns</div>
    </div>
    <hr class="prod-divider">
    <div class="prod-desc-label">About this product</div>
    <div class="prod-desc-text">Formulated to support healthy glucose metabolism with clinically-studied ingredients. No fillers, no fluff — just what your body needs to maintain balanced blood sugar levels throughout the day.</div>
  </div>
</div>
```

- [ ] **Step 3: Add ingredients + related products sections**

```html
<!-- KEY INGREDIENTS -->
<section class="section section--gray">
  <h2 class="section__title reveal" style="margin-bottom:24px;">Key Ingredients</h2>
  <div class="ingredients-grid reveal-stagger">
    <div class="ing-card reveal"><div class="ing-name">Berberine HCl</div><div class="ing-amount">500mg per serving</div><div class="ing-desc">Clinically studied to support healthy glucose metabolism and insulin sensitivity.</div></div>
    <div class="ing-card reveal"><div class="ing-name">Chromium Picolinate</div><div class="ing-amount">200mcg per serving</div><div class="ing-desc">Essential trace mineral that enhances insulin action and supports carbohydrate metabolism.</div></div>
    <div class="ing-card reveal"><div class="ing-name">Cinnamon Extract</div><div class="ing-amount">300mg per serving</div><div class="ing-desc">Standardized extract shown to help maintain healthy blood sugar levels after meals.</div></div>
  </div>
</section>

<!-- RELATED PRODUCTS -->
<section class="section section--white">
  <div class="section__header reveal">
    <h2 class="section__title">You Might Also Like</h2>
    <a href="all-products.html" class="section__link">View All →</a>
  </div>
  <div class="grid-4 reveal-stagger">
    <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Capsules</div><div class="product-card__name">Brain Support</div><div class="product-card__price-row"><span class="product-card__price">$32.99</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
    <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Capsules</div><div class="product-card__name">Immune+</div><div class="product-card__price-row"><span class="product-card__price">$29.99</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
    <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Powder</div><div class="product-card__name">Multi Collagen Peptides</div><div class="product-card__price-row"><span class="product-card__price">$44.99</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
    <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Gummies</div><div class="product-card__name">Apple Cider Vinegar</div><div class="product-card__price-row"><span class="product-card__price">$27.99</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
  </div>
</section>
```

- [ ] **Step 4: Open `product.html` in browser and verify: breadcrumb, gallery, product info, ingredients, related grid**

- [ ] **Step 5: Commit**

```bash
git add product.html
git commit -m "feat: single product page"
```

---

## Task 9: All Products Page (`all-products.html`)

**Files:**
- Create: `all-products.html`

- [ ] **Step 1: Create file with boilerplate + page-specific styles**

Set title to `Shop All Products — Habito`. Add to `<style>`:

```css
.page-hero { background: var(--navy); padding: 40px 40px; display: flex; justify-content: space-between; align-items: flex-end; }
.page-hero__title { font-family: var(--font-display); font-weight: 800; font-size: 32px; color: var(--white); margin-bottom: 6px; }
.page-hero__sub { font-size: 13px; color: rgba(255,255,255,0.5); }
.page-hero__count { font-size: 12px; color: rgba(255,255,255,0.4); }
.catalog-body { display: grid; grid-template-columns: 210px 1fr; min-height: 600px; }
.sidebar { background: var(--gray); border-right: 1px solid var(--border); padding: 28px 20px; }
.filter-section { margin-bottom: 28px; }
.filter-title { font-size: 10px; font-weight: 700; color: var(--text); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
.filter-option { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer; }
.filter-checkbox { width: 15px; height: 15px; border: 1.5px solid #DCDCDC; border-radius: 2px; flex-shrink: 0; transition: all 0.15s; }
.filter-checkbox.checked { background: var(--navy); border-color: var(--navy); }
.filter-label { font-size: 12px; color: var(--text-2); }
.filter-count { font-size: 10px; color: #BBB; margin-left: auto; }
.catalog-main { padding: 24px 28px; background: var(--white); }
.catalog-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.filter-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--navy); color: var(--white); font-size: 10px; font-weight: 600; letter-spacing: 1px; padding: 4px 10px; border-radius: 20px; }
.sort-row { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-3); }
.sort-select { border: 1.5px solid var(--border); border-radius: 4px; padding: 6px 12px; font-size: 11px; color: var(--text); font-weight: 600; }
.cat-tabs { display: flex; gap: 0; margin-bottom: 24px; border: 1.5px solid var(--border); border-radius: 6px; overflow: hidden; width: fit-content; }
.cat-tab { padding: 8px 18px; font-size: 11px; font-weight: 600; color: var(--text-3); border-right: 1.5px solid var(--border); cursor: pointer; background: var(--white); transition: all 0.15s; }
.cat-tab:last-child { border-right: none; }
.cat-tab.active { background: var(--navy); color: var(--white); }
.cat-tab:hover:not(.active) { background: var(--gray); }
.catalog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.pagination { display: flex; justify-content: center; gap: 8px; padding: 28px 0; }
.page-btn { width: 34px; height: 34px; border: 1.5px solid var(--border); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.page-btn.active { background: var(--navy); color: var(--white); border-color: var(--navy); }
.page-btn:hover:not(.active) { border-color: var(--navy); }
```

- [ ] **Step 2: Add page hero + catalog layout with all 18 real products (show 6 in grid, rest implied by pagination)**

```html
<!-- PAGE HERO -->
<div class="page-hero reveal">
  <div>
    <div class="page-hero__title">All Products</div>
    <div class="page-hero__sub">Clean supplements. Real ingredients. No gimmicks.</div>
  </div>
  <div class="page-hero__count">18 products</div>
</div>

<!-- CATALOG -->
<div class="catalog-body">
  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="filter-section">
      <div class="filter-title">Category</div>
      <div class="filter-option"><div class="filter-checkbox checked"></div><span class="filter-label">All Products</span><span class="filter-count">18</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Capsules</span><span class="filter-count">11</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Gummies</span><span class="filter-count">2</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Liquid</span><span class="filter-count">2</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Powder</span><span class="filter-count">3</span></div>
    </div>
    <div class="filter-section">
      <div class="filter-title">Health Goal</div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Endurance</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Strength</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Recovery</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Focus</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Blood Sugar</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Immunity</span></div>
    </div>
    <div class="filter-section">
      <div class="filter-title">Price</div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">Under $30</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">$30 – $50</span></div>
      <div class="filter-option"><div class="filter-checkbox"></div><span class="filter-label">$50+</span></div>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="catalog-main">
    <div class="catalog-toolbar">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <span style="font-size:11px;color:var(--text-3);">Filters:</span>
        <div class="filter-chip">All Products ×</div>
      </div>
      <div class="sort-row">Sort by <select class="sort-select"><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
    </div>
    <div class="cat-tabs">
      <div class="cat-tab active">All</div>
      <div class="cat-tab">Capsules</div>
      <div class="cat-tab">Gummies</div>
      <div class="cat-tab">Liquid</div>
      <div class="cat-tab">Powder</div>
    </div>
    <div class="catalog-grid reveal-stagger">
      <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div><span class="product-card__badge">Best Seller</span></div><div class="product-card__body"><div class="product-card__cat">Capsules</div><div class="product-card__name">Blood Sugar Support</div><div class="product-card__price-row"><span class="product-card__price">$34.99</span><span class="product-card__price-member">$27.99 members</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
      <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Capsules</div><div class="product-card__name">Brain Support</div><div class="product-card__price-row"><span class="product-card__price">$32.99</span><span class="product-card__price-member">$26.39 members</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
      <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div><span class="product-card__badge">New</span></div><div class="product-card__body"><div class="product-card__cat">Capsules</div><div class="product-card__name">Natural Testo Boost</div><div class="product-card__price-row"><span class="product-card__price">$39.99</span><span class="product-card__price-member">$31.99 members</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
      <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Gummies</div><div class="product-card__name">Creatine (Tropical Punch)</div><div class="product-card__price-row"><span class="product-card__price">$29.99</span><span class="product-card__price-member">$23.99 members</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
      <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Powder</div><div class="product-card__name">Pre-Workout Sour Apple</div><div class="product-card__price-row"><span class="product-card__price">$44.99</span><span class="product-card__price-member">$35.99 members</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
      <div class="product-card reveal"><div class="product-card__img"><div class="product-card__img-inner"></div></div><div class="product-card__body"><div class="product-card__cat">Liquid</div><div class="product-card__name">Trace Minerals+ Fulvic Acid</div><div class="product-card__price-row"><span class="product-card__price">$37.99</span><span class="product-card__price-member">$30.39 members</span></div><a href="product.html" class="btn btn--dark">Add to Cart</a></div></div>
    </div>
    <div class="pagination">
      <div class="page-btn">←</div>
      <div class="page-btn active">1</div>
      <div class="page-btn">2</div>
      <div class="page-btn">3</div>
      <div class="page-btn">→</div>
    </div>
  </main>
</div>
```

- [ ] **Step 3: Open `all-products.html` in browser and verify sidebar, tabs, grid, pagination render correctly**

- [ ] **Step 4: Commit**

```bash
git add all-products.html
git commit -m "feat: all products catalog page with filters and real product names"
```

---

## Task 10: Join Page (`join.html`)

**Files:**
- Create: `join.html`

- [ ] **Step 1: Create file with boilerplate + page-specific styles**

Set title to `Join Habito — Exclusive Member Offer`. Add to `<style>`:

```css
.join-hero { background: var(--navy); padding: 68px 40px; text-align: center; }
.join-hero__title { font-family: var(--font-display); font-weight: 800; font-size: 40px; color: var(--white); line-height: 1.1; margin-bottom: 14px; }
.join-hero__sub { font-size: 13px; color: rgba(255,255,255,0.55); max-width: 480px; margin: 0 auto 28px; line-height: 1.7; }
.price-display { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 8px; }
.price-old { font-size: 20px; color: rgba(255,255,255,0.35); text-decoration: line-through; }
.price-new { font-family: var(--font-display); font-weight: 800; font-size: 56px; color: var(--white); line-height: 1; }
.price-note { font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 28px; }
.included-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 0; }
.included-card { border: 1.5px solid var(--border); border-radius: 8px; padding: 24px; display: flex; gap: 16px; align-items: flex-start; transition: border-color 0.2s, box-shadow 0.2s; }
.included-card:hover { border-color: var(--navy); box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
.included-icon { width: 42px; height: 42px; background: var(--navy); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.included-label { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--text); margin-bottom: 4px; }
.included-desc { font-size: 12px; color: var(--text-2); line-height: 1.6; }
.included-value { display: inline-block; margin-top: 8px; font-size: 10px; font-weight: 700; color: var(--red); letter-spacing: 1px; }
.sel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.sel-card { border: 1.5px solid var(--border); border-radius: var(--radius-card); overflow: hidden; cursor: pointer; transition: border-color 0.2s; }
.sel-card.selected { border-color: var(--navy); }
.sel-img { background: #EBEBEB; height: 90px; display: flex; align-items: center; justify-content: center; }
.sel-img-inner { width: 36px; height: 56px; background: #DCDCDC; border-radius: 3px; }
.sel-info { padding: 10px; }
.sel-name { font-family: var(--font-display); font-weight: 700; font-size: 11px; color: var(--text); margin-bottom: 3px; line-height: 1.3; }
.sel-type { font-size: 9px; color: var(--red); font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
.perks-list { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.perk-item { display: flex; gap: 12px; align-items: flex-start; }
.perk-dot { width: 8px; height: 8px; background: var(--red); border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.perk-label { font-family: var(--font-display); font-weight: 700; font-size: 13px; color: var(--white); margin-bottom: 3px; }
.perk-desc { font-size: 12px; color: rgba(255,255,255,0.6); line-height: 1.5; }
.form-wrap { max-width: 500px; margin: 0 auto; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.form-group { margin-bottom: 14px; }
.form-label { display: block; font-size: 10px; font-weight: 700; color: var(--text); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
.form-input { width: 100%; border: 1.5px solid var(--border); border-radius: 4px; padding: 12px 14px; font-size: 13px; color: var(--text); background: #FAFAFA; font-family: var(--font-body); transition: border-color 0.2s, background 0.2s; }
.form-input:focus { border-color: var(--navy); background: var(--white); outline: none; }
.form-divider { border: none; border-top: 1px solid var(--border); margin: 24px 0; }
.form-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.form-total-label { font-size: 14px; color: var(--text); font-weight: 600; }
.form-total-price { font-family: var(--font-display); font-weight: 800; font-size: 22px; color: var(--red); }
.form-note { font-size: 10px; color: var(--text-3); text-align: center; margin-top: 12px; line-height: 1.7; }
```

- [ ] **Step 2: Add join hero + what's included + product picker**

```html
<!-- HERO -->
<section class="join-hero">
  <div class="reveal">
    <p class="section__eyebrow">Limited Offer · One-Time Fee</p>
    <h1 class="join-hero__title">Get $150 in Supplements<br>for Only $75</h1>
    <p class="join-hero__sub">Join Habito once and unlock member pricing, free shipping, and an exclusive welcome kit — for life.</p>
    <div class="price-display"><span class="price-old">$150</span><span class="price-new">$75</span></div>
    <p class="price-note">One-time payment · No recurring fees · No subscriptions</p>
    <a href="#signup" class="btn btn--primary">Join Now →</a>
  </div>
</section>

<!-- WHAT'S INCLUDED -->
<section class="section section--white">
  <div class="reveal" style="margin-bottom:32px;">
    <p class="section__eyebrow">What's Included</p>
    <h2 class="section__title">Everything you get the day you join.</h2>
  </div>
  <div class="included-grid reveal-stagger">
    <div class="included-card reveal"><div class="included-icon">📦</div><div><div class="included-label">Best Habito Products</div><div class="included-desc">A curated collection of our best-selling supplements — yours to keep from day one.</div><div class="included-value">Core value</div></div></div>
    <div class="included-card reveal"><div class="included-icon">👕</div><div><div class="included-label">Exclusive T-Shirt</div><div class="included-desc">Early-supporter exclusive — a Habito branded tee, not available in the store.</div><div class="included-value">Exclusive item</div></div></div>
    <div class="included-card reveal"><div class="included-icon">🥤</div><div><div class="included-label">Shaker Bottle</div><div class="included-desc">Premium shaker bottle to mix your powders on the go.</div><div class="included-value">Exclusive item</div></div></div>
    <div class="included-card reveal"><div class="included-icon">🏷️</div><div><div class="included-label">Member Pricing + Free Shipping</div><div class="included-desc">Up to 20% off every order, forever. Free shipping always. No conditions.</div><div class="included-value">Ongoing benefit</div></div></div>
  </div>
</section>

<!-- MEMBERSHIP PERKS -->
<section class="section section--navy">
  <div class="reveal" style="margin-bottom:32px;">
    <h2 class="section__title section__title--white">Why members love Habito</h2>
  </div>
  <div class="perks-list reveal-stagger">
    <div class="perk-item reveal"><div class="perk-dot"></div><div><div class="perk-label">No recurring fees</div><div class="perk-desc">Pay once. That's it. No subscriptions, no surprises.</div></div></div>
    <div class="perk-item reveal"><div class="perk-dot"></div><div><div class="perk-label">Up to 20% off every order</div><div class="perk-desc">Member pricing applies to every product, forever.</div></div></div>
    <div class="perk-item reveal"><div class="perk-dot"></div><div><div class="perk-label">Free shipping on every order</div><div class="perk-desc">No minimums. No conditions. Always free.</div></div></div>
    <div class="perk-item reveal"><div class="perk-dot"></div><div><div class="perk-label">Priority access to new products</div><div class="perk-desc">Members hear about new launches first.</div></div></div>
  </div>
</section>
```

- [ ] **Step 3: Add sign-up form**

```html
<!-- SIGN UP FORM -->
<section class="section section--white" id="signup">
  <div class="form-wrap reveal">
    <div style="text-align:center;margin-bottom:28px;">
      <h2 class="section__title">Complete Your Enrollment</h2>
      <p class="section__sub">One-time payment · Secure checkout · Instant confirmation</p>
    </div>
    <div class="form-row-2">
      <div><label class="form-label">First Name</label><input class="form-input" type="text" placeholder="First name"></div>
      <div><label class="form-label">Last Name</label><input class="form-input" type="text" placeholder="Last name"></div>
    </div>
    <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" type="email" placeholder="email@example.com"></div>
    <div class="form-group"><label class="form-label">Phone Number</label><input class="form-input" type="tel" placeholder="+1 (555) 000-0000"></div>
    <div class="form-group"><label class="form-label">Shipping Address</label><input class="form-input" type="text" placeholder="123 Main Street, City, Country"></div>
    <hr class="form-divider">
    <div class="form-total"><span class="form-total-label">Total Today</span><span class="form-total-price">$75.00</span></div>
    <a href="#" class="btn btn--primary" style="width:100%;text-align:center;display:block;padding:15px;">Join Habito — $75</a>
    <p class="form-note">By joining you agree to our Terms of Service.<br>No recurring charges. Cancel anytime by contacting us.</p>
  </div>
</section>
```

- [ ] **Step 4: Open `join.html` in browser and verify all sections + form inputs focus state**

- [ ] **Step 5: Commit**

```bash
git add join.html
git commit -m "feat: join membership enrollment page"
```

---

## Task 11: About Page (`about.html`)

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create file with boilerplate + page styles**

Set title to `About Habito — More Value. No Gimmicks.` Add to `<style>`:

```css
.about-hero { background: var(--navy); padding: 80px 40px; text-align: center; }
.about-hero__title { font-family: var(--font-display); font-weight: 800; font-size: 44px; color: var(--white); line-height: 1.1; margin-bottom: 16px; }
.mission-section { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding: 64px 40px; background: var(--white); }
.mission-text p { font-size: 14px; color: var(--text-2); line-height: 1.8; margin-bottom: 14px; }
.mission-visual { background: var(--gray); border-radius: 10px; height: 280px; display: flex; align-items: center; justify-content: center; }
.mission-visual-inner { width: 120px; height: 120px; background: linear-gradient(90deg,#ddd 25%,#e8e8e8 50%,#ddd 75%); background-size:200% 100%; border-radius: 50%; animation: shimmer 1.5s infinite; }
.values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.value-card { background: var(--white); border: 1px solid var(--border); border-radius: 8px; padding: 24px 20px; text-align: center; transition: box-shadow 0.2s, transform 0.2s; }
.value-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
.value-accent { display: block; width: 24px; height: 3px; background: var(--red); margin: 0 auto 14px; border-radius: 2px; }
.value-name { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--text); margin-bottom: 8px; }
.value-desc { font-size: 12px; color: var(--text-3); line-height: 1.7; }
.story-section { background: var(--navy); padding: 64px 40px; }
.story-body { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 28px; }
.story-text { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.8; }
.story-quote { border-left: 3px solid var(--red); padding-left: 20px; margin-top: 28px; }
.story-quote-text { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: var(--white); line-height: 1.4; font-style: italic; }
.story-quote-author { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 8px; letter-spacing: 1px; }
.commitments-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 680px; margin: 0 auto; }
.commitment-card { display: flex; gap: 16px; align-items: flex-start; padding: 22px; border: 1.5px solid var(--border); border-radius: 8px; transition: border-color 0.2s; }
.commitment-card:hover { border-color: var(--navy); }
.commitment-num { font-family: var(--font-display); font-weight: 800; font-size: 26px; color: var(--red); line-height: 1; flex-shrink: 0; width: 34px; }
.commitment-name { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--text); margin-bottom: 4px; }
.commitment-desc { font-size: 12px; color: var(--text-3); line-height: 1.6; }
```

- [ ] **Step 2: Build all about page sections**

```html
<!-- HERO -->
<section class="about-hero">
  <div class="reveal">
    <p class="section__eyebrow">Our Story</p>
    <h1 class="about-hero__title">More Value.<br>No Gimmicks.</h1>
    <p class="section__sub section__sub--white" style="max-width:520px;margin:0 auto;">We built Habito because we were tired of paying for marketing, celebrity endorsements, and flashy packaging. Every dollar goes into what actually matters — the ingredients.</p>
  </div>
</section>

<!-- MISSION -->
<div class="mission-section">
  <div class="mission-text reveal">
    <p class="section__eyebrow">Our Mission</p>
    <h2 class="section__title" style="margin-bottom:20px;">You pay for the product, not the marketing.</h2>
    <p>At Habito, we believe premium supplements shouldn't come with a premium marketing budget. We source clean, effective ingredients and pass the savings directly to you.</p>
    <p>No gimmicks. No inflated prices. Just real products that do what they say.</p>
  </div>
  <div class="mission-visual reveal" style="transition-delay:0.15s"><div class="mission-visual-inner"></div></div>
</div>

<!-- VALUES -->
<section class="section section--gray">
  <h2 class="section__title reveal" style="text-align:center;margin-bottom:32px;">What We Stand For</h2>
  <div class="values-grid reveal-stagger">
    <div class="value-card reveal"><span class="value-accent"></span><div class="value-name">Clean Ingredients</div><div class="value-desc">No fillers, no proprietary blends. Every ingredient is listed, dosed, and purposeful.</div></div>
    <div class="value-card reveal"><span class="value-accent"></span><div class="value-name">Pure Performance</div><div class="value-desc">Formulated to support real wellness goals — endurance, strength, recovery, and more.</div></div>
    <div class="value-card reveal"><span class="value-accent"></span><div class="value-name">Real Results</div><div class="value-desc">Backed by science, not hype. We only use ingredients with proven, meaningful efficacy.</div></div>
    <div class="value-card reveal"><span class="value-accent"></span><div class="value-name">No Gimmicks</div><div class="value-desc">No influencers, no celebrity deals, no overpriced packaging. Just honest supplements.</div></div>
  </div>
</section>

<!-- STORY -->
<section class="story-section">
  <div class="reveal">
    <p class="section__eyebrow">The Habito Story</p>
    <h2 class="section__title section__title--white" style="max-width:540px;">Built for people who want more from their supplements.</h2>
  </div>
  <div class="story-body">
    <div class="story-text reveal">We started Habito in Saint George, Utah with a simple idea: the supplement industry charges too much for too little. Marketing budgets eat into ingredient quality. Flashy labels replace real science.<br><br>So we flipped the model. We invest in sourcing, formulation, and quality — and we keep our margins honest so you get real value every time you order.</div>
    <div class="reveal" style="transition-delay:0.1s">
      <div class="story-text">Our catalog covers the full range of daily wellness — from blood sugar support and immune defense to pre-workout performance and collagen recovery. Every product is built with the same commitment: clean, effective, and worth every dollar.</div>
      <div class="story-quote">
        <div class="story-quote-text">"Choose Better. Live Greater."</div>
        <div class="story-quote-author">— Habito, LLC · Saint George, UT</div>
      </div>
    </div>
  </div>
</section>

<!-- COMMITMENTS -->
<section class="section section--white">
  <h2 class="section__title reveal" style="text-align:center;margin-bottom:28px;">Our Commitments</h2>
  <div class="commitments-grid reveal-stagger">
    <div class="commitment-card reveal"><div class="commitment-num">01</div><div><div class="commitment-name">Ingredient Transparency</div><div class="commitment-desc">Full label disclosure on every product. No hidden blends, ever.</div></div></div>
    <div class="commitment-card reveal"><div class="commitment-num">02</div><div><div class="commitment-name">Community First</div><div class="commitment-desc">Member pricing and free shipping — because loyal customers deserve better.</div></div></div>
    <div class="commitment-card reveal"><div class="commitment-num">03</div><div><div class="commitment-name">Honest Pricing</div><div class="commitment-desc">You pay for the product. Not the celebrity, not the packaging.</div></div></div>
    <div class="commitment-card reveal"><div class="commitment-num">04</div><div><div class="commitment-name">Quality Sourcing</div><div class="commitment-desc">Premium raw materials, carefully selected and quality verified.</div></div></div>
  </div>
</section>

<!-- CTA -->
<section class="section section--red" style="text-align:center;">
  <div class="reveal">
    <h2 class="section__title section__title--white">Ready to Choose Better?</h2>
    <p style="font-size:13px;color:rgba(255,255,255,0.8);margin:12px 0 28px;">Join Habito today and get over $150 in supplements for just $75.</p>
    <a href="join.html" class="btn btn--white">Join Now →</a>
  </div>
</section>
```

- [ ] **Step 3: Open `about.html` in browser and verify all sections, hover effects on cards**

- [ ] **Step 4: Commit**

```bash
git add about.html
git commit -m "feat: about page — brand story, values, commitments"
```

---

## Task 12: Contact Page (`contact.html`)

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create file with boilerplate + page styles**

Set title to `Contact Habito — We're Here to Help`. Add to `<style>`:

```css
.contact-hero { background: var(--navy); padding: 56px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.contact-hero__title { font-family: var(--font-display); font-weight: 800; font-size: 36px; color: var(--white); line-height: 1.15; margin-bottom: 14px; }
.contact-hero__sub { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.7; }
.info-cards { display: flex; flex-direction: column; gap: 12px; }
.info-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 18px 20px; display: flex; gap: 14px; align-items: flex-start; }
.info-icon { font-size: 20px; flex-shrink: 0; }
.info-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.4); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
.info-value { font-size: 13px; color: var(--white); font-weight: 500; line-height: 1.5; }
.contact-body { background: var(--white); padding: 56px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; }
.contact-form__title { font-family: var(--font-display); font-weight: 800; font-size: 22px; color: var(--text); margin-bottom: 6px; }
.contact-form__sub { font-size: 12px; color: var(--text-3); margin-bottom: 28px; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.form-group { margin-bottom: 14px; }
.form-label { display: block; font-size: 10px; font-weight: 700; color: var(--text); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
.form-input, .form-select, .form-textarea { width: 100%; border: 1.5px solid var(--border); border-radius: 4px; padding: 12px 14px; font-size: 13px; color: var(--text); background: #FAFAFA; font-family: var(--font-body); transition: border-color 0.2s, background 0.2s; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--navy); background: var(--white); outline: none; }
.form-textarea { height: 120px; resize: none; }
.form-note { font-size: 10px; color: var(--text-3); margin-top: 10px; }
.faq-sidebar__title { font-family: var(--font-display); font-weight: 800; font-size: 22px; color: var(--text); margin-bottom: 6px; }
.faq-sidebar__sub { font-size: 12px; color: var(--text-3); margin-bottom: 24px; }
.map-strip { background: var(--gray); border-top: 1px solid var(--border); height: 180px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; }
.map-strip__pin { font-size: 28px; }
.map-strip__address { font-size: 13px; font-weight: 600; color: var(--text); }
.map-strip__note { font-size: 11px; color: var(--text-3); }
```

- [ ] **Step 2: Build contact page sections**

```html
<!-- HERO -->
<section class="contact-hero">
  <div class="reveal">
    <p class="section__eyebrow">Get in Touch</p>
    <h1 class="contact-hero__title">We're here to help.</h1>
    <p class="contact-hero__sub">Have a question about your order, membership, or products? Reach out and we'll get back to you as soon as possible.</p>
  </div>
  <div class="info-cards reveal" style="transition-delay:0.12s">
    <div class="info-card"><div class="info-icon">📍</div><div><div class="info-label">Location</div><div class="info-value">1996 E 2540 S<br>Saint George, UT 84790</div></div></div>
    <div class="info-card"><div class="info-icon">✉️</div><div><div class="info-label">Email</div><div class="info-value">hello@habitolife.com</div></div></div>
    <div class="info-card"><div class="info-icon">🕐</div><div><div class="info-label">Response Time</div><div class="info-value">We typically reply within 1–2 business days.</div></div></div>
  </div>
</section>

<!-- FORM + FAQ -->
<div class="contact-body">
  <!-- FORM -->
  <div class="reveal">
    <div class="contact-form__title">Send us a message</div>
    <div class="contact-form__sub">Fill out the form and we'll get back to you shortly.</div>
    <div class="form-row-2">
      <div><label class="form-label">First Name</label><input class="form-input" type="text" placeholder="First name"></div>
      <div><label class="form-label">Last Name</label><input class="form-input" type="text" placeholder="Last name"></div>
    </div>
    <div class="form-group"><label class="form-label">Email Address</label><input class="form-input" type="email" placeholder="your@email.com"></div>
    <div class="form-group"><label class="form-label">Topic</label><select class="form-select"><option value="">Select a topic</option><option>Order Issue</option><option>Membership</option><option>Product Question</option><option>Shipping</option><option>Returns</option><option>Other</option></select></div>
    <div class="form-group"><label class="form-label">Order Number (optional)</label><input class="form-input" type="text" placeholder="#HAB-00000"></div>
    <div class="form-group"><label class="form-label">Message</label><textarea class="form-textarea" placeholder="Write your message here..."></textarea></div>
    <a href="#" class="btn btn--primary" style="width:100%;text-align:center;display:block;padding:14px;">Send Message</a>
    <p class="form-note">We'll never share your information with third parties.</p>
  </div>

  <!-- FAQ -->
  <div class="reveal" style="transition-delay:0.1s">
    <div class="faq-sidebar__title">Got questions?</div>
    <div class="faq-sidebar__sub">We've got answers.</div>
    <div class="faq">
      <div class="faq__item open"><div class="faq__question">How is Habito different?</div><div class="faq__answer">We focus on premium, clean ingredients and effective, proven results — not marketing spend or celebrity endorsements. You pay for the product, not the packaging.</div></div>
      <div class="faq__item"><div class="faq__question">Who are your products for?</div><div class="faq__answer">Anyone seeking daily wellness improvements across varied health goals — from endurance and strength to blood sugar support and recovery.</div></div>
      <div class="faq__item"><div class="faq__question">How should I choose the right product for me?</div><div class="faq__answer">Match your personal wellness goals to specific product benefits. We offer capsules, gummies, liquid, and powder formats to fit any routine.</div></div>
      <div class="faq__item"><div class="faq__question">What's included in the membership offer?</div><div class="faq__answer">A collection of our best products, an exclusive early-supporter T-shirt and shaker bottle — over $150 in value for just $75. One-time payment, no recurring fees.</div></div>
      <div class="faq__item"><div class="faq__question">Where do you ship?</div><div class="faq__answer">We ship to Colombia and the United States. Members always receive free shipping on every order.</div></div>
    </div>
  </div>
</div>

<!-- MAP -->
<div class="map-strip">
  <div class="map-strip__pin">📍</div>
  <div class="map-strip__address">1996 E 2540 S, Saint George, UT 84790</div>
  <div class="map-strip__note">Embed Google Maps in Webflow via the Map element</div>
</div>
```

- [ ] **Step 3: Open `contact.html` in browser and verify layout, FAQ accordion, form focus states**

- [ ] **Step 4: Commit**

```bash
git add contact.html
git commit -m "feat: contact page — form, FAQ sidebar, map placeholder"
```

---

## Task 13: Responsive Styles

**Files:**
- Modify: `styles/main.css` (append)

- [ ] **Step 1: Add tablet breakpoint (≤ 900px)**

```css
/* =============================================
   RESPONSIVE — TABLET (≤ 900px)
   ============================================= */
@media (max-width: 900px) {
  :root { --section-pad: 40px 24px; }

  .navbar { padding: 0 24px; }
  .navbar__links { gap: 18px; }
  .navbar__icons { display: none; }

  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }

  /* Home hero */
  .hero { grid-template-columns: 1fr; padding: 52px 24px; }
  .hero__images { display: none; }
  .hero__headline { font-size: 36px; }

  /* Product detail */
  .product-detail { grid-template-columns: 1fr; padding: 32px 24px; }

  /* Catalog */
  .catalog-body { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .catalog-grid { grid-template-columns: repeat(2, 1fr); }

  /* Join */
  .included-grid { grid-template-columns: 1fr; }
  .sel-grid { grid-template-columns: repeat(3, 1fr); }
  .perks-list { grid-template-columns: 1fr; }

  /* About */
  .mission-section { grid-template-columns: 1fr; }
  .mission-visual { display: none; }
  .story-body { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .commitments-grid { grid-template-columns: 1fr; max-width: 100%; }

  /* Contact */
  .contact-hero { grid-template-columns: 1fr; }
  .contact-body { grid-template-columns: 1fr; }

  /* Footer */
  .footer__grid { grid-template-columns: 1fr 1fr; gap: 24px; }
}
```

- [ ] **Step 2: Add mobile breakpoint (≤ 600px)**

```css
/* =============================================
   RESPONSIVE — MOBILE (≤ 600px)
   ============================================= */
@media (max-width: 600px) {
  :root { --section-pad: 32px 16px; }

  .navbar { padding: 0 16px; height: 56px; }
  .navbar__links { display: none; }

  /* Mobile nav hint — links hidden, only logo + cta visible */
  .navbar__cta { display: flex; }

  .hero { padding: 40px 16px; }
  .hero__headline { font-size: 30px; }
  .hero__btns { flex-direction: column; align-items: flex-start; gap: 12px; }

  .grid-4,
  .grid-3,
  .grid-2 { grid-template-columns: 1fr; }

  .catalog-grid { grid-template-columns: 1fr; }
  .sel-grid { grid-template-columns: repeat(2, 1fr); }

  .join-hero__title { font-size: 28px; }
  .price-new { font-size: 40px; }

  .about-hero__title { font-size: 30px; }
  .contact-hero__title { font-size: 26px; }

  .footer__grid { grid-template-columns: 1fr; }
  .footer__bottom { flex-direction: column; gap: 6px; text-align: center; }

  .faq__question { font-size: 13px; }

  .form-row-2 { grid-template-columns: 1fr; }

  .section__title { font-size: 22px; }
  .ingredients-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Test all 6 pages at 375px, 768px, 1200px widths using browser DevTools**

Expected at 375px: single column, no navbar links (just logo + CTA), readable text, no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add styles/main.css
git commit -m "feat: responsive styles — tablet and mobile breakpoints"
```

---

## Task 14: Netlify Config + Final Checks

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create `netlify.toml`**

```toml
[[redirects]]
  from = "/home"
  to = "/"
  status = 301

[[redirects]]
  from = "/shop"
  to = "/all-products"
  status = 301
```

- [ ] **Step 2: Verify all inter-page links work**

Open each file and click every link. Expected:
- Navbar "Shop ▾" → `all-products.html`
- Navbar "Join" → `join.html`
- Navbar "About" → `about.html`
- Navbar "Contact" → `contact.html`
- Footer links → correct pages
- "View All →" on home → `all-products.html`
- Product cards → `product.html`
- "Join Now →" CTA → `join.html`
- Breadcrumb on product page → back to correct pages

- [ ] **Step 3: Verify animations work on all pages**

Open each page, scroll slowly. Expected:
- Sections fade up as they enter viewport
- Marquee scrolls continuously on home
- FAQ accordion opens/closes
- Navbar gains shadow after scrolling past top
- Product cards lift on hover
- Buttons darken on hover
- Form inputs show navy border on focus

- [ ] **Step 4: Final commit**

```bash
git add netlify.toml
git add -A
git commit -m "feat: netlify config, verified all links and animations"
```

- [ ] **Step 5: Deploy to Netlify for client presentation**

```
1. Go to https://app.netlify.com/drop
2. Drag the entire `habitolife-redesign` folder onto the drop zone
3. Copy the generated URL (e.g. https://random-name.netlify.app)
4. Share with client
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| 6 HTML pages | Tasks 7–12 |
| Shared CSS design system | Tasks 1–4 |
| Shared JS animations | Task 5 |
| Navy/Red/White color palette | Task 1 (CSS vars) |
| Plus Jakarta Sans + Inter | Task 1 (Google Fonts) |
| Sticky navbar with scroll shadow | Tasks 2, 5 |
| Marquee benefits bar (all 13 labels) | Task 7 step 3 |
| Scroll fade-in reveals | Tasks 4, 5 |
| Product card hover lift | Task 3 |
| Button hover darken | Task 3 |
| Form input focus transition | Tasks 10, 12 |
| Shimmer on image placeholders | Tasks 3, 8 |
| FAQ accordion (JS) | Tasks 4, 5 |
| Real Habito content throughout | Tasks 7–12 |
| All 18 real product names | Tasks 7, 9 |
| Real FAQ questions | Tasks 7, 12 |
| Real address + FDA disclaimer | Footer boilerplate (Task 6) |
| Join offer: products + T-shirt + shaker | Task 10 |
| Responsive (mobile, tablet, desktop) | Task 13 |
| Netlify deployable | Task 14 |
