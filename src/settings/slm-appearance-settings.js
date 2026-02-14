import { LitElement, html, css } from 'lit';
import './slm-dark-mode-popup.js';
import './slm-font-settings.js';

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
      <div class="slm-appearance-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <span class="emoji">◀️</span>
          </button>
          <h2>Appearance</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${() => this.showDarkModePopup = true}>
            <div class="item-content">
              <div class="item-title">Dark Mode</div>
              <div class="item-subtitle">${this.getDarkModeLabel()}</div>
            </div>
            <span class="emoji">▶️</span>
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
            <span class="emoji">▶️</span>
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
    .slm-appearance-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid #e8eaf6;
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      font-size: 20px;
    }
    .back-btn:hover {
      background: #f5f7fa;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #5f6368;
    }
    .section-header {
      padding: 16px 20px 8px;
      font-size: 13px;
      font-weight: 700;
      color: #9e9e9e;
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
      border-bottom: 1px solid #e8eaf6;
    }
    .settings-item:hover {
      background: #f5f7fa;
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
      color: #5f6368;
    }
    .item-subtitle {
      font-size: 14px;
      color: #9e9e9e;
    }
    .tile-options {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .tile-option {
      flex: 1;
      padding: 10px;
      border: 2px solid #e8eaf6;
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: #5f6368;
    }
    .tile-option:hover {
      border-color: #a8b5ff;
    }
    .tile-option.selected {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
    }
    .size-slider {
      width: 100%;
      margin: 12px 0;
    }
    .size-value {
      text-align: center;
      font-weight: 600;
      color: #667eea;
    }
    .emoji {
      font-size: 18px;
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
      background-color: #e0e0e0;
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `;
}

customElements.define('slm-appearance-settings', AppearanceSettings);