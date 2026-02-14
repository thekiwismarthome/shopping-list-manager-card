import { LitElement, html, css } from 'lit';

class ListSelector extends LitElement {
  static properties = {
    lists: { type: Array },
    activeList: { type: Object }
  };

  handleListClick(list) {
    this.dispatchEvent(new CustomEvent('list-changed', {
      detail: { listId: list.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="list-tabs">
        ${this.lists.map(list => html`
          <button
            class="list-tab ${list.id === this.activeList?.id ? 'active' : ''}"
            @click=${() => this.handleListClick(list)}
          >
            <ha-icon icon="${list.icon}"></ha-icon>
            <span>${list.name}</span>
          </button>
        `)}
      </div>
    `;
  }

  static styles = css`
    .list-tabs {
      display: flex;
      overflow-x: auto;
      border-bottom: 2px solid var(--divider-color);
      background: var(--card-background-color);
    }
    .list-tab {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }
    .list-tab:hover {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
    .list-tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      font-weight: 500;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
}

customElements.define('list-selector', ListSelector);
