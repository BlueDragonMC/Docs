---
title: MapProviderModule
---

`MapProviderModule` provides an [`InstanceContainer`](https://wiki.minestom.net/world/instances#instancecontainer) for [instance modules](../instancemodule) to clone.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.map.MapProviderModule
```

Use the module in your game's `initialize` function:

```kotlin
// data is the GameData reference passed to your game's constructor
use(MapProviderModule(data.mapSource))
```

The map source object comes from the queue, which finds a suitable map for the game, game mode, and players. Anvil and [Polar](https://github.com/hollow-cube/polar) maps are currently supported.

Once you use `SharedInstanceModule` or `InstanceContainerModule`, they will use the map given to `MapProviderModule`.
