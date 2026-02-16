import { LitElement, html, css } from 'lit';

class FontSettings extends LitElement {
  static properties = {
    currentFont: { type: String }
  };

  fonts = [
    { name: 'System Default', value: 'system' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: '"Open Sans", sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Inter', value: 'Inter, sans-serif' }
  ];

  handleSelect(font) {
    this.dispatchEvent(new CustomEvent('font-selected', {
      detail: { font },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="overlay" @click=${() => this.dispatchEvent(new Event('close'))}>
        <div class="popup" @click=${(e) => e.stopPropagation()}>
          <div class="popup-header">
            <h3>Font Family</h3>
          </div>

          <div class="popup-content">
            ${this.fonts.map(font => html`
              <button 
                class="font-option ${this.currentFont === font.value ? 'selected' : ''}"
                style="font-family: ${font.value}"
                @click=${() => this.handleSelect(font.value)}
              >
                <span>${font.name}</span>
                ${this.currentFont === font.value ? html`
                  <ha-icon class="check" icon="mdi:check"></ha-icon>
                ` : ''}
              </button>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(--slm-shadow-medium);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
    }
    .popup {
      width: 100%;
      background: var(--card-background-color);
      border-radius: 16px 16px 0 0;
      max-height: 70vh;
      overflow-y: auto;
    }
    .popup-header {
      position: sticky;
      top: 0;
      background: var(--card-background-color);
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
      z-index: 1;
    }
    .popup-header h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }
    .popup-content {
      padding: 20px;
    }
    .font-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 16px;
      margin-bottom: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s;
    }
    .font-option:hover {
      border-color: var(--primary-color);
    }
    .font-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    .font-option span {
      font-weight: 600;
    }
  `;
}

customElements.define('font-settings', FontSettings);