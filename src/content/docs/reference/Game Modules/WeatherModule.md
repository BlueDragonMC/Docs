---
title: WeatherModule
---
`WeatherModule` reimplements the vanilla behavior of per-instance weather. It **does not** implement automatically changing weather, but the weather can be manually set for each instance.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.WeatherModule
```
Use the module in your game's `initialize` function:
```kotlin
use(WeatherModule(globalRaining = false))
```

Now, you can use `setRaining` to set the weather for a specific instance:
```kotlin
getModule<WeatherModule>().setRaining(instance, true)
```

Alternatively, you can change the value of `globalRaining`:
```kotlin
getModule<WeatherModule>().setRaining(true) // sets globalRaining to true
```

If `globalRaining` is `true`, it will always be raining for all players in your game, regardless of which instance they are in. If `globalRaining` is `false`, the current weather is determined based on the instance the player is in.