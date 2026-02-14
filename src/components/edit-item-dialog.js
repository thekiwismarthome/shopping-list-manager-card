import { LitElement, html, css } from 'lit';

class EditItemDialog extends LitElement {
  static properties = {
    api: { type: Object },
    item: { type: Object },
    categories: { type: Array },
    quantity: { type: Number },
    notes: { type: String },
    showSubstitutes: { type: Boolean },
    substitutes: { type: Array }
  };

  constructor() {
    super();
    this.quantity = 1;
    this.notes = '';
    this.showSubstitutes = false;
    this.substitutes = [];
  }

  updated(changedProperties) {
    if (changedProperties.has('item') && this.item) {
      this.quantity = this.item.quantity;
      this.notes = this.item.notes || '';
      if (this.item.product_id) {
        this.loadSubstitutes();
      }
    }
  }

  async loadSubstitutes() {
    const result = await this.api.getProductSubstitutes(this.item.product_id, 5);
    this.substitutes = result.substitutes;
  }

  handleSave() {
    this.dispatchEvent(new CustomEvent('save-item', {
      detail: {
        itemId: this.item.id,
        data: {
          quantity: this.quantity,
          notes: this.notes
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  handleDelete() {
    if (confirm(`Delete ${this.item.name}?`)) {
      this.dispatchEvent(new CustomEvent('delete-item', {
        detail: { itemId: this.item.id },
        bubbles: true,
        composed: true
      }));
    }
  }

  handleSubstituteSelect(substitute) {
    this.dispatchEvent(new CustomEvent('save-item', {
      detail: {
        itemId: this.item.id,
        data: {
          product_id: substitute.id,
          name: substitute.name,
          price: substitute.price,
          image_url: substitute.image_url,
          quantity: this.quantity
        }
      },
      bubbles: true,
      composed: true
    }));
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.item) return html``;

    return html`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <div class="dialog-header">
            <h3>Edit Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="dialog-content">
            <div class="item-preview">
              ${this.item.image_url ? html`
                <img src="${this.item.image_url}" alt="${this.item.name}">
              ` : html`
                <div class="no-image">
                  <ha-icon icon="mdi:food-variant"></ha-icon>
                </div>
              `}
              <h4>${this.item.name}</h4>
            </div>

            <div class="quantity-section">
              <label>Quantity</label>
              <div class="quantity-control">
                <button @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <input 
                  type="number" 
                  .value=${this.quantity}
                  @input=${(e) => this.quantity = parseInt(e.target.value) || 1}
                  min="1"
                />
                <span class="unit">${this.item.unit}</span>
                <button @click=${() => this.quantity++}>
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            </div>

            ${this.item.price ? html`
              <div class="price-info">
                <span>Unit Price:</span>
                <span>$${this.item.price.toFixed(2)}</span>
              </div>
              <div class="price-info total">
                <span>Total:</span>
                <span>$${(this.item.price * this.quantity).toFixed(2)}</span>
              </div>
            ` : ''}

            <div class="notes-section">
              <label>Notes</label>
              <textarea
                placeholder="Add notes (optional)..."
                .value=${this.notes}
                @input=${(e) => this.notes = e.target.value}
                rows="3"
              ></textarea>
            </div>

            ${this.substitutes.length > 0 ? html`
              <div class="substitutes-section">
                <button 
                  class="toggle-substitutes"
                  @click=${() => this.showSubstitutes = !this.showSubstitutes}
                >
                  <ha-icon icon="mdi:swap-horizontal"></ha-icon>
                  <span>Show Substitutes (${this.substitutes.length})</span>
                  <ha-icon icon="${this.showSubstitutes ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon>
                </button>

                ${this.showSubstitutes ? html`
                  <div class="substitutes-list">
                    ${this.substitutes.map(sub => html`
                      <div class="substitute-item" @click=${() => this.handleSubstituteSelect(sub)}>
                        ${sub.image_url ? html`
                          <img src="${sub.image_url}" alt="${sub.name}">
                        ` : html`
                          <div class="no-image-small">
                            <ha-icon icon="mdi:food-variant"></ha-icon>
                          </div>
                        `}
                        <div class="substitute-info">
                          <div class="substitute-name">${sub.name}</div>
                          ${sub.price ? html`
                            <div class="substitute-price">$${sub.price.toFixed(2)}</div>
                          ` : ''}
                        </div>
                        <ha-icon icon="mdi:arrow-right"></ha-icon>
                      </div>
                    `)}
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <div class="dialog-footer">
            <button class="delete-btn" @click=${this.handleDelete}>
              <ha-icon icon="mdi:delete"></ha-icon>
              Delete
            </button>
            <button class="save-btn" @click=${this.handleSave}>
              <ha-icon icon="mdi:check"></ha-icon>
              Save
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
    .dialog {
      width: 100%;
      max-height: 85vh;
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
    }
    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    .item-preview {
      text-align: center;
      margin-bottom: 24px;
    }
    .item-preview img,
    .no-image {
      width: 100px;
      height: 100px;
      border-radius: 16px;
      margin: 0 auto 12px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .no-image ha-icon {
      --mdc-icon-size: 48px;
      opacity: 0.5;
    }
    .item-preview h4 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .quantity-section {
      margin-bottom: 20px;
    }
    .quantity-section label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .quantity-control {
      display: flex;
      align-items: center;
      gap: 12px;
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
    .quantity-control input {
      flex: 1;
      padding: 10px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .quantity-control .unit {
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 15px;
    }
    .price-info.total {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color);
      border-top: 2px solid var(--divider-color);
      margin-top: 8px;
      padding-top: 12px;
    }
    .notes-section {
      margin: 20px 0;
    }
    .notes-section label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .notes-section textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 14px;
      resize: vertical;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
    }
    .substitutes-section {
      margin-top: 20px;
    }
    .toggle-substitutes {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      background: var(--primary-background-color);
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
    }
    .toggle-substitutes span {
      flex: 1;
      text-align: left;
    }
    .substitutes-list {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .substitute-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .substitute-item:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    .substitute-item img,
    .no-image-small {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
    }
    .no-image-small {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .substitute-info {
      flex: 1;
    }
    .substitute-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .substitute-price {
      font-size: 13px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid var(--divider-color);
    }
    .delete-btn,
    .save-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .delete-btn {
      background: var(--error-color);
      color: white;
    }
    .save-btn {
      background: var(--primary-color);
      color: white;
    }
  `;
}

customElements.define('edit-item-dialog', EditItemDialog);