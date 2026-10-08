---
title: Server Commands
---

Just like in vanilla Minecraft, the [BlueDragonMC/Server](https://github.com/BlueDragonMC/Server) Minestom instance relies on commands for important interactions. Each command has its own permission, and **no permissions are granted by default**. This document references a few different permission levels, but these are for illustrative purposes only, and do not represent specific requirements.

## Selectors

Just like on vanilla servers, BlueDragon supports the use of the following selectors in place of player names:

- `@p`: Selects the nearest player to the command execution. Because the server does not support command blocks, this is effectively the same as `@s`.
- `@s`: Selects the player who executed the command.
- `@e`: Selects all entities on the server. This only works for commands that support entities (most do not).
- `@a`: Selects all players on the server.
- `@r`: Selects a single random player.

## Command List

:::note

This list includes every command included in BlueDragon's Minestom server. Commands from the proxy server are not listed.

:::

### `/ban`

> ⚠️ Recommended permission level: **Moderator**

```
Usage: /ban <player> <duration> <reason>
```

Immediately removes the specified player from the server and records the ban in the database.
As long as the ban is active, the player will not be allowed to log in.
Even after the ban is lifted, it will still remain in the database as part of the player's punishment history.

The duration is a number followed by a unit: `y` (years), `d` (days), `h` (hours), `m` (minutes), or `s` (seconds). For example, `8d` is a duration of eight days.

### `/fly`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /fly [player]
```

Toggles fly mode for the specified player, or yourself.

### `/game`

> ⚠️ Recommended permission level: **Administrator**

This command has the following subcommands:

- `/game start`: Starts your current game.
- `/game end`: Calls `WinnerDeclaredEvent` with no winner, and ends the game.
- `/game join <id>`: Sends you to a game based on its Game ID.
- `/game list`: Displays the game ID, game name, map, and player count for each game.
- `/game module list`: Lists all modules loaded in your current game.
- `/game module unload <module>`: Removes the module from your current game. Modules are given by class name.

### `/gamemode`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /gamemode <survival|creative|adventure|spectator> [player] 
```

Changes the game mode of the specified player, or yourself.

This command has the following aliases and variants:

- `/gm`: Same as `/gamemode`
- `/gmc [player]`: Same as `/gamemode creative [player]`
- `/gms [player]`: Same as `/gamemode survival [player]`
- `/gma [player]`: Same as `/gamemode adventure [player]`
- `/gmsp [player]`: Same as `/gamemode spectator [player]` 

### `/give`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /give [player] <item> [amount]
```

Gives the `player` the `item` with a quantity of `amount`. `player` defaults to yourself and `amount` defaults to `1`.

### `/instance`

> ⚠️ Recommended permission level: **Administrator**

This command has the following subcommands:

- `/instance list`: Lists all instances on the current server.
- `/instance join <uuid>`: Sends you to the instance with the given UUID.
- `/instance remove <uuid>`: Removes the instance with the given UUID.

### `/join`

> ℹ️ Recommended permission level: **Everyone**

```
Usage: /join <gameType> [mode] [mapName]
```

Tells the [Queue](../queue/) to place you in a game with the given parameters.

### `/jukebox`

> ℹ️ Recommended permission level: **Everyone**

The Jukebox plays note block songs. Songs are `.nbs` files loaded from the server's `songs` directory.

This command has the following subcommands:

- `/jukebox`: Opens the song selection menu.
- `/jukebox play`: Opens the song selection menu.
- `/jukebox pause`: Pauses the current song.
- `/jukebox unpause`: Resumes the current song.
- `/jukebox stop`: Stops the current song.
- `/jukebox skip`: Skips to the next song.
- `/jukebox clear`: Clears your song queue.
- `/jukebox remove <track>`: Removes a song from your queue by its number.
- `/jukebox queue`: Displays your current song queue.

This command has the following aliases:

- `/play`: Same as `/jukebox`
- `/song`: Same as `/jukebox`

### `/kick`

> ⚠️ Recommended permission level: **Moderator**

```
Usage: /kick <player> <reason>
```

Instantly removes the specified player from the server, displaying a message that includes the specified reason.
The kick is also recorded in the database and included with the player's punishment history.

### `/kill`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /kill [player]
```

Immediately kills the specified player, or yourself.

### `/leaderboard`

> ℹ️ Recommended permission level: **Everyone**

```
Usage: /leaderboard <statistic>
```

Displays the top 10 entries in the leaderboard. Leaderboards are given by `statistic key`.

### `/list`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /list
```

Lists all instances by UUID and the players on those instances. Players without the `command.list.full` permission only see their own instance.

### `/lobby`

> ℹ️ Recommended permission level: **Everyone**

Tells the [queue](../queue/) to send you to a [lobby](../lobby/).

### `/msg`

> ℹ️ Recommended permission level: **Everyone**

```
Usage: /msg <player> <message>
```

Sends a private message to another player. If the players are on the same server, the message is sent locally. Otherwise, the message is sent through Puffin.

### `/mute`

> ⚠️ Recommended permission level: **Moderator**

```
Usage: /mute <player> <duration> <reason>
```

Immediately records a mute for the specified player in the database.
`/mute` is an alias of `/ban`, so both commands share the same permission.
As long as the mute is active, the player will not be allowed to send messages in the chat.
Even after the mute is lifted, it will still remain in the database as part of the player's punishment history.

The duration is a number followed by a unit: `y` (years), `d` (days), `h` (hours), `m` (minutes), or `s` (seconds). For example, `8d` is a duration of eight days.

### `/pardon`

> ⚠️ Recommended permission level: **Moderator**

```
Usage: /pardon <player>
```

Revokes every active punishment on the specified player, reversing their effect.
The punishments will not be removed from the player's punishment history.

### `/party`

> ℹ️ Recommended permission level: **Everyone**

The *party system* allows players to easily join the same game with their friends. Parties are managed by Puffin, so they work across servers. The `/party` command is used to manage the player's party.

This command has the following subcommands:

- `/p accept <player>`: Accepts a party invitation from `player`.
- `/p chat <message>`: Sends a message to everyone in the party.
- `/p invite <player>`: Invites a player to the party.
- `/p kick <player>`: Removes a player from the party. Only the party leader can use this command.
- `/p leave`: Leaves your current party.
- `/p list`: Displays a list of all players in the party.
- `/p marathon start <minutes>`: Starts a marathon for your party. The duration must be between 5 and 300 minutes.
- `/p marathon end`: Ends your party's marathon.
- `/p marathon leaderboard`: Displays your party's marathon leaderboard.
- `/p transfer <player>`: Changes the party leader to `player`. Only the current party leader can use this command.
- `/p warp`: Sends everyone in the party to your current game. Only the party leader can use this command.

### `/pchat`

> ℹ️ Recommended permission level: **Everyone**

```
Usage: /pchat <message>
```

Sends a message to everyone in your party. This is shorthand for `/party chat`.

This command has the following aliases:

- `/pc <message>`: Same as `/pchat <message>`
- `/partychat <message>`: Same as `/pchat <message>`

### `/ping`

> ℹ️ Recommended permission level: **Everyone**

```
Usage: /ping
```

Displays your current ping to the server.

### `/playsound`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /playsound <sound> <source> <player> [position] [volume] [pitch]
```

Plays a specific sound to the given player, almost identical to the vanilla `/playsound` command.

### `/setblock`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /setblock <x> <y> <z> <block>
```

Changes the block at the given coordinates to `block`.

### `/stop`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /stop [seconds]
```

Shuts down the Minestom server you are currently on. If `seconds` is given, the shutdown is delayed by that many seconds. In most cases, players will be moved to another available server.

### `/time`

> ⚠️ Recommended permission level: **Administrator**

Controls the time of the instance you are currently on.

This command has the following subcommands:

- `/time`: Displays the current time.
- `/time add <time>`: Adds `time` ticks to the current time.
- `/time query`: Displays the current time.
- `/time set <time>`: Sets the time to `time` ticks.
- `/time set <day|night|noon|midnight|sunrise|sunset>`: Sets the time to a preset.
- `/time rate`: Displays the current time rate.
- `/time rate query`: Displays the current time rate.
- `/time rate set <newRate>`: Sets the rate at which time passes.

### `/tp`

> ⚠️ Recommended permission level: **Administrator**

```
Usage: /tp <player|<x> <y> <z>> [player|<x> <y> <z>]
```

With one argument, teleports you to the given player or position.
With two arguments, teleports the first player to the second player or position.

### `/version`

> ℹ️ Recommended permission level: **Everyone**

```
Usage: /version
```

Displays the Server version, branch, commit, uptime, and the bundled Minestom version.

This command has the following aliases:

- `/ver`: Same as `/version`
- `/pl`: Same as `/version`
- `/icanhasminestom`: Same as `/version`

### `/punishment`

> ⚠️ Recommended permission level: **Moderator**

```
Usage: /punishment <id>
```

Displays detailed information about the punishment with the specified punishment ID. Only a prefix of the ID is required.

This command has the following aliases:

- `/vp <id>`: Same as `/punishment <id>`

### `/punishments`

> ⚠️ Recommended permission level: **Moderator**

```
Usage: /punishments <player>
```

Displays a list of all punishments associated with the player, even if they are no longer active.
To see more detailed information about a punishment, use `/punishment <id>`.

This command has the following aliases:

- `/vps <player>`: Same as `/punishments <player>`
- `/history <player>`: Same as `/punishments <player>`