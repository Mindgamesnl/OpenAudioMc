[//]: # (TITLE:Permissions)
[//]: # (DESCRIPTION:Plugin permissions)
[//]: # (TAGS:permissions,permission)

# Permissions
OpenAudioMc has permissions for everything and is fully configurable.
If you don't want to bother with permissions, you can give yourself OP (or `openaudiomc.*` on bungeecord) and be done with it, or dive into the specifics.

# Commands
OpenAudioMc command permissions have their own wildcard for all the permissions (`openaudiomc.commands.*`), this will give you access to all the admin commands.

You can also (dis)allow specific commands, the format for this is `openaudiomc.commands.<sub command>`, where the sub command is the second argument in your OpenAudioMc command.
Example: you need `openaudiomc.commands.region` to use `/oa region create`.

# Speakers
Speakers have their own two commands for breaking and placing the blocks.
To allow all speaker interactions, you need, `openaudiomc.speakers.*`.

The specific permissions are:
 - `openaudiomc.speakers.create` to place a speaker
 - `openaudiomc.speakers.destroy` to break a speaker
 - `openaudiomc.speakers.manage` to open the speaker GUI when clicking on one
 