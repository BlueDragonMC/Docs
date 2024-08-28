---
title: StatisticsModule
---

`StatisticsModule` can save and retrieve players' statistics and rank players based on their stats. Stats are saved in the database and are often ranked to create leaderboards. For testing purposes, you can use BlueDragon's [/leaderboard](../../reference/commands#leaderboard) command to view the top players for each statistic.

## StatRecorders
To provide maximum flexibility, statistics are recorded by separate **stat recorders**, which are automatically registered when `StatisticsModule` is initialized. For example, to start recording kills, all you have to do is use the module like this:

```kotlin
use(StatisticsModule(StatRecorders.PLAYER_KILLS))
```

Here is a full list of recorders included with BlueDragon's common library:

- `PLAYER_KILLS`: When a player kills another player, adds one to the attacker's "kills" statistic.
- `PLAYER_DEATHS_ALL`: When a player dies by any means, adds one to their "deaths" statistic.
- `PLAYER_DEATHS_BY_PLAYER`: When a player dies to another, adds one to their "deaths_by_player" statistic.
- `KILLS_AND_DEATHS`: Combines `PLAYER_KILLS`, `PLAYER_DEATHS_ALL`, and `PLAYER_DEATHS_BY_PLAYER`.
- `WINS_AND_LOSSES`: Records a "wins" and a "losses" statistic when a winner is declared.
- `ALL`: Combines all of the above recorders.

### Custom Statistics
It's also easy to record custom statistics using your own recorder. As a simple example, the `PLAYER_KILLS` recorder is defined like this:

```kotlin
val PLAYER_KILLS = StatisticsModule.EventStatisticRecorder(PlayerKillPlayerEvent::class.java) { game, event ->
    // See the "Saving Stats" section for other ways to record data
    incrementStatistic(event.attacker, getStatPrefix(game) + "_kills")
}
```

By changing the event type and the "_kills" suffix, you can record any type of event as it happens.

You can also combine multiple existing recorders using the `MultiStatisticRecorder`:

```kotlin
val KILLS_AND_DEATHS = StatisticsModule.MultiStatisticRecorder(PLAYER_KILLS, PLAYER_DEATHS_ALL, PLAYER_DEATHS_BY_PLAYER)
```

## Saving Stats

:::note
As a best practice, recording statistics should only be done from a [StatRecorder](#statrecorders).
:::

`StatisticsModule` provides several helper functions for storing stats in the database. All statistics are key-value pairs, where the values are stored as doubles for each player. The key should uniquely identify a type of statistic (e.g. WackyMaze kills), not a specific player.

```kotlin
// All statistics are key-value pairs.
recordStatistic(player: Player, key: String, value: Double)

// The mapper function receives the player's current value for the statistic and returns the new value.
recordStatistic(player: Player, key: String, mapper: Function<Double?, Double>)

// The statistic is only recorded if the predicate (which receives the statistic's current value) returns true.
recordStatistic(player: Player, key: String, value: Double, predicate: Predicate<Double?>)

// The new value is given by the mapper function AND the statistic is only recorded if the predicate (which receives the current and new values) returns true.
recordStatistic(player: Player, key: String, mapper: Function<Double?, Double>, predicate: BiPredicate<Double?, Double>)

// Increases the value of the given statistic by 1. If the statistic does not already exist for the player, it is set to 1.
incrementStatistic(player: Player, key: String)

// The statistic is only recorded if the new value is LESS THAN the current stored value (or if no value is currently stored).
recordStatisticIfLower(player: Player, key: String, newValue: Double, successCallback: Runnable? = null)

// The statistic is only recorded if the new value is GREATER THAN the current stored value (or if no value is currently stored).
recordStatisticIfGreater(player: Player, key: String, newValue: Double, successCallback: Runnable? = null)
```

By convention, keys for game-specific statistics start with `game_<game name>_`. You can easily create an accurate prefix using the helper method:
```kotlin
// `game` is a reference to a Game object
val kills_key = getStatPrefix(game) + "_wins" // "game_wackymaze_wins"
```

## Ranking
`StatisticsModule` also includes a function to retrieve the best players for a given statistic, ranked in order. Note that this is a blocking operation.
```kotlin
// OrderBy is an enum included in MongoDB's API
// The last parameter tells it to retrieve a maximum of 10 entries
val mostKills = getModule<StatisticsModule>().rankPlayersByStatistic("game_wackymaze_wins", OrderBy.DESC, 10)
var i = 1
for (pair in mostKills.entries) {
    println("${pair.key.username} is #${i++} for WackyMaze wins")
}
// ex4 is #1 for WackyMaze wins
// wsad_ is #2 for WackyMaze wins
// ...
```

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.database.StatisticsModule
```
Use the module in your game's `initialize` function:
```kotlin
use(StatisticsModule(StatRecorders.WINS_AND_LOSSES, StatRecorders.KILLS_AND_DEATHS))
```
Now, statistics will be saved to the database based on the given recorders.