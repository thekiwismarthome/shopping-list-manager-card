import { LitElement, html, css } from 'lit';
import { PRODUCT_ICON_MAP } from '../icons/product-icon-map.js';
import { PRODUCT_ICONS } from '../icons/product-icons.js';

class SLMItemList extends LitElement {
  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object },
    api: { type: Object },
    _recentItems: { type: Array, state: true },
    _longPressTimer: { state: true },
    _longPressTriggered: { state: true }
  };

  constructor() {
    super();
    this._recentItems = [];
    this._longPressTimer = null;
    this._longPressTriggered = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('items') || changedProperties.has('settings') || changedProperties.has('api')) {
      this._loadRecentItems();
    }
  }

  async _loadRecentItems() {
    if (!this.api || this.settings?.showRecentlyUsed === false) {
      this._recentItems = [];
      return;
    }

    const limit = this.settings?.recentProductsCount || 8;

    // Exclude products already unchecked in the current list
    const currentProductIds = new Set(
      (this.items || []).filter(i => !i.checked).map(i => i.product_id).filter(Boolean)
    );

    try {
      // Primary: localStorage recent-adds (most-recent-first)
      const recentKey = 'slm_recent_products';
      const saved = localStorage.getItem(recentKey);
      const rawIds = saved ? JSON.parse(saved) : [];
      const filteredIds = [...new Set(rawIds)]
        .filter(id => !currentProductIds.has(id))
        .slice(0, limit);

      if (filteredIds.length > 0) {
        const result = await this.api.getProductsByIds(filteredIds);
        this._recentItems = result.products || [];
        return;
      }

      // Fallback: backend suggestions by purchase frequency
      const result = await this.api.getProductSuggestions(limit + currentProductIds.size);
      this._recentItems = (result.products || [])
        .filter(p => !currentProductIds.has(p.id))
        .slice(0, limit);
    } catch (err) {
      console.error('Failed to load recent items:', err);
      this._recentItems = [];
    }
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 159, g: 168, b: 218 };
  }

  getCategoryHeaderStyle(color) {
    const { r, g, b } = this.hexToRgb(color);
    return `border-left: 4px solid ${color}; background: linear-gradient(to right, rgba(${r},${g},${b},0.22), rgba(${r},${g},${b},0.066)); border-radius: 0 8px 8px 0;`;
  }

  getCategoryColor(categoryId) {
    const cat = (this.categories || []).find(c => c.id === categoryId);
    return cat?.color || '#9fa8da';
  }

  getCategoryEmoji(categoryId) {
    const emojiMap = {
      'produce': '🥬', 'dairy': '🥛', 'meat': '🥩', 'bakery': '🍞',
      'pantry': '🥫', 'frozen': '🧊', 'beverages': '🥤', 'snacks': '🍿',
      'household': '🧹', 'health': '💊', 'pet': '🐾', 'baby': '👶', 'other': '📦'
    };
    return emojiMap[categoryId] || '📦';
  }

  getProductEmoji(name, categoryId) {
    if (!name) return this.getCategoryEmoji(categoryId);
    const lower = name.toLowerCase();
    const productMap = {
      'chicken': '🍗', 'turkey': '🦃', 'duck': '🦆',
      'beef': '🥩', 'steak': '🥩', 'mince': '🥩', 'lamb': '🍖',
      'pork': '🥓', 'bacon': '🥓', 'ham': '🍖', 'sausage': '🌭', 'salami': '🍖',
      'fish': '🐟', 'salmon': '🐟', 'tuna': '🐟', 'prawn': '🦐', 'shrimp': '🦐',
      'egg': '🥚', 'eggs': '🥚',
      'milk': '🥛', 'cream': '🥛', 'yogurt': '🫙', 'yoghurt': '🫙',
      'cheese': '🧀', 'cheddar': '🧀', 'feta': '🧀', 'mozzarella': '🧀',
      'butter': '🧈',
      'bread': '🍞', 'toast': '🍞', 'bun': '🥖', 'roll': '🥖', 'bagel': '🥯',
      'loaf': '🍞', 'sourdough': '🍞', 'wrap': '🫓', 'croissant': '🥐',
      'apple': '🍎', 'orange': '🍊', 'banana': '🍌', 'grape': '🍇',
      'strawberry': '🍓', 'blueberry': '🫐', 'raspberry': '🍓',
      'lemon': '🍋', 'lime': '🍋', 'pineapple': '🍍', 'mango': '🥭',
      'watermelon': '🍉', 'melon': '🍈', 'peach': '🍑', 'pear': '🍐',
      'cherry': '🍒', 'kiwi': '🥝', 'avocado': '🥑',
      'tomato': '🍅', 'potato': '🥔', 'carrot': '🥕', 'broccoli': '🥦',
      'lettuce': '🥬', 'spinach': '🥬', 'salad': '🥗', 'kale': '🥬',
      'onion': '🧅', 'garlic': '🧄', 'corn': '🌽', 'pepper': '🫑',
      'cucumber': '🥒', 'mushroom': '🍄', 'eggplant': '🍆',
      'peas': '🫛', 'beans': '🫘', 'lentil': '🫘',
      'coffee': '☕', 'espresso': '☕', 'tea': '🍵', 'juice': '🧃',
      'water': '💧', 'beer': '🍺', 'wine': '🍷', 'soda': '🥤', 'cola': '🥤',
      'pasta': '🍝', 'noodle': '🍜', 'rice': '🍚', 'oat': '🌾', 'cereal': '🥣',
      'flour': '🌾', 'sugar': '🍬', 'salt': '🧂', 'honey': '🍯',
      'chocolate': '🍫', 'chips': '🥔', 'popcorn': '🍿', 'biscuit': '🍪',
      'cookie': '🍪', 'cake': '🎂', 'muffin': '🧁', 'ice cream': '🍦',
      'shampoo': '🧴', 'soap': '🧼', 'toothpaste': '🦷', 'toilet paper': '🧻',
      'nappy': '👶', 'diaper': '👶', 'pet food': '🐾',
    };
    for (const [key, emoji] of Object.entries(productMap)) {
      if (lower.includes(key)) return emoji;
    }
    return this.getCategoryEmoji(categoryId);
  }

  getBundledIcon(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const [keyword, slug] of Object.entries(PRODUCT_ICON_MAP)) {
      if (lower.includes(keyword) && PRODUCT_ICONS[slug]) {
        return PRODUCT_ICONS[slug];
      }
    }
    return null;
  }

  getLocalImageUrl(name) {
    const basePath = this.settings?.localImagePath;
    if (!basePath || !name) return null;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+$/, '');
    return `${basePath.replace(/\/$/, '')}/${slug}.jpg`;
  }

  groupItems() {
    const sortMode = this.settings?.sortMode || 'category';
    // Only show unchecked items (same behaviour as tile view)
    const unchecked = (this.items || []).filter(i => !i.checked);

    if (sortMode === 'alphabetical') {
      unchecked.sort((a, b) => a.name.localeCompare(b.name));
      return { mode: 'alpha', sections: [{ id: '_alpha', items: unchecked }] };
    }

    const grouped = {};
    (this.categories || []).forEach(cat => {
      const catItems = unchecked.filter(i => i.category_id === cat.id);
      if (catItems.length > 0) {
        grouped[cat.id] = { category: cat, items: catItems };
      }
    });

    return { mode: 'category', sections: Object.values(grouped) };
  }

  handleRowClick(e, item) {
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      return;
    }
    // Ignore clicks on the qty badge or decrease button
    if (e.target.closest('.list-decrease-btn') || e.target.closest('.list-qty-badge')) return;
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: { itemId: item.id, checked: !item.checked },
      bubbles: true,
      composed: true
    }));
  }

  handleQtyClick(e, item) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: { itemId: item.id },
      bubbles: true,
      composed: true
    }));
  }

  handleDecrease(e, item) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-decrease', {
      detail: { itemId: item.id },
      bubbles: true,
      composed: true
    }));
  }

  handleRecentClick(product) {
    this.dispatchEvent(new CustomEvent('add-item', {
      detail: {
        name: product.name,
        category_id: product.category_id,
        product_id: product.id,
        quantity: 1,
        unit: product.default_unit || 'units',
        price: product.price || null,
        image_url: product.image_url || null,
        fromRecentlyUsed: true
      },
      bubbles: true,
      composed: true
    }));
  }

  handleMouseDown(item) {
    this._longPressTriggered = false;
    this._longPressTimer = setTimeout(() => {
      this._longPressTriggered = true;
      this.dispatchEvent(new CustomEvent('item-long-press', {
        detail: { item },
        bubbles: true,
        composed: true
      }));
    }, 500);
  }

  handleMouseUp() {
    if (this._longPressTimer) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
    }
  }

  renderRowIcon(name, categoryId, imageUrl) {
    if (imageUrl) {
      return html`<img src="${imageUrl}" alt="${name}" class="row-img" />`;
    }
    const bundled = this.getBundledIcon(name);
    if (bundled) {
      return html`<img src="${bundled}" alt="${name}" class="row-img icon-img" />`;
    }
    const localUrl = this.getLocalImageUrl(name);
    if (localUrl) {
      return html`
        <img
          src="${localUrl}"
          alt="${name}"
          class="row-img icon-img"
          @error=${(e) => { e.target.style.display='none'; e.target.nextElementSibling?.style.removeProperty('display'); }}
        /><span class="row-emoji" style="display:none">${this.getProductEmoji(name, categoryId)}</span>
      `;
    }
    return html`<span class="row-emoji">${this.getProductEmoji(name, categoryId)}</span>`;
  }

  renderRow(item) {
    const color = this.getCategoryColor(item.category_id);
    const { r, g, b } = this.hexToRgb(color);
    const showPrice = this.settings?.showPriceOnTile !== false;

    return html`
      <div
        class="list-row"
        @click=${(e) => this.handleRowClick(e, item)}
        @mousedown=${() => this.handleMouseDown(item)}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
        @touchstart=${() => this.handleMouseDown(item)}
        @touchend=${this.handleMouseUp}
      >
        <div class="row-left">
          <div class="cat-dot" style="background: ${color}"></div>
          <div class="row-icon">
            ${this.renderRowIcon(item.name, item.category_id, item.image_url)}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${item.name}</div>
          ${showPrice && item.price ? html`
            <div class="row-price">$${(item.price * item.quantity).toFixed(2)}</div>
          ` : ''}
        </div>

        <div class="row-right">
          <button
            class="list-decrease-btn"
            style="background: rgba(${r},${g},${b},0.15); color: ${color};"
            @click=${(e) => this.handleDecrease(e, item)}
          >−</button>
          <div
            class="list-qty-badge"
            style="background: ${color}"
            @click=${(e) => this.handleQtyClick(e, item)}
          >${item.quantity}</div>
        </div>
      </div>
    `;
  }

  renderRecentRow(product) {
    const recentColor = '#9e9e9e';
    const showPrice = this.settings?.showPriceOnTile !== false;

    return html`
      <div
        class="list-row recent-row"
        @click=${() => this.handleRecentClick(product)}
      >
        <div class="row-left">
          <div class="cat-dot" style="background: ${recentColor}"></div>
          <div class="row-icon">
            ${this.renderRowIcon(product.name, product.category_id, product.image_url)}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${product.name}</div>
          ${showPrice && product.price ? html`
            <div class="row-price">$${product.price.toFixed(2)}</div>
          ` : ''}
        </div>

        <div class="row-right">
          <div class="list-qty-badge recent-add" style="background: ${recentColor}">+</div>
        </div>
      </div>
    `;
  }

  render() {
    const { mode, sections } = this.groupItems();
    const showRecent = this.settings?.showRecentlyUsed !== false;
    const recentColor = '#9e9e9e';
    const isEmpty = sections.every(s => s.items.length === 0) && (!showRecent || this._recentItems.length === 0);

    if (isEmpty) {
      return html`
        <div class="empty">
          <div class="empty-emoji">🛒</div>
          <p>Your shopping list is empty</p>
          <p class="hint">Search for products to add items</p>
        </div>
      `;
    }

    return html`
      <div class="list-container">

        ${sections.map(section => html`
          <div class="list-section">
            ${mode === 'category' ? html`
              <div class="category-header" style="${this.getCategoryHeaderStyle(section.category.color || '#9fa8da')}">
                <span class="cat-emoji">${this.getCategoryEmoji(section.category.id)}</span>
                <span class="cat-name" style="color: ${section.category.color || '#9fa8da'}">${section.category.name}</span>
              </div>
            ` : ''}
            ${section.items.map(item => this.renderRow(item))}
          </div>
        `)}

        ${showRecent && this._recentItems.length > 0 ? html`
          <div class="list-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle(recentColor)}">
              <span class="cat-emoji">⏱️</span>
              <span class="cat-name" style="color: ${recentColor}">Recently Used</span>
            </div>
            ${this._recentItems.map(product => this.renderRecentRow(product))}
          </div>
        ` : ''}

      </div>
    `;
  }

  static styles = css`
    .list-container {
      padding: 4px;
    }
    .list-section {
      margin-bottom: 12px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      margin-bottom: 4px;
      font-weight: 700;
      font-size: 15px;
    }
    .cat-emoji {
      font-size: 18px;
    }
    .cat-name {
      flex: 1;
      font-weight: 700;
    }
    .list-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      transition: background 0.1s;
      -webkit-tap-highlight-color: transparent;
    }
    .list-row:active {
      background: var(--secondary-background-color, rgba(0,0,0,0.05));
    }
    .recent-row {
      opacity: 0.75;
    }
    .row-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .cat-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .row-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      flex-shrink: 0;
    }
    .row-img {
      width: 36px;
      height: 36px;
      object-fit: cover;
    }
    .icon-img {
      object-fit: contain;
    }
    .row-emoji {
      font-size: 24px;
      line-height: 1;
    }
    .row-middle {
      flex: 1;
      min-width: 0;
    }
    .row-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--slm-text-primary, #e0e0e0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-price {
      font-size: 12px;
      color: var(--slm-accent-primary, #9fa8da);
      font-weight: 600;
      margin-top: 1px;
    }
    .row-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .list-decrease-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .list-qty-badge {
      min-width: 32px;
      height: 32px;
      border-radius: 8px;
      color: white;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .recent-add {
      font-size: 20px;
      cursor: default;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--slm-text-secondary);
    }
    .empty-emoji {
      font-size: 80px;
      margin-bottom: 16px;
      opacity: 0.3;
    }
    .empty p {
      margin: 8px 0;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
    }
  `;
}

customElements.define('slm-item-list', SLMItemList);
