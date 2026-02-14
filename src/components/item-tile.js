import { LitElement, html, css } from 'lit';

class ItemTile extends LitElement {
  static properties = {
    item: { type: Object }
  };

  handleCheck() {
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: { itemId: this.item.id, checked: !this.item.checked },
      bubbles: true,
      composed: true
    }));
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent('item-delete', {
      detail: { itemId: this.item.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="tile ${this.item.checked ? 'checked' : ''}">
        <button class="checkbox" @click=${this.handleCheck}>
          <ha-icon icon="${this.item.checked ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon>
        </button>

        ${this.item.image_url ? html`
          <img src="${this.item.image_url}" alt="${this.item.name}">
        ` : html`
          <div class="no-image">
            <ha-icon icon="mdi:food-variant"></ha-icon>
          </div>
        `}

        <div class="info">
          <div class="name">${this.item.name}</div>
          <div class="quantity">
            ${this.item.quantity} ${this.item.unit}
          </div>
          ${this.item.price ? html`
            <div class="price">$${this.item.price.toFixed(2)}</div>
          ` : ''}
        </div>

        <button class="delete" @click=${this.handleDelete}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `;
  }

  static styles = css`
    .tile {
      position: relative;
      background: var(--card-background-color);
      border-radius: 12px;
      border: 2px solid var(--divider-color);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: all 0.2s;
    }
    .tile:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .tile.checked {
      opacity: 0.6;
    }
    .tile.checked .name {
      text-decoration: line-through;
    }
    .checkbox {
      position: absolute;
      top: 8px;
      left: 8px;
      background: white;
      border: none;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 1;
    }
    .checkbox ha-icon {
      display: block;
      --mdc-icon-size: 20px;
      color: var(--primary-color);
    }
    .delete {
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--error-color);
      color: white;
      border: none;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .tile:hover .delete {
      opacity: 1;
    }
    .delete ha-icon {
      display: block;
      --mdc-icon-size: 16px;
    }
    img, .no-image {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 8px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .no-image ha-icon {
      --mdc-icon-size: 48px;
      opacity: 0.3;
    }
    .info {
      flex: 1;
    }
    .name {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 4px;
      line-height: 1.3;
    }
    .quantity {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .price {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 600;
      margin-top: 4px;
    }
  `;
}

customElements.define('item-tile', ItemTile);
