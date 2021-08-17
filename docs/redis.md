[//]: # (TITLE:Redis)
[//]: # (DESCRIPTION:Using a Redis server for shows and networking)
[//]: # (TAGS:redis,shows)

# Redis
## Note: *[This feature requires a running Redis server. Click here to learn more.](https://redis.io/)*
OpenAudioMc has support for Redis to synchronize shows across multiple servers.
It was originally made to run the BarelyAlive shows, but I merged it into the release version of OpenAudioMc because it has proven itself as a useful feature.

You can configure redis in the normal OpenAudioMc config.
To set it up,
1. set `redis.enabled` to `true` in the config to enable the redis feature
2. enter your redis host and password in `redis.host` and `redis.password` *(use `none` as your password to disable authentication)*
3. enter your section in `redis.section`. Your section is basically a channel. All shows will be synchronized across all other OpenAudioMc instances listening to the same section. Usually, you'd have one "Master" server running your show and all listening servers will execute the same cue's as the master server, regardless of their show state.

Redis isn't used for anything other than shows at the moment, nor does it utilize its storage/cache, but we will likely expand the redis integration later on to synchronize settings, tokens and configuration.