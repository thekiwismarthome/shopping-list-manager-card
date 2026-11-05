import { css } from 'lit';

/**
 * Shared styles for the "Fresh" and "Compact" interface styles on the settings pages.
 *
 * Requirements on the component that uses these:
 *   - it reflects its `uiStyle` property as the `ui-style` attribute on :host
 *   - settings rows are `.settings-item` elements, wrapped in `.group` elements
 *   - section titles are `.section-header` elements placed above each `.group`
 *
 * In the "classic" style `.group` is `display: contents`, so the markup looks exactly as before.
 */
export const settingsGroupStyles = css`
  .group {
    display: contents;
  }
  .settings-item {
    box-sizing: border-box;
  }

  /* ---------- shared by Fresh + Compact ---------- */
  :host([ui-style="fresh"]) .group,
  :host([ui-style="compact"]) .group {
    display: block;
    background: var(--slm-bg-surface);
    overflow: hidden;
  }
  :host([ui-style="fresh"]) .settings-list,
  :host([ui-style="compact"]) .settings-list {
    padding: 0 16px 24px;
  }
  :host([ui-style="fresh"]) .section-header,
  :host([ui-style="compact"]) .section-header {
    padding: 18px 4px 8px;
    font-size: 12px;
    letter-spacing: 0.06em;
    opacity: 1;
    color: var(--slm-text-secondary);
  }
  :host([ui-style="fresh"]) .group .settings-item:last-child,
  :host([ui-style="compact"]) .group .settings-item:last-child {
    border-bottom: none;
  }
  :host([ui-style="fresh"]) .item-icon,
  :host([ui-style="compact"]) .item-icon {
    --mdc-icon-size: 20px;
    color: var(--ic, var(--slm-accent-primary));
  }
  :host([ui-style="fresh"]) .item-icon ha-icon,
  :host([ui-style="compact"]) .item-icon ha-icon {
    color: inherit;
    --icon-primary-color: currentColor;
  }
  :host([ui-style="fresh"]) .chevron,
  :host([ui-style="compact"]) .chevron {
    display: flex;
    opacity: 0.55;
    color: var(--slm-text-secondary);
  }

  /* ---------- Fresh: soft rounded cards ---------- */
  :host([ui-style="fresh"]) .group {
    border: 1px solid var(--slm-border-subtle);
    border-radius: 22px;
    padding: 2px 14px;
  }
  :host([ui-style="fresh"]) .group .settings-item {
    padding: 12px 0;
    min-height: 60px;
  }
  :host([ui-style="fresh"]) .item-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--ic, var(--slm-accent-primary)) 18%, var(--slm-bg-surface));
  }

  /* ---------- Compact: inset list, solid icon squares ---------- */
  :host([ui-style="compact"]) .group {
    border-radius: 18px;
    padding: 0;
  }
  :host([ui-style="compact"]) .group .settings-item {
    padding: 8px 14px;
    min-height: 56px;
  }
  :host([ui-style="compact"]) .item-icon {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: var(--ic, var(--slm-accent-primary));
    color: var(--slm-bg-main);
  }
  :host([ui-style="compact"]) .item-icon ha-icon {
    --mdc-icon-size: 18px;
  }

  /* ---------- sub-page header (back button + title) ---------- */
  :host([ui-style="fresh"]) .header,
  :host([ui-style="compact"]) .header {
    border-bottom: none;
    padding: 16px 16px 8px;
  }
  :host([ui-style="fresh"]) .header .back-btn,
  :host([ui-style="compact"]) .header .back-btn {
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    border: 1px solid var(--slm-border-subtle);
    background: var(--slm-bg-surface);
    border-radius: 50%;
  }
  :host([ui-style="compact"]) .header .back-btn {
    border-radius: 12px;
  }
  :host([ui-style="fresh"]) .header h2 {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* inputs inside grouped cards */
  :host([ui-style="fresh"]) .tile-option,
  :host([ui-style="compact"]) .tile-option {
    border-width: 1px;
    border-radius: 12px;
    min-height: 44px;
  }
  :host([ui-style="fresh"]) .text-input,
  :host([ui-style="compact"]) .text-input {
    border-radius: 12px;
    min-height: 44px;
  }
`;

