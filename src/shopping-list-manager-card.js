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
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = this.settings.darkMode === 'on' || 
                    (this.settings.darkMode === 'system' && prefersDark);
    
    document.documentElement.setAttribute('data-theme', useDark ? 'dark' : 'light');
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
      bottom: 60px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      margin: 0 4px 4px 4px;
      background: linear-gradient(90deg, #b0a8da 0%, #d4d0e8 100%);
      color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
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

    /* Pastel Light Theme */
    :host {
      --primary-pastel: #9fa8da;
      --primary-light: #c5cae9;
      --secondary-pastel: #a5d6a7;
      --accent-pastel: #ffcc80;
      --surface-pastel: #fafbfc;
      --text-primary: #424242;
      --text-secondary: #757575;
      --border-color: #e8eaf6;
    }

    /* Dark Theme */
    :host([data-theme="dark"]) {
      --primary-pastel: #7986cb;
      --primary-light: #9499d4;
      --secondary-pastel: #81c784;
      --accent-pastel: #ffb74d;
      --surface-pastel: #1e1e1e;
      --text-primary: #e0e0e0;
      --text-secondary: #b0b0b0;
      --border-color: #2d2d2d;
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