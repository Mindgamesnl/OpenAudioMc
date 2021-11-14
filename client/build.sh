# Utility functions and recent build date
. ./build/data.bin

set_var () {
  echo ''$1'''="'"$2"'"' >> ./build/data.bin
}

replace_all () {
  for f in $PWD/../docs/production-client/target/*.*
  do
    # shellcheck disable=SC2082
    if [[ $1 != *"assets"* ]];then
      echo "Processing $f"
      sed -i "s/$1/$2/g" "$f"
    fi

   # do something on $f
  done
}

# Run webpack build, depending on the platform
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  npm run-script build
  echo "Processing the build (linux)"
  sleep 2
  cp dist/OpenAudioMc.bundle.js target/
  cp -R target/ ../docs/production-client/
  rm -rf target/
  BUILD_PLATFORM="Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  npm run-script build
  echo "Processing the build (mac)"
  sleep 2
  cp dist/OpenAudioMc.bundle.js target/
  cp -R target/ ../docs/production-client/target/
  rm -rf target/
  BUILD_PLATFORM="macOS"
fi

if [[ "$1" == "dev" ]]; then
  BUILD_ENV_RD="Development"
  IS_PROD="false"
  ENV_ABOUT="Build with dev mode enabled"
  echo "default-dev"
else
  BUILD_ENV_RD="Production"
  IS_PROD="true"
  ENV_ABOUT="default-prod"
  echo "Build is production safe"
fi

# increment build num
BUILD_NUM="$((BUILD_NUM + 1))"

echo "Current build: " $BUILD_NUM

# replace in target
replace_all "__BUILD_VERSION__" $BUILD_NUM
replace_all "__BUILD_PLATFORM__" $BUILD_ENV_RD
replace_all "__BUILD_ENV_RD__" $BUILD_PLATFORM
replace_all "__BUILD_IS_PROD__" $IS_PROD
replace_all "__ENV_ABOUT__" $ENV_ABOUT
replace_all "__BUILD_COMMIT__" $(git rev-parse HEAD)
replace_all "__BUILD_AUTHOR__" $(git log -1 --pretty=format:'%an')

# delete old file, than save it
rm build/data.bin
set_var "BUILD_NUM" $BUILD_NUM
chmod +x ./build/data.bin
