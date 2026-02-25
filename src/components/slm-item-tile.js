import { LitElement, html, css } from 'lit';
import { PRODUCT_ICON_MAP } from '../icons/product-icon-map.js';
import { PRODUCT_ICONS } from '../icons/product-icons.js';

class SLMItemTile extends LitElement {
  static properties = {
    item: { type: Object },
    categoryColor: { type: String },
    isRecentlyUsed: { type: Boolean },
    settings: { type: Object },
    touchStartX: { type: Number },
    touchStartY: { type: Number },
    touchStartTime: { type: Number },
    longPressTimer: { type: Number },
    longPressTriggered: { type: Boolean },
    _localImgError: { type: Boolean, state: true }
  };

  constructor() {
    super();
    this.isRecentlyUsed = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.longPressTimer = null;
    this.longPressTriggered = false;
    this._localImgError = false;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 159, g: 168, b: 218 };
  }

  handleTileClick(e) {
    if (this.longPressTriggered) {
      this.longPressTriggered = false;
      return;
    }
    if (e.target.closest('.decrease-btn')) {
      return;
    }
    // For regular tiles, quantity-badge click is handled separately (increment)
    // For recently-used tiles, the badge IS the + button, so let it fall through
    if (!this.isRecentlyUsed && e.target.closest('.quantity-badge')) {
      return;
    }
    if (this.isRecentlyUsed) {
      // Recently-used tiles hold Products, not list Items — dispatch add-item
      this.dispatchEvent(new CustomEvent('add-item', {
        detail: {
          name: this.item.name,
          category_id: this.item.category_id,
          product_id: this.item.id,
          quantity: 1,
          unit: this.item.default_unit || 'units',
          price: this.item.price || null,
          image_url: this.item.image_url || null,
          fromRecentlyUsed: true
        },
        bubbles: true,
        composed: true
      }));
      return;
    }
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: { itemId: this.item.id, checked: !this.item.checked },
      bubbles: true,
      composed: true
    }));
  }

  handleDecrease(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-decrease', {
      detail: { itemId: this.item.id },
      bubbles: true,
      composed: true
    }));
  }

  handleQuantityClick(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: { itemId: this.item.id },
      bubbles: true,
      composed: true
    }));
  }

  handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();
    this.longPressTriggered = false;

    this.longPressTimer = setTimeout(() => {
      this.longPressTriggered = true;
      this.dispatchEvent(new CustomEvent('item-long-press', {
        detail: { item: this.item },
        bubbles: true,
        composed: true
      }));
    }, 500);
  }

  handleTouchMove(e) {
    if (this.longPressTimer) {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = Math.abs(touchX - this.touchStartX);
      const deltaY = Math.abs(touchY - this.touchStartY);
      if (deltaX > 10 || deltaY > 10) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    }
  }

  handleTouchEnd(e) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  handleMouseDown(e) {
    if (e.button === 2) {
      e.preventDefault();
      return false;
    }
    this.longPressTriggered = false;
    this.longPressTimer = setTimeout(() => {
      this.longPressTriggered = true;
      this.dispatchEvent(new CustomEvent('item-long-press', {
        detail: { item: this.item },
        bubbles: true,
        composed: true
      }));
    }, 500);
  }

  handleMouseUp(e) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  handleMouseLeave(e) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  firstUpdated() {
    const tile = this.shadowRoot.querySelector('.tile');
    if (tile) {
      tile.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      tile.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
      tile.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
      tile.addEventListener('contextmenu', this.handleContextMenu.bind(this));
    }
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
      'coffee': '☕', 'espresso': '☕', 'latte': '☕',
      'tea': '🍵', 'juice': '🧃',
      'water': '💧', 'sparkling': '💧',
      'beer': '🍺', 'wine': '🍷', 'cider': '🍺', 'spirits': '🥃', 'whisky': '🥃',
      'soda': '🥤', 'cola': '🥤',
      'pasta': '🍝', 'noodle': '🍜', 'rice': '🍚', 'oat': '🌾', 'cereal': '🥣',
      'flour': '🌾', 'sugar': '🍬', 'salt': '🧂', 'oil': '🫙', 'vinegar': '🫙',
      'sauce': '🫙', 'ketchup': '🫙', 'mustard': '🫙', 'mayonnaise': '🫙',
      'honey': '🍯', 'jam': '🫙', 'peanut butter': '🥜',
      'chocolate': '🍫', 'chips': '🥔', 'popcorn': '🍿', 'biscuit': '🍪',
      'cookie': '🍪', 'cake': '🎂', 'muffin': '🧁', 'doughnut': '🍩',
      'ice cream': '🍦',
      'shampoo': '🧴', 'conditioner': '🧴', 'soap': '🧼', 'toothpaste': '🦷',
      'toilet paper': '🧻', 'tissues': '🧻',
      'nappy': '👶', 'diaper': '👶', 'formula': '👶',
      'pet food': '🐾', 'dog food': '🐕', 'cat food': '🐈',
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

  renderImage() {
    const name = this.item?.name;
    const categoryId = this.item?.category_id;

    // 1. Explicit product image URL (highest priority)
    if (this.item?.image_url) {
      return html`<img src="${this.item.image_url}" alt="${name}">`;
    }

    // 2. Local HA image folder (user's own curated images)
    const localUrl = this.getLocalImageUrl(name);
    if (localUrl && !this._localImgError) {
      return html`
        <div class="no-image">
          <img
            src="${localUrl}"
            alt="${name}"
            class="product-icon"
            @error=${() => { this._localImgError = true; this.requestUpdate(); }}
          >
        </div>
      `;
    }

    // 3. Bundled icons8 icon
    const bundled = this.getBundledIcon(name);
    if (bundled) {
      return html`<div class="no-image"><img src="${bundled}" alt="${name}" class="product-icon"></div>`;
    }

    // 4. Emoji fallback
    return html`
      <div class="no-image">
        <div class="emoji">${this.getProductEmoji(name, categoryId)}</div>
      </div>
    `;
  }

  render() {
    const { r, g, b } = this.hexToRgb(this.categoryColor);
    const tileBg = this.isRecentlyUsed
      ? `rgba(${r},${g},${b},0.12)`
      : `rgba(${r},${g},${b},0.25)`;
    const showPrice = this.settings?.showPriceOnTile !== false;

    return html`
      <div
        class="tile ${this.item.checked ? 'checked' : ''} ${this.isRecentlyUsed ? 'recently-used' : ''}"
        style="background: ${tileBg}"
        @click=${this.handleTileClick}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.isRecentlyUsed ? html`
          <div class="quantity-badge" style="background: ${this.categoryColor}">+</div>
        ` : html`
          ${!this.item.checked ? html`
            <button class="decrease-btn" style="background: rgba(${r},${g},${b},0.7)" @click=${this.handleDecrease}>
              <span>−</span>
            </button>
          ` : ''}
          ${!this.item.checked ? html`
            <div
              class="quantity-badge"
              style="background: ${this.categoryColor}"
              @click=${this.handleQuantityClick}
            >
              ${this.item.quantity}
            </div>
          ` : ''}
        `}

        ${this.renderImage()}

        <div class="info">
          <div class="name">${this.item.name}</div>
          ${showPrice && this.item.price ? html`
            <div class="price">$${(this.item.price * (this.item.quantity || 1)).toFixed(2)}</div>
          ` : ''}
        </div>

        ${this.item.checked ? html`
          <div class="checked-overlay">
            <span class="check-icon">✓</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    :host {
      font-size: var(--slm-font-size-base, 16px);
      font-weight: var(--slm-font-weight-base, 400);
    }
    .tile {
      position: relative;
      border-radius: 14px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
      aspect-ratio: 1;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .tile:active {
      transform: scale(0.97);
    }
    .tile.recently-used {
      opacity: 0.8;
    }
    .tile.checked {
      opacity: var(--slm-tile-checked-opacity);
    }
    .decrease-btn,
    .quantity-badge {
      position: absolute;
      top: 0;
      width: 44px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-sizing: border-box;
      color: white;
      border: none;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      z-index: 2;
    }
    .decrease-btn {
      left: 0;
      border-radius: 14px 0 14px 0;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.25);
    }
    .quantity-badge {
      right: 0;
      border-radius: 0 14px 0 14px;
      box-shadow: -2px 2px 6px rgba(0,0,0,0.25);
    }
    img, .no-image {
      width: 100%;
      flex: 1;
      min-height: 0;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    .product-icon {
      width: 60%;
      height: 60%;
      object-fit: contain;
    }
    .emoji {
      font-size: 40px;
    }
    .info {
      flex-shrink: 0;
      padding: 5px 8px 7px;
    }
    .name {
      font-weight: var(--slm-font-weight-base, 600);
      font-size: 0.75em;
      line-height: 1.2;
      margin-bottom: 2px;
      color: var(--slm-text-primary, #e0e0e0);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      font-size: 0.69em;
      color: var(--slm-accent-primary, #9fa8da);
      font-weight: 700;
    }
    .checked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(159, 168, 218, 0.9);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .check-icon {
      font-size: 40px;
      color: white;
    }
  `;
}

customElements.define('slm-item-tile', SLMItemTile);
