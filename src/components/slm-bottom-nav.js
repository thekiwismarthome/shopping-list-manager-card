import { LitElement, html, css } from 'lit';
import { fontInherit } from '../styles/ui-styles.js';
import { t, I18nController } from '../services/translator.js';

const TABS = [
  { view: 'shopping', emoji: '🛒', icon: 'mdi:cart-outline',                  label: 'Shopping' },
  { view: 'lists',    emoji: '📋', icon: 'mdi:format-list-bulleted',          label: 'Lists' },
  { view: 'loyalty',  emoji: '💳', icon: 'mdi:card-account-details-outline',  label: 'Loyalty' },
  { view: 'settings', emoji: '⚙️', icon: 'mdi:cog-outline',                   label: 'Settings' },
];

class SLMBottomNav extends LitElement {
  _i18n = new I18nController(this);

  static properties = {
    currentView: { type: String },
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true }
  };

  constructor() {
    super();
    this.uiStyle = 'classic';
  }

  handleNavClick(view) {
    this.dispatchEvent(new CustomEvent('nav-changed', {
      detail: { view },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const classic = !this.uiStyle || this.uiStyle === 'classic';
    return html`
      <nav class="bottom-nav" aria-label=${t('Main')}>
        ${TABS.map(tab => html`
          <button
            class="nav-item ${this.currentView === tab.view ? 'active' : ''}"
            aria-current=${this.currentView === tab.view ? 'page' : 'false'}
            @click=${() => this.handleNavClick(tab.view)}
          >
            ${classic
              ? html`<span class="emoji">${tab.emoji}</span>`
              : html`<ha-icon class="nav-icon" icon=${tab.icon}></ha-icon>`}
            <span class="label">${t(tab.label)}</span>
          </button>
        `)}
      </nav>
    `;
  }

  static styles = [css`
    .bottom-nav {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: var(--slm-bg-surface);
      border-top: 1px solid var(--slm-border-subtle);
      padding: 6px 0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
      z-index: 100;
    }
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px;
      border: none;
      background: transparent;
      color: var(--slm-text-secondary);
      cursor: pointer;
      transition: color 0.2s;
      -webkit-tap-highlight-color: transparent;
      outline: none;
    }
    .nav-item.active {
      color: var(--slm-accent-primary);
    }
    .emoji {
      font-size: 22px;
    }
    .label {
      font-size: 11px;
      font-weight: 500;
    }
    .nav-icon {
      --mdc-icon-size: 24px;
      color: inherit;
      --icon-primary-color: currentColor;
    }

    /* ---------- Fresh: floating pill bar ---------- */
    :host([ui-style="fresh"]) {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 12px;
      z-index: 100;
    }
    :host([ui-style="fresh"]) .bottom-nav {
      position: static;
      border: 1px solid var(--slm-border-subtle);
      border-radius: 28px;
      padding: 8px;
      gap: 4px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.14);
    }
    :host([ui-style="fresh"]) .nav-item {
      min-height: 56px;
      justify-content: center;
      border-radius: 20px;
      padding: 4px 2px;
      gap: 3px;
      font-weight: 600;
      transition: background 0.2s, color 0.2s;
    }
    :host([ui-style="fresh"]) .nav-item.active {
      background: color-mix(in srgb, var(--slm-accent-primary) 16%, var(--slm-bg-surface));
      font-weight: 700;
    }
    :host([ui-style="fresh"]) .label {
      font-size: 11.5px;
      font-weight: inherit;
    }

    /* ---------- Compact: flat tab bar with an indicator ---------- */
    :host([ui-style="compact"]) .bottom-nav {
      padding: 0;
      box-shadow: none;
    }
    :host([ui-style="compact"]) .nav-item {
      position: relative;
      min-height: 60px;
      justify-content: center;
      gap: 4px;
    }
    :host([ui-style="compact"]) .nav-item.active {
      font-weight: 700;
    }
    :host([ui-style="compact"]) .nav-item.active::before {
      content: "";
      position: absolute;
      top: -1px;
      left: 30%;
      right: 30%;
      height: 3px;
      border-radius: 0 0 3px 3px;
      background: var(--slm-accent-primary);
    }
  `, fontInherit];
}

customElements.define('slm-bottom-nav', SLMBottomNav);
