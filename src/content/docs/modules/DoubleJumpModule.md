---
title: DoubleJumpModule
---

`DoubleJumpModule` allows players to double-jump.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.gameplay.DoubleJumpModule
```

Use the module in your game's `initialize` function:

```kotlin
use(DoubleJumpModule(
    strength = 25.0,
    pitchInfluence = 0.08,
    verticalStrength = 10.0,
    cooldownMillis = 0
))
```

The module accepts the following parameters:

- `strength`: a multiplier for the horizontal velocity added during a double-jump.
- `pitchInfluence`: the extent to which the player's pitch direction affects the vertical velocity added during a double-jump. Only upward pitch will affect the velocity.
- `verticalStrength`: the base vertical velocity added during a double-jump.
- `cooldownMillis`: how long after starting a double-jump a player will have to wait before starting another. If greater than 0, the cooldown will be displayed in the player's action bar.
