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
