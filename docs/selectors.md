[//]: # (TITLE:Selectors)
[//]: # (DESCRIPTION:Using selectors)
[//]: # (TAGS:@a,@p,playername,selector,selectors,target,targets)

# Player Selectors
Selectors are used to specify to which clients an action should be executed. The selector format is inspired and partially compatible with the Mincecraft selection format. Usernames are also acceptable, but the main format goes as follows. Selectors start with a group of players, supported groups are:
 - **@a** Targets all players in your server
 - **@p** Targets the nearest player in your server
 
You can just leave it there but you can also filter for some attributes like *location*, *radius* and *worldguard* region.
 
For example, to start a sound for all players in a radius of 10 blocks, you could use
 ```
@a[r=10]
```

You can also filter players by the worldguard region they are in, for example to select everyone in the region `spawn`
```
@a[region=spawn]
```

When executed by a player, you can use server to select all players in a server called `lobby`
```
@a[server=lobby]
```

And last but not least, you can also select player (near) a specific location, for example, lets select everyone near the block at *X:10, Y:12, Z:15*
```
@a[x=10,y=12,z=15,r=5]```