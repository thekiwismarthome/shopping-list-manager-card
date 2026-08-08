import { LitElement, html, css } from 'lit';

class SLMHaSyncSettings extends LitElement {
  static properties = {
    hass: { type: Object },
    api: { type: Object },
    lists: { type: Array },
    _todoEntities: { type: Array, state: true },
    _saving: { type: String, state: true },
  };

  constructor() {
    super();
    this._todoEntities = [];
    this._saving = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTodoEntities();
  }

  updated(changedProps) {
    if (changedProps.has('hass') && this.hass) {
      this._loadTodoEntities();
    }
  }

  _loadTodoEntities() {
    if (!this.hass?.states) return;
    this._todoEntities = Object.entries(this.hass.states)
      .filter(([entityId]) => entityId.startsWith('todo.'))
      .map(([entityId, state]) => ({
        entityId,
        name: state.attributes?.friendly_name || entityId,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  _getLinkedEntity(list) {
    return list?.ha_todo_entity_id || '';
  }

  async _handleEntityChange(list, entityId) {
    if (!this.api) return;
    this._saving = list.id;
    try {
      await this.api.updateList(list.id, { ha_todo_entity_id: entityId || null });
      this.dispatchEvent(new CustomEvent('lists-updated', { bubbles: true, composed: true }));
    } catch (err) {
      console.error('[SLM] Failed to save HA todo link:', err);
    } finally {
      this._saving = null;
    }
  }

  render() {
    const lists = this.lists || [];
    return html`
      <div class="ha-sync-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>HA Todo Sync</h2>
        </div>

        <div class="settings-list">
          <div class="section-header">Link Lists to HA Todo</div>

          <div class="info-item">
            <div class="item-subtitle">
              Link each shopping list to a Home Assistant todo list.
              Changes sync both ways — items added, checked, or removed in either place
              are mirrored to the other. This setting is stored globally on the server.
            </div>
          </div>

          ${this._todoEntities.length === 0 ? html`
            <div class="settings-item">
              <div class="item-content">
                <div class="item-title">No todo lists found</div>
                <div class="item-subtitle">
                  No HA todo entities were detected. Make sure the
                  "To-do List" integration is enabled in Home Assistant.
                </div>
              </div>
            </div>
          ` : lists.length === 0 ? html`
            <div class="settings-item">
              <div class="item-content">
                <div class="item-title">No lists</div>
                <div class="item-subtitle">Create a shopping list first.</div>
              </div>
            </div>
          ` : lists.map(list => html`
            <div class="settings-item">
              <div class="item-content">
                <div class="item-title">${list.name}</div>
                ${this._getLinkedEntity(list) ? html`
                  <div class="item-subtitle linked">
                    Linked to ${this._todoEntities.find(e => e.entityId === this._getLinkedEntity(list))?.name || this._getLinkedEntity(list)}
                  </div>
                ` : ''}
              </div>
              ${this._saving === list.id ? html`
                <span class="saving">Saving…</span>
              ` : html`
                <select
                  class="entity-select"
                  ?disabled=${!!this._saving}
                  @change=${(e) => this._handleEntityChange(list, e.target.value)}
                >
                  <option value="" ?selected=${!this._getLinkedEntity(list)}>None</option>
                  ${this._todoEntities.map(entity => html`
                    <option
                      value=${entity.entityId}
                      ?selected=${this._getLinkedEntity(list) === entity.entityId}
                    >
                      ${entity.name}
                    </option>
                  `)}
                </select>
              `}
            </div>
          `)}

          <div class="section-header">How it works</div>
          <div class="settings-item">
            <div class="item-content">
              <div class="item-subtitle">
                Changes sync both ways. Adding an item in SLM adds it to the HA todo list,
                and vice versa. Checking or removing items is also mirrored. Syncs only
                when the linked list is the active list in SLM.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .ha-sync-settings { padding-bottom: 20px; }
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
    .section-header {
      padding: 14px 16px 6px;
      font-size: 11px;
      font-weight: 700;
      color: var(--slm-text-primary);
      opacity: 0.55;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .info-item {
      padding: 10px 16px 14px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--slm-border-subtle);
      box-sizing: border-box;
    }
    .item-content { flex: 1; min-width: 0; }
    .item-title { font-weight: 600; font-size: 14px; margin-bottom: 2px; color: var(--slm-text-primary); }
    .item-subtitle { font-size: 12px; color: var(--slm-text-secondary); line-height: 1.5; }
    .item-subtitle.linked { color: var(--slm-accent-secondary, #81c784); }
    .entity-select {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      max-width: 160px;
    }
    .entity-select:disabled { opacity: 0.5; cursor: default; }
    .saving { font-size: 12px; color: var(--slm-text-secondary); flex-shrink: 0; }
  `;
}

customElements.define('slm-ha-sync-settings', SLMHaSyncSettings);