/**
 * Settings sub-pages (notifications, region, HA sync, ...) that are not grouped into
 * `.group` cards: restyle the header and put the whole `.settings-list` in one card.
 */
export const subPageStyles = css`
  :host([ui-style]:not([ui-style="classic"])) .header {
    border-bottom: none;
    padding: 16px 16px 8px;
  }
  :host([ui-style]:not([ui-style="classic"])) .header .back-btn {
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    border: 1px solid var(--slm-border-subtle);
    background: var(--slm-bg-surface);
    border-radius: 50%;
  }
  :host([ui-style="compact"]) .header .back-btn {
    border-radius: 12px;
  }
  :host([ui-style="fresh"]) .header h2 {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  :host([ui-style]:not([ui-style="classic"])) .settings-list {
    margin: 0 16px 24px;
    background: var(--slm-bg-surface);
    border: 1px solid var(--slm-border-subtle);
    border-radius: 22px;
    overflow: hidden;
  }
  :host([ui-style="compact"]) .settings-list {
    border-radius: 18px;
    border-color: transparent;
  }
  :host([ui-style]:not([ui-style="classic"])) .settings-list .settings-item:last-child {
    border-bottom: none;
  }
  :host([ui-style]:not([ui-style="classic"])) .settings-list .section-header {
    background: transparent;
  }
`;

/**
 * Header + page padding for the Lists and Loyalty views.
 * Needs `.header`, `h2`, and a root element with class `.lists-view` or `.loyalty-view`.
 */
export const viewHeaderStyles = css`
  :host([ui-style="fresh"]) .lists-view,
  :host([ui-style="fresh"]) .loyalty-view {
    padding: 8px 16px 130px;
  }
  :host([ui-style="compact"]) .lists-view,
  :host([ui-style="compact"]) .loyalty-view {
    padding: 8px 16px 24px;
  }
  :host([ui-style="fresh"]) .header,
  :host([ui-style="compact"]) .header {
    padding: 14px 0 0;
    margin-bottom: 16px;
  }
  :host([ui-style="fresh"]) .header h2,
  :host([ui-style="compact"]) .header h2 {
    color: var(--slm-text-primary);
  }
  :host([ui-style="fresh"]) .create-btn,
  :host([ui-style="fresh"]) .primary-btn,
  :host([ui-style="compact"]) .create-btn,
  :host([ui-style="compact"]) .primary-btn,
  :host([ui-style="fresh"]) .add-btn,
  :host([ui-style="compact"]) .add-btn {
    color: var(--slm-accent-ink, #fff);
  }
  :host([ui-style="fresh"]) .header h2 {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  :host([ui-style="compact"]) .header h2 {
    font-size: 28px;
    letter-spacing: -0.02em;
  }
  :host([ui-style="fresh"]) .create-btn,
  :host([ui-style="fresh"]) .primary-btn {
    border-radius: 999px;
    min-height: 44px;
    padding: 0 18px;
    box-shadow: none;
    background: var(--slm-accent-primary);
  }
  :host([ui-style="compact"]) .create-btn,
  :host([ui-style="compact"]) .primary-btn {
    border-radius: 12px;
    min-height: 44px;
    padding: 0 16px;
    box-shadow: none;
    background: var(--slm-accent-primary);
  }
  :host([ui-style="fresh"]) .add-btn,
  :host([ui-style="compact"]) .add-btn {
    width: 44px;
    height: 44px;
    box-shadow: none;
    background: var(--slm-accent-primary);
  }
  :host([ui-style="compact"]) .add-btn {
    border-radius: 12px;
  }
  :host([ui-style="fresh"]) .icon-btn,
  :host([ui-style="compact"]) .icon-btn {
    width: 44px;
    height: 44px;
    background: var(--slm-bg-surface);
    border: 1px solid var(--slm-border-subtle);
  }
  :host([ui-style="compact"]) .icon-btn {
    border-radius: 12px;
  }
`;

