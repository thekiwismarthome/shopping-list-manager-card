import { LitElement, html, css } from 'lit';

class CategorySettings extends LitElement {
  static properties = {
    api: { type: Object },
    categories: { type: Array },
    showAddDialog: { type: Boolean },
    newCategory: { type: Object }
  };

  constructor() {
    super();
    this.showAddDialog = false;
    this.newCategory = {
      name: '',
      icon: 'mdi:shape',
      color: '#4CAF50'
    };
  }

  handleAddCategory() {
    this.showAddDialog = true;
  }

  async handleSaveCategory() {
    if (this.newCategory.name.trim()) {
      // Add category via API (to be implemented)
      alert('Category management coming soon!');
      this.showAddDialog = false;
      this.newCategory = { name: '', icon: 'mdi:shape', color: '#4CAF50' };
    }
  }

  render() {
    return html`
      <div class="slm-category-settings">
        <div class="header">
          <button class="back-btn" @click=${() => this.dispatchEvent(new Event('back'))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Manage Categories</h2>
        </div>

        <div class="category-actions">
          <button class="action-btn" @click=${this.handleAddCategory}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Category</span>
          </button>
          <button class="action-btn">
            <ha-icon icon="mdi:swap-vertical"></ha-icon>
            <span>Reorder</span>
          </button>
        </div>

        <div class="categories-list">
          ${this.categories.map(cat => html`
            <div class="category-item">
              <div class="category-icon" style="background: ${cat.color}">
                <ha-icon icon="${cat.icon}"></ha-icon>
              </div>
              <div class="category-info">
                <div class="category-name">${cat.name}</div>
              </div>
              <button class="edit-btn">
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
            </div>
          `)}
        </div>

        ${this.showAddDialog ? html`
          <div class="overlay" @click=${() => this.showAddDialog = false}>
            <div class="dialog" @click=${(e) => e.stopPropagation()}>
              <div class="dialog-header">
                <h3>Add Category</h3>
                <button @click=${() => this.showAddDialog = false}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
              <div class="dialog-content">
                <label>
                  Category Name
                  <input 
                    type="text" 
                    .value=${this.newCategory.name}
                    @input=${(e) => this.newCategory = { ...this.newCategory, name: e.target.value }}
                    placeholder="e.g., Snacks"
                  />
                </label>
                <label>
                  Icon
                  <input 
                    type="text" 
                    .value=${this.newCategory.icon}
                    @input=${(e) => this.newCategory = { ...this.newCategory, icon: e.target.value }}
                    placeholder="mdi:shape"
                  />
                </label>
                <label>
                  Color
                  <input 
                    type="color" 
                    .value=${this.newCategory.color}
                    @input=${(e) => this.newCategory = { ...this.newCategory, color: e.target.value }}
                  />
                </label>
              </div>
              <div class="dialog-footer">
                <button class="cancel-btn" @click=${() => this.showAddDialog = false}>Cancel</button>
                <button class="save-btn" @click=${this.handleSaveCategory}>Add</button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .slm-category-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      color: var(--slm-text-primary);
    }
    ha-icon {
      color: var(--slm-text-primary);
      --icon-primary-color: var(--slm-text-primary);
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .category-actions {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .action-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .categories-list {
      padding: 8px 0;
    }
    .category-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .category-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .category-icon ha-icon {
      --mdc-icon-size: 28px;
    }
    .category-info {
      flex: 1;
    }
    .category-name {
      font-weight: 600;
      font-size: 16px;
    }
    .edit-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--secondary-text-color);
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
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
    }
    .dialog-header button {
      background: none;
      border: none;
      cursor: pointer;
    }
    .dialog-content {
      padding: 20px;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 16px;
      font-weight: 600;
    }
    .dialog-content input {
      display: block;
      width: 100%;
      padding: 12px;
      margin-top: 8px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
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

customElements.define('slm-category-settings', CategorySettings);