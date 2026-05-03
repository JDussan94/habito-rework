# Client Presentation Guide — Habito V2 Design

A step-by-step walkthrough for presenting the redesign to the Habito client.

---

## Before the Meeting

### Option A — Run Locally (Recommended for in-person)

1. Open a terminal in the project folder:
   ```
   C:\Web Developer\Full Stack Developer\Claude Code\Projects\habitolife-redesign\
   ```
2. Start the local server:
   ```
   python -m http.server 8080
   ```
3. Open your browser and go to: `http://localhost:8080`
4. Use **Chrome** or **Edge** — they render backdrop-filter blur and GSAP animations best.
5. Set browser zoom to **100%** for the intended layout.
6. Open DevTools → toggle **Responsive Design Mode** (`Ctrl+Shift+M`) — you can show mobile view on the fly if the client asks.

### Option B — Share via GitHub (For remote review)

The project is live at: `https://github.com/JDussan94/habito-rework`

To enable a shareable preview link:
1. Go to the repo on GitHub
2. Settings → Pages → Source: **Deploy from branch** → Branch: `master` → Folder: `/ (root)`
3. Save — GitHub will generate a public URL (e.g., `https://jdussan94.github.io/habito-rework/`)
4. Share that URL with the client before the meeting so they can browse on their own device

---

## During the Presentation

### Step 1 — Set Context (2 min)

Before opening the browser, briefly frame what they're about to see:

> "We kept all your real content — the products, the pricing, the membership offer, the copy — and rebuilt the visual layer. The goal was to position Habito as a premium brand, not just another supplement store. Let me walk you through each page."

---

### Step 2 — Homepage (`index.html`)

Open the homepage. Walk through it **top to bottom** while scrolling slowly.

**Navbar:**
- Point out that it starts transparent over the hero and gains a frosted-glass effect on scroll.
- "This is a modern pattern — Apple, Linear, and other premium brands use it. It makes the first impression feel immersive."

**Hero section:**
- Headline: *"Choose Better. Live Greater."*
- "We kept your tagline front and center. The product imagery in the hero immediately shows the catalog without a separate section."

**Marquee:**
- Scroll past the hero so the marquee is visible.
- "This communicates your product range and benefits at a glance — it's dynamic without being distracting."

**Featured Products:**
- "Four featured products with real images and pricing. Clicking any card would go to the product detail page."

**Why Habito section:**
- "This section directly addresses the customer's biggest concern: 'Why should I trust this brand?' The pull-quote — *You pay for the product, not the marketing* — is memorable and on-brand."

**Membership CTA (red section):**
- "Your $75-for-$150 offer is your strongest differentiator. We made sure it appears on every page in a high-contrast block that's impossible to miss."

**FAQ:**
- Click a question to show the accordion open/close.
- "Three high-priority questions. These reduce hesitation right before someone might bounce."

---

### Step 3 — All Products (`all-products.html`)

Click "Shop" in the navbar.

- "All 18 products are here with real images. There's a category filter bar at the top — Capsules, Gummies, Liquid, Powder."
- Click a filter to demonstrate it working.
- "The grid reflows cleanly. Each card has a hover state with the Add button."

---

### Step 4 — Product Detail (`product.html`)

Click any product card (or navigate directly to `product.html`).

- "This is the Blood Sugar Support detail page. It shows the main image, thumbnail switcher, pricing, the Add to Cart button, and the ingredient/dosage breakdown."
- Click a thumbnail to show the image swap.
- "The related products at the bottom keep people browsing."

---

### Step 5 — About Page (`about.html`)

Click "About" in the navbar.

- "The About page tells your brand story — where you started, why you built Habito, and what you stand for. The four core values and four commitments give customers a reason to trust the brand before they buy."
- "The Join CTA at the bottom gives them a clear next step off every page."

---

### Step 6 — Contact Page (`contact.html`)

Click "Contact" in the navbar.

- "Simple contact form with topic selection. The FAQ on the right handles the five most common support questions — shipping, returns, third-party testing, membership, and international shipping."
- "This setup should reduce your inbound support volume significantly."

---

### Step 7 — Join Page (`join.html`)

Click "Join Now" in the navbar.

- "This is the conversion page. It starts with the offer, shows what's included — the product bundle, the t-shirt, the shaker bottle, free shipping — and then lets them pick which products they want in their bundle."
- Click a picker card to show the selected/deselected state toggle.
- "The form below captures their info and shows the order summary before they submit."

---

### Step 8 — Show Mobile View (Optional, 2 min)

Press `Ctrl+Shift+M` in Chrome DevTools. Set the width to **390px** (iPhone 14).

- "All six pages are fully responsive. The nav collapses, the grids stack, and all the interactions work on touch."

---

## Handling Common Client Questions

**"Can we change the colors?"**
> "Yes — the entire color system is defined in one place in the CSS. Swapping the red accent or the background shades takes about 5 minutes."

**"Can we use different fonts?"**
> "Yes — both fonts load from Google Fonts. We can swap them out easily. The current pairing (Plus Jakarta Sans + Inter) was chosen for premium readability but nothing is locked in."

**"What about the images — can we add more products?"**
> "Adding a product is three steps: drop the image in the images/products folder, add the card HTML in all-products.html, done. It's a simple template."

**"Can we connect this to a real store / payment?"**
> "This is a front-end prototype. Connecting it to Shopify, WooCommerce, or a payment provider is the next phase — this gives us the design approved before we wire up the backend."

**"Why did you change from the green to red?"**
> "Green is the default color for health brands — it signals 'safe and natural' but it also blends in with every competitor. Red signals energy, action, and urgency — qualities that match your customer's goals. It also creates much stronger contrast on the dark background."

**"The original site was bright/white — why dark?"**
> "Dark mode consistently tests as more premium in e-commerce. It makes product photography pop, reduces eye strain for evening browsing, and immediately signals that this isn't a generic supplement store."

---

## After the Meeting

1. **Capture feedback in writing** — ask the client to send notes via email so you have a clear scope for revisions.
2. **Prioritize feedback** into: must-have before launch / nice-to-have / out of scope.
3. **Next steps to discuss:**
   - Content finalization (final product descriptions, team photos, brand imagery)
   - Backend integration (Shopify, WooCommerce, or custom)
   - Domain + hosting setup
   - SEO meta tags and Open Graph images
   - Analytics setup (Google Analytics / GA4)
