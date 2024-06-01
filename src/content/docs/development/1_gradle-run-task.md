---
slug: development/gradle-run-task
title: Gradle Run Task
---

BlueDragon projects currently have a lot of moving parts. You can automate most of the repetitive file copying with Gradle tasks. This guide provides a few examples to help you get a development environment up and running quickly.

:::note
This guide assumes you're using the [Kotlin DSL syntax](https://docs.gradle.org/current/userguide/kotlin_dsl.html) for Gradle.
If you are using Groovy, you will have to convert our examples to match your project.
:::

## Copy JARs to a central location

Here is an example of a Gradle task that will copy your subprojects' JARs after building.
Use this in conjunction with the [Subprojects section of the Gradle Setup guide](/development/gradle-setup#setting-up-subprojects).

```kotlin
// build.gradle.kts
// Copy all built game JARs to the root build folder
tasks.register("copyJars", Copy::class) {
    subprojects.forEach { subproject ->
        if (subproject.name == "testing" || subproject.name == "common") return@forEach // Exclude the `testing` and `common` projects
        dependsOn(subproject.tasks.build) // Ensure this task runs after the subproject builds
        from(subproject.buildDir.path + "/libs/" + subproject.name + "-1.0-SNAPSHOT.jar")
    }
    into("${buildDir}/all-jars")
}

// After the whole project is built, run the task we just created to copy the JARs
tasks.build.configure {
    finalizedBy(tasks["copyJars"])
}
```

## Runnning a development server

The easiest way to run a dev server is using a Gradle task to copy the JARs and start the server for you.

### Developing the `Server` project

After adding the `copyJars` task from the prior section, add the following tasks to your Gradle build script.
This assumes you have cloned the [BlueDragonMC/Server](https://github.com/BlueDragonMC/Server/) project in a sibling directory to your games Gradle project.

```kotlin
// build.gradle.kts
// For development: copy build game JARs into the `run` folder
tasks.register("copyDev", Copy::class) {
    dependsOn("copyJars")
    from("${buildDir}/all-jars")
    into("${projectDir}/run/games/")
}

// For development: build the sibling `Server` project
tasks.register("buildServerDev", Exec::class) {
    workingDir = File(projectDir.parent, "Server")
    commandLine = listOf("../Server/gradlew", "build", "-x", "test")
}

// For development: copy the `Server` project artifact to the `run` folder
tasks.register("copyServerDev", Copy::class) {
    dependsOn("buildServerDev")
    from("${projectDir}/../Server/build/libs/Server-1.0-SNAPSHOT-all.jar")
    into("${projectDir}/run")
    rename { "server.jar" }
}

tasks.register("cleanRunFolder", Delete::class) {
    delete("${projectDir}/run/games", "${projectDir}/run/server.jar")
}

tasks.clean.configure {
    dependsOn(tasks["cleanRunFolder"])
}

// For development: uses the outputs of the above tasks to start a dev server
tasks.register("runDev", Exec::class) {
    dependsOn(tasks["copyServerDev"])
    dependsOn(tasks["copyDev"])
    workingDir = File(projectDir, "run")
    commandLine = listOf("java", "-jar", "${projectDir}/run/server.jar")
}
```

Then, whenever you want to start a dev server, you can run `gradle runDev` or add it as an IntelliJ [run configuration](https://www.jetbrains.com/help/idea/run-debug-configuration.html).

### Using the prebuilt `Server` project

If you want to use the prebuilt `Server` project instead of cloning it locally, take the code from the last section and make the following modifications:

1. Delete the `buildServerDev` and `copyServerDev` task definitions
2. Remove the `dependsOn` call for `copyServerDev` in the `runDev` task definition.
3. In the `cleanRunFolder` task definition, remove `"${projectDir}/run/server.jar"` from the `delete` call.
4. Copy a compiled [BlueDragonMC/Server](https://github.com/BlueDragonMC/Server/) JAR into the `run` directory in your project. Rename it to `server.jar`.
5. You can now run `gradle runDev` to start a dev server using a precompiled BlueDragonMC/Server JAR!

### Runtime requirements

When you run the development server, you will need to start up two external services:

1. **MongoDB** for storing player data and permissions
2. **LuckPerms** for querying and updating player permissions

The easiest way to do this is with Docker. Follow [this guide](/deployment/docker#mongodb) to start them up, and make sure they are running when you use the `runDev` Gradle task. If not, the development server will fail to start.

If you do not have any permissions, follow [this guide](/deployment/docker#permissions) to give them to yourself.
