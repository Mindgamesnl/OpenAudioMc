. ./build/data.bin

set_var () {
  echo ''$1'''="'"$2"'"' >> ./build/data.bin
}

replace_all () {
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    RP="grep -rl '$1' $PWD/../docs/production-client/target/ | xargs sed -i 's/$1/$2/g'"
    eval $RP
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    RP="grep -rl '$1' $PWD/../docs/production-client/target/ | xargs sed -i '' 's/$1/$2/g'"
    eval $RP
  fi
}

# increment build num
BUILD_NUM="$((BUILD_NUM + 1))"


echo "Current build is" $BUILD_NUM

# replace in target
replace_all "__BUILD_VERSION__" $BUILD_NUM
replace_all "__BUILD_COMMIT__" $(git rev-parse HEAD)
replace_all "__BUILD_AUTHOR__" $(git log -1 --pretty=format:'%an')

# delete old file, than save it
rm build/data.bin
set_var "BUILD_NUM" $BUILD_NUM
chmod +x ./build/data.bin
