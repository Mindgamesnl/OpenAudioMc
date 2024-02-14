[ ! -d "plugin/" ] && echo "Execute this script from the repo root" && exit 1
export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_282`
asdf local java adoptopenjdk-8.0.332+9
# Build everything
mvn -T 4.5C clean install -Dmaven.test.skip=true

# copy modules
cp modules/vistas-server/target/vistas-server.jar modules/vistas-server.jar
cp modules/vistas-client/target/vistas-client.jar modules/vistas-client.jar
cp modules/mapdb-migrator/target/migrate.* modules/
cp modules/parties-module/target/parties* modules/
cp modules/skywars-module/target/skywars-hook.jar modules/
