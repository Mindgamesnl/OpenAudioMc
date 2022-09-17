This update adds a few much needed voice chat improvements to make it viable on larger scale servers.
Adding moderation support was a carefully considered decision and was not taken lightly as it's a double-edged sword. I worked closely with the community in discord to see what different people needed, and what the privacy concerns of others would be. You can read the entire discussion back, starting this link: https://discord.com/channels/245497740589662209/245498082723233793/1018277193035563008 

We ended up with a system that allows select moderators to listen in on voice chat, but only when they renew their moderation status every two minutes (this can be configured). This prevents people from just lurking, but also reminds them that they won't be heard.

Moderation is disabled by default (to prevent abuse from admins who don't read changelogs and just update everything), and can be enabled in the config file.
Once enabled, players will see a new banner in their voice chat tab, letting them know that moderation is enabled on their current server. This isn't too useful for end servers, but acts as some additional transparency as its different than what existing users might expect from OpenAudioMc.


Full changelog:
- The [CODE]/oa voice[/CODE] sub commands now work on velocity servers
- Fixed a bug where the inspect menu wouldn't detect some usernames
- Added moderation support! You can now enable moderation in the config, allowing moderators to listen in on potentially harmful players. More info on https://help.openadiomc.net/voicechat_moderation
- Added API methods for moderation status
- Fixed some logging issues
- Added improved support for the (now publicly available) require addon (https://www.spigotmc.org/resources/require-openaudiomc.105168/)
- Fixed some SQLite related issues while embedding Storm
- Added a moderation banner to the client
- Updaged german client translations (by Ceddix)
- Fixed a bug where players woulnd't be logged in the recent peer list.
- Extended worldguard regions (two regions with the same source next to each other) will now update volume (according to settings) if the player moves from one to the other.
- Implemented better logging and retries for some models

Looking ahead:
 - I'm currently working on non-proximity or spatial audio based voice chat. This would allow normal group calls, implementation of in-game phones, etc.
 - Some parts of the backend will be overhauled this winter. This won't result in any changes for end users, but will make it easier to add new features in the future as well as resolving some technical debt.
 - The account system/platform is due for a major upgrade, addressing some common complaints. (better email support, cleared up addon page, improved rest api, and more)