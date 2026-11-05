// Pure helpers for syncing a user's card settings across devices.
// The server keeps one settings blob per HA user (last write wins). Only
// "portable" preferences are synced; settings that depend on the device
// (screen size, hardware, this app's own sync switch) always stay local.

export const DEVICE_ONLY_KEYS = [
  'tilesPerRow',        // depends on screen size / embedded vs standalone
  'fontSize',           // depends on screen size
  'useSystemTextSize',  // depends on the device's text size
  'keepScreenOn',       // depends on the device (tablet on a wall vs phone)
  'syncAcrossDevices',  // this device's own on/off switch
];

// Settings that may be synced: everything except the device-only keys.
export function pickSyncable(settings) {
  const out = {};
  for (const [key, value] of Object.entries(settings || {})) {
    if (!DEVICE_ONLY_KEYS.includes(key)) out[key] = value;
  }
  return out;
}

// Apply remote settings onto local ones. Device-only keys in the remote blob
// (e.g. from an older card version) are ignored so they can never override
// this device's own values.
export function mergeRemote(local, remote) {
  return { ...local, ...pickSyncable(remote) };
}

// Decide what to do after fetching the server copy.
//   meta   = { syncedAt: string|null, dirty: boolean }   (kept per user on this device)
//   remote = { settings: object|null, updated_at: string|null }
// Returns 'push' (send local to server), 'apply' (adopt server copy) or 'none'.
export function decideSync(meta, remote) {
  if (!remote || !remote.settings) return 'push';   // nothing on the server yet: seed it
  if (meta && meta.dirty) return 'push';            // unsent local edits win
  if (remote.updated_at && remote.updated_at !== (meta && meta.syncedAt)) return 'apply';
  return 'none';
}
