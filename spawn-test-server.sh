export JAVA_HOME=`/usr/libexec/java_home -v 11`
mkdir -p test-server/plugins/
mkdir -p test-server/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

mvn clean install -Dmaven.test.skip=true

rm test-server/plugins/OpenAudioMc-*
cp plugin/target/OpenAudioMc-* test-server/plugins/
cp dev-resources/bukkit.yml test-server/
cp dev-resources/ops.json test-server/

cd test-server
echo "Cleaning server..."
if [ ! -f ./spigot-1.8.8-R0.1-SNAPSHOT-latest.jar ]; then
    wget https://cdn.getbukkit.org/spigot/spigot-1.8.8-R0.1-SNAPSHOT-latest.jar
    echo "eula=true" > eula.txt
    chmod +x spigot-1.8.8-R0.1-SNAPSHOT-latest.jar
fi

echo "Starting server.."
java -Xms3G -Xmx3G -jar spigot-1.8.8-R0.1-SNAPSHOT-latest.jar nogui