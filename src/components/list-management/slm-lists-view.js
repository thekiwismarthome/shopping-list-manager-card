import { LitElement, html, css } from 'lit';
import './slm-list-card.js';

class SLMListsView extends LitElement {
  static properties = {
    api: { type: Object },
    lists: { type: Array },
    activeList: { type: Object },
    items: { type: Array },
    total: { type: Object },
    listTotals: { type: Object }, 
    showCreateDialog: { type: Boolean },
    newListName: { type: String },
    newListIcon: { type: String }
  };

  constructor() {
    super();
    this.lists = [];
    this.showCreateDialog = false;
    this.listTotals = {};
    this.newListName = '';
    this.newListIcon = 'mdi:cart';
  }

  handleCreateList() {
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
      await this.api.createList(this.newListName, this.newListIcon);
      this.showCreateDialog = false;
      this.newListName = '';
      this.newListIcon = 'mdi:cart';
      
      this.dispatchEvent(new CustomEvent('lists-updated', {
        bubbles: true,
        composed: true
      }));
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

      case 'share':
        alert('Share feature coming soon!');
        break;

      case 'copy':
        alert('Copy feature coming soon!');
        break;
    }
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
    }
  }

  render() {
    return html`
      <div class="lists-view">
        <div class="header">
          <h2>My Lists</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <span class="emoji">➕</span>
            New List
          </button>
        </div>

        ${this.lists.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">📋</div>
            <p>No lists yet</p>
            <p class="hint">Create your first shopping list</p>
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
                .isActive=${list.id === this.activeList?.id}
                .itemCount=${list.id === this.activeList?.id
                  ? this.items.filter(i => !i.checked).length
                  : this.listTotals[list.id]?.item_count || 0}

                .totalCost=${list.id === this.activeList?.id
                  ? this.total.total
                  : this.listTotals[list.id]?.total || 0}

                .currency=${this.listTotals[list.id]?.currency || this.total?.currency || 'NZD'}

                .emoji=${this.getListEmoji(list.icon)}
                @list-select=${this.handleListSelect}
                @list-action=${this.handleListAction}
              ></slm-list-card>
            `)}
          </div>
        `}

        ${this.showCreateDialog ? html`
          <div class="overlay" @click=${() => this.showCreateDialog = false}>
            <div class="dialog" @click=${(e) => e.stopPropagation()}>
              <div class="dialog-header">
                <h3>Create New List</h3>
                <button @click=${() => this.showCreateDialog = false}>
                  <span class="emoji">✖️</span>
                </button>
              </div>
              <div class="dialog-content">
                <label>List Name</label>
                <input
                  type="text"
                  placeholder="e.g., Weekly Shopping"
                  .value=${this.newListName}
                  @input=${(e) => this.newListName = e.target.value}
                  autofocus
                />

                <label>Icon</label>
                <div class="icon-picker">
                  ${['mdi:cart', 'mdi:home', 'mdi:food', 'mdi:shopping', 'mdi:store'].map(icon => html`
                    <button
                      class="icon-option ${this.newListIcon === icon ? 'selected' : ''}"
                      @click=${() => this.newListIcon = icon}
                    >
                      <span class="emoji">${this.getListEmoji(icon)}</span>
                    </button>
                  `)}
                </div>
              </div>
              <div class="dialog-footer">
                <button class="cancel-btn" @click=${() => this.showCreateDialog = false}>Cancel</button>
                <button class="save-btn" @click=${this.handleSaveNewList}>Create</button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
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
  `;
}

customElements.define('slm-lists-view', SLMListsView);