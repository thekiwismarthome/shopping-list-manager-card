# Shopping List Manager Card

A custom Lovelace card for the **Shopping List Manager** integration.

This card provides the user interface only and communicates with the integration via WebSocket.

![Alt text for the GIF](media/shopping-list-manager-card.gif)

---

## 1. Installation (HACS)

### Recommended

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager-card&category=plugin)

1. Click the button above.
2. Confirm adding the repository to HACS.
3. Install **Shopping List Manager Card** from **HACS → Frontend**.
4. Reload the dashboard.

---

### Manual Repository URL

https://github.com/thekiwismarthome/shopping-list-manager-card

Repository type: **Lovelace**

---

## 2. Lovelace Setup

Add the card to your dashboard:

```yaml
type: custom:shopping-list-manager
title: Shopping List
list_id: groceries
```
and to add HA Card Grids
```yaml
type: custom:shopping-list-card
title: Shopping List
list_id: groceries
grid_options:
  columns: 12
  rows: auto
```
## 3. Requirements

Home Assistant with HACS

Shopping List Manager integration installed

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager&category=integration)

## 4. Notes

This repository contains frontend code only

The backend integration is installed separately

Polling is used by design

Live WebSocket subscriptions are not enabled
