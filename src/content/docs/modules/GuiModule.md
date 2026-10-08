---
title: GuiModule
---

`GuiModule` is a library for creating GUIs with buttons that react to user input.

## Menus

A `Menu` is a reusable object representing an inventory-based menu. Menus can be created with `createMenu`:

```kotlin
guiModule.createMenu(
    title = Component.text("My Menu"),
    inventoryType = InventoryType.CHEST_6_ROW,
    // if true, each player who opens the menu will get their own set of items
    isPerPlayer = true,
    // if false, clicking an item in the menu while in spectator mode will have no effect
    allowSpectatorClicks = true,
) {
    // items builder block
}
```

Show the menu with `menu.open(player)`.

### Items Builder

Inside the items builder block, you can dynamically slot items as needed:

```kotlin
slot(9, Material.STONE, { player ->
    // This block is an ItemStack builder. Here is where you set the item's metadata.
    // If using the player object here, be sure to make the menu per-player!
    set(DataComponents.ITEM_NAME, Component.text("Hello, ${player.username}!"))
}) {
    // This block is the action that will be triggered when the slot is clicked.
    // It receives a `SlotClickEvent`.
    menu.close(player)
}

// More slots can be registered exactly the same way using the `slot` method.
```

`GuiModule` exposes a number of methods inside the items builder block, including:

- `slot`: creates a standard slot with an item that cannot be picked up by the player.
- `clickableSlot`: creates a slot with an item that can be picked up by the player. Useful for creating lootable inventories or custom storage menus.
- `border`: creates a border around the inventory by setting slots in the first and last columns and rows of the menu.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.GuiModule
```

Use the module in your game's `initialize` function.

```kotlin
use(GuiModule())
```
