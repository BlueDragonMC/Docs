---
title: WinModule
---
`WinModule` handles the win celebration that takes place at the end of every minigame. All of BlueDragon's minigames use it to handle the postgame state.

## Declaring a Winner
Winners are always represented as teams. The winning team's name is shown in the chat, and the players on the team will receive a "VICTORY" title instead of a "GAME OVER!" title. While the `TeamModule.Team` data structure is used to store the team name and player list, `TeamModule` is not actually required to declare a winner.

When a winning team is declared, the following things happen:
- A cancellable `WinnerDeclaredEvent` is fired. If the event is cancelled, nothing else on this list will happen.
- A "VICTORY" title is displayed to all members of the winning team
- A "GAME OVER!" title is displayed to everyone else
- The name of the winning team is shown in chat
- Coins are [awarded](#awards) to players
- A firework show lights up the sky
- The game is scheduled to end in 5 seconds

`WinModule` will automatically declare a winner when the selected [win condition](#win-conditions) is satisfied. If you need to declare the winner manually, use the `declareWinner` method:

```kotlin
val team = TeamModule.Team(name = ..., players = ...)
getModule<WinModule>().declareWinner(team)
```

If you only need one player to be the winner, you can use this overload:
```kotlin
getModule<WinModule>().declareWinner(player)
```
Note that this method is identical to calling the other function like this:
```kotlin
getModule<WinModule>().declareWinner(TeamModule.Team(name = player.name, players = mutableListOf(player)))
```

## Win Conditions
- `MANUAL`: The `WinModule` will never automatically declare a winner. In your game, use the `declareWinner` method to manually declare the winner.
- `LAST_PLAYER_ALIVE`: When there is exactly one player in the game who is not a spectator, they will be declared the winner. Suitable for solo deathmatch games like BlueDragon's WackyMaze. [SpectatorModule](../spectatormodule/) is required for this win condition to work.
- `LAST_TEAM_ALIVE`: When there is exactly one team in the game that has at least one player who is not a spectator, that team will be declared the winner. Suitable for team deathmatch games like BlueDragon's SkyWars. [SpectatorModule](../spectatormodule/) and [TeamModule](../teammodule/) are both required for this win condition to work.

Regardless of the win condition chosen, the `declareWinner` method will always end the game immediately.

## Coin Awards
> Note: this feature requires [AwardsModule](../awardsmodule/) to work.

One of `WinModule`'s parameters is the `coinAwardsFunction`. This function is called for each player when a winner is declared, and is used to determine how many coins should be given to the player. It has two parameters:
- The player that is currently receiving coins.
- The team that won the game.

The most common use of this function is to award a large amount of coins to the winner and a small amount of coins to everyone else. See the [Usage](#usage) section below for a sample implementation.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.WinModule
```
Use the module in your game's `initialize` function:
```kotlin
use(
    WinModule(winCondition = WinModule.WinCondition.MANUAL) { player, winningTeam ->
        // Sample coin awards function - gives 100 coins to the winners, 10 coins to everyone else
        if (winningTeam.getPlayers().contains(player)) 100 else 10
    }
)
```
The module will do nothing until it detects that the win condition is met or the winner is manually declared.