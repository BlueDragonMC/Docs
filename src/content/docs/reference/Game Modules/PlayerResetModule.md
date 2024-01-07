---
title: PlayerResetModule
---
`PlayerResetModule` changes some basic attributes about the player when they join the game, to avoid having changes to the player persist in between games.
> It is recommended to always use this module to ensure the player always starts in the same state.

## Effects
The module applies the following effects to the player upon joining the game
- Change game mode (if the `defaultGameMode` parameter is set)
- Clear inventory
- Reset health/hunger
- Reset movement speed
- Clear potion effects
- Disable flying
- Stop fire damage
- Disable glowing
- Reset XP
- Clear all tags

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.PlayerResetModule
```
Use the module in your game's `initialize` function:
```kotlin
use(PlayerResetModule(defaultGameMode = GameMode.ADVENTURE))
```
Now, when a player joins the game, the effects listed above will be applied to them. If you ever want to do this manually, you can use the `resetPlayer` method:
```kotlin
getModule<PlayerResetModule>().resetPlayer(player, gameMode)
```