import { LitElement, html, css } from 'lit';
import { PRODUCT_ICON_MAP } from '../icons/product-icon-map.js';
import { PRODUCT_ICONS } from '../icons/product-icons.js';

class SLMItemList extends LitElement {
  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object },
    api: { type: Object },
    _longPressTimer: { state: true },
    _longPressTriggered: { state: true }
  };

  constructor() {
    super();
    this._longPressTimer = null;
    this._longPressTriggered = false;
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
      'loaf': '🍞', 'sourdough': '🍞', 'wrap': '🫓',
      'apple': '🍎', 'orange': '🍊', 'banana': '🍌', 'grape': '🍇',
      'strawberry': '🍓', 'blueberry': '🫐', 'raspberry': '🍓',
      'lemon': '🍋', 'lime': '🍋', 'pineapple': '🍍', 'mango': '🥭',
      'watermelon': '🍉', 'melon': '🍈', 'peach': '🍑', 'pear': '🍐',
      'cherry': '🍒', 'kiwi': '🥝', 'avocado': '🥑',
      'tomato': '🍅', 'potato': '🥔', 'carrot': '🥕', 'broccoli': '🥦',
      'lettuce': '🥬', 'spinach': '🥬', 'salad': '🥗', 'kale': '🥬',
      'onion': '🧅', 'garlic': '🧄', 'corn': '🌽', 'pepper': '🫑',
      'cucumber': '🥒', 'mushroom': '🍄', 'eggplant': '🍆', 'zucchini': '🥒',
      'peas': '🫛', 'beans': '🫘', 'lentil': '🫘',
      'coffee': '☕', 'espresso': '☕', 'latte': '☕',
      'tea': '🍵', 'juice': '🧃', 'lemonade': '🍋',
      'water': '💧', 'sparkling': '💧',
      'beer': '🍺', 'wine': '🍷', 'cider': '🍺', 'spirits': '🥃', 'whisky': '🥃',
      'soda': '🥤', 'cola': '🥤', 'energy drink': '🥤',
      'milk alternative': '🥛', 'almond milk': '🥛', 'oat milk': '🥛',
      'pasta': '🍝', 'noodle': '🍜', 'rice': '🍚', 'oat': '🌾', 'cereal': '🥣',
      'flour': '🌾', 'sugar': '🍬', 'salt': '🧂', 'oil': '🫙', 'vinegar': '🫙',
      'sauce': '🫙', 'ketchup': '🫙', 'mustard': '🫙', 'mayonnaise': '🫙',
      'honey': '🍯', 'jam': '🫙', 'peanut butter': '🥜',
      'chocolate': '🍫', 'chips': '🥔', 'popcorn': '🍿', 'biscuit': '🍪',
      'cookie': '🍪', 'cake': '🎂', 'muffin': '🧁', 'doughnut': '🍩',
      'ice cream': '🍦', 'frozen': '🧊',
      'shampoo': '🧴', 'conditioner': '🧴', 'soap': '🧼', 'toothpaste': '🦷',
      'toilet paper': '🧻', 'tissues': '🧻', 'paper towel': '🧻',
      'detergent': '🧺', 'bleach': '🧽', 'sponge': '🧽',
      'nappy': '👶', 'diaper': '👶', 'formula': '👶',
      'pet food': '🐾', 'dog food': '🐕', 'cat food': '🐈',
    };
    for (const [key, emoji] of Object.entries(productMap)) {
      if (lower.includes(key)) return emoji;
    }
    return this.getCategoryEmoji(categoryId);
  }

  getProductIcon(name, categoryId) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const [keyword, slug] of Object.entries(PRODUCT_ICON_MAP)) {
      if (lower.includes(keyword) && PRODUCT_ICONS[slug]) {
        return PRODUCT_ICONS[slug];
      }
    }
    return null;
  }

  groupItems() {
    const sortMode = this.settings?.sortMode || 'category';
    const unchecked = (this.items || []).filter(i => !i.checked);
    const checked = (this.items || []).filter(i => i.checked);

    if (sortMode === 'alphabetical') {
      unchecked.sort((a, b) => a.name.localeCompare(b.name));
      checked.sort((a, b) => a.name.localeCompare(b.name));
      return {
        mode: 'alpha',
        sections: [{ id: '_alpha', items: unchecked }],
        checked
      };
    }

    const grouped = {};
    (this.categories || []).forEach(cat => {
      const catItems = unchecked.filter(i => i.category_id === cat.id);
      if (catItems.length > 0) {
        grouped[cat.id] = { category: cat, items: catItems };
      }
    });

    return {
      mode: 'category',
      sections: Object.values(grouped),
      checked
    };
  }

  handleRowClick(e, item) {
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      return;
    }
    if (e.target.closest('.list-decrease-btn') || e.target.closest('.list-qty-badge')) return;
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: { itemId: item.id, checked: !item.checked },
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

  renderRow(item) {
    const color = this.getCategoryColor(item.category_id);
    const { r, g, b } = this.hexToRgb(color);
    const icon = this.getProductIcon(item.name, item.category_id);
    const showPrice = this.settings?.showPriceOnTile !== false;

    return html`
      <div
        class="list-row ${item.checked ? 'checked' : ''}"
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
            ${item.image_url ? html`
              <img src="${item.image_url}" alt="${item.name}" class="row-img" />
            ` : icon ? html`
              <img src="${icon}" alt="${item.name}" class="row-img" />
            ` : html`
              <span class="row-emoji">${this.getProductEmoji(item.name, item.category_id)}</span>
            `}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${item.name}</div>
          ${showPrice && item.price ? html`
            <div class="row-price">$${(item.price * item.quantity).toFixed(2)}</div>
          ` : ''}
        </div>

        <div class="row-right">
          ${!item.checked ? html`
            <button
              class="list-decrease-btn"
              style="background: rgba(${r},${g},${b},0.15); color: ${color};"
              @click=${(e) => this.handleDecrease(e, item)}
            >−</button>
            <div class="list-qty-badge" style="background: ${color}">
              ${item.quantity}
            </div>
          ` : html`
            <span class="check-mark">✓</span>
          `}
        </div>
      </div>
    `;
  }

  render() {
    const { mode, sections, checked } = this.groupItems();
    const isEmpty = sections.every(s => s.items.length === 0) && checked.length === 0;

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

        ${checked.length > 0 ? html`
          <div class="list-section checked-section">
            <div class="checked-header">Checked (${checked.length})</div>
            ${checked.map(item => this.renderRow(item))}
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
    .checked-header {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slm-text-secondary, #757575);
      padding: 8px 12px 4px;
      opacity: 0.7;
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
    .list-row.checked {
      opacity: 0.45;
    }
    .list-row.checked .row-name {
      text-decoration: line-through;
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
    }
    .check-mark {
      font-size: 20px;
      color: var(--slm-accent-primary, #9fa8da);
      font-weight: 700;
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
