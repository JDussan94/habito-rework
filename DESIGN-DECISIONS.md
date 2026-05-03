# Habito V2 — Design Decisions & Rationale

A reference document comparing the new design against the original habitolife.com, with the reasoning behind each major decision.

---

## 1. Dark Mode Design System

**Original site:** Light/white background with a green accent palette — a common pattern in the supplement industry that makes the brand blend in with dozens of similar Shopify stores.

**New design:** Deep dark backgrounds (`#1C1F29` base, `#22252F` for elevated sections) with a bold red accent (`#D42F2F`).

**Why:** Dark mode signals premium, creates visual contrast that makes product imagery pop, and immediately sets Habito apart from the typical "green health brand" aesthetic. Red communicates energy, urgency, and action — which aligns with the supplement market's core customer psychology. The alternating dark base / dark lift pattern creates depth without needing borders or heavy card outlines.

---

## 2. Typography System

**Original site:** Default Shopify theme fonts — serviceable but generic.

**New design:** Two-font system — **Plus Jakarta Sans** (display, headings, brand) paired with **Inter** (body, UI text).

**Why:** Plus Jakarta Sans has a confident, geometric character that reads as modern and trustworthy at large sizes. Inter is the industry standard for readability at small sizes on screens. The pairing gives the brand editorial authority — it reads like a brand that takes itself seriously without being stiff.

---

## 3. Sticky Navbar with Scroll Blur

**Original site:** Standard fixed-position navbar, always visible with a solid background.

**New design:** Navbar starts transparent over the hero, then gains a frosted-glass blur effect (`backdrop-filter: blur(16px)`) when the user scrolls past 20px.

**Why:** The transparent-to-frosted transition is a signature modern UX pattern (used by Apple, Linear, Notion). It keeps the hero section immersive on first load and then becomes functional once the user starts scrolling. The navbar content aligns with the page container (1200px max-width) for consistency.

---

## 4. Animated Marquee

**Original site:** No equivalent — static sections only.

**New design:** A continuous horizontal marquee of 10 benefit labels (Steady Endurance, Muscle Support, Lean Strength, etc.) between the hero and product section.

**Why:** The marquee communicates product breadth at a glance without requiring the user to read a bullet list. It adds kinetic energy to the page without the bandwidth cost of video. It also reinforces brand vocabulary subliminally as users scroll past it. CSS `prefers-reduced-motion` is respected — the animation pauses for users who have that accessibility setting enabled.

---

## 5. GSAP Scroll Animations

**Original site:** No scroll animations — static page.

**New design:** Sections and staggered grids animate in with fade + upward translate on scroll, using GSAP 3 + ScrollTrigger.

**Why:** Scroll-triggered reveals guide attention, create a sense of discovery, and make the page feel alive. GSAP was chosen over CSS scroll animations because it gives precise control over easing, duration, and stagger timing, and has better cross-browser compatibility. Animations are subtle (not decorative) — they serve the content rather than distract from it.

---

## 6. Membership as a Primary Business Driver

**Original site:** The membership offer exists but is not foregrounded in the design hierarchy.

**New design:** A dedicated red full-bleed CTA section appears on both the homepage and the About page, and `join.html` is a full conversion page with a product picker, bundle summary, and order form.

**Why:** The $75-for-$150 membership offer is Habito's strongest differentiator. Surfacing it prominently on every page ensures it's seen, understood, and acted on. The red section creates a strong visual interrupt — it signals "this is important" without being aggressive.

---

## 7. Product Card Design

**Original site:** Standard Shopify product grid with white cards.

**New design:** Dark cards with a subtle radial red glow at the base of each product image, a clean category/name/price layout, and an "Add +" button that appears on hover.

**Why:** The glow effect gives supplement bottles a sense of presence without needing professional photography with custom backgrounds. The minimal card layout keeps focus on the product name and price. The hover-reveal "Add +" keeps the grid clean at rest while still being actionable.

---

## 8. Value Proposition Section

**Original site:** Benefits listed in standard text blocks.

**New design:** A dedicated "Why Habito" section with three value cards (Premium Ingredients, Proven Results, Community Support) and a pull-quote: *"You pay for the product, not the marketing."*

**Why:** Supplement shoppers are skeptical by default — they've been burned by hype. The section directly addresses that skepticism and gives them a reason to trust the brand before they see a price. The pull-quote format is memorable and shareable.

---

## 9. FAQ Accordion

**Original site:** No FAQ section on the homepage.

**New design:** FAQ accordion on the homepage and a more detailed one on the Contact page (5 questions covering shipping, returns, testing, membership, and international shipping).

**Why:** FAQs reduce support burden and remove purchase hesitation. The accordion format keeps the page compact — questions are scannable, and answers only take up space when needed. All buttons have correct `aria-expanded` attributes for accessibility.

---

## 10. Six-Page Architecture

**Pages:** Home, All Products, Product Detail, About, Contact, Join.

**Original site:** Shopify multi-page store with dozens of system-generated pages.

**New design:** Lean six-page structure covering every conversion-critical path: discover → browse → decide → trust → ask → buy.

**Why:** A focused information architecture eliminates decision fatigue. Every page has a clear job. The Join page is the primary conversion destination; every other page points toward it.

---

## Summary Table

| Decision | Original | New | Reason |
|---|---|---|---|
| Color scheme | Light / green | Dark / red | Premium positioning, energy |
| Typography | Theme default | Plus Jakarta Sans + Inter | Editorial authority |
| Navbar | Solid / static | Transparent → blur on scroll | Modern UX, immersive hero |
| Page motion | None | GSAP scroll reveals | Engagement, guided attention |
| Membership CTA | Buried | Prominent on every page | Primary business driver |
| Product cards | White Shopify | Dark + glow + hover actions | Product-first, premium |
| Benefits | Text lists | Animated marquee | Kinetic, scannable |
| FAQ | None on homepage | Accordion on home + contact | Reduce hesitation, reduce support |
| Page count | Many (Shopify system) | 6 focused pages | Clear conversion path |
