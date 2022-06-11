[ ! -d "plugin/" ] && echo "Execute this script from the repo root" && exit 1

# Build everything
mvn clean install -Dmaven.test.skip=true

# copy modules
cp module-src/vistas-server/target/vistas-server.jar modules/vistas-server.jar
cp module-src/vistas-client/target/vistas-client.jar modules/vistas-client.jar
cp module-src/mapdb-migrator/target/migrate.* modules/
cp module-src/parties-module/target/parties* modules/
cp module-src/rinaorc-legacy/target/rinaorc-legacy-users.jar modules/
cp module-src/skywars-module/target/skywars-hook.jar modules/
