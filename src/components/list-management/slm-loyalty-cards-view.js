import { LitElement, html, css } from 'lit';

class SLMLoyaltyCardsView extends LitElement {
  static properties = {
    api: { type: Object },
    cards: { type: Array },
    showAddDialog: { type: Boolean }
  };

  constructor() {
    super();
    this.cards = [];
    this.showAddDialog = false;
    this.loadCards();
  }

  loadCards() {
    // Load from localStorage for now
    const saved = localStorage.getItem('loyalty_cards');
    this.cards = saved ? JSON.parse(saved) : [];
  }

  saveCards() {
    localStorage.setItem('loyalty_cards', JSON.stringify(this.cards));
  }

  handleAddCard() {
    this.showAddDialog = true;
  }

  handleSaveCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCard = {
      id: Date.now().toString(),
      name: formData.get('name'),
      number: formData.get('number'),
      barcode: formData.get('barcode'),
      color: formData.get('color') || '#4CAF50'
    };

    this.cards = [...this.cards, newCard];
    this.saveCards();
    this.showAddDialog = false;
  }

  handleDeleteCard(cardId) {
    if (confirm('Delete this loyalty card?')) {
      this.cards = this.cards.filter(c => c.id !== cardId);
      this.saveCards();
    }
  }

  render() {
    return html`
      <div class="slm-loyalty-view">
        <div class="header">
          <h2>Loyalty Cards</h2>
          <button class="add-btn" @click=${this.handleAddCard}>
            <ha-icon icon="mdi:plus"></ha-icon>
            Add Card
          </button>
        </div>

        ${this.cards.length === 0 ? html`
          <div class="empty">
            <ha-icon icon="mdi:card-account-details-outline"></ha-icon>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        ` : html`
          <div class="cards-grid">
            ${this.cards.map(card => html`
              <div class="loyalty-card" style="background: ${card.color}">
                <button class="delete-btn" @click=${() => this.handleDeleteCard(card.id)}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
                <h3>${card.name}</h3>
                <div class="card-number">${card.number}</div>
                ${card.barcode ? html`
                  <div class="barcode">
                    <ha-icon icon="mdi:barcode"></ha-icon>
                    <span>${card.barcode}</span>
                  </div>
                ` : ''}
              </div>
            `)}
          </div>
        `}

        ${this.showAddDialog ? html`
          <div class="overlay" @click=${() => this.showAddDialog = false}>
            <form class="dialog" @click=${(e) => e.stopPropagation()} @submit=${this.handleSaveCard}>
              <div class="dialog-header">
                <h3>Add Loyalty Card</h3>
                <button type="button" @click=${() => this.showAddDialog = false}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
              <div class="dialog-content">
                <label>
                  Store Name
                  <input type="text" name="name" placeholder="e.g., Countdown" required />
                </label>
                <label>
                  Card Number
                  <input type="text" name="number" placeholder="Card/Member number" required />
                </label>
                <label>
                  Barcode (optional)
                  <input type="text" name="barcode" placeholder="Barcode number" />
                </label>
                <label>
                  Card Color
                  <input type="color" name="color" value="#4CAF50" />
                </label>
              </div>
              <div class="dialog-footer">
                <button type="button" class="cancel-btn" @click=${() => this.showAddDialog = false}>Cancel</button>
                <button type="submit" class="save-btn">Add Card</button>
              </div>
            </form>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .slm-loyalty-view {
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
    .add-btn {
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
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--secondary-text-color);
    }
    .empty ha-icon {
      font-size: 80px;
      opacity: 0.2;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .loyalty-card {
      position: relative;
      padding: 24px;
      border-radius: 16px;
      color: white;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .delete-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255,255,255,0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .loyalty-card:hover .delete-btn {
      opacity: 1;
    }
    .loyalty-card h3 {
      margin: 0 0 16px 0;
      font-size: 20px;
      font-weight: 700;
    }
    .card-number {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .barcode {
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0.9;
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
      color: var(--secondary-text-color);
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

customElements.define('loyalty-cards-view', LoyaltyCardsView);