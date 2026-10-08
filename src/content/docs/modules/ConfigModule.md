---
title: ConfigModule
---

`ConfigModule` loads game configuration from `.yml` files. Configuration data can be loaded from both the game's JAR
file and the map folder, and files in `/etc/config/` override files with the same name inside the JAR. This way, it is
possible to change in-game values based on the map.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.config.ConfigModule
```

Use the module in your game's `initialize` function:

```kotlin
// Loads config.yml from the game's JAR and the map folder
use(ConfigModule())

// Or specify a custom file name and/or map source
use(ConfigModule(configFileName = "mygame.yml", mapSource = data.mapSource))
```

The `mapSource` defaults to the game's map, so you usually only need to set `configFileName` when you want a config file
other than `config.yml`.

Call `getConfig()` to access the loaded configuration. You can also call `registerSerializer` before `getConfig()` is
first invoked to add support for a custom type.
