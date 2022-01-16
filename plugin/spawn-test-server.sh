mkdir -p test-server/plugins/
echo "Building new OpenAudioMc jar without unit tests.."
mvn clean install -Dmaven.test.skip=true -q
rm test-server/plugins/OpenAudioMc-*
cp target/OpenAudioMc-* test-server/plugins/
cp jar-resources/VoidGen* test-server/plugins/
cp jar-resources/bukkit.yml test-server/
cp jar-resources/ops.json test-server/

cd test-server
echo "Cleaning server..."
if [ ! -f ./spigot-1.18.1.jar ]; then
    wget https://download.getbukkit.org/spigot/spigot-1.18.1.jar
    echo "eula=true" > eula.txt
    chmod +x spigot-1.18.1.jar
fi

echo "Starting server.."
export OA_ENVIRONMENT=DEVELOPMENT
java -Xms3G -Xmx3G -jar spigot-1.18.1.jar nogui