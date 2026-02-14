import { LitElement, html, css } from 'lit';

class ItemTile extends LitElement {
  static properties = {
    item: { type: Object },
    categoryColor: { type: String },
    isRecentlyUsed: { type: Boolean },
    touchStartX: { type: Number },
    touchStartY: { type: Number },
    touchStartTime: { type: Number },
    longPressTimer: { type: Number }
  };

  constructor() {
    super();
    this.isRecentlyUsed = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.longPressTimer = null;
  }

  handleTileClick(e) {
    // If clicked on tile body (not buttons), toggle check status
    if (!e.target.closest('.decrease-btn') && !e.target.closest('.checkbox')) {
      this.dispatchEvent(new CustomEvent('item-check', {
        detail: { itemId: this.item.id, checked: !this.item.checked },
        bubbles: true,
        composed: true
      }));
    }
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

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.touchStartTime = Date.now();

    this.longPressTimer = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('item-long-press', {
        detail: { item: this.item },
        bubbles: true,
        composed: true
      }));
    }, 500);
  }

  handleTouchMove(e) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    const touchX = e.touches[0].clientX;
    const deltaX = touchX - this.touchStartX;

    if (Math.abs(deltaX) > 100 && deltaX < 0) {
      this.style.transform = `translateX(${deltaX}px)`;
    }
  }

  handleTouchEnd(e) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    const touchX = e.changedTouches[0].clientX;
    const deltaX = touchX - this.touchStartX;

    if (deltaX < -150) {
      this.dispatchEvent(new CustomEvent('item-swipe-delete', {
        detail: { itemId: this.item.id },
        bubbles: true,
        composed: true
      }));
    }

    this.style.transform = '';
  }

  firstUpdated() {
    // Add passive event listeners
    const tile = this.shadowRoot.querySelector('.tile');
    if (tile) {
      tile.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      tile.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
      tile.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
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
    const pastelColor = this.isRecentlyUsed 
      ? `${this.categoryColor}30` 
      : this.categoryColor;

    return html`
      <div 
        class="tile ${this.item.checked ? 'checked' : ''} ${this.isRecentlyUsed ? 'recently-used' : ''}"
        @click=${this.handleTileClick}
      >
        ${!this.item.checked ? html`
          <button class="decrease-btn" @click=${this.handleDecrease}>
            <span>−</span>
          </button>
        ` : ''}

        ${this.item.quantity > 1 && !this.item.checked ? html`
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
          <div class="no-image" style="background: ${pastelColor}">
            <div class="emoji">${this.getCategoryEmoji(this.item.category_id)}</div>
          </div>
        `}

        <div class="info">
          <div class="name">${this.item.name}</div>
          <div class="meta">
            <span class="unit">${this.item.quantity} ${this.item.unit}</span>
            ${this.item.price ? html`
              <span class="price">$${(this.item.price * this.item.quantity).toFixed(2)}</span>
            ` : ''}
          </div>
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
      background: var(--card-background-color);
      border-radius: 16px;
      border: 2px solid #e8eaf6;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }
    .tile:active {
      transform: scale(0.97);
    }
    .tile.recently-used {
      opacity: 0.7;
      border-style: dashed;
    }
    .tile.checked {
      opacity: 0.4;
    }
    .tile.checked .name {
      text-decoration: line-through;
    }
    .decrease-btn {
      position: absolute;
      top: 8px;
      left: 8px;
      background: #ff7675;
      color: white;
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      z-index: 2;
      padding: 0;
      font-size: 20px;
      font-weight: 300;
    }
    .quantity-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      z-index: 2;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      cursor: pointer;
    }
    .quantity-badge:hover {
      transform: scale(1.1);
    }
    img, .no-image {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 12px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .emoji {
      font-size: 56px;
    }
    .info {
      flex: 1;
    }
    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 1.3;
      margin-bottom: 6px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }
    .unit {
      color: var(--secondary-text-color);
    }
    .price {
      color: #667eea;
      font-weight: 700;
    }
    .checked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(102, 126, 234, 0.9);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .check-icon {
      font-size: 48px;
      color: white;
    }
  `;
}

customElements.define('item-tile', ItemTile);