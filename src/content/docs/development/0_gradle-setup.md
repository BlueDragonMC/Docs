---
slug: development/gradle-setup
title: Gradle Setup
---

This guide will walk you through the way we recommend setting up Gradle for your games.
This is also how we created our Games repository internally.

:::note
This guide assumes you're using the [Kotlin DSL syntax](https://docs.gradle.org/current/userguide/kotlin_dsl.html) for Gradle.
If you are using Groovy, you will have to convert our examples to match your project.
:::

## Version Catalogs

If you use subprojects (mentioned later in this guide), we recommend setting up a Gradle [version catalog](https://docs.gradle.org/current/userguide/platforms.html).
This allows you to share dependency versions between multiple subprojects, and [Minestom uses it internally](https://github.com/Minestom/Minestom/blob/master/gradle/libs.versions.toml).

To set up a version catalog, follow [this guide](https://docs.gradle.org/current/userguide/platforms.html#sub:conventional-dependencies-toml) from the Gradle documentation.

## Subprojects

If you plan on making multiple games for your server (even a lobby and one minigame),
we recommend placing them all in one project so that they can share common code.

You should create a `common` Gradle subproject which your games can depend on. In that project,
you can write utilities, like methods that create packets or format chat messages.
You can also place common [game modules](/intro/example-game/#creating-a-game-module) in the `common` subproject. That way, all of your games can
import and `use` them.

Learn more about Gradle subprojects [here](https://docs.gradle.org/current/userguide/multi_project_builds.html).

### Setting up subprojects

1. Create a folder in the root of your project. Name it according to the name of your minigame.
2. Inside that folder, create two files: `build.gradle.kts` and `settings.gradle.kts`. These define the build configuration for the subproject.
3. In `build.gradle.kts`, configure your subproject to build its own JAR. For example:

   ```kotlin
   group = "com.bluedragonmc.games"
   version = "1.0-SNAPSHOT"

   repositories {
       mavenCentral()
       maven(url = "https://jitpack.io")
   }

   dependencies {
       // `libs.<name>` comes from the version catalog we set up earlier.
       // See the "Version Catalogs" section of this guide for more information.
       implementation(libs.server) // The BlueDragon core `Server` library, which provides a runtime and some common game modules
       implementation(libs.bundles.configurate) // Sponge's `Configurate` library, which provides a configuration loader and some common (de)serializers
       implementation(libs.minestom) // Include Minestom to compile against
   }

   tasks.getByName<Test>("test") { // Optional
       useJUnitPlatform()
   }
   ```

4. Configure your Gradle build settings.
   ```kotlin
   // your-game/settings.gradle.kts
   project.name = "yourgamename" // Should be the same name as the directory you created in Step 1.
   // If you are using version catalogs, you may have to add something like this:
   dependencyResolutionManagement {
       versionCatalogs {
           create("libs") {
               from(files("../gradle/libs.versions.toml"))
           }
       }
   }
   ```
5. Include your subproject in your main project's build step. To do this, add the following to your root project's `settings.gradle.kts`:
   ```kotlin
   // settings.gradle.kts
   includeBuild(":<your project name>")
   // Replace <your project name> with the name of the directory you created in Step 1.
   // Make sure to keep the colon (:)
   ```
6. Create the source files for your project. In your subproject folder you created in Step 1, create the following directory structure:
   ```
   Your Project Root/
     (yourgamename)/
       src/
         main/
           java/ <-- If you're using Java
             com.yourcompany.yourproject/ <-- Your package name
               Main.java <-- Your main class
           kotlin/ <-- If you're using Kotlin
             com.yourcompany.yourproject/ <-- Your package name
               Main.kt <-- Your main class
           resources/
             game.properties
   ```
7. Open up the `game.properties` file and add this to it:
   ```properties
   # Fill in these variables with your game's display name and its main class's fully-qualified name.
   # For example, the `main-class` for ArenaPvP is `com.bluedragonmc.games.arenapvp.ArenaPvpGame`.
   name=Your Game Name
   main-class=com.yourcompany.yourproject.Main
   ```
8. In your `src` folder, create the package and main class you defined in Step 7. Make sure it extends the `com.bluedragonmc.server.Game` class.
9. Follow the [Creating a Game](/guides/creating-a-game) guide to start building your first game!

When you run a Gradle build on your root project, the subproject's JARs will be placed in `build/libs` inside your subproject's directory.
If you want them to be automatically copied to the root project or want a Gradle task to run a development server, see the [Gradle run task](/development/gradle-run-task) guide.
