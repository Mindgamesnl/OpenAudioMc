### *Note: as explained later in this article, voice chat is currently only available to select partners due to cost. There are plans to roll it out eventually as a monthly plan but there's no say in release date yet.* 

tarting 6.0, OpenAudioMc has a build in voice chat system.

The voice chat uses the principle of one-time private rooms with your players. The voice-chat client is build into the existing web-client, and the player doesn't need to do anything (else) than press one popup to accept the call and optionally select a microphone if they have multiple connected to their system.

A user will always be asked and informed if they want to join a call before anyone can hear them, where they can review a list with who is in the call to then accept or deny the invitation. In case of a minigame-like system, a Player can chose to automatically join calls and skip this process via a checkbox. (off by default)

Voice chat is only available for enterprise partners, which you can read more about in the Partners section.

Voice chat will work with up to 16 people and has a high quality and low latency connection

The base command format is as follows
```
/openaudio call create <selector>...
```
You can use a list of names or selectors, for example
```
/openaudio call create Mindgamesnl @p
```
Will add me and whoever is nearest into a call together.