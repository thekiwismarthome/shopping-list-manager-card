// A small in-memory stand-in for the Shopping List Manager integration.
// It answers the same websocket commands, so the real card runs unchanged.
// Everything lives in this page; nothing is saved or sent anywhere.
(function () {
  var NS = 'shopping_list_manager/';
  var uid = 0;
  var newId = function (p) { uid += 1; return p + '_' + Date.now().toString(36) + uid; };
  var now = function () { return new Date().toISOString(); };

  function createBackend(data, opts) {
    var listeners = [];
    var currency = data.catalog.currency || 'NZD';
    var products = data.catalog.products.map(function (p) {
      return Object.assign({ aliases: [], default_unit: 'units', default_quantity: 1, brands: [], user_frequency: 0, custom: false }, p);
    });
    var byId = {}; products.forEach(function (p) { byId[p.id] = p; });
    var categories = data.categories.categories;

    var state;
    function seed() {
      var P = function (id) { return byId[id]; };
      state = { lists: [], items: {}, cards: [], settings: null, groups: [], stores: [] };
      var weekly = mkList('Weekly shop', 'mdi:cart', true);
      var bbq = mkList('BBQ Saturday', 'mdi:grill', false);
      var work = mkList('Hardware run', 'mdi:hammer-wrench', false);
      state.lists = [weekly, bbq, work];
      state.items[weekly.id] = []; state.items[bbq.id] = []; state.items[work.id] = [];
      [['bananas', 1], ['avocados', 3], ['spinach', 1], ['milk - whole', 2], ['yogurt - greek', 1], ['bread - vogels', 1], ['pasta - penne', 2], ['eggs - free', 1], ['chicken thighs', 1], ['cheese - tasty', 1]].forEach(function (pair, i) {
        var p = find(pair[0]); if (p) addItem(weekly.id, { name: p.name, quantity: pair[1], product_id: p.id, category_id: p.category_id, unit: p.default_unit, price: p.price }, i === 5 || i === 7);
      });
      [['sausages', 2], ['bread rolls', 1], ['lemonade', 2], ['onions - red', 1]].forEach(function (pair) {
        var p = find(pair[0]); if (p) addItem(bbq.id, { name: p.name, quantity: pair[1], product_id: p.id, category_id: p.category_id, unit: p.default_unit, price: p.price });
      });
      state.cards = [
        card('Countdown Onecard', '9400000481926', '#0F7B5A'),
        card('Flybuys', '6008940012345678', '#3B4BA8'),
        card('Mitre 10 Trade', '2210304455', '#B8481F')
      ];
      state.stores = [
        { id: 'sm-1', name: "PAK'nSAVE Albany", chain_id: 'pak-nsave', address: '219 Don McKinnon Drive, Albany, Auckland', latitude: -36.7279, longitude: 174.7035, created_at: now(), updated_at: now(), owner_id: opts.user.id, group_id: 'g-home', allowed_users: [], allowed_groups: [] },
        { id: 'sm-2', name: 'New World Milford', chain_id: 'new-world', address: 'Milford Road, Milford, Auckland', latitude: null, longitude: null, created_at: now(), updated_at: now(), owner_id: opts.user.id, group_id: 'g-home', allowed_users: [], allowed_groups: [] }
      ];
      // Two households on one Home Assistant. Everything starts in "Our house".
      state.groups = [
        { id: 'g-home', name: 'Our house', members: [opts.user.id, 'u2'] },
        { id: 'g-mum', name: 'Mum\u2019s house', members: ['u3'] }
      ];
      state.lists.forEach(function (l) { l.owner_id = opts.user.id; l.group_id = 'g-home'; });
      state.cards.forEach(function (c) { c.owner_id = opts.user.id; c.group_id = 'g-home'; });
    }
    function card(name, number, color) {
      return { id: newId('card'), name: name, number: number, barcode: number, barcode_type: 'barcode', logo: '', notes: '', color: color, created_at: now(), updated_at: now(), owner_id: null, group_id: null, allowed_users: [], allowed_groups: [] };
    }
    function find(q) {
      q = q.toLowerCase();
      return products.filter(function (p) { return p.name.toLowerCase().indexOf(q) > -1 || (p.aliases || []).some(function (a) { return a.toLowerCase().indexOf(q) > -1; }); })[0];
    }
    function mkList(name, icon, active) {
      return { id: newId('list'), name: name, icon: icon, created_at: now(), updated_at: now(), item_order: [], category_order: [], active: !!active, owner_id: null, group_id: null, allowed_users: [], allowed_groups: [], ha_todo_entity_id: null };
    }
    function mkItem(listId, d) {
      var it = { id: newId('item'), list_id: listId, name: d.name, category_id: d.category_id || 'other', product_id: d.product_id || null,
        quantity: d.quantity != null ? d.quantity : 1, unit: d.unit || 'units', note: d.note || null, checked: false, checked_at: null,
        created_at: now(), updated_at: now(), image_url: d.image_url || null, order_index: 0, price: d.price != null ? d.price : null, estimated_total: null, barcode: d.barcode || null };
      if (it.price != null) it.estimated_total = it.quantity * it.price;
      return it;
    }
    function addItem(listId, d, checked) {
      var it = mkItem(listId, d); if (checked) { it.checked = true; it.checked_at = now(); }
      state.items[listId].push(it); return it;
    }
    function findItem(id) {
      for (var l in state.items) { var it = state.items[l].filter(function (i) { return i.id === id; })[0]; if (it) return it; }
      return null;
    }
    function emit(event_type, d) { setTimeout(function () { listeners.forEach(function (cb) { cb({ event_type: 'shopping_list_manager_' + event_type, data: d }); }); }, 0); }
    function recalc(it) { it.estimated_total = it.price != null ? it.quantity * it.price : null; it.updated_at = now(); }

    function search(q, limit) {
      q = (q || '').toLowerCase().trim(); if (!q) return [];
      var scored = [];
      products.forEach(function (p) {
        var n = p.name.toLowerCase(), s = 0;
        if (n === q) s = 100; else if (n.indexOf(q) === 0) s = 80; else if (n.indexOf(q) > -1) s = 60;
        else if ((p.aliases || []).some(function (a) { return a.toLowerCase().indexOf(q) > -1; })) s = 40;
        if (s) scored.push([s + (p.priority_level || 0), p]);
      });
      scored.sort(function (a, b) { return b[0] - a[0]; });
      return scored.slice(0, limit || 20).map(function (x) { return x[1]; });
    }

    var handlers = {
      'lists/get_all': function () { return { lists: state.lists }; },
      'lists/create': function (m) { var l = mkList(m.name, m.icon || 'mdi:cart', false); if (m.private || m.group_id) l.owner_id = opts.user.id; if (m.group_id) l.group_id = m.group_id; state.lists.push(l); state.items[l.id] = []; emit('list_updated', { list_id: l.id, action: 'created' }); return { list: l }; },
      'lists/update': function (m) { var l = state.lists.filter(function (x) { return x.id === m.list_id; })[0]; ['name', 'icon', 'category_order', 'item_order'].forEach(function (k) { if (k in m) l[k] = m[k]; }); l.updated_at = now(); emit('list_updated', { list_id: l.id, action: 'updated' }); return { list: l }; },
      'lists/delete': function (m) { state.lists = state.lists.filter(function (x) { return x.id !== m.list_id; }); delete state.items[m.list_id]; emit('list_updated', { list_id: m.list_id, action: 'deleted' }); return { success: true }; },
      'lists/set_active': function (m) { state.lists.forEach(function (l) { l.active = l.id === m.list_id; }); emit('list_updated', { list_id: m.list_id, action: 'activated' }); return { success: true }; },
      'lists/update_members': function (m) { var l = state.lists.filter(function (x) { return x.id === m.list_id; })[0]; l.allowed_users = m.allowed_users || []; if (m.allowed_groups) l.allowed_groups = m.allowed_groups; emit('list_updated', { list_id: l.id, action: 'members_updated' }); return { list: l }; },
      'items/get': function (m) { return { items: state.items[m.list_id] || [] }; },
      'items/add': function (m) { var d = Object.assign({}, m); var it = addItem(m.list_id, d); emit('item_added', { list_id: m.list_id, item_id: it.id, item: it }); return { item: it }; },
      'items/update': function (m) { var it = findItem(m.item_id); ['name', 'category_id', 'quantity', 'unit', 'note', 'price', 'image_url', 'barcode'].forEach(function (k) { if (k in m) it[k] = m[k]; }); recalc(it); emit('item_updated', { list_id: it.list_id, item_id: it.id, item: it }); return { item: it }; },
      'items/check': function (m) { var it = findItem(m.item_id); it.checked = !!m.checked; it.checked_at = m.checked ? now() : null; emit('item_checked', { list_id: it.list_id, item_id: it.id, checked: it.checked }); return { item: it }; },
      'items/bulk_check': function (m) { m.item_ids.forEach(function (id) { var it = findItem(id); if (it) { it.checked = !!m.checked; } }); emit('item_checked', { item_ids: m.item_ids, checked: !!m.checked, count: m.item_ids.length }); return { success: true, count: m.item_ids.length }; },
      'items/delete': function (m) { var it = findItem(m.item_id); if (it) { state.items[it.list_id] = state.items[it.list_id].filter(function (i) { return i.id !== m.item_id; }); emit('item_deleted', { list_id: it.list_id, item_id: m.item_id }); } return { success: true }; },
      'items/increment': function (m) { var it = findItem(m.item_id); it.quantity = Math.max(1, it.quantity + m.amount); recalc(it); emit('item_updated', { list_id: it.list_id, item_id: it.id, item: it }); return { item: it }; },
      'items/clear_checked': function (m) { var n = state.items[m.list_id].filter(function (i) { return i.checked; }).length; state.items[m.list_id] = state.items[m.list_id].filter(function (i) { return !i.checked; }); emit('item_deleted', { list_id: m.list_id, count: n, action: 'cleared_checked' }); return { success: true, count: n }; },
      'items/get_total': function (m) { var its = state.items[m.list_id] || []; return { total: its.reduce(function (s, i) { return s + (i.estimated_total || 0); }, 0), currency: currency, item_count: its.length, checked_count: its.filter(function (i) { return i.checked; }).length }; },
      'categories/get_all': function () { return { categories: categories }; },
      'products/suggestions': function (m) { return { products: products.slice().sort(function (a, b) { return (b.priority_level || 0) - (a.priority_level || 0); }).slice(0, m.limit || 20) }; },
      'products/search': function (m) { return { products: search(m.query, m.limit) }; },
      'products/get_by_ids': function (m) { return { products: (m.product_ids || []).map(function (id) { return byId[id]; }).filter(Boolean) }; },
      'products/search_by_barcode': function (m) { return { product: products.filter(function (p) { return p.barcode === m.barcode; })[0] || null }; },
      'products/substitutes': function (m) { var p = byId[m.product_id]; return { products: p && p.substitution_group ? products.filter(function (x) { return x.id !== p.id && x.substitution_group === p.substitution_group; }).slice(0, m.limit || 5) : [] }; },
      'products/add': function (m) { var p = Object.assign({ id: newId('prod'), aliases: [], brands: [], custom: true, default_unit: 'units', default_quantity: 1 }, m); delete p.type; products.push(p); byId[p.id] = p; return { product: p }; },
      'products/update': function (m) { var p = byId[m.product_id]; Object.keys(m).forEach(function (k) { if (k !== 'type' && k !== 'product_id') p[k] = m[k]; }); return { product: p }; },
      'products/download_image': function (m) { return { local_url: m.image_url }; },
      'openfoodfacts/fetch': function () { return { products: [] }; },
      'user_settings/get': function () { return { settings: state.settings, updated_at: state.settings ? now() : null }; },
      'user_settings/set': function (m) { state.settings = m.settings; return { updated_at: now() }; },
      'get_integration_settings': function () { return { version: opts.integrationVersion, country: 'NZ', currency_symbol: '$', metric_units_only: true, enable_price_tracking: true, regions: [] }; },
      'set_country': function (m) { return { success: true, country: m.country, products_loaded: products.length }; },
      'regions/create': function () { return { success: true }; },
      'regions/delete': function () { return { success: true }; },
      'users/get_all': function () { return { users: [{ id: opts.user.id, name: opts.user.name }, { id: 'u2', name: 'Sam' }, { id: 'u3', name: 'Mum' }, { id: 'u4', name: 'Alex' }] }; },
      'supermarkets/get_chains': function () {
        var names = ["PAK'nSAVE", 'Woolworths', 'New World', 'Four Square', 'SuperValue', 'Fresh Choice', 'Farro Fresh', 'Costco', 'Gilmours', 'Bin Inn', "Moore Wilson's", "Night 'n Day"];
        return { country: 'NZ', chains: names.map(function (n) { return { id: n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name: n }; }) };
      },
      'supermarkets/search': function (m) {
        // A few real Auckland shops stand in for the map service, so the lookup can be tried in the demo
        var shops = [
          { name: "PAK'nSAVE Glen Innes", address: '182 Apirana Avenue, Glen Innes, 1072', latitude: -36.875846, longitude: 174.855172 },
          { name: "PAK'nSAVE Mount Wellington", address: '286 Mount Wellington Highway, Mount Wellington, 1060', latitude: -36.913345, longitude: 174.840009 },
          { name: "PAK'nSAVE Pakuranga", address: 'Pakuranga Road, Highland Park, 2143', latitude: -36.899345, longitude: 174.906953 },
          { name: 'Woolworths Highland Park', address: 'Highland Park Drive, Highland Park, 2010', latitude: -36.89941, longitude: 174.908261 },
          { name: 'New World Kohimarama', address: 'Kohimarama Road, Kohimarama, 1071', latitude: -36.8903959, longitude: 174.8318791 },
          { name: 'New World Victoria Park', address: 'Victoria Street West, Auckland Central, 1010', latitude: -36.8458, longitude: 174.7567 }
        ];
        var key = function (x) { return String(x || '').toLowerCase().replace(/[^a-z0-9]/g, ''); };
        var chains = ["PAK'nSAVE", 'Woolworths', 'New World'], chain = null, place = String(m.query || '').trim();
        var picked = m.chain_id ? chains.filter(function (c) { return key(c) === key(m.chain_id); })[0] : null;
        if (picked) chain = picked; else chains.forEach(function (c) { if (!chain && key(place).indexOf(key(c)) === 0) { chain = c; place = place.replace(/^[^a-z0-9]*/i, '').slice(c.length).replace(/^[\s,'-]+/, ''); } });
        var hasPos = m.latitude != null && m.longitude != null;
        var km = function (a, b, c, d) { var r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2); return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a * r) * Math.cos(c * r) * y * y)); };
        var found = shops.filter(function (x) { return (!chain || key(x.name).indexOf(key(chain)) === 0) && (hasPos || !place || key(x.name + x.address).indexOf(key(place)) > -1); });
        if (!chain && !place && !hasPos) throw new Error('Type a shop or suburb to look for, or pick a chain');
        var centre = hasPos ? [m.latitude, m.longitude] : null;
        found = found.map(function (x) { return Object.assign({ distance_km: centre ? Math.round(km(centre[0], centre[1], x.latitude, x.longitude) * 10) / 10 : null }, x); });
        if (centre) found.sort(function (a, b) { return a.distance_km - b.distance_km; });
        return { results: found.slice(0, 8) };
      },
      'supermarkets/get_all': function () { return { supermarkets: JSON.parse(JSON.stringify(state.stores)) }; },
      'supermarkets/add': function (m) {
        var lat = m.latitude == null ? null : m.latitude, lng = m.longitude == null ? null : m.longitude;
        if ((lat == null) !== (lng == null)) throw new Error('Give both latitude and longitude, or neither');
        var st = { id: newId('sm'), name: String(m.name || '').trim(), chain_id: m.chain_id || null, address: m.address || '', latitude: lat, longitude: lng, created_at: now(), updated_at: now(), owner_id: opts.user.id, group_id: m.group_id || null, allowed_users: [], allowed_groups: [] };
        if (!st.name) throw new Error('A supermarket needs a name');
        state.stores.push(st); return { supermarket: st };
      },
      'supermarkets/update': function (m) {
        var st = state.stores.filter(function (x) { return x.id === m.supermarket_id; })[0]; if (!st) throw new Error('Supermarket not found');
        ['name', 'chain_id', 'address', 'latitude', 'longitude'].forEach(function (k) { if (k in m) st[k] = m[k]; });
        if ((st.latitude == null) !== (st.longitude == null)) throw new Error('Give both latitude and longitude, or neither');
        st.updated_at = now(); return { supermarket: st };
      },
      'supermarkets/delete': function (m) { state.stores = state.stores.filter(function (x) { return x.id !== m.supermarket_id; }); return { success: true }; },
      'groups/get_all': function () {
        var mine = state.groups.filter(function (g) { return g.members.indexOf(opts.user.id) > -1; }).map(function (g) { return g.id; });
        return { groups: JSON.parse(JSON.stringify(state.groups)), mine: mine,
          shared_with_everyone: { lists: state.lists.filter(function (l) { return !l.owner_id; }).length, cards: state.cards.filter(function (c) { return !c.owner_id; }).length } };
      },
      'groups/create': function (m) { var g = { id: newId('group'), name: String(m.name || '').trim(), members: m.members || [] }; if (!g.name) throw new Error('A group needs a name'); state.groups.push(g); emit('groups_updated', { action: 'created' }); return { group: g }; },
      'groups/update': function (m) { var g = state.groups.filter(function (x) { return x.id === m.group_id; })[0]; if (!g) throw new Error('Group not found'); if (m.name != null) g.name = String(m.name).trim(); if (m.members) g.members = m.members; emit('groups_updated', { action: 'updated' }); return { group: g }; },
      'groups/delete': function (m) {
        var owned = state.lists.filter(function (l) { return l.group_id === m.group_id; }).length + state.cards.filter(function (c) { return c.group_id === m.group_id; }).length;
        if (owned) throw new Error('This group still has ' + owned + ' list(s) or card(s). Move or delete them first.');
        state.groups = state.groups.filter(function (g) { return g.id !== m.group_id; });
        state.lists.forEach(function (l) { l.allowed_groups = (l.allowed_groups || []).filter(function (g) { return g !== m.group_id; }); });
        state.cards.forEach(function (c) { c.allowed_groups = (c.allowed_groups || []).filter(function (g) { return g !== m.group_id; }); });
        emit('groups_updated', { action: 'deleted' }); return { success: true };
      },
      'groups/adopt_shared': function (m) {
        var moved = { lists: 0, cards: 0 };
        state.lists.forEach(function (l) { if (!l.owner_id) { l.owner_id = opts.user.id; l.group_id = m.group_id; moved.lists++; } });
        state.cards.forEach(function (c) { if (!c.owner_id) { c.owner_id = opts.user.id; c.group_id = m.group_id; moved.cards++; } });
        emit('list_updated', { action: 'adopted' }); return { moved: moved };
      },
      'loyalty/get_all': function () { return { cards: state.cards }; },
      'loyalty/add': function (m) { var c = card(m.name, m.number, m.color || '#9fa8da'); if (m.private || m.group_id) c.owner_id = opts.user.id; if (m.group_id) c.group_id = m.group_id; ['barcode', 'barcode_type', 'notes', 'logo'].forEach(function (k) { if (k in m) c[k] = m[k]; }); if (!m.barcode) c.barcode = m.number; state.cards.push(c); return { card: c }; },
      'loyalty/update': function (m) { var c = state.cards.filter(function (x) { return x.id === m.card_id; })[0]; Object.keys(m).forEach(function (k) { if (['type', 'card_id'].indexOf(k) < 0) c[k] = m[k]; }); c.updated_at = now(); return { card: c }; },
      'loyalty/delete': function (m) { state.cards = state.cards.filter(function (x) { return x.id !== m.card_id; }); return { success: true }; },
      'loyalty/update_members': function (m) { var c = state.cards.filter(function (x) { return x.id === m.card_id; })[0]; c.allowed_users = m.allowed_users || []; if (m.allowed_groups) c.allowed_groups = m.allowed_groups; return { card: c }; },
      'export_data': function () { return JSON.parse(JSON.stringify({ version: opts.integrationVersion, exported_at: now(), lists: state.lists, items: state.items, loyalty_cards: state.cards })); },
      'import_data': function () { return { success: true, imported: {} }; }
    };

    seed();

    return {
      reset: function () { seed(); emit('list_updated', { action: 'reset' }); },
      hass: function (extra) {
        return Object.assign({
          user: opts.user,
          language: 'en',
          config: { currency: currency, unit_system: { length: 'km' } },
          themes: { darkMode: false },
          states: {},
          callService: function () { return Promise.resolve(); },
          connection: {
            subscribeMessage: function (cb) { listeners.push(cb); return Promise.resolve(function () { listeners = listeners.filter(function (x) { return x !== cb; }); }); },
            subscribeEvents: function () { return Promise.resolve(function () {}); }
          },
          callWS: function (m) {
            var h = handlers[m.type.replace(NS, '')];
            if (!h) return Promise.resolve({});
            return new Promise(function (resolve, reject) {
              setTimeout(function () { try { resolve(JSON.parse(JSON.stringify(h(m)))); } catch (e) { reject({ code: 'demo_error', message: (e && e.message) ? e.message : String(e) }); } }, 30);
            });
          }
        }, extra || {});
      }
    };
  }
  window.createDemoBackend = createBackend;
})();
