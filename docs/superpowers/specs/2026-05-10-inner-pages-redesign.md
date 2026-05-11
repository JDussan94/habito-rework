# Habito Inner Pages Redesign — Design Spec
**Date:** 2026-05-10  
**Scope:** 5 inner pages — About, Shop (all-products), Product Detail, Join, Contact  
**Direction:** Page Personality — each page gets a defining visual motif while sharing the brand vocabulary

---

## Shared Design System

All pages inherit the existing tokens from `styles/main.css`:

| Token | Value |
|---|---|
| Iron Shadow | `#1C1F2A` |
| Fire Pulse Red | `#D22630` |
| Light Base | `#FFFFFF` |
| Light Lift | `#F5F5F7` |
| Display font | Helvetica Neue, 700, uppercase |
| Eyebrow | 0.75rem, 700, uppercase, letter-spacing 3px, red |

**Rules that apply to every page:**
- Navbar: sticky frosted glass — unchanged
- Footer: unchanged
- GSAP `gsap-reveal` / `gsap-stagger` classes on scroll-in elements — unchanged
- Red duotone technique: `filter: grayscale(1); mix-blend-mode: multiply` on image against red background
- Canvas grain: reuse `initTestimonialGrain()` where dark cards appear
- No inline `style=""` attribute blocks — all new styles go into `main.css` under a clearly labeled page section
- No emojis anywhere — replace with SVG icons or typographic markers
- No section structure copy-pasted between pages

---

## Page 1 — About (`about.html`)

**Motif: Numbers & Proof**  
The brand's credibility is told through data, not copy. Big bold stats replace the generic dark hero. A diagonal red/dark split creates the hero moment. Below, sections flow through distinct layout compositions.

### Sections

**1. Hero — Diagonal Stats Split**
- Full-viewport split: left half Fire Pulse red, right half Iron Shadow `#1C1F2A`
- Diagonal divider: skewed `clip-path` or CSS `transform: skewX` seam between halves
- Left: company founding year `2022` in massive display type (8–10rem), city below in ghost caps
- Right: three stacked stats (`10K+ Members`, `18 Products`, `$0 Ad Spend`) each with a large number in white and a ghost label
- Red accent line at the very bottom of the section (3px)
- GSAP: left side slides in from left, right stats count up on enter (use GSAP `TextPlugin` or manual counter)

**2. Manifesto Block — Full-bleed dark, pull-quote format**
- Background: Iron Shadow `#1C1F2A` with subtle canvas grain overlay
- A single large italic pull-quote centered: _"You pay for the product, not the marketing."_
- Quote marks rendered as decorative oversized SVG quotation marks in red at 10% opacity
- Below: 2-column prose grid (How We Started / Choose Better tagline)
- Location badge bottom-left: pin SVG + "Saint George, UT"

**3. Values — Horizontal scroll tape**
- Background: Light Lift `#F5F5F7`
- Instead of a 4-card grid (already used on homepage): horizontal strip of 4 values
- Each value: large red number (01–04) on left, title + single-line descriptor on right, separated by a 1px vertical red rule
- Full-width, no gaps between value blocks — divided only by the vertical rule
- GSAP stagger: each block slides up on scroll

**4. Commitments — Staggered 2-col list on white**
- Background: white
- Left column: large eyebrow + H2 ("OUR COMMITMENTS.")
- Right column: numbered list — each item has a red number, bold title, and body text
- Items appear with GSAP stagger, slightly offset horizontally

**5. Final CTA band** — unchanged (Fire Pulse red, "READY TO BUILD THE HABIT?")

### New CSS classes needed
```
.about-hero-split, .about-hero__left, .about-hero__right,
.about-stat, .about-stat__num, .about-stat__label,
.about-manifesto, .about-manifesto__quote,
.about-values-tape, .about-value-block,
.about-commitments-split
```

---

## Page 2 — Shop (`all-products.html`)

**Motif: Editorial Catalog**  
No separate dark hero section. The page opens directly into the catalog with a compact editorial header. Products are the hero — the layout is built to put them front and center. Category tabs are sticky. Best-seller cards get a red top border accent.

