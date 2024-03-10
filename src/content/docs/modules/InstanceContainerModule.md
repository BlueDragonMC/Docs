---
title: InstanceContainerModule
---

`InstanceContainerModule` is an implementation of [`InstanceModule`](../instancemodule/) that creates a single [`InstanceContainer`](https://wiki.minestom.net/world/instances#instancecontainer) for each game using a map loaded from an Anvil world.

## Dependencies
This module depends on the following modules:
- [AnvilFileMapProviderModule](../anvilfilemapprovidermodule)

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.instance.InstanceContainerModule
import com.bluedragonmc.server.module.map.AnvilFileMapProviderModule // dependency
```
Use the module in your game's `initialize` function:
```kotlin
use(AnvilFileMapProviderModule("games/$name/$mapName")) // This is how you specify the path to the world folder
use(InstanceContainerModule())
```