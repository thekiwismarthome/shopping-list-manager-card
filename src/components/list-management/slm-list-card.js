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
      <div class="slm-list-card ${this.isActive ? 'active' : ''}" @click=${this.handleCardClick}>
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
    .slm-list-card {
      position: relative;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
      border: 2px solid #e8eaf6;
      border-radius: 16px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .slm-list-card:hover {
      border-color: #a8b5ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(168, 181, 255, 0.2);
    }
    .slm-list-card.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
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
      font-size: 24px;
      color: inherit;
    }
    .menu-btn:hover {
      opacity: 1;
    }
    .slm-list-card h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 600;
    }
    .card-stats {
      display: flex;
      gap: 16px;
      margin-top: 12px;
    }
    .stat {
      display: flex;
      flex-direction: column;
    }
    .stat-value {
      font-size: 16px;
      font-weight: 700;
    }
    .stat-label {
      font-size: 12px;
      opacity: 0.8;
    }
    .active-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255,255,255,0.3);
      color: white;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
    }
    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }
    .menu-popup {
      position: absolute;
      top: 40px;
      right: 0;
      background: var(--card-background-color);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      overflow: hidden;
      min-width: 160px;
      z-index: 101;
    }
    .menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
    }
    .menu-popup button:hover {
      background: #f5f7fa;
    }
    .menu-popup button.danger {
      color: #ff7675;
    }
    .menu-popup button.danger:hover {
      background: #ff7675;
      color: white;
    }
  `;
}

customElements.define('slm-list-card', SLMListCard);