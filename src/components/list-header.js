import { LitElement, html, css } from 'lit';

class ListHeader extends LitElement {
  static properties = {
    activeList: { type: Object },
    itemCount: { type: Number }
  };

  render() {
    return html`
      <div class="header">
        <div class="list-info">
          <ha-icon icon="${this.activeList?.icon || 'mdi:cart'}"></ha-icon>
          <h2>${this.activeList?.name || 'Shopping List'}</h2>
        </div>
        ${this.itemCount > 0 ? html`
          <div class="item-badge">${this.itemCount}</div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: var(--card-background-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .list-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .list-info ha-icon {
      --mdc-icon-size: 28px;
      color: var(--primary-color);
    }
    .list-info h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    .item-badge {
      background: var(--primary-color);
      color: white;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 600;
    }
  `;
}

customElements.define('list-header', ListHeader);