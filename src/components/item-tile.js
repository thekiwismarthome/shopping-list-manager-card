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

        <div class="info">
          <div class="name">${this.item.name}</div>
          <div class="quantity">${this.item.quantity} ${this.item.unit}</div>
        </div>

        <button class="delete" @click=${this.handleDelete}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `;
  }

  static styles = css`
    .tile {
      background: var(--card-background-color);
      border-radius: 12px;
      border: 2px solid var(--divider-color);
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tile.checked {
      opacity: 0.6;
    }
    .tile.checked .name {
      text-decoration: line-through;
    }
    .checkbox {
      background: white;
      border: none;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
    }
    .delete {
      background: var(--error-color);
      color: white;
      border: none;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
    }
    .info {
      flex: 1;
    }
    .name {
      font-weight: 500;
      font-size: 14px;
    }
    .quantity {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `;
}

customElements.define('item-tile', ItemTile);
