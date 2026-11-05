// Accent choices for the two designs (from the mockups).
//   Fresh (A):   three themes  - Meadow (default), Slate, Sunset
//   Compact (B): four accents  - Periwinkle (default), Mint, Amber, Coral
// Each entry can override the accent tokens for light and dark mode:
//   a = accent, i = text on the accent, s = soft tint, t = accent as text.
// `null` means "use the design's own palette" (the default entry).

export const ACCENTS = {
  fresh: [
    { id: 'meadow', name: 'Meadow', preview: { bg: '#F3F6F4', a: '#0F7B5A', s: '#DDF1E8' }, light: null, dark: null },
    {
      id: 'slate', name: 'Slate', preview: { bg: '#E9ECF4', a: '#3B4BA8', s: '#D5DAF2' },
      light: { a: '#3B4BA8', i: '#FFFFFF', s: '#E1E5F7', t: '#2E3A8A' },
      dark:  { a: '#8B9BFF', i: '#0E1230', s: '#232B52', t: '#B4BEFF' },
    },
    {
      id: 'sunset', name: 'Sunset', preview: { bg: '#F8EDE6', a: '#B8481F', s: '#F4D5C6' },
      light: { a: '#B8481F', i: '#FFFFFF', s: '#FBE3D8', t: '#8F3512' },
      dark:  { a: '#FF8A5B', i: '#2A0F05', s: '#3F2218', t: '#FFB291' },
    },
  ],
  compact: [
    { id: 'periwinkle', name: 'Periwinkle', swatch: '#8B9BFF', light: null, dark: null },
    {
      id: 'mint', name: 'Mint', swatch: '#5BD6A4',
      light: { a: '#0F7B5A', i: '#FFFFFF', s: '#DDF1E8', t: '#0B6048' },
      dark:  { a: '#5BD6A4', i: '#0E1014', s: '#17382C', t: '#7FE0BC' },
    },
    {
      id: 'amber', name: 'Amber', swatch: '#FFB454',
      light: { a: '#9A5A0B', i: '#FFFFFF', s: '#FBEBD5', t: '#7A4708' },
      dark:  { a: '#FFB454', i: '#0E1014', s: '#43301A', t: '#FFCE8A' },
    },
    {
      id: 'coral', name: 'Coral', swatch: '#FF7A7A',
      light: { a: '#C23A3A', i: '#FFFFFF', s: '#FBE1E0', t: '#8F2323' },
      dark:  { a: '#FF7A7A', i: '#0E1014', s: '#4A2326', t: '#FFA3A3' },
    },
  ],
};

/** The entry for a design and saved id (falls back to the design's default). */
export function accentEntry(design, id) {
  const list = ACCENTS[design] || [];
  return list.find(a => a.id === id) || list[0] || null;
}

/** Token overrides for the current design/mode, or null for the default palette. */
export function accentOverrides(design, id, dark) {
  const e = accentEntry(design, id);
  if (!e) return null;
  return (dark ? e.dark : e.light) || null;
}
