import { LitElement, html, css } from 'lit';

class SLMEditItemDialog extends LitElement {
  static properties = {
    api: { type: Object },
    item: { type: Object },
    categories: { type: Array },
    editedItem: { type: Object }
  };

  constructor() {
    super();
    this.editedItem = {};
  }

  updated(changedProperties) {
    if (changedProperties.has('item') && this.item) {
      this.editedItem = {
        name: this.item.name,
        quantity: this.item.quantity,
        unit: this.item.unit,
        notes: this.item.notes || ''
      };
    }
  }

  handleSave() {
    this.dispatchEvent(new CustomEvent('save-item', {
      detail: {
        itemId: this.item.id,
        data: this.editedItem
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

  handleDuplicate() {
    // TODO: Implement duplicate functionality
    alert('Duplicate feature coming soon');
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
              <span class="emoji">✖️</span>
            </button>
          </div>

          <div class="dialog-content">
            <div class="form-group">
              <label>Product Name</label>
              <input
                type="text"
                .value=${this.editedItem.name || ''}
                @input=${(e) => this.editedItem = { ...this.editedItem, name: e.target.value }}
              />
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  .value=${this.editedItem.quantity || 1}
                  @input=${(e) => this.editedItem = { ...this.editedItem, quantity: parseInt(e.target.value) || 1 }}
                />
              </div>

              <div class="form-group half">
                <label>Unit</label>
                <input
                  type="text"
                  .value=${this.editedItem.unit || ''}
                  @input=${(e) => this.editedItem = { ...this.editedItem, unit: e.target.value }}
                />
              </div>
            </div>

            ${this.item.price ? html`
              <div class="price-info">
                <span>Total:</span>
                <span class="price-value">$${(this.item.price * (this.editedItem.quantity || 1)).toFixed(2)}</span>
              </div>
            ` : ''}

            <div class="form-group">
              <label>Notes</label>
              <textarea
                placeholder="Add notes (optional)..."
                .value=${this.editedItem.notes || ''}
                @input=${(e) => this.editedItem = { ...this.editedItem, notes: e.target.value }}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="dialog-footer">
            <button class="action-btn secondary" @click=${this.handleDuplicate}>
              Duplicate
            </button>
            <button class="action-btn danger" @click=${this.handleDelete}>
              Delete
            </button>
            <button class="action-btn primary" @click=${this.handleSave}>
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
      width: 95%;
      max-width: 500px;
      margin: 0 auto;
      background: white;
      border-radius: 16px 16px 0 0;
      display: flex;
      flex-direction: column;
      max-height: 85vh;
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
      padding: 16px;
      border-bottom: 1px solid var(--border-color, #e8eaf6);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary, #424242);
    }
    .close-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 18px;
    }
    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    .form-group.half {
      flex: 1;
    }
    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-secondary, #757575);
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 2px solid var(--border-color, #e8eaf6);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--text-primary, #424242);
      background: white;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-pastel, #9fa8da);
    }
    .form-group textarea {
      resize: vertical;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: var(--surface-pastel, #fafbfc);
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 15px;
    }
    .price-value {
      font-weight: 700;
      color: var(--primary-pastel, #9fa8da);
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--border-color, #e8eaf6);
    }
    .action-btn {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .action-btn.primary {
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
      color: white;
    }
    .action-btn.secondary {
      background: var(--surface-pastel, #fafbfc);
      color: var(--text-primary, #424242);
    }
    .action-btn.danger {
      background: #ef9a9a;
      color: white;
    }
    .action-btn:active {
      transform: scale(0.97);
    }
  `;
}

customElements.define('slm-edit-item-dialog', SLMEditItemDialog);