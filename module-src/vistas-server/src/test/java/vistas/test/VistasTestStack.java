package vistas.test;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.vistas.client.redis.packets.ServerRegisterPacket;
import com.craftmend.vistas.client.redis.packets.UserJoinPacket;
import com.craftmend.vistas.client.redis.packets.UserLeavePacket;
import com.craftmend.vistas.client.server.networking.VistasRedisServer;
import com.craftmend.vistas.client.users.ServerUserHooks;
import com.craftmend.vistas.server.VistasServer;
import junit.framework.TestCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.SneakyThrows;
import org.junit.Test;
import redis.embedded.RedisServer;
import vistas.test.server.TestVistasServer;
import vistas.test.utils.Waiter;

import java.util.UUID;

public class VistasTestStack extends TestCase {

    private TempUser mats = new TempUser("Mats", UUID.randomUUID());
    private TempUser anouk = new TempUser("Anouk", UUID.randomUUID());

    private TestVistasServer testVistasServer;
    private RedisServer redisServer;

    @Override
    public void setUp() throws Exception {
        System.out.println("Setting it up!");
        // start embedded redis server for testing
        System.out.println("Start redis server");
        redisServer = RedisServer.builder()
                .port(6379)
                .setting("requirepass none")
                .build();
        redisServer.start();

        Waiter.waitUntil(s -> redisServer.isActive(), 10);

        System.out.println("Starting test resources");
        testVistasServer = new TestVistasServer();
    }

    @Override
    public void tearDown() throws Exception {
        System.out.println("Running: tearDown");
        redisServer.stop();
    }

    @Test
    @SneakyThrows
    public void testFullStack() {
        // the server should be running the server user hooks
        assertEquals(ServerUserHooks.class, VistasServer.getInstance().getOpenAudioMc().resolveDependency(UserHooks.class).getClass());

        System.out.println("Registering two fake servers");

        // fake register a minecraft server
        UUID fakeServer1 = UUID.randomUUID();
        UUID fakeServer2 = UUID.randomUUID();
        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new ServerRegisterPacket(fakeServer1));
        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new ServerRegisterPacket(fakeServer2));

        Waiter.waitSeconds(1);

        // the vistas server should now contain two servers
        assertEquals(2, OpenAudioMc.resolveDependency(ServerUserHooks.class).getRemoteInstallation().size());

        // fake player join
        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new UserJoinPacket(
                mats.getName(),
                mats.getUuid(),
                fakeServer1
        ));

        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new UserJoinPacket(
                anouk.getName(),
                anouk.getUuid(),
                fakeServer1
        ));

        // check if server 1 has two players, and server 2 has none
        assertEquals(2, OpenAudioMc.resolveDependency(ServerUserHooks.class).getRemoteInstallation().get(fakeServer1).getOnlineUsers().size());
        assertEquals(0, OpenAudioMc.resolveDependency(ServerUserHooks.class).getRemoteInstallation().get(fakeServer2).getOnlineUsers().size());

        // switch the two players from a to b
        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new UserJoinPacket(
                mats.getName(),
                mats.getUuid(),
                fakeServer2
        ));

        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new UserJoinPacket(
                anouk.getName(),
                anouk.getUuid(),
                fakeServer2
        ));

        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new UserLeavePacket(
                mats.getName(),
                mats.getUuid(),
                fakeServer1
        ));

        OpenAudioMc.getService(VistasRedisServer.class).getPacketEvents().handlePacket(null, new UserLeavePacket(
                anouk.getName(),
                anouk.getUuid(),
                fakeServer1
        ));

        // players should now be in the other server
        assertEquals(0, OpenAudioMc.resolveDependency(ServerUserHooks.class).getRemoteInstallation().get(fakeServer1).getOnlineUsers().size());
        assertEquals(2, OpenAudioMc.resolveDependency(ServerUserHooks.class).getRemoteInstallation().get(fakeServer2).getOnlineUsers().size());
    }

    @Getter
    @AllArgsConstructor
    class TempUser {
        private String name;
        private UUID uuid;
    }

}
