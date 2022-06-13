. ./build/data.bin
oama discord-channel-message --target 529648109010157568 --message "**Client:** Preparing to push build $BUILD_NUM ($(git log -1 --pretty=format:'%an')/$(git rev-parse HEAD)) to production"
oama srv-checkout --env PROD --app client
oama discord-channel-message --target 529648109010157568 --message "**Client:** Checked out production"