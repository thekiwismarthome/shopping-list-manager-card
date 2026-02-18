import { LitElement, html, css } from 'lit';
import JsBarcode from 'jsbarcode';

class SLMLoyaltyCardsView extends LitElement {
  static properties = {
    api: { type: Object },
    cards: { type: Array },
    showAddDialog: { type: Boolean },
    showEditDialog: { type: Boolean },
    showFullscreenCard: { type: Boolean },
    editingCard: { type: Object },
    fullscreenCard: { type: Object },
    newCard: { type: Object }
  };

  constructor() {
    super();
    this.cards = [];
    this.showAddDialog = false;
    this.showEditDialog = false;
    this.showFullscreenCard = false;
    this.editingCard = null;
    this.fullscreenCard = null;
    this.newCard = {
      name: '',
      number: '',
      barcode: '',
      logo: '',
      notes: '',
      color: '#9fa8da'
    };
    this.loadCards();
  }

  loadCards() {
    const saved = localStorage.getItem('slm_loyalty_cards');
    this.cards = saved ? JSON.parse(saved) : [];
  }

  saveCards() {
    localStorage.setItem('slm_loyalty_cards', JSON.stringify(this.cards));
  }

  handleAddCard() {
    this.newCard = {
      name: '',
      number: '',
      barcode: '',
      logo: '',
      notes: '',
      color: '#9fa8da'
    };
    this.showAddDialog = true;
  }

  handleSaveNewCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const card = {
      id: Date.now().toString(),
      name: formData.get('name'),
      number: formData.get('number'),
      barcode: formData.get('barcode') || this.generateBarcode(formData.get('number')),
      logo: formData.get('logo') || '',
      notes: formData.get('notes') || '',
      color: formData.get('color') || '#9fa8da'
    };

