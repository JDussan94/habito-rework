# Habito Light Theme — Design Spec

**Date:** 2026-05-05
**Scope:** Convert all 6 pages from dark to light theme using client-provided brand colors.
**Approach:** Option A — CSS variable swap + targeted overrides. All changes confined to `styles/main.css`. No HTML file changes required.

---

## Brand Colors

| Role | Value |
|---|---|
| Primary background | `#FFFFFF` |
| Alternating section background | `#F5F5F7` |
| Primary text | `#1C1F2A` |
| Red accent | `#D22630` |

---

## Section 1 — CSS Variable Remapping

Update the `:root` block in `styles/main.css`:

| Variable | Old | New |
|---|---|---|
| `--dark-base` | `#1C1F29` | `#FFFFFF` |
| `--dark-lift` | `#22252F` | `#F5F5F7` |
| `--dark-card` | `rgba(255,255,255,0.03)` | `rgba(28,31,42,0.04)` |
| `--red` | `#D42F2F` | `#D22630` |
| `--red-glow` | `rgba(212,47,47,0.15)` | `rgba(210,38,48,0.12)` |
| `--white` | `#FFFFFF` | `#1C1F2A` |
| `--text-muted` | `rgba(255,255,255,0.45)` | `rgba(28,31,42,0.55)` |
| `--text-ghost` | `rgba(255,255,255,0.2)` | `rgba(28,31,42,0.35)` |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(28,31,42,0.1)` |
| `--border-active` | `#D42F2F` | `#D22630` |

Note: `--white` is repurposed as the primary foreground (text) color. Its name is misleading in a light context but all downstream references remain valid.

---

## Section 2 — Hardcoded Color Fixes

These values are baked into specific rules and are not covered by the variable swap:

| Selector | Property | Old | New |
|---|---|---|---|
| `.navbar.scrolled` | `background` | `rgba(28,31,41,0.85)` | `rgba(255,255,255,0.92)` |
| `.navbar.scrolled` | `border-bottom-color` | `rgba(255,255,255,0.06)` | `rgba(28,31,42,0.12)` |
| `.navbar__links a:not(.btn--primary)` | `color` | `rgba(255,255,255,0.5)` | `rgba(28,31,42,0.55)` |
| `.navbar__icons a` | `color` | `rgba(255,255,255,0.5)` | `rgba(28,31,42,0.55)` |
| `.section--texture` | repeating-linear-gradient (4 occurrences across 2 gradient calls) | `rgba(255,255,255,0.015)` | `rgba(28,31,42,0.06)` |

---

## Section 3 — Red Section & Button Overrides

Because `--white` now maps to `#1C1F2A`, elements using `color: var(--white)` inside red-background sections would render as dark text on red. Two rules fix this:

```css
.section--red { color: #fff; }
.btn--primary { color: #fff; }
```

- `.section--red { color: #fff }` cascades white text to all headings, prices, and body copy inside red sections (marquee, Join CTA banners).
- `.btn--primary { color: #fff }` keeps button label white on the red button regardless of parent section.

All other red-section content (marquee labels, price-old strikethrough, perks text) already uses hardcoded `rgba(255,255,255,...)` values and is unaffected.

---

## Files Changed

- `styles/main.css` — all changes (`:root`, hardcoded fixes, overrides)
- No HTML files require modification.

---

## Out of Scope

- Typography, layout, spacing, animations — unchanged
- Content — unchanged
- Responsive breakpoints — unchanged
- GSAP animations — unchanged
