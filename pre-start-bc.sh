#!/bin/bash

if [ -z "$2" ]; then
  echo -e "WARNING!!\nYou need to pass the WEBHOOK_URL environment variable as the second argument to this script.\nFor details & guide, visit: https://github.com/DiscordHooks/travis-ci-discord-webhook" && exit
fi

echo -e "[Webhook]: Sending webhook to Discord...\\n";

TIMESTAMP=$(date --utc +%FT%TZ)
WEBHOOK_DATA='{
  "username": "",
  "avatar_url": "https://github.com/Mindgamesnl.png",
  "embeds": [ {
    "color": '3066993',
    "author": {
      "name": "OpenAudioMc build announcer",
      "url": "https://github.com/Mindgamesnl/OpenAudioMc",
      "icon_url": "https://github.com/Mindgamesnl.png"
    },
    "title": "Staring build..",
    "url": "https://github.com/Mindgamesnl/OpenAudioMc",
    "description": "Git activity detected! started running a new build. Or at least, trying to! you never know how these things go.",
    "fields": [
      {
        "name": "Commit",
        "value": "'"[\`${TRAVIS_COMMIT:0:7}\`](https://github.com/$TRAVIS_REPO_SLUG/commit/$TRAVIS_COMMIT)"'",
        "inline": true
      },
      {
        "name": "Branch",
        "value": "'"[\`$TRAVIS_BRANCH\`](https://github.com/$TRAVIS_REPO_SLUG/tree/$TRAVIS_BRANCH)"'",
        "inline": true
      }
    ],
    "timestamp": "'"$TIMESTAMP"'"
  } ]
}'

(curl --fail --progress-bar -A "TravisCI-Webhook" -H Content-Type:application/json -H X-Author:k3rn31p4nic#8383 -d "${WEBHOOK_DATA//	/ }" "$2" \
  && echo -e "\\n[Webhook]: Successfully sent the webhook.") || echo -e "\\n[Webhook]: Unable to send webhook."