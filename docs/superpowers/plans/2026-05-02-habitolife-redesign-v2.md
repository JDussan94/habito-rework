# Habitolife Redesign v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all 6 HTML pages, shared CSS, and JS to implement the v2 full dark mode design with GSAP + ScrollTrigger animations, replacing the v1 light-mode IntersectionObserver implementation.

**Architecture:** `styles/main.css` defines all CSS custom properties, dark-mode base, and every shared component (navbar, footer, buttons, product cards, marquee, FAQ, forms). `js/main.js` orchestrates all GSAP animations via ScrollTrigger (hero entrance, scroll stagger reveals, card hover), navbar ghost→frosted glass via `classList`, and FAQ accordion. Each HTML page links to both files via `<link>` and `<script>` tags; minimal inline `<style>` only for page-unique layout not present in main.css.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, keyframe animations), GSAP 3.12.5 + ScrollTrigger (CDN), Google Fonts (Plus Jakarta Sans + Inter), no build step, deployable via Netlify Drop.

**Spec:** `docs/superpowers/specs/2026-05-01-habitolife-redesign-v2-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `styles/main.css` | Rewrite | All design tokens, dark base, every shared component |
| `js/main.js` | Rewrite | GSAP animations, navbar scroll, FAQ accordion, picker cards |
| `index.html` | Rewrite | Home — 8 sections |
| `product.html` | Rewrite | Single product — breadcrumb, detail, ingredients, related |
| `all-products.html` | Rewrite | Catalog — category tabs, sidebar filters, product grid, pagination |
| `join.html` | Rewrite | Join — offer hero, what's included, product picker, signup form |
| `about.html` | Rewrite | Brand story — mission, values, narrative, commitments, join CTA |
| `contact.html` | Rewrite | Contact form + FAQ sidebar |
| `netlify.toml` | Keep | Clean URL redirects — no changes needed |

---

## Task 1: Design System — `styles/main.css`

**Files:**
- Rewrite: `styles/main.css`

- [ ] **Step 1: Rewrite `styles/main.css` with complete v2 design system**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

/* ==============================================
   HABITO V2 — DESIGN SYSTEM
   ============================================== */

/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
button, input, select, textarea { font: inherit; background: none; border: none; outline: none; }
button { cursor: pointer; }

/* --- CSS Variables --- */
:root {
  --dark-base: #1C1F29;
  --dark-lift: #22252F;
  --dark-card: rgba(255,255,255,0.03);
  --red: #D42F2F;
  --red-glow: rgba(212,47,47,0.15);
  --white: #FFFFFF;
  --text-muted: rgba(255,255,255,0.45);
  --text-ghost: rgba(255,255,255,0.2);
  --border: rgba(255,255,255,0.08);
  --border-active: #D42F2F;
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --max-w: 1200px;
  --radius-card: 4px;
  --radius-btn: 2px;
}

/* --- Base --- */
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  color: var(--white);
  background: var(--dark-base);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ==============================================
   LAYOUT UTILITIES
   ============================================== */

.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 40px;
}

.section { padding: 80px 0; }
.section--base { background: var(--dark-base); }
.section--lift { background: var(--dark-lift); }
.section--red { background: var(--red); }

.section--texture {
  background-image:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 36px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 36px);
}

.section__header { margin-bottom: 48px; }
.section__header--flex {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
}

/* ==============================================
   TYPOGRAPHY
   ============================================== */

.eyebrow {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--red);
  margin-bottom: 12px;
  display: block;
}

h1 { font-family: var(--font-display); font-weight: 800; line-height: 1.05; color: var(--white); }
h2 { font-family: var(--font-display); font-weight: 800; line-height: 1.1; color: var(--white); }
h3 { font-family: var(--font-display); font-weight: 700; color: var(--white); }

/* ==============================================
   NAVBAR
   ============================================== */

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
}

.navbar.scrolled {
  background: rgba(28,31,41,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: rgba(255,255,255,0.06);
}

.navbar__logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 16px;
  color: var(--white);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navbar__links a:not(.btn--primary) {
  font-family: var(--font-body);
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  transition: color 0.2s ease;
}
.navbar__links a:not(.btn--primary):hover { color: var(--white); }

.navbar__cta { font-size: 9px !important; padding: 9px 18px !important; }

.navbar__icons {
  display: flex;
  align-items: center;
  gap: 20px;
}
.navbar__icons a {
  color: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}
.navbar__icons a:hover { color: var(--white); }

/* ==============================================
   BUTTONS
   ============================================== */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: var(--radius-btn);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
}

.btn--primary { background: var(--red); color: var(--white); padding: 12px 24px; }
.btn--primary:hover { background: #b82424; }

.btn--ghost { color: var(--white); border-bottom: 1px solid rgba(255,255,255,0.3); border-radius: 0; padding-bottom: 2px; }
.btn--ghost:hover { border-bottom-color: var(--white); }

.btn--outline { border: 1px solid rgba(255,255,255,0.15); color: var(--white); padding: 10px 20px; }
.btn--outline:hover { border-color: rgba(255,255,255,0.4); }

.btn--white { background: #fff; color: var(--red); padding: 14px 32px; font-size: 11px; }
.btn--white:hover { background: rgba(255,255,255,0.9); }

/* ==============================================
   PRODUCT CARDS
   ============================================== */

.product-card {
  background: var(--dark-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  will-change: transform;
  transition: border-color 0.2s ease;
}
.product-card:hover { border-color: rgba(255,255,255,0.15); }

.product-card__image-wrap {
  position: relative;
  padding: 32px 24px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 160px;
}
.product-card__image-wrap::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60px;
  background: radial-gradient(ellipse, var(--red-glow) 0%, transparent 70%);
  pointer-events: none;
}
.product-card img {
  width: 90px;
  height: 130px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}

.product-card__body {
  padding: 16px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.product-card__category {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--red);
  margin-bottom: 4px;
}
.product-card__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  color: var(--white);
  margin-bottom: 12px;
  line-height: 1.3;
}
.product-card__footer { display: flex; align-items: center; justify-content: space-between; }
.product-card__price {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 14px;
  color: var(--white);
}
.product-card__add {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.2s ease;
}
.product-card:hover .product-card__add { color: var(--white); }

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.products-grid--3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* ==============================================
   BENEFITS MARQUEE
   ============================================== */

.marquee { background: var(--red); overflow: hidden; padding: 14px 0; }
.marquee__track {
  display: inline-flex;
  white-space: nowrap;
  animation: marquee-scroll 40s linear infinite;
}
.marquee__sep {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: rgba(255,255,255,0.4);
  border-radius: 50%;
  margin: 0 20px;
  vertical-align: middle;
}
.marquee__label {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: rgba(255,255,255,0.9);
  vertical-align: middle;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ==============================================
   VALUE CARDS (Home + About)
   ============================================== */

.value-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }

.value-card { padding: 4px 0 0; }
.value-card__dot { width: 6px; height: 6px; background: var(--red); border-radius: 50%; margin-bottom: 16px; }
.value-card__title { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--white); margin-bottom: 8px; }
.value-card__text { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

/* ==============================================
   FAQ ACCORDION
   ============================================== */

.faq__item { border-bottom: 1px solid var(--border); }
.faq__question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
  color: var(--white);
  cursor: pointer;
  text-align: left;
  gap: 16px;
}
.faq__icon { color: var(--red); font-size: 22px; line-height: 1; transition: transform 0.3s ease; flex-shrink: 0; }
.faq__item.open .faq__icon { transform: rotate(45deg); }
.faq__answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
.faq__item.open .faq__answer { max-height: 300px; }
.faq__answer p { padding-bottom: 20px; font-size: 13px; color: var(--text-muted); line-height: 1.75; }

/* ==============================================
   FOOTER
   ============================================== */

.footer { background: var(--dark-base); padding: 60px 0 32px; border-top: 1px solid var(--border); }
.footer__grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
.footer__brand { font-family: var(--font-display); font-weight: 800; font-size: 14px; color: var(--white); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px; }
.footer__tagline { font-size: 12px; color: var(--text-ghost); line-height: 1.65; max-width: 200px; }
.footer__col-label { font-family: var(--font-body); font-weight: 700; font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-ghost); margin-bottom: 16px; }
.footer__links { display: flex; flex-direction: column; gap: 10px; }
.footer__links a { font-size: 12px; color: var(--text-muted); transition: color 0.2s ease; }
.footer__links a:hover { color: var(--white); }
.footer__bottom { border-top: 1px solid var(--border); padding-top: 24px; display: flex; flex-direction: column; gap: 8px; }
.footer__fda { font-size: 10px; color: var(--text-ghost); line-height: 1.65; max-width: 800px; }
.footer__copy { font-size: 11px; color: var(--text-ghost); }
.footer--slim { padding: 24px 0; }
.footer--slim .footer__bottom { border-top: none; padding-top: 0; }

/* ==============================================
   INGREDIENT CARDS (Product Page)
   ============================================== */

.ingredients-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--border); border-radius: var(--radius-card); overflow: hidden; }
.ingredient-card { padding: 28px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.ingredient-card:nth-child(3n) { border-right: none; }
.ingredient-card:nth-last-child(-n+3) { border-bottom: none; }
.ingredient-card__name { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--white); margin-bottom: 4px; }
.ingredient-card__dosage { font-family: var(--font-body); font-weight: 700; font-size: 12px; color: var(--red); margin-bottom: 8px; }
.ingredient-card__benefit { font-size: 12px; color: var(--text-muted); line-height: 1.65; }

/* ==============================================
   PRODUCT DETAIL (product.html)
   ============================================== */

.product-detail__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }

.product-detail__media {}
.product-detail__main-image {
  position: relative;
  background: var(--dark-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 360px;
}
.product-detail__main-image::after {
  content: '';
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 80px;
  background: radial-gradient(ellipse, var(--red-glow) 0%, transparent 70%);
  pointer-events: none;
}
.product-detail__main-image img {
  width: 160px;
  height: 240px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}
.product-detail__thumbnails { display: flex; gap: 8px; margin-top: 12px; }
.product-detail__thumb {
  width: 64px;
  height: 64px;
  background: var(--dark-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-detail__thumb.active,
.product-detail__thumb:hover { border-color: var(--red); }
.product-detail__thumb img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }

.product-detail__info { display: flex; flex-direction: column; gap: 20px; }
.product-detail__name { font-family: var(--font-display); font-weight: 800; font-size: 32px; color: var(--white); line-height: 1.1; }

.product-detail__rating { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-muted); }
.product-detail__stars { color: #f5a623; letter-spacing: 1px; }

.product-detail__price-row { display: flex; align-items: center; gap: 12px; }
.product-detail__price-member { font-family: var(--font-display); font-weight: 700; font-size: 24px; color: var(--white); }
.product-detail__price-retail { font-size: 15px; color: var(--text-ghost); text-decoration: line-through; }
.price-badge { background: var(--red); color: var(--white); font-family: var(--font-body); font-weight: 700; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; padding: 3px 8px; border-radius: 2px; }

.product-detail__format-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.format-selector { display: flex; gap: 8px; }
.format-btn { border: 1px solid var(--border); color: var(--text-muted); padding: 8px 16px; border-radius: var(--radius-card); font-size: 12px; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; }
.format-btn.active { border-color: var(--red); color: var(--white); }

.qty-control { display: flex; align-items: center; border: 1px solid var(--border); border-radius: var(--radius-card); width: fit-content; }
.qty-control button { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--text-muted); transition: color 0.2s ease; }
.qty-control button:hover { color: var(--white); }
.qty-control__value { min-width: 40px; text-align: center; font-family: var(--font-display); font-weight: 600; font-size: 15px; color: var(--white); padding: 0 8px; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }

.trust-badges { display: flex; gap: 16px; }
.trust-badge { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted); }

.product-detail__desc { font-size: 13px; color: var(--text-muted); line-height: 1.75; }

/* ==============================================
   BREADCRUMB
   ============================================== */

.breadcrumb { background: var(--dark-base); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 14px 0; }
.breadcrumb__list { display: flex; align-items: center; gap: 8px; }
.breadcrumb__item { font-size: 12px; color: var(--text-ghost); }
.breadcrumb__item a { transition: color 0.2s ease; }
.breadcrumb__item a:hover { color: var(--white); }
.breadcrumb__sep { color: var(--text-ghost); font-size: 10px; }
.breadcrumb__item--active { color: var(--text-muted); }

/* ==============================================
   CATALOG PAGE (all-products.html)
   ============================================== */

.catalog-hero { padding: 56px 0; }
.catalog-hero__count { font-size: 12px; color: var(--text-ghost); margin-top: 12px; }

.category-tabs { background: var(--dark-base); border-bottom: 1px solid var(--border); position: sticky; top: 60px; z-index: 90; }
.category-tabs__list { display: flex; }
.category-tabs__btn { padding: 16px 20px; font-family: var(--font-body); font-size: 12px; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s ease, border-color 0.2s ease; white-space: nowrap; }
.category-tabs__btn:hover { color: var(--white); }
.category-tabs__btn.active { color: var(--white); border-bottom-color: var(--red); }

.catalog-body { background: var(--dark-lift); padding: 40px 0; }
.catalog-layout { display: grid; grid-template-columns: 220px 1fr; gap: 28px; }

.catalog-sidebar { background: var(--dark-base); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 24px; height: fit-content; position: sticky; top: calc(60px + 53px); }
.filter-section { margin-bottom: 28px; }
.filter-section:last-child { margin-bottom: 0; }
.filter-label { font-family: var(--font-body); font-weight: 700; font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-ghost); margin-bottom: 14px; }
.filter-option { display: flex; align-items: center; gap: 10px; padding: 5px 0; cursor: pointer; }
.filter-option input[type="checkbox"] { appearance: none; width: 14px; height: 14px; border: 1px solid var(--border); border-radius: 2px; flex-shrink: 0; cursor: pointer; transition: border-color 0.2s ease, background 0.2s ease; }
.filter-option input[type="checkbox"]:checked { background: var(--red); border-color: var(--red); }
.filter-option-label { font-size: 12px; color: var(--text-muted); cursor: pointer; }

.catalog-toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.filter-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-chip { display: inline-flex; align-items: center; gap: 6px; background: rgba(212,47,47,0.12); border: 1px solid rgba(212,47,47,0.3); border-radius: 2px; padding: 4px 10px; font-size: 11px; color: var(--red); font-weight: 600; }
.sort-select { background: var(--dark-card); border: 1px solid var(--border); color: var(--text-muted); padding: 8px 12px; border-radius: var(--radius-card); font-size: 12px; cursor: pointer; }

.pagination { background: var(--dark-lift); padding: 32px 0; display: flex; justify-content: center; }
.pagination__list { display: flex; gap: 6px; }
.pagination__btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: var(--radius-card); font-size: 13px; color: var(--text-muted); cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
.pagination__btn:hover { border-color: rgba(255,255,255,0.2); color: var(--white); }
.pagination__btn.active { background: var(--red); border-color: var(--red); color: var(--white); }

/* ==============================================
   JOIN PAGE
   ============================================== */

.join-hero { padding: 80px 0; text-align: center; }
.join-hero__headline { font-family: var(--font-display); font-weight: 800; font-size: 52px; color: var(--white); line-height: 1.05; margin: 16px 0 24px; }
.join-hero__price-row { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px; }
.join-hero__price-old { font-family: var(--font-display); font-weight: 700; font-size: 28px; color: var(--text-ghost); text-decoration: line-through; }
.join-hero__price-new { font-family: var(--font-display); font-weight: 800; font-size: 48px; color: var(--white); }
.join-hero__note { font-size: 12px; color: var(--text-muted); letter-spacing: 1px; margin-bottom: 32px; }

.whats-included-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.included-card { background: var(--dark-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 28px 24px; }
.included-card__icon { font-size: 24px; margin-bottom: 12px; }
.included-card__title { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: var(--white); margin-bottom: 8px; }
.included-card__text { font-size: 12px; color: var(--text-muted); line-height: 1.65; }

.product-picker-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.picker-card { background: var(--dark-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 16px 12px; cursor: pointer; transition: border-color 0.2s ease; text-align: center; }
.picker-card.selected { border-color: var(--red); }
.picker-card img { width: 60px; height: 80px; object-fit: contain; margin: 0 auto 10px; }
.picker-card__name { font-family: var(--font-display); font-weight: 600; font-size: 11px; color: var(--white); line-height: 1.3; }

/* ==============================================
   FORMS
   ============================================== */

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field--full { grid-column: 1 / -1; }
.form-label { font-family: var(--font-body); font-weight: 600; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
.form-input, .form-select, .form-textarea { background: var(--dark-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 12px 14px; font-size: 13px; color: var(--white); transition: border-color 0.2s ease; width: 100%; }
.form-input::placeholder, .form-textarea::placeholder { color: var(--text-ghost); }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: rgba(255,255,255,0.25); }
.form-select { cursor: pointer; color: var(--text-muted); }
.form-select option { background: var(--dark-lift); }
.form-textarea { resize: vertical; min-height: 120px; }

/* ==============================================
   ABOUT PAGE
   ============================================== */

.about-values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.about-commitments-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-card); overflow: hidden; }
.commitment-item { background: var(--dark-base); padding: 32px; }
.commitment-item__num { font-family: var(--font-display); font-weight: 800; font-size: 36px; color: rgba(212,47,47,0.15); line-height: 1; margin-bottom: 12px; }
.commitment-item__title { font-family: var(--font-display); font-weight: 700; font-size: 16px; color: var(--white); margin-bottom: 8px; }
.commitment-item__text { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

/* ==============================================
   CONTACT PAGE
   ============================================== */

.contact-hero__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.info-cards { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
.info-card { background: var(--dark-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 20px 24px; }
.info-card__label { font-family: var(--font-body); font-weight: 700; font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--text-ghost); margin-bottom: 6px; }
.info-card__value { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
.contact-form-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }

/* ==============================================
   JOIN CTA SECTION (used on Home + About)
   ============================================== */

.join-cta-section { padding: 80px 0; text-align: center; }
.join-cta-section h2 { font-size: 40px; margin: 12px 0 20px; }
.join-cta__price-row { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 8px; }
.join-cta__price-old { font-family: var(--font-display); font-weight: 700; font-size: 22px; color: rgba(255,255,255,0.4); text-decoration: line-through; }
.join-cta__price-new { font-family: var(--font-display); font-weight: 800; font-size: 40px; color: var(--white); }
.join-cta__perks { display: flex; justify-content: center; gap: 24px; margin: 20px 0 28px; font-size: 12px; color: rgba(255,255,255,0.6); }

/* ==============================================
   PULL QUOTE
   ============================================== */

.pull-quote {
  border-left: 2px solid var(--red);
  padding: 4px 0 4px 20px;
  font-style: italic;
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 24px 0;
}
```

