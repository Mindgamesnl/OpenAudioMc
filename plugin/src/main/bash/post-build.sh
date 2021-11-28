#!/bin/bash
echo "Generating build data and inserting it within the target directory"

# load previous data
. ./src/main/bash/data.bin

set_var () {
  echo ''$1'''="'"$2"'"' >> ./src/main/bash/data.bin
}

save_var () {
  echo ''$1'''="'"$2"'"' >> ./src/main/resources/openaudiomc-build.properties
}

echo "Current build is" $BUILD_NUM

# increment build num
BUILD_NUM="$((BUILD_NUM + 1))"

rm ./src/main/bash/data.bin
rm ./src/main/resources/openaudiomc-build.properties

# replace in target
save_var "BUILD_VERSION" $BUILD_NUM
save_var "BUILD_COMMIT" $(git rev-parse HEAD)
save_var "BUILD_AUTHOR" $(git log -1 --pretty=format:'%an')

# delete old file, than save it
set_var "BUILD_NUM" $BUILD_NUM
chmod +x ./src/main/bash/data.bin
echo "Fuckk"
cp ./src/main/bash/data.bin ./src/main/resources/data.bin
echo "Exporting jar"
# copy jar
for f in target/*.jar
do
  echo "Processing $f file..."
  # Automatically fix signed dependencies
  zip -d $f META-INF/*.RSA META-INF/*.DSA META-INF/*.SF
  cp target/OpenAudioMc-* ./../docs/builds/OpenAudioMc-latest.jar
done