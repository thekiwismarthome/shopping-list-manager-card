import { LitElement, html, css } from 'lit';
import { CARD_VERSION } from 'virtual:card-version';
import { t } from '../localize.js';
import './slm-profile-settings.js';
import './slm-appearance-settings.js';
import './slm-notification-settings.js';
import './slm-category-settings.js';
import './slm-support-settings.js';
import './slm-data-settings.js';

class SLMSettingsView extends LitElement {
  static properties = {
    hass: { type: Object },
    api: { type: Object },
    settings: { type: Object },
    isEmbedded: { type: Boolean },
    categories: { type: Array },
    currentSection: { type: String },
    _slmVersion:  { type: String },
    _slmcVersion: { type: String },
  };

  constructor() {
    super();
    this.currentSection = 'main';
    this._slmVersion  = '…';
    this._slmcVersion = '…';
  }

  updated(changedProps) {
    if (changedProps.has('hass') && this.hass && this._slmVersion === '…') {
      this.hass.callWS({ type: 'hacs/repositories/list' })
        .then(repos => {
          const slm  = repos.find(r => r.full_name === 'thekiwismarthome/shopping-list-manager');
          const slmc = repos.find(r => r.full_name === 'thekiwismarthome/shopping-list-manager-card');
          this._slmVersion  = slm?.installed_version  ?? '—';
          this._slmcVersion = slmc?.installed_version ?? CARD_VERSION;
        })
        .catch(() => {
          this._slmVersion  = '—';
          this._slmcVersion = CARD_VERSION;
        });
    }
  }

  handleSettingChange(key, value) {
    this.dispatchEvent(new CustomEvent('settings-changed', {
      detail: { [key]: value },
      bubbles: true,
      composed: true
    }));
  }

  handleNavigation(section) {
    this.currentSection = section;
  }

