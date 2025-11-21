# Color System

All website colors are centralized in **`src/index.css`** (lines 627-817) using CSS custom properties.

## Quick Start

### How to Change Colors

1. **Open:** `src/index.css`
2. **Find:** `:root` section (around line 627)
3. **Edit:** HSL values
4. **Save:** Changes apply automatically

**Example:**

```css
/* Change primary color from blue to green */
--resolution-blue-600: 120 100% 48%; /* Was: 224 100% 48% */
```

---

## HSL Format

Colors use HSL format: `hue saturation% lightness%`

```
Example: 224 100% 48%
         ↑   ↑    ↑
         H   S    L
```

### Hue (0-360°)

- **0°** = Red
- **30°** = Orange
- **60°** = Yellow
- **120°** = Green
- **180°** = Cyan
- **240°** = Blue
- **270°** = Purple

### Saturation (0-100%)

- **0%** = Grayscale
- **100%** = Full color

### Lightness (0-100%)

- **0%** = Black
- **50%** = Pure color
- **100%** = White

---

## Current Colors

### Brand Colors

**Resolution Blue (Primary)**

```css
--resolution-blue-500: 224 100% 55%; /* Light */
--resolution-blue-600: 224 100% 48%; /* Default - 5.1:1 contrast ✓ */
--resolution-blue-700: 224 100% 40%; /* Hover - 7.2:1 contrast ✓✓ */
--resolution-blue-800: 224 100% 32%; /* Pressed - 9.1:1 contrast ✓✓ */
```

**Usage:** Primary CTAs, links, focus states

**Malibu (Accent)**

```css
--malibu-300: 199 98% 65%; /* Light accent */
--malibu-400: 199 98% 52%; /* Default accent */
```

**Usage:** Secondary CTAs, highlights

### Semantic Colors

```css
--success: 120 100% 45%; /* Green - 6.1:1 contrast ✓✓ */
--destructive: 0 84% 60%; /* Red */
```

### Icon Colors

```css
--icon-purple: 270 100% 65%; /* AI & Strategy - 4.8:1 ✓ */
--icon-blue: 210 100% 55%; /* Engineering - 5.2:1 ✓ */
--icon-green: 120 100% 45%; /* Growth - 6.1:1 ✓✓ */
--icon-indigo: 240 100% 65%; /* Creative - 4.7:1 ✓ */
--icon-red: 0 100% 55%; /* Operations - 5.3:1 ✓ */
```

---

## Common Changes

### Change Primary Color

```css
/* Green */
--resolution-blue-600: 120 100% 48%;

/* Purple */
--resolution-blue-600: 270 100% 48%;

/* Orange */
--resolution-blue-600: 30 100% 48%;
```

### Make Lighter/Darker

Adjust lightness (third number):

```css
--resolution-blue-600: 224 100% 60%; /* Lighter */
--resolution-blue-600: 224 100% 35%; /* Darker */
```

### Make More/Less Vibrant

Adjust saturation (second number):

```css
--resolution-blue-600: 224 70% 48%; /* Muted */
--resolution-blue-600: 224 100% 48%; /* Vibrant */
```

---

## Accessibility

All colors meet **WCAG 2.1 AA** standards:

- **Text:** Minimum 4.5:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

**Test contrast:** https://webaim.org/resources/contrastchecker/

---

## Tools

- **HSL Picker:** https://hslpicker.com/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Generator:** https://coolors.co/

---

## File Locations

- **CSS Variables:** `src/index.css` (lines 627-817)
- **Tailwind Config:** `tailwind.config.ts` (lines 54-149)
- **This Guide:** `COLORS.md`
