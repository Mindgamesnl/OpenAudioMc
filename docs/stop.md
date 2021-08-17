[//]: # (TITLE:Stop)
[//]: # (DESCRIPTION:Using the stop sub command)
[//]: # (TAGS:stop,subcommand,command,stop,music,audio)

# Stop Media
The play command is used to stop [Media](media.md) it is playing. When executed, all media will be stopped for a player (with exception for Regions and Speakers).

You can also add an id to the end, and only the sound with that ID will be stopped. The code follows the following format
```
/openaudio stop <selector> [id]
```
*&lt;selector> is the only required argument, [id] can be left out*

And to stop the sound with the id `chill_station` for the player `Mindgamesnl`
```
/openaudio stop Mindgamesnl chill_station
```