  renderMainSettings() {
    return html`
      <div class="settings-main">
        <div class="settings-header">
          <h2>${t(this.hass, 'settings.title')}</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${() => this.handleNavigation('profile')}>
            <div class="item-icon">
              <span class="emoji">👤</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.profile')}</div>
              <div class="item-subtitle">${this.hass.user?.name || t(this.hass, 'settings.user')}</div>
            </div>
            <span class="chevron">></span>
          </button>

          <button class="settings-item" @click=${() => this.handleNavigation('appearance')}>
            <div class="item-icon">
              <span class="emoji">🎨</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.appearance')}</div>
              <div class="item-subtitle">${t(this.hass, 'settings.appearance_subtitle')}</div>
            </div>
            <span class="chevron">></span>
          </button>

          <button class="settings-item" @click=${() => this.handleNavigation('notifications')}>
            <div class="item-icon">
              <span class="emoji">🔔</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.notifications')}</div>
              <div class="item-subtitle">${t(this.hass, 'settings.notifications_subtitle')}</div>
            </div>
            <span class="chevron">></span>
          </button>

          <div class="section-header">${t(this.hass, 'settings.preferences')}</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.language')}</div>
            </div>
            <select
              class="language-select"
              .value=${this.settings.language || 'system'}
              @change=${(e) => this.handleSettingChange('language', e.target.value)}
            >
              <option value="system" ?selected=${!this.settings.language || this.settings.language === 'system'}>
                ${t(this.hass, 'language.system')}
              </option>
              <option value="en" ?selected=${this.settings.language === 'en'}>
                ${t(this.hass, 'language.en')}
              </option>
              <option value="nl" ?selected=${this.settings.language === 'nl'}>
                ${t(this.hass, 'language.nl')}
              </option>
            </select>
          </div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.open_last')}</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.openLastUsedList}
                @change=${(e) => this.handleSettingChange('openLastUsedList', e.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.keep_screen_on')}</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.keepScreenOn}
                @change=${(e) => this.handleSettingChange('keepScreenOn', e.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="section-header">${t(this.hass, 'settings.lists')}</div>

          <button class="settings-item" @click=${() => this.handleNavigation('data')}>
            <div class="item-icon">
              <span class="emoji">🌏</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.region_catalog')}</div>
              <div class="item-subtitle">${t(this.hass, 'settings.region_catalog_subtitle')}</div>
            </div>
            <span class="chevron">></span>
          </button>

          <button class="settings-item" @click=${() => this.handleNavigation('categories')}>
            <div class="item-icon">
              <span class="emoji">📦</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.categories')}</div>
              <div class="item-subtitle">${t(this.hass, 'settings.categories_count', { count: this.categories.length })}</div>
            </div>
            <span class="chevron">></span>
          </button>

          <div class="section-header">${t(this.hass, 'settings.support')}</div>

          <button class="settings-item" @click=${() => this.handleNavigation('support')}>
            <div class="item-icon">
              <span class="emoji">❓</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.faq_support')}</div>
            </div>
            <span class="chevron">></span>
          </button>

          <button class="settings-item" @click=${() => window.location.reload()}>
            <div class="item-icon">
              <span class="emoji">🔄</span>
            </div>
            <div class="item-content">
              <div class="item-title">${t(this.hass, 'settings.refresh')}</div>
            </div>
          </button>

          <div class="section-header">${t(this.hass, 'settings.app')}</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Shopping List Manager</div>
              <div class="item-subtitle">${t(this.hass, 'settings.integration_version', { version: this._slmVersion })}</div>
            </div>
          </div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">SLM Card</div>
              <div class="item-subtitle">${t(this.hass, 'settings.card_version', { version: this._slmcVersion })}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    switch (this.currentSection) {
      case 'profile':
        return html`
          <slm-profile-settings
            .hass=${this.hass}
            @back=${() => this.currentSection = 'main'}
          ></slm-profile-settings>
        `;

      case 'appearance':
        return html`
          <slm-appearance-settings
            .hass=${this.hass}
            .settings=${this.settings}
            .isEmbedded=${this.isEmbedded}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-appearance-settings>
        `;

      case 'notifications':
        return html`
          <slm-notification-settings
            .hass=${this.hass}
            .settings=${this.settings}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-notification-settings>
        `;

      case 'categories':
        return html`
          <slm-category-settings
            .hass=${this.hass}
            .api=${this.api}
            .categories=${this.categories}
            @back=${() => this.currentSection = 'main'}
          ></slm-category-settings>
        `;

      case 'support':
        return html`
          <slm-support-settings
            .hass=${this.hass}
            .slmVersion=${this._slmVersion}
            .slmcVersion=${this._slmcVersion}
            @back=${() => this.currentSection = 'main'}
          ></slm-support-settings>
        `;

      case 'data':
        return html`
          <slm-data-settings
            .hass=${this.hass}
            .api=${this.api}
            @back=${() => this.currentSection = 'main'}
          ></slm-data-settings>
        `;

      default:
        return this.renderMainSettings();
    }
  }

  static styles = css`
    :host {
      display: block;
    }
    .settings-main {
      padding-bottom: 20px;
    }
    .settings-header {
      padding: 16px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .settings-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--slm-text-primary);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 11px;
      font-weight: 700;
      color: var(--slm-text-primary);
      opacity: 0.55;
      text-transform: uppercase;
      letter-spacing: 0.06em;
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
      color: var(--slm-text-primary);
      border-bottom: 1px solid var(--slm-border-subtle);
      transition: background 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .settings-item:active {
      background: var(--slm-bg-elevated);
    }
    .item-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--slm-accent-primary) 18%, var(--slm-bg-elevated));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .item-content {
      flex: 1;
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
    .chevron {
      font-size: 14px;
      opacity: 0.4;
    }
    .language-select {
      max-width: 170px;
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
      flex-shrink: 0;
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
      background: var(--slm-border-subtle);
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
      background: var(--slm-bg-surface);
      box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      transition: 0.3s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background: var(--slm-accent-primary);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `;
}

customElements.define('slm-settings-view', SLMSettingsView);
