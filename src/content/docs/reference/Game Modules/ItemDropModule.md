---
title: ItemDropModule
---
By default, Minestom allows players to use the drop action to remove items from their inventory, but these items do not appear on the ground. Additionally, players can break blocks, but they do not get the blocks back. `ItemDropModule` reimplements a few vanilla behaviors:
- When a player drops an item, an item entity will spawn in front of them
- When a player breaks a block, an item entity will spawn where the block was (optional, specified by `dropBlocksOnBreak` parameter)
- When a player dies, an item entity will spawn on the ground for each of their items (optional, specified by `dropAllOnDeath` parameter)

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.ItemDropModule
```
Use the module in your game's `initialize` function:
```kotlin
use(ItemDropModule(dropBlocksOnBreak = true, dropAllOnDeath = true))
```

If `dropBlocksOnBreak` is true, an item entity will spawn whenever a player breaks a block. If `dropAllOnDeath` is true, a player's entire inventory will be dropped when they die.

## See Also
- If you're looking to prevent players from removing items from their inventory, use [InventoryPermissionsModule](../inventorypermissionsmodule)
- If you're looking to allow players to pick up items from the ground, use [ItemPickupModule](../itempickupmodule)