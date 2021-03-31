npm run-script build
sleep 2
cp dist/OpenAudioMc.bundle.js target/
cp -R target/ ../docs/production-client/target/
rm -rf target/
./post-build.sh
