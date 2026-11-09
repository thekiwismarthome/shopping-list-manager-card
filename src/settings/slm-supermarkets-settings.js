import { t, I18nController } from '../services/translator.js';
import { SheetSwipe } from '../services/sheet-swipe.js';
import { LitElement, html, css } from 'lit';
import { subPageStyles, bottomSheetStyles, fontInherit } from '../styles/ui-styles.js';
import '../components/list-management/slm-visibility-picker.js';
import { visibilityToApi, defaultVisibility } from '../components/list-management/slm-visibility-picker.js';

/**
 * Settings > Supermarkets. The shops you use, with where they are (an address and/or coordinates)
 * so automations can use them later. Pick a chain for your region or type any name.
 */
class SLMSupermarketsSettings extends LitElement {
  _i18n = new I18nController(this);
  _swipe = new SheetSwipe(this); // swipe the form down to close it
  static properties = {
    // 'classic' | 'fresh' | 'compact' (set by the settings view)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    api: { type: Object },
    isAdmin: { type: Boolean },
    _shops: { type: Array, state: true },
    _chains: { type: Array, state: true },
    _country: { type: String, state: true },
    _groups: { type: Array, state: true },
    _myGroupIds: { type: Array, state: true },
    _loading: { type: Boolean, state: true },
    _busy: { type: Boolean, state: true },
    _form: { type: Object, state: true },
    _visibility: { type: String, state: true },
    _message: { type: String, state: true },
  };

