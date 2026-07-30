#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building new OpenAudioMc jar without unit tests.."
./gradlew :OpenAudioMc:Plugin:shadowJar -x test

rm -f dev-resources/velocity-test/plugins/openaudiomc-*.jar
mkdir -p dev-resources/velocity-test/plugins
cp OpenAudioMc/Plugin/build/libs/openaudiomc-*.jar dev-resources/velocity-test/plugins/

cd dev-resources/velocity-test/
docker compose up --build
