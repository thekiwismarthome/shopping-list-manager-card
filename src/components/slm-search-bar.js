import { LitElement, html, css } from 'lit';

class SLMSearchBar extends LitElement {
  static properties = {
    api: { type: Object },
    settings: { type: Object },
    categories: { type: Array },
    activeListId: { type: String },
    searchQuery: { type: String },
    searchResults: { type: Array },
    recentProducts: { type: Array },
    showResults: { type: Boolean },
    _showCreateForm: { type: Boolean, state: true },
    _createName: { type: String, state: true },
    _createCategory: { type: String, state: true },
    _createPrice: { type: String, state: true }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.searchResults = [];
    this.recentProducts = [];
    this.showResults = false;
    this._showCreateForm = false;
    this._createName = '';
    this._createCategory = 'other';
    this._createPrice = '';
  }

  async firstUpdated() {
    await this.loadRecentProducts();
  }

  async loadRecentProducts() {
    const recentKey = 'slm_recent_products';
    const saved = localStorage.getItem(recentKey);
    const recentIds = saved ? JSON.parse(saved) : [];
    const limit = this.settings?.recentProductsCount || 8;
    this.recentProducts = recentIds.slice(0, limit);
  }

  async handleSearch(e) {
    this.searchQuery = e.target.value;
    this._showCreateForm = false;

    if (this.searchQuery.length < 1) {
      this.showResults = false;
      return;
    }

    if (this.searchQuery.length >= 2) {
      const result = await this.api.searchProducts(this.searchQuery, { limit: 20 });
      this.searchResults = result.products || [];
    } else {
      this.searchResults = [];
    }

    this.showResults = true;
  }

  handleProductSelect(product) {
    this.dispatchEvent(new CustomEvent('add-item', {
      detail: {
        name: product.name,
        category_id: product.category_id,
        product_id: product.id,
        quantity: 1,
        unit: product.default_unit,
        price: product.price,
        image_url: product.image_url
      },
      bubbles: true,
      composed: true
    }));

    this.searchQuery = '';
    this.showResults = false;
    this._showCreateForm = false;
    this.shadowRoot.querySelector('input').blur();
  }

  handleAddCustom() {
    if (!this.searchQuery.trim()) return;

    this.dispatchEvent(new CustomEvent('add-item', {
      detail: {
        name: this.searchQuery.trim(),
        category_id: 'other',
        quantity: 1,
        unit: 'units'
      },
      bubbles: true,
      composed: true
    }));

    this.searchQuery = '';
    this.showResults = false;
    this._showCreateForm = false;
  }

  handleShowCreateForm() {
    this._createName = this.searchQuery.trim();
    this._createCategory = 'other';
    this._createPrice = '';
    this._showCreateForm = true;
  }

  handleCancelCreate() {
    this._showCreateForm = false;
  }

  handleCreateAndAdd() {
    if (!this._createName.trim()) return;
    this.dispatchEvent(new CustomEvent('create-and-add-product', {
      detail: {
        name: this._createName.trim(),
        category_id: this._createCategory,
        price: this._createPrice ? parseFloat(this._createPrice) : null
      },
      bubbles: true,
      composed: true
    }));
    this.searchQuery = '';
    this.showResults = false;
    this._showCreateForm = false;
    this.shadowRoot.querySelector('input').blur();
  }

  getCategoryEmoji(categoryId) {
    const emojiMap = {
      'produce': '🥬', 'dairy': '🥛', 'meat': '🥩', 'bakery': '🍞',
      'pantry': '🥫', 'frozen': '🧊', 'beverages': '🥤', 'snacks': '🍿',
      'household': '🧹', 'health': '💊', 'pet': '🐾', 'baby': '👶', 'other': '📦'
    };
    return emojiMap[categoryId] || '📦';
  }

