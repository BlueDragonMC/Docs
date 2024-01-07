---
title: FallDamageModule
---
`FallDamageModule` implements fall damage, similar to what you would see on a vanilla server.

## Fall Damage Reduction
Certain blocks reduce the amount of fall damage the player takes if they land on them:
- Hay and honey blocks reduce fall damage by 20%
- Beds reduce fall damage by 50%
- Sweet berry bushes and cobwebs negate all fall damage
- Slime blocks negate all fall damage if the player is not sneaking

Certain armor enchantments further reduce fall damage:
- Feather falling reduces fall damage by 12% per level
- Protection reduces fall damage by 4% per level

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.FallDamageModule
```
Use the module in your game's `initialize` function:
```kotlin
use(FallDamageModule())
```
Fall damage will be active as long as the module is in use.