# Light Theme Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Habito Life 6-page static site from dark to light theme using the client's brand colors (#FFFFFF background, #1C1F2A text, #D22630 red, #F5F5F7 alt sections).

**Architecture:** All changes are confined to `styles/main.css`. The site uses a CSS custom-property design system — the conversion is a variable remap plus a handful of hardcoded-color fixes and two cascade-override rules. No HTML files are touched.

**Tech Stack:** Plain HTML/CSS/JS. GSAP 3.12.5 (CDN). Local dev server: `python -m http.server 8080` from project root → http://localhost:8080

---

### Task 1: Update CSS custom properties in `:root`

**Files:**
- Modify: `styles/main.css:17-35` (the `:root` block)

- [ ] **Step 1: Start the local dev server**

  ```bash
  cd "C:\Web Developer\Full Stack Developer\Claude Code\Projects\habitolife-redesign"
  python -m http.server 8080
  ```

  Open http://localhost:8080 in a browser. The site should currently display in dark mode.

- [ ] **Step 2: Update all 10 CSS variables**

  Replace the entire `:root` block (lines 17–35) with:

  ```css
  :root {
    --dark-base: #FFFFFF;
    --dark-lift: #F5F5F7;
    --dark-card: rgba(28,31,42,0.04);
    --red: #D22630;
    --red-glow: rgba(210,38,48,0.12);
    --white: #1C1F2A;
    --text-muted: rgba(28,31,42,0.55);
    --text-ghost: rgba(28,31,42,0.35);
    --border: rgba(28,31,42,0.1);
    --border-active: #D22630;
    --font-display: 'Plus Jakarta Sans', sans-serif;
    --font-body: 'Inter', sans-serif;
    --max-w: 1200px;
    --navbar-h: 60px;
    --tabs-h: 53px;
    --radius-card: 4px;
    --radius-btn: 2px;
  }
  ```

- [ ] **Step 3: Verify in browser**

  Hard-refresh http://localhost:8080. Check:
  - Page background is white ✓
  - Body text and headings are dark (`#1C1F2A`) ✓
  - Red accent (eyebrow labels, product category tags) is `#D22630` ✓
  - Alt-background sections (`.section--lift`) are light gray (`#F5F5F7`) ✓
  - Product cards have a very subtle light border and near-white background ✓

  Known issues at this stage (fixed in later tasks):
  - Navbar text still shows white on scrolled state
  - Texture grid lines invisible (white on white)
  - Primary button text is dark on red background
  - Text inside red CTA sections is dark on red

- [ ] **Step 4: Commit**

  ```bash
  git add styles/main.css
  git commit -m "feat: remap CSS variables to light theme palette"
  ```

---

### Task 2: Fix hardcoded colors — navbar and texture

**Files:**
- Modify: `styles/main.css` — `.navbar.scrolled`, `.navbar__links a`, `.navbar__icons a`, `.section--texture`

- [ ] **Step 1: Fix the scrolled navbar**

  Find `.navbar.scrolled` (around line 114) and update:

  ```css
  .navbar.scrolled {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom-color: rgba(28,31,42,0.12);
  }
  ```

- [ ] **Step 2: Fix navbar link and icon colors**

  Find `.navbar__links a:not(.btn--primary)` (around line 136) and update:

  ```css
  .navbar__links a:not(.btn--primary) {
    font-family: var(--font-body);
    font-size: 11px;
    color: rgba(28,31,42,0.55);
    transition: color 0.2s ease;
  }
  ```

  Find `.navbar__icons a` (around line 151) and update:

  ```css
  .navbar__icons a {
    color: rgba(28,31,42,0.55);
    display: flex;
    align-items: center;
    transition: color 0.2s ease;
  }
  ```

