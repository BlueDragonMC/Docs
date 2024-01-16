---
title: VoidDeathModule
---
`VoidDeathModule` automatically kills players when they go below a certain y-coordinate.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.VoidDeathModule
```
Use the module in your game's `initialize` function:
```kotlin
use(VoidDeathModule(threshold = 32.0, respawnMode = false))
```

The `threshold` parameter controls the minimum height required to activate the module. When the y-component of any player's position goes below this value, the player will be killed or respawned.

When the `respawnMode` parameter is set to true, the module will not actually kill the player. Instead, it will teleport the player to their spawnpoint, call `player.respawn()`, and call a `PlayerDeathEvent` for the player. Set this to `false` if you are also using a module that instantly respawns the player, such as [PlayerRespawnModule](../playerrespawnmodule). Set this to `true` if you want to teleport them back to spawn without displaying the respawn screen or using other modules to hide this screen.