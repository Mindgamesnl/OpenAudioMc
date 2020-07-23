npm run-script build
sleep 2
cp -R target/ ../docs/production-client/
rm -rf target/