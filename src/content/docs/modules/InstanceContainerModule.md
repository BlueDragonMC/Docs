---
title: InstanceContainerModule
---

`InstanceContainerModule` is an implementation of [`InstanceModule`](../instancemodule/) that creates a single [`InstanceContainer`](https://wiki.minestom.net/world/instances#instancecontainer) for each game using a map loaded by [`MapProviderModule`](../mapprovidermodule).

## Dependencies

This module depends on the following modules:

- [MapProviderModule](../mapprovidermodule)

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.instance.InstanceContainerModule
import com.bluedragonmc.server.module.map.MapProviderModule // dependency
```

Use the module in your game's `initialize` function:

```kotlin
use(MapProviderModule(data.mapSource)) // This is how you specify map location - see MapProviderModule docs for more info
use(InstanceContainerModule())
```
