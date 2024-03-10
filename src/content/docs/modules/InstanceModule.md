---
title: InstanceModule
---
`InstanceModule` is an abstract module that supplies [instances](/intro/games-servers-instances/#instances) to the game. It cannot be used by itself, but BlueDragon includes several implementations.

## Implementations
- [SharedInstanceModule](../sharedinstancemodule/): Ideal for games that use Anvil world files and do not allow changes to the map during gameplay.
- [InstanceContainerModule](../instancecontainermodule/): Ideal for games that use Anvil world files and allow changes to the map during gameplay.
- [CustomGeneratorInstanceModule](../customgeneratorinstancemodule/): Ideal for games that with custom, dynamic world generation.

## Public Methods
### `getRequiredInstances`
```kotlin
open fun getRequiredInstances(): Iterable<Instance>
```
Returns a set of instances that are required, but not owned, by this module. This is necessary because shared instances must have a registered instance container for chunk loading, but the instance container can be used by multiple games at the same time (and therefore not "owned" by any game). Returns an empty set if not overridden.

### `getSpawningInstance`
```kotlin
abstract fun getSpawningInstance(player: Player): Instance
```
Returns the instance that a player should spawn in when initially joining the game.

### `ownsInstance`
```kotlin
abstract fun ownsInstance(instance: Instance): Boolean
```
Returns `true` if this module "owns" the instance. Modules should own an instance if they created it, and ownership should be released when the instance is no longer needed. Instances with no modules that declare ownership of them may be cleaned up at any time.