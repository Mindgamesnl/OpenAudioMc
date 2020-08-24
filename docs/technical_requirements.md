# Technical Requirements
OpenAudioMc isn't magic, well, not completely, most of it is networking. This means that there are a few simple requirements for your host to make it all work and come together like some finely crafted dish. (but instead of spaghetti, its audio) 

The Minecraftserver (or Bungee-based proxy) never actually hosts a socket server, meaning that no additional port forwarding is required. However, it does need outgoing connections to be allowed on port `443`. Several domains are used by our services, these include (but may not be limited to) `*.cloud.openaudiomc.net`, and `*.githubusercontent.com`.
The plugin will use services used on those servers to handle networking, failure to connect to any of them will shut the plugin down since it won't be able to function properly.

