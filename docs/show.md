# Shows
With shows, you can make time coded shows. Our definition of a show is a list of cues, or scheduled events.

The major benefit about shows is that they are multithreaded. Meaning that in-game lag (TPS drops) will NOT affect or hinder the timing of your show to always keep it in sync with the audio.

So get started, make a show called `demo`
```
/openaudio show create demo
```
We now have a show called `demo`. We can start/stop it but this won't really do anything, we need to add cues first. To do so, you fist need to understand what a time code is.
A time code is the amount of time from when the start command is executed. OpenAudioMc supports the following formats:
 - **`m` resembles minutes**: 1m = 1 minute, 1.5m = 1 minute and 30 seconds.
 - **`s` resembles seconds**: 1s = 1 second, 1.5s = 1 second and 50 milliseconds
 - **`ms` resembles milliseconds**: 1ms = 1 millisecond
 - **`t` resembles ticks**: 1t = 1 minecraft tick, or 50 mlliseconds
 - **`HH:mm:ss` resembles HourHour:MinuteMinute:SecondSecond**: 00:05:00 = 5 minutes

Out of the box, OpenAudioMc supports one trigger type, this is command. This will execute a command as console. Other triggers can be added via addons or the API.

For this demo, we are gonna add two cues. One cue after 0 seconds, a cue after 1 second, and a cue after 1 minute. To add these cues, use the following commands:
```
/openaudio show add demo 0s command say I fire at the start
/openaudio show add demo 1s command say I fire after one second
/openaudio show add demo 1m command say I fire after one minute
```

The basic format here is
```
/openaudio show add <show name> <timecode> <type> <data>
``` 
 
To get the status of a show, you can use
```
/openaudio show info demo
``` 

To start or cancel
```
/openaudio show <start/cancel> <showname>
``` 

You can also edit a show via a gui using
```
/openaudio show gui <show name>
```
you can change the show state, scroll through cues and delete them from this GUI.