[//]: # (TITLE:Play)
[//]: # (DESCRIPTION:Using the play command)
[//]: # (TAGS:play,command,subcommand,sound,start)

# Play Media
The play command is used to start [Media](media.md) for a client or to schedule it to play. It follows the syntax of:
```
/openaudio play <selector> <source> [media options]
```

selector and source are the two required arguments and media options is optional and can be left out. The usage of the media options and sources can be in the [media documentation section](media.md).

An example command for starting a simple sound for the player Mindgamesnl with the ID baron_onride
```
/openaudio play Mindgamesnl https://soundcloud.com/mrfijiwiji/imalright {id:"chill_station"}
```
