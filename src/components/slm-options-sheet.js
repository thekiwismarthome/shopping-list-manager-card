import { LitElement, html, css } from 'lit';
import { t, I18nController } from '../services/translator.js';
import { SheetSwipe } from '../services/sheet-swipe.js';
import { fontInherit } from '../styles/ui-styles.js';
import { TILE_CHOICES } from '../services/tiles.js';

/**
 * Bottom sheet with the list options (design A). Design B uses the dropdown menu in the header.
 * Emits: close, menu-setting-change {key,value}, settings-changed {keepScreenOn}, share, clear-checked.
 */
class SLMOptionsSheet extends LitElement {
  _i18n = new I18nController(this);
  _swipe = new SheetSwipe(this); // swipe a popup down to close it

  static properties = {
    settings: { type: Object },
    hasChecked: { type: Boolean },
    wakeLockSupported: { type: Boolean },
  };

  _set(key, value) {
    this.dispatchEvent(new CustomEvent('menu-setting-change', {
      detail: { key, value }, bubbles: true, composed: true
    }));
  }

  _emit(name) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  _toggle(key, label, on, onChange) {
    return html`
      <div class="row">
        <span class="row-label">${label}</span>
        <button class="tg" role="switch" aria-checked=${on ? 'true' : 'false'} aria-label=${label}
                @click=${onChange}></button>
      </div>
    `;
  }

  // How many tiles in a row: Auto follows the screen, or pick a number
  _tileChoices(s) {
    const current = s.tilesPerRow == null ? 'auto' : s.tilesPerRow;
    const choices = TILE_CHOICES.includes(current) ? TILE_CHOICES : [...TILE_CHOICES, current];
    return html`
      <div class="label" id="tiles-label">${t('Tiles per row')}</div>
      <div class="chips" role="radiogroup" aria-labelledby="tiles-label">
        ${choices.map(c => html`
          <button class="chip ${current === c ? 'on' : ''}" role="radio" aria-checked=${current === c ? 'true' : 'false'}
                  @click=${() => this._set('tilesPerRow', c)}>${c === 'auto' ? t('Auto') : c}</button>
        `)}
      </div>
    `;
  }

  render() {
    const s = this.settings || {};
    const viewMode = s.viewMode || 'tile';
    const sortMode = s.sortMode || 'category';
    return html`
      <div class="scrim" @click=${() => this._emit('close')}></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-label=${t('List options')}>
        <div class="grab"></div>
        <div class="sheet-head">
          <h2>${t('List options')}</h2>
          <button class="done" @click=${() => this._emit('close')}>${t('Done')}</button>
        </div>

        <div class="label">${t('View')}</div>
        <div class="seg">
          <button aria-pressed=${viewMode === 'list' ? 'true' : 'false'} @click=${() => this._set('viewMode', 'list')}>
            <ha-icon icon="mdi:format-list-bulleted"></ha-icon>${t('List')}
          </button>
          <button aria-pressed=${viewMode === 'tile' ? 'true' : 'false'} @click=${() => this._set('viewMode', 'tile')}>
            <ha-icon icon="mdi:view-grid-outline"></ha-icon>${t('Tiles')}
          </button>
        </div>

        ${viewMode === 'tile' ? this._tileChoices(s) : ''}

        <div class="label">${t('Sort')}</div>
        <div class="chips">
          <button class="chip ${sortMode === 'category' ? 'on' : ''}" @click=${() => this._set('sortMode', 'category')}>${t('By Category')}</button>
          <button class="chip ${sortMode === 'alphabetical' ? 'on' : ''}" @click=${() => this._set('sortMode', 'alphabetical')}>${t('A–Z')}</button>
        </div>

        <div class="card">
          ${this._toggle('showPriceOnTile', t('Show Price'), s.showPriceOnTile !== false,
            () => this._set('showPriceOnTile', s.showPriceOnTile === false))}
          ${this._toggle('showRecentlyUsed', t('Recently Used'), s.showRecentlyUsed !== false,
            () => this._set('showRecentlyUsed', s.showRecentlyUsed === false))}
          ${this.wakeLockSupported ? this._toggle('keepScreenOn', t('Keep Screen On'), !!s.keepScreenOn,
            () => this.dispatchEvent(new CustomEvent('settings-changed', {
              detail: { keepScreenOn: !s.keepScreenOn }, bubbles: true, composed: true
            }))) : ''}
        </div>

        <div class="card">
          <button class="action" @click=${() => this._emit('share')}>
            <ha-icon icon="mdi:account-plus-outline"></ha-icon>
            <span>${t('Share list')}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
          <button class="action" ?disabled=${!this.hasChecked} @click=${() => this._emit('clear-checked')}>
            <ha-icon icon="mdi:check-all"></ha-icon>
            <span>${t('Clear checked items')}</span>
          </button>
        </div>
      </div>
    `;
  }

