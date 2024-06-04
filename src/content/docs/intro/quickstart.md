---
title: Quickstart
description: A guide in my new Starlight docs site.
sidebar:
  order: 0
---

## Requirements

1. You must have Java 21 or later installed.
2. This guide assumes you're using a Bash-like shell. Use Linux for best results; on Windows, you can modify the scripts or use [WSL](https://learn.microsoft.com/en-us/windows/wsl/).
3. [Docker](https://docs.docker.com/desktop/) is recommended to quickly run the required MongoDB and LuckPerms services.

## Setup

1. Clone the Quickstart and Server repositories:

   ```bash
   git clone https://github.com/BlueDragonMC/Quickstart
   git clone https://github.com/BlueDragonMC/Server
   ```

2. Install and start MongoDB and LuckPerms

   ```bash
   docker run -d -p 27017:27017 mongo
   docker run -d -p 8080:8080 ghcr.io/luckperms/rest-api
   ```

3. Give yourself permissions:

   By default, LuckPerms does not grant any permissions. To fix this, run the following command:

   ```sh
   docker run --rm -it -e LUCKPERMS_STORAGE_METHOD=mongodb -e LUCKPERMS_DATA_MONGODB_CONNECTION_URI="mongodb://localhost:27017/" -e LUCKPERMS_DATA_DATABASE=luckperms --net host ghcr.io/luckperms/rest-api
   ```

   This creates a terminal where you can run LuckPerms commands in a session connected directly to the database.
   Then, in that terminal, run the following command:

   ```
   lp group default permission set * true
   ```

   If you want to be less permissive, you can give permissions to yourself:

   ```
   lp user YOURNAME permission set * true
   ```

   See [LuckPerms's documentation](https://luckperms.net/wiki/Command-Usage) for more information on permissions.

   Once you're done, press `CTRL + C` to close the terminal.
   Finally, restart your existing LuckPerms container to see the changes take effect.

   ```bash
   docker restart $(docker ps -q --filter ancestor=ghcr.io/luckperms/rest-api)
   ```

4. Run the server:

   - If you are using IntelliJ, use the run configuration called "Run development server"
   - If not, run the following command in the root of your project:
     ```bash
     ./gradlew runDev
     ```

   This will build the core Server project, the Lobby, and the example minigame, copy them into
   their appropriate locations, and then run the Server with the games installed.

5. Join the server. It should appear as a LAN world, but if not, the IP address will be `localhost`.

## Further Reading

- Learn more about [the `worlds` folder](/reference/worlds-folder).
- Explore the code of [the Quickstart project](https://github.com/BlueDragonMC/Quickstart/) and [create your own game](/guides/creating-a-game/).
