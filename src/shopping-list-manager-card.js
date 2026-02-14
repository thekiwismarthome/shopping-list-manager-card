import { LitElement, html, css } from 'lit';
import { ShoppingListAPI } from './services/api.js';
import './components/list-selector.js';
import './components/search-bar.js';
import './components/item-grid.js';

class ShoppingListManagerCard extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    lists: { type: Array },
    activeList: { type: Object },
    items: { type: Array },
    categories: { type: Array },
    total: { type: Object },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.lists = [];
    this.activeList = null;
    this.items = [];
    this.categories = [];
    this.total = { total: 0, currency: 'NZD', item_count: 0 };
    this.loading = true;
  }

  async firstUpdated() {
    this.api = new ShoppingListAPI(this.hass);
    await this.loadData();
  }

  async loadData() {
    try {
      this.loading = true;

      const listsResult = await this.api.getLists();
      this.lists = listsResult.lists;
      this.activeList = this.lists.find(l => l.active) || this.lists[0];

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
  }

  async handleListChange(e) {
    const listId = e.detail.listId;
    await this.api.setActiveList(listId);
    this.activeList = this.lists.find(l => l.id === listId);
    await this.loadActiveListData();
  }

  async handleItemCheck(e) {
    const { itemId, checked } = e.detail;
    await this.api.checkItem(itemId, checked);
    await this.loadActiveListData();
  }

  async handleItemDelete(e) {
    const { itemId } = e.detail;
    await this.api.deleteItem(itemId);
    await this.loadActiveListData();
  }

  async handleAddItem(e) {
    const itemData = e.detail;
    await this.api.addItem(this.activeList.id, itemData);
    await this.loadActiveListData();
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading...</div>`;
    }

    return html`
      <ha-card>
        <list-selector
          .lists=${this.lists}
          .activeList=${this.activeList}
          @list-changed=${this.handleListChange}
        ></list-selector>

        <search-bar
          .api=${this.api}
          .activeListId=${this.activeList?.id}
          @add-item=${this.handleAddItem}
        ></search-bar>

        <item-grid
          .items=${this.items}
          .categories=${this.categories}
          @item-check=${this.handleItemCheck}
          @item-delete=${this.handleItemDelete}
        ></item-grid>

        <div class="footer">
          <div class="total">
            ${this.total.currency} $${this.total.total.toFixed(2)}
            <span>(${this.total.item_count} items)</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 0;
    }
    .loading {
      padding: 32px;
      text-align: center;
    }
    .footer {
      padding: 16px;
      border-top: 1px solid var(--divider-color);
    }
    .total {
      font-size: 18px;
      font-weight: 500;
    }
  `;

  setConfig(config) {
    this.config = config;
  }

  getCardSize() {
    return 6;
  }
}

customElements.define('shopping-list-manager-card', ShoppingListManagerCard);