  static styles = [css`
    :host {
      position: absolute;
      inset: 0;
      z-index: 300;
      display: block;
    }
    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(10, 16, 13, 0.5);
      animation: fade 0.2s;
    }
    .sheet {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      max-height: 90%;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 10px 20px 26px;
      border-radius: 32px 32px 0 0;
      background: var(--slm-bg-main);
      color: var(--slm-text-primary);
      box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.22);
      animation: up 0.25s ease-out;
    }
    .grab {
      width: 40px;
      height: 5px;
      border-radius: 99px;
      margin: 0 auto 8px;
      background: var(--slm-border-subtle);
    }
    .sheet-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 0 4px 6px;
    }
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .done {
      min-height: 44px;
      padding: 0 20px;
      border: none;
      border-radius: 999px;
      background: var(--slm-accent-primary);
      color: var(--slm-accent-ink, #fff);
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
    }
    .label {
      padding: 12px 4px 6px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--slm-text-secondary);
    }
    .seg {
      display: flex;
      gap: 4px;
      padding: 4px;
      border-radius: 16px;
      background: var(--slm-bg-elevated);
    }
    .seg button {
      flex: 1;
      min-height: 44px;
      border: none;
      border-radius: 12px;
      background: transparent;
      color: var(--slm-text-secondary);
      font-weight: 600;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
    }
    .seg button[aria-pressed="true"] {
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      font-weight: 700;
      box-shadow: var(--slm-shadow-soft);
    }
    ha-icon {
      --mdc-icon-size: 20px;
      color: inherit;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      min-height: 44px;
      padding: 0 16px;
      border-radius: 999px;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
      color: var(--slm-text-primary);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }
    .chip.on {
      background: var(--slm-text-primary);
      border-color: var(--slm-text-primary);
      color: var(--slm-bg-main);
      font-weight: 700;
    }
    .card {
      margin-top: 12px;
      padding: 2px 14px;
      border-radius: 22px;
      border: 1px solid var(--slm-border-subtle);
      background: var(--slm-bg-surface);
    }
    .row, .action {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-height: 52px;
      padding: 6px 0;
      box-sizing: border-box;
      border: none;
      background: transparent;
      color: var(--slm-text-primary);
      text-align: left;
      font-size: 15px;
      font-weight: 700;
      border-bottom: 1px solid var(--slm-line-soft, var(--slm-border-subtle));
    }
    .row:last-child, .action:last-child {
      border-bottom: none;
    }
    .action {
      cursor: pointer;
    }
    .action[disabled] {
      opacity: 0.45;
      cursor: default;
    }
    .action ha-icon:first-child {
      color: var(--slm-text-secondary);
    }
    .action span {
      flex: 1;
    }
    .chev {
      color: var(--slm-text-secondary);
    }
    .row-label {
      flex: 1;
    }
    .tg {
      position: relative;
      flex: none;
      width: 48px;
      height: 28px;
      border: none;
      border-radius: 99px;
      background: var(--slm-border-subtle);
      cursor: pointer;
      transition: background 0.2s;
    }
    .tg::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s;
    }
    .tg[aria-checked="true"] {
      background: var(--slm-accent-primary);
    }
    .tg[aria-checked="true"]::after {
      transform: translateX(20px);
    }
    @keyframes up {
      from { transform: translateY(24px); opacity: 0; }
      to { transform: none; opacity: 1; }
    }
    @keyframes fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation: none !important; transition: none !important; }
    }
  `, fontInherit];
}

customElements.define('slm-options-sheet', SLMOptionsSheet);
