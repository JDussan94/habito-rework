# Habitolife Redesign — Design Spec
**Date:** 2026-05-01  
**Project:** habitolife.com redesign — static HTML/CSS reference for Webflow  
**Client:** Habito, LLC  
**Designer:** Claude Code

---

## 1. Project Overview

A visual redesign of [habitolife.com](https://www.habitolife.com/) — a supplement e-commerce brand based in Saint George, UT. The deliverable is a set of static HTML/CSS files (one per page) that serve as a design reference for rebuilding the site in Webflow. The files will also be used to present the design direction to the client.

**Pages:** Home, Product (single), All Products, Join, About, Contact  
**Approach chosen:** Bold Contrast (Option B) — dark navy hero/nav, white content sections, red CTAs  
**Reference sites:** wellcollective.com, nutrabio.com, vitaboom.com

---

## 2. Design System

### 2.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| Navy | `#1C1F29` | Navbar, hero sections, value prop sections, footer |
| Red | `#D42F2F` | All CTAs/buttons, eyebrow labels, accent lines, badges |
| White | `#FFFFFF` | Content section backgrounds, cards |
| Light Gray | `#F7F7F7` | Alternate section backgrounds, sidebar |
| Border | `#EBEBEB` | Card borders, dividers, form inputs |
| Text Primary | `#1C1F29` | Body headings, product names |
| Text Secondary | `#666666` | Body text, descriptions |
| Text Muted | `#888888` | Meta, labels, placeholders |

### 2.2 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headings | Plus Jakarta Sans | 800 | All page titles, section headings, product names |
| Subheadings | Plus Jakarta Sans | 700 | Card titles, nav items |
| Body | Inter | 400 / 500 | Descriptions, paragraphs, form labels |
| Labels / Eyebrows | Inter | 600–700 | Uppercase, letter-spacing: 2–4px |

Both fonts loaded via Google Fonts.

### 2.3 Spacing & Layout

- **Max content width:** 860px (mockup), expandable to 1200px in Webflow
- **Section padding:** 52–72px vertical, 40px horizontal
- **Card border-radius:** 6–8px
- **Button border-radius:** 3–4px
- **Grid gaps:** 16–20px (product grids), 32–48px (content grids)

### 2.4 Buttons

| Type | Style |
|---|---|
| Primary | `background: #D42F2F`, white text, `padding: 12–14px 24–36px`, `border-radius: 3px`, uppercase, letter-spacing |
| Secondary | White background, `color: #D42F2F`, used on red sections |
| Dark | `background: #1C1F29`, white text — product "Add to Cart" |
| Ghost | Text only + bottom border underline — nav secondary CTAs |

### 2.5 Design Constraints

- Animations: subtle, purposeful — no heavy or distracting motion
- Fully responsive: mobile, tablet, desktop
- All images are placeholders (gray boxes) — client supplies product photography

### 2.6 Animation System

All animations use CSS only (no JS libraries). Kept subtle and purposeful to complement the minimalist aesthetic.

| Animation | Element | Technique |
|---|---|---|
| Fade-in on scroll | Sections, cards, headings | `IntersectionObserver` + CSS `@keyframes fadeInUp` |
| Benefits marquee | Benefits bar | CSS `@keyframes marquee` infinite scroll |
| Navbar shadow on scroll | Navbar | `IntersectionObserver` adds `.scrolled` class |
| Product card hover | Cards (all grids) | CSS `transition: transform 0.2s, box-shadow 0.2s` — subtle lift |
| Button hover | All primary buttons | CSS `transition: background 0.2s` — slight darken |
| Form input focus | All inputs/textareas | CSS `transition: border-color 0.2s` |
| Image placeholder shimmer | All placeholder boxes | CSS `@keyframes shimmer` gradient sweep |
| FAQ open/close | FAQ items | CSS `max-height` transition for smooth expand |

---

## 3. Page Specs

### 3.1 Home Page

**Sections (top to bottom):**

1. **Navbar** — `#1C1F29` bg, HABITO wordmark, nav links (Shop ▾, Join, About, Contact), red "Join Now" CTA, search/account/cart icons
2. **Hero** — `#1C1F29` bg, 2-col grid: text left + product image placeholders right
   - Eyebrow: "Clean Supplements · No Gimmicks" (red)
   - Headline: "Choose Better. Live Greater."
   - Subheadline: "Clean Ingredients · Pure Performance · Real Results · No Gimmicks"
   - CTAs: "Make the Change Today" (red primary) + "Join & Save" (ghost)
3. **Benefits Bar** — `#1C1F29` bg, infinite CSS marquee of all 13 benefit labels with separators: *Steady Endurance, Muscle Support, Lean Strength, Faster Recovery, Core Stability, Deep Nourishment, Sustained Output, Peak Performance, Daily Resilience, Natural Vitality, Increased Muscle Power, Boost Strength Output, Enhance Muscle Density* — duplicated list for seamless loop
4. **Featured Products** — white bg, section title "Featured Products" + "View All →" link, 4-col product grid (real product names, placeholder prices)
5. **Value Proposition** — `#1C1F29` bg, section heading "More value. No gimmicks.", 3-col cards: (1) Premium clean ingredients (2) Effective proven results (3) Community support — with pull quote "You pay for the product, not the marketing" as a standalone line above or below the cards
6. **Join CTA** — `#D42F2F` bg, "Sign up today. Receive exclusive early-supporter gear." / "Over $150 in value for just $75" / perks list (products + T-shirt + shaker bottle) / white "Join Now →" button
7. **FAQ** — white bg, "Got questions? We've got answers.", 3 real FAQ items: How is Habito different? / Who are your products for? / How should I choose the right product?
8. **Footer** — `#1C1F29` bg, 4-col: brand + tagline / Shop links / Company links / Legal links, FDA disclaimer, © 2026 Habito, LLC, address: 1996 E 2540 S, Saint George, UT 84790

---

### 3.2 Product Page (Single)

**URL pattern:** `/products/[product-slug]`  
**Example used:** Blood Sugar Support (Capsules)

**Sections:**

1. **Navbar** — same as all pages
2. **Breadcrumb** — `#F7F7F7` bg — Home / Shop / [Category] / [Product Name]
3. **Product Detail** — white bg, 2-col grid:
   - **Left:** Main image (large placeholder) + 4 thumbnail images
   - **Right:** Category label (red), product name, star rating + review count, price (retail + member price), member savings badge, format selector (size options), qty control (–/number/+), "Add to Cart" (dark button), trust badges (free shipping / 3rd-party tested / 30-day returns), product description
4. **Key Ingredients** — `#F7F7F7` bg, 3-col cards — name, dosage, benefit description (placeholder content — client to fill)
5. **Related Products** — white bg, 4-col product grid
6. **Footer** — full footer

**Content note:** Individual product prices, descriptions, and ingredients are not publicly accessible on the current site. Placeholder content used throughout — client to supply.

---

### 3.3 All Products Page

**Sections:**

1. **Navbar**
2. **Page Hero** — `#1C1F29` bg, "All Products" + "Clean supplements. Real ingredients. No gimmicks." + product count (18)
3. **Catalog Body** — 2-col layout: sidebar + main grid
   - **Sidebar** (`#F7F7F7`): Filter sections — Category (All / Capsules 11 / Gummies 2 / Liquid 2 / Powder 3), Health Goal (Endurance, Strength, Recovery, Focus, Blood Sugar, Immunity), Price range
   - **Main:** Toolbar (active filter chips + sort dropdown), category tab bar (All / Capsules / Gummies / Liquid / Powder), 3-col product grid, pagination
4. **Footer** — slim footer

**All 18 real products by category:**
- **Capsules (11):** Blood Sugar Support, Brain Support, Cleanse, Hair Skin & Nails, HMB + D3, Immune+, Keto Burn, Libido Support, Natural Burn, Natural Testo Boost, NO2
- **Gummies (2):** Apple Cider Vinegar, Creatine (Tropical Punch)
- **Liquid (2):** Trace Minerals+ Fulvic Acid, Ionic Silver+ Trace Minerals
- **Powder (3):** Multi Collagen Peptides, Pre-Workout Sour Apple, Pre-Workout Raspberry Lemonade

---

### 3.4 Join Page

**Sections:**

1. **Navbar**
2. **Hero** — `#1C1F29` bg, centered: "Limited Offer · One-Time Fee" (red eyebrow), "Get $150 in Supplements for Only $75", strikethrough $150 → $75, "One-time payment · No recurring fees · No subscriptions"
3. **What's Included** — white bg, 2×2 grid of included items:
   - Collection of best Habito products
   - Exclusive early-supporter T-shirt
   - Shaker bottle
   - Free shipping + member pricing forever
4. **Product Selection** — `#F7F7F7` bg, 8-card picker grid "Choose Your Products" — real product names, select state shown
5. **Membership Perks** — `#1C1F29` bg, 4 bullet benefits
6. **Sign-up Form** — white bg, centered: first/last name, email, phone, shipping address, order total ($75), red "Join Habito — $75" button, no-recurring-charge note
7. **Footer** — full footer

**Content note:** The exact product selection mechanic (how many products, which ones) should be confirmed with the client — the offer states "a collection of our best Habito products" without specifying a fixed count.

---

### 3.5 About Page

**Sections:**

1. **Navbar**
2. **Hero** — `#1C1F29` bg, centered: "Our Story" eyebrow, "More Value. No Gimmicks." headline, brand mission paragraph
3. **Mission** — white bg, 2-col: "You pay for the product, not the marketing" copy | image placeholder
4. **What We Stand For** — `#F7F7F7` bg, 4-col value cards: Clean Ingredients / Pure Performance / Real Results / No Gimmicks (brand's own pillars)
5. **The Habito Story** — `#1C1F29` bg, 2-col narrative + pull quote "Choose Better. Live Greater."
6. **Our Commitments** — white bg, 2×2 numbered grid: Ingredient Transparency / Community First / Honest Pricing / Quality Sourcing
7. **Join CTA** — `#D42F2F` bg, "Ready to Choose Better?" + offer text + white button
8. **Footer** — full footer

**Content note:** The original About page did not surface unique text content. All narrative copy is written in Habito's brand voice and should be reviewed/replaced by the client with their actual About page text.

---

### 3.6 Contact Page (New Design)

**Sections:**

1. **Navbar**
2. **Hero** — `#1C1F29` bg, 2-col: headline ("We're here to help.") + sub-text | 3 info cards: address (1996 E 2540 S, Saint George, UT 84790), email (placeholder), response time
3. **Form + FAQ** — white bg, 2-col side by side:
   - **Left — Contact Form:** First/last name, email, topic dropdown, order # (optional), message textarea, "Send Message" (red), privacy note
   - **Right — FAQ:** "Got questions? We've got answers." with 5 FAQ items using real Habito FAQ content
4. **Map Strip** — `#F7F7F7`, placeholder with address label — Webflow Google Maps embed goes here
5. **Footer** — full footer

---

## 4. Shared Components

### Navbar (all pages)
- Background: `#1C1F29`
- Height: 56px (desktop)
- Logo: "HABITO" — Plus Jakarta Sans 800, white, letter-spacing: 3px
- Nav links: Shop ▾, Join, About, Contact — Inter 12px, `rgba(255,255,255,0.7)`
- CTA: "Join Now" — red button, right of nav links
- Icons: search, account, cart — right side

### Footer (full — Home, Product, About, Join, Contact)
- Background: `#1C1F29`
- 4-col grid: Brand+tagline / Shop (Capsules, Gummies, Liquid, Powder) / Company (About, Join, Contact) / Legal (Terms of Use, Privacy Policy, Return Policy)
- FDA disclaimer (required): *"These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease."*
- Copyright: © 2026 Habito, LLC. All rights reserved.
- Address: 1996 E 2540 S, Saint George, UT 84790

---

## 5. Delivery Format

**File structure:**
```
Projects/habitolife-redesign/
├── index.html          (Home)
├── product.html        (Single Product)
├── all-products.html   (Catalog)
├── join.html           (Membership)
├── about.html          (About)
├── contact.html        (Contact)
└── styles/
    └── main.css        (Shared design tokens + component styles)
```

**Client presentation options:**
1. **Local:** Open any `.html` file directly in a browser — no server needed
2. **Hosted:** Drop the folder into [Netlify Drop](https://app.netlify.com/drop) for an instant shareable link
3. **Webflow:** Use these files as visual reference when rebuilding — sections map 1:1 to Webflow sections/components

---

## 6. Content Corrections Applied vs. Original Site

| Element | Original | Applied in Design |
|---|---|---|
| Hero CTA | "Make the Change Today" | ✓ Corrected |
| Hero subheadline | 4 pillars | ✓ Corrected |
| Benefits labels | 13 specific phrases | ✓ Corrected |
| Join offer | Products + T-shirt + shaker | ✓ Corrected |
| FAQ questions | 3 real questions | ✓ Corrected |
| Footer links | Terms of Use, Privacy Policy, Return Policy | ✓ Corrected |
| Footer copyright | © 2026 Habito, LLC | ✓ Corrected |
| Footer address | 1996 E 2540 S, Saint George, UT 84790 | ✓ Corrected |
| FDA disclaimer | Full disclaimer text | ✓ Added |
| Product prices | Not public on site | Placeholder pricing used |
| Product descriptions | Not public on site | Placeholder content |
| About page copy | Not accessible via fetch | Brand-voice copy — client to review |