    this.cards = [...this.cards, card];
    this.saveCards();
    this.showAddDialog = false;
  }

  handleEditCard(card) {
    this.editingCard = { ...card };
    this.showEditDialog = true;
  }

  handleSaveEditCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      ...this.editingCard,
      name: formData.get('name'),
      number: formData.get('number'),
      barcode: formData.get('barcode') || this.generateBarcode(formData.get('number')),
      logo: formData.get('logo') || '',
      notes: formData.get('notes') || '',
      color: formData.get('color')
    };

    this.cards = this.cards.map(c => c.id === updated.id ? updated : c);
    this.saveCards();
    this.showEditDialog = false;
    this.editingCard = null;
  }

  handleDeleteCard(cardId) {
    if (confirm('Delete this loyalty card?')) {
      this.cards = this.cards.filter(c => c.id !== cardId);
      this.saveCards();
      this.showEditDialog = false;
      this.editingCard = null;
    }
  }

  handleDuplicateCard(card) {
    const duplicate = {
      ...card,
      id: Date.now().toString(),
      name: `${card.name} (Copy)`
    };
    this.cards = [...this.cards, duplicate];
    this.saveCards();
  }

  handleCardClick(card) {
    this.fullscreenCard = card;
    this.showFullscreenCard = true;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (this.showFullscreenCard && this.fullscreenCard?.barcode) {
      const svg = this.shadowRoot.getElementById('barcode-svg');
      if (svg) {
        try {
          JsBarcode(svg, this.fullscreenCard.barcode, {
            format: "CODE128",
            width: 2,
            height: 80,
            displayValue: true,
            fontSize: 20,
            background: "#ffffff",
            lineColor: "#000000"
          });
        } catch (e) {
          console.warn('Barcode generation failed:', e);
        }
      }
    }
  }

  generateBarcode(number) {
    // Auto-generate barcode from number
    return number.replace(/\D/g, '');
  }

  render() {
    return html`
      <div class="loyalty-view">
        <div class="header">
          <h2>Loyalty Cards</h2>
          <button class="add-btn" @click=${this.handleAddCard}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        ${this.cards.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">💳</div>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        ` : html`
          <div class="cards-grid">
            ${this.cards.map(card => html`
              <div class="loyalty-card" style="background: ${card.color}" @click=${() => this.handleCardClick(card)}>
                <button class="menu-btn" @click=${(e) => { e.stopPropagation(); this.handleEditCard(card); }}>
                  <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </button>
                
                <div class="card-body">
                  ${card.logo ? html`
                    <img src="${card.logo}" alt="${card.name}" class="card-logo">
                  ` : ''}
                  <h3>${card.name}</h3>
                  <div class="card-number">${card.number}</div>
                  ${card.barcode ? html`
                    <div class="barcode-preview">
                      <ha-icon icon="mdi:barcode"></ha-icon>
                      <span>${card.barcode}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `)}
          </div>
        `}

        ${this.showAddDialog ? this.renderDialog(false) : ''}
        ${this.showEditDialog ? this.renderDialog(true) : ''}
        ${this.showFullscreenCard ? this.renderFullscreen() : ''}
      </div>
    `;
  }

  renderDialog(isEdit) {
    const card = isEdit ? this.editingCard : this.newCard;

    return html`
      <div class="overlay" @click=${() => isEdit ? (this.showEditDialog = false) : (this.showAddDialog = false)}>
        <form class="dialog" @click=${(e) => e.stopPropagation()} @submit=${isEdit ? this.handleSaveEditCard : this.handleSaveNewCard}>
          <div class="dialog-header">
            <h3>${isEdit ? 'Edit Card' : 'Add Loyalty Card'}</h3>
            <button type="button" @click=${() => isEdit ? (this.showEditDialog = false) : (this.showAddDialog = false)}>
              <span class="emoji">✖️</span>
            </button>
          </div>
          <div class="dialog-content">
            <label>
              Store Name
              <input type="text" name="name" placeholder="e.g., Countdown" .value=${card.name} required />
            </label>
            <label>
              Card Number
              <input type="text" name="number" placeholder="Card/Member number" .value=${card.number} required />
            </label>
            <label>
              Barcode
              <input type="text" name="barcode" placeholder="Auto-generated from number" .value=${card.barcode} />
            </label>
            <label>
              Shop Logo URL (optional)
              <input type="url" name="logo" placeholder="https://..." .value=${card.logo || ''} />
            </label>
            <label>
              Notes
              <textarea name="notes" placeholder="Additional notes..." rows="3" .value=${card.notes || ''}></textarea>
            </label>
            <label>
              Card Color
              <input type="color" name="color" .value=${card.color} />
            </label>
          </div>
          <div class="dialog-footer">
            ${isEdit ? html`
              <button type="button" class="action-btn secondary" @click=${() => this.handleDuplicateCard(card)}>
                Duplicate
              </button>
              <button type="button" class="action-btn danger" @click=${() => this.handleDeleteCard(card.id)}>
                Delete
              </button>
            ` : ''}
            <button type="submit" class="action-btn primary">
              ${isEdit ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  renderFullscreen() {
    const card = this.fullscreenCard;

    return html`
      <div class="fullscreen-overlay" @click=${() => this.showFullscreenCard = false}>
        <div class="fullscreen-card">
          <h2>${card.name}</h2>
          <div class="fullscreen-number">${card.number}</div>
          ${card.barcode ? html`
            <div class="fullscreen-barcode">
              <div class="barcode-display">
                <svg id="barcode-svg"></svg>
              </div>
            </div>
          ` : ''}
          <p class="tap-hint">Tap anywhere to close</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    .loyalty-view {
      padding: 16px 8px;
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
      color: var(--slm-text-primary);
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      box-shadow: var(--slm-shadow-soft);
      -webkit-tap-highlight-color: transparent;
    }
    .add-btn ha-icon {
      --mdc-icon-size: 24px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--slm-text-secondary);
    }
    .empty-emoji {
      font-size: 80px;
      margin-bottom: 16px;
      opacity: 0.3;
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
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(159, 168, 218, 0.3);
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
    }
    .loyalty-card {
      position: relative;
      padding: 20px;
      border-radius: 12px;
      color: white;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--slm-shadow-soft);
    }
    .menu-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .card-body {
      flex: 1;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card-logo {
      width: 60px;
      height: 60px;
      object-fit: contain;
      margin-bottom: 10px;
      background: rgba(255,255,255,0.9);
      padding: 8px;
      border-radius: 8px;
    }
    .loyalty-card h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 700;
    }
    .card-number {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .barcode-preview {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.9;
      font-size: 13px;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      width: 90%;
      max-width: 400px;
      background: var(--slm-bg-surface, #ffffff);
      color: var(--slm-text-primary);
      border-radius: 16px;
      box-shadow: var(--slm-shadow-medium);
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      color: var(--slm-text-primary);
    }
    .dialog-header button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: var(--slm-text-secondary);
    }
    .dialog-content {
      padding: 20px;
      max-height: 60vh;
      overflow-y: auto;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 14px;
      font-weight: 600;
      font-size: 13px;
      color: var(--slm-text-secondary);
    }
    .dialog-content input,
    .dialog-content textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 6px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--slm-text-primary);
      background: var(--slm-bg-main, #fafbfc);
    }
    .dialog-content input[type="color"] {
      padding: 4px;
      height: 40px;
      cursor: pointer;
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--slm-border-subtle);
    }
    .action-btn {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .action-btn.primary {
      background: var(--slm-accent-primary, #9fa8da);
      color: white;
    }
    .action-btn.secondary {
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
    }
    .action-btn.danger {
      background: var(--slm-accent-danger, #ef9a9a);
      color: white;
    }
    .fullscreen-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      cursor: pointer;
    }
    .fullscreen-card {
      text-align: center;
      color: white;
      padding: 40px;
      max-width: 90%;
    }
    .fullscreen-card h2 {
      margin: 0 0 20px 0;
      font-size: 28px;
    }
    .fullscreen-number {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-bottom: 40px;
    }
    .fullscreen-barcode {
      margin: 40px auto;
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 400px;
    }
    .barcode-display {
      margin-bottom: 20px;
    }
    .barcode-svg {
      width: 100%;
      height: 120px;
    }
    .barcode-number {
      font-size: 24px;
      font-weight: 700;
      color: black;
      letter-spacing: 2px;
    }
    .tap-hint {
      margin-top: 40px;
      opacity: 0.7;
      font-size: 14px;
    }
  `;
}

customElements.define('slm-loyalty-cards-view', SLMLoyaltyCardsView);