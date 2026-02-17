# Shopping List Manager for Home Assistant

A comprehensive shopping list integration for Home Assistant, featuring a full-featured Lovelace card with real-time multi-device synchronisation, product catalog, category management, and loyalty card storage.

---

## Features

### 🛒 Shopping Lists
- Create and manage multiple shopping lists
- Set an active list across all devices
- Share list contents via clipboard or native share sheet
- Real-time synchronisation across all users and devices (including non-admin users)
- List total price calculation in local currency

### 📦 Items & Quantities
- Add items with quantity and unit (metric units: kg, g, L, mL, units, pack, etc.)
- Tap item tile to increase quantity
- Tap minus button to decrease quantity (removes item at zero)
- Long-press tile for edit dialog with full item details
- Swipe to delete
- Check/uncheck items when in-store
- Bulk check and clear checked items

### 🔍 Product Search & Catalog
- 500+ product catalog (NZ-focused, extensible)
- Fuzzy search with alias matching
- Recently used products suggestions
- Custom product creation
- Product substitutes support
- Allergen filtering
- Auto-fill default quantities and units per product
- Product images (webp, 200x200px, optimised)

### 🗂️ Categories
- 13 default categories (Produce, Dairy, Meat, Bakery, Pantry, Frozen, Beverages, Snacks, Household, Health, Pet, Baby, Other)
- Items grouped by category in the grid view
- Pastel colour coding per category
- Emoji icons per category

### 💳 Loyalty Cards
- Store loyalty/rewards card barcodes
- Quick access from bottom navigation

### ⚙️ Settings
- Tiles per row (configurable grid layout)
- Dark / Light / System theme
- Recently used products count
- Open last used list on load
- Keep screen on (kiosk mode)
- Font size options

---

## Architecture

### Backend (Home Assistant Custom Integration)

```
custom_components/shopping_list_manager/
├── __init__.py               # Integration setup, WebSocket handler registration
├── manifest.json             # Integration manifest
├── const.py                  # Constants, event names, WebSocket command types
├── models.py                 # ShoppingList, ShoppingItem, Product, Category dataclasses
├── storage.py                # Persistent storage layer (HA Store)
├── manager.py                # Business logic layer
├── config_flow.py            # Config flow for UI setup
├── category_loader.py        # Category initialisation from JSON
├── categories.json           # Default category definitions
├── websocket/
│   ├── __init__.py           # Package marker
│   └── handlers.py           # All WebSocket command handlers
└── utils/
    └── images.py             # Image processing (webp conversion, resizing)
```

**Storage:** Uses Home Assistant's built-in `Store` for persistent JSON storage. Three separate stores: lists/items, products, categories.

**Events fired on the HA bus:**
| Event | Fired when |
|---|---|
| `shopping_list_manager_item_added` | Item added to a list |
| `shopping_list_manager_item_updated` | Item quantity/details changed |
| `shopping_list_manager_item_checked` | Item checked or unchecked |
| `shopping_list_manager_item_deleted` | Item deleted |
| `shopping_list_manager_list_updated` | List created, updated, or active list changed |
| `shopping_list_manager_list_deleted` | List deleted |

### Frontend (Lovelace Custom Card)

