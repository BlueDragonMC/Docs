---
title: SharedInstanceModule
---

`SharedInstanceModule` is an implementation of [`InstanceModule`](../instancemodule/) that creates a single [`SharedInstance`](https://wiki.minestom.net/world/instances#sharedinstance) for each game. All instances on the same map of a game with this module will share the same block data, resulting in reduced memory usage compared to other instance modules.

:::caution
Changes to the map made in SharedInstances will also apply to all other SharedInstances using the same map. If the map can be modified in any way during gameplay, use [InstanceContainerModule](../instancecontainermodule) instead.
:::

## Dependencies

This module depends on the following modules:

- [MapProviderModule](../mapprovidermodule)

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.instance.SharedInstanceModule
import com.bluedragonmc.server.module.map.MapProviderModule // dependency
```

Use the module in your game's `initialize` function:

```kotlin
use(MapProviderModule(data.mapSource)) // This is how you specify map location - see MapProviderModule docs for more info
use(SharedInstanceModule())
```
