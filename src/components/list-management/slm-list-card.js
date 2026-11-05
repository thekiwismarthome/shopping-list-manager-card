import { LitElement, html, css } from 'lit';
import { fontInherit } from '../../styles/ui-styles.js';
import { t, I18nController } from '../../services/translator.js';

class SLMListCard extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    list: { type: Object },
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    isActive: { type: Boolean },
    itemCount: { type: Number },
    totalCost: { type: Number },
    currency: { type: String },
    emoji: { type: String },
    currentUserId: { type: String },
    isAdmin: { type: Boolean },
    showMenu: { type: Boolean },
    menuX: { type: Number },
    menuY: { type: Number }
  };

  constructor() {
    super();
    this.showMenu = false;
    this.itemCount = 0;
    this.totalCost = 0;
    this.currency = 'NZD';
    this.currentUserId = '';
    this.isAdmin = false;
    this.menuX = 0;
    this.menuY = 0;
  }

  get _isPrivate() {
    return !!this.list?.owner_id;
  }

  get _isOwner() {
    return this.list?.owner_id === this.currentUserId;
  }

  get _canManageMembers() {
    return this._isPrivate && (this._isOwner || this.isAdmin);
  }

  getColorClass() {
    const index = parseInt(this.list.id.slice(-1), 16) % 6;
    return `color-${index}`;
  }


  dimColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }

  handleCardClick(e) {
    if (e.target.closest('.menu-btn')) return;
    
    this.dispatchEvent(new CustomEvent('list-select', {
      detail: { listId: this.list.id },
      bubbles: true,
      composed: true
    }));
  }

  handleMenuClick(e) {
    e.stopPropagation();
    
    const rect = e.target.closest('.menu-btn').getBoundingClientRect();
    this.menuX = rect.right - 160;
    this.menuY = rect.bottom + 5;
    
    this.showMenu = !this.showMenu;
  }

  handleAction(action, e) {
    e.stopPropagation();
    this.showMenu = false;
    this.dispatchEvent(new CustomEvent('list-action', {
      detail: { action, listId: this.list.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div
        class="list-card ${this.isActive ? 'active' : 'inactive'} ${this.getColorClass()}"
        @click=${this.handleCardClick}
      >

        ${this.isActive ? html`
          <div class="active-badge">${t('Active')}</div>
        ` : ''}

        ${this._isPrivate ? html`
          <div class="private-badge">
            <ha-icon icon="mdi:lock"></ha-icon>
          </div>
        ` : ''}

        <div class="card-header">
          <span class="icon-chip"><ha-icon icon="${this.list.icon}"></ha-icon></span>
          <h3>${this.list.name}</h3>
        </div>

        <div class="card-stats">
          <span>${this.itemCount}</span>
          <span class="separator">·</span>
          <span>${this.currency} $${this.totalCost.toFixed(2)}</span>
        </div>

        <button class="menu-btn" @click=${this.handleMenuClick}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>
      </div>

      ${this.showMenu ? html`
        <div class="menu-overlay" @click=${(e) => { e.stopPropagation(); this.showMenu = false; }}>
          <div class="menu-popup" style="left: ${this.menuX}px; top: ${this.menuY}px;">
            <button @click=${(e) => this.handleAction('rename', e)}>
              <ha-icon icon="mdi:pencil"></ha-icon>
              Rename
            </button>
            ${this._canManageMembers ? html`
              <button @click=${(e) => this.handleAction('members', e)}>
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                Manage Members
              </button>
            ` : ''}
            <button @click=${(e) => this.handleAction('copy', e)}>
              <ha-icon icon="mdi:content-copy"></ha-icon>
              Copy
            </button>
            <button class="danger" @click=${(e) => this.handleAction('delete', e)}>
              <ha-icon icon="mdi:delete"></ha-icon>
              Delete
            </button>
          </div>
        </div>
      ` : ''}
    `;
  }

  static styles = [css`
    .list-card {
      position: relative;
      border-radius: 14px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.25s ease;
      height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      overflow: hidden;
    }

    .list-card.active {
      box-shadow: var(--slm-shadow-medium);
      transform: scale(1);
    }

    .list-card.inactive {
      opacity: 0.65;
      filter: saturate(0.6);
      box-shadow: none;
    }

    .list-card:active {
      transform: scale(0.97);
    }

    /* ===============================
      Color Gradients — driven by theme CSS variables
    ================================ */

    .color-0 { --lc: var(--slm-list-gradient-0, linear-gradient(135deg, #7986cb, #9fa8da)); }
    .color-1 { --lc: var(--slm-list-gradient-1, linear-gradient(135deg, #81c784, #a5d6a7)); }
    .color-2 { --lc: var(--slm-list-gradient-2, linear-gradient(135deg, #ffb74d, #ffcc80)); }
    .color-3 { --lc: var(--slm-list-gradient-3, linear-gradient(135deg, #ba68c8, #ce93d8)); }
    .color-4 { --lc: var(--slm-list-gradient-4, linear-gradient(135deg, #4dd0e1, #80deea)); }
    .color-5 { --lc: var(--slm-list-gradient-5, linear-gradient(135deg, #f06292, #f48fb1)); }
    .list-card { background: var(--lc); }
    .icon-chip { display: contents; }

    /* ---------- Fresh + Compact: surface cards with a coloured icon chip ---------- */
    :host([ui-style="fresh"]) .list-card,
    :host([ui-style="compact"]) .list-card {
      height: auto;
      min-height: 96px;
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
      box-shadow: none;
    }
    :host([ui-style="fresh"]) .list-card { border-radius: 22px; }
    :host([ui-style="compact"]) .list-card { border-radius: 16px; }
    :host([ui-style="fresh"]) .list-card.active,
    :host([ui-style="compact"]) .list-card.active {
      border-color: var(--slm-accent-primary);
      box-shadow: 0 0 0 1px var(--slm-accent-primary);
    }
    :host([ui-style="fresh"]) .list-card.inactive,
    :host([ui-style="compact"]) .list-card.inactive {
      opacity: 1;
      filter: none;
    }
    :host([ui-style="fresh"]) .icon-chip,
    :host([ui-style="compact"]) .icon-chip {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      background: var(--lc);
      color: white;
    }
    :host([ui-style="fresh"]) .icon-chip { border-radius: 14px; }
    :host([ui-style="compact"]) .icon-chip { border-radius: 11px; }
    :host([ui-style="fresh"]) .icon-chip ha-icon,
    :host([ui-style="compact"]) .icon-chip ha-icon {
      --mdc-icon-size: 24px;
      color: white;
    }
    :host([ui-style="fresh"]) .card-stats,
    :host([ui-style="compact"]) .card-stats {
      color: var(--slm-text-secondary);
      font-variant-numeric: tabular-nums;
      opacity: 1;
    }
    :host([ui-style="fresh"]) .active-badge,
    :host([ui-style="compact"]) .active-badge {
      top: 10px;
      left: auto;
      right: 56px;
      background: color-mix(in srgb, var(--slm-accent-primary) 16%, var(--slm-bg-surface));
      color: var(--slm-accent-primary);
    }
    :host([ui-style="fresh"]) .menu-btn,
    :host([ui-style="compact"]) .menu-btn {
      width: 44px;
      height: 44px;
      top: 4px;
      right: 4px;
      background: transparent;
    }
    :host([ui-style="fresh"]) .menu-btn ha-icon,
    :host([ui-style="compact"]) .menu-btn ha-icon,
    :host([ui-style="fresh"]) .private-badge ha-icon,
    :host([ui-style="compact"]) .private-badge ha-icon {
      color: var(--slm-text-secondary);
    }

    .active-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background: rgba(255,255,255,0.25);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .private-badge {
      position: absolute;
      bottom: 10px;
      right: 44px;
      opacity: 0.7;
      display: flex;
      align-items: center;
    }
    .private-badge ha-icon {
      --mdc-icon-size: 16px;
      color: white;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .card-header ha-icon {
      --mdc-icon-size: 28px;
      flex-shrink: 0;
    }
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      flex: 1;
    }
    .card-stats {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      opacity: 0.95;
    }
    .separator {
      opacity: 0.6;
    }
    .menu-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255,255,255,0.15);
      border: none;
      padding: 6px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
      z-index: 10;
    }
    .menu-btn ha-icon {
      --mdc-icon-size: 20px;
      color: white;
    }
    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    .menu-popup {
      position: fixed;
      background: var(--slm-bg-elevated);
      box-shadow: var(--slm-shadow-medium);
      border-radius: 10px;
      overflow: hidden;
      min-width: 160px;
      z-index: 10000;
    }
    .menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: none;
      background: transparent;
      color: var(--slm-text-primary);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-popup button:active {
      background:  var(--slm-bg-surface);
    }
    .menu-popup button.danger {
      color: var(--slm-accent-danger);
    }
    .menu-popup button.danger:active {
      background: var(--slm-accent-danger, #ef5350);
      color: white;
    }
    .menu-popup ha-icon {
      --mdc-icon-size: 20px;
    }
  `, fontInherit];
}

customElements.define('slm-list-card', SLMListCard);