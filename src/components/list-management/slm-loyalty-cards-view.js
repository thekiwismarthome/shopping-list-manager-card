import { LitElement, html, css } from 'lit';
import JsBarcode from 'jsbarcode';
import { Html5Qrcode } from 'html5-qrcode';
import QRCode from 'qrcode';

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
    showViewMenu: { type: Boolean },
    editingCard: { type: Object },
    fullscreenCard: { type: Object },
    membersCard: { type: Object },
    newCard: { type: Object },
    allUsers: { type: Array },
    _viewMode: { type: String },
    _viewMenuX: { type: Number },
    _viewMenuY: { type: Number },
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
    this.showViewMenu = false;
    this.editingCard = null;
    this.fullscreenCard = null;
    this.membersCard = null;
    this.allUsers = [];
    this._loading = false;
    this._viewMode = localStorage.getItem('slm_loyalty_view_mode') || 'card';
    this._viewMenuX = 0;
    this._viewMenuY = 0;
    this.newCard = {
      name: '',
      number: '',
      barcode: '',
      barcode_type: 'barcode',
      logo: '',
      notes: '',
      color: '#9fa8da',
      private: true
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
      const isQR = this.fullscreenCard.barcode_type === 'qrcode';
      if (isQR) {
        const canvas = this.shadowRoot.getElementById('qrcode-canvas');
        if (canvas) {
          QRCode.toCanvas(canvas, this.fullscreenCard.barcode, {
            width: 260,
            margin: 2,
            color: { dark: '#000000', light: '#ffffff' }
          }).catch(e => console.warn('QR code generation failed:', e));
        }
      } else {
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

  // ── View mode ────────────────────────────────────────────────────────────────

  handleViewMenuClick(e) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    this._viewMenuX = rect.right - 150;
    this._viewMenuY = rect.bottom + 5;
    this.showViewMenu = !this.showViewMenu;
  }

  setViewMode(mode) {
    this._viewMode = mode;
    localStorage.setItem('slm_loyalty_view_mode', mode);
    this.showViewMenu = false;
  }

  // ── Barcode scanner ──────────────────────────────────────────────────────────

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

  // ── CRUD ─────────────────────────────────────────────────────────────────────

  handleAddCard() {
    this.newCard = {
      name: '',
      number: '',
      barcode: '',
      barcode_type: 'barcode',
      logo: '',
      notes: '',
      color: '#9fa8da',
      private: true
    };
    this.showAddDialog = true;
  }

  async handleSaveNewCard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cardData = {
      name: formData.get('name'),
      number: formData.get('number'),
      barcode: formData.get('barcode') || formData.get('number').replace(/\D/g, ''),
      barcode_type: this.newCard.barcode_type,
      logo: formData.get('logo') || '',
      notes: formData.get('notes') || '',
      color: formData.get('color') || '#9fa8da',
      private: this.newCard.private
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
      barcode_type: this.editingCard.barcode_type,
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
      private: true
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

  // ── Render ────────────────────────────────────────────────────────────────────

  render() {
    return html`
      <div class="loyalty-view">
        <div class="header">
          <h2>Loyalty Cards</h2>
          <div class="header-actions">
            <button class="add-btn" @click=${this.handleAddCard} title="Add card">
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
            <button class="icon-btn" @click=${this.handleViewMenuClick} title="View options">
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
          </div>
        </div>

        ${this._loading ? html`<div class="loading">Loading...</div>` : ''}

        ${!this._loading && this.cards.length === 0 ? html`
          <div class="empty">
            <div class="empty-emoji">💳</div>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        ` : this._viewMode === 'tile' ? this.renderTileGrid() : this.renderCardGrid()}

        ${this.showAddDialog ? this.renderAddDialog() : ''}
        ${this.showEditDialog ? this.renderEditDialog() : ''}
        ${this.showFullscreenCard ? this.renderFullscreen() : ''}
        ${this.showMembersDialog ? this.renderMembersDialog() : ''}
        ${this.showViewMenu ? this.renderViewMenu() : ''}
      </div>
    `;
  }

  renderCardGrid() {
    return html`
      <div class="cards-grid">
        ${this.cards.map(card => html`
          <div class="loyalty-card" style="background: ${card.color}" @click=${() => this.handleCardClick(card)}>
            ${card.owner_id ? html`
              <div class="private-badge">
                <ha-icon icon="mdi:lock"></ha-icon>
              </div>
            ` : ''}
            <button class="card-menu-btn" @click=${(e) => { e.stopPropagation(); this.handleEditCard(card); }}>
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
                  <ha-icon icon="${card.barcode_type === 'qrcode' ? 'mdi:qrcode' : 'mdi:barcode'}"></ha-icon>
                  <span>${card.barcode}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  renderTileGrid() {
    return html`
      <div class="tiles-grid">
        ${this.cards.map(card => html`
          <div
            class="loyalty-tile"
            style="${card.logo ? '' : `background: ${card.color};`}"
            @click=${() => this.handleCardClick(card)}
          >
            ${card.logo ? html`
              <img src="${card.logo}" alt="${card.name}" class="tile-img">
            ` : ''}
            <div class="tile-overlay">
              <div class="tile-name">${card.name}</div>
            </div>
            ${card.owner_id ? html`
              <div class="tile-private-badge">
                <ha-icon icon="mdi:lock"></ha-icon>
              </div>
            ` : ''}
            <button class="tile-menu-btn" @click=${(e) => { e.stopPropagation(); this.handleEditCard(card); }}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
          </div>
        `)}
      </div>
    `;
  }

  renderViewMenu() {
    return html`
      <div class="view-menu-overlay" @click=${() => this.showViewMenu = false}>
        <div class="view-menu-popup" style="left: ${this._viewMenuX}px; top: ${this._viewMenuY}px;">
          <button class="${this._viewMode === 'card' ? 'active' : ''}" @click=${(e) => { e.stopPropagation(); this.setViewMode('card'); }}>
            <ha-icon icon="mdi:card-text"></ha-icon>
            Card View
          </button>
          <button class="${this._viewMode === 'tile' ? 'active' : ''}" @click=${(e) => { e.stopPropagation(); this.setViewMode('tile'); }}>
            <ha-icon icon="mdi:view-grid"></ha-icon>
            Tile View
          </button>
        </div>
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
            <button type="button" @click=${() => this.showAddDialog = false}>✖️</button>
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
              Code Value
              <input type="text" name="barcode" placeholder="Auto-generated from number" .value=${card.barcode} />
            </label>
            <label>
              Code Type
              <div class="type-row">
                <label class="type-option">
                  <input type="radio" name="barcode_type_add" value="barcode"
                    .checked=${card.barcode_type !== 'qrcode'}
                    @change=${() => this.newCard = { ...this.newCard, barcode_type: 'barcode' }} />
                  <ha-icon icon="mdi:barcode"></ha-icon>
                  Barcode
                </label>
                <label class="type-option">
                  <input type="radio" name="barcode_type_add" value="qrcode"
                    .checked=${card.barcode_type === 'qrcode'}
                    @change=${() => this.newCard = { ...this.newCard, barcode_type: 'qrcode' }} />
                  <ha-icon icon="mdi:qrcode"></ha-icon>
                  QR Code
                </label>
              </div>
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
            <button type="button" @click=${() => { this.showEditDialog = false; this.editingCard = null; }}>✖️</button>
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
              Code Value
              <input type="text" name="barcode" placeholder="Auto-generated from number" .value=${card.barcode} />
            </label>
            <label>
              Code Type
              <div class="type-row">
                <label class="type-option">
                  <input type="radio" name="barcode_type_edit" value="barcode"
                    .checked=${card.barcode_type !== 'qrcode'}
                    @change=${() => this.editingCard = { ...this.editingCard, barcode_type: 'barcode' }} />
                  <ha-icon icon="mdi:barcode"></ha-icon>
                  Barcode
                </label>
                <label class="type-option">
                  <input type="radio" name="barcode_type_edit" value="qrcode"
                    .checked=${card.barcode_type === 'qrcode'}
                    @change=${() => this.editingCard = { ...this.editingCard, barcode_type: 'qrcode' }} />
                  <ha-icon icon="mdi:qrcode"></ha-icon>
                  QR Code
                </label>
              </div>
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
            <button type="button" @click=${() => { this.showMembersDialog = false; this.membersCard = null; }}>✖️</button>
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
              ${card.barcode_type === 'qrcode' ? html`
                <canvas id="qrcode-canvas"></canvas>
              ` : html`
                <div class="barcode-display">
                  <svg id="barcode-svg"></svg>
                </div>
              `}
            </div>
          ` : ''}
          <p class="tap-hint">Tap anywhere to close</p>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .loyalty-view {
      padding: 16px 8px;
    }

    /* ── Header ─────────────────────────────────── */
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
      flex: 1;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--slm-bg-elevated, #f0f0f0);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--slm-text-primary);
      -webkit-tap-highlight-color: transparent;
    }
    .icon-btn ha-icon {
      --mdc-icon-size: 22px;
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: var(--slm-shadow-soft);
      -webkit-tap-highlight-color: transparent;
    }
    .add-btn ha-icon {
      --mdc-icon-size: 24px;
    }

    /* ── View menu popup ─────────────────────────── */
    .view-menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
    }
    .view-menu-popup {
      position: fixed;
      background: var(--slm-bg-elevated, #fff);
      box-shadow: var(--slm-shadow-medium);
      border-radius: 10px;
      overflow: hidden;
      min-width: 150px;
      z-index: 10000;
    }
    .view-menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 13px 16px;
      border: none;
      background: transparent;
      color: var(--slm-text-primary);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .view-menu-popup button:active,
    .view-menu-popup button.active {
      background: var(--slm-bg-surface);
      font-weight: 600;
    }
    .view-menu-popup button ha-icon {
      --mdc-icon-size: 20px;
      opacity: 0.75;
    }
    .view-menu-popup button.active ha-icon {
      opacity: 1;
      color: var(--primary-color);
    }

    /* ── Loading / Empty ─────────────────────────── */
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

    /* ── Card view ───────────────────────────────── */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }
    .loyalty-card {
      position: relative;
      padding: 20px;
      border-radius: 12px;
      color: white;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--slm-shadow-soft);
      cursor: pointer;
    }
    .card-menu-btn {
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
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      -webkit-tap-highlight-color: transparent;
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
    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card-logo {
      width: 56px;
      height: 56px;
      object-fit: contain;
      margin-bottom: 10px;
      background: rgba(255,255,255,0.9);
      padding: 6px;
      border-radius: 8px;
    }
    .loyalty-card h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      font-weight: 700;
    }
    .card-number {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .barcode-preview {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.9;
      font-size: 13px;
    }

    /* ── Tile view ───────────────────────────────── */
    .tiles-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .loyalty-tile {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 1;
      cursor: pointer;
      box-shadow: var(--slm-shadow-soft);
    }
    .tile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .tile-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.65));
      padding: 22px 8px 8px;
    }
    .tile-name {
      font-size: 11px;
      font-weight: 700;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tile-private-badge {
      position: absolute;
      top: 6px;
      left: 6px;
      background: rgba(0,0,0,0.35);
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tile-private-badge ha-icon {
      --mdc-icon-size: 13px;
      color: white;
    }
    .tile-menu-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(0,0,0,0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }
    .tile-menu-btn ha-icon {
      --mdc-icon-size: 18px;
    }

    /* ── Dialogs ──────────────────────────────────── */
    .overlay {
      position: fixed;
      inset: 0;
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
      width: 20px;
      height: 20px;
      display: inline;
      margin-top: 0;
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
      -webkit-tap-highlight-color: transparent;
    }
    .scan-btn:active { background: var(--slm-border-subtle); }
    .type-row {
      display: flex;
      gap: 10px;
      margin-top: 8px;
    }
    .type-option {
      flex: 1;
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500 !important;
      font-size: 14px !important;
      color: var(--slm-text-primary) !important;
      background: var(--slm-bg-main, #fafbfc);
      margin-bottom: 0 !important;
      transition: border-color 0.15s, background 0.15s;
    }
    .type-option input[type="radio"] {
      display: none;
      width: auto;
      margin-top: 0;
    }
    .type-option:has(input:checked) {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .type-option ha-icon {
      --mdc-icon-size: 20px;
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
    .action-btn.primary { background: var(--slm-accent-primary, #9fa8da); color: white; }
    .action-btn.secondary {
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
    }
    .action-btn.danger { background: var(--slm-accent-danger, #ef9a9a); color: white; }
    .action-btn ha-icon { --mdc-icon-size: 18px; }

    /* ── Fullscreen ───────────────────────────────── */
    .fullscreen-overlay {
      position: fixed;
      inset: 0;
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
    .barcode-display { margin-bottom: 20px; }
    #qrcode-canvas {
      display: block;
      width: 260px !important;
      height: 260px !important;
      border-radius: 8px;
    }
    .tap-hint {
      margin-top: 40px;
      opacity: 0.7;
      font-size: 14px;
    }
  `;
}

customElements.define('slm-loyalty-cards-view', SLMLoyaltyCardsView);
