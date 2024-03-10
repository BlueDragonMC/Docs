---
title: Environment
---

The BlueDragonMC/Server project loads several environment configuration options at startup that influence its interaction with other services.

## Development and Production Modes

The server is determined to be in "Dev" or "Prod" modes by looking at the `BLUEDRAGON_ENV_TYPE` environment variable. If it's set to "DEV", the server is assumed to be in development mode, and if not, the server will be set to production mode.

If the `BLUEDRAGON_ENV_TYPE` is not set, the fallback is to check for a directory called `/server` at the file system root. If it exists, then production mode is used; if not, development mode.

## Environment Variable Reference

| Environment variable                 | Defaults                                                                  | Description                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `BLUEDRAGON_QUEUE_TYPE`              | **Dev**: `TEST`<br>**Prod**: `IPC`                                        | Use "IPC" to connect to Puffin for queueing, or "TEST" for a fully-local/single-instance queue                     |
| `BLUEDRAGON_MONGO_CONNECTION_STRING` | **Dev**: `mongodb://localhost:27017`<br>**Prod**: `mongodb://mongo:27017` | The hostname that resolves to a MongoDB instance                                                                   |
| `BLUEDRAGON_PUFFIN_HOSTNAME`         | **Dev**: `localhost`<br>**Prod**: `puffin`                                | The hostname that resolves to a Puffin instance                                                                    |
| `BLUEDRAGON_LUCKPERMS_HOSTNAME`      | **Dev**: `http://localhost:8080`<br>**Prod**: `http://luckperms:8080`     | The hostname that resolves to a [standalone LuckPerms](https://luckperms.net/) instance                            |
| `BLUEDRAGON_DEFAULT_GAME`            | `lobby`                                                                   | The game to automatically create on startup. Typically used to immediately initialize a lobby on each game server. |
| `BLUEDRAGON_AGONES_DISABLED`         | _Not set_                                                                 | If this environment variable is present with any value, Agones integration will be disabled.                       |
| `PUFFIN_VELOCITY_SECRET`             | _Not set_                                                                 | The Velocity modern forwarding secret. If not present, Velocity forwarding is disabled.                            |

_[View ConfiguredEnvironment source code](https://github.com/BlueDragonMC/Server/blob/b05b09ad229ccf85da20130510c9c1cdf90bbeed/src/main/kotlin/com/bluedragonmc/server/queue/environments.kt#L23) for more details about server environment configuration._

## Other Environment Information

- The `Environment` class also stores version information handled by the [Blossom](https://github.com/KyoriPowered/blossom/) Gradle plugin. See [`GitVersionInfo`](https://github.com/BlueDragonMC/Server/blob/b05b09ad229ccf85da20130510c9c1cdf90bbeed/src/main/kotlin/com/bluedragonmc/server/GitVersionInfo.kt#L8) for more details.
- The environment contains a list of all registered games obtained from the [`GameLoader`](https://github.com/BlueDragonMC/Server/blob/b05b09ad229ccf85da20130510c9c1cdf90bbeed/src/main/kotlin/com/bluedragonmc/server/queue/GameLoader.kt#L15).

## Server Naming

Every game server **must** have a unique name to interact properly with other services. The default [`ConfiguredEnvironment`](https://github.com/BlueDragonMC/Server/blob/b05b09ad229ccf85da20130510c9c1cdf90bbeed/src/main/kotlin/com/bluedragonmc/server/queue/environments.kt#L23) goes through the following process for determining a server's name:

1. If the `HOSTNAME` environment variable is set, its value will be used as the server name.
2. If the server is in development mode _or_ Agones integration is disabled, a random string will be created and used.
3. If the server is in production mode _and_ Agones integration is enabled, a gRPC request will be sent to get the server name from the Agones [gRPC API](https://agones.dev/site/docs/guides/client-sdks/#gameserver).

The result is then cached for future lookups.
