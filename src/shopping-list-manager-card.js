import { LitElement, html, css } from 'lit';
import { ShoppingListAPI } from './services/api.js';
import './components/slm-bottom-nav.js';
import './components/slm-list-header.js';
import './components/slm-search-bar.js';
import './components/slm-item-grid.js';
import './components/slm-add-item-dialog.js';
import './components/slm-edit-item-dialog.js';
import './components/list-management/slm-lists-view.js';
import './components/list-management/slm-loyalty-cards-view.js';
import './settings/slm-settings-view.js';

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
    settings: { type: Object },
    cardId: { type: String }
  };

  constructor() {
    super();
    this.currentView = 'shopping';
    this.lists = [];
    this.activeList = null;
    this.items = [];
    this.categories = [];
    this.total = { total: 0, currency: 'NZD', item_count: 0 };
    this.loading = true;
    this.showAddDialog = false;
    this.showEditDialog = false;
    this.editingItem = null;
    this.cardId = this.generateCardId();
    this.settings = this.loadSettings();
  }

  generateCardId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return `card_${timestamp}_${random}`;
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
      colorScheme: 'pastel'
    };

    const cardKey = `slm_settings_${this.cardId}`;
    const cardSettings = localStorage.getItem(cardKey);
    
    if (cardSettings) {
      return { ...defaults, ...JSON.parse(cardSettings) };
    }
    return defaults;
  }

  saveSettings() {
    const cardKey = `slm_settings_${this.cardId}`;
    localStorage.setItem(cardKey, JSON.stringify(this.settings));
  }

  async firstUpdated() {
    this.api = new ShoppingListAPI(this.hass);
    await this.loadData();
    this.subscribeToUpdates();
    this.applyColorScheme();
  }

  applyColorScheme() {
    const mode = this.settings.darkMode;

    if (mode === 'on') {
      // Force SLM Dark
      this.setAttribute('data-theme', 'dark');
    } 
    else if (mode === 'off') {
      // Force SLM Light
      this.setAttribute('data-theme', 'light');
    } 
    else {
      // System = Follow Home Assistant Theme
      this.removeAttribute('data-theme');
    }
  }



  async loadData() {
    try {
      this.loading = true;

      const listsResult = await this.api.getLists();
      this.lists = listsResult.lists || [];
      
      const lastListKey = `slm_last_list_${this.cardId}`;
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

    const lastListKey = `slm_last_list_${this.cardId}`;
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
    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);
    if (item && !item.checked) {
      await this.api.updateItem(itemId, { quantity: item.quantity + 1 });
      await this.loadActiveListData();
    }
  }

  async handleItemDecrease(e) {
    const { itemId } = e.detail;
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        await this.api.updateItem(itemId, { quantity: item.quantity - 1 });
      } else {
        await this.api.deleteItem(itemId);
      }
      await this.loadActiveListData();
    }
  }

  async handleItemCheck(e) {
    const { itemId, checked } = e.detail;
    await this.api.checkItem(itemId, checked);
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
    const itemData = e.detail;
    
    // Check if item already exists
    const existingItem = this.items.find(i => 
      i.product_id === itemData.product_id && !i.checked
    );

    if (existingItem) {
      // Increase quantity instead of adding duplicate
      await this.api.updateItem(existingItem.id, { 
        quantity: existingItem.quantity + 1
      });
    } else {
      await this.api.addItem(this.activeList.id, itemData);
    }
    
    // Track recently used
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

  async handleEditItem(e) {
    const { itemId, data } = e.detail;
    await this.api.updateItem(itemId, data);
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
    this.requestUpdate();
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

  subscribeToUpdates() {
    const events = [
      'shopping_list_manager_item_added',
      'shopping_list_manager_item_updated',
      'shopping_list_manager_item_checked',
      'shopping_list_manager_item_deleted'
    ];

    events.forEach(event => {
      this.hass.connection.subscribeEvents(() => {
        this.loadActiveListData();
      }, event);
    });
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'shopping':
        return html`
          <slm-list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(i => !i.checked).length}
            @back=${this.handleBackToLists}
            @share=${this.handleShareList}
          ></slm-list-header>

          <div class="content-area">
            <slm-search-bar
              .api=${this.api}
              .settings=${this.settings}
              .categories=${this.categories}
              .activeListId=${this.activeList?.id}
              @add-item=${this.handleAddItem}
            ></slm-search-bar>

            <slm-item-grid
              .items=${this.items}
              .categories=${this.categories}
              .settings=${this.settings}
              .api=${this.api}
              @item-click=${this.handleItemClick}
              @item-decrease=${this.handleItemDecrease}
              @item-check=${this.handleItemCheck}
              @item-long-press=${this.handleItemLongPress}
              @item-swipe-delete=${this.handleItemSwipeDelete}
            ></slm-item-grid>
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
  }

  getCardSize() {
    return 12;
  }
}

customElements.define('shopping-list-manager-card', ShoppingListManagerCard);