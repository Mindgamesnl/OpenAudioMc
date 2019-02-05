#!/usr/bin/env bash
webpack --config webpack.config.js
./node_modules/.bin/babel --presets babel-preset-es2015-ie ./dist/OpenAudioMc.bundle.js -o ./dist/OpenAudioMc.bundle.compiled.js
echo finishing setup
rm -rf target
mkdir target
cp -R ./src/libs ./target/libs/
cp -R ./src/css ./target/css/
cp -R ./src/assets ./target/assets/
cp ./src/index.html ./target/index.html
cp ./dist/OpenAudioMc.bundle.compiled.js ./target/OpenAudioMc.bundle.js
