# Welcome!
It's been a while since our last update. I've been working on a lot of things, but I've also been busy with other projects. I'm happy to announce that we're finally ready to release a new version of OpenAudioMc. This version is a complete rewrite of the client, and a complete rewrite of the backend. It also has a lot of new features, and a lot of new things to look forward to.
Please take your time to read this changelog, as it contains a lot of information about the new version. If you have any questions, feel free to ask them on our Discord server: https://discord.openaudiomc.net/

# Upgrading
We have a video version of the upgrade guide at: https://youtu.be/LpyQTfYW0zU

Uprading from previous versions is pretty straight forward, but does need some extra love and attention as we've moved to a new backend and account system.
 1. Download the new plugin jar, and replace your old one (for all servers where you currently have it installed, including BungeeCord or Velocity)
 2. Create an account on https://account.openaudiomc.net/
 3. Start your server, run `/oa link` and then click on that message to link your server to your new account
 4. (Optional) Link your Discord and Patreon on https://account.openaudiomc.net/settings
 5. (for Vistas and 1.8.* Users) You will need to download the newest version of your installed modules. 

# Links
- New documentation: https://openaudiomc.net/docs
- Account: https://account.openaudiomc.net/
- Discord: https://discord.openaudiomc.net/

# Changelog
## Client
 - **New & Changed**
   - The entire client got rewritten to React and to follow modern web standards
   - Improved spatial audio
   - You can now see your real-time microphone volume while changing sensitivity
   - You can now see the amount of players within range and the amount of players who are talking
   - Improved throughput and performance of the backend
   - Improved localization
   - Added a debug menu
   - Deprecated DropBox and GoogleDrive
   - Added a new, easier and simpler on-boarding for new users
   - Redesigned the navbar and navigation
 - **Fixes**
   - Fixed a bug where the client would crash when you would try to connect to a server
   - Fixed a bug where the client would crash when you would try to connect to a server with a different version
   - Fixed a bug where spatial voicechat would stutter when moving a lot
   - Fixed a bug where audio streams would stutter when 10 or more players were talking
   - Fixed a bug where your VoiceChat settings page wouldn't show the current applied settings
   - Fixed a bug where automatic volume adjustments would randomly enable itself or not apply
   - Added clearer error messaging
   - Fixed a bug where some messages wouldn't translate if the language file took too long to load
   - The health check service should no longer reset clients on custom domains on their first timeout, except given a 5 minute grace period
   - Changed UI elements to be more consistent and accessible
 
## Plugin
 - **New & Changed**
   - WorldGuard regions now get managed on a per-world basis. Meaning you can re-use region names between worlds, and assign global music to `__global__` for specific worlds.
   - Region properties like Fade Time and Volume can now be managed through commands & Command blocks, no longer requiring players to work the GUI (altough they still can)
   - Completely dropped Philips Hue support as their API limitations make it impossible to support it properly in combination with new browser restrictions
   - Dropped browser Notification support, as it wasn't generally used and less than 1% of players even accepted notification permissions
   - The old patreon *Rest Direct* CDN is now deprecated and has been replaced by account files. It still works but won't continue to function forever. We can help you to migrate all your files if necessary, just get in touch.
   - *Rest Direct* is now **disabled** by default because of its deprecation. This speeds up boot times considerably and reduces the confusion about ports. 
   - Added a new setting allowing you to force-run OpenAudioMc on some offlinemode servers, improving compatibility with a lot of free Minecraft Server hosts
   - Added proper NBT and speaker support for 1.19.4
   - Reworked placeholder support, added a few new ones and renamed current placeholders to be more consistent
   - You can now set a default fallback world for some commands when executed by the console. This defaults to "world" or the first overworld we find when updating your config.
   - Players now receive a message when other players in their (configurable) vicinity are in Voice Chat, to promote more community interaction. The message, interval and distance can all be configured (or you can just disable it)
   - Moderation mode now hides your input settings and adds a warning to the client, making it easier to distinguish between normal and mod mode
 - **Fixes**
   - Regions are no longer applied to incorrect worlds
   - Banned voicechat accounts no-longer get their state reset without reason
   - Fixed some speaker bugs for 1.19.4 where servers wouldn't detect interactions
   - Fixed a bug where players would switch servers (through bungeecord) and it wasn't getting loaded in properly
   - Fixed a few concurrency issues
   - The API now respects client state
   - Fixed some compatebility issues with Minefort

## Account & Backend
 - **New & Changed**
   - Moved to a new account system for OpenAudioMc, no longer linking it to some of my other projects
   - Fingerprints are now completely removed, server linking now just goes through a magic link
   - Discord linking now goes through their OAuth2 system, replacing our Fingerprint bot
   - Patreons can now upload background images and other client customizations directly to their server, no longer requiring their own web server
   - Patreons can now upload custom sounds directly to their server. Patreons get 10 gigabyte of storage, non-patreons will get a generous free tier as well within the following weeks.
   - Patreon licenses are now a lot easier to manage
   - Settings now get applied faster
   - You can now disable VoiceChat on a per-server basis, no longer requires intervention from our Team
   - Emails are now delivered faster and to the correct inbox
 - **Fixes**
   - Rate limits are generally more user-friendly
   - Improved VoiceChat latency thanks to a new encoder
   - Fixed a bug where some plugin installations would no longer receive client login requests, causing lockups
   - Packet order is now maintained throughout the pipeline

## Miscellaneous
 - The documentation got mostly rewritten to clearer and provide better examples
 - The documentation got integrated with the main website, at https://openaudiomc.net/docs
 - The web client got moved from client.openaudiomc.net to session.openaudiomc.net
 - Added some new documentation articles targeted at end-users, so you can easily explain how to use VoiceChat and some other client-side features
 - All user data on the old account system (account.craftmend.com) will be destroyed immediately after it sunsets and completely closed down.
 - We now actually have a landing page at https://openaudiomc.net/