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
    showResults: { type: Boolean }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.searchResults = [];
    this.recentProducts = [];
    this.showResults = false;
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
  }

  render() {
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
            <button class="clear-btn" @click=${() => { this.searchQuery = ''; this.showResults = false; }}>
              ✖
            </button>
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
                    <div class="no-image">📦</div>
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
            ` : html`
              <button class="result-item add-custom" @click=${this.handleAddCustom}>
                <div class="no-image">📝</div>
                <div class="result-info">
                  <div class="result-name">Add "${this.searchQuery}"</div>
                  <div class="result-subtitle">as custom product</div>
                </div>
                <span class="add-icon">➕</span>
              </button>
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
      box-shadow: 0 4px 16px rgba(--slm-shadow-soft);
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
  `;
}

customElements.define('slm-search-bar', SLMSearchBar);