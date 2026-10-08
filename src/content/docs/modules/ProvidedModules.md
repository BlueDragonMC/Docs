---
title: Provided Modules
---

`Game` automatically adds three modules to every game: `GameInfoModule`, `GameStateModule`, and `PlayerListModule`. They
expose the game's metadata, state, and players to other modules. You rarely need to interact with them directly.

Instead, `GameModule` provides convenience accessors that route to these modules. These accessors are the preferred way
to read this information, and they are how the rest of the module library uses these modules.

## Convenience Accessors

| Accessor   | Backed by          | Description                                                                               |
|------------|--------------------|-------------------------------------------------------------------------------------------|
| `players`  | `PlayerListModule` | The list of players in the game.                                                          |
| `audience` | `PlayerListModule` | The game's players as a `PacketGroupingAudience`, useful for sending packets or messages. |
| `state`    | `GameStateModule`  | The current `GameState`.                                                                  |
| `id`       | `GameInfoModule`   | The game's four-character Game ID.                                                        |
| `data`     | `GameInfoModule`   | The `GameData` passed to the game's constructor.                                          |

Because each accessor reads from a module, your module must declare a dependency on the module that backs it (with
`@DependsOn` or `@SoftDependsOn`) before using the accessor. For example:

```kotlin
@DependsOn(PlayerListModule::class, GameStateModule::class)
class MyModule : GameModule() {

    override fun initialize(parent: ModuleHolder, eventNode: EventNode<Event>) {
        eventNode.addListener(SomeEvent::class.java) {
            if (state == GameState.INGAME) {
                players.forEach { it.sendMessage(Component.text("Hello!")) }
            }
        }
    }
}
```

If you use these accessors without declaring a dependency, an exception will be thrown.

`Game` itself also exposes `id`, `data`, `players`, `state`, and `maxPlayers` directly, but modules should prefer the
accessors above so that dependencies stay explicit.

## GameInfoModule

Exposes immutable metadata about the game:

- `id`: The game's four-character [Game ID](/intro/games-servers-instances/#games).
- `data`: The [
  `GameData`](https://github.com/BlueDragonMC/Server/blob/main/common/src/main/kotlin/com/bluedragonmc/server/game/GameData.kt)
  passed to the game's constructor.
- `maxPlayers`: The maximum number of players allowed in the game.

## GameStateModule

Tracks the current game state and allows the game to be ended:

- `state`: The current `GameState` (`SERVER_STARTING`, `WAITING`, `STARTING`, `INGAME`, or `ENDING`).
- `endGame(queueAllPlayers: Boolean = true)`: Ends the game immediately. If `queueAllPlayers` is `true`, players are
  queued for a new game.
- `endGameLater(delay: Duration)`: Ends the game after the given delay.

## PlayerListModule

Exposes the players that belong to the game:

- `players`: The list of players in the game.
