import { LitElement, html, css } from 'lit';

const UNITS = ['units', 'kg', 'g', 'L', 'mL', 'pack', 'bunch', 'dozen', 'bottle', 'can', 'bag', 'box', 'loaf', 'slice'];

class SLMEditItemDialog extends LitElement {
  static properties = {
    api: { type: Object },
    item: { type: Object },
    categories: { type: Array },
    editedItem: { type: Object },
    imagePreview: { type: String },
    _customUnit: { type: Boolean, state: true }
  };

  constructor() {
    super();
    this.editedItem = {};
    this.imagePreview = null;
    this._customUnit = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('item') && this.item) {
      const unit = this.item.unit || 'units';
      this._customUnit = !UNITS.includes(unit);
      this.editedItem = {
        name: this.item.name,
        category_id: this.item.category_id || 'other',
        quantity: this.item.quantity,
        unit,
        note: this.item.note || '',
        image_url: this.item.image_url || '',
        price: this.item.price != null ? this.item.price : ''
      };
      this.imagePreview = this.item.image_url || null;
    }
  }

  handleSave() {
    const data = { ...this.editedItem };
    if (data.price === '' || data.price === null) {
      delete data.price;
    } else {
      data.price = parseFloat(data.price) || 0;
    }
    this.dispatchEvent(new CustomEvent('save-item', {
      detail: { itemId: this.item.id, data },
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

  handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  handleQtyChange(delta) {
    const newQty = Math.max(1, (this.editedItem.quantity || 1) + delta);
    this.editedItem = { ...this.editedItem, quantity: newQty };
  }

  handleUnitSelect(e) {
    const val = e.target.value;
    if (val === '__other__') {
      this._customUnit = true;
      this.editedItem = { ...this.editedItem, unit: '' };
    } else {
      this._customUnit = false;
      this.editedItem = { ...this.editedItem, unit: val };
    }
  }

  handleImageUrlInput(e) {
    const url = e.target.value;
    this.editedItem = { ...this.editedItem, image_url: url };
    this.imagePreview = url || null;
  }

  handleFilePick() {
    const input = this.shadowRoot.querySelector('#file-input');
    if (input) input.click();
  }

  handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      this.editedItem = { ...this.editedItem, image_url: dataUrl };
      this.imagePreview = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  handleClearImage() {
    this.editedItem = { ...this.editedItem, image_url: '' };
    this.imagePreview = null;
    const input = this.shadowRoot.querySelector('#file-input');
    if (input) input.value = '';
    const urlInput = this.shadowRoot.querySelector('#image-url-input');
    if (urlInput) urlInput.value = '';
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
    if (!this.item) return html``;
    const cats = this.categories || [];
    const currentUnit = this.editedItem.unit || 'units';
    const selectUnit = this._customUnit ? '__other__' : currentUnit;

    return html`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${(e) => e.stopPropagation()}>
          <div class="dialog-header">
            <h3>Edit Item</h3>
            <button class="close-btn" @click=${this.handleClose}>✕</button>
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

            <div class="form-group">
              <label>Category</label>
              <select
                .value=${this.editedItem.category_id || 'other'}
                @change=${(e) => this.editedItem = { ...this.editedItem, category_id: e.target.value }}
              >
                ${cats.map(cat => html`
                  <option value="${cat.id}" ?selected=${cat.id === this.editedItem.category_id}>
                    ${this.getCategoryEmoji(cat.id)} ${cat.name}
                  </option>
                `)}
              </select>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Quantity</label>
                <div class="qty-stepper">
                  <button class="qty-btn" @click=${() => this.handleQtyChange(-1)}>−</button>
                  <span class="qty-value">${this.editedItem.quantity || 1}</span>
                  <button class="qty-btn" @click=${() => this.handleQtyChange(1)}>+</button>
                </div>
              </div>

              <div class="form-group half">
                <label>Unit</label>
                <select .value=${selectUnit} @change=${this.handleUnitSelect}>
                  ${UNITS.map(u => html`<option value="${u}" ?selected=${u === selectUnit}>${u}</option>`)}
                  <option value="__other__" ?selected=${this._customUnit}>Other…</option>
                </select>
                ${this._customUnit ? html`
                  <input
                    type="text"
                    placeholder="e.g. jar, punnet…"
                    .value=${currentUnit}
                    @input=${(e) => this.editedItem = { ...this.editedItem, unit: e.target.value }}
                    style="margin-top: 6px;"
                  />
                ` : ''}
              </div>
            </div>

            <div class="form-group">
              <label>Unit Price ($)</label>
              <input
                type="text"
                inputmode="decimal"
                placeholder="0.00"
                .value=${this.editedItem.price !== '' && this.editedItem.price != null ? String(this.editedItem.price) : ''}
                @input=${(e) => this.editedItem = { ...this.editedItem, price: e.target.value }}
              />
              ${this.editedItem.price && this.editedItem.price !== '' ? html`
                <div class="price-info">
                  <span>Total:</span>
                  <span class="price-value">$${(parseFloat(this.editedItem.price) * (this.editedItem.quantity || 1)).toFixed(2)}</span>
                </div>
              ` : ''}
            </div>

            <div class="form-group">
              <label>Notes</label>
              <textarea
                placeholder="Add notes (optional)..."
                .value=${this.editedItem.note || ''}
                @input=${(e) => this.editedItem = { ...this.editedItem, note: e.target.value }}
                rows="3"
              ></textarea>
            </div>

            <div class="form-group image-section">
              <label>Product Image</label>

              ${this.imagePreview ? html`
                <div class="image-preview-wrap">
                  <img class="image-preview" src="${this.imagePreview}" alt="Product image" />
                  <button class="clear-image-btn" @click=${this.handleClearImage} title="Remove image">✕</button>
                </div>
              ` : ''}

              <div class="image-url-row">
                <input
                  id="image-url-input"
                  type="text"
                  placeholder="Paste image URL..."
                  .value=${this.editedItem.image_url && !this.editedItem.image_url.startsWith('data:') ? this.editedItem.image_url : ''}
                  @input=${this.handleImageUrlInput}
                />
                <button class="browse-btn" @click=${this.handleFilePick} title="Browse local file">
                  📁
                </button>
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style="display:none"
                @change=${this.handleFileChange}
              />
            </div>
          </div>

          <div class="dialog-footer">
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
      background: rgba(0, 0, 0, 0.55);
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
      width: 95%;
      max-width: 500px;
      margin: 0 auto;
      background: var(--slm-bg-surface, #ffffff);
      color: var(--slm-text-primary, #424242);
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
      border-bottom: 1px solid var(--slm-border-subtle, #e8eaf6);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--slm-text-primary, #424242);
    }
    .close-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 18px;
      color: var(--slm-text-secondary, #757575);
      line-height: 1;
      border-radius: 6px;
    }
    .close-btn:hover {
      background: var(--slm-border-subtle, #e8eaf6);
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
      color: var(--slm-text-secondary, #757575);
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--slm-text-primary, #424242);
      background: var(--slm-bg-elevated, #ffffff);
      transition: border-color 0.15s;
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: var(--slm-accent-primary, #9fa8da);
    }
    .form-group textarea {
      resize: vertical;
    }
    .qty-stepper {
      display: flex;
      align-items: center;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      overflow: hidden;
    }
    .qty-btn {
      width: 40px;
      height: 44px;
      border: none;
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-text-primary, #424242);
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qty-btn:active {
      background: var(--slm-border-subtle, #e8eaf6);
    }
    .qty-value {
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: var(--slm-text-primary, #424242);
      background: var(--slm-bg-elevated, #ffffff);
      padding: 10px 0;
      min-width: 40px;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--slm-bg-main, #fafbfc);
      border-radius: 8px;
      margin-top: 8px;
      font-size: 14px;
      color: var(--slm-text-primary, #424242);
    }
    .price-value {
      font-weight: 700;
      color: var(--slm-accent-primary, #9fa8da);
    }
    .image-section {}
    .image-preview-wrap {
      position: relative;
      display: inline-block;
      margin-bottom: 10px;
    }
    .image-preview {
      display: block;
      width: 100%;
      max-height: 180px;
      object-fit: contain;
      border-radius: 8px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      background: var(--slm-bg-main, #fafbfc);
    }
    .clear-image-btn {
      position: absolute;
      top: 6px;
      right: 6px;
      background: rgba(0,0,0,0.55);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
    }
    .image-url-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .image-url-row input {
      flex: 1;
    }
    .browse-btn {
      flex-shrink: 0;
      padding: 0 12px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      background: var(--slm-bg-elevated, #ffffff);
      color: var(--slm-text-primary, #424242);
      font-size: 18px;
      cursor: pointer;
      transition: border-color 0.15s;
    }
    .browse-btn:hover {
      border-color: var(--slm-accent-primary, #9fa8da);
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--slm-border-subtle, #e8eaf6);
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
    .action-btn.danger {
      background: var(--slm-accent-danger, #ef9a9a);
      color: white;
    }
    .action-btn:active {
      transform: scale(0.97);
    }
  `;
}

customElements.define('slm-edit-item-dialog', SLMEditItemDialog);
