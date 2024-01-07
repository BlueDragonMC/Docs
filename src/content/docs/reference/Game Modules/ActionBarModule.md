---
title: ActionBarModule
---
`ActionBarModule` provides a standard way of displaying information in the player's action bar. When multiple messages want to be displayed, they will all appear, with a separator between them.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.gameplay.ActionBarModule
```
Use the module in your game's `initialize` function:
```kotlin
use(ActionBarModule(interval = 2, separator = Component.text(" | ", NamedTextColor.DARK_GRAY)))
```
The `interval` parameter defines the delay between each action bar update, in ticks.

Now, from any module, you can listen for the `ActionBarModule.CollectActionBarEvent` to add a message to the action bar.
```kotlin
eventNode.addListener(ActionBarModule.CollectActionBarEvent::class.java) { event ->
    // Adding both these items will display "Hello World! | Hello World 2!" in the action bar
    event.addItem(
        Component.text("Hello World!")
    )
    event.addItem(
        Component.text("Hello World 2!")
    )
    // You can also use event.player to get the specific player
}
```

## Considerations
- Games are not required to use `ActionBarModule`. If you are creating a module that is not specific to a single game, it is recommended to check if the module is present, falling back to `player.sendActionBar` if not.