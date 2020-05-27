# WorldGuard Regions
### Note: You need the WorldGuard plugin to use regions
OpenAudioMc has an integration for WorldGuard (both 1.8 to 1.12.2, and the 1.13/1.14 update).
This enables you to add music to your regions. The media will be synced between everyone in the region, and those who enter it later. When two bordered regions have the same sound selected OpenAudioMc will handle them as extensions and not re-start the sound when the player moves from one to the other. When both regions have different sounds then the old one will slowly fade out while the new sound starts. Overlapping regions are also supported.

Regions have two commands (for adding and removing), the format goes as follows
```
/openaudio region <create/delete> <worldguard-region-name> [source if created]
```

**examples**
In this example, we want to add a sound to our WorldGuard region called station
```
/openaudio region create station https://soundcloud.com/mrfijiwiji/imalright
```
And we can remove the sound from the region if we've had enough of it
```
/openaudio region delete station
```

You can also get fancy and create temporary regions.

Temporary regions function just like regions, except that they disappear after a some time and synchronize based on when they were created. This is very use full for systems like shows, where you want users to join later on.

The base command is
```
/openaudio region <temp> <worldguard-region-name> <duration in seconds>
```
example,
```
/openaudio region temp my-show https://soundcloud.com/mrfijiwiji/reality-is-more-beautiful 70
```
This will create a region with that song for 1 minute and 10 seconds.