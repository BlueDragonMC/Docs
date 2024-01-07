---
title: CountdownModule
---
`CountdownModule` provides a visual countdown that is automatically displayed before the game starts. All of BlueDragon's minigames use it to handle the pregame state. The countdown starts automatically when enough players have joined, and stops automatically if enough players leave during the countdown to go below the minimum threshold.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.CountdownModule
```
Use the module in your game's `initialize` function:
```kotlin
use(CountdownModule(threshold = 2, allowMoveDuringCountdown = true, countdownSeconds = 10))
```
Now, when the player count matches or exceeds the `threshold`, a countdown will automatically begin that lasts `countdownSeconds` seconds. If `allowMoveDuringCountdown` is `false`, players will not be able to move during the countdown, but they will still be able to look around.

When the countdown reaches 0, the module will call `GameStartEvent`, change the game state to `INGAME`, and display a "GO!" title on the screen.