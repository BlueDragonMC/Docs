---
slug: deployment/building-images
title: Building Container Images
---

When deploying BlueDragon with Docker or Kubernetes, you will need to create
a container image for your Minecraft server application.

To add your games to the base `BlueDragonMC/Server` image, you can create a basic Dockerfile that looks something like this:

```dockerfile
# Build the project into an executable JAR
FROM docker.io/library/gradle:8.6-jdk21 as build
# Copy build files and source code
COPY . /work
WORKDIR /work
# Run gradle in the /work directory
RUN /usr/bin/gradle --console=plain --info --stacktrace --no-daemon build

# Use each built game to make a new image on top of the base "server" image
FROM ghcr.io/bluedragonmc/server:latest

# Copy built game JARs
COPY --from=build /work/build/all-jars/*.jar /server/games/
```

Then, you can build your project and push the image to your registry:

```bash
docker build . -t <your registry url>/bluedragonmc/server-full:latest
docker push <your registry url>/bluedragonmc/server-full:latest
```

Finally, you can start containers using this image which will have your games preinstalled.

:::note
This Dockerfile example assumes your project has a Gradle configuration similar to the one in [this guide](/development/gradle-run-task#copy-jars-to-a-central-location), where the JARs are copied to the `all-jars` directory after the project is built. If not, you can replace the `COPY --from=build` line with something like this:

```dockerfile
COPY --from=build /work/<yourgame1>/build/libs/*.jar /server/games/
COPY --from=build /work/<yourgame2>/build/libs/*.jar /server/games/
COPY --from=build /work/<yourgame3>/build/libs/*.jar /server/games/
# ...
```

:::
