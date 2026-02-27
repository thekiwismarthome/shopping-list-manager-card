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
    _backupStatus: { type: String, state: true },
    _backupWorking: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this._currentCountry = null;
    this._availableCountries = {};
    this._loading = true;
    this._saving = false;
    this._successMessage = '';
    this._errorMessage = '';
    this._backupStatus = '';
    this._backupWorking = false;
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

  async _handleExport() {
    this._backupWorking = true;
    this._backupStatus = '';
    try {
      const data = await this.api.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `shopping_list_manager_backup_${date}.json`;
      a.click();
      URL.revokeObjectURL(url);
      const productCount = (data.user_products || []).length;
      const listCount = (data.lists || []).length;
      this._backupStatus = `success:Exported ${productCount} custom product${productCount !== 1 ? 's' : ''} and ${listCount} list${listCount !== 1 ? 's' : ''}`;
    } catch (err) {
      this._backupStatus = 'error:Export failed. Please try again.';
      console.error('[SLM] Export failed:', err);
    } finally {
      this._backupWorking = false;
    }
  }

  async _handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    this._backupWorking = true;
    this._backupStatus = '';
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.slm_backup_version) {
        this._backupStatus = 'error:Invalid backup file.';
        return;
      }
      const result = await this.api.importData(data);
      const { products, lists, items } = result.imported || {};
      this._backupStatus = `success:Imported ${products} product${products !== 1 ? 's' : ''}, ${lists} list${lists !== 1 ? 's' : ''}, ${items} item${items !== 1 ? 's' : ''}. Reload to see changes.`;
    } catch (err) {
      this._backupStatus = 'error:Import failed. Make sure the file is a valid backup.';
      console.error('[SLM] Import failed:', err);
    } finally {
      this._backupWorking = false;
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
              <div class="item-content">
                <div class="item-title">Region</div>
                <div class="item-subtitle">Country-specific products and pricing</div>
              </div>
              <select
                class="region-select"
                .value=${this._currentCountry || ''}
                ?disabled=${this._saving}
                @change=${(e) => this._handleCountrySelect(e.target.value)}
              >
                ${Object.entries(this._availableCountries).map(([code, name]) => html`
                  <option value=${code} ?selected=${this._currentCountry === code}>
                    ${code} — ${name}
                  </option>
                `)}
              </select>
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

            <div class="section-header">Backup &amp; Restore</div>

            <div class="settings-item backup-item">
              <div class="item-content full-width">
                <div class="item-title">Export Data</div>
                <div class="item-subtitle">
                  Download your custom products and lists as a JSON file.
                  Catalog products are excluded — they reload automatically.
                </div>
                <button
                  class="action-btn"
                  ?disabled=${this._backupWorking}
                  @click=${this._handleExport}
                >
                  Download backup
                </button>
              </div>
            </div>

            <div class="settings-item backup-item">
              <div class="item-content full-width">
                <div class="item-title">Import Data</div>
                <div class="item-subtitle">
                  Restore from a backup file. Existing data is kept — only missing
                  products and lists are added.
                </div>
                <label class="action-btn ${this._backupWorking ? 'disabled' : ''}">
                  Choose backup file
                  <input
                    type="file"
                    accept=".json,application/json"
                    style="display:none"
                    ?disabled=${this._backupWorking}
                    @change=${this._handleImport}
                  />
                </label>
              </div>
            </div>

            ${this._backupStatus ? html`
              <div class="message ${this._backupStatus.startsWith('success') ? 'success' : 'error'}">
                ${this._backupStatus.replace(/^(success|error):/, '')}
              </div>
            ` : ''}

            ${this._backupWorking ? html`
              <div class="message info">Working…</div>
            ` : ''}

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
    .region-select {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
    }
    .region-select:disabled {
      opacity: 0.5;
      cursor: default;
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
    .backup-item {
      flex-direction: column;
      align-items: flex-start;
    }
    .action-btn {
      display: inline-block;
      margin-top: 12px;
      padding: 9px 18px;
      background: var(--slm-accent-primary);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .action-btn:disabled,
    .action-btn.disabled {
      opacity: 0.5;
      cursor: default;
    }
  `;
}

customElements.define('slm-data-settings', SLMDataSettings);
