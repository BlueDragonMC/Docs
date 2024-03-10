---
title: MaxHealthModule
---
`MaxHealthModule` sets the max health attribute of all players when they join the game, and resets it when they leave. BlueDragon uses this module to limit the health available in FastFall.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.gameplay.MaxHealthModule
```
Use the module in your game's `initialize` function:
```kotlin
// sets the max health of all players to 2.0, which is equal to 1 heart
use(MaxHealthModule(maxHealth = 2f))
```