### Sections

**1. Catalog Header — Compact editorial strip**
- Background: white
- Thin horizontal band (not a full section): eyebrow "Habito Essentials" + large H1 "ALL PRODUCTS." + product count ghost text — all in one row, left-aligned
- Below it: sticky category tab bar (already exists, keep behavior, restyle)
- No standalone hero section

**2. Catalog Body — Sidebar + Grid**
- Same layout: sidebar filters left, product grid right
- Sidebar: redesigned — filter labels get a red underline accent on hover/active; checkboxes replaced with custom red square toggles; section dividers use a thin red rule
- Product cards: redesign the card
  - White background with very subtle shadow
  - Image area: full-bleed, no padding, `border-radius: 0`
  - Below image: product name in display bold, benefit in ghost text, price in red, "ADD TO CART +" button in full-width outline
  - Best Seller badge: repositioned to bottom-left of image, Iron Shadow background, Fire Pulse red text
  - Red 2px top border on bestseller cards only

**3. Between categories — Editorial divider**
- Static HTML: a `.catalog-divider` element placed between category groups in the product grid
- Iron Shadow background, category name in large display type ("CAPSULES", "GUMMIES", etc.) across the full grid width
- Not dynamically injected on filter — this is a static prototype, dividers live in the HTML
- Gives the page an editorial magazine feel on initial load

### New CSS classes needed
```
.catalog-header, .catalog-header__row,
.catalog-sidebar--v2, .filter-toggle,
.product-card--v2, .product-card__top-accent,
.catalog-divider
```

---

## Page 3 — Product Detail (`product.html`)

**Motif: Dark Science Panel**  
The entire purchase zone lives in Iron Shadow dark. The product feels premium and clinical. Ingredients are presented as a data bar — doses prominent. Below the fold transitions to light sections.

### Sections

**1. Product Zone — Full Iron Shadow**
- Background: `#1C1F2A` for the entire product purchase section
- Layout: 50/50 split grid
  - Left: product image centered, thumbnail strip below, subtle red glow behind image (`box-shadow: 0 0 60px rgba(210,38,48,0.15)`)
  - Right: eyebrow category + product name + star rating + price row (member / retail / badge) + format selector + qty + Add to Cart
  - "Add to Cart" button: Fire Pulse red, full-width, uppercase
- Breadcrumb: redesigned — appears above the dark section on a white strip; chevron separators in red

**2. Ingredient Data Bar**
- Full-width strip between the dark purchase zone and the light ingredients section
- Background: Fire Pulse red
- 3 columns (one per ingredient): large dose number, ingredient name below
- Compact, clinical — like a pharmaceutical data sheet
- Text all white

**3. Key Ingredients — Light section**
- Background: Light Lift
- Each ingredient gets a card with: ingredient name as H3, dose in red, benefit paragraph, and a thin red left-border accent
- Cards in a 3-col grid, no box shadow — use left-border + background contrast instead

**4. Related Products — White background**
- Same structure as current but cards use the new product-card--v2 style
- Section header: flex row, "You May Also Like" left, "View All →" ghost link right

### New CSS classes needed
```
.product-zone, .product-zone__image-wrap, .product-zone__glow,
.ingredient-data-bar, .ingredient-data-bar__item, .ingredient-data-bar__dose,
.ingredient-card--v2,
.breadcrumb--light
```

---

## Page 4 — Join (`join.html`)

**Motif: Bold Value Wall**  
Fire Pulse red is the dominant color — the entire above-fold experience lives on red. `$75` renders at display scale (8–10rem). The value items lose emojis and become clean numbered tiles on a dark overlay. The form section is dark with an inline order summary.

### Sections

**1. Hero — Red full-bleed value wall**
- Background: Fire Pulse red `#D22630`
- Centered layout
- Top: eyebrow "One-Time · No Recurring Fees" in white/55% opacity
- `$75` in massive display type (9rem+), white, tight letter-spacing
- Below the price: a 4-item horizontal strip of included items — dark overlay tiles (`rgba(0,0,0,0.15)`), no emojis, numbered 01–04 with a brief title
- CTA button: Iron Shadow background, white text ("Join Habito →")
- Canvas grain overlay at low opacity (5%) for texture consistency with homepage

