import { LitElement, html, css } from 'lit';

class ItemTile extends LitElement {
  static properties = {
    item: { type: Object },
    categoryColor: { type: String },
    touchStartX: { type: Number },
    touchStartY: { type: Number },
    touchStartTime: { type: Number },
    longPressTimer: { type: Number }
  };

  constructor() {
    super();
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.longPressTimer = null;
  }

  handleTileClick(e) {
    if (e.target.closest('.decrease-btn') || e.target.closest('.checkbox')) {
      return;
    }
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: { itemId: this.item.id },
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

  handleCheck(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: { itemId: this.item.id, checked: !this.item.checked },
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
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - this.touchStartX;
    const deltaY = touchY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
      if (deltaX < 0) {
        this.style.transform = `translateX(${deltaX}px)`;
      }
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

  render() {
    return html`
      <div 
        class="tile ${this.item.checked ? 'checked' : ''}"
        @click=${this.handleTileClick}
        @touchstart=${this.handleTouchStart}
        @touchmove=${this.handleTouchMove}
        @touchend=${this.handleTouchEnd}
      >
        <button class="decrease-btn" @click=${this.handleDecrease}>
          <ha-icon icon="mdi:minus"></ha-icon>
        </button>

        ${this.item.quantity > 1 ? html`
          <div class="quantity-badge" style="background: ${this.categoryColor}">${this.item.quantity}</div>
        ` : ''}

        ${this.item.image_url ? html`
          <img src="${this.item.image_url}" alt="${this.item.name}">
        ` : html`
          <div class="no-image" style="background: ${this.categoryColor}20">
            <ha-icon icon="mdi:food-variant" style="color: ${this.categoryColor}"></ha-icon>
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

        <button class="checkbox" @click=${this.handleCheck}>
          <ha-icon icon="${this.item.checked ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline'}"></ha-icon>
        </button>
      </div>
    `;
  }

  static styles = css`
    .tile {
      position: relative;
      background: var(--card-background-color);
      border-radius: 16px;
      border: 2px solid var(--divider-color);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }
    .tile:active {
      transform: scale(0.98);
    }
    .tile.checked {
      opacity: 0.5;
    }
    .tile.checked .name {
      text-decoration: line-through;
    }
    .decrease-btn {
      position: absolute;
      top: 8px;
      left: 8px;
      background: var(--error-color);
      color: white;
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 2;
      padding: 0;
    }
    .decrease-btn ha-icon {
      --mdc-icon-size: 18px;
    }
    .quantity-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      z-index: 2;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .checkbox {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 2;
      padding: 0;
    }
    .checkbox ha-icon {
      --mdc-icon-size: 24px;
      color: var(--primary-color);
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
    .no-image ha-icon {
      --mdc-icon-size: 56px;
      opacity: 0.5;
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
      color: var(--primary-color);
      font-weight: 700;
    }
  `;
}

customElements.define('item-tile', ItemTile);