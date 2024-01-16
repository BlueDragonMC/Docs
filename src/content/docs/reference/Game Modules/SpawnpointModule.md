---
title: SpawnpointModule
---
`SpawnpointModule` controls where players are teleported when they first join the game or die and respawn. It uses the `SpawnpointProvider` interface to allow games to define their own behavior for setting the spawnpoints of players. 

## SpawnpointProvider
`SpawnpointProvider` is an interface that allows the module to determine where players should spawn.
### Public Methods
#### `initialize`
```kotlin
fun initialize(game: Game)
```
Called when the spawnpoint module is loaded by the given `game`.

#### `getSpawnpoint`
```kotlin
fun getSpawnpoint(player: Player): Pos
```
Returns the given player's spawnpoint. This function is typically called right before a player is going to spawn, and the return value is not cached by `SpawnpointModule` between spawns.

#### `getAllSpawnpoints`
```kotlin
fun getAllSpawnpoints(): List<Pos>
```
Returns a list of every place a player could spawn.

### Implementations
These implementations are supplied by BlueDragon, but you can always create your own if necessary.
#### `TestSpawnpointProvider`
```kotlin
class TestSpawnpointProvider(private vararg val spawns: Pos) : SpawnpointProvider
```
Spawns players sequentially at the positions provided in the constructor.

#### `SingleSpawnpointProvider`
```kotlin
class SingleSpawnpointProvider(private val spawn: Pos) : SpawnpointProvider
```
Spawns all players at a single location.

#### `ConfigSpawnpointProvider`
```kotlin
class ConfigSpawnpointProvider(private val allowRandomOrder: Boolean = true) : SpawnpointProvider
```
Gets spawnpoints from the `world.spawnpoints` configuration node. If `allowRandomOrder` is `false`, players will be spawned in the order of the spawnpoints in the config file. Otherwise, players will be spawned in a random order, but no spawnpoint will be used twice until all locations have been used. [ConfigModule](../configmodule/) is required to use this provider.

#### `TeamConfigSpawnpointProvider`
```kotlin
class TeamConfigSpawnpointProvider(private val allowRandomOrder: Boolean = false) : SpawnpointProvider
```
Gets spawnpoints from the `world.spawnpoints` configuration node. One spawnpoint is assigned to each team. All players on a given team will spawn in the same location. If a player's spawnpoint is required, and they are not on a team yet, they will be spawned at the first spawnpoint in the database. If they are on a team, they will be given their team's spawnpoint. If `allowRandomOrder` is `false`, team spawnpoints will be assigned in the order of the spawnpoints in the config file. Otherwise, teams will be spawned in a random order, but no spawnpoint will be used twice until all locations have been used. [ConfigModule](../configmodule) and [TeamModule](../teammodule) are required to use this provider.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.SpawnpointModule
```
Use the module in your game's `initialize` function:
```kotlin
val mySpawnpointProvider = SpawnpointModule.TestSpawnpointProvider(Pos(0.0, 64.0, 0.0))
use(SpawnpointModule(spawnpointProvider = mySpawnpointProvider))
```

If you need to get the spawnpoint for a specific player, use the spawnpoint provider:
```kotlin
getModule<SpawnpointModule>().spawnpointProvider.getSpawnpoint(player)
```