---
title: WorldPermissionsModule
---
`WorldPermissionsModule` can prevent the player from placing, breaking, or interacting with blocks in the world.

## Block Breaking
Two module parameters have an effect on players' abilities to break blocks.
- If `allowBlockBreak` is `false`, players will not be able to break any blocks (`PlayerBlockBreakEvent` will be cancelled).
- If `allowBreakMap` is `false`, players will not be able to break blocks that are included with the map (`PlayerBlockBreakEvent` will be cancelled). Any player-placed blocks will still be breakable as long as `allowBlockBreak` is not `false`.

## Block Placing
Two module parameters have an effect on players' abilities to place blocks.
- If `allowBlockPlace` is `false`, players will not be able to place any blocks (`PlayerBlockPlaceEvent` will be cancelled).
- If `allowBlockInteract` is `false`, players will not be able to place any blocks (`PlayerBlockInteractEvent` will be cancelled). 

## Block Interacting
- If `allowBlockInteract` is `false`, players will not be able to interact with any blocks (`PlayerBlockInteractEvent` will be cancelled).

## Block Exceptions
The module has an `exceptions` parameter, which is a list of blocks that will be completely ignored by the module. This means the module will not prevent players from placing, breaking, or interacting with any block on the exceptions list. BlueDragon uses this feature to allow beds to be broken in BedWars, even though the rest of the map cannot be removed.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.gameplay.gameplay.WorldPermissionsModule
```
Use the module in your game's `initialize` function:
```kotlin
use(WorldPermissionsModule(
    allowBlockBreak = false,
    allowBlockPlace = false,
    allowBlockInteract = false,
    allowBreakMap = false,
    exceptions = listOf(Block.OAK_PLANKS)
))
```
In this example, no blocks can be placed or broken, except oak planks.
## See Also
- If you're looking to restrict players' inventory management abilities, use [InventoryPermissionsModule](../inventorypermissionsmodule)