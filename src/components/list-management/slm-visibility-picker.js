import { LitElement, html, css } from 'lit';
import { fontInherit } from '../../styles/ui-styles.js';
import { t, I18nController } from '../../services/translator.js';

/**
 * "Who can see it": choose a household, only me, or (for admins) everyone.
 * Used when making a new list or loyalty card once groups exist.
 *
 * value: 'private' | 'everyone' | 'group:<id>'
 */
export function visibilityToApi(value) {
  if (value && value.startsWith('group:')) return { isPrivate: true, groupId: value.slice(6) };
  if (value === 'everyone') return { isPrivate: false, groupId: null };
  return { isPrivate: true, groupId: null };
}

/** The best starting choice: the user's first household, else only them. */
export function defaultVisibility(groups, myGroupIds) {
  const mine = (groups || []).find(g => (myGroupIds || []).includes(g.id));
  return mine ? `group:${mine.id}` : 'private';
}

class SLMVisibilityPicker extends LitElement {
  _i18n = new I18nController(this);
  static properties = {
    groups: { type: Array },
    myGroupIds: { type: Array },
    isAdmin: { type: Boolean },
    value: { type: String },
  };

  constructor() {
    super();
    this.groups = [];
    this.myGroupIds = [];
    this.isAdmin = false;
    this.value = 'private';
  }

  _choose(value) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('visibility-change', { detail: { value }, bubbles: true, composed: true }));
  }

  _options() {
    const mine = (this.groups || []).filter(g => (this.myGroupIds || []).includes(g.id));
    const opts = mine.map(g => ({
      value: `group:${g.id}`, icon: 'mdi:account-group', title: g.name,
      sub: t('Everyone in this household'),
    }));
    opts.push({ value: 'private', icon: 'mdi:lock-outline', title: t('Only me'), sub: t('Only visible to me (and members I add)') });
    // Everyone on this Home Assistant is the old behaviour. With households it is an admin choice.
    if (this.isAdmin) {
      opts.push({ value: 'everyone', icon: 'mdi:earth', title: t('Everyone'), sub: t('Every household on this Home Assistant') });
    }
    return opts;
  }

  render() {
    return html`
      <div class="label" id="who">${t('Who can see it')}</div>
      <div class="opts" role="radiogroup" aria-labelledby="who">
        ${this._options().map(o => html`
          <button type="button" class="opt ${this.value === o.value ? 'on' : ''}" role="radio"
                  aria-checked=${this.value === o.value ? 'true' : 'false'}
                  @click=${() => this._choose(o.value)}>
            <ha-icon icon=${o.icon}></ha-icon>
            <span class="txt"><span class="ttl">${o.title}</span><span class="sub">${o.sub}</span></span>
            <span class="dot"></span>
          </button>
        `)}
      </div>
    `;
  }

  static styles = [css`
    :host { display: block; margin-top: 14px; }
    .label {
      font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
      color: var(--slm-text-secondary, var(--secondary-text-color)); margin-bottom: 8px;
    }
    .opts { display: flex; flex-direction: column; gap: 8px; }
    .opt {
      display: flex; align-items: center; gap: 12px; width: 100%; box-sizing: border-box;
      padding: 12px 14px; text-align: left; cursor: pointer; min-height: 56px;
      border: 1.5px solid var(--slm-border-subtle, var(--divider-color));
      background: var(--slm-bg-surface, var(--card-background-color));
      color: var(--slm-text-primary, var(--primary-text-color));
      border-radius: var(--slm-radius-sm, 14px);
      -webkit-tap-highlight-color: transparent;
    }
    .opt.on { border-color: var(--slm-accent-primary, var(--primary-color)); background: var(--slm-accent-soft, transparent); }
    .opt:focus-visible { outline: 2px solid var(--slm-accent-primary, var(--primary-color)); outline-offset: 2px; }
    ha-icon { --mdc-icon-size: 22px; color: var(--slm-accent-text, var(--slm-text-secondary)); flex-shrink: 0; }
    .txt { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
    .ttl { font-weight: 700; font-size: 15px; }
    .sub { font-size: 12.5px; color: var(--slm-text-secondary, var(--secondary-text-color)); }
    .dot {
      width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; box-sizing: border-box;
      border: 2px solid var(--slm-border-subtle, var(--divider-color));
    }
    .opt.on .dot { border: 6px solid var(--slm-accent-primary, var(--primary-color)); }
  `, fontInherit];
}

customElements.define('slm-visibility-picker', SLMVisibilityPicker);