/**
 * Bottom sheet (same look as the list options sheet). Markup:
 *   <div class="sheet-layer"><div class="scrim"></div>
 *     <div class="sheet" role="dialog"><div class="grab"></div>
 *       <div class="sheet-head"><h2>Title</h2><button class="done">Done</button></div> ... </div></div>
 * The layer covers the card (it is positioned against the card container, not the screen).
 */
export const bottomSheetStyles = css`
  .sheet-layer {
    position: absolute;
    inset: 0;
    z-index: 300;
  }
  .sheet-layer .scrim {
    position: absolute;
    inset: 0;
    background: rgba(10, 16, 13, 0.5);
    animation: slm-fade 0.2s;
  }
  .sheet-layer .sheet {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 90%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px 20px 28px;
    border-radius: 32px 32px 0 0;
    background: var(--slm-bg-main);
    color: var(--slm-text-primary);
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.22);
    animation: slm-up 0.25s ease-out;
  }
  .sheet-layer .grab {
    width: 40px;
    height: 5px;
    border-radius: 99px;
    margin: 0 auto 8px;
    background: var(--slm-border-subtle);
  }
  .sheet-layer .sheet-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 4px 6px;
  }
  .sheet-layer .sheet-head h2 {
    margin: 0;
    min-width: 0;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--slm-text-primary);
  }
  .sheet-layer .done {
    flex: none;
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
  .sheet-layer .done:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .sheet-layer .done.ghost {
    background: var(--slm-bg-surface);
    color: var(--slm-text-primary);
    border: 1px solid var(--slm-border-subtle);
  }
  .sheet-layer .label {
    padding: 12px 4px 6px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--slm-text-secondary);
  }
  .sheet-layer .field {
    width: 100%;
    min-height: 48px;
    box-sizing: border-box;
    padding: 0 14px;
    border-radius: 14px;
    border: 1px solid var(--slm-border-subtle);
    background: var(--slm-bg-surface);
    color: var(--slm-text-primary);
    font: inherit;
    font-size: 15px;
  }
  .sheet-layer .field::placeholder {
    color: var(--slm-text-secondary);
  }
  .sheet-layer .field:focus {
    outline: 2px solid var(--slm-accent-primary);
    outline-offset: -1px;
  }
  .sheet-layer .choices {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .sheet-layer .choice {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    border: 2px solid var(--slm-border-subtle);
    background: var(--slm-bg-surface);
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .sheet-layer .choice.selected {
    border-color: var(--slm-accent-primary);
    background: var(--slm-accent-soft, var(--slm-bg-elevated));
  }
  .sheet-layer .card-block {
    margin-top: 12px;
    padding: 2px 14px;
    border-radius: 22px;
    border: 1px solid var(--slm-border-subtle);
    background: var(--slm-bg-surface);
  }
  .sheet-layer .toggle-row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 56px;
    padding: 6px 0;
    border: none;
    background: transparent;
    color: var(--slm-text-primary);
    text-align: left;
    font: inherit;
    cursor: pointer;
  }
  .sheet-layer .toggle-row .tr-text {
    flex: 1;
    min-width: 0;
  }
  .sheet-layer .toggle-row .tr-title {
    display: block;
    font-size: 15px;
    font-weight: 700;
  }
  .sheet-layer .toggle-row .tr-sub {
    display: block;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--slm-text-secondary);
  }
  .sheet-layer .tg {
    position: relative;
    flex: none;
    width: 48px;
    height: 28px;
    border-radius: 99px;
    background: var(--slm-border-subtle);
    transition: background 0.2s;
  }
  .sheet-layer .tg::after {
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
  .sheet-layer .tg.on {
    background: var(--slm-accent-primary);
  }
  .sheet-layer .tg.on::after {
    transform: translateX(20px);
  }
  @keyframes slm-up {
    from { transform: translateY(24px); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
  @keyframes slm-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sheet-layer .scrim, .sheet-layer .sheet { animation: none; }
  }
`;

/** Buttons and inputs do not inherit the font by default; this makes them follow the card font. */
export const fontInherit = css`
  button, input, select, textarea {
    font-family: inherit;
  }
`;
