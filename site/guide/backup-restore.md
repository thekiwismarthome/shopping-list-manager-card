---
title: Backup and restore
---

# Backup and restore

Find this under **Settings → FAQ & Support → Backup & Restore**.

## Export

Choose **Download backup** to save a JSON file with the lists you can see and the products you added yourself. Catalogue products are left out because they reload automatically. If you are an administrator the file holds every list. Anyone else only gets the lists they can see, so one household's backup never contains another's.

## Import

Choose **Choose backup file** and pick a backup. Your existing data is kept. Only lists and products that are missing are added, so importing never overwrites what you have. If you are not an administrator, the lists you import become yours and private, whatever the file says.

## When to back up

- Before you upgrade the integration or the card.
- Before you switch region.
- When you move to a new Home Assistant installation.

::: info Not included
The backup covers lists and your own products. Card appearance settings are saved with your Home Assistant user, so they do not need a backup.
:::
