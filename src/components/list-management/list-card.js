import { LitElement, html, css } from 'lit';

class ListCard extends LitElement {
  static properties = {
    list: { type: Object },
    isActive: { type: Boolean },
    showMenu: { type: Boolean }
  };

  constructor() {
    super();
    this.showMenu = false;
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
      <div class="list-card ${this.isActive ? 'active' : ''}" @click=${this.handleCardClick}>
        <div class="card-header">
          <ha-icon icon="${this.list.icon}"></ha-icon>
          <button class="menu-btn" @click=${this.handleMenuClick}>
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>
        </div>

        <h3>${this.list.name}</h3>
        <div class="card-meta">
          <span>${this.list.item_count || 0} items</span>
          ${this.isActive ? html`
            <span class="active-badge">Active</span>
          ` : ''}
        </div>

        ${this.showMenu ? html`
          <div class="menu-overlay" @click=${(e) => { e.stopPropagation(); this.showMenu = false; }}>
            <div class="menu-popup">
              <button @click=${(e) => this.handleAction('rename', e)}>
                <ha-icon icon="mdi:pencil"></ha-icon>
                Rename
              </button>
              <button @click=${(e) => this.handleAction('share', e)}>
                <ha-icon icon="mdi:share-variant"></ha-icon>
                Share
              </button>
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
      </div>
    `;
  }

  static styles = css`
    .list-card {
      position: relative;
      background: var(--card-background-color);
      border: 2px solid var(--divider-color);
      border-radius: 16px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .list-card:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .list-card.active {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .card-header ha-icon {
      --mdc-icon-size: 32px;
    }
    .menu-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      opacity: 0.6;
    }
    .menu-btn:hover {
      opacity: 1;
    }
    .list-card h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 600;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      opacity: 0.8;
    }
    .active-badge {
      background: white;
      color: var(--primary-color);
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
    }
    .list-card.active .active-badge {
      background: rgba(255,255,255,0.3);
      color: white;
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
      background: var(--primary-color);
      color: white;
    }
    .menu-popup button.danger {
      color: var(--error-color);
    }
    .menu-popup button.danger:hover {
      background: var(--error-color);
      color: white;
    }
  `;
}

customElements.define('list-card', ListCard);