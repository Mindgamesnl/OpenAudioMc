#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building new OpenAudioMc jar without unit tests.."
./gradlew :OpenAudioMc:Plugin:shadowJar :OpenAudioMc:OA-VistasClient:shadowJar :OpenAudioMc:OA-VistasServer:shadowJar -x test

mkdir -p dev-resources/vistas-test/plugins
cp OpenAudioMc/Plugin/build/libs/openaudiomc-*.jar dev-resources/vistas-test/plugins/

mkdir -p dev-resources/vistas-test/plugins/OpenAudioMc/modules
cp OpenAudioMc/OA-VistasClient/build/libs/vistas-client-*.jar dev-resources/vistas-test/plugins/OpenAudioMc/modules/

mkdir -p dev-resources/vistas-test/vistas
cp OpenAudioMc/OA-VistasServer/build/libs/vistas-server-*.jar dev-resources/vistas-test/vistas/

cd dev-resources/vistas-test/
docker compose up
