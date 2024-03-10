---
title: NaturalRegenerationModule
---
`NaturalRegenerationModule` restores a player's health by 0.5 (1 heart) every second when they have not been in combat for at least 15 seconds. A player's combat status is determined by the time elapsed since an `OldCombatModule.PlayerAttackEvent` was called with the player as the `attacker` or the `target`. [OldCombatModule](../oldcombatmodule/) is not required for this module to work, but it is currently the only official module that calls `PlayerAttackEvent`.

**Unlike in vanilla, this module does not use hunger to determine regeneration, only combat status.**

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.NaturalRegenerationModule
```
Use the module in your game's `initialize` function:
```kotlin
use(NaturalRegenerationModule())
```