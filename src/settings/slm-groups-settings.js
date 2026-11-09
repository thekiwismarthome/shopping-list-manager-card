import { t, I18nController } from '../services/translator.js';
import { LitElement, html, css } from 'lit';
import { subPageStyles, fontInherit } from '../styles/ui-styles.js';

/**
 * Settings > Groups (admins). A group is a household: the people in it share its lists and loyalty cards.
 * Anything that is not in a group, or shared with one, stays private to its owner.
 */
class SLMGroupsSettings extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    // 'classic' | 'fresh' | 'compact' (set by the settings view)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    api: { type: Object },
    isAdmin: { type: Boolean },
    _groups: { type: Array, state: true },
    _users: { type: Array, state: true },
    _shared: { type: Object, state: true },
    _loading: { type: Boolean, state: true },
    _busy: { type: Boolean, state: true },
    _newName: { type: String, state: true },
    _editing: { type: String, state: true },
    _renaming: { type: String, state: true },
    _renameValue: { type: String, state: true },
    _adoptTo: { type: String, state: true },
    _message: { type: String, state: true },
  };

  constructor() {
    super();
    this.isAdmin = false;
    this._groups = [];
    this._users = [];
    this._shared = { lists: 0, cards: 0 };
    this._loading = true;
    this._busy = false;
    this._newName = '';
    this._editing = null;
    this._renaming = null;
    this._renameValue = '';
    this._adoptTo = '';
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
      const [g, u] = await Promise.all([this.api.getGroups(), this.api.getHAUsers()]);
      this._groups = g.groups || [];
      this._shared = g.shared_with_everyone || { lists: 0, cards: 0 };
      this._users = u.users || [];
      if (!this._adoptTo && this._groups.length) this._adoptTo = this._groups[0].id;
    } catch (err) {
      this._message = `error:${this._errText(err, 'Could not load groups.')}`;
    } finally {
      this._loading = false;
    }
  }

  _errText(err, fallback) {
    return (err && (err.message || err.error?.message)) || fallback;
  }

  // Run a change, show a message if it fails, then reload and tell the card the lists may have changed.
  async _run(fn, failText) {
    this._busy = true;
    this._message = '';
    try {
      await fn();
      await this._load();
      this.dispatchEvent(new CustomEvent('lists-updated', { bubbles: true, composed: true }));
    } catch (err) {
      console.error('[SLM] Groups:', err);
      this._message = `error:${this._errText(err, failText)}`;
    } finally {
      this._busy = false;
    }
  }

  _addGroup() {
    const name = this._newName.trim();
    if (!name) return;
    this._run(async () => {
      await this.api.createGroup(name, []);
      this._newName = '';
    }, t('Could not create the group.'));
  }

  _saveRename(group) {
    const name = this._renameValue.trim();
    if (!name || name === group.name) { this._renaming = null; return; }
    this._run(async () => {
      await this.api.updateGroup(group.id, { name });
      this._renaming = null;
    }, t('Could not rename the group.'));
  }

  _toggleMember(group, userId) {
    const current = group.members || [];
    const members = current.includes(userId) ? current.filter(id => id !== userId) : [...current, userId];
    this._run(() => this.api.updateGroup(group.id, { members }), t('Could not update the group.'));
  }

  _delete(group) {
    if (!confirm(t('Delete this group?'))) return;
    this._run(() => this.api.deleteGroup(group.id), t('Could not delete the group.'));
  }

  _adopt() {
    if (!this._adoptTo) return;
    this._run(() => this.api.adoptShared(this._adoptTo), t('Could not move them.'));
  }

  _userName(id) {
    return this._users.find(u => u.id === id)?.name || id;
  }

  _renderBanner() {
    const { lists = 0, cards = 0 } = this._shared || {};
    if (!this._groups.length || (!lists && !cards)) return '';
    const parts = [];
    if (lists) parts.push(`${lists} ${lists === 1 ? t('list') : t('lists')}`);
    if (cards) parts.push(`${cards} ${cards === 1 ? t('loyalty card') : t('loyalty cards')}`);
    return html`
      <div class="notice">
        <div class="notice-title"><ha-icon icon="mdi:eye-outline"></ha-icon> ${t('Visible to everyone')}</div>
        <div class="item-subtitle">
          ${parts.join(` ${t('and')} `)} ${t('can be seen by every user. Move them into a group so other households cannot see them.')}
        </div>
        <div class="row">
          <select aria-label=${t('Group')} .value=${this._adoptTo} @change=${(e) => { this._adoptTo = e.target.value; }}>
            ${this._groups.map(g => html`<option value=${g.id} ?selected=${g.id === this._adoptTo}>${g.name}</option>`)}
          </select>
          <button class="action-btn" ?disabled=${this._busy} @click=${this._adopt}>${t('Move them')}</button>
        </div>
      </div>
    `;
  }

  _renderGroup(g) {
    const members = g.members || [];
    const open = this._editing === g.id;
    return html`
      <div class="settings-item group-item">
        <div class="group-top">
          <ha-icon icon="mdi:account-group"></ha-icon>
          ${this._renaming === g.id ? html`
            <input class="field" type="text" maxlength="60" .value=${this._renameValue}
                   aria-label=${t('Group name')}
                   @input=${(e) => { this._renameValue = e.target.value; }}
                   @keydown=${(e) => { if (e.key === 'Enter') this._saveRename(g); if (e.key === 'Escape') this._renaming = null; }} />
            <button class="small" ?disabled=${this._busy} @click=${() => this._saveRename(g)}>${t('Save')}</button>
          ` : html`
            <div class="item-title grow">${g.name}</div>
            <button class="icon-btn" aria-label=${t('Rename')} @click=${() => { this._renaming = g.id; this._renameValue = g.name; }}>
              <ha-icon icon="mdi:pencil-outline"></ha-icon>
            </button>
            <button class="icon-btn danger" aria-label=${t('Delete')} @click=${() => this._delete(g)}>
              <ha-icon icon="mdi:delete-outline"></ha-icon>
            </button>
          `}
        </div>
        <div class="chips">
          ${members.length
            ? members.map(id => html`<span class="chip">${this._userName(id)}</span>`)
            : html`<span class="item-subtitle">${t('No one yet')}</span>`}
        </div>
        <button class="small" aria-expanded=${open ? 'true' : 'false'} @click=${() => { this._editing = open ? null : g.id; }}>
          ${open ? t('Done') : t('Choose people')}
        </button>
        ${open ? html`
          <div class="people">
            ${this._users.map(u => html`
              <label class="person ${this._busy ? 'disabled' : ''}">
                <input type="checkbox" .checked=${members.includes(u.id)} ?disabled=${this._busy}
                       @change=${() => this._toggleMember(g, u.id)} />
                <ha-icon icon="mdi:account"></ha-icon>
                <span>${u.name || u.id}</span>
              </label>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    const msg = this._message;
    return html`
      <div class="groups-settings">
        <div class="header">
          <button class="back-btn" aria-label=${t('Back')} @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>${t('Groups')}</h2>
        </div>

        ${!this.isAdmin ? html`
          <div class="intro">${t('Only a Home Assistant administrator can manage groups.')}</div>
        ` : html`
          <div class="intro">
            ${t('A group is a household. People in a group share its lists and loyalty cards, and you can also share a list with another group or with one person. Anything not shared stays private to the person who made it.')}
          </div>

          ${this._renderBanner()}

          <div class="settings-list">
            ${this._loading ? html`<div class="settings-item"><div class="item-subtitle">${t('Loading…')}</div></div>` : ''}
            ${!this._loading && !this._groups.length ? html`
              <div class="settings-item"><div class="item-subtitle">${t('No groups yet. Add one for each household, for example “Our house” and “Mum’s house”.')}</div></div>
            ` : ''}
            ${this._groups.map(g => this._renderGroup(g))}
            <div class="settings-item add-item">
              <div class="item-title">${t('New group')}</div>
              <div class="row">
                <input class="field" type="text" maxlength="60" placeholder=${t('e.g., Mum’s house')}
                       aria-label=${t('Group name')} .value=${this._newName}
                       @input=${(e) => { this._newName = e.target.value; }}
                       @keydown=${(e) => { if (e.key === 'Enter') this._addGroup(); }} />
                <button class="action-btn" ?disabled=${this._busy || !this._newName.trim()} @click=${this._addGroup}>${t('Add')}</button>
              </div>
            </div>
          </div>

          <div class="foot">${t('Administrators can always see every list and card, because the data lives on your Home Assistant.')}</div>
        `}

        ${msg ? html`<div class="message ${msg.startsWith('error') ? 'error' : 'info'}">${msg.replace(/^(success|error):/, '')}</div>` : ''}
      </div>
    `;
  }

  static styles = [css`
    :host { display: block; }
    .groups-settings { padding-bottom: 24px; }
    :host([ui-style="fresh"]) .groups-settings { padding-bottom: 130px; }
    .header { display: flex; align-items: center; gap: 16px; padding: 12px; border-bottom: 1px solid var(--slm-border-subtle); }
    .back-btn { background: none; border: none; padding: 8px; cursor: pointer; display: flex; align-items: center; color: var(--slm-text-primary); -webkit-tap-highlight-color: transparent; }
    ha-icon { color: var(--slm-text-primary); --icon-primary-color: var(--slm-text-primary); }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; color: var(--slm-text-primary); }
    .intro, .foot { margin: 14px 16px; font-size: 13.5px; line-height: 1.5; color: var(--slm-text-secondary); }
    .foot { font-size: 12.5px; }
    .settings-item { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; padding: 14px 16px; width: 100%; box-sizing: border-box; border-bottom: 1px solid var(--slm-border-subtle); text-align: left; }
    .item-title { font-weight: 700; font-size: 15px; color: var(--slm-text-primary); }
    .item-title.grow { flex: 1; min-width: 0; overflow-wrap: anywhere; }
    .item-subtitle { font-size: 12.5px; color: var(--slm-text-secondary); line-height: 1.5; }
    .group-top { display: flex; align-items: center; gap: 10px; width: 100%; }
    .group-top > ha-icon { color: var(--slm-accent-text, var(--slm-accent-primary)); --icon-primary-color: var(--slm-accent-text, var(--slm-accent-primary)); }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .chip { padding: 4px 10px; border-radius: 999px; font-size: 12.5px; font-weight: 600; background: var(--slm-accent-soft, var(--slm-bg-elevated)); color: var(--slm-accent-text, var(--slm-text-primary)); }
    .row { display: flex; gap: 8px; width: 100%; align-items: center; }
    .field, select {
      flex: 1; min-width: 0; min-height: 44px; box-sizing: border-box; padding: 0 12px; font-size: 15px;
      border: 1.5px solid var(--slm-border-subtle); border-radius: 12px;
      background: var(--slm-bg-elevated, var(--slm-bg-surface)); color: var(--slm-text-primary);
    }
    .field:focus-visible, select:focus-visible { outline: 2px solid var(--slm-accent-primary); outline-offset: 1px; }
    .action-btn {
      min-height: 44px; padding: 0 18px; border: none; border-radius: 12px; cursor: pointer; flex-shrink: 0;
      background: var(--slm-accent-primary); color: var(--slm-accent-ink, white); font-size: 14px; font-weight: 700;
    }
    .action-btn:disabled, .small:disabled { opacity: 0.5; cursor: default; }
    .small {
      min-height: 36px; padding: 0 14px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 700;
      border: 1.5px solid var(--slm-border-subtle); background: var(--slm-bg-surface); color: var(--slm-text-primary);
    }
    .icon-btn { background: none; border: none; padding: 6px; cursor: pointer; display: flex; border-radius: 10px; }
    .icon-btn.danger ha-icon { color: var(--slm-accent-danger, #c0392b); --icon-primary-color: var(--slm-accent-danger, #c0392b); }
    .people { display: flex; flex-direction: column; width: 100%; }
    .person { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid var(--slm-border-subtle); font-size: 14px; color: var(--slm-text-primary); cursor: pointer; min-height: 44px; box-sizing: border-box; }
    .person.disabled { opacity: 0.6; }
    .person input { width: 20px; height: 20px; accent-color: var(--slm-accent-primary); }
    .notice { margin: 12px 16px; padding: 14px 16px; border-radius: 18px; display: flex; flex-direction: column; gap: 10px; background: var(--slm-accent-soft, var(--slm-bg-elevated)); border: 1px solid var(--slm-border-subtle); }
    .notice-title { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px; color: var(--slm-text-primary); }
    .message { margin: 8px 16px; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; }
    .message.error { background: rgba(239,154,154,0.2); color: var(--slm-accent-danger, #ef9a9a); }
    .message.info { background: rgba(159,168,218,0.15); color: var(--slm-accent-primary, #9fa8da); }
  `, subPageStyles, fontInherit];
}

customElements.define('slm-groups-settings', SLMGroupsSettings);
