---
title: InstanceTimeModule
---

`InstanceTimeModule` sets the time of day in each instance that belongs to the parent Game. The time is loaded from the [configuration](../configmodule), with a default value in case the time was not specified in the config.

## Dependencies
This module depends on the following modules:
- [ConfigModule](../configmodule/)

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.instance.InstanceTimeModule
```
Use the module in your game's `initialize` function:
```kotlin
use(InstanceTimeModule(default = 12000))
```

Now, the time will be locked to the value of the configuration node `world.time`, or `12000` if the value is not set.