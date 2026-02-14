import { LitElement, html, css } from 'lit';

class SLMListCard extends LitElement {
  static properties = {
    list: { type: Object },
    isActive: { type: Boolean },
    itemCount: { type: Number },
    totalCost: { type: Number },
    currency: { type: String },
    emoji: { type: String },
    showMenu: { type: Boolean }
  };

  constructor() {
    super();
    this.showMenu = false;
    this.itemCount = 0;
    this.totalCost = 0;
    this.currency = 'NZD';
  }

  handleCardClick() {
    this.dispatchEvent(new CustomEvent('list-select', {
      detail: { listId: this.list.id },
      bubbles: true,
      composed: true
    }));
  }

  handleMenuClick(e) {
    e.stopPropagation();
    this.showMenu = !this.showMenu;
    
    // Store click position for menu
    this.menuX = e.clientX;
    this.menuY = e.clientY;
  }

  render() {
    return html`
      <div class="list-card ${this.isActive ? 'active' : ''}" @click=${this.handleCardClick}>
        <div class="card-header">
          <span class="emoji">${this.emoji}</span>
          <button class="menu-btn" @click=${this.handleMenuClick}>
            <span class="dots">⋮</span>
          </button>
        </div>

        <h3>${this.list.name}</h3>
        
        ${this.isActive ? html`
          <div class="card-stats">
            <div class="stat">
              <span class="stat-value">${this.itemCount}</span>
              <span class="stat-label">items</span>
            </div>
            <div class="stat">
              <span class="stat-value">${this.currency} $${this.totalCost.toFixed(2)}</span>
              <span class="stat-label">total</span>
            </div>
          </div>
          <div class="active-badge">Active</div>
        ` : ''}

        ${this.showMenu ? html`
          <div class="menu-overlay" @click=${(e) => { e.stopPropagation(); this.showMenu = false; }}>
            <div class="menu-popup" style="left: ${this.menuX - 150}px; top: ${this.menuY}px;">
              <button @click=${(e) => this.handleAction('rename', e)}>
                <span class="emoji">✏️</span>
                Rename
              </button>
              <button @click=${(e) => this.handleAction('share', e)}>
                <span class="emoji">📤</span>
                Share
              </button>
              <button @click=${(e) => this.handleAction('copy', e)}>
                <span class="emoji">📋</span>
                Copy
              </button>
              <button class="danger" @click=${(e) => this.handleAction('delete', e)}>
                <span class="emoji">🗑️</span>
                Delete
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
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
      <div class="list-card ${this.isActive ? 'active' : ''}" @click=${this.handleCardClick}>
        <div class="card-header">
          <span class="emoji">${this.emoji}</span>
          <button class="menu-btn" @click=${this.handleMenuClick}>
            <span class="dots">⋮</span>
          </button>
        </div>

        <h3>${this.list.name}</h3>
        
        ${this.isActive ? html`
          <div class="card-stats">
            <div class="stat">
              <span class="stat-value">${this.itemCount}</span>
              <span class="stat-label">items</span>
            </div>
            <div class="stat">
              <span class="stat-value">${this.currency} $${this.totalCost.toFixed(2)}</span>
              <span class="stat-label">total</span>
            </div>
          </div>
          <div class="active-badge">Active</div>
        ` : ''}

        ${this.showMenu ? html`
          <div class="menu-overlay" @click=${(e) => { e.stopPropagation(); this.showMenu = false; }}>
            <div class="menu-popup">
              <button @click=${(e) => this.handleAction('rename', e)}>
                <span class="emoji">✏️</span>
                Rename
              </button>
              <button @click=${(e) => this.handleAction('share', e)}>
                <span class="emoji">📤</span>
                Share
              </button>
              <button @click=${(e) => this.handleAction('copy', e)}>
                <span class="emoji">📋</span>
                Copy
              </button>
              <button class="danger" @click=${(e) => this.handleAction('delete', e)}>
                <span class="emoji">🗑️</span>
                Delete
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .list-card {
      position: relative;
      background: var(--card-background-color);
      border: 2px solid var(--divider-color);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .list-card:active {
      transform: scale(0.98);
    }
    .list-card.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .emoji {
      font-size: 32px;
    }
    .menu-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      opacity: 0.6;
      font-size: 20px;
      color: inherit;
      -webkit-tap-highlight-color: transparent;
      z-index: 10;
      position: relative;
    }
    h3 {
      margin: 0 0 10px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .card-stats {
      display: flex;
      gap: 16px;
      margin-top: 10px;
    }
    .stat {
      display: flex;
      flex-direction: column;
    }
    .stat-value {
      font-size: 15px;
      font-weight: 700;
    }
    .stat-label {
      font-size: 11px;
      opacity: 0.85;
    }
    .active-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255,255,255,0.3);
      color: white;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      pointer-events: none;
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
      background: var(--card-background-color);
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      overflow: hidden;
      min-width: 150px;
      z-index: 10000;
    }
    .menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-popup button:active {
      background: var(--secondary-background-color);
    }
    .menu-popup button.danger {
      color: var(--error-color);
    }
    .menu-popup button.danger:active {
      background: var(--error-color);
      color: white;
    }
  `;
}

customElements.define('slm-list-card', SLMListCard);