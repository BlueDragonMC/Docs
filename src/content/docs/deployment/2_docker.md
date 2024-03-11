---
slug: deployment/docker
title: Deploying with Docker
---

:::caution[Under Construction]
This page is under construction and may not be complete yet.
If you run into any issues, please [open an issue](https://github.com/BlueDragonMC/Docs/issues)
or contact us on [Discord](https://bluedragonmc.com/discord).
:::

This guide will walk you through deploying BlueDragon with Docker.

## Prerequisites

- Docker with BuildKit support (any modern version of Docker should work)
- [Authenticate to the GitHub Packages container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry) (This is required to pull `ghcr.io` images)

## Configuration

Before you run BlueDragon's Docker containers, you must have:

- A world folder (in `/data/worlds`)
- A songs folder (in `/data/songs`, optional)
- A `buffer-config.properties` file
- A `proxy-config.properties` file

### World folder

The `/data/worlds` directory should be configured as documented [here](https://github.com/BlueDragonMC/Server/blob/190709f461bc41edfa1b606fffdd2c9ebeeff852/INTEGRATION.md#44-world-loading).

### Songs folder

To play note block songs, add `.nbs` files created with [Note Block Studio](https://opennbs.org/) to a `songs` directory.
These are mounted into the container at `/proxy/plugins/bluedragon-jukebox/songs/`.
You should be able to see the songs by typing `/play` in-game.

## Running

### MongoDB

```sh
docker run -d -p 27017:27017 mongo
```

### LuckPerms

```sh
docker run -d \
  -p 8080:8080 \
  -e LUCKPERMS_STORAGE_METHOD=mongodb \
  -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://mongo:27017/" \
  -e LUCKPERMS_DATA_DATABASE=luckperms \
  --net host ghcr.io/luckperms/rest-api
```

### Puffin

```sh
git clone https://github.com/BlueDragonMC/Puffin
cd Puffin
docker build -t bluedragonmc/puffin:latest .
docker run -d \
  -v /data/worlds:/data/worlds \
  -v buffer-config.properties:/service/config/buffer-config.properties \
  -e PUFFIN_DEV_MODE=true \
  -e PUFFIN_WORLD_FOLDER=/data/worlds \
  -e PUFFIN_MONGO_CONNECTION_STRING=mongodb://mongo:27017 \
  -e PUFFIN_LUCKPERMS_URL=http://luckperms:8080 \
  -e PUFFIN_DEFAULT_GAMESERVER_IP=minecraft \
  -e PUFFIN_DEFAULT_PROXY_IP=proxy \
  bluedragonmc/puffin:latest
```

### Proxy

```sh
git clone https://github.com/BlueDragonMC/Komodo
cd Komodo
docker build -t bluedragonmc/komodo:latest .
docker run -d \
  -v /data/songs:/proxy/plugins/bluedragon-jukebox/songs/ \
  -e PUFFIN_VELOCITY_SECRET=<your velocity secret> \
  bluedragonmc/komodo:latest
```

### Minecraft Server

```sh
git clone https://github.com/BlueDragonMC/Server
cd Server
docker build -t bluedragonmc/server:latest .
docker run \
  -v /data/worlds:/data/worlds \
  -e BLUEDRAGON_QUEUE_TYPE=IPC \
  -e BLUEDRAGON_MONGO_CONNECTION_STRING=mongodb://mongo:27017 \
  -e BLUEDRAGON_PUFFIN_HOSTNAME=puffin \
  -e BLUEDRAGON_LUCKPERMS_HOSTNAME=http://luckperms:8080 \
  -e BLUEDRAGON_DEFAULT_GAME=lobby \
  -e BLUEDRAGON_AGONES_DISABLED=true \
  -e PUFFIN_VELOCITY_SECRET=<your velocity secret> \
  bluedragonmc/server:latest
```

## Permissions

By default, LuckPerms does not give any permissions to anyone. To give yourself permissions, run the following command in a terminal:

```sh
docker run --rm -it -e LUCKPERMS_STORAGE_METHOD=mongodb -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://localhost:27017/" -e LUCKPERMS_DATA_DATABASE=luckperms --net host ghcr.io/luckperms/rest-api
```

Then, when you see the prompt, type in `lp user <your username> permission set * true`. This will give you every permission. You may need to log in to the Minecraft server before running this command.

After you change permissions this way, you must restart your standalone LuckPerms instance for the change to take effect.
