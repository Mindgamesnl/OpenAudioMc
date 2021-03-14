# Voice BETA 0.2
Howdy howdy 👋<br />
The second major revision of our voicechat platform just dropped, so we have a juicy changelog to review, and some notes to go over.<br />
so *✨ lets get to it ✨*

## Changelog
 - [**ADDED: RTC track bundling**](https://trello.com/c/EOslKWOX/22-webrtc-channel-bundling-mux): which reduces the connection time to nearby players, significantly improves network efficiency and fixes most connection related problems (not hearing players, larger groups dropping out, etc)
 - [**ADDED: UI knickknacks**](https://trello.com/c/oOodbJMa/24-webrtc-status-indicators): You can now see who's talking, eating a little too close to their microphone or has their mic muted.
 - [**ADDED: Basic noise suppression**](https://trello.com/c/vNw8Wixu/17-voice-noise-floor): background noise should be filtered out to really make your beautiful voice *ｐｏｐ*. (its very minor for the time being, and will be tuned over time)
 - **ADDED: Real Time Network Correction (RTC-NACK)**: Packet loss and other funny network business should no longer significantly affect the user experience. Delay smooths itself out over time (by speeding the buffer up and requesting new data)
 - **ADDED: Audio Bitrate Negotiation**: Voice chat still defaults to low bitrate Opus streams but it now actively monitors your network speed and that of your pears to increase the audio quality on the fly (if possible). This change is still minimal for now, but it'll get more headroom over time (I'm monitoring additional server load to see what the extra costs in ndwidth will be)
 - **FIXED: cute bugs!** A hand full of issues related to ghost voices, not hearing people at all or just hearing them sometimes.
 - [**IMPROVED: Server peer finding**](https://trello.com/c/Fi8kZWec/31-webrtc-peer-finder-refactor): Improved the server side system that scanned the world for applicable voice chat players. This shouldn't affect the general gameplay.
 - **FIXED: Scalable Connection Pools**: The client had issues keeping up when groups and calls merged, causing some funky behaviour. This should now be fixed (partially thanks to the first changelog note)
 - **IMPROVED: Constant Volume Mode**: The constant volume mode got some minor improvements when starting new tracks. It still doesn't give the full experience that spatial audio does, but it sounds a little less shitty now.
 - **IMPROVED: Peer Request Latency**: The network latency related to peer synchronization (new players appearing in radius) got improved significantly (hovering around 20 to 50 milliseconds) which makes the overall call feel snappier, and those videos of others falling to their doom even funnier.
 - **IMPROVED: The Java API** which received support for moderation tools such as litebans, and a new platform independent event driver (supporting both Spigot, Bungee and Velocity)

## Known problems
 - Firefox continues to be problematic with its opus implementation and still doesn't work.

## Development Notes
Thank you for your continued support during the early beta releases of openaudio voicechat. We've grown to 80+ concurrent voice connections during the closed beta and hope to scale that up in the near future. As always, please consider [donating](https://donate.craftmend.com/) to support the project and its continued development. I'm planning to add more resources to the pool soon and am currently nearly working full time on the project, so any support is really appreciated.

And as always,
 - [Join the discord](https://discord.openaudiomc.net/) to share feedback and be part of the growing community
 - Follow me on [twitter](https://twitter.com/Mindgamesnl) for continues status updates and rants about updates
 - Review OpenAudioMc on [spigot](https://www.spigotmc.org/resources/openaudiomc-realtime-online-music-and-effects-bungeecord-velocity.30691/) to share your experience using the platform.

I hope to see you around,<br />
*~Mats / Mindgamesnl*