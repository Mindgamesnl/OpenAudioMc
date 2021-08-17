[//]: # (TITLE:Proximity Voice Chat)
[//]: # (DESCRIPTION:Using proximity voicechat)
[//]: # (TAGS:voice,voicechat,proximity,accounts,talking,calling,calls)

# Voice Chat

## Enabling voice chat
Voice chat isn't enabled by default because it doesn't fit every server, and we're currently unable to offer it to everyone (even though the access group is growing rapidly). There are three ways to claim your key


(Don't like reading? here's a scuffed video version)
[![Video version](https://i.imgur.com/UZcZqF0.png)](https://www.youtube.com/watch?v=S29cQz094Bw)


### METHOD 1: Free limited access through discord
This grants you access to voicechat with limited slots for one month, after that you'll have to claim another license.
 1. Join our [Discord Server](https://discord.openaudiomc.net/)
 2. Go to the `#bot-commands` channel
 3. Link your [Minecraft server](account-setup.md) and [Discord account](account-links.md) to your craftmend account.
 4. Type `/claim`
 5. Go to your [Addons Page](https://account.craftmend.com/account/addons) and select a Minecraft server on which you'd like to use voice chat

### METHOD 2: Claiming a one-day license from in-game
You can easily get started with voicecaht by requesting a license in game using `/oa voice claim`. This license is identical to those of method 1 and 3, but will expire after one day if no account is linked.
1. Run `/oa voice claim`
2. Decide if you like it
3. Finish by linking your [Minecraft server](account-setup.md)

### METHOD 3: Free limited access through accounts
This grants you access to voicechat with limited slots for one month, after that you'll have to claim another license.
1. Link your [Minecraft server](account-setup.md)
2. Go to your [Addons Page](https://account.craftmend.com/account/addons) and click the big green claim button
4. Finish the online setup and restart your server

### METHOD 4: Access by supporting me on patreon
Patreons can get voice chat access as a perk through some of the support tiers. These activations are valid for as long as you're a patreon, and come in various packages (for different sizes of servers). To claim your patreon license:
 1. Activate your tier on  [Patreon](https://www.patreon.com/mindgamesnl)
 2. [Link your patreon to your craftmend account](account-links.md)
 3. Go to your [Addons Page](https://account.craftmend.com/account/addons) and select a Minecraft server on which you'd like to use voice chat

Patreons aren't required to link their discord, but it's higly recommended since they'll get access to patreon only channels and will receive automatic DM notifications about their server.

# Commands
Voice chat exposes a few commands to the end user (other than the regular `/audio` command), these can be used while their voice chat session is active to easily control their experience without leaving the game.
 - `/mutemic`, `/micmute` and `/mm` are quick in-game commands to mute their own microphone, players receive confirmations in chat when their state gets changed.

# Moderation
OpenAudioMc has native support for LiteBans, meaning that Muted users aren't able to use the voicechat at all (they can't listen or talk until their mute expires).

You're also able to disable Voice Chat in specific parts of your world through world guard, which is useful to discourage abuse and noise in busy areas or in spaces where you don't want it to distract from your servers gameplay. To do this, open the region gui as explained [here](regions.md) and click the "disable voice chat" button.

# Using Voice Chat
Players will be asked to enable voice chat when opening the client if voicechat is supported on the current server. They'll get a short instructional message explaining what voicechat is (explaining the configured radius, and that they can always opt-out again if they want to)
<br /><img src="https://i.imgur.com/izW2GLE.png" height="150px" />

The tutorial will disappear if they reject the invite, or get replaced with a small personal dashboard where they can mute their microphone, change their audio type (from a dynamic surround system to normal Discord-like volumes), and fine-tune their microphone sensitivity.

The empty box on the left shows who are in voice range (allowing the user to see who's nearby and talking, or to mute other individual users)
<br /><img src="https://i.imgur.com/Aal8Qd5.png" height="150px" />
<img src="https://i.imgur.com/e2aBjiK.png" height="150px" />


