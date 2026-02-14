import { LitElement, html, css } from 'lit';

class SearchBar extends LitElement {
  static properties = {
    api: { type: Object },
    settings: { type: Object },
    searchQuery: { type: String },
    searchResults: { type: Array },
    suggestions: { type: Array },
    showResults: { type: Boolean },
    showSuggestions: { type: Boolean }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.searchResults = [];
    this.suggestions = [];
    this.showResults = false;
    this.showSuggestions = false;
  }

  async firstUpdated() {
    await this.loadSuggestions();
  }

  async loadSuggestions() {
    const limit = this.settings?.recentProductsCount || 10;
    const result = await this.api.getProductSuggestions(limit);
    this.suggestions = result.products;
  }

  async handleSearch(e) {
    this.searchQuery = e.target.value;

    if (this.searchQuery.length < 2) {
      this.showResults = false;
      this.showSuggestions = false;
      return;
    }

    const result = await this.api.searchProducts(this.searchQuery, { limit: 20 });
    this.searchResults = result.products;
    this.showResults = true;
    this.showSuggestions = false;
  }

  handleFocus() {
    if (!this.searchQuery) {
      this.showSuggestions = true;
    }
  }

  handleProductSelect(product) {
    this.dispatchEvent(new CustomEvent('add-item', {
      detail: {
        name: product.name,
        category_id: product.category_id,
        product_id: product.id,
        quantity: product.default_quantity,
        unit: product.default_unit,
        price: product.price,
        image_url: product.image_url
      },
      bubbles: true,
      composed: true
    }));

    this.searchQuery = '';
    this.showResults = false;
    this.showSuggestions = false;
  }

  render() {
    return html`
      <div class="search-container">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            placeholder="Search products..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
            @focus=${this.handleFocus}
            @blur=${() => setTimeout(() => { this.showSuggestions = false; this.showResults = false; }, 200)}
          />
          ${this.searchQuery ? html`
            <button class="clear-btn" @click=${() => { this.searchQuery = ''; this.showResults = false; }}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          ` : ''}
        </div>

        ${this.showSuggestions && this.suggestions.length > 0 ? html`
          <div class="suggestions">
            <div class="suggestions-header">Frequently Used</div>
            ${this.suggestions.map(product => html`
              <div class="suggestion-item" @click=${() => this.handleProductSelect(product)}>
                ${product.image_url ? html`
                  <img src="${product.image_url}" alt="${product.name}">
                ` : html`
                  <div class="no-image">
                    <ha-icon icon="mdi:food-variant"></ha-icon>
                  </div>
                `}
                <div class="suggestion-info">
                  <div class="suggestion-name">${product.name}</div>
                  ${product.price ? html`
                    <div class="suggestion-price">$${product.price.toFixed(2)}</div>
                  ` : ''}
                </div>
                <ha-icon icon="mdi:plus-circle"></ha-icon>
              </div>
            `)}
          </div>
        ` : ''}

        ${this.showResults ? html`
          <div class="search-results">
            ${this.searchResults.length > 0 ? html`
              ${this.searchResults.map(product => html`
                <div class="result-item" @click=${() => this.handleProductSelect(product)}>
                  ${product.image_url ? html`
                    <img src="${product.image_url}" alt="${product.name}">
                  ` : html`
                    <div class="no-image">
                      <ha-icon icon="mdi:food-variant"></ha-icon>
                    </div>
                  `}
                  <div class="result-info">
                    <div class="result-name">${product.name}</div>
                    ${product.price ? html`
                      <div class="result-price">$${product.price.toFixed(2)}</div>
                    ` : ''}
                  </div>
                  <ha-icon icon="mdi:plus-circle"></ha-icon>
                </div>
              `)}
            ` : html`
              <div class="no-results">
                <ha-icon icon="mdi:magnify-close"></ha-icon>
                <p>No products found</p>
              </div>
            `}
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .search-container {
      padding: 16px;
      position: relative;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--primary-background-color);
      border-radius: 24px;
      border: 2px solid var(--divider-color);
      transition: border-color 0.2s;
    }
    .search-box:focus-within {
      border-color: var(--primary-color);
    }
    .search-box ha-icon {
      color: var(--secondary-text-color);
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px;
      color: var(--primary-text-color);
    }
    .clear-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .suggestions,
    .search-results {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      background: var(--card-background-color);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 400px;
      overflow-y: auto;
      z-index: 10;
      margin-top: 8px;
    }
    .suggestions-header {
      padding: 12px 16px;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .suggestion-item,
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      transition: background 0.2s;
    }
    .suggestion-item:hover,
    .result-item:hover {
      background: var(--primary-color);
      color: white;
    }
    .suggestion-item img,
    .result-item img,
    .no-image {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .suggestion-info,
    .result-info {
      flex: 1;
    }
    .suggestion-name,
    .result-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .suggestion-price,
    .result-price {
      font-size: 13px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .no-results {
      text-align: center;
      padding: 48px 24px;
      color: var(--secondary-text-color);
    }
    .no-results ha-icon {
      font-size: 48px;
      opacity: 0.3;
    }
  `;
}

customElements.define('search-bar', SearchBar);