**2. What's Included — Dark editorial list**
- Background: Iron Shadow
- Full-width, 2-col layout
- Left: H2 "WHAT YOU GET." + a short supporting paragraph
- Right: 4 items, each with a red number, bold title, and descriptor — no cards, just a clean numbered list with red rule separators
- GSAP stagger on scroll

**3. Product Picker — Light section**
- Background: Light Lift
- Same function as current — select products for bundle
- Picker cards redesigned: white background, clean product name, red checkmark overlay on selected state
- No picsum placeholders — use placeholder with Habito brand color fill

**4. Sign-Up Form — Iron Shadow**
- Background: Iron Shadow
- Left 60%: form fields (white inputs on dark — `background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12)`)
- Right 40%: sticky order summary panel with line items and total
- Submit: Fire Pulse red, full-width

### New CSS classes needed
```
.join-hero, .join-hero__price, .join-hero__items, .join-hero__item-tile,
.join-whats-included, .join-included-list, .join-included-item,
.picker-card--v2, .picker-card__check,
.join-form-section, .join-form__grid, .join-order-summary
```

---

## Page 5 — Contact (`contact.html`)

**Motif: Typographic Split**  
The contact hero is a permanent 50/50 split: Iron Shadow left with massive display type + contact info, white right with the form. No separate hero section — the form IS the hero. The FAQ below is styled with the same Iron Shadow + accordion pattern but in a fresh typographic format.

### Sections

**1. Contact Split — Full viewport height**
- Left panel: Iron Shadow background, padding 60px
  - Large display type "WE'RE HERE TO HELP." — "HELP." wraps and is colored Fire Pulse red
  - Below: 3 contact info rows, each with a bold label (Address / Email / Hours) and value, separated by thin white/10% rules
  - Bottom: location pin SVG + "Saint George, UT" in ghost caps
- Right panel: white background, padding 60px
  - Eyebrow "Send a Message" + H2 "GET IN TOUCH."
  - Form fields: clean, bordered, full-width
  - Topic dropdown styled to match
  - Submit: Fire Pulse red full-width

**2. FAQ — Iron Shadow accordion**
- Background: Iron Shadow (same as homepage FAQ — but with a fresh intro)
- New intro: eyebrow + H2 left-aligned, with a red accent line underneath H2 (2px, 40px wide)
- Accordion items: same SVG toggle logic, but question text in white/80%, answer text in white/55%
- Active item: question text goes to white 100%, left border animates in as a 2px red line
- 5 FAQ items (add one for "Do you ship internationally?" — already in the current contact page)

### New CSS classes needed
```
.contact-split, .contact-split__left, .contact-split__right,
.contact-info-list, .contact-info-row,
.faq--dark (variation of existing .faq with red left-border active state)
```

---

## Animation Plan (GSAP)

All existing `gsap-reveal` and `gsap-stagger` hooks in `main.js` continue to work. Additional animations needed:

| Element | Animation |
|---|---|
| About hero stats | Counter animation on scroll enter (manual RAF counter) |
| About hero split | Left slides from -60px, right from +60px simultaneously |
| Join hero `$75` | Scale from 0.85 → 1 + fade on page load |
| Ingredient data bar | Items slide up with 0.1s stagger |
| Product image glow | Pulse: `gsap.to` on `box-shadow` opacity, loop |

---

## Implementation Notes

- All new CSS goes into `styles/main.css` under clearly labeled `/* === PAGE: ABOUT === */` comment blocks
- No new CSS files — maintain the single-stylesheet architecture
- New GSAP animations go into `js/main.js` under matching page-specific comment blocks
- Page detection: use `document.body.dataset.page` or check `location.pathname` to scope animations
- Each page should have `data-page="about"` (etc.) on `<body>` for JS scoping
- Images: all `images/` references remain unchanged; no new images required
- Mobile responsiveness: all new layouts must stack to single column at `max-width: 768px`
