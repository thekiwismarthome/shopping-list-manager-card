import { LitElement, html, css } from 'lit';

class AddItemDialog extends LitElement {
  static properties = {
    api: { type: Object },
    categories: { type: Array },
    searchQuery: { type: String },
    searchResults: { type: Array },
    selectedProduct: { type: Object },
    quantity: { type: Number },
    customName: { type: String }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.searchResults = [];
    this.selectedProduct = null;
    this.quantity = 1;
    this.customName = '';
  }

  async handleSearch(e) {
    this.searchQuery = e.target.value;
    if (this.searchQuery.length < 2) {
      this.searchResults = [];
      return;
    }

    const result = await this.api.searchProducts(this.searchQuery, { limit: 20 });
    this.searchResults = result.products;
  }

  selectProduct(product) {
    this.selectedProduct = product;
    this.quantity = product.default_quantity;
    this.searchQuery = '';
    this.searchResults = [];
  }

  handleAdd() {
    if (this.selectedProduct) {
      this.dispatchEvent(new CustomEvent('add-item', {
        detail: {
          name: this.selectedProduct.name,
          category_id: this.selectedProduct.category_id,
          product_id: this.selectedProduct.id,
          quantity: this.quantity,
          unit: this.selectedProduct.default_unit,
          price: this.selectedProduct.price,
          image_url: this.selectedProduct.image_url
        },
        bubbles: true,
        composed: true
      }));
    } else if (this.customName) {
      this.dispatchEvent(new CustomEvent('add-item', {
        detail: {
          name: this.customName,
          category_id: 'other',
          quantity: this.quantity,
          unit: 'units'
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <div class="dialog-header">
            <h3>Add Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="dialog-content">
            ${!this.selectedProduct ? html`
              <div class="search-section">
                <input
                  type="text"
                  placeholder="Search products..."
                  .value=${this.searchQuery}
                  @input=${this.handleSearch}
                  autofocus
                />

                ${this.searchResults.length > 0 ? html`
                  <div class="results">
                    ${this.searchResults.map(product => html`
                      <div class="result-item" @click=${() => this.selectProduct(product)}>
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
                      </div>
                    `)}
                  </div>
                ` : ''}

                <div class="divider">OR</div>

                <input
                  type="text"
                  placeholder="Add custom item..."
                  .value=${this.customName}
                  @input=${(e) => this.customName = e.target.value}
                />
              </div>
            ` : html`
              <div class="selected-product">
                ${this.selectedProduct.image_url ? html`
                  <img src="${this.selectedProduct.image_url}" alt="${this.selectedProduct.name}">
                ` : ''}
                <h4>${this.selectedProduct.name}</h4>

                <div class="quantity-control">
                  <button @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <span>${this.quantity} ${this.selectedProduct.default_unit}</span>
                  <button @click=${() => this.quantity++}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>

                ${this.selectedProduct.price ? html`
                  <div class="total-price">
                    Total: $${(this.selectedProduct.price * this.quantity).toFixed(2)}
                  </div>
                ` : ''}
              </div>
            `}
          </div>

          <div class="dialog-footer">
            <button class="cancel-btn" @click=${this.handleClose}>Cancel</button>
            <button 
              class="add-btn" 
              @click=${this.handleAdd}
              ?disabled=${!this.selectedProduct && !this.customName}
            >
              Add to List
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .dialog {
      width: 100%;
      max-height: 80vh;
      background: var(--card-background-color);
      border-radius: 16px 16px 0 0;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    .close-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    .search-section input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--divider-color);
      border-radius: 12px;
      font-size: 16px;
      margin-bottom: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .results {
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 16px;
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.2s;
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
    }
    .result-price {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .divider {
      text-align: center;
      color: var(--secondary-text-color);
      margin: 16px 0;
      font-size: 14px;
    }
    .selected-product {
      text-align: center;
    }
    .selected-product img {
      width: 120px;
      height: 120px;
      border-radius: 16px;
      margin: 0 auto 16px;
      object-fit: cover;
    }
    .selected-product h4 {
      margin: 0 0 24px;
      font-size: 18px;
    }
    .quantity-control {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .quantity-control button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .quantity-control span {
      font-size: 18px;
      font-weight: 600;
      min-width: 100px;
    }
    .total-price {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid var(--divider-color);
    }
    .cancel-btn,
    .add-btn {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .cancel-btn {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    .add-btn {
      background: var(--primary-color);
      color: white;
    }
    .add-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}

customElements.define('add-item-dialog', AddItemDialog);