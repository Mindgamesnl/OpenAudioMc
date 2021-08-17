[//]: # (TITLE:Notifications)
[//]: # (DESCRIPTION:Using the notification sub command)
[//]: # (TAGS:notifications,notification,subcommand)

# Notifications
The Notification command can be used to send a push Notification to a client. If the client does not have Push Notifications enabled then they'll see it as a badge on the web client.

We advise you only to use Push Notifications for important messages as to not be annoying.
```
/openaudio notification <selector> <message> 
```

example,
```
/openaudio notification @a Welcome to the server!
```