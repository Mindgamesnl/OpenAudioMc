# Voice Chat

### State of the Voice Chat feature
This feature is reserved for partners who specifically request it at the moment. It's still in active development and still has to face some challenges before it can be released into the wild (mainly to do with hosting, since voice servers are quite resource hungry which isn't financially feasible on the scale that OpenAudioMc is currently operating. A public release would likely be in the form of a paid plan, but its too early in development to say anything decisive about that.)

 - **Edit, 10feb** New beta tests have now started on the new platform, we're getting close now.
 - **Update from the 6.5 release**
```
This update contains all the required code and modules for proximity voice chat to work, but it isn't available by default. I'm slowly rolling it out (dropping invite keys in the discord every now and then) to gain insight and data on server load. It's currently unclear if it's feasible to offer this feature for free, but I'm posting frequent updates on progress in the discord. Invited users can activate the feature on their account with a button and it'll just work from there on out. Public rollout won't require another update (when it becomes available), and we'll announce that in the discord too. I hope that you understand the reasoning behind this, a voice platform like this isn't built overnight.
```
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


