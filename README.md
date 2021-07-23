## Discord Slow Mode Bot - Developed for ATT
Discord's default slow mode isn't long enough?This is a bot developed to allow increased length slow modes in channels. Originally developed as a bot for the A Township Tale Discord server to moderate the "community servers" channels, it will work as a lengthened slowmode bot with the correct setup

## Setup
To host this bot yourself, you will need to change a couple of things.  First, create a `config.json` file which looks like this:
```
{
    "token":"BOT TOKEN HERE"
}
```
Paste your token into the `config.json`.

Next you **must** change the `botID = "ID"` variable to the ID of your bot user.  Otherwise the bot will add itself to the list for slowmode. This will cause problems if you aren't using split channels.

####Split Channels
This bot can be set up to watch a seperate channel to the one it reports into.  **E.G.** The bot watches one channel, mentions users in another channnel if they break the slowmode.
In order to enable split channels, change the `channelID = "[ID]";` and `reportID = "[ID]";` variables to the channel IDs of the watch channel and the reporting channel. 

## Mod Role Exclusion (Future Feature)
The bot will be able to exclude certain roles from being affected by the slowmode, much like Discord's official slowmode. The `modRoles = ["[ROLENAME]","[ROLENAME]"]` list contains all roles that will be excluded.  You can add as many roles as you like to the list as long as the names match a role name in the server.