import { LitElement, html, css } from 'lit';

class SearchBar extends LitElement {
  static properties = {
    api: { type: Object },
    activeListId: { type: String },
    searchQuery: { type: String },
    searchResults: { type: Array },
    showResults: { type: Boolean }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
  }

  async handleSearch(e) {
    this.searchQuery = e.target.value;

    if (this.searchQuery.length < 2) {
      this.showResults = false;
      return;
    }

    const result = await this.api.searchProducts(this.searchQuery, { limit: 10 });
    this.searchResults = result.products;
    this.showResults = true;
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
          />
        </div>

        ${this.showResults ? html`
          <div class="search-results">
            ${this.searchResults.map(product => html`
              <div class="result-item" @click=${() => this.handleProductSelect(product)}>
                <div class="result-name">${product.name}</div>
                <ha-icon icon="mdi:plus"></ha-icon>
              </div>
            `)}
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
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px;
      color: var(--primary-text-color);
    }
    .search-results {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      background: var(--card-background-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 10;
      margin-top: 8px;
    }
    .result-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
    }
    .result-item:hover {
      background: var(--primary-color);
      color: white;
    }
  `;
}

customElements.define('search-bar', SearchBar);
