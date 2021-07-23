## Discord Slow Mode Bot
Discord's default slow mode isn't long enough? This is a bot developed to allow increased length slow modes in channels. 

## Setup
This bot requires `discord.js` to run, along with `nodejs`. `discord.js` can be installed with `npm install --save discord.js`, and `nodejs` can be installed from https://nodejs.org .

To host this bot yourself, you will need to change a couple of things. After installing NodeJS and Discord.Js, create a `config.json` file in your working directory which looks like this:
```
{
    "token":"BOT TOKEN HERE"
}
```
Paste your token into the `config.json`.

### Slowmode Time
The time for slowmode is set in milliseconds with the `timeoutTime = [TIME IN MS]` variable. The length of time must be in milliseconds, so 2 minutes will be 120000 ms.  You can also change the message send in the reported channel by changed the `reportedMessage = "[MESSAGE]"` variable. This will be preceeded by a user mention.

### Bot Exclusion
Next you **must** change the `botID = "[ID]"` variable to the ID of your bot user.  Otherwise the bot will add itself to the list for slowmode. This will cause problems if you aren't using split channels.

### Split Channels
This bot can be set up to watch a seperate channel to the one it reports into.  **E.G.** The bot watches one channel, mentions users in another channnel if they break the slowmode.
In order to enable split channels, change the `channelID = "[ID]";` and `reportID = "[ID]";` variables to the channel IDs of the watch channel and the reporting channel.
If you would like the bot to reply in the same channel, set both variables the same.
If you would like to disable reporting, change the `reporting = true` variable to `false`.

### Mod Role Exclusion (Future Feature)
The bot will be able to exclude certain roles from being affected by the slowmode, much like Discord's official slowmode. The `modRoles = ["[ROLENAME]","[ROLENAME]"]` list contains all roles that will be excluded.  You can add as many roles as you like to the list as long as the names match a role name in the server.