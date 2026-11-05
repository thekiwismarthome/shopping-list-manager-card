import { LitElement, html, css } from 'lit';
import { t, I18nController } from '../services/translator.js';
import { CARD_VERSION } from 'virtual:card-version';
import { settingsGroupStyles } from '../styles/ui-styles.js';
import './slm-profile-settings.js';
import './slm-appearance-settings.js';
import './slm-notification-settings.js';
import './slm-category-settings.js';
import './slm-support-settings.js';
import './slm-data-settings.js';
import './slm-ha-sync-settings.js';

class SLMSettingsView extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    hass: { type: Object },
    api: { type: Object },
    settings: { type: Object },
    isEmbedded: { type: Boolean },
    categories: { type: Array },
    lists: { type: Array },
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    currentSection: { type: String },
    _query: { type: String, state: true },
    _slmVersion:  { type: String },
    _slmcVersion: { type: String },
  };

  constructor() {
    super();
    this.uiStyle = 'classic';
    this.currentSection = 'main';
    this._query = '';
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

  get _classic() {
    return !this.uiStyle || this.uiStyle === 'classic';
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
    this._query = '';
  }

  // Row definitions for the main settings page, grouped. Each group becomes a card
  // in the Fresh / Compact styles and a titled flat list in Classic.
  _groups() {
    const s = this.settings;
    const nav = (section, emoji, icon, color, title, sub) => ({ type: 'nav', section, emoji, icon, color, title, sub });
    const toggle = (key, title, sub, checked) => ({ type: 'toggle', key, title, sub, checked });

    const groups = [];
    if (this._classic) {
      groups.push({
        id: 'account',
        rows: [nav('profile', '👤', 'mdi:account-outline', '--slm-accent-primary', t('Profile'), this.hass?.user?.name || 'User')]
      });
    }
    groups.push(
      {
        id: 'personalise',
        title: t('Personalise'),
        rows: [
          nav('appearance', '🎨', 'mdi:palette-outline', '--slm-cat-beverages', t('Appearance'), t('Theme, tiles, fonts')),
          nav('data', '🌏', 'mdi:earth', '--slm-cat-dairy', t('Region & Catalog'), t('Country-specific products and pricing')),
          nav('categories', '📦', 'mdi:shape-outline', '--slm-cat-bakery', t('Manage Categories'), `${(this.categories || []).length} ${t('categories')}`),
        ]
      },
      {
        id: 'behaviour',
        title: t('Behaviour'),
        rows: [
          toggle('openLastUsedList', t('Open last used list at launch'), '', s.openLastUsedList),
          toggle('syncAcrossDevices', t('Sync settings across devices'), t('Keep your theme and list options the same on all your devices'), s.syncAcrossDevices !== false),
          toggle('keepScreenOn', t('Keep screen turned on'), '', s.keepScreenOn),
        ]
      },
      {
        id: 'connections',
        title: t('Connections'),
        rows: [
          nav('ha-sync', '🔗', 'mdi:link-variant', '--slm-cat-produce', t('HA Todo Sync'), t('Link lists to Home Assistant todo')),
          nav('notifications', '🔔', 'mdi:bell-outline', '--slm-cat-meat', t('Notifications'), t('List sharing, emails')),
        ]
      },
      {
        id: 'support',
        title: t('Support'),
        rows: [
          nav('support', '❓', 'mdi:help-circle-outline', '--slm-cat-household', t('FAQ & Support')),
          { type: 'action', emoji: '🔄', icon: 'mdi:refresh', color: '--slm-cat-other', title: t('Refresh'), action: () => window.location.reload() },
        ]
      },
      {
        id: 'about',
        title: t('App'),
        rows: [
          { type: 'info', title: t('Shopping List Manager'), sub: `Integration version ${this._slmVersion}` },
          { type: 'info', title: t('SLM Card'), sub: `Card version ${this._slmcVersion}` },
        ]
      },
    );

    const q = (this._query || '').trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map(g => ({ ...g, rows: g.rows.filter(r => `${r.title} ${r.sub || ''}`.toLowerCase().includes(q)) }))
      .filter(g => g.rows.length);
  }

  _renderRow(r) {
    const classic = this._classic;
    if (r.type === 'toggle') {
      return html`
        <div class="settings-item">
          <div class="item-content">
            <div class="item-title">${r.title}</div>
            ${r.sub ? html`<div class="item-subtitle">${r.sub}</div>` : ''}
          </div>
          <label class="toggle">
            <input
              type="checkbox"
              aria-label=${r.title}
              .checked=${!!r.checked}
              @change=${(e) => this.handleSettingChange(r.key, e.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </div>
      `;
    }
    if (r.type === 'info') {
      return html`
        <div class="settings-item static">
          <div class="item-content">
            <div class="item-title">${r.title}</div>
            <div class="item-subtitle">${r.sub}</div>
          </div>
        </div>
      `;
    }
    // nav + action rows
    return html`
      <button class="settings-item" @click=${r.type === 'nav' ? () => this.handleNavigation(r.section) : r.action}>
        <div class="item-icon" style="--ic: var(${r.color})">
          ${classic ? html`<span class="emoji">${r.emoji}</span>` : html`<ha-icon icon=${r.icon}></ha-icon>`}
        </div>
        <div class="item-content">
          <div class="item-title">${r.title}</div>
          ${r.sub ? html`<div class="item-subtitle">${r.sub}</div>` : ''}
        </div>
        ${r.type === 'nav'
          ? (classic ? html`<span class="chevron">></span>` : html`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`)
          : ''}
      </button>
    `;
  }

  renderMainSettings() {
    const classic = this._classic;
    const name = this.hass?.user?.name || 'User';
    const groups = this._groups();
    return html`
      <div class="settings-main">
        <div class="settings-header">
          <h2>${t('Settings')}</h2>
        </div>

        ${classic ? '' : html`
          ${this._query ? '' : html`
            <button class="profile-card" @click=${() => this.handleNavigation('profile')}>
              <span class="avatar">${name.charAt(0).toUpperCase()}</span>
              <span class="pc-text">
                <span class="pc-name">${name}</span>
                <span class="pc-sub">${t('Home Assistant Account')}</span>
              </span>
              <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
            </button>
          `}
          <label class="search-settings">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <input
              type="search"
              placeholder=${t('Search settings')}
              aria-label=${t('Search settings')}
              .value=${this._query}
              @input=${(e) => { this._query = e.target.value; }}
            />
          </label>
        `}

        <div class="settings-list">
          ${groups.map(g => html`
            ${g.title ? html`<div class="section-header">${g.title}</div>` : ''}
            <div class="group">${g.rows.map(r => this._renderRow(r))}</div>
          `)}
          ${groups.length === 0 ? html`<div class="no-results">${t('No settings match')} “${this._query}”</div>` : ''}
        </div>
      </div>
    `;
  }

  render() {
    switch (this.currentSection) {
      case 'profile':
        return html`
          <slm-profile-settings
            .uiStyle=${this.uiStyle}
            .hass=${this.hass}
            @back=${() => this.currentSection = 'main'}
          ></slm-profile-settings>
        `;

      case 'appearance':
        return html`
          <slm-appearance-settings
            .settings=${this.settings}
            .isEmbedded=${this.isEmbedded}
            .uiStyle=${this.uiStyle}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-appearance-settings>
        `;

      case 'notifications':
        return html`
          <slm-notification-settings
            .uiStyle=${this.uiStyle}
            .settings=${this.settings}
            @settings-changed=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-notification-settings>
        `;

      case 'categories':
        return html`
          <slm-category-settings
            .uiStyle=${this.uiStyle}
            .api=${this.api}
            .categories=${this.categories}
            @back=${() => this.currentSection = 'main'}
          ></slm-category-settings>
        `;

      case 'support':
        return html`
          <slm-support-settings
            .uiStyle=${this.uiStyle}
            .slmVersion=${this._slmVersion}
            .slmcVersion=${this._slmcVersion}
            @back=${() => this.currentSection = 'main'}
          ></slm-support-settings>
        `;

      case 'data':
        return html`
          <slm-data-settings
            .uiStyle=${this.uiStyle}
            .api=${this.api}
            @back=${() => this.currentSection = 'main'}
          ></slm-data-settings>
        `;

      case 'ha-sync':
        return html`
          <slm-ha-sync-settings
            .uiStyle=${this.uiStyle}
            .hass=${this.hass}
            .api=${this.api}
            .lists=${this.lists}
            @lists-updated=${(e) => this.dispatchEvent(e)}
            @back=${() => this.currentSection = 'main'}
          ></slm-ha-sync-settings>
        `;

      default:
        return this.renderMainSettings();
    }
  }

  static styles = [css`
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
      box-sizing: border-box;
    }
    .settings-item.static {
      cursor: default;
    }
    .settings-item:active:not(.static) {
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
      min-width: 0;
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
    .toggle input:focus-visible + .slider {
      outline: 2px solid var(--slm-accent-primary);
      outline-offset: 2px;
    }

    /* ---------- Fresh + Compact: title, profile card, search ---------- */
    .profile-card,
    .search-settings,
    .no-results {
      display: none;
    }
    :host([ui-style="fresh"]) .settings-header,
    :host([ui-style="compact"]) .settings-header {
      border-bottom: none;
      padding: 22px 20px 4px;
    }
    :host([ui-style="fresh"]) .settings-header h2 {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    :host([ui-style="compact"]) .settings-header h2 {
      font-size: 28px;
      letter-spacing: -0.02em;
    }
    :host([ui-style="fresh"]) .profile-card,
    :host([ui-style="compact"]) .profile-card {
      display: flex;
      align-items: center;
      gap: 14px;
      width: calc(100% - 32px);
      margin: 12px 16px 0;
      padding: 14px;
      box-sizing: border-box;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      text-align: left;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    :host([ui-style="fresh"]) .profile-card {
      border-radius: 24px;
    }
    :host([ui-style="compact"]) .profile-card {
      border-radius: 18px;
      border: none;
      padding: 12px 14px;
    }
    .avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--slm-accent-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 800;
      flex-shrink: 0;
    }
    :host([ui-style="compact"]) .avatar {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
    .pc-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .pc-name {
      font-size: 16px;
      font-weight: 700;
    }
    .pc-sub {
      font-size: 12px;
      color: var(--slm-text-secondary);
    }
    :host([ui-style="fresh"]) .search-settings,
    :host([ui-style="compact"]) .search-settings {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 12px 16px 0;
      padding: 0 14px;
      min-height: 46px;
      background: var(--slm-bg-surface);
      border: 1px solid var(--slm-border-subtle);
      color: var(--slm-text-secondary);
    }
    :host([ui-style="fresh"]) .search-settings {
      border-radius: 16px;
    }
    :host([ui-style="compact"]) .search-settings {
      border-radius: 14px;
    }
    .search-settings ha-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }
    .search-settings input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      font: inherit;
      font-size: 15px;
      color: var(--slm-text-primary);
    }
    .search-settings input::placeholder {
      color: var(--slm-text-secondary);
    }
    :host([ui-style="fresh"]) .no-results,
    :host([ui-style="compact"]) .no-results {
      display: block;
      padding: 24px 8px;
      text-align: center;
      color: var(--slm-text-secondary);
      font-size: 14px;
    }
  `, settingsGroupStyles];
}

customElements.define('slm-settings-view', SLMSettingsView);
