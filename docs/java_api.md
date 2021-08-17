[//]: # (TITLE:Java API)
[//]: # (DESCRIPTION:Using the java API to build awesome shit)
[//]: # (TAGS:java,api,documentation,events,packets,maven,gradle,nerds)

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

OpenAudioMc has a few events build in, these are;
 - `ClientConnectEvent`: Fires when a clients opens the web client, this is supported on all platforms.
 - `ClientDisconnectEvent`: Fires when a clients closes the web client, this is supported on all platforms.
 - `ClientRequestVoiceEvent`: A cancellable event that gets fired when a voicechat session is initializing. This only fires on the top-level server.
 - `ClientErrorEvent`: Event that fires when the client encouters a media error (http failure when trying to load a media sound). This only fires on the top-level server.
 - `StateChangeEvent`: Fires whenever the plugin changes state (idle, online, fatal error, etc). This only fires on the top-level server.
 - `AccountAddTagEvent`: Fires whenever the server receives a new module/addon or update from the owning [Craftmend Account](account.md) (example, VOICE_CHAT)
 - `AccountRemoveTagEvent`: Mirror opposite of the `AccountAddTagEvent`
 - `MicrophoneMuteEvent`: Fires when a player mutes their microphone
 - `MicrophoneUnmuteEvent`: Fires when a player unmute their microphone (and when it activates for the first time)
 - `PlayerEnterVoiceProximityEvent`: Fires when player A joins the voice range of player B
 - `PlayerLeaveVoiceProximityEvent`: Fires when player A leaves the voice range of player B
 - `PlayerLoudnessEvent`: Fires when a the speaking loudness of a player changes (between normal, whispering and shouting)
 - `ClientPreAuthEvent`: A cancellable event that fires whenever a web client attempts to login. Canceling the event will block the login.
 - `VoiceChatPeerTickEvent`: This event fires before **AND** after voicechat peer updates (it has a variable letting you know if it was pre-or post)
 - `SystemReloadEvent`: Called whenever the plugin reloads completely or updates state
 - `ConfigurationPushEvent`: Fires whenever a new version of the config.yml is loaded through networking, migrations or perhaps redis. It contains the (supposedly) yaml file content as a string.

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

## Hooking into internal services and using dependency injection
Most of the internal codebase was re-written and refactored during the 6.5.5 update, where we migrated to a custom service manager with support for annotation based dependency injection, service abstraction and to provide pointer safety during reloads.
The service manager is registered in the main `OpenAudioMc` class and is accessible through all platforms. The entire ecosystem consists of two main registration types types

- **Services** are static code implementations that can be injected, requested and manipulated after loading (or being requested, in which case they'll be loaded if they weren't already. So calling `OpenAudioMc.getService(NotLoadedByDefault.class).something()` will delay the execution of the `something()` call, while it's preparing the `NotLoadedByDefault` service and it's dependencies). Services like this can be registered through
  ```java
       serviceManager.loadServices(
            FirstService.class,
            SecondService.class
       );
    ```
- **Mapped Values** Some services might have different implementations based on the platform, but are accessed by a shared source (example, having a `INetworkingService` interface, being implemented as `FirstnetworkingImpl` and `SecondNetworkingImpl`) in which case you can register the interface with a value, so you can use dependency injection through the interface, and receive the appropriate implementation class. Example registration
    ```java
        OpenAudioMc.getInstance().getServiceManager().registerDependency(TaskService.class, invoker.getTaskProvider());
    ```
    This also means that you can register custom variables (identified by classes or interfaces) and have them injected with a default value or implementation.

There are a few ways to receive services, simplest one being the most common one, which is by just requesting the service manually. You can do this at any time through
```java
// Get the current MyService instance, or initialize it if it isn't mapped yet
MyService myService = OpenAudioMc.getService(MyService.class);
```

Or you can alternatively use dependency injection using the `@Inject` annotation. This supports values and constructors.

Field example:
```java
public class TestService extends Service {
    
    // inject the main openaudio instance
    @Inject
    private OpenAudioMc openAudioMc;
    
    public TestService() {
        // this module is being loaded
    }
    
    @Override
    public void onEnable() {
        // the injections have been done, so we can safely call this.openAudioMc
    }
    
}
```

or through the constructor, like so
```java
public class TestService extends Service {

    @Inject
    public TestService(OpenAudioMc openAudioMc, NetworkingService networkingService) {
        // both the 'openAudioMc' and 'networkingService' parameters will be injected during init
    }
    
}
```

**NOTE THAT DEPENDENCY INJECTION ONLY WORKS WHEN YOUR OWN CLASS IS BEING LOADED AS A SERVICE**ApiResponse.java:24


## K/V Cache
Keeping track of all spatial ID's can be a pain, so we can keep track of it with a simple map. You can just `put` and `get` player metadata via the map we provide with the `getKeyValue` method in Client
