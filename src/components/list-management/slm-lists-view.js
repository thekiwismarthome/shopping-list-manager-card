import { LitElement, html, css } from 'lit';
import { fontInherit } from '../../styles/ui-styles.js';
import { t, I18nController } from '../../services/translator.js';
import { SheetSwipe } from '../../services/sheet-swipe.js';
import './slm-list-card.js';
import './slm-visibility-picker.js';
import { visibilityToApi, defaultVisibility } from './slm-visibility-picker.js';
import { viewHeaderStyles, bottomSheetStyles } from '../../styles/ui-styles.js';

class SLMListsView extends LitElement {
  _i18n = new I18nController(this);
  _swipe = new SheetSwipe(this); // swipe a popup down to close it
  static properties = {
    // 'classic' | 'fresh' | 'compact' (see Appearance settings)
    uiStyle: { type: String, attribute: 'ui-style', reflect: true },
    api: { type: Object },
    lists: { type: Array },
    activeList: { type: Object },
    items: { type: Array },
    total: { type: Object },
    listTotals: { type: Object },
    currentUserId: { type: String },
    isAdmin: { type: Boolean },
    showCreateDialog: { type: Boolean },
    newListName: { type: String },
    newListIcon: { type: String },
    _newListPrivate: { type: Boolean, state: true },
    _showMembersDialog: { type: Boolean, state: true },
    _managingListId: { type: String, state: true },
    _haUsers: { type: Array, state: true },
    _membersLoading: { type: Boolean, state: true },
    _membersSaving: { type: Boolean, state: true },
    // Households: every group, the ids of the groups the current user is in, and the choice in the new-list sheet
    _groups: { type: Array, state: true },
    _myGroupIds: { type: Array, state: true },
    _visibility: { type: String, state: true },
  };

  constructor() {
    super();
    this.lists = [];
    this.showCreateDialog = false;
    this.listTotals = {};
    this.newListName = '';
    this.newListIcon = 'mdi:cart';
    this.currentUserId = '';
    this.isAdmin = false;
    this._newListPrivate = true;
    this._showMembersDialog = false;
    this._managingListId = null;
    this._haUsers = [];
    this._membersLoading = false;
    this._membersSaving = false;
    this._groups = [];
    this._myGroupIds = [];
    this._visibility = 'private';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadGroups();
  }

  async _loadGroups() {
    if (!this.api) return;
    try {
      const res = await this.api.getGroups();
      this._groups = res.groups || [];
      this._myGroupIds = res.mine || [];
    } catch (err) {
      // An older integration has no groups: keep the original Private switch
      this._groups = [];
      this._myGroupIds = [];
    }
    if (!this.showCreateDialog) this._visibility = defaultVisibility(this._groups, this._myGroupIds);
  }

  handleCreateList() {
    this._loadGroups();
    this.showCreateDialog = true;
  }

  async loadTotals() {
    if (!this.api || !this.lists?.length) return;

    const totals = {};

    await Promise.all(
      this.lists.map(async (list) => {
        try {
          const result = await this.api.getListTotal(list.id);
          totals[list.id] = result;
        } catch (err) {
          console.error("Failed to load total for list", list.id, err);
        }
      })
    );

    this.listTotals = totals;
  }

  async handleSaveNewList() {
    if (this.newListName.trim()) {
      let isPrivate = this._newListPrivate;
      let groupId = null;
      if (this._groups.length) ({ isPrivate, groupId } = visibilityToApi(this._visibility));
      const result = await this.api.createList(this.newListName, this.newListIcon, isPrivate, groupId);
      this.showCreateDialog = false;
      this.newListName = '';
      this.newListIcon = 'mdi:cart';
      this._newListPrivate = true;
      this._visibility = defaultVisibility(this._groups, this._myGroupIds);

      // Navigate to the newly created list immediately
      if (result?.list?.id) {
        this.dispatchEvent(new CustomEvent('list-selected', {
          detail: { listId: result.list.id },
          bubbles: true,
          composed: true,
        }));
      } else {
        this.dispatchEvent(new CustomEvent('lists-updated', {
          bubbles: true,
          composed: true,
        }));
      }
    }
  }

