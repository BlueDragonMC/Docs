---
title: Development Environment Setup
description: How to work on BlueDragon in development mode
---

This guide covers the services you need while developing games, and how to start a development server.

## Running a development server

The easiest way to run a development server is with the `runDev` Gradle task:

```sh
./gradlew runDev
```

This builds the Server and your games, copies them into the appropriate locations, and starts the Server with the games installed. The server binds to port `25565`, so you can join it at `localhost`.

See the [Gradle run task](/development/gradle-run-task) guide to set up this task in your own project.

## Required services

The development server needs two external services:

1. **MongoDB** for storing player data
2. **LuckPerms** for querying and updating player permissions

The easiest way to run them is with Docker.

### MongoDB

```sh
docker run -d -p 27017:27017 -v bluedragon_mongo_data:/data/db mongo
```

### LuckPerms

```sh
docker run -d \
  -e LUCKPERMS_STORAGE_METHOD=mongodb \
  -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://localhost:27017/" \
  -e LUCKPERMS_DATA_DATABASE=luckperms \
  --net host \
  ghcr.io/luckperms/rest-api
```

`--net host` lets LuckPerms reach MongoDB on `localhost`. If host networking is not available in your Docker setup, put both containers on the same Docker network instead.

## Permissions

By default, LuckPerms does not give any permissions to anyone. To give yourself permissions, run the following command in a terminal:

```sh
docker run --rm -it -e LUCKPERMS_STORAGE_METHOD=mongodb -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://localhost:27017/" -e LUCKPERMS_DATA_DATABASE=luckperms --net host ghcr.io/luckperms/rest-api
```

This opens an interactive LuckPerms console connected directly to the database. Run one of the following commands:

```
lp group default permission set * true   # Give every permission to everyone (recommended for development)
lp user YOURNAME permission set * true   # Give every permission to yourself
```

Then, press `CTRL + C` to close the terminal and restart your LuckPerms container so the changes take effect.

```sh
docker restart $(docker ps -q --filter ancestor=ghcr.io/luckperms/rest-api)
```

See [LuckPerms's documentation](https://luckperms.net/wiki/Command-Usage) for more information on permissions.