- [ ] **Step 2: Verify CSS compiles without errors**

Open any HTML file in browser (e.g., `index.html`). No console errors. All dark backgrounds visible.

- [ ] **Step 3: Commit**

```bash
cd "C:/Web Developer/Full Stack Developer/Claude Code/Projects/habitolife-redesign"
git add styles/main.css
git commit -m "feat: v2 design system — full dark mode CSS tokens + shared components"
```

---

## Task 2: Animation Layer — `js/main.js`

**Files:**
- Rewrite: `js/main.js`

- [ ] **Step 1: Rewrite `js/main.js` with GSAP + ScrollTrigger**

```js
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFAQ();
  initPickerCards();
  if (!prefersReducedMotion) {
    initHeroEntrance();
    initScrollReveals();
    initCardHover();
  }
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

function initHeroEntrance() {
  const heroText = document.querySelector('.hero__text');
  const heroMedia = document.querySelector('.hero__media');
  if (!heroText) return;
  gsap.from(Array.from(heroText.children), {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.1
  });
  if (heroMedia) {
    gsap.from(heroMedia, { opacity: 0, y: 40, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  }
}

function initScrollReveals() {
  document.querySelectorAll('.gsap-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('.gsap-stagger').forEach(grid => {
    const children = Array.from(grid.children);
    if (!children.length) return;
    gsap.from(children, {
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08
    });
  });
}

function initCardHover() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -2, duration: 0.2, ease: 'power1.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: 0.2, ease: 'power1.out' }));
  });
}

function initFAQ() {
  document.querySelectorAll('.faq__question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      const parent = q.closest('.faq');
      if (!item || !parent) return;
      const isOpen = item.classList.contains('open');
      parent.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

function initPickerCards() {
  document.querySelectorAll('.picker-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('selected'));
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: v2 GSAP animation layer — ScrollTrigger reveals, hero entrance, card hover"
```

