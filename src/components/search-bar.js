import { LitElement, html, css } from 'lit';

class SearchBar extends LitElement {
  static properties = {
    api: { type: Object },
    activeListId: { type: String },
    categories: { type: Array },
    searchQuery: { type: String },
    searchResults: { type: Array },
    showResults: { type: Boolean },
    excludeAllergens: { type: Array }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
    this.excludeAllergens = [];
  }

  async handleSearch(e) {
    this.searchQuery = e.target.value;

    if (this.searchQuery.length < 2) {
      this.showResults = false;
      return;
    }

    const result = await this.api.searchProducts(this.searchQuery, {
      limit: 20,
      excludeAllergens: this.excludeAllergens
    });

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

  toggleAllergenFilter(allergen) {
    const index = this.excludeAllergens.indexOf(allergen);
    if (index > -1) {
      this.excludeAllergens = this.excludeAllergens.filter(a => a !== allergen);
    } else {
      this.excludeAllergens = [...this.excludeAllergens, allergen];
    }
    
    if (this.searchQuery.length >= 2) {
      this.handleSearch({ target: { value: this.searchQuery }});
    }
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
            @focus=${() => this.showResults = this.searchResults.length > 0}
          />
        </div>

        <div class="allergen-filters">
          ${['milk', 'gluten', 'nuts', 'eggs', 'soy'].map(allergen => html`
            <button
              class="allergen-chip ${this.excludeAllergens.includes(allergen) ? 'active' : ''}"
              @click=${() => this.toggleAllergenFilter(allergen)}
            >
              No ${allergen}
            </button>
          `)}
        </div>

        ${this.showResults ? html`
          <div class="search-results">
            ${this.searchResults.map(product => html`
              <div class="result-item" @click=${() => this.handleProductSelect(product)}>
                ${product.image_url ? html`
                  <img src="${product.image_url}" alt="${product.name}">
                ` : html`
                  <div class="no-image">
                    <ha-icon icon="mdi:image-off"></ha-icon>
                  </div>
                `}
                <div class="result-info">
                  <div class="result-name">${product.name}</div>
                  <div class="result-meta">
                    ${product.price ? `$${product.price.toFixed(2)}` : ''}
                    ${product.allergens?.length ? html`
                      <span class="allergen-badge">${product.allergens.join(', ')}</span>
                    ` : ''}
                  </div>
                </div>
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
      background: var(--card-background-color);
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
    .search-box:focus-within {
      border-color: var(--primary-color);
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px;
      color: var(--primary-text-color);
    }
    .allergen-filters {
      display: flex;
      gap: 8px;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    .allergen-chip {
      padding: 6px 12px;
      border-radius: 16px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      font-size: 13px;
    }
    .allergen-chip.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    .search-results {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      background: var(--card-background-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 400px;
      overflow-y: auto;
      z-index: 10;
      margin-top: 8px;
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
    }
    .result-item:hover {
      background: var(--primary-color);
      color: white;
    }
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
    .result-info {
      flex: 1;
    }
    .result-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .result-meta {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .allergen-badge {
      color: var(--error-color);
      font-size: 11px;
      margin-left: 8px;
    }
  `;
}

customElements.define('search-bar', SearchBar);
