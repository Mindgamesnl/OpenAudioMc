[//]: # (TITLE:Media)
[//]: # (DESCRIPTION:Using and understanding media sources and playback options)
[//]: # (TAGS:youtube,media,options,looping,ids,id's,soundcloud,mp3,mp4)
# Media

OpenAudioMc supports multiple file formats for your sounds, these are:
- Local audio (from `plugins/OpenAudioMc/audio/`)
- Direct file links (mp3, ogg, wav, etc)
- SoundCloud
- YouTube


# Local Audio
Patreon's are able to play audio files through stored in their plugins folder. File names can't include spaces, but you use subdirectories. Simply prefix your source in a command with `local:` and we'll automatically convert, optimize and upload the sources for you. Make sure that your server is compatible with [RestDirect](restdirect.md)!

Example: `/oa play @a local:themidnight-monsters.mp3`, which will be read from `plugins/OpenAudioMc/audio/themidnight-monsters.mp3`

# Random media and Playlists.
You might want to shake things up a little every once in a while by assigning random sounds to a region, command or whatever. You can simply do this by stringing multiple sources in a JSON array, so you'd enter something like `["https://www.youtube.com/watch?v=Oddp32TODKs","https://www.youtube.com/watch?v=QBCLsnxNd4Y"]` instead of your singular source. The client will choose a random sound from the list when the media is requested to start.
Randomized media with looping tags will reselect their source every time they loop, functioning like a playlist.

# Playback Options

The OpenAudioMc audio format is what's being used throughout the network. It contains the source, and a UNIX timestamp for when the command was executed. This is defined by the plugin and does NOT get changed anywhere further on in the process.

Other optional metadata included:
- **`fadeTime` (number)**: Time for the sound to fade in (in MS)
- **`id` (text)**: The ID that will be assigned to the sound. This can be used to stop one specific sound later.
- **`loop` (true/false)**: Decide whether the sound should restart after finishing or not. This will mean that the sound will keep playing until manually stopped.
- **`pickUp` (true/false)**: Decides if the sound should continue (AKA Sync) between sessions and players
- **`expirationTimeout` (number)**: The amount of time (in seconds) a sound should be kept for. Setting it to 120 will mean that the client will hear the sound, even if it connected after it started.
- **`volume` (number)**: A scaled volume level that will be used for the sound (so you can make sound effects quiet, etc)

All the optional tags should be included in the Play command as a JSON object with the spaces left out, so a fully decked out argment would look like
```json
{fadeTime:1500,id:"station",loop:true,pickup:true,expirationTimeout:3600000,volume:50}
```


# What to use when

| Source       | Pros                                                        | Cons                                                                      | Example usecase                                                                             |
|--------------|-------------------------------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Local Files  | - Fast<br>- Reliable<br>- Scalable<br>-Incredibly to use    | - Currently exclusive to patreons                                         | Users who just want to use the plugin, and not worry about infrastructure at all!           |
| Direct MP3   | - Reliable<br>- Scalable<br>                                | - Requires webserver <br>- Requires maintenance                            | Best for usecases where timing and reliability is important.<br>(like Ride, Areas, etc etc) |
| Google Drive | - Easy to use<br>- Easy to share<br>- Free                  | - Not particularly fast<br>- Links can expire                             | For quick and easy file hosting.<br>(Event music, sound effects, etc etc)                   |
| DropBox      | - Fast<br>- Easy to use<br>- Free                           | - Url may need manual edits<br>- Links may be blocked when used often     | For general purpose audio hosting.<br>(Same as Direct MP3 but on a smaller scale)           |
| SoundCloud   | - Stupidly Simple                                           | - Not particularly fast<br>- Some artists prohibit the use of their songs | Easy music sharing and playback.<br>(Same as Direct MP3, but on a small scale)              |
| YouTube      | - Stupidly Simple<br>- Reliable                             | - Playback isn't instant<br>- Delay may cause timing issues               | Simple area music, sound effects, dialogue, etc etc                                         |


*Notes:*
 - Youtube videos need to be public and big videos might not work. It's best to upload your own.
 - Some soundcloud artists block their music from being played on third party sites like OpenAudioMc, if a soundcloud song fails to play, its most likely this. You are best off uploading it to your own account (but be sure to set it to public)
 - GoogleDrive and DropBox share url's have to be public and permanent. Please note the permanent part, since it'd be a shame if your music suddenly stops playing.
 
 It is possible to add support for other sources as well. OpenAudioMc has a java api to add support for url manipulations. This means that there are add-on plugins like [OpenAudioMc-Youtube](https://www.spigotmc.org/resources/openaudiomc-youtube-support.64584/) to expand the feature set with an alternative youtube engine.
