# General development notes

Changes since last release:
 - Added a `chat` and `actionbar` show trigger type to display messages (more info on https://help.openaudiomc.net/show)
 - ALl new the client web-ui 
 - Added plugin support for obstruction support for 3D speakers (client support coming on a later date)
 - Added velocity support (by https://github.com/fluse1367)
 - You can now disable synchronization for specific speakers by disabling their sync option in the speaker configuration gui
 - Speakers no longer have gamemode creative as a placement requirement, making them usable on survival servers (if players have the permissions)
 - The predictive audio pre-loading system now favours recent additions to sound over popularity
 - Fixed a bug with speaker garbage collection
 - Speaker garbage collection only purges the cache by default, but you can set it to forcefully delete speakers from storage by setting `gc-strategy` to `DELETE`
 - Protocol improvements lowering the packet rtt
 - Player sessions now get reset when the socket state changes, which fixes a bug that would make some urls not work for minutes at a time
 - Plugin initialization is a lot faster because of the updated authentication flow, this also fixes a bug where blocked accounts got into illegal states
 - 3D speakers have improved gain ratios, improving sound quality
 - Added plugin support for obstruction support for 3D speakers (client support coming on a later date)
 - The `click-to-connect` message now supports the `{url}` and `{token}` placeholders, allowing you to display the login token and url in the chat for Minecraft-bedrock clients.
 - The web client now has a separate login screen instead of defaulting to the "invalid session" page, making it more user-friendly for bedrock clients who need to login manually
 - Audio tokens that are freshly created now cache for a little while, making url creation after joining a lot faster
 - Broken speakers no longer drop the skull in survival mode
 - The speaker garbage collection now runs in paired groups instead of checking every speaker at once, reducing CPU load and loosening the world-load requirement for servers with a lot of speakers (1000+)
 - Account creation has been severely rate limited
 - Reduced overall console spam/logging (but you can enable debug mode in the `data.yml`, and it'll log everything after a restart)
 - Removed the deprecated Cards API because of its many issues and lack in popularity
 - Fixed playback issues with the traincarts integration
 - Fixed visual bugs related to the `/volume` command
 - Improved the network capacity by adding servers
 - Fixed dependency clashing with other plugins
 - The client now synchronizes the volume with the server, which adds the `Client#getVolume()` method to the api which can be used in all sorts of cool ways
 