#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

./gradlew build -x test

mkdir -p modules
for module in OA-VistasServer OA-VistasClient OA-PartiesModule OA-SkywarsModule; do
    cp OpenAudioMc/$module/build/libs/*.jar modules/
done
