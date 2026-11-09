import { LitElement, html, css } from 'lit';
import { t, I18nController } from '../services/translator.js';
import { PRODUCT_ICON_MAP } from '../icons/product-icon-map.js';
import { PRODUCT_ICONS } from '../icons/product-icons.js';
import { fontInherit } from '../styles/ui-styles.js';

class SLMItemList extends LitElement {
  _i18n = new I18nController(this);

  static properties = {
    items: { type: Array },
    categories: { type: Array },
    settings: { type: Object },
    api: { type: Object },
    currencySymbol: { type: String },
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    _collapsed: { type: Object, state: true },
    _recentItems: { type: Array, state: true },
    _longPressTimer: { state: true },
    _longPressTriggered: { state: true }
  };

  constructor() {
    super();
    this.uiStyle = 'classic';
    this._collapsed = {};
    this._recentItems = [];
    this._longPressTimer = null;
    this._longPressTriggered = false;
    this.currencySymbol = '$';
  }

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

    // Exclude products already unchecked in the current list
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

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 159, g: 168, b: 218 };
  }

  getCategoryHeaderStyle(color) {
    // Fresh / Compact draw their own plain section labels (see styles below)
    if (this.uiStyle === 'fresh' || this.uiStyle === 'compact') return '';
    const { r, g, b } = this.hexToRgb(color);
    return `border-left: 4px solid ${color}; background: linear-gradient(to right, rgba(${r},${g},${b},0.22), rgba(${r},${g},${b},0.066)); border-radius: 0 8px 8px 0;`;
  }

  getCategoryColor(categoryId) {
    const cssVal = getComputedStyle(this).getPropertyValue(`--slm-cat-${categoryId}`).trim();
    if (cssVal) return cssVal;
    const cat = (this.categories || []).find(c => c.id === categoryId);
    return cat?.color || getComputedStyle(this).getPropertyValue('--slm-accent-primary').trim() || '#9fa8da';
  }

  _noteType(note) {
    if (!note) return null;
    return note.startsWith('[RM] ') ? 'recipe' : 'note';
  }

  getRecentColor() {
    return getComputedStyle(this).getPropertyValue('--slm-cat-recent').trim() || '#9e9e9e';
  }

  getCategoryEmoji(categoryId) {
    const emojiMap = {
      'produce': '🥬', 'dairy': '🥛', 'meat': '🥩', 'bakery': '🍞',
      'pantry': '🥫', 'frozen': '🧊', 'beverages': '🥤', 'snacks': '🍿',
      'household': '🧹', 'health': '💊', 'pet': '🐾', 'baby': '👶', 'other': '📦'
    };
    return emojiMap[categoryId] || '📦';
  }

  getProductEmoji(name, categoryId) {
    if (!name) return this.getCategoryEmoji(categoryId);
    const lower = name.toLowerCase();
    const productMap = {
      'chicken': '🍗', 'turkey': '🦃', 'duck': '🦆',
      'beef': '🥩', 'steak': '🥩', 'mince': '🥩', 'lamb': '🍖',
      'pork': '🥓', 'bacon': '🥓', 'ham': '🍖', 'sausage': '🌭', 'salami': '🍖',
      'fish': '🐟', 'salmon': '🐟', 'tuna': '🐟', 'prawn': '🦐', 'shrimp': '🦐',
      'egg': '🥚', 'eggs': '🥚',
      'milk': '🥛', 'cream': '🥛', 'yogurt': '🫙', 'yoghurt': '🫙',
      'cheese': '🧀', 'cheddar': '🧀', 'feta': '🧀', 'mozzarella': '🧀',
      'butter': '🧈',
      'bread': '🍞', 'toast': '🍞', 'bun': '🥖', 'roll': '🥖', 'bagel': '🥯',
      'loaf': '🍞', 'sourdough': '🍞', 'wrap': '🫓', 'croissant': '🥐',
      'apple': '🍎', 'orange': '🍊', 'banana': '🍌', 'grape': '🍇',
      'strawberry': '🍓', 'blueberry': '🫐', 'raspberry': '🍓',
      'lemon': '🍋', 'lime': '🍋', 'pineapple': '🍍', 'mango': '🥭',
      'watermelon': '🍉', 'melon': '🍈', 'peach': '🍑', 'pear': '🍐',
      'cherry': '🍒', 'kiwi': '🥝', 'avocado': '🥑',
      'tomato': '🍅', 'potato': '🥔', 'carrot': '🥕', 'broccoli': '🥦',
      'lettuce': '🥬', 'spinach': '🥬', 'salad': '🥗', 'kale': '🥬',
      'onion': '🧅', 'garlic': '🧄', 'corn': '🌽', 'pepper': '🫑',
      'cucumber': '🥒', 'mushroom': '🍄', 'eggplant': '🍆',
      'peas': '🫛', 'beans': '🫘', 'lentil': '🫘',
      'coffee': '☕', 'espresso': '☕', 'tea': '🍵', 'juice': '🧃',
      'water': '💧', 'beer': '🍺', 'wine': '🍷', 'soda': '🥤', 'cola': '🥤',
      'pasta': '🍝', 'noodle': '🍜', 'rice': '🍚', 'oat': '🌾', 'cereal': '🥣',
      'flour': '🌾', 'sugar': '🍬', 'salt': '🧂', 'honey': '🍯',
      'chocolate': '🍫', 'chips': '🥔', 'popcorn': '🍿', 'biscuit': '🍪',
      'cookie': '🍪', 'cake': '🎂', 'muffin': '🧁', 'ice cream': '🍦',
      'shampoo': '🧴', 'soap': '🧼', 'toothpaste': '🦷', 'toilet paper': '🧻',
      'nappy': '👶', 'diaper': '👶', 'pet food': '🐾',
    };
    for (const [key, emoji] of Object.entries(productMap)) {
      if (lower.includes(key)) return emoji;
    }
    return this.getCategoryEmoji(categoryId);
  }

  getBundledIcon(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const [keyword, slug] of Object.entries(PRODUCT_ICON_MAP)) {
      if (lower.includes(keyword) && PRODUCT_ICONS[slug]) {
        return PRODUCT_ICONS[slug];
      }
    }
    return null;
  }

  getLocalImageBasePath(name) {
    const basePath = this.settings?.localImagePath;
    if (!basePath || !name) return null;
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9']+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return `${basePath.replace(/\/$/, '')}/${slug}`;
  }

  groupItems() {
    const sortMode = this.settings?.sortMode || 'category';
    // The classic layout (embedded) only shows unchecked items. Designs A and B keep ticked items
    // visible, after the unchecked ones, so a mis-tap is easy to undo.
    const design = this.uiStyle === 'fresh' || this.uiStyle === 'compact';
    const unchecked = (this.items || []).filter(i => design || !i.checked);
    if (design) unchecked.sort((a, b) => Number(!!a.checked) - Number(!!b.checked));

    if (sortMode === 'alphabetical') {
      unchecked.sort((a, b) => (design ? Number(!!a.checked) - Number(!!b.checked) : 0) || a.name.localeCompare(b.name));
      return { mode: 'alpha', sections: [{ id: '_alpha', items: unchecked }] };
    }

    const grouped = {};
    (this.categories || []).forEach(cat => {
      const catItems = unchecked.filter(i => i.category_id === cat.id);
      if (catItems.length > 0) {
        grouped[cat.id] = { category: cat, items: catItems };
      }
    });

    return { mode: 'category', sections: Object.values(grouped) };
  }

  handleRowClick(e, item) {
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      return;
    }
    // Ignore clicks on the qty badge or decrease button
    if (e.target.closest('.list-decrease-btn') || e.target.closest('.list-qty-badge')) return;
    this.dispatchEvent(new CustomEvent('item-check', {
      detail: { itemId: item.id, checked: !item.checked },
      bubbles: true,
      composed: true
    }));
  }

  handleQtyClick(e, item) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: { itemId: item.id },
      bubbles: true,
      composed: true
    }));
  }

  handleDecrease(e, item) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('item-decrease', {
      detail: { itemId: item.id },
      bubbles: true,
      composed: true
    }));
  }

  handleRecentClick(product) {
    this.dispatchEvent(new CustomEvent('add-item', {
      detail: {
        name: product.name,
        category_id: product.category_id,
        product_id: product.id,
        quantity: 1,
        unit: product.default_unit || 'units',
        price: product.price || null,
        image_url: product.image_url || null,
        fromRecentlyUsed: true
      },
      bubbles: true,
      composed: true
    }));
  }

  handleMouseDown(item) {
    this._longPressTriggered = false;
    this._longPressTimer = setTimeout(() => {
      this._longPressTriggered = true;
      this.dispatchEvent(new CustomEvent('item-long-press', {
        detail: { item },
        bubbles: true,
        composed: true
      }));
    }, 500);
  }

  handleMouseUp() {
    if (this._longPressTimer) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
    }
  }

  renderRowIcon(name, categoryId, imageUrl) {
    const exts = ['webp', 'jpg', 'png', 'jpeg'];

    // 1. Explicit product image URL
    if (imageUrl) {
      return html`<img src="${imageUrl}" alt="${name}" class="row-img" />`;
    }
    // 2. Local HA image folder — try webp → jpg → png → jpeg via DOM src swap
    const localBase = this.getLocalImageBasePath(name);
    if (localBase) {
      return html`
        <img
          src="${localBase}.${exts[0]}"
          alt="${name}"
          class="row-img icon-img"
          @error=${(e) => {
            const src = e.target.getAttribute('src');
            const curExt = exts.find(ext => src.endsWith(`.${ext}`));
            const nextIdx = curExt !== undefined ? exts.indexOf(curExt) + 1 : exts.length;
            if (nextIdx < exts.length) {
              e.target.setAttribute('src', src.replace(`.${curExt}`, `.${exts[nextIdx]}`));
            } else {
              e.target.style.display = 'none';
              e.target.nextElementSibling?.style.removeProperty('display');
            }
          }}
        /><span class="row-emoji" style="display:none">${this.getProductEmoji(name, categoryId)}</span>
      `;
    }
    // 3. Bundled icons8 icon
    const bundled = this.getBundledIcon(name);
    if (bundled) {
      return html`<img src="${bundled}" alt="${name}" class="row-img icon-img" />`;
    }
    // 4. Emoji fallback
    return html`<span class="row-emoji">${this.getProductEmoji(name, categoryId)}</span>`;
  }

  _qtyLabel(item) {
    const unit = item.unit && item.unit !== 'units' ? ` ${item.unit}` : '';
    return `${item.quantity}${unit}`;
  }

  _rowEvents(item) {
    return {
      click: (e) => this.handleRowClick(e, item),
      down: () => this.handleMouseDown(item),
    };
  }

  // Design A row: product icon in a tinted tile, name + "qty · price", − n + stepper
  renderRowFresh(item) {
    const color = this.getCategoryColor(item.category_id);
    const showPrice = this.settings?.showPriceOnTile !== false;
    const sub = `${this._qtyLabel(item)}${showPrice && item.price ? ` · ${this.currencySymbol}${(item.price * item.quantity).toFixed(2)}` : ''}`;
    return html`
      <div
        class="list-row ${item._pending ? 'pending-row' : ''} ${item.checked ? 'checked-row' : ''}"
        style="--rc: ${color}"
        @click=${(e) => this.handleRowClick(e, item)}
        @mousedown=${() => this.handleMouseDown(item)}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
        @touchstart=${() => this.handleMouseDown(item)}
        @touchend=${this.handleMouseUp}
      >
        <div class="row-icon">
          ${item.checked
            ? html`<ha-icon icon="mdi:check"></ha-icon>`
            : this.renderRowIcon(item.name, item.category_id, item.image_url)}
        </div>
        <div class="row-middle">
          <div class="row-name">${item.name}</div>
          <div class="row-sub">${item.checked ? t('In basket') : sub}</div>
        </div>
        ${item.checked ? html`
          <button class="undo" @click=${(e) => this.handleRowClick(e, item)}>${t('Undo')}</button>
        ` : html`
          <div class="stepper">
            <button class="st-btn" aria-label="${t('Decrease')} ${item.name}" @click=${(e) => this.handleDecrease(e, item)}>
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>
            <span class="st-qty">${item.quantity}</span>
            <button class="st-btn" aria-label="${t('Increase')} ${item.name}" @click=${(e) => this.handleQtyClick(e, item)}>
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
        `}
      </div>
    `;
  }

  // Design B row: checkbox, "name · qty", price
  renderRowCompact(item) {
    const color = this.getCategoryColor(item.category_id);
    const showPrice = this.settings?.showPriceOnTile !== false;
    return html`
      <div
        class="list-row ${item._pending ? 'pending-row' : ''} ${item.checked ? 'checked-row' : ''}"
        style="--rc: ${color}"
        @click=${(e) => this.handleRowClick(e, item)}
        @mousedown=${() => this.handleMouseDown(item)}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
        @touchstart=${() => this.handleMouseDown(item)}
        @touchend=${this.handleMouseUp}
      >
        <span class="cbx ${item.checked ? 'on' : ''}" aria-hidden="true">
          ${item.checked ? html`<ha-icon icon="mdi:check-bold"></ha-icon>` : ''}
        </span>
        <div class="row-middle">
          <span class="row-name">${item.name}</span>
          <span class="row-qty">· ${this._qtyLabel(item)}</span>
        </div>
        ${showPrice && item.price ? html`
          <span class="row-price">${this.currencySymbol}${(item.price * item.quantity).toFixed(2)}</span>
        ` : ''}
      </div>
    `;
  }

  renderRow(item) {
    if (this.uiStyle === 'fresh') return this.renderRowFresh(item);
    if (this.uiStyle === 'compact') return this.renderRowCompact(item);
    return this.renderRowClassic(item);
  }

  renderRowClassic(item) {
    const color = this.getCategoryColor(item.category_id);
    const { r, g, b } = this.hexToRgb(color);
    const showPrice = this.settings?.showPriceOnTile !== false;
    const noteType = this._noteType(item.note);
    const noteTitle = item.note?.replace('[RM] ', '') ?? '';

    return html`
      <div
        class="list-row ${item._pending ? 'pending-row' : ''}"
        style="--rc: ${color}"
        @click=${(e) => this.handleRowClick(e, item)}
        @mousedown=${() => this.handleMouseDown(item)}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
        @touchstart=${() => this.handleMouseDown(item)}
        @touchend=${this.handleMouseUp}
      >
        <div class="row-left">
          ${noteType === 'recipe' ? html`
            <ha-icon class="note-dot recipe-dot" icon="mdi:chef-hat" title="${noteTitle}"></ha-icon>
          ` : noteType === 'note' ? html`
            <ha-icon class="note-dot info-dot" icon="mdi:information-variant-circle-outline" title="${noteTitle}"></ha-icon>
          ` : html`
            <div class="cat-dot" style="background: ${color}"></div>
          `}
          <div class="row-icon">
            ${this.renderRowIcon(item.name, item.category_id, item.image_url)}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${item.name}</div>
          ${showPrice && item.price ? html`
            <div class="row-price">${this.currencySymbol}${(item.price * item.quantity).toFixed(2)}</div>
          ` : ''}
        </div>

        <div class="row-right">
          <button
            class="list-decrease-btn"
            style="background: rgba(${r},${g},${b},0.15); color: ${color};"
            @click=${(e) => this.handleDecrease(e, item)}
          >−</button>
          <div
            class="list-qty-badge"
            style="background: ${color}"
            @click=${(e) => this.handleQtyClick(e, item)}
          >${item.quantity}</div>
        </div>
      </div>
    `;
  }

  renderRecentRow(product) {
    const recentColor = this.getRecentColor();
    const showPrice = this.settings?.showPriceOnTile !== false;
    const design = this.uiStyle === 'fresh' || this.uiStyle === 'compact';

    if (this.uiStyle === 'fresh') {
      return html`
        <div class="list-row recent-row" style="--rc: ${recentColor}" @click=${() => this.handleRecentClick(product)}>
          <div class="row-icon">${this.renderRowIcon(product.name, product.category_id, product.image_url)}</div>
          <div class="row-middle">
            <div class="row-name">${product.name}</div>
            ${showPrice && product.price ? html`<div class="row-sub">${this.currencySymbol}${product.price.toFixed(2)}</div>` : ''}
          </div>
          <span class="add-pill" aria-hidden="true"><ha-icon icon="mdi:plus"></ha-icon></span>
        </div>
      `;
    }
    if (this.uiStyle === 'compact') {
      return html`
        <div class="list-row recent-row" style="--rc: ${recentColor}" @click=${() => this.handleRecentClick(product)}>
          <span class="cbx add" aria-hidden="true"><ha-icon icon="mdi:plus"></ha-icon></span>
          <div class="row-middle"><span class="row-name">${product.name}</span></div>
          ${showPrice && product.price ? html`<span class="row-price">${this.currencySymbol}${product.price.toFixed(2)}</span>` : ''}
        </div>
      `;
    }
    return html`
      <div
        class="list-row recent-row"
        style="--rc: ${recentColor}"
        @click=${() => this.handleRecentClick(product)}
      >
        <div class="row-left">
          <div class="cat-dot" style="background: ${recentColor}"></div>
          <div class="row-icon">
            ${this.renderRowIcon(product.name, product.category_id, product.image_url)}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${product.name}</div>
          ${showPrice && product.price ? html`
            <div class="row-price">${this.currencySymbol}${product.price.toFixed(2)}</div>
          ` : ''}
        </div>

        <div class="row-right">
          <div class="list-qty-badge recent-add" style="background: ${recentColor}">+</div>
        </div>
      </div>
    `;
  }

  _toggleCollapse(id) {
    this._collapsed = { ...this._collapsed, [id]: !this._collapsed[id] };
  }

  // Section header. B lets you collapse a category by tapping it.
  _renderHeader(id, color, emoji, label, count) {
    const collapsible = this.uiStyle === 'compact';
    const open = !this._collapsed[id];
    const inner = html`
      <span class="hdr-dot" style="background: ${color}"></span>
      <span class="cat-emoji">${emoji}</span>
      <span class="cat-name" style="color: ${color}">${label}</span>
      <span class="cat-count">${count}</span>
      ${collapsible ? html`<ha-icon class="hdr-chev" icon=${open ? 'mdi:chevron-down' : 'mdi:chevron-right'}></ha-icon>` : ''}
    `;
    return collapsible
      ? html`<button class="category-header" aria-expanded=${open ? 'true' : 'false'} @click=${() => this._toggleCollapse(id)}>${inner}</button>`
      : html`<div class="category-header" style="${this.getCategoryHeaderStyle(color)}">${inner}</div>`;
  }

  render() {
    const { mode, sections } = this.groupItems();
    const showRecent = this.settings?.showRecentlyUsed !== false;
    const recentColor = this.getRecentColor();
    const isEmpty = sections.every(s => s.items.length === 0) && (!showRecent || this._recentItems.length === 0);

    if (isEmpty) {
      return html`
        <div class="empty">
          <div class="empty-emoji">🛒</div>
          <p>${t('Your shopping list is empty')}</p>
          <p class="hint">Search for products to add items</p>
        </div>
      `;
    }

    return html`
      <div class="list-container">

        ${sections.map(section => {
          const catColor = mode === 'category' ? this.getCategoryColor(section.category.id) : '';
          const id = mode === 'category' ? section.category.id : '_alpha';
          return html`
          <div class="list-section">
            ${mode === 'category'
              ? this._renderHeader(id, catColor, this.getCategoryEmoji(section.category.id), section.category.name, section.items.length)
              : ''}
            ${this._collapsed[id] ? '' : html`<div class="rows">${section.items.map(item => this.renderRow(item))}</div>`}
          </div>
        `;})}


        ${showRecent && this._recentItems.length > 0 ? html`
          <div class="list-section">
            ${this._renderHeader('_recent', recentColor, '⏱️', t('Recently Used'), this._recentItems.length)}
            ${this._collapsed['_recent'] ? '' : html`<div class="rows">${this._recentItems.map(product => this.renderRecentRow(product))}</div>`}
          </div>
        ` : ''}

      </div>
    `;
  }

  static styles = [css`
    :host {
      font-size: var(--slm-font-size-base, 16px);
      font-weight: var(--slm-font-weight-base, 400);
    }
    .list-container {
      padding: 4px;
    }
    .list-section {
      margin-bottom: 12px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      margin-bottom: 4px;
      font-weight: 700;
      font-size: 15px;
    }
    .cat-emoji {
      font-size: 18px;
    }
    .cat-name {
      flex: 1;
      font-weight: 700;
    }
    .list-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      transition: background 0.1s;
      -webkit-tap-highlight-color: transparent;
    }
    .list-row:active {
      background: var(--secondary-background-color, rgba(0,0,0,0.05));
    }
    .recent-row {
      opacity: 0.75;
    }
    .pending-row {
      opacity: 0.6;
      pointer-events: none;
    }
    .row-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .cat-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .note-dot {
      --mdc-icon-size: 16px;
      flex-shrink: 0;
    }
    .recipe-dot { color: var(--slm-accent-primary, #9fa8da); }
    .info-dot { color: var(--slm-text-secondary, #aaa); }
    .row-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      flex-shrink: 0;
    }
    .row-img {
      width: 36px;
      height: 36px;
      object-fit: cover;
    }
    .icon-img {
      object-fit: contain;
    }
    .row-emoji {
      font-size: 24px;
      line-height: 1;
    }
    .row-middle {
      flex: 1;
      min-width: 0;
    }
    .row-name {
      font-weight: var(--slm-font-weight-base, 600);
      font-size: 0.875em;
      color: var(--slm-text-primary, #e0e0e0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-price {
      font-size: 0.75em;
      color: var(--slm-accent-primary, #9fa8da);
      font-weight: 600;
      margin-top: 1px;
    }
    .row-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .list-decrease-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .list-qty-badge {
      min-width: 32px;
      height: 32px;
      border-radius: 8px;
      color: white;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .recent-add {
      font-size: 20px;
      cursor: default;
    }
    .hdr-dot,
    .cat-count,
    .hdr-chev,
    .stepper,
    .undo,
    .cbx,
    .add-pill {
      display: none;
    }
    button.category-header {
      width: 100%;
      border: none;
      background: transparent;
      color: inherit;
      text-align: left;
      cursor: pointer;
    }

    /* ---------- Designs A (fresh) and B (compact) ---------- */
    :host([ui-style="fresh"]) .list-container,
    :host([ui-style="compact"]) .list-container {
      padding: 4px 20px 8px;
    }
    :host([ui-style="fresh"]) .category-header,
    :host([ui-style="compact"]) .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;
      padding: 14px 4px 6px;
      margin: 0;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      box-sizing: border-box;
    }
    :host([ui-style="fresh"]) .cat-emoji,
    :host([ui-style="compact"]) .cat-emoji {
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
    :host([ui-style="fresh"]) .cat-name,
    :host([ui-style="compact"]) .cat-name {
      flex: none;
      color: var(--slm-text-secondary) !important;
    }
    :host([ui-style="fresh"]) .cat-count,
    :host([ui-style="compact"]) .cat-count {
      display: inline;
      flex: 1;
      color: var(--slm-text-secondary);
      font-weight: 600;
    }
    :host([ui-style="compact"]) .hdr-chev {
      display: inline-flex;
      --mdc-icon-size: 16px;
      color: var(--slm-text-secondary);
    }
    :host([ui-style="fresh"]) .list-row,
    :host([ui-style="compact"]) .list-row {
      border-radius: 0;
      border-bottom: 1px solid var(--slm-line-soft, var(--slm-border-subtle));
      color: var(--slm-text-primary);
    }
    :host([ui-style="fresh"]) .list-row:last-child,
    :host([ui-style="compact"]) .list-row:last-child {
      border-bottom: none;
    }
    :host([ui-style="fresh"]) .row-name,
    :host([ui-style="compact"]) .row-name {
      font-size: 1em;
      font-weight: 700;
    }
    .row-sub {
      font-size: 0.83em;
      font-weight: 500;
      color: var(--slm-text-secondary);
    }
    .list-row.checked-row .row-name {
      text-decoration: line-through;
      color: var(--slm-text-secondary);
    }

    /* A: each category is a card */
    .rows {
      display: contents;
    }
    :host([ui-style="fresh"]) .list-section {
      margin-bottom: 8px;
    }
    :host([ui-style="fresh"]) .rows {
      display: block;
      background: var(--slm-bg-surface);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 22px;
      padding: 2px 14px;
    }
    :host([ui-style="fresh"]) .rows > .list-row {
      padding: 10px 0;
      gap: 12px;
      min-height: 64px;
    }
    :host([ui-style="fresh"]) .row-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: color-mix(in srgb, var(--rc, var(--slm-accent-primary)) 16%, var(--slm-bg-surface));
      color: var(--rc);
    }
    :host([ui-style="fresh"]) .row-img {
      width: 34px;
      height: 34px;
    }
    :host([ui-style="fresh"]) .row-emoji {
      font-size: 26px;
    }
    :host([ui-style="fresh"]) .checked-row .row-icon {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-secondary);
    }
    :host([ui-style="fresh"]) .stepper {
      display: flex;
      align-items: center;
      flex: none;
      padding: 2px;
      border-radius: 999px;
      background: var(--slm-bg-main);
    }
    .st-btn {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--slm-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .st-btn ha-icon {
      --mdc-icon-size: 16px;
      color: inherit;
    }
    .st-qty {
      min-width: 18px;
      text-align: center;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    :host([ui-style="fresh"]) .undo {
      display: block;
      flex: none;
      min-height: 36px;
      padding: 0 14px;
      border-radius: 999px;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      font-weight: 700;
      font-size: 0.87em;
      cursor: pointer;
    }
    :host([ui-style="fresh"]) .add-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--slm-accent-soft);
      color: var(--slm-accent-text);
    }
    .add-pill ha-icon {
      --mdc-icon-size: 18px;
      color: inherit;
    }

    /* B: flat hairline list with checkboxes */
    :host([ui-style="compact"]) .list-row {
      min-height: 54px;
      padding: 0;
      gap: 14px;
    }
    :host([ui-style="compact"]) .row-name {
      font-weight: 500;
      font-size: 1.07em;
    }
    .row-qty {
      font-size: 0.93em;
      color: var(--slm-text-secondary);
      margin-left: 2px;
    }
    :host([ui-style="compact"]) .row-middle {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex-wrap: wrap;
    }
    :host([ui-style="compact"]) .row-price {
      flex: none;
      margin: 0;
      font-size: 0.93em;
      font-weight: 500;
      color: var(--slm-text-secondary);
      font-variant-numeric: tabular-nums;
    }
    :host([ui-style="compact"]) .cbx {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 24px;
      height: 24px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 2px solid var(--slm-text-muted, var(--slm-text-secondary));
      color: var(--slm-accent-ink, #fff);
    }
    :host([ui-style="compact"]) .cbx.on {
      border-color: var(--slm-accent-primary);
      background: var(--slm-accent-primary);
    }
    :host([ui-style="compact"]) .cbx.add {
      border-style: dashed;
      color: var(--slm-text-secondary);
    }
    .cbx ha-icon {
      --mdc-icon-size: 16px;
      color: inherit;
    }
    :host([ui-style="compact"]) .list-row.checked-row .row-qty,
    :host([ui-style="compact"]) .list-row.checked-row .row-price {
      text-decoration: line-through;
    }
    .list-row.checked-row {
      opacity: 0.6;
    }
    :host([ui-style="fresh"]) .list-section > .list-row.recent-row,
    :host([ui-style="compact"]) .recent-row {
      opacity: 1;
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

customElements.define('slm-item-list', SLMItemList);
