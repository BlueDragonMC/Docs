---
title: AwardsModule
---

`AwardsModule` is used to give the player coins and XP as a reward for doing well in games. XP is actually just the total number of coins you have earned, so if you earn 100 coins, you earn 100 XP at the same time.

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.database.AwardsModule
```

Use the module in your game's `initialize` function:

```kotlin
use(AwardsModule())
```

### Custom Awards

Now, you can use the `awardCoins` method to give coins and XP to the player. This will also send them a message letting them know that they earned coins, and a level up screen if the new XP got them to the next level.

```kotlin
awardsModule.awardCoins(player, amount, reason)
```

### Post-Game Awards

With post-game awards, you can stack awards of a particular type and give all the coins after the game. Coins are given when the game ends, the player becomes a [spectator](../spectatormodule), or the player leaves the game.

```kotlin
awardsModule.awardCoinsAfterGame(player, amount, reason)
```

### Award for Winning

The [WinModule](../winmodule) used to have a feature to automatically award coins at the end of a game, but this has been removed. Instead, use WinnerDeclaredEvent:

```kotlin
handleEvent<WinnerDeclaredEvent> { event ->
    for (player in parent.players) {
        val winner = event.winningTeamPlayers.contains(player)
        val award = if (winner) winAward else lossAward
        awardsModule.awardCoins(player, award, if (winner) AwardsModule.AWARD_REASON_WIN else AwardsModule.AWARD_REASON_PARTICIPATION)
    }
}
```
