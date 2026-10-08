---
title: Games, Servers, and Instances
---

On BlueDragon, we have three main units that describe places players can be: games, servers, and instances.

## Instances

Instances are the most granular descriptor. You can learn more about instances in [Minestom's documentation](https://wiki.minestom.net/world/instances).
They are most similar to worlds on an ordinary Minecraft server. Each server has multiple instances.

Instances have unique IDs, which are in the format of a Java [UUID](https://docs.oracle.com/javase/8/docs/api/java/util/UUID.html) (dashed). They are only used within the server and shouldn't be shared with other services.

## Games

Games are the next smallest unit. Games can have multiple instances, and servers can have multiple games.

Games each have an ID, which we refer to as a "Game ID". It is a four-character, random, lowercase string. Game IDs are used to send players to the games that they queued for.

Events are [filtered](https://wiki.minestom.net/feature/events) ([view source code](https://github.com/BlueDragonMC/Server/blob/main/common/src/main/kotlin/com/bluedragonmc/server/GameEventBus.kt)) at the Game level, and we attempt to hide players in separate games from each other in the chat and tab list.

It is the Game's responsibility to clean up old instances that it owns when they are no longer in use.

### Game Names vs Game IDs

- "Game name" refers to an internal name of a game, like `wackymaze` or `paintbrawl`.
- "Game ID" refers to a four-character random string that identifies a specific instance of a running game.

## Servers

A server refers to one process that is executing the [`Server`](https://github.com/BlueDragonMC/Server) project JAR.

Servers can have multiple games, which can each have multiple instances.

It is the Server's responsibility to clean up old games.

### Server IDs

In a production environment, servers each have their own IDs. Kubernetes assigns each pod a name and exposes it through the `HOSTNAME` environment variable, which the server uses as its ID. These IDs conform to the pattern `<fleetName>-xxxxx-xxxxx` and match the pod IDs that Kubernetes assigns.

If `HOSTNAME` is not set (for example, in development), the server generates a random ID in the form `dev-xxxxx-xxxxx`.

Server IDs are used in communication with Puffin and to register the server's address on each proxy.
