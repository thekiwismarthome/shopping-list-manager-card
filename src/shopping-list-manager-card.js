import { pickSyncable, mergeRemote, decideSync } from './services/settings-sync.js';
import { BUNDLED_TRANSLATIONS, BUILT_IN_REGION_LANGUAGE } from './i18n/index.js';
import { LitElement, html, css } from 'lit';
import { ShoppingListAPI } from './services/api.js';
import { themeOverrides } from './styles/accents.js';
import { loadTranslations, getLanguageCode, setTranslations, t } from './services/translator.js';
import './components/slm-bottom-nav.js';
import './components/slm-list-header.js';
import './components/slm-options-sheet.js';
import './components/slm-search-bar.js';
import './components/slm-item-grid.js';
import './components/slm-item-list.js';
import './components/slm-add-item-dialog.js';
import './components/slm-edit-item-dialog.js';
import './components/list-management/slm-lists-view.js';
import './components/list-management/slm-loyalty-cards-view.js';
import './settings/slm-settings-view.js';

// Each design has its own typeface. The font files are loaded from Google Fonts on demand;
// until they arrive (or if the browser is offline) the system font is used.
const DESIGN_FONTS = {
  fresh: {
    stack: "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  },
  compact: {
    stack: "'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap',
  },
};
function ensureFontLoaded(url) {
  try {
    if (document.querySelector(`link[data-slm-font="${url}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-slm-font', url);
    document.head.appendChild(link);
  } catch { /* no document (tests) */ }
}

// Tracks how many instances with each config-hash are currently connected.
// Resets on full page reload, so DOM-order assignments are stable across refreshes.
const _slmInstanceCounters = new Map();

class ShoppingListManagerCard extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    isEmbedded: { type: Boolean },
    // Set by a host card (Recipe Manager Card) so the embedded list follows its style and palette
    hostUi: { type: String },
    hostDark: { type: Boolean },
    // Accent override {a,i,s,t} from the host's theme (Meadow / Slate / Sunset), or null for the style's own
    hostAccent: { type: Object },
    currentView: { type: String },
    lists: { type: Array },
    activeList: { type: Object },
    items: { type: Array },
    categories: { type: Array },
    total: { type: Object },
    _currencySymbol: { type: String, state: true },
    _metricUnitsOnly: { type: Boolean, state: true },
    _enablePriceTracking: { type: Boolean, state: true },
    loading: { type: Boolean },
    showAddDialog: { type: Boolean },
    showEditDialog: { type: Boolean },
    editingItem: { type: Object },
    settings: { type: Object },
    isEmbedded: { type: Boolean },
    _loadError: { type: String, state: true },
    _searchOpen: { type: Boolean, state: true },
    _optionsOpen: { type: Boolean, state: true },
    _catFilter: { type: String, state: true }
  };
  set hass(hass) {
    const prevHass = this._hass;
    this._hass = hass;
    if (this.settings?.darkMode === 'device' && prevHass?.themes?.darkMode !== hass?.themes?.darkMode) {
      this.applyColorScheme();
    }
    if (hass && this._hassWaiter) {
      this._hassWaiter();
      this._hassWaiter = null;
    }
    if (this.api) {
      this.api.hass = hass;
    }
    // Sync currency from HA system config as soon as hass is available
    if (hass?.config?.currency && !this.total.currency) {
      this.total = { ...this.total, currency: hass.config.currency };
    }
    // Use hass.user.id as stable per-user settings key
    const userId = hass?.user?.id;
    if (userId && this._settingsUserId !== userId) {
      this._settingsUserId = userId;
      this.settings = this.loadSettings();
    }
    if (!this._subscribed && hass?.connection) {
      this._subscribed = true;
      this.subscribeToUpdates();
    }
    // Detect HA todo entity state changes for bidirectional sync
    this._checkHATodoStateChanges(prevHass, hass);
  }

  get hass() {
    return this._hass;
  }

  constructor() {
    super();
    this.isEmbedded = false;
    this.currentView = 'shopping';
    this.lists = [];
    this.activeList = null;
    this.recentItems = [];
    this.items = [];
    this.categories = [];
    this.total = { total: 0, currency: '', item_count: 0 };
    this.loading = true;
    this.showAddDialog = false;
    this.showEditDialog = false;
    this.editingItem = null;
    this._settingsUserId = null;
    this._baseCardId = null;
    this._cardId = null;
    this._assignedCardId = null;
    this.settings = this.loadSettings();
    this.isEmbedded = false;
    this._subscribed = false;
    this._suppressHASyncUntil = 0;
    this._haTodoLastItems = {};
    this._haTodoSyncTimers = {};
    this._currencySymbol = '$';
    this._integrationSettings = null;
    this._loadError = '';
    this._hassWaiter = null;
    this._searchOpen = false;
    this._optionsOpen = false;
    this._catFilter = 'all';
  }

  _retryLoad() {
    this._loadError = '';
    this.loadData().then(() => this._loadIntegrationSettings());
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._assignedCardId && this._baseCardId) {
      // First connection: assign a position-based ID among cards with the same config hash
      const count = _slmInstanceCounters.get(this._baseCardId) ?? 0;
      _slmInstanceCounters.set(this._baseCardId, count + 1);
      this._assignedCardId = count === 0
        ? this._baseCardId
        : `${this._baseCardId}_${count}`;
    } else if (this._assignedCardId && this._baseCardId) {
      // Reconnect after SPA navigation: re-register in the counter
      const count = _slmInstanceCounters.get(this._baseCardId) ?? 0;
      _slmInstanceCounters.set(this._baseCardId, count + 1);
    }
    if (this._assignedCardId) {
      const prevCardId = this._cardId;
      this._cardId = this._assignedCardId;
      // If the card ID was updated and we already have a user ID (hass fired first),
      // reload settings now with the correct per-card key.
      if (this._cardId !== prevCardId && this._settingsUserId) {
        this.settings = this.loadSettings();
        this.applyColorScheme();
        this.requestUpdate();
      }
    }
  }

  _hashConfig(config) {
    const str = JSON.stringify(config);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  _getSettingsKey() {
    const parts = ['slm_settings'];
    if (this._settingsUserId) parts.push(this._settingsUserId);
    if (this._cardId) parts.push(this._cardId);
    return parts.join('_');
  }

  loadSettings() {
    const defaults = {
      uiStyle: 'fresh',     // 'fresh' (A) | 'compact' (B)
      darkMode: 'style',    // 'style' (A light, B dark) | 'on' | 'off' | 'device'
      fontSize: 16,
      fontFamily: 'system',
      useSystemTextSize: true,
      openLastUsedList: true,
      keepScreenOn: false,
      notifications: {
        listSharing: true,
        emails: true
      },
      recentProductsCount: 8,
      tilesPerRow: this.isEmbedded ? 8 : 3,
      useEmojis: true,
      colorScheme: 'pastel',
      viewMode: 'list',
      sortMode: 'category',
      showRecentlyUsed: true,
      showPriceOnTile: true,
      localImagePath: '/local/images/groceries',
      fontWeight: 'normal',
      syncAcrossDevices: true
    };

    const key = this._getSettingsKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      return { ...defaults, ...JSON.parse(saved) };
    }

    // Migration: on first load with a card-specific key, copy from the old
    // per-user key so existing settings aren't lost.
    if (this._cardId && this._settingsUserId) {
      const oldKey = `slm_settings_${this._settingsUserId}`;
      const oldSaved = localStorage.getItem(oldKey);
      if (oldSaved) {
        const migrated = { ...defaults, ...JSON.parse(oldSaved) };
        localStorage.setItem(key, JSON.stringify(migrated));
        return migrated;
      }
    }

    return defaults;
  }

  saveSettings() {
    const key = this._getSettingsKey();
    localStorage.setItem(key, JSON.stringify(this.settings));
    this._queueSettingsPush();
  }

  // ── Settings sync across devices ──────────────────────────────────────
  // The integration keeps one settings blob per HA user. Device-specific
  // settings (see DEVICE_ONLY_KEYS) always stay local.

  _canSyncSettings() {
    return !!(this.api && this._settingsUserId && this.settings.syncAcrossDevices !== false && !this._syncUnsupported);
  }

  _syncMetaKey() {
    return `slm_settings_sync_${this._settingsUserId}`;
  }

  _loadSyncMeta() {
    try {
      return { syncedAt: null, dirty: false, ...JSON.parse(localStorage.getItem(this._syncMetaKey()) || '{}') };
    } catch (err) {
      return { syncedAt: null, dirty: false };
    }
  }

  _saveSyncMeta(meta) {
    try { localStorage.setItem(this._syncMetaKey(), JSON.stringify(meta)); } catch (err) { /* storage unavailable */ }
  }

  // Called after every local settings change: mark unsent edits and push (debounced).
  _queueSettingsPush() {
    if (!this._canSyncSettings()) return;
    if (JSON.stringify(pickSyncable(this.settings)) === this._lastPushedJson) return; // device-only change
    this._saveSyncMeta({ ...this._loadSyncMeta(), dirty: true });
    clearTimeout(this._settingsPushTimer);
    this._settingsPushTimer = setTimeout(() => this._pushSettings(), 800);
  }

  async _pushSettings() {
    if (!this._canSyncSettings()) return;
    const payload = pickSyncable(this.settings);
    const json = JSON.stringify(payload);
    try {
      const res = await this.api.setUserSettings(payload);
      this._lastPushedJson = json;
      // Only clear "dirty" if nothing changed while the request was in flight.
      const unchanged = json === JSON.stringify(pickSyncable(this.settings));
      this._saveSyncMeta({ syncedAt: res?.updated_at || null, dirty: !unchanged });
    } catch (err) {
      this._handleSyncError(err, 'push');
    }
  }

  // Fetch the server copy and either adopt it, push ours, or do nothing.
  async _syncSettingsFromServer({ throttleMs = 0 } = {}) {
    if (!this._canSyncSettings()) return;
    const now = Date.now();
    if (throttleMs && now - (this._lastSettingsFetch || 0) < throttleMs) return;
    this._lastSettingsFetch = now;
    try {
      const remote = await this.api.getUserSettings();
      const meta = this._loadSyncMeta();
      const action = decideSync(meta, remote);
      if (action === 'push') {
        await this._pushSettings();
      } else if (action === 'apply') {
        this.settings = mergeRemote(this.settings, remote.settings);
        localStorage.setItem(this._getSettingsKey(), JSON.stringify(this.settings));
        this._lastPushedJson = JSON.stringify(pickSyncable(this.settings));
        this._saveSyncMeta({ syncedAt: remote.updated_at, dirty: false });
        this.applyColorScheme();
        this.requestUpdate();
      } else {
        this._lastPushedJson = JSON.stringify(pickSyncable(this.settings));
      }
    } catch (err) {
      this._handleSyncError(err, 'fetch');
    }
  }

  _handleSyncError(err, what) {
    // Older integration without the user_settings commands: stop trying.
    if (err?.code === 'unknown_command') {
      this._syncUnsupported = true;
      console.info('[SLM] Settings sync needs a newer Shopping List Manager integration');
      return;
    }
    console.warn(`[SLM] Settings sync ${what} failed:`, err?.message || err?.code || err);
  }

  async firstUpdated() {
    if (!this.hass) {
      await new Promise((resolve) => { this._hassWaiter = resolve; });
    }
    this.api = new ShoppingListAPI(this.hass);
    await Promise.all([this.loadData(), this._loadIntegrationSettings()]);
    this.applyColorScheme();
    if (this.settings.keepScreenOn) this.acquireWakeLock();
    // Pull this user's synced settings in the background (doesn't block first paint)
    this._syncSettingsFromServer();
    this._visibilityHandler = () => {
      if (document.visibilityState !== 'visible') return;
      if (this.settings.keepScreenOn) this.acquireWakeLock();
      this._syncSettingsFromServer({ throttleMs: 15000 });
    };
    document.addEventListener('visibilitychange', this._visibilityHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._settingsPushTimer);
    this.releaseWakeLock();
    document.removeEventListener('visibilitychange', this._visibilityHandler);

    for (const t of Object.values(this._haTodoSyncTimers)) clearTimeout(t);
    this._haTodoSyncTimers = {};

    // Decrement instance counter so position slots are correctly reclaimed
    if (this._baseCardId) {
      const count = _slmInstanceCounters.get(this._baseCardId) ?? 1;
      _slmInstanceCounters.set(this._baseCardId, Math.max(0, count - 1));
    }
  }

  async acquireWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      this._wakeLock = await navigator.wakeLock.request('screen');
      this._wakeLock.addEventListener('release', () => { this._wakeLock = null; });
    } catch (err) {
      console.warn('[SLM] Wake lock failed:', err.message);
    }
  }

  releaseWakeLock() {
    this._wakeLock?.release();
    this._wakeLock = null;
  }

  // Interface style in use. The embedded view (inside Recipe Manager Card) always
  // keeps the classic layout because it has no header or bottom-nav space to restyle.
  //
  // Two designs: 'fresh' (A: light, card based) and 'compact' (B: dark, dense list).
  // Embedded in Recipe Manager Card keeps the plain classic layout.
  get _ui() {
    // Embedded: follow the host card's style when it passes one (hostUi), else stay classic
    if (this.isEmbedded) return (this.hostUi === 'fresh' || this.hostUi === 'compact') ? this.hostUi : 'classic';
    return this.settings?.uiStyle === 'compact' ? 'compact' : 'fresh';
  }

  // Embedded with a host style: the full classic embedded toolbar is replaced by the normal header
  get _classicEmbedded() {
    return this.isEmbedded && this._ui === 'classic';
  }

  // Is the dark palette in use? 'on' / 'off' are explicit, 'device' follows Home Assistant
  // (or the OS), anything else uses the design's own default: A is light, B is dark.
  get _isDark() {
    if (this.isEmbedded && typeof this.hostDark === 'boolean') return this.hostDark;
    const m = this.settings?.darkMode;
    if (m === 'on') return true;
    if (m === 'off') return false;
    if (m === 'device') {
      const ha = this._hass?.themes?.darkMode;
      if (typeof ha === 'boolean') return ha;
      return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return this._ui === 'compact';
  }

  willUpdate() {
    // Keep the design attributes in sync (e.g. if isEmbedded changes after settings load)
    const ui = this._ui;
    if (this.isEmbedded) { if (!this.hasAttribute('data-embedded')) this.setAttribute('data-embedded', ''); }
    else if (this.hasAttribute('data-embedded')) this.removeAttribute('data-embedded');
    if (ui === 'classic') {
      if (this.hasAttribute('data-ui')) this.removeAttribute('data-ui');
      if (this.hasAttribute('data-mode')) this.removeAttribute('data-mode');
      return;
    }
    if (this.getAttribute('data-ui') !== ui) this.setAttribute('data-ui', ui);
    const mode = this._isDark ? 'dark' : 'light';
    if (this.getAttribute('data-mode') !== mode) this.setAttribute('data-mode', mode);
  }

  applyColorScheme() {
    const ui = this._ui;
    // The old colour themes were removed; make sure no stale attributes linger
    this.removeAttribute('data-theme');
    this.removeAttribute('data-theme-name');

    if (ui === 'classic') {
      this.removeAttribute('data-ui');
      this.removeAttribute('data-mode');
    } else {
      this.setAttribute('data-ui', ui);
      this.setAttribute('data-mode', this._isDark ? 'dark' : 'light');
    }

    // Theme (Meadow / Slate / Sunset): override the accent tokens, or fall back to the design's palette
    const ov = ui === 'classic' ? null : this.isEmbedded ? (this.hostAccent || null) : themeOverrides(ui, this.settings.designTheme, this._isDark);
    const accentTokens = { '--slm-accent-primary': 'a', '--slm-accent-ink': 'i', '--slm-accent-soft': 's', '--slm-accent-text': 't', '--slm-total-bar-bg': 'a' };
    for (const [prop, key] of Object.entries(accentTokens)) {
      if (ov) this.style.setProperty(prop, ov[key]);
      else this.style.removeProperty(prop);
    }

    // Font: each design has its own typeface unless the user picked one in Appearance > Font Family
    const chosen = this.settings.fontFamily;
    const design = DESIGN_FONTS[ui];
    if (chosen && chosen !== 'system') {
      this.style.setProperty('--slm-font', chosen);
    } else if (design) {
      ensureFontLoaded(design.url);
      this.style.setProperty('--slm-font', design.stack);
    } else {
      this.style.removeProperty('--slm-font');
    }

    // Apply font size as a CSS custom property (cascades through shadow DOM)
    if (!this.settings.useSystemTextSize) {
      this.style.setProperty('--slm-font-size-base', `${this.settings.fontSize}px`);
    } else {
      this.style.removeProperty('--slm-font-size-base');
    }

    // Apply font weight
    const weightMap = { light: '300', normal: '400', bold: '700' };
    this.style.setProperty('--slm-font-weight-base', weightMap[this.settings.fontWeight] || '400');
  }

  async _loadIntegrationSettings() {
    try {
      const result = await this.api.getIntegrationSettings();
      this._integrationSettings = result;
      this._metricUnitsOnly = result.metric_units_only !== false;
      this._enablePriceTracking = result.enable_price_tracking !== false;
      this._applyRegionSettings(result.country, result.custom_regions || {}, result.currency_symbol);
    } catch (err) {
      console.warn('[SLM] Failed to load integration settings:', err);
    }
  }

  async _applyRegionSettings(activeCountry, customRegions, builtInCurrencySymbol) {
    const region = customRegions[activeCountry];
    if (!region) {
      // Built-in region: the integration supplies its currency symbol, and
      // regions with a bundled UI language (e.g. ES, FR) are translated offline.
      this._currencySymbol = builtInCurrencySymbol || '$';
      const bundled = BUNDLED_TRANSLATIONS[BUILT_IN_REGION_LANGUAGE[activeCountry]];
      setTranslations(bundled || null);
      return;
    }
    this._currencySymbol = region.currency_symbol || '$';
    if (region.language && getLanguageCode(region.language)) {
      const translations = await loadTranslations(region.language);
      setTranslations(translations);
    } else {
      setTranslations(null);
    }
  }

  async loadData() {
    try {
      // Only show the full-screen spinner the first time. A refresh after a change (sharing a list,
      // editing a group) happens in place, so open dialogs and settings pages are not thrown away.
      if (!this.activeList && !(this.lists && this.lists.length)) this.loading = true;

      const [listsResult, categoriesResult] = await Promise.all([
        this.api.getLists(),
        this.api.getCategories(),
      ]);
      this.lists = listsResult.lists || [];
      this.categories = categoriesResult.categories;

      const lastListKey = `slm_last_list_${this._settingsUserId || 'default'}`;
      // Preserve current selection if the list still exists (prevents subscription
      // events from resetting the active list after a manual switch or create)
      const currentStillExists = this.activeList && this.lists.find(l => l.id === this.activeList.id);
      if (currentStillExists) {
        this.activeList = this.lists.find(l => l.id === this.activeList.id);
      } else if (this.settings.openLastUsedList) {
        const lastListId = localStorage.getItem(lastListKey);
        this.activeList = this.lists.find(l => l.id === lastListId) ||
          this.lists.find(l => l.active) ||
          this.lists[0];
      } else {
        this.activeList = this.lists.find(l => l.active) || this.lists[0];
      }

      if (this.activeList) {
        await this.loadActiveListData();
      }

      this._loadError = '';
    } catch (err) {
      console.error('Failed to load data:', err);
      this._loadError = err?.message || err?.code || String(err);
    } finally {
      this.loading = false;
    }
  }

  async loadActiveListData() {
    if (!this.activeList) return;

    const listId = this.activeList.id;
    const [itemsResult, totalResult] = await Promise.all([
      this.api.getItems(listId),
      this.api.getListTotal(listId),
    ]);
    this.items = itemsResult.items;
    this.total = totalResult;

    const lastListKey = `slm_last_list_${this._settingsUserId || 'default'}`;
    localStorage.setItem(lastListKey, this.activeList.id);
  }

  async _refreshTotal() {
    if (!this.activeList) return;
    try {
      const result = await this.api.getListTotal(this.activeList.id);
      this.total = result;
    } catch (err) {
      console.warn('[SLM] Failed to refresh total:', err);
    }
  }

  async handleListChange(e) {
    const listId = e.detail.listId;
    await this.api.setActiveList(listId);
    this.activeList = this.lists.find(l => l.id === listId);
    await this.loadActiveListData();
    this.currentView = 'shopping';
  }

  async handleItemClick(e) {
    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);
    if (!item || item.checked) return;

    const prev = this.items;
    this.items = this.items.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1, _pending: true } : i);
    try {
      await this.api.incrementItem(itemId, 1);
      this.items = this.items.map(i => i.id === itemId ? { ...i, _pending: false } : i);
    } catch (err) {
      console.error('[SLM] Failed to increment item:', err);
      this.items = prev;
    }
  }

  async handleItemDecrease(e) {
    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;

    const prev = this.items;
    if (item.quantity > 1) {
      this.items = this.items.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1, _pending: true } : i);
      try {
        await this.api.incrementItem(itemId, -1);
        this.items = this.items.map(i => i.id === itemId ? { ...i, _pending: false } : i);
      } catch (err) {
        console.error('[SLM] Failed to decrement item:', err);
        this.items = prev;
      }
    } else {
      this.items = this.items.filter(i => i.id !== itemId);
      try {
        await this.api.deleteItem(itemId);
        this._refreshTotal();

        // Mirror deletion to linked HA todo list (fire-and-forget)
        const todoEntity = this._getLinkedTodoEntity();
        if (todoEntity && item?.name) this._haTodoRemove(todoEntity, item.name);
      } catch (err) {
        console.error('[SLM] Failed to delete item:', err);
        this.items = prev;
      }
    }
  }

  async handleItemCheck(e) {
    const { itemId, checked } = e.detail;
    const item = this.items.find(i => i.id === itemId);
    if (checked && item?.product_id) this.trackRecentlyUsed(item.product_id);
    const prev = this.items;
    this.items = this.items.map(i => i.id === itemId ? { ...i, checked, _pending: true } : i);
    try {
      await this.api.checkItem(itemId, checked);
      this.items = this.items.map(i => i.id === itemId ? { ...i, _pending: false } : i);

      // Mirror check state to linked HA todo list (fire-and-forget)
      const todoEntity = this._getLinkedTodoEntity();
      if (todoEntity && item?.name) this._haTodoCheck(todoEntity, item.name, checked);
    } catch (err) {
      console.error('[SLM] Failed to check item:', err);
      this.items = prev;
    }
  }

  async handleItemLongPress(e) {
    this.editingItem = e.detail.item;
    this.showEditDialog = true;
  }

  async handleItemSwipeDelete(e) {
    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);
    if (item?.product_id) this.untrackRecentlyUsed(item.product_id);

    const prev = this.items;
    this.items = this.items.filter(i => i.id !== itemId);
    try {
      await this.api.deleteItem(itemId);
      this._refreshTotal();

      // Mirror deletion to linked HA todo list (fire-and-forget)
      const todoEntity = this._getLinkedTodoEntity();
      if (todoEntity && item?.name) this._haTodoRemove(todoEntity, item.name);
    } catch (err) {
      console.error('[SLM] Failed to delete item:', err);
      this.items = prev;
    }
  }

  untrackRecentlyUsed(productId) {
    if (!productId) return;
    const recentKey = 'slm_recent_products';
    const saved = localStorage.getItem(recentKey);
    if (!saved) return;
    const recent = JSON.parse(saved).filter(id => id !== productId);
    localStorage.setItem(recentKey, JSON.stringify(recent));
  }

  async handleAddItem(e) {
    const itemData = { ...e.detail };

    // Close dialog immediately for perceived speed
    this.showAddDialog = false;

    // Auto-create a product record if none exists yet (quick-add from search)
    // so the item is reusable across lists and appears in suggestions/recently-used.
    if (!itemData.product_id && !itemData.fromRecentlyUsed) {
      try {
        // Do NOT send 'custom' — it's not in the WS schema (backend forces custom=True itself)
        const productData = {
          name: itemData.name,
          category_id: itemData.category_id || 'other'
        };
        if (itemData.price) productData.price = parseFloat(itemData.price);
        if (itemData.image_url) productData.image_url = itemData.image_url;
        const result = await this.api.addProduct(productData);
        const product = result.product || result;
        if (product?.id) itemData.product_id = product.id;
      } catch (err) {
        console.warn('[SLM] Could not auto-create product:', err);
        // Continue — item will still be added to the list without a product_id
      }
    }

    const existingItem = this.items.find(i =>
      i.product_id && i.product_id === itemData.product_id && !i.checked
    );

    try {
      if (itemData.fromRecentlyUsed) {
        // Recently-used: always start fresh at qty=1
        if (existingItem) {
          await this.api.updateItem(existingItem.id, { quantity: 1 });
        } else {
          // Strip internal flag and any null/undefined optional fields (backend schema rejects nulls)
          const { fromRecentlyUsed: _flag, ...rest } = itemData;
          const addData = { quantity: 1 };
          for (const [k, v] of Object.entries(rest)) {
            if (v !== null && v !== undefined) addData[k] = v;
          }
          await this.api.addItem(this.activeList.id, addData);
        }
      } else if (existingItem) {
        // Normal add: increment existing unchecked item
        await this.api.updateItem(existingItem.id, {
          quantity: existingItem.quantity + 1
        });
      } else {
        await this.api.addItem(this.activeList.id, itemData);
      }
      this.trackRecentlyUsed(itemData.product_id);
      this._refreshTotal();

      // Mirror to linked HA todo list (fire-and-forget, only for new items)
      if (!existingItem) {
        const todoEntity = this._getLinkedTodoEntity();
        if (todoEntity && itemData.name) this._haTodoAdd(todoEntity, itemData.name);
      }
    } catch (err) {
      console.error('[SLM] Failed to add item:', err);
    }
  }

  trackRecentlyUsed(productId) {
    if (!productId) return;

    const recentKey = 'slm_recent_products';
    const saved = localStorage.getItem(recentKey);
    const recent = saved ? JSON.parse(saved) : [];

    // Remove if exists, add to front
    const filtered = recent.filter(id => id !== productId);
    filtered.unshift(productId);

    // Keep only last 50
    const trimmed = filtered.slice(0, 50);
    localStorage.setItem(recentKey, JSON.stringify(trimmed));
  }

  async _syncProductFromItemData(productId, data) {
    const productUpdate = {};
    if (data.name) productUpdate.name = data.name;
    if (data.category_id) productUpdate.category_id = data.category_id;
    if (data.price !== undefined && data.price !== '') productUpdate.price = parseFloat(data.price) || 0;
    if (data.unit) productUpdate.default_unit = data.unit;
    if (data.image_url !== undefined) productUpdate.image_url = data.image_url;
    if (Object.keys(productUpdate).length > 0) {
      await this.api.updateProduct(productId, productUpdate);
    }
  }

  async handleEditItem(e) {
    const { itemId, data } = e.detail;

    if (this.editingItem?._isProductEdit) {
      // Editing a product directly from recently-used (no list item exists)
      await this._syncProductFromItemData(this.editingItem.product_id, data);
    } else {
      await this.api.updateItem(itemId, data);
      // Also propagate changes to the product catalog so future uses pick them up
      const item = this.items.find(i => i.id === itemId);
      if (item?.product_id) {
        await this._syncProductFromItemData(item.product_id, data);
      }
    }

    this._refreshTotal();
    this.showEditDialog = false;
    this.editingItem = null;
  }

  handleNavChange(e) {
    this.currentView = e.detail.view;
  }

  handleSettingsChange(e) {
    const syncJustEnabled = 'syncAcrossDevices' in e.detail && e.detail.syncAcrossDevices && !this.settings.syncAcrossDevices;
    this.settings = { ...this.settings, ...e.detail };
    this.saveSettings();
    if (syncJustEnabled) {
      // Switching sync on: take the server copy (seeds it from here if empty)
      this._saveSyncMeta({ syncedAt: null, dirty: false });
      this._syncSettingsFromServer();
    }
    this.applyColorScheme();
    if (this.settings.keepScreenOn) {
      this.acquireWakeLock();
    } else {
      this.releaseWakeLock();
    }
    this.requestUpdate();
  }

  handleMenuSettingChange(e) {
    const { key, value } = e.detail;
    this.settings = { ...this.settings, [key]: value };
    this.saveSettings();
    this.requestUpdate();
  }

  async handleCreateAndAddProduct(e) {
    const { name, category_id, price, unit, barcode, image_url } = e.detail;
    try {
      const productData = { name, category_id }; // backend forces custom=True
      if (price) productData.price = parseFloat(price);
      if (barcode) productData.barcode = barcode;
      if (image_url) productData.image_url = image_url;
      const result = await this.api.addProduct(productData);
      const product = result.product || result;
      const itemData = {
        name,
        category_id,
        product_id: product.id,
        quantity: 1,
        unit: unit || 'units'
      };
      if (price) itemData.price = parseFloat(price);
      await this.api.addItem(this.activeList.id, itemData);
      if (product.id) this.trackRecentlyUsed(product.id);
      this._refreshTotal();
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  }

  handleBackToLists() {
    this.currentView = 'lists';
  }

  async handleShareList() {
    const listName = this.activeList?.name || 'Shopping List';
    const itemsList = this.items
      .filter(i => !i.checked)
      .map(i => `${i.quantity} ${i.unit} ${i.name}`)
      .join('\n');

    const shareText = `${listName}\n\n${itemsList}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: listName,
          text: shareText
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // Fallback: copy to clipboard (navigator.clipboard unavailable in HA iframes)
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareText);
        } else {
          const ta = document.createElement('textarea');
          ta.value = shareText;
          ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        alert('List copied to clipboard!');
      } catch (err) {
        console.error('Copy to clipboard failed:', err);
        alert('Could not copy to clipboard. Please copy manually:\n\n' + shareText);
      }
    }
  }

  _getLinkedTodoEntity(listId) {
    const id = listId ?? this.activeList?.id;
    return this.lists.find(l => l.id === id)?.ha_todo_entity_id || null;
  }

  async _findHATodoItemUid(entityId, itemName) {
    try {
      const result = await this.hass.callWS({ type: 'todo/item/list', entity_id: entityId });
      const items = result?.items || [];
      const lower = itemName?.toLowerCase() || '';
      const match = items.find(i => i.summary?.toLowerCase() === lower && i.status !== 'completed');
      return match?.uid || null;
    } catch (err) {
      console.warn('[SLM] Failed to fetch HA todo items:', err);
      return null;
    }
  }

  _haTodoAdd(entityId, itemName) {
    if (!entityId || !itemName) return;
    this._suppressHASyncUntil = Date.now() + 3000;
    this.hass.callService('todo', 'add_item', { item: itemName }, { entity_id: entityId })
      .catch(err => console.warn('[SLM] HA todo add failed:', err));
  }

  async _haTodoCheck(entityId, itemName, checked) {
    if (!entityId || !itemName) return;
    try {
      const uid = await this._findHATodoItemUid(entityId, itemName);
      if (!uid) return;
      this._suppressHASyncUntil = Date.now() + 3000;
      await this.hass.callService(
        'todo', 'update_item',
        { item: uid, status: checked ? 'completed' : 'needs_action' },
        { entity_id: entityId }
      );
    } catch (err) {
      console.warn('[SLM] HA todo check failed:', err);
    }
  }

  async _haTodoRemove(entityId, itemName) {
    if (!entityId || !itemName) return;
    try {
      const uid = await this._findHATodoItemUid(entityId, itemName);
      if (!uid) return;
      this._suppressHASyncUntil = Date.now() + 3000;
      await this.hass.callService('todo', 'remove_item', { item: uid }, { entity_id: entityId });
    } catch (err) {
      console.warn('[SLM] HA todo remove failed:', err);
    }
  }

  _checkHATodoStateChanges(prevHass, hass) {
    if (!hass?.states || !prevHass?.states) return;
    if (Date.now() < this._suppressHASyncUntil) return;

    for (const list of (this.lists || [])) {
      const entityId = list.ha_todo_entity_id;
      if (!entityId) continue;
      const prev = prevHass.states[entityId];
      const curr = hass.states[entityId];
      if (!curr || !prev) continue;
      if (prev.last_changed !== curr.last_changed) {
        this._debouncedHATodoSync(entityId, list.id);
      }
    }
  }

  _debouncedHATodoSync(entityId, listId) {
    this._haTodoSyncTimers = this._haTodoSyncTimers || {};
    clearTimeout(this._haTodoSyncTimers[entityId]);
    this._haTodoSyncTimers[entityId] = setTimeout(() => {
      this._onHATodoChanged(entityId, listId);
    }, 300);
  }

  async _onHATodoChanged(entityId, listId) {
    if (Date.now() < this._suppressHASyncUntil) return;
    if (!this.activeList || this.activeList.id !== listId) return;

    try {
      const result = await this.hass.callWS({ type: 'todo/item/list', entity_id: entityId });
      const haItems = result?.items || [];
      const prevItems = (this._haTodoLastItems || {})[entityId] ?? null;

      this._haTodoLastItems = this._haTodoLastItems || {};

      // First call for this entity — just initialise the baseline, don't sync
      if (prevItems === null) {
        this._haTodoLastItems[entityId] = haItems;
        return;
      }
      this._haTodoLastItems[entityId] = haItems;

      const slmItems = this.items;
      let changed = false;

      // Process current HA items → add/check/uncheck in SLM
      for (const haItem of haItems) {
        const name = haItem.summary?.trim();
        if (!name) continue;
        const nameLower = name.toLowerCase();
        const slmMatch = slmItems.find(i => i.name?.toLowerCase() === nameLower);

        if (haItem.status === 'needs_action') {
          if (!slmMatch) {
            await this.api.addItem(listId, { name, quantity: 1, category_id: 'other' });
            changed = true;
          } else if (slmMatch.checked) {
            await this.api.checkItem(slmMatch.id, false);
            changed = true;
          }
        } else if (haItem.status === 'completed' && slmMatch && !slmMatch.checked) {
          await this.api.checkItem(slmMatch.id, true);
          changed = true;
        }
      }

      // Detect items removed from HA → remove from SLM
      const currNames = new Set(haItems.map(i => i.summary?.toLowerCase()).filter(Boolean));
      for (const prevItem of prevItems) {
        const nameLower = prevItem.summary?.toLowerCase();
        if (!nameLower || currNames.has(nameLower)) continue;
        const slmMatch = slmItems.find(i => i.name?.toLowerCase() === nameLower && !i.checked);
        if (slmMatch) {
          await this.api.deleteItem(slmMatch.id);
          changed = true;
        }
      }

      if (changed) await this.loadActiveListData();

    } catch (err) {
      console.warn('[SLM] HA→SLM sync failed:', err);
    }
  }

  async subscribeToUpdates() {
    if (!this.hass?.connection) return;

    try {
      const unsubscribe = await this.hass.connection.subscribeMessage(
        (message) => this._applySubscriptionEvent(message),
        { type: 'shopping_list_manager/subscribe' }
      );

      this._unsubscribers = [unsubscribe];
      console.log('[SLM] ✅ Subscribed to shopping list updates');

    } catch (err) {
      console.error('[SLM] ❌ Failed to subscribe:', err);
    }
  }

  _applySubscriptionEvent(message) {
    const eventType = message.event_type;
    const data = message.data;
    const activeId = this.activeList?.id;

    if (eventType === 'shopping_list_manager_item_added') {
      if (data.list_id !== activeId) return;
      if (!this.items.find(i => i.id === data.item.id)) {
        this.items = [...this.items, data.item];
      }
      this._refreshTotal();

    } else if (eventType === 'shopping_list_manager_item_updated') {
      if (data.list_id !== activeId) return;
      this.items = this.items.map(i =>
        i.id === data.item.id ? { ...data.item, _pending: false } : i
      );
      this._refreshTotal();

    } else if (eventType === 'shopping_list_manager_item_checked') {
      const { item_id, item_ids, checked, list_id } = data;
      if (item_id) {
        if (list_id && list_id !== activeId) return;
        this.items = this.items.map(i =>
          i.id === item_id ? { ...i, checked, _pending: false } : i
        );
      } else if (item_ids) {
        const idSet = new Set(item_ids);
        this.items = this.items.map(i =>
          idSet.has(i.id) ? { ...i, checked, _pending: false } : i
        );
      }

    } else if (eventType === 'shopping_list_manager_item_deleted') {
      const { item_id, action, list_id } = data;
      if (action === 'cleared_checked') {
        if (list_id !== activeId) return;
        this.items = this.items.filter(i => !i.checked);
      } else if (item_id) {
        this.items = this.items.filter(i => i.id !== item_id);
      }
      this._refreshTotal();

    } else if (
      eventType === 'shopping_list_manager_list_updated' ||
      eventType === 'shopping_list_manager_list_deleted' ||
      eventType === 'shopping_list_manager_groups_updated'
    ) {
      this.loadData();
    }
  }

  // Items shown in the list / grid after the category chip filter (design A)
  get _visibleItems() {
    if (this._ui !== 'fresh' || this._catFilter === 'all') return this.items;
    return this.items.filter(i => i.category_id === this._catFilter);
  }

  // Basket summary shown above the list: a summary card in A, a thin progress line in B.
  renderSummary() {
    const ui = this._ui;
    if (ui === 'classic') return '';
    const total = this.items.length;
    const done = this.items.filter(i => i.checked).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const bar = html`
      <div class="progress" role="progressbar" aria-label=${t('In your basket')}
           aria-valuemin="0" aria-valuemax="100" aria-valuenow=${pct}>
        <i style="width: ${pct}%"></i>
      </div>
    `;
    if (ui === 'compact') return bar;
    return html`
      <div class="hero">
        <div class="hero-row">
          <div>
            <div class="hero-label">${t('Left to buy')}</div>
            <div class="hero-big">${total - done} <span>${total - done === 1 ? t('item') : t('items')}</span></div>
          </div>
          <div class="hero-est">
            <div class="hero-label">${t('Estimated')}</div>
            <div class="hero-amt">${this._currencySymbol}${this.total.total.toFixed(2)}</div>
          </div>
        </div>
        ${bar}
      </div>
    `;
  }

  // The chip row scrolls sideways: touch swipes natively, and a mouse can drag it or use the wheel.
  _chipsDown(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = e.currentTarget;
    this._chipDrag = { x: e.clientX, left: el.scrollLeft, moved: false };
  }

  _chipsMove(e) {
    const d = this._chipDrag;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx;
  }

  _chipsUp() {
    if (this._chipDrag?.moved) this._chipSuppressClick = true;
    this._chipDrag = null;
  }

  _chipsClick(e) {
    // A drag with the mouse should not also select the chip under the pointer
    if (this._chipSuppressClick) {
      this._chipSuppressClick = false;
      e.stopPropagation();
      e.preventDefault();
    }
  }

  _chipsWheel(e) {
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }

  // Category filter chips under the summary card (design A)
  renderChips() {
    if (this._ui !== 'fresh') return '';
    const present = (this.categories || []).filter(c => this.items.some(i => i.category_id === c.id));
    if (this._catFilter !== 'all' && !present.some(c => c.id === this._catFilter)) this._catFilter = 'all';
    if (present.length < 2) return '';
    return html`
      <div class="chips" role="group" aria-label=${t('Categories')}
           @pointerdown=${this._chipsDown} @pointermove=${this._chipsMove}
           @pointerup=${this._chipsUp} @pointercancel=${this._chipsUp} @pointerleave=${this._chipsUp}
           @wheel=${this._chipsWheel} @click=${this._chipsClick}>
        <button class="chip ${this._catFilter === 'all' ? 'on' : ''}"
                @click=${() => { this._catFilter = 'all'; }}>${t('All')} · ${this.items.length}</button>
        ${present.map(c => html`
          <button class="chip ${this._catFilter === c.id ? 'on' : ''}"
                  @click=${() => { this._catFilter = c.id; }}>${c.name}</button>
        `)}
      </div>
    `;
  }

  // Search / add-item box. Design A hides it until the search or + button is pressed.
  async _toggleSearch() {
    if (this._ui === 'fresh') this._searchOpen = !this._searchOpen;
    await this.updateComplete;
    if (this._ui === 'compact' || this._searchOpen) {
      this.shadowRoot.querySelector('slm-search-bar')?.focusInput?.();
    }
  }

  async _clearChecked() {
    if (!this.activeList) return;
    this._optionsOpen = false;
    try {
      await this.api.clearCheckedItems(this.activeList.id);
      this.items = this.items.filter(i => !i.checked);
      this._refreshTotal();
    } catch (err) {
      console.error('[SLM] Clear checked failed:', err);
    }
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'shopping': {
        const ui = this._ui;
        const header = html`
          <slm-list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(i => !i.checked).length}
            .settings=${this.settings}
            .currencySymbol=${this._currencySymbol}
            .totalAmount=${this.total.total}
            .uiStyle=${ui}
            ?compact=${this._classicEmbedded}
            @back=${this.handleBackToLists}
            @share=${this.handleShareList}
            @search-toggle=${this._toggleSearch}
            @open-options=${() => { this._optionsOpen = true; }}
            @menu-setting-change=${this.handleMenuSettingChange}
          ></slm-list-header>
        `;
        const searchBar = html`
          <slm-search-bar
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            .activeListId=${this.activeList?.id}
            .currencySymbol=${this._currencySymbol}
            .uiStyle=${ui}
            @add-item=${this.handleAddItem}
            @create-and-add-product=${this.handleCreateAndAddProduct}
          ></slm-search-bar>
        `;
        const classicEmbedded = this._classicEmbedded;
        const showSearch = classicEmbedded || ui === 'compact' || this._searchOpen;
        // When embedded (e.g. in Recipe Manager Card) the host already shows a
        // heading, so drop our own header row and put Share + menu beside search.
        return html`
          ${classicEmbedded ? '' : header}

          <div class="content-area">
            ${this.renderSummary()}
            ${this.renderChips()}

            ${classicEmbedded
              ? html`<div class="embedded-toolbar">${searchBar}${header}</div>`
              : showSearch ? searchBar : ''}

            ${this.settings.viewMode === 'list' ? html`
              <slm-item-list
                .items=${this._visibleItems}
                .categories=${this.categories}
                .settings=${this.settings}
                .api=${this.api}
                .currencySymbol=${this._currencySymbol}
                .uiStyle=${ui}
                @add-item=${this.handleAddItem}
                @item-click=${this.handleItemClick}
                @item-decrease=${this.handleItemDecrease}
                @item-check=${this.handleItemCheck}
                @item-long-press=${this.handleItemLongPress}
                @item-swipe-delete=${this.handleItemSwipeDelete}
              ></slm-item-list>
            ` : html`
              <slm-item-grid
                .items=${this._visibleItems}
                .categories=${this.categories}
                .settings=${this.settings}
                .api=${this.api}
                .uiStyle=${ui}
                @add-item=${this.handleAddItem}
                @item-click=${this.handleItemClick}
                @item-decrease=${this.handleItemDecrease}
                @item-check=${this.handleItemCheck}
                @item-long-press=${this.handleItemLongPress}
                @item-swipe-delete=${this.handleItemSwipeDelete}
              ></slm-item-grid>
            `}
          </div>

          <div class="total-bar">
            <div class="total-label">${t('Estimated total')}</div>
            <div class="total-amount">
              ${this._currencySymbol}${this.total.total.toFixed(2)}
            </div>
            <div class="total-count">${this.total.item_count} ${t('items')}</div>
          </div>
        `;
      }

      case 'lists':
        return html`
          <slm-lists-view
            .api=${this.api}
            .lists=${this.lists}
            .activeList=${this.activeList}
            .items=${this.items}
            .total=${this.total}
            .currentUserId=${this._hass?.user?.id || ''}
            .isAdmin=${this._hass?.user?.is_admin || false}
            .uiStyle=${this._ui}
            @list-selected=${this.handleListChange}
            @lists-updated=${() => this.loadData()}
          ></slm-lists-view>
        `;

      case 'loyalty':
        return html`
          <div class="content-area">
            <slm-loyalty-cards-view
              .api=${this.api}
              .userId=${this._hass?.user?.id || null}
              .isAdmin=${this._hass?.user?.is_admin || false}
              .uiStyle=${this._ui}
            ></slm-loyalty-cards-view>
          </div>
        `;

      case 'settings':
        return html`
          <div class="content-area">
            <slm-settings-view
              .hass=${this.hass}
              .api=${this.api}
              .settings=${this.settings}
              .lists=${this.lists}
              .isEmbedded=${this.isEmbedded}
              .categories=${this.categories}
              .uiStyle=${this._ui}
              .integrationVersion=${this._integrationSettings?.version}
              @settings-changed=${this.handleSettingsChange}
              @lists-updated=${async () => { await this.loadData(); await this._loadIntegrationSettings(); }}
              @region-changed=${() => this._loadIntegrationSettings()}
            ></slm-settings-view>
          </div>
        `;

      default:
        return html`<div>Unknown view</div>`;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <ha-card>
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>
        </ha-card>
      `;
    }

    if (this._loadError && !this.activeList) {
      return html`
        <ha-card>
          <div class="loading">
            <p><strong>Couldn't load your shopping lists.</strong></p>
            <p class="load-error">${this._loadError}</p>
            <button class="retry-btn" @click=${() => this._retryLoad()}>Retry</button>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="card-container">
          ${this.renderCurrentView()}
        </div>

        ${this._ui === 'fresh' && this.currentView === 'shopping' ? html`
          <button class="fab" aria-label=${t('Add item')} @click=${this._toggleSearch}>
            <ha-icon icon=${this._searchOpen ? 'mdi:close' : 'mdi:plus'}></ha-icon>
          </button>
        ` : ''}

        <slm-bottom-nav
          .currentView=${this.currentView}
          .uiStyle=${this.isEmbedded && this._ui !== 'classic' ? 'compact' : this._ui}
          @nav-changed=${this.handleNavChange}
        ></slm-bottom-nav>

        ${this._optionsOpen && this._ui === 'fresh' ? html`
          <slm-options-sheet
            .settings=${this.settings}
            .hasChecked=${this.items.some(i => i.checked)}
            .wakeLockSupported=${'wakeLock' in navigator}
            @close=${() => { this._optionsOpen = false; }}
            @menu-setting-change=${this.handleMenuSettingChange}
            @settings-changed=${this.handleSettingsChange}
            @share=${() => { this._optionsOpen = false; this.handleShareList(); }}
            @clear-checked=${this._clearChecked}
          ></slm-options-sheet>
        ` : ''}

        ${this.showEditDialog ? html`
          <slm-edit-item-dialog
            .api=${this.api}
            .item=${this.editingItem}
            .categories=${this.categories}
            .metricUnitsOnly=${this._metricUnitsOnly}
            .enablePriceTracking=${this._enablePriceTracking}
            .currencySymbol=${this._currencySymbol}
            @save-item=${this.handleEditItem}
            @delete-item=${this.handleItemSwipeDelete}
            @close=${() => { this.showEditDialog = false; this.editingItem = null; }}
          ></slm-edit-item-dialog>
        ` : ''}
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
      max-height: -webkit-fill-available;
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      overflow: hidden;
      position: relative;
      background: var(--slm-bg-surface);
    }
    .card-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }
    /* Embedded in a host card that already has its own bottom navigation */
    :host([data-embedded][data-ui="fresh"]) .fab { bottom: 76px; }
    :host([data-embedded][data-ui="fresh"]) .content-area { padding-bottom: 96px; }
    :host([data-embedded][data-ui="compact"]) .content-area { padding-bottom: 8px; }
    .embedded-toolbar {
      display: flex;
      align-items: center;
      background: var(--slm-bg-surface);
    }
    .embedded-toolbar slm-search-bar {
      flex: 1;
      min-width: 0;
    }
    .embedded-toolbar slm-list-header {
      flex: none;
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 60px;
      -webkit-overflow-scrolling: touch;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 32px;
      gap: 16px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--divider-color);
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    .load-error { margin: 0; font-size: 12px; color: var(--secondary-text-color); text-align: center; }
    .retry-btn {
      padding: 8px 20px;
      border: none;
      border-radius: 8px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-size: 14px;
      cursor: pointer;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .total-bar {
      position: sticky;
      bottom: 10px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      margin: 0 4px 4px 4px;
      background: var(--slm-total-bar-bg, linear-gradient(90deg, #9fa8da 0%, #c5cae9 100%));
      color: white;
      border-radius: 8px;
      box-shadow: var(--slm-shadow-soft);
      z-index: 90;
    }
    .total-amount {
      font-size: 16px;
      font-weight: 700;
    }
    .total-count {
      font-size: 12px;
      opacity: 0.9;
    }
    .total-label {
      display: none;
    }

    /* ===============================
      DESIGNS A (fresh) AND B (compact)
      The old colour themes were removed; each design has its own palette (see below).
    ================================ */
    ha-card {
      font-family: var(--slm-font, inherit);
    }
    .hero,
    .progress,
    .chips,
    .fab {
      display: none;
    }
    :host([data-ui="fresh"]) ha-card,
    :host([data-ui="compact"]) ha-card {
      background: var(--slm-bg-main);
      color: var(--slm-text-primary);
    }
    .progress {
      height: 8px;
      border-radius: 99px;
      overflow: hidden;
      background: var(--slm-border-subtle);
    }
    .progress i {
      display: block;
      height: 100%;
      border-radius: 99px;
      background: var(--slm-accent-primary);
      transition: width 0.35s;
    }

    /* ----- A: summary card, category chips, + button, floating nav ----- */
    :host([data-ui="fresh"]) .content-area {
      padding-bottom: 130px;
    }
    :host([data-ui="fresh"]) .total-bar {
      display: none;
    }
    :host([data-ui="fresh"]) .hero {
      display: grid;
      gap: 12px;
      margin: 16px 20px 0;
      padding: 18px 20px;
      border-radius: 24px;
      background: var(--slm-accent-primary);
      color: var(--slm-accent-ink);
    }
    .hero-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
    }
    .hero-label {
      font-size: 13px;
      font-weight: 600;
      opacity: 0.92;
    }
    .hero-big {
      font-size: 30px;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    .hero-big span {
      font-size: 17px;
      font-weight: 600;
      letter-spacing: 0;
      opacity: 0.92;
    }
    .hero-est {
      text-align: right;
    }
    .hero-amt {
      font-size: 20px;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }
    :host([data-ui="fresh"]) .hero .progress {
      display: block;
      background: color-mix(in srgb, var(--slm-accent-ink) 28%, transparent);
    }
    :host([data-ui="fresh"]) .hero .progress i {
      background: var(--slm-accent-ink);
    }
    :host([data-ui="fresh"]) .chips {
      display: flex;
      gap: 8px;
      padding: 16px 20px 0;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      touch-action: pan-x pan-y;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      cursor: grab;
      user-select: none;
      /* fade the right edge so it is clear there is more to swipe to */
      -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 28px), transparent);
      mask-image: linear-gradient(to right, #000 calc(100% - 28px), transparent);
    }
    :host([data-ui="fresh"]) .chips::-webkit-scrollbar {
      display: none;
    }
    :host([data-ui="fresh"]) .chips::after {
      content: "";
      flex: none;
      width: 20px;
    }
    .chip {
      flex: none;
      min-height: 40px;
      padding: 0 16px;
      border-radius: 999px;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
    }
    .chip.on {
      background: var(--slm-text-primary);
      border-color: var(--slm-text-primary);
      color: var(--slm-bg-main);
      font-weight: 700;
    }
    :host([data-ui="fresh"]) .fab {
      position: absolute;
      right: 24px;
      bottom: 104px;
      z-index: 120;
      width: 56px;
      height: 56px;
      padding: 0;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--slm-text-primary);
      color: var(--slm-bg-main);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .fab ha-icon {
      --mdc-icon-size: 26px;
      color: inherit;
      --icon-primary-color: currentColor;
    }

    /* ----- B: thin progress line + flat total bar ----- */
    :host([data-ui="compact"]) .progress {
      display: block;
      height: 4px;
      margin: 14px 20px 0;
      background: var(--slm-bg-elevated);
    }
    :host([data-ui="compact"]) .content-area {
      padding-bottom: 8px;
    }
    :host([data-ui="compact"]) .total-bar {
      position: static;
      margin: 0;
      padding: 12px 20px;
      border-radius: 0;
      border-top: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      box-shadow: none;
      gap: 12px;
    }
    :host([data-ui="compact"]) .total-label {
      display: block;
      flex: 1;
      font-size: 13px;
      color: var(--slm-text-secondary);
    }
    :host([data-ui="compact"]) .total-amount {
      font-size: 20px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    :host([data-ui="compact"]) .total-count {
      color: var(--slm-text-secondary);
      opacity: 1;
    }

    /* ===============================
      DEFAULT (Home Assistant Theme – placeholder)
    ================================ */
    :host {
      --slm-bg-main: var(--primary-background-color);
      --slm-bg-surface: var(--card-background-color);
      --slm-bg-elevated: var(--card-background-color);

      --slm-text-primary: var(--primary-text-color);
      --slm-text-secondary: var(--secondary-text-color);
      --slm-text-muted: var(--secondary-text-color);

      --slm-border-subtle: var(--divider-color);

      --slm-accent-primary: var(--primary-color);
      --slm-accent-secondary: var(--success-color, var(--primary-color));
      --slm-accent-warning: var(--warning-color, var(--primary-color));
      --slm-accent-danger: var(--error-color, var(--primary-color));

      --slm-tile-bg: var(--card-background-color);
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(0,0,0,0.1);
      --slm-shadow-medium: 0 4px 12px rgba(0,0,0,0.2);

      --slm-list-gradient-0: linear-gradient(135deg, #7986cb, #9fa8da);
      --slm-list-gradient-1: linear-gradient(135deg, #81c784, #a5d6a7);
      --slm-list-gradient-2: linear-gradient(135deg, #ffb74d, #ffcc80);
      --slm-list-gradient-3: linear-gradient(135deg, #ba68c8, #ce93d8);
      --slm-list-gradient-4: linear-gradient(135deg, #4dd0e1, #80deea);
      --slm-list-gradient-5: linear-gradient(135deg, #f06292, #f48fb1);
      --slm-total-bar-bg: linear-gradient(90deg, #9fa8da 0%, #c5cae9 100%);

      --slm-cat-produce: #66bb6a;
      --slm-cat-dairy: #4fc3f7;
      --slm-cat-meat: #e57373;
      --slm-cat-bakery: #ffb74d;
      --slm-cat-pantry: #ff8a65;
      --slm-cat-frozen: #4dd0e1;
      --slm-cat-beverages: #9575cd;
      --slm-cat-snacks: #dce775;
      --slm-cat-household: #4db6ac;
      --slm-cat-health: #81c784;
      --slm-cat-pet: #a1887f;
      --slm-cat-baby: #f06292;
      --slm-cat-other: #90a4ae;
      --slm-cat-recent: #9e9e9e;
    }

    /* ===============================
      PALETTES
    ================================ */
    :host([data-ui="fresh"][data-mode="light"]) {
      --slm-bg-main: #F3F6F4;
      --slm-bg-surface: #FFFFFF;
      --slm-bg-elevated: #E8EEEA;
      --slm-text-primary: #12201B;
      --slm-text-secondary: #5A6B64;
      --slm-text-muted: #5A6B64;
      --slm-border-subtle: #E3EAE6;
      --slm-line-soft: #EEF2EF;
      --slm-accent-primary: #0F7B5A;
      --slm-accent-secondary: #2A5DA8;
      --slm-accent-warning: #9A5A0B;
      --slm-accent-danger: #A32B2B;
      --slm-accent-ink: #FFFFFF;
      --slm-accent-soft: #DDF1E8;
      --slm-accent-text: #0B6048;
      --slm-on-cat: #FFFFFF;
      --slm-tile-bg: #FFFFFF;
      --slm-tile-checked-opacity: 0.4;
      --slm-shadow-soft: 0 1px 3px rgba(18,32,27,0.10);
      --slm-shadow-medium: 0 10px 30px rgba(18,32,27,0.14);
      --slm-list-gradient-0: linear-gradient(135deg, #0F7B5A, #3FA583);
      --slm-list-gradient-1: linear-gradient(135deg, #2A5DA8, #5B8BD0);
      --slm-list-gradient-2: linear-gradient(135deg, #9A5A0B, #D08A2E);
      --slm-list-gradient-3: linear-gradient(135deg, #6A3FA8, #9B73D4);
      --slm-list-gradient-4: linear-gradient(135deg, #0E6B7A, #3FA3B3);
      --slm-list-gradient-5: linear-gradient(135deg, #A32B2B, #D35F5F);
      --slm-total-bar-bg: #0F7B5A;
      --slm-cat-produce: #0F7B5A;
      --slm-cat-dairy: #2A5DA8;
      --slm-cat-meat: #A32B2B;
      --slm-cat-bakery: #9A5A0B;
      --slm-cat-pantry: #6A3FA8;
      --slm-cat-frozen: #1C6E8C;
      --slm-cat-beverages: #5B4BB0;
      --slm-cat-snacks: #8A6A0B;
      --slm-cat-household: #0E6B7A;
      --slm-cat-health: #2E7D4F;
      --slm-cat-pet: #7A5A48;
      --slm-cat-baby: #B03A6E;
      --slm-cat-other: #5A6B64;
      --slm-cat-recent: #5A6B64;
    }

    :host([data-ui="fresh"][data-mode="dark"]) {
      --slm-bg-main: #0F1714;
      --slm-bg-surface: #18231E;
      --slm-bg-elevated: #1F2D26;
      --slm-text-primary: #E8F1EC;
      --slm-text-secondary: #9DB0A7;
      --slm-text-muted: #9DB0A7;
      --slm-border-subtle: #26352E;
      --slm-line-soft: #202D27;
      --slm-accent-primary: #3FBF92;
      --slm-accent-secondary: #6CB6FF;
      --slm-accent-warning: #FFB454;
      --slm-accent-danger: #FF8F8F;
      --slm-accent-ink: #0B1A14;
      --slm-accent-soft: #1B3A2F;
      --slm-accent-text: #7FE0BC;
      --slm-on-cat: #0B1A14;
      --slm-tile-bg: #18231E;
      --slm-tile-checked-opacity: 0.4;
      --slm-shadow-soft: 0 1px 3px rgba(0,0,0,0.4);
      --slm-shadow-medium: 0 10px 30px rgba(0,0,0,0.5);
      --slm-list-gradient-0: linear-gradient(135deg, #1F8F6C, #3FBF92);
      --slm-list-gradient-1: linear-gradient(135deg, #3F78C4, #6CB6FF);
      --slm-list-gradient-2: linear-gradient(135deg, #C98A25, #FFB454);
      --slm-list-gradient-3: linear-gradient(135deg, #8A5BD0, #C79BFF);
      --slm-list-gradient-4: linear-gradient(135deg, #2A93A4, #5CCBDC);
      --slm-list-gradient-5: linear-gradient(135deg, #C84C4C, #FF8F8F);
      --slm-total-bar-bg: #3FBF92;
      --slm-cat-produce: #5BD6A4;
      --slm-cat-dairy: #6CB6FF;
      --slm-cat-meat: #FF8F8F;
      --slm-cat-bakery: #FFB454;
      --slm-cat-pantry: #C79BFF;
      --slm-cat-frozen: #5CCBDC;
      --slm-cat-beverages: #A89BFF;
      --slm-cat-snacks: #E3D25A;
      --slm-cat-household: #5CCBDC;
      --slm-cat-health: #7FE0A0;
      --slm-cat-pet: #C9A48E;
      --slm-cat-baby: #FF8FB8;
      --slm-cat-other: #9DB0A7;
      --slm-cat-recent: #9DB0A7;
    }

    :host([data-ui="compact"][data-mode="dark"]) {
      --slm-bg-main: #0E1014;
      --slm-bg-surface: #171A20;
      --slm-bg-elevated: #1F232B;
      --slm-text-primary: #ECEFF4;
      --slm-text-secondary: #9AA3B2;
      --slm-text-muted: #9AA3B2;
      --slm-border-subtle: #2A2F39;
      --slm-line-soft: #1E222A;
      --slm-accent-primary: #8B9BFF;
      --slm-accent-secondary: #5BD6A4;
      --slm-accent-warning: #FFB454;
      --slm-accent-danger: #FF8F8F;
      --slm-accent-ink: #0E1014;
      --slm-accent-soft: #232B52;
      --slm-accent-text: #B4BEFF;
      --slm-on-cat: #0E1014;
      --slm-tile-bg: #171A20;
      --slm-tile-checked-opacity: 0.4;
      --slm-shadow-soft: 0 1px 3px rgba(0,0,0,0.4);
      --slm-shadow-medium: 0 20px 50px rgba(0,0,0,0.5);
      --slm-list-gradient-0: linear-gradient(135deg, #6E80F0, #8B9BFF);
      --slm-list-gradient-1: linear-gradient(135deg, #3FB88A, #5BD6A4);
      --slm-list-gradient-2: linear-gradient(135deg, #E09A3A, #FFB454);
      --slm-list-gradient-3: linear-gradient(135deg, #A87BE8, #C79BFF);
      --slm-list-gradient-4: linear-gradient(135deg, #3CB0C4, #5CCBDC);
      --slm-list-gradient-5: linear-gradient(135deg, #E05A5A, #FF7A7A);
      --slm-total-bar-bg: #8B9BFF;
      --slm-cat-produce: #5BD6A4;
      --slm-cat-dairy: #6CB6FF;
      --slm-cat-meat: #FF7A7A;
      --slm-cat-bakery: #FFB454;
      --slm-cat-pantry: #C79BFF;
      --slm-cat-frozen: #5CCBDC;
      --slm-cat-beverages: #A89BFF;
      --slm-cat-snacks: #E3D25A;
      --slm-cat-household: #5CCBDC;
      --slm-cat-health: #7FE0A0;
      --slm-cat-pet: #C9A48E;
      --slm-cat-baby: #FF8FB8;
      --slm-cat-other: #9AA3B2;
      --slm-cat-recent: #9AA3B2;
    }

    :host([data-ui="compact"][data-mode="light"]) {
      --slm-bg-main: #F4F5F8;
      --slm-bg-surface: #FFFFFF;
      --slm-bg-elevated: #ECEEF3;
      --slm-text-primary: #14161C;
      --slm-text-secondary: #5B6270;
      --slm-text-muted: #5B6270;
      --slm-border-subtle: #E1E4EB;
      --slm-line-soft: #EDEFF4;
      --slm-accent-primary: #4F5FD6;
      --slm-accent-secondary: #0F7B5A;
      --slm-accent-warning: #9A5A0B;
      --slm-accent-danger: #A32B2B;
      --slm-accent-ink: #FFFFFF;
      --slm-accent-soft: #E3E6FA;
      --slm-accent-text: #3A47B0;
      --slm-on-cat: #FFFFFF;
      --slm-tile-bg: #FFFFFF;
      --slm-tile-checked-opacity: 0.4;
      --slm-shadow-soft: 0 1px 3px rgba(18,32,27,0.10);
      --slm-shadow-medium: 0 20px 50px rgba(20,22,28,0.18);
      --slm-list-gradient-0: linear-gradient(135deg, #0F7B5A, #3FA583);
      --slm-list-gradient-1: linear-gradient(135deg, #2A5DA8, #5B8BD0);
      --slm-list-gradient-2: linear-gradient(135deg, #9A5A0B, #D08A2E);
      --slm-list-gradient-3: linear-gradient(135deg, #6A3FA8, #9B73D4);
      --slm-list-gradient-4: linear-gradient(135deg, #0E6B7A, #3FA3B3);
      --slm-list-gradient-5: linear-gradient(135deg, #A32B2B, #D35F5F);
      --slm-total-bar-bg: #4F5FD6;
      --slm-cat-produce: #0F7B5A;
      --slm-cat-dairy: #2A5DA8;
      --slm-cat-meat: #A32B2B;
      --slm-cat-bakery: #9A5A0B;
      --slm-cat-pantry: #6A3FA8;
      --slm-cat-frozen: #1C6E8C;
      --slm-cat-beverages: #5B4BB0;
      --slm-cat-snacks: #8A6A0B;
      --slm-cat-household: #0E6B7A;
      --slm-cat-health: #2E7D4F;
      --slm-cat-pet: #7A5A48;
      --slm-cat-baby: #B03A6E;
      --slm-cat-other: #5A6B64;
      --slm-cat-recent: #5A6B64;
    }

  `;

  setConfig(config) {
    this.config = config;
    const newBaseId = this._hashConfig(config);
    if (newBaseId !== this._baseCardId) {
      this._baseCardId = newBaseId;
      this._assignedCardId = null; // force reassignment on next connectedCallback
      this._cardId = newBaseId;    // temporary until connectedCallback disambiguates
    }
  }

  getCardSize() {
    return 12;
  }
}

customElements.define('shopping-list-manager-card', ShoppingListManagerCard);

// Lets Home Assistant list the card in the "Add card" picker
window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === 'shopping-list-manager-card')) {
  window.customCards.push({
    type: 'shopping-list-manager-card',
    name: 'Shopping List Manager',
    description: 'Multi-list shopping manager with product search, categories, loyalty cards and Home Assistant to-do sync.',
    preview: false,
    documentationURL: 'https://github.com/thekiwismarthome/shopping-list-manager-card',
  });
}