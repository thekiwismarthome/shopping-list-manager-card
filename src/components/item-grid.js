import { LitElement, html, css } from 'lit';
import './item-tile.js';

class ItemGrid extends LitElement {
  static properties = {
    items: { type: Array },
    categories: { type: Array }
  };

  groupItemsByCategory() {
    const grouped = {};
    
    this.categories.forEach(cat => {
      grouped[cat.id] = {
        category: cat,
        items: this.items.filter(item => item.category_id === cat.id && !item.checked)
      };
    });

    return Object.values(grouped).filter(g => g.items.length > 0);
  }

  handleItemClick(e) {
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemDecrease(e) {
    this.dispatchEvent(new CustomEvent('item-decrease', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemCheck(e) {
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemLongPress(e) {
    this.dispatchEvent(new CustomEvent('item-long-press', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemSwipeDelete(e) {
    this.dispatchEvent(new CustomEvent('item-swipe-delete', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const groupedItems = this.groupItemsByCategory();

    if (groupedItems.length === 0) {
      return html`
        <div class="empty">
          <ha-icon icon="mdi:cart-outline"></ha-icon>
          <p>Your shopping list is empty</p>
          <p class="hint">Tap the + button to add items</p>
        </div>
      `;
    }

    return html`
      <div class="grid-container">
        ${groupedItems.map(group => html`
          <div class="category-section">
            <div class="category-header" style="border-color: ${group.category.color}">
              <ha-icon icon="${group.category.icon}" style="color: ${group.category.color}"></ha-icon>
              <span>${group.category.name}</span>
              <span class="count">${group.items.length}</span>
            </div>
            <div class="items-grid">
              ${group.items.map(item => html`
                <item-tile
                  .item=${item}
                  .categoryColor=${group.category.color}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></item-tile>
              `)}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  static styles = css`
    .grid-container {
      padding: 16px;
    }
    .category-section {
      margin-bottom: 24px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 0;
      font-weight: 600;
      font-size: 16px;
      border-bottom: 3px solid;
      margin-bottom: 12px;
    }
    .category-header ha-icon {
      --mdc-icon-size: 24px;
    }
    .count {
      margin-left: auto;
      background: var(--primary-color);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
    }
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--secondary-text-color);
    }
    .empty ha-icon {
      font-size: 80px;
      opacity: 0.2;
      margin-bottom: 16px;
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

customElements.define('item-grid', ItemGrid);