  async _openMembersDialog(listId) {
    this._managingListId = listId;
    this._showMembersDialog = true;
    this._membersLoading = true;
    try {
      const result = await this.api.getHAUsers();
      this._haUsers = result.users || [];
    } catch (err) {
      console.error('[SLM] Failed to load HA users:', err);
      this._haUsers = [];
    } finally {
      this._membersLoading = false;
    }
  }

  _closeMembersDialog() {
    this._showMembersDialog = false;
    this._managingListId = null;
    this._haUsers = [];
  }

  get _managingList() {
    return this.lists.find(l => l.id === this._managingListId) || null;
  }

  _isMember(userId) {
    const lst = this._managingList;
    return lst ? (lst.allowed_users || []).includes(userId) : false;
  }

  _isGroupShared(groupId) {
    const lst = this._managingList;
    return lst ? (lst.allowed_groups || []).includes(groupId) : false;
  }

  async _toggleGroup(groupId) {
    const lst = this._managingList;
    if (!lst) return;
    const current = lst.allowed_groups || [];
    const updated = current.includes(groupId)
      ? current.filter(id => id !== groupId)
      : [...current, groupId];

    this._membersSaving = true;
    try {
      await this.api.updateListMembers(lst.id, lst.allowed_users || [], updated);
      this.dispatchEvent(new CustomEvent('lists-updated', { bubbles: true, composed: true }));
    } catch (err) {
      console.error('[SLM] Failed to update groups:', err);
    } finally {
      this._membersSaving = false;
    }
  }

  async _toggleMember(userId) {
    const lst = this._managingList;
    if (!lst) return;
    const current = lst.allowed_users || [];
    const updated = current.includes(userId)
      ? current.filter(id => id !== userId)
      : [...current, userId];

    this._membersSaving = true;
    try {
      await this.api.updateListMembers(lst.id, updated, lst.allowed_groups || []);
      this.dispatchEvent(new CustomEvent('lists-updated', { bubbles: true, composed: true }));
    } catch (err) {
      console.error('[SLM] Failed to update members:', err);
    } finally {
      this._membersSaving = false;
    }
  }

