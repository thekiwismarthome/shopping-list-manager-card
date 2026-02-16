import { LitElement, html, css } from 'lit';
import './slm-item-tile.js';

class SLMItemGrid extends LitElement {
  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object }
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

  getRecentlyUsedItems() {
    const recentKey = 'slm_recent_products';
    const saved = localStorage.getItem(recentKey);
    const recentIds = saved ? JSON.parse(saved) : [];
    
    const limit = this.settings?.recentProductsCount || 8;
    const currentProductIds = this.items.map(i => i.product_id);
    
    // Filter out products already in list
    const recentProducts = recentIds
      .filter(id => !currentProductIds.includes(id))
      .slice(0, limit);
    
    // TODO: Fetch actual product data from catalog
    // For now, return empty array
    return [];
  }

  render() {
    const groupedItems = this.groupItemsByCategory();
    const recentItems = this.getRecentlyUsedItems();
    const tilesPerRow = this.settings?.tilesPerRow || 3;

    return html`
      <style>
        .items-grid {
          grid-template-columns: repeat(${tilesPerRow}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${recentItems.length > 0 ? html`
          <div class="category-section">
            <div class="category-header">
              <span class="emoji">⏱️</span>
              <span class="category-name">Recently Used</span>
            </div>
            <div class="items-grid">
              ${recentItems.map(item => html`
                <slm-item-tile
                  .item=${item}
                  .categoryColor=${'#b0bec5'}
                  .isRecentlyUsed=${true}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        ` : ''}

        ${groupedItems.length === 0 && recentItems.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Search for products to add items</p>
          </div>
        ` : ''}

        ${groupedItems.map(group => html`
          <div class="category-section">
            <div class="category-header">
              <span class="emoji">${this.getCategoryEmoji(group.category.id)}</span>
              <span class="category-name">${group.category.name}</span>
            </div>
            <div class="items-grid">
              ${group.items.map(item => html`
                <slm-item-tile
                  .item=${item}
                  .categoryColor=${this.getPastelColor(group.category.color)}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        `)}
      </div>
    `;
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

  getPastelColor(color) {
    // Convert to pastel
    const pastelMap = {
      '#4CAF50': '#a5d6a7',
      '#2196F3': '#90caf9',
      '#F44336': '#ef9a9a',
      '#FF9800': '#ffcc80',
      '#9C27B0': '#ce93d8',
      '#795548': '#bcaaa4',
      '#607D8B': '#b0bec5'
    };
    return pastelMap[color] || color;
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

  static styles = css`
    .grid-container {
      padding: 4px;
    }
    .category-section {
      margin-bottom: 16px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 4px;
      font-weight: 600;
      font-size: 14px;
      color: var(--slm-text-secondary);
    }
    .emoji {
      font-size: 20px;
    }
    .category-name {
      flex: 1;
    }
    .items-grid {
      display: grid;
      gap: 4px;
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

customElements.define('slm-item-grid', SLMItemGrid);