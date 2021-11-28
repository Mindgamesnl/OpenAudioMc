# OpenAudioMc
[![Build Status](https://travis-ci.org/Mindgamesnl/OpenAudioMc.svg?branch=master)](https://travis-ci.org/Mindgamesnl/OpenAudioMc)
![commit activity](https://img.shields.io/github/commit-activity/4w/mindgamesnl/openaudiomc.svg)
[![Lines of Code](https://img.shields.io/tokei/lines/github/Mindgamesnl/OpenAudioMc)](https://github.com/Mindgamesnl/OpenAudioMc)
[![](https://img.shields.io/github/stars/Mindgamesnl/OpenAudioMc.svg?label=Stars&logo=github)](https://github.com/Mindgamesnl/OpenAudioMc/stargazers)
[![](https://img.shields.io/badge/Paper-1.17.1-brightgreen.svg?colorB=DC3340)](https://papermc.io/downloads)
[![](https://img.shields.io/discord/245497740589662209.svg?color=%237289da&label=Discord&logo=discord&logoColor=%237289da)](https://discord.gg/C4ZZ6u2)
[![](https://img.shields.io/badge/Patreon-Support-orange.svg?logo=Patreon)](https://www.patreon.com/mindgamesnl)

![welcome](https://i.imgur.com/OEvbUQb_d.png?maxwidth=1920&fidelity=grand)

OpenAudioMc is the free Minecraft audio solution, adding unique and impressing features to your server (like music, sound effects, proximity voice chat and more) without any setup on the user side. They just join your server, click one link and are good to go!

Please visit the [Documentation](https://help.openaudiomc.net/docs) for a full getting started/setup guide as well as full feature breakdowns.

## Features
 - Proximity Voice Chat (with spatial and normal audio)
 - Music and sound effects without resource pack
 - Native Worldguard integration to asign music to regions and query for key locations
 - Speaker blocks you can place throughout your world to add audio in special places
 - Built-in TrainCarts hook to assing on-board music for rides
 - LiteBans support to syncronize mutes with voice chat
 - Feature rich java API
 - Easy to use web clients (players receive their own personal link, no downloads or accounts required)
 - Automatic client translation in 9 languages
 - Automatic CDN infrastructure to speed up file delivery without any configuration
 - Out of the box support for Youtube, Soundcloud, Google Drive and Dropbox
 - Amazing documentation
 - Fully configurable
 - Stupidly simple to use
 - Active support and community
 - Smart pre-loading/buffering based on a location learning algorithm
 - Moderation utilities and hooks for voicechat
 - User preferences and client settings
 - Video background support

## Supported platforms
 - [Spigot (from 1.8.8 to latest)](https://www.spigotmc.org/resources/openaudiomc-open-source-audio-client.30691/ "Spigot Plugin Page")
 - [BungeeCord (recent builds)](https://www.spigotmc.org/resources/openaudiomc-open-source-audio-client.30691/ "Spigot Plugin Page")
 - [Velocity (currently still being tested)](https://www.spigotmc.org/resources/openaudiomc-open-source-audio-client.30691/ "Spigot Plugin Page")

## Testing
The Java plugin/implementation comes bundled with maven unit tests. All tests *must* pass before the plugin can be used or before pull requests can definetively be reviewed.

## Useful Links
* **Patreon** - <https://patreon.com/mindgamesnl>
* **Privacy and License** - <https://github.com/Mindgamesnl/OpenAudioMc/blob/master/LICENCE_and_PRIVACY.md>
* **Website** - <http://openaudiomc.net/>
* **Discord Community** - <https://discord.openaudiomc.net/>
* **Documentation** - <http://help.openaudiomc.net/docs>

# Help OpenAudioMc!
OpenAudioMc is a free spigot plugin and we'd like to keep it this way.  But to keep OpenAudioMc up and running, we need to host multiple servers (SocketIO, Web servers and more...) and this is expensive. This is why I've made a [donation page](http://donate.craftmend.com/), everything goes to the hosting for OpenAudioMc. You can also make continues donations on [Patreon](https://patreon.com/mindgamesnl) which also comes with a few extra bonuses.

# Platform setup
The core of OpenAudioMc is written to be independent of platforms, this makes it easier to maintain feature parity and compatibility across multiple platforms (bungeecord, velocity, spigot, etc). This means that some common api's need to be abstracted for internal use, here are a few terms and interfaces you need to know about
### `User` *interface*
A user refers to an actor that interacts with OpenAudioMc. This could be a player, proxy player, commandblock, or whatever. Code should be written so that it doesn't really matter *what* a user is, but you can get the original platform object in edge cases where you need to interact with native API's.
### `Client` *interface*
A `Client` is an interface that exposes some API methods of the `ClientConnection`, a client connection represents the socket API gateway to a web client, and maintains its status, authentication and manages packet throughput.
### `UserHooks` *interface*
A UserHook provider is an interface that should supply `User` instances based on the current environment state or from a query. It's generally used to get a collection of online Users, or get Users by UUID regardless of the platform. UserHooks should also adapt proxy management, and announce local nodes (if any).

# Project structure
 - `client/` contains the source code, build scripts and assets of the production web client
 - `documentation/` contains the documentation as MD and is compiled to web sources through github pages. The web client and documentation are directly served from master.
 - `jutils/` contains java utilities and wraps dependencies that would otherwise collide
 - `plugin/` contains the plugin and framework source code

### Metrics
[![Stargazers over time](https://starchart.cc/Mindgamesnl/openaudiomc.svg)](https://starchart.cc/Mindgamesnl/openaudiomc)
