import { LitElement, html, css } from 'lit';
import './slm-item-tile.js';

class SLMItemGrid extends LitElement {
  constructor() {
    super();
    this._recentItems = [];
  }

  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object },
    api: { type: Object },
    _recentItems: { type: Array, state: true }
  };

  updated(changedProperties) {
    if (changedProperties.has('items') || changedProperties.has('settings') || changedProperties.has('api')) {
      this._loadRecentItems();
    }
  }

  async _loadRecentItems() {
    console.log('[SLM grid] _loadRecentItems', { api: !!this.api, showRecentlyUsed: this.settings?.showRecentlyUsed, items: this.items?.length });
    if (!this.api || this.settings?.showRecentlyUsed === false) {
      this._recentItems = [];
      return;
    }

    const limit = this.settings?.recentProductsCount || 8;
    const currentProductIds = new Set(
      (this.items || []).filter(i => !i.checked).map(i => i.product_id).filter(Boolean)
    );
    console.log('[SLM grid] currentProductIds:', [...currentProductIds]);

    try {
      const recentKey = 'slm_recent_products';
      const saved = localStorage.getItem(recentKey);
      const rawIds = saved ? JSON.parse(saved) : [];
      const filteredIds = [...new Set(rawIds)].filter(id => !currentProductIds.has(id)).slice(0, limit);
      console.log('[SLM grid] localStorage ids:', rawIds.length, '→ filtered:', filteredIds.length);

      if (filteredIds.length > 0) {
        const result = await this.api.getProductsByIds(filteredIds);
        this._recentItems = result.products || [];
        console.log('[SLM grid] from localStorage:', this._recentItems.length);
        return;
      }

      console.log('[SLM grid] falling back to suggestions');
      const result = await this.api.getProductSuggestions(limit + currentProductIds.size);
      console.log('[SLM grid] suggestions raw:', result);
      this._recentItems = (result.products || []).filter(p => !currentProductIds.has(p.id)).slice(0, limit);
      console.log('[SLM grid] suggestions after filter:', this._recentItems.length);
    } catch (err) {
      console.error('[SLM grid] Failed:', err);
      this._recentItems = [];
    }
  }

  groupItemsByCategory() {
    const sortMode = this.settings?.sortMode || 'category';

    if (sortMode === 'alphabetical') {
      const unchecked = (this.items || []).filter(item => !item.checked);
      unchecked.sort((a, b) => a.name.localeCompare(b.name));
      return [{ category: { id: '_alpha', name: null, color: '#9fa8da' }, items: unchecked }];
    }

    const grouped = {};
    (this.categories || []).forEach(cat => {
      grouped[cat.id] = {
        category: cat,
        items: (this.items || []).filter(item => item.category_id === cat.id && !item.checked)
      };
    });

    return Object.values(grouped).filter(g => g.items.length > 0);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 159, g: 168, b: 218 };
  }

  getCategoryHeaderStyle(color) {
    const { r, g, b } = this.hexToRgb(color);
    return `border-left: 4px solid ${color}; background: linear-gradient(to right, rgba(${r},${g},${b},0.22), rgba(${r},${g},${b},0.066)); border-radius: 0 8px 8px 0;`;
  }

  render() {
    const groupedItems = this.groupItemsByCategory();
    const tilesPerRow = this.settings?.tilesPerRow || 3;
    const recentColor = '#9e9e9e';

    return html`
      <style>
        .items-grid {
          grid-template-columns: repeat(${tilesPerRow}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${this.settings?.showRecentlyUsed !== false && this._recentItems.length > 0 ? html`
          <div class="category-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle(recentColor)}">
              <span class="emoji">⏱️</span>
              <span class="category-name" style="color: ${recentColor}">Recently Used</span>
            </div>
            <div class="items-grid">
              ${this._recentItems.map(product => html`
                <slm-item-tile
                  .item=${product}
                  .categoryColor=${recentColor}
                  .isRecentlyUsed=${true}
                  .settings=${this.settings}
                  @add-item=${this.handleAddItem}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        ` : ''}

        ${groupedItems.length === 0 && this._recentItems.length === 0 ? html`
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
              ${group.category.id !== '_alpha' ? html`
                <div class="category-header" style="${this.getCategoryHeaderStyle(color)}">
                  <span class="emoji">${this.getCategoryEmoji(group.category.id)}</span>
                  <span class="category-name" style="color: ${color}">${group.category.name}</span>
                </div>
              ` : ''}
              <div class="items-grid">
                ${group.items.map(item => html`
                  <slm-item-tile
                    .item=${item}
                    .categoryColor=${color}
                    .settings=${this.settings}
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

  handleAddItem(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('add-item', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  handleItemClick(e) {
    e.stopPropagation();
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
