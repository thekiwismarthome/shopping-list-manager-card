---
layout: home
title: Shopping List Manager
titleTemplate: Shopping lists for Home Assistant
hero:
  name: Home Assistant integration + card
  text: One shopping list for the whole house, inside Home Assistant.
  tagline: Real-time shared lists, a product catalogue, loyalty cards at the till, and two designs you can switch between. Free and open source.
  actions:
    - theme: brand
      text: Try the live demo
      link: /demo
    - theme: alt
      text: Install with HACS
      link: /guide/getting-started
features:
  - icon:
      src: /icons/lists.svg
      width: 24
      height: 24
    title: Shared or private lists
    details: Keep as many lists as you like. Share them with the household or keep one to yourself. Changes show up on every device straight away.
  - icon:
      src: /icons/search.svg
      width: 24
      height: 24
    title: Product catalogue
    details: Around 170 products for most countries, with fuzzy search, so "yogurt" finds "Yogurt - Greek". Recently used items sit in their own section under the categories.
  - icon:
      src: /icons/card.svg
      width: 24
      height: 24
    title: Loyalty cards at the till
    details: Store your barcodes, scan them in with the camera, and tap a card to bring up a large barcode or QR code on a white background.
  - icon:
      src: /icons/tags.svg
      width: 24
      height: 24
    title: Categories you can swipe
    details: Thirteen colour-coded categories in a swipeable chip row. Filter to Dairy while you are in the dairy aisle.
  - icon:
      src: /icons/phone.svg
      width: 24
      height: 24
    title: Phones, tablets and wall panels
    details: Bottom sheets on a phone, a keep-screen-on option for the kitchen tablet, and list or tile view to suit the screen.
  - icon:
      src: /icons/backup.svg
      width: 24
      height: 24
    title: Backup and restore
    details: Export your lists and custom products to a file and bring them back later. Handy before an upgrade.
---

## Two designs, three themes {#designs}

Pick the look that suits your household under **Settings → Appearance**. Both designs share the Meadow, Slate and Sunset themes, and each works in light and dark. Both phones below are the real card.

<div class="slm-two">
  <figure>
    <PhoneFrame ui="fresh" theme="meadow" mode="light" />
    <figcaption><b>Fresh</b>Soft cards, a progress summary and a stepper on every row. Starts light.</figcaption>
  </figure>
  <figure class="dark">
    <PhoneFrame ui="compact" theme="slate" mode="dark" />
    <figcaption><b>Compact</b>Dense checkbox rows, collapsible categories and a running total. Starts dark.</figcaption>
  </figure>
</div>

[Change the design, theme and colour mode in the live demo →](/demo)

## Install in about five minutes {#install}

<div class="slm-steps">
<div>

### Add the integration
In HACS, add the integration, download it and restart Home Assistant.

```text
thekiwismarthome/shopping-list-manager
```

</div>
<div>

### Set it up
Go to **Settings → Devices & services → Add integration** and search for **Shopping List Manager**.

</div>
<div>

### Add the card
Install the card from HACS, then choose **Shopping List Manager** from the Add card list on any dashboard.

```yaml
type: custom:shopping-list-manager-card
```

</div>
</div>

The [getting started guide](/guide/getting-started) has the details and one-click HACS links.

## User manual {#manual}

<div class="slm-links">
  <a href="guide/getting-started"><b>Getting started</b><span>Install, first list, adding the card to a dashboard.</span></a>
  <a href="guide/lists"><b>Lists</b><span>Create, switch, share and keep lists private.</span></a>
  <a href="guide/loyalty-cards"><b>Loyalty cards</b><span>Add a barcode and show it at the checkout.</span></a>
  <a href="guide/appearance"><b>Appearance</b><span>Designs, themes, colour mode and fonts.</span></a>
</div>
