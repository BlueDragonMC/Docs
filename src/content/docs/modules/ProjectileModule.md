---
title: ProjectileModule
---

`ProjectileModule` reimplements vanilla projectile behavior: bows and arrows, snowballs, eggs, fire charges, and ender
pearls, including the corresponding knockback and damage. It integrates with [OldCombatModule](../oldcombatmodule/)
and [ItemDropModule](../itemdropmodule/) when they are present.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.combat.ProjectileModule
```

Use the module in your game's `initialize` function:

```kotlin
use(ProjectileModule())
```
