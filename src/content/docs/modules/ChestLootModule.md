---
title: ChestLootModule
---

`ChestLootModule` adds items to the inventory of a chest when it is first opened. It requires a `ChestLootProvider`,
which decides which items to place in a chest at a given location.

## Dependencies

This module depends on the following modules:

- [ChestModule](../chestmodule/) (has other dependencies)

## Providers

- `RandomLootProvider(items)`: Places each `WeightedItemStack` in the chest with the given chance, at a random free
  slot.
- `LocationBasedLootProvider { location -> provider }`: Delegates to a different provider based on the chest's location.
  Useful for giving chests in different parts of a map different loot.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.gameplay.ChestLootModule
```

Use the module in your game's `initialize` function:

```kotlin
use(
    ChestLootModule(
        ChestLootModule.RandomLootProvider(
            listOf(
                ChestLootModule.RandomLootProvider.WeightedItemStack(ItemStack.of(Material.DIAMOND), chance = 0.5f)
            )
        )
    )
)
```
