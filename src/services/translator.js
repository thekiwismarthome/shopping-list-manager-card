// Language name (as typed by user) → BCP-47 code
const LANG_MAP = {
  afrikaans: 'af', albanian: 'sq', arabic: 'ar', armenian: 'hy',
  azerbaijani: 'az', basque: 'eu', belarusian: 'be', bengali: 'bn',
  bosnian: 'bs', bulgarian: 'bg', catalan: 'ca', chinese: 'zh',
  mandarin: 'zh', cantonese: 'zh', croatian: 'hr', czech: 'cs',
  danish: 'da', dutch: 'nl', flemish: 'nl', english: 'en',
  estonian: 'et', finnish: 'fi', french: 'fr', galician: 'gl',
  georgian: 'ka', german: 'de', greek: 'el', gujarati: 'gu',
  haitian: 'ht', hebrew: 'he', hindi: 'hi', hungarian: 'hu',
  icelandic: 'is', indonesian: 'id', irish: 'ga', italian: 'it',
  japanese: 'ja', kannada: 'kn', kazakh: 'kk', korean: 'ko',
  latvian: 'lv', lithuanian: 'lt', macedonian: 'mk', malay: 'ms',
  maltese: 'mt', marathi: 'mr', mongolian: 'mn', nepali: 'ne',
  norwegian: 'no', persian: 'fa', farsi: 'fa', polish: 'pl',
  portuguese: 'pt', punjabi: 'pa', romanian: 'ro', russian: 'ru',
  serbian: 'sr', sinhalese: 'si', sinhala: 'si', slovak: 'sk',
  slovenian: 'sl', spanish: 'es', swahili: 'sw', swedish: 'sv',
  tagalog: 'tl', filipino: 'tl', tamil: 'ta', telugu: 'te',
  thai: 'th', turkish: 'tr', ukrainian: 'uk', urdu: 'ur',
  uzbek: 'uz', vietnamese: 'vi', welsh: 'cy', xhosa: 'xh',
  zulu: 'zu',
};

// Strings to translate — keys are canonical English strings used throughout the card
export const UI_STRINGS = [
  // Navigation & chrome
  'Back', 'Settings', 'Done', 'Loading…',
  // List actions
  'Add item', 'Clear checked', 'Search', 'Sort', 'Filter',
  'No items yet', 'Add your first item to get started',
  'items', 'item',
  // Item actions
  'Delete', 'Edit', 'Save', 'Cancel', 'Confirm',
  'Add to list', 'Scan barcode', 'Custom',
  // Fields
  'Price', 'Unit', 'Quantity', 'Name', 'Brand', 'Notes',
  // Product search
  'Search products…', 'Searching…', 'No results', 'Add custom item',
  // Categories
  'Categories', 'All', 'Uncategorised',
  // Lists
  'Shopping Lists', 'My Lists', 'New list', 'Rename', 'Manage lists',
  // Settings labels
  'Region & Catalog', 'Active Region', 'Custom Regions', 'Add custom region',
  'Save region', 'Built-in', 'Custom', 'Language', 'Currency symbol',
  'Backup & Restore', 'Export Data', 'Import Data', 'Download backup',
  'Choose backup file', 'Working…',
  // Loyalty
  'Loyalty Cards', 'Add card',
  // Misc
  'HA Todo Sync', 'Link lists to Home Assistant todo',
];

const CACHE_PREFIX = 'slm_i18n_v1_';
const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

export function getLanguageCode(languageName) {
  if (!languageName) return null;
  const key = languageName.trim().toLowerCase();
  if (Object.values(LANG_MAP).includes(key)) return key; // already a code
  return LANG_MAP[key] || null;
}

async function translateOne(text, langCode) {
  try {
    const url = `${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=en|${langCode}`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const json = await res.json();
    if (json.responseStatus !== 200) return text;
    return json.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

async function fetchTranslations(langCode, strings) {
  // Run in parallel, cap concurrency to 5 at a time to avoid rate limits
  const results = {};
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
      if (parsed?.v === 1 && parsed?.strings) return parsed.strings;
    }
  } catch { /* ignore */ }

  const strings = await fetchTranslations(langCode, UI_STRINGS);

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ v: 1, lang: langCode, strings }));
  } catch { /* storage full */ }

  return strings;
}

export function createT(translations) {
  if (!translations) return (s) => s;
  return (s) => translations[s] ?? s;
}
