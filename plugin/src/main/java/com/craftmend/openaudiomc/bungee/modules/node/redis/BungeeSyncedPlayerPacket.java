package com.craftmend.openaudiomc.bungee.modules.node.redis;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

@NoArgsConstructor
@AllArgsConstructor
public class BungeeSyncedPlayerPacket extends OARedisPacket {

    @Getter private String targetPlayerName;
    @Getter private String packetJSON;

    public BungeeSyncedPlayerPacket(String targetPlayerName, AbstractPacket packet) {
        this.targetPlayerName = targetPlayerName;
        this.packetJSON = OpenAudioMc.getGson().toJson(packet);
    }

    @Override
    public String serialize() {
        return RedisService.getGSON().toJson(this);
    }

    @Override
    public void handle(OARedisPacket a) {
        BungeeSyncedPlayerPacket received = (BungeeSyncedPlayerPacket) a;
        ProxiedPlayer player = ProxyServer.getInstance().getPlayer(received.getTargetPlayerName());
        if (player == null || !player.isConnected()) return;
        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(player.getUniqueId());

        if (clientConnection == null) return;
        if (!clientConnection.getIsConnected()) return;
        AbstractPacket recievedPacket = OpenAudioMc.getGson().fromJson(received.getPacketJSON(), AbstractPacket.class);
        OpenAudioMc.getInstance().getNetworkingService().send(clientConnection, recievedPacket);

    }

    public void send() {
        OpenAudioMc.getInstance().getRedisService().sendMessage(ChannelKey.SYNC_BUNGEE_PACKET, this);
    }
}
