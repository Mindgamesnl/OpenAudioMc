package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientRtcLocationUpdate;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bukkit.entity.Player;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ClientVoiceSubscribePayload extends AbstractPacketPayload {

    private String targetStreamKey;
    private String targetPlayerName;
    private UUID targetUuid;
    private ClientRtcLocationUpdate location;

    public static ClientVoiceSubscribePayload fromClient(ClientConnection clientConnection) {
        Player player = ((SpigotPlayerAdapter) clientConnection.getPlayer()).getPlayer();
        return new ClientVoiceSubscribePayload(
                clientConnection.getStreamKey(),
                clientConnection.getOwnerName(),
                clientConnection.getOwnerUUID(),
                new ClientRtcLocationUpdate(
                        clientConnection.getStreamKey(),
                        player.getLocation().getX(),
                        player.getLocation().getY(),
                        player.getLocation().getZ()
                )
        );
    }

}