---

## Task 3: Home Page — `index.html`

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Rewrite `index.html` with all 8 sections**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Habito — Choose Better. Live Greater.</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <a href="index.html" class="navbar__logo">Habito</a>
  <div class="navbar__links">
    <a href="all-products.html">Shop ▾</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="join.html" class="btn btn--primary navbar__cta">Join Now</a>
  </div>
  <div class="navbar__icons">
    <a href="#" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </a>
    <a href="#" aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="#" aria-label="Cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </a>
  </div>
</nav>

<!-- HERO -->
<section class="section section--base section--texture" style="padding: 100px 0 80px;">
  <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;">
    <div class="hero__text">
      <span class="eyebrow">Clean Supplements · No Gimmicks</span>
      <h1 style="font-size:62px;margin-bottom:20px;">Choose Better.<br>Live Greater.</h1>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:32px;line-height:1.8;">Clean Ingredients · Pure Performance · Real Results · No Gimmicks</p>
      <div style="display:flex;gap:20px;align-items:center;">
        <a href="all-products.html" class="btn btn--primary" style="font-size:11px;padding:14px 28px;">Make the Change Today</a>
        <a href="join.html" class="btn btn--ghost">Join &amp; Save →</a>
      </div>
    </div>
    <div class="hero__media" style="display:flex;justify-content:center;align-items:flex-end;gap:12px;position:relative;">
      <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:70%;height:120px;background:radial-gradient(ellipse,var(--red-glow) 0%,transparent 70%);pointer-events:none;"></div>
      <div style="background:var(--dark-card);border:1px solid var(--border);border-radius:4px;width:100px;height:150px;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;">
        <img src="https://picsum.photos/seed/habito-b1/80/130" alt="Supplement" style="object-fit:contain;">
      </div>
      <div style="background:var(--dark-card);border:1px solid var(--border);border-radius:4px;width:100px;height:180px;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;">
        <img src="https://picsum.photos/seed/habito-b2/80/150" alt="Supplement" style="object-fit:contain;">
      </div>
      <div style="background:var(--dark-card);border:1px solid var(--border);border-radius:4px;width:100px;height:150px;display:flex;align-items:center;justify-content:center;position:relative;z-index:1;">
        <img src="https://picsum.photos/seed/habito-b3/80/130" alt="Supplement" style="object-fit:contain;">
      </div>
    </div>
  </div>
</section>

<!-- BENEFITS MARQUEE -->
<div class="marquee">
  <div class="marquee__track">
    <span class="marquee__label">Steady Endurance</span><span class="marquee__sep"></span>
    <span class="marquee__label">Muscle Support</span><span class="marquee__sep"></span>
    <span class="marquee__label">Lean Strength</span><span class="marquee__sep"></span>
    <span class="marquee__label">Faster Recovery</span><span class="marquee__sep"></span>
    <span class="marquee__label">Core Stability</span><span class="marquee__sep"></span>
    <span class="marquee__label">Deep Nourishment</span><span class="marquee__sep"></span>
    <span class="marquee__label">Sustained Output</span><span class="marquee__sep"></span>
    <span class="marquee__label">Peak Performance</span><span class="marquee__sep"></span>
    <span class="marquee__label">Daily Resilience</span><span class="marquee__sep"></span>
    <span class="marquee__label">Natural Vitality</span><span class="marquee__sep"></span>
    <span class="marquee__label">Increased Muscle Power</span><span class="marquee__sep"></span>
    <span class="marquee__label">Boost Strength Output</span><span class="marquee__sep"></span>
    <span class="marquee__label">Enhance Muscle Density</span><span class="marquee__sep"></span>
    <span class="marquee__label">Steady Endurance</span><span class="marquee__sep"></span>
    <span class="marquee__label">Muscle Support</span><span class="marquee__sep"></span>
    <span class="marquee__label">Lean Strength</span><span class="marquee__sep"></span>
    <span class="marquee__label">Faster Recovery</span><span class="marquee__sep"></span>
    <span class="marquee__label">Core Stability</span><span class="marquee__sep"></span>
    <span class="marquee__label">Deep Nourishment</span><span class="marquee__sep"></span>
    <span class="marquee__label">Sustained Output</span><span class="marquee__sep"></span>
    <span class="marquee__label">Peak Performance</span><span class="marquee__sep"></span>
    <span class="marquee__label">Daily Resilience</span><span class="marquee__sep"></span>
    <span class="marquee__label">Natural Vitality</span><span class="marquee__sep"></span>
    <span class="marquee__label">Increased Muscle Power</span><span class="marquee__sep"></span>
    <span class="marquee__label">Boost Strength Output</span><span class="marquee__sep"></span>
    <span class="marquee__label">Enhance Muscle Density</span><span class="marquee__sep"></span>
  </div>
