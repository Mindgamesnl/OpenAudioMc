asdf local java adoptopenjdk-8.0.332+9
mkdir -p test-server-spigot-legacy/plugins/
mkdir -p test-server-spigot-legacy/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

mvn clean install -Dmaven.test.skip=true

rm test-server-spigot-legacy/plugins/openaudiomc-*
cp plugin/target/openaudiomc-* test-server-spigot-legacy/plugins/
cp dev-resources/bukkit.yml test-server-spigot-legacy/
cp dev-resources/ops.json test-server-spigot-legacy/

cd test-server-spigot-legacy
echo "Cleaning server..."
if [ ! -f ./spigot-1.12.2.jar ]; then
    wget https://cdn.getbukkit.org/spigot/spigot-1.12.2.jar
    echo "eula=true" > eula.txt
    chmod +x spigot-1.12.2.jar
fi

#export OA_ENVIRONMENT="DEVELOPMENT"
#export OA_DEBUG_URL="http://localhost:8000"

echo "Starting server.."
java -Xms3G -Xmx3G -jar spigot-1.12.2.jar nogui