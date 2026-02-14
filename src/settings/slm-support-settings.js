import { LitElement, html, css } from 'lit';

class SupportSettings extends LitElement {
  render() {
    return html`
      <div class="slm-support-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>FAQ & Support</h2>
        </div>

        <div class="support-list">
          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager/wiki" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:help-circle"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ</div>
              <div class="item-subtitle">Frequently asked questions</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager/issues" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:bug"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Report a Problem</div>
              <div class="item-subtitle">Submit an issue on GitHub</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:github"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">GitHub Repository</div>
              <div class="item-subtitle">View source code</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <div class="support-item">
            <div class="item-icon">
              <ha-icon icon="mdi:information"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Version</div>
              <div class="item-subtitle">3.0.0</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .slm-support-settings {
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
    .support-list {
      padding: 8px 0;
    }
    .support-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: background 0.2s;
    }
    .support-item:hover {
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
  `;
}

customElements.define('slm-support-settings', SupportSettings);