  constructor() {
    super();
    this.isAdmin = false;
    this._shops = [];
    this._chains = [];
    this._country = '';
    this._groups = [];
    this._myGroupIds = [];
    this._loading = true;
    this._busy = false;
    this._form = null;
    this._visibility = 'private';
    this._message = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  async _load() {
    if (!this.api) return;
    this._loading = true;
    try {
      const [chains, shops, groups] = await Promise.all([
        this.api.getSupermarketChains().catch(() => ({ chains: [], country: '' })),
        this.api.getSupermarkets(),
        this.api.getGroups().catch(() => ({ groups: [], mine: [] })),
      ]);
      this._chains = chains.chains || [];
      this._country = chains.country || '';
      this._shops = shops.supermarkets || [];
      this._groups = groups.groups || [];
      this._myGroupIds = groups.mine || [];
    } catch (err) {
      this._message = `error:${(err && err.message) || t('Could not load your supermarkets.')}`;
    } finally {
      this._loading = false;
    }
  }

  // -- The form -----------------------------------------------------------------

  _openAdd() {
    this._message = '';
    this._visibility = defaultVisibility(this._groups, this._myGroupIds);
    this._form = { id: null, chain_id: null, name: '', address: '', latitude: '', longitude: '' };
  }

  _openEdit(shop) {
    this._message = '';
    this._form = {
      id: shop.id, chain_id: shop.chain_id || null, name: shop.name, address: shop.address || '',
      latitude: shop.latitude == null ? '' : String(shop.latitude),
      longitude: shop.longitude == null ? '' : String(shop.longitude),
    };
  }

  _closeForm() {
    this._form = null;
  }

  _set(key, value) {
    this._form = { ...this._form, [key]: value };
  }

  _pickChain(chain) {
    // Choosing the chain again lets you type your own name
    if (this._form.chain_id === chain.id) { this._form = { ...this._form, chain_id: null }; return; }
    const keepName = this._form.name && !this._chains.some(c => c.name === this._form.name);
    this._form = { ...this._form, chain_id: chain.id, name: keepName ? this._form.name : chain.name };
  }

  _useMyLocation() {
    if (!navigator.geolocation) {
      this._message = `error:${t('Your browser cannot share its location.')}`;
      return;
    }
    this._message = '';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this._form = {
          ...this._form,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        };
      },
      () => { this._message = `error:${t('Could not get your location. Location needs a secure (HTTPS) connection and your permission.')}`; },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  // Both coordinates, or neither. Returns the numbers, null for none, or false if they are not valid.
  _coordinates() {
    const lat = String(this._form.latitude ?? '').trim();
    const lng = String(this._form.longitude ?? '').trim();
    if (!lat && !lng) return { latitude: null, longitude: null };
    if (!lat || !lng) return false;
    const la = Number(lat), lo = Number(lng);
    if (!Number.isFinite(la) || !Number.isFinite(lo) || Math.abs(la) > 90 || Math.abs(lo) > 180) return false;
    return { latitude: la, longitude: lo };
  }

  async _save() {
    const f = this._form;
    const name = (f.name || '').trim();
    if (!name) { this._message = `error:${t('Give the supermarket a name.')}`; return; }
    const coords = this._coordinates();
    if (coords === false) {
      this._message = `error:${t('Latitude and longitude must both be numbers (latitude -90 to 90, longitude -180 to 180), or both empty.')}`;
      return;
    }
    this._busy = true;
    this._message = '';
    try {
      const data = { name, chain_id: f.chain_id || null, address: (f.address || '').trim(), ...coords };
      if (f.id) {
        await this.api.updateSupermarket(f.id, data);
      } else {
        if (this._groups.length) {
          const { isPrivate, groupId } = visibilityToApi(this._visibility);
          data.private = isPrivate;
          if (groupId) data.group_id = groupId;
        }
        await this.api.addSupermarket(data);
      }
      this._form = null;
      await this._load();
    } catch (err) {
      console.error('[SLM] Supermarkets:', err);
      this._message = `error:${(err && err.message) || t('Could not save the supermarket.')}`;
    } finally {
      this._busy = false;
    }
  }

  async _delete(shop) {
    if (!confirm(t('Remove this supermarket?'))) return;
    this._busy = true;
    this._message = '';
    try {
      await this.api.deleteSupermarket(shop.id);
      await this._load();
    } catch (err) {
      this._message = `error:${(err && err.message) || t('Could not remove it.')}`;
    } finally {
      this._busy = false;
    }
  }

  // -- Rendering ----------------------------------------------------------------

  _groupName(id) {
    return (this._groups.find(g => g.id === id) || {}).name || '';
  }

  _renderShop(s) {
    const where = [s.address, s.latitude != null ? `${Number(s.latitude).toFixed(4)}, ${Number(s.longitude).toFixed(4)}` : '']
      .filter(Boolean);
    return html`
      <div class="settings-item shop">
        <ha-icon class="shop-icon" icon="mdi:storefront-outline"></ha-icon>
        <div class="shop-main">
          <div class="item-title">${s.name}</div>
          ${where.length ? where.map(w => html`<div class="item-subtitle">${w}</div>`) : html`<div class="item-subtitle">${t('No address or coordinates yet')}</div>`}
          ${s.group_id ? html`<div class="tag"><ha-icon icon="mdi:account-group"></ha-icon>${this._groupName(s.group_id)}</div>` : ''}
        </div>
        <button class="icon-btn" aria-label=${t('Edit')} @click=${() => this._openEdit(s)}><ha-icon icon="mdi:pencil-outline"></ha-icon></button>
        <button class="icon-btn danger" aria-label=${t('Delete')} @click=${() => this._delete(s)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
      </div>
    `;
  }

  _renderForm() {
    const f = this._form;
    const editing = !!f.id;
    return html`
      <div class="sheet-layer">
        <div class="scrim" @click=${this._closeForm}></div>
        <div class="sheet" role="dialog" aria-modal="true" aria-label=${editing ? t('Edit supermarket') : t('Add a supermarket')}>
          <div class="grab"></div>
          <div class="sheet-head">
            <h2>${editing ? t('Edit supermarket') : t('Add a supermarket')}</h2>
            <button class="done" ?disabled=${this._busy || !(f.name || '').trim()} @click=${this._save}>${t('Save')}</button>
          </div>

          ${this._chains.length ? html`
            <div class="label" id="chain-label">${t('Chain')}</div>
            <div class="chips" role="group" aria-labelledby="chain-label">
              ${this._chains.map(c => html`
                <button type="button" class="chip ${f.chain_id === c.id ? 'on' : ''}" aria-pressed=${f.chain_id === c.id ? 'true' : 'false'}
                        @click=${() => this._pickChain(c)}>${c.name}</button>
              `)}
            </div>
          ` : html`<p class="hint">${t('There are no built-in chains for this region. Type the name of the shop.')}</p>`}

          <label class="label" for="shop-name">${t('Name')}</label>
          <input id="shop-name" class="field" type="text" maxlength="80" placeholder=${t('e.g., PAK\'nSAVE Albany')}
                 .value=${f.name} @input=${(e) => this._set('name', e.target.value)} />

          <label class="label" for="shop-address">${t('Address')}</label>
          <input id="shop-address" class="field" type="text" maxlength="200" placeholder=${t('Street, suburb, city')}
                 .value=${f.address} @input=${(e) => this._set('address', e.target.value)} />

          <div class="label">${t('Coordinates (optional)')}</div>
          <div class="coords">
            <input class="field" type="text" inputmode="decimal" aria-label=${t('Latitude')} placeholder=${t('Latitude')}
                   .value=${f.latitude} @input=${(e) => this._set('latitude', e.target.value)} />
            <input class="field" type="text" inputmode="decimal" aria-label=${t('Longitude')} placeholder=${t('Longitude')}
                   .value=${f.longitude} @input=${(e) => this._set('longitude', e.target.value)} />
          </div>
          <button type="button" class="link-btn" @click=${this._useMyLocation}>
            <ha-icon icon="mdi:crosshairs-gps"></ha-icon>${t('Use my current location')}
          </button>

          ${!editing && this._groups.length ? html`
            <slm-visibility-picker
              .groups=${this._groups}
              .myGroupIds=${this._myGroupIds}
              .isAdmin=${this.isAdmin}
              .value=${this._visibility}
              @visibility-change=${(e) => { this._visibility = e.detail.value; }}
            ></slm-visibility-picker>
          ` : ''}

          ${this._message ? html`<div class="message error">${this._message.replace(/^error:/, '')}</div>` : ''}
        </div>
      </div>
    `;
  }

  render() {
    const msg = this._message;
    return html`
      <div class="supermarkets-settings">
        <div class="header">
          <button class="back-btn" aria-label=${t('Back')} @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>${t('Supermarkets')}</h2>
        </div>

        <div class="intro">
          ${t('Add the shops you use. The address and coordinates are saved so automations can use them later, for example to remind you of your list when you arrive.')}
        </div>

        <div class="settings-list">
          ${this._loading ? html`<div class="settings-item"><div class="item-subtitle">${t('Loading…')}</div></div>` : ''}
          ${!this._loading && !this._shops.length ? html`
            <div class="settings-item"><div class="item-subtitle">${t('No supermarkets yet.')}</div></div>` : ''}
          ${this._shops.map(s => this._renderShop(s))}
          <div class="settings-item add-row">
            <button class="action-btn" ?disabled=${this._busy} @click=${this._openAdd}>
              <ha-icon icon="mdi:plus"></ha-icon>${t('Add a supermarket')}
            </button>
          </div>
        </div>

        ${msg && !this._form ? html`<div class="message ${msg.startsWith('error') ? 'error' : 'info'}">${msg.replace(/^(success|error):/, '')}</div>` : ''}
        ${this._form ? this._renderForm() : ''}
      </div>
    `;
  }

  static styles = [css`
    :host { display: block; }
    .supermarkets-settings { padding-bottom: 24px; }
    :host([ui-style="fresh"]) .supermarkets-settings { padding-bottom: 130px; }
    .header { display: flex; align-items: center; gap: 16px; padding: 12px; border-bottom: 1px solid var(--slm-border-subtle); }
    .back-btn { background: none; border: none; padding: 8px; cursor: pointer; display: flex; align-items: center; color: var(--slm-text-primary); -webkit-tap-highlight-color: transparent; }
    ha-icon { color: var(--slm-text-primary); --icon-primary-color: var(--slm-text-primary); }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; color: var(--slm-text-primary); }
    .intro { margin: 14px 16px; font-size: 13.5px; line-height: 1.5; color: var(--slm-text-secondary); }
    .settings-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; width: 100%; box-sizing: border-box; border-bottom: 1px solid var(--slm-border-subtle); text-align: left; }
    .shop-icon { color: var(--slm-accent-text, var(--slm-accent-primary)); --icon-primary-color: var(--slm-accent-text, var(--slm-accent-primary)); flex-shrink: 0; }
    .shop-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .item-title { font-weight: 700; font-size: 15px; color: var(--slm-text-primary); overflow-wrap: anywhere; }
    .item-subtitle { font-size: 12.5px; color: var(--slm-text-secondary); line-height: 1.5; overflow-wrap: anywhere; }
    .tag { display: inline-flex; align-items: center; gap: 4px; align-self: flex-start; margin-top: 4px; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; background: var(--slm-accent-soft, var(--slm-bg-elevated)); color: var(--slm-accent-text, var(--slm-text-primary)); }
    .tag ha-icon { --mdc-icon-size: 14px; color: inherit; --icon-primary-color: currentColor; }
    .icon-btn { background: none; border: none; padding: 8px; cursor: pointer; display: flex; border-radius: 10px; flex-shrink: 0; }
    .icon-btn.danger ha-icon { color: var(--slm-accent-danger, #c0392b); --icon-primary-color: var(--slm-accent-danger, #c0392b); }
    .add-row { justify-content: flex-start; }
    .action-btn { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; padding: 0 18px; border: none; border-radius: 12px; cursor: pointer; background: var(--slm-accent-primary); color: var(--slm-accent-ink, white); font-size: 14px; font-weight: 700; }
    .action-btn ha-icon { color: inherit; --icon-primary-color: currentColor; --mdc-icon-size: 20px; }
    .action-btn:disabled { opacity: 0.5; cursor: default; }
    .message { margin: 8px 16px; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; }
    .message.error { background: rgba(239,154,154,0.2); color: var(--slm-accent-danger, #ef9a9a); }
    .message.info { background: rgba(159,168,218,0.15); color: var(--slm-accent-primary, #9fa8da); }

    /* The add / edit sheet uses the shared sheet look; these are the parts specific to it */
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip { min-height: 40px; padding: 0 14px; border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 600; border: 1px solid var(--slm-border-subtle); background: var(--slm-bg-surface); color: var(--slm-text-primary); }
    .chip.on { background: var(--slm-text-primary); border-color: var(--slm-text-primary); color: var(--slm-bg-main); font-weight: 700; }
    .hint { margin: 8px 4px; font-size: 13px; color: var(--slm-text-secondary); }
    .coords { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .link-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; min-height: 40px; padding: 0 4px; border: none; background: none; cursor: pointer; color: var(--slm-accent-text, var(--slm-accent-primary)); font-size: 14px; font-weight: 600; }
    .link-btn ha-icon { --mdc-icon-size: 18px; color: inherit; --icon-primary-color: currentColor; }
    .sheet .message { margin: 12px 0 0; }
  `, subPageStyles, bottomSheetStyles, fontInherit];
}

customElements.define('slm-supermarkets-settings', SLMSupermarketsSettings);
