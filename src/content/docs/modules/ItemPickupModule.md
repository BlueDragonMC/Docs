---
title: ItemPickupModule
---
`ItemPickupModule` adds items to players' inventories when the pick up items from the ground. It listens for `PickupItemEvent`, which is automatically called by Minestom when a player walks over an item. The module cancels the event if the player is in spectator mode.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.ItemPickupModule
```
Use the module in your game's `initialize` function:
```kotlin
use(ItemPickupModule())
```

## See Also
- If you're looking to allow players to drop items onto the ground, see [ItemDropModule](../itemdropmodule/)