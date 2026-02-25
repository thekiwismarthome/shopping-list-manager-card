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
      await this.api.incrementItem(itemId, 1);
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

    // Decrement instance counter so position slots are correctly reclaimed
    if (this._baseCardId) {
      const count = _slmInstanceCounters.get(this._baseCardId) ?? 1;
      _slmInstanceCounters.set(this._baseCardId, Math.max(0, count - 1));
    }

    // Clean up event subscriptions when card is removed
    if (this._unsubscribers) {
      console.log('[SLM] Cleaning up event subscriptions');
      this._unsubscribers.forEach(unsub => {
        try {
          unsub();
        } catch (err) {
          console.error('[SLM] Error unsubscribing:', err);
        }
      });
      this._unsubscribers = [];
    }
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
            @list-selected=${this.handleListChange}
            @lists-updated=${() => this.loadData()}
          ></slm-lists-view>
        `;

      case 'loyalty':
        return html`
          <slm-loyalty-cards-view
            .api=${this.api}
            .userId=${this._hass?.user?.id || null}
          ></slm-loyalty-cards-view>
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
      background: var(--card-background-color);
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
      background: linear-gradient(90deg, #b0a8da 0%, #d4d0e8 100%);
      color: var(--slm-bg-surface);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(--slm-shadow-soft);
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