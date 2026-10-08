---
slug: deployment/building-images
title: Building Container Images
---

When deploying BlueDragon with Kubernetes, you will need to create
a container image for your Minecraft server application.

Your image must contain both the `Server` project and your game JARs.
Because your games compile against the Server, the recommended way to build the image is to
build the Server and publish it to the local Maven repository first, then build your games against it.

The `Dockerfile` below does this in two stages. It assumes your project is a Gradle project
(like the [Games](https://github.com/BlueDragonMC/Games) repository) with a `copyJars` task that
copies your built game JARs into `build/all-jars`.

```dockerfile
# The `server` build context should point to the root of the Server project.
# Build and publish the Server to the local Maven repository.
FROM docker.io/library/gradle:9.5.1-jdk25 AS build-server
COPY --from=server . /work
WORKDIR /work
RUN --mount=type=cache,target=/home/gradle/.gradle \
    /usr/bin/gradle --console=plain --stacktrace --no-daemon publishToMavenLocal

# Build your games against the freshly-built Server.
FROM docker.io/library/gradle:9.5.1-jdk25 AS build-games
COPY --from=build-server /root/.m2/repository/com/bluedragonmc /root/.m2/repository/com/bluedragonmc
COPY . /work
WORKDIR /work
RUN --mount=type=cache,target=/home/gradle/.gradle \
    /usr/bin/gradle --console=plain --stacktrace --no-daemon build

# Assemble the final image.
FROM docker.io/library/eclipse-temurin:25-jre-alpine
COPY --from=build-server /work/build/libs/Server-*-all.jar /server/server.jar
COPY --from=build-games /work/build/all-jars/*.jar /server/games/
WORKDIR /server
ENTRYPOINT ["java", "-jar", "server.jar"]
```

Then, you can build your project and push the image to your registry:

```bash
docker build --build-context=server=../Server . -t <your registry url>/bluedragonmc/server-full:latest
docker push <your registry url>/bluedragonmc/server-full:latest
```

Finally, you can start containers or an Agones Fleet using this image, which will have your games preinstalled.

:::note
This Dockerfile example assumes your project has a Gradle configuration similar to the one in [this guide](/development/gradle-run-task#copy-jars-to-a-central-location), where the JARs are copied to the `all-jars` directory after the project is built. If not, you can replace the `COPY --from=build-games` line with something like this:

```dockerfile
COPY --from=build-games /work/<yourgame1>/build/libs/*.jar /server/games/
COPY --from=build-games /work/<yourgame2>/build/libs/*.jar /server/games/
COPY --from=build-games /work/<yourgame3>/build/libs/*.jar /server/games/
# ...
```
:::