- [ ] **Step 3: Fix the texture grid lines**

  Find `.section--texture` (around line 62) and update both gradient color stops:

  ```css
  .section--texture {
    background-image:
      repeating-linear-gradient(0deg, rgba(28,31,42,0.06) 0px, rgba(28,31,42,0.06) 1px, transparent 1px, transparent 36px),
      repeating-linear-gradient(90deg, rgba(28,31,42,0.06) 0px, rgba(28,31,42,0.06) 1px, transparent 1px, transparent 36px);
  }
  ```

- [ ] **Step 4: Verify in browser**

  Hard-refresh http://localhost:8080. Scroll down slowly so the navbar triggers its scroll state. Check:
  - Navbar frosted glass is white/translucent (not dark) ✓
  - Nav links and icon buttons show as dark text ✓
  - Hero section (index.html and about.html use `section--texture`) shows a faint dark grid pattern ✓

- [ ] **Step 5: Commit**

  ```bash
  git add styles/main.css
  git commit -m "feat: fix hardcoded dark colors in navbar and texture"
  ```

---

### Task 3: Add red-section and button color overrides

**Files:**
- Modify: `styles/main.css` — add two override rules after the existing `.btn--primary` and `.section--red` rules

- [ ] **Step 1: Fix primary button text color**

  Find `.btn--primary` (around line 177):

  ```css
  .btn--primary { background: var(--red); color: var(--white); padding: 12px 24px; }
  ```

  Add an explicit `color: #fff` override directly on that rule:

  ```css
  .btn--primary { background: var(--red); color: #fff; padding: 12px 24px; }
  ```

- [ ] **Step 2: Add white text cascade for red sections**

  Find `.section--red` (around line 60):

  ```css
  .section--red { background: var(--red); }
  ```

  Add `color: #fff` to it:

  ```css
  .section--red { background: var(--red); color: #fff; }
  ```

  This cascades white text to all headings, prices, and body copy inside any red-background section (the marquee strip and the Join CTA banners). Elements that already use hardcoded `rgba(255,255,255,...)` values (marquee labels, perks text, price-old strikethrough) are unaffected.

- [ ] **Step 3: Verify in browser — all 6 pages**

  Check each page at http://localhost:8080:

  **index.html**
  - "Make the Change Today" button: white text on red ✓
  - Marquee strip: white text on red ✓
  - Join CTA section (red bg): headline, price, perks all white ✓

  **all-products.html**
  - Category tab active state: red underline, dark text ✓
  - Filter checkboxes: red when checked ✓
  - Pagination active page: red bg, white text ✓

  **product.html**
  - "Add to Cart" button: white text on red ✓
  - Thumbnail active/hover border: red ✓

  **join.html**
  - Join CTA banner: white headline and price on red ✓
  - "Join Habito" submit button: white text on red ✓

  **about.html**
  - Join CTA section: white text on red ✓
  - Commitment item numbers: faint red tint visible on light bg ✓

  **contact.html**
  - "Send Message" button: white text on red ✓
  - Form inputs: light border, dark text ✓

- [ ] **Step 4: Commit**

  ```bash
  git add styles/main.css
  git commit -m "feat: add explicit white overrides for red sections and primary button"
  ```

---

### Task 4: Final visual QA and push

**Files:** No code changes — verification and push only.

- [ ] **Step 1: Full walkthrough at desktop width**

  Open each of the 6 pages and scan for any remaining dark elements on white backgrounds or dark text on dark/red backgrounds:

  - http://localhost:8080/index.html
  - http://localhost:8080/all-products.html
  - http://localhost:8080/product.html
  - http://localhost:8080/join.html
  - http://localhost:8080/about.html
  - http://localhost:8080/contact.html

- [ ] **Step 2: Check mobile (resize to 375px)**

  Resize the browser to 375px wide and scan each page. Focus on:
  - Navbar mobile state (links hidden, logo + CTA visible)
  - Product grid (2 columns)
  - Forms (single column)

- [ ] **Step 3: Push to GitHub**

  ```bash
  git push origin master
  ```

- [ ] **Step 4: Verify on GitHub Pages / Netlify**

  If the project is live (Netlify config exists at `netlify.toml`), confirm the deployed URL reflects the light theme.
