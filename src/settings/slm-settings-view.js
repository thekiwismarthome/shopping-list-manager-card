import { LitElement, html, css } from 'lit';
import './slm-profile-settings.js';
import './slm-appearance-settings.js';
import './slm-notification-settings.js';
import './slm-category-settings.js';
import './slm-support-settings.js';

class SLMSettingsView extends LitElement {
  static properties = {
    hass: { type: Object },
    api: { type: Object },
    settings: { type: Object },
    categories: { type: Array },
    currentSection: { type: String }
  };

  constructor() {
    super();
    this.currentSection = 'main';
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
          <h2>Settings</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${() => this.handleNavigation('profile')}>
            <div class="item-icon">
              <span class="emoji">👤</span>
            </div>
            <div class="item-content">
              <div class="item-title">Profile</div>
              <div class="item-subtitle">${this.hass.user?.name || 'User'}</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <button class="settings-item" @click=${() => this.handleNavigation('appearance')}>
            <div class="item-icon">
              <span class="emoji">🎨</span>
            </div>
            <div class="item-content">
              <div class="item-title">Appearance</div>
              <div class="item-subtitle">Theme, tiles, fonts</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <button class="settings-item" @click=${() => this.handleNavigation('notifications')}>
            <div class="item-icon">
              <span class="emoji">🔔</span>
            </div>
            <div class="item-content">
              <div class="item-title">Notifications</div>
              <div class="item-subtitle">List sharing, emails</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <div class="section-header">Preferences</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Open last used list at launch</div>
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
              <div class="item-title">Keep screen turned on</div>
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

          <div class="section-header">Lists</div>

          <button class="settings-item" @click=${() => this.handleNavigation('categories')}>
            <div class="item-icon">
              <span class="emoji">📦</span>
            </div>
            <div class="item-content">
              <div class="item-title">Manage Categories</div>
              <div class="item-subtitle">${this.categories.length} categories</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <div class="section-header">Support</div>

          <button class="settings-item" @click=${() => this.handleNavigation('support')}>
            <div class="item-icon">
              <span class="emoji">❓</span>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ & Support</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <button class="settings-item" @click=${() => window.location.reload()}>
            <div class="item-icon">
              <span class="emoji">🔄</span>
            </div>
            <div class="item-content">
              <div class="item-title">Refresh</div>
            </div>
          </button>

          <div class="section-header">App</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Version</div>
              <div class="item-subtitle">3.0.0</div>
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
            .settings=${this.settings}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-appearance-settings>
        `;

      case 'notifications':
        return html`
          <slm-notification-settings
            .settings=${this.settings}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-notification-settings>
        `;

      case 'categories':
        return html`
          <slm-category-settings
            .api=${this.api}
            .categories=${this.categories}
            @back=${() => this.currentSection = 'main'}
          ></slm-category-settings>
        `;

      case 'support':
        return html`
          <slm-support-settings
            @back=${() => this.currentSection = 'main'}
          ></slm-support-settings>
        `;

      default:
        return this.renderMainSettings();
    }
  }

  static styles = css`
    .settings-main {
      padding-bottom: 80px;
    }
    .settings-header {
      padding: 16px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .settings-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(var(--slm-text-primary)
);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--slm-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      transition: background 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .settings-item:active {
      background: var(--surface-pastel, #fafbfc);
    }
    .item-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c5cae9 0%, #e1e8f0 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
      color: var(var(--slm-text-primary)
);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--slm-text-secondary);
    }
    .chevron {
      font-size: 14px;
      opacity: 0.4;
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
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `;
}

customElements.define('slm-settings-view', SLMSettingsView);