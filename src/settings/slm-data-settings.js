import { LitElement, html, css } from 'lit';

class SLMDataSettings extends LitElement {
  static properties = {
    api: { type: Object },
    _currentCountry: { type: String, state: true },
    _availableCountries: { type: Object, state: true },
    _loading: { type: Boolean, state: true },
    _saving: { type: Boolean, state: true },
    _successMessage: { type: String, state: true },
    _errorMessage: { type: String, state: true },
  };

  constructor() {
    super();
    this._currentCountry = null;
    this._availableCountries = {};
    this._loading = true;
    this._saving = false;
    this._successMessage = '';
    this._errorMessage = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._loadSettings();
  }

  async _loadSettings() {
    this._loading = true;
    try {
      const result = await this.api.getIntegrationSettings();
      this._currentCountry = result.country;
      this._availableCountries = result.available_countries || {};
    } catch (err) {
      this._errorMessage = 'Failed to load region settings.';
      console.error('[SLM] Failed to load integration settings:', err);
    } finally {
      this._loading = false;
    }
  }

  async _handleCountrySelect(code) {
    if (code === this._currentCountry || this._saving) return;

    const countryName = this._availableCountries[code] || code;
    const confirmed = confirm(
      `Switch to ${countryName}?\n\nDefault catalog products will be replaced with ${countryName} products. Your custom products are kept.`
    );
    if (!confirmed) return;

    this._saving = true;
    this._successMessage = '';
    this._errorMessage = '';
    try {
      const result = await this.api.setCountry(code);
      this._currentCountry = result.country;
      this._successMessage = `✓ Switched to ${countryName} — ${result.products_loaded} products loaded`;
    } catch (err) {
      this._errorMessage = 'Failed to switch region. Please try again.';
      console.error('[SLM] Failed to set country:', err);
    } finally {
      this._saving = false;
    }
  }

  render() {
    return html`
      <div class="data-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Region &amp; Catalog</h2>
        </div>

        ${this._loading ? html`
          <div class="loading">Loading…</div>
        ` : html`
          <div class="settings-list">
            <div class="section-header">Product Catalog Region</div>

            <div class="settings-item">
              <div class="item-content full-width">
                <div class="item-title">Region</div>
                <div class="item-subtitle">
                  Selects which country's product catalog is used for suggestions and pricing.
                  Custom products you've added are always kept.
                </div>
                <div class="country-options">
                  ${Object.entries(this._availableCountries).map(([code, name]) => html`
                    <button
                      class="country-btn ${this._currentCountry === code ? 'selected' : ''}"
                      ?disabled=${this._saving}
                      @click=${() => this._handleCountrySelect(code)}
                    >
                      <span class="country-code">${code}</span>
                      <span class="country-name">${name}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>

            ${this._successMessage ? html`
              <div class="message success">${this._successMessage}</div>
            ` : ''}
            ${this._errorMessage ? html`
              <div class="message error">${this._errorMessage}</div>
            ` : ''}

            ${this._saving ? html`
              <div class="message info">Switching catalog…</div>
            ` : ''}

            <div class="section-header">About</div>
            <div class="settings-item">
              <div class="item-content">
                <div class="item-title">How it works</div>
                <div class="item-subtitle">
                  Switching region replaces the default product catalog (names, prices, brands)
                  with one suited to your country. Any products you've created or customised
                  are preserved. The change takes effect immediately — no restart needed.
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  static styles = css`
    .data-settings {
      padding-bottom: 80px;
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
      -webkit-tap-highlight-color: transparent;
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--slm-text-primary);
    }
    .loading {
      padding: 32px;
      text-align: center;
      color: var(--slm-text-secondary);
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
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      border-bottom: 1px solid var(--slm-border-subtle);
      box-sizing: border-box;
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
      margin-bottom: 4px;
      color: var(--slm-text-primary);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--slm-text-secondary);
      line-height: 1.5;
    }
    .country-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }
    .country-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 14px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: all 0.15s;
      min-width: 64px;
    }
    .country-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .country-btn.selected {
      background: var(--slm-accent-primary);
      border-color: var(--slm-accent-primary);
    }
    .country-code {
      font-size: 15px;
      font-weight: 700;
      color: var(--slm-text-primary);
    }
    .country-btn.selected .country-code,
    .country-btn.selected .country-name {
      color: white;
    }
    .country-name {
      font-size: 10px;
      color: var(--slm-text-secondary);
      margin-top: 2px;
      text-align: center;
    }
    .message {
      margin: 8px 16px;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
    }
    .message.success {
      background: rgba(129, 199, 132, 0.2);
      color: var(--slm-accent-secondary, #81c784);
    }
    .message.error {
      background: rgba(239, 154, 154, 0.2);
      color: var(--slm-accent-danger, #ef9a9a);
    }
    .message.info {
      background: rgba(159, 168, 218, 0.15);
      color: var(--slm-accent-primary, #9fa8da);
    }
  `;
}

customElements.define('slm-data-settings', SLMDataSettings);
