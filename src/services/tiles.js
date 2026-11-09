// How many tiles fit across, by default. "Auto" follows the width of the card:
//   a normal phone (narrow)            3 tiles
//   a folding phone, opened (medium)   4 tiles
//   a tablet and anything wider        5 tiles
// The user can pick a fixed number instead (List options or Settings > Appearance).

export const AUTO = 'auto';
export const TILE_CHOICES = [AUTO, 2, 3, 4, 5, 6];

const MEDIUM_FROM = 520;  // px, card width: an opened folding phone is about 600 to 700
const WIDE_FROM = 740;    // px, card width: tablets

export function autoTiles(width) {
  if (!width) return 3;
  if (width >= WIDE_FROM) return 5;
  if (width >= MEDIUM_FROM) return 4;
  return 3;
}

/** The number of columns to draw for a saved setting ('auto' or a number) and the card width. */
export function effectiveTiles(setting, width) {
  const n = Number(setting);
  if (setting === AUTO || setting == null || !(n > 0)) return autoTiles(width);
  return n;
}
