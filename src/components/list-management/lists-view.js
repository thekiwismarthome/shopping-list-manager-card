import { LitElement, html, css } from 'lit';
import './list-card.js';

class ListsView extends LitElement {
  static properties = {
    api: { type: Object },
    lists: { type: Array },
    activeList: { type: Object },
    showCreateDialog: { type: Boolean },
    newListName: { type: String },
    newListIcon: { type: String }
  };

  constructor() {
    super();
    this.showCreateDialog = false;
    this.newListName = '';
    this.newListIcon = 'mdi:cart';
  }

  handleCreateList() {
    this.showCreateDialog = true;
  }

  async handleSaveNewList() {
    if (this.newListName.trim()) {
      await this.api.createList(this.newListName, this.newListIcon);
      this.showCreateDialog = false;
      this.newListName = '';
      this.newListIcon = 'mdi:cart';
      
      // Reload lists
      const result = await this.api.getLists();
      this.lists = result.lists;
      this.requestUpdate();
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
          const result = await this.api.getLists();
          this.lists = result.lists;
          this.requestUpdate();
        }
        break;

      case 'delete':
        if (confirm('Delete this list?')) {
          await this.api.deleteList(listId);
          const result = await this.api.getLists();
          this.lists = result.lists;
          this.requestUpdate();
        }
        break;

      case 'share':
        // Share functionality
        alert('Share feature coming soon!');
        break;

      case 'copy':
        alert('Copy feature coming soon!');
        break;
    }
  }

  render() {
    return html`
      <div class="lists-view">
        <div class="header">
          <h2>My Lists</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <ha-icon icon="mdi:plus"></ha-icon>
            New List
          </button>
        </div>

        <div class="lists-grid">
          ${this.lists.map(list => html`
            <list-card
              .list=${list}
              .isActive=${list.id === this.activeList?.id}
              @list-select=${this.handleListSelect}
              @list-action=${this.handleListAction}
            ></list-card>
          `)}
        </div>

        ${this.showCreateDialog ? html`
          <div class="overlay" @click=${() => this.showCreateDialog = false}>
            <div class="dialog" @click=${(e) => e.stopPropagation()}>
              <div class="dialog-header">
                <h3>Create New List</h3>
                <button @click=${() => this.showCreateDialog = false}>
                  <ha-icon icon="mdi:close"></ha-icon>
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
                      <ha-icon icon="${icon}"></ha-icon>
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
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .create-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .lists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
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
      padding: 0;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 20px;
    }
    .dialog-header button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
    }
    .dialog-content {
      padding: 20px;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .dialog-content input {
      width: 100%;
      padding: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 16px;
      margin-bottom: 20px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .icon-picker {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .icon-option {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      border: 2px solid var(--divider-color);
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    .icon-option ha-icon {
      --mdc-icon-size: 28px;
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 20px;
      border-top: 1px solid var(--divider-color);
    }
    .cancel-btn,
    .save-btn {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .cancel-btn {
      background: var(--secondary-background-color);
    }
    .save-btn {
      background: var(--primary-color);
      color: white;
    }
  `;
}

customElements.define('lists-view', ListsView);