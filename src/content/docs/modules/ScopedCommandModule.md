---
title: ScopedCommandModule
---

`ScopedCommandModule` lets you register a command whose availability is scoped to the players in your game.

Minestom requires command names to be globally unique, so two games that register a command with the same name share a
single implementation. This module ensures the command is only shown to players who are in a game that registered it.

## Public Methods

- `registerCommand(generator: () -> Command)`: Registers a command for the players in this game. The generator is only
  invoked the first time the command is registered.
- `unregisterCommand(command: Command)`: Unregisters the command for the players in this game.

## Usage

```kotlin
import com.bluedragonmc.server.module.ScopedCommandModule
```

```kotlin
use(ScopedCommandModule()) { scopedCommandModule ->
    scopedCommandModule.registerCommand { MyCommand() }
}
```
