---
title: CustomDeathMessageModule
---

`CustomDeathMessageModule` replaces the default death message with one that describes the cause of death, such as a player, mob, arrow, fall, or the void. Deaths outside of the `INGAME` state do not produce a message.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.combat.CustomDeathMessageModule
```

Use the module in your game's `initialize` function:

```kotlin
use(CustomDeathMessageModule())
```
