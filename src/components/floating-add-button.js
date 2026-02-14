import { LitElement, html, css } from 'lit';

class FloatingAddButton extends LitElement {
  render() {
    return html`
      <button class="fab">
        <span class="fab-icon">+</span>
      </button>
    `;
  }

  static styles = css`
    .fab {
      position: sticky;
      bottom: 76px;
      left: calc(100% - 76px);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 95;
      margin-right: 20px;
    }
    .fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
    }
    .fab:active {
      transform: scale(0.95);
    }
    .fab-icon {
      font-size: 32px;
      font-weight: 300;
      line-height: 1;
    }
  `;
}

customElements.define('floating-add-button', FloatingAddButton);