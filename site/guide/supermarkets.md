---
title: Supermarkets
---

# Supermarkets

Save the shops you use, with an address or coordinates. Nothing in the card acts on them yet. They are kept so that Home Assistant automations can use them later, for example to remind you of your list when you arrive at the shop.

Find this under **Settings → Supermarkets**.

## Add a supermarket

1. Press **Add a supermarket**.
2. Pick a **chain** from the list for your region, or leave the chain alone and type any name. Choosing a chain fills in the name. Press the chain again to type your own name, such as *PAK'nSAVE Albany*.
3. Add the **address**, the **coordinates**, or both. Both coordinates are needed together: latitude (-90 to 90) and longitude (-180 to 180).
4. Press **Use my current location** while you are standing in the shop to fill the coordinates in. Your browser asks for permission, and it only works over a secure (HTTPS) connection.
5. Press **Save**.

You can add the same chain more than once, for example your two nearest branches.

## The chains

The card knows the main supermarkets for each built-in region:

| Region | Chains |
|---|---|
| New Zealand | PAK'nSAVE, Woolworths, New World, Four Square, SuperValue, Fresh Choice, Farro Fresh, Costco, Gilmours, Bin Inn, Moore Wilson's, Night 'n Day |
| Australia | Woolworths, Coles, ALDI, IGA, Costco, Harris Farm Markets, Foodland, Drakes |
| United Kingdom | Tesco, Sainsbury's, Asda, Morrisons, Aldi, Lidl, Waitrose, Marks & Spencer, Co-op, Iceland, Ocado, Booths |
| United States | Walmart, Kroger, Costco, Target, Safeway, Publix, Albertsons, Whole Foods Market, Trader Joe's, ALDI, Wegmans, H-E-B, Meijer, Sam's Club |
| Canada | Loblaws, Sobeys, Metro, No Frills, Real Canadian Superstore, Costco, Walmart, Safeway, Save-On-Foods, FreshCo, Food Basics, T&T Supermarket |
| Belgium | Colruyt, Delhaize, Carrefour, Aldi, Lidl, Albert Heijn, Okay, Spar, Intermarché |
| Spain | Mercadona, Carrefour, Lidl, Dia, Alcampo, Eroski, Aldi, El Corte Inglés, Consum, Hipercor, Ahorramas |
| France | Carrefour, E.Leclerc, Intermarché, Auchan, Lidl, Système U, Monoprix, Casino, Aldi, Picard, Franprix, Cora |

A custom region has no built-in chains, so just type the name of the shop. Is a shop missing from your region? Type its name. If you think it should be in the list, [open an issue](https://github.com/thekiwismarthome/shopping-list-manager/issues).

The same names are suggested when you type a **Store Name** for a [loyalty card](loyalty-cards).

## Who can see them

If you have [groups](groups) set up, a new supermarket starts in your household, so everyone in it sees the same shops. Choose **Only me** to keep it to yourself. Without groups, your supermarkets are private to you. Only the person who added a supermarket (or an administrator) can change or remove it.

## Change or remove one

Press the pencil to change the name, address or coordinates, or the bin to remove it. Swipe the form down to close it without saving.
