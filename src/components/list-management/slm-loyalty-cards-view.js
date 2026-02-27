import { LitElement, html, css } from 'lit';
import JsBarcode from 'jsbarcode';
import { Html5Qrcode } from 'html5-qrcode';

class SLMLoyaltyCardsView extends LitElement {
  static properties = {
    api: { type: Object },
    userId: { type: String },
    isAdmin: { type: Boolean },
    cards: { type: Array },
    showAddDialog: { type: Boolean },
    showEditDialog: { type: Boolean },
    showFullscreenCard: { type: Boolean },
    showMembersDialog: { type: Boolean },
    editingCard: { type: Object },
    fullscreenCard: { type: Object },
    membersCard: { type: Object },
    newCard: { type: Object },
    allUsers: { type: Array },
    _loading: { type: Boolean }
  };

  constructor() {
    super();
    this.userId = null;
    this.isAdmin = false;
    this.cards = [];
    this.showAddDialog = false;
    this.showEditDialog = false;
    this.showFullscreenCard = false;
    this.showMembersDialog = false;
    this.editingCard = null;
    this.fullscreenCard = null;
    this.membersCard = null;
    this.allUsers = [];
    this._loading = false;
    this.newCard = {
      name: '',
      number: '',
      barcode: '',
      logo: '',
      notes: '',
      color: '#9fa8da',
      private: false
    };
    this._scannerInstance = null;
    this._loadedForUserId = null;
  }

  updated(changedProps) {
    if ((changedProps.has('userId') || changedProps.has('api')) && this.userId && this.api) {
      if (this.userId !== this._loadedForUserId) {
        this._loadedForUserId = this.userId;
        this.loadCards();
      }
    }
    if (this.showFullscreenCard && this.fullscreenCard?.barcode) {
      const svg = this.shadowRoot.getElementById('barcode-svg');
      if (svg) {
        try {
          JsBarcode(svg, this.fullscreenCard.barcode, {
            format: 'CODE128',
            width: 2,
            height: 80,
            displayValue: true,
            fontSize: 20,
            background: '#ffffff',
            lineColor: '#000000'
          });
        } catch (e) {
          console.warn('Barcode generation failed:', e);
        }
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopBarcodeScanner();
  }

  async loadCards() {
    if (!this.api) return;
    this._loading = true;
    try {
      const result = await this.api.getLoyaltyCards();
      this.cards = result.cards || [];
    } catch (err) {
      console.error('Failed to load loyalty cards:', err);
      this.cards = [];
    } finally {
      this._loading = false;
    }
  }

  async _loadAllUsers() {
    if (this.allUsers.length > 0) return;
    try {
      const result = await this.api.getHAUsers();
      this.allUsers = result.users || [];
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  }

  startBarcodeScanner(isEdit) {
    const host = document.createElement('div');
    host.id = 'slm-barcode-scanner-host';
    Object.assign(host.style, {
      position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
      zIndex: '99999', background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    });

    const label = document.createElement('p');
    label.textContent = 'Point camera at barcode';
    Object.assign(label.style, { color: '#fff', fontSize: '16px', margin: '0 0 12px 0' });

    const scanRegion = document.createElement('div');
    scanRegion.id = 'slm-scanner-region';
    Object.assign(scanRegion.style, { width: '100%', maxWidth: '400px' });

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '✕ Cancel';
    Object.assign(cancelBtn.style, {
      marginTop: '20px', padding: '10px 28px', fontSize: '16px', fontWeight: '600',
      background: '#fff', color: '#333', border: 'none', borderRadius: '10px', cursor: 'pointer'
    });
    cancelBtn.onclick = () => this.stopBarcodeScanner();

    host.append(label, scanRegion, cancelBtn);
    document.body.appendChild(host);

    this._scannerInstance = new Html5Qrcode('slm-scanner-region');
    this._scannerInstance.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 280, height: 120 } },
      (decodedText) => {
        if (isEdit) {
          this.editingCard = { ...this.editingCard, number: decodedText, barcode: decodedText };
        } else {
          this.newCard = { ...this.newCard, number: decodedText, barcode: decodedText };
        }
        this.stopBarcodeScanner();
      },
      () => {}
    ).catch((err) => {
      console.warn('Scanner failed to start:', err);
      this.stopBarcodeScanner();
    });
  }

  stopBarcodeScanner() {
    if (this._scannerInstance) {
      this._scannerInstance.stop().catch(() => {});
      this._scannerInstance = null;
    }
    document.getElementById('slm-barcode-scanner-host')?.remove();
  }

  handleAddCard() {
    this.newCard = {
      name: '',
      number: '',
      barcode: '',
      logo: '',
      notes: '',
      color: '#9fa8da',
      private: false
    };
    this.showAddDialog = true;
  }

