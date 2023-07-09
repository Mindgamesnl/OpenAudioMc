export JAVA_HOME=`/usr/libexec/java_home -v 17`
mkdir -p test-server-spigot/plugins/
mkdir -p test-server-spigot/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

cd plugin
./src/main/bash/post-build.sh
cd ..

mvn -T 4.5C clean install -Dmaven.test.skip=true

# permission workaround
cp plugin/target/openaudiomc-*.jar dev-resources/vistas-test/plugins/

# copy vistas client module
mkdir -p dev-resources/vistas-test/plugins/OpenAudioMc/modules/
cp modules/vistas-client/target/vistas-client.jar dev-resources/vistas-test/plugins/OpenAudioMc/modules/

# vistas server jar
mkdir -p dev-resources/vistas-test/vistas/
cp modules/vistas-server/target/vistas-server.jar dev-resources/vistas-test/vistas/

cd dev-resources/vistas-test/
docker-compose up