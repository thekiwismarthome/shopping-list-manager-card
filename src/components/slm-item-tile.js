import { LitElement, html, css } from 'lit';

class SLMItemTile extends LitElement {
  static properties = {
    item: { type: Object },
    categoryColor: { type: String },
    isRecentlyUsed: { type: Boolean },
    touchStartX: { type: Number },
    touchStartY: { type: Number },
    touchStartTime: { type: Number },
    longPressTimer: { type: Number },
    longPressTriggered: { type: Boolean }
  };

  constructor() {
    super();
    this.isRecentlyUsed = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.longPressTimer = null;
    this.longPressTriggered = false;
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

    if (
      e.target.closest('.decrease-btn') ||
      e.target.closest('.quantity-badge')
    ) {
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
      'produce': '🥬',
      'dairy': '🥛',
      'meat': '🥩',
      'bakery': '🍞',
      'pantry': '🥫',
      'frozen': '🧊',
      'beverages': '🥤',
      'snacks': '🍿',
      'household': '🧹',
      'health': '💊',
      'pet': '🐾',
      'baby': '👶',
      'other': '📦'
    };
    return emojiMap[categoryId] || '📦';
  }

  render() {
    const { r, g, b } = this.hexToRgb(this.categoryColor);
    // Tile background: muted colour, even more muted when recently used
    const tileBg = this.isRecentlyUsed
      ? `rgba(${r},${g},${b},0.12)`
      : `rgba(${r},${g},${b},0.25)`;

    return html`
      <div
        class="tile ${this.item.checked ? 'checked' : ''} ${this.isRecentlyUsed ? 'recently-used' : ''}"
        style="background: ${tileBg}"
        @click=${this.handleTileClick}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        ${!this.item.checked ? html`
          <button class="decrease-btn" @click=${this.handleDecrease}>
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

        ${this.item.image_url ? html`
          <img src="${this.item.image_url}" alt="${this.item.name}">
        ` : html`
          <div class="no-image">
            <div class="emoji">${this.getCategoryEmoji(this.item.category_id)}</div>
          </div>
        `}

        <div class="info">
          <div class="name">${this.item.name}</div>
          ${this.item.price ? html`
            <div class="price">$${(this.item.price * this.item.quantity).toFixed(2)}</div>
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
    .decrease-btn {
      position: absolute;
      top: 0;
      left: 0;
      background: #8b4545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
      z-index: 2;
      padding: 0;
      font-size: 26px;
      font-weight: 300;
    }
    .quantity-badge {
      position: absolute;
      top: 0;
      right: 0;
      color: white;
      padding: 5px 12px;
      border-radius: 0 14px 0 14px;
      font-size: 14px;
      font-weight: 700;
      z-index: 2;
      box-shadow: -2px 2px 6px rgba(0,0,0,0.25);
      cursor: pointer;
    }
    .quantity-badge:hover {
      transform: scale(1.05);
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
    .emoji {
      font-size: 40px;
    }
    .info {
      flex-shrink: 0;
      padding: 5px 8px 7px;
    }
    .name {
      font-weight: 600;
      font-size: 12px;
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
      font-size: 11px;
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