  render() {
    const cats = this.categories || [];

    return html`
      <div class="search-container">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search or add products..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
            @focus=${() => this.showResults = this.searchQuery.length > 0}
          />
          ${this.searchQuery ? html`
            <button class="clear-btn" @click=${() => {
              this.searchQuery = '';
              this.showResults = false;
              this._showCreateForm = false;
            }}>✖</button>
          ` : ''}
        </div>

        ${this.showResults ? html`
          <div class="results-dropdown">
            ${this.searchResults.length > 0 ? html`
              ${this.searchResults.map(product => html`
                <button class="result-item" @click=${() => this.handleProductSelect(product)}>
                  ${product.image_url ? html`
                    <img src="${product.image_url}" alt="${product.name}">
                  ` : html`
                    <div class="no-image">${this.getCategoryEmoji(product.category_id)}</div>
                  `}
                  <div class="result-info">
                    <div class="result-name">${product.name}</div>
                    ${product.price ? html`
                      <div class="result-price">$${product.price.toFixed(2)}</div>
                    ` : ''}
                  </div>
                  <span class="add-icon">➕</span>
                </button>
              `)}
              <button class="result-item add-custom" @click=${this.handleAddCustom}>
                <div class="no-image">📝</div>
                <div class="result-info">
                  <div class="result-name">Add "${this.searchQuery}" to list</div>
                  <div class="result-subtitle">quick add, no catalog entry</div>
                </div>
                <span class="add-icon">➕</span>
              </button>
            ` : html`
              ${this._showCreateForm ? html`
                <div class="create-form">
                  <div class="create-form-title">Create new product</div>
                  <input
                    class="create-input"
                    type="text"
                    placeholder="Product name"
                    .value=${this._createName}
                    @input=${(e) => this._createName = e.target.value}
                  />
                  <select
                    class="create-select"
                    .value=${this._createCategory}
                    @change=${(e) => this._createCategory = e.target.value}
                  >
                    ${cats.map(cat => html`
                      <option value="${cat.id}" ?selected=${cat.id === this._createCategory}>
                        ${this.getCategoryEmoji(cat.id)} ${cat.name}
                      </option>
                    `)}
                  </select>
                  <input
                    class="create-input"
                    type="text"
                    inputmode="decimal"
                    placeholder="Price (optional)"
                    .value=${this._createPrice}
                    @input=${(e) => this._createPrice = e.target.value}
                  />
                  <div class="create-actions">
                    <button class="create-btn secondary" @click=${this.handleCancelCreate}>Cancel</button>
                    <button class="create-btn primary" @click=${this.handleCreateAndAdd}>Create & Add</button>
                  </div>
                </div>
              ` : html`
                <button class="result-item add-custom" @click=${this.handleAddCustom}>
                  <div class="no-image">📝</div>
                  <div class="result-info">
                    <div class="result-name">Add "${this.searchQuery}" to list</div>
                    <div class="result-subtitle">quick add, no catalog entry</div>
                  </div>
                  <span class="add-icon">➕</span>
                </button>
                <button class="result-item create-product" @click=${this.handleShowCreateForm}>
                  <div class="no-image">🆕</div>
                  <div class="result-info">
                    <div class="result-name">Create product "${this.searchQuery}"</div>
                    <div class="result-subtitle">add to catalog with category &amp; price</div>
                  </div>
                  <span class="add-icon">➕</span>
                </button>
              `}
            `}
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .search-container {
      padding: 8px;
      position: relative;
      background: var(--card-background-color);
      z-index: 50;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--primary-background-color);
      border-radius: 12px;
      border: 1px solid var(--divider-color);
    }
    .search-icon {
      font-size: 16px;
      opacity: 0.6;
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 15px;
      color: var(--primary-text-color);
    }
    input::placeholder {
      color: var(--secondary-text-color);
    }
    .clear-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.5;
      -webkit-tap-highlight-color: transparent;
    }
    .results-dropdown {
      position: absolute;
      top: calc(100% - 4px);
      left: 8px;
      right: 8px;
      background: var(--card-background-color);
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      max-height: 400px;
      overflow-y: auto;
      z-index: 100;
      border: 1px solid var(--divider-color);
      border-top: none;
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      width: 100%;
      border: none;
      background: transparent;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .result-item:last-child {
      border-bottom: none;
    }
    .result-item:active {
      background: var(--secondary-background-color);
    }
    .result-item img,
    .no-image {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--secondary-background-color);
      font-size: 20px;
    }
    .result-info {
      flex: 1;
    }
    .result-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--primary-text-color);
      margin-bottom: 2px;
    }
    .result-price {
      font-size: 13px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .result-subtitle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .add-icon {
      font-size: 20px;
      color: var(--primary-color);
    }
    .add-custom {
      background: rgba(0,0,0,0.02);
    }
    .create-product {
      background: rgba(0,0,0,0.02);
    }

    /* Inline create form */
    .create-form {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .create-form-title {
      font-weight: 700;
      font-size: 13px;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .create-input,
    .create-select {
      box-sizing: border-box;
      width: 100%;
      padding: 9px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: var(--primary-text-color);
      background: var(--primary-background-color);
      outline: none;
    }
    .create-input:focus,
    .create-select:focus {
      border-color: var(--primary-color);
    }
    .create-actions {
      display: flex;
      gap: 8px;
    }
    .create-btn {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }
    .create-btn.primary {
      background: var(--primary-color);
      color: white;
    }
    .create-btn.secondary {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
  `;
}

customElements.define('slm-search-bar', SLMSearchBar);
