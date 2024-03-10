---
title: CustomGeneratorInstanceModule
---

`CustomGeneratorInstanceModule` is an implementation of [`InstanceModule`](../instancemodule/) that creates a single instance for each game that automatically generates chunks using a custom [world generator](https://wiki.minestom.net/world/generation).

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.instance.CustomGeneratorInstanceModule
```
Use the module in your game's `initialize` function:
```kotlin
// See Minestom documentation to learn more about world generators
val myGenerator = ...
use(CustomGeneratorInstanceModule(dimensionType = DimensionType.OVERWORLD, generator = myGenerator))
```

## Fullbright Dimension
BlueDragon provides a custom dimension type with global maximum lighting. You can obtain a reference to this dimension type with `CustomGeneratorInstanceModule.getFullbrightDimension()`.