</div>

<!-- FEATURED PRODUCTS -->
<section class="section section--lift">
  <div class="container">
    <div class="section__header--flex gsap-reveal">
      <div>
        <span class="eyebrow">Shop</span>
        <h2 style="font-size:36px;">Featured Products</h2>
      </div>
      <a href="all-products.html" class="btn btn--ghost">View All →</a>
    </div>
    <div class="products-grid gsap-stagger">
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-p1/90/130" alt="Blood Sugar Support">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Capsules</p>
          <p class="product-card__name">Blood Sugar Support</p>
          <div class="product-card__footer">
            <span class="product-card__price">$29.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-p2/90/130" alt="Natural Testo Boost">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Capsules</p>
          <p class="product-card__name">Natural Testo Boost</p>
          <div class="product-card__footer">
            <span class="product-card__price">$34.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-p3/90/130" alt="Pre-Workout Sour Apple">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Powder</p>
          <p class="product-card__name">Pre-Workout Sour Apple</p>
          <div class="product-card__footer">
            <span class="product-card__price">$39.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-p4/90/130" alt="Multi Collagen Peptides">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Powder</p>
          <p class="product-card__name">Multi Collagen Peptides</p>
          <div class="product-card__footer">
            <span class="product-card__price">$44.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- VALUE PROPOSITION -->
<section class="section section--base">
  <div class="container">
    <div class="gsap-reveal" style="max-width:640px;margin-bottom:16px;">
      <span class="eyebrow">Why Habito</span>
      <h2 style="font-size:40px;margin-bottom:16px;">More Value.<br>No Gimmicks.</h2>
      <p class="pull-quote">"You pay for the product, not the marketing."</p>
    </div>
    <div class="value-cards-grid gsap-stagger" style="margin-top:48px;">
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">Premium Ingredients</p>
        <p class="value-card__text">Every formula uses clinically researched doses of the highest-quality raw ingredients. No fillers, no underdosed blends.</p>
      </div>
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">Proven Results</p>
        <p class="value-card__text">Our products are backed by third-party testing and real customer results — not marketing hype or paid influencer claims.</p>
      </div>
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">Community Support</p>
        <p class="value-card__text">When you join Habito, you're joining a community committed to living better — with support, resources, and member-only pricing.</p>
      </div>
    </div>
  </div>
</section>

<!-- JOIN CTA -->
<section class="section section--red join-cta-section">
  <div class="container">
    <span class="eyebrow" style="color:rgba(255,255,255,0.6);">Limited Offer · One-Time Fee</span>
    <h2>Get $150 in Supplements for Only $75</h2>
    <div class="join-cta__price-row gsap-reveal">
      <span class="join-cta__price-old">$150</span>
      <span class="join-cta__price-new">$75</span>
    </div>
    <div class="join-cta__perks gsap-reveal">
      <span>✓ Curated product bundle</span>
      <span>✓ Exclusive member pricing forever</span>
      <span>✓ Free shipping on every order</span>
    </div>
    <a href="join.html" class="btn btn--white gsap-reveal">Join Habito — $75 →</a>
  </div>
</section>

<!-- FAQ -->
<section class="section section--lift">
  <div class="container" style="max-width:800px;">
    <div class="gsap-reveal" style="margin-bottom:40px;">
      <h2 style="font-size:36px;">Got questions? We've got answers.</h2>
    </div>
    <div class="faq">
      <div class="faq__item">
        <button class="faq__question">
          How is Habito different from other supplement brands?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Habito cuts the marketing overhead that inflates prices at big-box brands. We invest in ingredient quality and transparent labeling instead of celebrity endorsements and flashy ads — so you get more product for your dollar.</p>
        </div>
      </div>
      <div class="faq__item">
        <button class="faq__question">
          Who are your products for?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Anyone serious about their health. Whether you're an athlete, a busy professional, or just someone who wants clean, effective supplements without the gimmicks — Habito is built for you.</p>
        </div>
      </div>
      <div class="faq__item">
        <button class="faq__question">
          How do I choose the right product?
          <span class="faq__icon">+</span>
        </button>
        <div class="faq__answer">
          <p>Start with your primary health goal — endurance, strength, recovery, focus, or general wellness. Our catalog is organized by goal and category. If you're not sure, the Habito membership bundle is the best way to sample across our range.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand">Habito</p>
        <p class="footer__tagline">Clean supplements. Real ingredients. No gimmicks. Built in Saint George, UT.</p>
      </div>
      <div>
        <p class="footer__col-label">Shop</p>
        <ul class="footer__links">
          <li><a href="all-products.html">Capsules</a></li>
          <li><a href="all-products.html">Gummies</a></li>
          <li><a href="all-products.html">Liquid</a></li>
          <li><a href="all-products.html">Powder</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Company</p>
        <ul class="footer__links">
          <li><a href="about.html">About</a></li>
          <li><a href="join.html">Join</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Legal</p>
        <ul class="footer__links">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Return Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__fda">*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      <p class="footer__copy">© 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790</p>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `index.html` in browser and verify**

