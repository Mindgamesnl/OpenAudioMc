These JSON files are read by the backend upon booting an instance so I can easily whitelist channels without having to do any further struggling with the services.

`from_client.json` contains mappings from client channels to server events, more files might and probably will be added later for the plus codification protocol.
The client json maps the out socket channel from the client to the incoming PacketChannel in the plugin.

Traffic between the two (outside of this specification) will be blocked. The channel will be available 24 hours after the mapping files being updated/merged in the MASTER branch on https://github.com/Mindgamesnl/OpenAudioMc