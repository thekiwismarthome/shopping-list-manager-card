import { LitElement, html, css } from 'lit';

class ListHeader extends LitElement {
  static properties = {
    activeList: { type: Object },
    itemCount: { type: Number }
  };

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

  render() {
    return html`
      <div class="header">
        <div class="list-info">
          <span class="emoji">${this.getListEmoji(this.activeList?.icon)}</span>
          <h2>${this.activeList?.name || 'Shopping List'}</h2>
        </div>
      </div>
    `;
  }

  static styles = css`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
      border-bottom: 1px solid #e8eaf6;
    }
    .list-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .emoji {
      font-size: 28px;
    }
    .list-info h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #5f6368;
    }
  `;
}

customElements.define('slm-list-header', ListHeader);