Confirm:
- Full dark background (`#1C1F29`) visible on all sections
- Navbar is transparent on load, turns frosted glass after scrolling 80px
- Hero text fades/rises in on page load (GSAP)
- Red marquee scrolls infinitely
- Featured product cards stagger in on scroll
- FAQ accordion opens/closes with + → × rotation
- Footer 4-column layout visible

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: home page v2 — dark mode, hero, marquee, featured products, FAQ, footer"
```

---

## Task 4: Product Page — `product.html`

**Files:**
- Rewrite: `product.html`

- [ ] **Step 1: Rewrite `product.html` with breadcrumb, detail, ingredients, related**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blood Sugar Support — Habito</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <a href="index.html" class="navbar__logo">Habito</a>
  <div class="navbar__links">
    <a href="all-products.html">Shop ▾</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="join.html" class="btn btn--primary navbar__cta">Join Now</a>
  </div>
  <div class="navbar__icons">
    <a href="#" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </a>
    <a href="#" aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="#" aria-label="Cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </a>
  </div>
</nav>

<!-- BREADCRUMB -->
<div class="breadcrumb">
  <div class="container">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__item"><a href="index.html">Home</a></li>
      <li class="breadcrumb__sep">›</li>
      <li class="breadcrumb__item"><a href="all-products.html">Shop</a></li>
      <li class="breadcrumb__sep">›</li>
      <li class="breadcrumb__item"><a href="all-products.html">Capsules</a></li>
      <li class="breadcrumb__sep">›</li>
      <li class="breadcrumb__item breadcrumb__item--active">Blood Sugar Support</li>
    </ol>
  </div>
</div>

<!-- PRODUCT DETAIL -->
<section class="section section--base">
  <div class="container">
    <div class="product-detail__grid gsap-reveal">
      <!-- LEFT: Images -->
      <div class="product-detail__media">
        <div class="product-detail__main-image">
          <img src="https://picsum.photos/seed/habito-detail/160/240" alt="Blood Sugar Support">
        </div>
        <div class="product-detail__thumbnails">
          <div class="product-detail__thumb active">
            <img src="https://picsum.photos/seed/habito-detail/64/64" alt="">
          </div>
          <div class="product-detail__thumb">
            <img src="https://picsum.photos/seed/habito-detail-2/64/64" alt="">
          </div>
          <div class="product-detail__thumb">
            <img src="https://picsum.photos/seed/habito-detail-3/64/64" alt="">
          </div>
          <div class="product-detail__thumb">
            <img src="https://picsum.photos/seed/habito-detail-4/64/64" alt="">
          </div>
        </div>
      </div>

      <!-- RIGHT: Info -->
      <div class="product-detail__info">
        <span class="eyebrow">Capsules</span>
        <h1 class="product-detail__name">Blood Sugar Support</h1>

        <div class="product-detail__rating">
          <span class="product-detail__stars">★★★★★</span>
          <span>4.8 (124 reviews)</span>
        </div>

        <div class="product-detail__price-row">
          <span class="product-detail__price-member">$29.99</span>
          <span class="product-detail__price-retail">$44.99</span>
          <span class="price-badge">Member Price</span>
        </div>

        <div>
          <p class="product-detail__format-label">Format</p>
          <div class="format-selector">
            <button class="format-btn active">Capsules (60ct)</button>
            <button class="format-btn">Capsules (120ct)</button>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:16px;">
          <div class="qty-control">
            <button aria-label="Decrease">−</button>
            <span class="qty-control__value">1</span>
            <button aria-label="Increase">+</button>
          </div>
          <button class="btn btn--outline" style="flex:1;">Add to Cart</button>
        </div>

        <div class="trust-badges">
          <div class="trust-badge"><span class="trust-badge__icon">📦</span> Free Shipping</div>
          <div class="trust-badge"><span class="trust-badge__icon">🔬</span> 3rd-Party Tested</div>
          <div class="trust-badge"><span class="trust-badge__icon">↩</span> 30-Day Returns</div>
        </div>

        <p class="product-detail__desc">Support healthy blood sugar levels naturally with our clinically-dosed Blood Sugar Support formula. Featuring berberine, chromium, and Ceylon cinnamon — three of the most researched compounds for glucose metabolism and insulin sensitivity. Clean ingredients. No artificial fillers. No proprietary blends.</p>
      </div>
    </div>
  </div>
</section>

<!-- KEY INGREDIENTS -->
<section class="section section--lift">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:40px;">
      <span class="eyebrow">What's Inside</span>
      <h2 style="font-size:36px;">Key Ingredients</h2>
    </div>
    <div class="ingredients-grid gsap-stagger">
      <div class="ingredient-card">
        <p class="ingredient-card__name">Berberine HCl</p>
        <p class="ingredient-card__dosage">500mg per serving</p>
        <p class="ingredient-card__benefit">Clinically studied for glucose metabolism and insulin sensitivity. Activates AMPK — the same pathway targeted by metformin.</p>
      </div>
      <div class="ingredient-card">
        <p class="ingredient-card__name">Ceylon Cinnamon</p>
        <p class="ingredient-card__dosage">250mg per serving</p>
        <p class="ingredient-card__benefit">True cinnamon (not cassia) shown to reduce fasting blood glucose and improve lipid profiles in multiple RCTs.</p>
      </div>
      <div class="ingredient-card">
        <p class="ingredient-card__name">Chromium Picolinate</p>
        <p class="ingredient-card__dosage">200mcg per serving</p>
        <p class="ingredient-card__benefit">An essential trace mineral that enhances insulin receptor binding and improves glucose uptake into cells.</p>
      </div>
    </div>
  </div>
</section>

<!-- RELATED PRODUCTS -->
<section class="section section--base">
  <div class="container">
    <div class="section__header--flex gsap-reveal">
      <div>
        <span class="eyebrow">More Products</span>
        <h2 style="font-size:32px;">You May Also Like</h2>
      </div>
      <a href="all-products.html" class="btn btn--ghost">View All →</a>
    </div>
    <div class="products-grid gsap-stagger">
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-r1/90/130" alt="Brain Support">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Capsules</p>
          <p class="product-card__name">Brain Support</p>
          <div class="product-card__footer">
            <span class="product-card__price">$32.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-r2/90/130" alt="Immune+">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Capsules</p>
          <p class="product-card__name">Immune+</p>
          <div class="product-card__footer">
            <span class="product-card__price">$27.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-r3/90/130" alt="HMB + D3">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Capsules</p>
          <p class="product-card__name">HMB + D3</p>
          <div class="product-card__footer">
            <span class="product-card__price">$31.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
      <a href="product.html" class="product-card">
        <div class="product-card__image-wrap">
          <img src="https://picsum.photos/seed/habito-r4/90/130" alt="Keto Burn">
        </div>
        <div class="product-card__body">
          <p class="product-card__category">Capsules</p>
          <p class="product-card__name">Keto Burn</p>
          <div class="product-card__footer">
            <span class="product-card__price">$36.99</span>
            <span class="product-card__add">Add +</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand">Habito</p>
        <p class="footer__tagline">Clean supplements. Real ingredients. No gimmicks.</p>
      </div>
      <div>
        <p class="footer__col-label">Shop</p>
        <ul class="footer__links">
          <li><a href="all-products.html">Capsules</a></li>
          <li><a href="all-products.html">Gummies</a></li>
          <li><a href="all-products.html">Liquid</a></li>
          <li><a href="all-products.html">Powder</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Company</p>
        <ul class="footer__links">
          <li><a href="about.html">About</a></li>
          <li><a href="join.html">Join</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Legal</p>
        <ul class="footer__links">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Return Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__fda">*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      <p class="footer__copy">© 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790</p>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `product.html` in browser and verify**

Confirm:
- Breadcrumb visible below navbar
- Product detail 2-col grid: image left, info right
- Red glow visible under main product image
- Format selector buttons, qty control, Add to Cart button visible
- Ingredients section uses 3-col grid layout
- Related products grid with 4 cards

- [ ] **Step 3: Commit**

```bash
git add product.html
git commit -m "feat: product detail page v2 — dark mode, GSAP reveals, ingredients grid"
```

---

## Task 5: All Products Page — `all-products.html`

**Files:**
- Rewrite: `all-products.html`

- [ ] **Step 1: Rewrite `all-products.html` with all 18 products**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Products — Habito</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <a href="index.html" class="navbar__logo">Habito</a>
  <div class="navbar__links">
    <a href="all-products.html">Shop ▾</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="join.html" class="btn btn--primary navbar__cta">Join Now</a>
  </div>
  <div class="navbar__icons">
    <a href="#" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </a>
    <a href="#" aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="#" aria-label="Cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </a>
  </div>
</nav>

<!-- PAGE HERO -->
<section class="section section--base section--texture catalog-hero">
  <div class="container gsap-reveal">
    <span class="eyebrow">Habito Essentials</span>
    <h1 style="font-size:52px;margin-bottom:12px;">All Products</h1>
    <p style="font-size:14px;color:var(--text-muted);">Clean supplements. Real ingredients. No gimmicks.</p>
    <p class="catalog-hero__count">18 products across 4 categories</p>
  </div>
</section>

<!-- CATEGORY TABS -->
<div class="category-tabs">
  <div class="container">
    <div class="category-tabs__list">
      <button class="category-tabs__btn active">All (18)</button>
      <button class="category-tabs__btn">Capsules (11)</button>
      <button class="category-tabs__btn">Gummies (2)</button>
      <button class="category-tabs__btn">Liquid (2)</button>
      <button class="category-tabs__btn">Powder (3)</button>
    </div>
  </div>
</div>

<!-- CATALOG BODY -->
<div class="catalog-body">
  <div class="container">
    <div class="catalog-layout">

      <!-- SIDEBAR -->
      <aside class="catalog-sidebar">
        <div class="filter-section">
          <p class="filter-label">Category</p>
          <label class="filter-option">
            <input type="checkbox" checked>
            <span class="filter-option-label">Capsules (11)</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Gummies (2)</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Liquid (2)</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Powder (3)</span>
          </label>
        </div>
        <div class="filter-section">
          <p class="filter-label">Health Goal</p>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Endurance</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Strength</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Recovery</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Focus</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Blood Sugar</span>
          </label>
          <label class="filter-option">
            <input type="checkbox">
            <span class="filter-option-label">Immunity</span>
          </label>
        </div>
        <div class="filter-section">
          <p class="filter-label">Price Range</p>
          <input type="range" min="0" max="100" value="80" style="width:100%;accent-color:var(--red);">
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--text-ghost);">
            <span>$0</span><span>$80</span>
          </div>
        </div>
      </aside>

      <!-- MAIN -->
      <main>
        <div class="catalog-toolbar">
          <div class="filter-chips">
            <span class="filter-chip">Capsules ×</span>
          </div>
          <select class="sort-select">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Best Selling</option>
          </select>
        </div>

        <div class="products-grid--3col gsap-stagger">
          <!-- Capsules (11) -->
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c1/90/130" alt="Blood Sugar Support"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Blood Sugar Support</p>
              <div class="product-card__footer"><span class="product-card__price">$29.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c2/90/130" alt="Brain Support"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Brain Support</p>
              <div class="product-card__footer"><span class="product-card__price">$32.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c3/90/130" alt="Cleanse"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Cleanse</p>
              <div class="product-card__footer"><span class="product-card__price">$24.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c4/90/130" alt="Hair Skin & Nails"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Hair Skin &amp; Nails</p>
              <div class="product-card__footer"><span class="product-card__price">$27.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c5/90/130" alt="HMB + D3"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">HMB + D3</p>
              <div class="product-card__footer"><span class="product-card__price">$31.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c6/90/130" alt="Immune+"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Immune+</p>
              <div class="product-card__footer"><span class="product-card__price">$27.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c7/90/130" alt="Keto Burn"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Keto Burn</p>
              <div class="product-card__footer"><span class="product-card__price">$36.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c8/90/130" alt="Libido Support"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Libido Support</p>
              <div class="product-card__footer"><span class="product-card__price">$34.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c9/90/130" alt="Natural Burn"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Natural Burn</p>
              <div class="product-card__footer"><span class="product-card__price">$33.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c10/90/130" alt="Natural Testo Boost"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">Natural Testo Boost</p>
              <div class="product-card__footer"><span class="product-card__price">$34.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/c11/90/130" alt="NO2"></div>
            <div class="product-card__body">
              <p class="product-card__category">Capsules</p>
              <p class="product-card__name">NO2</p>
              <div class="product-card__footer"><span class="product-card__price">$29.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <!-- Gummies (2) -->
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/g1/90/130" alt="Apple Cider Vinegar Gummies"></div>
            <div class="product-card__body">
              <p class="product-card__category">Gummies</p>
              <p class="product-card__name">Apple Cider Vinegar</p>
              <div class="product-card__footer"><span class="product-card__price">$22.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/g2/90/130" alt="Creatine Tropical Punch Gummies"></div>
            <div class="product-card__body">
              <p class="product-card__category">Gummies</p>
              <p class="product-card__name">Creatine — Tropical Punch</p>
              <div class="product-card__footer"><span class="product-card__price">$26.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <!-- Liquid (2) -->
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/l1/90/130" alt="Trace Minerals+ Fulvic Acid"></div>
            <div class="product-card__body">
              <p class="product-card__category">Liquid</p>
              <p class="product-card__name">Trace Minerals+ Fulvic Acid</p>
              <div class="product-card__footer"><span class="product-card__price">$38.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/l2/90/130" alt="Ionic Silver+ Trace Minerals"></div>
            <div class="product-card__body">
              <p class="product-card__category">Liquid</p>
              <p class="product-card__name">Ionic Silver+ Trace Minerals</p>
              <div class="product-card__footer"><span class="product-card__price">$42.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <!-- Powder (3) -->
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/pw1/90/130" alt="Multi Collagen Peptides"></div>
            <div class="product-card__body">
              <p class="product-card__category">Powder</p>
              <p class="product-card__name">Multi Collagen Peptides</p>
              <div class="product-card__footer"><span class="product-card__price">$44.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/pw2/90/130" alt="Pre-Workout Sour Apple"></div>
            <div class="product-card__body">
              <p class="product-card__category">Powder</p>
              <p class="product-card__name">Pre-Workout Sour Apple</p>
              <div class="product-card__footer"><span class="product-card__price">$39.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
          <a href="product.html" class="product-card">
            <div class="product-card__image-wrap"><img src="https://picsum.photos/seed/pw3/90/130" alt="Pre-Workout Raspberry Lemonade"></div>
            <div class="product-card__body">
              <p class="product-card__category">Powder</p>
              <p class="product-card__name">Pre-Workout Raspberry Lemonade</p>
              <div class="product-card__footer"><span class="product-card__price">$39.99</span><span class="product-card__add">Add +</span></div>
            </div>
          </a>
        </div>
      </main>

    </div>
  </div>
</div>

<!-- PAGINATION -->
<div class="pagination">
  <ul class="pagination__list">
    <li><button class="pagination__btn active">1</button></li>
    <li><button class="pagination__btn">2</button></li>
    <li><button class="pagination__btn">3</button></li>
  </ul>
</div>

<!-- FOOTER SLIM -->
<footer class="footer footer--slim">
  <div class="container">
    <div class="footer__bottom">
      <p class="footer__fda">*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      <p class="footer__copy">© 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790</p>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
<script>
  // Category tabs interaction
  document.querySelectorAll('.category-tabs__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-tabs__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
</script>
</body>
</html>
```

