# Design System Inspired by Eric Cole

## 1. Visual Theme & Atmosphere

This design system embodies a minimalist, engineer-driven aesthetic rooted in clarity and restraint. Drawing inspiration from Berlin's functional design culture and modernist principles, the system prioritizes legibility over decoration, employing a restrained color palette dominated by deep blacks and whites with precise accent pops of electric blue. The typography is clean and technical—favoring Geist and Geist Mono—creating a rhythm that feels both contemporary and timeless. Every visual element serves a purpose; there are no ornamental details, only intentional structure. The atmosphere is cerebral and trustworthy, reflecting a philosophy that values long-term thinking over trend chasing. Vintage CRT echoes and grid-based layouts reinforce a sense of precision and durability.

**Key Characteristics**
- Minimalist, functional aesthetic with no unnecessary ornamentation
- Heavy reliance on monochromatic blacks and whites for maximum contrast
- Electric blue as the sole accent color for interactive and emphasis moments
- Technical typography (Geist, Geist Mono) emphasizing clarity and precision
- Grid-aligned layouts with deliberate whitespace management
- Vintage modernist influences (CRT frames, structured composition)
- Performance and clarity prioritized in every design decision

## 2. Color Palette & Roles

### Primary
- **Electric Blue** (`#0000EE`): Primary interactive element, links, active states, and critical call-to-action controls. Used 142 times across the system for maximum visual hierarchy.
- **Bright Cyan** (`#0099FF`): Secondary accent for supporting interactive elements, loading indicators, or secondary CTAs. Rare accent to maintain restraint.

### Interactive
- **Primary Button State** (`#0000EE`): Link color and interactive hover states for navigation elements.
- **Transparent Overlay** (`#FFF0`): Used for overlays and glass-morphism effects with near-zero opacity.

### Neutral Scale
- **Pure Black** (`#000000`): Primary text, heavy weight elements, structural components. Used 494 times as the dominant text color.
- **Dark Gray** (`#424242`): Secondary text, lower priority content, and subtle backgrounds. Used 301 times.
- **Deep Dark Gray** (`#242424`): High-contrast backgrounds, card surfaces, elevated content containers.
- **Medium Gray** (`#9E9E9E`): Disabled states, placeholder text, tertiary labels.
- **Light Gray** (`#E0E0E0`): Borders, divider lines, subtle separation.

### Surface & Borders
- **Off-White** (`#FFFFFF`): Primary background, card surfaces, and clean content areas. Used sparingly for maximum contrast.
- **Dark Backgrounds** (`#242424`): Elevated surfaces and dark mode alternatives.
- **Border Gray** (`#E0E0E0`): Subtle borders and rule lines between sections.

## 3. Typography Rules

### Font Family
- **Primary:** Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Secondary/Code:** Geist Mono, Menlo, Courier New, monospace
- **Fallback:** sans-serif for lightweight elements and links

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display / H1 | Geist | 164px | 400 | 131.2px | normal | Hero headline, portfolio title |
| Heading 2 / H2 | Geist | 96px | 400 | 76.8px | normal | Major section headings |
| Heading 3 / H3 | Geist | 48px | 500 | 43.2px | normal | Subsection titles, card titles |
| Heading 5 / H5 | Geist | 24px | 500 | 19.2px | normal | Small headings, labels |
| Body / Paragraph | Geist | 22px | 400 | 17.6px | normal | Primary running text, descriptions |
| Code / Mono | Geist Mono | 14px | 400 | 18.2px | normal | Inline code, technical snippets |
| Links / Caption | sans-serif | 12px | 400 | normal | normal | Navigation links, footer text, button labels |

### Principles
- **Hierarchy through size and weight**: Information architecture relies primarily on scale differences; weight variation is minimal and intentional.
- **Generous line heights**: All typography maintains line heights ≥ 1.2× font size for readability and breathing room.
- **Monospace for technical content**: Geist Mono is reserved for code snippets, technical labels, and metadata display.
- **Constraint over variation**: Font families are strictly limited to two (Geist and Geist Mono) to maintain visual unity.
- **Weight discipline**: Body text uses weight 400; headings use 400–500 for emphasis without excess heaviness.

## 4. Component Stylings

### Buttons

