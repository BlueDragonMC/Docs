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
getModule<AwardsModule>().awardCoins(player, amount, reason)
```

### Award for Winning
The [WinModule](../winmodule/#coin-awards) has a feature to automatically award coins at the end of a game. You still need to use `AwardsModule` for this feature to work.