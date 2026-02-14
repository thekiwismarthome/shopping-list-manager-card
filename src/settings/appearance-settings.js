import { LitElement, html, css } from 'lit';
import './dark-mode-popup.js';
import './font-settings.js';

class AppearanceSettings extends LitElement {
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
          <!-- Theme -->
          <button class="settings-item">
            <div class="item-content">
              <div class="item-title">Theme</div>
              <div class="item-subtitle">${this.settings.theme}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Dark Mode -->
          <button class="settings-item" @click=${() => this.showDarkModePopup = true}>
            <div class="item-content">
              <div class="item-title">Dark Mode</div>
              <div class="item-subtitle">${this.getDarkModeLabel()}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Font Section -->
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
          <dark-mode-popup
            .currentMode=${this.settings.darkMode}
            @mode-selected=${(e) => {
              this.handleSettingChange('darkMode', e.detail.mode);
              this.showDarkModePopup = false;
            }}
            @close=${() => this.showDarkModePopup = false}
          ></dark-mode-popup>
        ` : ''}

        ${this.showFontSettings ? html`
          <font-settings
            .currentFont=${this.settings.fontFamily}
            @font-selected=${(e) => {
              this.handleSettingChange('fontFamily', e.detail.font);
              this.showFontSettings = false;
            }}
            @close=${() => this.showFontSettings = false}
          ></font-settings>
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
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
    }
    .back-btn:hover {
      background: var(--primary-background-color);
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .section-header {
      padding: 16px 20px 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
    }
    .settings-item:hover {
      background: var(--primary-background-color);
    }
    .item-content {
      flex: 1;
    }
    .item-content.full-width {
      width: 100%;
    }
    .item-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .item-subtitle {
      font-size: 14px;
      color: var(--secondary-text-color);
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
      background-color: var(--primary-color);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `;
}

customElements.define('appearance-settings', AppearanceSettings);