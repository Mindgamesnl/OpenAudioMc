export JAVA_HOME=`/usr/libexec/java_home -v 17`
mkdir -p test-server-spigot/plugins/
mkdir -p test-server-spigot/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

cd plugin
./src/main/bash/post-build.sh
cd ..

mvn -T 4.5C clean install -Dmaven.test.skip=true

# permission workaround
rm -rf dev-resources/velocity-test/plugins/openaudiomc-*.jar
mkdir -p dev-resources/velocity-test/plugins/
cp plugin/target/openaudiomc-*.jar dev-resources/velocity-test/plugins/
cd dev-resources/velocity-test/
docker-compose up --build
