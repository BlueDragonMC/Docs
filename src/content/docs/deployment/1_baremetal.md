---
slug: deployment/baremetal
title: Deploying on Baremetal
---

:::caution[Under Construction]
This page is under construction and may not be complete yet.
If you run into any issues, please [open an issue](https://github.com/BlueDragonMC/Docs/issues)
or contact us on [Discord](https://bluedragonmc.com/discord).
:::

This guide will walk you through the process of installing and running BlueDragon software directly on the host machine.

:::caution
Running BlueDragon on baremetal is the simplest way to run BlueDragon software, but it's recommended that you use Docker or Kubernetes for production deployments.
:::

## Prerequisites

- This guide assumes you're running on Linux. Other operating systems are not supported; though, you may be able to get it working on WSL.
- You must have Java 21 or later installed on your system and accessible in your `PATH`.

## Installation

First, clone the source repositories for the server, Puffin, and Komodo.

```sh
# You can choose any directory you want. `/work` is just an example.
# Make sure you have write access to this directory!
mkdir /work && cd /work
git clone https://github.com/BlueDragonMC/Server
git clone https://github.com/BlueDragonMC/Puffin
git clone https://github.com/BlueDragonMC/Komodo
```

Next, build each project:

```sh
# Server
cd /work/Server && ./gradlew build

# Puffin
cd /work/Puffin && ./gradlew build

# Komodo
cd /work/Komodo && ./gradlew build
```

Then, copy the JARs into the appropriate directories:

```sh
mkdir -p /run/server
mkdir -p /run/proxy/plugins
mkdir /run/puffin

cp /work/Server/build/libs/Server-1.0-SNAPSHOT-all.jar /run/server/server.jar
cp /work/Komodo/build/libs/Komodo-0.1.0-all.jar /run/proxy/plugins/komodo.jar
cp /work/Puffin/build/libs/Puffin-1.0-SNAPSHOT-all.jar /run/puffin/puffin.jar
```

Download Velocity:

```sh
wget https://api.papermc.io/v2/projects/velocity/versions/3.3.0-SNAPSHOT/builds/370/downloads/velocity-3.3.0-SNAPSHOT-370.jar -O /run/proxy/velocity.jar
```

Install some plugins for your Velocity proxy:

```sh
wget https://download.luckperms.net/1526/velocity/LuckPerms-Velocity-5.4.113.jar -O /run/proxy/plugins/luckperms.jar
wget https://ci.exceptionflug.de/job/Protocolize2/lastSuccessfulBuild/artifact/protocolize-velocity/target/protocolize-velocity.jar -O /run/proxy/plugins/protocolize.jar
wget https://github.com/BlueDragonMC/Jukebox/releases/download/latest/Jukebox-1.0-SNAPSHOT-all.jar -O /run/proxy/plugins/jukebox.jar
```

Then, build your games as JAR files and place them in the `/run/server/games` directory. For more details on this, see [Creating a Game](/guides/creating-a-game) or the [Example Game](/intro/example-game).

### Dependencies

The BlueDragon server, proxy, and Puffin require MongoDB and LuckPerms to be installed and running on your system. The easiest way to install these is to use Docker:

```sh
docker run -d -p 27017:27017 mongo
docker run -d -p 8080:8080 -e LUCKPERMS_STORAGE_METHOD=mongodb -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://localhost:27017/" -e LUCKPERMS_DATA_DATABASE=luckperms --net host ghcr.io/luckperms/rest-api
```

If you prefer to run them without Docker, you can install them manually:

- [MongoDB installation guide](https://www.mongodb.com/docs/manual/administration/install-on-linux/)
- [LuckPerms installation guide](https://github.com/LuckPerms/rest-api?tab=readme-ov-file#usage-manual)

## Configuration

### Permissions

By default, LuckPerms does not give any permissions to anyone. To give yourself permissions, run the following command in a terminal:

```sh
docker run --rm -it -e LUCKPERMS_STORAGE_METHOD=mongodb -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://localhost:27017/" -e LUCKPERMS_DATA_DATABASE=luckperms --net host ghcr.io/luckperms/rest-api
```

Then, when you see the prompt, type in `lp user <your username> permission set * true`. This will give you every permission. You may need to log in to the Minecraft server before running this command.

After you change permissions this way, you must restart your standalone LuckPerms instance for the change to take effect.

### Puffin

Puffin reads the following configuration from environment variables:

```properties
PUFFIN_DEV_MODE=true # Disable Kubernetes service discovery for Minecraft servers and proxies
PUFFIN_WORLD_FOLDER=/data/worlds
PUFFIN_MONGO_CONNECTION_STRING=mongodb://localhost:27017
PUFFIN_LUCKPERMS_URL=http://localhost:8080
PUFFIN_DEFAULT_GAMESERVER_IP=localhost
PUFFIN_DEFAULT_PROXY_IP=localhost
PUFFIN_GRPC_PORT=50051
PUFFIN_GAMESERVER_GRPC_PORT=50052
PUFFIN_PROXY_GRPC_PORT=50053

# The amount of milliseconds in between minimum instance checks
PUFFIN_INSTANCE_START_PERIOD_MS=5000
```

In addition, it reads configuration from the following files:

- [Buffer config](/reference/buffer-config) - `/service/config/buffer-config.properties`
- [Worlds folder](#common-configuration) - `/data/worlds`

These must be present for Puffin to work properly.

:::caution
Running Puffin outside of a Docker container is not recommended. If you run into any issues, please [open an issue](https://github.com/BlueDragonMC/Puffin/issues/new) or let us know on [Discord](https://bluedragonmc.com/discord).
:::

### Proxy

First, configure environment variables:

```properties
KOMODO_PUFFIN_URI=localhost:50051 # Connect to Puffin on port 50051
KOMODO_GRPC_PORT=50053 # Create a gRPC server on port 50053
```

Komodo (the Velocity proxy plugin) reads the following configuration files:

1. `/run/proxy/plugins/komodo/proxy-config.properties` defines the MOTD:

   ```properties
   motd.line_1.text=<rainbow>BlueDragon Test Instance
   motd.line_1.center=true
   motd.line_2.text=<blue>Version 1.20.1
   motd.line_2.center=true
   ```

   Updating this file while the proxy is running should change the MOTD without needing to restart the proxy.

2. `/run/proxy/favicon_64.png` is the image shown in server list pings. This file is optional.

In addition, you must create a `forwarding.secret` file in the `/run/proxy` folder with your forwarding secret.

To play note block songs, add `.nbs` files created with [Note Block Studio](https://opennbs.org/) to the `/run/proxy/plugins/bluedragon-jukebox/songs` directory.
You should be able to see the songs by typing `/play` in-game.

Finally, change the port that Velocity runs on since `25565` is taken by the Minecraft server. You can do this by starting up Velocity (`cd /run/proxy && java -jar velocity.jar`) and letting it create a `velocity.toml` file. Then, change the `bind` property. Players will connect to your server using this address.

### Minecraft Server

BlueDragonMC/Server reads its configuration from environment variables. Follow [this guide](/reference/environment) to set them up.

Here is an example:

```properties
BLUEDRAGON_QUEUE_TYPE=IPC
BLUEDRAGON_MONGO_CONNECTION_STRING=mongodb://localhost:27017
BLUEDRAGON_PUFFIN_HOSTNAME=localhost
BLUEDRAGON_PUFFIN_PORT=50051 # The port that Puffin's gRPC server runs on
BLUEDRAGON_LUCKPERMS_HOSTNAME=http://localhost:8080
BLUEDRAGON_DEFAULT_GAME=lobby # This should correspond a game name found in the `game.properties` file in one of your games.
BLUEDRAGON_AGONES_DISABLED=true # Agones is disabled without Kubernetes
HOSTNAME=server-1 # This is the internal name of the Minecraft server. It is used to identify the server to other services, like Velocity and Puffin.
PUFFIN_VELOCITY_SECRET=<your velocity secret> # Add your Velocity forwarding secret here
BLUEDRAGON_GRPC_SERVER_PORT=50052 # The port used to create a gRPC server
```

### LuckPerms

LuckPerms can be [configured](https://github.com/LuckPerms/rest-api?tab=readme-ov-file#configuration) using environment variables:

```properties
LUCKPERMS_STORAGE_METHOD=mongodb
LUCKPERMS_DATA_MONGODB_CONNECTION_URI=mongodb://localhost:27017
LUCKPERMS_DATA_DATABASE=luckperms
LUCKPERMS_SYNC_MINUTES=5
```

### Common Configuration

Both Puffin and the Minecraft server need a `/data` directory.

```sh
mkdir -p /data/worlds
```

The `/data/worlds` directory should be configured as documented [here](https://github.com/BlueDragonMC/Server/blob/190709f461bc41edfa1b606fffdd2c9ebeeff852/INTEGRATION.md#44-world-loading).

## Running

Before starting anything else, make sure LuckPerms and MongoDB are running!

Minecraft server:

```sh
# Before running, you must export the necessary environment variables from the Configuration section of this guide!
cd /run/server/
java -jar /run/server/server.jar
```

Velocity proxy:

```sh
# Before running, you must export the necessary environment variables from the Configuration section of this guide!
cd /run/velocity/
java -jar /run/velocity/velocity.jar
```

Puffin:

```sh
# Before running, you must export the necessary environment variables from the Configuration section of this guide!
cd /run/puffin/
java -jar /run/puffin/puffin.jar
```
