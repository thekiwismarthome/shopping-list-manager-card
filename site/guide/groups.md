---
title: Households and groups
---

# Households and groups

Groups let several households use one Home Assistant without seeing each other's lists. You might run your own household, and your mum and brother each have theirs. Everyone has their own lists and loyalty cards, and you can share a list with another household or with one person when you want to.

::: info What you need
Each person needs their own Home Assistant **user** (**Settings → People → Users**), and a way to reach your Home Assistant from outside your home, such as Nabu Casa or a VPN. Make them **normal users**, not administrators, because an administrator can see everything.
:::

## How it works

- A **group** is a household: a name and the people in it.
- A list or loyalty card **belongs to** the person who made it, and usually to one of their groups too. Everyone in that group can see it and work in it.
- You can also **share** a list or card with other groups, or with individual people.
- Anything not in a group and not shared stays **private** to the person who made it.
- Only the owner (or an administrator) can rename, delete or change the sharing of a list or card.

The product catalogue and categories stay shared by everyone, so a product someone adds is available to all.

## Set it up (administrators)

1. Open **Settings → Groups**. The row only appears if you are an administrator.
2. Add a group for each household, for example *Our house* and *Mum's house*.
3. Press **Choose people** on each group and tick who belongs to it. Someone can be in more than one group.

### Move your existing lists

Lists and cards made before groups existed were visible to every user. Once you have a group, a notice at the top of **Settings → Groups** counts them and offers **Move them**. Pick your household's group and press the button. They become yours and your household's, and nobody else can see them.

Lists you made as **Private** are not affected. They stay private to you.

## Making a list or card

When you make a new list or loyalty card, a **Who can see it** choice replaces the Private switch:

| Choice | Who sees it |
|---|---|
| Your household's name | Everyone in that group. This is the starting choice if you are in a group. |
| **Only me** | Only you, and anyone you add later. |
| **Everyone** | Every user on this Home Assistant. Only administrators see this choice once groups exist. |

If you are in more than one group, each one is listed.

## Share with another household or person

Open the three-dot menu on a list and choose **Manage members**. For a loyalty card, use its menu in the same way.

- **Households** lists every other group. Tick one and all of its people can see the list.
- **People** lists individual users. Tick someone to add just them.

Your own household is already included, and the dialog says so. Untick a group or person to stop sharing. They lose access straight away.

A small group icon on a list marks one that belongs to a household or is shared with one. Hold the pointer over it to see which.

## Changing a group

- **Rename** or **delete** a group with the pencil and bin buttons.
- **Remove someone** by unticking them under **Choose people**. They stop seeing that household's lists.
- A group that still **owns** lists or cards cannot be deleted. The message says how many. Move or delete them first.
- Deleting a group that others were only *shared* with simply stops that sharing.

## What people can and cannot see

| | Normal user | Administrator |
|---|---|---|
| Lists and cards in their own groups | Yes | Yes |
| Lists and cards shared with them | Yes | Yes |
| Other households' lists and cards | No | **Yes** |
| Names of other groups | Yes, so they can share with one | Yes |
| Members of other groups | No | Yes |
| Create, rename or delete groups | No | Yes |

::: warning Administrators see everything
The data is stored on your Home Assistant, and an administrator can always read it. Only give administrator rights to people you trust with everything, and tell your family that you can see their lists.
:::

Live updates follow the same rules. Someone only gets updates for lists they can see.

## Backup

A normal user's [backup file](backup-restore) only contains the lists they can see. An administrator's backup contains everything. When a normal user restores a file, every list in it becomes theirs and private, so a backup can never be used to get into someone else's list.
