// Swipe a popup down to close it. One controller per component that shows popups; it watches
// every bottom sheet (.sheet) and centred dialog (.dialog) inside that component.
//
//   class MyView extends LitElement { _swipe = new SheetSwipe(this); }
//
// A drag that starts on the grab handle or the popup's header always works. A drag that starts in
// the body works when the body is scrolled to the top and the finger is not on a text field.
// Letting go past a short distance (or with a quick flick) closes the popup by clicking its scrim,
// which is the same thing a tap outside it does, so no component needs extra code.

const POPUP = '.sheet, .dialog, .popup';
const ZONE = '.grab, .sheet-head, .dialog-header, .popup-header';
const SKIP = 'input, textarea, select, [contenteditable="true"], .no-swipe';
const CLOSE_DISTANCE = 110;   // px dragged to close
const FLICK_SPEED = 0.5;      // px per ms
const FLICK_MIN = 40;         // px, a flick must go at least this far

export class SheetSwipe {
  constructor(host) {
    this.host = host;
    this._drag = null;
    host.addController(this);
  }

  hostConnected() {
    const root = this.host.renderRoot;
    this._root = root;
    root.addEventListener('touchstart', this._touchStart, { passive: true });
    root.addEventListener('touchmove', this._touchMove, { passive: false });
    root.addEventListener('touchend', this._end, { passive: true });
    root.addEventListener('touchcancel', this._cancel, { passive: true });
    root.addEventListener('pointerdown', this._pointerDown);
  }

  hostDisconnected() {
    const root = this._root;
    if (!root) return;
    root.removeEventListener('touchstart', this._touchStart);
    root.removeEventListener('touchmove', this._touchMove);
    root.removeEventListener('touchend', this._end);
    root.removeEventListener('touchcancel', this._cancel);
    root.removeEventListener('pointerdown', this._pointerDown);
    this._removeWindowListeners();
  }

  // -- Starting ---------------------------------------------------------------

  // Which popup was touched, and may a drag start here?
  _target(event) {
    const path = event.composedPath();
    const end = path.indexOf(this._root);
    const inside = end === -1 ? path : path.slice(0, end);
    const sheet = inside.find(el => el.matches && el.matches(POPUP));
    if (!sheet) return null;
    const upToSheet = inside.slice(0, inside.indexOf(sheet) + 1);
    if (upToSheet.some(el => el.matches && el.matches(SKIP))) return null;
    const inZone = upToSheet.some(el => el.matches && el.matches(ZONE));
    const scrolled = upToSheet.some(el => (el.scrollTop || 0) > 0);
    if (!inZone && scrolled) return null;
    return { sheet, inZone };
  }

  _begin(y, x, sheet, mouse) {
    this._drag = { sheet, startY: y, startX: x, dy: 0, t0: performance.now(), active: false, mouse, dead: false, ready: true };
  }

  _touchStart = (e) => {
    if (e.touches.length !== 1) { this._drag = null; return; }
    const hit = this._target(e);
    if (!hit) { this._drag = null; return; }
    this._begin(e.touches[0].clientY, e.touches[0].clientX, hit.sheet, false);
  };

  _pointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const hit = this._target(e);
    // With a mouse only the handle and header drag, so selecting text in the body still works
    if (!hit || !hit.inZone) return;
    this._begin(e.clientY, e.clientX, hit.sheet, true);
    window.addEventListener('pointermove', this._pointerMove);
    window.addEventListener('pointerup', this._end);
    window.addEventListener('pointercancel', this._cancel);
  };

  _removeWindowListeners() {
    window.removeEventListener('pointermove', this._pointerMove);
    window.removeEventListener('pointerup', this._end);
    window.removeEventListener('pointercancel', this._cancel);
  }

  // -- Moving -----------------------------------------------------------------

  _touchMove = (e) => {
    const d = this._drag;
    if (!d || d.dead || e.touches.length !== 1) return;
    const dy = e.touches[0].clientY - d.startY;
    const dx = e.touches[0].clientX - d.startX;
    // Mostly sideways, or upwards: this is not a close gesture
    if (!d.active && (Math.abs(dx) > Math.abs(dy) + 4 || dy < -4)) { d.dead = true; return; }
    if (dy > 0 && e.cancelable) e.preventDefault(); // stops the page pulling down to refresh
    this._move(dy);
  };

  _pointerMove = (e) => {
    const d = this._drag;
    if (!d || d.dead) return;
    this._move(e.clientY - d.startY);
  };

  _move(dy) {
    const d = this._drag;
    d.dy = Math.max(0, dy);
    if (!d.active && d.dy > 6) {
      d.active = true;
      d.sheet.style.transition = 'none';
      d.sheet.style.willChange = 'transform';
      d.scrim = this._scrimFor(d.sheet);
    }
    if (!d.active) return;
    d.sheet.style.transform = `translateY(${d.dy}px)`;
    if (d.scrim && d.scrim.classList.contains('scrim')) {
      const h = d.sheet.offsetHeight || 400;
      d.scrim.style.opacity = String(Math.max(0, 1 - d.dy / h));
    }
  }

  // -- Finishing --------------------------------------------------------------

  _scrimFor(sheet) {
    // The scrim is the sheet's sibling. parentNode (not parentElement) because a sheet can sit
    // directly in a shadow root.
    const parent = sheet.parentNode;
    const sibling = parent && Array.from(parent.children || []).find(c => c.classList && c.classList.contains('scrim'));
    return sibling || sheet.closest('.overlay');
  }

  _end = () => {
    const d = this._drag;
    this._drag = null;
    if (d && d.mouse) this._removeWindowListeners();
    if (!d || !d.active) return;
    const elapsed = Math.max(1, performance.now() - d.t0);
    const speed = d.dy / elapsed;
    const close = d.dy > CLOSE_DISTANCE || (speed > FLICK_SPEED && d.dy > FLICK_MIN);
    if (close) this._dismiss(d); else this._snapBack(d);
  };

  _cancel = () => {
    const d = this._drag;
    this._drag = null;
    this._removeWindowListeners();
    if (d && d.active) this._snapBack(d);
  };

  _snapBack(d) {
    d.sheet.style.transition = 'transform 0.2s ease-out';
    d.sheet.style.transform = '';
    if (d.scrim) { d.scrim.style.transition = 'opacity 0.2s'; d.scrim.style.opacity = ''; }
    setTimeout(() => { d.sheet.style.transition = ''; d.sheet.style.willChange = ''; if (d.scrim) d.scrim.style.transition = ''; }, 220);
  }

  _dismiss(d) {
    const { sheet, scrim } = d;
    sheet.style.transition = 'transform 0.18s ease-in';
    sheet.style.transform = 'translateY(110%)';
    if (scrim && scrim.classList.contains('scrim')) { scrim.style.transition = 'opacity 0.18s'; scrim.style.opacity = '0'; }
    setTimeout(() => {
      if (scrim) scrim.click();
      // If the popup is still there (the close was refused), bring it back
      setTimeout(() => {
        if (sheet.isConnected) {
          sheet.style.transition = ''; sheet.style.transform = ''; sheet.style.willChange = '';
          if (scrim) { scrim.style.transition = ''; scrim.style.opacity = ''; }
        }
      }, 60);
    }, 180);
  }
}
