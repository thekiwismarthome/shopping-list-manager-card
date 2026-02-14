import { LitElement, html, css } from 'lit';

class BottomNav extends LitElement {
  static properties = {
    currentView: { type: String }
  };

  handleNavClick(view) {
    this.dispatchEvent(new CustomEvent('nav-changed', {
      detail: { view },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <nav class="bottom-nav">
        <button
          class="nav-item ${this.currentView === 'shopping' ? 'active' : ''}"
          @click=${() => this.handleNavClick('shopping')}
        >
          <ha-icon icon="mdi:cart"></ha-icon>
          <span>Shopping</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'lists' ? 'active' : ''}"
          @click=${() => this.handleNavClick('lists')}
        >
          <ha-icon icon="mdi:format-list-bulleted"></ha-icon>
          <span>Lists</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'loyalty' ? 'active' : ''}"
          @click=${() => this.handleNavClick('loyalty')}
        >
          <ha-icon icon="mdi:card-account-details"></ha-icon>
          <span>Loyalty</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'settings' ? 'active' : ''}"
          @click=${() => this.handleNavClick('settings')}
        >
          <ha-icon icon="mdi:cog"></ha-icon>
          <span>Settings</span>
        </button>
      </nav>
    `;
  }

  static styles = css`
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: var(--card-background-color);
      border-top: 1px solid var(--divider-color);
      padding: 8px 0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
      z-index: 100;
    }
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-item:hover {
      background: var(--primary-color);
      color: white;
    }
    .nav-item.active {
      color: var(--primary-color);
    }
    .nav-item ha-icon {
      --mdc-icon-size: 24px;
    }
    .nav-item span {
      font-size: 12px;
      font-weight: 500;
    }
  `;
}

customElements.define('bottom-nav', BottomNav);