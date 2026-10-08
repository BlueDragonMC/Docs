---
title: PickItemModule
---

`PickItemModule` enables the vanilla "pick block" action (middle click). It selects a matching block from the player's inventory, or creates one in creative mode. It also preserves block entity data (such as chest contents) when a block is placed.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.vanilla.PickItemModule
```

Use the module in your game's `initialize` function:

```kotlin
use(PickItemModule())
```
