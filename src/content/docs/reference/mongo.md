---
title: MongoDB Data Structure
---

We use [MongoDB](https://www.mongodb.com/docs/) to store player profiles and other game data. Permissions and ranks are handled separately by [LuckPerms](/intro/project-structure).

## Connection Logic

When a game server starts up, it attempts to connect to Mongo using the connection string specified in the [Environment](/reference/environment).

## The Player Model

| Property        | BSON Type                           | Description                                                     |
|-----------------|-------------------------------------|-----------------------------------------------------------------|
| `_id`           | String                              | Dashed UUID                                                     |
| `username`      | String                              | Username                                                        |
| `usernameLower` | String                              | Lowercase username, used for case-insensitive lookups           |
| `coins`         | Int32                               | Current coin balance                                            |
| `experience`    | Int32                               | Network experience (used to calculate level)                    |
| `punishments`   | Array ([Punishment](#punishment))   | List of active and past punishments                             |
| `achievements`  | Array ([Achievement](#achievement)) | List of earned achievements (not implemented yet)               |
| `statistics`    | Map (String -> Double)              | Tracked statistics, keyed by statistic name                     |
| `cosmetics`     | Array ([Cosmetic](#cosmetic))       | List of owned cosmetics and whether they are currently equipped |
| `firstJoinDate` | Int64                               | The first time the player joined, as a Unix timestamp           |
| `lastJoinDate`  | Int64                               | The last time the player's data was loaded as a Unix timestamp  |

## Supplemental Structure Types

### `Punishment`

Represents an active or expired punishment.

| Property    | BSON Type | Description                                                                                |
| ----------- | --------- | ------------------------------------------------------------------------------------------ |
| `type`      | String    | Either `BAN` or `MUTE`                                                                     |
| `id`        | String    | A UUID (with dashes) that uniquely identifies the punishment                               |
| `issuedAt`  | Int64     | The time the punishment was issued, represented as a Unix timestamp                        |
| `expiresAt` | Int64     | The time the punishment will expire/has expired, represented as a Unix timestamp           |
| `moderator` | String    | The UUID of the player which enacted the punishment                                        |
| `reason`    | String    | A short string description of why the punishment was enacted, provided by the `moderator`. |
| `active`    | Bool      | A boolean representing whether the punishment is currently effective                       |

The `active` field allows a manual override of the punishment. Even if `active` is set to `true` on a punishment,
the expiration date should be checked. If the expiration date has passed, the punishment should not affect the player.

### `Achievement`

Represents an achievement earned by a player.

| Property   | BSON Type | Description                                              |
|------------|-----------|----------------------------------------------------------|
| `id`       | String    | A string identifier for the achievement                  |
| `earnedAt` | Int64     | The time the achievement was earned, as a Unix timestamp |

### `Cosmetic`

Represents a cosmetic that a player owns.

| Property   | BSON Type | Description                             |
| ---------- | --------- | --------------------------------------- |
| `id`       | String    | A string identifier for the cosmetic    |
| `equipped` | Bool      | Whether the cosmetic is equipped or not |
