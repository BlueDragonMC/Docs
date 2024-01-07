---
title: OldCombatModule
---
`OldCombatModule` is a reimplementation of Minecraft combat features. It handles damage and knockback similar to vanilla Minecraft. It does not include most of the newer 1.9+ combat mechanics, such as shields and the attack cooldown. However, it does include the increased axe damage found in newer versions.

## Parameters
- `allowDamage`: Set to `false` to make all hits deal no damage.
- `allowKnockback`: Set to `false` to make all hits deal no knockback.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.combat.OldCombatModule
```
In your game's `initialize` function, include the module like this:
```kotlin
use(OldCombatModule(allowDamage = true, allowKnockback = true))
```
Combat will be enabled once the module is used.