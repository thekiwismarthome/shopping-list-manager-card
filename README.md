# Shopping List Manager Card for Home Assistant

A feature-rich, multi-list shopping manager for Home Assistant Lovelace. Built as a custom card using Lit web components, it gives you a full grocery management experience — from product search and category grouping to loyalty card storage — all in a polished, real-time-synced interface.

> **Requires the [Shopping List Manager Integration](https://github.com/thekiwismarthome/shopping-list-manager)** to be installed first.

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager-card&category=plugin)

---

## Features

### 🛒 Shopping Lists
- Create and manage **multiple shopping lists**
- Active list syncs instantly across all devices and users
- Share list contents via clipboard or native share sheet
- Private or shared lists with per-member access control
- List icons, rename, and delete support
- List total price calculation in local currency

### 📦 Items & Quantities
- Add items with quantity and unit (kg, g, L, mL, units, pack, and more)
- **Tap** a tile to increment quantity; **tap minus** to decrement (removes at zero)
- **Long-press** to open a full edit dialog — name, category, unit, price, and notes
- **Swipe** to delete
- Check items off as you shop; bulk-clear all checked items in one tap

### 🔍 Product Search & Catalog
- **500+ product catalog** with fuzzy search and alias matching
- Recently-used product suggestions for quick re-adding
- Custom product creation with default quantity and unit
- Product images with local HA image folder support
- Allergen filtering and product substitute suggestions
- Auto-fill default quantities and units per product

### 🗂️ Categories
- 13 default categories — Produce, Dairy, Meat, Bakery, Pantry, Frozen, Beverages, Snacks, Household, Health, Pet, Baby, Other
- Items grouped by category with colour-coded headers and emoji icons
- Category order configurable per list

### 💳 Loyalty Cards
- Store loyalty and rewards card barcodes in one place
- Built-in **camera barcode scanner** for easy card capture
- **Fullscreen card display** for scanning at checkout
- Supports standard barcodes and QR codes
- Card colour, logo, and notes customisation
- Shared or private card access per user

### 🎨 Designs & Display
- **Two designs** (Settings → Appearance → Interface style):

| Design | Look |
|---|---|
| **Fresh** *(default)* | Light, soft cards. Summary card with progress and estimated total, category chips, steppers on each row, a + button and a floating bottom bar. |
| **Compact** | Dark, dense and list first. Checkbox rows, a progress line, collapsible categories and a flat tab bar with a total bar. |

- Fresh has three themes (**Meadow**, **Slate**, **Sunset**); Compact has four accent colours (**Periwinkle**, **Mint**, **Amber**, **Coral**)
- Colour mode: **Light / Dark / Match device** (Fresh starts light, Compact starts dark)
- **Tile view** (category-grouped grid) and **List view**; **Recently Used** stays its own section under the categories
- Tiles per row: 2 / 3 / 4 / 5 / 8 / 10 (configurable)
- Sort items by category or alphabetically
- Show or hide item prices
- Font family, font size, and font weight controls
- Emoji or icon display toggle

### 🔄 Real-Time Sync
- WebSocket-based synchronisation — changes appear instantly on all connected devices
- Works for **non-admin HA users** without requiring admin privileges
- Keep-screen-on (wake lock) option for kiosk and tablet use

---

## Requirements

| Component | Minimum Version |
|---|---|
| Home Assistant | 2024.1 |
| [Shopping List Manager Integration](https://github.com/thekiwismarthome/shopping-list-manager) | Latest |
| HACS | 2.x |

---

## Installation

### Step 1 — Install the Backend Integration

Install the **Shopping List Manager** integration via HACS first:

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager&category=integration)

After installing, restart Home Assistant and add the integration via **Settings → Devices & Services → Add Integration → Shopping List Manager**.

### Step 2 — Install this Card via HACS

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager-card&category=plugin)

Or manually in HACS:

1. Open **HACS** in your Home Assistant sidebar
2. Go to **Frontend**
3. Click **+ Explore & Download Repositories**
4. Search for **Shopping List Manager Card**
5. Click **Download**
6. Reload your browser

### Step 3 — Add the Card to a Dashboard

1. Open a Lovelace dashboard and click **Edit**
2. Click **+ Add Card**
3. Search for **Shopping List Manager**
4. Select the card and click **Add to Dashboard**

Or add it manually in YAML:

```yaml
type: custom:shopping-list-manager-card
```

---

## Documentation

Full documentation is available in the [Wiki](https://github.com/thekiwismarthome/shopping-list-manager-card/wiki).

## Support & Feedback

- [Open an Issue](https://github.com/thekiwismarthome/shopping-list-manager-card/issues)
- [Home Assistant Community Forum](https://community.home-assistant.io)

---

## License

MIT — see [LICENSE](LICENSE) for details.
