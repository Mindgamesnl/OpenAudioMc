# General development notes

Todo:

GH Changelog:
 - Worldguard `__global__` is now usable as a region
 - Added a soundcloud now playing widget (required by the soundcloud TOS)
 - Speaker Garbage Collection now automatically uses chunk scaling if there aren't too many
 - The Speaker Set and Remove commands have been fixed for minecraft versions above 1.12.2
 - The Speaker ghost bug has been fixed for minecraft versions above 1.12.2
 - Added Playlists, JSON arrays of media links will now be loaded as a playlist and be played sequentially in Regions, Speakers and Ambiance Sounds. You can enable it manually by setting the `loop` flag in your play command.
 - Re-added philips hue support in the new client (with a new sleek UI as a free bonus)
 - Time Synchronization has been improved when jumping over timezones
 - the Java API had a small overhaul, adding new data methods, Hue API methods and voice chat hooks
 - Node Servers (spigot based servers running under a bungee proxy) no longer request unused authentication headers, fixing issues with rate limiting on some bungeecord networks and setups
 - Removed OpenAudioMc+ 
 - Implemented [CraftmendAccounts](https://account.craftmend.com/) to manage settings and addons like voice chat (replaces OpenAudioMc-Plus)
 - More client messages (welcome message, button texts, global titles and more) are now accessible through your client settings on your craftmend account.
 - Improved REST Api, adding endpoints for server listings and advanced player details
 - Added account-addon support, meaning that addons on your craftmend account will now synchronize with your servers automatically.
 - Added Persistent Fingerprints, which can be used to automate the linking of fresh openaudiomc installations to your craftmend account and apply template settings (useful for scaling servers, like ImagineFun)
 - Youtube url support is more forgiving (automatically filtering broken tags and url variables)
 - Improved dark mode for the web client (text is more readable and accent details are more pronounced when using an all-black colour profile in your client settings)
 - Added proximity voice chat which is super easy to use and doesn't require any client modifications (not enabled for all servers yet, please continue to read the update notes or documentation)
 - Look-and-feel changes to the web client and login page (shifting default colours and layout to look better on smaller devices)
 - Improved resource autoloading (its a little less trigger happy)
 - Improved networking speed and responsiveness (more efficient internal network routing)
 - Fixed some minor issues on bungeecord networks, which caused sessions to lock up or fail authentication with correct tokens
