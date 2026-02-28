# Adding Countries and Products

The Shopping List Manager integration ships with five country catalogs. This page explains how the catalog system works, how to add products to an existing country, and how to add a brand new country.

> All catalog files live in the **backend integration** repository:
> `custom_components/shopping_list_manager/data/`

---

## Table of Contents

- [How the Catalog System Works](#how-the-catalog-system-works)
- [Supported Countries](#supported-countries)
- [Product JSON Schema](#product-json-schema)
- [Category Reference](#category-reference)
- [Adding Products to an Existing Country](#adding-products-to-an-existing-country)
- [Adding a New Country](#adding-a-new-country)
- [Registering the New Country in the Code](#registering-the-new-country-in-the-code)
- [Reloading the Catalog](#reloading-the-catalog)
- [Tips for Good Catalog Entries](#tips-for-good-catalog-entries)

---

## How the Catalog System Works

On startup, the integration loads two things for the active country:

1. **Categories** — from `data/categories.json` (shared across all countries by default, or from `data/categories_{cc}.json` for country-specific overrides)
2. **Products** — from `data/products_catalog_{cc}.json` where `{cc}` is the lowercase country code (e.g. `nz`, `au`)

Every product loaded from a catalog file is stored internally with `source = "catalog"`. Products the user creates through the UI are stored with `source = "user"`.

When you switch country (Settings → Region), the integration:
1. Deletes all `source = "catalog"` products
2. Loads the new country's catalog file
3. Rebuilds the search index
4. Leaves all `source = "user"` products untouched

This means **user-added products always survive a country switch**.

---

## Supported Countries

| Country Code | Catalog File | Currency |
|---|---|---|
| `NZ` | `products_catalog_nz.json` | NZD |
| `AU` | `products_catalog_au.json` | AUD |
| `US` | `products_catalog_us.json` | USD |
| `GB` | `products_catalog_gb.json` | GBP |
| `CA` | `products_catalog_ca.json` | CAD |

---

## Product JSON Schema

Every catalog file has this top-level structure:

```json
{
  "version": "2.1.0",
  "region": "NZ",
  "currency": "NZD",
  "last_updated": "2026-02-28",
  "description": "NZ grocery catalog",
  "products": [ ... ]
}
```

### Product Fields

Each entry in the `products` array can have the following fields:

| Field | Required | Type | Description |
|---|---|---|---|
| `id` | No* | `string` | Unique product ID. Auto-generated if omitted. Use `prod_` prefix by convention, e.g. `prod_milk_trim` |
| `name` | **Yes** | `string` | Display name shown in search results and on tiles |
| `category_id` | No | `string` | Category ID (see [Category Reference](#category-reference)). Defaults to `"other"` |
| `aliases` | No | `string[]` | Alternative names used by the search engine |
| `default_unit` | No | `string` | Default unit when adding to list. Defaults to `"units"` |
| `default_quantity` | No | `number` | Default quantity when adding to list. Defaults to `1` |
| `price` | No | `number` | Typical retail price in the catalog's currency |
| `brands` | No | `string[]` | Common brand names for this product |
| `barcode` | No | `string` | EAN/barcode for barcode lookup |
| `image_hint` | No | `string` | Filename hint used to locate the product image (without extension) |
| `image_url` | No | `string` | Direct URL or local path to the product image |
| `tags` | No | `string[]` | Freeform tags for filtering |
| `collections` | No | `string[]` | Named collections this product belongs to |
| `allergens` | No | `string[]` | Allergen warnings (e.g. `"milk"`, `"gluten"`, `"nuts"`) |
| `substitution_group` | No | `string` | Products sharing a group are suggested as substitutes for each other |
| `priority_level` | No | `integer` | Search ranking boost. `0` = normal, higher = appears first |
| `taxonomy` | No | `object` | Structured metadata — see below |

> \* `id` is technically optional in the file (auto-generated if missing) but providing a stable ID is strongly recommended — it ensures consistent behaviour across restarts and country switches.

### Taxonomy Object

```json
"taxonomy": {
  "dietary":   [],
  "nutrition": [],
  "lifestyle": [],
  "storage":   "fridge"
}
```

| Key | Values |
|---|---|
| `dietary` | e.g. `"vegan"`, `"vegetarian"`, `"gluten-free"`, `"dairy-free"` |
| `nutrition` | e.g. `"high-protein"`, `"low-fat"`, `"low-sugar"` |
| `lifestyle` | e.g. `"organic"`, `"fairtrade"`, `"locally-sourced"` |
| `storage` | `"fridge"`, `"freezer"`, `"pantry"`, `"fresh"` |

All keys are optional — omit any you don't need.

### Full Example Entry

```json
{
  "id": "prod_milk_trim",
  "name": "Milk - Trim",
  "category_id": "dairy",
  "aliases": [
    "low fat milk",
    "skim milk",
    "trim milk",
    "milk"
  ],
  "default_unit": "L",
  "default_quantity": 2,
  "price": 3.99,
  "brands": ["Anchor", "Pams", "Meadow Fresh"],
  "barcode": "9400547000019",
  "image_hint": "milk_trim",
  "tags": [],
  "collections": [],
  "taxonomy": {
    "dietary": [],
    "nutrition": ["low-fat"],
    "lifestyle": [],
    "storage": "fridge"
  },
  "allergens": ["milk"],
  "substitution_group": "milk_group",
  "priority_level": 5
}
```

### Minimal Valid Entry

```json
{
  "id": "prod_vegemite",
  "name": "Vegemite",
  "category_id": "pantry"
}
```

---

## Category Reference

Use one of these `category_id` values in your product entries:

| `category_id` | Display Name | Icon |
|---|---|---|
| `produce` | Fruit & Veg | `mdi:fruit-cherries` |
| `dairy` | Dairy & Eggs | `mdi:cheese` |
| `meat` | Meat & Seafood | `mdi:food-steak` |
| `bakery` | Bakery | `mdi:bread-slice` |
| `frozen` | Frozen Foods | `mdi:snowflake` |
| `pantry` | Pantry | `mdi:package-variant` |
| `beverages` | Drinks | `mdi:cup` |
| `snacks` | Snacks & Biscuits | `mdi:food-apple` |
| `household` | Household | `mdi:spray-bottle` |
| `health` | Health & Beauty | `mdi:heart-pulse` |
| `pet` | Pet Supplies | `mdi:paw` |
| `baby` | Baby | `mdi:baby-face` |
| `other` | Other | `mdi:dots-horizontal` |

If a product's `category_id` doesn't match any known category it will be placed in `other`.

---

## Adding Products to an Existing Country

1. Open the catalog file for the country you want to update, e.g.:
   ```
   custom_components/shopping_list_manager/data/products_catalog_nz.json
   ```

2. Update the `last_updated` date at the top.

3. Add your new product(s) to the `products` array. Use a unique `id` that doesn't conflict with existing entries. The convention is `prod_{name_with_underscores}`:

   ```json
   {
     "id": "prod_marmite",
     "name": "Marmite",
     "category_id": "pantry",
     "aliases": ["yeast extract", "marmite spread"],
     "default_unit": "units",
     "default_quantity": 1,
     "price": 5.49,
     "brands": ["Sanitarium"],
     "substitution_group": "yeast_extract_group",
     "priority_level": 2
   }
   ```

4. Validate your JSON is well-formed (paste into [jsonlint.com](https://jsonlint.com) or run `python3 -m json.tool products_catalog_nz.json`).

5. Restart Home Assistant, or use the **Settings → Region** picker to re-select the same country — this triggers a catalog reload.

---

## Adding a New Country

### Step 1 — Create the catalog file

Create a new file in `custom_components/shopping_list_manager/data/` following the naming convention:

```
products_catalog_{cc}.json
```

Where `{cc}` is the **lowercase** two-letter country code (e.g. `fr` for France).

Start from the template below or copy an existing catalog and replace the products:

```json
{
  "version": "2.1.0",
  "region": "FR",
  "currency": "EUR",
  "last_updated": "2026-02-28",
  "description": "French grocery catalog",
  "products": [
    {
      "id": "prod_baguette",
      "name": "Baguette",
      "category_id": "bakery",
      "aliases": ["french bread", "bread stick"],
      "default_unit": "units",
      "default_quantity": 1,
      "price": 1.20,
      "priority_level": 5
    }
  ]
}
```

### Step 2 — Optionally create country-specific categories

If you want different category names or colours for the new country, create:

```
custom_components/shopping_list_manager/data/categories_fr.json
```

The category loader checks for this file first and falls back to `categories.json` if it doesn't exist. The format is identical to `categories.json`:

```json
{
  "version": "1.0.0",
  "region": "FR",
  "categories": [
    {
      "id": "produce",
      "name": "Fruits & Légumes",
      "icon": "mdi:fruit-cherries",
      "color": "#4CAF50",
      "sort_order": 1,
      "system": true
    }
  ]
}
```

> You must include **all 13 categories** if you create a country-specific categories file — there is no partial override.

---

## Registering the New Country in the Code

A new country needs to be registered in three places.

### 1. The valid-countries list (`websocket/handlers.py`)

Find the `_VALID_COUNTRIES` constant and add your new code:

```python
# Before
_VALID_COUNTRIES = ["NZ", "AU", "US", "GB", "CA"]

# After
_VALID_COUNTRIES = ["NZ", "AU", "US", "GB", "CA", "FR"]
```

### 2. The available-countries response (`websocket/handlers.py`)

Find `websocket_get_integration_settings` and add the new country to the `available_countries` dict:

```python
connection.send_result(
    msg["id"],
    {
        "country": country,
        "available_countries": {
            "NZ": "New Zealand",
            "AU": "Australia",
            "US": "United States",
            "GB": "United Kingdom",
            "CA": "Canada",
            "FR": "France",      # ← add here
        },
    }
)
```

### 3. The card's profile settings (card repo — `slm-profile-settings.js`)

If there is a country selector in the card UI, add the new option there too so users can see and select it. Search for the existing country options in that file and add your entry in the same pattern.

---

## Reloading the Catalog

After modifying or adding a catalog file you need to reload it into the running integration. You have two options:

**Option A — Restart Home Assistant**

The integration loads the catalog fresh on every startup.

**Option B — Switch country and back (no restart needed)**

In the card, go to **Settings → Profile → Region**, switch to any other country, then switch back. Each switch triggers a full catalog reload from disk.

> If you're actively developing a catalog, Option B is much faster for iteration.

---

## Tips for Good Catalog Entries

**IDs**
- Use the `prod_` prefix and lowercase with underscores: `prod_greek_yoghurt`
- Keep IDs stable — changing them after release will break user history

**Names**
- Be specific where variants differ: `"Milk - Whole"` and `"Milk - Trim"` rather than just `"Milk"` twice
- Use title case consistently

**Aliases**
- Include common misspellings and alternative names users might type
- Include the base word even if it appears in the name — users often search the short form (e.g. add `"milk"` as an alias for `"Milk - Trim"`)
- Keep aliases lowercase

**Prices**
- Use typical supermarket prices for the country's major chains
- Prices are used for the list total estimate — accuracy matters more than precision

**Substitution Groups**
- Products in the same group are suggested as alternatives when one is not available
- Use a shared snake_case key: `"milk_group"`, `"bread_group"`, `"yoghurt_group"`

**Priority Level**
- `0` — standard (most products)
- `1–3` — slightly boosted (common variants)
- `4–5` — top results (most-purchased items like milk, bread, eggs)

**Allergens**
- Use lowercase, standardised strings: `"milk"`, `"gluten"`, `"eggs"`, `"nuts"`, `"peanuts"`, `"soy"`, `"fish"`, `"shellfish"`, `"sesame"`
- Used by the allergen filter in search
