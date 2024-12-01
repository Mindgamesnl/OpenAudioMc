export JAVA_HOME=`/usr/libexec/java_home -v 17`
mkdir -p test-server-spigot/plugins/
mkdir -p test-server-spigot/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

cd plugin
./src/main/bash/post-build.sh
cd ..

asdf local java adoptopenjdk-8.0.332+9
mvn -T 4.5C clean install -Dmaven.test.skip=true
asdf local java openjdk-21

# permission workaround
rm -rf dev-resources/bungee-test/plugins/
mkdir -p dev-resources/bungee-test/plugins/
cp plugin/target/openaudiomc-*.jar dev-resources/bungee-test/plugins/
cd dev-resources/bungee-test/
docker-compose up --build
