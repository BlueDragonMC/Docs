---
title: FireworkRocketModule
---

`FireworkRocketModule` adds the corresponding particles and sounds to firework rockets. It can also let rockets boost players gliding with elytra, like in vanilla.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.vanilla.FireworkRocketModule
```

Use the module in your game's `initialize` function:

```kotlin
use(FireworkRocketModule(boostElytra = true))
```

If `boostElytra` is `true`, gliding players can use a firework rocket for a speed boost.
