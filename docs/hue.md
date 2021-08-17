[//]: # (TITLE:Philips Hue)
[//]: # (DESCRIPTION:Using the Philips Hue integration)
[//]: # (TAGS:hue,lights,iot,philips,lamps)
# Philips Hue
# Linking your Philips Hue Bridge
### *Note: Due to limitations in the Philips API, you'll need to load your page through `http://`instead of `https://`*

OpenAudioMc has a build in Philips-Hue integration this can be used to add real time lighting effects to your Minecraft server
The hue integration is designed to work with colors, but white lights are also supported (along with Led strips). When a hue bridge gets detected on the local network of a client, it will show a little bottom right corner.

If the user clicks the button it prompts them though the setup process where they need to select a room. The messages for this setup can be changed in the config. If the user already linked their lights before, OpenAudioMc will automatically when connected.

# Commands
The OpenAudioMc command is used to change the colors and brightness of specific lights or groups.

All color codes are explicitly in RGBA, with values for Red, Green, Blue and Brightness defined in a range from 0 to 255 . So red at max brightness will be 255 0 0 255 . The light selection is a Json array of integers that are mapped to the light id's of the selected room. Example, the philips hue starter kit has 4 lights, to change all the lights the array would be [1,2,3,4] or if you would only want to change light 2 it is [2]

The command follows the format of:
```
/openaudio hue set <selector> <lights> <red> <green> <blue> <brightness>
```
Example, if I would want to change the lights of my setup to blue the command will be
```
/openaudio hue set Mindgamesnl [1,2,3] 0 0 255 255
```