#### Primary Button (Navigation/Control)
- **Background:** `rgba(255, 255, 255, 0)` (transparent)
- **Text Color:** `#9E9E9E`
- **Font:** Geist Mono, 14px, weight 400
- **Padding:** `12px 0px 8px 0px`
- **Border:** none
- **Border Radius:** `0px`
- **Height:** `36px`
- **Box Shadow:** none
- **Hover State:** Text color changes to `#000000`
- **Active State:** Text color to `#0000EE`

#### Secondary Button (Icon/Compact)
- **Background:** `rgba(34, 34, 34, 0.8)`
- **Text Color:** `#FFFFFF`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `0px`
- **Border:** none
- **Border Radius:** `15px`
- **Height:** `30px`
- **Width:** `30px`
- **Box Shadow:** `rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px`
- **Hover State:** Background opacity increases to `rgba(34, 34, 34, 1)`
- **Active State:** Box shadow becomes more pronounced

#### Ghost Button (Text Link)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#0000EE`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `0px 0px 0px 0px`
- **Border:** none
- **Border Radius:** `0px`
- **Box Shadow:** none
- **Hover State:** Text color to `#0099FF`
- **Active State:** Text decoration underline

### Links

#### Inline Links
- **Background:** `rgba(0, 0, 0, 0)`
- **Text Color:** `#0000EE`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `8px 8px 8px 0px`
- **Border:** none
- **Hover State:** Text color to `#0099FF`, text decoration underline
- **Focus State:** Outline `2px solid #0000EE`

#### Navigation Links
- **Background:** `rgba(0, 0, 0, 0)`
- **Text Color:** `#0000EE`
- **Font:** sans-serif, 12px, weight 400
- **Padding:** `0px`
- **Hover State:** Text color `#0099FF`
- **Active State:** Text color remains `#0000EE`, underline applied

### Inputs & Forms

#### Text Input
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#242424`
- **Font:** Geist Mono, 14px, weight 400
- **Padding:** `0px 0px 0px 0px`
- **Border:** none
- **Border Radius:** `0px`
- **Height:** `18px`
- **Line Height:** `14px`
- **Placeholder Color:** `#9E9E9E`
- **Focus State:** Border bottom `2px solid #0000EE`
- **Focus Background:** `rgba(0, 0, 238, 0.02)`

#### Textarea
- **Background:** `rgba(0, 0, 0, 0)`
- **Text Color:** `#242424`
- **Font:** Geist Mono, 14px, weight 400
- **Padding:** `16px 16px 16px 0px`
- **Border:** none
- **Border Radius:** `0px`
- **Height:** `100px`
- **Line Height:** `14px`
- **Resize:** vertical
- **Focus State:** Border bottom `2px solid #0000EE`

### Navigation

#### Navigation Container
- **Background:** `rgba(255, 255, 255, 1)`
- **Layout:** Horizontal flex row, space-between
- **Padding:** `24px 40px`
- **Border Bottom:** `1px solid #E0E0E0`
- **Sticky Positioning:** Optional top fixed

#### Nav Item
- **Font:** Geist Mono, 14px, weight 400
- **Color:** `#9E9E9E` (default), `#0000EE` (active)
- **Padding:** `12px 16px`
- **Margin:** `0px 8px`
- **Text Transform:** lowercase
- **Border Radius:** `0px`

### Cards & Containers

#### Content Card
- **Background:** `#FFFFFF`
- **Border:** `1px solid #E0E0E0`
- **Border Radius:** `0px`
- **Padding:** `40px`
- **Box Shadow:** `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`
- **Margin Bottom:** `32px`

#### Dark Surface
- **Background:** `#242424`
- **Border:** `1px solid #424242`
- **Border Radius:** `0px`
- **Padding:** `40px`
- **Margin Bottom:** `32px`

