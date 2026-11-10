---
title: Supermarkets
---

# Supermarkets

Save the shops you use, with an address or coordinates. Nothing in the card acts on them yet. They are kept so that Home Assistant automations can use them later, for example to remind you of your list when you arrive at the shop.

Find this under **Settings → Supermarkets**.

## Add a supermarket

1. Press **Add a supermarket**.
2. Pick a **chain** from the list for your region, or leave the chain alone and type any name. Choosing a chain fills in the name. Press the chain again to type your own name, such as *PAK'nSAVE Albany*.
3. Let the card **find it for you** (see below), or type the **address** and **coordinates** yourself. Both coordinates are needed together: latitude (-90 to 90) and longitude (-180 to 180).
4. Press **Save**.

## Find it on the map

Under **Find it on the map** you can search for the shop instead of typing its address.

- **By name and place.** Pick the chain, then type the suburb or town (*Glen Innes*). Or type both in one go, such as *PAK'nSAVE Glen Innes*, and press **Search**. Tap a result to fill in the name, address and coordinates.
- **The closest one.** Press **Find the closest to me** (or **Find the closest PAK'nSAVE** when a chain is picked). The shops come back nearest first, with how far away each is.

Searches use [OpenStreetMap](https://www.openstreetmap.org/) and go through your Home Assistant, which sends only what you typed and the chain you picked. The shop list is only as complete as OpenStreetMap, so if a shop is missing, type its details by hand.

## Using your location

**Find the closest to me** and **Use my current location** (under the coordinates) both **ask first**. A box explains what the location is used for, and nothing happens until you press **Allow**. **Not now** closes it. Once you have allowed it, the card does not ask again until you leave the Supermarkets page.

Where the position comes from:

1. **This device**, when the page is on a secure (HTTPS) address. Your browser or app may ask for its own permission too.
2. **Your phone, through Home Assistant.** On an address that is not HTTPS, such as `http://homeassistant.local:8123`, browsers will not share the location. If you use the Home Assistant app on your phone and it is linked to your **person**, the card uses the last position the app sent. Make sure the app has location access and your person has your phone as a device tracker.
3. **Your home location**, as a last resort. If neither works, a button offers the home location from Home Assistant's settings.

The position is only used for the search. It is sent to the map search, and it is not saved. Only the coordinates you choose to save with a supermarket are kept.

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
