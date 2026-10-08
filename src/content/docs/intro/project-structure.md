---
title: Project Structure
---

## Services and their jobs

BlueDragon is split into a few crucial services:

- Our [**Minestom**](https://minestom.net/) [implementation](https://github.com/BlueDragonMC/Server) runs all the games.
- [**Velocity**](https://papermc.io/software/velocity) routes players between game servers and handles the server list ping.
- [**Puffin**](https://github.com/BlueDragonMC/Puffin) handles all of the coordination and messaging between services. It manages the player queue, creates game instances on demand, and handles parties, private messages, and map serving. It also tracks each player's [Jukebox](https://github.com/BlueDragonMC/Jukebox) queue so songs continue playing when a player switches servers.
- [**MongoDB**](https://www.mongodb.com) stores player profiles and game data.
- [**LuckPerms**](https://luckperms.net) handles player permissions and ranks.

## Messaging

These services need to communicate with each other to perform important tasks like queueing for games, sending players between servers, and handling parties.

We have `proto` (Protocol buffer) files in a [GitHub repository](https://github.com/BlueDragonMC/RPC/) that define our schema, and then we use the [Protobuf Gradle plugin](https://github.com/google/protobuf-gradle-plugin) to generate Java and Kotlin clients to use across our applications.

Whenever a game server or proxy starts up, it attempts to create a gRPC channel to Puffin. Using the shared schema, they can communicate in a binary format with an automatically-generated client and server.

Learn more about gRPC in [their documentation](https://grpc.io/docs/what-is-grpc/introduction/).

| Service     | Initiates a Connection With | Responsibilities (and `proto` file links)                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Game Server | Agones Sidecar Container    | [Server healthchecks, readiness, and reservations](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/agones.proto)                                                                                                                                                                                                                                                                                                                                                                                   |
| Game Server | Puffin                      | [Player tracking](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/player_tracker.proto), [queueing](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/queue.proto), [game state tracking](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/server_tracking.proto), [parties](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/party_svc.proto), [receiving chat messages](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/gs_client.proto), [jukebox](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/jukebox.proto), [map data](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/map.proto) |
| Proxy       | Puffin                      | [Sending players](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/player_holder.proto), [finding available lobbies, discovering game server IPs](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/service_discovery.proto), [private messages](https://github.com/BlueDragonMC/RPC/blob/master/src/main/proto/velocity_message.proto)                                                                                                                                                                                                                                                           |

gRPC channels are bidirectional, so once a connection is established, messages can flow both ways.
