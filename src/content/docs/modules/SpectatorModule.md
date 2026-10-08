---
title: SpectatorModule
---

`SpectatorModule` is used to manage spectators in a game. Spectators are considered to be "out of the game", and are
generally not affected by events that occur inside the game. Many other modules use `SpectatorModule` to avoid taking
action on spectators.

## Parameters

- `spectateOnDeath`: If `true`, players become spectators when they die during a game.
- `spectateOnLeave`: If `true`, players who disconnect during a game are treated as spectators. Defaults to `true`.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.minigame.SpectatorModule
```

Use the module in your game's `initialize` function:

```kotlin
use(SpectatorModule(spectateOnDeath = true))
```

Call `addSpectator(player)` and `removeSpectator(player)` to change a player's spectator status, or
`isSpectating(player)` to check it.
