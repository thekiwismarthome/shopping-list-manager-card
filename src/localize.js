import { en } from './translations/en.js';
import { nl } from './translations/nl.js';

const TRANSLATIONS = { en, nl };

function getLanguage(hass) {
  const language =
    hass?.__slmLanguage ||
    hass?.locale?.language ||
    hass?.language ||
    hass?.selectedLanguage ||
    hass?.user?.language ||
    globalThis.navigator?.language ||
    'en';
  return String(language).toLowerCase().split('-')[0];
}

export function t(hass, key, vars = {}) {
  const language = getLanguage(hass);
  const value = TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return Object.entries(vars).reduce(
    (text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement ?? ''),
    value
  );
}
