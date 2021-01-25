# Meet the bots
I recently started working on a handful of Bots in an effort to automate many (if not all) error handling, monitoring and recovery of the OpenAudioMc services.
These bots are written in [Go](https://golang.org/) to be ultra reliable and notifies the team and me whenever something happens, they do this by hooking natively into our platform using [GoFlare](https://github.com/Mindgamesnl/GoFlare) and other internal API's to monitor the status of the magic gnomes running all the services.

We've got three Discord bots on top of that which collect the output of the others and presents it in our Discord im a human-readable form, so we can always stay on top of everything.
These bots are `Mabel Pines`, `Dipper Pines` and `Soos Ramirez`, all named after characters from my favorite show, [Gravity Falls](https://www.imdb.com/title/tt1865718/).

### Dipper Pines
Dipper collects the main monitoring data from our software services (containers, network load, etc).  He's usually pretty chill unless one of the services shows decreased performance, high load or encounters an error, in which case he'll wake us from our slumber by spamming tags while crying in a corner, desperate for help.
![Image](https://i.imgur.com/AEaD9XF.png)

### Mabel Pines
Mabel is the dreamy type, doing absolutely nothing at all unless one of our CDN services fails to deliver an audio file to one of you guys.
![mabel](https://i.imgur.com/hmmeOwO.png)

### Soos
Soos doesn't talk much, if it all, he just throw the trash out that Dipper and Mabel leave behind and deletes all logs that are older than 12 hours (except for reports from Dipper when a service went down, they'll stay in the logs for later reference)

# Why?
OpenAudioMc has grown a LOT over the last few months, tipping the 1.2Milion requests daily and monitoring became a lot more important after the hosting incident a month ago. I could've called them "Logging1" and "Logging2" but where's the fun in that?