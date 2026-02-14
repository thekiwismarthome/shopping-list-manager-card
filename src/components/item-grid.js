import { LitElement, html, css } from 'lit';
import './item-tile.js';

class ItemGrid extends LitElement {
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
    const recentKey = 'recently_used_products';
    const saved = localStorage.getItem(recentKey);
    const recentIds = saved ? JSON.parse(saved) : [];
    
    const limit = this.settings?.recentProductsCount || 8;
    const tilesPerRow = this.settings?.tilesPerRow || 3;
    
    // Get recent products that aren't in current list
    const currentProductIds = this.items.map(i => i.product_id);
    const recentProducts = recentIds
      .filter(id => !currentProductIds.includes(id))
      .slice(0, limit);
    
    // Group by category
    const grouped = {};
    recentProducts.forEach(productId => {
      // Mock product data - in real implementation, fetch from product catalog
      const product = {
        id: productId,
        name: 'Recent Product',
        category_id: 'other',
        quantity: 1,
        unit: 'units',
        checked: false
      };
      
      if (!grouped[product.category_id]) {
        grouped[product.category_id] = [];
      }
      grouped[product.category_id].push(product);
    });
    
    // Flatten to single array, filling rows
    const items = [];
    Object.values(grouped).forEach(categoryItems => {
      items.push(...categoryItems);
    });
    
    return items;
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
    const recentItems = this.getRecentlyUsedItems();
    const tilesPerRow = this.settings?.tilesPerRow || 3;
    const tileMinWidth = tilesPerRow === 3 ? '100px' : tilesPerRow === 4 ? '80px' : '120px';

    return html`
      <style>
        .items-grid {
          grid-template-columns: repeat(${tilesPerRow}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${recentItems.length > 0 ? html`
          <div class="category-section">
            <div class="category-header" style="border-color: #b0bec5">
              <div class="emoji">⏱️</div>
              <span>Recently Used</span>
              <span class="count">${recentItems.length}</span>
            </div>
            <div class="items-grid">
              ${recentItems.map(item => html`
                <item-tile
                  .item=${item}
                  .categoryColor=${'#b0bec5'}
                  .isRecentlyUsed=${true}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></item-tile>
              `)}
            </div>
          </div>
        ` : ''}

        ${groupedItems.length === 0 && recentItems.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Tap the + button to add items</p>
          </div>
        ` : ''}

        ${groupedItems.map(group => html`
          <div class="category-section">
            <div class="category-header" style="border-color: ${group.category.color}">
              <div class="emoji">${this.getCategoryEmoji(group.category.id)}</div>
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
    .emoji {
      font-size: 24px;
    }
    .count {
      margin-left: auto;
      background: linear-gradient(135deg, #a8b5ff 0%, #c5b8e8 100%);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
    }
    .items-grid {
      display: grid;
      gap: 12px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--secondary-text-color);
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

customElements.define('item-grid', ItemGrid);