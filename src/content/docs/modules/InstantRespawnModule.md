---
title: InstantRespawnModule
---

`InstantRespawnModule` automatically respawns players after they die. The module cannot be configured in any way. The player's respawn position is obtained from a PlayerRespawnEvent (if you use [SpawnpointModule](../spawnpointmodule), the player will respawn at their designated spawnpoint).

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.gameplay.InstantRespawnModule
```
Use the module in your game's `initialize` function:
```kotlin
use(InstantRespawnModule())
```