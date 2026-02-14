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

  render() {
    const groupedItems = this.groupItemsByCategory();

    if (groupedItems.length === 0) {
      return html`
        <div class="empty">
          <ha-icon icon="mdi:cart-outline"></ha-icon>
          <p>Your shopping list is empty</p>
        </div>
      `;
    }

    return html`
      <div class="grid-container">
        ${groupedItems.map(group => html`
          <div class="category-section">
            <div class="category-header">
              <ha-icon icon="${group.category.icon}"></ha-icon>
              <span>${group.category.name}</span>
            </div>
            <div class="items-grid">
              ${group.items.map(item => html`
                <item-tile
                  .item=${item}
                  @item-check=${this.handleCheck}
                  @item-delete=${this.handleDelete}
                ></item-tile>
              `)}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  handleCheck(e) {
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleDelete(e) {
    this.dispatchEvent(new CustomEvent('item-delete', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
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
      border-bottom: 2px solid var(--divider-color);
      margin-bottom: 12px;
    }
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center;
      padding: 64px 32px;
      color: var(--secondary-text-color);
    }
    .empty ha-icon {
      font-size: 64px;
      opacity: 0.3;
    }
  `;
}

customElements.define('item-grid', ItemGrid);
