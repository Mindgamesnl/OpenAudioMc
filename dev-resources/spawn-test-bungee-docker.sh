#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building new OpenAudioMc jar without unit tests.."
./gradlew :OpenAudioMc:Plugin:shadowJar -x test

rm -rf dev-resources/bungee-test/plugins
mkdir -p dev-resources/bungee-test/plugins
cp OpenAudioMc/Plugin/build/libs/openaudiomc-*.jar dev-resources/bungee-test/plugins/

cd dev-resources/bungee-test/
docker compose up --build
