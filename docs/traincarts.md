[//]: # (TITLE:Traincarts)
[//]: # (DESCRIPTION:Using traincarts signs to play music in rides)
[//]: # (TAGS:traincarts,train,music,sign,signs)

# TrainCarts integration
Starting 6.2.3, OpenAudioMc introduces a native hook into TrainCarts to do all the heavy lifting for you. You can add a piece of music to one of your trains through a sign and that's it. OpenAudioMc will synchronize the music between the occupants, regardless if they just entered or just opened their client, ensuring the best experience for all. The music will stop once they leave the train or another sound starts, in which case they'll cross fade smoothly.

To start, we need to create a sign like this if we want to use our example test alias ([as explained here](alias.md))
```
[train]
audio
a:test
```

And then, well, nothing, that's it actually. It's that easy! If you want to remove the music from your train, just write stop instead of a source.
