import { LitElement, html, css } from 'lit';
import { fontInherit } from '../styles/ui-styles.js';
import { t, I18nController } from '../services/translator.js';
import { settingsGroupStyles } from '../styles/ui-styles.js';
import './slm-font-settings.js';

// Interface styles the user can pick between (see styles in each component)
const UI_STYLES = [
  { id: 'fresh',   label: 'Fresh',   hint: 'Soft cards, summary card, floating menu' },
  { id: 'compact', label: 'Compact', hint: 'Dense list, checkboxes, flat tab bar' },
];

class SLMAppearanceSettings extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    settings: { type: Object },
    isEmbedded: { type: Boolean },
    // 'classic' | 'fresh' | 'compact' (current interface style)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    showFontSettings: { type: Boolean }
  };

  constructor() {
    super();
    this.uiStyle = 'classic';
    this.isEmbedded = false;
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
          <h2>${t('Appearance')}</h2>
        </div>

        <div class="settings-list">
          <div class="section-header">${t('Interface style')}</div>
          <div class="group">
            <div class="settings-item">
              <div class="item-content full-width">
                <div class="style-options" role="radiogroup" aria-label=${t('Interface style')}>
                  ${UI_STYLES.map(s => html`
                    <button
                      class="style-option ${this._style() === s.id ? 'selected' : ''}"
                      role="radio"
                      aria-checked=${this._style() === s.id ? 'true' : 'false'}
                      @click=${() => this.handleSettingChange('uiStyle', s.id)}
                    >
                      <span class="sp sp-${s.id}" aria-hidden="true"></span>
                      <span class="so-label">${t(s.label)}</span>
                      <span class="so-hint">${t(s.hint)}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>
          </div>

          <div class="section-header">${t('Colour mode')}</div>
          <div class="group">
            <div class="settings-item">
              <div class="item-content full-width">
                <div class="mode-seg" role="radiogroup" aria-label=${t('Colour mode')}>
                  ${[['light', 'Light'], ['dark', 'Dark'], ['device', 'Match device']].map(([val, label]) => html`
                    <button
                      role="radio"
                      aria-checked=${this._modeValue() === val ? 'true' : 'false'}
                      class="mode-opt ${this._modeValue() === val ? 'selected' : ''}"
                      @click=${() => this.handleSettingChange('darkMode', val === 'dark' ? 'on' : val === 'light' ? 'off' : 'device')}
                    >${t(label)}</button>
                  `)}
                </div>
              </div>
            </div>
          </div>

          <div class="section-header">${t('Display')}</div>
          <div class="group">

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">${t('Use Emojis Instead of Icons')}</div>
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
              <div class="item-title">${t('Tiles Per Row')}</div>
              <div class="tile-options">
                ${[2, 3, 4, 5, 8, 10].map(num => html`
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

          </div>

          <div class="section-header">${t('Recently Used')}</div>
          <div class="group">

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">${t('Recently Used Products')}</div>
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

          </div>

          <div class="section-header">${t('Product Images')}</div>
          <div class="group">

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">${t('Local HA Image Path')}</div>
              <div class="item-subtitle">${t('Auto-match images by product name slug')}</div>
              <input
                class="text-input"
                type="text"
                placeholder="/local/images/groceries"
                .value=${this.settings.localImagePath || ''}
                @change=${(e) => this.handleSettingChange('localImagePath', e.target.value.trim())}
              />
            </div>
          </div>

          </div>

          <div class="section-header">${t('Font')}</div>
          <div class="group">

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">${t('Use system text size')}</div>
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
                <div class="item-title">${t('Font Size')}</div>
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

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">Font Weight</div>
              <div class="tile-options">
                ${[['light', 'Light'], ['normal', 'Regular'], ['bold', 'Bold']].map(([val, label]) => html`
                  <button
                    class="tile-option ${(this.settings.fontWeight || 'normal') === val ? 'selected' : ''}"
                    style="font-weight: ${val === 'light' ? '300' : val === 'bold' ? '700' : '400'}"
                    @click=${() => this.handleSettingChange('fontWeight', val)}
                  >${label}</button>
                `)}
              </div>
            </div>
          </div>

          <button class="settings-item" @click=${() => this.showFontSettings = true}>
            <div class="item-content">
              <div class="item-title">Font Family</div>
              <div class="item-subtitle">${this.settings.fontFamily === 'system' || !this.settings.fontFamily ? t('Design default') : this.settings.fontFamily}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
          </div>
        </div>

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

  // Effective colour mode shown in the selector: 'light' | 'dark' | 'device'
  _modeValue() {
    const m = this.settings.darkMode;
    if (m === 'on') return 'dark';
    if (m === 'off') return 'light';
    if (m === 'device') return 'device';
    return this._style() === 'compact' ? 'dark' : 'light';
  }

  _style() {
    return this.settings.uiStyle === 'compact' ? 'compact' : 'fresh';
  }

  static styles = [css`
    .style-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .style-option {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 8px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 14px;
      background: transparent;
      color: var(--slm-text-primary);
      text-align: left;
      cursor: pointer;
      font: inherit;
      -webkit-tap-highlight-color: transparent;
    }
    .style-option.selected {
      border-color: var(--slm-accent-primary);
      background: color-mix(in srgb, var(--slm-accent-primary) 10%, transparent);
    }
    .style-option:focus-visible {
      outline: 2px solid var(--slm-accent-primary);
      outline-offset: 2px;
    }
    .mode-seg {
      display: flex;
      gap: 4px;
      padding: 4px;
      border-radius: 16px;
      background: var(--slm-bg-elevated);
    }
    .mode-opt {
      flex: 1;
      min-height: 44px;
      padding: 0 8px;
      border: none;
      border-radius: 12px;
      background: transparent;
      color: var(--slm-text-secondary);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .mode-opt.selected {
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      font-weight: 700;
      box-shadow: var(--slm-shadow-soft);
    }
    .so-label {
      font-size: 13px;
      font-weight: 700;
    }
    .so-hint {
      font-size: 11px;
      line-height: 1.25;
      color: var(--slm-text-secondary);
    }
    /* tiny drawings of each style */
    .sp {
      position: relative;
      display: block;
      height: 58px;
      border-radius: 8px;
      background: var(--slm-bg-main);
      border: 1px solid var(--slm-border-subtle);
      overflow: hidden;
    }
    .sp::before {
      content: "";
      position: absolute;
      left: 6px;
      right: 6px;
      top: 6px;
      height: 8px;
      border-radius: 3px;
      background: var(--slm-border-subtle);
    }
    .sp::after {
      content: "";
      position: absolute;
      left: 6px;
      right: 6px;
      top: 20px;
      height: 14px;
      border-radius: 3px;
      background: var(--slm-bg-surface);
      box-shadow: 0 16px 0 -2px var(--slm-bg-surface);
    }
    .sp-fresh::after {
      border-radius: 7px;
      border: 1px solid var(--slm-border-subtle);
      box-sizing: border-box;
      height: 16px;
    }
    .sp-fresh {
      background-image: linear-gradient(var(--slm-accent-primary), var(--slm-accent-primary));
      background-repeat: no-repeat;
      background-size: 60% 7px;
      background-position: center bottom 5px;
    }
    .sp-compact {
      background-image: linear-gradient(var(--slm-accent-primary), var(--slm-accent-primary));
      background-repeat: no-repeat;
      background-size: 26% 3px;
      background-position: 50% bottom 0;
    }
    .sp-compact::after {
      border-radius: 0;
      box-shadow: none;
      border-bottom: 1px solid var(--slm-border-subtle);
      background: transparent;
      height: 8px;
      top: 22px;
    }

    .theme-select {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 13px;
      cursor: pointer;
    }

    :host {
      display: block;
    }
    .appearance-settings {
      padding-bottom: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: var(--slm-text-primary);
      -webkit-tap-highlight-color: transparent;
    }
    ha-icon {
      color: var(--slm-text-primary);
      --icon-primary-color: var(--slm-text-primary);
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--slm-text-primary);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--slm-text-secondary);
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
      border-bottom: 1px solid var(--slm-border-subtle);
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
      color: var(--slm-text-primary);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--slm-text-secondary);
    }
    .tile-options {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .tile-option {
      flex: 1;
      padding: 10px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: var(--slm-text-primary);
      -webkit-tap-highlight-color: transparent;
    }
    .tile-option.selected {
      background: var(--slm-accent-primary);
      color: white;
      border-color: var(--slm-accent-primary);
    }
    .size-slider {
      accent-color: var(--slm-accent-primary);
      width: 100%;
      margin: 12px 0;
    }
    .size-value {
      text-align: center;
      font-weight: 600;
      color: var(--slm-accent-primary);
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
      background: var(--slm-accent-primary);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
    .text-input {
      box-sizing: border-box;
      width: 100%;
      margin-top: 10px;
      padding: 9px 12px;
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: var(--slm-text-primary);
      background: var(--slm-bg-elevated);
    }
    .text-input:focus {
      outline: none;
      border-color: var(--slm-accent-primary);
    }
  `, settingsGroupStyles, fontInherit];
}

customElements.define('slm-appearance-settings', SLMAppearanceSettings);