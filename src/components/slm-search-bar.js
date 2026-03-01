import { LitElement, html, css } from 'lit';
import { Html5Qrcode } from 'html5-qrcode';

const UNITS = ['units', 'kg', 'g', 'L', 'mL', 'pack', 'loaf', 'dozen', 'ea', 'pkt', 'tray', 'bottle', 'can', 'bunch', 'roll', 'bar'];

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
    _createPrice: { type: String, state: true },
    _createUnit: { type: String, state: true },
    _createBarcode: { type: String, state: true },
    _createImageUrl: { type: String, state: true },
    _barcodeLocked: { type: Boolean, state: true },
    _oftLoading: { type: Boolean, state: true }
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
    this._createUnit = 'units';
    this._createBarcode = '';
    this._createImageUrl = '';
    this._barcodeLocked = false;
    this._oftLoading = false;
    this._scannerInstance = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopBarcodeScanner();
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
    this._createUnit = 'units';
    this._createBarcode = '';
    this._barcodeLocked = false;
    this._createImageUrl = '';
    this._showCreateForm = true;
  }

  handleCancelCreate() {
    this._showCreateForm = false;
    this._barcodeLocked = false;
    this._createBarcode = '';
    this._createImageUrl = '';
  }

  handleCreateAndAdd() {
    if (!this._createName.trim()) return;
    this.dispatchEvent(new CustomEvent('create-and-add-product', {
      detail: {
        name: this._createName.trim(),
        category_id: this._createCategory,
        price: this._createPrice ? parseFloat(this._createPrice) : null,
        unit: this._createUnit || 'units',
        barcode: this._createBarcode || null,
        image_url: this._createImageUrl || null
      },
      bubbles: true,
      composed: true
    }));
    this.searchQuery = '';
    this.showResults = false;
    this._showCreateForm = false;
    this.shadowRoot.querySelector('input').blur();
  }

  // ── Barcode scanner ───────────────────────────────────────────────────────────

  startBarcodeScanner() {
    const host = document.createElement('div');
    host.id = 'slm-product-scanner-host';
    Object.assign(host.style, {
      position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
      zIndex: '99999', background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    });
    const label = document.createElement('p');
    label.textContent = 'Point camera at product barcode';
    Object.assign(label.style, { color: '#fff', fontSize: '16px', margin: '0 0 12px 0' });
    const scanRegion = document.createElement('div');
    scanRegion.id = 'slm-product-scanner-region';
    Object.assign(scanRegion.style, { width: '100%', maxWidth: '400px' });
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '✕ Cancel';
    Object.assign(cancelBtn.style, {
      marginTop: '20px', padding: '10px 24px', background: '#fff',
      border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer'
    });
    cancelBtn.addEventListener('click', () => this.stopBarcodeScanner());
    host.append(label, scanRegion, cancelBtn);
    document.body.appendChild(host);

    this._scannerInstance = new Html5Qrcode('slm-product-scanner-region');
    this._scannerInstance.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 280, height: 120 } },
      (decodedText) => this.handleBarcodeScanned(decodedText),
      () => {}
    ).catch(() => this.stopBarcodeScanner());
  }

  stopBarcodeScanner() {
    if (this._scannerInstance) {
      this._scannerInstance.stop().catch(() => {});
      this._scannerInstance = null;
    }
    document.getElementById('slm-product-scanner-host')?.remove();
  }

  async handleBarcodeScanned(barcode) {
    this.stopBarcodeScanner();

    // Step 1: check local catalog by barcode
    try {
      const result = await this.api.searchProductByBarcode(barcode);
      if (result?.product) {
        this.handleProductSelect(result.product);
        return;
      }
    } catch (err) {
      console.warn('Local barcode lookup failed:', err);
    }

    // Step 2: not in local catalog — show form and query OpenFoodFacts
    this._createName = '';
    this._createCategory = 'other';
    this._createPrice = '';
    this._createUnit = 'units';
    this._createBarcode = barcode;
    this._barcodeLocked = true;
    this._createImageUrl = '';
    this._showCreateForm = true;
    this.showResults = true;
    this._oftLoading = true;
    this.requestUpdate();

    const oftData = await this.fetchFromOpenFoodFacts(barcode);

    if (oftData) {
      // Try to match an existing catalog product by name
      try {
        const searchResult = await this.api.searchProducts(oftData.name, { limit: 1 });
        const existing = searchResult?.products?.[0];
        if (existing) {
          const nameA = existing.name.toLowerCase();
          const nameB = oftData.name.toLowerCase();
          const nameMatch = nameA.includes(nameB) || nameB.includes(nameA);
          if (nameMatch) {
            // Update existing product with barcode (and image if missing) then add to list
            const updates = { barcode };
            if (oftData.image_url && !existing.image_url) updates.image_url = oftData.image_url;
            await this.api.updateProduct(existing.id, updates);
            this._oftLoading = false;
            this._showCreateForm = false;
            this.handleProductSelect({ ...existing, ...updates });
            return;
          }
        }
      } catch (err) {
        console.warn('OFT name search failed:', err);
      }

      // Pre-fill the create form with OFT data
      this._createName = oftData.name;
      this._createCategory = oftData.category_id || 'other';
      this._createImageUrl = oftData.image_url || '';
    }

    this._oftLoading = false;
  }

  async fetchFromOpenFoodFacts(barcode) {
    try {
      const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,categories_tags,image_front_url`;
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.status !== 1 || !data.product) return null;
      const p = data.product;
      const name = p.product_name?.trim();
      if (!name) return null;
      return {
        name,
        category_id: this._mapOftCategory(p.categories_tags || []),
        image_url: p.image_front_url || ''
      };
    } catch (err) {
      console.warn('OpenFoodFacts fetch failed:', err);
      return null;
    }
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

  // ── Helpers ───────────────────────────────────────────────────────────────────

  getCategoryEmoji(categoryId) {
    const emojiMap = {
      'produce': '🥬', 'dairy': '🥛', 'meat': '🥩', 'bakery': '🍞',
      'pantry': '🥫', 'frozen': '🧊', 'beverages': '🥤', 'snacks': '🍿',
      'household': '🧹', 'health': '💊', 'pet': '🐾', 'baby': '👶', 'other': '📦'
    };
    return emojiMap[categoryId] || '📦';
  }

  // ── Render ────────────────────────────────────────────────────────────────────

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
          <button class="scan-btn" title="Scan barcode" @click=${() => this.startBarcodeScanner()}>📷</button>
        </div>

        ${this.showResults ? html`
          <div class="results-dropdown">

            <!-- Always-visible add row pinned to the top -->
            ${!this._showCreateForm && this.searchQuery ? html`
              <button class="result-item add-quick" @click=${this.handleAddCustom}>
                <div class="no-image add-plus">➕</div>
                <div class="result-info">
                  <div class="result-name">Add "${this.searchQuery}"</div>
                  <div class="result-subtitle">quick add to list</div>
                </div>
              </button>
            ` : ''}

            ${this._showCreateForm ? html`
              <!-- Inline create-product form -->
              <div class="create-form">
                <div class="create-form-title">
                  ${this._oftLoading ? html`
                    <span class="oft-loading">⏳ Looking up on OpenFoodFacts…</span>
                  ` : 'Create new product'}
                </div>

                ${this._createImageUrl ? html`
                  <div class="image-preview">
                    <img src="${this._createImageUrl}" alt="Product image" />
                  </div>
                ` : ''}

                <input
                  class="create-input"
                  type="text"
                  placeholder="Product name"
                  .value=${this._createName}
                  @input=${(e) => this._createName = e.target.value}
                  ?disabled=${this._oftLoading}
                />
                <select
                  class="create-select"
                  .value=${this._createCategory}
                  @change=${(e) => this._createCategory = e.target.value}
                  ?disabled=${this._oftLoading}
                >
                  ${cats.map(cat => html`
                    <option value="${cat.id}" ?selected=${cat.id === this._createCategory}>
                      ${this.getCategoryEmoji(cat.id)} ${cat.name}
                    </option>
                  `)}
                </select>

                <div class="create-row">
                  <input
                    class="create-input"
                    type="text"
                    inputmode="decimal"
                    placeholder="Price (optional)"
                    .value=${this._createPrice}
                    @input=${(e) => this._createPrice = e.target.value}
                    ?disabled=${this._oftLoading}
                  />
                  <select
                    class="create-select unit-select"
                    .value=${this._createUnit}
                    @change=${(e) => this._createUnit = e.target.value}
                    ?disabled=${this._oftLoading}
                  >
                    ${UNITS.map(u => html`
                      <option value="${u}" ?selected=${u === this._createUnit}>${u}</option>
                    `)}
                  </select>
                </div>

                <input
                  class="create-input barcode-input"
                  type="text"
                  inputmode="numeric"
                  placeholder="Barcode (optional)"
                  .value=${this._createBarcode}
                  ?readonly=${this._barcodeLocked}
                  @input=${(e) => this._createBarcode = e.target.value}
                />

                <div class="create-actions">
                  <button class="create-btn secondary" @click=${this.handleCancelCreate}>Cancel</button>
                  <button
                    class="create-btn primary"
                    @click=${this.handleCreateAndAdd}
                    ?disabled=${this._oftLoading || !this._createName.trim()}
                  >Create &amp; Add</button>
                </div>
              </div>
            ` : this.searchResults.length > 0 ? html`
              <!-- Search results below the add row -->
              <div class="results-divider">Matching products</div>
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
            ` : html`
              <!-- No results: offer to create a catalog product -->
              <button class="result-item create-product" @click=${this.handleShowCreateForm}>
                <div class="no-image">🆕</div>
                <div class="result-info">
                  <div class="result-name">Create product "${this.searchQuery}"</div>
                  <div class="result-subtitle">save to catalog with category &amp; price</div>
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
      background: var(--slm-bg-surface);
      z-index: 50;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--slm-bg-main);
      border-radius: 12px;
      border: 1px solid var(--slm-border-subtle);
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
      color: var(--slm-text-primary);
    }
    input::placeholder {
      color: var(--slm-text-muted);
    }
    .clear-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 14px;
      color: var(--slm-text-muted);
      opacity: 0.7;
      -webkit-tap-highlight-color: transparent;
    }
    .scan-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      -webkit-tap-highlight-color: transparent;
      flex-shrink: 0;
    }
    .results-dropdown {
      position: absolute;
      top: calc(100% - 4px);
      left: 8px;
      right: 8px;
      background: var(--slm-bg-surface);
      border-radius: 0 0 12px 12px;
      box-shadow: var(--slm-shadow-medium);
      max-height: 400px;
      overflow-y: auto;
      z-index: 100;
      border: 1px solid var(--slm-border-subtle);
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
      border-bottom: 1px solid var(--slm-border-subtle);
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .result-item:last-child {
      border-bottom: none;
    }
    .result-item:active {
      background: var(--slm-bg-elevated);
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
      background: var(--slm-bg-elevated);
      font-size: 20px;
    }
    .result-info {
      flex: 1;
    }
    .result-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--slm-text-primary);
      margin-bottom: 2px;
    }
    .result-price {
      font-size: 13px;
      color: var(--slm-accent-primary);
      font-weight: 600;
    }
    .result-subtitle {
      font-size: 12px;
      color: var(--slm-text-secondary);
    }
    .add-icon {
      font-size: 20px;
      color: var(--slm-accent-primary);
    }
    .add-quick {
      background: var(--slm-bg-elevated);
      border-bottom: 2px solid var(--slm-border-subtle);
    }
    .add-plus {
      background: var(--slm-accent-primary);
      color: white;
      font-size: 18px;
    }
    .results-divider {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slm-text-muted);
      padding: 6px 12px 2px;
      opacity: 0.8;
    }
    .add-custom {
      background: transparent;
    }
    .create-product {
      background: transparent;
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
      color: var(--slm-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .oft-loading {
      font-weight: 600;
      font-size: 13px;
      color: var(--slm-accent-primary);
      text-transform: none;
      letter-spacing: 0;
    }
    .image-preview {
      display: flex;
      justify-content: center;
    }
    .image-preview img {
      width: 72px;
      height: 72px;
      object-fit: contain;
      border-radius: 8px;
      background: var(--slm-bg-elevated);
    }
    .create-input,
    .create-select {
      box-sizing: border-box;
      width: 100%;
      padding: 9px 12px;
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: var(--slm-text-primary);
      background: var(--slm-bg-main);
      outline: none;
    }
    .create-input:focus,
    .create-select:focus {
      border-color: var(--slm-accent-primary);
    }
    .create-input[readonly] {
      opacity: 0.65;
      cursor: default;
    }
    .create-input:disabled,
    .create-select:disabled {
      opacity: 0.5;
    }
    .create-row {
      display: flex;
      gap: 8px;
    }
    .create-row .create-input {
      flex: 1;
      width: auto;
    }
    .unit-select {
      width: auto;
      min-width: 80px;
      padding-left: 8px;
      padding-right: 4px;
    }
    .barcode-input {
      font-size: 13px;
      letter-spacing: 0.03em;
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
      background: var(--slm-accent-primary);
      color: white;
    }
    .create-btn.primary:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .create-btn.secondary {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
    }
  `;
}

customElements.define('slm-search-bar', SLMSearchBar);
