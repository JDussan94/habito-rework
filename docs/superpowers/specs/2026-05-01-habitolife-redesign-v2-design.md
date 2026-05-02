# Habitolife Redesign v2 — Design Spec

**Date:** 2026-05-01
**Project:** habitolife.com redesign — static HTML/CSS/GSAP reference for Webflow
**Client:** Habito, LLC
**Version:** 2 (fresh start — replaces v1 spec)

---

## 1. Project Overview

A full visual redesign of [habitolife.com](https://www.habitolife.com/) — a supplement e-commerce brand based in Saint George, UT. The deliverable is a set of static HTML/CSS files (one per page) with GSAP animations, deployable to Netlify for client presentation and usable as a Webflow rebuild reference.

**Pages:** Home, Product (single), All Products, Join, About, Contact
**Design direction:** Full Dark Mode — Option A (premium, product-forward, every section dark)
**Section rhythm:** Tonal layers — alternating `#1C1F29` and `#22252F` to create visual separation without white sections

---

## 2. Design System

### 2.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--dark-base` | `#1C1F29` | Primary background — hero, nav, footer, odd sections |
| `--dark-lift` | `#22252F` | Alternate sections — creates tonal rhythm |
| `--dark-card` | `rgba(255,255,255,0.03)` | Card backgrounds (barely lifted from section bg) |
| `--red` | `#D42F2F` | CTAs, eyebrow labels, accent dots, active states, badges |
| `--red-glow` | `rgba(212,47,47,0.15)` | Radial glow under hero product images |
| `--white` | `#FFFFFF` | Primary text on dark |
| `--text-muted` | `rgba(255,255,255,0.45)` | Secondary text, descriptions, sub-headings |
| `--text-ghost` | `rgba(255,255,255,0.2)` | Placeholders, dividers, muted labels, footer copy |
| `--border` | `rgba(255,255,255,0.08)` | Card borders, section rules, input borders |
| `--border-active` | `#D42F2F` | Selected card/tab/input border |

### 2.2 Typography

| Role | Font | Weight | Size (desktop) |
|---|---|---|---|
| Display / H1 | Plus Jakarta Sans | 800 | 56–72px |
| H2 section heading | Plus Jakarta Sans | 700–800 | 36–48px |
| H3 card/subsection | Plus Jakarta Sans | 700 | 16–18px |
| Body | Inter | 400 | 14–15px |
| Body emphasis | Inter | 500–600 | 14px |
| Eyebrow labels | Inter | 700 | 10px, uppercase, letter-spacing: 3px |
| Prices | Plus Jakarta Sans | 600–700 | 14–20px |
| Buttons | Inter | 700 | 10px, uppercase, letter-spacing: 1px |

Both fonts loaded via Google Fonts.

### 2.3 Spacing & Layout

- **Base grid:** 8px
- **Section padding:** `80px 0` vertical, content constrained to `--max-w`
- **Max content width:** `1200px`
- **Card border-radius:** `4px`
- **Button border-radius:** `2–3px`
- **Grid gaps:** `8–12px` (product grids), `24–32px` (content grids)

### 2.4 Buttons

| Type | Style |
|---|---|
| Primary | `background: #D42F2F`, white text, `padding: 12px 24px`, `border-radius: 2px`, uppercase, letter-spacing: 1px |
| Secondary / Ghost | `border-bottom: 1px solid rgba(255,255,255,0.3)`, white text, no background |
| Dark Outline | `border: 1px solid rgba(255,255,255,0.15)`, white text — product "Add to Cart" |
| White (on red) | `background: #fff`, `color: #D42F2F` — Join CTA section |

### 2.5 Product Cards (Mix of A + C style)

- Thin 1px border: `rgba(255,255,255,0.08)`
- Card background: `rgba(255,255,255,0.03)` — barely visible lift
- Image area: product floats on very subtle dark bg with a faint red radial glow underneath
- Text below image: category label (red eyebrow) → product name → price + "Add +" button
- Hairline rule: `1px solid rgba(255,255,255,0.05)` at bottom of text area
- Hover: `transform: translateY(-2px)` + border brightens to `rgba(255,255,255,0.15)` (GSAP)

### 2.6 Navbar (Mix of A + C style)

- **On load:** Ghost — fully transparent, no border, seamlessly blends into dark hero
- **On scroll (>80px):** Frosted glass — `background: rgba(28,31,41,0.85)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid rgba(255,255,255,0.06)` — transition via JS classList
- **Height:** 60px desktop
- **Logo:** "HABITO" — Plus Jakarta Sans 800, white, `letter-spacing: 4px`
- **Nav links:** Shop ▾ | About | Contact — Inter 11px, `rgba(255,255,255,0.5)`, no underline
- **CTA:** "Join Now" — red button, right of nav links
- **Icons:** search, account, cart — far right

### 2.7 Section Texture

- Hero sections use a subtle grid texture: `repeating-linear-gradient` at `rgba(255,255,255,0.015)`, 1px lines every 36px, both axes
- Applied only to `#1C1F29` hero/page-header sections — not to `#22252F` content sections

### 2.8 Animation System (GSAP)

All animations use GSAP + ScrollTrigger. `prefers-reduced-motion` check wraps all animations.

| Animation | Element | Trigger | Config |
|---|---|---|---|
| Hero entrance | `.hero-text`, `.hero-products` | Page load | `opacity: 0, y: 40`, `duration: 0.9`, `ease: power3.out`, stagger 0.15s |
| Section entrance | Headings, cards, content blocks | `top 80%` scroll | `opacity: 0, y: 30`, `duration: 0.7`, `ease: power2.out` |
| Card grid stagger | Product card grids | `top 80%` scroll | stagger `0.08s`, `y: 20` |
| Navbar transition | `.navbar` | scroll > 80px | classList toggle, CSS transition handles blur/bg |
| Card hover | Product cards | mouseenter/leave | `scale: 1.02`, `duration: 0.2`, `ease: power1.out` |
| Benefits marquee | `.marquee-track` | Continuous | CSS `@keyframes marquee` infinite — no GSAP needed |
| FAQ accordion | `.faq-item` | click | `maxHeight` toggle, CSS transition |

---

## 3. Page Specs

### 3.1 Home Page (8 sections)

1. **Navbar** — ghost on load, frosted glass on scroll, sticky
2. **Hero** — `#1C1F29` + grid texture, 2-col: manifesto copy left (eyebrow → H1 → sub → 2 CTAs) / 3 product bottles right with red glow underneath. GSAP entrance on load.
   - Eyebrow: "Clean Supplements · No Gimmicks" (red)
   - H1: "Choose Better. Live Greater."
   - Sub: "Clean Ingredients · Pure Performance · Real Results · No Gimmicks"
   - CTAs: "Make the Change Today" (red primary) + "Join & Save →" (ghost)
3. **Benefits Marquee** — `#D42F2F` bg, infinite CSS scroll, 13 labels: *Steady Endurance · Muscle Support · Lean Strength · Faster Recovery · Core Stability · Deep Nourishment · Sustained Output · Peak Performance · Daily Resilience · Natural Vitality · Increased Muscle Power · Boost Strength Output · Enhance Muscle Density*
4. **Featured Products** — `#22252F`, section heading + "View All →", 4-col product card grid, GSAP stagger on scroll
5. **Value Proposition** — `#1C1F29`, "Why Habito" eyebrow, "More Value. No Gimmicks." H2, pull quote italic "You pay for the product, not the marketing.", 3-col value cards (red dot → title → text): Premium Ingredients / Proven Results / Community Support
6. **Join CTA** — `#D42F2F` full-bleed, "Limited Offer · One-Time Fee" eyebrow, "Get $150 in Supplements for Only $75" H2, strikethrough $150 → $75, perks list, white "Join Habito — $75 →" button
7. **FAQ** — `#22252F`, "Got questions? We've got answers.", 3 items with CSS accordion: How is Habito different? / Who are your products for? / How do I choose the right product?
8. **Footer** — `#1C1F29`, 4-col: Brand+tagline / Shop (Capsules, Gummies, Liquid, Powder) / Company (About, Join, Contact) / Legal (Terms of Use, Privacy Policy, Return Policy), FDA disclaimer, © 2026 Habito, LLC, 1996 E 2540 S, Saint George, UT 84790

### 3.2 Product Page (Single)

**Example:** Blood Sugar Support (Capsules)

1. **Navbar** (shared)
2. **Breadcrumb** — `#1C1F29`, `border-bottom: 1px solid rgba(255,255,255,0.06)` — Home / Shop / Capsules / [Product Name]
3. **Product Detail** — `#1C1F29`, 2-col grid:
   - **Left:** Main image (large, red glow underneath) + 4 thumbnails below
   - **Right:** Category eyebrow (red) → product name → star rating + review count → price row (member price + strikethrough retail + "Member Price" badge) → format selector → qty control (−/n/+) → "Add to Cart" (dark outline button) → trust badges (Free Shipping / 3rd-Party Tested / 30-Day Returns) → product description
4. **Key Ingredients** — `#22252F`, "What's Inside" eyebrow, "Key Ingredients" H2, 3-col ingredient cards (name → dosage in red → benefit text → hairline rule)
5. **Related Products** — `#1C1F29`, "You May Also Like" + "View All →", 4-col product grid
6. **Footer** (shared)

### 3.3 All Products Page

1. **Navbar** (shared)
2. **Page Hero** — `#1C1F29` + grid texture, "Habito Essentials" eyebrow, "All Products" H1, "Clean supplements. Real ingredients. No gimmicks.", product count "18 products across 4 categories"
3. **Category Tabs** — `#1C1F29`, sticky below nav: All (18) / Capsules (11) / Gummies (2) / Liquid (2) / Powder (3) — active tab has red `border-bottom`
4. **Catalog Body** — `#22252F`, 2-col layout:
   - **Sidebar** (`#1C1F29`, `border-right: 1px solid rgba(255,255,255,0.06)`): Category filter, Health Goal filter (Endurance / Strength / Recovery / Focus / Blood Sugar / Immunity), Price Range slider
   - **Main:** Toolbar (active filter chips in red + sort dropdown) → 3-col product card grid → GSAP stagger on scroll
5. **Pagination** — `#22252F`, centered page buttons, active in red
6. **Footer** (slim — FDA + copyright only)

**All 18 products:**
- **Capsules (11):** Blood Sugar Support, Brain Support, Cleanse, Hair Skin & Nails, HMB + D3, Immune+, Keto Burn, Libido Support, Natural Burn, Natural Testo Boost, NO2
- **Gummies (2):** Apple Cider Vinegar, Creatine (Tropical Punch)
- **Liquid (2):** Trace Minerals+ Fulvic Acid, Ionic Silver+ Trace Minerals
- **Powder (3):** Multi Collagen Peptides, Pre-Workout Sour Apple, Pre-Workout Raspberry Lemonade

### 3.4 Join Page

1. **Navbar** (shared)
2. **Hero** — `#1C1F29` + grid texture, centered: "Limited Offer · One-Time Fee" eyebrow, "Get $150 in Supplements for Only $75" H1, strikethrough $150 → $75, "One-time payment · No recurring fees · No subscriptions"
3. **What's Included** — `#22252F`, 2×2 card grid: Collection of best Habito products / Exclusive early-supporter T-shirt / Shaker bottle / Free shipping + member pricing forever
4. **Product Picker** — `#1C1F29`, "Choose Your Products" H2, 8-card picker grid — real product names, card border turns red on selected state
5. **Sign-up Form** — `#22252F`, centered: first/last name, email, phone, shipping address, order total ($75), red "Join Habito — $75 →" button, "No recurring charges. One-time payment only." note
6. **Footer** (shared)

**Content note:** Product selection mechanic (count and which products) to be confirmed with client.

### 3.5 About Page

1. **Navbar** (shared)
2. **Hero** — `#1C1F29` + grid texture, centered: "Our Story" eyebrow, "More Value. No Gimmicks." H1, brand mission paragraph
3. **Mission** — `#22252F`, 2-col: brand copy left ("You pay for the product, not the marketing") / image placeholder right
4. **What We Stand For** — `#1C1F29`, 4-col value cards (red dot): Clean Ingredients / Pure Performance / Real Results / No Gimmicks
5. **The Habito Story** — `#22252F`, 2-col narrative + pull quote "Choose Better. Live Greater."
6. **Our Commitments** — `#1C1F29`, 2×2 numbered grid: Ingredient Transparency / Community First / Honest Pricing / Quality Sourcing
7. **Join CTA** — `#D42F2F` full-bleed, "Ready to Choose Better?" + offer text + white button
8. **Footer** (shared)

**Content note:** All narrative copy written in Habito's brand voice — client to review and replace with actual About page text.

### 3.6 Contact Page

1. **Navbar** (shared)
2. **Hero** — `#1C1F29` + grid texture, 2-col: "We're here to help." H1 + sub-text left / 3 info cards right (address, email placeholder, response time)
3. **Form + FAQ** — `#22252F`, 2-col side by side:
   - **Left — Contact Form:** First/last name, email, topic dropdown, order # (optional), message textarea, red "Send Message" button, privacy note
   - **Right — FAQ:** "Got questions?" heading, 5 FAQ items with same accordion as home page
4. **Footer** (shared)

---

## 4. Shared Components

### Navbar
- Ghost on load → frosted glass on scroll (`backdrop-filter: blur(16px)`)
- Height: 60px · Logo: Plus Jakarta Sans 800, white, letter-spacing 4px
- Links: Shop ▾ | About | Contact · CTA: "Join Now" red button · Icons: search, account, cart

### Footer (full)
- `#1C1F29` · 4-col grid · FDA disclaimer · © 2026 Habito, LLC · 1996 E 2540 S, Saint George, UT 84790

### Benefits Marquee
- `#D42F2F` background · duplicated list for seamless loop · CSS `@keyframes marquee` infinite

### FAQ Accordion
- CSS `max-height` transition · GSAP not required · `+` → `−` icon toggle

---

## 5. Delivery Format

```
Projects/habitolife-redesign/
├── index.html            (Home)
├── product.html          (Single Product)
├── all-products.html     (Catalog)
├── join.html             (Membership)
├── about.html            (About)
├── contact.html          (Contact)
├── styles/
│   └── main.css          (Design tokens + all shared components)
├── js/
│   └── main.js           (GSAP animations, navbar scroll, FAQ accordion, scroll reveal)
└── netlify.toml          (Clean URL redirects)
```

**Client presentation options:**
1. **Local:** Open any `.html` file directly in browser — no server needed
2. **Hosted:** Drag folder to [Netlify Drop](https://app.netlify.com/drop) for instant shareable link
3. **Webflow:** Use as visual reference — sections map 1:1 to Webflow sections/components

---

## 6. Key Decisions & Rationale

| Decision | Choice | Reason |
|---|---|---|
| Dark throughout | All sections dark (`#1C1F29` / `#22252F`) | User specified full dark mode; tonal layers prevent visual fatigue |
| No "Join" text link in nav | Only "Join Now" CTA button | Redundant with the button; text link adds no value |
| Hero layout | Split: manifesto copy left, products right + grid texture | Mix of user-selected options A + C |
| Product cards | Thin border + product-forward, hairline rule | Mix of user-selected options A + C |
| Navbar | Ghost on load → frosted glass on scroll | Mix of user-selected options A + C |
| Animations | GSAP throughout | Master prompt requirement; CSS-only insufficient for scroll reveals + hover micro-interactions |
| Section separation | Tonal layers only | Cleaner than red dividers; scales to all 6 pages; most Webflow-friendly |
