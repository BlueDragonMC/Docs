---
title: Environment
---

The BlueDragonMC/Server project loads several environment configuration options at startup that influence its interaction with other services.

## Development and Production Modes

The server is determined to be in "Dev" or "Prod" mode by looking at the `BLUEDRAGON_ENV_TYPE` environment variable. If it's set to `DEV`, `DEVELOPMENT`, `TEST`, or `TESTING`, the server runs in development mode. If it's set to any other value, it runs in production mode.

If `BLUEDRAGON_ENV_TYPE` is not set, the fallback is to check for a directory called `/server` at the file system root. If it exists, then production mode is used; if not, development mode.

The mode determines the default values for several of the variables below, so it should be set before starting the server.

## Environment Variable Reference

| Environment variable                    | Defaults                                                                  | Description                                                                                                                       |
|-----------------------------------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `BLUEDRAGON_ENV_TYPE`                   | `DEV` if `/server` does not exist, otherwise `PROD`                       | Overrides how the server determines whether it is in development or production mode.                                              |
| `BLUEDRAGON_QUEUE_TYPE`                 | **Dev**: `TEST`<br>**Prod**: `IPC`                                        | Use "IPC" to connect to Puffin for queueing, or "TEST" for a fully-local/single-instance queue                                    |
| `BLUEDRAGON_MONGO_CONNECTION_STRING`    | **Dev**: `mongodb://localhost:27017`<br>**Prod**: `mongodb://mongo:27017` | The connection string that resolves to a MongoDB instance                                                                         |
| `BLUEDRAGON_PUFFIN_HOSTNAME`            | **Dev**: `localhost`<br>**Prod**: `puffin`                                | The hostname that resolves to a Puffin instance                                                                                   |
| `BLUEDRAGON_PUFFIN_PORT`                | 50051                                                                     | The port of Puffin's gRPC server.                                                                                                 |
| `BLUEDRAGON_LUCKPERMS_HOSTNAME`         | **Dev**: `http://localhost:8080`<br>**Prod**: `http://luckperms:8080`     | The hostname that resolves to a [standalone LuckPerms](https://luckperms.net/) instance                                           |
| `BLUEDRAGON_DEFAULT_GAME`               | `Lobby`                                                                   | The game to automatically create on startup. Typically used to immediately initialize a lobby on each game server.                |
| `BLUEDRAGON_SERVER_NAME`                | The contents of the `HOSTNAME` variable, or a random dev name             | Overrides the server name. In Kubernetes this is normally set from `metadata.name`.                                               |
| `BLUEDRAGON_HEALTH_PORT`                | 8081                                                                      | The port used for `/health`, `/ready`, and `/drain`.                                                                              |
| `BLUEDRAGON_SHUTDOWN_COUNTDOWN_SECONDS` | 7200                                                                      | How long players have before a draining server stops, in seconds.                                                                 |
| `BLUEDRAGON_COUNTDOWN_HIDDEN_SECONDS`   | 3600                                                                      | How long the shutdown countdown stays hidden at the start of a drain, in seconds. At least 60 seconds is always visible.          |
| `BLUEDRAGON_TICK_TIMEOUT_MS`            | 100                                                                       | How long the server may go without a tick before it is considered unhealthy.                                                      |
| `BLUEDRAGON_DRAIN_QUIESCENCE_MS`        | 15000                                                                     | How long a draining server must remain empty before stopping early.                                                               |
| `BLUEDRAGON_LOBBY_TRANSFER_TIMEOUT_MS`  | 30000                                                                     | How long to wait for players to be moved to a lobby when the drain completes before kicking them, in milliseconds.               |
| `BLUEDRAGON_LIFECYCLE_DISABLED`         | _Not set_                                                                 | If present, disables the lifecycle HTTP endpoints.                                                                                |
| `PUFFIN_VELOCITY_SECRET`                | _Not set_                                                                 | The Velocity modern forwarding secret. If not present, Velocity forwarding is disabled and Mojang authentication is used instead. |
| `BLUEDRAGON_GRPC_SERVER_PORT`           | 50051                                                                     | The port to listen on for gRPC requests.                                                                                          |
| `SERVER_INSTANCE_MIN_INACTIVE_TIME`     | 120000                                                                    | The amount of time an instance must be inactive before it is cleaned up, in milliseconds.                                         |
| `SERVER_INSTANCE_CLEANUP_PERIOD`        | 10000                                                                     | The amount of time between instance cleanup tasks, in milliseconds.                                                               |

_[View ConfiguredEnvironment source code](https://github.com/BlueDragonMC/Server/blob/main/src/main/kotlin/com/bluedragonmc/server/queue/environments.kt) for more details about server environment configuration._

## Other Environment Information

- The `Environment` class also stores version information handled by the [Blossom](https://github.com/KyoriPowered/blossom/) Gradle plugin. See [`VersionInfo`](https://github.com/BlueDragonMC/Server/blob/main/common/src/main/kotlin/com/bluedragonmc/server/VersionInfo.kt) for the interface that the generated `GitVersionInfo` implements.
- The environment contains a list of all registered games obtained from the [`GameLoader`](https://github.com/BlueDragonMC/Server/blob/main/src/main/kotlin/com/bluedragonmc/server/queue/GameLoader.kt).

## Server Naming

Every game server **must** have a unique name to interact properly with other services. The default [`ConfiguredEnvironment`](https://github.com/BlueDragonMC/Server/blob/main/src/main/kotlin/com/bluedragonmc/server/queue/environments.kt) goes through the following process for determining a server's name:

1. If `BLUEDRAGON_SERVER_NAME` is set, its value will be used as the server name.
2. Otherwise, if the `HOSTNAME` environment variable is set, its value will be used. Kubernetes sets this to the pod name.
3. Otherwise, a random name in the form `dev-xxxxx-xxxxx` will be created and used.

The result is then cached for future lookups.
