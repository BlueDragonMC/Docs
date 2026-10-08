---
title: WinModule
---

`WinModule` handles the win celebration that takes place at the end of every minigame. All of BlueDragon's minigames use it to handle the postgame state.

## Declaring a Winner

The winner is given by a list of players and a display name (might be a team or player name). When a winner is declared, the following things happen:

- A cancellable `WinnerDeclaredEvent` is fired. If the event is cancelled, nothing else on this list will happen.
- A "VICTORY" title is displayed to all members of the winning team
- A "GAME OVER!" title is displayed to everyone else
- The name of the winning team is shown in chat
- A firework show lights up the sky
- The game is scheduled to end in 5 seconds

`WinModule` will automatically declare a winner when the selected [win condition](#win-conditions) is satisfied. If you need to declare the winner manually, use one of these methods:

```kotlin
// Manually specify the display name and player list
declareWinner(winningTeamName: Component, winningTeamPlayers: Collection<Player>)

// Declare a single player as the winner
declareWinner(player: Player)

// Declare an entire team as the winner
declareWinner(team: TeamModule.Team)
```

## Win Conditions

- `MANUAL`: The `WinModule` will never automatically declare a winner. In your game, use the `declareWinner` method to manually declare the winner.
- `LAST_PLAYER_ALIVE`: When there is exactly one player in the game who is not a spectator, they will be declared the winner. Suitable for solo deathmatch games like BlueDragon's WackyMaze. [SpectatorModule](../spectatormodule/) is required for this win condition to work.
- `LAST_TEAM_ALIVE`: When there is exactly one team in the game that has at least one player who is not a spectator, that team will be declared the winner. Suitable for team deathmatch games like BlueDragon's SkyWars. [SpectatorModule](../spectatormodule/) and [TeamModule](../teammodule/) are both required for this win condition to work.

Regardless of the win condition chosen, the win celebration waits 5 seconds before ending the game.

## Scores and Rankings

When the game ends, `WinModule` announces the top three competitors. How they are ranked is controlled by the `ranking` parameter (which defaults to `AUTOMATIC`), and can use survival order, reported scores, or nothing at all.

To rank by score, report scores as the game progresses:

```kotlin
use(WinModule(winCondition = WinModule.WinCondition.MANUAL, scoreThreshold = 10.0))
// ...
getModule<WinModule>().reportScore(player, 5.0)
```

- `reportScore(competitor, value)` records a competitor's current score.
- `reportElimination(competitor)` records that a competitor was eliminated. Later eliminations rank better.
- `getStandings()` returns the current standings, ordered from best to worst.
- If `scoreThreshold` is set, the game is automatically won once a competitor reaches it.

Both `reportScore` and `reportElimination` accept a `Player`, a `TeamModule.Team`, or a `Competitor` directly. The `tieWindow` parameter controls how close together two events must be to count as a tie.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.minigame.win.WinModule
```

Use the module in your game's `initialize` function:

```kotlin
use(WinModule(winCondition = WinModule.WinCondition.MANUAL))
```

The module will do nothing until it detects that the win condition is met or the winner is manually declared.
