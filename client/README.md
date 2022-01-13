# Localization and messages
OpenAudioMc uses a custom localization and templating framework. Messages are defined in the language files (within `src/`) and follow the format of `<langcode>.lang`. Lang files are a custom text format inspired by the popular properties type, and it supports every character (except for line breaks).

Example format
```
# this is a comment
key=value
namespace=some nice text
emoji=😋
hello=Hey there, %player!
```

Messages can be used in HTML without **any** javascript, simply define placeholders as `{% my.message %}` where `my.message` is a defined key from the language file. These DOM elements will be replaced when the web client initially loads. So HTML like `<h1>{% greeting %}</h1>` is perfectly valid.

HTML is escaped by default, but you can enable raw content by using the raw tag, like this `<h1><raw>{% my.message %}</raw></h1>`

# Pre compiled
For a pre-compiled recent version, check out the target directory.

Please note that
 - You are not allowed to modify/remove the copyright as mentioned in the LICENSE.
 - You have to keep track of updates, and update yourself

# Building the web client. building ONLY works on LINUX or MacOS!
The web client needs to be compiled. You can do this by running `./build.sh` which will dump a production ready client, or `./build.sh dev` to compile a development client, which enables unreleased features, extra logging and enables some mock data.
 
The compiled web client will appear in `../docs/production-client/`

Debugging UI: ![img](https://i.imgur.com/ASJgoNx.png)