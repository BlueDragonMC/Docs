---
title: MOTDModule
---
`MOTDModule` sends a message to players when they join the game. This message includes the name of the game, a brief overview of how to play, and some information about the current map.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.MOTDModule
```
Use the module in your game's `initialize` function:
```kotlin
use(MOTDModule(motd = Component.text("Test MOTD!"), showMapName = true))
```
This will display the following to players who join the game:
```
=================================
Game Name
Test MOTD!
Map: Map Name by Author
=================================
```
Hovering over the map name will show a description of the map.

Note: [ConfigModule](../configmodule/) is required to show map data. The nodes `world.name`, `world.author`, and `world.description` should be set.