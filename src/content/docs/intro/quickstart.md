---
title: Quickstart
description: A guide in my new Starlight docs site.
sidebar:
  order: 0
---

## Requirements

1. You must have Java 17 or later installed.
2. This guide assumes you're using a Bash-like shell. Use Linux for best results; on Windows, you can modify the scripts or use [WSL](https://learn.microsoft.com/en-us/windows/wsl/).
3. [Docker](https://docs.docker.com/desktop/) is recommended to quickly run the required MongoDB and LuckPerms services.

## Setup

1. Clone the `Server` and `ExampleGame` repositories:

```sh
git clone https://github.com/BlueDragonMC/Server
git clone https://github.com/BlueDragonMC/ExampleGame
```

2. Build the `Server` project:

```sh
cd Server
./gradlew build
```

3. Build the example game:

```sh
cd ../ExampleGame
./gradlew build
```

4. Copy the JARs into their appropriate places:

```sh
cd ..
mkdir -p ./run/games
cp Server/build/libs/Server-1.0-SNAPSHOT-all.jar run/server.jar
cp ExampleGame/build/libs/ExampleGame-1.0-SNAPSHOT.jar run/games/ExampleGame.jar
```

5. Copy a world folder:

_You will need a Minecraft world that was saved on the same version as BlueDragon's Minestom dependency. At the time of writing, this is 1.20.1._

```sh
mkdir -p ./run/worlds
cp YOUR_WORLD_FOLDER run/worlds/ExampleGame/ExampleMap
```

6. Run dependencies:

```sh
docker run -d -p 27017:27017 mongo
docker run -d -p 8080:8080 ghcr.io/luckperms/rest-api
```

7. Start the server:

```sh
cd ./run
BLUEDRAGON_DEFAULT_GAME=ExampleGame java -jar server.jar
```

_The BLUEDRAGON_DEFAULT_GAME environment variable tells the server to send players into the ExampleGame instead of looking for a game called `Lobby`_

## Further Reading

- Learn more about [the `worlds` folder](/reference/worlds-folder).
- Explore the code of [the example game](/intro/example-game/) and [create your own](/guides/creating-a-game/) from scratch.
