import { LitElement, html, css } from 'lit';
import { t } from '../localize.js';

class SLMDataSettings extends LitElement {
  static properties = {
    api: { type: Object },
    hass: { type: Object },
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
      this._errorMessage = t(this.hass, 'data.load_failed');
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
      this._backupStatus = `success:${t(this.hass, 'data.export_success', {
        products: productCount,
        productPlural: productCount !== 1 ? 's' : '',
        lists: listCount,
        listPlural: listCount !== 1 ? 's' : ''
      })}`;
    } catch (err) {
      this._backupStatus = `error:${t(this.hass, 'data.export_failed')}`;
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
        this._backupStatus = `error:${t(this.hass, 'data.invalid_backup')}`;
        return;
      }
      const result = await this.api.importData(data);
      const { products, lists, items } = result.imported || {};
      this._backupStatus = `success:${t(this.hass, 'data.import_success', {
        products,
        productPlural: products !== 1 ? 's' : '',
        lists,
        listPlural: lists !== 1 ? 's' : '',
        items,
        itemPlural: items !== 1 ? 's' : ''
      })}`;
    } catch (err) {
      this._backupStatus = `error:${t(this.hass, 'data.import_failed')}`;
      console.error('[SLM] Import failed:', err);
    } finally {
      this._backupWorking = false;
    }
  }

  async _handleCountrySelect(code) {
    if (code === this._currentCountry || this._saving) return;

    const countryName = this._availableCountries[code] || code;
    const confirmed = confirm(
      t(this.hass, 'data.switch_confirm', { country: countryName })
    );
    if (!confirmed) return;

    this._saving = true;
    this._successMessage = '';
    this._errorMessage = '';
    try {
      const result = await this.api.setCountry(code);
      this._currentCountry = result.country;
      this._successMessage = `✓ ${t(this.hass, 'data.switch_success', { country: countryName, count: result.products_loaded })}`;
    } catch (err) {
      this._errorMessage = t(this.hass, 'data.switch_failed');
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
          <h2>${t(this.hass, 'settings.region_catalog')}</h2>
        </div>

        ${this._loading ? html`
          <div class="loading">${t(this.hass, 'common.loading_short')}</div>
        ` : html`
          <div class="settings-list">
            <div class="section-header">${t(this.hass, 'data.catalog_region')}</div>

            <div class="settings-item">
              <div class="item-content">
                <div class="item-title">${t(this.hass, 'data.region')}</div>
                <div class="item-subtitle">${t(this.hass, 'settings.region_catalog_subtitle')}</div>
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
              <div class="message info">${t(this.hass, 'data.switching')}</div>
            ` : ''}

            <div class="section-header">${t(this.hass, 'data.about')}</div>
            <div class="settings-item">
              <div class="item-content">
                <div class="item-title">${t(this.hass, 'data.how_it_works')}</div>
                <div class="item-subtitle">
                  ${t(this.hass, 'data.how_it_works_desc')}
                </div>
              </div>
            </div>

            <div class="section-header">${t(this.hass, 'data.backup_restore')}</div>

            <div class="settings-item backup-item">
              <div class="item-content full-width">
                <div class="item-title">${t(this.hass, 'data.export_data')}</div>
                <div class="item-subtitle">
                  ${t(this.hass, 'data.export_desc')}
                </div>
                <button
                  class="action-btn"
                  ?disabled=${this._backupWorking}
                  @click=${this._handleExport}
                >
                  ${t(this.hass, 'data.download_backup')}
                </button>
              </div>
            </div>

            <div class="settings-item backup-item">
              <div class="item-content full-width">
                <div class="item-title">${t(this.hass, 'data.import_data')}</div>
                <div class="item-subtitle">
                  ${t(this.hass, 'data.import_desc')}
                </div>
                <label class="action-btn ${this._backupWorking ? 'disabled' : ''}">
                  ${t(this.hass, 'data.choose_backup')}
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
              <div class="message info">${t(this.hass, 'common.working')}</div>
            ` : ''}

          </div>
        `}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .data-settings {
      padding-bottom: 20px;
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
