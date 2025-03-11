---
title: TeamModule
---

`TeamModule` provide support for teams within a game. It can automatically generate teams when the game starts, or the developer can do this manually.

## Auto Teams
If the `autoTeams` parameter is `true`, `TeamModule` will automatically generate teams when `GameStartEvent` is called. There are two strategies, set with the `autoTeamMode` parameter:
- `PLAYER_COUNT`: Generate as many teams as possible with a specific number of players on each team. Fill each team before starting the next team. `autoTeamCount` controls the number of players on each team.
- `TEAM_COUNT`: Generate a specific number of teams with as many players as possible. Use a round-robin approach to distribute players evenly. `autoTeamCount` controls the number of teams.

Auto-generated teams are assigned names and colors in sequential order based on the following list:
- Red
- Blue
- Green
- Aqua
- Pink
- White
- Gray
- Yellow
- Gold
- Purple
- Dark Green
- Dark Aqua
- Dark Red
- Dark Gray
- Dark Blue
- Team 15 (aqua color)
- Team 16 (aqua color)
- ...

## Custom Teams
If the `autoTeams` parameter is `false`, it will be up to the game developer to decide how and when teams are assigned. Teams should be added to the `teams` list in the `TeamModule` instance. Here is a simplified example from HueHunters:

```kotlin
val hidersTeam = TeamModule.Team(
    name = Component.text("Hiders", NamedTextColor.GREEN),
    players = mutableListOf(),
    allowFriendlyFire = false,
    nameTagVisibility = NameTagVisibility.HIDE_FOR_OTHER_TEAMS
)
// At any time, you can use hidersTeam.addPlayer to add players to the team
hidersTeam.register() // This must be called to enable client-side features like team name colors and friendly fire blocking
getModule<TeamModule>().teams.add(hidersTeam) // This must be called to add the new team to the game
```

## Friendly Fire
If the `allowFriendlyFire` parameter on a `TeamModule.Team` is `false`, players on the same team will not be able to attack each other. When using auto teams, this parameter is set based on the `allowFriendlyFire` parameter in the module. When not using auto teams, the module parameter has no effect.

The friendly fire check is implemented both on the client and in `TeamModule`. On the server, only `PlayerAttackEvent`s are handled, so if your game includes alternate forms of combat, you may need to check for friendly fire yourself.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.minigame.TeamModule
```
Use the module in your game's `initialize` function:
```kotlin
use(TeamModule(
    autoTeams = true,
    autoTeamMode = TeamModule.AutoTeamMode.PLAYER_COUNT,
    autoTeamCount = 2,
    allowFriendlyFire = false
))
```

Note: when `autoTeams` is `false`, none of the other parameters will do anything and they can be left to their defaults.