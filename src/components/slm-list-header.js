import { LitElement, html, css } from 'lit';

class SLMListHeader extends LitElement {
  static properties = {
    activeList: { type: Object },
    itemCount: { type: Number }
  };

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

  handleMenu() {
    // TODO: Implement list edit menu
    alert('List menu coming soon');
  }

  render() {
    return html`
      <div class="header">
        <button class="back-btn" @click=${this.handleBack}>
          <span class="emoji">◀</span>
        </button>
        
        <h2>${this.activeList?.name || 'Shopping List'}</h2>
        
        <div class="header-actions">
          <button class="action-btn" @click=${this.handleShare}>
            <span class="emoji">👤➕</span>
          </button>
          <button class="action-btn" @click=${this.handleMenu}>
            <span class="emoji">⋮</span>
          </button>
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
      background: var(--card-background-color);
      border-bottom: 1px solid var(--divider-color);
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
      color: var(--primary-text-color);
      -webkit-tap-highlight-color: transparent;
    }
    .back-btn:active,
    .action-btn:active {
      opacity: 0.6;
    }
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
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
    }
    .emoji {
      font-size: 20px;
    }
  `;
}

customElements.define('slm-list-header', SLMListHeader);