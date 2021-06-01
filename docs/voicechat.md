# Voice Chat

### State of the Voice Chat feature
Voicechat is currently in closed beta and only accessible to those in the partner program or discord members who snatched a code. You can try claiming one by typing `/claim` in the `#bot-commands` channel. 
You can apply/learn more about partnerships here [https://help.openaudiomc.net/partners.html](https://help.openaudiomc.net/partners.html)

### Initial setup
(proximity) Voice Chat is installed as an addon on your [craftmend account](account.md) 

### How-to
#### Commands
Players can use
 - /mutemic
 - /micmute
 - /mm

to toggle their microphone mute from in-game.

#### Moderation
OpenAudioMc has native support for BanManager, meaning that Muted users aren't able to use the voicechat at all (they can't listen or talk until their mute expires).
You can implement custom moderation rules through the [Java Api](java_api.md)

#### Connecting
Players will be asked to enable voice chat when opening the client if voicechat is supported on the current server. They'll get a short instructional message explaining what voicechat is (explaining the configured radius, and that they can always opt-out again if they want to)
<br /><img src="https://i.imgur.com/izW2GLE.png" height="150px" />

The tutorial will disappear if they reject the invite, or get replaced with a small personal dashboard where they can mute their microphone, change their audio type (from a dynamic surround system to normal Discord-like volumes). The empty box on the left shows who are in voice range (allowing the user to see who's listening to them and to mute other individual users)
<br /><img src="https://i.imgur.com/WyPdgov.png" height="150px" />
<img src="https://i.imgur.com/e2aBjiK.png" height="150px" />