Built with [Lit](https://lit.dev/) web components, bundled with Rollup.

```
shopping_list_manager_card/
├── shopping-list-manager-card.js   # Built/deployed file (committed to repo)
├── package.json
├── rollup.config.js
└── src/
    ├── shopping-list-manager-card.js   # Main card component
    └── components/
        ├── slm-item-grid.js            # Category-grouped item grid
        ├── slm-item-tile.js            # Individual item tile
        ├── slm-search-bar.js           # Product search with suggestions
        ├── slm-list-header.js          # List name, item count, back/share
        ├── slm-lists-view.js           # Lists management view
        ├── slm-loyalty-cards-view.js   # Loyalty cards view
        └── slm-settings-view.js        # Settings view
```

**Component hierarchy:**
```
ShoppingListManagerCard (main)
├── slm-list-header
├── slm-search-bar
├── slm-item-grid
│   └── slm-item-tile (× n)
├── slm-lists-view
├── slm-loyalty-cards-view
└── slm-settings-view
```

---

## WebSocket API

All commands use the prefix `shopping_list_manager/`.

### Lists
| Command | Parameters | Description |
|---|---|---|
| `lists/get_all` | — | Get all lists |
| `lists/create` | `name`, `icon` | Create a new list |
| `lists/update` | `list_id`, `name?`, `icon?`, `category_order?` | Update a list |
| `lists/delete` | `list_id` | Delete a list |
| `lists/set_active` | `list_id` | Set the active list |

### Items
| Command | Parameters | Description |
|---|---|---|
| `items/get` | `list_id` | Get items for a list |
| `items/add` | `list_id`, `name`, `category_id`, `quantity?`, `unit?`, `product_id?`, `price?`, `image_url?` | Add item |
| `items/update` | `item_id`, `name?`, `quantity?`, `unit?`, `note?`, `price?`, `category_id?` | Update item |
| `items/increment` | `item_id`, `amount` | Atomically increment/decrement quantity |
| `items/check` | `item_id`, `checked` | Check or uncheck item |
| `items/delete` | `item_id` | Delete item |
| `items/bulk_check` | `item_ids`, `checked` | Bulk check/uncheck |
| `items/clear_checked` | `list_id` | Remove all checked items |
| `items/get_total` | `list_id` | Get price total for a list |

### Products
| Command | Parameters | Description |
|---|---|---|
| `products/search` | `query`, `limit?`, `exclude_allergens?`, `include_tags?` | Search product catalog |
| `products/suggestions` | `limit?` | Get product suggestions |
| `products/substitutes` | `product_id`, `limit?` | Get product substitutes |
| `products/add` | `name`, `category_id`, `default_unit?`, `default_quantity?`, `price?`, `image_url?` | Add custom product |
| `products/update` | `product_id`, ...fields | Update a product |
| `products/get_by_ids` | `product_ids` | Fetch products by ID array |

### Categories
| Command | Parameters | Description |
|---|---|---|
| `categories/get_all` | — | Get all categories |

### Real-time Subscriptions
| Command | Description |
|---|---|
| `subscribe` | Subscribe to all SLM events (works for non-admin users) |

> **Note:** Direct HA event subscriptions (`subscribe_events`) are blocked for non-admin users. The `subscribe` command acts as a trusted proxy — the integration relays all SLM bus events to the WebSocket connection. This allows kiosk tablets and non-admin users to receive real-time updates.

---

## Installation

### Backend

1. Copy `custom_components/shopping_list_manager/` to your HA `config/custom_components/` directory
2. Restart Home Assistant
3. Go to **Settings → Integrations → Add Integration** and search for **Shopping List Manager**

### Frontend (Manual)

1. Copy `shopping-list-manager-card.js` to `/config/www/community/shopping-list-manager-card/`
2. Add to HA resources:
   ```yaml
   url: /local/community/shopping-list-manager-card/shopping-list-manager-card.js
   type: module
   ```
3. Add the card to your dashboard:
   ```yaml
   type: custom:shopping-list-manager-card
   ```

### Frontend (HACS) — Planned

Add this repository as a custom HACS repository (Frontend category). Install via HACS and add the resource automatically.

---

## Building the Frontend

```bash
cd shopping_list_manager_card
npm install
npm run build
```

The built file is output to `shopping_list_manager_card/shopping-list-manager-card.js`. This file must be committed to the repository for HACS distribution.

---

## Multi-Device & Non-Admin Support

The integration is designed to work correctly across multiple simultaneous users and devices including kiosk tablets running as non-admin HA users.

- All item/list changes fire HA bus events
- All connected cards subscribe via the `shopping_list_manager/subscribe` WebSocket command
- The subscription proxy runs with integration-level permissions, bypassing HA's restriction on non-admin users subscribing to custom events directly
- The frontend uses the `hass` property setter (not `firstUpdated`) to initiate the subscription, ensuring reliable connection on slow or low-powered devices

---

## Current Status

### ✅ Complete
- Phase 1: Backend architecture — data models, storage, WebSocket API, category system
- Phase 2: Product catalog (500+ NZ-focused items), image handling, enhanced search with fuzzy matching, allergen filters, substitution groups
- Phase 3: Full frontend rebuild with Lit web components — multi-list UI, item grid, product search, edit dialogs, list management, loyalty cards view, settings
- Real-time multi-device synchronisation for all users including non-admin
- HACS repository structure and build pipeline

### 🔜 Planned
- Phase 4: Loyalty card barcode scanner
- Phase 5: OpenFoodFacts barcode lookup integration (`barcode/scan`, `openfoodfacts/fetch`)
- HACS community submission
- Multi-language/multi-currency support

---

## Technical Notes

- **Storage version:** 2
- **Image format:** WebP, 200×200px, 85% quality, max 15KB
- **Units:** Always metric (kg, g, L, mL, units, pack, etc.)
- **Currency:** Configurable (default NZD)
- **Default quantities:** Pre-configured for 35+ common products
- **HA minimum version:** 2024.x (uses modern WebSocket API and `Store`)
- **Python:** 3.13 compatible
- **Frontend:** Lit 4.x, bundled with Rollup, no external runtime dependencies
