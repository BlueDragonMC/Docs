---
title: CustomItemModule
---

`CustomItemModule` allows you to define custom items, which have specialized behaviors when players interact with them.

## CustomItem

`CustomItem` is an abstract class that defines a particular item. Instances of this class can be immutable and shared between multiple games. Here's an example item that showcases the available events:

```kotlin
object ExampleItem : CustomItemModule.CustomItem() {
    // This ID must be unique to my item
    override val uid = "example_item"
    // Players must wait this duration after using the item before they can use (right-click) it again
    override val cooldown: Duration = Duration.ofSeconds(5)
    // The ItemStack that represents this custom item. CustomItemModule will add a unique tag based on the UID.
    override fun createItemStack(): ItemStack = ItemStack.builder(Material.STICK).customName(Component.text("Example Item")).build()

    override fun onUse(event: PlayerUseItemEvent) {
        event.player.sendMessage("You right-clicked the item!")
    }

    override fun onClick(event: PlayerInstanceEvent): Boolean {
        event.player.sendMessage("You left-clicked the item!")
        return true // cancel the left-click event (for example, the block break or hand animation)
    }

    override fun onCooldownEnd(player: Player) {
        player.sendMessage("You can right-click the item again!")
    }

    override fun onDrop(event: ItemDropEvent) {
        event.isCancelled = true
    }

    override fun onObtain(player: Player) {
        player.sendMessage("You were given the item with CustomItemModule#giveItem!")
    }

    override fun onPickup(event: PickupItemEvent) {
        (event.entity as? Player)?.sendMessage("You picked up the item off the ground!")
    }
}
```

## Usage

Import the module:

```kotlin
import com.bluedragonmc.server.module.gameplay.CustomItemModule
```

Use the module in your game's `initialize` function:

```kotlin
use(CustomItemModule(ExampleItem))
```

Give the item to a player:

```kotlin
customItemModule.giveItem(player, ExampleItem)
```

Manage the item's cooldown for a particular player:

```kotlin
// make the player wait 3 seconds before using the item again
customItemModule.setCooldownRemaining(player, ExampleItem, Duration.ofSeconds(3));
// check how much time is left until the player can use the item again
val duration = customItemModule.getCooldownRemaining(player, ExampleItem)
```
