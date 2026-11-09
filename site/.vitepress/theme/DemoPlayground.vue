<script setup>
import { ref, reactive, watch } from 'vue';
import PhoneFrame from './PhoneFrame.vue';

const state = reactive({ ui: 'fresh', theme: 'meadow', mode: 'light', wide: false });
const phone = ref(null);
const stageDark = ref(false);

const THEMES = [
  { id: 'meadow', name: 'Meadow', swatch: '#0F7B5A' },
  { id: 'slate', name: 'Slate', swatch: '#3B4BA8' },
  { id: 'sunset', name: 'Sunset', swatch: '#B8481F' },
];

function send(extra = {}) {
  const w = phone.value?.frame?.contentWindow;
  if (w) w.postMessage({ slmDemo: true, ui: state.ui, theme: state.theme, mode: state.mode, ...extra }, '*');
}
// Changing a control updates the running card without reloading it
watch(() => [state.ui, state.theme, state.mode], () => { stageDark.value = state.mode === 'dark'; send(); });
function reset() { send({ reset: true }); }
</script>

<template>
  <div class="playground">
    <div class="controls" role="group" aria-label="Demo controls">
      <h3>Appearance</h3>
      <div class="field">
        <span id="lbl-ui">Interface style</span>
        <div class="seg" role="group" aria-labelledby="lbl-ui">
          <button v-for="u in ['fresh', 'compact']" :key="u" :aria-pressed="state.ui === u" @click="state.ui = u">{{ u === 'fresh' ? 'Fresh' : 'Compact' }}</button>
        </div>
      </div>
      <div class="field">
        <span id="lbl-theme">Theme</span>
        <div class="themes" role="group" aria-labelledby="lbl-theme">
          <button v-for="t in THEMES" :key="t.id" :aria-pressed="state.theme === t.id" @click="state.theme = t.id">
            <i :style="{ background: t.swatch }" />{{ t.name }}
          </button>
        </div>
      </div>
      <div class="field">
        <span id="lbl-mode">Colour mode</span>
        <div class="seg" role="group" aria-labelledby="lbl-mode">
          <button v-for="m in ['light', 'dark']" :key="m" :aria-pressed="state.mode === m" @click="state.mode = m">{{ m === 'light' ? 'Light' : 'Dark' }}</button>
        </div>
      </div>
      <div class="field">
        <span id="lbl-size">Screen</span>
        <div class="seg" role="group" aria-labelledby="lbl-size">
          <button :aria-pressed="!state.wide" @click="state.wide = false">Phone</button>
          <button :aria-pressed="state.wide" @click="state.wide = true">Tablet</button>
        </div>
      </div>
      <button class="reset" @click="reset">Reset sample data</button>
    </div>

    <div class="stage" :class="{ dark: stageDark }">
      <PhoneFrame ref="phone" :ui="state.ui" :theme="state.theme" :mode="state.mode" :wide="state.wide" />
    </div>

    <div class="try">
      <h3>Things to try</h3>
      <ul>
        <li>Tap an item to tick it off, or use the + and − buttons.</li>
        <li>Open the filter chips (swipe them sideways) and pick a category.</li>
        <li>Press + to add an item. Search for "yoghurt" and see the catalogue.</li>
        <li>Open <b>Lists</b> and make a new list from the bottom sheet.</li>
        <li>Open <b>Loyalty</b> and tap a card to show its barcode.</li>
        <li>Open the list options and try <b>Tiles per row</b>. Swipe any popup down to close it.</li>
        <li>Open <b>Settings → Supermarkets</b> to add a shop with an address, or add a picture to a loyalty card.</li>
        <li>Open <b>Settings → Groups</b> to see two households, then share a list with the other one from <b>Lists → Manage members</b>.</li>
        <li>Open <b>Settings</b> to see every page, including Backup &amp; Restore under Support.</li>
      </ul>
      <p class="note">This is the real card running on sample data in your browser. Nothing is saved, and it resets when you reload.</p>
    </div>
  </div>
</template>

<style scoped>
.playground { display: grid; grid-template-columns: 250px minmax(0, 1fr) 270px; gap: 28px; align-items: start; }
.controls, .try { background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 18px; min-width: 0; }
h3 { margin: 0; font: 600 12px var(--vp-font-family-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--vp-c-text-2); border: 0; padding: 0; }
.field { display: flex; flex-direction: column; gap: 8px; }
.field > span { font-weight: 600; font-size: 14px; }
.seg { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; background: var(--vp-c-default-soft); padding: 3px; border-radius: 11px; gap: 3px; }
.seg button { border: 0; background: transparent; padding: 8px 6px; border-radius: 8px; font: 600 14px var(--vp-font-family-base); color: var(--vp-c-text-2); cursor: pointer; }
.seg button[aria-pressed="true"] { background: var(--vp-c-bg); color: var(--vp-c-text-1); box-shadow: 0 1px 3px rgba(0,0,0,.18); }
.themes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.themes button { border: 2px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); padding: 7px; cursor: pointer; font: 600 12px var(--vp-font-family-base); color: var(--vp-c-text-1); display: flex; flex-direction: column; gap: 6px; }
.themes button[aria-pressed="true"] { border-color: var(--vp-c-brand-1); }
.themes i { height: 24px; border-radius: 7px; display: block; }
.reset { border: 1.5px solid var(--vp-c-divider); background: var(--vp-c-bg); border-radius: 999px; padding: 9px 14px; font: 600 14px var(--vp-font-family-base); color: var(--vp-c-text-1); cursor: pointer; }
.reset:hover { border-color: var(--vp-c-brand-1); }
button:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 2px; }
.stage { display: flex; justify-content: center; padding: 30px 14px; border-radius: 32px; background: var(--vp-c-brand-soft); transition: background .3s; min-width: 0; }
.stage.dark { background: #171A20; }
.try ul { margin: 0; padding-left: 18px; list-style: disc; display: flex; flex-direction: column; gap: 8px; font-size: 14.5px; }
.note { font-size: 13px; color: var(--vp-c-text-2); background: var(--vp-c-default-soft); border-radius: 12px; padding: 12px 14px; margin: 0; }
@media (max-width: 1100px) { .playground { grid-template-columns: minmax(0, 1fr); } .stage { order: -1; } }
</style>
