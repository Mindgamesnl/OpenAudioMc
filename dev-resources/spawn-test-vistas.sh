asdf local java openjdk-18.0.2.1
export JAVA_HOME=`/usr/libexec/java_home -v 17`
mkdir -p test-server-vistas/

./dev-resources/bump-binaries.sh



cd test-server-vistas

cp ../modules/vistas-server.jar ./vistas-server.jar

#export OA_ENVIRONMENT="DEVELOPMENT"
#export OA_DEBUG_URL="http://localhost:8000"

echo "Starting server.."
rm world/session.lock
rm world_the_end/session.lock
rm world_nether/session.lock
java -Xms3G -Xmx3G -jar vistas-server.jar nogui