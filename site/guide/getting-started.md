---
title: Getting started
---

# Getting started

Shopping List Manager has two parts. The **integration** stores your lists and catalogue inside Home Assistant. The **card** is what you see and use on a dashboard. You need both.

| Requirement | Minimum |
|---|---|
| Home Assistant | 2024.1 |
| HACS | 2.x |

## 1. Install the integration

1. In Home Assistant, open **HACS** and choose **Integrations**.
2. Use the menu to add a custom repository, paste `https://github.com/thekiwismarthome/shopping-list-manager` and choose the **Integration** category. Or use this button:

   [![Open your Home Assistant instance and open the integration in HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager&category=integration)

3. Download **Shopping List Manager** and restart Home Assistant.
4. Go to **Settings → Devices & services → Add integration**, search for **Shopping List Manager** and follow the prompts.

## 2. Install the card

1. In HACS, open **Frontend** and add `https://github.com/thekiwismarthome/shopping-list-manager-card` as a custom repository, or use this button:

   [![Open your Home Assistant instance and open the card in HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=thekiwismarthome&repository=shopping-list-manager-card&category=plugin)

2. Download **Shopping List Manager Card**.
3. Reload your browser. A hard refresh (Ctrl+Shift+R) makes sure you get the new file.

## 3. Add the card to a dashboard

1. Open a dashboard and choose **Edit**.
2. Choose **Add card** and search for **Shopping List Manager**.
3. Choose **Save**.

If you prefer YAML, add this to the dashboard:

```yaml
type: custom:shopping-list-manager-card
```

::: tip Want to try before you install?
The [live demo](/demo) runs the same card on sample data.
:::

## Trying a beta

Beta versions are published as GitHub pre-releases. In HACS, open the card, choose **Redownload**, switch on **Show beta versions** and pick the beta you want. The version number appears under **Settings → FAQ & Support**.

## Next steps

- [Make your first list](/guide/lists)
- [Add items and change quantities](/guide/items)
- [Store your loyalty cards](/guide/loyalty-cards)
- [Choose a design and theme](/guide/appearance)
