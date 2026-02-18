import { LitElement, html, css } from 'lit';
import './slm-item-tile.js';

class SLMItemGrid extends LitElement {
  constructor() {
    super();
    console.log("GRID CONSTRUCTOR");
  }

  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object },
    api: { type: Object },
    recentItems: { type: Array }
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

  async getRecentlyUsedItems() {
    if (!this.api) return [];

    const recentKey = 'slm_recent_products';
    const saved = localStorage.getItem(recentKey);
    const recentIds = saved ? JSON.parse(saved) : [];

    const limit = this.settings?.recentProductsCount || 8;

    const currentProductIds = this.items.map(i => i.product_id);

    const filteredIds = recentIds
      .filter(id => !currentProductIds.includes(id))
      .slice(0, limit);

    if (filteredIds.length === 0) return [];

    const products = await Promise.all(
      filteredIds.map(id => this.api.getProductSuggestions(1))
    );

    return products.flatMap(p => p.products || []);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 159, g: 168, b: 218 };
  }

  getCategoryHeaderStyle(color) {
    const { r, g, b } = this.hexToRgb(color);
    return `border-left: 4px solid ${color}; background: linear-gradient(to right, rgba(${r},${g},${b},0.22), rgba(${r},${g},${b},0.165)); border-radius: 0 8px 8px 0;`;
  }

  render() {
    const groupedItems = this.groupItemsByCategory();
    const recentItems = this.getRecentlyUsedItems();
    const tilesPerRow = this.settings?.tilesPerRow || 3;
    const recentColor = '#9e9e9e';

    return html`
      <style>
        .items-grid {
          grid-template-columns: repeat(${tilesPerRow}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${recentItems.length > 0 ? html`
          <div class="category-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle(recentColor)}">
              <span class="emoji">⏱️</span>
              <span class="category-name" style="color: ${recentColor}">Recently Used</span>
            </div>
            <div class="items-grid">
              ${recentItems.map(item => html`
                <slm-item-tile
                  .item=${item}
                  .categoryColor=${recentColor}
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

        ${groupedItems.map(group => {
          const color = group.category.color || '#9fa8da';
          return html`
            <div class="category-section">
              <div class="category-header" style="${this.getCategoryHeaderStyle(color)}">
                <span class="emoji">${this.getCategoryEmoji(group.category.id)}</span>
                <span class="category-name" style="color: ${color}">${group.category.name}</span>
              </div>
              <div class="items-grid">
                ${group.items.map(item => html`
                  <slm-item-tile
                    .item=${item}
                    .categoryColor=${color}
                    @item-click=${this.handleItemClick}
                    @item-decrease=${this.handleItemDecrease}
                    @item-check=${this.handleItemCheck}
                    @item-long-press=${this.handleItemLongPress}
                    @item-swipe-delete=${this.handleItemSwipeDelete}
                  ></slm-item-tile>
                `)}
              </div>
            </div>
          `;
        })}
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

  handleItemClick(e) {
    e.stopPropagation();
    console.log("GRID RECEIVED ITEM CLICK");
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemDecrease(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-decrease', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemCheck(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemLongPress(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-long-press', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemSwipeDelete(e) {
    e.stopPropagation();
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
      padding: 8px 12px;
      margin-bottom: 6px;
      font-weight: 700;
      font-size: 16px;
    }
    .emoji {
      font-size: 20px;
    }
    .category-name {
      flex: 1;
      font-weight: 700;
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
