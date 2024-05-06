export JAVA_HOME=`/usr/libexec/java_home -v 18`
mkdir -p test-server-spigot/plugins/
mkdir -p test-server-spigot/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

cd plugin
./src/main/bash/post-build.sh
cd ..

mvn -T 4.5C clean install -Dmaven.test.skip=true

rm test-server-spigot/plugins/openaudiomc-*
cp plugin/target/openaudiomc-* test-server-spigot/plugins/
cp dev-resources/bukkit.yml test-server-spigot/
cp dev-resources/ops.json test-server-spigot/

cd test-server-spigot
echo "Cleaning server..."
if [ ! -f ./spigot-1.20.2.jar ]; then
    wget https://download.getbukkit.org/spigot/spigot-1.20.2.jar
    echo "eula=true" > eula.txt
    chmod +x spigot-1.20.2.jar
fi

#export OA_ENVIRONMENT="DEVELOPMENT"
#export OA_DEBUG_URL="http://localhost:8000"

echo "Starting server.."
rm world/session.lock
rm world_the_end/session.lock
rm world_nether/session.lock
java -Xms3G -Xmx3G -DIReallyKnowWhatIAmDoingISwear -jar paper-1.20.6-49.jar nogui