- [ ] **Step 2: Open `all-products.html` in browser and verify**

Confirm:
- Page hero with grid texture
- Category tabs stick below navbar on scroll
- Sidebar filters (category, health goal, price slider) visible on left
- All 18 products in 3-col grid
- Active filter chip ("Capsules ×") visible in toolbar
- Slim footer (FDA + copyright only)

- [ ] **Step 3: Commit**

```bash
git add all-products.html
git commit -m "feat: all products page v2 — catalog with 18 products, sidebar filters, category tabs"
```

---

## Task 6: Join Page — `join.html`

**Files:**
- Rewrite: `join.html`

- [ ] **Step 1: Rewrite `join.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Join Habito — Get $150 in Supplements for $75</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <a href="index.html" class="navbar__logo">Habito</a>
  <div class="navbar__links">
    <a href="all-products.html">Shop ▾</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="join.html" class="btn btn--primary navbar__cta">Join Now</a>
  </div>
  <div class="navbar__icons">
    <a href="#" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </a>
    <a href="#" aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="#" aria-label="Cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </a>
  </div>
</nav>

<!-- JOIN HERO -->
<section class="section section--base section--texture join-hero">
  <div class="container gsap-reveal">
    <span class="eyebrow">Limited Offer · One-Time Fee</span>
    <h1 class="join-hero__headline">Get $150 in Supplements<br>for Only $75</h1>
    <div class="join-hero__price-row">
      <span class="join-hero__price-old">$150</span>
      <span class="join-hero__price-new">$75</span>
    </div>
    <p class="join-hero__note">One-time payment · No recurring fees · No subscriptions</p>
    <a href="#signup" class="btn btn--primary" style="font-size:11px;padding:14px 32px;">Join Habito — $75 →</a>
  </div>
</section>

<!-- WHAT'S INCLUDED -->
<section class="section section--lift">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:40px;text-align:center;">
      <span class="eyebrow">Your Bundle</span>
      <h2 style="font-size:36px;">What's Included</h2>
    </div>
    <div class="whats-included-grid gsap-stagger">
      <div class="included-card">
        <div class="included-card__icon">📦</div>
        <p class="included-card__title">Collection of Best-Selling Products</p>
        <p class="included-card__text">A hand-picked selection of Habito's top-rated supplements across multiple health goals — worth over $150 at retail pricing.</p>
      </div>
      <div class="included-card">
        <div class="included-card__icon">👕</div>
        <p class="included-card__title">Exclusive Early-Supporter T-Shirt</p>
        <p class="included-card__text">A limited-edition Habito tee available only to founding members. Clean design, premium fit, built to last.</p>
      </div>
      <div class="included-card">
        <div class="included-card__icon">🥤</div>
        <p class="included-card__title">Habito Shaker Bottle</p>
        <p class="included-card__text">A durable, leak-proof 28oz shaker with the Habito mark. Your daily companion for powders and hydration.</p>
      </div>
      <div class="included-card">
        <div class="included-card__icon">🚚</div>
        <p class="included-card__title">Free Shipping + Member Pricing Forever</p>
        <p class="included-card__text">One-time fee unlocks free shipping on all future orders and exclusive member pricing on every product — permanently.</p>
      </div>
    </div>
  </div>
</section>

<!-- PRODUCT PICKER -->
<section class="section section--base">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:40px;">
      <span class="eyebrow">Customize Your Bundle</span>
      <h2 style="font-size:36px;">Choose Your Products</h2>
      <p style="font-size:13px;color:var(--text-muted);margin-top:8px;">Select the products you'd like included in your membership bundle.</p>
    </div>
    <div class="product-picker-grid gsap-stagger">
      <div class="picker-card selected">
        <img src="https://picsum.photos/seed/pk1/60/80" alt="Blood Sugar Support">
        <p class="picker-card__name">Blood Sugar Support</p>
      </div>
      <div class="picker-card">
        <img src="https://picsum.photos/seed/pk2/60/80" alt="Brain Support">
        <p class="picker-card__name">Brain Support</p>
      </div>
      <div class="picker-card selected">
        <img src="https://picsum.photos/seed/pk3/60/80" alt="Immune+">
        <p class="picker-card__name">Immune+</p>
      </div>
      <div class="picker-card">
        <img src="https://picsum.photos/seed/pk4/60/80" alt="HMB + D3">
        <p class="picker-card__name">HMB + D3</p>
      </div>
      <div class="picker-card selected">
        <img src="https://picsum.photos/seed/pk5/60/80" alt="Natural Testo Boost">
        <p class="picker-card__name">Natural Testo Boost</p>
      </div>
      <div class="picker-card">
        <img src="https://picsum.photos/seed/pk6/60/80" alt="Pre-Workout Sour Apple">
        <p class="picker-card__name">Pre-Workout Sour Apple</p>
      </div>
      <div class="picker-card">
        <img src="https://picsum.photos/seed/pk7/60/80" alt="Multi Collagen Peptides">
        <p class="picker-card__name">Multi Collagen Peptides</p>
      </div>
      <div class="picker-card selected">
        <img src="https://picsum.photos/seed/pk8/60/80" alt="Apple Cider Vinegar">
        <p class="picker-card__name">Apple Cider Vinegar</p>
      </div>
    </div>
  </div>
</section>

<!-- SIGN-UP FORM -->
<section class="section section--lift" id="signup">
  <div class="container" style="max-width:640px;">
    <div class="gsap-reveal" style="margin-bottom:40px;">
      <span class="eyebrow">Almost There</span>
      <h2 style="font-size:36px;">Complete Your Order</h2>
    </div>
    <form class="gsap-reveal">
      <div class="form-grid" style="margin-bottom:16px;">
        <div class="form-field">
          <label class="form-label" for="first-name">First Name</label>
          <input class="form-input" type="text" id="first-name" placeholder="John">
        </div>
        <div class="form-field">
          <label class="form-label" for="last-name">Last Name</label>
          <input class="form-input" type="text" id="last-name" placeholder="Smith">
        </div>
        <div class="form-field">
          <label class="form-label" for="email">Email</label>
          <input class="form-input" type="email" id="email" placeholder="john@example.com">
        </div>
        <div class="form-field">
          <label class="form-label" for="phone">Phone</label>
          <input class="form-input" type="tel" id="phone" placeholder="(555) 000-0000">
        </div>
        <div class="form-field form-field--full">
          <label class="form-label" for="address">Shipping Address</label>
          <input class="form-input" type="text" id="address" placeholder="123 Main St, City, ST 00000">
        </div>
      </div>

      <div style="background:var(--dark-card);border:1px solid var(--border);border-radius:4px;padding:20px;margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-size:13px;color:var(--text-muted);">Habito Membership Bundle</span>
          <span style="font-size:14px;color:var(--text-ghost);text-decoration:line-through;">$150.00</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-family:var(--font-display);font-weight:700;font-size:16px;color:var(--white);">Order Total</span>
          <span style="font-family:var(--font-display);font-weight:800;font-size:24px;color:var(--white);">$75.00</span>
        </div>
      </div>

      <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;font-size:12px;padding:16px;">Join Habito — $75 →</button>
      <p style="text-align:center;font-size:11px;color:var(--text-ghost);margin-top:12px;">No recurring charges. One-time payment only.</p>
    </form>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand">Habito</p>
        <p class="footer__tagline">Clean supplements. Real ingredients. No gimmicks.</p>
      </div>
      <div>
        <p class="footer__col-label">Shop</p>
        <ul class="footer__links">
          <li><a href="all-products.html">Capsules</a></li>
          <li><a href="all-products.html">Gummies</a></li>
          <li><a href="all-products.html">Liquid</a></li>
          <li><a href="all-products.html">Powder</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Company</p>
        <ul class="footer__links">
          <li><a href="about.html">About</a></li>
          <li><a href="join.html">Join</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Legal</p>
        <ul class="footer__links">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Return Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__fda">*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      <p class="footer__copy">© 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790</p>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `join.html` in browser and verify**

Confirm:
- Hero centered with strikethrough $150 → $75 pricing
- 2×2 "What's Included" cards visible
- Product picker grid shows 8 cards, selected cards have red border
- Clicking picker cards toggles `.selected` state
- Order total box and form visible
- Footer renders correctly

- [ ] **Step 3: Commit**

```bash
git add join.html
git commit -m "feat: join page v2 — membership offer, product picker, signup form"
```

---

## Task 7: About Page — `about.html`

**Files:**
- Rewrite: `about.html`

- [ ] **Step 1: Rewrite `about.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Habito — More Value. No Gimmicks.</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <a href="index.html" class="navbar__logo">Habito</a>
  <div class="navbar__links">
    <a href="all-products.html">Shop ▾</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="join.html" class="btn btn--primary navbar__cta">Join Now</a>
  </div>
  <div class="navbar__icons">
    <a href="#" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </a>
    <a href="#" aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="#" aria-label="Cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </a>
  </div>
