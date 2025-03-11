---
title: InventoryPermissionsModule
---

`InventoryPermissionsModule` manages the player's ability to edit their inventory in a variety of ways.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.gameplay.InventoryPermissionsModule
```
Use the module in your game's `initialize` function:
```kotlin
use(InventoryPermissionsModule(allowDropItem = false, allowMoveItem = false))
```

Now, the player's ability to edit their inventory will be restricted by the parameters:
- If `allowDropItem` is false, players will not be able to move items out of their inventories (e.g. by pressing Q on an item).
- If `allowMoveItem` is false, players will not be allowed to move items within their inventories.