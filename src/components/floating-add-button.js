import { LitElement, html, css } from 'lit';

class FloatingAddButton extends LitElement {
  render() {
    return html`
      <button class="fab">
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
    `;
  }

  static styles = css`
    .fab {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 99;
    }
    .fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.4);
    }
    .fab:active {
      transform: scale(0.95);
    }
    .fab ha-icon {
      --mdc-icon-size: 28px;
    }
  `;
}

customElements.define('floating-add-button', FloatingAddButton);