</nav>

<!-- HERO -->
<section class="section section--base section--texture" style="padding:100px 0 80px;text-align:center;">
  <div class="container gsap-reveal">
    <span class="eyebrow">Our Story</span>
    <h1 style="font-size:60px;max-width:700px;margin:0 auto 20px;">More Value.<br>No Gimmicks.</h1>
    <p style="font-size:15px;color:var(--text-muted);max-width:520px;margin:0 auto;line-height:1.75;">Habito was built for people who are tired of overpaying for supplements they can barely pronounce. We strip away the marketing overhead and put the value back in the product.</p>
  </div>
</section>

<!-- MISSION -->
<section class="section section--lift">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;" class="gsap-reveal">
      <div>
        <span class="eyebrow">Our Mission</span>
        <h2 style="font-size:36px;margin-bottom:20px;">Clean ingredients.<br>Honest prices.</h2>
        <p class="pull-quote">"You pay for the product, not the marketing."</p>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.75;margin-top:16px;">The supplement industry is rife with inflated margins, proprietary blends, and celebrity endorsements. Every dollar that goes to a paid influencer is a dollar that doesn't go into your product. At Habito, we made a different choice: invest in ingredients, not image.</p>
      </div>
      <div style="background:var(--dark-card);border:1px solid var(--border);border-radius:4px;height:320px;display:flex;align-items:center;justify-content:center;">
        <p style="font-size:12px;color:var(--text-ghost);">[ Brand image placeholder ]</p>
      </div>
    </div>
  </div>
</section>

<!-- WHAT WE STAND FOR -->
<section class="section section--base">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:48px;">
      <span class="eyebrow">Core Values</span>
      <h2 style="font-size:36px;">What We Stand For</h2>
    </div>
    <div class="about-values-grid gsap-stagger">
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">Clean Ingredients</p>
        <p class="value-card__text">No artificial fillers, no proprietary blends, no underdosed formulas. Every ingredient listed with its exact dose.</p>
      </div>
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">Pure Performance</p>
        <p class="value-card__text">Clinically-researched dosages of compounds that have been proven to work — not compounds that look good on a label.</p>
      </div>
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">Real Results</p>
        <p class="value-card__text">Third-party tested and verified. What the label says is what you get — every batch, every time.</p>
      </div>
      <div class="value-card">
        <div class="value-card__dot"></div>
        <p class="value-card__title">No Gimmicks</p>
        <p class="value-card__text">No detox teas, no magic pills, no influencer-hyped miracle cures. Just solid nutrition science in capsule and powder form.</p>
      </div>
    </div>
  </div>
</section>

<!-- THE HABITO STORY -->
<section class="section section--lift">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;" class="gsap-reveal">
      <div>
        <span class="eyebrow">How We Started</span>
        <h2 style="font-size:36px;margin-bottom:20px;">The Habito Story</h2>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.8;margin-bottom:16px;">Habito was founded in Saint George, Utah by a small team frustrated with the supplement market's worst habits — hidden ingredients, inflated prices, and relentless upsells. They set out to build a brand that could deliver clinical-quality nutrition without the six-figure marketing budget baked into every bottle.</p>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.8;">Starting with a tight catalog of high-priority formulas, Habito grew through word of mouth and repeat customers who noticed the difference. Every product we've added since has passed the same test: does this provide real value at an honest price?</p>
      </div>
      <div>
        <div class="pull-quote" style="font-size:20px;margin:32px 0;">"Choose Better. Live Greater."</div>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.8;">That's not a marketing tagline — it's a challenge. We believe that if you put the right things in your body and make intentional choices about your health, you'll live better. Habito exists to make those choices easier and more affordable.</p>
      </div>
    </div>
  </div>
</section>

<!-- OUR COMMITMENTS -->
<section class="section section--base">
  <div class="container">
    <div class="gsap-reveal" style="margin-bottom:40px;">
      <span class="eyebrow">Our Promises</span>
      <h2 style="font-size:36px;">Our Commitments</h2>
    </div>
    <div class="about-commitments-grid gsap-stagger">
      <div class="commitment-item">
        <p class="commitment-item__num">01</p>
        <p class="commitment-item__title">Ingredient Transparency</p>
        <p class="commitment-item__text">Full label disclosure, exact doses, no proprietary blends. You know exactly what you're taking and why.</p>
      </div>
      <div class="commitment-item">
        <p class="commitment-item__num">02</p>
        <p class="commitment-item__title">Community First</p>
        <p class="commitment-item__text">Members get access to pricing, products, and community resources that the general public doesn't. We grow together.</p>
      </div>
      <div class="commitment-item">
        <p class="commitment-item__num">03</p>
        <p class="commitment-item__title">Honest Pricing</p>
        <p class="commitment-item__text">Prices reflect ingredient cost and manufacturing — not ad spend. We publish our reasoning when we change a price.</p>
      </div>
      <div class="commitment-item">
        <p class="commitment-item__num">04</p>
        <p class="commitment-item__title">Quality Sourcing</p>
        <p class="commitment-item__text">Every raw material is vetted for purity and potency before it enters our supply chain. Third-party lab reports available on request.</p>
      </div>
    </div>
  </div>
