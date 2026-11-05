import { t, I18nController } from '../services/translator.js';
import { LitElement, html, css } from 'lit';
import { fontInherit } from '../styles/ui-styles.js';
import './slm-item-tile.js';

class SLMItemGrid extends LitElement {
  _i18n = new I18nController(this);

  constructor() {
    super();
    this.uiStyle = 'classic';
    this._recentItems = [];
  }

  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object },
    api: { type: Object },
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    // Wall panel product picker: show only the add-item tiles (not the current list's items)
    pickerOnly: { type: Boolean },
    _recentItems: { type: Array, state: true }
  };

  updated(changedProperties) {
    if (changedProperties.has('items') || changedProperties.has('settings') || changedProperties.has('api')) {
      this._loadRecentItems();
    }
  }

  async _loadRecentItems() {
    if (!this.api || this.settings?.showRecentlyUsed === false) {
      this._recentItems = [];
      return;
    }

    const limit = this.settings?.recentProductsCount || 8;
    const currentProductIds = new Set(
      (this.items || []).filter(i => !i.checked).map(i => i.product_id).filter(Boolean)
    );

    try {
      // Step 1: recently-tracked products from localStorage (ordered by recency)
      const recentKey = 'slm_recent_products';
      const saved = localStorage.getItem(recentKey);
      const rawIds = saved ? JSON.parse(saved) : [];
      const filteredIds = [...new Set(rawIds)]
        .filter(id => !currentProductIds.has(id))
        .slice(0, limit);

      let recent = [];
      if (filteredIds.length > 0) {
        const result = await this.api.getProductsByIds(filteredIds);
        recent = result.products || [];
      }

      // Step 2: fill remaining slots with backend suggestions
      if (recent.length < limit) {
        const excludeIds = new Set([...currentProductIds, ...recent.map(p => p.id)]);
        const sugResult = await this.api.getProductSuggestions(limit + excludeIds.size);
        const suggestions = (sugResult.products || [])
          .filter(p => !excludeIds.has(p.id))
          .slice(0, limit - recent.length);
        recent = [...recent, ...suggestions];
      }

      this._recentItems = recent;
    } catch (err) {
      console.error('Failed to load recent items:', err);
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

  getCategoryColor(categoryId, backendColor) {
    const cssVal = getComputedStyle(this).getPropertyValue(`--slm-cat-${categoryId}`).trim();
    if (cssVal) return cssVal;
    if (backendColor) return backendColor;
    return getComputedStyle(this).getPropertyValue('--slm-accent-primary').trim() || '#9fa8da';
  }

  getRecentColor() {
    return getComputedStyle(this).getPropertyValue('--slm-cat-recent').trim() || '#9e9e9e';
  }

  getCategoryHeaderStyle(color) {
    // Fresh / Compact draw their own plain section labels (see styles below)
    if (this.uiStyle === 'fresh' || this.uiStyle === 'compact') return '';
    const { r, g, b } = this.hexToRgb(color);
    return `border-left: 4px solid ${color}; background: linear-gradient(to right, rgba(${r},${g},${b},0.22), rgba(${r},${g},${b},0.066)); border-radius: 0 8px 8px 0;`;
  }

  render() {
    const groupedItems = this.pickerOnly ? [] : this.groupItemsByCategory();
    const tilesPerRow = this.settings?.tilesPerRow || 3;
    return html`
      <style>
        .items-grid {
          grid-template-columns: repeat(${tilesPerRow}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${!this.pickerOnly && groupedItems.length === 0 && this._recentItems.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>${t('Your shopping list is empty')}</p>
            <p class="hint">${t('Search for products to add items')}</p>
          </div>
        ` : ''}

        ${groupedItems.map(group => {
          const color = this.getCategoryColor(group.category.id, group.category.color);
          return html`
            <div class="category-section">
              ${group.category.id !== '_alpha' ? html`
                <div class="category-header" style="${this.getCategoryHeaderStyle(color)}">
                  <span class="hdr-dot" style="background: ${color}"></span>
                  <span class="emoji">${this.getCategoryEmoji(group.category.id)}</span>
                  <span class="category-name" style="color: ${color}">${group.category.name}</span>
                  <span class="cat-count">${group.items.length}</span>
                </div>
              ` : ''}
              <div class="items-grid">
                ${group.items.map(item => html`
                  <slm-item-tile
                    .item=${item}
                    .categoryColor=${color}
                    .settings=${this.settings}
                    .uiStyle=${this.uiStyle}
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

        ${this.settings?.showRecentlyUsed !== false && this._recentItems.length > 0 ? html`
          <div class="category-section">
            ${(() => { const rc = this.getRecentColor(); return html`
              <div class="category-header" style="${this.getCategoryHeaderStyle(rc)}">
                <span class="hdr-dot" style="background: ${rc}"></span>
                <span class="emoji">⏱️</span>
                <span class="category-name" style="color: ${rc}">${t('Recently Used')}</span>
                <span class="cat-count">${this._recentItems.length}</span>
              </div>
              <div class="items-grid">
                ${this._recentItems.map(product => html`
                  <slm-item-tile
                    .item=${product}
                    .categoryColor=${rc}
                    .isRecentlyUsed=${true}
                    .settings=${this.settings}
                    .uiStyle=${this.uiStyle}
                    @add-item=${this.handleAddItem}
                  ></slm-item-tile>
                `)}
              </div>
            `; })()}
          </div>
        ` : ''}
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

  static styles = [css`
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
    .hdr-dot,
    .cat-count {
      display: none;
    }

    /* ---------- Fresh + Compact: plain section labels ---------- */
    :host([ui-style="fresh"]) .grid-container,
    :host([ui-style="compact"]) .grid-container {
      padding: 4px 16px;
    }
    :host([ui-style="fresh"]) .items-grid {
      gap: 10px;
    }
    :host([ui-style="compact"]) .items-grid {
      gap: 8px;
    }
    :host([ui-style="fresh"]) .category-section,
    :host([ui-style="compact"]) .category-section {
      margin-bottom: 8px;
    }
    :host([ui-style="fresh"]) .category-header,
    :host([ui-style="compact"]) .category-header {
      padding: 14px 2px 8px;
      margin: 0;
      gap: 8px;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    :host([ui-style="fresh"]) .emoji,
    :host([ui-style="compact"]) .emoji {
      display: none;
    }
    :host([ui-style="fresh"]) .hdr-dot,
    :host([ui-style="compact"]) .hdr-dot {
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    :host([ui-style="fresh"]) .category-name,
    :host([ui-style="compact"]) .category-name {
      flex: none;
      color: var(--slm-text-secondary) !important;
    }
    :host([ui-style="fresh"]) .cat-count,
    :host([ui-style="compact"]) .cat-count {
      display: inline;
      color: var(--slm-text-secondary);
      font-weight: 600;
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
  `, fontInherit];
}

customElements.define('slm-item-grid', SLMItemGrid);
