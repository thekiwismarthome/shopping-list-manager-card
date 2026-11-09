// Module-level singleton — all components share one translation table.
let _translations = {};
const _hosts = new Set();

export function t(str) {
  return _translations[str] ?? str;
}

export function setTranslations(translations) {
  _translations = translations || {};
  for (const host of _hosts) host.requestUpdate();
}

// Lit reactive controller — add to any LitElement to receive translation updates.
export class I18nController {
  constructor(host) {
    this.host = host;
    host.addController(this);
  }
  hostConnected() { _hosts.add(this.host); }
  hostDisconnected() { _hosts.delete(this.host); }
  hostUpdate() {}
}

// --- Language lookup ---
const LANG_MAP = {
  afrikaans: 'af', albanian: 'sq', arabic: 'ar', armenian: 'hy',
  azerbaijani: 'az', basque: 'eu', belarusian: 'be', bengali: 'bn',
  bosnian: 'bs', bulgarian: 'bg', catalan: 'ca', chinese: 'zh',
  mandarin: 'zh', cantonese: 'zh', croatian: 'hr', czech: 'cs',
  danish: 'da', dutch: 'nl', flemish: 'nl', estonian: 'et',
  finnish: 'fi', french: 'fr', galician: 'gl', georgian: 'ka',
  german: 'de', greek: 'el', gujarati: 'gu', haitian: 'ht',
  hebrew: 'he', hindi: 'hi', hungarian: 'hu', icelandic: 'is',
  indonesian: 'id', irish: 'ga', italian: 'it', japanese: 'ja',
  kannada: 'kn', kazakh: 'kk', korean: 'ko', latvian: 'lv',
  lithuanian: 'lt', macedonian: 'mk', malay: 'ms', maltese: 'mt',
  marathi: 'mr', mongolian: 'mn', nepali: 'ne', norwegian: 'no',
  persian: 'fa', farsi: 'fa', polish: 'pl', portuguese: 'pt',
  punjabi: 'pa', romanian: 'ro', russian: 'ru', serbian: 'sr',
  sinhalese: 'si', sinhala: 'si', slovak: 'sk', slovenian: 'sl',
  spanish: 'es', swahili: 'sw', swedish: 'sv', tagalog: 'tl',
  filipino: 'tl', tamil: 'ta', telugu: 'te', thai: 'th',
  turkish: 'tr', ukrainian: 'uk', urdu: 'ur', uzbek: 'uz',
  vietnamese: 'vi', welsh: 'cy', xhosa: 'xh', zulu: 'zu',
};

export function getLanguageCode(languageName) {
  if (!languageName) return null;
  const key = languageName.trim().toLowerCase();
  if (/^[a-z]{2,3}(-[a-z]{2,4})?$/i.test(key)) return key; // already a BCP-47 code
  return LANG_MAP[key] || null;
}