</section>

<!-- JOIN CTA -->
<section class="section section--red join-cta-section">
  <div class="container">
    <span class="eyebrow" style="color:rgba(255,255,255,0.6);">Ready to Choose Better?</span>
    <h2>Get $150 in Supplements for Only $75</h2>
    <div class="join-cta__price-row gsap-reveal">
      <span class="join-cta__price-old">$150</span>
      <span class="join-cta__price-new">$75</span>
    </div>
    <p style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:28px;">One-time payment · No recurring fees · No subscriptions</p>
    <a href="join.html" class="btn btn--white gsap-reveal">Join Habito — $75 →</a>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand">Habito</p>
        <p class="footer__tagline">Clean supplements. Real ingredients. No gimmicks.</p>
      </div>
      <div>
        <p class="footer__col-label">Shop</p>
        <ul class="footer__links">
          <li><a href="all-products.html">Capsules</a></li>
          <li><a href="all-products.html">Gummies</a></li>
          <li><a href="all-products.html">Liquid</a></li>
          <li><a href="all-products.html">Powder</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Company</p>
        <ul class="footer__links">
          <li><a href="about.html">About</a></li>
          <li><a href="join.html">Join</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Legal</p>
        <ul class="footer__links">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Return Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__fda">*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      <p class="footer__copy">© 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790</p>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `about.html` in browser and verify**

Confirm:
- Centered hero with grid texture
- 2-col mission section (text + image placeholder)
- 4-col "What We Stand For" value cards
- 2-col story section with pull quote
- 2×2 commitment grid with large muted numbers
- Red join CTA section

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: about page v2 — brand story, values, commitments, join CTA"
```

---

## Task 8: Contact Page — `contact.html`

**Files:**
- Rewrite: `contact.html`

- [ ] **Step 1: Rewrite `contact.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — Habito</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar">
  <a href="index.html" class="navbar__logo">Habito</a>
  <div class="navbar__links">
    <a href="all-products.html">Shop ▾</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="join.html" class="btn btn--primary navbar__cta">Join Now</a>
  </div>
  <div class="navbar__icons">
    <a href="#" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </a>
    <a href="#" aria-label="Account">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </a>
    <a href="#" aria-label="Cart">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    </a>
  </div>
</nav>

<!-- CONTACT HERO -->
<section class="section section--base section--texture">
  <div class="container">
    <div class="contact-hero__grid gsap-reveal">
      <div>
        <span class="eyebrow">Get in Touch</span>
        <h1 style="font-size:52px;margin-bottom:16px;">We're here<br>to help.</h1>
        <p style="font-size:14px;color:var(--text-muted);line-height:1.75;max-width:360px;">Whether you have a product question, need order support, or just want to talk supplements — we're a real team and we actually respond.</p>
      </div>
      <div class="info-cards">
        <div class="info-card">
          <p class="info-card__label">Address</p>
          <p class="info-card__value">1996 E 2540 S<br>Saint George, UT 84790</p>
        </div>
        <div class="info-card">
          <p class="info-card__label">Email</p>
          <p class="info-card__value">support@habitolife.com</p>
        </div>
        <div class="info-card">
          <p class="info-card__label">Response Time</p>
          <p class="info-card__value">We respond within 1 business day.<br>Mon–Fri, 9am–5pm MT.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FORM + FAQ -->
<section class="section section--lift">
  <div class="container">
    <div class="contact-form-faq-grid">

      <!-- CONTACT FORM -->
      <div class="gsap-reveal">
        <h2 style="font-size:28px;margin-bottom:28px;">Send a Message</h2>
        <form>
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
                <option>Order Status</option>
                <option>Product Question</option>
                <option>Returns &amp; Refunds</option>
                <option>Membership</option>
                <option>Other</option>
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
          <button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;font-size:11px;padding:14px;">Send Message</button>
          <p style="font-size:11px;color:var(--text-ghost);margin-top:10px;text-align:center;">We respect your privacy. Your information is never shared.</p>
        </form>
      </div>

      <!-- FAQ -->
      <div class="gsap-reveal">
        <h2 style="font-size:28px;margin-bottom:28px;">Got questions?</h2>
        <div class="faq">
          <div class="faq__item">
            <button class="faq__question">
              How long does shipping take?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>Standard shipping takes 3–5 business days. Members receive free standard shipping on every order. Expedited options are available at checkout.</p>
            </div>
          </div>
          <div class="faq__item">
            <button class="faq__question">
              What is your return policy?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>We offer a 30-day return policy on all products. If you're not satisfied, contact us within 30 days of delivery for a full refund — no questions asked.</p>
            </div>
          </div>
          <div class="faq__item">
            <button class="faq__question">
              Are your products third-party tested?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>Yes. Every Habito product is tested by an independent third-party laboratory for purity, potency, and label accuracy. Lab reports are available on request.</p>
            </div>
          </div>
          <div class="faq__item">
            <button class="faq__question">
              Can I change or cancel my membership?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>Your Habito membership is a one-time payment with no recurring charges — there's nothing to cancel. Member pricing and free shipping are yours permanently.</p>
            </div>
          </div>
          <div class="faq__item">
            <button class="faq__question">
              Do you ship internationally?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>Currently we ship within the United States only. International shipping is on our roadmap — join our email list to be notified when it becomes available.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand">Habito</p>
        <p class="footer__tagline">Clean supplements. Real ingredients. No gimmicks.</p>
      </div>
      <div>
        <p class="footer__col-label">Shop</p>
        <ul class="footer__links">
          <li><a href="all-products.html">Capsules</a></li>
          <li><a href="all-products.html">Gummies</a></li>
          <li><a href="all-products.html">Liquid</a></li>
          <li><a href="all-products.html">Powder</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Company</p>
        <ul class="footer__links">
          <li><a href="about.html">About</a></li>
          <li><a href="join.html">Join</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-label">Legal</p>
        <ul class="footer__links">
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Return Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__fda">*These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.</p>
      <p class="footer__copy">© 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790</p>
    </div>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `contact.html` in browser and verify**

Confirm:
- 2-col contact hero: headline + sub-text left, 3 info cards right
- Form + FAQ in 2-col side-by-side layout
- All 5 FAQ items accordion properly
- Topic dropdown, optional order # field visible
- Footer renders correctly

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: contact page v2 — form + FAQ sidebar, info cards"
```

---

## Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Full dark mode — `#1C1F29` / `#22252F` section rhythm | Task 1 (CSS) |
| All design tokens (colors, typography, spacing) | Task 1 (CSS) |
| Ghost navbar on load → frosted glass on scroll | Task 1 (CSS) + Task 2 (JS) |
| Grid texture on hero/page-header sections | Task 1 (CSS) |
| Red glow under product images | Task 1 (CSS — `.product-card__image-wrap::after`) |
| GSAP hero entrance animation | Task 2 (JS) |
| GSAP ScrollTrigger section reveals + stagger | Task 2 (JS) |
| GSAP card hover (`y: -2`, `duration: 0.2`) | Task 2 (JS) |
| `prefers-reduced-motion` guard on all GSAP | Task 2 (JS) |
| Benefits marquee — CSS `@keyframes` | Task 1 (CSS) + Task 3 (HTML) |
| FAQ accordion — CSS `max-height` + JS toggle | Task 1 (CSS) + Task 2 (JS) |
| Home page — 8 sections | Task 3 |
| Product page — breadcrumb, detail, ingredients, related | Task 4 |
| All Products — 18 products, category tabs, sidebar filters, pagination | Task 5 |
| Join — offer hero, what's included, product picker (8 cards), form | Task 6 |
| About — 7 sections + join CTA | Task 7 |
| Contact — hero, form, FAQ sidebar | Task 8 |
| Netlify deployment config | Pre-existing `netlify.toml` — no changes needed |
| Google Fonts (Plus Jakarta Sans + Inter) | Task 1 (CSS `@import`) |