#### Elevated Card (with shadow)
- **Background:** `#FFFFFF`
- **Border Radius:** `15px`
- **Padding:** `32px`
- **Box Shadow:** `rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Scale:**
- `4px` — Micro gaps, icon spacing, tight component margins
- `8px` — Compact spacing between small elements, internal component padding
- `12px` — Button padding, small form inputs, navigation item padding
- `16px` — Default gap between sections, form field spacing, container padding
- `20px` — Medium section spacing
- `24px` — Large padding within cards, heading margins
- `32px` — Major section breaks, grid gaps
- `40px` — Large container padding, content inset
- `48px` — XL section spacing, major layout breaks
- `64px` — Hero section padding, prominent spacing
- `80px` — Page-level vertical padding, between hero and content
- `96px` — Max vertical spacing between major sections

**Usage Context:**
- Button padding: `12px` (horizontal), `8px` (vertical)
- Card padding: `40px` (standard), `64px` (hero/featured)
- Section margins: `48px` (vertical), `32px` (horizontal on smaller screens)
- Input fields: `16px` (padding), `16px` (margin bottom)

### Grid & Container

- **Max Width:** `1200px` (standard content width)
- **Column Strategy:** 12-column grid system with flexible unit spacing
- **Gutter Width:** `16px` between columns
- **Container Padding:** `40px` left/right on desktop, `24px` on tablet, `16px` on mobile
- **Section Patterns:** Full-width sections with internal max-width containers; alternating light and dark backgrounds for rhythm
- **Whitespace:** Minimum `32px` vertical spacing between major sections; `48px` preferred

### Whitespace Philosophy

Whitespace is treated as a first-class element, not a residual gap. The system employs generous internal padding and margin to allow content to breathe and support cognitive processing. Negative space creates visual hierarchy and aids scanability. Every container and text block is intentionally separated; proximity indicates relationship. The goal is calm, uncluttered interfaces that prioritize legibility and reduce cognitive load.

### Border Radius Scale

- `0px` — Primary (buttons, inputs, cards, most components); straight edges reinforce technical precision
- `15px` — Secondary, elevated surfaces (floating cards, special modals, icon buttons)
- No values beyond `15px`; system avoids over-rounded aesthetics

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, `border: 1px solid #E0E0E0` | Primary content cards, default buttons, form inputs |
| Subtle (Level 1) | `rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` | Secondary content areas, disabled states |
| Medium (Level 2) | `rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 0px 0px, rgba(255, 255, 255, 0.15) 0px 0px 0px 1px` | Floating buttons, modals, elevated cards |
| Deep (Level 3) | `rgba(0, 0, 0, 0.15) 0px 4px 8px 0px, rgba(0, 0, 0, 0.08) 0px 2px 4px 0px, rgba(255, 255, 255, 0.2) 0px 0px 0px 1px` | Tooltips, popovers, modals on modal |

**Shadow Philosophy:**

Depth is communicated through subtle shadow layers combined with 1px top-light highlights (white at low opacity). This creates visual separation without heaviness, maintaining the minimalist aesthetic. Shadows are never dramatic or blurred; they are precise and controlled. Layer one combines blur and spread; layer two adds a hairline internal highlight. This restrained approach keeps the interface lightweight and focuses user attention on content rather than decoration.

## 7. Do's and Don'ts

