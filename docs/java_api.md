# Java API
The OpenAudioMc Java API is split into three parts, these are
 - **Client** All player related functions (events, hooks, etc)
 - **WorldApi** Hooks into the region and physical speaker system *(only accessible through Spigot)*
 - **MediaApi** Hooks and controls towards controls
 - **RegistryApi** Access to the OARegistry, for adding sub-commands and source middleware (also known as mutations), and voicechat player filters
 
To get started, clone the github repository and build the latest release locally through maven, then add it in your project by adding the following to your pom
```xml
<dependency>
    <groupId>com.craftmend.openaudiomc</groupId>
    <artifactId>OpenAudioMc</artifactId>
    <version>{{ Release version }}</version>
    <scope>provided</scope>
</dependency>
```

You can then obtain your api instance with
```java
AudioApi api = AudioApi.getInstance();
```

## Using events
OpenAudioMc has an internal event driver which is used to process requests and important state changes.
You can access an instance of the driver to catch and process events yourself (this example shows you how to cancel voice chat for certain users)
```java
AudioApi.getInstance().getEventDriver()
        // subscribe to an event
        .on(ClientRequestVoiceEvent.class)
        // what to do?
        .setHandler(event -> {
            // event is a dynamic instance from the on method

            // check if the name isn't Mindgamesnl
            if (event.getRequester().getPlayer().getName() != "Mindgamesnl") {
                // cancel the event, therefor blocking voice chat
                event.setCanceled(true);
            }
        });
```

## Getting a Client
A client object resembles the web-connection of a given player and contains api methods (like `isConnected()`, `onConnect` etc) and is used to specify a player in other API methods.
You can request a Client by Player-UUID on both bungeecord and spigot, but note that it'll only be available a few ticks after joining. Example for getting my own connection:
```java
Client mindgamesnl = api.getClient(UUID.fromString("f0c8657b-f384-4df6-9d66-e9f36c36ce8a"));
```
We can also hook on connection events, which is as simple as
```java
mindgamesnl.onConnect(() -> {
    // I opened the web client!
});
```

## Playing a sound
Starting a simple sound is as easy as
```java
api.getMediaApi().playMedia(client, "https://example.com/a.mp3");
```
but we can get a lot more creative then that with media options (like setting a Sound ID, playback volume etc), which still is pretty simple, starting a looping sound at half volume with the id "example" would be like
```java
MediaOptions options = new MediaOptions();
options.setLoop(true);
options.setId("example");
options.setVolume(50);
api.getMediaApi().playMedia(client, "https://example.com/a.mp3", options);
```

## Stopping sounds
Stopping sounds is even simpler, we can stop all normal sounds through
```java
api.getMediaApi().stopMedia(client);
```
or stop a single sound with the ID "example" with
```java
api.getMediaApi().stopMedia(client, "example");
```

## Spatial Audio
Explosions are cool, but explosions that spook the living ghost out of someone are even cooler. OpenAudioMc supports spatial audio, and we can simply create it like this
```java
String spatialSoundId = api.getMediaApi().playSpatialSound(client, "https://example.com/a.mp3", x, y, z, 10, true);
```
This will start a 3D spatial sound at a given location for the player with a radius of 10 blocks. You can also just make a simple sound (so one that just does volume instead of 3D orientation by setting the mode to false, which is the last argument).
the `playSpatialSound` method returns a string, which is the spatial-id for that player (and unique to that player). You can remove it again with
```java
api.getMediaApi().stopSpatialSound(client, spatialSoundId);
```

## K/V Cache
Keeping track of all spatial ID's can be a pain, so we can keep track of it with a simple map. You can just `put` and `get` player metadata via the map we provide with the `getKeyValue` method in Client.

# The rest
This just covers the basics but there's a lot more you can do, please look in the Javadoc for more details at https://javadoc.openaudiomc.net/