  handleListSelect(e) {
    this.dispatchEvent(new CustomEvent('list-selected', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  async handleListAction(e) {
    const { action, listId } = e.detail;

    switch (action) {
      case 'rename':
        const newName = prompt('Enter new list name:');
        if (newName) {
          await this.api.updateList(listId, { name: newName });
          this.dispatchEvent(new CustomEvent('lists-updated', {
            bubbles: true,
            composed: true
          }));
        }
        break;

      case 'delete':
        if (confirm('Delete this list?')) {
          await this.api.deleteList(listId);
          this.dispatchEvent(new CustomEvent('lists-updated', {
            bubbles: true,
            composed: true
          }));
        }
        break;

      case 'members':
        await this._openMembersDialog(listId);
        break;

      case 'copy':
        alert('Copy feature coming soon!');
        break;
    }
  }

  // Households this list can also be shared with (its own household already sees it)
  _renderGroupShares() {
    const lst = this._managingList;
    if (!lst) return '';
    const own = this._groups.find(g => g.id === lst.group_id);
    const others = this._groups.filter(g => g.id !== lst.group_id);
    if (!own && !others.length) return '';
    return html`
      ${own ? html`<p class="members-hint own-group"><ha-icon icon="mdi:account-group"></ha-icon> ${t('Everyone in {name} can already see this list.').replace('{name}', own.name)}</p>` : ''}
      ${others.length ? html`
        <div class="members-subhead">${t('Households')}</div>
        ${others.map(g => html`
          <label class="member-row ${this._membersSaving ? 'disabled' : ''}">
            <input type="checkbox" .checked=${this._isGroupShared(g.id)} ?disabled=${this._membersSaving}
                   @change=${() => this._toggleGroup(g.id)} />
            <ha-icon icon="mdi:account-group"></ha-icon>
            <span>${g.name}</span>
          </label>
        `)}
      ` : ''}
    `;
  }

  getListEmoji(icon) {
    const emojiMap = {
      'mdi:cart': '🛒',
      'mdi:home': '🏠',
      'mdi:food': '🍽️',
      'mdi:shopping': '🛍️',
      'mdi:store': '🏪'
    };
    return emojiMap[icon] || '🛒';
  }

  updated(changedProps) {
    if (changedProps.has('lists')) {
      this.loadTotals();
      this._loadGroups();
    }
    if (changedProps.has('showCreateDialog') && this.showCreateDialog) {
      this.renderRoot.querySelector('#new-list-name')?.focus();
    }
  }

  render() {
    return html`
      <div class="lists-view">
        <div class="header">
          <h2>${t('My Lists')}</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <span class="emoji">➕</span>
            New List
          </button>
        </div>

        ${this.lists.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">📋</div>
            <p>${t('No lists yet')}</p>
            <p class="hint">${t('Create your first shopping list')}</p>
            <button class="primary-btn" @click=${this.handleCreateList}>
              <span class="emoji">➕</span>
              Create List
            </button>
          </div>
        ` : html`
          <div class="lists-grid">
            ${this.lists.map(list => html`
              <slm-list-card
                .list=${list}
                .uiStyle=${this.uiStyle}
                .isActive=${list.id === this.activeList?.id}
                .itemCount=${list.id === this.activeList?.id
                  ? this.items.filter(i => !i.checked).length
                  : this.listTotals[list.id]?.item_count || 0}

                .totalCost=${list.id === this.activeList?.id
                  ? this.total.total
                  : this.listTotals[list.id]?.total || 0}

                .currency=${this.listTotals[list.id]?.currency || this.total?.currency || 'NZD'}

                .emoji=${this.getListEmoji(list.icon)}
                .currentUserId=${this.currentUserId}
                .isAdmin=${this.isAdmin}
                .groups=${this._groups}
                @list-select=${this.handleListSelect}
                @list-action=${this.handleListAction}
              ></slm-list-card>
            `)}
          </div>
        `}

        ${this._showMembersDialog ? html`
          <div class="overlay" @click=${this._closeMembersDialog}>
            <div class="dialog" @click=${(e) => e.stopPropagation()}>
              <div class="dialog-header">
                <h3>${t('Manage Members')}</h3>
                <button @click=${this._closeMembersDialog}><span class="emoji">✖️</span></button>
              </div>
              <div class="dialog-content members-content">
                <p class="members-hint">${t('Select who else can see and edit this list.')}</p>
                ${this._renderGroupShares()}
                ${this._groups.length ? html`<div class="members-subhead">${t('People')}</div>` : ''}
                ${this._membersLoading ? html`
                  <div class="members-loading">${t('Loading users…')}</div>
                ` : this._haUsers.filter(u => u.id !== this._managingList?.owner_id).length === 0 ? html`
                  <div class="members-loading">${t('No other users found.')}</div>
                ` : this._haUsers
                  .filter(u => u.id !== this._managingList?.owner_id)
                  .map(user => html`
                    <label class="member-row ${this._membersSaving ? 'disabled' : ''}">
                      <input
                        type="checkbox"
                        .checked=${this._isMember(user.id)}
                        ?disabled=${this._membersSaving}
                        @change=${() => this._toggleMember(user.id)}
                      />
                      <ha-icon icon="mdi:account"></ha-icon>
                      <span>${user.name || user.id}</span>
                    </label>
                  `)
                }
              </div>
              <div class="dialog-footer">
                <button class="save-btn" @click=${this._closeMembersDialog}>${t('Done')}</button>
              </div>
            </div>
          </div>
        ` : ''}

        ${this.showCreateDialog ? html`
          <div class="sheet-layer">
            <div class="scrim" @click=${() => this.showCreateDialog = false}></div>
            <div class="sheet" role="dialog" aria-modal="true" aria-label=${t('Create New List')}>
              <div class="grab"></div>
              <div class="sheet-head">
                <h2>${t('New list')}</h2>
                <button class="done" ?disabled=${!this.newListName.trim()} @click=${this.handleSaveNewList}>${t('Create')}</button>
              </div>

              <label class="label" for="new-list-name">${t('List Name')}</label>
              <input
                id="new-list-name"
                class="field"
                type="text"
                placeholder="e.g., Weekly Shopping"
                maxlength="40"
                autocomplete="off"
                .value=${this.newListName}
                @input=${(e) => this.newListName = e.target.value}
                @keydown=${(e) => { if (e.key === 'Enter') this.handleSaveNewList(); }}
              />

              <div class="label">${t('Icon')}</div>
              <div class="choices" role="radiogroup" aria-label=${t('Icon')}>
                ${['mdi:cart', 'mdi:home', 'mdi:food', 'mdi:shopping', 'mdi:store'].map(icon => html`
                  <button
                    class="choice ${this.newListIcon === icon ? 'selected' : ''}"
                    role="radio"
                    aria-checked=${this.newListIcon === icon ? 'true' : 'false'}
                    aria-label=${icon.replace('mdi:', '')}
                    @click=${() => this.newListIcon = icon}
                  >${this.getListEmoji(icon)}</button>
                `)}
              </div>

              ${this._groups.length ? html`
                <slm-visibility-picker
                  .groups=${this._groups}
                  .myGroupIds=${this._myGroupIds}
                  .isAdmin=${this.isAdmin}
                  .value=${this._visibility}
                  @visibility-change=${(e) => { this._visibility = e.detail.value; }}
                ></slm-visibility-picker>
              ` : html`
                <div class="card-block">
                  <button class="toggle-row" role="switch" aria-checked=${this._newListPrivate ? 'true' : 'false'}
                          @click=${() => this._newListPrivate = !this._newListPrivate}>
                    <span class="tr-text">
                      <span class="tr-title">${t('Private')}</span>
                      <span class="tr-sub">${t('Only visible to me (and members I add)')}</span>
                    </span>
                    <span class="tg ${this._newListPrivate ? 'on' : ''}"></span>
                  </button>
                </div>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = [css`
    .lists-view {
      padding: 16px 8px;
      min-height: 100%;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 8px;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .create-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(--slm-shadow-soft);
      -webkit-tap-highlight-color: transparent;
    }
    .emoji {
      font-size: 16px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--secondary-text-color);
    }
    .empty-emoji {
      font-size: 80px;
      margin-bottom: 16px;
      opacity: 0.3;
    }
    .empty p {
      margin: 8px 0;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 24px;
    }
    .primary-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(--slm-shadow-soft);
      -webkit-tap-highlight-color: transparent;
    }
    .lists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
      position: relative;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(--slm-shadow-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      width: 90%;
      max-width: 400px;
      background: var(--card-background-color);
      border-radius: 16px;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      color: var(--primary-text-color);
    }
    .dialog-header button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 18px;
      -webkit-tap-highlight-color: transparent;
    }
    .dialog-content {
      padding: 20px;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .dialog-content input {
      width: 100%;
      padding: 10px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 15px;
      margin-bottom: 20px;
      color: var(--primary-text-color);
      background: var(--card-background-color);
    }
    .icon-picker {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .icon-option {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      border: 2px solid var(--divider-color);
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .icon-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
    }
    .dialog-footer {
      display: flex;
      gap: 10px;
      padding: 16px;
      border-top: 1px solid var(--divider-color);
    }
    .cancel-btn,
    .save-btn {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cancel-btn {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    .save-btn {
      background: var(--primary-color);
      color: white;
    }
    .privacy-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
      cursor: pointer;
      margin-top: 4px;
    }
    .privacy-label input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }
    .privacy-label ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color);
    }
    .members-content {
      max-height: 300px;
      overflow-y: auto;
    }
    .members-hint {
      margin: 0 0 12px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .members-subhead {
      margin: 14px 0 2px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    .members-hint.own-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .members-hint.own-group ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
    .members-loading {
      padding: 16px 0;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .member-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--divider-color);
      font-size: 14px;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .member-row.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    .member-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }
    .member-row ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
  `, viewHeaderStyles, bottomSheetStyles, fontInherit];
}

customElements.define('slm-lists-view', SLMListsView);