---
title: Buffer Config
---

The **buffer config** file is a `properties` file used by Puffin to determine how many games should be running of each type.

Puffin looks for this file at `/service/config/buffer-config.properties` by default.

Here is BlueDragon's `buffer-config.properties` at the time of writing:

```properties
# Defines the required "buffer" of instances for each game type, map name, and mode.
# For keys: <game type>_<map name>_<mode>
# <mode> is optional. If it's not included, the last _ should also be omitted.
# For values:
# - Each term can consist of a number and one optional operator prefixing it
# - Valid operators include:
#   - "+" takes the current amount of joinable servers and adds the following quantity to it
#   - "/" takes the current amount of logged in players and divides it by the following quantity (and adds one)
#   - A plain number will result in that number of instances.
# - Examples:
#   - "/25" makes one server for every 25 players, rounding down: floor(n / 25), where n is the current number of players
#   - "+1" keeps one additional server as a "buffer" if all other servers are full.
#   - "+3" keeps a buffer of 3 servers. This means that, at most times, there will be 3 joinable game servers of this type.
#   - "/25 +5" creates 1 server for every 25 players, plus a buffer of 5 servers that must be joinable.
# - Plain numbers and the "/" operator are not influenced by the status of each server (whether there are any empty slots).
ArenaPvP_Quad=1
# ^ Keep 1 server for ArenaPvP, plus one for every 10 players
BedWars_Caves=+1
FastFall_Chaos=+2
Infection_Office=+1
Infinijump_Classic_Solo=+2
Infinijump_Classic_Versus=+2
Infinijump_Classic_Race=+1
Lobby_lobbyv2.2=/25 +2
# ^ Keep 2 lobbies with empty player slots as well as one for every 25 players
PvPMaster_Subway=+1
Skyfall_Skyfall=+1
SkyWars_Buccaneer=+1
SkyWars_Dinner=+1
SkyWars_Mini\ Trenches=+1
SkyWars_Tower=+1
WackyMaze_Islands=+1
WackyMaze_Pitfall=+1
WackyMaze_Snowy=+1
WackyMaze_Canopy=+1
WackyMaze_Orbit=+1
Paintbrawl_Arena\ I=+1
Paintbrawl_Arena\ II=+1
Paintbrawl_Arena\ III=+1
Paintbrawl_Arena\ IV=+1
Paintbrawl_Arena\ V=+1
Dominate_Stony=+1
Dominate_Lunar=+1
Dominate_Cherry\ Grove=+1
```

## Common Patterns

- `+1` always keeps one empty game open.
- `/25` creates a new game for every 25 players logged in to the network. This is useful for persistent games like ArenaPvP.
- `1` keeps one game open at all times and does not create or destroy games based on player count.
