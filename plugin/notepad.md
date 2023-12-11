# New features
- Playlists! You can now create and manage playlists in-game!
    - Accessible through `/oa playlist`
    - allows you to add/remove songs from a playlist at will, and access them through `/oa play @a list:my-list-name`
- Deafening! You can now temporarily deafen voicechat
    - Accessible through `/deafen` or the button in the web client
    - Deafening will mute all voicechat, and prevent you from hearing others but still play music
    - Also includes new messages (in the config) and API events to listen to (un)deafening

# Major fixes
- Fixed an issue with the vicinity messages causing error spam due to broken states
- Fixed an issue where players in 1.20.2+ would sometimes get kicked from bungee-cord networks with plugin running on the proxy, due to bad handling of the configuration phase while sending chat/plugin messages.
- Fixed a bug where microphone mute state would not be synced with subservers while in a bungee-cord network
- Fixed a bug where some voicechat API events would not fire on subservers in a connected bungee-cord network