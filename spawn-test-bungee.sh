export JAVA_HOME=`/usr/libexec/java_home -v 11`
cwd=$(pwd)
mkdir -p test-server-bungee/spigot/plugins/
mkdir -p test-server-bungee/spigot/plugins/OpenAudioMc/
echo "Building new OpenAudioMc jar without unit tests.."

mvn clean install -Dmaven.test.skip=true

npm install -g pm2
pm2 stop all

rm test-server-bungee/spigot/plugins/OpenAudioMc-*
cp plugin/target/OpenAudioMc-* test-server-bungee/spigot/plugins/
cp dev-resources/bukkit.yml test-server-bungee/spigot/
cp dev-resources/spigot.yml test-server-bungee/spigot/
cp dev-resources/server.properties test-server-bungee/spigot/
cp dev-resources/ops.json test-server-bungee/spigot/
cp dev-resources/start-spigot.sh test-server-bungee/spigot/

cd test-server-bungee/spigot/
echo "Cleaning server..."
if [ ! -f ./spigot-1.12.2.jar ]; then
    wget https://cdn.getbukkit.org/spigot/spigot-1.12.2.jar
    echo "eula=true" > eula.txt
    chmod +x spigot-1.12.2.jar
fi

echo "Starting server.."
chmod +x start-spigot.sh
pm2 start ./start-spigot.sh &&


# setup bungeecord
cd $cwd
echo "Going to $cwd"
sleep 2

mkdir -p $cwd/test-server-bungee/bungee/plugins/
cp $cwd/plugin/target/OpenAudioMc-* $cwd/test-server-bungee/bungee/plugins/
cp $cwd/dev-resources/bungeeconfig.yml $cwd/test-server-bungee/bungee/config.yml
cp $cwd/dev-resources/start-bungee.sh $cwd/test-server-bungee/bungee/
cd $cwd/test-server-bungee/bungee/
if [ ! -f ./BungeeCord.jar ]; then
    wget https://ci.md-5.net/job/BungeeCord/lastSuccessfulBuild/artifact/bootstrap/target/BungeeCord.jar
    echo "eula=true" > eula.txt
    chmod +x BungeeCord.jar
fi
chmod +x start-bungee.sh
pm2 start ./start-bungee.sh


pm2 logs

pm2 stop all
