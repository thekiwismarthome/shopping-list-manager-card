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
    _find: { type: Object, state: true },
    _ask: { type: String, state: true },
    _locating: { type: Boolean, state: true },
    _locNote: { type: String, state: true },
    _locFail: { type: Object, state: true },
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
    this._find = { query: '', busy: false, results: null, note: '' };
    this._ask = '';          // 'nearest' | 'fill' while we are asking permission to use the location
    this._locationOk = false; // allowed for as long as this page stays open
    this._locating = false;
    this._locNote = '';
    this._locFail = null;
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
    this._resetFind();
  }

  _resetFind() {
    this._find = { query: '', busy: false, results: null, note: '' };
    this._ask = '';
    this._locNote = '';
    this._locFail = null;
  }

  _openEdit(shop) {
    this._message = '';
    this._form = {
      id: shop.id, chain_id: shop.chain_id || null, name: shop.name, address: shop.address || '',
      latitude: shop.latitude == null ? '' : String(shop.latitude),
      longitude: shop.longitude == null ? '' : String(shop.longitude),
    };
    this._resetFind();
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

  // -- Location -------------------------------------------------------------------
  // We always ask first. The position comes from this device when the page is secure (HTTPS), and
  // otherwise from the phone's Home Assistant app, through the person linked to this user.

  _askLocation(purpose) {
    this._message = '';
    this._locFail = null;
    if (this._locationOk) { this._locate(purpose); return; }
    this._ask = purpose;
  }

  _allowLocation() {
    const purpose = this._ask;
    this._ask = '';
    this._locationOk = true;
    this._locate(purpose);
  }

  _personLocation() {
    const hass = this.api?.hass;
    const uid = hass?.user?.id;
    for (const [id, st] of Object.entries(hass?.states || {})) {
      if (!id.startsWith('person.') || !uid || st.attributes?.user_id !== uid) continue;
      const { latitude, longitude } = st.attributes;
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        return { latitude, longitude, name: st.attributes.friendly_name || id };
      }
    }
    return null;
  }

  _homeLocation() {
    const c = this.api?.hass?.config;
    return c && Number.isFinite(c.latitude) && Number.isFinite(c.longitude)
      ? { latitude: c.latitude, longitude: c.longitude } : null;
  }

  async _getLocation() {
    let why = '';
    if (navigator.geolocation && window.isSecureContext) {
      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }));
        return { latitude: pos.coords.latitude, longitude: pos.coords.longitude, source: 'device' };
      } catch (err) {
        why = err && err.code === 1
          ? t('Location was not allowed for this page. Allow it in your browser or app settings.')
          : t('Your device could not work out where you are.');
      }
    } else if (navigator.geolocation) {
      why = t('This page is not on a secure (HTTPS) address, so the browser will not share its location.');
    } else {
      why = t('This device cannot share its location with the page.');
    }
    // The Home Assistant app on your phone reports where you are, through your person
    const person = this._personLocation();
    if (person) return { ...person, source: 'app' };
    throw new Error(`${why} ${t('Link your phone to your person in the Home Assistant app, or type the coordinates.')}`);
  }

  async _locate(purpose) {
    this._locating = true;
    this._locNote = '';
    this._locFail = null;
    try {
      const loc = await this._getLocation();
      this._locNote = loc.source === 'app'
        ? t('Using the location your phone last sent to Home Assistant.')
        : t('Using this device\'s location.');
      await this._withLocation(purpose, loc);
    } catch (err) {
      this._locFail = { purpose, text: (err && err.message) || t('Could not get your location.') };
    } finally {
      this._locating = false;
    }
  }

  async _withLocation(purpose, loc) {
    if (purpose === 'fill') {
      this._form = { ...this._form, latitude: Number(loc.latitude).toFixed(6), longitude: Number(loc.longitude).toFixed(6) };
    } else {
      await this._search(loc);
    }
  }

  async _useHome() {
    const home = this._homeLocation();
    const purpose = this._locFail?.purpose;
    if (!home || !purpose) return;
    this._locFail = null;
    this._locNote = t('Using your Home Assistant home location.');
    await this._withLocation(purpose, home);
  }

  // -- Finding a shop on the map ------------------------------------------------------

  async _search(near) {
    const query = (this._find.query || '').trim();
    if (!query && !this._form.chain_id && !near) {
      this._find = { ...this._find, results: null, note: t('Type a suburb or shop name, or pick a chain.') };
      return;
    }
    this._find = { ...this._find, busy: true, results: null, note: '' };
    try {
      const params = { query };
      if (this._form.chain_id) params.chain_id = this._form.chain_id;
      if (near) { params.latitude = near.latitude; params.longitude = near.longitude; }
      const res = await this.api.searchSupermarkets(params);
      const results = res.results || [];
      this._find = { ...this._find, busy: false, results, note: results.length ? '' : t('No shops found. Try the chain and a suburb, like PAK\'nSAVE Glen Innes.') };
    } catch (err) {
      console.error('[SLM] Supermarket search:', err);
      this._find = { ...this._find, busy: false, results: null, note: t('The map search is not available right now.') };
    }
  }

  _applyResult(r) {
    const key = (x) => (x || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const chain = this._chains.find(c => key(r.name).startsWith(key(c.name)));
    this._form = {
      ...this._form,
      name: r.name, address: r.address || '',
      latitude: Number(r.latitude).toFixed(6), longitude: Number(r.longitude).toFixed(6),
      chain_id: chain ? chain.id : this._form.chain_id,
    };
    this._find = { ...this._find, results: null, note: '' };
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

  _renderFind() {
    const f = this._find;
    const chain = this._chains.find(c => c.id === this._form.chain_id);
    return html`
      <div class="label" id="find-label">${t('Find it on the map')}</div>
      <form class="find" role="search" aria-labelledby="find-label" @submit=${(e) => { e.preventDefault(); this._search(null); }}>
        <input class="field" type="search" maxlength="100" enterkeyhint="search"
               aria-label=${t('Suburb or town')}
               placeholder=${chain ? t('Suburb or town, e.g. Glen Innes') : t('e.g., PAK\'nSAVE Glen Innes')}
               .value=${f.query} @input=${(e) => { this._find = { ...this._find, query: e.target.value }; }} />
        <button type="submit" class="action-btn small" ?disabled=${f.busy || this._locating}>
          <ha-icon icon="mdi:magnify"></ha-icon>${t('Search')}
        </button>
      </form>
      ${this._ask ? this._renderConsent() : html`
        <button type="button" class="link-btn" ?disabled=${this._locating || f.busy} @click=${() => this._askLocation('nearest')}>
          <ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>${chain ? t('Find the closest {chain}').replace('{chain}', chain.name) : t('Find the closest to me')}
        </button>`}
      ${f.busy || this._locating ? html`<div class="hint">${t('Searching…')}</div>` : ''}
      ${this._locNote && !this._locFail ? html`<div class="hint">${this._locNote}</div>` : ''}
      ${this._locFail ? html`
        <div class="message error">${this._locFail.text}</div>
        ${this._homeLocation() ? html`
          <button type="button" class="link-btn" @click=${this._useHome}>
            <ha-icon icon="mdi:home-map-marker"></ha-icon>${t('Use my Home Assistant home location instead')}
          </button>` : ''}` : ''}
      ${f.note ? html`<div class="hint">${f.note}</div>` : ''}
      ${f.results && f.results.length ? html`
        <ul class="results" aria-label=${t('Shops found')}>
          ${f.results.map(r => html`
            <li>
              <button type="button" class="result" @click=${() => this._applyResult(r)}>
                <ha-icon icon="mdi:storefront-outline"></ha-icon>
                <span class="result-main">
                  <span class="result-name">${r.name}</span>
                  <span class="result-addr">${r.address}</span>
                </span>
                ${r.distance_km != null ? html`<span class="result-dist">${r.distance_km} km</span>` : ''}
              </button>
            </li>`)}
        </ul>` : ''}
      <p class="hint">${t('Searches use OpenStreetMap through your Home Assistant.')}</p>
    `;
  }

  _renderConsent() {
    const nearest = this._ask === 'nearest';
    return html`
      <div class="consent" role="alertdialog" aria-labelledby="consent-title" aria-describedby="consent-body">
        <div id="consent-title" class="consent-title"><ha-icon icon="mdi:map-marker-question-outline"></ha-icon>${t('Use your location?')}</div>
        <p id="consent-body">${nearest
          ? t('Your location is used to find the closest shops. It is sent to the OpenStreetMap search through your Home Assistant for this search only, and is not saved.')
          : t('Your location is used to fill in the coordinates. It stays on your device until you save the supermarket.')}</p>
        <div class="consent-actions">
          <button type="button" class="chip" @click=${() => { this._ask = ''; }}>${t('Not now')}</button>
          <button type="button" class="chip on" @click=${this._allowLocation}>${t('Allow')}</button>
        </div>
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

          ${this._renderFind()}

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
          <button type="button" class="link-btn" ?disabled=${this._locating} @click=${() => this._askLocation('fill')}>
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
    .link-btn:disabled { opacity: 0.5; cursor: default; }
    .find { display: flex; gap: 8px; align-items: stretch; }
    .find .field { flex: 1; min-width: 0; }
    .action-btn.small { min-height: 44px; padding: 0 14px; flex-shrink: 0; }
    .consent { margin-top: 10px; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--slm-border-subtle); background: var(--slm-bg-elevated, var(--slm-bg-surface)); }
    .consent-title { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: var(--slm-text-primary); }
    .consent-title ha-icon { --mdc-icon-size: 20px; }
    .consent p { margin: 8px 0 12px; font-size: 13.5px; line-height: 1.5; color: var(--slm-text-secondary); }
    .consent-actions { display: flex; gap: 8px; justify-content: flex-end; }
    .results { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    .result { width: 100%; display: flex; align-items: center; gap: 10px; min-height: 52px; padding: 8px 12px; border-radius: 12px; cursor: pointer; text-align: left; border: 1px solid var(--slm-border-subtle); background: var(--slm-bg-surface); color: var(--slm-text-primary); font: inherit; }
    .result ha-icon { --mdc-icon-size: 22px; flex-shrink: 0; color: var(--slm-accent-text, var(--slm-accent-primary)); --icon-primary-color: currentColor; }
    .result-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
    .result-name { font-weight: 700; font-size: 14.5px; overflow-wrap: anywhere; }
    .result-addr { font-size: 12.5px; color: var(--slm-text-secondary); overflow-wrap: anywhere; }
    .result-dist { flex-shrink: 0; font-size: 13px; font-weight: 700; color: var(--slm-accent-text, var(--slm-accent-primary)); }
  `, subPageStyles, bottomSheetStyles, fontInherit];
}

customElements.define('slm-supermarkets-settings', SLMSupermarketsSettings);
