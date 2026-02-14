import { LitElement, html, css } from 'lit';
import './profile-settings.js';
import './appearance-settings.js';
import './notification-settings.js';
import './category-settings.js';
import './support-settings.js';

class SettingsView extends LitElement {
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
          <!-- Profile Section -->
          <button class="settings-item" @click=${() => this.handleNavigation('profile')}>
            <div class="item-icon">
              <ha-icon icon="mdi:account"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Profile</div>
              <div class="item-subtitle">${this.hass.user?.name || 'User'}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Appearance Section -->
          <button class="settings-item" @click=${() => this.handleNavigation('appearance')}>
            <div class="item-icon">
              <ha-icon icon="mdi:palette"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Appearance</div>
              <div class="item-subtitle">Theme, dark mode, fonts</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Language -->
          <button class="settings-item">
            <div class="item-icon">
              <ha-icon icon="mdi:translate"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Language</div>
              <div class="item-subtitle">English (EN)</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Notifications -->
          <button class="settings-item" @click=${() => this.handleNavigation('notifications')}>
            <div class="item-icon">
              <ha-icon icon="mdi:bell"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Notifications</div>
              <div class="item-subtitle">List sharing, emails</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Toggles -->
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

          <!-- Lists Section -->
          <div class="section-header">Lists</div>

          <button class="settings-item" @click=${() => this.handleNavigation('categories')}>
            <div class="item-icon">
              <ha-icon icon="mdi:shape"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Manage Categories</div>
              <div class="item-subtitle">${this.categories.length} categories</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Support Section -->
          <div class="section-header">Support</div>

          <button class="settings-item" @click=${() => this.handleNavigation('support')}>
            <div class="item-icon">
              <ha-icon icon="mdi:help-circle"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ & Support</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <button class="settings-item" @click=${() => window.location.reload()}>
            <div class="item-icon">
              <ha-icon icon="mdi:refresh"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Refresh</div>
            </div>
          </button>

          <!-- App Info -->
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
          <profile-settings
            .hass=${this.hass}
            @back=${() => this.currentSection = 'main'}
          ></profile-settings>
        `;

      case 'appearance':
        return html`
          <appearance-settings
            .settings=${this.settings}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></appearance-settings>
        `;

      case 'notifications':
        return html`
          <notification-settings
            .settings=${this.settings}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></notification-settings>
        `;

      case 'categories':
        return html`
          <category-settings
            .api=${this.api}
            .categories=${this.categories}
            @back=${() => this.currentSection = 'main'}
          ></category-settings>
        `;

      case 'support':
        return html`
          <support-settings
            @back=${() => this.currentSection = 'main'}
          ></support-settings>
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
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .settings-header h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .settings-list {
      padding: 0;
    }
    .section-header {
      padding: 16px 20px 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      transition: background 0.2s;
    }
    .settings-item:hover {
      background: var(--primary-background-color);
    }
    .item-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .item-subtitle {
      font-size: 14px;
      color: var(--secondary-text-color);
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

customElements.define('settings-view', SettingsView);