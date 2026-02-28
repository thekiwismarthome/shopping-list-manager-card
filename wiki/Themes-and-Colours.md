# Themes & Colours

The Shopping List Manager Card has a fully themeable colour system built on CSS custom properties. Every colour in the UI — backgrounds, text, borders, accents, category dots and headers — is controlled by a set of `--slm-*` variables that you can read, modify, or extend.

---

## Table of Contents

- [Choosing a Theme](#choosing-a-theme)
- [How the Theme System Works](#how-the-theme-system-works)
- [CSS Variable Reference](#css-variable-reference)
- [Tweaking Colours in an Existing Theme](#tweaking-colours-in-an-existing-theme)
- [Adding a Brand New Theme](#adding-a-brand-new-theme)
- [Registering the Theme in the Dropdown](#registering-the-theme-in-the-dropdown)
- [Building and Deploying](#building-and-deploying)
- [Category Colour Reference](#category-colour-reference)

---

## Choosing a Theme

Open the card, go to **Settings → Appearance → Theme**. The dropdown is organised into three groups:

| Group | Theme | Internal key |
|---|---|---|
| All Modes | Soft Pastel *(default)* | `soft` |
| Light Themes | 🧊 Arctic | `arctic` |
| Light Themes | 🌿 Meadow | `meadow` |
| Light Themes | 🌸 Blossom | `blossom` |
| Light Themes | 🌊 Ocean Blue | `ocean` |
| Dark Themes | 🌊 Midnight Ocean | `midnight` |
| Dark Themes | 🔥 Ember | `ember` |
| Dark Themes | 🍇 Purple & Cyan | `neon` |

The **Dark Mode** setting controls whether the card uses a light or dark base:

| Setting | Effect |
|---|---|
| **On** | Forces the dark base (`data-theme="dark"`) |
| **Off** | Forces the light base (`data-theme="light"`) |
| **As on Device** *(default)* | Follows the system `prefers-color-scheme` media query |

Named themes (everything except Soft Pastel) override both the light and dark bases with their own complete variable set, so the Dark Mode setting has no effect when a named theme is active.

---

## How the Theme System Works

All theme CSS lives inside `src/shopping-list-manager-card.js` in the `static styles` block.

There are **three layers**:

```
Layer 1 — Default fallbacks (defined once, no selector)
         Always present; act as ultimate fallbacks.

Layer 2 — Light / Dark base  (:host([data-theme="light|dark"]))
         Applied when Dark Mode is forced On or Off.
         Soft Pastel uses this layer only.

Layer 3 — Named theme  (:host([data-theme-name="<key>"]))
         Applied when a named theme is selected.
         Completely replaces the light/dark base for that theme.
```

The card sets these HTML attributes on itself at runtime:

```javascript
// Dark Mode = "on"
this.setAttribute('data-theme', 'dark');

// Dark Mode = "off"
this.setAttribute('data-theme', 'light');

// Dark Mode = "As on Device" — attribute is removed and CSS media query takes over
this.removeAttribute('data-theme');

// Named theme selected (e.g. "midnight")
this.setAttribute('data-theme-name', 'midnight');
```

Because all child components inherit CSS custom properties through the Shadow DOM, you only need to define variables once on `:host` in the main card file — they cascade automatically into every component.

---

## CSS Variable Reference

Every variable that a named theme must define:

### Backgrounds

| Variable | Used for |
|---|---|
| `--slm-bg-main` | Outermost card background |
| `--slm-bg-surface` | Cards, panels, nav bar |
| `--slm-bg-elevated` | Dropdowns, dialogs, hover states |
| `--slm-tile-bg` | Individual item tiles |
| `--slm-tile-checked-opacity` | Opacity of checked-off tiles (0.0–1.0) |

### Text

| Variable | Used for |
|---|---|
| `--slm-text-primary` | Main body text, headings, icons |
| `--slm-text-secondary` | Subtitles, meta labels |
| `--slm-text-muted` | Placeholders, disabled states |

### Borders & Shadows

| Variable | Used for |
|---|---|
| `--slm-border-subtle` | Dividers, tile borders, nav border |
| `--slm-shadow-soft` | Default tile shadow |
| `--slm-shadow-medium` | Dialogs, elevated panels |

### Accents

| Variable | Used for |
|---|---|
| `--slm-accent-primary` | Active nav item, buttons, checked toggle |
| `--slm-accent-secondary` | Secondary actions, tags |
| `--slm-accent-warning` | Warning badges |
| `--slm-accent-danger` | Delete buttons, error states |

### List Gradients

Six gradients used as the coloured banner for each shopping list card in the Lists view. Cycle through all six if more than six lists exist.

| Variable |
|---|
| `--slm-list-gradient-0` |
| `--slm-list-gradient-1` |
| `--slm-list-gradient-2` |
| `--slm-list-gradient-3` |
| `--slm-list-gradient-4` |
| `--slm-list-gradient-5` |

### Total Bar

| Variable | Used for |
|---|---|
| `--slm-total-bar-bg` | Gradient background on the price total bar |

### Category Colours

One variable per category. Used for category header text, the coloured left-border accent, and item indicator dots.

| Variable | Category |
|---|---|
| `--slm-cat-produce` | Produce |
| `--slm-cat-dairy` | Dairy |
| `--slm-cat-meat` | Meat |
| `--slm-cat-bakery` | Bakery |
| `--slm-cat-pantry` | Pantry |
| `--slm-cat-frozen` | Frozen |
| `--slm-cat-beverages` | Beverages |
| `--slm-cat-snacks` | Snacks |
| `--slm-cat-household` | Household |
| `--slm-cat-health` | Health & Beauty |
| `--slm-cat-pet` | Pet |
| `--slm-cat-baby` | Baby |
| `--slm-cat-other` | Other |
| `--slm-cat-recent` | Recently Used section header |

> **Total: 14 category variables + 23 structural variables = 37 variables per theme.**

---

## Tweaking Colours in an Existing Theme

Open `src/shopping-list-manager-card.js` and find the block for the theme you want to change. For example, to make the Meadow accent greener:

```css
/* Before */
:host([data-theme-name="meadow"]) {
  --slm-accent-primary: #4caf50;
  ...
}

/* After */
:host([data-theme-name="meadow"]) {
  --slm-accent-primary: #2e7d32;   /* deeper forest green */
  ...
}
```

Save the file, rebuild (see [Building and Deploying](#building-and-deploying)), and reload the browser.

---

## Adding a Brand New Theme

### Step 1 — Add the CSS block

In `src/shopping-list-manager-card.js`, find the closing `` ` `` of the `static styles` block (just before `setConfig()`), and add your new theme block above it.

Use `:host([data-theme-name="<your-key>"])` as the selector. The key must be lowercase, no spaces.

Here is a complete template with all 37 variables:

```css
/* ===============================
  LIGHT/DARK – My Custom Theme
================================ */
:host([data-theme-name="mytheme"]) {
  /* --- Backgrounds --- */
  --slm-bg-main:     #xxxxxx;
  --slm-bg-surface:  #xxxxxx;
  --slm-bg-elevated: #xxxxxx;

  /* --- Text --- */
  --slm-text-primary:   #xxxxxx;
  --slm-text-secondary: #xxxxxx;
  --slm-text-muted:     #xxxxxx;

  /* --- Borders & Tiles --- */
  --slm-border-subtle:         #xxxxxx;
  --slm-tile-bg:               #xxxxxx;
  --slm-tile-checked-opacity:  0.35;

  /* --- Shadows --- */
  --slm-shadow-soft:   0 2px 6px rgba(0,0,0,0.1);
  --slm-shadow-medium: 0 6px 18px rgba(0,0,0,0.4);

  /* --- Accents --- */
  --slm-accent-primary:   #xxxxxx;
  --slm-accent-secondary: #xxxxxx;
  --slm-accent-warning:   #xxxxxx;
  --slm-accent-danger:    #xxxxxx;

  /* --- List card gradients (6 required) --- */
  --slm-list-gradient-0: linear-gradient(135deg, #aaaaaa, #bbbbbb);
  --slm-list-gradient-1: linear-gradient(135deg, #aaaaaa, #bbbbbb);
  --slm-list-gradient-2: linear-gradient(135deg, #aaaaaa, #bbbbbb);
  --slm-list-gradient-3: linear-gradient(135deg, #aaaaaa, #bbbbbb);
  --slm-list-gradient-4: linear-gradient(135deg, #aaaaaa, #bbbbbb);
  --slm-list-gradient-5: linear-gradient(135deg, #aaaaaa, #bbbbbb);

  /* --- Total price bar --- */
  --slm-total-bar-bg: linear-gradient(90deg, #aaaaaa 0%, #bbbbbb 100%);

  /* --- Category colours (14 required) --- */
  --slm-cat-produce:    #xxxxxx;
  --slm-cat-dairy:      #xxxxxx;
  --slm-cat-meat:       #xxxxxx;
  --slm-cat-bakery:     #xxxxxx;
  --slm-cat-pantry:     #xxxxxx;
  --slm-cat-frozen:     #xxxxxx;
  --slm-cat-beverages:  #xxxxxx;
  --slm-cat-snacks:     #xxxxxx;
  --slm-cat-household:  #xxxxxx;
  --slm-cat-health:     #xxxxxx;
  --slm-cat-pet:        #xxxxxx;
  --slm-cat-baby:       #xxxxxx;
  --slm-cat-other:      #xxxxxx;
  --slm-cat-recent:     #xxxxxx;
}
```

> **Tips for choosing colours:**
> - For **light themes**: use a near-white `--slm-bg-main` (`#f5f5f5`–`#ffffff`) and dark text (`#1a1a1a`–`#424242`).
> - For **dark themes**: use a near-black `--slm-bg-main` (`#0d0d0d`–`#1a1a1a`) and light text (`#e0e0e0`–`#ffffff`).
> - Category colours should have **good contrast** against both the tile background and the category header background. Test at both `tile-checked-opacity` and full opacity.
> - `--slm-tile-checked-opacity` controls how faded checked-off items appear. `0.3`–`0.4` works well for most themes.

---

### Step 2 — Register the Theme in the Dropdown

Open `src/settings/slm-appearance-settings.js`.

**Add the label** to the `_themeLabel()` map:

```javascript
_themeLabel(theme) {
  const labels = {
    soft: 'Soft Pastel', arctic: '🧊 Arctic', meadow: '🌿 Meadow',
    blossom: '🌸 Blossom', midnight: '🌊 Midnight Ocean', ember: '🔥 Ember',
    neon: '🍇 Purple & Cyan', ocean: '🌊 Ocean Blue',
    mytheme: '🎨 My Theme',   // ← add your entry here
  };
  return labels[theme] || 'Soft Pastel';
}
```

**Add the `<option>`** inside the appropriate `<optgroup>` in the `render()` method:

```html
<!-- For a light theme, add inside <optgroup label="Light Themes"> -->
<option value="mytheme" ?selected=${this.settings.theme === 'mytheme'}>
  🎨 My Theme
</option>

<!-- For a dark theme, add inside <optgroup label="Dark Themes"> -->
<option value="mytheme" ?selected=${this.settings.theme === 'mytheme'}>
  🎨 My Theme
</option>
```

---

## Building and Deploying

After making changes to any source file you must rebuild the card:

```bash
cd shopping-list-manager-card
npm install        # only needed once
npm run build
```

The output file `dist/shopping-list-manager-card.js` is what Home Assistant loads. Copy it to your HA instance if you are doing a manual install, or if using HACS the file in the repo root is served directly.

After deploying, do a **hard refresh** in your browser (`Ctrl+Shift+R` / `Cmd+Shift+R`) to clear the cached card JavaScript.

---

## Category Colour Reference

The table below lists every category ID used by the backend, the CSS variable it maps to, and the colour used in the default Soft Pastel Light theme.

| Category | ID | CSS Variable | Default (Light) |
|---|---|---|---|
| Produce | `produce` | `--slm-cat-produce` | `#66bb6a` |
| Dairy | `dairy` | `--slm-cat-dairy` | `#4fc3f7` |
| Meat | `meat` | `--slm-cat-meat` | `#e57373` |
| Bakery | `bakery` | `--slm-cat-bakery` | `#ffb74d` |
| Pantry | `pantry` | `--slm-cat-pantry` | `#ff8a65` |
| Frozen | `frozen` | `--slm-cat-frozen` | `#4dd0e1` |
| Beverages | `beverages` | `--slm-cat-beverages` | `#9575cd` |
| Snacks | `snacks` | `--slm-cat-snacks` | `#dce775` |
| Household | `household` | `--slm-cat-household` | `#4db6ac` |
| Health & Beauty | `health` | `--slm-cat-health` | `#81c784` |
| Pet | `pet` | `--slm-cat-pet` | `#a1887f` |
| Baby | `baby` | `--slm-cat-baby` | `#f06292` |
| Other | `other` | `--slm-cat-other` | `#90a4ae` |
| Recently Used | *(section)* | `--slm-cat-recent` | `#9e9e9e` |

Category colours are applied in three places:
1. **Category header text** — the category name label at the top of each group
2. **Left border accent** — the coloured bar on the left edge of the category header row
3. **Item indicator dot** — the small coloured dot on each item tile (tile view only)
