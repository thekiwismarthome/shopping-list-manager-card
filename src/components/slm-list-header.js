import { LitElement, html, css } from 'lit';

class SLMListHeader extends LitElement {
  static properties = {
    activeList: { type: Object },
    itemCount: { type: Number },
    settings: { type: Object },
    _menuOpen: { type: Boolean, state: true }
  };

  constructor() {
    super();
    this._menuOpen = false;
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
    const s = this.settings || {};
    const viewMode = s.viewMode || 'tile';
    const sortMode = s.sortMode || 'category';
    const showRecent = s.showRecentlyUsed !== false;
    const showPrice = s.showPriceOnTile !== false;

    return html`
      <div class="header">
        <button class="back-btn" @click=${this.handleBack}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>

        <h2>${this.activeList?.name || 'Shopping List'}</h2>

        <div class="header-actions">
          <button class="action-btn" @click=${this.handleShare}>
            <ha-icon icon="mdi:account-plus-outline"></ha-icon>
          </button>
          <div class="menu-wrap">
            <button class="action-btn" @click=${this.handleMenuToggle}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
            ${this._menuOpen ? html`
              <div class="menu-dropdown" @click=${e => e.stopPropagation()}>

                <div class="menu-section-label">View</div>
                <div class="menu-toggle-row">
                  <button
                    class="toggle-btn ${viewMode === 'tile' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('viewMode', 'tile'); this._menuOpen = false; }}
                  >🔲 Tiles</button>
                  <button
                    class="toggle-btn ${viewMode === 'list' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('viewMode', 'list'); this._menuOpen = false; }}
                  >☰ List</button>
                </div>

                <div class="menu-section-label">Sort</div>
                <div class="menu-toggle-row">
                  <button
                    class="toggle-btn ${sortMode === 'category' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('sortMode', 'category'); this._menuOpen = false; }}
                  >By Category</button>
                  <button
                    class="toggle-btn ${sortMode === 'alphabetical' ? 'active' : ''}"
                    @click=${() => { this._dispatchSetting('sortMode', 'alphabetical'); this._menuOpen = false; }}
                  >A–Z</button>
                </div>

                <div class="menu-divider"></div>

                <button class="menu-switch-row" @click=${() => this._dispatchSetting('showRecentlyUsed', !showRecent)}>
                  <span class="menu-switch-label">Recently Used</span>
                  <span class="switch ${showRecent ? 'on' : 'off'}">${showRecent ? '✓' : '✕'}</span>
                </button>

                <button class="menu-switch-row" @click=${() => this._dispatchSetting('showPriceOnTile', !showPrice)}>
                  <span class="menu-switch-label">Show Price</span>
                  <span class="switch ${showPrice ? 'on' : 'off'}">${showPrice ? '✓' : '✕'}</span>
                </button>

              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
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
    ha-icon {
      --mdc-icon-size: 24px;
      color: var(--slm-text-primary);
      --icon-primary-color: var(--slm-text-primary);
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
  `;
}

customElements.define('slm-list-header', SLMListHeader);
