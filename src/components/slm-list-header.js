import { LitElement, html, css } from 'lit';
import { t, I18nController } from '../services/translator.js';
import { TILE_CHOICES } from '../services/tiles.js';
import { fontInherit } from '../styles/ui-styles.js';

class SLMListHeader extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    activeList: { type: Object },
    itemCount: { type: Number },
    settings: { type: Object },
    // Embedded in another card (e.g. Recipe Manager Card) that already shows the
    // back button, title and wake-lock toggle: render only Share + the menu.
    compact: { type: Boolean, reflect: true },
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    // Estimated total of the list, shown in the "compact" style subtitle
    totalAmount: { type: Number },
    currencySymbol: { type: String },
    _menuOpen: { type: Boolean, state: true },
    _wakeLockActive: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.uiStyle = 'classic';
    this.totalAmount = 0;
    this.currencySymbol = '$';
    this._menuOpen = false;
    this._wakeLockActive = false;
    this._wakeLock = null;
    this._boundCloseMenu = this._closeMenu.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundCloseMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundCloseMenu);
  }

  _closeMenu(e) {
    if (this._menuOpen && !this.shadowRoot.contains(e.target)) {
      this._menuOpen = false;
    }
  }

  handleBack() {
    this.dispatchEvent(new CustomEvent('back', {
      bubbles: true,
      composed: true
    }));
  }

  handleShare() {
    this.dispatchEvent(new CustomEvent('share', {
      bubbles: true,
      composed: true
    }));
  }

  async _toggleWakeLock() {
    if (!('wakeLock' in navigator)) return;
    if (this._wakeLockActive) {
      await this._wakeLock?.release();
      this._wakeLock = null;
      this._wakeLockActive = false;
    } else {
      try {
        this._wakeLock = await navigator.wakeLock.request('screen');
        this._wakeLockActive = true;
        this._wakeLock.addEventListener('release', () => {
          this._wakeLockActive = false;
          this._wakeLock = null;
          this.requestUpdate();
        });
      } catch (err) {
        console.warn('[SLM] Wake lock failed:', err);
      }
    }
  }

  handleMenuToggle(e) {
    e.stopPropagation();
    this._menuOpen = !this._menuOpen;
  }

  _dispatchSetting(key, value) {
    this.dispatchEvent(new CustomEvent('menu-setting-change', {
      detail: { key, value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (this.uiStyle === 'fresh') return this._renderFresh();
    if (this.uiStyle === 'compact') return this._renderCompact();
    return this._renderClassic();
  }

  _emit(name) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  // Design A: list switcher pill, search button, options button (opens the sheet)
  _renderFresh() {
    return html`
      <div class="header">
        <button class="switcher" @click=${this.handleBack} aria-label=${t('Lists')}>
          <span class="chip-ico"><ha-icon icon="mdi:cart-outline"></ha-icon></span>
          <span class="switch-title">${this.activeList?.name || t('Shopping List')}</span>
          <ha-icon class="muted" icon="mdi:chevron-down"></ha-icon>
        </button>
        <button class="round" aria-label=${t('Search products…')} @click=${() => this._emit('search-toggle')}>
          <ha-icon icon="mdi:magnify"></ha-icon>
        </button>
        <button class="round" aria-label=${t('List options')} @click=${() => this._emit('open-options')}>
          <ha-icon icon="mdi:tune-variant"></ha-icon>
        </button>
      </div>
    `;
  }

  // Design B: bold title with summary line, search button, dropdown menu
  _renderCompact() {
    const s = this.settings || {};
    const viewMode = s.viewMode || 'tile';
    const sortMode = s.sortMode || 'category';
    const showRecent = s.showRecentlyUsed !== false;
    const showPrice = s.showPriceOnTile !== false;
    const wake = 'wakeLock' in navigator;
    const tiles = s.tilesPerRow == null ? 'auto' : s.tilesPerRow;
    const tileChoices = TILE_CHOICES.includes(tiles) ? TILE_CHOICES : [...TILE_CHOICES, tiles];
    const sw = (on) => html`<span class="sw ${on ? 'on' : ''}" aria-hidden="true"></span>`;
    return html`
      <div class="header">
        <button class="title-btn" @click=${this.handleBack} aria-label=${t('Lists')}>
          <span class="title-line">${this.activeList?.name || t('Shopping List')}<ha-icon class="muted" icon="mdi:chevron-down"></ha-icon></span>
          <span class="subtitle">${this.itemCount} ${t('left')} · ${this.currencySymbol}${Number(this.totalAmount || 0).toFixed(2)}</span>
        </button>
        <button class="round" aria-label=${t('Search products…')} @click=${() => this._emit('search-toggle')}>
          <ha-icon icon="mdi:magnify"></ha-icon>
        </button>
        <div class="menu-wrap">
          <button class="round" aria-label=${t('List options')} aria-expanded=${this._menuOpen ? 'true' : 'false'} @click=${this.handleMenuToggle}>
            <ha-icon icon="mdi:dots-horizontal"></ha-icon>
          </button>
          ${this._menuOpen ? html`
            <div class="menu-dropdown" role="menu" @click=${e => e.stopPropagation()}>
              <div class="menu-section-label">${t('View')}</div>
              <div class="seg">
                <button aria-pressed=${viewMode === 'list' ? 'true' : 'false'} @click=${() => { this._dispatchSetting('viewMode', 'list'); this._menuOpen = false; }}><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${t('List')}</button>
                <button aria-pressed=${viewMode === 'tile' ? 'true' : 'false'} @click=${() => { this._dispatchSetting('viewMode', 'tile'); this._menuOpen = false; }}><ha-icon icon="mdi:view-grid-outline"></ha-icon>${t('Tiles')}</button>
              </div>
              ${viewMode === 'tile' ? html`
                <div class="menu-section-label">${t('Tiles per row')}</div>
                <div class="seg" role="radiogroup" aria-label=${t('Tiles per row')}>
                  ${tileChoices.map(c => html`
                    <button role="radio" aria-checked=${tiles === c ? 'true' : 'false'} aria-pressed=${tiles === c ? 'true' : 'false'}
                            @click=${() => this._dispatchSetting('tilesPerRow', c)}>${c === 'auto' ? t('Auto') : c}</button>
                  `)}
                </div>
              ` : ''}
              <div class="menu-divider"></div>
              <div class="menu-section-label">${t('Sort')}</div>
              <button role="menuitemradio" aria-checked=${sortMode === 'category' ? 'true' : 'false'} class="item ${sortMode === 'category' ? 'sel' : ''}" @click=${() => { this._dispatchSetting('sortMode', 'category'); this._menuOpen = false; }}>
                <span>${t('By Category')}</span>${sortMode === 'category' ? html`<ha-icon class="tick" icon="mdi:check"></ha-icon>` : ''}
              </button>
              <button role="menuitemradio" aria-checked=${sortMode === 'alphabetical' ? 'true' : 'false'} class="item ${sortMode === 'alphabetical' ? 'sel' : ''}" @click=${() => { this._dispatchSetting('sortMode', 'alphabetical'); this._menuOpen = false; }}>
                <span>${t('A–Z')}</span>${sortMode === 'alphabetical' ? html`<ha-icon class="tick" icon="mdi:check"></ha-icon>` : ''}
              </button>
              <div class="menu-divider"></div>
              <button class="item" role="menuitemcheckbox" aria-checked=${showPrice ? 'true' : 'false'} @click=${() => this._dispatchSetting('showPriceOnTile', !showPrice)}><span>${t('Show Price')}</span>${sw(showPrice)}</button>
              <button class="item" role="menuitemcheckbox" aria-checked=${showRecent ? 'true' : 'false'} @click=${() => this._dispatchSetting('showRecentlyUsed', !showRecent)}><span>${t('Recently Used')}</span>${sw(showRecent)}</button>
              ${wake ? html`<button class="item" role="menuitemcheckbox" aria-checked=${this._wakeLockActive ? 'true' : 'false'} @click=${this._toggleWakeLock}><span>${t('Keep Screen On')}</span>${sw(this._wakeLockActive)}</button>` : ''}
              <div class="menu-divider"></div>
              <button class="item" role="menuitem" @click=${() => { this._menuOpen = false; this.handleShare(); }}><ha-icon icon="mdi:account-plus-outline"></ha-icon><span>${t('Share list')}</span></button>
              <button class="item danger-soft" role="menuitem" @click=${() => { this._menuOpen = false; this._emit('clear-checked'); }}><ha-icon icon="mdi:check-all"></ha-icon><span>${t('Clear checked items')}</span></button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  _renderClassic() {
    const s = this.settings || {};
    const viewMode = s.viewMode || 'tile';
    const sortMode = s.sortMode || 'category';
    const showRecent = s.showRecentlyUsed !== false;
    const showPrice = s.showPriceOnTile !== false;

    return html`
      <div class="header ${this.compact ? 'compact' : ''}">
        ${this.compact ? '' : html`
          <button class="back-btn" @click=${this.handleBack}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>

          <h2>${this.activeList?.name || t('Shopping List')}</h2>
        `}

        <div class="header-actions">
          ${!this.compact && 'wakeLock' in navigator ? html`
            <button
              class="action-btn ${this._wakeLockActive ? 'wake-active' : ''}"
              title=${this._wakeLockActive ? t('Screen On') : t('Keep Screen On')}
              @click=${this._toggleWakeLock}
            >
              <ha-icon icon=${this._wakeLockActive ? 'mdi:brightness-7' : 'mdi:brightness-5'}></ha-icon>
            </button>
          ` : ''}
          <button class="action-btn" @click=${this.handleShare}>
            <ha-icon icon="mdi:account-plus-outline"></ha-icon>
          </button>
          <div class="menu-wrap">
            <button class="action-btn" @click=${this.handleMenuToggle}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
            ${this._menuOpen ? html`
              <div class="menu-dropdown" @click=${e => e.stopPropagation()}>

                <div class="menu-section-label">${t('View')}</div>
                <div class="menu-toggle-row">
                  <button
                    class="toggle-btn ${viewMode === 'tile' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('viewMode', 'tile'); this._menuOpen = false; }}
                  >🔲 ${t('Tiles')}</button>
                  <button
                    class="toggle-btn ${viewMode === 'list' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('viewMode', 'list'); this._menuOpen = false; }}
                  >☰ ${t('List')}</button>
                </div>

                <div class="menu-section-label">${t('Sort')}</div>
                <div class="menu-toggle-row">
                  <button
                    class="toggle-btn ${sortMode === 'category' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('sortMode', 'category'); this._menuOpen = false; }}
                  >${t('By Category')}</button>
                  <button
                    class="toggle-btn ${sortMode === 'alphabetical' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('sortMode', 'alphabetical'); this._menuOpen = false; }}
                  >${t('A–Z')}</button>
                </div>

                <div class="menu-divider"></div>

                <button class="menu-switch-row" @click=${() => this._dispatchSetting('showRecentlyUsed', !showRecent)}>
                  <span class="menu-switch-label">${t('Recently Used')}</span>
                  <span class="switch ${showRecent ? 'on' : 'off'}">${showRecent ? '✓' : '✕'}</span>
                </button>

                <button class="menu-switch-row" @click=${() => this._dispatchSetting('showPriceOnTile', !showPrice)}>
                  <span class="menu-switch-label">${t('Show Price')}</span>
                  <span class="switch ${showPrice ? 'on' : 'off'}">${showPrice ? '✓' : '✕'}</span>
                </button>

              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [css`
    :host {
      display: block;
    }
    .header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      background: var(--slm-bg-surface);
      border-bottom: 1px solid var(--slm-border-subtle);
      z-index: 100;
      min-height: 40px;
      max-height: 40px;
    }
    .header.compact {
      position: relative;
      min-height: 0;
      max-height: none;
      padding: 0 8px 0 0;
      border-bottom: none;
      justify-content: flex-end;
    }
    .back-btn,
    .action-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--slm-text-primary);
      -webkit-tap-highlight-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .back-btn:active,
    .action-btn:active {
      opacity: 0.6;
    }
    .action-btn.wake-active {
      color: var(--slm-accent-warning, #ffb74d);
    }
    ha-icon {
      --mdc-icon-size: 24px;
    }
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--slm-text-primary);
      flex: 1;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 8px;
    }
    .header-actions {
      display: flex;
      gap: 4px;
      position: relative;
    }

    .menu-wrap {
      position: relative;
    }
    .menu-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      background: var(--slm-bg-surface);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 12px;
      box-shadow: var(--slm-shadow-medium);
      z-index: 200;
      min-width: 190px;
      padding: 8px 0;
      overflow: hidden;
    }
    .menu-section-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slm-text-secondary);
      padding: 6px 14px 2px;
    }
    .menu-toggle-row {
      display: flex;
      gap: 6px;
      padding: 4px 10px 8px;
    }
    .toggle-btn {
      flex: 1;
      padding: 6px 4px;
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      background: transparent;
      color: var(--slm-text-primary);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .toggle-btn.active {
      background: var(--slm-accent-primary);
      border-color: var(--slm-accent-primary);
      color: white;
      font-weight: 600;
    }
    .menu-divider {
      height: 1px;
      background: var(--slm-border-subtle);
      margin: 4px 0;
    }
    .menu-switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 14px;
      border: none;
      background: transparent;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-switch-row:active {
      background: var(--slm-bg-elevated);
    }
    .menu-switch-label {
      font-size: 14px;
      color: var(--slm-text-primary);
    }
    .switch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
    }
    .switch.on {
      background: var(--slm-accent-primary);
      color: white;
    }
    .switch.off {
      background: var(--slm-border-subtle);
      color: var(--slm-text-secondary);
    }

    /* ---------- Design A (fresh) and B (compact) ---------- */
    :host([ui-style="fresh"]) .header,
    :host([ui-style="compact"]) .header {
      position: static;
      min-height: 0;
      max-height: none;
      background: transparent;
      border-bottom: none;
      box-sizing: border-box;
    }
    .round {
      flex: none;
      width: 48px;
      height: 48px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--slm-text-primary);
      -webkit-tap-highlight-color: transparent;
    }
    .round ha-icon { --mdc-icon-size: 22px; }
    .muted { color: var(--slm-text-secondary); }

    /* A */
    :host([ui-style="fresh"]) .header {
      padding: 20px 20px 0;
      gap: 10px;
      justify-content: flex-start;
    }
    :host([ui-style="fresh"]) .round {
      border-radius: 50%;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
    }
    .switcher {
      flex: 1;
      min-width: 0;
      height: 48px;
      padding: 0 14px 0 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 999px;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .switch-title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chip-ico {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--slm-accent-soft);
      color: var(--slm-accent-text);
    }
    .chip-ico ha-icon { --mdc-icon-size: 18px; color: inherit; }
    .switcher > ha-icon { --mdc-icon-size: 18px; flex: none; }

    /* B */
    :host([ui-style="compact"]) .header {
      padding: 20px 16px 0 20px;
      gap: 8px;
      justify-content: flex-start;
    }
    :host([ui-style="compact"]) .round {
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 14px;
      background: var(--slm-bg-elevated);
    }
    .title-btn {
      flex: 1;
      min-width: 0;
      min-height: 48px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--slm-text-primary);
      text-align: left;
      cursor: pointer;
    }
    .title-line {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .title-line ha-icon { --mdc-icon-size: 20px; }
    .subtitle {
      display: block;
      margin-top: 2px;
      font-size: 13px;
      font-weight: 500;
      color: var(--slm-text-secondary);
      font-variant-numeric: tabular-nums;
    }
    :host([ui-style="compact"]) .menu-dropdown {
      top: calc(100% + 8px);
      min-width: 270px;
      padding: 8px;
      border-radius: 20px;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    :host([ui-style="compact"]) .menu-section-label {
      padding: 8px 10px 4px;
      font-size: 12px;
      letter-spacing: 0.08em;
      color: var(--slm-text-secondary);
    }
    .seg {
      display: flex;
      gap: 3px;
      margin: 0 4px 6px;
      padding: 3px;
      border-radius: 12px;
      background: var(--slm-bg-main);
    }
    .seg button {
      flex: 1;
      min-height: 40px;
      border: none;
      border-radius: 10px;
      background: transparent;
      color: var(--slm-text-secondary);
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
    }
    .seg button[aria-pressed="true"] {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
      font-weight: 700;
    }
    .seg ha-icon { --mdc-icon-size: 18px; color: inherit; }
    .item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-height: 44px;
      padding: 0 10px;
      border: none;
      border-radius: 12px;
      background: transparent;
      color: var(--slm-text-primary);
      font-size: 15px;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
    }
    .item span:first-of-type { flex: 1; }
    .item.sel { background: var(--slm-bg-elevated); font-weight: 600; }
    .item ha-icon { --mdc-icon-size: 18px; color: var(--slm-text-secondary); }
    .item .tick { color: var(--slm-accent-primary); }
    .item.danger-soft { color: var(--slm-accent-danger); }
    .item.danger-soft ha-icon { color: inherit; }
    .sw {
      position: relative;
      flex: none;
      width: 44px;
      height: 26px;
      border-radius: 99px;
      background: var(--slm-border-subtle);
    }
    .sw::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--slm-text-secondary);
      transition: transform 0.2s;
    }
    .sw.on { background: var(--slm-accent-primary); }
    .sw.on::after { transform: translateX(18px); background: var(--slm-accent-ink, #fff); }
  `, fontInherit];
}

customElements.define('slm-list-header', SLMListHeader);
