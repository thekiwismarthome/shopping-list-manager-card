---
title: FAQ and troubleshooting
---

# FAQ and troubleshooting

## The card does not appear in the Add card list

Reload the browser with Ctrl+Shift+R after installing or updating the card in HACS. If it still does not appear, check **Settings → Dashboards → Resources** for `shopping-list-manager-card.js`.

## The card says it cannot reach the integration

The integration must be installed and added under **Settings → Devices & services** first. Restart Home Assistant after installing it from HACS.

## Which version am I running?

Open **Settings → FAQ & Support**. The integration and card versions are listed at the bottom. If the integration version shows "—", update the integration in HACS. Older versions did not report their version.

## Does it work for people who are not administrators?

Yes. Live updates work for every Home Assistant user.

## Can I keep a list private?

Yes. Turn on **Private** when you create the list. See [Lists](/guide/lists).

## Why are there no products for my country?

Choose your region under **Settings → Region & Catalog**. If your country is not listed you can add a custom region. See [Region and catalogue](/guide/region-and-catalogue).

## Where do I report a problem?

Please [open an issue on GitHub](https://github.com/thekiwismarthome/shopping-list-manager/issues). Include your Home Assistant version, the integration and card versions, and what you expected to happen.
