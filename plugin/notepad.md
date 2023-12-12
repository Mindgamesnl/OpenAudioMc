# New features
- Playlists! You can now create and manage playlists in-game!
    - Accessible through `/oa playlist`
    - allows you to add/remove songs from a playlist at will, and access them through `/oa play @a list:my-list-name`
    - More info: https://openaudiomc.net/docs/playlists
- Deafening! You can now temporarily deafen voicechat
    - Accessible through `/deafen` or the button in the web client
    - Deafening will mute all voicechat, and prevent you from hearing others but still play music
    - Also includes new messages (in the config) and API events to listen to (un)deafening
- Media overwrites! You can now create media that'll overwrite regions/speakers
    - Media with either the `muteRegions` or `muteSpeakers` property will temporally mute all regions/speakers for that player
    - Regions/speakers the player entered whilst the media is playing will also be muted
    - Overwrites can stack, and the regions/speakers will only unmute again once all overwrites have finished playing
    - This is useful for things like shows/announcements, where you don't want media overlapping
    - More info: https://openaudiomc.net/docs/media_sources

# Fixes
- Fixed the notorious bug where media would continue to play after leaving a region/speaker
- Fixed an issue with the vicinity messages causing error spam due to broken states
- Fixed an issue where players in 1.20.2+ would sometimes get kicked from bungee-cord networks with plugin running on the proxy, due to bad handling of the configuration phase while sending chat/plugin messages.
- Fixed a bug where microphone mute state would not be synced with subservers while in a bungee-cord network
- Fixed a bug where some voicechat API events would not fire on subservers in a connected bungee-cord network
- Fixed an issue where files from the OA cdn would sometimes not have the correct cors headers set
- Fixed a bug causing some client sources to not be picked up by the content proxy

# Other changes
- "Inactive" servers will now be kept for longer
    - Inactive servers will now be kept for 2 months instead of 1
    - Files will no longer be deleted from inactive patreons
- The upload file size limit has been increased to 100MB
- Storage for free accounts has increased from 100MB to 200MB
- the 20 and 50 patreon tiers now have 30 and 60 slots respectively (current patreons have been upgraded automatically)
- Logo and background images are now available to everyone (250kb file limit, 10mb for patreons)