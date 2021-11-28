[//]: # (TITLE:Rest Direct)
[//]: # (DESCRIPTION:Rest Direct)
[//]: # (TAGS:configuration,config,data,yml)

### Rest Direct
Rest Direct is an internal system used to transfer large blobs of data from your server to the OpenAudioMc network. It's used by features like Local File Playback to upload files to our cdn and for our system to trigger events in your server without requiring an active session.

## Technical Requirements
RestDirect requires an additional port allocation, which does mean that some hosting providers (primarily cheaper ones) aren't compatible with this feature, and locking you out of some really cool features. Please contact a system administrator or admin of your server to ask for an extra allocation.

Some good things to keep in mind;
 - OpenAudioMc tests a few ports after start up, the first port is `8050` and can be configured in the config file. If that port fails, it'll try `80`, `8080`, and three random ports. It'll do a signature check to make sure that the port is attached properly and isn't interfering with another application.
 - Content requests have automatic authentication, based on a token that regenerates when your server restarts.
 - Your public server IP or RestDirect port will **NEVER** be exposed to any end user by OpenAudioMc, our CDN will always deliver and cache the files.
 - Pterodactyl users: make sure that your port forwarding and allocation is configured