// All translatable strings in the UI
export const UI_STRINGS = [
  // Navigation
  'Shopping', 'Lists', 'Loyalty', 'Settings', 'Back', 'Done', 'Close',
  // Common actions
  'Save', 'Cancel', 'Delete', 'Edit', 'Add', 'Create', 'Confirm',
  'Saving…', 'Loading…', 'Working…', 'Loading...',
  // List header / view menu
  'Shopping List', 'View', 'Sort', 'Tiles', 'List', 'By Category', 'A–Z',
  'Recently Used', 'Show Price',
  // Search bar
  'Search products…', 'Searching…', 'No results', 'Add custom item',
  'Search OFT by name', 'Add to list',
  // Item list / grid empty state
  'Your shopping list is empty', 'Search for products to add items',
  'items', 'item',
  // Add item dialog
  'Add Item',
  // Edit item dialog
  'Edit Item', 'Product Name', 'Barcode', 'Barcode number (optional)',
  'Category', 'Quantity', 'Unit', 'Other…', 'Unit Price', 'Notes',
  'Add notes (optional)...', 'Product Image', 'Paste image URL...', 'Total:',
  'Name', 'Price', 'Brand',
  // Settings main
  'Profile', 'Appearance', 'Theme, tiles, fonts',
  'Notifications', 'List sharing, emails',
  'Preferences', 'Open last used list at launch', 'Keep screen turned on',
  'Sync settings across devices', 'Keep your theme and list options the same on all your devices',
  // Beta 2026.11.4: tiles, store pictures, supermarkets
  'Tiles per row', 'Auto', 'Auto uses 3 on a phone, 4 on a folding phone and 5 on a tablet.', 'Store picture', 'Change picture', 'Choose picture', 'Remove', 'or paste an image address', 'Image address', 'Supermarkets', 'The shops you use, with addresses', 'Add the shops you use. The address and coordinates are saved so automations can use them later, for example to remind you of your list when you arrive.', 'No supermarkets yet.', 'Add a supermarket', 'Edit supermarket', 'Chain', 'There are no built-in chains for this region. Type the name of the shop.', 'Address', 'Street, suburb, city', 'Coordinates (optional)', 'Latitude', 'Longitude', 'Use my current location', 'No address or coordinates yet', 'Remove this supermarket?', 'Could not remove it.', 'Could not save the supermarket.', 'Could not load your supermarkets.', 'Give the supermarket a name.', 'Latitude and longitude must both be numbers (latitude -90 to 90, longitude -180 to 180), or both empty.', 'Your browser cannot share its location.', 'Could not get your location. Location needs a secure (HTTPS) connection and your permission.', 'e.g., PAK\'nSAVE Albany',
  // Groups (households)
  'Who can see it', 'Everyone in this household', 'Only me', 'Everyone', 'Every household on this Home Assistant', 'People', 'Households', 'Everyone in {name} can already see this list.', 'Everyone in {name} can already see this card.', 'Groups', 'Households and who can see what', 'Group', 'Group name', 'Rename', 'Delete this group?', 'Could not create the group.', 'Could not rename the group.', 'Could not update the group.', 'Could not delete the group.', 'Could not move them.', 'Visible to everyone', 'list', 'lists', 'loyalty card', 'loyalty cards', 'and', 'can be seen by every user. Move them into a group so other households cannot see them.', 'Move them', 'No one yet', 'Choose people', 'Only a Home Assistant administrator can manage groups.', 'A group is a household. People in a group share its lists and loyalty cards, and you can also share a list with another group or with one person. Anything not shared stays private to the person who made it.', 'No groups yet. Add one for each household, for example “Our house” and “Mum’s house”.', 'New group', 'e.g., Mum’s house', 'Administrators can always see every list and card, because the data lives on your Home Assistant.',
  // Interface styles + tidied settings
  'Interface style', 'Classic', 'Fresh', 'Compact', 'Style, colour mode, tiles, fonts', 'New list', 'Private', 'Only visible to me (and members I add)', 'Tap to scan', 'Hold the screen up to the scanner.', 'Export or restore your lists and products',
  'The original look', 'Soft cards, floating menu', 'Dense list, flat tab bar',
  'Personalise', 'Behaviour', 'Connections', 'Search settings', 'No settings match',
  'In your basket', 'Left to buy', 'Estimated', 'Estimated total', 'of', 'left', 'Main',
  'Accent', 'Meadow', 'Slate', 'Sunset', 'Periwinkle', 'Mint', 'Amber', 'Coral',
  'Colour mode', 'Light', 'Dark', 'Match device', 'Design default', 'Soft cards, summary card, floating menu', 'Dense list, checkboxes, flat tab bar', 'List options', 'Share list', 'Clear checked items', 'All', 'Categories', 'In basket', 'Undo', 'Decrease', 'Increase',
  'In-store', 'Wall panel', 'HA native', 'Big rows, tap to tick off', 'List and product picker side by side', 'Flat, uses your Home Assistant theme', 'The HA native style follows your Home Assistant theme, so dark mode and colour theme are set there.', 'The Wall panel style needs a wide card (tablet or wall display). On narrow screens it shows Fresh.', 'Add items', 'Add item',
  'Region & Catalog', 'Country-specific products and pricing',
  'Manage Categories', 'categories',
  'HA Todo Sync', 'Link lists to Home Assistant todo',
  'Support', 'FAQ & Support', 'Refresh', 'App',
  'Shopping List Manager', 'SLM Card',
  // Appearance settings
  'Dark Mode', 'Theme', 'Display', 'Use Emojis Instead of Icons',
  'Tiles Per Row', 'Recently Used Products', 'products',
  'Product Images', 'Local HA Image Path', 'Auto-match images by product name slug',
  'Font', 'Font Family', 'Use system text size', 'Font Size',
  // Profile settings
  'Name', 'Home Assistant Account',
  // Notifications settings
  'List Sharing', 'E-Mails',
  'Get notified when somebody shares a list with you or makes changes on shared lists',
  'Get notified about changes to your shared lists',
  // Support settings
  'FAQ', 'Frequently asked questions',
  'Report a Problem', 'Submit an issue on GitHub',
  'GitHub Repository', 'View source code',
  // HA sync settings
  'Link Lists to HA Todo', 'How it works', 'None',
  'No todo lists found', 'No lists', 'Create a shopping list first.',
  // Category settings
  'Add Category', 'Reorder', 'Category Name', 'Color', 'Icon',
  // Lists view
  'My Lists', 'No lists yet', 'Create your first shopping list',
  'Manage Members', 'Select who else can see and edit this list.',
  'Loading users…', 'No other users found.', 'Create New List', 'List Name',
  'Active',
  // Loyalty cards
  'Loyalty Cards', 'No loyalty cards yet',
  'Add your store loyalty cards for quick access',
  'Add Loyalty Card', 'Edit Card', 'Private (only visible to you)',
  'Card/Member number', 'Auto-generated from number', 'Additional notes...',
  'Duplicate', 'Members', 'Card View', 'Tile View',
  // Data settings
  'Region & Catalog', 'Product Catalog Region', 'About',
  'Active Region', 'Country-specific products and pricing',
  'Custom Regions', 'Add custom region', 'Save region',
  'Built-in', 'Custom', 'Language', 'Currency symbol',
  'Backup & Restore', 'Export Data', 'Import Data',
  'Download backup', 'Choose backup file', 'Switching catalog…',
];

// --- API fetch (MyMemory, free, no key required) ---
const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';
const CACHE_PREFIX = 'slm_i18n_v2_';

async function translateOne(text, langCode) {
  try {
    const res = await fetch(`${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=en|${langCode}`);
    if (!res.ok) return text;
    const json = await res.json();
    if (json.responseStatus !== 200) return text;
    return json.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

async function fetchAll(langCode, strings) {
  const results = {};
  // Batch 5 at a time to avoid rate limits
  for (let i = 0; i < strings.length; i += 5) {
    const batch = strings.slice(i, i + 5);
    const translated = await Promise.all(batch.map(s => translateOne(s, langCode)));
    batch.forEach((s, idx) => { results[s] = translated[idx]; });
  }
  return results;
}

export async function loadTranslations(languageName) {
  const langCode = getLanguageCode(languageName);
  if (!langCode || langCode === 'en') return null;

  const cacheKey = `${CACHE_PREFIX}${langCode}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed?.v === 2 && parsed?.strings) return parsed.strings;
    }
  } catch { /* ignore */ }

  const strings = await fetchAll(langCode, UI_STRINGS);

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ v: 2, lang: langCode, strings }));
  } catch { /* storage full */ }

  return strings;
}
