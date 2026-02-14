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
          <span class="emoji">🛒</span>
          <span>Shopping</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'lists' ? 'active' : ''}"
          @click=${() => this.handleNavClick('lists')}
        >
          <span class="emoji">📋</span>
          <span>Lists</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'loyalty' ? 'active' : ''}"
          @click=${() => this.handleNavClick('loyalty')}
        >
          <span class="emoji">💳</span>
          <span>Loyalty</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'settings' ? 'active' : ''}"
          @click=${() => this.handleNavClick('settings')}
        >
          <span class="emoji">⚙️</span>
          <span>Settings</span>
        </button>
      </nav>
    `;
  }

  static styles = css`
    .bottom-nav {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: var(--card-background-color);
      border-top: 1px solid #e8eaf6;
      padding: 8px 0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
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
      color: #9e9e9e;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 12px;
    }
    .nav-item:hover {
      background: #f5f7fa;
    }
    .nav-item.active {
      color: #667eea;
    }
    .emoji {
      font-size: 24px;
    }
    .nav-item span:last-child {
      font-size: 12px;
      font-weight: 500;
    }
  `;
}

customElements.define('bottom-nav', BottomNav);