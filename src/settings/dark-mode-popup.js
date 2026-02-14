import { LitElement, html, css } from 'lit';

class DarkModePopup extends LitElement {
  static properties = {
    currentMode: { type: String }
  };

  handleSelect(mode) {
    this.dispatchEvent(new CustomEvent('mode-selected', {
      detail: { mode },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="overlay" @click=${() => this.dispatchEvent(new Event('close'))}>
        <div class="popup" @click=${(e) => e.stopPropagation()}>
          <div class="popup-header">
            <h3>Dark Mode</h3>
          </div>

          <div class="popup-content">
            <button 
              class="mode-option ${this.currentMode === 'on' ? 'selected' : ''}"
              @click=${() => this.handleSelect('on')}
            >
              <ha-icon icon="mdi:weather-night"></ha-icon>
              <span>On</span>
              ${this.currentMode === 'on' ? html`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              ` : ''}
            </button>

            <button 
              class="mode-option ${this.currentMode === 'off' ? 'selected' : ''}"
              @click=${() => this.handleSelect('off')}
            >
              <ha-icon icon="mdi:weather-sunny"></ha-icon>
              <span>Off</span>
              ${this.currentMode === 'off' ? html`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              ` : ''}
            </button>

            <button 
              class="mode-option ${this.currentMode === 'system' ? 'selected' : ''}"
              @click=${() => this.handleSelect('system')}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>As on Device</span>
              ${this.currentMode === 'system' ? html`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              ` : ''}
            </button>
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
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    .popup {
      width: 100%;
      background: var(--card-background-color);
      border-radius: 16px 16px 0 0;
      animation: slideUp 0.3s;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .popup-header {
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .popup-header h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }
    .popup-content {
      padding: 20px;
    }
    .mode-option {
      display: flex;
      align-items: center;
      gap: 16px;
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
    .mode-option:hover {
      border-color: var(--primary-color);
    }
    .mode-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    .mode-option span {
      flex: 1;
      text-align: left;
      font-weight: 600;
    }
    .mode-option .check {
      color: white;
    }
  `;
}

customElements.define('dark-mode-popup', DarkModePopup);