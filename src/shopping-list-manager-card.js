import { LitElement, html, css } from 'lit';
import { ShoppingListAPI } from './services/api.js';
import './components/bottom-nav.js';
import './components/list-header.js';
import './components/search-bar.js';
import './components/item-grid.js';
import './components/floating-add-button.js';
import './components/add-item-dialog.js';
import './components/edit-item-dialog.js';
import './components/list-management/lists-view.js';
import './components/list-management/loyalty-cards-view.js';
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
    settings: { type: Object }
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
    this.settings = this.loadSettings();
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
      recentProductsCount: 10
    };
    const saved = localStorage.getItem('shopping_list_settings');
    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
  }

  saveSettings() {
    localStorage.setItem('shopping_list_settings', JSON.stringify(this.settings));
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
      
      if (this.settings.openLastUsedList) {
        const lastListId = localStorage.getItem('last_used_list');
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

    localStorage.setItem('last_used_list', this.activeList.id);
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
    if (item) {
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
    await this.api.addItem(this.activeList.id, itemData);
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
            @add-item=${this.handleAddItem}
          ></search-bar>

          <item-grid
            .items=${this.items}
            .categories=${this.categories}
            @item-click=${this.handleItemClick}
            @item-decrease=${this.handleItemDecrease}
            @item-check=${this.handleItemCheck}
            @item-long-press=${this.handleItemLongPress}
            @item-swipe-delete=${this.handleItemSwipeDelete}
          ></item-grid>

          <div class="footer">
            <div class="total">
              ${this.total.currency} $${this.total.total.toFixed(2)}
              <span class="count">(${this.total.item_count} items)</span>
            </div>
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
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
    }
    .card-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 80px;
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
    .footer {
      position: sticky;
      bottom: 60px;
      left: 0;
      right: 0;
      padding: 16px;
      background: var(--card-background-color);
      border-top: 1px solid var(--divider-color);
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
    }
    .total {
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }
    .count {
      font-size: 14px;
      color: var(--secondary-text-color);
      font-weight: 400;
      margin-left: 8px;
    }
  `;

  setConfig(config) {
    this.config = config;
  }

  getCardSize() {
    return 10;
  }
}

customElements.define('shopping-list-manager-card', ShoppingListManagerCard);