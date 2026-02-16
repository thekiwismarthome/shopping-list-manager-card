import { LitElement, html, css } from 'lit';

class SLMBottomNav extends LitElement {
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
          <span class="label">Shopping</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'lists' ? 'active' : ''}"
          @click=${() => this.handleNavClick('lists')}
        >
          <span class="emoji">📋</span>
          <span class="label">Lists</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'loyalty' ? 'active' : ''}"
          @click=${() => this.handleNavClick('loyalty')}
        >
          <span class="emoji">💳</span>
          <span class="label">Loyalty</span>
        </button>

        <button
          class="nav-item ${this.currentView === 'settings' ? 'active' : ''}"
          @click=${() => this.handleNavClick('settings')}
        >
          <span class="emoji">⚙️</span>
          <span class="label">Settings</span>
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
      background: var(--slm-bg-surface);
      border-top: 1px solid var(--slm-border-subtle);
      padding: 6px 0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
      z-index: 100;
    }
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px;
      border: none;
      background: transparent;
      color: var(--slm-text-secondary);
      cursor: pointer;
      transition: color 0.2s;
      -webkit-tap-highlight-color: transparent;
      outline: none;
    }
    .nav-item.active {
      color: var(--slm-accent-primary);
    }
    .emoji {
      font-size: 22px;
    }
    .label {
      font-size: 11px;
      font-weight: 500;
    }
  `;
}

customElements.define('slm-bottom-nav', SLMBottomNav);