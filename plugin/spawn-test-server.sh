mkdir -p test-server/plugins/
mvn clean install -Dmaven.test.skip=true
cp target/OpenAudioMc-* test-server/plugins/

cd test-server

if [ ! -f ./spigot-1.18.1.jar ]; then
    wget https://download.getbukkit.org/spigot/spigot-1.18.1.jar
    echo "eula=true" > eula.txt
    chmod +x spigot-1.18.1.jar
fi

export OA_ENVIRONMENT=DEVELOPMENT
java -Xms3G -Xmx3G -jar spigot-1.18.1.jar nogui