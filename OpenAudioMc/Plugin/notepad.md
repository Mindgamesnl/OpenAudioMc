# New
- Added support for the new Minecraft "Player Profile" API
- Added support for 1.21.10
- Added the "patch" command, letting you update media volume/speed on the fly - https://openaudiomc.net/docs/patch_command
- Added a media patch API, enabling automation of media properties
- Added support for moveable speakers in the API (you can now make voices/effects that move in 3d space, following an entity) - https://youtu.be/LmqO67k7NuI
- New onboarding for new servers, it will now guide server owners through the initial setup steps and be more permissive by default
- The client URL can now outlive the 5 minute connection window, letting users reload the page without needing to reconnect
- Entirely reworked documentation, to be a lot clearer and easier to navigate - https://openaudiomc.net/docs

# Fixes
- Fixed spammy messages when there's no media in the account
- Fixed cors proxy issues
- Fixed a ton of issues with the old audio engine (mainly a lot of edge cases causing media to get stuck in a playing state)
- Fixed issues with text readability in the client and account platform
- Fixed config issues on velocity
- Fixed nullpointer spam issues related to moderator mode
- Fixed issues with media starting positions when using certain media types (`startAtMillis`)
- Further continued internal gradle build migration
- Fixed issues with the media caching layer, improving stability and performance

# Important heads up
- The next version of OpenAudioMc will drop support for java 8, and require at least java 11 to run. Please prepare for this change, as it will come in the next major release.
