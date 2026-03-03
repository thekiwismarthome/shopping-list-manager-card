import { LitElement, html, css } from 'lit';

const UNITS = ['units', 'kg', 'g', 'L', 'mL', 'pack', 'bunch', 'dozen', 'bottle', 'can', 'bag', 'box', 'loaf', 'slice'];

class SLMEditItemDialog extends LitElement {
  static properties = {
    api: { type: Object },
    item: { type: Object },
    categories: { type: Array },
    editedItem: { type: Object },
    imagePreview: { type: String },
    _customUnit: { type: Boolean, state: true },
    _oftLoading: { type: Boolean, state: true },
    _oftStatus: { type: String, state: true },
    _oftResults: { type: Array, state: true }
  };

  constructor() {
    super();
    this.editedItem = {};
    this.imagePreview = null;
    this._customUnit = false;
    this._oftLoading = false;
    this._oftStatus = '';
    this._oftResults = [];
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
        price: this.item.price != null ? this.item.price : '',
        barcode: ''
      };
      this.imagePreview = this.item.image_url || null;
      this._oftResults = [];
      this._oftStatus = '';

      // Barcodes live on products, not items — fetch from product record
      if (this.item.product_id && this.api) {
        this._loadProductBarcode(this.item.product_id);
      }
    }
  }

  async _loadProductBarcode(productId) {
    try {
      const result = await this.api.getProductsByIds([productId]);
      const product = result?.products?.[0];
      if (product?.barcode) {
        this.editedItem = { ...this.editedItem, barcode: product.barcode };
      }
    } catch (err) {
      console.warn('Failed to load product barcode:', err);
    }
  }

  handleSave() {
    const data = { ...this.editedItem };

    // Barcode lives on the product, not the item — handle it separately
    const barcode = data.barcode?.trim() || null;
    delete data.barcode;

    if (data.price === '' || data.price === null) {
      delete data.price;
    } else {
      data.price = parseFloat(data.price) || 0;
    }

    // Persist the barcode to the linked product if one exists
    if (barcode && this.item.product_id) {
      this.api.updateProduct(this.item.product_id, { barcode })
        .catch(err => console.warn('Failed to save barcode to product:', err));
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

  async handleSearchOFT() {
    const name = this.editedItem.name?.trim();
    if (!name || this._oftLoading) return;
    this._oftLoading = true;
    this._oftStatus = '';
    this._oftResults = [];

    try {
      const url = `https://world.openfoodfacts.org/api/v2/search?search_terms=${encodeURIComponent(name)}&fields=product_name,categories_tags,image_front_thumb_url,image_front_url,image_url,price&page_size=5`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const products = (data?.products || []).filter(p => p.product_name?.trim());
      if (products.length === 0) {
        this._oftStatus = 'No results found on OpenFoodFacts.';
      } else {
        this._oftResults = products;
        this._oftStatus = `${products.length} result${products.length > 1 ? 's' : ''} found — tap one to apply`;
      }
    } catch (err) {
      console.warn('OFT search failed:', err);
      this._oftStatus = 'OpenFoodFacts lookup failed.';
    }

    this._oftLoading = false;
  }

  async handleSearchByBarcode() {
    const barcode = this.editedItem.barcode?.trim();
    if (!barcode || this._oftLoading) return;
    this._oftLoading = true;
    this._oftStatus = '';
    this._oftResults = [];

    // Check local catalog first — exact barcode match
    try {
      const result = await this.api.searchProductByBarcode(barcode);
      if (result?.product) {
        const p = result.product;
        const updates = { category_id: p.category_id };
        if (p.price) updates.price = p.price;
        if (p.image_url) { updates.image_url = p.image_url; this.imagePreview = p.image_url; }
        this.editedItem = { ...this.editedItem, ...updates };
        this._oftStatus = `Found in local catalog: "${p.name}" ✓`;
        this._oftLoading = false;
        return;
      }
    } catch (err) {
      console.warn('Local barcode lookup failed:', err);
    }

    // Fall back to OpenFoodFacts
    try {
      const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json?fields=product_name,categories_tags,image_front_thumb_url,image_front_url,image_url,price`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.status !== 1 || !data.product?.product_name?.trim()) {
        this._oftStatus = 'Barcode not found on OpenFoodFacts.';
      } else {
        this._oftResults = [data.product];
        this._oftStatus = 'Found on OpenFoodFacts — tap to apply';
      }
    } catch (err) {
      console.warn('OFT barcode search failed:', err);
      this._oftStatus = 'OpenFoodFacts lookup failed.';
    }

    this._oftLoading = false;
  }

  async handleApplyOFTResult(p) {
    this._oftLoading = true;
    this._oftResults = [];
    this._oftStatus = '';

    const updates = {};
    updates.category_id = this._mapOftCategory(p.categories_tags || []);
    if (p.price) updates.price = p.price;

    const remoteImage = p.image_front_url || p.image_url || '';
    if (remoteImage) {
      let imageUrl = remoteImage;
      try {
        const dlResult = await this.api.downloadProductImage(imageUrl, this.editedItem.name);
        if (dlResult?.local_url) imageUrl = dlResult.local_url;
      } catch (err) {
        console.warn('OFT image download failed:', err);
      }
      updates.image_url = imageUrl;
      this.imagePreview = imageUrl;
    }

    this.editedItem = { ...this.editedItem, ...updates };
    this._oftStatus = 'Updated from OpenFoodFacts ✓';
    this._oftLoading = false;
  }

  _mapOftCategory(tags) {
    const t = tags.map(s => s.replace(/^[a-z]{2}:/, '').toLowerCase());
    if (t.some(s => /dairy|milk|cheese|yogurt|butter|cream/.test(s))) return 'dairy';
    if (t.some(s => /meat|beef|chicken|pork|fish|seafood|poultry|lamb/.test(s))) return 'meat';
    if (t.some(s => /bread|bakery|pastry|cake|biscuit|croissant/.test(s))) return 'bakery';
    if (t.some(s => /frozen/.test(s))) return 'frozen';
    if (t.some(s => /beverage|drink|juice|water|soda|coffee|tea|alcohol|beer|wine/.test(s))) return 'beverages';
    if (t.some(s => /snack|chip|crisp|chocolate|candy|confection|sweet/.test(s))) return 'snacks';
    if (t.some(s => /vegetable|fruit|produce|fresh/.test(s))) return 'produce';
    if (t.some(s => /baby|infant|toddler/.test(s))) return 'baby';
    if (t.some(s => /\bpet\b/.test(s))) return 'pet';
    if (t.some(s => /health|beauty|cosmetic|medicine|supplement/.test(s))) return 'health';
    if (t.some(s => /household|cleaning|laundry/.test(s))) return 'household';
    return 'pantry';
  }

  _getCategoryName(categoryId) {
    const cat = (this.categories || []).find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
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
              <button
                class="oft-btn"
                ?disabled=${this._oftLoading || !this.editedItem.name?.trim()}
                @click=${this.handleSearchOFT}
              >
                <ha-icon icon=${this._oftLoading ? 'mdi:loading' : 'mdi:cloud-search'}
                  class=${this._oftLoading ? 'spin' : ''}></ha-icon>
                ${this._oftLoading ? 'Searching…' : 'Search OFT by name'}
              </button>

              ${this._oftStatus ? html`<div class="oft-status">${this._oftStatus}</div>` : ''}

              ${this._oftResults.length > 0 ? html`
                <div class="oft-results">
                  ${this._oftResults.map(p => html`
                    <button class="oft-result-item" @click=${() => this.handleApplyOFTResult(p)}>
                      ${p.image_front_thumb_url ? html`
                        <img class="oft-thumb" src="${p.image_front_thumb_url}" alt="${p.product_name}" />
                      ` : html`
                        <div class="oft-thumb">${this.getCategoryEmoji(this._mapOftCategory(p.categories_tags || []))}</div>
                      `}
                      <div class="oft-result-info">
                        <div class="oft-result-name">${p.product_name}</div>
                        <div class="oft-result-meta">
                          ${this._getCategoryName(this._mapOftCategory(p.categories_tags || []))}
                          ${p.price ? html` &bull; $${p.price}` : ''}
                        </div>
                      </div>
                      <ha-icon icon="mdi:check-circle-outline" class="oft-apply-icon"></ha-icon>
                    </button>
                  `)}
                  <button class="oft-dismiss" @click=${() => this._oftResults = []}>
                    Dismiss
                  </button>
                </div>
              ` : ''}
            </div>

            <div class="form-group">
              <label>Barcode</label>
              <div class="barcode-row">
                <input
                  type="text"
                  inputmode="numeric"
                  placeholder="Barcode number (optional)"
                  .value=${this.editedItem.barcode || ''}
                  @input=${(e) => this.editedItem = { ...this.editedItem, barcode: e.target.value }}
                />
                <button
                  class="barcode-search-btn"
                  title="Search OpenFoodFacts by barcode"
                  ?disabled=${this._oftLoading || !this.editedItem.barcode?.trim()}
                  @click=${this.handleSearchByBarcode}
                >
                  <ha-icon icon=${this._oftLoading ? 'mdi:loading' : 'mdi:cloud-search'}
                    class=${this._oftLoading ? 'spin' : ''}></ha-icon>
                </button>
              </div>
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
      background: var(--slm-accent-primary, #9fa8da);
      color: white;
    }
    .action-btn.danger {
      background: var(--slm-accent-danger, #ef9a9a);
      color: white;
    }
    .action-btn:active {
      transform: scale(0.97);
    }
    .oft-btn {
      margin-top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: auto;
      padding: 6px 10px;
      border: 1px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-accent-primary, #9fa8da);
      font-size: 12px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
    }
    .oft-btn ha-icon {
      --mdc-icon-size: 16px;
      flex-shrink: 0;
    }
    .oft-btn:hover:not(:disabled) {
      border-color: var(--slm-accent-primary, #9fa8da);
      background: var(--slm-bg-elevated, #ffffff);
    }
    .oft-btn:disabled {
      opacity: 0.45;
      cursor: default;
    }
    .barcode-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .barcode-row input {
      flex: 1;
    }
    .barcode-search-btn {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      background: var(--slm-bg-elevated, #ffffff);
      color: var(--slm-accent-primary, #9fa8da);
      cursor: pointer;
      transition: border-color 0.15s;
    }
    .barcode-search-btn ha-icon {
      --mdc-icon-size: 20px;
    }
    .barcode-search-btn:hover:not(:disabled) {
      border-color: var(--slm-accent-primary, #9fa8da);
    }
    .barcode-search-btn:disabled {
      opacity: 0.45;
      cursor: default;
    }
    .oft-status {
      margin-top: 6px;
      font-size: 12px;
      color: var(--slm-text-secondary, #757575);
    }
    .oft-results {
      margin-top: 8px;
      border: 1px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 10px;
      overflow: hidden;
    }
    .oft-result-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      border-bottom: 1px solid var(--slm-border-subtle, #e8eaf6);
      background: var(--slm-bg-main, #fafbfc);
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s;
    }
    .oft-result-item:hover {
      background: var(--slm-bg-elevated, #ffffff);
    }
    .oft-result-item:active {
      background: var(--slm-bg-surface, #f5f5f5);
    }
    .oft-thumb {
      width: 42px;
      height: 42px;
      border-radius: 6px;
      object-fit: contain;
      background: var(--slm-bg-elevated, #ffffff);
      border: 1px solid var(--slm-border-subtle, #e8eaf6);
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .oft-result-info {
      flex: 1;
      min-width: 0;
    }
    .oft-result-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--slm-text-primary, #424242);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .oft-result-meta {
      font-size: 12px;
      color: var(--slm-text-secondary, #757575);
      margin-top: 2px;
    }
    .oft-apply-icon {
      --mdc-icon-size: 20px;
      color: var(--slm-accent-primary, #9fa8da);
      flex-shrink: 0;
    }
    .oft-dismiss {
      display: block;
      width: 100%;
      padding: 8px 12px;
      border: none;
      background: transparent;
      color: var(--slm-text-muted, #9e9e9e);
      font-size: 12px;
      font-family: inherit;
      cursor: pointer;
      text-align: center;
    }
    .oft-dismiss:hover {
      color: var(--slm-text-secondary, #757575);
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
      display: inline-block;
    }
  `;
}

customElements.define('slm-edit-item-dialog', SLMEditItemDialog);
