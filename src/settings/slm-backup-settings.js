import { t, I18nController } from '../services/translator.js';
import { LitElement, html, css } from 'lit';
import { subPageStyles, fontInherit } from '../styles/ui-styles.js';

/** Settings > Support > Backup & Restore (moved here from Region & Catalog). */
class SLMBackupSettings extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    // 'classic' | 'fresh' | 'compact' (set by the settings view)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    api: { type: Object },
    _backupStatus: { type: String, state: true },
    _backupWorking: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this._backupStatus = '';
    this._backupWorking = false;
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

  render() {
    return html`
      <div class="backup-settings">
        <div class="header">
          <button class="back-btn" aria-label=${t('Back')} @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>${t('Backup & Restore')}</h2>
        </div>

        <div class="settings-list">
          <div class="settings-item backup-item">
            <div class="item-content full-width">
              <div class="item-title">${t('Export Data')}</div>
              <div class="item-subtitle">
                Download your custom products and lists as a JSON file.
                Catalog products are excluded — they reload automatically.
              </div>
              <button class="action-btn" ?disabled=${this._backupWorking} @click=${this._handleExport}>
                ${t('Download backup')}
              </button>
            </div>
          </div>

          <div class="settings-item backup-item">
            <div class="item-content full-width">
              <div class="item-title">${t('Import Data')}</div>
              <div class="item-subtitle">
                Restore from a backup file. Existing data is kept — only missing
                products and lists are added.
              </div>
              <label class="action-btn ${this._backupWorking ? 'disabled' : ''}">
                ${t('Choose backup file')}
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
        </div>

        ${this._backupStatus ? html`
          <div class="message ${this._backupStatus.startsWith('success') ? 'success' : 'error'}">
            ${this._backupStatus.replace(/^(success|error):/, '')}
          </div>
        ` : ''}
        ${this._backupWorking ? html`<div class="message info">${t('Working…')}</div>` : ''}
      </div>
    `;
  }

  static styles = [css`
    :host { display: block; }
    .backup-settings { padding-bottom: 20px; }
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
    ha-icon { color: var(--slm-text-primary); --icon-primary-color: var(--slm-text-primary); }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; color: var(--slm-text-primary); }
    .settings-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      width: 100%;
      text-align: left;
      border-bottom: 1px solid var(--slm-border-subtle);
      box-sizing: border-box;
    }
    .item-content { flex: 1; }
    .item-content.full-width { width: 100%; }
    .item-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; color: var(--slm-text-primary); }
    .item-subtitle { font-size: 12px; color: var(--slm-text-secondary); line-height: 1.5; }
    .message {
      margin: 8px 16px;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
    }
    .message.success { background: rgba(129,199,132,0.2); color: var(--slm-accent-secondary, #81c784); }
    .message.error { background: rgba(239,154,154,0.2); color: var(--slm-accent-danger, #ef9a9a); }
    .message.info { background: rgba(159,168,218,0.15); color: var(--slm-accent-primary, #9fa8da); }
    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      margin-top: 12px;
      padding: 0 20px;
      box-sizing: border-box;
      background: var(--slm-accent-primary);
      color: var(--slm-accent-ink, white);
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .action-btn:disabled, .action-btn.disabled { opacity: 0.5; cursor: default; }
  `, subPageStyles, fontInherit];
}

customElements.define('slm-backup-settings', SLMBackupSettings);
