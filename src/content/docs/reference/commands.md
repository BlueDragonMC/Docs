---
title: Server Commands
---
Just like in vanilla Minecraft, the [BlueDragonMC/Server](/reference/subprojects/server-core/) Minestom instance relies on commands for important interactions. Each command has its own permission, and **no permissions are granted by default**. This document references a few different permission levels, but these are for illustrative purposes only, and do not represent specific requirements.

## Selectors
Just like on vanilla servers, BlueDragon supports the use of the following selectors in place of player names:
- `@p`: Selects the nearest player to the command execution. Because the server does not support command blocks, this is effectively the same as `@s`.
- `@s`: Selects the player who executed the command.
- `@e`: Selects all entities on the server. This only works for commands that support entities (most do not).
- `@a`: Selects all players on the server.
- `@r`: Selects a single random player.

## Command List

> ℹ️ This list includes every command included in BlueDragon's Minestom server. Commands from the proxy server are not listed.

### `/ban`
> ⚠️ Recommended permission level: **Moderator**

```
Usage: /ban <player> <duration> <reason>
```

Immediately removes the specified player from the server and records the ban in the database.
As long as the ban is active, the player will not be allowed to log in.
Even after the ban is lifted, it will still remain in the database as part of the player's punishment history.

The duration is formatted using several time units. For example, `8d6h30m` is equal to a duration of "8 days, 6 hours, and 30 minutes." Years, days, hours, minutes, and seconds are supported.

### `/fly`
> ⚠️ Recommended permission level: **Administrator**

```
Usage: /fly [player]
```

Toggles fly mode for the specified player, or yourself.

### `/game`
> ⚠️ Recommended permission level: **Administrator**

This command has the following subcommands:
- `/game create <gameType> <mapName> <mode>`: Tells the [queue](../queue/) to create an instance of the specified game.
- `/game end`: Calls `WinnerDeclaredEvent` with no winner, and ends the game.
- `/game join <id>`: Sends you to a game based on its Game ID.
- `/game list`: Displays the game ID, game type, map name, and player count for each game.
- `/game module list`: Lists all modules loaded in your current game. Hover over the module's name to view its `toString()`.
- `/game module unload <module>`: Removes the module from your current game. Modules are given by class name.

### `/gamemode`
> ⚠️ Recommended permission level: **Administrator**

```
Usage: /gamemode <survival|creative|adventure|spectator> [player] 
```

Changes the game mode of the specified player, or yourself.

This command has the following aliases:
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

Lists all instances by UUID and the players on those instances.

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
As long as the mute is active, the player will not be allowed to send messages in the chat.
Even after the mute is lifted, it will still remain in the database as part of the player's punishment history.

The duration is formatted using several time units. For example, `8d6h30m` is equal to a duration of "8 days, 6 hours, and 30 minutes." Years, days, hours, minutes, and seconds are supported.

### `/pardon`
> ⚠️ Recommended permission level: **Moderator**

```
Usage: /pardon <player|banID>
```

Instantly revokes a punishment, reversing its effect on the player.
The punishment will not be removed from the player's punishment history.
It is recommended to specify the punishment by ID, rather than by player, in case the player has several punishments active.

### `/party`
> ℹ️ Recommended permission level: **Everyone**

The *party system* allows players to easily join the same game with their friends. Parties are managed by Puffin, so they work across servers. The `/party` command is used to manage the player's party.

This command has the following subcommands:
- `/p accept <player>`: Accepts a party invitation from `player`.
- `/p chat <message>`: Sends a message to everyone in the party.
- `/p invite <player>`: Invites a player to the party.
- `/p kick <player>`: Removes a player from the party. Only the party leader can use this command.
- `/p list`: Displays a list of all players in the party.
- `/p transfer <player>`: Changes the party leader to `player`. Only the current party leader can use this command.
- `/p warp`: Sends everyone in the party to your instance. Only the party leader can use this command.

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
Usage: /setblock <position> <block>
```

Changes the block at `position` to `block`.

### `/stop`
> ⚠️ Recommended permission level: **Administrator**

```
Usage: /stop
```

Immediately shuts down the Minestom server you are currently on. In most cases, players will be moved to another available server.

### `/tp`
> ⚠️ Recommended permission level: **Administrator**

```
Usage: /tp <player|<x> <y> <z>> [player|<x><y><z>]
```

If there are two arguments, and the first is a player, this player will be teleported to the position given by the second argument.
If there is one argument, the player that ran the command is teleported to the position given by the argument.
In any other case, the syntax is invalid.

### `/viewpunishment`
> ⚠️ Recommended permission level: **Moderator**

```
Usage: /viewpunishment <id>
```

Displays detailed information about the punishment with the specified punishment ID.

This command has the following aliases:
- `/vp <id>`: Same as `/viewpunishment <id>`

### `/viewpunishments`
> ⚠️ Recommended permission level: **Moderator**

```
Usage: /viewpunishments <player>
```

Displays a list of all punishments associated with the player, even if they are no longer active.
To see more detailed information about a punishment, use `/viewpunishment <id>`.

This command has the following aliases:
- `/vps <id>`: Same as `/viewpunishments <id>`