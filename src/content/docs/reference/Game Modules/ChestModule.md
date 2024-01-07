---
title: ChestModule
---
`ChestModule` assigns a `Menu` to every chest in the world and allows them to be accessed by interacting with the chest. Additionally, the module assigns an ender chest to every player, which can be accessed by interacting with any ender chest block. Combine with [ChestLootModule](../chestlootmodule/) to add auto-generated loot to chests.

As stated in the Minestom README, this module is necessary for the following reason:
> Minestom by default does not know what is a chest, you will have to tell him that it opens an inventory. Every "special blocks" (which aren't only visual) need a specialized handler. After applying this handler, you have a block that can be placed anywhere simply. However, all blocks are visually there, they just won't have interaction by default.

## Dependencies
This module depends on the following modules:
- [GuiModule](../guimodule/)

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.ChestModule
```
Use the module in your game's `initialize` function:
```kotlin
use(ChestModule())
```
By default, every chest will start empty. The [ChestLootModule](../chestlootmodule/) can be used to add starting items to chests. Alternatively, you can implement your own loot system with `ChestPopulateEvent`, which is called just before a chest is opened for the first time.