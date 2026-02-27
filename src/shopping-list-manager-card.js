import { LitElement, html, css } from 'lit';
import { ShoppingListAPI } from './services/api.js';
import './components/slm-bottom-nav.js';
import './components/slm-list-header.js';
import './components/slm-search-bar.js';
import './components/slm-item-grid.js';
import './components/slm-item-list.js';
import './components/slm-add-item-dialog.js';
import './components/slm-edit-item-dialog.js';
import './components/list-management/slm-lists-view.js';
import './components/list-management/slm-loyalty-cards-view.js';
import './settings/slm-settings-view.js';

// Tracks how many instances with each config-hash are currently connected.
// Resets on full page reload, so DOM-order assignments are stable across refreshes.
const _slmInstanceCounters = new Map();

class ShoppingListManagerCard extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    currentView: { type: String },
    lists: { type: Array },
    activeList: { type: Object },
    items: { type: Array },
    categories: { type: Array },
    total: { type: Object },
    loading: { type: Boolean },
    showAddDialog: { type: Boolean },
    showEditDialog: { type: Boolean },
    editingItem: { type: Object },
    settings: { type: Object }
  };
  set hass(hass) {
    this._hass = hass;
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
  }

  get hass() {
    return this._hass;
  }

  constructor() {
    super();
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
    this._subscribed = false;
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
      theme: 'auto',
      darkMode: 'system',
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
      tilesPerRow: 3,
      useEmojis: true,
      colorScheme: 'pastel',
      viewMode: 'tile',
      sortMode: 'category',
      showRecentlyUsed: true,
      showPriceOnTile: true,
      localImagePath: '/local/images/groceries',
      fontWeight: 'normal'
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
  }

  async firstUpdated() {
    this.api = new ShoppingListAPI(this.hass);
    await this.loadData();
    this.applyColorScheme();
    if (this.settings.keepScreenOn) this.acquireWakeLock();
    this._visibilityHandler = () => {
      if (this.settings.keepScreenOn && document.visibilityState === 'visible') {
        this.acquireWakeLock();
      }
    };
    document.addEventListener('visibilitychange', this._visibilityHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.releaseWakeLock();
    document.removeEventListener('visibilitychange', this._visibilityHandler);

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

  applyColorScheme() {
    const mode = this.settings.darkMode;

    if (mode === 'on') {
      this.setAttribute('data-theme', 'dark');
    } else if (mode === 'off') {
      this.setAttribute('data-theme', 'light');
    } else {
      this.removeAttribute('data-theme');
    }

    // Apply named theme (layered on top of dark/light)
    const themeName = this.settings.theme;
    if (themeName && themeName !== 'soft') {
      this.setAttribute('data-theme-name', themeName);
    } else {
      this.removeAttribute('data-theme-name');
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

  async loadData() {
    try {
      this.loading = true;

      const listsResult = await this.api.getLists();
      this.lists = listsResult.lists || [];

      const lastListKey = `slm_last_list_${this._settingsUserId || 'default'}`;
      if (this.settings.openLastUsedList) {
        const lastListId = localStorage.getItem(lastListKey);
        this.activeList = this.lists.find(l => l.id === lastListId) ||
          this.lists.find(l => l.active) ||
          this.lists[0];
      } else {
        this.activeList = this.lists.find(l => l.active) || this.lists[0];
      }

      const categoriesResult = await this.api.getCategories();
      this.categories = categoriesResult.categories;

      if (this.activeList) {
        await this.loadActiveListData();
      }

    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      this.loading = false;
    }
  }

  async loadActiveListData() {
    if (!this.activeList) return;

    const itemsResult = await this.api.getItems(this.activeList.id);
    this.items = itemsResult.items;

    const totalResult = await this.api.getListTotal(this.activeList.id);
    this.total = totalResult;

    const lastListKey = `slm_last_list_${this._settingsUserId || 'default'}`;
    localStorage.setItem(lastListKey, this.activeList.id);
  }

  async handleListChange(e) {
    const listId = e.detail.listId;
    await this.api.setActiveList(listId);
    this.activeList = this.lists.find(l => l.id === listId);
    await this.loadActiveListData();
    this.currentView = 'shopping';
  }

  async handleItemClick(e) {
    console.log("HANDLE ITEM CLICK", e.detail);

    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);

    if (item && !item.checked) {
      this.api.incrementItem(itemId, 1);
      this.loadActiveListData();
    }
  }

  async handleItemDecrease(e) {
    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);

    if (!item) return;

    if (item.quantity > 1) {
      await this.api.incrementItem(itemId, -1);
    } else {
      await this.api.deleteItem(itemId);
    }

    this.loadActiveListData();
  }


  async handleItemCheck(e) {
    const { itemId, checked } = e.detail;
    await this.api.checkItem(itemId, checked);
    // Track checked-off items so they appear in recently-used suggestions
    if (checked) {
      const item = this.items.find(i => i.id === itemId);
      if (item?.product_id) this.trackRecentlyUsed(item.product_id);
    }
    await this.loadActiveListData();
  }

  async handleItemLongPress(e) {
    this.editingItem = e.detail.item;
    this.showEditDialog = true;
  }

  async handleItemSwipeDelete(e) {
    const { itemId } = e.detail;
    await this.api.deleteItem(itemId);
    await this.loadActiveListData();
  }

  async handleAddItem(e) {
    const itemData = { ...e.detail };

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
    await this.loadActiveListData();
    this.showAddDialog = false;
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

    await this.loadActiveListData();
    this.showEditDialog = false;
    this.editingItem = null;
  }

  handleNavChange(e) {
    this.currentView = e.detail.view;
  }

  handleSettingsChange(e) {
    this.settings = { ...this.settings, ...e.detail };
    this.saveSettings();
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
    const { name, category_id, price } = e.detail;
    try {
      const productData = { name, category_id }; // backend forces custom=True
      if (price) productData.price = parseFloat(price);
      const result = await this.api.addProduct(productData);
      const product = result.product || result;
      const itemData = {
        name,
        category_id,
        product_id: product.id,
        quantity: 1,
        unit: 'units'
      };
      if (price) itemData.price = parseFloat(price);
      await this.api.addItem(this.activeList.id, itemData);
      if (product.id) this.trackRecentlyUsed(product.id);
      await this.loadActiveListData();
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('List copied to clipboard!');
    }
  }

  async subscribeToUpdates() {
    if (!this.hass?.connection) return;

    try {
      // Use our custom WebSocket subscription instead of direct HA event subscription
      // This bypasses HA's non-admin restriction on custom events
      const unsubscribe = await this.hass.connection.subscribeMessage(
        (message) => {
          console.log('[SLM] ✅ Received update:', message.event_type);
          this.loadActiveListData();
        },
        { type: 'shopping_list_manager/subscribe' }
      );

      this._unsubscribers = [unsubscribe];
      console.log('[SLM] ✅ Subscribed to shopping list updates');

    } catch (err) {
      console.error('[SLM] ❌ Failed to subscribe:', err);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'shopping':
        return html`
          <slm-list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(i => !i.checked).length}
            .settings=${this.settings}
            @back=${this.handleBackToLists}
            @share=${this.handleShareList}
            @menu-setting-change=${this.handleMenuSettingChange}
          ></slm-list-header>

          <div class="content-area">
            <slm-search-bar
              .api=${this.api}
              .settings=${this.settings}
              .categories=${this.categories}
              .activeListId=${this.activeList?.id}
              @add-item=${this.handleAddItem}
              @create-and-add-product=${this.handleCreateAndAddProduct}
            ></slm-search-bar>

            ${this.settings.viewMode === 'list' ? html`
              <slm-item-list
                .items=${this.items}
                .categories=${this.categories}
                .settings=${this.settings}
                .api=${this.api}
                @add-item=${this.handleAddItem}
                @item-click=${this.handleItemClick}
                @item-decrease=${this.handleItemDecrease}
                @item-check=${this.handleItemCheck}
                @item-long-press=${this.handleItemLongPress}
                @item-swipe-delete=${this.handleItemSwipeDelete}
              ></slm-item-list>
            ` : html`
              <slm-item-grid
                .items=${this.items}
                .categories=${this.categories}
                .settings=${this.settings}
                .api=${this.api}
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
            <div class="total-amount">
              ${this.total.currency} $${this.total.total.toFixed(2)}
            </div>
            <div class="total-count">${this.total.item_count} items</div>
          </div>
        `;

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
            ></slm-loyalty-cards-view>
          </div>
        `;

      case 'settings':
        return html`
          <slm-settings-view
            .hass=${this.hass}
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @settings-changed=${this.handleSettingsChange}
          ></slm-settings-view>
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

    return html`
      <ha-card>
        <div class="card-container">
          ${this.renderCurrentView()}
        </div>

        <slm-bottom-nav
          .currentView=${this.currentView}
          @nav-changed=${this.handleNavChange}
        ></slm-bottom-nav>

        ${this.showEditDialog ? html`
          <slm-edit-item-dialog
            .api=${this.api}
            .item=${this.editingItem}
            .categories=${this.categories}
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
      LIGHT – Soft Pastel Modern
    ================================ */
    :host([data-theme="light"]) {
      --slm-bg-main: #fafbfc;
      --slm-bg-surface: #ffffff;
      --slm-bg-elevated: #ffffff;

      --slm-text-primary: #424242;
      --slm-text-secondary: #757575;
      --slm-text-muted: #9e9e9e;

      --slm-border-subtle: #e8eaf6;

      --slm-accent-primary: #9fa8da;
      --slm-accent-secondary: #a5d6a7;
      --slm-accent-warning: #ffcc80;
      --slm-accent-danger: #ef9a9a;

      --slm-tile-bg: #ffffff;
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(0,0,0,0.08);
      --slm-shadow-medium: 0 4px 12px rgba(0,0,0,0.15);

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
      DARK – Soft Pastel Modern
    ================================ */
    :host([data-theme="dark"]) {
      --slm-bg-main: #14161a;
      --slm-bg-surface: #1b1f25;
      --slm-bg-elevated: #232833;

      --slm-text-primary: #e4e7ec;
      --slm-text-secondary: #a8b0bd;
      --slm-text-muted: #7a8594;

      --slm-border-subtle: #2b313c;

      --slm-accent-primary: #9fa8da;
      --slm-accent-secondary: #81c784;
      --slm-accent-warning: #ffb74d;
      --slm-accent-danger: #ef9a9a;

      --slm-tile-bg: #20242c;
      --slm-tile-checked-opacity: 0.35;

      --slm-shadow-soft: 0 2px 6px rgba(0,0,0,0.1);
      --slm-shadow-medium: 0 6px 18px rgba(0,0,0,0.6);

      --slm-list-gradient-0: linear-gradient(135deg, #5c6bc0, #7986cb);
      --slm-list-gradient-1: linear-gradient(135deg, #43a047, #66bb6a);
      --slm-list-gradient-2: linear-gradient(135deg, #fb8c00, #ffb74d);
      --slm-list-gradient-3: linear-gradient(135deg, #8e24aa, #ab47bc);
      --slm-list-gradient-4: linear-gradient(135deg, #00838f, #26c6da);
      --slm-list-gradient-5: linear-gradient(135deg, #c2185b, #ec407a);
      --slm-total-bar-bg: linear-gradient(90deg, #2a2f3b 0%, #353d4a 100%);

      --slm-cat-produce: #4caf50;
      --slm-cat-dairy: #29b6f6;
      --slm-cat-meat: #ef5350;
      --slm-cat-bakery: #ffa726;
      --slm-cat-pantry: #ff7043;
      --slm-cat-frozen: #26c6da;
      --slm-cat-beverages: #7c4dff;
      --slm-cat-snacks: #d4e157;
      --slm-cat-household: #26a69a;
      --slm-cat-health: #66bb6a;
      --slm-cat-pet: #8d6e63;
      --slm-cat-baby: #ec407a;
      --slm-cat-other: #78909c;
      --slm-cat-recent: #9e9e9e;
    }

    /* ===============================
      DARK – Midnight Ocean
    ================================ */
    :host([data-theme-name="midnight"]) {
      --slm-bg-main: #0d1117;
      --slm-bg-surface: #161b22;
      --slm-bg-elevated: #1c2333;

      --slm-text-primary: #c9d1d9;
      --slm-text-secondary: #8b949e;
      --slm-text-muted: #6e7681;

      --slm-border-subtle: #21262d;

      --slm-accent-primary: #58a6ff;
      --slm-accent-secondary: #3fb950;
      --slm-accent-warning: #d29922;
      --slm-accent-danger: #f85149;

      --slm-tile-bg: #161b22;
      --slm-tile-checked-opacity: 0.3;

      --slm-shadow-soft: 0 2px 8px rgba(0,0,0,0.4);
      --slm-shadow-medium: 0 6px 20px rgba(0,0,0,0.7);

      --slm-list-gradient-0: linear-gradient(135deg, #1f6feb, #58a6ff);
      --slm-list-gradient-1: linear-gradient(135deg, #238636, #3fb950);
      --slm-list-gradient-2: linear-gradient(135deg, #9e6a03, #d29922);
      --slm-list-gradient-3: linear-gradient(135deg, #6e40c9, #a371f7);
      --slm-list-gradient-4: linear-gradient(135deg, #0d7377, #14a8b5);
      --slm-list-gradient-5: linear-gradient(135deg, #b62324, #f85149);
      --slm-total-bar-bg: linear-gradient(90deg, #1f6feb 0%, #58a6ff 100%);

      --slm-cat-produce: #3fb950;
      --slm-cat-dairy: #58a6ff;
      --slm-cat-meat: #f85149;
      --slm-cat-bakery: #d29922;
      --slm-cat-pantry: #e3b341;
      --slm-cat-frozen: #79c0ff;
      --slm-cat-beverages: #a371f7;
      --slm-cat-snacks: #f0d080;
      --slm-cat-household: #39d0d8;
      --slm-cat-health: #56d364;
      --slm-cat-pet: #c9a46e;
      --slm-cat-baby: #ff7b72;
      --slm-cat-other: #8b949e;
      --slm-cat-recent: #6e7681;
    }

    /* ===============================
      DARK – Ember
    ================================ */
    :host([data-theme-name="ember"]) {
      --slm-bg-main: #111111;
      --slm-bg-surface: #1c1a17;
      --slm-bg-elevated: #242018;

      --slm-text-primary: #f5f0e8;
      --slm-text-secondary: #a89880;
      --slm-text-muted: #7a6a55;

      --slm-border-subtle: #2a2520;

      --slm-accent-primary: #f0a500;
      --slm-accent-secondary: #76c442;
      --slm-accent-warning: #ff6b35;
      --slm-accent-danger: #ff4d4d;

      --slm-tile-bg: #1c1a17;
      --slm-tile-checked-opacity: 0.3;

      --slm-shadow-soft: 0 2px 8px rgba(0,0,0,0.5);
      --slm-shadow-medium: 0 6px 20px rgba(0,0,0,0.7);

      --slm-list-gradient-0: linear-gradient(135deg, #c48c15, #f0a500);
      --slm-list-gradient-1: linear-gradient(135deg, #5a9e34, #76c442);
      --slm-list-gradient-2: linear-gradient(135deg, #c84815, #ff6b35);
      --slm-list-gradient-3: linear-gradient(135deg, #8b3a8b, #b05ab0);
      --slm-list-gradient-4: linear-gradient(135deg, #1a5f7a, #2d9ab5);
      --slm-list-gradient-5: linear-gradient(135deg, #c23838, #e05555);
      --slm-total-bar-bg: linear-gradient(90deg, #c48c15 0%, #f0a500 100%);

      --slm-cat-produce: #76c442;
      --slm-cat-dairy: #64b5f6;
      --slm-cat-meat: #ff4d4d;
      --slm-cat-bakery: #f0a500;
      --slm-cat-pantry: #ff6b35;
      --slm-cat-frozen: #64dfdf;
      --slm-cat-beverages: #b05ab0;
      --slm-cat-snacks: #f9c74f;
      --slm-cat-household: #4db6ac;
      --slm-cat-health: #81c784;
      --slm-cat-pet: #a1887f;
      --slm-cat-baby: #f48fb1;
      --slm-cat-other: #8d9e98;
      --slm-cat-recent: #7a6a55;
    }

    /* ===============================
      LIGHT – Arctic
    ================================ */
    :host([data-theme-name="arctic"]) {
      --slm-bg-main: #f0f4f8;
      --slm-bg-surface: #ffffff;
      --slm-bg-elevated: #ffffff;

      --slm-text-primary: #1a2332;
      --slm-text-secondary: #526070;
      --slm-text-muted: #8097aa;

      --slm-border-subtle: #d1dce8;

      --slm-accent-primary: #2979ff;
      --slm-accent-secondary: #00897b;
      --slm-accent-warning: #f57c00;
      --slm-accent-danger: #d32f2f;

      --slm-tile-bg: #ffffff;
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(26,35,50,0.08);
      --slm-shadow-medium: 0 4px 14px rgba(26,35,50,0.14);

      --slm-list-gradient-0: linear-gradient(135deg, #1a56db, #2979ff);
      --slm-list-gradient-1: linear-gradient(135deg, #00695c, #00897b);
      --slm-list-gradient-2: linear-gradient(135deg, #bf360c, #f57c00);
      --slm-list-gradient-3: linear-gradient(135deg, #4527a0, #673ab7);
      --slm-list-gradient-4: linear-gradient(135deg, #006064, #00bcd4);
      --slm-list-gradient-5: linear-gradient(135deg, #880e4f, #e91e63);
      --slm-total-bar-bg: linear-gradient(90deg, #1a56db 0%, #2979ff 100%);

      --slm-cat-produce: #00897b;
      --slm-cat-dairy: #2979ff;
      --slm-cat-meat: #d32f2f;
      --slm-cat-bakery: #f57c00;
      --slm-cat-pantry: #e64a19;
      --slm-cat-frozen: #00bcd4;
      --slm-cat-beverages: #673ab7;
      --slm-cat-snacks: #f9a825;
      --slm-cat-household: #00838f;
      --slm-cat-health: #43a047;
      --slm-cat-pet: #795548;
      --slm-cat-baby: #e91e63;
      --slm-cat-other: #607d8b;
      --slm-cat-recent: #8097aa;
    }

    /* ===============================
      LIGHT – Meadow
    ================================ */
    :host([data-theme-name="meadow"]) {
      --slm-bg-main: #f4f7f0;
      --slm-bg-surface: #fefffe;
      --slm-bg-elevated: #ffffff;

      --slm-text-primary: #2d3a2a;
      --slm-text-secondary: #6b7c64;
      --slm-text-muted: #96a98e;

      --slm-border-subtle: #d4e0cb;

      --slm-accent-primary: #4caf50;
      --slm-accent-secondary: #29b6f6;
      --slm-accent-warning: #ffb300;
      --slm-accent-danger: #e53935;

      --slm-tile-bg: #fefffe;
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(45,58,42,0.08);
      --slm-shadow-medium: 0 4px 14px rgba(45,58,42,0.13);

      --slm-list-gradient-0: linear-gradient(135deg, #2e7d32, #4caf50);
      --slm-list-gradient-1: linear-gradient(135deg, #0277bd, #29b6f6);
      --slm-list-gradient-2: linear-gradient(135deg, #e65100, #ffb300);
      --slm-list-gradient-3: linear-gradient(135deg, #6a1b9a, #9c27b0);
      --slm-list-gradient-4: linear-gradient(135deg, #006064, #26c6da);
      --slm-list-gradient-5: linear-gradient(135deg, #b71c1c, #e53935);
      --slm-total-bar-bg: linear-gradient(90deg, #2e7d32 0%, #4caf50 100%);

      --slm-cat-produce: #4caf50;
      --slm-cat-dairy: #29b6f6;
      --slm-cat-meat: #e53935;
      --slm-cat-bakery: #ffb300;
      --slm-cat-pantry: #fb8c00;
      --slm-cat-frozen: #26c6da;
      --slm-cat-beverages: #9c27b0;
      --slm-cat-snacks: #cddc39;
      --slm-cat-household: #26a69a;
      --slm-cat-health: #66bb6a;
      --slm-cat-pet: #8d6e63;
      --slm-cat-baby: #ec407a;
      --slm-cat-other: #78909c;
      --slm-cat-recent: #96a98e;
    }

    /* ===============================
      LIGHT – Blossom
    ================================ */
    :host([data-theme-name="blossom"]) {
      --slm-bg-main: #fdf8fb;
      --slm-bg-surface: #ffffff;
      --slm-bg-elevated: #fff8fc;

      --slm-text-primary: #3d1f35;
      --slm-text-secondary: #8c5e79;
      --slm-text-muted: #b48fa5;

      --slm-border-subtle: #f0d6e8;

      --slm-accent-primary: #c2668a;
      --slm-accent-secondary: #7cb9a3;
      --slm-accent-warning: #e8a87c;
      --slm-accent-danger: #e57373;

      --slm-tile-bg: #ffffff;
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(61,31,53,0.07);
      --slm-shadow-medium: 0 4px 14px rgba(61,31,53,0.13);

      --slm-list-gradient-0: linear-gradient(135deg, #a03a62, #c2668a);
      --slm-list-gradient-1: linear-gradient(135deg, #4a7a6a, #7cb9a3);
      --slm-list-gradient-2: linear-gradient(135deg, #b06040, #e8a87c);
      --slm-list-gradient-3: linear-gradient(135deg, #7a4090, #b07abd);
      --slm-list-gradient-4: linear-gradient(135deg, #3570a0, #6aacdb);
      --slm-list-gradient-5: linear-gradient(135deg, #a03030, #e57373);
      --slm-total-bar-bg: linear-gradient(90deg, #a03a62 0%, #c2668a 100%);

      --slm-cat-produce: #7cb9a3;
      --slm-cat-dairy: #6aacdb;
      --slm-cat-meat: #e57373;
      --slm-cat-bakery: #e8a87c;
      --slm-cat-pantry: #c2668a;
      --slm-cat-frozen: #80cbc4;
      --slm-cat-beverages: #b07abd;
      --slm-cat-snacks: #f4d03f;
      --slm-cat-household: #7cb9a3;
      --slm-cat-health: #a5d6a7;
      --slm-cat-pet: #bcaaa4;
      --slm-cat-baby: #f48fb1;
      --slm-cat-other: #b0bec5;
      --slm-cat-recent: #b48fa5;
    }

    /* ===============================
      DARK – Neon (Purple & Cyan)
    ================================ */
    :host([data-theme-name="neon"]) {
      --slm-bg-main: #0a0b10;
      --slm-bg-surface: #121420;
      --slm-bg-elevated: #1a1d2e;

      --slm-text-primary: #e0e0f0;
      --slm-text-secondary: #a0a5c0;
      --slm-text-muted: #6a6f8e;

      --slm-border-subtle: #2a2d45;

      --slm-accent-primary: #bb86fc;
      --slm-accent-secondary: #03dac6;
      --slm-accent-warning: #ffb74d;
      --slm-accent-danger: #cf6679;

      --slm-tile-bg: #1a1d2e;
      --slm-tile-checked-opacity: 0.3;

      --slm-shadow-soft: 0 4px 10px rgba(0,0,0,0.4);
      --slm-shadow-medium: 0 8px 25px rgba(0,0,0,0.7);

      --slm-list-gradient-0: linear-gradient(135deg, #6200ee, #bb86fc);
      --slm-list-gradient-1: linear-gradient(135deg, #018786, #03dac6);
      --slm-list-gradient-2: linear-gradient(135deg, #f57c00, #ffb74d);
      --slm-list-gradient-3: linear-gradient(135deg, #7b1fa2, #ab47bc);
      --slm-list-gradient-4: linear-gradient(135deg, #00796b, #009688);
      --slm-list-gradient-5: linear-gradient(135deg, #c2185b, #ec407a);
      --slm-total-bar-bg: linear-gradient(90deg, #6200ee 0%, #bb86fc 100%);

      --slm-cat-produce: #03dac6;
      --slm-cat-dairy: #bb86fc;
      --slm-cat-meat: #cf6679;
      --slm-cat-bakery: #ffb300;
      --slm-cat-pantry: #ff7043;
      --slm-cat-frozen: #03dac6;
      --slm-cat-beverages: #bb86fc;
      --slm-cat-snacks: #c6ff00;
      --slm-cat-household: #00bcd4;
      --slm-cat-health: #69f0ae;
      --slm-cat-pet: #ff80ab;
      --slm-cat-baby: #f48fb1;
      --slm-cat-other: #6a6f8e;
      --slm-cat-recent: #a0a5c0;
    }

    /* ===============================
      LIGHT – Ocean (Ocean Blue)
    ================================ */
    :host([data-theme-name="ocean"]) {
      --slm-bg-main: #f0f7ff;
      --slm-bg-surface: #ffffff;
      --slm-bg-elevated: #f9fbff;

      --slm-text-primary: #1a3a5f;
      --slm-text-secondary: #4a6b8c;
      --slm-text-muted: #7a9bbd;

      --slm-border-subtle: #d0e1f2;

      --slm-accent-primary: #0077ff;
      --slm-accent-secondary: #4c51bf;
      --slm-accent-warning: #f6ad55;
      --slm-accent-danger: #e53e3e;

      --slm-tile-bg: #ffffff;
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 8px rgba(26,58,95,0.08);
      --slm-shadow-medium: 0 6px 18px rgba(26,58,95,0.15);

      --slm-list-gradient-0: linear-gradient(135deg, #0077ff, #3182ce);
      --slm-list-gradient-1: linear-gradient(135deg, #2c5282, #4c51bf);
      --slm-list-gradient-2: linear-gradient(135deg, #c05621, #f6ad55);
      --slm-list-gradient-3: linear-gradient(135deg, #6b46c1, #9f7aea);
      --slm-list-gradient-4: linear-gradient(135deg, #2c7a7b, #38b2ac);
      --slm-list-gradient-5: linear-gradient(135deg, #9b2c2c, #e53e3e);
      --slm-total-bar-bg: linear-gradient(90deg, #0077ff 0%, #4c51bf 100%);

      --slm-cat-produce: #38b2ac;
      --slm-cat-dairy: #63b3ed;
      --slm-cat-meat: #e53e3e;
      --slm-cat-bakery: #f6ad55;
      --slm-cat-pantry: #ed8936;
      --slm-cat-frozen: #63b3ed;
      --slm-cat-beverages: #667eea;
      --slm-cat-snacks: #ecc94b;
      --slm-cat-household: #38b2ac;
      --slm-cat-health: #48bb78;
      --slm-cat-pet: #a0785a;
      --slm-cat-baby: #ed64a6;
      --slm-cat-other: #7a9bbd;
      --slm-cat-recent: #4a6b8c;
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