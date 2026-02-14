import { LitElement, html, css } from 'lit';
import { ShoppingListAPI } from './services/api.js';
import './components/bottom-nav.js';
import './components/list-header.js';
import './components/search-bar.js';
import './components/item-grid.js';
import './components/floating-add-button.js';
import './components/add-item-dialog.js';
import './components/edit-item-dialog.js';
import './components/list-management/slm-lists-view.js';
import './components/list-management/slm-loyalty-cards-view.js';
import './settings/settings-view.js';

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
      theme: 'system',
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
      useEmojis: true
    };

    const globalKey = 'shopping_list_settings';
    const cardKey = `shopping_list_settings_${this.cardId}`;
    
    const globalSettings = localStorage.getItem(globalKey);
    const cardSettings = localStorage.getItem(cardKey);
    
    if (cardSettings) {
      return { ...defaults, ...JSON.parse(cardSettings) };
    } else if (globalSettings) {
      return { ...defaults, ...JSON.parse(globalSettings) };
    }
    return defaults;
  }

  saveSettings() {
    const cardKey = `shopping_list_settings_${this.cardId}`;
    localStorage.setItem(cardKey, JSON.stringify(this.settings));
  }

  async firstUpdated() {
    this.api = new ShoppingListAPI(this.hass);
    await this.loadData();
    this.subscribeToUpdates();
  }

  async loadData() {
    try {
      this.loading = true;

      const listsResult = await this.api.getLists();
      this.lists = listsResult.lists;
      
      const lastListKey = `last_used_list_${this.cardId}`;
      if (this.settings.openLastUsedList) {
        const lastListId = localStorage.getItem(lastListKey);
        this.activeList = this.lists.find(l => l.id === lastListId) || this.lists.find(l => l.active) || this.lists[0];
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
    const itemsResult = await this.api.getItems(this.activeList.id);
    this.items = itemsResult.items;

    const totalResult = await this.api.getListTotal(this.activeList.id);
    this.total = totalResult;

    const lastListKey = `last_used_list_${this.cardId}`;
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

  handleAddButtonClick() {
    this.showAddDialog = true;
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
        quantity: existingItem.quantity + itemData.quantity 
      });
    } else {
      await this.api.addItem(this.activeList.id, itemData);
    }
    
    await this.loadActiveListData();
    this.showAddDialog = false;
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
    this.requestUpdate();
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
          <list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(i => !i.checked).length}
          ></list-header>

          <search-bar
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @add-item=${this.handleAddItem}
          ></search-bar>

          <item-grid
            .items=${this.items}
            .categories=${this.categories}
            .settings=${this.settings}
            @item-click=${this.handleItemClick}
            @item-decrease=${this.handleItemDecrease}
            @item-check=${this.handleItemCheck}
            @item-long-press=${this.handleItemLongPress}
            @item-swipe-delete=${this.handleItemSwipeDelete}
          ></item-grid>

          <div class="total-bar">
            <div class="total-amount">
              ${this.total.currency} $${this.total.total.toFixed(2)}
            </div>
            <div class="total-count">${this.total.item_count} items</div>
          </div>

          <floating-add-button
            @click=${this.handleAddButtonClick}
          ></floating-add-button>
        `;

      case 'lists':
        return html`
          <lists-view
            .api=${this.api}
            .lists=${this.lists}
            .activeList=${this.activeList}
            .items=${this.items}
            .total=${this.total}
            @list-selected=${this.handleListChange}
          ></lists-view>
        `;

      case 'loyalty':
        return html`
          <loyalty-cards-view
            .api=${this.api}
          ></loyalty-cards-view>
        `;

      case 'settings':
        return html`
          <settings-view
            .hass=${this.hass}
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @settings-changed=${this.handleSettingsChange}
          ></settings-view>
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
            <ha-circular-progress active></ha-circular-progress>
            <p>Loading...</p>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="card-content">
          ${this.renderCurrentView()}
        </div>

        <bottom-nav
          .currentView=${this.currentView}
          @nav-changed=${this.handleNavChange}
        ></bottom-nav>

        ${this.showAddDialog ? html`
          <add-item-dialog
            .api=${this.api}
            .categories=${this.categories}
            .settings=${this.settings}
            @add-item=${this.handleAddItem}
            @close=${() => this.showAddDialog = false}
          ></add-item-dialog>
        ` : ''}

        ${this.showEditDialog ? html`
          <edit-item-dialog
            .api=${this.api}
            .item=${this.editingItem}
            .categories=${this.categories}
            @save-item=${this.handleEditItem}
            @delete-item=${this.handleItemSwipeDelete}
            @close=${() => { this.showEditDialog = false; this.editingItem = null; }}
          ></edit-item-dialog>
        ` : ''}
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100vh;
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
      position: relative;
    }
    .card-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 140px;
      position: relative;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 32px;
      gap: 16px;
      color: var(--secondary-text-color);
    }
    .total-bar {
      position: sticky;
      bottom: 60px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
      z-index: 90;
    }
    .total-amount {
      font-size: 22px;
      font-weight: 700;
    }
    .total-count {
      font-size: 14px;
      opacity: 0.9;
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