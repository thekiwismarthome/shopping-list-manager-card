import { t, I18nController } from '../services/translator.js';
import { LitElement, html, css } from 'lit';
import { subPageStyles } from '../styles/ui-styles.js';

class SupportSettings extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    // 'classic' | 'fresh' | 'compact' (set by the settings view)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    slmVersion:  { type: String },
    slmcVersion: { type: String },
  };

  constructor() {
    super();
    this.slmVersion  = '…';
    this.slmcVersion = '…';
  }

  render() {
    return html`
      <div class="slm-support-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>${t('FAQ & Support')}</h2>
        </div>

        <div class="support-list settings-list">
          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager/wiki" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:help-circle"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">${t('FAQ')}</div>
              <div class="item-subtitle">${t('Frequently asked questions')}</div>
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
              <div class="item-title">${t('Report a Problem')}</div>
              <div class="item-subtitle">${t('Submit an issue on GitHub')}</div>
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
              <div class="item-title">${t('GitHub Repository')}</div>
              <div class="item-subtitle">${t('View source code')}</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <div class="support-item">
            <div class="item-icon">
              <ha-icon icon="mdi:information"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Shopping List Manager</div>
              <div class="item-subtitle">Integration version ${this.slmVersion}</div>
            </div>
          </div>

          <div class="support-item">
            <div class="item-icon">
              <ha-icon icon="mdi:information"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">SLM Card</div>
              <div class="item-subtitle">Card version ${this.slmcVersion}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [css`
    :host {
      display: block;
    }
    .slm-support-settings {
      padding-bottom: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      color: var(--slm-text-primary);
    }
    .back-btn:hover {
      background: var(--slm-bg-elevated);
    }
    ha-icon {
      color: var(--slm-text-primary);
      --icon-primary-color: var(--slm-text-primary);
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
      border-bottom: 1px solid var(--slm-border-subtle);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: background 0.2s;
    }
    .support-item:hover {
      background: var(--slm-bg-elevated);
    }
    .item-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--slm-accent-primary);
      color: var(--slm-accent-ink, white);
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
      color: var(--slm-text-secondary);
    }
    :host([ui-style="fresh"]) .support-item,
    :host([ui-style="compact"]) .support-item {
      padding: 12px 16px;
      min-height: 60px;
      box-sizing: border-box;
    }
    :host([ui-style="fresh"]) .support-item:last-child,
    :host([ui-style="compact"]) .support-item:last-child {
      border-bottom: none;
    }
    :host([ui-style="fresh"]) .item-icon,
    :host([ui-style="compact"]) .item-icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--slm-accent-primary) 18%, var(--slm-bg-surface));
      color: var(--slm-accent-primary);
    }
    :host([ui-style="fresh"]) .item-icon ha-icon,
    :host([ui-style="compact"]) .item-icon ha-icon {
      --mdc-icon-size: 20px;
      color: inherit;
    }
    :host([ui-style="fresh"]) .item-subtitle,
    :host([ui-style="compact"]) .item-subtitle {
      font-size: 12.5px;
    }
  `, subPageStyles];
}

customElements.define('slm-support-settings', SupportSettings);