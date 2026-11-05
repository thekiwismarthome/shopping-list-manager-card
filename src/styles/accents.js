// Themes for the two designs (from the mockups): Meadow, Slate and Sunset.
// A theme only changes the accent colour (summary card, buttons, progress, tick boxes, active tab);
// the backgrounds stay as the design defines them.
//
// Each theme can override the accent tokens per design and mode:
//   a = accent, i = text on the accent, s = soft tint, t = accent as text.
// `null` means "use the design's own palette" (its default theme).

export const THEMES = [
  {
    id: 'meadow', name: 'Meadow',
    preview: { light: { bg: '#F3F6F4', a: '#0F7B5A', s: '#DDF1E8' }, dark: { bg: '#1F2D26', a: '#3FBF92', s: '#1B3A2F' } },
    fresh: { light: null, dark: null },
    compact: {
      light: { a: '#0F7B5A', i: '#FFFFFF', s: '#DDF1E8', t: '#0B6048' },
      dark:  { a: '#3FBF92', i: '#0B1A14', s: '#1B3A2F', t: '#7FE0BC' },
    },
  },
  {
    id: 'slate', name: 'Slate',
    preview: { light: { bg: '#E9ECF4', a: '#3B4BA8', s: '#D5DAF2' }, dark: { bg: '#1F232B', a: '#8B9BFF', s: '#232B52' } },
    fresh: {
      light: { a: '#3B4BA8', i: '#FFFFFF', s: '#E1E5F7', t: '#2E3A8A' },
      dark:  { a: '#8B9BFF', i: '#0E1230', s: '#232B52', t: '#B4BEFF' },
    },
    compact: { light: null, dark: null },
  },
  {
    id: 'sunset', name: 'Sunset',
    preview: { light: { bg: '#F8EDE6', a: '#B8481F', s: '#F4D5C6' }, dark: { bg: '#2A1D18', a: '#FF8A5B', s: '#3F2218' } },
    fresh: {
      light: { a: '#B8481F', i: '#FFFFFF', s: '#FBE3D8', t: '#8F3512' },
      dark:  { a: '#FF8A5B', i: '#2A0F05', s: '#3F2218', t: '#FFB291' },
    },
    compact: {
      light: { a: '#B8481F', i: '#FFFFFF', s: '#FBE3D8', t: '#8F3512' },
      dark:  { a: '#FF8A5B', i: '#2A0F05', s: '#3F2218', t: '#FFB291' },
    },
  },
];

// Fresh starts on Meadow (green); Compact starts on Slate (periwinkle blue)
export const DEFAULT_THEME = { fresh: 'meadow', compact: 'slate' };

/** The theme for a design and saved id (falls back to the design's default). */
export function themeEntry(design, id) {
  return THEMES.find(t => t.id === id) || THEMES.find(t => t.id === (DEFAULT_THEME[design] || 'meadow'));
}

/** Accent token overrides for the design/mode, or null for the design's own palette. */
export function themeOverrides(design, id, dark) {
  const entry = themeEntry(design, id);
  const per = entry && entry[design];
  if (!per) return null;
  return (dark ? per.dark : per.light) || null;
}
