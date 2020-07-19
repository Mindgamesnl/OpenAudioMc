# Media

OpenAudioMc supports multiple file formats for your sounds, these are:
- .MP3
- .FLAC
- .WEBM
- .WAV
- .OGG
- Google Drive Public Share Link
- DropBox Public Share Link
- SoundCloud
- YouTube

*Notes:*
 - Youtube videos need to be public and big videos might not work. It's best to upload your own.
 - Some soundcloud artists block their music from being played on third party sites like OpenAudioMc, if a soundcloud song fails to play, its most likely this. You are best off uploading it to your own account (but be sure to set it to public)
 - GoogleDrive and DropBox share url's have to be public and permanent. Please note the permanent part, since it'd be a shame if your music suddenly stops playing.
 
 It is possible to add support for other sources as well. OpenAudioMc has a java api to add support for url manipulations. This means that there are add-on plugins like [OpenAudioMc-Youtube](https://www.spigotmc.org/resources/openaudiomc-youtube-support.64584/) to expand the feature set with an alternative youtube engine.
 
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