  async handleSaveNewCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isPrivate = this.newCard.private;
    const cardData = {
      name: formData.get('name'),
      number: formData.get('number'),
      barcode: formData.get('barcode') || formData.get('number').replace(/\D/g, ''),
      logo: formData.get('logo') || '',
      notes: formData.get('notes') || '',
      color: formData.get('color') || '#9fa8da',
      private: isPrivate
    };
    try {
      const result = await this.api.addLoyaltyCard(cardData);
      this.cards = [...this.cards, result.card];
      this.showAddDialog = false;
    } catch (err) {
      console.error('Failed to add loyalty card:', err);
    }
  }

  handleEditCard(card) {
    this.editingCard = { ...card };
    this.showEditDialog = true;
  }

  async handleSaveEditCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      name: formData.get('name'),
      number: formData.get('number'),
      barcode: formData.get('barcode') || formData.get('number').replace(/\D/g, ''),
      logo: formData.get('logo') || '',
      notes: formData.get('notes') || '',
      color: formData.get('color')
    };
    try {
      const result = await this.api.updateLoyaltyCard(this.editingCard.id, updates);
      this.cards = this.cards.map(c => c.id === this.editingCard.id ? result.card : c);
      this.showEditDialog = false;
      this.editingCard = null;
    } catch (err) {
      console.error('Failed to update loyalty card:', err);
    }
  }

  async handleDeleteCard(cardId) {
    if (!confirm('Delete this loyalty card?')) return;
    try {
      await this.api.deleteLoyaltyCard(cardId);
      this.cards = this.cards.filter(c => c.id !== cardId);
      this.showEditDialog = false;
      this.editingCard = null;
    } catch (err) {
      console.error('Failed to delete loyalty card:', err);
    }
  }

  async handleDuplicateCard(card) {
    const cardData = {
      name: `${card.name} (Copy)`,
      number: card.number,
      barcode: card.barcode,
      logo: card.logo,
      notes: card.notes,
      color: card.color,
      private: false
    };
    try {
      const result = await this.api.addLoyaltyCard(cardData);
      this.cards = [...this.cards, result.card];
    } catch (err) {
      console.error('Failed to duplicate loyalty card:', err);
    }
  }

  handleCardClick(card) {
    this.fullscreenCard = card;
    this.showFullscreenCard = true;
  }

  async handleOpenMembers(card) {
    this.membersCard = card;
    this.showMembersDialog = true;
    await this._loadAllUsers();
  }

  async handleSaveMembers(e) {
    e.preventDefault();
    const checkboxes = this.shadowRoot.querySelectorAll('.member-checkbox:checked');
    const allowedUsers = Array.from(checkboxes).map(cb => cb.value);
    try {
      const result = await this.api.updateLoyaltyCardMembers(this.membersCard.id, allowedUsers);
      this.cards = this.cards.map(c => c.id === this.membersCard.id ? result.card : c);
      this.showMembersDialog = false;
      this.membersCard = null;
    } catch (err) {
      console.error('Failed to update card members:', err);
    }
  }

  _isOwner(card) {
    return card?.owner_id === this.userId;
  }

  _canManageMembers(card) {
    return card?.owner_id && (this._isOwner(card) || this.isAdmin);
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

        ${this._loading ? html`<div class="loading">Loading...</div>` : ''}

        ${!this._loading && this.cards.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">💳</div>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        ` : html`
          <div class="cards-grid">
            ${this.cards.map(card => html`
              <div class="loyalty-card" style="background: ${card.color}" @click=${() => this.handleCardClick(card)}>
                ${card.owner_id ? html`
                  <div class="private-badge">
                    <ha-icon icon="mdi:lock"></ha-icon>
                  </div>
                ` : ''}
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

        ${this.showAddDialog ? this.renderAddDialog() : ''}
        ${this.showEditDialog ? this.renderEditDialog() : ''}
        ${this.showFullscreenCard ? this.renderFullscreen() : ''}
        ${this.showMembersDialog ? this.renderMembersDialog() : ''}
      </div>
    `;
  }

  renderAddDialog() {
    const card = this.newCard;
    return html`
      <div class="overlay" @click=${() => this.showAddDialog = false}>
        <form class="dialog" @click=${(e) => e.stopPropagation()} @submit=${this.handleSaveNewCard}>
          <div class="dialog-header">
            <h3>Add Loyalty Card</h3>
            <button type="button" @click=${() => this.showAddDialog = false}>
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
              <div class="scan-row">
                <input type="text" name="number" placeholder="Card/Member number" .value=${card.number} required />
                <button type="button" class="scan-btn" title="Scan barcode" @click=${() => this.startBarcodeScanner(false)}>📷</button>
              </div>
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
            <label class="toggle-label">
              <span>Private (only visible to you)</span>
              <input type="checkbox" .checked=${card.private} @change=${(e) => this.newCard = { ...this.newCard, private: e.target.checked }} />
            </label>
          </div>
          <div class="dialog-footer">
            <button type="submit" class="action-btn primary">Add</button>
          </div>
        </form>
      </div>
    `;
  }

  renderEditDialog() {
    const card = this.editingCard;
    return html`
      <div class="overlay" @click=${() => { this.showEditDialog = false; this.editingCard = null; }}>
        <form class="dialog" @click=${(e) => e.stopPropagation()} @submit=${this.handleSaveEditCard}>
          <div class="dialog-header">
            <h3>Edit Card</h3>
            <button type="button" @click=${() => { this.showEditDialog = false; this.editingCard = null; }}>
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
              <div class="scan-row">
                <input type="text" name="number" placeholder="Card/Member number" .value=${card.number} required />
                <button type="button" class="scan-btn" title="Scan barcode" @click=${() => this.startBarcodeScanner(true)}>📷</button>
              </div>
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
            <button type="button" class="action-btn secondary" @click=${() => this.handleDuplicateCard(card)}>
              Duplicate
            </button>
            ${this._canManageMembers(card) ? html`
              <button type="button" class="action-btn secondary" @click=${(e) => { e.preventDefault(); this.showEditDialog = false; this.handleOpenMembers(card); }}>
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                Members
              </button>
            ` : ''}
            <button type="button" class="action-btn danger" @click=${() => this.handleDeleteCard(card.id)}>
              Delete
            </button>
            <button type="submit" class="action-btn primary">Save</button>
          </div>
        </form>
      </div>
    `;
  }

  renderMembersDialog() {
    const card = this.membersCard;
    const otherUsers = this.allUsers.filter(u => u.id !== this.userId);
    const allowedSet = new Set(card.allowed_users || []);

    return html`
      <div class="overlay" @click=${() => { this.showMembersDialog = false; this.membersCard = null; }}>
        <form class="dialog" @click=${(e) => e.stopPropagation()} @submit=${this.handleSaveMembers}>
          <div class="dialog-header">
            <h3>Manage Members</h3>
            <button type="button" @click=${() => { this.showMembersDialog = false; this.membersCard = null; }}>
              <span class="emoji">✖️</span>
            </button>
          </div>
          <div class="dialog-content">
            <p class="members-hint">Select which users can see "${card.name}"</p>
            ${otherUsers.length === 0 ? html`
              <p class="no-users">No other users found.</p>
            ` : otherUsers.map(user => html`
              <label class="user-row">
                <input type="checkbox" class="member-checkbox" .value=${user.id} .checked=${allowedSet.has(user.id)} />
                <span>${user.name}</span>
              </label>
            `)}
          </div>
          <div class="dialog-footer">
            <button type="button" class="action-btn secondary" @click=${() => { this.showMembersDialog = false; this.membersCard = null; }}>
              Cancel
            </button>
            <button type="submit" class="action-btn primary">Save</button>
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
    .loading {
      text-align: center;
      padding: 40px;
      color: var(--slm-text-secondary);
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
      cursor: pointer;
    }
    .private-badge {
      position: absolute;
      bottom: 10px;
      right: 44px;
      opacity: 0.8;
      display: flex;
      align-items: center;
    }
    .private-badge ha-icon {
      --mdc-icon-size: 16px;
      color: white;
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
      -webkit-tap-highlight-color: transparent;
    }
    .card-body {
      flex: 1;
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
    .toggle-label {
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    .toggle-label input[type="checkbox"] {
      width: auto;
      display: inline;
      margin-top: 0;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    .scan-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
      margin-top: 6px;
    }
    .scan-row input {
      flex: 1;
      margin-top: 0;
    }
    .scan-btn {
      flex-shrink: 0;
      padding: 0 14px;
      font-size: 20px;
      background: var(--slm-bg-main, #fafbfc);
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      cursor: pointer;
      line-height: 1;
      -webkit-tap-highlight-color: transparent;
    }
    .scan-btn:active {
      background: var(--slm-border-subtle);
    }
    .members-hint {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: var(--slm-text-secondary);
    }
    .no-users {
      color: var(--slm-text-secondary);
      font-size: 14px;
    }
    .user-row {
      display: flex !important;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid var(--slm-border-subtle);
      font-weight: 500 !important;
      font-size: 15px !important;
      color: var(--slm-text-primary) !important;
      cursor: pointer;
    }
    .user-row input[type="checkbox"] {
      width: 20px;
      height: 20px;
      display: inline;
      margin-top: 0;
      cursor: pointer;
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--slm-border-subtle);
      flex-wrap: wrap;
    }
    .action-btn {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      -webkit-tap-highlight-color: transparent;
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
    .action-btn ha-icon {
      --mdc-icon-size: 18px;
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
    .tap-hint {
      margin-top: 40px;
      opacity: 0.7;
      font-size: 14px;
    }
  `;
}

customElements.define('slm-loyalty-cards-view', SLMLoyaltyCardsView);
