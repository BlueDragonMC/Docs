---
title: VoteStartModule
---
`VoteStartModule` allows the players waiting in a game to choose when it starts. Upon joining, players' hotbars are automatically filled with items that, when interacted with, register the player's vote. Once at least half the players have voted, and the minimum player count is met, a countdown begins. If either of these conditions stops being met during the countdown, it is canceled. When the countdown reaches 0, the module will call `GameStartEvent`, change the game state to `INGAME`, and display a "GO!" title on the screen.

:::caution
This module is a replacement for [CountdownModule](../countdownmodule) and they should not be used together.
:::

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.VoteStartModule
```
Use the module in your game's `initialize` function:
```kotlin
use(VoteStartModule(minPlayers = 2, countdownSeconds = 5))
```
To check if a player has voted to start, use `hasVoted`:
```kotlin
if (getModule<VoteStartModule>().hasVoted(player)) {
    player.sendMessage("You have already voted for the game to start!")
}
```