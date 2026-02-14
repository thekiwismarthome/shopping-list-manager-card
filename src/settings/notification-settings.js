import { LitElement, html, css } from 'lit';

class NotificationSettings extends LitElement {
  static properties = {
    settings: { type: Object }
  };

  handleSettingChange(key, value) {
    const notifications = { ...this.settings.notifications, [key]: value };
    this.dispatchEvent(new CustomEvent('settings-changed', {
      detail: { notifications },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="notification-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Notifications</h2>
        </div>

        <div class="settings-list">
          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">List Sharing</div>
              <div class="item-description">
                Get notified when somebody shares a list with you or makes changes on shared lists
              </div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.notifications?.listSharing}
                @change=${(e) => this.handleSettingChange('listSharing', e.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">E-Mails</div>
              <div class="item-description">
                Get notified about changes to your shared lists
              </div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.notifications?.emails}
                @change=${(e) => this.handleSettingChange('emails', e.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .notification-settings {
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
    .settings-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-weight: 600;
      margin-bottom: 6px;
    }
    .item-description {
      font-size: 14px;
      color: var(--secondary-text-color);
      line-height: 1.4;
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

customElements.define('notification-settings', NotificationSettings);