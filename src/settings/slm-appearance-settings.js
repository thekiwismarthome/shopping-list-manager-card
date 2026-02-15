import { LitElement, html, css } from 'lit';
import './slm-dark-mode-popup.js';
import './slm-font-settings.js';

class SLMAppearanceSettings extends LitElement {
  static properties = {
    settings: { type: Object },
    showDarkModePopup: { type: Boolean },
    showFontSettings: { type: Boolean }
  };

  constructor() {
    super();
    this.showDarkModePopup = false;
    this.showFontSettings = false;
  }

  handleSettingChange(key, value) {
    this.dispatchEvent(new CustomEvent('settings-changed', {
      detail: { [key]: value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="appearance-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Appearance</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${() => this.showDarkModePopup = true}>
            <div class="item-content">
              <div class="item-title">Dark Mode</div>
              <div class="item-subtitle">${this.getDarkModeLabel()}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <div class="section-header">Display</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Use Emojis Instead of Icons</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.useEmojis}
                @change=${(e) => this.handleSettingChange('useEmojis', e.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">Tiles Per Row</div>
              <div class="tile-options">
                ${[2, 3, 4, 5].map(num => html`
                  <button 
                    class="tile-option ${this.settings.tilesPerRow === num ? 'selected' : ''}"
                    @click=${() => this.handleSettingChange('tilesPerRow', num)}
                  >
                    ${num}
                  </button>
                `)}
              </div>
            </div>
          </div>

          <div class="section-header">Recently Used</div>

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">Recently Used Products</div>
              <input 
                type="range" 
                min="4" 
                max="20" 
                step="4"
                .value=${this.settings.recentProductsCount}
                @input=${(e) => this.handleSettingChange('recentProductsCount', parseInt(e.target.value))}
                class="size-slider"
              />
              <div class="size-value">${this.settings.recentProductsCount} products</div>
            </div>
          </div>

          <div class="section-header">Font</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Use system text size</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.useSystemTextSize}
                @change=${(e) => this.handleSettingChange('useSystemTextSize', e.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          ${!this.settings.useSystemTextSize ? html`
            <div class="settings-item">
              <div class="item-content full-width">
                <div class="item-title">Font Size</div>
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  .value=${this.settings.fontSize}
                  @input=${(e) => this.handleSettingChange('fontSize', parseInt(e.target.value))}
                  class="size-slider"
                />
                <div class="size-value">${this.settings.fontSize}px</div>
              </div>
            </div>
          ` : ''}

          <button class="settings-item" @click=${() => this.showFontSettings = true}>
            <div class="item-content">
              <div class="item-title">Font Family</div>
              <div class="item-subtitle">${this.settings.fontFamily}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>

        ${this.showDarkModePopup ? html`
          <slm-dark-mode-popup
            .currentMode=${this.settings.darkMode}
            @mode-selected=${(e) => {
              this.handleSettingChange('darkMode', e.detail.mode);
              this.showDarkModePopup = false;
            }}
            @close=${() => this.showDarkModePopup = false}
          ></slm-dark-mode-popup>
        ` : ''}

        ${this.showFontSettings ? html`
          <slm-font-settings
            .currentFont=${this.settings.fontFamily}
            @font-selected=${(e) => {
              this.handleSettingChange('fontFamily', e.detail.font);
              this.showFontSettings = false;
            }}
            @close=${() => this.showFontSettings = false}
          ></slm-font-settings>
        ` : ''}
      </div>
    `;
  }

  getDarkModeLabel() {
    switch (this.settings.darkMode) {
      case 'on': return 'On';
      case 'off': return 'Off';
      case 'system': return 'As on Device';
      default: return 'As on Device';
    }
  }

  static styles = css`
    .appearance-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      -webkit-tap-highlight-color: transparent;
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      -webkit-tap-highlight-color: transparent;
    }
    .item-content {
      flex: 1;
    }
    .item-content.full-width {
      width: 100%;
    }
    .item-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
      color: var(--primary-text-color);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .tile-options {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .tile-option {
      flex: 1;
      padding: 10px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: var(--primary-text-color);
      -webkit-tap-highlight-color: transparent;
    }
    .tile-option.selected {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    .size-slider {
      width: 100%;
      margin: 12px 0;
    }
    .size-value {
      text-align: center;
      font-weight: 600;
      color: var(--primary-color);
    }
    .toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
    }
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--disabled-color);
      transition: 0.3s;
      border-radius: 28px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background: var(--primary-color);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `;
}

customElements.define('slm-appearance-settings', SLMAppearanceSettings);