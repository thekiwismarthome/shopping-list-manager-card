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

/** Helper: the interface style to use ('classic' | 'fresh' | 'compact'). */
export function normaliseUiStyle(value) {
  return value === 'fresh' || value === 'compact' ? value : 'classic';
}
