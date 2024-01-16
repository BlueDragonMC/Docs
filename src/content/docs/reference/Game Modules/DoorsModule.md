---
title: DoorsModule
---
`DoorsModule` reimplements the vanilla behavior for interacting with doors. Interacting with an open door will cause it to close for everyone on the server, and interacting with a closed door will cause it to open for everyone on the server. All types of wooden doors are supported. Iron doors do not open or close upon interaction. Trapdoors are not currently implemented, but they may be in the future.

## Usage
Import the module:
```kotlin
import com.bluedragonmc.server.module.vanilla.DoorsModule
```
Use the module in your game's `initialize` function:
```kotlin
use(DoorsModule())
```

## Attribution
- The code for this module was adopted from [BasicRedstone](https://github.com/TogAr2/BasicRedstone/blob/master/src/main/java/io/github/bloepiloepi/basicredstone/door/Doors.java) by TogAr2, which is under the MIT license.