### Do
- **Do use black (#000000) for all primary text** and `#424242` for secondary content. This maximizes contrast and legibility.
- **Do reserve electric blue (#0000EE) exclusively for interactive elements**, links, and primary CTAs. Every blue element signals actionability.
- **Do maintain generous whitespace** — minimum `32px` between major sections, never cram content.
- **Do use Geist Mono for code snippets, technical labels, and metadata**; Geist for everything else.
- **Do apply `border-radius: 0px` to all standard components**; use `15px` only for elevated, special-purpose surfaces (floating buttons, modals).
- **Do align all elements to the `4px` grid** for precision and consistency across layouts.
- **Do use subtle shadows (Level 1–2)** only when elevation is functionally necessary; most components should be flat.
- **Do test color contrast** — all text must achieve WCAG AA minimum (`#000000` on `#FFFFFF` is preferred).
- **Do size interactive targets to minimum `30px` × `30px`** (preferably larger on touch devices).

### Don't
- **Don't introduce new colors** outside the defined palette. Every added color dilutes the visual system.
- **Don't use rounded corners** beyond `15px` or apply inconsistent radius values per component.
- **Don't apply color to text without purpose**; neutrals (`#000000`, `#424242`) are default.
- **Don't layer multiple shadows** on a single element; use one shadow level consistently.
- **Don't mix font families** within a single line of text.
- **Don't set line-height below `1.2×` font size** — this reduces legibility.
- **Don't use decorative graphics or gradients**; this system values restraint and clarity.
- **Don't add padding without intent**; every pixel of whitespace should serve the layout structure.
- **Don't create hover states that change the component's footprint** (e.g., growing on hover); maintain visual stability.
- **Don't use cyan (#0099FF) for primary interactive elements**; reserve it for secondary accents only.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| Mobile | < 640px | Single-column layout, `24px` container padding, `32px` section gaps, h1 scales to `96px`, font size base reduces to `18px` |
| Tablet | 640px – 1024px | Two-column flexible grid, `32px` container padding, `40px` section gaps, h1 stays `164px`, typography scales proportionally |
| Desktop | > 1024px | Full 12-column grid, `40px` container padding, `48px` section gaps, max-width `1200px`, all typography at standard scale |

### Touch Targets

- **Minimum size:** `44px` × `44px` for all interactive elements on touch devices (exceeds `30px` minimum for desktop)
- **Padding around targets:** `8px` minimum between adjacent buttons or links to prevent accidental activation
- **Button height:** `36px` on desktop, `44px` on mobile (input-only exceptions may be `30px`)
- **Link spacing:** `8px` horizontal padding for text links on mobile; `0px` on desktop if in navigation

### Collapsing Strategy

- **Heading sizes:** Reduce progressively from display scale (`164px`) to readable mobile size (`96px` h2, `48px` h3) using ratio-based scaling (`0.6×` per breakpoint)
- **Spacing scale:** Decrease padding and gaps by `0.75×` as viewport shrinks (e.g., `40px` → `32px` → `24px`)
- **Grid columns:** Desktop (12 col) → Tablet (6 col) → Mobile (1 col); adjust gap from `16px` to `12px` to `8px`
- **Typography size:** Body text `22px` → `18px` → `16px` across breakpoints; maintain min line-height `1.4×`
- **Navigation:** Horizontal nav on desktop, stack or hamburger menu below `640px` breakpoint
- **Card layout:** Full-width cards on mobile, 50% width on tablet (2-col grid), 33% on desktop (3-col grid) where applicable
- **Container inset:** Max-width constraints removed on mobile; content bleeds to edges with `16px` padding for breathing room

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Electric Blue (`#0000EE`) — all interactive links, buttons, form focus states
- **Secondary Accent:** Bright Cyan (`#0099FF`) — supporting accents, rare use
- **Heading Text:** Pure Black (`#000000`) — all h1–h5 elements
- **Body Text:** Pure Black (`#000000`) primary, Dark Gray (`#424242`) secondary
- **Background:** Off-White (`#FFFFFF`) primary, Deep Dark Gray (`#242424`) dark surfaces
- **Borders & Dividers:** Light Gray (`#E0E0E0`)
- **Disabled / Placeholder:** Medium Gray (`#9E9E9E`)
- **Text on Dark:** Off-White (`#FFFFFF`)

### Iteration Guide

1. **Color discipline:** Every interactive element defaults to `#0000EE` unless explicitly secondary (`#0099FF`) or disabled (`#9E9E9E`). No other colors for UI controls.

2. **Typography defaults:** Body text is Geist `22px` weight 400, line-height `1.2×`. Headings use Geist weight 400–500. Code snippets are always Geist Mono `14px` weight 400. Navigation labels are sans-serif `12px` weight 400.

3. **Spacing baseline:** All margins, padding, and gaps are multiples of `4px`. Standard component padding is `12px` (form inputs), `16px` (card internals), or `40px` (container padding). Section gaps default to `48px` vertically.

4. **Border radius consistency:** Apply `border-radius: 0px` to 99% of components (buttons, inputs, cards, nav). Reserve `15px` radius exclusively for elevated surfaces (floating action buttons, special modals) or icon buttons.

5. **Shadow restraint:** Most components are flat with no shadow. Apply Level 1–2 shadows only to floated/modal surfaces. Never exceed two shadow layers on a single element.

6. **Responsive scaling:** Desktop typography and spacing are the baseline. Reduce proportionally on tablet (`0.9×`) and mobile (`0.75×`). Breakpoint transitions at `640px` and `1024px`.

7. **Contrast & accessibility:** All text achieves WCAG AA minimum (`#000000` on `#FFFFFF` = perfect; `#424242` on `#FFFFFF` = AA). Links and interactive text always use `#0000EE` for instant recognition.

8. **Component pattern:** Buttons are always transparent or dark (`rgba(34, 34, 34, 0.8)`), never gradient or outlined. Links are text-only (`#0000EE`). Forms are minimal—transparent background, no border until focus.

9. **Layout principle:** Content flows in a 12-column grid with `16px` gutters on desktop, collapsing to fewer columns on smaller screens. Max-width `1200px` centers content; minimum `16px` edge padding is enforced on all viewports.

10. **Typography hierarchy:** Scale from `164px` (h1) → `96px` (h2) → `48px` (h3) → `24px` (h5) → `22px` (body). Never deviate from these sizes without explicit design rationale. Line-height never drops below `1.2×` font size.